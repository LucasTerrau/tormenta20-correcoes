import { acessoriosEquipados, defesaDoItem, armaduraDoCorpo } from "../acumulo/acessorios.mjs";
import { compensarCampos } from "../acumulo/campos.mjs";
import { FONTES, fonteDoItem } from "../acumulo/fontes.mjs";
import { calcular, CUSTO_PM, expandir } from "../acumulo/motor.mjs";
import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 226, "Acumulando Efeitos"):
 * - habilidades e perícias acumulam entre si, mas não com a mesma habilidade/perícia;
 * - itens, magias, parceiros e ambiente acumulam com outras fontes, mas não entre si (vale o melhor);
 * - escudo acumula com armadura e com um outro item na Defesa; RD sempre acumula (p. 229);
 * - reduções de custo de PM não são cumulativas (p. 226).
 * O sistema soma todas as alterações "somar". Aqui, antes de cada fase de aplicação de efeitos,
 * calculamos quais alterações perdem a disputa e o `shouldApplyChange` as descarta.
 */

/** Estado da preparação de ator em andamento (applyActiveEffects é síncrono). */
let ATUAL = null;
const opcoes = { acumulo: false, reducaoCusto: false, acessorios: false };
let instalado = false;

function instalarMotor() {
	if (instalado) return;
	instalado = true;

	wrap("CONFIG.Actor.documentClass.prototype.applyActiveEffects", function (wrapped, phase) {
		const anterior = ATUAL;
		ATUAL = null;
		let estado = null;
		if (phase === "initial") this._t20cNativosSuprimidos = new Set();
		try {
			estado = calcular(this, phase, opcoes);
			if (phase === "initial") this._t20cNativosSuprimidos = estado.nativosSuprimidos;
		} catch (error) {
			warn(`Falha ao calcular acúmulo de ${this.name}; efeitos aplicados como no sistema.`, error);
		}
		ATUAL = estado;
		try {
			const resultado = wrapped(phase);
			// A mesma fonte em campos diferentes da mesma rolagem ("todas as perícias" + "Fortitude").
			if (estado && phase === "initial" && opcoes.acumulo) {
				try {
					compensarCampos(this, estado.vencedores);
				} catch (error) {
					warn(`Falha ao comparar campos de ${this.name}.`, error);
				}
			}
			return resultado;
		} finally {
			ATUAL = anterior;
			if (estado) guardarRelatorio(this, phase, estado.relatorio);
		}
	});

	wrap("CONFIG.ActiveEffect.documentClass.prototype.shouldApplyChange", function (wrapped, change, options) {
		if (ATUAL?.bloqueadas.has(change)) return false;
		return wrapped(change, options);
	});

	// Curingas ("todas as perícias") que perdem só em algumas chaves: aplica nas demais.
	wrap("CONFIG.ActiveEffect.documentClass._prepareProxyChange", function (wrapped, targetDoc, change, options) {
		const perdidas = ATUAL?.parciais.get(change.effect)?.get(change.key);
		if (!perdidas?.size) return wrapped(targetDoc, change, options);
		const base = Object.getPrototypeOf(this);
		for (const key of expandir(targetDoc, change.key)) {
			if (perdidas.has(key)) continue;
			base.applyChange.call(this, targetDoc, { ...change, key }, options);
		}
	});

	// Marca efeitos aplicados pelo chat com a fonte (magia, poder, item…) que os gerou.
	wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
		const fonte = fonteDoItem(this);
		for (const lista of config.options?.effects ?? []) {
			const efeito = Array.isArray(lista) ? lista[0] : lista;
			if (!efeito || !fonte) continue;
			foundry.utils.setProperty(efeito, `flags.${MODULE_ID}.origem`, { fonte, nome: this.name });
		}
		return wrapped(config, ...args);
	});

	Hooks.on("renderActiveEffectConfig", adicionarSeletorDeFonte);
	Hooks.on("renderActorSheetT20", marcarEfeitosNaFicha);
}

function guardarRelatorio(actor, phase, relatorio) {
	actor._t20cAcumulo ??= {};
	actor._t20cAcumulo[phase] = relatorio;
}

function rotuloChave(key) {
	const partes = key.replace(/^system\./, "").split(".");
	const t20 = CONFIG.T20 ?? {};
	if (key === "system.attributes.defesa.bonus") return "Defesa";
	if (key === CUSTO_PM) return "Custo de PM";
	if (partes[0] === "pericias") return game.i18n.localize(t20.pericias?.[partes[1]]?.label ?? partes[1]);
	if (partes[0] === "atributos") return game.i18n.localize(t20.atributos?.[partes[1]] ?? partes[1]);
	return partes.join(" › ");
}

function formatar(valor) {
	const n = Math.round(valor * 10) / 10;
	return n > 0 ? `+${n}` : `${n}`;
}

