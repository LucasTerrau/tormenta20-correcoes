import { LEGACY_USE_TYPES } from "../constants.mjs";
import { parseLegacyCost, splitNames } from "../util.mjs";

/**
 * Conversão em memória de efeitos no formato antigo (v13) para o formato do sistema 1.6 (v14).
 * Reproduz a migração oficial 1.6.0 (migrateEffectsV2 e deleteLegacyTransferedEffects), que pulou
 * os compêndios de módulos com manifesto (Bestiário de Arton, Suplementos de Arton) e os atores
 * importados depois dela. Diferenças em relação à oficial:
 * - não renomeia o aprimoramento para o nome do item (a oficial usava uma variável inexistente);
 * - trabalha sobre os dados brutos, antes de o documento existir, então nada é gravado no banco.
 * Tudo aqui recebe e altera objetos de dados (source), nunca documentos.
 */

function ehTemporario(ef) {
	const d = ef.duration ?? {};
	return Number(d.value) > 0 || Boolean(d.expiry) || Number(d.rounds) > 0 || Number(d.turns) > 0 || Number(d.seconds) > 0;
}

function ehMagia(item) {
	return item?.type === "magia" || (item?.type === "consumivel" && item?.system?.tipo === "scroll");
}

/** O efeito ainda está no formato antigo? */
export function precisaMigrar(ef) {
	const flags = ef?.flags?.tormenta20;
	if (!flags) return false;
	return (flags.onuse && !ef.system?.onuse) || (flags.condition && !ef.system?.status) || Boolean(flags.durationScene);
}

/**
 * @param {object} ef        Dados do efeito (alterados no lugar)
 * @param {object} [item]    Dados do item dono, se o efeito estiver num item
 * @returns {boolean}        Se algo mudou
 */
export function migrarEfeito(ef, item) {
	if (!precisaMigrar(ef)) return false;
	const flags = ef.flags.tormenta20;
	// Só a marca de cena, já convertida (pela migração do sistema ou por esta): nada a contar.
	const soCena = !(flags.onuse && !ef.system?.onuse) && !(flags.condition && !ef.system?.status) && ef.duration?.expiry === "sceneEnd";
	const temporarioAntes = ehTemporario(ef);
	const desligadoAntes = Boolean(ef.disabled);
	ef.system ??= {};

	if (item) {
		// Efeitos de armas e equipamentos não têm duração; temporários em outros itens não são transferidos.
		if (["arma", "equipamento"].includes(item.type)) ef.duration = { ...ef.duration, value: null, expiry: null };
		else if (temporarioAntes) ef.transfer = false;
	}

	if (flags.onuse && !ef.system.onuse) {
		const types = ehMagia(item) && !temporarioAntes ? ["self"] : LEGACY_USE_TYPES.filter((key) => flags[key]);
		ef.system.onuse = true;
		ef.system.abilityUse = {
			...(ef.system.abilityUse ?? {}),
			automatic: !desligadoAntes,
			aumenta: Boolean(flags.aumenta),
			custo: parseLegacyCost(flags.custo),
			names: splitNames(flags.items),
			types
		};
		ef.disabled = true;
	}

	if (flags.condition && !ef.system.status) {
		ef.system.status = {
			category: flags.category ?? "",
			ignoreImunity: Boolean(flags.ignoreImunity),
			upgrade: flags.stack ?? flags.upgrade ?? "",
			childEffect: flags.childEffect ?? []
		};
	}

	// Como a migração do sistema: "duração de cena" vence a duração que veio no efeito antigo (1 rodada,
	// 99 rodadas…), que o Foundry já converte para expiração por turno. "Sustentada" não existia no
	// formato antigo: vem do uso da magia e fica.
	if (flags.durationScene) {
		if (!["sceneEnd", "sustainEnd"].includes(ef.duration?.expiry)) {
			ef.duration = { ...ef.duration, expiry: "sceneEnd", value: null, units: "rounds" };
		}
		// A marca sai (em memória): a cópia que o sistema faz ao usar a magia recebe a duração da magia
		// (sustentada, 1 rodada…), e a conversão não pode trocá-la de novo por "cena".
		flags.durationScene = false;
	}
	return !soCena;
}

/** @returns {number} quantos efeitos foram convertidos */
export function migrarItem(item) {
	let n = 0;
	for (const ef of item?.effects ?? []) if (migrarEfeito(ef, item)) n++;
	return n;
}

/**
 * Antes do v14, efeitos transferidos de itens eram copiados para o ator. No v14 o item aplica o
 * efeito direto, então a cópia faz o efeito valer duas vezes (e o aprimoramento aparecer duas
 * vezes ao lançar). Remove a cópia quando o item dono ainda tem o efeito original; diferenças da
 * cópia (alterações, flags, ligado/desligado) passam para o original, como na migração oficial.
 * @returns {number} quantas cópias foram removidas
 */
export function removerCopiasDeItens(actor) {
	const items = actor?.items ?? [];
	const effects = actor?.effects ?? [];
	if (!items.length || !effects.length) return 0;
	const manter = [];
	for (const ef of effects) {
		const id = String(ef.origin ?? "").match(/(?:^|\.)Item\.([A-Za-z0-9]{16})$/)?.[1];
		const item = id && items.find((i) => i._id === id);
		const original = item?.effects?.find((o) => o.name === ef.name && o.transfer);
		if (!original) {
			manter.push(ef);
			continue;
		}
		const copia = ef.system?.changes;
		if (copia && JSON.stringify(copia) !== JSON.stringify(original.system?.changes)) {
			original.system = { ...original.system, changes: copia };
		}
		if (ef.flags?.tormenta20) {
			original.flags = { ...original.flags, tormenta20: { ...original.flags?.tormenta20, ...ef.flags.tormenta20 } };
		}
		if (!ef.flags?.tormenta20?.onuse && Boolean(ef.disabled) !== Boolean(original.disabled)) original.disabled = ef.disabled;
	}
	const removidas = effects.length - manter.length;
	if (removidas) actor.effects = manter;
	return removidas;
}

/** @returns {{efeitos: number, copias: number}} */
export function migrarAtor(actor) {
	const copias = removerCopiasDeItens(actor);
	let efeitos = 0;
	for (const ef of actor?.effects ?? []) if (migrarEfeito(ef)) efeitos++;
	for (const item of actor?.items ?? []) efeitos += migrarItem(item);
	return { efeitos, copias };
}
