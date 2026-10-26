import { MODULE_ID } from "../constants.mjs";
import { aplicarPatches, efeitoContador, gravarContador, itemPorNome, slug, temItem, turnoAtual } from "../contadores.mjs";
import { aprimoramentosAplicados, conjurador } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";
import { bloquear, linhas } from "./dialogo-magia.mjs";

/**
 * Magimarcialista (variante de Bardo, Heróis de Arton p. 33–34):
 * - Cadência Magimarcial: magia de bardo dá uma carga arcana; a ação agredir dá uma carga marcial. Máximo
 *   de cada tipo igual ao Carisma (Carisma 0 ou menos: nenhuma); duram até o fim da cena.
 * - Magificação: com pelo menos 1 de cada, +2 em ataque e dano (+1 a cada cinco níveis), em magias também.
 * - Bravado Magimarcial (1 marcial: –1 PM numa magia; 1 arcana: +1d6 num ataque) e Dança Defensiva
 *   (1 marcial: +5 numa resistência; 1 arcana: RD 10 contra um dano). Arte Sublime: uma carga a mais do
 *   mesmo tipo dobra o efeito.
 * - Crescendo Vitorioso: +1 de cada no início do combate; cargas marciais somam na CD das habilidades e
 *   magias de bardo; cargas arcanas, em ataque e dano.
 * O sistema não tinha onde guardar as cargas: tudo era marcado à mão.
 * Correção: as cargas ficam num efeito do personagem ("Cadência: 2 arcanas, 1 marcial") que some no fim
 * da cena e carrega a Magificação e o Crescendo. Ganhos e gastos entram depois de cada uso (a carga ganha
 * num uso não vale nele; gastar a última mantém a Magificação daquele ataque). Só uma carga marcial por
 * turno, e só no próprio turno (reações não contam). A RD da Dança Defensiva é oferecida ao aplicar dano.
 */
const PATCHES = {
	PyGs677LM9iykYcb: { item: "Bravado Magimarcial", patch: { flags: { [MODULE_ID]: { gastaCarga: "marcial" } }, system: { abilityUse: { aumenta: true } } } },
	BFEAnBhm1PhLqeFJ: { item: "Bravado Magimarcial", patch: { flags: { [MODULE_ID]: { gastaCarga: "arcana" } }, system: { abilityUse: { aumenta: true } } } },
	FtFf6jnkIQgLY7fr: { item: "Dança Defensiva", patch: { flags: { [MODULE_ID]: { gastaCarga: "marcial" } }, system: { abilityUse: { aumenta: true } } } },
	oHVsK6Fig41hK42D: { item: "Magificação", patch: { system: { abilityUse: { types: [] } } } }
};

const temCadencia = (actor) => temItem(actor, "cadenciamagimarcial");
export const maximoCargas = (actor) => Math.max(0, Number(actor?.system?.atributos?.car?.value) || 0);

export function lerCargas(actor) {
	const f = efeitoContador(actor, "cargas")?.flags?.[MODULE_ID] ?? {};
	return { arcanas: Number(f.arcanas) || 0, marciais: Number(f.marciais) || 0 };
}

function nivelMagimarcialista(actor) {
	return Number(actor.items.find((i) => i.type === "classe" && slug(i.name) === "magimarcialista")?.system?.niveis) || 1;
}

function dadosDasCargas(actor, { arcanas, marciais }, extra) {
	const changes = [];
	const add = (key, value) => changes.push({ key, type: "add", value: String(value), phase: "initial", priority: null });
	if (temItem(actor, "magificacao") && arcanas >= 1 && marciais >= 1) {
		const b = 2 + Math.floor((nivelMagimarcialista(actor) - 1) / 5);
		add("system.modificadores.ataque.geral", b);
		add("system.modificadores.dano.geral", b);
	}
	if (temItem(actor, "crescendovitorioso") && arcanas >= 1) {
		add("system.modificadores.ataque.geral", arcanas);
		add("system.modificadores.dano.geral", arcanas);
	}
	const cad = itemPorNome(actor, "cadenciamagimarcial");
	return {
		name: `Cadência: ${arcanas} arcana${arcanas === 1 ? "" : "s"}, ${marciais} marcia${marciais === 1 ? "l" : "is"}${changes.length ? " (Magificação)" : ""}`,
		img: cad?.img ?? "icons/svg/aura.svg",
		origin: cad?.uuid,
		transfer: false,
		duration: { expiry: "sceneEnd", units: "rounds", value: null },
		system: { changes },
		flags: { [MODULE_ID]: { ...extra, arcanas, marciais, fonte: "sempre" } }
	};
}

