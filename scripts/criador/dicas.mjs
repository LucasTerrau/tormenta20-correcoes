import { CONDICOES } from "./condicoes.mjs";
import { expandirPericias, nomePericia, situacao } from "./pecas.mjs";
import { ATRIBUTOS, SIGLA, escapar, normalizar } from "./regras.mjs";

/**
 * Dicas flutuantes dos assistentes (no espírito do Crusader Kings e das dicas do Pathfinder 2e): parar o mouse sobre
 * um poder, raça, classe, origem, divindade ou item mostra o que ele faz, sem sair da janela. Dentro da dica, as
 * condições citadas (abalado, fascinado…), os poderes dos pré-requisitos e os links do texto abrem outra dica por cima;
 * a pilha fica aberta enquanto o mouse estiver sobre alguma delas.
 * Marcação: data-dica-uuid (item dos compêndios), data-dica-origem e data-dica-divindade (chaves de dados.mjs),
 * data-dica-condicao (id em CONFIG.statusEffects).
 */
const SELETOR = "[data-dica-uuid],[data-dica-origem],[data-dica-divindade],[data-dica-condicao],.t20c-dica-flutuante a.content-link[data-uuid]";
const ATRASO = 300;
const FECHAR = 250;

/** Pilha de dicas abertas: { el, alvo }. Só um assistente usa por vez. */
const pilha = [];
let agendada = null;
let poda = null;
let appAtual = null;

export function ligarDicas(raiz, app) {
	raiz.addEventListener("mouseover", (event) => {
		const alvo = event.target.closest?.(SELETOR);
		if (alvo) agendar(app, alvo, 0);
	});
	raiz.addEventListener("mouseout", (event) => {
		const alvo = event.target.closest?.(SELETOR);
		if (alvo && !alvo.contains(event.relatedTarget)) cancelar(alvo);
		podarDepois();
	});
}

export function fecharDicas() {
	clearTimeout(agendada);
	clearTimeout(poda);
	while (pilha.length) pilha.pop().el.remove();
	document.removeEventListener("mouseover", podarDepois);
}

function agendar(app, alvo, nivel) {
	if (pilha[nivel]?.alvo === alvo) return;
	clearTimeout(agendada);
	agendada = setTimeout(() => abrir(app, alvo, nivel).catch((error) => console.warn("tormenta20-correcoes | dica", error)), ATRASO);
	alvo._t20cDica = agendada;
}

function cancelar(alvo) {
	if (alvo._t20cDica === agendada) clearTimeout(agendada);
}

function podarDepois() {
	clearTimeout(poda);
	poda = setTimeout(podar, FECHAR);
}

/** Fecha do topo para baixo as dicas que nem elas, nem seu alvo, nem uma dica acima estão sob o mouse. */
function podar() {
	for (let i = pilha.length - 1; i >= 0; i--) {
		const { el, alvo } = pilha[i];
		if (el.matches(":hover") || alvo.matches(":hover")) break;
		el.remove();
		pilha.pop();
	}
	if (!pilha.length) document.removeEventListener("mouseover", podarDepois);
}

async function abrir(app, alvo, nivel) {
	if (!alvo.isConnected) return;
	appAtual = app;
	const html = await conteudo(app, alvo);
	if (!html || !alvo.isConnected) return;
	while (pilha.length > nivel) pilha.pop().el.remove();
	const el = document.createElement("div");
	el.className = "t20c-dica-flutuante";
	el.innerHTML = html;
	marcarTermos(el, alvo.dataset.dicaCondicao);
	document.body.appendChild(el);
	posicionar(el, alvo);
	el.addEventListener("mouseover", (event) => {
		const interno = event.target.closest?.(SELETOR);
		if (interno && el.contains(interno)) agendar(appAtual, interno, pilha.findIndex((p) => p.el === el) + 1);
	});
	el.addEventListener("mouseout", (event) => {
		const interno = event.target.closest?.(SELETOR);
		if (interno && !interno.contains(event.relatedTarget)) cancelar(interno);
		podarDepois();
	});
	pilha.push({ el, alvo });
	document.addEventListener("mouseover", podarDepois);
}

/** Ao lado do alvo (à direita, ou à esquerda se não couber), sem sair da tela. */
function posicionar(el, alvo) {
	const r = alvo.getBoundingClientRect();
	const w = el.offsetWidth, h = el.offsetHeight, m = 8;
	let x = r.right + m;
	if (x + w > innerWidth - m) x = Math.max(m, r.left - w - m);
	let y = Math.min(r.top, innerHeight - h - m);
	el.style.left = `${Math.max(m, x)}px`;
	el.style.top = `${Math.max(m, y)}px`;
}

