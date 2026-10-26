import { podeRepetir } from "../acumulo/fontes.mjs";
import { conferir, escapar, limpar, normalizar, prerequisitos } from "./regras.mjs";

/** Atributos de dica flutuante (scripts/criador/dicas.mjs): { uuid } | { origem } | { divindade }. */
export function attrDica(dica) {
	if (!dica) return "";
	if (dica.uuid) return `data-dica-uuid="${escapar(dica.uuid)}"`;
	if (dica.origem) return `data-dica-origem="${escapar(dica.origem)}"`;
	if (dica.divindade) return `data-dica-divindade="${escapar(dica.divindade)}"`;
	return "";
}

/** Nome com dica do item (habilidades, itens); sem uuid, só o texto. */
export function termo(nome, uuid, classe = "t20c-chip") {
	return uuid ? `<span class="${classe}" data-dica-uuid="${escapar(uuid)}">${escapar(nome)}</span>` : `<span class="${classe}">${escapar(nome)}</span>`;
}

/** Cartão de escolha (raça, classe, origem, divindade). */
export function cartao({ campo, valor, nome, img, sub = "", selecionado = false, lista = false, max, dica }) {
	return `<button type="button" class="t20c-cartao ${selecionado ? "selecionado" : ""}" data-campo="${campo}" data-valor="${escapar(valor)}" ${lista ? `data-lista ${max ? `data-max="${max}"` : ""}` : ""} ${attrDica(dica)} data-nome="${escapar(nome)}" data-busca="${escapar(`${nome} ${String(sub).replace(/<[^>]+>/g, " ")}`)}">
		${img ? `<img src="${escapar(img)}" alt="">` : `<span class="t20c-sem-img"><i class="fa-solid fa-dice-d20"></i></span>`}
		<span class="t20c-cartao-texto"><strong>${escapar(nome)}</strong>${sub ? `<small>${sub}</small>` : ""}</span>
	</button>`;
}

export function busca(seletor, dica = "Buscar…") {
	return `<div class="t20c-busca"><i class="fa-solid fa-magnifying-glass"></i><input type="search" data-filtro="${seletor}" placeholder="${dica}"></div>`;
}

/** Chaves dos Ofícios (o "ofic" genérico das listas vira a escolha de um deles). */
export function oficios(PERICIAS) {
	return Object.entries(PERICIAS ?? {})
		.filter(([, nome]) => /^of[ií]cio/i.test(nome))
		.map(([k]) => k);
}

/** Lista de perícias com "ofic" trocado pelos Ofícios. */
export function expandirPericias(lista, PERICIAS) {
	return (lista ?? []).flatMap((k) => (k === "ofic" ? oficios(PERICIAS) : [k]));
}

/** Perícia fixa da classe: "ofic" vira uma escolha entre os Ofícios. */
export function fixaComoEscolha(f, PERICIAS) {
	if (Array.isArray(f)) return expandirPericias(f, PERICIAS);
	return f === "ofic" ? oficios(PERICIAS) : f;
}

export function nomePericia(app, k) {
	return app.d?.PERICIAS?.[k] ?? (k === "ofic" ? "Ofício" : k);
}

/**
 * Escolhas de um nível da tabela da classe: opção da habilidade (escolha), perícia treinada (treina) e, no
 * Caminho do Arcanista, a linhagem do Feiticeiro. Chaves no estado: escolhas.<prefixo><i>, treina.<prefixo><i>_<j>.
 */
