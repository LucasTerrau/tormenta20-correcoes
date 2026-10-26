/**
 * Correções de dados quebrados nos compêndios (sistema, Bestiário de Arton, Suplementos de Arton).
 * Cada regra foi tirada de um caso real encontrado nos pacotes; o comentário cita um exemplo.
 * Tudo trabalha sobre os dados brutos (source), em memória, como a migração de efeitos antigos.
 */

import { MODULE_ID } from "../constants.mjs";
import AMEACAS from "./ameacas-efeitos.mjs";
import { corrigirEncanto, corrigirEncantosDoItem } from "./encantos.mjs";
import { corrigirSuplementos } from "./suplementos.mjs";
import { corrigirFicha } from "./fichas.mjs";
import { corrigirClasses } from "./classes.mjs";
import { corrigirItensDoLivro } from "./itens-magicos.mjs";
import { corrigirPoderesRaciais } from "./poderes-raciais.mjs";
import { corrigirItensGerais } from "./itens-gerais.mjs";

const ehDeUso = (ef) => Boolean(ef.system?.onuse || ef.flags?.tormenta20?.onuse);

/** Junta um remendo nos dados do efeito: objetos são mesclados, listas e valores são trocados. */
function remendar(alvo, remendo) {
	for (const [chave, valor] of Object.entries(remendo)) {
		const ehObjeto = valor && typeof valor === "object" && !Array.isArray(valor);
		if (ehObjeto && alvo[chave] && typeof alvo[chave] === "object" && !Array.isArray(alvo[chave])) remendar(alvo[chave], valor);
		else alvo[chave] = structuredClone(valor);
	}
}

/**
 * Compêndio Ameaças do sistema: a migração oficial 1.6.0 apagou custo, tipo e "de uso" dos
 * aprimoramentos das magias dos NPCs (e de 14 poderes, como Ataque Furtivo e Marca da Presa). O
 * remendo de cada efeito, por _id, foi tirado das mesmas Ameaças no Bestiário (ameacas-efeitos.mjs).
 * Só vale para efeitos ainda quebrados: os mesmos _id existem, sãos, no compêndio de Magias.
 */
function corrigirEfeitoDaAmeaca(ef, stats) {
	const remendo = AMEACAS[ef?._id];
	if (!remendo) return false;
	const usoQuebrado = remendo.system?.onuse && !ef.system?.onuse;
	const condicaoQuebrada = remendo.system?.status && !ef.system?.status?.category;
	if (!usoQuebrado && !condicaoQuebrada) return false;
	ef.system ??= {};
	remendar(ef, remendo);
	contar(stats, "ameacas-do-sistema");
	return true;
}

/**
 * Custos que mudaram na edição Jogo do Ano, com o mesmo texto (JdA p. 209 e capítulo de magias). As
 * cópias antigas (Bestiário) ainda têm o custo velho: [custo antigo, custo do JdA].
 */
const CUSTO_DO_JDA = {
	"5E8DwOxwvQNlJJN4": [1, 2], // Toque Vampírico: muda a resistência para nenhum
	e70zPpfkALuH0bfC: [2, 3] // Escuridão: muda a duração para um dia
};

