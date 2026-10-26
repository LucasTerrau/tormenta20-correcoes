import { MODULE_ID } from "../constants.mjs";
import { CATEGORIAS, TABELA_81, TABELAS } from "../migracao/tesouro-dados.mjs";
import { warn, wrap } from "../util.mjs";
import { ndNumerico } from "./recompensas.mjs";

/**
 * Tesouro (JdA p. 327–345; suplementos):
 * - Tabela 8-1: uma rolagem na coluna Dinheiro e outra na coluna Itens, na linha do ND. Nenhum: nada;
 *   Metade: metade do dinheiro; Dobro: duas rolagens em cada coluna (Triplo, das fichas dos suplementos:
 *   três). "+%": +20% no d% da riqueza ou poção; "2D": 2d6 para o tipo do equipamento ou item mágico, e
 *   escolhe.
 * - O sistema não tinha a Tabela 8-1 nem as de esotéricos, e várias subtabelas eram as do Livro Básico
 *   (Itens Diversos, Armaduras e Escudos com 1d12, Poções com Enfeitiçar, Armas Superiores…). Os itens dos
 *   suplementos (Heróis, Deuses, Ameaças, Atlas, Guia de Deuses Menores, Distinções) não estavam em nenhuma.
 * Correção: as RollTables do compêndio "Tabelas de Tesouro" são trocadas em memória pelas do JdA com os itens
 *   dos suplementos (cada um com o peso médio de um item do livro na mesma tabela). O módulo rola a Tabela
 *   8-1 inteira: comando "/tesouro ND [categoria]" no chat e botão no cartão de fim de combate (por criatura,
 *   ou pelo ND do encontro). Modificadores do grupo: Dinheiro Atrai Dinheiro (+5% por personagem), Armas e
 *   Espólios, Aventureiro Inquieto e Sucateiro de Batalhas (rola duas vezes e fica com o melhor), Faro para
 *   Tesouro (dinheiro duas vezes), Toque de Esmeralda (riqueza duas vezes).
 */
const POR_SISTEMA = new Map(Object.values(TABELAS).filter((t) => t.sistema).map((t) => [t.sistema, t]));

/* -------------------------------------------- RollTables do compêndio */

function substituirResultados(source) {
	const origem = source?._stats?.compendiumSource ?? source?.flags?.core?.sourceId ?? "";
	const id = POR_SISTEMA.has(source?._id) ? source._id : origem.match(/tabelas-de-tesouro\.RollTable\.(\w{16})$/)?.[1];
	const t = id && POR_SISTEMA.get(id);
	if (!t || !Array.isArray(source.results)) return;
	source.formula = t.formula;
	source.results = t.resultados.map((r) => ({ ...structuredClone(r), documentUuid: r.documentUuid ?? undefined }));
}

/* -------------------------------------------- sorteio */

const rolar = async (formula) => (await new Roll(String(formula)).evaluate()).total;

/** Sorteia numa das tabelas do módulo. bonus em % (0–100) soma no dado, com teto no fim da tabela. */
async function sortear(chave, bonus = 0) {
	const t = TABELAS[chave];
	const max = t.resultados.at(-1).range[1];
	const valor = Math.min(max, (await rolar(t.formula)) + Math.round((bonus / 100) * max));
	return t.resultados.find((r) => valor >= r.range[0] && valor <= r.range[1]) ?? t.resultados.at(-1);
}

const flag = (r, chave) => r?.flags?.[MODULE_ID]?.[chave];
const nomeDe = (r) => (r.name || r.description || "").replace(/<[^>]+>/g, "");
const link = (r) => (r.documentUuid ? `@UUID[${r.documentUuid}]{${nomeDe(r) || "item"}}` : nomeDe(r));

async function textoComValor(r, mult = 1) {
	let texto = r.description || r.name || "";
	let valor = 0;
	for (const m of [...texto.matchAll(/\[\[(.+?)\]\]/g)]) {
		const v = Math.floor((await rolar(m[1])) * mult);
		valor += v;
		texto = texto.replace(m[0], String(v));
	}
	return { texto: texto.replace(/<[^>]+>/g, ""), valor };
}

