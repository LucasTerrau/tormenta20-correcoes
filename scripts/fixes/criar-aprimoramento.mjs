import { LEGACY_USE_TYPES } from "../constants.mjs";
import { isSpellLike, parseLegacyCost, splitNames } from "../util.mjs";

/**
 * Bug: ao criar um efeito pela ficha, o sistema grava `system.abilisyUse` (erro de digitação),
 * então aprimoramentos novos de magia não recebem o tipo "self" e não aparecem no diálogo de uso.
 * O campo com erro é descartado pelo modelo de dados antes deste hook, por isso não dá para lê-lo:
 * um efeito de uso criado numa magia sem nenhum "aplicar em" recebe "self", que era a intenção.
 * O assistente de efeitos ainda grava "aplicar em", "custo", "aumenta" e "itens específicos"
 * em flags antigos que o sistema não lê mais.
 * Correção: antes de criar o efeito, copia esses dados para `system.abilityUse`.
 */
export default {
	id: "criarAprimoramento",
	name: "Aprimoramentos criados na ficha funcionam",
	hint: "Aprimoramentos novos (criados pela ficha ou pelo assistente de efeitos) passam a aparecer ao lançar a magia, com custo e repetição corretos.",
	init() {
		Hooks.on("preCreateActiveEffect", (effect, data, options, userId) => {
			if (userId !== game.user.id) return;
			const flags = data.flags?.tormenta20 ?? {};
			const legacyKeys = [...LEGACY_USE_TYPES, "items", "aumenta", "custo"];
			const hasLegacy = legacyKeys.some((key) => flags[key] !== undefined && flags[key] !== "" && flags[key] !== false);
			if (!effect.system.onuse && !hasLegacy) return;

			const current = effect.system.abilityUse;
			const types = new Set(current.types);
			for (const key of LEGACY_USE_TYPES) if (flags[key]) types.add(key);
			if (!types.size && effect.system.onuse && isSpellLike(effect.parent) && !effect.isTemporary) types.add("self");

			const names = new Set(current.names);
			for (const name of splitNames(flags.items)) names.add(name);

			const update = {
				"system.abilityUse.types": [...types],
				"system.abilityUse.names": [...names]
			};
			if (flags.aumenta !== undefined) update["system.abilityUse.aumenta"] = Boolean(flags.aumenta);
			if (flags.custo !== undefined && flags.custo !== "") update["system.abilityUse.custo"] = parseLegacyCost(flags.custo);
			effect.updateSource(update);
		});
	}
};
