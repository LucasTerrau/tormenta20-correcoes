import { MODULE_ID } from "../constants.mjs";
import { dadosDa, faltando } from "../fixes/subir-nivel.mjs";
import { Assistente } from "./assistente.mjs";
import { aplicarBonusDasConcessoes, erroDasConcessoes, escolhasDasConcessoes, fontesDeConcessao, renderConcessoes } from "./concessoes.mjs";
import { magiasDisponiveis } from "./criacao.mjs";
import { conteudo, dados, dadosDoItem } from "./fontes.mjs";
import { anotarParceiro, aplicarOpcao, busca, cartao, termo, erroDasEscolhas, escolhasDoNivel, listaDeEscolhas, nomeEscola, periciaPorNome, poderesGerais } from "./pecas.mjs";
import { ATRIBUTOS, escapar, normalizar, xpDoNivel } from "./regras.mjs";

/**
 * Assistente de subir de nível (JdA p. 35): PV e PM pela classe, todas as habilidades do nível alcançado
 * (com as escolhas da tabela), o poder da tabela (de classe, ou geral no lugar), magias novas e, se quiser,
 * a devoção. Multiclasse: a nova classe dá os PV de um nível seguinte, não os do primeiro, e não dá perícias
 * nem proficiências. Classes variantes (Heróis de Arton) escolhem os poderes da classe básica.
 */
const slug = (texto) => normalizar(texto).replace(/[^a-z]/g, "");
const lista = (v) => [v ?? []].flat();
export class SubirDeNivel extends Assistente {
	static DEFAULT_OPTIONS = { window: { title: "Subir de nível", icon: "fa-solid fa-angles-up" }, position: { width: 880, height: 720 } };

	get title() {
		return `Subir de nível: ${this.actor.name}`;
	}

	get rotuloConcluir() {
		return "Subir de nível";
	}

	async _prepareContext(options) {
		this.c ??= await conteudo();
		this.d ??= await dados();
		if (!this.estado.escolhaClasse) {
			const inicial = this.actor.items.find((i) => i.type === "classe" && i.system?.inicial) ?? this.actor.items.find((i) => i.type === "classe");
			if (inicial) this.estado.escolhaClasse = `existente:${inicial.id}`;
		}
		this.estado.escolas ??= [...(this.actor.getFlag(MODULE_ID, "escolasDeMagia") ?? [])];
		return super._prepareContext(options);
	}

	/* ---------------------------------------- derivados */

	get classesDoAtor() {
		return this.actor.items.filter((i) => i.type === "classe");
	}

	get itemDaClasse() {
		const [tipo, valor] = String(this.estado.escolhaClasse ?? "").split(":");
		return tipo === "existente" ? this.actor.items.get(valor) : null;
	}

	get slugDaClasse() {
		const [tipo, valor] = String(this.estado.escolhaClasse ?? "").split(":");
		if (tipo === "nova") return valor;
		const item = this.itemDaClasse;
		if (!item) return null;
		const s = slug(item.name);
		return Object.keys(this.d?.CLASSES ?? {}).find((k) => k === s || slug(this.d.CLASSES[k].nome) === s) ?? s;
	}

	get classe() {
		return this.d?.CLASSES?.[this.slugDaClasse];
	}

	/** Poderes ganhos neste nível que dão outra escolha (Cavaleiro Sagrado, Armadilha Divina…). */
	get fontes() {
		const e = this.estado;
		const tem = new Set(this.actor.items.map((i) => normalizar(i.name)));
		const uuids = [e.poder, ...Object.values(e.concedidos ?? {}), ...lista(e.poderConcedido)];
		this.linha.forEach((h, i) => uuids.push(h.uuid, h.escolha?.[Number(e.escolhas?.[`${this.prefixo}${i}`])]?.uuid));
		const itens = uuids.filter(Boolean).map((u) => this.c.itens.find((x) => x.uuid === u));
		return fontesDeConcessao(this, itens.filter((x) => x && !tem.has(normalizar(x.name))));
	}

