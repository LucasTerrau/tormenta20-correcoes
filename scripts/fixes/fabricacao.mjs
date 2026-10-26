import { MODULE_ID } from "../constants.mjs";
import { TABELAS } from "../migracao/tesouro-dados.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Fabricação (JdA p. 121–122, 164–167, 333–334, 341):
 * - matéria-prima: 1/3 do preço; tempo: 1 dia (consumíveis), 1 semana (comuns), 1 mês (superiores e
 *   mágicos); CD 15 (simples) ou 20 (complexos); sem instrumentos de ofício, –5; consumíveis: –5 para duas
 *   unidades;
 * - melhorias (Tabela 3-7): +T$ 300/3.000/9.000/18.000 (total) e CD +5 cada; material especial conta como
 *   melhoria e soma o preço da Tabela 3-9;
 * - encantos (Tabela 8-7): +T$ 18.000/36.000/72.000 e CD +10/15/20; específicos: CD 30/40/50; sacrifica 1/2/3
 *   PM (menor, médio, maior);
 * - poções: T$ 30 × PM², CD 20 + PM, 1 dia, sem gastar PM;
 * - pergaminhos (Escrever Pergaminho, JdA p. 131 e 333): qualquer magia conhecida, Ofício (escriba), T$ 30 × PM²,
 *   CD 20 + PM, 1 dia, sem aprimoramentos (só ao ativar). Tinta do Mago também escreve e, com Escrever Pergaminho,
 *   paga metade; Copista (Deuses de Arton) também escreve e, com Escrever Pergaminho, faz dois de uma vez.
 * O sistema só tinha o botão de preparar poção, que gastava os PM da magia, não cobrava nem testava nada; para
 * pergaminho não havia nada.
 * Correção: o botão de preparar poção cobra a matéria-prima, rola Ofício (alquimista) contra 20 + PM e não
 * gasta PM; a ficha de cada item ganha o botão "Fabricar", com custo, CD, tempo e PM sacrificados, o teste
 * do Ofício certo e os modificadores encontrados na ficha (Aprendiz de Drogadora, Metalurgia Hobgoblin,
 * Armeiro Armado, Tinta do Mago, Síntese Rápida, Gênio Inovador, Toque de Esmeralda, Golpe de Gênio, Prata
 * da Casa, Virtude do Forjador, Engenhoso, Artesão Criativo, instrumentos de ofício). O livro não diz o que
 * acontece na falha (fora "falhar por 5 estraga o item" ao acrescentar melhoria): a matéria-prima só é
 * cobrada no sucesso, e o mestre decide.
 */
const MELHORIA_PRECO = [0, 300, 3000, 9000, 18000];
const ENCANTO_PRECO = [0, 18000, 36000, 72000];
const ENCANTO_CD = [0, 10, 15, 20];
const MATERIAIS = {
	"aco-rubi": { arma: 6000, armaduraLeve: 3000, armaduraPesada: 6000, escudo: 3000, esoterico: 6000 },
	adamante: { arma: 3000, armaduraLeve: 6000, armaduraPesada: 18000, escudo: 6000, esoterico: 3000 },
	"gelo eterno": { arma: 600, armaduraLeve: 1500, armaduraPesada: 3000, escudo: 1500, esoterico: 3000 },
	"madeira tollon": { arma: 1500, escudo: 1500, esoterico: 1500 },
	"materia vermelha": { arma: 1500, armaduraLeve: 6000, armaduraPesada: 18000, escudo: 6000, esoterico: 3000 },
	mitral: { arma: 1500, armaduraLeve: 1500, armaduraPesada: 12000, escudo: 1500, esoterico: 3000 },
	"casco de monstro": { arma: 750, armaduraLeve: 750, armaduraPesada: 6000, escudo: 750, esoterico: 6000 },
	lanajuste: { arma: 600, armaduraLeve: 1500, armaduraPesada: 3000, escudo: 1500, esoterico: 3000 },
	prata: { arma: 600, armaduraLeve: 1500, armaduraPesada: 3000, escudo: 1500, esoterico: 400 }
};
const DOIS_ENCANTOS = /^(energ[eé]tica|lancinante|magn[ií]fica|guardi[aã]o)/i;
const OFICIOS = { alfa: "Ofício (alfaiate)", alqu: "Ofício (alquimista)", arme: "Ofício (armeiro)", arte: "Ofício (artesão)", cozi: "Ofício (cozinheiro)", enge: "Ofício (engenhoqueiro)", escriba: "Ofício (escriba)" };

