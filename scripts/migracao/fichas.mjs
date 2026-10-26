/**
 * Campos da própria ficha do ator (não dos itens) gravados de um jeito que o sistema não lê.
 * - Redução de dano no campo antigo: o sistema recalcula `value = base + bônus`, e as Ameaças (e a cópia
 *   do Bestiário) guardam a RD em `value` com `base` 0. Esqueleto, Golem de Ferro, dragões, Sacerdote de
 *   Aharadak… ficavam com RD 0. A migração do próprio sistema que convertia isso nunca é chamada.
 * - Tamanho na Furtividade (Tabela 1-21, JdA p. 107): os NPCs não Médios das Ameaças têm a opção
 *   "somar tamanho" desligada na Furtividade, e o valor do livro já conta com ela (Cascavel +12, Lagash +17).
 */
import { MODULE_ID } from "../constants.mjs";
import { ATORES } from "./npcs-dados.mjs";
import { setarCaminho } from "./suplementos.mjs";

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

function corrigirReducoes(system, stats) {
	let mudou = false;
	for (const res of Object.values(system?.tracos?.resistencias ?? {})) {
		if (!res || typeof res !== "object") continue;
		const antigo = Number(res.value);
		if (antigo > 0 && !Number(res.base)) {
			res.base = antigo;
			contar(stats, "rd-campo-antigo");
			mudou = true;
		}
	}
	return mudou;
}

function corrigirTamanhoNaFurtividade(system, stats) {
	const furt = system?.pericias?.furt;
	if (!furt || furt.size !== false) return false;
	furt.size = true;
	contar(stats, "furtividade-tamanho");
	return true;
}

/** Entrada da varredura de NPCs: pelo id do ator no compêndio (conferindo o nome) ou pela origem da cópia. */
function entradaDoNpc(actor) {
	const doId = ATORES[actor._id];
	if (doId && doId.nome === actor.name) return doId;
	const origem = actor._stats?.compendiumSource ?? actor.flags?.core?.sourceId ?? "";
	const id = origem.match(/\.Actor\.(\w{16})$/)?.[1];
	return id ? ATORES[id] : null;
}

function juntar(lista, valores) {
	let mudou = false;
	for (const v of valores) {
		if (lista.includes(v)) continue;
		lista.push(v);
		mudou = true;
	}
	return mudou;
}

/**
 * Fichas do livro conferidas uma a uma (npcs-dados.mjs): mortos-vivos marcados como humanoides, Int nula,
 * imunidades do texto, tipos de dano que faltavam, números errados, CD de cada habilidade, recarga, cura
 * acelerada, sentidos, imunidade a crítico e dano à metade. Roda antes da conversão da RD (o Vampiro tinha
 * RD geral 10 além do "10/luz").
 */
function corrigirNpcDoLivro(actor, stats) {
	if (actor.type !== "npc") return false;
	const entrada = entradaDoNpc(actor);
	if (!entrada) return false;
	let mudou = false;
	for (const [caminho, valor] of Object.entries(entrada.patch)) if (setarCaminho(actor, caminho, valor)) mudou = true;
	const ic = actor.system?.tracos?.ic;
	if (entrada.ic.length && ic) {
		ic.value = Array.isArray(ic.value) ? ic.value : [...(ic.value ?? [])];
		if (juntar(ic.value, entrada.ic)) mudou = true;
	}
	const sentidos = actor.system?.attributes?.sentidos;
	if (entrada.sentidos.length && sentidos) {
		sentidos.value = Array.isArray(sentidos.value) ? sentidos.value : [...(sentidos.value ?? [])];
		if (juntar(sentidos.value, entrada.sentidos)) mudou = true;
	}
	if (Object.keys(entrada.flags).length) {
		const flags = ((actor.flags ??= {})[MODULE_ID] ??= {});
		for (const [k, v] of Object.entries(entrada.flags)) {
			if (JSON.stringify(flags[k]) === JSON.stringify(v)) continue;
			flags[k] = structuredClone(v);
			mudou = true;
		}
	}
	for (const item of actor.items ?? []) {
		const correcao = entrada.itens[item._id];
		if (!correcao || correcao.nome !== item.name) continue;
		for (const [caminho, valor] of Object.entries(correcao.patch)) if (setarCaminho(item, caminho, valor)) mudou = true;
		const flags = ((item.flags ??= {})[MODULE_ID] ??= {});
		for (const [k, v] of Object.entries(correcao.flags)) {
			if (flags[k] === v) continue;
			flags[k] = v;
			mudou = true;
		}
	}
	if (mudou) contar(stats, "npc-do-livro");
	return mudou;
}

/** @returns {boolean} se mudou algo */
export function corrigirFicha(actor, stats) {
	const system = actor?.system;
	if (!system) return false;
	let mudou = corrigirNpcDoLivro(actor, stats);
	if (corrigirReducoes(system, stats)) mudou = true;
	if (corrigirTamanhoNaFurtividade(system, stats)) mudou = true;
	return mudou;
}
