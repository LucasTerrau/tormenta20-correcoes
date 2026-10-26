import { expandirPericias, listaDeEscolhas, nomePericia, poderesGerais } from "./pecas.mjs";
import { escapar, limpar, normalizar } from "./regras.mjs";

/**
 * Poderes que dão outro poder, uma perícia treinada ou um bônus em perícia à escolha. Os assistentes perguntam a
 * escolha quando o personagem recebe o poder (raça, origem, classe, poder do nível, poder concedido).
 * Chave: nome do poder sem acentos; `de` desempata nomes repetidos (subtipo do poder).
 * Cada vaga:
 *   { tipo: "pericia" }                treinado numa perícia; `lista` (chaves) ou `atributos` limitam as opções
 *   { tipo: "bonus", valor: 2 }        +2 numa perícia (efeito no próprio poder)
 *   { tipo: "poder", listas }          um poder das listas
 *   ou: { listas }                     a vaga pode virar um poder das listas no lugar
 * listas: "geral" (gerais comuns e da raça), "combate", "destino", "magia", "tormenta", "origem" (poder único das
 *   origens do JdA), "classe:<chave>" (poderes da classe), "armadilha" (Armadilhas do caçador),
 *   "maravilha" (maravilhas mecânicas do mashin). `exceto`: subtipos de poder geral fora da escolha.
 */
export const CONCESSOES = {
	// Raças
	versatil: { de: "Humano", vagas: [{ tipo: "pericia" }, { tipo: "pericia", ou: { listas: ["geral"] } }] },
	deformidade: { de: "Lefou", vagas: [{ tipo: "bonus", valor: 2 }, { tipo: "bonus", valor: 2, ou: { listas: ["tormenta"] } }] },
	"memoria postuma": { de: "Osteon", vagas: [{ tipo: "pericia", ou: { listas: ["geral"] } }] },
	"natureza organica": { de: "Yidishan", vagas: [{ tipo: "pericia", ou: { listas: ["geral"] } }] },
	"resquicios da outra vida": { vagas: [{ tipo: "pericia", ou: { listas: ["geral"] } }] },
	"proposito de criacao": { de: "Golem", semOrigem: true, vagas: [{ tipo: "poder", listas: ["geral"] }] },
	plurivalente: { de: "Minauro", vagas: [{ tipo: "poder", listas: ["geral"] }] },
	"ambicao herdada": { de: "Meio-Elfo", vagas: [{ tipo: "poder", listas: ["geral", "origem"] }] },
	"terror vivo": { de: "Kaijin", vagas: [{ tipo: "poder", listas: ["tormenta"] }] },
	"papel tribal": { de: "Ceratops", vagas: [{ tipo: "pericia", lista: ["cura", "inti", "ofic", "sobr"] }] },
	adaptavel: { de: "Meio-Orc", vagas: [{ tipo: "pericia" }] },
	"infancia entre os pequenos": { de: "Galokk", vagas: [{ tipo: "pericia" }] },
	hibrido: { de: "Kliren", vagas: [{ tipo: "pericia" }] },
	"esperteza vulpina": { vagas: [{ tipo: "bonus", valor: 2, atributos: ["int", "car"] }, { tipo: "bonus", valor: 2, atributos: ["int", "car"] }] },
	"heranca de deathok": { de: "Suraggel", nota: "Pode trocar essas perícias a cada manhã (troque o efeito no poder).", vagas: [{ tipo: "bonus", valor: 2 }, { tipo: "bonus", valor: 2 }] },
	"chassi - mashin": { de: "Mashin", vagas: [{ tipo: "pericia" }, { tipo: "pericia", ou: { listas: ["maravilha"] } }] },
	// Arcanista
	"linhagem rubra basica": { vagas: [{ tipo: "poder", listas: ["tormenta"] }] },
	// Origens
	"estandarte vivo": { vagas: [{ tipo: "poder", listas: ["combate", "tormenta"] }] },
	cosmopolita: { nota: "Poder geral ou de uma classe em que tenha pelo menos dois níveis; pode trocá-lo uma vez por aventura, depois de um descanso.", vagas: [{ tipo: "poder", listas: ["geral"], exceto: ["tormenta"] }] },
	// Classes e poderes concedidos
	"cavaleiro sagrado": { nota: "Use seu nível de cavaleiro como nível de paladino.", vagas: [{ tipo: "poder", listas: ["classe:paladino"] }] },
	"paladino do reino": { nota: "Use seu nível como nível de cavaleiro.", vagas: [{ tipo: "poder", listas: ["classe:cavaleiro"] }] },
	"armadilha divina": { vagas: [{ tipo: "poder", listas: ["armadilha"] }] },
	"dom de armadilheiro": { vagas: [{ tipo: "poder", listas: ["armadilha"] }] }
};

