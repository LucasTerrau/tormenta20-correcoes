import { MODULE_ID } from "../constants.mjs";
import { atributoDeConjuracao, conjurador, equipado } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regras de magia que o sistema deixava só no texto:
 * - Armaduras e magia arcana (JdA p. 171): "Lançar uma magia arcana usando armadura exige um teste de
 *   Misticismo (CD 20 + o custo em PM da magia). O teste sofre penalidade de armadura. Se falhar, a magia
 *   não funciona, mas gasta PM." Não vale para magias de raça, poderes ou itens; o bardo lança de
 *   armadura leve sem teste (p. 44). Encouraçado Místico e Conjurador Encouraçado dispensam o teste.
 * - Dissipar Magia (p. 191): "faça um teste de Misticismo; você dissipa as magias com CD igual ou menor
 *   que o resultado". Efeitos de magias instantâneas não podem ser dissipados.
 * Correção: o cartão da magia arcana de classe lançada de armadura traz o teste e diz se a magia falhou.
 * Efeitos de magia aplicados pelos cartões guardam a CD de quem lançou; o cartão do Dissipar Magia rola
 * o Misticismo e traz um botão que remove, dos tokens selecionados, os efeitos de magia com CD até o
 * resultado.
 */
const DISPENSA = new Set(["Encouraçado Místico", "Conjurador Encouraçado"]);
const slug = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");

function armaduraVestida(actor) {
	return (actor.itemTypes?.equipamento ?? []).find((i) => equipado(i) && ["leve", "pesada"].includes(i.system?.tipo))?.system?.tipo ?? null;
}

function precisaDeTeste(item) {
	const actor = item.actor;
	if (actor?.type !== "character" || item.type !== "magia" || item.system?.tipo !== "arc") return false;
	const armadura = armaduraVestida(actor);
	if (!armadura || actor.items.some((i) => DISPENSA.has(i.name))) return false;
	const classe = slug(conjurador(actor, item).classe);
	if (!["arcanista", "bardo", "magimarcialista"].includes(classe)) return false;
	return !(["bardo", "magimarcialista"].includes(classe) && armadura === "leve");
}

async function testeDeArmadura(item, custo) {
	const actor = item.actor;
	const cd = 20 + (Number(custo) || 0);
	const shiftKey = game.settings.get("tormenta20", "UsageConfig") === "default";
	const teste = await actor.rollPericia("mist", { event: { shiftKey }, message: false });
	if (!teste) return;
	// Misticismo não leva a penalidade de armadura na ficha: entra aqui.
	const pericia = actor.system.pericias?.mist;
	const penalidade = pericia?.pda ? 0 : -Math.abs(Number(actor.system.attributes?.defesa?.pda) || 0);
	const total = teste.total + penalidade;
	const natural = teste.dice?.find((d) => d.faces === 20)?.total;
	const passou = natural === 20 || (natural !== 1 && total >= cd);
	const rotulo = `Misticismo de armadura (CD ${cd}${penalidade ? `, penalidade ${penalidade}` : ""}): ${passou ? "passou" : "FALHOU — a magia não funciona, mas gasta os PM"}`;
	item.system.rolled ??= {};
	item.system.rolled[rotulo] = teste;
}

/* -------------------------------------------- Dissipar Magia */

/** CD de quem lançou a magia que gerou o efeito. */
function cdDaOrigem(effect) {
	const origem = effect.origin ? foundry.utils.fromUuidSync(effect.origin, { strict: false }) : null;
	if (origem?.documentName !== "Item" || !["magia", "consumivel"].includes(origem.type)) return null;
	if (origem.type === "consumivel" && !["potion", "scroll"].includes(origem.system?.tipo)) return null;
	const cd = Number(origem.system?.resistencia?.cd);
	if (cd > 0) return cd;
	const actor = origem.actor;
	if (!actor) return null;
	const nivel = Math.floor((Number(actor.system.attributes?.nivel?.value) || 0) / 2);
	const atributo = atributoDeConjuracao(actor, origem) || origem.system?.resistencia?.atributo || actor.system.attributes?.conjuracao || "int";
	return actor.type === "npc" ? Number(actor.system.attributes?.cd) || 10 : 10 + nivel + (Number(actor.system.atributos?.[atributo]?.value) || 0);
}