	/** Nome da raça do personagem (poderes de raça nos filtros). */
	get raca() {
		return this.actor.items.find((i) => i.type === "race")?.name ?? "";
	}

	get nivelNaClasse() {
		return this.itemDaClasse ? (Number(this.itemDaClasse.system?.niveis) || 0) + 1 : 1;
	}

	get nivelNovo() {
		return (Number(this.actor.system?.attributes?.nivel?.value) || 0) + 1;
	}

	get prefixo() {
		return `n${this.nivelNaClasse}_`;
	}

	get linha() {
		return this.classe?.niveis?.[String(this.nivelNaClasse)] ?? [];
	}

	/** Espaço de poder da tabela e de qual classe são os poderes (a variante usa a básica). */
	get espacoDePoder() {
		const h = this.linha.find((x) => x.poder);
		if (!h) return null;
		const chave = h.classe ?? this.classe?.variante ?? this.slugDaClasse;
		return { classes: [...new Set([this.classe?.nome, this.d?.CLASSES?.[chave]?.nome].filter(Boolean))] };
	}

	/** Caminho do Arcanista: da flag do assistente ou do efeito ligado no item do Caminho. */
	get caminho() {
		const flag = this.actor.getFlag(MODULE_ID, "caminho");
		if (flag) return flag;
		const ef = this.actor.items.find((i) => i.name === "Caminho do Arcanista")?.effects.find((e) => !e.disabled);
		return ef ? normalizar(ef.name.split(":").at(-1)) : null;
	}

	get magiasNovas() {
		const m = this.classe?.magias;
		if (!m) return 0;
		const caminho = m.caminhos?.[this.caminho];
		const n = this.nivelNaClasse;
		if (n === 1) return Number(caminho?.iniciais) || Number(m.iniciais) || 0;
		const porNivel = caminho?.porNivel ?? m.porNivel;
		let total = Number(porNivel?.[String(n)]) || 0;
		// Mago: uma magia a mais do círculo novo sempre que ganha acesso a ele.
		if (caminho?.porCirculoNovo && m.circulos?.[String(n)]) total += Number(caminho.porCirculoNovo) || 0;
		return total;
	}

	get circuloMaximo() {
		const m = this.classe?.magias;
		if (!m) return 0;
		return Math.max(0, ...Object.entries(m.circulos ?? { 1: 1 }).filter(([nivel]) => Number(nivel) <= this.nivelNaClasse).map(([, c]) => Number(c)));
	}

	nomeDe(uuid) {
		return this.c.itens.find((i) => i.uuid === uuid)?.name ?? fromUuidSync(uuid)?.name ?? "";
	}

	contexto() {
		const nomes = new Set(this.actor.items.map((i) => normalizar(i.name)));
		for (const h of this.linha) if (h.nome) nomes.add(normalizar(h.nome));
		for (const uuid of [this.estado.poder, ...Object.values(this.estado.concedidos ?? {}), ...escolhasDasConcessoes(this, this.fontes).poderes]) if (uuid) nomes.add(normalizar(this.nomeDe(uuid)));
		const niveis = Object.fromEntries(this.classesDoAtor.map((c) => [slug(c.name), Number(c.system?.niveis) || 0]));
		niveis[this.slugDaClasse] = this.nivelNaClasse;
		const atributos = Object.fromEntries(ATRIBUTOS.map((k) => [k, Number(this.actor.system?.atributos?.[k]?.value) || 0]));
		const pericias = new Set(Object.entries(this.actor.system?.pericias ?? {}).filter(([, p]) => p?.treinado).map(([k]) => k));
		return { atributos, nivel: this.nivelNovo, niveis, pericias, periciaPorNome: (n) => periciaPorNome(n, this.d?.PERICIAS), nomes, nomesConhecidos: new Set(this.c.poderes.map((p) => normalizar(p.name))) };
	}

	get passos() {
		return [PASSO_CLASSE, PASSO_HABILIDADES, PASSO_MAGIAS, PASSO_DEVOCAO, PASSO_CONCESSOES, PASSO_RESUMO];
	}