const TIPO_EQUIPAMENTO = (d) => (d <= 3 ? "armas" : d <= 5 ? "armadurasEscudos" : "esotericos");
const TIPO_MAGICO = (d) => (d <= 2 ? "arma" : d === 3 ? "armadura" : "acessorio");
const MELHORIAS = { armas: "melhoriasArmas", armadurasEscudos: "melhoriasArmaduras", esotericos: "melhoriasEsotericos" };

async function dadoDeTipo(doisD6) {
	const a = await rolar("1d6");
	if (!doisD6) return [a];
	return [a, await rolar("1d6")];
}

async function itemBase(chave) {
	const r = await sortear(chave);
	const qtd = flag(r, "qtd");
	return `${link(r)}${qtd ? ` (${qtd})` : ""}`;
}

async function superior(chave, n) {
	const base = await itemBase(chave);
	const melhorias = [];
	let restam = n;
	for (let tentativas = 0; restam > 0 && tentativas < 30; tentativas++) {
		const r = await sortear(MELHORIAS[chave]);
		const custo = flag(r, "dois") ? 2 : 1;
		if (custo > restam || melhorias.includes(nomeDe(r))) continue;
		let nome = nomeDe(r);
		if (flag(r, "material")) nome = `material especial: ${nomeDe(await sortear("materiais"))}`;
		melhorias.push(nome);
		restam -= custo;
	}
	return `${base} superior: ${melhorias.join(", ")}`;
}

async function magico(categoria, doisD6) {
	const dados = await dadoDeTipo(doisD6);
	const opcoes = [];
	for (const d of dados) {
		const tipo = TIPO_MAGICO(d);
		if (tipo === "acessorio") {
			const r = await sortear({ menor: "acessoriosMenores", medio: "acessoriosMedios", maior: "acessoriosMaiores" }[categoria]);
			opcoes.push(link(r));
			continue;
		}
		// Esotérico mágico (Heróis de Arton) entra no resultado de arma, na proporção da tabela de
		// equipamento (arma 1–3, esotérico 6: um em cada quatro). Decisão do usuário, 22/10/2026.
		const esoterico = tipo === "arma" && TABELAS.encantosEsotericos?.resultados?.length && (await rolar("1d4")) === 4;
		const base = esoterico ? "esotericos" : tipo === "arma" ? "armas" : "armadurasEscudos";
		const encantos = esoterico ? "encantosEsotericos" : tipo === "arma" ? "encantosArmas" : "encantosArmaduras";
		const especificas = esoterico ? "esotericosEspecificos" : tipo === "arma" ? "armasEspecificas" : "armadurasEspecificas";
		let restam = { menor: 1, medio: 2, maior: 3 }[categoria];
		const lista = [];
		let especifica = null;
		for (let tentativas = 0; restam > 0 && tentativas < 30; tentativas++) {
			const r = await sortear(encantos);
			if (flag(r, "especifica")) {
				especifica = await sortear(especificas);
				break;
			}
			const custo = flag(r, "dois") ? 2 : 1;
			if (custo > restam || lista.includes(nomeDe(r))) continue;
			lista.push(nomeDe(r).replace(/\s*\(.*\)$/, ""));
			restam -= custo;
		}
		opcoes.push(especifica ? `${link(especifica)} (específico)` : `${await itemBase(base)} mágico: ${lista.join(", ")}`);
	}
	return opcoes.length > 1 ? `${opcoes[0]} <em>ou, pelo 2D,</em> ${opcoes[1]}` : opcoes[0];
}

/**
 * Rola uma coluna da Tabela 8-1.
 * @returns {Promise<{rolagem:number, linhas:string[], moedas:object, valorRiquezas:number}>}
 */