async function rolarDissipar(item) {
	const shiftKey = game.settings.get("tormenta20", "UsageConfig") === "default";
	const teste = await item.actor.rollPericia("mist", { event: { shiftKey }, message: false });
	if (!teste) return;
	item.system.rolled ??= {};
	item.system.rolled[`Misticismo (Dissipar Magia): dissipa magias com CD até ${teste.total}`] = teste;
	item._t20cDissipar = teste.total;
}

async function postarBotao(item, total) {
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor: item.actor }),
		content: `<p><strong>Dissipar Magia</strong>: CD até ${total}.</p><button type="button" class="t20c-dissipar" data-total="${total}">Dissipar nos tokens selecionados</button>`,
		flags: { [MODULE_ID]: { dissipar: total } }
	});
}

async function dissipar(total) {
	const tokens = canvas.tokens?.controlled ?? [];
	if (!tokens.length) return ui.notifications.warn("Selecione os tokens das criaturas afetadas.");
	const linhas = [];
	for (const token of tokens) {
		const actor = token.actor;
		if (!actor) continue;
		const efeitos = actor.effects.filter((e) => Number(e.getFlag(MODULE_ID, "cdMagia")) > 0);
		const sai = efeitos.filter((e) => Number(e.getFlag(MODULE_ID, "cdMagia")) <= total);
		const fica = efeitos.filter((e) => !sai.includes(e));
		// Condições saem pelo sistema, para levar junto as condições filhas (paralisado → imóvel, indefeso).
		const condicoes = sai.filter((e) => e.statuses.size);
		const outros = sai.filter((e) => !e.statuses.size);
		if (outros.length) await actor.deleteEmbeddedDocuments("ActiveEffect", outros.map((e) => e.id));
		for (const e of condicoes) if (actor.effects.has(e.id)) await actor.toggleStatusEffect(e.statuses.first(), { active: false });
		linhas.push(`${token.name}: ${sai.length ? `dissipou ${sai.map((e) => e.name).join(", ")}` : "nada dissipado"}${fica.length ? `; resistiu: ${fica.map((e) => `${e.name} (CD ${e.getFlag(MODULE_ID, "cdMagia")})`).join(", ")}` : ""}`);
	}
	await ChatMessage.create({ content: `<p><strong>Dissipar Magia</strong> (CD até ${total})</p><ul>${linhas.map((l) => `<li>${l}</li>`).join("")}</ul>` });
}

export default {
	id: "magiaArmadura",
	name: "Magia arcana de armadura e Dissipar Magia",
	hint: "Magia arcana de classe lançada de armadura traz no cartão o teste de Misticismo (CD 20 + PM, com a penalidade de armadura) e avisa se falhou; bardo de armadura leve não testa (JdA p. 44, 171). O cartão do Dissipar Magia rola Misticismo e remove dos tokens selecionados os efeitos de magia com CD até o resultado (p. 191).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			try {
				if (precisaDeTeste(this)) await testeDeArmadura(this, config.options?.manaCost);
				if (this.type === "magia" && slug(this.name) === "dissiparmagia") await rolarDissipar(this);
			} catch (error) {
				warn("Falha no teste de magia.", error);
			}
			const resultado = await wrapped(config, ...args);
			if (this._t20cDissipar) await postarBotao(this, this._t20cDissipar).catch((error) => warn("Falha ao montar o Dissipar Magia.", error));
			return resultado;
		});
		// Efeito de magia aplicado a uma criatura: guarda a CD de quem lançou.
		Hooks.on("preCreateActiveEffect", (effect) => {
			if (effect.parent?.documentName !== "Actor" || effect.getFlag(MODULE_ID, "cdMagia")) return;
			try {
				const cd = cdDaOrigem(effect);
				if (cd) effect.updateSource({ [`flags.${MODULE_ID}.cdMagia`]: cd });
			} catch (error) {
				warn("Falha ao guardar a CD da magia.", error);
			}
		});
		Hooks.on("renderChatMessageHTML", (message, html) => {
			const botao = html.querySelector?.(".t20c-dissipar");
			if (!botao) return;
			botao.addEventListener("click", (event) => {
				event.preventDefault();
				dissipar(Number(botao.dataset.total)).catch((error) => warn("Falha ao dissipar.", error));
			});
		});
	}
};