	/* ---------------------------------------- aplicar */

	async aplicar() {
		const actor = this.actor;
		const e = this.estado;
		// Lidos antes de atualizar a classe: depois disso o nível na classe (e a linha da tabela) já é o novo.
		const { linha, prefixo, nivelNaClasse, nivelNovo } = this;
		const concessoes = escolhasDasConcessoes(this, this.fontes);
		let classeItem = this.itemDaClasse;
		if (classeItem) await classeItem.update({ "system.niveis": nivelNaClasse }, { t20cAssistente: true });
		else {
			const nova = await dadosDoItem(this.classe.uuid, { system: { niveis: 1, inicial: !this.classesDoAtor.length } });
			[classeItem] = await actor.createEmbeddedDocuments("Item", [nova], { t20cAssistente: true });
		}
		const itens = [];
		const nomes = new Set(actor.items.map((i) => i.name));
		const adicionar = async (uuid, repetir = false) => {
			const dadosItem = await dadosDoItem(uuid);
			if (!dadosItem || (!repetir && nomes.has(dadosItem.name))) return null;
			nomes.add(dadosItem.name);
			itens.push(dadosItem);
			return dadosItem;
		};
		const treinar = {};
		for (const [i, h] of linha.entries()) {
			if (h.uuid && !h.poder && !h.melhora) await adicionar(h.uuid);
			const op = h.escolha?.[Number(e.escolhas?.[`${prefixo}${i}`])];
			if (op?.uuid) await adicionar(op.uuid);
			(h.treina ?? []).forEach((t, j) => {
				const k = Array.isArray(t) ? e.treina?.[`${prefixo}${i}_${j}`] : t;
				if (k) treinar[`system.pericias.${k}.treinado`] = true;
			});
		}
		for (const h of classeItem ? faltando(actor, classeItem) : []) {
			if (nomes.has(h.nome)) continue;
			const dadosItem = await dadosDa(h);
			if (dadosItem) {
				nomes.add(dadosItem.name);
				itens.push(dadosItem);
			}
		}
		// Itens de escolha do módulo (Caminho do Cavaleiro, Bênção da Justiça): liga o efeito da opção e dá a montaria.
		for (const [i, h] of linha.entries()) {
			const op = h.novo && h.escolha?.[Number(e.escolhas?.[`${prefixo}${i}`])];
			const item = op && itens.find((x) => x.flags?.[MODULE_ID]?.itemDoLivro === h.novo);
			const montaria = item ? aplicarOpcao(item, op.nome, actor.system.tracos?.tamanho) : null;
			const parceiro = montaria ? await adicionar(montaria) : null;
			if (parceiro) anotarParceiro(parceiro, `${op.nome}, de ${h.nome}: parceiro veterano (mestre a partir do 11º nível).`);
		}
		// Poderes podem repetir (Aumento de Atributo e afins).
		if (e.poder) await adicionar(e.poder, true);
		for (const uuid of Object.values(e.concedidos ?? {})) if (uuid) await adicionar(uuid, true);
		for (const uuid of lista(e.magias)) await adicionar(uuid);
		for (const uuid of lista(e.poderConcedido)) await adicionar(uuid);
		// Fichas antigas sem o ataque desarmado (todo personagem tem; a Briga aumenta o dado).
		if (!actor.items.some((i) => /^ataque desarmado$/i.test(i.name))) await adicionar(this.c.porNome.get("ataque desarmado")?.uuid);
		// Poderes que outros poderes dão (Cavaleiro Sagrado, Armadilha Divina…).
		for (const uuid of concessoes.poderes) await adicionar(uuid);
		for (const { pericia } of concessoes.pericias) treinar[`system.pericias.${pericia}.treinado`] = true;
		if (itens.length) await actor.createEmbeddedDocuments("Item", itens, { t20cAssistente: true });
		await aplicarBonusDasConcessoes(actor, concessoes.bonus, this.d?.PERICIAS);
		const update = { ...treinar };
		if (e.divindade) update["system.detalhes.divindade"] = this.d.DIVINDADES[e.divindade]?.nome ?? "";
		if (this.classe?.magias?.escolherEscolas && lista(e.escolas).length) update[`flags.${MODULE_ID}.escolasDeMagia`] = lista(e.escolas);
		if (Object.keys(update).length) await actor.update(update);
		ui.notifications.info(`${actor.name} chegou ao ${nivelNovo}º nível.`);
	}
}

