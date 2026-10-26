import { atributoDeConjuracao } from "../magia/regras.mjs";
import { wrap } from "../util.mjs";

/**
 * Bug: efeitos que dão "+N na CD das suas habilidades" usam system.attributes.cd (Véu do Desejo, Cajado
 * das Marés, Especialização em Magia, Componente Especial… uns 23 itens dos suplementos). O sistema só
 * usa esse campo para NPCs; o personagem calcula a CD de cada habilidade como 10 + metade do nível +
 * atributo + bônus da própria habilidade, e o bônus nunca entrava.
 * Correção: no personagem, a diferença entre system.attributes.cd e a base dele (10 + metade do nível,
 * calculada pelo sistema antes dos efeitos) é somada à CD de cada habilidade com resistência.
 *
 * Bug: a CD de magia usa um atributo de conjuração só por personagem, gravado na magia quando ela é solta
 * na ficha. Um arcanista/clérigo lançava as magias divinas com Int (JdA p. 173: a CD usa o atributo-chave
 * da classe que ensinou a magia).
 * Correção: a magia que está com o atributo da ficha passa a usar o da classe que a ensina (arcana:
 * arcanista ou bardo; divina: clérigo ou druida; a de maior nível). Atributo escolhido à mão na magia
 * continua valendo.
 */
function corrigirAtributoDaMagia(item) {
	const actor = item.actor;
	const resistencia = item.system?.resistencia;
	if (actor?.type !== "character" || item.type !== "magia" || !resistencia?.txt) return false;
	const atributo = atributoDeConjuracao(actor, item);
	if (!atributo || atributo === resistencia.atributo) return false;
	const valor = (chave) => Number(actor.system.atributos?.[chave]?.value) || 0;
	// Troca só a parcela do atributo (outras correções já podem ter somado bônus na CD). Sem atributo
	// gravado, o sistema nem calculou a CD.
	if (resistencia.atributo && Number(resistencia.cd) > 0) resistencia.cd = Number(resistencia.cd) - valor(resistencia.atributo) + valor(atributo);
	else resistencia.cd = 10 + Math.floor((Number(actor.system.attributes?.nivel?.value) || 0) / 2) + valor(atributo) + (Number(resistencia.bonus) || 0);
	resistencia.atributo = atributo;
	return true;
}
export function bonusDeCd(actor) {
	if (actor?.type !== "character") return 0;
	const nivel = Number(actor.system?.attributes?.nivel?.value) || 0;
	const base = 10 + Math.floor(nivel / 2);
	return (Number(actor.system?.attributes?.cd) || base) - base;
}

export default {
	id: "cdPersonagem",
	name: "CD de personagem: bônus e atributo da classe",
	hint: "Efeitos que somam na CD das habilidades pelo campo de CD do NPC (Véu do Desejo, Cajado das Marés, Especialização em Magia…) passam a somar também na CD do personagem. Em multiclasse, cada magia usa o atributo-chave da classe que a ensina (JdA p. 173).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.prepareFinalAttributes", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const resistencia = this.system?.resistencia;
			let mudou = corrigirAtributoDaMagia(this);
			const bonus = bonusDeCd(this.actor);
			if (bonus && resistencia?.txt && Number(resistencia.cd) > 0) {
				resistencia.cd = Number(resistencia.cd) + bonus;
				mudou = true;
			}
			if (mudou) this._prepareLabels?.();
			return resultado;
		});
	}
};
