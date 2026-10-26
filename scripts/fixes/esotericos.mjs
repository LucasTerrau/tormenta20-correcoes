import { equipado } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regras (JdA p. 159–160):
 * - esotéricos precisam estar empunhados para fornecer seus benefícios, e uma magia só recebe o
 *   benefício de um esotérico;
 * - Varinha arcana e Tomo hermético valem só para magias arcanas; Cajado arcano dá +1 no limite de PM e
 *   na CD das magias arcanas quando empunhado com as duas mãos.
 * Bugs: o diálogo listava as opções de todos os itens do personagem, mesmo guardados na mochila (o
 * Poderoso valia de dentro da mochila), deixava somar dois esotéricos e oferecia a Varinha para magias
 * divinas. O Cajado arcano não tinha o +1 na CD.
 * Correção: opções de armas e equipamentos que não estão empunhados ou vestidos somem do diálogo (as da
 * própria arma usada ficam); marcar a opção de um esotérico desmarca as de outro; Varinha, Cajado e Tomo
 * somem em magias que não são arcanas; o Cajado empunhado com as duas mãos soma +1 na CD das magias
 * arcanas.
 */
const SO_ARCANAS = /^(varinha arcana|cajado arcano|tomo herm[eé]tico|cajado da destrui[cç][aã]o|cajado do poder)$/i;
const SO_DIVINAS = /^cajado da vida$/i;

const ehEsoterico = (item) => (item?.type === "equipamento" && item.system?.tipo === "esoterico") || /^cajado (arcano|da destrui|do poder|da vida)/i.test(item?.name ?? "");

function guardado(item, usado) {
	if (!item || item === usado || item.id === usado?.id || !["arma", "equipamento"].includes(item.type)) return false;
	return !equipado(item);
}

function cajadoEmpunhado(actor) {
	return actor.items.some((i) => /^cajado arcano$/i.test(i.name) && equipado(i, true));
}

export default {
	id: "esotericos",
	name: "Esotéricos empunhados e um por magia",
	hint: "Opções de itens guardados (não empunhados ou vestidos) somem do diálogo; só um esotérico por magia; Varinha arcana, Cajado arcano e Tomo hermético só em magias arcanas; Cajado arcano empunhado com as duas mãos dá +1 na CD das magias arcanas (JdA p. 159–160).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const lista = wrapped(...args);
			try {
				const arcana = this.type === "magia" && this.system?.tipo === "arc";
				return lista.filter((ef) => {
					const dono = ef.parent?.documentName === "Item" ? ef.parent : null;
					if (guardado(dono, this)) return false;
					if (this.type === "magia" && !arcana && SO_ARCANAS.test(dono?.name ?? "")) return false;
					if (this.type === "magia" && this.system?.tipo !== "div" && SO_DIVINAS.test(dono?.name ?? "")) return false;
					return true;
				});
			} catch (error) {
				warn("Falha ao filtrar opções de itens guardados.", error);
				return lista;
			}
		});
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			const item = app.item;
			if (!root || item?.type !== "magia") return;
			const doEsoterico = new Map();
			for (const input of root.querySelectorAll("input[name$='.aplica']")) {
				const ef = item.applicableOnUseEffects?.find((e) => e.id === input.name.split(".")[1]);
				if (ehEsoterico(ef?.parent)) doEsoterico.set(input, ef.parent.id);
			}
			if (new Set(doEsoterico.values()).size < 2) return;
			const marcado = (i) => (i.type === "checkbox" ? i.checked : Number(i.value) > 0);
			const desmarcar = (i) => {
				if (i.type === "checkbox") i.checked = false;
				else i.value = 0;
				i.dispatchEvent(new Event("change", { bubbles: true }));
			};
			const exclusivo = (origem) => {
				const dono = doEsoterico.get(origem);
				for (const [outro, id] of doEsoterico) if (id !== dono && marcado(outro)) desmarcar(outro);
			};
			// Opções automáticas de dois esotéricos: fica a do primeiro.
			const primeiro = [...doEsoterico.keys()].find(marcado);
			if (primeiro) exclusivo(primeiro);
			for (const input of doEsoterico.keys()) input.addEventListener("change", () => marcado(input) && exclusivo(input));
		});
		wrap("CONFIG.Item.documentClass.prototype.prepareFinalAttributes", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const resistencia = this.system?.resistencia;
			if (this.type === "magia" && this.system?.tipo === "arc" && this.actor?.type === "character" && Number(resistencia?.cd) > 0 && cajadoEmpunhado(this.actor)) {
				resistencia.cd += 1;
				this._prepareLabels?.();
			}
			return resultado;
		});
	}
};
