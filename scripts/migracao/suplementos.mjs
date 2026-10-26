/**
 * Dados dos Suplementos de Arton (Heróis, Deuses, Guia de Deuses Menores, Distinções, Ameaças e Atlas)
 * conferidos contra os livros: tabela gerada em suplementos-efeitos.mjs (dev/gerar-suplementos.mjs) e
 * três regras gerais que respondem pela maior parte dos erros.
 */
import { MODULE_ID } from "../constants.mjs";
import { EFEITOS, ITENS } from "./suplementos-efeitos.mjs";

/** Rótulos das perícias (o teste compara abilityUse.names com o rótulo exato). */
const PERICIAS = [
	"Acrobacia", "Adestramento", "Atletismo", "Atuação", "Cavalgar", "Conhecimento", "Cura", "Diplomacia", "Enganação",
	"Fortitude", "Furtividade", "Guerra", "Iniciativa", "Intimidação", "Intuição", "Investigação", "Jogatina", "Ladinagem",
	"Luta", "Misticismo", "Nobreza", "Percepção", "Pilotagem", "Pontaria", "Reflexos", "Religião", "Sobrevivência", "Vontade"
];
const normalizar = (texto) => String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
const PERICIA_POR_NOME = new Map(PERICIAS.map((p) => [normalizar(p), p]));

const ehObjeto = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

/** Mescla o patch no alvo (objetos por campo, listas inteiras). @returns {boolean} se mudou */
export function mesclar(alvo, patch) {
	let mudou = false;
	for (const [k, v] of Object.entries(patch)) {
		if (ehObjeto(v) && ehObjeto(alvo[k])) {
			if (mesclar(alvo[k], v)) mudou = true;
		} else if (JSON.stringify(alvo[k]) !== JSON.stringify(v)) {
			alvo[k] = structuredClone(v);
			mudou = true;
		}
	}
	return mudou;
}

export function setarCaminho(obj, caminho, valor) {
	const partes = caminho.split(".");
	let atual = obj;
	for (const p of partes.slice(0, -1)) {
		if (!ehObjeto(atual[p]) && !Array.isArray(atual[p])) atual[p] = {};
		atual = atual[p];
	}
	const ultima = partes.at(-1);
	if (JSON.stringify(atual[ultima]) === JSON.stringify(valor)) return false;
	atual[ultima] = structuredClone(valor);
	return true;
}

/** O subtipo (classe, divindade…) confere quando a correção traz um: cópias com mesmo nome e mesmo id existem. */
const mesmoSubtipo = (correcao, item) => !correcao.subtipo || normalizar(correcao.subtipo) === normalizar(item.system?.subtipo);

const resumoDasAlteracoes = (changes) => JSON.stringify((changes ?? []).map((c) => [c.key, c.type, String(c.value)]));

/** Efeito criado pela correção e já gravado num item: alterações e marcas do módulo voltam às da tabela. */
export function atualizarEfeitoNovo(existente, novo) {
	let mudou = false;
	if (resumoDasAlteracoes(existente.system?.changes) !== resumoDasAlteracoes(novo.system?.changes)) {
		existente.system ??= {};
		existente.system.changes = structuredClone(novo.system?.changes ?? []);
		mudou = true;
	}
	const marcas = novo.flags?.[MODULE_ID];
	if (marcas) {
		existente.flags ??= {};
		existente.flags[MODULE_ID] ??= {};
		if (mesclar(existente.flags[MODULE_ID], marcas)) mudou = true;
	}
	return mudou;
}

