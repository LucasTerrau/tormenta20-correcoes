import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 236, "Ferimentos & Morte"):
 * - com 0 PV ou menos, a criatura cai inconsciente e fica sangrando (o teste de Constituição do
 *   início do turno é a correção "Sangrando");
 * - quem passou no teste estabiliza, mas volta a sangrar se perder mais PV;
 * - um personagem sangrando estabiliza com qualquer efeito que cure pelo menos 1 PV;
 * - quem volta a ter 1 PV ou mais recobra a consciência;
 * - morre com –10 PV ou com um número negativo igual à metade dos PV totais, o que for mais baixo
 *   (com 12 PV morre em –10; com 30 PV, em –15).
 * O sistema travava o PV em –metade (com 12 PV, nunca passava de –6) e não aplicava condição nenhuma.
 * Correção: o mínimo passa a ser –10 ou –metade (o mais baixo); as condições entram e saem pela mudança
 * de PV, no cliente de quem mudou o PV. Ao chegar no mínimo, a criatura fica "morta" (e derrotada no
 * combate).
 */
const PV = "system.attributes.pv.value";

export function pvMinimo(max) {
	return -Math.max(10, Math.floor((Number(max) || 0) / 2));
}

async function ligar(actor, status, ativo) {
	if (actor.statuses?.has(status) === ativo) return;
	if (!CONFIG.statusEffects?.[status]) return;
	await actor.toggleStatusEffect(status, { active: ativo });
}

async function marcarDerrotado(actor) {
	for (const combatente of game.combat?.combatants ?? []) {
		if (combatente.actor === actor && !combatente.isDefeated) await combatente.update({ defeated: true });
	}
}

async function aoMudarPV(actor, antes, agora, naoLetal = false) {
	const max = actor.system.attributes.pv.max;
	if (agora <= pvMinimo(max)) {
		await ligar(actor, "morto", true);
		await marcarDerrotado(actor);
		return;
	}
	if (agora >= 1) {
		if (antes <= 0) {
			await ligar(actor, "inconsciente", false);
			await ligar(actor, "sangrando", false);
		}
		return;
	}
	// 0 PV ou menos (dano não letal só deixa inconsciente).
	if (antes > 0) {
		await ligar(actor, "inconsciente", true);
		if (!naoLetal) await ligar(actor, "sangrando", true);
	} else if (agora < antes) {
		// Estabilizado que perdeu mais PV volta a sangrar.
		await ligar(actor, "sangrando", true);
	} else if (agora > antes) {
		// Curou pelo menos 1 PV sem chegar a 1: estabiliza.
		await ligar(actor, "sangrando", false);
	}
}

export default {
	id: "ferimentos",
	name: "0 PV e morte",
	hint: "Com 0 PV ou menos: inconsciente e sangrando; volta a sangrar se perder mais PV; estabiliza com qualquer cura; acorda com 1 PV ou mais. Morre com –10 PV ou –metade dos PV totais, o que for mais baixo (o sistema travava em –metade). JdA p. 236.",
	init() {
		for (const tipo of ["character", "npc"]) {
			wrap(`CONFIG.Actor.dataModels.${tipo}.prototype.prepareDerivedData`, function (wrapped, ...args) {
				const resultado = wrapped(...args);
				const pv = this.attributes?.pv;
				if (pv && Number(pv.max) > 0) pv.min = pvMinimo(pv.max);
				return resultado;
			});
		}
		Hooks.on("preUpdateActor", (actor, changes, options) => {
			if (!foundry.utils.hasProperty(changes, PV)) return;
			const antes = Number(actor.system.attributes?.pv?.value);
			options.t20cPvAntes = antes;
			// Dano não letal (correção "Dano especial"): leva no máximo a 0 PV; abaixo disso não faz nada.
			if (actor._t20cNaoLetal) {
				const novo = Number(foundry.utils.getProperty(changes, PV));
				if (novo < antes) foundry.utils.setProperty(changes, PV, antes > 0 ? Math.max(0, novo) : antes);
				options.t20cNaoLetal = true;
			}
		});
		Hooks.on("updateActor", (actor, changes, options, userId) => {
			if (userId !== game.userId || !foundry.utils.hasProperty(changes, PV) || !Number.isFinite(options.t20cPvAntes)) return;
			const agora = Number(actor.system.attributes?.pv?.value);
			if (agora === options.t20cPvAntes) return;
			aoMudarPV(actor, options.t20cPvAntes, agora, Boolean(options.t20cNaoLetal)).catch((error) => warn("Falha ao aplicar 0 PV ou morte.", error));
		});
	}
};