/* -------------------------------------------- 1. classe */

const PASSO_CLASSE = {
	id: "classe",
	titulo: "Classe",
	dica: "Suba numa classe que já tem ou escolha outra (multiclasse). Na classe nova você ganha os PV de um nível seguinte, não os do primeiro, e não ganha as perícias nem as proficiências dela (JdA p. 35).",
	render(app) {
		if (!app.d?.CLASSES) return `<p class="t20c-aviso">As tabelas de classes ainda não foram geradas (scripts/criador/dados.mjs).</p>`;
		const xp = Number(app.actor.system?.attributes?.nivel?.xp?.value) || 0;
		const precisa = xpDoNivel(app.nivelNovo);
		const atuais = app.classesDoAtor
			.map((c) => cartao({ campo: "escolhaClasse", valor: `existente:${c.id}`, nome: `${c.name} ${(Number(c.system?.niveis) || 0) + 1}`, img: c.img, sub: `nível ${c.system?.niveis} → ${(Number(c.system?.niveis) || 0) + 1}`, selecionado: app.estado.escolhaClasse === `existente:${c.id}`, dica: { uuid: app.d?.CLASSES?.[slug(c.name)]?.uuid } }))
			.join("");
		const tem = new Set(app.classesDoAtor.map((c) => slug(c.name)));
		const novas = Object.entries(app.d.CLASSES)
			.filter(([k, c]) => !tem.has(k) && !tem.has(slug(c.nome)))
			.sort((a, b) => a[1].nome.localeCompare(b[1].nome))
			.map(([k, c]) => cartao({ campo: "escolhaClasse", valor: `nova:${k}`, nome: c.nome, img: app.c.itens.find((i) => i.uuid === c.uuid)?.img, sub: escapar([c.variante ? `variante de ${app.d.CLASSES[c.variante]?.nome ?? c.variante}` : "", c.fonte].filter(Boolean).join(" · ")), selecionado: app.estado.escolhaClasse === `nova:${k}`, dica: { uuid: c.uuid } }))
			.join("");
		const c = app.classe;
		const resumo = c
			? `<div class="t20c-detalhe"><h3>${escapar(c.nome)} ${app.nivelNaClasse}º nível (personagem de ${app.nivelNovo}º nível)</h3>
				<p><strong>Ganha:</strong> ${c.pv?.porNivel} PV + Constituição (mínimo 1) e ${c.pm?.porNivel} PM.${app.itemDaClasse ? "" : " Sem as perícias e proficiências da classe nova."}</p></div>`
			: "";
		return `${xp < precisa ? `<p class="t20c-aviso">XP ${xp.toLocaleString("pt-BR")}: o ${app.nivelNovo}º nível pede ${precisa.toLocaleString("pt-BR")} (Tabela 1-4). Dá para subir mesmo assim, se o mestre liberar.</p>` : ""}
			${resumo}<h3 class="t20c-subtitulo">Suas classes</h3><div class="t20c-cartoes">${atuais || '<p class="t20c-vazio">Nenhuma classe ainda.</p>'}</div>
			<h3 class="t20c-subtitulo">Multiclasse</h3>${busca(".t20c-cartoes-nova .t20c-cartao")}<div class="t20c-cartoes t20c-cartoes-nova">${novas}</div>`;
	},
	erro(app) {
		if (!app.classe) return "Escolha a classe deste nível.";
		if (app.nivelNovo > 20) return "O personagem já está no 20º nível.";
		return null;
	}
};