export async function alterarCargas(actor, delta, extra = {}) {
	const max = maximoCargas(actor);
	const antes = lerCargas(actor);
	const depois = {
		arcanas: Math.clamp(antes.arcanas + (delta.arcanas ?? 0), 0, max),
		marciais: Math.clamp(antes.marciais + (delta.marciais ?? 0), 0, max)
	};
	const anteriores = efeitoContador(actor, "cargas")?.flags?.[MODULE_ID] ?? {};
	const vazio = !depois.arcanas && !depois.marciais;
	await gravarContador(actor, "cargas", vazio ? null : dadosDasCargas(actor, depois, { marcialNoTurno: anteriores.marcialNoTurno, ...extra }));
	return { antes, depois, max };
}

function ehMagiaDeBardo(item) {
	if (item.type !== "magia" || !["arc", "uni"].includes(item.system?.tipo)) return false;
	return ["magimarcialista", "bardo"].includes(slug(conjurador(item.actor, item).classe));
}

/** Ganhos e gastos de um uso de item (magia ou ataque). */
async function processarUso(item, options) {
	const actor = item.actor;
	const delta = { arcanas: 0, marciais: 0 };
	const motivos = [];
	for (const { effect, qty } of aprimoramentosAplicados(item, options)) {
		const tipo = effect.getFlag?.(MODULE_ID, "gastaCarga");
		if (!tipo || qty <= 0) continue;
		delta[tipo === "arcana" ? "arcanas" : "marciais"] -= qty;
		motivos.push(`–${qty} ${tipo}${qty > 1 ? " (Arte Sublime)" : ""}`);
	}
	if (ehMagiaDeBardo(item)) {
		delta.arcanas += 1;
		motivos.push("+1 arcana (magia de bardo)");
	}
	const extra = {};
	const agredir = item.type === "arma" && Object.values(item.system.rolled ?? {}).some((r) => r?.dice?.[0]?.faces === 20);
	if (agredir) {
		// Em combate (do qual o personagem participa), só a ação agredir do próprio turno, uma vez por turno.
		const emCombate = Boolean(game.combat?.started && game.combat.combatants.some((c) => c.actor === actor));
		const turno = emCombate ? turnoAtual() : null;
		const noProprioTurno = !emCombate || game.combat.combatant?.actor === actor;
		const jaGanhou = turno && efeitoContador(actor, "cargas")?.getFlag(MODULE_ID, "marcialNoTurno") === turno;
		if (noProprioTurno && !jaGanhou) {
			delta.marciais += 1;
			motivos.push("+1 marcial (agredir)");
			if (turno) extra.marcialNoTurno = turno;
		}
	}
	if (!motivos.length) return null;
	const { antes, depois, max } = await alterarCargas(actor, delta, extra);
	return `Cadência: arcanas ${antes.arcanas} → ${depois.arcanas}/${max}, marciais ${antes.marciais} → ${depois.marciais}/${max} (${motivos.join("; ")}).`;
}

function prepararDialogo(app, root) {
	const actor = app.item?.actor;
	if (!temCadencia(actor)) return;
	const { arcanas, marciais } = lerCargas(actor);
	const max = maximoCargas(actor);
	const arte = temItem(actor, "artesublime");
	const lista = linhas(app, root).filter((l) => l.effect.getFlag?.(MODULE_ID, "gastaCarga"));
	if (!lista.length) return;
	const aviso = document.createElement("p");
	aviso.style.cssText = "margin: 0.25em 0; font-size: 0.9em;";
	aviso.textContent = `Cadência Magimarcial: ${arcanas}/${max} arcanas · ${marciais}/${max} marciais.`;
	lista[0].li.parentElement?.before(aviso);
	for (const linha of lista) {
		const tipo = linha.effect.getFlag(MODULE_ID, "gastaCarga");
		const tem = tipo === "arcana" ? arcanas : marciais;
		const teto = Math.min(tem, arte ? 2 : 1);
		if (teto <= 0) {
			bloquear(linha, `Sem cargas ${tipo === "arcana" ? "arcanas" : "marciais"} (Heróis p. 34).`);
			linha.li.dataset.t20cFixo = "1";
			continue;
		}
		linha.li.dataset.t20cMaximo = String(teto);
		if (linha.input.type === "number") {
			linha.input.max = teto;
			linha.input.addEventListener("change", () => {
				if (Number(linha.input.value) > teto) linha.input.value = teto;
			});
		}
	}
}

async function perguntarDanca(actor) {
	const { arcanas } = lerCargas(actor);
	if (!temItem(actor, "dancadefensiva") || arcanas < 1) return 0;
	const botoes = [{ action: "0", label: "Não", default: true }, { action: "1", label: "1 carga arcana: RD 10" }];
	if (temItem(actor, "artesublime") && arcanas >= 2) botoes.push({ action: "2", label: "2 cargas: RD 20 (Arte Sublime)" });
	const escolha = await foundry.applications.api.DialogV2.wait({
		window: { title: `${actor.name}: Dança Defensiva` },
		content: `<p>${actor.name} pode gastar carga arcana para receber RD 10 contra este dano.</p>`,
		buttons: botoes,
		rejectClose: false
	});
	return Number(escolha) || 0;
}

