import { MODULE_ID } from "../constants.mjs";
import { aprimoramentosAplicados } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";
import { decideAqui } from "./poderes-automaticos.mjs";

/**
 * Poderes que dependem do uso e que um efeito sozinho não faz:
 * - Comunhão Suprema (místico 20, Guia de NPCs): imune ao tipo de dano da Afinidade escolhida; magias que causam esse
 *   dano ou são da escola do elemento custam metade (depois das outras reduções; o "custo /2" do sistema).
 * - Exercitar os Músculos Arcanos (Distinções): a partir do segundo uso na mesma cena, fatigado, cumulativo e mesmo
 *   para quem é imune (fatigado → exausto → inconsciente). A cena acaba no fim do combate ou no descanso.
 * - Campeão (guerreiro 20): Ataque Especial ou Golpe Pessoal que acerta devolve metade dos PM gastos nele. O acerto é
 *   decidido na mesa: um cartão com botão sai junto com o ataque.
 * - Aura Restauradora (Lena, JdA): curas usadas por você e por aliados a até 9m recuperam +1 PV por dado. O efeito do
 *   poder (+1 por dado no dano de cura) entra também nas opções de uso dos aliados próximos.
 */
const slug = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const tem = (actor, nome) => actor?.items?.some((i) => i.name === nome);

/** Afinidade (místico): elemento → tipo de dano, escola. A escolha fica na flag "elemento" do efeito ligado. */
const ELEMENTOS = {
	agua: { dano: "frio", escola: "enc" },
	ar: { dano: "eletricidade", escola: "ilu" },
	fogo: { dano: "fogo", escola: "tra" },
	luz: { dano: "luz", escola: "abj" },
	terra: { dano: "acido", escola: "con" },
	trevas: { dano: "trevas", escola: "nec" }
};

function elementoDaAfinidade(actor) {
	const afinidade = actor.itemTypes?.poder?.find((i) => i.name === "Afinidade" && slug(i.system?.subtipo) === "mistico");
	const ef = afinidade?.effects.find((e) => !e.disabled && e.getFlag(MODULE_ID, "elemento"));
	return ELEMENTOS[ef?.getFlag(MODULE_ID, "elemento")] ?? null;
}

const tiposDeDano = (magia) => new Set((magia.system?.rolls ?? []).flatMap((r) => (r.parts ?? []).map((p) => p?.[1])).filter(Boolean));

/** Comunhão Suprema: imunidade e metade do custo nas magias certas (só na memória, a cada preparo). */
function comunhaoSuprema(actor) {
	const item = actor.itemTypes?.poder?.find((i) => i.name === "Comunhão Suprema");
	if (!item) return;
	const elemento = elementoDaAfinidade(actor);
	if (!elemento) return;
	const rd = actor.system?.tracos?.resistencias?.[elemento.dano];
	if (rd) rd.imunidade = true;
	const nomes = actor.itemTypes.magia.filter((m) => m.system?.escola === elemento.escola || tiposDeDano(m).has(elemento.dano)).map((m) => m.name);
	for (const ef of item.effects) {
		const uso = ef.system?.abilityUse;
		if (!ef.system?.onuse || !uso) continue;
		uso.types = new Set();
		uso.names = new Set(nomes);
		uso.automatic = true;
	}
}

/* -------------------------------------------- Exercitar os Músculos Arcanos */

const ESCALA_DA_FADIGA = ["fatigado", "exausto", "inconsciente"];

