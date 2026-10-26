import { equipado } from "../magia/regras.mjs";
import { TABELAS } from "../migracao/tesouro-dados.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Dano mágico e mundano. O sistema não separa os dois; estas regras dependem disso:
 * - Incorpóreo (JdA p. 229): "Só pode ser afetada por armas e efeitos mágicos (mesmo as com alcance
 *   toque) ou outras criaturas incorpóreas." Manto de Sombras (p. 197) também impede quem o usa de atacar
 *   criaturas normais.
 * - RD X/mágico (Cão do Inferno, Lich…): "exceto dano causado por habilidades e armas mágicas".
 * - RD X/mundano (Patuá, Armadura de Chumbo): pela mesma convenção, só vale contra dano mágico. O Instante
 *   Estoico é o contrário: RD só contra dano não mágico.
 * - Metade do dano de fontes mundanas (Dragão-Rei, Gatzvalith "exceto de aço-rubi") e de armas mundanas
 *   sem melhorias (Forjador Litúrgico): lido pela correção "Dano à metade" nas marcas desta rolagem.
 * O que é mágico: magia; poção, pergaminho e granada de magia; arma com encanto; item mágico específico;
 * arma sob Arma Mágica, Armamento da Natureza, Abençoar Arma, Arma da Floresta (óleos inclusos); item cujo
 * texto diz que é "considerado mágico" ou que "afeta criaturas incorpóreas" (Presas Espectrais).
 * Habilidades de criaturas são normais, a não ser que o texto diga (Ameaças de Arton, cap. 1: "mesmo o
 * sopro de fogo de um dragão" é normal; a marca de habilidade mágica do livro não existe nos compêndios).
 * Madeira Tollon só vence redução de dano; prata é mágica contra mortos-vivos e espíritos. Para o resto
 * (Arma Juramentada, Galhada…), o diálogo de uso oferece "Ataque mágico" quando o alvo marcado se importa.
 * A marca vai nas opções da rolagem (t20cMagico); rolagem sem marca (dano digitado, condições) não muda.
 */
const OPCAO_MAGICO = { id: "t20cAtaqueMagico", name: "Ataque mágico", descricao: "Conta como arma ou efeito mágico (incorpóreo, RD/mágico, metade de fontes mundanas): use quando um poder torna este ataque mágico." };
const EFEITOS_QUE_ENCANTAM = /arma m[áa]gica|armamento da natureza|aben[çc]oar arma|arma da floresta|arma juramentada/i;
const TEXTO_MAGICO = /considerad[oa]s? (como )?(armas? )?m[áa]gic|contam? como (armas? )?m[áa]gic|afetam? criaturas incorp[óo]reas/i;
const CURAS = new Set(["curapv", "curatpv", "curapm", "curatpm"]);

const limpar = (html) => String(html ?? "").replace(/<[^>]+>/g, " ");
const descricao = (item) => limpar(item?.system?.description?.value);
const alvosMarcados = () => [...(game.user?.targets ?? [])].map((t) => t.actor).filter(Boolean);

/* -------------------------------------------- quem é o quê */

/** Criatura incorpórea: pela ficha (texto "incorpóreo", poder Incorpóreo) ou sob Manto de Sombras. */
export function ehIncorporeo(actor) {
	if (!actor) return false;
	const s = actor.system ?? {};
	const textos = [s.detalhes?.resistencias, s.attributes?.sentidos?.custom, s.tracos?.ic?.custom];
	if (textos.some((t) => typeof t === "string" && /incorp[óo]re/i.test(t))) return true;
	if (actor.items?.some((i) => i.type === "poder" && /^incorp[óo]reo$/i.test(i.name.trim()))) return true;
	return sobMantoDeSombras(actor) || (actor.effects?.some((e) => e.active && /^incorp[óo]reo/i.test(e.name)) ?? false);
}

function sobMantoDeSombras(actor) {
	return actor?.effects?.some((e) => e.active && /manto de sombras/i.test(e.name)) ?? false;
}

/** "redução de dano 20/mágico" no texto de resistências da ficha. */
export function rdContraMundano(actor) {
	const texto = actor?.system?.detalhes?.resistencias;
	const m = typeof texto === "string" ? texto.match(/(?:redu[çc][ãa]o de dano|\bRD)\s*(\d+)\s*\/\s*m[áa]gic/i) : null;
	return m ? Number(m[1]) : 0;
}

/** RD que só vale contra dano mágico ("RD 2/mundano"): Armadura de Chumbo vestida, Patuá de devoto. */
function rdContraMagico(actor) {
	let rd = 0;
	for (const item of actor?.items ?? []) {
		if (!/^(patu[áa]|armadura de chumbo)/i.test(item.name) || !equipado(item)) continue;
		if (/^armadura de chumbo/i.test(item.name)) rd += 2;
		else if (/^patu[áa]/i.test(item.name) && devoto(actor)) rd += 2;
	}
	return rd;
}

function devoto(actor) {
	const d = actor.system?.detalhes ?? {};
	return Boolean(d.divindade?.value ?? d.divindade) || (actor.items?.some((i) => i.type === "poder" && i.system?.tipo === "concedido") ?? false);
}

/** Instante Estoico: a RD do efeito só vale contra dano não mágico. */
function rdDoInstanteEstoico(actor) {
	let rd = 0;
	for (const e of actor?.effects ?? []) {
		if (!e.active || !/instante estoico/i.test(e.name)) continue;
		for (const c of e.system?.changes ?? e.changes ?? []) if (c.key === "system.tracos.resistencias.dano.bonus") rd = Math.max(rd, Number(c.value) || 0);
	}
	return rd;
}

/** Metade do dano por fonte, pelo texto do poder: "fontes mundanas" ou "armas mundanas sem melhorias". */
export function fonteDaMetade(actor) {
	for (const item of actor?.items ?? []) {
		if (item.type !== "poder") continue;
		const texto = descricao(item);
		if (!/metade/i.test(texto)) continue;
		if (/armas mundanas sem melhorias/i.test(texto)) return { tipo: "armaSemMelhoria" };
		if (/fontes mundanas/i.test(texto)) return { tipo: "mundano", excetoAcoRubi: /exceto de a[çc]o-rubi/i.test(texto) };
	}
	return null;
}

/* -------------------------------------------- o que é mágico */

let itensMagicos = null;
function ehItemMagicoEspecifico(item) {
	const origem = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
	if (!origem) return false;
	if (origem.startsWith("Compendium.tormenta20.equipamentos-magicos.")) return true;
	itensMagicos ??= new Set(["armasEspecificas", "armadurasEspecificas", "acessoriosMenores", "acessoriosMedios", "acessoriosMaiores", "esotericosEspecificos"].flatMap((k) => (TABELAS[k]?.resultados ?? []).map((r) => r.documentUuid).filter(Boolean)));
	return itensMagicos.has(origem);
}

/**
 * Melhorias, materiais e encantos do item como [tipo, identificador]: listas do campo novo
 * (improvement/material/enchantment, Set de uuids), campos antigos (melhoria1, encanto1…) e as cópias em
 * efeito que o sistema põe no item (com o identificador, ex.: "dark-wood").
 */
const TIPO_ANTIGO = { melhoria: "improvement", encanto: "enchantment", material: "material", materialEspecial: "material" };
function melhoriasDa(item) {
	const nomes = [];
	for (const [k, v] of Object.entries(item.system?.upgrades ?? {})) {
		const tipo = ["improvement", "material", "enchantment"].includes(k) ? k : TIPO_ANTIGO[k.match(/^(melhoria|encanto|materialEspecial|material)\d*$/)?.[1]];
		if (!tipo) continue;
		const lista = v instanceof Set ? [...v] : Array.isArray(v) ? v : typeof v === "string" && v ? [v] : [];
		for (const x of lista) nomes.push([tipo, String(x)]);
	}
	for (const e of item.effects ?? []) {
		const tipo = e.system?.upgrade?.type;
		if (tipo) nomes.push([tipo, e.system.identifier || e.name]);
	}
	return nomes;
}

/**
 * Classifica o dano de um item. @returns {{magico: boolean, motivo: string, venceRD: boolean,
 * armaMundana: boolean, acoRubi: boolean, prata: boolean, incorporeo: boolean}}
 */
export function classificarDano(item, { forcado = false } = {}) {
	const actor = item.actor;
	const r = { magico: false, motivo: "", venceRD: false, armaMundana: false, acoRubi: false, prata: false, incorporeo: ehIncorporeo(actor) };
	const marcar = (motivo) => {
		r.magico = true;
		r.motivo ||= motivo;
	};
	if (item.type === "magia") marcar("magia");
	else if (item.type === "consumivel") {
		if (["potion", "scroll"].includes(item.system?.tipo)) marcar("magia em item");
	} else if (ehItemMagicoEspecifico(item)) marcar("item mágico");
	if (TEXTO_MAGICO.test(descricao(item)) || actor?.items?.some((i) => i.type === "poder" && i.name === item.name && TEXTO_MAGICO.test(descricao(i)))) marcar("habilidade mágica");
	if (item.type === "arma") {
		const melhorias = melhoriasDa(item);
		if (melhorias.some(([k]) => k === "enchantment")) marcar("encanto");
		r.venceRD = melhorias.some(([, v]) => v === "dark-wood" || /tollon/i.test(v));
		r.acoRubi = melhorias.some(([, v]) => v === "ruby-steel" || /a[çc]o-rubi/i.test(v));
		r.prata = melhorias.some(([, v]) => v === "silver" || /^prata/i.test(v));
		// Óleos e Arma Mágica viram efeitos de uso no personagem: nunca ficam "ativos", só ligados.
		for (const e of actor?.effects ?? []) {
			if (e.disabled || e.isExpired || !EFEITOS_QUE_ENCANTAM.test(e.name)) continue;
			const nomes = e.system?.abilityUse?.names;
			const lista = nomes instanceof Set ? [...nomes] : Array.isArray(nomes) ? nomes : [];
			if (!lista.length || lista.includes(item.name)) marcar(e.name.replace(/\s*\(.*$/, ""));
		}
		r.armaMundana = !r.magico && !forcado && !melhorias.length;
	}
	if (forcado) marcar("ataque mágico (marcado no uso)");
	return r;
}

/* -------------------------------------------- avisos */

/** O alvo se importa com a diferença? */
function alvoSeImporta(actor) {
	return ehIncorporeo(actor) || rdContraMundano(actor) > 0 || Boolean(fonteDaMetade(actor));
}

function avisosDoAtaque(item, info) {
	const avisos = [];
	const alvos = alvosMarcados();
	for (const alvo of alvos) {
		const prataVale = info.prata && ["mor", "esp"].includes(alvo.system?.detalhes?.tipo);
		if (ehIncorporeo(alvo) && !info.magico && !info.incorporeo && !prataVale) avisos.push(`${alvo.name} é incorpóreo: dano mundano não o afeta`);
		const rd = rdContraMundano(alvo);
		if (rd && (info.magico || info.venceRD)) avisos.push(`vence a RD ${rd}/mágico de ${alvo.name}`);
	}
	if (item.type === "arma" && sobMantoDeSombras(item.actor) && alvos.some((a) => !ehIncorporeo(a))) avisos.push("sob o Manto de Sombras, não pode atacar criaturas normais");
	return avisos;
}

async function avisarNoChat(actor, texto) {
	const dados = { content: `<p>${texto}</p>`, speaker: ChatMessage.getSpeaker({ actor }) };
	if (actor.type === "npc") dados.whisper = ChatMessage.getWhisperRecipients("GM").map((u) => u.id);
	await ChatMessage.create(dados);
}

function temDano(roll, padrao) {
	return roll.terms.some((t) => !t.operator && !CURAS.has(t.options?.flavor ?? roll.terms[0]?.options?.flavor ?? padrao) && Number(t.total) > 0);
}

/* -------------------------------------------- correção */

function criarOpcao(item) {
	return new CONFIG.ActiveEffect.documentClass(
		{
			_id: OPCAO_MAGICO.id,
			name: OPCAO_MAGICO.name,
			img: "icons/svg/aura.svg",
			description: `<p>${OPCAO_MAGICO.descricao}</p>`,
			type: "base",
			system: { onuse: true, changes: [], abilityUse: { description: "", automatic: false, aumenta: false, custo: null, names: [], types: ["self"] } }
		},
		{ parent: item }
	);
}

function marcada(resultado, id) {
	const valor = resultado?.aprs?.[id]?.aplica ?? resultado?.[`aprs.${id}.aplica`];
	return valor === true || Number(valor) > 0;
}

export default {
	id: "danoMagico",
	name: "Dano mágico e mundano: Incorpóreo, RD/mágico e fontes mundanas",
	hint: "Marca cada rolagem de dano como mágica (magia, poção, encanto, item mágico, Arma Mágica e afins) ou mundana. Incorpóreo só sofre dano mágico ou de outro incorpóreo; RD X/mágico não vale contra dano mágico; RD X/mundano (Patuá, Armadura de Chumbo) só vale contra ele; metade do dano de fontes mundanas só contra dano mundano (JdA p. 229; Ameaças de Arton).",
	init() {
		// Opção "Ataque mágico" quando o alvo marcado se importa e o item seria mundano.
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const lista = wrapped(...args);
			try {
				if (this.actor && this.system?.rolls?.some((r) => r.type === "dano") && alvosMarcados().some(alvoSeImporta) && !classificarDano(this).magico) lista.push(criarOpcao(this));
			} catch (error) {
				warn("Falha ao montar a opção de ataque mágico.", error);
			}
			return lista;
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			if (resultado && item) item._t20cForcarMagico = marcada(resultado, OPCAO_MAGICO.id);
			return resultado;
		});
		// Marca as rolagens de dano logo antes do cartão (depois das rolagens extras dos encantos).
		wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
			try {
				const rolagens = Object.values(this.system?.rolled ?? {}).filter((r) => r?.options?.type === "damage");
				if (rolagens.length && this.actor) {
					const info = classificarDano(this, { forcado: Boolean(this._t20cForcarMagico) });
					for (const roll of rolagens) {
						if (roll.options.t20cMagico !== undefined) continue;
						Object.assign(roll.options, { t20cMagico: info.magico, t20cMotivo: info.motivo, t20cVenceRD: info.venceRD, t20cArmaMundana: info.armaMundana, t20cAcoRubi: info.acoRubi, t20cPrata: info.prata, t20cIncorporeo: info.incorporeo });
					}
					const avisos = avisosDoAtaque(this, info);
					if (avisos.length) {
						const texto = `${avisos.join("; ")}.`;
						const options = config.options;
						if (options?.chatFlavor) options.chatFlavor = `${options.chatFlavor} ${texto}`;
						else this.system.chatFlavor = [this.system.chatFlavor, texto].filter(Boolean).join(" ");
					}
				}
			} catch (error) {
				warn("Falha ao classificar o dano como mágico ou mundano.", error);
			}
			return wrapped(config, ...args);
		});
		wrap("CONFIG.Actor.documentClass.prototype.applyDamageV2", async function (wrapped, roll, multiplier = 1, type = "dano", ...args) {
			const o = roll?.options ?? {};
			if (o.t20cMagico === undefined || !(multiplier > 0) || !roll?.terms) return wrapped(roll, multiplier, type, ...args);
			const magico = Boolean(o.t20cMagico);
			let ajuste = 0;
			let rds = null;
			try {
				const prataVale = o.t20cPrata && ["mor", "esp"].includes(this.system?.detalhes?.tipo);
				if (ehIncorporeo(this) && !magico && !o.t20cIncorporeo && !prataVale && temDano(roll, type)) {
					await avisarNoChat(this, `<strong>${this.name}</strong> é incorpóreo: só armas e efeitos mágicos, ou outra criatura incorpórea, o afetam. O dano não foi aplicado.`);
					return;
				}
				rds = this.system?.tracos?.resistencias;
				if (rds?.dano) {
					const rdMagico = rdContraMundano(this);
					if (rdMagico) {
						const naFicha = (Number(rds.dano.value) || 0) >= rdMagico;
						const vence = magico || o.t20cVenceRD;
						if (vence && naFicha) ajuste -= rdMagico;
						else if (!vence && !naFicha) ajuste += rdMagico;
					}
					if (magico) ajuste += rdContraMagico(this) - rdDoInstanteEstoico(this);
				}
			} catch (error) {
				warn("Falha ao aplicar as regras de dano mágico.", error);
				ajuste = 0;
			}
			if (!ajuste) return wrapped(roll, multiplier, type, ...args);
			const antes = rds.dano.value;
			rds.dano.value = Math.max(0, (Number(antes) || 0) + ajuste);
			try {
				return await wrapped(roll, multiplier, type, ...args);
			} finally {
				rds.dano.value = antes;
			}
		});
	}
};
