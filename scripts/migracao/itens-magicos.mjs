/**
 * Itens do Jogo do Ano sem efeito ou com número errado (tabela em itens-magicos-dados.mjs, gerada por
 * dev/gerar-itens-magicos.mjs). Casa pelo id do item no compêndio (ou pela origem da cópia na ficha),
 * conferindo o nome nas cópias dentro de NPCs.
 */
import { ITENS } from "./itens-magicos-dados.mjs";
import { mesclar, setarCaminho } from "./suplementos.mjs";

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

const POR_ID = new Map();
for (const entrada of ITENS) POR_ID.set(entrada.id, [...(POR_ID.get(entrada.id) ?? []), entrada]);

function entradaDo(item) {
	const doId = (POR_ID.get(item._id) ?? []).find((e) => e.nome === item.name);
	if (doId) return doId;
	const origem = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
	const m = origem.match(/^Compendium\.tormenta20\.([\w-]+)\.Item\.(\w{16})$/);
	return m ? (POR_ID.get(m[2]) ?? []).find((e) => e.pacote === m[1]) : null;
}

/** @returns {boolean} se mudou algo */
export function corrigirItensDoLivro(item, stats) {
	if (!item?.type || !POR_ID.size) return false;
	const entrada = entradaDo(item);
	if (!entrada) return false;
	let mudou = false;
	for (const ef of item.effects ?? []) {
		const patch = entrada.efeitos[ef._id];
		if (patch && mesclar(ef, patch)) {
			contar(stats, "item-do-livro-efeito");
			mudou = true;
		}
	}
	for (const [caminho, valor] of Object.entries(entrada.patch)) {
		if (setarCaminho(item, caminho, valor)) {
			contar(stats, "item-do-livro");
			mudou = true;
		}
	}
	item.effects ??= [];
	for (const novo of entrada.novos) {
		if (item.effects.some((e) => e._id === novo._id)) continue;
		item.effects.push(structuredClone(novo));
		contar(stats, "item-do-livro-efeito-novo");
		mudou = true;
	}
	return mudou;
}