async function coluna(linha, nome, { bonus, duasVezes, multDinheiro, riquezaDuasVezes }) {
	const d1 = Math.min(100, (await rolar("1d100")) + bonus);
	const d = duasVezes ? Math.max(d1, Math.min(100, (await rolar("1d100")) + bonus)) : d1;
	const r = linha[nome].find((e) => d >= e.de && d <= e.ate);
	const saida = { rolagem: d, linhas: [], moedas: {}, valorRiquezas: 0 };
	if (!r || r.resultado === "—" || !r.tipo) return saida;
	const qtd = r.quantidade ? Math.max(1, await rolar(r.quantidade)) : 1;
	switch (r.tipo) {
		case "moedas": {
			const valor = Math.floor((await rolar(r.rolagem)) * multDinheiro);
			saida.moedas[r.moeda] = (saida.moedas[r.moeda] ?? 0) + valor;
			break;
		}
		case "riqueza": {
			const chave = { menor: "riquezaMenor", "média": "riquezaMedia", media: "riquezaMedia", maior: "riquezaMaior" }[r.categoria];
			for (let i = 0; i < qtd; i++) {
				let melhor = await textoComValor(await sortear(chave, (r.bonusD100 ?? 0) + bonus), multDinheiro);
				if (riquezaDuasVezes) {
					const outra = await textoComValor(await sortear(chave, (r.bonusD100 ?? 0) + bonus), multDinheiro);
					if (outra.valor > melhor.valor) melhor = outra;
				}
				saida.linhas.push(`Riqueza ${r.categoria}: ${melhor.texto}`);
				saida.valorRiquezas += melhor.valor;
			}
			break;
		}
		case "diverso":
			for (let i = 0; i < qtd; i++) saida.linhas.push(await itemBase("diversos"));
			break;
		case "pocao":
			for (let i = 0; i < qtd; i++) saida.linhas.push(link(await sortear("pocoes", (r.bonusD100 ?? 0) + bonus)));
			break;
		case "equipamento":
		case "superior": {
			for (let i = 0; i < qtd; i++) {
				const dados = await dadoDeTipo(r.doisD6);
				const opcoes = [];
				for (const dado of dados) opcoes.push(r.tipo === "superior" ? await superior(TIPO_EQUIPAMENTO(dado), r.melhorias ?? 1) : await itemBase(TIPO_EQUIPAMENTO(dado)));
				saida.linhas.push(opcoes.length > 1 ? `${opcoes[0]} <em>ou, pelo 2D,</em> ${opcoes[1]}` : opcoes[0]);
			}
			break;
		}
		case "magico":
			for (let i = 0; i < qtd; i++) saida.linhas.push(await magico(String(r.categoria).normalize("NFD").replace(/[̀-ͯ]/g, ""), r.doisD6));
			break;
		default:
			saida.linhas.push(r.resultado);
	}
	return saida;
}

/** Linha da Tabela 8-1 para um ND (frações abaixo de 1; acima de 20, a de 20). */
function linhaDoND(nd) {
	const n = ndNumerico(nd);
	const linhas = TABELA_81.map((l) => ({ l, n: ndNumerico(l.nd) })).filter((x) => x.n <= Math.max(n, 0.25));
	return (linhas.at(-1) ?? { l: TABELA_81[0] }).l;
}

export function categoriaDoTexto(texto) {
	const t = String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
	if (!t.trim()) return "padrao";
	if (/^\s*nenhum/.test(t)) return "nenhum";
	if (/triplo/.test(t)) return "triplo";
	if (/dobro/.test(t)) return "dobro";
	if (/metade/.test(t)) return "metade";
	if (/padrao/.test(t)) return "padrao";
	return "nenhum";
}

/** Modificadores do grupo pelos itens dos personagens. */
export function modificadoresDoGrupo(personagens = []) {
	const tem = (nome) => personagens.filter((a) => a?.items?.some((i) => i.name === nome));
	return {
		bonus: 5 * tem("Dinheiro Atrai Dinheiro").length,
		duasVezes: ["Armas e Espólios", "Aventureiro Inquieto", "Sucateiro de Batalhas"].some((n) => tem(n).length),
		dinheiroDuasVezes: tem("Faro para Tesouro").length > 0,
		riquezaDuasVezes: tem("Toque de Esmeralda").length > 0
	};
}

/**
 * Rola o tesouro de uma criatura (ou encontro) na Tabela 8-1.
 * @param {{nd: string|number, categoria?: string, nome?: string, mods?: object}} opcoes
 */
