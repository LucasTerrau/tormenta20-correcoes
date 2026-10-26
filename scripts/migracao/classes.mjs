/**
 * Habilidades de classe do Jogo do Ano com número ou condição errados (tabela em classes-dados.mjs,
 * gerada por dev/gerar-classes.mjs). As correções casam pelo id do item no compêndio do sistema (ou pela
 * origem da cópia na ficha): as classes variantes dos suplementos têm itens de mesmo nome.
 */
import { MODULE_ID } from "../constants.mjs";
import { CORRECOES, REQUER } from "./classes-dados.mjs";
import { atualizarEfeitoNovo, mesclar, setarCaminho } from "./suplementos.mjs";

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

/** O item é o do compêndio do sistema (ou uma cópia dele numa ficha). */
function ehOItem(item, id) {
	if (item._id === id) return true;
	const origem = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
	// Fichas antigas guardam a origem sem o ".Item.".
	return origem === `Compendium.tormenta20.poderes.Item.${id}` || origem === `Compendium.tormenta20.poderes.${id}`;
}

const POR_ID = new Map(CORRECOES.map((c) => [c.id, c]));
const REQUER_POR_ITEM = REQUER.reduce((m, r) => m.set(r.id, [...(m.get(r.id) ?? []), r]), new Map());

function correcaoDo(item) {
	for (const [id, correcao] of POR_ID) if (ehOItem(item, id)) return correcao;
	return null;
}

/** @returns {boolean} se mudou algo */
export function corrigirClasses(item, stats) {
	if (item?.type !== "poder") return false;
	let mudou = false;
	const correcao = correcaoDo(item);
	if (correcao) {
		for (const ef of item.effects ?? []) {
			const patch = correcao.efeitos[ef._id];
			if (patch && mesclar(ef, patch)) {
				contar(stats, "classe-efeito");
				mudou = true;
			}
		}
		for (const [caminho, valor] of Object.entries(correcao.patch)) {
			if (setarCaminho(item, caminho, valor)) {
				contar(stats, "classe-item");
				mudou = true;
			}
		}
		item.effects ??= [];
		for (const novo of correcao.novos) {
			const existente = item.effects.find((e) => e._id === novo._id);
			if (existente) {
				// Já gravado na ficha: segue a versão atual da correção (alterações e marcas do módulo).
				if (atualizarEfeitoNovo(existente, novo)) {
					contar(stats, "classe-efeito-novo");
					mudou = true;
				}
				continue;
			}
			item.effects.push(structuredClone(novo));
			contar(stats, "classe-efeito-novo");
			mudou = true;
		}
	}
	const condicoes = [...REQUER_POR_ITEM].filter(([id]) => ehOItem(item, id)).flatMap(([, lista]) => lista);
	for (const r of condicoes) {
		const ef = item.effects?.find((e) => e._id === r.efeito);
		if (!ef) continue;
		const flags = (ef.flags ??= {})[MODULE_ID] ??= {};
		const chave = r.arma ? "requerArma" : "requerArmadura";
		const valor = r.arma ?? r.armadura;
		if (flags[chave] === valor) continue;
		flags[chave] = valor;
		contar(stats, "classe-requer-equipamento");
		mudou = true;
	}
	return mudou;
}
