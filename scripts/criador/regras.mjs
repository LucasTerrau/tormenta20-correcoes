/**
 * Regras de construção e de subir de nível (JdA p. 16–17, 35, 85 e 140) usadas pelos assistentes.
 */
export const ATRIBUTOS = ["for", "des", "con", "int", "sab", "car"];
export const NOME_ATRIBUTO = { for: "Força", des: "Destreza", con: "Constituição", int: "Inteligência", sab: "Sabedoria", car: "Carisma" };
export const SIGLA = { for: "For", des: "Des", con: "Con", int: "Int", sab: "Sab", car: "Car" };

/* -------------------------------------------- atributos (Tabela 1-1) */

export const PONTOS = 10;
const CUSTO = { "-1": -1, 0: 0, 1: 1, 2: 2, 3: 4, 4: 7 };
export const custo = (valor) => CUSTO[valor] ?? Infinity;
export const pontosGastos = (base) => ATRIBUTOS.reduce((s, k) => s + custo(Number(base[k]) || 0), 0);

/** 4d6 sem o menor dado, convertido pela Tabela 1-1. */
export function atributoDaRolagem(total) {
	if (total <= 7) return -2;
	if (total <= 9) return -1;
	if (total <= 11) return 0;
	if (total <= 13) return 1;
	if (total <= 15) return 2;
	if (total <= 17) return 3;
	return 4;
}

/**
 * Seis rolagens de 4d6 (descarta o menor). Se os atributos não somarem pelo menos 6, rola de novo o menor
 * valor até somarem (JdA p. 17). @returns {Promise<{rolagens: number[], valores: number[], rolls: Roll[]}>}
 */
export async function rolarAtributos() {
	const rolls = [];
	const rolar = async () => {
		const r = await new Roll("4d6kh3").evaluate();
		rolls.push(r);
		return r.total;
	};
	const rolagens = [];
	for (let i = 0; i < 6; i++) rolagens.push(await rolar());
	let soma = () => rolagens.reduce((s, t) => s + atributoDaRolagem(t), 0);
	let guarda = 0;
	while (soma() < 6 && guarda++ < 50) {
		const menor = rolagens.indexOf(Math.min(...rolagens));
		rolagens[menor] = await rolar();
	}
	return { rolagens, valores: rolagens.map(atributoDaRolagem), rolls };
}

/* -------------------------------------------- níveis, XP e dinheiro */

/** Tabela 1-4: XP para alcançar o nível. */
export const xpDoNivel = (nivel) => ((nivel - 1) * nivel * 1000) / 2;
/** Tabela 3-1. */
export const DINHEIRO_INICIAL = { 1: "4d6", 2: 300, 3: 600, 4: 1000, 5: 2000, 6: 3000, 7: 5000, 8: 7000, 9: 10000, 10: 13000, 11: 19000, 12: 27000, 13: 36000, 14: 49000, 15: 66000, 16: 88000, 17: 110000, 18: 150000, 19: 200000, 20: 260000 };

/* -------------------------------------------- texto */

export const normalizar = (texto) =>
	String(texto ?? "")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/\s+/g, " ")
		.trim();
export const limpar = (html) => String(html ?? "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
export const escapar = (texto) => foundry.utils.escapeHTML(String(texto ?? ""));

/* -------------------------------------------- pré-requisitos */

const ATRIBUTO_POR_NOME = { for: "for", forca: "for", des: "des", destreza: "des", con: "con", constituicao: "con", int: "int", inteligencia: "int", sab: "sab", sabedoria: "sab", car: "car", carisma: "car" };

/** "Pré-requisitos: For 2, Ataque Poderoso." → ["For 2", "Ataque Poderoso"] */
export function prerequisitos(descricao) {
	const texto = limpar(descricao);
	const m = texto.match(/Pr[ée]-requisitos?\s*:\s*([^.]+(?:\.\d+[^.]*)*)\./i);
	if (!m) return [];
	return m[1]
		.split(/,|;|\be\b(?=\s+[A-ZÁÉÍÓÚ0-9])/)
		.map((s) => s.trim())
		.filter(Boolean);
}

/**
 * Confere um pré-requisito. contexto: { atributos, nivel, niveis: {slugClasse: n}, pericias: Set, nomes: Set
 * (poderes e habilidades, normalizados) }. @returns {true|false|null} null = o módulo não sabe conferir.
 */
export function conferir(requisito, contexto) {
	const r = normalizar(requisito);
	let m = r.match(/^(for|forca|des|destreza|con|constituicao|int|inteligencia|sab|sabedoria|car|carisma)\s*([+-]?\d+)$/);
	if (m) return (Number(contexto.atributos?.[ATRIBUTO_POR_NOME[m[1]]]) || 0) >= Number(m[2]);
	m = r.match(/^(\d+)[ºo°]? nivel(?: de personagem)?$/);
	if (m) return (contexto.nivel ?? 1) >= Number(m[1]);
	m = r.match(/^(\d+)[ºo°]? nivel de ([a-z ]+)$/);
	if (m) {
		const slug = m[2].replace(/[^a-z]/g, "");
		const nivel = Object.entries(contexto.niveis ?? {}).find(([k]) => k === slug || slug.startsWith(k))?.[1] ?? 0;
		return nivel >= Number(m[1]);
	}
	m = r.match(/^treinad[oa] em (.+)$/);
	if (m) {
		const opcoes = m[1].split(/\s+ou\s+/);
		const conhecidas = opcoes.map((o) => contexto.periciaPorNome?.(o)).filter(Boolean);
		if (!conhecidas.length) return null;
		return conhecidas.some((k) => contexto.pericias?.has(k));
	}
	m = r.match(/^(?:habilidade de classe )?(.+)$/);
	if (m && contexto.nomes?.has(m[1])) return true;
	// Nome de poder ou habilidade que o personagem não tem: só "não cumpre" se o nome existir nos compêndios.
	if (m && contexto.nomesConhecidos?.has(m[1])) return false;
	return null;
}