export async function rolarTesouro({ nd, categoria = "padrao", nome = "", mods = {} }) {
	const cat = CATEGORIAS[categoria] ?? CATEGORIAS.padrao;
	const linha = linhaDoND(nd);
	const moedas = {};
	const linhas = [];
	const rolagens = [];
	let valorRiquezas = 0;
	for (const [col, vezes] of [["dinheiro", cat.dinheiro ?? 0], ["itens", cat.itens ?? 0]]) {
		for (let i = 0; i < vezes; i++) {
			const r = await coluna(linha, col, {
				bonus: mods.bonus ?? 0,
				duasVezes: mods.duasVezes || (col === "dinheiro" && mods.dinheiroDuasVezes),
				multDinheiro: col === "dinheiro" ? cat.multDinheiro ?? 1 : 1,
				riquezaDuasVezes: mods.riquezaDuasVezes
			});
			rolagens.push(`${col} ${r.rolagem}`);
			for (const [m, v] of Object.entries(r.moedas)) moedas[m] = (moedas[m] ?? 0) + v;
			linhas.push(...r.linhas);
			valorRiquezas += r.valorRiquezas;
		}
	}
	return { nd: linha.nd, categoria, nome, moedas, linhas, rolagens, valorRiquezas };
}

const NOMES_MOEDA = { tc: "TC", tp: "T$", to: "TO", tl: "TL" };

export async function postarTesouro(resultados, { mods = {}, titulo = "Tesouro" } = {}) {
	const partes = resultados.map((t) => {
		const moedas = Object.entries(t.moedas).filter(([, v]) => v).map(([m, v]) => `${v} ${NOMES_MOEDA[m] ?? m}`);
		const itens = [...(moedas.length ? [moedas.join(", ")] : []), ...t.linhas];
		const cabecalho = `${t.nome ? `${t.nome} — ` : ""}ND ${t.nd}, ${t.categoria}`;
		return `<p><strong>${cabecalho}</strong> <span style="opacity:.7">(d% ${t.rolagens.join(", ")})</span></p>${itens.length ? `<ul>${itens.map((i) => `<li>${i}</li>`).join("")}</ul>` : "<p>Nada.</p>"}`;
	});
	const notas = [];
	if (mods.bonus) notas.push(`+${mods.bonus}% (Dinheiro Atrai Dinheiro)`);
	if (mods.duasVezes) notas.push("duas rolagens, a melhor (Armas e Espólios / Aventureiro Inquieto / Sucateiro de Batalhas)");
	if (mods.dinheiroDuasVezes) notas.push("dinheiro duas vezes (Faro para Tesouro)");
	if (mods.riquezaDuasVezes) notas.push("riqueza duas vezes (Toque de Esmeralda)");
	const conteudo = `<div class="t20c-tesouro"><p><strong>${titulo}</strong></p>${partes.join("")}${notas.length ? `<p style="font-size:.85em;opacity:.8">${notas.join("; ")}</p>` : ""}</div>`;
	await ChatMessage.create({ content: conteudo, whisper: game.users.filter((u) => u.isGM).map((u) => u.id) });
}

/* -------------------------------------------- tabelas no mundo */

/**
 * Cria (ou atualiza) no mundo uma pasta com todas as tabelas de tesouro do módulo, inclusive as que o
 * compêndio do sistema não tem (esotéricos, esotéricos mágicos, encantos de acessórios), para rolar à mão.
 */
