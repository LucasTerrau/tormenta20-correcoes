import { MODULE_ID } from "../constants.mjs";
import { wrap } from "../util.mjs";

/**
 * Bug: toda habilidade de NPC usa a mesma CD (system.attributes.cd), que nas fichas importadas quase
 * sempre ficou 10. O livro dá a CD de cada habilidade (Tabela 7-2, JdA p. 322): o Hobgoblin Mago de
 * Batalha tem "CD 22" e lançava Bola de Fogo com CD 10; a Aura Aterradora do Dragão Adulto (CD 21) saía
 * com a CD do Sopro. A rolagem de resistência do módulo usava essa CD, e quase todo mundo passava.
 * Correção: no NPC, a CD da habilidade vem, nesta ordem:
 * - da CD conferida no livro (flag gravada pela correção de dados);
 * - do "CD N" escrito no próprio item (poderes; magias usam a CD de magias da ficha);
 * - do bônus de resistência do item quando ele é 10 ou mais (alguns NPCs do Bestiário guardam a CD ali);
 * - da CD da ficha.
 * Bônus dados na hora (opções de uso "+N na CD") continuam somando.
 */
const CD_NO_TEXTO = /\bCD\s*(\d{2})\b/;

function texto(item) {
	return String(item.system?.description?.value ?? "").replace(/<[^>]+>/g, " ");
}

/** CD de livro de uma habilidade de NPC, sem os bônus aplicados na hora. */
export function cdDaHabilidade(item) {
	const actor = item.actor;
	const conferida = Number(item.getFlag?.(MODULE_ID, "cd"));
	if (conferida) return conferida;
	if (item.type !== "magia") {
		const m = texto(item).match(CD_NO_TEXTO);
		if (m) return Number(m[1]);
	}
	const bonus = Number(item._source?.system?.resistencia?.bonus) || 0;
	if (bonus >= 10) return bonus;
	return (Number(actor?.system?.attributes?.cd) || 10) + bonus;
}

export default {
	id: "cdNpc",
	name: "CD própria de cada habilidade de NPC",
	hint: "Cada poder e magia de NPC usa a CD do livro (a do item, ou a de magias da ficha), em vez de uma CD única para tudo. Opções de uso que somam na CD continuam valendo.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.prepareFinalAttributes", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const resistencia = this.system?.resistencia;
			if (this.actor?.type !== "npc" || !resistencia?.txt) return resultado;
			// O que foi somado ao bônus depois de carregar (opção de uso "+N na CD", efeitos) continua valendo.
			const extra = (Number(resistencia.bonus) || 0) - (Number(this._source?.system?.resistencia?.bonus) || 0);
			const cd = cdDaHabilidade(this) + extra;
			if (cd !== resistencia.cd) {
				resistencia.cd = cd;
				this._prepareLabels?.();
			}
			return resultado;
		});
	}
};