const ROTULO_LISTA = { geral: "geral", combate: "de combate", destino: "de destino", magia: "de magia", tormenta: "da Tormenta", origem: "único de origem", armadilha: "de Armadilha (caçador)", maravilha: "maravilha mecânica" };
const MARAVILHA = /maravilha mecanica no lugar de um poder/;

export function concessaoDoItem(item) {
	const conc = item && CONCESSOES[normalizar(item.name)];
	if (!conc) return null;
	if (conc.de && item.system?.subtipo && normalizar(item.system.subtipo) !== normalizar(conc.de)) return null;
	return conc;
}

const caminho = (chave, campo, i) => `concessoes.${chave}.${campo}${i}`;
const modosDa = (vaga) => [vaga.tipo, ...(vaga.ou ? ["poder"] : [])];

/** Modo e valor escolhidos numa vaga (valor só se combinar com o modo). */
function escolhaDaVaga(app, chave, vaga, i) {
	const modos = modosDa(vaga);
	const lido = app.ler(caminho(chave, "m", i));
	const modo = modos.includes(lido) ? lido : modos[0];
	const valor = app.ler(caminho(chave, "v", i)) || null;
	const valido = modo === "poder" ? String(valor ?? "").startsWith("Compendium.") : Boolean(valor && app.d?.PERICIAS?.[valor]);
	return { modo, valor: valido ? valor : null, vaga: modo === "poder" && vaga.ou ? { ...vaga, ...vaga.ou, tipo: "poder" } : vaga };
}

/**
 * Poderes com concessão entre os que o personagem recebe agora, incluindo os que vierem das próprias escolhas.
 * @param {object[]} itens  entradas do índice (name, uuid, system)
 * @returns {{chave, item, conc}[]}
 */
export function fontesDeConcessao(app, itens) {
	const fontes = [];
	const vistos = new Set();
	const fila = [...itens];
	while (fila.length && fontes.length < 20) {
		const item = fila.shift();
		const conc = concessaoDoItem(item);
		if (!conc) continue;
		const chave = normalizar(item.name).replace(/[^a-z0-9]+/g, "-");
		if (vistos.has(chave)) continue;
		vistos.add(chave);
		fontes.push({ chave, item, conc });
		conc.vagas.forEach((vaga, i) => {
			const { modo, valor } = escolhaDaVaga(app, chave, vaga, i);
			if (modo === "poder" && valor) fila.push(app.c.itens.find((x) => x.uuid === valor));
		});
	}
	return fontes;
}

/** Escolhas feitas: perícias treinadas, bônus em perícia e poderes a criar. */
export function escolhasDasConcessoes(app, fontes) {
	const r = { pericias: [], bonus: [], poderes: [] };
	for (const { chave, item, conc } of fontes) {
		conc.vagas.forEach((vaga, i) => {
			const { modo, valor } = escolhaDaVaga(app, chave, vaga, i);
			if (!valor) return;
			if (modo === "pericia") r.pericias.push({ pericia: valor, fonte: item.name });
			else if (modo === "bonus") r.bonus.push({ pericia: valor, valor: vaga.valor ?? 2, fonte: item.name });
			else r.poderes.push(valor);
		});
	}
	return r;
}

export function erroDasConcessoes(app, fontes) {
	for (const { chave, item, conc } of fontes) {
		for (const [i, vaga] of conc.vagas.entries()) if (!escolhaDaVaga(app, chave, vaga, i).valor) return `Faça a escolha de ${item.name}.`;
	}
	return null;
}

