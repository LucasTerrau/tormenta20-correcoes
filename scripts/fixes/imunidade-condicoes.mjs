import { wrap, warn } from "../util.mjs";

/**
 * Bug: imunidade a condição dada por efeito (poder, magia, item, tipo de criatura) não impedia a condição. O Foundry
 * decide quais efeitos estão ativos antes de aplicar qualquer alteração; a condição perguntava pelas imunidades
 * (system.tracos.ic.value) quando só as da ficha estavam lá, e o –2 do Abalado continuava nas perícias e nos testes
 * de resistência, embora o efeito aparecesse como suprimido. Só a imunidade marcada à mão na ficha funcionava.
 * Correção: antes de cada fase, as imunidades a condição dos efeitos ativos entram primeiro; a aplicação normal
 * repete a mesma alteração (somar a um conjunto não duplica).
 */
const CHAVE = "system.tracos.ic.value";

function imunidadesPrimeiro(actor, phase) {
	if (!actor.system?.tracos?.ic) return;
	const ActiveEffect = foundry.documents.ActiveEffect.implementation;
	let rollData;
	for (const effect of actor.allApplicableEffects()) {
		// Condição não dá imunidade a condição (e é ela que precisa saber das imunidades).
		if (effect.statuses?.size) continue;
		const changes = (effect.system?.changes ?? []).filter((c) => c.key === CHAVE);
		if (!changes.length || !effect.active) continue;
		rollData ??= actor.getRollData();
		const replacementData = effect.getReplacementData(rollData);
		for (const change of changes) {
			if (!effect.shouldApplyChange(change, { phase, replacementData })) continue;
			ActiveEffect.applyChange(actor, { ...foundry.utils.deepClone(change), effect }, { replacementData });
		}
	}
}

export default {
	id: "imunidadeCondicoes",
	name: "Imunidade a condição vinda de efeito",
	hint: "Imunidade a condição dada por poder, magia, item ou efeito (imune a medo, a paralisia…) passa a impedir a condição na hora. Antes a condição aparecia como suprimida, mas as penalidades dela continuavam valendo.",
	init() {
		wrap("CONFIG.Actor.documentClass.prototype.applyActiveEffects", function (wrapped, phase, ...args) {
			try {
				imunidadesPrimeiro(this, phase);
			} catch (error) {
				warn("Falha ao aplicar as imunidades a condição antes das condições.", error);
			}
			return wrapped(phase, ...args);
		});
	}
};
