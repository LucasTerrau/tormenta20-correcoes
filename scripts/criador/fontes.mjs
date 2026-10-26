import { normalizar } from "./regras.mjs";

/**
 * Conteúdo dos compêndios (sistema, Suplementos de Arton e o "Itens do livro" deste módulo) e as tabelas
 * transcritas dos livros (dados.mjs). Lido uma vez por sessão, pelo índice (sem carregar cada documento).
 */
const PACOTES = new Set(["tormenta20", "suplementos-de-arton", "tormenta20-correcoes"]);
const CAMPOS = [
	"type",
	"folder",
	"img",
	"system.tipo",
	"system.subtipo",
	"system.circulo",
	"system.escola",
	"system.description.value",
	"system.atributos",
	"system.atributosDinamicos",
	"system.grants",
	"system.proficiencia",
	"system.preco",
	"system.pvPorNivel",
	"system.pmPorNivel",
	"system.source"
];

let cache = null;

export async function conteudo() {
	if (cache) return cache;
	const itens = [];
	for (const pack of game.packs) {
		// Compêndio que o mestre escondeu dos jogadores fica de fora (ler o índice dele daria erro).
		if (pack.documentName !== "Item" || !PACOTES.has(pack.metadata.packageName) || !pack.visible) continue;
		const indice = await pack.getIndex({ fields: CAMPOS }).catch((error) => {
			console.warn(`tormenta20-correcoes | Não deu para ler o compêndio ${pack.collection}.`, error);
			return [];
		});
		// pasta: nome da pasta no compêndio (separa armas de verdade de esotéricos e itens de origem).
		for (const e of indice) itens.push({ ...e, uuid: e.uuid ?? `Compendium.${pack.collection}.Item.${e._id}`, pacote: pack.collection, livro: pack.title, pasta: pack.folders?.get(e.folder)?.name ?? "" });
	}
	const porNome = new Map();
	// Mesmo nome em mais de um pacote: vale o do sistema.
	for (const item of [...itens].sort((a, b) => (a.pacote.startsWith("tormenta20.") ? 1 : 0) - (b.pacote.startsWith("tormenta20.") ? 1 : 0))) porNome.set(normalizar(item.name), item);
	cache = {
		itens,
		porNome,
		racas: itens.filter((i) => i.type === "race"),
		classes: itens.filter((i) => i.type === "classe"),
		poderes: itens.filter((i) => i.type === "poder"),
		magias: itens.filter((i) => i.type === "magia"),
		equipamentos: itens.filter((i) => ["arma", "equipamento", "tesouro", "consumivel"].includes(i.type))
	};
	return cache;
}

let tabelas;
/** Tabelas de classes, origens e divindades (scripts/criador/dados.mjs). null se ainda não existirem. */
export async function dados() {
	if (tabelas !== undefined) return tabelas;
	try {
		tabelas = await import("./dados.mjs");
	} catch (error) {
		console.warn("tormenta20-correcoes | Tabelas do criador ainda não existem.", error);
		tabelas = null;
	}
	return tabelas;
}

/** Documento completo pelo uuid, como dados para criar no ator. */
export async function dadosDoItem(uuid, extra = {}) {
	const doc = uuid ? await fromUuid(uuid) : null;
	if (!doc) return null;
	const dados = game.items.fromCompendium(doc);
	return foundry.utils.mergeObject(dados, extra);
}