/* -------------------------------------------- conteúdo */

const TextEditor = () => foundry.applications.ux.TextEditor.implementation;
const cabecalho = ({ img, nome, sub }) =>
	`<header>${img ? `<img src="${escapar(img)}" alt="">` : ""}<div><strong>${escapar(nome)}</strong>${sub ? `<small>${sub}</small>` : ""}</div></header>`;

async function conteudo(app, alvo) {
	const d = alvo.dataset;
	if (d.dicaCondicao) return dicaDeCondicao(d.dicaCondicao);
	if (d.dicaOrigem) return dicaDeOrigem(app, d.dicaOrigem);
	if (d.dicaDivindade) return dicaDeDivindade(app, d.dicaDivindade);
	const uuid = d.dicaUuid ?? d.uuid;
	return uuid ? dicaDeItem(app, uuid) : null;
}

function itemDoIndice(app, uuid) {
	return app.c?.itens?.find((i) => i.uuid === uuid) ?? null;
}

async function dicaDeItem(app, uuid) {
	let item = itemDoIndice(app, uuid);
	if (!item?.system?.description) item = (await fromUuid(uuid).catch(() => null)) ?? item;
	if (!item) return null;
	// Raças (texto do compêndio é um @Embed de um diário que não vem com o sistema) e classes (sem texto): resumo.
	if (item.type === "race") return dicaDeRaca(app, item);
	if (item.type === "classe") return dicaDeClasse(app, item, uuid);
	const sys = item.system ?? {};
	const sub = [sys.tipo && sys.tipo !== "ability" ? sys.tipo : null, sys.subtipo, item.livro ?? item.pack ?? null].filter(Boolean).map(escapar).join(" · ");
	let prereq = "";
	try {
		const s = situacao(item, app.contexto?.());
		if (s.linhas.length) {
			const linhas = s.linhas.map((l) => {
				const poder = app.c?.porNome?.get(normalizar(l.texto));
				const texto = poder ? `<span class="t20c-termo" data-dica-uuid="${escapar(poder.uuid)}">${escapar(l.texto)}</span>` : escapar(l.texto);
				return `<span class="${l.ok === false ? "nao" : l.ok === null ? "talvez" : "sim"}">${texto}</span>`;
			});
			prereq = `<p class="t20c-dica-req"><strong>Pré-requisito:</strong> ${linhas.join(", ")}</p>`;
		}
	} catch {
		// sem contexto (ficha ainda vazia): só o texto
	}
	// O pré-requisito já aparece conferido acima; tira a cópia em itálico do texto. Sem texto útil, avisa.
	const texto = String(sys.description?.value ?? "").replace(prereq ? /<em>\s*Pr[ée]-requisitos?\s*:[^<]*<\/em>/gi : /$^/, "");
	const corpo = /@embed/i.test(texto) ? "" : await TextEditor().enrichHTML(texto, { async: true });
	return `${cabecalho({ img: item.img, nome: item.name, sub })}${prereq}<div class="t20c-dica-corpo">${corpo || '<p class="t20c-mudo">Sem descrição.</p>'}</div>`;
}

const sinal = (v) => (v > 0 ? `+${v}` : `${v}`);
const termoUuid = (nome, uuid) => (uuid ? `<span class="t20c-termo" data-dica-uuid="${escapar(uuid)}">${escapar(nome)}</span>` : escapar(nome));

function dicaDeRaca(app, raca) {
	const sys = raca.system ?? {};
	const fixos = ATRIBUTOS.filter((k) => Number(sys.atributos?.[k])).map((k) => `${SIGLA[k]} ${sinal(Number(sys.atributos[k]))}`);
	const din = [...(sys.atributosDinamicos?.value ?? [])].length ? sys.atributosDinamicos?.description : "";
	const habilidades = (sys.grants ?? []).flatMap((g) => (g.choices ?? []).map((c) => termoUuid(itemDoIndice(app, c.uuid)?.name ?? "?", c.uuid)));
	const linhas = [
		fixos.length || din ? `<p><strong>Atributos:</strong> ${[fixos.join(", "), din ? escapar(din) : ""].filter(Boolean).join("; ")}</p>` : "",
		habilidades.length ? `<p><strong>Habilidades:</strong> ${habilidades.join(", ")}</p><p class="t20c-mudo">Passe o mouse em cada habilidade para ver o que ela faz.</p>` : ""
	];
	return `${cabecalho({ img: raca.img, nome: raca.name, sub: `raça · ${escapar(raca.livro ?? "")}` })}<div class="t20c-dica-corpo">${linhas.join("")}</div>`;
}