export function escolhasDoNivel(app, classe, nivel, prefixo) {
	const P = app.d?.PERICIAS;
	const partes = [];
	(classe?.niveis?.[String(nivel)] ?? []).forEach((h, i) => {
		if (h.escolha?.length) {
			const atual = app.estado.escolhas?.[`${prefixo}${i}`];
			partes.push(
				`<p><strong>${escapar(h.nome)}:</strong> ${h.escolha
					.map((op, j) => `<label class="t20c-opcao"><input type="radio" name="esc${prefixo}${i}" data-campo="escolhas.${prefixo}${i}" value="${j}" ${String(atual) === String(j) ? "checked" : ""}> ${escapar(op.nome)}</label>`)
					.join(" ")}${h.nota ? ` <small class="t20c-mudo">${escapar(h.nota)}</small>` : ""}</p>`
			);
			if (h.novo === "t20cCamArcanista" && normalizar(h.escolha[Number(atual)]?.nome) === "feiticeiro" && classe.linhagens?.length) {
				partes.push(
					`<p><strong>Linhagem:</strong> ${classe.linhagens
						.map((l, j) => `<label class="t20c-opcao"><input type="radio" name="linhagem" data-campo="linhagem" value="${j}" ${String(app.estado.linhagem) === String(j) ? "checked" : ""}> ${escapar(l.nome)}</label>`)
						.join(" ")}</p>`
				);
			}
		}
		(h.treina ?? []).forEach((t, j) => {
			if (!Array.isArray(t)) return;
			const atual = app.estado.treina?.[`${prefixo}${i}_${j}`];
			partes.push(
				`<p><strong>${escapar(h.nome)}</strong> treina: ${expandirPericias(t, P)
					.map((k) => `<label class="t20c-opcao"><input type="radio" name="tr${prefixo}${i}_${j}" data-campo="treina.${prefixo}${i}_${j}" value="${k}" ${atual === k ? "checked" : ""}> ${escapar(nomePericia(app, k))}</label>`)
					.join(" ou ")}</p>`
			);
		});
	});
	return partes.join("");
}

const ITENS_DO_LIVRO = "Compendium.tormenta20-correcoes.itens-do-livro.Item.";

/**
 * Opções de classe que dão uma montaria (Caminho do Cavaleiro, JdA p. 55; Bênção da Justiça, p. 84): parceiro
 * veterano, mestre a partir do 11º nível. Personagens Pequenos ou Minúsculos recebem um pônei.
 */
const MONTARIAS_DE_CLASSE = {
	montaria: { padrao: "t20cMontCavGuerr", pequeno: "t20cMontPoneiGue" },
	"montaria sagrada": { padrao: "t20cMontCavGuerr", pequeno: "t20cMontPonei000" }
};

/**
 * Item de escolha do módulo (Caminho do Arcanista, Caminho do Cavaleiro, Bênção da Justiça): liga só o efeito da
 * opção escolhida. Devolve o uuid da montaria que a opção dá, ou null.
 */
export function aplicarOpcao(dadosItem, opcao, tamanho) {
	const alvo = normalizar(opcao);
	for (const ef of dadosItem?.effects ?? []) ef.disabled = normalizar(ef.name.split(":").at(-1)) !== alvo;
	const montaria = MONTARIAS_DE_CLASSE[alvo];
	if (!montaria) return null;
	return ITENS_DO_LIVRO + (["peq", "min"].includes(tamanho) ? montaria.pequeno : montaria.padrao);
}

/** Nota no topo da descrição de um parceiro recebido: de onde veio e o grau. */
export function anotarParceiro(dadosItem, texto) {
	if (!dadosItem?.system?.description) return;
	dadosItem.system.description.value = `<p><em>${escapar(texto)}</em></p>${dadosItem.system.description.value ?? ""}`;
}

export function erroDasEscolhas(app, classe, nivel, prefixo) {
	for (const [i, h] of (classe?.niveis?.[String(nivel)] ?? []).entries()) {
		const atual = app.estado.escolhas?.[`${prefixo}${i}`];
		if (h.escolha?.length && (atual === undefined || atual === "")) return `Escolha: ${h.nome}.`;
		const feiticeiro = h.novo === "t20cCamArcanista" && normalizar(h.escolha?.[Number(atual)]?.nome) === "feiticeiro";
		if (feiticeiro && classe.linhagens?.length && (app.estado.linhagem === undefined || app.estado.linhagem === "")) return "Escolha a linhagem do Feiticeiro.";
		for (const [j, t] of (h.treina ?? []).entries()) if (Array.isArray(t) && !app.estado.treina?.[`${prefixo}${i}_${j}`]) return `Escolha a perícia de ${h.nome}.`;
	}
	return null;
}