function marcarEfeitosNaFicha(app, html) {
	const actor = app.actor;
	const root = html instanceof HTMLElement ? html : html[0];
	if (!actor || !root) return;
	const relatorio = Object.values(actor._t20cAcumulo ?? {}).flat();
	if (!relatorio.length) return;
	// Efeitos do ator aparecem na lista de efeitos; a Defesa do próprio item, na linha do item.
	const porLinha = Map.groupBy(relatorio, (r) =>
		r.itemId ? `li.item[data-item-id="${r.itemId}"] .item-name` : `li.effect[data-effect-id="${r.effectId}"] .effect-name`
	);
	for (const [seletor, linhas] of porLinha) {
		const alvo = root.querySelector(seletor);
		if (!alvo || alvo.querySelector(".t20c-acumulo")) continue;
		const icone = document.createElement("i");
		icone.className = "fa-solid fa-layer-group t20c-acumulo";
		icone.style.cssText = "color: var(--color-level-warning, #d98c00); margin-left: 4px; flex: 0;";
		icone.dataset.tooltip = linhas
			.map((r) => `Não acumula em ${rotuloChave(r.key)} (${formatar(r.valor)}): vale ${r.vencedor} (${formatar(r.valorVencedor)}).`)
			.join("<br>");
		alvo.append(icone);
	}
}

function adicionarSeletorDeFonte(app, element) {
	const effect = app.document;
	const aba = element.querySelector("section.tab[data-tab='tormenta20']");
	if (!effect || !aba || aba.querySelector(".t20c-fonte")) return;
	const atual = effect.getFlag(MODULE_ID, "fonte") ?? "";
	const fieldset = document.createElement("fieldset");
	fieldset.className = "t20c-fonte";
	const opcoesHtml = Object.entries(FONTES)
		.map(([value, label]) => `<option value="${value}" ${value === atual ? "selected" : ""}>${label}</option>`)
		.join("");
	fieldset.innerHTML = `
		<legend>Acúmulo (Correções T20)</legend>
		<div class="form-group">
			<label>Fonte do efeito</label>
			<div class="form-fields"><select name="flags.${MODULE_ID}.fonte">${opcoesHtml}</select></div>
			<p class="hint">Itens, magias, encantos, parceiros e ambiente não acumulam entre si; habilidades não acumulam com a mesma habilidade (Tormenta20 JdA, p. 226). "Automático" descobre pela origem do efeito.</p>
		</div>`;
	aba.prepend(fieldset);
}

export const acumuloBonus = {
	id: "acumuloBonus",
	name: "Acúmulo de bônus pela regra do livro",
	hint: "Itens, magias, parceiros e ambiente não acumulam entre si (vale o melhor); efeitos da mesma habilidade não acumulam; RD sempre acumula. Na ficha, um ícone mostra qual efeito foi ignorado e por quê. Cada efeito pode ter a fonte escolhida à mão na aba T20.",
	init() {
		opcoes.acumulo = true;
		instalarMotor();
	}
};

export const reducaoCusto = {
	id: "reducaoCustoNaoAcumula",
	name: "Reduções de custo de PM não acumulam",
	hint: "Quando mais de um efeito reduz o custo de PM (modificador geral de custo), vale só a maior redução (JdA p. 226).",
	init() {
		opcoes.reducaoCusto = true;
		instalarMotor();
	}
};

/**
 * Bug: AttributesFields.prepareDefense soma a Defesa do campo "armadura" de todos os acessórios
 * equipados, e um item com Defesa no campo e em efeito (Anel da Proteção) conta duas vezes.
 * Correção: a Defesa do próprio item entra na disputa de "outro item" do acúmulo; depois que o
 * sistema calcula a Defesa, tiramos a dos acessórios que perderam.
 */
export const defesaAcessorios = {
	id: "defesaAcessorios",
	name: "Defesa: só um item além de armadura e escudo",
	hint: "A Defesa de acessórios e trajes (no próprio item ou em efeito) não soma: além de armadura e escudo, vale só o melhor outro item (JdA p. 226). Um item com Defesa no campo e em efeito (ex.: Anel da Proteção) conta uma vez só.",
	init() {
		opcoes.acessorios = true;
		instalarMotor();
		for (const tipo of ["character", "npc", "simple"]) {
			if (!CONFIG.Actor.dataModels?.[tipo]) continue;
			wrap(`CONFIG.Actor.dataModels.${tipo}.prototype.prepareDerivedData`, function (wrapped, ...args) {
				const resultado = wrapped(...args);
				const defesa = this.attributes?.defesa;
				const suprimidos = this.parent?._t20cNativosSuprimidos;
				if (defesa && suprimidos?.size) {
					for (const item of acessoriosEquipados(this.parent)) {
						if (suprimidos.has(item.id)) defesa.value -= defesaDoItem(item);
					}
					// Armadura que perdeu para os braceletes: a Defesa dela sai (a penalidade fica).
					const armadura = armaduraDoCorpo(this.parent);
					if (armadura && suprimidos.has(armadura.id)) defesa.value -= defesaDoItem(armadura);
				}
				return resultado;
			});
		}
	}
};