const normal = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const tem = (actor, nome) => actor?.items?.some((i) => i.name === nome) ?? false;

/** Categoria de item mágico específico pela tabela de tesouro em que ele está. */
function categoriaPelaTabela(item) {
	const uuid = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? item.uuid;
	for (const [chave, categoria] of [["acessoriosMenores", "menor"], ["acessoriosMedios", "medio"], ["acessoriosMaiores", "maior"]]) {
		if (TABELAS[chave]?.resultados.some((r) => r.documentUuid === uuid)) return categoria;
	}
	return null;
}

function ehEspecifico(item) {
	const uuid = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
	return /equipamentos-magicos/.test(uuid) || item.system?.tipo === "acessorio" || Boolean(categoriaPelaTabela(item));
}

/** O que o livro diz para fabricar este item (sem modificadores). */
export function baseDaFabricacao(item) {
	const s = item.system ?? {};
	const tipoEq = s.tipo;
	let oficio = "arte";
	let cd = 15;
	let tempo = "1 semana";
	let consumivel = false;
	let classe = null;
	if (item.type === "arma") {
		oficio = "arme";
		cd = s.proficiencia === "simples" ? 15 : 20;
		classe = "arma";
	} else if (item.type === "equipamento") {
		if (tipoEq === "leve") [oficio, cd, classe] = ["arme", 15, "armaduraLeve"];
		else if (tipoEq === "pesada") [oficio, cd, classe] = ["arme", 20, "armaduraPesada"];
		else if (tipoEq === "escudo") [oficio, cd, classe] = ["arme", 15, "escudo"];
		else if (tipoEq === "esoterico") [oficio, cd, classe] = ["arte", 20, "esoterico"];
		else if (tipoEq === "ferramenta") [oficio, cd] = ["arte", 20];
		else if (tipoEq === "traje") [oficio, cd] = ["alfa", 20];
	} else if (item.type === "consumivel") {
		consumivel = true;
		tempo = "1 dia";
		if (s.tipo === "potion") [oficio, cd] = ["alqu", 20 + Math.max(1, Math.round(Math.sqrt((Number(s.preco) || 30) / 30)))];
		else if (s.tipo === "scroll") [oficio, cd] = ["escriba", 20 + Math.max(1, Math.round(Math.sqrt((Number(s.preco) || 30) / 30)))];
		else if (s.tipo === "food") [oficio, cd, tempo] = ["cozi", 15, "1 hora"];
		else if (s.tipo === "ammo") [oficio, cd] = ["arme", 15];
		else [oficio, cd] = ["alqu", /veneno|pe[cç]onha|n[eé]voa t[oó]xica|bruma|beladona|cicuta|riso de nimb|po de lich|essencia de sombra/i.test(normal(item.name)) ? 20 : 15];
	}
	const upgrades = item.effects?.filter((e) => e.system?.upgrade?.type && !e.disabled) ?? [];
	const melhorias = upgrades.filter((e) => ["improvement", "material"].includes(e.system.upgrade.type));
	const materiais = upgrades.filter((e) => e.system.upgrade.type === "material");
	const encantos = upgrades.filter((e) => e.system.upgrade.type === "enchantment");
	const nEncantos = encantos.reduce((s2, e) => s2 + (DOIS_ENCANTOS.test(e.name) ? 2 : 1), 0);
	return { oficio, cd, tempo, consumivel, classe, melhorias, materiais, encantos, nEncantos, especifico: ehEspecifico(item) && !melhorias.length && !encantos.length };
}