function dicaDeClasse(app, item, uuid) {
	const c = Object.values(app.d?.CLASSES ?? {}).find((x) => x.uuid === uuid || normalizar(x.nome) === normalizar(item.name));
	if (!c) return `${cabecalho({ img: item.img, nome: item.name, sub: "classe" })}`;
	const P = app.d?.PERICIAS;
	const fixas = (c.pericias?.fixas ?? []).map((f) => (Array.isArray(f) ? f.map((k) => nomePericia(app, k)).join(" ou ") : nomePericia(app, f))).map(escapar).join(", ");
	const opcoes = [...new Set(expandirPericias(c.pericias?.opcoes, P))].map((k) => nomePericia(app, k)).join(", ");
	const nivel1 = (c.niveis?.["1"] ?? []).map((h) => (h.poder ? "poder de classe" : termoUuid(`${h.nome}${h.detalhe ? ` ${h.detalhe}` : ""}`, h.uuid))).join(", ");
	const linhas = [
		`<p><strong>PV:</strong> ${c.pv?.inicial} + Constituição (${c.pv?.porNivel} + Con por nível) · <strong>PM:</strong> ${c.pm?.porNivel} por nível</p>`,
		`<p><strong>Perícias:</strong> ${fixas || "—"}${c.pericias?.escolha ? `, mais ${c.pericias.escolha} entre ${escapar(opcoes)}` : ""}</p>`,
		c.proficiencias?.length ? `<p><strong>Proficiências:</strong> ${escapar(c.proficiencias.join(", "))}</p>` : "",
		nivel1 ? `<p><strong>1º nível:</strong> ${nivel1}</p>` : "",
		c.magias ? `<p><strong>Magias:</strong> ${c.magias.tipo === "arc" ? "arcanas" : "divinas"}.</p>` : "",
		c.nota ? `<p class="t20c-mudo">${escapar(c.nota)}</p>` : ""
	];
	const sub = [c.variante ? `variante de ${escapar(app.d.CLASSES[c.variante]?.nome ?? c.variante)}` : "classe", escapar(c.fonte ?? "")].filter(Boolean).join(" · ");
	return `${cabecalho({ img: item.img, nome: c.nome, sub })}<div class="t20c-dica-corpo">${linhas.join("")}</div>`;
}

function dicaDeCondicao(id) {
	const c = CONFIG.statusEffects?.[id];
	if (!c) return null;
	// O sistema cria as condições sem texto: vale o do apêndice do JdA (p. 394–395).
	const texto = String(c.description ?? "").replace(/<[^>]+>/g, "").trim() ? c.description : CONDICOES[normalizar(c.name)];
	return `${cabecalho({ img: c.img, nome: c.name, sub: "condição · JdA p. 394" })}<div class="t20c-dica-corpo">${texto ? `<p>${texto}</p>` : '<p class="t20c-mudo">Sem descrição.</p>'}</div>`;
}

const termoItem = (x) => (x?.uuid ? `<span class="t20c-termo" data-dica-uuid="${escapar(x.uuid)}">${escapar(x.nome)}</span>` : escapar(x?.nome ?? ""));

function dicaDeOrigem(app, slug) {
	const o = app.d?.ORIGENS?.[slug];
	if (!o) return null;
	const pericias = (o.pericias ?? []).map((k) => escapar(k === "ofic" ? "um Ofício" : nomePericia(app, k))).join(", ");
	const itens = (o.itens ?? [])
		.map((it) => (it.escolha ? it.escolha.map(termoItem).join(" ou ") : `${termoItem(it)}${it.qtd ? ` ×${it.qtd}` : ""}`))
		.join(", ");
	const poderes = (o.poderes ?? []).map((p) => (p.escolha ? p.escolha.map(termoItem).join(" ou ") : termoItem(p))).join(", ");
	const tipo = { basica: "origem comum", especial: "origem especial", regional: `origem regional${o.regiao ? ` (${escapar(o.regiao)})` : ""}` }[o.tipo ?? "basica"];
	const linhas = [];
	if ((o.tipo ?? "basica") === "basica") {
		linhas.push(`<p>Escolha <strong>dois benefícios</strong> entre as perícias e os poderes abaixo (o poder único só para quem tem a origem).</p>`);
		if (pericias) linhas.push(`<p><strong>Perícias:</strong> ${pericias}</p>`);
		if (poderes) linhas.push(`<p><strong>Poderes:</strong> ${poderes}</p>`);
		if (o.unico) linhas.push(`<p><strong>Poder único:</strong> ${termoItem(o.unico)}</p>`);
	} else {
		if (o.beneficio) linhas.push(`<p><strong>Benefício:</strong> ${escapar(o.beneficio)}</p>`);
		if (pericias) linhas.push(`<p><strong>Perícias treinadas:</strong> ${pericias}</p>`);
		if (o.unico) linhas.push(`<p><strong>Poder:</strong> ${termoItem(o.unico)}</p>`);
		if (poderes) linhas.push(`<p><strong>Também recebe:</strong> ${poderes}</p>`);
	}
	if (itens) linhas.push(`<p><strong>Itens:</strong> ${itens}</p>`);
	if (o.nota) linhas.push(`<p class="t20c-mudo">${escapar(o.nota)}</p>`);
	return `${cabecalho({ nome: o.nome, sub: `${tipo} · ${escapar(o.fonte ?? "")}` })}<div class="t20c-dica-corpo">${linhas.join("")}</div>`;
}