/** Poderes das listas de uma vaga. */
function poderesDasListas(app, vaga, raca) {
	const porUuid = new Map();
	const add = (lista) => lista.forEach((p) => p && porUuid.set(p.uuid, p));
	const gerais = poderesGerais(app.c, raca);
	const exceto = new Set((vaga.exceto ?? []).map(normalizar));
	for (const l of vaga.listas ?? []) {
		if (l === "geral") add(gerais.filter((p) => !exceto.has(normalizar(p.system?.subtipo))));
		else if (["combate", "destino", "magia", "tormenta"].includes(l)) add(gerais.filter((p) => normalizar(p.system?.subtipo) === l));
		else if (l === "origem") add(Object.values(app.d?.ORIGENS ?? {}).filter((o) => (o.tipo ?? "basica") === "basica" && o.unico?.uuid).map((o) => app.c.itens.find((x) => x.uuid === o.unico.uuid)));
		else if (l.startsWith("classe:")) {
			const nome = normalizar(app.d?.CLASSES?.[l.slice(7)]?.nome ?? l.slice(7));
			add(app.c.poderes.filter((p) => p.system?.tipo === "classe" && normalizar(p.system?.subtipo) === nome));
		} else if (l === "armadilha") add(app.c.poderes.filter((p) => p.system?.tipo === "classe" && normalizar(p.system?.subtipo) === "cacador" && /^armadilha/i.test(p.name)));
		else if (l === "maravilha") add(app.c.poderes.filter((p) => p.system?.tipo === "racial" && MARAVILHA.test(normalizar(limpar(p.system?.description?.value)))));
	}
	return [...porUuid.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function rotuloDoPoder(app, listas) {
	return `Poder ${(listas ?? []).map((l) => (l.startsWith("classe:") ? `de ${app.d?.CLASSES?.[l.slice(7)]?.nome ?? l.slice(7)}` : ROTULO_LISTA[l] ?? l)).join(" ou ")}`;
}

/** Perícias que a vaga aceita. */
function periciasDaVaga(app, vaga) {
	let chaves = Object.keys(app.d?.PERICIAS ?? {});
	if (vaga.lista) chaves = expandirPericias(vaga.lista, app.d?.PERICIAS);
	if (vaga.atributos) chaves = chaves.filter((k) => vaga.atributos.includes(CONFIG.T20?.pericias?.[k]?.abl));
	return chaves.sort((a, b) => nomePericia(app, a).localeCompare(nomePericia(app, b)));
}

/**
 * Escolhas das concessões. `treinadas`: perícias já treinadas por outras fontes (ficam fora das opções de treino).
 */
export function renderConcessoes(app, fontes, { contexto, treinadas = new Set(), raca = "" }) {
	return fontes
		.map(({ chave, item, conc }) => {
			const vagas = conc.vagas
				.map((vagaBase, i) => {
					const { modo, valor, vaga } = escolhaDaVaga(app, chave, vagaBase, i);
					const modos = modosDa(vagaBase);
					const rotulo = (m) => (m === "pericia" ? "Perícia treinada" : m === "bonus" ? `+${vagaBase.valor ?? 2} em uma perícia` : rotuloDoPoder(app, m === vagaBase.tipo ? vagaBase.listas : vagaBase.ou.listas));
					const seletor =
						modos.length > 1
							? modos.map((m) => `<label class="t20c-opcao"><input type="radio" name="m-${chave}-${i}" data-campo="${caminho(chave, "m", i)}" value="${m}" ${m === modo ? "checked" : ""}> ${escapar(rotulo(m))}</label>`).join(" ")
							: `<strong>${escapar(rotulo(modo))}</strong>`;
					if (modo === "poder") {
						const itens = poderesDasListas(app, vaga, raca);
						return `<div class="t20c-vaga"><p>${seletor}</p>${listaDeEscolhas(app, { campo: caminho(chave, "v", i), itens, contexto, max: 1, filtros: true, raca, vazio: "Nenhum poder dessa lista nos compêndios." })}</div>`;
					}
					// Treino: fora as já treinadas (menos a desta vaga); bônus: diferente do outro bônus do mesmo poder.
					const outros = new Set(
						conc.vagas
							.map((v, j) => (j !== i ? escolhaDaVaga(app, chave, v, j) : null))
							.filter((x) => x && x.modo === modo && x.valor)
							.map((x) => x.valor)
					);
					const opcoes = periciasDaVaga(app, vagaBase)
						.filter((k) => k === valor || (!outros.has(k) && (modo !== "pericia" || !treinadas.has(k))))
						.map((k) => `<option value="${k}" ${k === valor ? "selected" : ""}>${escapar(nomePericia(app, k))}</option>`)
						.join("");
					return `<div class="t20c-vaga"><p>${seletor} <select class="t20c-em-linha" data-campo="${caminho(chave, "v", i)}"><option value="">—</option>${opcoes}</select></p></div>`;
				})
				.join("");
			const texto = limpar(item.system?.description?.value).slice(0, 260);
			return `<div class="t20c-detalhe"><h3><span class="t20c-termo" data-dica-uuid="${escapar(item.uuid)}">${escapar(item.name)}</span> <small class="t20c-mudo">${escapar(item.system?.subtipo ?? "")}</small></h3>
				<p class="t20c-mudo">${escapar(texto)}${texto.length >= 260 ? "…" : ""}</p>${conc.nota ? `<p class="t20c-aviso">${escapar(conc.nota)}</p>` : ""}${vagas}</div>`;
		})
		.join("");
}

/** Cria os bônus em perícia como efeitos no próprio poder (ou no ator, se o poder não estiver na ficha). */
export async function aplicarBonusDasConcessoes(actor, bonus, PERICIAS) {
	for (const b of bonus) {
		const dono = actor.items.find((i) => i.name === b.fonte) ?? actor;
		await dono.createEmbeddedDocuments("ActiveEffect", [
			{
				name: `${b.fonte}: +${b.valor} em ${PERICIAS?.[b.pericia] ?? b.pericia}`,
				img: dono.img,
				type: "base",
				transfer: true,
				system: { changes: [{ key: `system.pericias.${b.pericia}.bonus`, type: "add", value: String(b.valor), phase: "initial", priority: null }] }
			}
		]);
	}
}
