import { wrap } from "../util.mjs";

/**
 * Bug: a penalidade de armadura da Defesa (system.attributes.defesa.pda) é um campo que transforma
 * qualquer valor em negativo. Efeitos que reduzem a penalidade (Ajustada –1, Sob Medida –2, Mitral –2;
 * JdA p. 164–167) viravam penalidade a mais, igual à Reforçada (+1).
 * Correção: o valor do efeito é lido com sinal (positivo aumenta a penalidade, negativo diminui) e o
 * total, somado à penalidade dos itens equipados, nunca vira bônus.
 */
const CAMPO = "system.attributes.defesa.pda";

/** Penalidade (positiva) dos itens que o sistema soma depois em prepareDefense. */
function penalidadeDosItens(actor) {
	const slots = game.settings.get("tormenta20", "equipmentSlots");
	return (actor.itemTypes?.equipamento ?? [])
		.filter((i) => (slots ? i.system.equipado2?.slot : i.system.equipado))
		.reduce((soma, i) => soma + Math.abs(Number(i.system.armadura?.penalidade) || 0), 0);
}

export default {
	id: "penalidadeArmadura",
	name: "Penalidade de armadura: reduções reduzem",
	hint: "Ajustada, Sob Medida e Mitral reduzem a penalidade de armadura, como no livro (antes aumentavam). A penalidade nunca vira bônus.",
	init() {
		wrap("CONFIG.Actor.documentClass.prototype.applyActiveEffects", function (wrapped, phase, ...args) {
			if (phase === "initial") this._t20cPda = 0;
			return wrapped(phase, ...args);
		});
		wrap("CONFIG.ActiveEffect.documentClass.applyChange", function (wrapped, targetDoc, change, opcoes = {}, ...args) {
			const delta = Number(change?.value);
			const defesa = targetDoc?.system?.attributes?.defesa;
			if (change?.key !== CAMPO || change.type !== "add" || targetDoc?.documentName !== "Actor" || !defesa || !Number.isFinite(delta)) {
				return wrapped(targetDoc, change, opcoes, ...args);
			}
			targetDoc._t20cPda = (targetDoc._t20cPda ?? 0) + delta;
			const dosItens = penalidadeDosItens(targetDoc);
			// O sistema soma depois a penalidade dos itens (negativa): o total fica –max(0, itens + efeitos).
			const valor = dosItens - Math.max(0, dosItens + targetDoc._t20cPda);
			if (opcoes.modifyTarget !== false) defesa.pda = valor;
			return { [CAMPO]: valor };
		});
	}
};
