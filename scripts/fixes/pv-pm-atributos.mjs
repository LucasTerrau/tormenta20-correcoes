import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 17): "Se sua Constituição muda, seus PV aumentam ou diminuem retroativamente". Os PM
 * somam o atributo-chave, que também muda com ele.
 * Bug: o sistema calcula PV e PM antes de somar os bônus de atributo (o comentário do código diz que eles
 * "ignoram bônus de Atributo"). Amuleto da Robustez, Torque do Vigor, Manual da Saúde Corporal, Tiara da
 * Sapiência, Coroa Majestosa, Linhagem Feérica Superior… nunca mudavam PV nem PM.
 * Correção: no personagem, os bônus de atributo entram antes do cálculo de PV e PM (Constituição, ou o
 * atributo que a substitui, em cada nível; atributos-chave nos PM).
 */
export default {
	id: "pvPmAtributos",
	name: "PV e PM contam bônus de atributo",
	hint: "Bônus de Constituição de itens, magias e poderes mudam os PV retroativamente, e bônus no atributo-chave mudam os PM (JdA p. 17). O sistema calculava PV e PM sem esses bônus.",
	init() {
		wrap("CONFIG.Actor.dataModels.character.prototype.prepareDerivedData", function (wrapped, ...args) {
			// O sistema faz `valor += bônus` depois de calcular PV e PM: o bônus entra antes, e a soma dele vira 0.
			const guardados = [];
			try {
				for (const atr of Object.values(this.atributos ?? {})) {
					const bonus = Number(atr.bonus) || 0;
					if (!bonus) continue;
					guardados.push([atr, atr.bonus]);
					atr.value += bonus;
					atr.bonus = 0;
				}
			} catch (error) {
				warn("Falha ao somar bônus de atributo em PV e PM.", error);
			}
			try {
				return wrapped(...args);
			} finally {
				for (const [atr, bonus] of guardados) atr.bonus = bonus;
			}
		});
	}
};