/** Nomes das escolas de magia (rótulos do sistema). */
export function nomeEscola(k) {
	const rotulo = CONFIG.T20?.spellSchools?.[k];
	return rotulo ? game.i18n.localize(rotulo) : k;
}

/** Perícia pelo nome escrito ("Luta", "Ofício (alquimista)"). */
export function periciaPorNome(nome, PERICIAS) {
	const alvo = normalizar(nome).replace(/\(.*?\)/g, (m) => m).replace(/[^a-z() ]/g, "");
	for (const [chave, rotulo] of Object.entries(PERICIAS ?? {})) if (normalizar(rotulo).replace(/[^a-z() ]/g, "") === alvo) return chave;
	for (const [chave, rotulo] of Object.entries(PERICIAS ?? {})) if (alvo.startsWith(normalizar(rotulo).replace(/[^a-z ]/g, ""))) return chave;
	return null;
}

/** Pré-requisitos do item conferidos: { estado: true|false|null, linhas: [{texto, ok}] }. */
export function situacao(item, contexto) {
	const lista = prerequisitos(item.system?.description?.value);
	if (!lista.length) return { estado: true, linhas: [] };
	const linhas = lista.map((texto) => ({ texto, ok: conferir(texto, contexto) }));
	const estado = linhas.some((l) => l.ok === false) ? false : linhas.some((l) => l.ok === null) ? null : true;
	return { estado, linhas };
}

export function seloPrerequisito(s) {
	if (!s.linhas.length) return "";
	const cor = s.estado === false ? "nao" : s.estado === null ? "talvez" : "sim";
	const texto = s.linhas.map((l) => `<span class="${l.ok === false ? "nao" : l.ok === null ? "talvez" : "sim"}">${escapar(l.texto)}</span>`).join(", ");
	return `<div class="t20c-req ${cor}"><i class="fa-solid ${s.estado === false ? "fa-triangle-exclamation" : s.estado === null ? "fa-circle-question" : "fa-circle-check"}"></i> Pré-requisito: ${texto}</div>`;
}

/* -------------------------------------------- listas de poderes */

/** Subtipos de poder geral que valem para qualquer raça (os outros são poderes de raça, Heróis de Arton). */
const GERAIS_COMUNS = new Set(["combate", "destino", "magia", "tormenta", "grupo", ""]);
/** Montarias e parceiros ficam como "poder geral" nos compêndios, mas vêm de habilidades, não se escolhem. */
const NAO_ESCOLHIVEIS = new Set(["montaria", "parceiro", "parceiros"]);

