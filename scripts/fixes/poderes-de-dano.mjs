import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";
import { decideAqui } from "./poderes-automaticos.mjs";

/**
 * Poderes que reagem ao dano recebido e que um efeito não representa:
 * - Ossos Frágeis (kliren, JdA): "sofre 1 ponto de dano adicional por dado de dano de impacto" (clava 1d6 → 1d6+1).
 *   Na aplicação do dano, a RD de impacto cai em 1 por dado de impacto da rolagem (RD negativa soma dano).
 * - Resiliência Marcial (guerreiro, HdA): "sempre que sofrer dano letal, RD 1 cumulativa (limitada pelo seu nível)", até
 *   o fim da cena ou até recuperar PV. Um contador no personagem (@resilienciaMarcial no efeito do poder) sobe a cada
 *   dano letal, volta a 0 quando os PV sobem e quando o combate acaba.
 */
const sabor = (roll, termo, padrao) => termo.options?.flavor ?? roll.terms[0]?.options?.flavor ?? padrao;
const tem = (actor, nome) => actor?.items?.some((i) => i.name === nome);

function dadosDeImpacto(roll, padrao) {
	let n = 0;
	for (const t of roll?.terms ?? []) if (t.faces && t.number && sabor(roll, t, padrao) === "impacto") n += Number(t.number) || 0;
	return n;
}

async function zerarResiliencia(actor) {
	if (actor && (Number(actor.getFlag(MODULE_ID, "resilienciaMarcial")) || 0) > 0) await actor.setFlag(MODULE_ID, "resilienciaMarcial", 0);
}

export default {
	id: "poderesDeDano",
	name: "Poderes que reagem ao dano (Ossos Frágeis, Resiliência Marcial)",
	hint: "Ossos Frágeis soma +1 de dano por dado de impacto recebido; Resiliência Marcial dá RD 1 cumulativa a cada dano letal (até o nível), que some ao recuperar PV ou no fim do combate.",
	init() {
		wrap("CONFIG.Actor.documentClass.prototype.applyDamageV2", async function (wrapped, roll, multiplier = 1, type = "dano", ...args) {
			const rds = this.system?.tracos?.resistencias;
			let fragil = 0;
			try {
				if (multiplier > 0 && rds?.impacto && tem(this, "Ossos Frágeis")) {
					fragil = dadosDeImpacto(roll, type);
					if (fragil) rds.impacto.value = (Number(rds.impacto.value) || 0) - fragil;
				}
			} catch (error) {
				warn("Falha no dano de Ossos Frágeis.", error);
			}
			const pvAntes = Number(this.system?.attributes?.pv?.value) || 0;
			let resultado;
			try {
				resultado = await wrapped(roll, multiplier, type, ...args);
			} finally {
				if (fragil) rds.impacto.value = (Number(rds.impacto.value) || 0) + fragil;
			}
			try {
				const letal = multiplier > 0 && !roll?.options?.t20cNaoLetal && (Number(this.system?.attributes?.pv?.value) || 0) < pvAntes;
				if (letal && tem(this, "Resiliência Marcial")) {
					const nivel = Number(this.system.attributes?.nivel?.value) || 1;
					const atual = Number(this.getFlag(MODULE_ID, "resilienciaMarcial")) || 0;
					if (atual < nivel) await this.setFlag(MODULE_ID, "resilienciaMarcial", atual + 1);
				}
			} catch (error) {
				warn("Falha na Resiliência Marcial.", error);
			}
			return resultado;
		});
		// Recuperou PV: a Resiliência Marcial zera.
		Hooks.on("preUpdateActor", (actor, changes, options) => {
			const novo = foundry.utils.getProperty(changes, "system.attributes.pv.value");
			if (novo !== undefined && Number(novo) > (Number(actor.system?.attributes?.pv?.value) || 0)) options.t20cRecuperouPV = true;
		});
		Hooks.on("updateActor", (actor, changes, options, userId) => {
			if (options.t20cRecuperouPV && userId === game.userId) zerarResiliencia(actor).catch((error) => warn("Falha ao zerar a Resiliência Marcial.", error));
		});
		// Fim do combate (fim da cena): zera.
		Hooks.on("deleteCombat", (combat) => {
			for (const c of combat.combatants ?? []) if (c.actor && decideAqui(c.actor)) zerarResiliencia(c.actor).catch(() => {});
		});
		wrap("CONFIG.Actor.documentClass.prototype.getRollData", function (wrapped, ...args) {
			const data = wrapped(...args);
			if (data) data.resilienciaMarcial = Number(this.flags?.[MODULE_ID]?.resilienciaMarcial) || 0;
			return data;
		});
	}
};