/** Custo, CD, tempo e PM com as opções da janela. */
function calcular(item, actor, op) {
	const b = baseDaFabricacao(item);
	const precoBase = Number(item.system?.preco) || 0;
	const notas = [];
	let cd = b.cd;
	let preco = precoBase;
	let tempo = b.tempo;
	let pmSacrificio = 0;
	let multiplicadorCusto = 1 / 3;
	if (b.especifico && op.categoria) {
		cd = { menor: 30, medio: 40, maior: 50 }[op.categoria];
		pmSacrificio = { menor: 1, medio: 2, maior: 3 }[op.categoria];
		tempo = "1 mês";
	} else {
		let melhorias = b.melhorias.filter((m) => !(op.toqueEsmeralda && /^(banhad|cravejad)/i.test(m.name)));
		const esmeraldas = b.melhorias.length - melhorias.length;
		const n = Math.min(4, Math.max(0, melhorias.length - (op.genioInovador ? 1 : 0)));
		let precoMelhorias = MELHORIA_PRECO[n];
		if (op.melhoriaUmQuarto && precoMelhorias) {
			precoMelhorias = precoMelhorias * (3 / 4);
			notas.push("melhorias a 1/4 do preço");
		}
		const precoMaterial = b.materiais.reduce((s2, m) => s2 + (MATERIAIS[normal(m.name)]?.[b.classe] ?? 0), 0);
		const ne = Math.min(3, b.nEncantos);
		preco = precoBase + precoMelhorias + precoMaterial + ENCANTO_PRECO[ne] + esmeraldas * 100 * 3;
		cd = b.cd + 5 * n + ENCANTO_CD[ne];
		if (n || ne) tempo = "1 mês";
		pmSacrificio = ne;
		if (esmeraldas) notas.push("Toque de Esmeralda: banhado/cravejado por T$ 100, sem contar como melhoria");
	}
	if (op.drogadora && (item.type === "consumivel" && ["alchemy", "potion"].includes(item.system?.tipo))) {
		multiplicadorCusto = 1 / 4;
		notas.push("Aprendiz de Drogadora: matéria-prima a 1/4");
	}
	if (op.tintaDoMago && item.system?.tipo === "scroll") {
		multiplicadorCusto /= 2;
		notas.push("Tinta do Mago + Escrever Pergaminho: metade do custo");
	}
	if (op.golpeDeGenio && tempo === "1 mês") tempo = "1 semana (Golpe de Gênio)";
	if (op.prataDaCasa && item.type === "arma" && item.system?.proficiencia === "fogo" && !pmSacrificio) tempo = "1 semana (Prata da Casa)";
	if (op.virtudeForjador && item.type === "arma" && tempo === "1 mês" && !pmSacrificio) tempo = "2 semanas (Virtude do Forjador)";
	const unidades = b.consumivel ? Number(op.unidades) || 1 : 1;
	const penalidadeUnidades = unidades > 1 && !op.sinteseRapida ? -5 : 0;
	const custo = emTibares(preco * multiplicadorCusto * unidades);
	return { ...b, preco, cd, tempo, pmSacrificio, custo, unidades, penalidadeUnidades, notas };
}

/** Arredonda para cima até o TC (T$ 0,1), a menor moeda. */
function emTibares(valor) {
	return Math.ceil(valor * 10 - 1e-6) / 10;
}

/* -------------------------------------------- dinheiro */

export function dinheiroTotal(actor) {
	const d = actor.system?.dinheiro ?? {};
	return (Number(d.tp) || 0) + 10 * (Number(d.to) || 0) + (Number(d.tc) || 0) / 10;
}

export async function pagar(actor, valor) {
	const total = dinheiroTotal(actor);
	if (total + 1e-9 < valor) return false;
	const d = actor.system.dinheiro;
	let resto = Math.round((total - valor) * 10) / 10;
	const to = Math.min(Number(d.to) || 0, Math.floor(resto / 10));
	resto -= to * 10;
	const tp = Math.floor(resto + 1e-9);
	const tc = Math.round((resto - tp) * 10);
	await actor.update({ "system.dinheiro.to": to, "system.dinheiro.tp": tp, "system.dinheiro.tc": tc });
	return true;
}