export default {
	id: "cargasMagimarciais",
	name: "Magimarcialista: cargas arcanas e marciais",
	hint: "Guarda as cargas da Cadência Magimarcial num efeito do personagem (some no fim da cena): magia de bardo dá carga arcana, a ação agredir dá carga marcial (uma por turno), limite igual ao Carisma. Magificação vale sozinha com 1 de cada; Bravado e Dança Defensiva gastam as cargas (2 com Arte Sublime, efeito dobrado); a RD da Dança é oferecida ao aplicar dano; Crescendo Vitorioso soma na CD e no ataque (Heróis de Arton p. 33–34).",
	init() {
		wrap("CONFIG.Item.documentClass.migrateData", function (wrapped, source, ...args) {
			try {
				aplicarPatches(source, PATCHES);
			} catch (error) {
				warn("Falha nos dados do Magimarcialista.", error);
			}
			return wrapped(source, ...args);
		});
		wrap("CONFIG.Actor.documentClass.prototype.getRollData", function (wrapped, ...args) {
			const data = wrapped(...args);
			data.cargas = { ...lerCargas(this), maximo: maximoCargas(this) };
			return data;
		});
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			if (!root) return;
			try {
				prepararDialogo(app, root);
			} catch (error) {
				warn("Falha no diálogo das cargas.", error);
			}
		});
		// Testes de resistência (Dança Defensiva +5): o gasto entra logo depois do diálogo.
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				if (resultado && ["pericia", "atributo"].includes(item?.type) && temCadencia(item.actor)) {
					let marciais = 0;
					for (const { effect, qty } of aprimoramentosAplicados(item, resultado)) if (effect.getFlag?.(MODULE_ID, "gastaCarga") === "marcial") marciais += qty;
					if (marciais) await alterarCargas(item.actor, { marciais: -marciais });
				}
			} catch (error) {
				warn("Falha ao gastar as cargas.", error);
			}
			return resultado;
		});
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			let nota = null;
			try {
				if (config.options && temCadencia(this.actor)) nota = await processarUso(this, config.options);
				if (nota) this.system.chatFlavor = [this.system.chatFlavor, nota].filter(Boolean).join(" ");
			} catch (error) {
				warn("Falha ao contar as cargas.", error);
			}
			return wrapped(config, ...args);
		});
		// Crescendo Vitorioso: cargas marciais na CD das habilidades e magias de bardo.
		wrap("CONFIG.Item.documentClass.prototype.prepareFinalAttributes", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const actor = this.actor;
			const resistencia = this.system?.resistencia;
			if (actor && Number(resistencia?.cd) > 0 && temItem(actor, "crescendovitorioso")) {
				const deBardo = (this.type === "poder" && ["bardo", "magimarcialista"].includes(slug(this.system?.subtipo))) || ehMagiaDeBardo(this);
				const { marciais } = lerCargas(actor);
				if (deBardo && marciais) {
					resistencia.cd += marciais;
					this._prepareLabels?.();
				}
			}
			return resultado;
		});
		Hooks.on("combatStart", (combat) => {
			if (!game.user.isActiveGM) return;
			for (const c of combat.combatants) {
				if (c.actor && temItem(c.actor, "crescendovitorioso")) alterarCargas(c.actor, { arcanas: 1, marciais: 1 }).catch((error) => warn("Falha no Crescendo Vitorioso.", error));
			}
		});
		// Dança Defensiva: RD 10 por carga arcana contra o dano aplicado.
		wrap("CONFIG.Actor.documentClass.prototype.applyDamageV2", async function (wrapped, roll, multiplier = 1, ...args) {
			let n = 0;
			const rds = this.system?.tracos?.resistencias;
			try {
				const temDano = roll?.terms?.some((t) => !t.operator && !["curapv", "curatpv", "curapm", "curatpm", "perda"].includes(t.options?.flavor ?? roll.terms[0]?.options?.flavor));
				if (multiplier > 0 && temDano && rds?.dano && temCadencia(this)) n = await perguntarDanca(this);
				if (n) rds.dano.value = (Number(rds.dano.value) || 0) + 10 * n;
			} catch (error) {
				warn("Falha na Dança Defensiva.", error);
			}
			try {
				return await wrapped(roll, multiplier, ...args);
			} finally {
				if (n) {
					rds.dano.value = Math.max(0, (Number(rds.dano.value) || 0) - 10 * n);
					await alterarCargas(this, { arcanas: -n });
					await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this }), content: `<p>Dança Defensiva: RD ${10 * n} contra este dano (–${n} carga arcana).</p>` });
				}
			}
		});
	}
};
