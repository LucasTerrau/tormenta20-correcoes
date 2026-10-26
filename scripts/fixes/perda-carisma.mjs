import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 136): "Quando escolhe um poder da Tormenta, você perde 1 de Carisma. Para cada dois outros
 * poderes da Tormenta, você perde mais 1 de Carisma." Exceções: os bônus da Deformidade (Lefou, p. 30) e o
 * poder trocado por um deles não contam; Afinidade com a Tormenta (p. 138): "seu primeiro poder da
 * Tormenta não conta"; Linhagem Rubra Básica (p. 39): pode perder outro atributo em vez de Carisma.
 * O sistema só contava os poderes para as fórmulas (@Tormenta): o Carisma nunca caía.
 * Correção: no personagem, o atributo cai antes do cálculo de PV e PM (o PM de quem conjura com Carisma
 * cai junto). Poder marcado com a flag "semPerdaDeCarisma" (o trocado pela Deformidade) não conta; a
 * flag "atributoDaTormenta" do personagem escolhe outro atributo (Linhagem Rubra Básica).
 */
const NAO_CONTAM = /^(deformidade|linhagem rubra)/i;

export function perdaPelaTormenta(actor) {
	let n = 0;
	for (const item of actor.items) {
		const tags = item.system?.rolltags ?? [];
		if (![...tags].some((t) => String(t).toLowerCase() === "tormenta")) continue;
		if (NAO_CONTAM.test(item.name) || item.getFlag?.(MODULE_ID, "semPerdaDeCarisma")) continue;
		n++;
	}
	if (actor.items.some((i) => i.name === "Afinidade com a Tormenta")) n--;
	return n > 0 ? 1 + Math.floor((n - 1) / 2) : 0;
}

export default {
	id: "perdaCarisma",
	name: "Poderes da Tormenta tiram Carisma",
	hint: "O primeiro poder da Tormenta tira 1 de Carisma, e cada dois outros tiram mais 1 (JdA p. 136). Deformidade e as heranças da Linhagem Rubra não contam; Afinidade com a Tormenta ignora o primeiro.",
	init() {
		wrap("CONFIG.Actor.dataModels.character.prototype.prepareDerivedData", function (wrapped, ...args) {
			try {
				const actor = this.parent;
				const perda = perdaPelaTormenta(actor);
				const chave = actor.getFlag(MODULE_ID, "atributoDaTormenta") || "car";
				if (perda && this.atributos?.[chave]) this.atributos[chave].value -= perda;
			} catch (error) {
				warn("Falha ao aplicar a perda de Carisma da Tormenta.", error);
			}
			return wrapped(...args);
		});
	}
};
