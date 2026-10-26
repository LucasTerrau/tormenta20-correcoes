import { aprimoramentosAplicados, normalizar } from "../magia/regras.mjs";
import { wrap } from "../util.mjs";

/**
 * Bug: a alteração `duracao` de aprimoramentos é lida com /[A-z]+/ e comparada com o nome exato
 * da unidade. "instantânea" vira "instant", "1d4 rodadas" (plural) não casa com "Rodada",
 * "1 semana" não existe: a duração do item fica vazia e os efeitos aplicados ficam com a duração
 * errada (ou a do efeito base). "permanente" mantém a duração de cena do efeito base.
 * Correção: antes do cartão do chat, relê a última alteração de duração aplicada, entende
 * acento, plural, semana e dados, e refaz a duração do item e dos efeitos que vão para os alvos.
 */
const UNIDADES = [
	[/^inst|^in$/, "inst"],
	[/^perm/, "perm"],
	[/^cena/, "scene"],
	[/^sust/, "sust"],
	[/^turno/, "turn"],
	[/^rodada/, "round"],
	[/^minuto/, "minute"],
	[/^hora/, "hour"],
	[/^dia/, "day"],
	[/^semana/, "day", 7],
	[/^mes/, "month"],
	[/^ano/, "year"],
	[/^especial/, "special"]
];

/** "1d4 rodadas" -> {units: "round", formula: "1d4", mult: 1}; texto sem unidade -> null */
export function interpretarDuracao(texto) {
	const t = normalizar(texto);
	const formula = t.match(/^(\d+d\d+(?:\s*[+-]\s*\d+)?|\d+)/)?.[1]?.replace(/\s+/g, "") ?? null;
	for (const palavra of t.split(/[^a-z0-9]+/).filter(Boolean)) {
		for (const [re, units, mult = 1] of UNIDADES) {
			if (re.test(palavra)) return { units, formula, mult };
		}
	}
	return null;
}

/** Mesma conversão que o sistema usa para durações de efeitos (ability-use.mjs). */
export function duracaoDoEfeito(units, valor, atual) {
	if (CONST.ACTIVE_EFFECT_DURATION_UNITS.includes(`${units}s`)) {
		return { ...atual, units: `${units}s`, value: valor || 1, expiry: "turnStart" };
	}
	if (units === "sust") return { ...atual, expiry: "sustainEnd", units: "rounds", value: null };
	if (units === "scene") return { ...atual, expiry: "sceneEnd", units: "rounds", value: null };
	if (units === "perm") return { ...atual, expiry: null, value: null };
	return atual; // instantânea/especial: o efeito mantém a duração própria
}

export default {
	id: "duracaoAprimoramento",
	name: "Magias: durações com acento, plural e semana",
	hint: "Aprimoramentos que mudam a duração (\"instantânea\", \"1d4 rodadas\", \"1 semana\", \"permanente\") passam a valer no cartão e nos efeitos aplicados.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			const options = config.options;
			const duracao = this.system?.duracao;
			if (options && duracao) {
				let ultima = null;
				for (const { effect } of aprimoramentosAplicados(this, options)) {
					for (const change of effect.system.changes) {
						if (change.key === "duracao" && change.type === "override") ultima = change.value;
					}
				}
				const lida = ultima !== null ? interpretarDuracao(ultima) : null;
				if (lida) {
					let valor = 0;
					if (lida.formula) {
						const roll = await new Roll(lida.formula).evaluate();
						valor = roll.total * lida.mult;
					} else if (lida.mult > 1) valor = lida.mult;
					duracao.units = lida.units;
					duracao.value = ["inst", "perm", "scene", "sust"].includes(lida.units) ? 0 : valor || 1;
					this._prepareLabels?.();
					for (const lista of options.effects ?? []) {
						const efeito = Array.isArray(lista) ? lista[0] : lista;
						if (!efeito || efeito.statuses?.length) continue;
						efeito.duration = duracaoDoEfeito(lida.units, duracao.value, efeito.duration ?? {});
					}
				}
			}
			return wrapped(config, ...args);
		});
	}
};