/* -------------------------------------------- teste */

function chaveDaPericia(actor, oficio, artesaoCriativo) {
	if (artesaoCriativo && oficio !== "arte") return "arte";
	if (oficio !== "escriba") return oficio;
	const custom = Object.entries(actor.system.pericias ?? {}).find(([, p]) => /escriba/i.test(p.label ?? ""));
	return custom?.[0] ?? "arte";
}

function bonusDeInstrumentos(actor) {
	const temInstrumento = actor.items.some((i) => /^instrumentos (de of[ií]cio|da celeridade)|pena da cria[cç][aã]o|frigideira do chef/i.test(i.name));
	if (tem(actor, "Engenhoso")) return temInstrumento ? 2 : 0;
	return temInstrumento ? 0 : -5;
}

async function testar(actor, chave, cd, bonus) {
	const UsageConfig = game.settings.get("tormenta20", "UsageConfig");
	const teste = await actor.rollPericia(chave, { event: { shiftKey: UsageConfig !== "default" }, message: false });
	if (!teste) return null;
	const total = teste.total + bonus;
	const natural = teste.dice?.find((d) => d.faces === 20)?.total;
	const passou = natural === 20 || (natural !== 1 && total >= cd);
	return { teste, total, passou };
}

/* -------------------------------------------- janela */

function opcoesPadrao(actor) {
	return {
		drogadora: tem(actor, "Aprendiz de Drogadora"),
		melhoriaUmQuarto: (tem(actor, "Metalurgia Hobgoblin") || tem(actor, "Armeiro Armado")) && tem(actor, "Fabricar Item Superior"),
		tintaDoMago: tem(actor, "Tinta do Mago") && tem(actor, "Escrever Pergaminho"),
		sinteseRapida: tem(actor, "Síntese Rápida"),
		genioInovador: tem(actor, "Gênio Inovador"),
		toqueEsmeralda: tem(actor, "Toque de Esmeralda"),
		golpeDeGenio: false,
		prataDaCasa: tem(actor, "Prata da Casa"),
		virtudeForjador: tem(actor, "Virtude do Forjador"),
		artesaoCriativo: tem(actor, "Artesão Criativo")
	};
}

const ROTULOS = {
	drogadora: "Aprendiz de Drogadora (1/4 em alquímicos e poções)",
	melhoriaUmQuarto: "Metalurgia Hobgoblin / Armeiro Armado (melhorias a 1/4)",
	tintaDoMago: "Tinta do Mago (pergaminho pela metade)",
	sinteseRapida: "Síntese Rápida (dobro de doses sem –5)",
	genioInovador: "Gênio Inovador (uma melhoria grátis)",
	toqueEsmeralda: "Toque de Esmeralda (banhado/cravejado por T$ 100)",
	golpeDeGenio: "Golpe de Gênio (1 semana, 1×/aventura)",
	prataDaCasa: "Prata da Casa (arma de fogo em 1 semana)",
	virtudeForjador: "Virtude do Forjador (metade do tempo)",
	artesaoCriativo: "Artesão Criativo (Ofício artesão para tudo)"
};

function resumo(item, actor, op) {
	const r = calcular(item, actor, op);
	const chave = chaveDaPericia(actor, r.oficio, op.artesaoCriativo);
	const instrumentos = bonusDeInstrumentos(actor);
	const bonus = instrumentos + r.penalidadeUnidades + (Number(op.bonus) || 0);
	return { ...r, chave, bonus, instrumentos };
}