/** Correções da tabela: efeitos (pelo _id, conferindo o nome e o subtipo do item) e o próprio item. */
function aplicarTabela(item, stats) {
	let mudou = false;
	for (const ef of item.effects ?? []) {
		const entrada = (EFEITOS[ef._id] ?? []).find((e) => e.item === item.name && mesmoSubtipo(e, item));
		if (entrada && mesclar(ef, entrada.patch)) {
			contar(stats, "suplemento-efeito");
			mudou = true;
		}
	}
	for (const correcao of ITENS) {
		const casa = (correcao.id && item._id === correcao.id) || (item.name === correcao.nome && (!correcao.tipo || item.type === correcao.tipo) && mesmoSubtipo(correcao, item));
		if (!casa) continue;
		for (const [caminho, valor] of Object.entries(correcao.patch)) {
			if (setarCaminho(item, caminho, valor)) {
				contar(stats, "suplemento-item");
				mudou = true;
			}
		}
		item.effects ??= [];
		for (const novo of correcao.novos) {
			const existente = item.effects.find((e) => e._id === novo._id);
			if (existente) {
				// Já gravado (o item veio do compêndio corrigido para a ficha): segue a versão atual da correção.
				if (atualizarEfeitoNovo(existente, novo)) {
					contar(stats, "suplemento-efeito-novo");
					mudou = true;
				}
				continue;
			}
			item.effects.push(structuredClone(novo));
			contar(stats, "suplemento-efeito-novo");
			mudou = true;
		}
	}
	return mudou;
}

/**
 * Regras gerais:
 * - nomes de perícia em minúscula ou sem acento ("luta", "Intimidacao") nunca casavam com o teste;
 * - efeito de uso da própria arma com "ataque" (types: attack) valia para as outras armas e nunca para
 *   ela: vira "própria" (self), como nos encantos do sistema;
 * - efeito temporário em item que não é arma nem equipamento não é transferido (como na migração 1.6
 *   do sistema): transferido, o Foundry o aplica para sempre, sem olhar a duração.
 */
function aplicarRegrasGerais(item, stats) {
	let mudou = false;
	const puxados = new Set((item.effects ?? []).flatMap((e) => (e.system?.changes ?? []).filter((c) => c.key === "efeito").map((c) => String(c.value))));
	for (const ef of item.effects ?? []) {
		const uso = ef.system?.abilityUse;
		if (Array.isArray(uso?.names) && uso.names.length) {
			const nomes = uso.names.map((n) => PERICIA_POR_NOME.get(normalizar(n)) ?? n);
			if (nomes.some((n, i) => n !== uso.names[i])) {
				uso.names = nomes;
				contar(stats, "nome-de-pericia");
				mudou = true;
			}
		}
		if (item.type === "arma" && ef.system?.onuse && Array.isArray(uso?.types) && uso.types.length === 1 && uso.types[0] === "attack" && !uso.names?.length) {
			uso.types = ["self"];
			contar(stats, "arma-propria");
			mudou = true;
		}
		const temporario = Number(ef.duration?.value) > 0 || Boolean(ef.duration?.expiry);
		// Opção de uso de poder com duração (Marca da Presa, Duelo, Postura de Combate…): o sistema nunca
		// oferece opção temporária de item, e nada a puxa. Sem duração, vira opção marcável a cada uso.
		// Em magias e consumíveis a opção temporária é o efeito que vai para o alvo (Arma Mágica, óleos):
		// fica como está.
		if (item.type === "poder" && ef.system?.onuse && ef.disabled && temporario && !puxados.has(ef.name)) {
			ef.duration = { ...(ef.duration ?? {}), value: null, units: "seconds", expiry: null };
			contar(stats, "opcao-de-poder-sem-duracao");
			mudou = true;
			continue;
		}
		if (!["arma", "equipamento"].includes(item.type) && temporario && ef.transfer && !ef.flags?.[MODULE_ID]?.companheiroDe) {
			ef.transfer = false;
			contar(stats, "temporario-sem-transferir");
			mudou = true;
		}
	}
	return mudou;
}

/** @returns {boolean} se mudou algo */
export function corrigirSuplementos(item, stats) {
	if (!item) return false;
	const tabela = aplicarTabela(item, stats);
	const gerais = aplicarRegrasGerais(item, stats);
	return tabela || gerais;
}