async function exercitar(actor) {
	const marca = actor.getFlag(MODULE_ID, "exercitar") ?? {};
	const cena = game.combat?.id ?? "fora-de-combate";
	const usos = marca.cena === cena ? (marca.usos ?? 0) + 1 : 1;
	await actor.setFlag(MODULE_ID, "exercitar", { cena, usos });
	if (usos < 2) return;
	// Cumulativa: quem já está fatigado fica exausto; exausto, inconsciente. Vale mesmo com imunidade.
	const atual = ESCALA_DA_FADIGA.findLastIndex((s) => actor.statuses?.has(s));
	const proxima = ESCALA_DA_FADIGA[Math.min(atual + 1, ESCALA_DA_FADIGA.length - 1)];
	await actor.toggleStatusEffect(proxima, { active: true });
	const ef = actor.effects.find((e) => e.statuses?.has(proxima));
	if (ef && !ef.getFlag("tormenta20", "ignoreImunity")) await ef.setFlag("tormenta20", "ignoreImunity", true);
	ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<p><strong>Exercitar os Músculos Arcanos</strong> (${usos}º uso na cena): ${foundry.utils.escapeHTML(actor.name)} fica ${proxima}.</p>` });
}

/* -------------------------------------------- Campeão */

async function cartaoDoCampeao(actor, gasto) {
	const recupera = Math.floor(gasto / 2);
	if (recupera < 1) return;
	const donos = game.users.filter((u) => actor.testUserPermission(u, "OWNER")).map((u) => u.id);
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		whisper: donos,
		content: `<div class="t20c-aviso-nivel"><p><strong>Campeão</strong>: ${gasto} PM em Ataque Especial/Golpe Pessoal.</p><button type="button" data-t20c-campeao="${actor.uuid}" data-valor="${recupera}"><i class="fa-solid fa-rotate-left"></i> Acertou o ataque: recuperar ${recupera} PM</button></div>`
	});
}

/* -------------------------------------------- Aura Restauradora */

/** Efeitos da Aura Restauradora de aliados a até 9m do token deste ator. */
function aurasProximas(actor) {
	if (!canvas?.ready) return [];
	const meu = actor.getActiveTokens()?.[0];
	if (!meu) return [];
	const lista = [];
	for (const token of canvas.tokens.placeables) {
		const outro = token.actor;
		if (!outro || outro === actor || token.document.disposition !== meu.document.disposition) continue;
		const item = outro.itemTypes?.poder?.find((i) => i.name === "Aura Restauradora");
		if (!item) continue;
		// Pela posição gravada (o centro do desenho fica para trás enquanto o token anda).
		const centro = (t) => ({ x: t.document.x + (t.document.width * canvas.grid.size) / 2, y: t.document.y + (t.document.height * canvas.grid.size) / 2 });
		const distancia = canvas.grid.measurePath([centro(meu), centro(token)]).distance;
		if (distancia > 9) continue;
		lista.push(...item.effects.filter((e) => e.system?.onuse));
	}
	return lista;
}

export default {
	id: "poderesDeUso",
	name: "Poderes de uso (Comunhão Suprema, Exercitar, Campeão, Aura Restauradora)",
	hint: "Comunhão Suprema: imunidade e metade do custo pelo elemento da Afinidade. Exercitar os Músculos Arcanos: fadiga cumulativa a partir do segundo uso na cena. Campeão: botão para recuperar metade dos PM do Ataque Especial ou Golpe Pessoal que acertou. Aura Restauradora: +1 PV por dado nas curas suas e de aliados a até 9m.",
	init() {
		wrap("CONFIG.Actor.documentClass.prototype.applyActiveEffects", function (wrapped, phase, ...args) {
			const resultado = wrapped(phase, ...args);
			if (phase === "final") {
				try {
					comunhaoSuprema(this);
				} catch (error) {
					warn("Falha na Comunhão Suprema.", error);
				}
			}
			return resultado;
		});
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const lista = wrapped(...args);
			try {
				const tipo = { magia: "spell", poder: "power", consumivel: "consumable" }[this.type];
				if (tipo && this.actor && Array.isArray(lista)) for (const ef of aurasProximas(this.actor)) if (!lista.includes(ef) && ef.system.abilityUse?.types?.has?.(tipo)) lista.push(ef);
			} catch (error) {
				warn("Falha na Aura Restauradora.", error);
			}
			return lista;
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				const actor = item?.actor;
				if (resultado && actor) {
					const usados = aprimoramentosAplicados({ applicableOnUseEffects: item.applicableOnUseEffects ?? item._allApplicableOnUseEffects?.() ?? [] }, resultado);
					if (usados.some(({ effect }) => effect.parent?.name === "Exercitar os Músculos Arcanos")) await exercitar(actor);
					if (tem(actor, "Campeão")) {
						const gasto = usados.filter(({ effect }) => /^(Ataque Especial|Golpe Pessoal)/.test(effect.parent?.name ?? effect.name ?? "")).reduce((s, { effect, qty }) => s + (Number(effect.system?.abilityUse?.custo) || 0) * qty, 0);
						if (gasto > 0) await cartaoDoCampeao(actor, gasto);
					}
				}
			} catch (error) {
				warn("Falha nos poderes de uso.", error);
			}
			return resultado;
		});
		Hooks.on("renderChatMessageHTML", (message, html) => {
			const botao = html.querySelector?.("[data-t20c-campeao]");
			if (!botao) return;
			botao.addEventListener("click", async () => {
				const actor = await fromUuid(botao.dataset.t20cCampeao);
				if (!actor?.isOwner) return ui.notifications.warn("Só o dono do personagem usa esse botão.");
				if (message.getFlag(MODULE_ID, "usado")) return ui.notifications.info("Os PM já foram recuperados.");
				await actor.modifyTokenAttribute("attributes.pm", Number(botao.dataset.valor) || 0, true, true);
				await message.setFlag(MODULE_ID, "usado", true);
				ui.notifications.info(`${actor.name} recuperou ${botao.dataset.valor} PM (Campeão).`);
			});
		});
		// Fim da cena: a contagem do Exercitar recomeça.
		const zerar = (actor) => actor?.getFlag(MODULE_ID, "exercitar") && actor.unsetFlag(MODULE_ID, "exercitar");
		Hooks.on("deleteCombat", (combat) => {
			for (const c of combat.combatants ?? []) if (c.actor && decideAqui(c.actor)) zerar(c.actor);
		});
		Hooks.on("t20cDescanso", (actor) => zerar(actor));
	}
};