function htmlDoResumo(r, actor) {
	const avisos = [];
	if (r.melhorias.length && !["Fabricar Item Superior", "Virtude do Forjador", "Metalurgia Hobgoblin", "Armeiro Armado", "Ofício do Mosteiro"].some((n) => tem(actor, n))) avisos.push("itens superiores exigem Fabricar Item Superior (ou poder parecido)");
	if ((r.nEncantos || r.especifico) && !["Fabricar Item Mágico", "Encantar Itens Menores", "Encantar Itens Médios", "Encantar Itens Maiores", "Artista das Armas"].some((n) => tem(actor, n))) avisos.push("itens mágicos exigem Fabricar Item Mágico (ou poder parecido)");
	return `<p><strong>${OFICIOS[r.oficio] ?? r.chave}</strong> CD ${r.cd}${r.bonus ? ` (bônus ${r.bonus > 0 ? "+" : ""}${r.bonus}${r.instrumentos ? `; instrumentos ${r.instrumentos > 0 ? "+" : ""}${r.instrumentos}` : ""})` : ""} · matéria-prima <strong>T$ ${r.custo}</strong> (preço T$ ${r.preco}${r.unidades > 1 ? `, ${r.unidades} unidades` : ""}) · tempo ${r.tempo}${r.pmSacrificio ? ` · sacrifica ${r.pmSacrificio} PM` : ""}</p>${r.notas.length ? `<p style="font-size:.85em">${r.notas.join("; ")}</p>` : ""}${avisos.length ? `<p style="font-size:.85em;color:#a33">${avisos.join("; ")}</p>` : ""}<p style="font-size:.85em;opacity:.8">Dinheiro: T$ ${dinheiroTotal(actor)}</p>`;
}

async function abrirFabricacao(item, actor) {
	actor ??= item.actor ?? canvas.tokens?.controlled?.[0]?.actor ?? game.user.character;
	if (!actor) return ui.notifications.warn("Selecione quem vai fabricar.");
	const op = { ...opcoesPadrao(actor), unidades: 1, bonus: 0, categoria: categoriaPelaTabela(item) ?? "medio", adicionar: true };
	const base = baseDaFabricacao(item);
	const opcoesHtml = Object.entries(ROTULOS)
		.map(([k, rotulo]) => `<label style="display:block"><input type="checkbox" name="${k}" ${op[k] ? "checked" : ""}> ${rotulo}</label>`)
		.join("");
	const conteudo = `<div class="t20c-fabricar">
		<p><strong>${item.name}</strong> — ${actor.name}</p>
		${base.especifico ? `<label>Categoria do item mágico: <select name="categoria"><option value="menor">menor</option><option value="medio" selected>médio</option><option value="maior">maior</option></select></label>` : ""}
		${base.consumivel ? `<label>Unidades: <input type="number" name="unidades" value="1" min="1" max="10" style="width:4em"></label>` : ""}
		<label style="display:block">Outros bônus no teste (ajudar, itens…): <input type="number" name="bonus" value="0" style="width:4em"></label>
		<details><summary>Modificadores</summary>${opcoesHtml}</details>
		<label style="display:block"><input type="checkbox" name="adicionar" checked> Pôr o item fabricado no inventário</label>
		<div class="t20c-fabricar-resumo"></div>
	</div>`;
	const ler = (raiz) => {
		const campo = (nome) => raiz?.querySelector?.(`[name="${nome}"]`);
		const novo = { ...op };
		for (const k of Object.keys(ROTULOS)) novo[k] = Boolean(campo(k)?.checked);
		novo.unidades = Number(campo("unidades")?.value) || 1;
		novo.bonus = Number(campo("bonus")?.value) || 0;
		novo.categoria = campo("categoria")?.value ?? op.categoria;
		novo.adicionar = Boolean(campo("adicionar")?.checked);
		return novo;
	};
	const dialogo = new foundry.applications.api.DialogV2({
		window: { title: `Fabricar: ${item.name}` },
		content: conteudo,
		buttons: [
			{ action: "fabricar", label: "Testar e pagar", default: true, callback: (event, button, dialog) => ler(dialog?.element ?? button.form) },
			{ action: "cancelar", label: "Cancelar" }
		],
		submit: async (escolha) => {
			if (!escolha || escolha === "cancelar") return;
			await executar(item, actor, escolha).catch((error) => warn("Falha na fabricação.", error));
		}
	});
	await dialogo.render({ force: true });
	const form = dialogo.element;
	const atualizar = () => {
		const alvo = dialogo.element.querySelector(".t20c-fabricar-resumo");
		if (alvo) alvo.innerHTML = htmlDoResumo(resumo(item, actor, ler(form)), actor);
	};
	if (base.especifico && op.categoria) {
		const select = dialogo.element.querySelector("select[name=categoria]");
		if (select) select.value = op.categoria;
	}
	dialogo.element.addEventListener("change", atualizar);
	dialogo.element.addEventListener("input", atualizar);
	atualizar();
}