/** Poderes gerais que o personagem pode pegar: os comuns e os da própria raça. */
export function poderesGerais(c, raca) {
	const racas = new Set(c.racas.map((r) => normalizar(r.name)));
	const minha = normalizar(raca);
	return c.poderes
		.filter((p) => {
			if (p.system?.tipo !== "geral") return false;
			const sub = normalizar(p.system?.subtipo);
			if (NAO_ESCOLHIVEIS.has(sub)) return false;
			return GERAIS_COMUNS.has(sub) || !racas.has(sub) || sub === minha;
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

const CATEGORIAS = { classe: "Classe", combate: "Combate", destino: "Destino", magia: "Magia", tormenta: "Tormenta", raca: "Raça", grupo: "Grupo", concedido: "Concedidos", origem: "Origem", outros: "Outros gerais" };

/** Categoria de um poder nos filtros da lista. */
export function categoriaDoPoder(item, raca) {
	const tipo = item.system?.tipo;
	if (tipo === "classe" || tipo === "ability") return "classe";
	if (tipo === "concedido" || tipo === "origem") return tipo;
	if (tipo === "racial") return "raca";
	const sub = normalizar(item.system?.subtipo);
	if (["combate", "destino", "magia", "tormenta", "grupo"].includes(sub)) return sub;
	if (sub && raca && sub === normalizar(raca)) return "raca";
	return "outros";
}

/**
 * Lista de poderes (ou magias) para marcar, com busca, pré-requisito e descrição recolhível.
 * Com `filtros`, uma barra com "só os disponíveis" (pré-requisito não descartado e que o personagem ainda não
 * tem, salvo poderes repetíveis) e as categorias (classe, combate, destino, magia, Tormenta, raça…).
 * @param {object} op  campo, itens, contexto, max (1 = rádio), vazio (texto quando não há itens), filtros, raca
 */
export function listaDeEscolhas(app, { campo, itens, contexto, max = 1, vazio = "Nada para escolher.", extra = () => "", filtros = false, raca = "" }) {
	if (!itens.length) return `<p class="t20c-vazio">${vazio}</p>`;
	const marcados = new Set([app.ler(campo) ?? []].flat());
	const classe = `t20c-esc-${campo.replace(/[^a-z0-9]/gi, "")}`;
	let avaliados = itens.map((item) => ({ item, s: contexto ? situacao(item, contexto) : { estado: true, linhas: [] } }));
	let barra = "";
	if (filtros) {
		const chave = `filtros.${campo.replace(/[^a-z0-9]/gi, "")}`;
		const f = app.ler(chave) ?? {};
		const so = f.so !== false;
		const cat = f.cat ?? "todos";
		const tem = contexto?.nomes ?? new Set();
		const disponivel = ({ item, s }) => s.estado !== false && (!tem.has(normalizar(item.name)) || podeRepetir(item));
		const base = avaliados.filter((a) => marcados.has(a.item.uuid) || !so || disponivel(a));
		const contagem = {};
		for (const a of base) contagem[(a.cat = categoriaDoPoder(a.item, raca))] = (contagem[a.cat] ?? 0) + 1;
		avaliados = base.filter((a) => cat === "todos" || a.cat === cat || marcados.has(a.item.uuid));
		const botoes = [["todos", "Todos", base.length], ...Object.keys(CATEGORIAS).filter((k) => contagem[k]).map((k) => [k, CATEGORIAS[k], contagem[k]])];
		barra = `<div class="t20c-filtros">
			<label class="t20c-check"><input type="checkbox" data-campo="${chave}.so" ${so ? "checked" : ""}> Só os disponíveis</label>
			<div class="t20c-alternador">${botoes.map(([k, rotulo, n]) => `<button type="button" data-campo="${chave}.cat" data-valor="${k}" class="${cat === k ? "ativo" : ""}">${rotulo} <small>${n}</small></button>`).join("")}</div>
		</div>`;
		if (!avaliados.length) return `${barra}<p class="t20c-vazio">Nenhum poder ${so ? "disponível " : ""}nesta categoria.${so ? " Desmarque “Só os disponíveis” para ver todos." : ""}</p>`;
	}
	const linhas = avaliados
		.map(({ item, s }) => {
			const marcado = marcados.has(item.uuid);
			const desc = limpar(item.system?.description?.value).replace(/Pr[ée]-requisitos?\s*:[^.]+\./i, "").slice(0, 600);
			return `<li class="${classe} t20c-escolha ${marcado ? "marcada" : ""} ${s.estado === false ? "sem-req" : ""}" data-nome="${escapar(item.name)}">
				<label>
					<input type="${max === 1 ? "radio" : "checkbox"}" name="${campo}" data-campo="${campo}" ${max === 1 ? "" : `data-lista data-max="${max}"`} value="${escapar(item.uuid)}" ${marcado ? "checked" : ""}>
					${item.img ? `<img src="${escapar(item.img)}" alt="">` : ""}
					<span class="t20c-escolha-nome" data-dica-uuid="${escapar(item.uuid)}">${escapar(item.name)}${extra(item)}</span>
				</label>
				${seloPrerequisito(s)}
				<details><summary>Descrição</summary><p>${escapar(desc)}${desc.length >= 600 ? "…" : ""}</p></details>
			</li>`;
		})
		.join("");
	return `${barra}${busca(`.${classe}`)}<ul class="t20c-escolhas">${linhas}</ul>`;
}