export async function criarTabelasNoMundo() {
	const nomePasta = "Tabelas de Tesouro (JdA e suplementos)";
	const pasta = game.folders.find((f) => f.type === "RollTable" && f.getFlag(MODULE_ID, "tesouro")) ?? (await Folder.create({ name: nomePasta, type: "RollTable", flags: { [MODULE_ID]: { tesouro: true } } }));
	const existentes = new Map(game.tables.filter((t) => t.getFlag(MODULE_ID, "tabela")).map((t) => [t.getFlag(MODULE_ID, "tabela"), t]));
	let criadas = 0;
	let atualizadas = 0;
	for (const [chave, t] of Object.entries(TABELAS)) {
		const results = t.resultados.map((r) => ({ ...structuredClone(r), documentUuid: r.documentUuid ?? undefined }));
		const atual = existentes.get(chave);
		if (atual) {
			await atual.deleteEmbeddedDocuments("TableResult", atual.results.map((r) => r.id));
			await atual.update({ formula: t.formula });
			await atual.createEmbeddedDocuments("TableResult", results);
			atualizadas++;
		} else {
			await RollTable.create({ name: t.nome, formula: t.formula, replacement: true, displayRoll: true, folder: pasta.id, results, flags: { [MODULE_ID]: { tabela: chave } } });
			criadas++;
		}
	}
	ui.notifications.info(`Tabelas de tesouro: ${criadas} criadas, ${atualizadas} atualizadas na pasta "${pasta.name}".`);
}

/* -------------------------------------------- recursos extraíveis */

export async function extrairRecursos(nd, ator) {
	const actor = ator ?? canvas.tokens?.controlled?.[0]?.actor ?? game.user.character;
	if (!actor) return ui.notifications.warn("Selecione o token de quem extrai.");
	const cd = 15 + Math.floor(ndNumerico(nd));
	const carcacas = actor.items.some((i) => i.name === "Vendedor de Carcaças");
	const shiftKey = game.settings.get("tormenta20", "UsageConfig") === "default";
	const teste = await actor.rollPericia("sobr", { event: { shiftKey }, message: false });
	if (!teste) return;
	const total = teste.total + (carcacas ? 5 : 0);
	await teste.toMessage({
		speaker: ChatMessage.getSpeaker({ actor }),
		flavor: `Extrair recursos (Sobrevivência ou Ofício relacionado, CD ${cd}${carcacas ? "; Vendedor de Carcaças: +5 e 1 minuto" : "; 1 hora"}): ${total >= cd ? "extraiu" : "os recursos se estragam"}${carcacas ? ` (total ${total})` : ""}`
	});
}

export default {
	id: "tesouro",
	name: "Tesouro: Tabela 8-1, tabelas do JdA e itens dos suplementos",
	hint: "As tabelas de tesouro do compêndio passam a ser as do Jogo do Ano, com os itens de Heróis, Deuses, Ameaças, Atlas, Guia de Deuses Menores e Distinções (peso médio de um item do livro). O módulo rola a Tabela 8-1 inteira: comando /tesouro ND [categoria] no chat e botão no cartão de fim de combate, com os modificadores do grupo (Dinheiro Atrai Dinheiro, Armas e Espólios, Faro para Tesouro…). JdA p. 327–345.",
	init() {
		wrap("CONFIG.RollTable.documentClass.migrateData", function (wrapped, source, ...args) {
			try {
				substituirResultados(source);
			} catch (error) {
				warn("Falha ao montar a tabela de tesouro.", error);
			}
			return wrapped(source, ...args);
		});
		// "/tesouro 5 dobro"; "/tesouro tabelas" cria as tabelas no mundo.
		Hooks.on("chatMessage", (log, texto) => {
			const m = String(texto).trim().match(/^\/tesouro\s+(\S+)(?:\s+(\S+))?/i);
			if (!m) return true;
			if (!game.user.isGM) {
				ui.notifications.warn("Só o mestre rola tesouro.");
				return false;
			}
			if (/^tabelas$/i.test(m[1])) {
				criarTabelasNoMundo().catch((error) => warn("Falha ao criar as tabelas.", error));
				return false;
			}
			const categoria = m[2] ? categoriaDoTexto(m[2]) : "padrao";
			const personagens = game.users.filter((u) => u.character).map((u) => u.character);
			const mods = modificadoresDoGrupo(personagens);
			rolarTesouro({ nd: m[1], categoria, mods })
				.then((t) => postarTesouro([t], { mods }))
				.catch((error) => warn("Falha ao rolar o tesouro.", error));
			return false;
		});
	},
	ready() {
		const modulo = game.modules.get(MODULE_ID);
		modulo.api = { ...(modulo.api ?? {}), rolarTesouro, postarTesouro, extrairRecursos, categoriaDoTexto, modificadoresDoGrupo, criarTabelasNoMundo };
	}
};