/* -------------------------------------------- 2. habilidades e poder */

function poderesDasClasses(app, nomes) {
	const alvo = new Set(nomes.map(slug));
	return app.c.poderes.filter((p) => p.system?.tipo === "classe" && alvo.has(slug(p.system?.subtipo))).sort((a, b) => a.name.localeCompare(b.name));
}

const PASSO_HABILIDADES = {
	id: "habilidades",
	titulo: "Habilidades",
	dica: "Você ganha todas as habilidades do nível alcançado (tabela da classe). Quando a tabela dá um poder, escolha um da sua classe ou, se preferir, um poder geral. Os filtros mostram só o que você pode pegar agora; desmarque para ver todos.",
	render(app) {
		const tem = new Set(app.actor.items.map((i) => i.name));
		const ctx = app.contexto();
		const raca = app.raca;
		const extra = (p) => `${tem.has(p.name) ? ' <small class="t20c-mudo">(já tem)</small>' : ""} <small class="t20c-mudo">${escapar(p.system?.subtipo ?? "")} · ${escapar(p.livro)}</small>`;
		const linhas = app.linha
			.filter((h) => !h.poder)
			.map(
				(h) =>
					`<li>${termo(`${h.nome}${h.detalhe ? ` ${h.detalhe}` : ""}`, h.uuid, "t20c-termo")}${h.melhora ? ' <small class="t20c-mudo">(melhora)</small>' : ""}${tem.has(h.nome) && !h.melhora ? ' <small class="t20c-mudo">(já tem)</small>' : ""}${h.uuid || h.novo || h.escolha || h.melhora ? "" : ' <small class="t20c-mudo">(adicione à mão)</small>'}${h.nota ? ` <small class="t20c-mudo">${escapar(h.nota)}</small>` : ""}</li>`
			)
			.join("");
		// Habilidades que dão um poder de outra classe (Vassalo: Valete, Sargento do Reino…).
		const concedidos = app.linha
			.map((h, i) => [h, i])
			.filter(([h]) => h.concedePoder?.length)
			.map(([h, i]) => {
				const nomes = h.concedePoder.map((k) => app.d.CLASSES[k]?.nome ?? k);
				const itens = h.concedePoder.includes("geral") ? [...poderesDasClasses(app, nomes), ...poderesGerais(app.c, raca)] : poderesDasClasses(app, nomes);
				return `<h3 class="t20c-subtitulo">${escapar(h.nome)}: poder de ${escapar(nomes.join(" ou "))}</h3>${listaDeEscolhas(app, { campo: `concedidos.c${i}`, itens, contexto: ctx, max: 1, extra, filtros: true, raca })}`;
			})
			.join("");
		let poder = "";
		const espaco = app.espacoDePoder;
		if (espaco) {
			const itens = [...poderesDasClasses(app, espaco.classes), ...poderesGerais(app.c, raca)];
			poder = `<h3 class="t20c-subtitulo">Poder deste nível <small class="t20c-mudo">(de ${escapar(espaco.classes.join(" ou "))} ou geral)</small></h3>
				${app.estado.poder ? `<p>Escolhido: <strong>${escapar(app.nomeDe(app.estado.poder))}</strong></p>` : ""}
				${listaDeEscolhas(app, { campo: "poder", itens, contexto: ctx, max: 1, extra, filtros: true, raca })}`;
		}
		return `<h3 class="t20c-subtitulo">${escapar(app.classe?.nome)} ${app.nivelNaClasse}º nível</h3>
			${linhas ? `<ul class="t20c-lista">${linhas}</ul>` : '<p class="t20c-mudo">Nenhuma habilidade fixa neste nível.</p>'}
			${escolhasDoNivel(app, app.classe, app.nivelNaClasse, app.prefixo)}${concedidos}${poder}`;
	},
	erro(app) {
		const erro = erroDasEscolhas(app, app.classe, app.nivelNaClasse, app.prefixo);
		if (erro) return erro;
		for (const [i, h] of app.linha.entries()) if (h.concedePoder?.length && !app.estado.concedidos?.[`c${i}`]) return `Escolha o poder de ${h.nome}.`;
		return app.espacoDePoder && !app.estado.poder ? "Escolha o poder deste nível." : null;
	}
};

