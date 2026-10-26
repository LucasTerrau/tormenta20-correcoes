import { LEGACY_USE_TYPES, MODULE_ID } from "./constants.mjs";

export function log(...args) {
	console.log(`${MODULE_ID} |`, ...args);
}

export function warn(...args) {
	console.warn(`${MODULE_ID} |`, ...args);
}

/** Correções que embrulham o mesmo método, na ordem de registro. */
const cadeias = new Map();

/**
 * Embrulha um método do sistema. O libWrapper aceita um só wrapper por método e por módulo,
 * então cada método recebe um wrapper "MIXED" que chama as correções em cadeia: cada uma recebe
 * `wrapped` (a próxima da cadeia) e pode deixar de chamá-la para interromper.
 * @param {string} target  Caminho do método, ex.: "CONFIG.Item.documentClass.prototype.roll"
 * @param {Function} fn    function (wrapped, ...args), com `this` do método original
 */
export function wrap(target, fn) {
	let cadeia = cadeias.get(target);
	if (!cadeia) {
		cadeia = [];
		cadeias.set(target, cadeia);
		libWrapper.register(
			MODULE_ID,
			target,
			function (wrapped, ...args) {
				const self = this;
				const passo = (i) => (...a) => (i < cadeia.length ? cadeia[i].call(self, passo(i + 1), ...a) : wrapped(...a));
				return passo(0)(...args);
			},
			"MIXED"
		);
	}
	cadeia.push(fn);
}

/** Item que se comporta como magia para aprimoramentos (magia ou pergaminho). */
export function isSpellLike(item) {
	if (item?.documentName !== "Item") return false;
	return item.type === "magia" || (item.type === "consumivel" && item.system?.tipo === "scroll");
}

/**
 * Converte o custo antigo (texto) de um aprimoramento.
 * "" e "Truque" viram null (sem custo / truque); números viram Number.
 */
export function parseLegacyCost(value) {
	if (value === undefined || value === null) return null;
	if (typeof value === "number") return value;
	const text = String(value).trim();
	if (Number.isNumeric(text)) return Number(text);
	return null;
}

export function splitNames(text) {
	if (!text) return [];
	return String(text)
		.replaceAll(",", ";")
		.split(";")
		.map((s) => s.trim())
		.filter(Boolean);
}

/**
 * Lê os flags antigos (v13) de efeito de uso e monta o equivalente em `system.abilityUse`.
 * Segue a mesma lógica da migração 1.6.0 do sistema (migrateEffectsV2).
 * @param {object} flags          flags.tormenta20 do efeito
 * @param {Item|Actor} parent     Documento dono do efeito
 * @param {boolean} isTemporary
 * @returns {{onuse: boolean, abilityUse: object}|null}
 */
export function legacyAbilityUse(flags, parent, isTemporary) {
	if (!flags?.onuse) return null;
	let types = [];
	if (isSpellLike(parent) && !isTemporary) types = ["self"];
	else types = LEGACY_USE_TYPES.filter((key) => flags[key]);
	return {
		onuse: true,
		abilityUse: {
			aumenta: Boolean(flags.aumenta),
			custo: parseLegacyCost(flags.custo),
			names: splitNames(flags.items),
			types
		}
	};
}