async function executar(item, actor, op) {
	const r = resumo(item, actor, op);
	if (dinheiroTotal(actor) + 1e-9 < r.custo) return ui.notifications.warn(`${actor.name} não tem T$ ${r.custo} para a matéria-prima.`);
	const resultado = await testar(actor, r.chave, r.cd, r.bonus);
	if (!resultado) return;
	const linhas = [`${OFICIOS[r.oficio] ?? r.chave}: ${resultado.total} contra CD ${r.cd} — ${resultado.passou ? "fabricou" : "não conseguiu (o livro não diz o que se perde; nada foi cobrado)"}`];
	if (resultado.passou) {
		await pagar(actor, r.custo);
		linhas.push(`Matéria-prima: T$ ${r.custo}. Tempo: ${r.tempo}.`);
		if (r.pmSacrificio) {
			await actor.createEmbeddedDocuments("ActiveEffect", [
				{
					name: `PM sacrificados: ${item.name}`,
					img: item.img,
					type: "base",
					system: { changes: [{ key: "system.attributes.pm.bonus.total", type: "add", value: String(-r.pmSacrificio), phase: "initial", priority: null }] },
					flags: { [MODULE_ID]: { fonte: "sempre", pmSacrificados: item.uuid } }
				}
			]);
			linhas.push(`Sacrificou ${r.pmSacrificio} PM (voltam se o item for destruído: apague o efeito).`);
		}
		if (op.adicionar) {
			if (r.consumivel && item.actor === actor) await item.update({ "system.qtd": (Number(item.system.qtd) || 0) + r.unidades });
			else {
				const dados = item.toObject();
				delete dados._id;
				if (r.consumivel) dados.system.qtd = r.unidades;
				foundry.utils.setProperty(dados, `flags.${MODULE_ID}.fabricadoPor`, actor.uuid);
				await actor.createEmbeddedDocuments("Item", [dados]);
			}
		}
	}
	await resultado.teste.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `Fabricar ${item.name}: ${linhas.join(" ")}` });
}

/* -------------------------------------------- escrever pergaminho */

const PODERES_DE_PERGAMINHO = ["Escrever Pergaminho", "Tinta do Mago", "Copista"];
const podeEscrever = (actor) => PODERES_DE_PERGAMINHO.some((n) => tem(actor, n));
/** Magia cujo diálogo teve o botão "Escrever pergaminho" clicado (o sistema resolve o diálogo pelo botão de usar). */
let escrevendo = null;

/** Botão "Escrever pergaminho" no diálogo da magia, ao lado de usar (e de preparar poção). */
function botaoDeEscrever(app, html) {
	const item = app.item;
	if (item?.type !== "magia" || !item.actor || !(podeEscrever(item.actor) || game.user.isGM)) return;
	const raiz = app.element?.[0] ?? app.element ?? (html instanceof HTMLElement ? html : html?.[0]);
	const usar = raiz?.querySelector?.('.dialog-buttons button[data-button="use"]');
	const caixa = usar?.parentElement;
	if (!caixa || caixa.querySelector(".t20c-escrever")) return;
	const botao = document.createElement("button");
	botao.type = "button";
	botao.className = "dialog-button t20c-escrever";
	botao.innerHTML = '<i class="fas fa-scroll"></i> Escrever pergaminho';
	botao.dataset.tooltip = podeEscrever(item.actor) ? "Ofício (escriba), CD 20 + PM, 1 dia; sem aprimoramentos (JdA p. 131 e 333)" : "O personagem não tem Escrever Pergaminho (só o mestre vê este botão)";
	botao.addEventListener("click", (event) => {
		event.preventDefault();
		escrevendo = item;
		usar.click();
	});
	caixa.appendChild(botao);
}