function dicaDeDivindade(app, slug) {
	const d = app.d?.DIVINDADES?.[slug];
	if (!d) return null;
	const linhas = [
		d.energia ? `<p><strong>Energia:</strong> ${escapar(d.energia)}${d.armaPreferida ? ` · <strong>Arma preferida:</strong> ${escapar(d.armaPreferida)}` : ""}</p>` : "",
		d.simbolo ? `<p><strong>Símbolo sagrado:</strong> ${escapar(d.simbolo)}</p>` : "",
		d.devotos ? `<p><strong>Devotos:</strong> ${escapar(d.devotos)}</p>` : "",
		d.poderes?.length ? `<p><strong>Poderes concedidos:</strong> ${d.poderes.map(termoItem).join(", ")}</p>` : "",
		d.obrigacoes ? `<p><strong>Obrigações e restrições:</strong> ${escapar(d.obrigacoes)}</p>` : ""
	];
	return `${cabecalho({ nome: d.nome, sub: `${escapar(d.titulo ?? "")} · ${escapar(d.fonte ?? "")}` })}<div class="t20c-dica-corpo">${linhas.join("")}</div>`;
}

/* -------------------------------------------- condições citadas no texto */

let regexCondicoes = null;
let porNomeDeCondicao = null;

/** "abalado", "abalada", "abalados"… → id da condição. */
function montarCondicoes() {
	if (regexCondicoes || !CONFIG.statusEffects) return;
	porNomeDeCondicao = new Map();
	const formas = [];
	for (const [id, c] of Object.entries(CONFIG.statusEffects)) {
		const nome = String(c?.name ?? "").toLowerCase();
		if (!nome || nome.length < 4) continue;
		const variantes = new Set([nome]);
		if (nome.endsWith("o")) for (const f of ["a", "os", "as"]) variantes.add(nome.slice(0, -1) + f);
		if (nome.endsWith("el")) variantes.add(nome.slice(0, -2) + "eis");
		for (const v of variantes) {
			porNomeDeCondicao.set(v, id);
			formas.push(v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
		}
	}
	formas.sort((a, b) => b.length - a.length);
	regexCondicoes = formas.length ? new RegExp(`(?<![\\p{L}])(${formas.join("|")})(?![\\p{L}])`, "giu") : null;
}

/** Envolve as condições citadas nos textos da dica (fora de links, de termos já marcados e da própria condição). */
function marcarTermos(raiz, propria) {
	montarCondicoes();
	if (!regexCondicoes) return;
	const textos = [];
	const caminho = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
		acceptNode: (n) => (n.parentElement?.closest("a, .t20c-termo, header") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
	});
	while (caminho.nextNode()) textos.push(caminho.currentNode);
	for (const no of textos) {
		const texto = no.nodeValue;
		regexCondicoes.lastIndex = 0;
		if (!regexCondicoes.test(texto)) continue;
		regexCondicoes.lastIndex = 0;
		const frag = document.createDocumentFragment();
		let ultimo = 0;
		for (const m of texto.matchAll(regexCondicoes)) {
			const id = porNomeDeCondicao.get(m[0].toLowerCase());
			if (id === propria) continue;
			frag.append(texto.slice(ultimo, m.index));
			const span = document.createElement("span");
			span.className = "t20c-termo";
			span.dataset.dicaCondicao = id;
			span.textContent = m[0];
			frag.append(span);
			ultimo = m.index + m[0].length;
		}
		frag.append(texto.slice(ultimo));
		no.replaceWith(frag);
	}
}