/* -------------------------------------------- 3. magias */

const PASSO_MAGIAS = {
	id: "magias",
	titulo: "Magias",
	dica: "Magias novas deste nível, até o maior círculo que a classe alcança agora.",
	visivel: (app) => app.magiasNovas > 0,
	render(app) {
		const m = app.classe.magias;
		let escolas = "";
		if (m.escolherEscolas && !(app.actor.getFlag(MODULE_ID, "escolasDeMagia") ?? []).length) {
			const marcadas = lista(app.estado.escolas);
			const todas = [...new Set(app.c.magias.filter((s) => [m.tipo, "uni"].includes(s.system?.tipo)).map((s) => s.system?.escola).filter(Boolean))].sort();
			escolas = `<p><strong>Escolas de magia</strong> (${marcadas.length}/${m.escolherEscolas}, para sempre):</p><div class="t20c-grade">${todas
				.map((k) => `<label class="t20c-check"><input type="checkbox" data-campo="escolas" data-lista data-max="${m.escolherEscolas}" value="${k}" ${marcadas.includes(k) ? "checked" : ""}> ${escapar(nomeEscola(k))}</label>`)
				.join("")}</div>`;
		}
		const conhecidas = new Set(app.actor.items.filter((i) => i.type === "magia").map((i) => i.name));
		const itens = magiasDisponiveis(app.c, app.classe, app.circuloMaximo, lista(app.estado.escolas)).filter((s) => !conhecidas.has(s.name));
		const n = app.magiasNovas;
		return `${escolas}<p>Escolha ${n} (${lista(app.estado.magias).length}/${n}), até o ${app.circuloMaximo}º círculo.${m.nota ? ` <span class="t20c-mudo">${escapar(m.nota)}</span>` : ""}</p>
			${listaDeEscolhas(app, { campo: "magias", itens, max: n, extra: (s) => ` <small class="t20c-mudo">${s.system?.circulo}º círculo · ${escapar(nomeEscola(s.system?.escola))} · ${escapar(s.livro)}</small>` })}`;
	},
	erro(app) {
		const m = app.classe?.magias;
		if (m?.escolherEscolas && lista(app.estado.escolas).length < m.escolherEscolas) return `Escolha ${m.escolherEscolas} escolas de magia.`;
		return lista(app.estado.magias).length < app.magiasNovas ? `Escolha ${app.magiasNovas} magias.` : null;
	}
};

/* -------------------------------------------- 4. devoção */

const PASSO_DEVOCAO = {
	id: "devocao",
	titulo: "Devoção",
	dica: "Você pode se tornar devoto ao subir de nível. Só pode ter uma devoção e não pode mudá-la (JdA p. 96). Opcional.",
	visivel: (app) => !app.actor.system?.detalhes?.divindade && Boolean(app.d?.DIVINDADES) && app.classe?.devocao !== "proibida",
	render(app) {
		const deuses = Object.entries(app.d.DIVINDADES).sort((a, b) => a[1].nome.localeCompare(b[1].nome));
		const cartoes = [`<button type="button" class="t20c-cartao ${!app.estado.divindade ? "selecionado" : ""}" data-campo="divindade" data-valor=""><span class="t20c-sem-img"><i class="fa-solid fa-ban"></i></span><span class="t20c-cartao-texto"><strong>Agora não</strong></span></button>`]
			.concat(deuses.map(([k, d]) => cartao({ campo: "divindade", valor: k, nome: d.nome, sub: escapar([d.titulo, d.fonte].filter(Boolean).join(" · ")), selecionado: k === app.estado.divindade, dica: { divindade: k } })))
			.join("");
		const d = app.d.DIVINDADES[app.estado.divindade];
		const detalhe = d
			? `<div class="t20c-detalhe"><h3>${escapar(d.nome)}</h3>${d.devotos ? `<p><strong>Devotos:</strong> ${escapar(d.devotos)}</p>` : ""}${d.obrigacoes ? `<p><strong>Obrigações e restrições:</strong> ${escapar(d.obrigacoes)}</p>` : ""}
				<p><strong>Poder concedido:</strong></p>${listaDeEscolhas(app, { campo: "poderConcedido", itens: (d.poderes ?? []).map((p) => app.c.itens.find((i) => i.uuid === p.uuid)).filter(Boolean), contexto: app.contexto(), max: 1 })}</div>`
			: "";
		return `${detalhe}${busca(".t20c-cartao")}<div class="t20c-cartoes t20c-cartoes-texto">${cartoes}</div>`;
	},
	erro(app) {
		return app.estado.divindade && !lista(app.estado.poderConcedido).length ? "Escolha o poder concedido." : null;
	}
};