/** Pergaminho com a magia: os dados dela, os aprimoramentos para quem a conhece usar ao ativar (JdA p. 341). */
function dadosDoPergaminho(magia, pm, unidades, actor) {
	const fonte = magia.toObject();
	const sys = foundry.utils.deepClone(fonte.system);
	sys.tipo = "scroll";
	sys.qtd = unidades;
	sys.espacos = 0.5;
	sys.preco = 30 * pm * pm;
	sys.ativacao = { ...(sys.ativacao ?? {}), custo: 0 };
	sys.rolled = [];
	return {
		name: `Pergaminho de ${magia.name}`,
		type: "consumivel",
		img: "systems/tormenta20/icons/itens/itens-magicos/pergaminho.webp",
		system: sys,
		effects: fonte.effects ?? [],
		flags: { [MODULE_ID]: { fabricadoPor: actor.uuid } }
	};
}

async function escreverPergaminho(magia) {
	const actor = magia.actor;
	const pm = Math.max(1, Number(magia.system?.ativacao?.custo) || 1);
	const tinta = tem(actor, "Tinta do Mago") && tem(actor, "Escrever Pergaminho");
	const unidades = tem(actor, "Copista") && tem(actor, "Escrever Pergaminho") ? 2 : 1;
	const custo = emTibares(30 * pm * pm * (1 / 3) * (tinta ? 1 / 2 : 1) * unidades);
	if (dinheiroTotal(actor) + 1e-9 < custo) return ui.notifications.warn(`${actor.name} não tem T$ ${custo} para a matéria-prima do pergaminho.`);
	const cd = 20 + pm;
	const chave = chaveDaPericia(actor, "escriba", false);
	const r = await testar(actor, chave, cd, bonusDeInstrumentos(actor));
	if (!r) return;
	const notas = [tinta ? "Tinta do Mago: metade do custo" : "", unidades > 1 ? "Copista: dois pergaminhos" : "", podeEscrever(actor) ? "" : "sem o poder Escrever Pergaminho (feito pelo mestre)"].filter(Boolean);
	const pericia = chave === "arte" ? "Ofício (artesão, no lugar de escriba)" : OFICIOS.escriba;
	await r.teste.toMessage({
		speaker: ChatMessage.getSpeaker({ actor }),
		flavor: `Escrever pergaminho de ${magia.name} (${pm} PM): ${pericia} ${r.total} contra CD ${cd} — ${r.passou ? `escreveu ${unidades > 1 ? `${unidades} pergaminhos` : "o pergaminho"}; matéria-prima T$ ${custo}, 1 dia` : "não conseguiu (nada foi cobrado)"}${notas.length ? ` (${notas.join("; ")})` : ""}.`
	});
	if (!r.passou) return;
	await pagar(actor, custo);
	const dados = dadosDoPergaminho(magia, pm, unidades, actor);
	const existente = actor.items.find((i) => i.type === "consumivel" && i.system?.tipo === "scroll" && i.name === dados.name);
	if (existente) await existente.update({ "system.qtd": (Number(existente.system.qtd) || 0) + unidades });
	else await actor.createEmbeddedDocuments("Item", [dados]);
}

/* -------------------------------------------- preparar poção */

