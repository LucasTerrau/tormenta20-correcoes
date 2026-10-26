/**
 * Itens gerais do Jogo do Ano com preço, espaço, nome ou efeito errados (varredura de preços contra as
 * Tabelas 3-3 a 3-9 e 8-12, e os pratos especiais da p. 162):
 * - pratos especiais com nomes da 1ª edição e sem efeito: Gorad quente (+2 PM temporários), Macarrão de
 *   Yuvalin (+5 PV temporários), Prato do aventureiro e Sopa de peixe (+1 PV ou PM por nível na próxima
 *   noite, lidos pelo descanso), Batata valkariana (+1d6 num teste do dia: a opção só aparece depois de
 *   comer, pela correção "Alimentação");
 * - preços: Carroça T$ 150, Carruagem T$ 500, Canoa T$ 70, Veneno de aranha gigante T$ 45, Poção de Escudo
 *   da Fé (cena) T$ 120; espaços: Clava 1, Poção de Enfeitiçar 0,5; nomes: Riso de Nimb, Alforje, Madeira
 *   Tollon; itens dos suplementos com preço diferente do livro (Armadura do Dragão Ancião T$ 100.000, Cálice
 *   das marés, Violino soprano, Varinha armamentista, Trombeta do cruzado…) e a Trombeta tapistana.
 */
import { MODULE_ID } from "../constants.mjs";
import { mesclar, setarCaminho } from "./suplementos.mjs";

const rolagem = (formula, tipo) => [{ name: "Dano", key: "dano0", type: "dano", parts: [[formula, tipo, ""]], versatil: "", adaptavel: "" }];

const ITENS = {
	GkIO0G6YH5VjXNIK: { nome: "Batata Ambiciosa", patch: { name: "Batata valkariana", [`flags.${MODULE_ID}.pratoEspecial`]: true, [`flags.${MODULE_ID}.batata`]: true }, efeitos: { mhMNYFNWFT6UyhFS: { name: "Batata valkariana", system: { abilityUse: { types: [] } } } } },
	MdkgD1o9m4WHNZJs: { nome: "Gorad Quente", patch: { name: "Gorad quente", "system.rolls": rolagem("2", "curatpm"), [`flags.${MODULE_ID}.pratoEspecial`]: true }, remover: ["cHPmE2xOjaWzNzeN"] },
	qOJQpsOhHltX2BUZ: { nome: "Macarrão de Mineiro", patch: { name: "Macarrão de Yuvalin", "system.rolls": rolagem("5", "curatpv"), [`flags.${MODULE_ID}.pratoEspecial`]: true }, remover: ["jWGo8qEHzY59JNop"] },
	VkHOL4wIzEeetYW7: { nome: "Prato do Aventureiro", patch: { name: "Prato do aventureiro", [`flags.${MODULE_ID}.pratoEspecial`]: true, [`flags.${MODULE_ID}.refeicao`]: { pv: true } }, remover: ["zzhcuLkIHQ3g7WCI"] },
	fv6c3O5CXphtXilA: { nome: "Sopa de Peixe", patch: { name: "Sopa de peixe", [`flags.${MODULE_ID}.pratoEspecial`]: true, [`flags.${MODULE_ID}.refeicao`]: { pm: true } }, remover: ["lN6d6cXwkPycdLJy"] },
	"9AshEQWx8xIxDXj2": { nome: "Carroça", patch: { "system.preco": 150 } },
	LhaPpB6EoYJAoor7: { nome: "Carruagem", patch: { "system.preco": 500 } },
	xBDLAT1D6cJp3Xgv: { nome: "Canoa", patch: { "system.preco": 70 } },
	JUlyA7UGoTGdXkCP: { nome: "Clava", patch: { "system.espacos": 1 } },
	t6KNqLZXkb5VHN71: { nome: "Veneno de aranha gigante", patch: { "system.preco": 45 } },
	cLTZXcoMq9C8oNpB: { nome: "Poção de Escudo da Fé (cena)", patch: { "system.preco": 120 } },
	fFpSZAPGZDUVJNOG: { nome: "Poção de Enfeitiçar", patch: { "system.espacos": 0.5 } },
	NsULSsz7FpJiBIZO: { nome: "Riso do Louco", patch: { name: "Riso de Nimb" } },
	bsAV5yfFFBOJjMWw: { nome: "Alforge", patch: { name: "Alforje" } },
	BLWTKPBK6oRPeAoJ: { nome: "Madeira negra", patch: { name: "Madeira Tollon" } },
	// Suplementos (preços conferidos nos livros na varredura do tesouro).
	SXx2EMU0hWVGTfhg: { nome: "Armadura do Dragão Ancião", patch: { "system.preco": 100000 } },
	bNrpWh8lxzxp6aae: { nome: "Cálice das marés", patch: { "system.preco": 15000 } },
	MYCP5L97ecBAXXYv: { nome: "Violino Soprano", patch: { "system.preco": 300 } },
	AllOgocz27a2BfCQ: { nome: "Armação para Mochila", patch: { "system.preco": 50 } },
	"8ytZzUIZJc9YSG5O": { nome: "Camisolão", patch: { "system.preco": 12 } },
	Nm3VWCXj3K1wkHVp: { nome: "Varinha Armamentista", patch: { "system.preco": 600 } },
	wgPlSeKkAVvCeEpy: { nome: "Trombeta do Cruzado", patch: { "system.preco": 100 } },
	JrpXntzLmJPOLVzb: { nome: "Tonsura", patch: { "system.preco": 3 } },
	"1LWEE2TdVqFk6pNu": { nome: "Frasco Purificador", patch: { "system.preco": 100 } },
	K7IDmZypV0rJlN2Z: { nome: "Isca Putrefata", patch: { "system.preco": 60 } },
	W3H9u3b5VDfHOKpZ: { nome: "Veneno Batráquio", patch: { "system.preco": 30 } },
	SFxeeShNQSl7I10S: { nome: "Manjar de Sombras", patch: { "system.preco": 20 } },
	LJldBq3cjVJ4K5om: { nome: "Tamborete Tapistana", patch: { name: "Trombeta Tapistana" } }
};

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

function idDo(item) {
	const entrada = ITENS[item._id];
	if (entrada && [entrada.nome, entrada.patch.name].includes(item.name)) return item._id;
	const origem = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
	const id = origem.match(/^Compendium\.(?:tormenta20|suplementos-de-arton)\.[\w-]+\.Item\.(\w{16})$/)?.[1];
	return id && ITENS[id] ? id : null;
}

/** @returns {boolean} se mudou algo */
export function corrigirItensGerais(item, stats) {
	if (!item?.type) return false;
	const id = idDo(item);
	if (!id) return false;
	const entrada = ITENS[id];
	let mudou = false;
	for (const [caminho, valor] of Object.entries(entrada.patch)) {
		// Nome trocado à mão na ficha fica.
		if (caminho === "name" && item.name !== entrada.nome) continue;
		if (setarCaminho(item, caminho, valor)) mudou = true;
	}
	for (const ef of item.effects ?? []) if (entrada.efeitos?.[ef._id] && mesclar(ef, entrada.efeitos[ef._id])) mudou = true;
	if (entrada.remover?.length && item.effects?.some((e) => entrada.remover.includes(e._id))) {
		item.effects = item.effects.filter((e) => !entrada.remover.includes(e._id));
		mudou = true;
	}
	if (mudou) contar(stats, "item-geral");
	return mudou;
}
