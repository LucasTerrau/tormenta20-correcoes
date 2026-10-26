import { wrap } from "../util.mjs";

/** Onde guardamos, no clone do item usado, as opções retornadas pelo diálogo de uso. */
export const USE_OPTIONS = "_t20cUseOptions";

/**
 * Bugs:
 * 1. A conferência "PM suficientes?" usa o custo cheio, mas o gasto usa o custo já reduzido
 *    (ex.: metade do custo). Quem tem PM para o custo reduzido é impedido de lançar.
 * 2. Reduzir o custo à metade pode deixar a magia com 0 PM. Regra (Tormenta20 JdA, p. 226):
 *    "Uma habilidade nunca pode ter seu custo reduzido para menos de 1 PM."
 * Correção: guarda as opções do diálogo no item usado e, na hora de conferir os PM,
 * usa o custo que de fato será gasto, com mínimo de 1 PM (exceto Truques).
 */
export default {
	id: "custoPmReal",
	name: "Custo de PM: conferência e mínimo de 1 PM",
	hint: "A conferência de PM usa o custo que será gasto de verdade (com reduções), e reduções nunca deixam o custo abaixo de 1 PM (Truques continuam custando 0).",
	init() {
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const result = await wrapped(item, ...args);
			if (result && item) item[USE_OPTIONS] = result;
			return result;
		});

		wrap("CONFIG.Item.documentClass.prototype._getUsageUpdates", function (wrapped, config = {}) {
			const options = this[USE_OPTIONS];
			if (!options || !config.consumeMana || !Number.isNumeric(options.manaCost)) return wrapped(config);

			// O sistema calcula options.manaCost logo antes desta chamada e gasta exatamente esse valor depois.
			if (!options.truque && options.hasManaCost) options.manaCost = Math.max(Number(options.manaCost), 1);

			const custoPM = Number(this.actor?.system.modificadores.custoPM) || 0;
			const consumeMana = Number(options.manaCost) - custoPM;
			if (consumeMana <= 0) return wrapped(config);
			return wrapped({ ...config, consumeMana });
		});
	}
};