/** Chaves renomeadas em qualquer efeito: [regra, de, para]. */
const RENOMEAR = [
	["espaco-no-caminho", /^system\s*\.\s*(?=\S)/, "system."], // "system. attributes.movement.walk" (Montaria: Bulette)
	["attibutes", /^system\.attibutes\./, "system.attributes."], // Animar Objetos
	["pericia-singular", /^system\.pericia\./, "system.pericias."], // Luva de Falcoaria
	["resistencias-plural", /^system\.modificadores\.pericias\.resistencias$/, "system.modificadores.pericias.resistencia"], // Símbolo Sagrado (Bestiário)
	["pericias-por-atributo", /^system\.modificadores\.pericias\.(for|des|con|int|sab|car)$/, "system.modificadores.pericias.atr.$1"], // Folião, Nome na Arena
	["deslocamento-dig", /^system\.attributes\.movement\.dig(?=\.|$)/, "system.attributes.movement.burrow"], // Caminhos da Natureza
	["iniciativa-init", /^system\.pericias\.init\./, "system.pericias.inic."], // Elmo Pesado/Leve
	["resistencia-como-atributo", /^system\.atributos\.(fort|refl|vont)\./, "system.pericias.$1."], // Esquiva Sagaz (Duelista)
	["pv-total", /^system\.attributes\.pv\.total$/, "system.attributes.pv.bonus.total"], // Vitalidade das Fadas
	["deslocamento-curinga", /^system\.attributes\.movement\.\*$/, "system.attributes.movement.*.base"], // Armadura de Pedra
	["palavra-sobrando", /^(system\.\S+)\s+adicionar$/, "$1"], // Visão Mística
	["dano-digitado", /^(daon|dabo|Dano)$/, "dano"], // Gelo Eterno, Escudo do Leão, Lança da Dominação
	["ataque-maiusculo", /^Ataque$/, "ataque"], // Lança da Dominação
	["resistencia-acento", /^resistência$/, "resistencia"], // Alarme
	["passo-singular", /^passo$/, "passos"], // Arremesso Violento, Machado Lamnoriano
	["critx", /^critX$/, "criticoX"], // O Mundo Como Deve Ser
	["defesa-sem-caminho", /^defesa$/, "system.attributes.defesa.bonus"], // Escudo de Couro, Conforto do Aço
	["rd-sem-caminho", /^rd$/, "system.tracos.resistencias.dano.bonus"], // Rigidez Selvagem
	["referencia-sem-arroba", /^(?![@$?+])([^#\s.][^#]*#\w+)$/, "@$1"] // "Golpe Divino#dano" (Expurgo Sagrado)
];

/** Só em efeitos de uso: campos do item usado escritos como caminho do ator. */
const RENOMEAR_USO = [
	["critico-de-arma", /^system\.(criticoM|criticoX)$/, "$1"], // Pistola-Punhal, Lança de Fogo
	["execucao-de-uso", /^system\.ativacao\.execucao$/, "execucao"] // Acelerar Sacrário
];

/** Encantos de arma cujo dano extra vale sempre (JdA p. 335); o uso de 2 PM descrito junto é outra coisa. */
const ENCANTOS_DE_DANO_FIXO = new Set(["Elétrica", "Corrosiva", "Congelante"]);

/**
 * Melhorias e encantos (efeitos com system.upgrade): ajustes que dependem do efeito inteiro.
 * @returns {boolean} se mudou algo
 */
function corrigirAprimoramentoDeItem(ef, deUso, stats) {
	const upgrade = ef.system?.upgrade;
	if (!upgrade?.type) return false;
	let mudou = false;
	const changes = ef.system.changes ?? [];
	// Guardião, Protetor, Relampejante, Sombrio, Mitral (armadura): bônus na ficha que nunca chegava
	// ao personagem, porque o efeito não era transferido do item.
	// Os ativados por botão (Alado, Polida) ficam de fora: valem só quando aplicados.
	if (!deUso && !ef.transfer && !ef.disabled && !ef.flags?.[MODULE_ID]?.ativavel && changes.some((c) => /^system\./.test(c.key ?? ""))) {
		ef.transfer = true;
		contar(stats, "melhoria-sem-transferir");
		mudou = true;
	}
	// Elétrica, Corrosiva, Congelante: +1d6 sempre, sem marcar nem pagar (como a Flamejante).
	const tipos = upgrade.itemType ?? [];
	if (deUso && upgrade.type === "enchantment" && ENCANTOS_DE_DANO_FIXO.has(ef.name) && [...tipos].includes("weapon")) {
		ef.system.abilityUse ??= {};
		if (!ef.system.abilityUse.automatic || ef.system.abilityUse.custo !== null) {
			ef.system.abilityUse.automatic = true;
			ef.system.abilityUse.custo = null;
			contar(stats, "encanto-dano-fixo");
			mudou = true;
		}
	}
	// Guardião: "o bônus na Defesa do item aumenta em +4" (JdA p. 339); o dado tinha +2.
	if (ef.name === "Guardião" && upgrade.type === "enchantment") {
		for (const c of changes) {
			if (c.key === "system.attributes.defesa.bonus" && String(c.value) === "2") {
				c.value = 4;
				contar(stats, "guardiao-mais-4");
				mudou = true;
			}
		}
	}
	return mudou;
}

/** Listas de bônus: "substituir" nelas apaga todos os outros bônus do personagem. */
const LISTA_DE_BONUS = /^system\.(attributes\.(carga|defesa)\.bonus|tracos\.resistencias\.\w+\.bonus|pericias\.[\w*]+\.bonus|attributes\.movement\.[\w*]+\.bonus|attributes\.(pv|pm)\.bonus\.\w+)$/;

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

/**
 * Corrige chaves, valores e tipos das alterações de um efeito.
 * @returns {boolean} se mudou algo
 */
/**
 * Condições que pioram (JdA p. 394): "se ficar abalado novamente, em vez disso fica apavorado". O
 * sistema suprime a condição mais fraca quando a mais forte está ativa (status.upgrade), mas o campo
 * veio vazio: fraco + debilitado davam –7 em testes de atributo, em vez de –5.
 */
export const CONDICAO_PIOR = { abalado: "apavorado", fraco: "debilitado", frustrado: "esmorecido", fatigado: "exausto" };

const OFICIOS = ["alfa", "alqu", "arme", "arte", "cozi", "enge"];
const PERICIAS_QUE_FALTAM = { fraco: ["ladi"], debilitado: ["ladi"], cego: ["ladi"], frustrado: OFICIOS, esmorecido: OFICIOS };

/** Ajustes de condições (efeitos com status). */
function corrigirCondicao(ef, stats) {
	const status = ef?.statuses?.[0];
	if (!status || !ef.system?.status) return false;
	let mudou = false;
	if (CONDICAO_PIOR[status] && !ef.system.status.upgrade) {
		ef.system.status.upgrade = CONDICAO_PIOR[status];
		contar(stats, "condicao-que-piora");
		mudou = true;
	}
	// "Perícias baseadas nesses atributos" (p. 394–395): Fraco, Debilitado e Cego não pegavam Ladinagem
	// (Des); Frustrado e Esmorecido não pegavam os Ofícios (Int).
	const faltando = PERICIAS_QUE_FALTAM[status];
	if (faltando && Array.isArray(ef.system.changes)) {
		const modelo = ef.system.changes.find((ch) => /^system\.pericias\.\w+\.condi$/.test(ch.key));
		for (const pericia of faltando) {
			const key = `system.pericias.${pericia}.condi`;
			if (!modelo || ef.system.changes.some((ch) => ch.key === key)) continue;
			ef.system.changes.push({ ...modelo, key });
			contar(stats, "condicao-pericia-faltando");
			mudou = true;
		}
	}
	// Caído: "–5 na Defesa contra ataques corpo a corpo, +5 contra ataques à distância" (Tabela 5-3,
	// p. 239). O –5 valia contra tudo e "rebaixava" o campo Outros da Defesa. O ataque contra alvo caído
	// recebe o modificador certo na correção "Situações de combate".
	if (status === "caido" && Array.isArray(ef.system.changes)) {
		const antes = ef.system.changes.length;
		ef.system.changes = ef.system.changes.filter((ch) => ch.key !== "system.attributes.defesa.outros");
		if (ef.system.changes.length !== antes) {
			contar(stats, "caido-defesa");
			mudou = true;
		}
	}
	// Petrificado "recebe redução de dano 8": era "rebaixar" o total de RD para 8 (zerava a RD).
	// RD de fontes diferentes acumula (p. 229).
	for (const ch of ef.system.changes ?? []) {
		if (status === "petrificado" && /^system\.tracos\.resistencias\.dano\.(value|bonus)$/.test(ch.key) && ch.type === "downgrade") {
			ch.key = "system.tracos.resistencias.dano.bonus";
			ch.type = "add";
			contar(stats, "petrificado-rd");
			mudou = true;
		}
	}
	return mudou;
}

const USO_AUTOMATICO = new Set(["wVkiB8rJ4693G11A"]);

export function corrigirEfeito(ef, stats) {
	let condicao = corrigirCondicao(ef, stats);
	if (corrigirEncanto(ef, stats)) condicao = true;
	// Varinha arcana: "a CD para resistir a suas magias arcanas aumenta em +1" (p. 160) vale sempre, não é
	// opção a marcar (a correção "Esotéricos" esconde a varinha nas magias divinas).
	if (USO_AUTOMATICO.has(ef?._id) && ef.system?.onuse && ef.system.abilityUse && !ef.system.abilityUse.automatic) {
		ef.system.abilityUse.automatic = true;
		contar(stats, "uso-automatico");
		condicao = true;
	}
	const custo = CUSTO_DO_JDA[ef?._id];
	if (custo && ef.system?.onuse && Number(ef.system.abilityUse?.custo) === custo[0]) {
		ef.system.abilityUse.custo = custo[1];
		contar(stats, "custo-do-jda");
		condicao = true;
	}
	const changes = ef?.system?.changes;
	if (!Array.isArray(changes) || !changes.length) return condicao;
	const deUso = ehDeUso(ef);
	let mudou = condicao;
	for (const ch of changes) {
		if (typeof ch.key !== "string" || !ch.key.trim()) continue;
		const antes = JSON.stringify(ch);

		for (const [regra, de, para] of RENOMEAR) {
			if (de.test(ch.key)) {
				const nova = ch.key.replace(de, para);
				if (nova !== ch.key) {
					ch.key = nova;
					contar(stats, regra);
				}
			}
		}
		if (deUso) {
			for (const [regra, de, para] of RENOMEAR_USO) {
				if (de.test(ch.key)) {
					ch.key = ch.key.replace(de, para);
					contar(stats, regra);
				}
			}
		}

		// "Imunidades Dracônicas": system.tracos.ic[0] -> lista de imunidades
		if (/^system\.tracos\.ic\[\d+\]$/.test(ch.key)) {
			ch.key = "system.tracos.ic.value";
			ch.type = "add";
			contar(stats, "imunidade-indice");
		}
		// "Imunidades Aberrantes": imunidade a veneno é imunidade a efeito, não a tipo de dano
		if (ch.key === "system.tracos.resistencias.veneno.imunidade" && String(ch.value) === "true") {
			ch.key = "system.tracos.ic.value";
			ch.type = "add";
			ch.value = "veneno";
			contar(stats, "imunidade-veneno");
		}
		// "passos" só sobe o dado de dano como "custom"; como "somar" virava +1 de dano fixo
		// (Ferreiro, Presas Primordiais, Golpe no Joelho, Arma Natural Aprimorada…).
		if (ch.key === "passos" && ch.type === "add") {
			ch.type = "custom";
			contar(stats, "passos-somado");
		}
		// Em Chamas: "no início de seus turnos, sofre 1d6 pontos de dano de fogo" (JdA p. 394). O sistema só
		// rola dano no início do turno com a chave danoContinuo; com "dano" a condição nunca causava nada.
		if (ch.key === "dano" && (ef.statuses ?? []).includes("emchamas")) {
			ch.key = "danoContinuo";
			contar(stats, "em-chamas-continuo");
		}
		// "Fortitude anula" escrito como efeito (Alterar Tamanho)
		if (ch.key === "efeito" && /^(fortitude|reflexos|vontade)\b/i.test(String(ch.value).trim())) {
			ch.key = "resistencia";
			ch.type = "override";
			contar(stats, "resistencia-como-efeito");
		}
		// Sufixo "&bonus" só é removido pelo sistema em efeitos aplicados; em efeitos fixos fica inválido (Oração)
		if (!deUso && ef.transfer && /^system\..+&\w+$/.test(ch.key)) {
			ch.key = ch.key.replace(/&\w+$/, "");
			contar(stats, "sufixo-e-comercial");
		}

		if (typeof ch.value === "string") {
			// "–2" (travessão) não é número
			if (/^\s*[–—]\s*\d/.test(ch.value)) {
				ch.value = ch.value.replace(/^\s*[–—]\s*/, "-");
				contar(stats, "travessao");
			}
			// "@pv" não existe nos dados de rolagem (Enxame Kobold)
			if (/@pv\b/.test(ch.value)) {
				ch.value = ch.value.replace(/@pv\b/g, "@attributes.pv.value");
				contar(stats, "arroba-pv");
			}
		}

		// Tamanho somado vira texto concatenado ("medgra")
		if (ch.key === "system.tracos.tamanho" && ch.type === "add") {
			ch.type = "override";
			contar(stats, "tamanho-somado");
		}
		// "Soma sua Sabedoria em Acrobacia" escrito como troca do atributo da perícia
		if (/^system\.pericias\.\w+\.atributo$/.test(ch.key) && ch.type === "add" && /@\w+/.test(String(ch.value))) {
			ch.key = ch.key.replace(/\.atributo$/, ".bonus");
			ch.value = String(ch.value).replace(/[()]/g, "");
			contar(stats, "atributo-somado");
		}
		// Efeito fixo que "substitui" uma lista de bônus apaga os outros bônus (Armação para Mochila)
		if (!deUso && ef.transfer && ch.type === "override" && LISTA_DE_BONUS.test(ch.key)) {
			ch.type = "add";
			contar(stats, "substituir-lista");
		}

		if (JSON.stringify(ch) !== antes) mudou = true;
	}
	if (corrigirAprimoramentoDeItem(ef, deUso, stats)) mudou = true;
	return mudou;
}

function palavras(texto) {
	return String(texto ?? "")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter(Boolean);
}

/**
 * Correções que dependem dos outros efeitos do mesmo item.
 * - `efeito` apontando para um nome que não existe: troca pelo único efeito cujo nome começa com
 *   o valor ou contém todas as suas palavras (Alterar Tamanho: "Tamanho Aumentado").
 * - Efeito opcional (puxado por `efeito` de um aprimoramento) ligado por engano: desliga, senão
 *   ele vale sempre (Fogo e Aço, Alterar Tamanho).
 * - Efeito "(Aprimoramento +N PM)" ligado sem nenhum aprimoramento que o puxe: se houver um único
 *   aprimoramento de N PM no item, desliga o efeito e faz esse aprimoramento puxá-lo (Luz +5 PM).
 */
export function corrigirEfeitosDoItem(item, stats) {
	const efeitos = item?.effects ?? [];
	if (efeitos.length < 2) return false;
	let mudou = false;
	const opcionais = efeitos.filter((e) => !ehDeUso(e));
	const nomes = opcionais.map((e) => e.name);

	// Referências quebradas
	for (const ef of efeitos) {
		for (const ch of ef.system?.changes ?? []) {
			if (ch.key !== "efeito") continue;
			const valor = String(ch.value ?? "").trim();
			if (!valor || nomes.includes(valor)) continue;
			const alvo = palavras(valor);
			const candidatos = nomes.filter((n) => n.startsWith(valor) || alvo.every((p) => palavras(n).includes(p)));
			if (candidatos.length === 1) {
				ch.value = candidatos[0];
				contar(stats, "referencia-efeito");
				mudou = true;
			}
		}
	}

	const referenciados = new Set(
		efeitos.filter(ehDeUso).flatMap((e) => (e.system?.changes ?? []).filter((c) => c.key === "efeito").map((c) => String(c.value).trim()))
	);

	for (const ef of opcionais) {
		if (ef.disabled) continue;
		if (referenciados.has(ef.name)) {
			ef.disabled = true;
			contar(stats, "opcional-ligado");
			mudou = true;
			continue;
		}
		const custo = String(ef.name).match(/aprimoramento[^+]*\+\s*(\d+)\s*PM/i)?.[1];
		if (!custo) continue;
		const custoDe = (e) => {
			const c = e.system?.abilityUse?.custo ?? e.flags?.tormenta20?.custo;
			return c === "" || c === null || c === undefined ? null : Number(c);
		};
		const donos = efeitos.filter((e) => ehDeUso(e) && custoDe(e) === Number(custo));
		if (donos.length !== 1) continue;
		ef.disabled = true;
		const dono = donos[0];
		dono.system ??= {};
		dono.system.changes ??= [];
		if (!dono.system.changes.some((c) => c.key === "efeito" && c.value === ef.name)) {
			dono.system.changes.push({ key: "efeito", type: "custom", value: ef.name, phase: "initial", priority: null });
		}
		contar(stats, "aprimoramento-ligado");
		mudou = true;
	}
	return mudou;
}

/**
 * Consumíveis.
 * - Poção cadastrada como munição (Poção de Enfeitiçar): seria gasta como munição de arma.
 * - Efeito de uso da própria poção que nunca entra (Poção de Escudo da Fé: o efeito comum dá +0 e o
 *   +2 fica num efeito de uso opcional e com duração). Poção não tem escolhas: o efeito passa a
 *   automático e sem duração própria.
 */
function corrigirConsumivel(item, stats) {
	if (item?.type !== "consumivel") return false;
	let mudou = false;
	if (item.system?.tipo === "ammo" && /^(po[cç][aã]o|[oó]leo|granada)\b/i.test(item.name ?? "")) {
		item.system.tipo = "potion";
		contar(stats, "pocao-como-municao");
		mudou = true;
	}
	if (item.system?.tipo !== "potion") return mudou;
	for (const ef of item.effects ?? []) {
		const uso = ef.system?.abilityUse;
		if (!ef.system?.onuse || !uso || uso.automatic) continue;
		if (!(uso.types ?? []).includes("self") || Number(uso.custo) > 0) continue;
		if (!(ef.system.changes ?? []).some((c) => /^system\./.test(c.key ?? ""))) continue;
		uso.automatic = true;
		// Com duração própria ele conta como temporário, e o sistema ignora efeito temporário dentro de
		// item; quem dura a cena é o efeito aplicado.
		if (ef.duration) Object.assign(ef.duration, { expiry: null, value: null });
		contar(stats, "pocao-efeito-opcional");
		mudou = true;
	}
	return mudou;
}

/**
 * "Limitado pelo seu nível" (JdA p. 226): "para classes, use seu nível naquela classe; para outros
 * casos, seu nível de personagem".
 * - Atributo somado sem limite (Carapaça Kappa: @con) ganha min(nível, atributo).
 * - Poder de classe limitado pelo nível de personagem (Insolência: min(@nivel, @car)) passa a usar o
 *   nível na classe, mas só dentro de um ator que tem a classe: num NPC sem ela, @nvl.<classe> valeria 0.
 * @param {Set<string>|null} classesDoAtor  classes do ator dono do item (nome sem acento, minúsculo)
 */
function corrigirLimiteDeNivel(item, stats, classesDoAtor) {
	if (item?.type !== "poder") return false;
	if (!/limitad[oa] (pelo|a) seu nivel/.test(palavras(item.system?.description?.value).join(" "))) return false;
	// Mesma chave do sistema (nome da classe em slug): "Machado de Pedra" -> @nvl.machado-de-pedra.
	const classe = ["classe", "ability"].includes(item.system?.tipo) ? palavras(item.system?.subtipo).join("-") : "";
	const nivel = classe && classesDoAtor?.has(classe) ? `@nvl.${classe}` : "@nivel";
	let mudou = false;
	for (const ef of item.effects ?? []) {
		for (const ch of ef.system?.changes ?? []) {
			const valor = String(ch.value ?? "").trim();
			let novo = valor;
			if (/^\(?@(for|des|con|int|sab|car)\)?$/.test(valor)) novo = `(min(${nivel}, ${valor.replace(/[()]/g, "")}))`;
			else if (nivel !== "@nivel" && /min\(\s*@nivel\b/.test(valor)) novo = valor.replace(/@nivel\b/, nivel);
			if (novo === valor) continue;
			ch.value = novo;
			contar(stats, "limite-de-nivel");
			mudou = true;
		}
	}
	return mudou;
}

/**
 * Efeito base automático de magia sem custo (Arma Espiritual: "+2d6" sempre ligado) com custo vazio:
 * para o sistema, custo vazio + "própria magia" é Truque, que zera o custo da magia e (com o módulo)
 * bloqueia os outros aprimoramentos. Custo vazio vira 0.
 */
function corrigirBaseComoTruque(item, stats) {
	if (item?.type !== "magia") return false;
	let mudou = false;
	for (const ef of item.effects ?? []) {
		const uso = ef.system?.abilityUse;
		if (!ef.system?.onuse || !uso?.automatic || uso.custo !== null || !(uso.types ?? []).includes("self")) continue;
		if (String(ef.description ?? "").replace(/<[^>]+>/g, "").trim()) continue;
		uso.custo = 0;
		contar(stats, "base-como-truque");
		mudou = true;
	}
	return mudou;
}

/**
 * Raças com atributos diferentes do livro. Só mexe quando o valor ainda é o errado (homebrew fica).
 * - Minotauro (JdA p. 18 e 25): For +2, Con +1, Sab –1; o compêndio tinha Des +1.
 * - Yidishan (Ameaças de Arton p. 300): +1 em três, Car –2; o compêndio somava Con +1 a mais.
 * - Moreau, Herança da Raposa (AdA): "Inteligência +1, +1 em dois atributos"; faltava Int +1.
 * - Mashin (AdA, golem com chassi mashin): For +1, Car –1 e +1 em dois; faltavam For +1 e Car –1.
 * - Meio-Orc (AdA p. 31): "For +2, +1 em outro atributo (exceto Car)"; a lista deixava escolher For.
 * - Duende (Heróis de Arton p. 9): +1 em dois atributos diferentes (Dons) e +1 da Natureza Animal,
 *   que pode repetir um deles; a lista vinha vazia e o diálogo nem abria. Penalidade de tamanho à parte.
 */
const RACAS = {
	Minotauro: { atributos: { des: [1, 0], con: [0, 1] } },
	Yidishan: { atributos: { con: [1, 0] } },
	"Moreau - Herança da Raposa": { atributos: { int: [0, 1] } },
	Mashin: { atributos: { for: [0, 1], car: [0, -1] } },
	"Meio-Orc": { semEscolha: ["for"] },
	Duende: {
		listaVazia: ["for", "des", "con", "int", "sab", "car"],
		descricao: "+1 em três atributos diferentes ou +2 em um e +1 em outro (Dons + Natureza Animal; penalidade de tamanho à parte)"
	}
};

function corrigirRaca(item, stats) {
	const regra = item?.type === "race" && RACAS[item.name];
	if (!regra || !item.system) return false;
	let mudou = false;
	for (const [atributo, [errado, certo]] of Object.entries(regra.atributos ?? {})) {
		if (item.system.atributos?.[atributo] !== errado) continue;
		item.system.atributos[atributo] = certo;
		mudou = true;
	}
	const dinamicos = item.system.atributosDinamicos;
	if (regra.semEscolha && Array.isArray(dinamicos?.value)) {
		const lista = dinamicos.value.filter((a) => !regra.semEscolha.includes(a));
		if (lista.length !== dinamicos.value.length) {
			dinamicos.value = lista;
			mudou = true;
		}
	}
	if (regra.listaVazia && dinamicos && !(dinamicos.value ?? []).length) {
		dinamicos.value = regra.listaVazia;
		dinamicos.description = regra.descricao;
		mudou = true;
	}
	if (mudou) contar(stats, "atributos-da-raca");
	return mudou;
}

/**
 * NPCs do livro (compêndio Ameaças do sistema e cópias do Bestiário), casados pelo item, porque os efeitos
 * têm o mesmo _id de outros (Ordens, Falange; o Marca da Presa de jogador):
 * - Capitão-Baluarte, Comandar (Padrão): "Os aliados em alcance médio do capitão-baluarte recebem +4 em
 *   testes de ataque e rolagens de dano até o fim da rodada." O efeito era uma cópia de uso sem tipo, com
 *   chaves que não valem num efeito aplicado. Vira botão: +4 em ataque e dano até o fim da rodada.
 * - Comandar das Habilidades de Criaturas: o texto é o do poder (+1 em testes de perícia até o fim da
 *   cena), mas o efeito era a mesma cópia de +4. Fica igual ao do compêndio de Poderes.
 * - Finntroll Caçador, Marca da Presa: tinha o aumento "a cada quatro níveis" do caçador de jogador
 *   (+1d8 → 1d12 → 2d8…), que o NPC do livro não tem. Sai.
 */
const COMANDAR_DO_CAPITAO = "GPdSL3Xsv2hOGYRu";
/**
 * Ordens e Falange (JdA p. 289, Sargento da Guarda; Ameaças de Arton, Centurião, Legionário, Chefes, Gnoll
 * Líder, Meio-Orc Chefe, Decúria). Mesmo efeito copiado em vários NPCs, com valor e duração errados em
 * alguns (o Sargento dava +1; o Meio-Orc Chefe durava 1 rodada):
 * - Ordens (Movimento): aliados em alcance médio recebem +2 em testes de perícia até o fim da cena;
 * - Falange (Movimento): os participantes recebem +2 na Defesa e em testes de resistência (botão; o mestre
 *   tira se eles se separarem);
 * - Falange da Decúria: só ela, enquanto tiver pelo menos metade dos PV (o efeito sai sozinho abaixo disso).
 */
const ORDENS = new Set(["EShRuBn2O7iOGknI", "7OJdCKWdosQvT5Pm", "cEAtilHTAe6m61M6", "nD1BYQidd62wC8TP", "z3G0YlfkMjf58QEv", "wdFPZEXAML9l7CjI", "hZPjjEcy9aa5Q9yS"]);
const FALANGE = new Set(["XTRFhjTNUVsVtrX7", "ZrSSRRxwgWlKSewS", "4WjiJuyP6MvI3etJ"]);
const FALANGE_DA_DECURIA = "XXVd35K9twEqzgHt";
const DESCRICAO_DA_DECURIA = "<p>A decúria assume uma formação defensiva. Enquanto tiver pelo menos metade de seus PV, ela recebe +2 na Defesa e em testes de resistência.</p>";

function efeitoDeBotao(ef, changes, flags = {}) {
	const antes = JSON.stringify([ef.system?.changes, ef.duration?.expiry, ef.transfer, ef.disabled, ef.system?.onuse, ef.flags?.[MODULE_ID]]);
	ef.system ??= {};
	ef.system.onuse = false;
	ef.system.abilityUse = { ...(ef.system.abilityUse ?? {}), automatic: false, aumenta: false, custo: null, types: [], names: [] };
	ef.system.changes = changes;
	ef.disabled = false;
	ef.transfer = false;
	ef.duration = { ...(ef.duration ?? {}), value: null, units: "rounds", expiry: "sceneEnd" };
	if (Object.keys(flags).length) ef.flags = { ...(ef.flags ?? {}), [MODULE_ID]: { ...(ef.flags?.[MODULE_ID] ?? {}), ...flags } };
	return antes !== JSON.stringify([ef.system.changes, ef.duration.expiry, ef.transfer, ef.disabled, ef.system.onuse, ef.flags?.[MODULE_ID]]);
}

function corrigirOrdensEFalange(item, stats) {
	const texto = palavras(item.system?.description?.value).join(" ");
	const ehOrdens = item.name === "Ordens" && (ORDENS.has(item._id) || texto.includes("recebem 2 em testes de pericia ate o fim da cena"));
	const ehDecuria = item.name === "Falange" && item._id === FALANGE_DA_DECURIA;
	const ehFalange = item.name === "Falange" && !ehDecuria && (FALANGE.has(item._id) || texto.includes("participantes da falange recebem 2"));
	if (!ehOrdens && !ehFalange && !ehDecuria) return false;
	let mudou = false;
	for (const ef of item.effects ?? []) {
		const changes = ehOrdens
			? [mudancaInicial("system.modificadores.pericias.geral", "add", "2")]
			: [mudancaInicial("system.attributes.defesa.bonus", "add", "2"), mudancaInicial("system.modificadores.pericias.resistencia", "add", "2")];
		if (efeitoDeBotao(ef, changes, ehDecuria ? { acabaAbaixoDaMetade: true } : {})) {
			contar(stats, ehOrdens ? "ordens" : "falange");
			mudou = true;
		}
	}
	if (ehDecuria && item.system?.description && item.system.description.value !== DESCRICAO_DA_DECURIA) {
		item.system.description.value = DESCRICAO_DA_DECURIA;
		mudou = true;
	}
	return mudou;
}
const MARCA_DO_FINNTROLL = "PSgdd8rkNyCPhwhy";
const AUMENTO_DA_MARCA = "XPXweXqgvWZY5KCo";

function corrigirNpcsDoLivro(item, stats) {
	if (!Array.isArray(item?.effects)) return false;
	const texto = palavras(item.system?.description?.value).join(" ");
	let mudou = false;
	if (item.name === "Comandar") {
		const doCapitao = item._id === COMANDAR_DO_CAPITAO || texto.includes("capitao baluarte recebem 4");
		const doPoder = !doCapitao && texto.includes("recebem 1 em testes de pericia");
		for (const ef of item.effects) {
			if (!temChangeQuatro(ef) || (!doCapitao && !doPoder)) continue;
			ef.system ??= {};
			ef.system.onuse = false;
			ef.system.abilityUse = { ...(ef.system.abilityUse ?? {}), automatic: false, custo: null, types: [], names: [] };
			ef.disabled = false;
			ef.transfer = false;
			if (doCapitao) {
				ef.system.changes = [mudancaInicial("system.modificadores.ataque.geral", "add", "4"), mudancaInicial("system.modificadores.dano.geral", "add", "4")];
				ef.duration = { ...(ef.duration ?? {}), value: null, units: "rounds", expiry: "roundEnd" };
			} else {
				ef.system.changes = [mudancaInicial("system.modificadores.pericias.geral", "add", "1")];
				ef.duration = { ...(ef.duration ?? {}), value: null, units: "rounds", expiry: "sceneEnd" };
			}
			contar(stats, doCapitao ? "comandar-do-capitao" : "comandar-do-poder");
			mudou = true;
		}
	}
	if (item.name === "Marca da Presa" && (item._id === MARCA_DO_FINNTROLL || /^o finntroll/.test(texto))) {
		const antes = item.effects.length;
		item.effects = item.effects.filter((ef) => ef._id !== AUMENTO_DA_MARCA);
		if (item.effects.length !== antes) {
			contar(stats, "marca-do-finntroll");
			mudou = true;
		}
	}
	return mudou;
}

/**
 * "Você fica imune às condições surpreendido e desprevenido" (Concentração de Combate +14 PM) escrito
 * como "condicao": o aprimoramento aplicava as condições em quem lança. Vira imunidade no efeito que o
 * aprimoramento puxa para o cartão.
 */
function corrigirImunidadeComoCondicao(item, stats) {
	let mudou = false;
	for (const ef of item?.effects ?? []) {
		const changes = ef.system?.changes ?? [];
		const texto = palavras(ef.description).join(" ");
		const frase = texto.match(/imune (?:as|a) condic(?:oes|ao) ([a-z ]+)/)?.[1];
		if (!frase) continue;
		const imunes = changes.filter((c) => c.key === "condicao" && frase.includes(palavras(c.value).join(" ")));
		const puxado = changes.find((c) => c.key === "efeito");
		const alvo = puxado && item.effects.find((e) => e !== ef && e.name === String(puxado.value));
		if (!imunes.length || !alvo) continue;
		ef.system.changes = changes.filter((c) => !imunes.includes(c));
		alvo.system ??= {};
		alvo.system.changes ??= [];
		for (const c of imunes) {
			const status = palavras(c.value).join("");
			if (!alvo.system.changes.some((x) => x.key === "system.tracos.ic.value" && x.value === status)) {
				alvo.system.changes.push(mudancaInicial("system.tracos.ic.value", "add", status));
			}
		}
		contar(stats, "imunidade-como-condicao");
		mudou = true;
	}
	return mudou;
}

/**
 * Combinações do lutador (Heróis de Arton p. 73–74):
 * - o custo das Combinações fica só na opção do ataque; no item, clicar no poder cobrava o PM de novo;
 * - Esquiva Técnica dava +5 no próprio teste de Reflexos (o +5 do livro é para o próximo ataque);
 * - "até o fim do seu próximo turno" (Um-Dois, Chute no Joelho) acabava no início dele.
 */
const COMBINACOES_COM_CUSTO_NO_ITEM = new Set(["JB1KSZgVlWVDJUfI", "SstZImBPjR7OZfEV", "fqybWdCwFGbE51GN", "2OEZFaID6cO8Eu45", "gzS6uhWnO59y9BeE"]);
const ATE_O_FIM_DO_PROXIMO_TURNO = new Set(["SSGIgTQAwwyoCeLl", "x5GGRSwV6DhePZEr"]);

function corrigirCombinacoes(item, stats) {
	if (!String(item?.name ?? "").startsWith("Combinação:")) return false;
	let mudou = false;
	if (COMBINACOES_COM_CUSTO_NO_ITEM.has(item._id) && Number(item.system?.ativacao?.custo) > 0) {
		item.system.ativacao.custo = 0;
		mudou = true;
	}
	for (const ef of item.effects ?? []) {
		if (ef._id === "otFqks3y8Q7jTY1v" && temChange(ef, "ataque", "5")) {
			ef.system.changes = ef.system.changes.filter((c) => !(c.key === "ataque" && String(c.value) === "5"));
			mudou = true;
		}
		if (ATE_O_FIM_DO_PROXIMO_TURNO.has(ef._id) && ef.duration?.expiry === "turnStart") {
			ef.duration.expiry = "turnEnd";
			mudou = true;
		}
	}
	if (mudou) contar(stats, "combinacoes");
	return mudou;
}

/**
 * Fascinar em Massa e Melodia Restauradora (JdA p. 44–45) se aplicam pelo nome do poder usado, mas apontavam
 * para "Fascinar" e "Melodia Curativa"; as Músicas (compêndio Itens do livro) se chamam como no livro.
 */
const NOMES_DAS_MUSICAS = { Fascinar: "Música: Balada Fascinante", "Melodia Curativa": "Música: Melodia Curativa" };

function corrigirMusicasDoBardo(item, stats) {
	let mudou = false;
	for (const ef of item?.effects ?? []) {
		const nomes = ef.system?.abilityUse?.names;
		if (!Array.isArray(nomes) || !nomes.some((n) => n in NOMES_DAS_MUSICAS)) continue;
		ef.system.abilityUse.names = nomes.map((n) => NOMES_DAS_MUSICAS[n] ?? n);
		mudou = true;
	}
	if (mudou) contar(stats, "musicas-do-bardo");
	return mudou;
}

const temChange = (ef, key, value) => (ef.system?.changes ?? []).some((c) => c.key === key && String(c.value) === value);

/** A cópia de "Ordens" (+4 em ataque e dano como chaves de uso). */
function temChangeQuatro(ef) {
	const changes = ef.system?.changes ?? [];
	return changes.some((c) => c.key === "ataque" && String(c.value) === "4") && changes.some((c) => c.key === "dano" && String(c.value) === "4");
}

const mudancaInicial = (key, type, value) => ({ key, type, value, phase: "initial", priority: null });

export function corrigirItem(item, stats, classesDoAtor = null) {
	let mudou = false;
	if (corrigirRaca(item, stats)) mudou = true;
	if (corrigirEncantosDoItem(item, stats)) mudou = true;
	if (corrigirBaseComoTruque(item, stats)) mudou = true;
	for (const ef of item?.effects ?? []) if (corrigirEfeito(ef, stats)) mudou = true;
	if (corrigirEfeitosDoItem(item, stats)) mudou = true;
	if (corrigirConsumivel(item, stats)) mudou = true;
	if (corrigirNpcsDoLivro(item, stats)) mudou = true;
	if (corrigirOrdensEFalange(item, stats)) mudou = true;
	if (corrigirCombinacoes(item, stats)) mudou = true;
	if (corrigirMusicasDoBardo(item, stats)) mudou = true;
	if (corrigirImunidadeComoCondicao(item, stats)) mudou = true;
	if (corrigirClasses(item, stats)) mudou = true;
	if (corrigirItensDoLivro(item, stats)) mudou = true;
	if (corrigirPoderesRaciais(item, stats)) mudou = true;
	if (corrigirItensGerais(item, stats)) mudou = true;
	if (corrigirSuplementos(item, stats)) mudou = true;
	if (corrigirLimiteDeNivel(item, stats, classesDoAtor)) mudou = true;
	return mudou;
}

export function corrigirAtor(actor, stats) {
	let mudou = corrigirFicha(actor, stats);
	const classes = new Set((actor?.items ?? []).filter((i) => i.type === "classe").map((i) => palavras(i.name).join("-")));
	for (const ef of actor?.effects ?? []) {
		if (corrigirEfeitoDaAmeaca(ef, stats)) mudou = true;
		if (corrigirEfeito(ef, stats)) mudou = true;
	}
	for (const item of actor?.items ?? []) {
		for (const ef of item.effects ?? []) if (corrigirEfeitoDaAmeaca(ef, stats)) mudou = true;
		if (corrigirItem(item, stats, classes)) mudou = true;
	}
	return mudou;
}