async function prepararPocao(item, resultado) {
	const actor = item.actor;
	const pm = Math.max(1, Number(item.system?.ativacao?.custo) || 1);
	const preco = 30 * pm * pm;
	const custo = emTibares(preco * (tem(actor, "Aprendiz de Drogadora") ? 1 / 4 : 1 / 3));
	if (dinheiroTotal(actor) + 1e-9 < custo) {
		ui.notifications.warn(`${actor.name} não tem T$ ${custo} para a matéria-prima da poção.`);
		return false;
	}
	const cd = 20 + pm;
	const chave = tem(actor, "Zelador dos Vinhedos") && !actor.system.pericias?.alqu?.treinado ? "cozi" : "alqu";
	const r = await testar(actor, chave, cd, bonusDeInstrumentos(actor));
	if (!r) return false;
	await r.teste.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `Preparar poção de ${item.name} (${pm} PM): ${OFICIOS[chave]} ${r.total} contra CD ${cd} — ${r.passou ? `preparou; matéria-prima T$ ${custo}, 1 dia` : "não conseguiu (nada foi cobrado)"}` });
	if (!r.passou) return false;
	await pagar(actor, custo);
	return true;
}

export default {
	id: "fabricacao",
	name: "Fabricação: Preparar Poção, Escrever Pergaminho e botão Fabricar",
	hint: "Preparar poção cobra 1/3 do preço (T$ 30 × PM²), rola Ofício (alquimista) contra 20 + PM e não gasta PM (o sistema gastava os PM e não cobrava nada). Escrever pergaminho (botão no diálogo da magia, para quem tem Escrever Pergaminho, Tinta do Mago ou Copista): Ofício (escriba), mesma conta, sem aprimoramentos. A ficha de cada item ganha o botão Fabricar: custo, CD, tempo e PM sacrificados pelo livro (melhorias, materiais, encantos, específicos), o teste do Ofício certo e os modificadores da ficha (JdA p. 121–122, 164–167, 333–334).",
	init() {
		Hooks.on("getItemSheetHeaderButtons", (app, buttons) => {
			const item = app.document ?? app.item;
			if (!item || !["arma", "equipamento", "consumivel", "tesouro"].includes(item.type)) return;
			buttons.unshift({ label: "Fabricar", class: "t20c-fabricar", icon: "fas fa-hammer", onclick: () => abrirFabricacao(item).catch((error) => warn("Falha ao abrir a fabricação.", error)) });
		});
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			try {
				botaoDeEscrever(app, html);
			} catch (error) {
				warn("Falha ao pôr o botão de escrever pergaminho.", error);
			}
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			escrevendo = null;
			const resultado = await wrapped(item, ...args);
			// Escrever pergaminho: fabrica e não lança a magia (sem PM, sem cartão).
			if (escrevendo && escrevendo === item) {
				escrevendo = null;
				if (resultado) await escreverPergaminho(item).catch((error) => warn("Falha ao escrever o pergaminho.", error));
				return null;
			}
			if (!resultado?.brew || item?.type !== "magia" || !item.actor) return resultado;
			try {
				const ok = await prepararPocao(item, resultado);
				if (!ok) return null;
				item.actor._t20cPreparandoPocao = true;
			} catch (error) {
				warn("Falha ao preparar a poção.", error);
			}
			return resultado;
		});
		// Preparar poção não gasta PM (o sacrifício de PM é só de itens permanentes).
		wrap("CONFIG.Actor.documentClass.prototype.spendMana", async function (wrapped, ...args) {
			if (this._t20cPreparandoPocao) return this;
			return wrapped(...args);
		});
		wrap("CONFIG.Item.documentClass.prototype.roll", async function (wrapped, ...args) {
			try {
				return await wrapped(...args);
			} finally {
				if (this.actor) this.actor._t20cPreparandoPocao = false;
			}
		});
		// Poção de truque ou sem custo: o preço mínimo é o de 1 PM.
		Hooks.on("preCreateItem", (item) => {
			if (item.type === "consumivel" && item.system?.tipo === "potion" && item.parent?._t20cPreparandoPocao && !(Number(item.system.preco) > 0)) item.updateSource({ "system.preco": 30 });
		});
	},
	ready() {
		const modulo = game.modules.get(MODULE_ID);
		modulo.api = { ...(modulo.api ?? {}), abrirFabricacao, baseDaFabricacao };
	}
};