/* -------------------------------------------- 5. resumo */

const PASSO_CONCESSOES = {
	id: "concessoes",
	titulo: "Escolhas dos poderes",
	dica: "O poder escolhido (ou uma habilidade do nível) dá outra escolha: um poder de outra lista, uma perícia ou um bônus.",
	visivel: (app) => app.fontes.length > 0,
	render(app) {
		const treinadas = new Set(Object.entries(app.actor.system?.pericias ?? {}).filter(([, p]) => p?.treinado).map(([k]) => k));
		return renderConcessoes(app, app.fontes, { contexto: app.contexto(), treinadas, raca: app.raca });
	},
	erro: (app) => erroDasConcessoes(app, app.fontes)
};

const PASSO_RESUMO = {
	id: "resumo",
	titulo: "Resumo",
	render(app) {
		const c = app.classe;
		const fixas = app.linha.filter((h) => !h.poder).map((h) => `${escapar(h.nome)}${h.detalhe ? ` ${escapar(h.detalhe)}` : ""}`);
		const escolhas = app.linha
			.map((h, i) => h.escolha?.[Number(app.estado.escolhas?.[`${app.prefixo}${i}`])]?.nome)
			.filter(Boolean)
			.map(escapar);
		const linha = (rotulo, valor) => `<tr><th>${rotulo}</th><td>${valor || "—"}</td></tr>`;
		const esc = escolhasDasConcessoes(app, app.fontes);
		const concessoes = [...esc.pericias.map((p) => `${app.d.PERICIAS[p.pericia]} (${p.fonte})`), ...esc.bonus.map((b) => `+${b.valor} em ${app.d.PERICIAS[b.pericia]} (${b.fonte})`), ...esc.poderes.map((u) => app.nomeDe(u))]
			.map(escapar)
			.join(", ");
		return `<table class="t20c-resumo">
			${linha("Nível", `${app.nivelNovo}º (${escapar(c?.nome)} ${app.nivelNaClasse})`)}
			${linha("PV e PM", `+${c?.pv?.porNivel} PV + Constituição, +${c?.pm?.porNivel} PM`)}
			${linha("Habilidades", fixas.join(", "))}
			${escolhas.length ? linha("Escolhas", escolhas.join(", ")) : ""}
			${Object.values(app.estado.concedidos ?? {}).length ? linha("Poderes das habilidades", Object.values(app.estado.concedidos).map((u) => escapar(app.nomeDe(u))).join(", ")) : ""}
			${app.espacoDePoder ? linha("Poder", escapar(app.nomeDe(app.estado.poder))) : ""}
			${app.magiasNovas ? linha("Magias", lista(app.estado.magias).map((u) => escapar(app.nomeDe(u))).join(", ")) : ""}
			${app.estado.divindade ? linha("Devoção", `${escapar(app.d.DIVINDADES[app.estado.divindade]?.nome)} (${lista(app.estado.poderConcedido).map((u) => escapar(app.nomeDe(u))).join(", ")})`) : ""}
			${concessoes ? linha("Escolhas dos poderes", concessoes) : ""}
		</table>`;
	}
};
