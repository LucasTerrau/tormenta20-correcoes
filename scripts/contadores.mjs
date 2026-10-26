/**
 * Utilitários dos contadores das correções "Combinações" e "Cargas magimarciais": cada contador é um
 * efeito temporário no ator (marcado com a flag "contador"), que some sozinho no fim do combate ou da cena
 * e aparece na aba de efeitos (apagá-lo zera o contador).
 */
import { MODULE_ID } from "./constants.mjs";
import { mesclar } from "./migracao/suplementos.mjs";

export const slug = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "");
export const temItem = (actor, nome) => actor?.items?.some((i) => slug(i.name) === nome) ?? false;
export const itemPorNome = (actor, nome) => actor?.items?.find((i) => slug(i.name) === nome) ?? null;

/** Onde estamos no combate (null fora de combate iniciado). */
export function marcaAgora(combat = game.combat) {
	return combat?.started ? { combate: combat.id, rodada: combat.round, turno: combat.turn } : null;
}
export const rodadaAtual = () => (game.combat?.started ? `${game.combat.id}:${game.combat.round}` : null);
export const turnoAtual = () => (game.combat?.started ? `${game.combat.id}:${game.combat.round}:${game.combat.turn}` : null);
export const compara = (a, b) => a.rodada - b.rodada || a.turno - b.turno;

export const efeitoContador = (actor, tipo) => actor?.effects?.find((e) => e.getFlag(MODULE_ID, "contador") === tipo) ?? null;

/** Cria, atualiza ou apaga (dados null) o efeito-contador. */
export async function gravarContador(actor, tipo, dados) {
	const atual = efeitoContador(actor, tipo);
	if (!dados) return atual?.delete();
	foundry.utils.setProperty(dados, `flags.${MODULE_ID}.contador`, tipo);
	if (!atual) return (await actor.createEmbeddedDocuments("ActiveEffect", [dados]))[0];
	return atual.update({ name: dados.name, "system.changes": dados.system?.changes ?? [], [`flags.${MODULE_ID}`]: dados.flags[MODULE_ID] });
}

/** Valor determinístico de uma fórmula com os dados de rolagem ("@combinacao" → 2). */
export function resolver(valor, rollData) {
	const texto = Roll.replaceFormulaData(String(valor), rollData, { missing: "0" });
	try {
		return Roll.safeEval(texto);
	} catch {
		return texto;
	}
}

/** Patches de dados por id do efeito e nome do item (objetos mesclados, listas trocadas). */
export function aplicarPatches(source, tabela) {
	if (!source?.effects?.length) return false;
	let mudou = false;
	for (const ef of source.effects) {
		const entrada = tabela[ef._id];
		if (entrada && entrada.item === source.name && mesclar(ef, entrada.patch)) mudou = true;
	}
	return mudou;
}

export function donosEMestre(actor) {
	return game.users.filter((u) => u.isGM || actor.testUserPermission(u, "OWNER")).map((u) => u.id);
}
