import { MODULE_ID } from "../constants.mjs";
import { ajustarPrincipal, companheirosDe, completarEncantos } from "../migracao/encantos-ativados.mjs";
import { aprimoramentosAplicados } from "../magia/regras.mjs";
import { log, warn, wrap } from "../util.mjs";

/**
 * Bug: cada encanto copia um único efeito para o item, então a parte ativada dos encantos de duas partes
 * não existia: as opções de 2 PM da Congelante, Corrosiva, Elétrica, Flamejante e Tumular, as labaredas
 * da Incandescente, o +5 contra necromancia do Abençoado. O voo do Alado não cobrava os 2 PM, e as
 * condições aplicadas pelo cartão (enredado da Congelante, envenenado da Venenosa) ficavam sem duração.
 * Correção: o item ganha, em memória, os efeitos que faltam (scripts/migracao/encantos-ativados.mjs);
 * na hora do uso, a opção marcada põe no cartão a rolagem extra (raio, bola de fogo no lugar do ataque,
 * perda de vida) e dá duração e dano por rodada à condição. Opções de "uma vez por rodada" ficam
 * bloqueadas no diálogo depois de usadas, até a rodada seguinte. Assassina troca os dados do Ataque
 * Furtivo; Fortificado e Aço-Rubi rolam, contra cada alvo marcado, a chance de ignorar o extra.
 */
const stats = {};

/** "Uma vez por rodada": opção usada → rodada do combate em que foi usada (em memória, por ator). */
const usados = new Map();
const rodadaAtual = () => (game.combat?.started ? `${game.combat.id}:${game.combat.round}` : null);
const chaveDeUso = (actor, effect) => `${actor?.uuid}|${effect.id}`;

function seguro(fn) {
	try {
		fn();
	} catch (error) {
		warn("Falha ao completar encanto; dados mantidos como estavam.", error);
	}
}

/** CD de uma habilidade do personagem: 10 + metade do nível + o maior dos atributos indicados. */
function cdDoPersonagem(actor, atributos) {
	const nivel = Number(actor?.system?.attributes?.nivel?.value) || 1;
	const melhor = Math.max(...atributos.map((a) => Number(actor?.system?.atributos?.[a]?.value) || 0));
	return 10 + Math.floor(nivel / 2) + melhor;
}

/** Opções de encanto marcadas neste uso: rolagens extras no cartão e duração das condições. */
async function aplicarOpcoes(item, options) {
	// Efeito guardado puxado para o cartão (ácido da Corrosiva, labaredas): o sistema copia as alterações
	// já preparadas e perde o tipo do dano ("4d4[acido]" virava "4d4"). Volta aos dados do item.
	for (const lista of options.effects ?? []) {
		const efeito = Array.isArray(lista) ? lista[0] : lista;
		const fonte = efeito?.flags?.[MODULE_ID]?.companheiroDe ? item.effects.get(efeito._id) : null;
		if (!fonte) continue;
		efeito.system.changes = foundry.utils.deepClone(fonte._source.system.changes);
		efeito.duration = foundry.utils.deepClone(fonte._source.duration);
	}
	const marcadas = aprimoramentosAplicados(item, options).map((a) => a.effect);
	for (const ef of marcadas) {
		if (ef.getFlag(MODULE_ID, "umaVezPorRodada") && rodadaAtual()) usados.set(chaveDeUso(item.actor, ef), rodadaAtual());
		const condicao = ef.getFlag(MODULE_ID, "condicao");
		if (condicao) {
			for (const lista of options.effects ?? []) {
				const efeito = Array.isArray(lista) ? lista[0] : lista;
				if (!efeito?.statuses?.includes?.(condicao.status)) continue;
				if (condicao.rodadas) efeito.duration = { ...(efeito.duration ?? {}), expiry: "turnStart", units: "rounds", value: condicao.rodadas };
				if (condicao.dano) {
					efeito.system ??= {};
					efeito.system.changes = [...(efeito.system.changes ?? []), { key: "danoContinuo", type: "add", value: condicao.dano, phase: "initial", priority: null }];
				}
			}
		}
		const rolagem = ef.getFlag(MODULE_ID, "rolagem");
		if (!rolagem) continue;
		let titulo = rolagem.titulo;
		if (rolagem.resistencia) titulo += ` — ${rolagem.resistencia} CD ${cdDoPersonagem(item.actor, rolagem.atributos ?? [])} reduz à metade`;
		const roll = await new Roll(rolagem.formula, item.getRollData?.() ?? {}, { type: "damage" }).evaluate();
		// "Em vez do ataque normal" (Flamejante): o ataque e o dano da arma saem do cartão.
		if (rolagem.emVezDoAtaque || !item.system.rolled) item.system.rolled = {};
		item.system.rolled[titulo] = roll;
	}
}

const ehFurtivo = (effect) => [effect?.name, effect?.parent?.name].some((n) => /^Ataque Furtivo/.test(n ?? ""));

/**
 * Assassina (JdA p. 335): "aumenta os dados de dano extra de um ataque furtivo para d8"; com 2 PM, "pode
 * rolar novamente quaisquer resultados 1". O sistema põe no dano da arma a parte do item Ataque Furtivo
 * (a mesma lista, sem copiar): troca por uma lista nova com d8 (e r1).
 */
function danoAssassino(item, options) {
	if (item.type !== "arma" || !item.effects.some((e) => e.getFlag(MODULE_ID, "assassina") === "d8")) return;
	const marcadas = aprimoramentosAplicados(item, options);
	const furtivo = marcadas.find(({ effect }) => ehFurtivo(effect));
	if (!furtivo) return;
	const rerolar = marcadas.some(({ effect }) => effect.getFlag(MODULE_ID, "assassina") === "rerolar");
	const doPoder = furtivo.effect.parent?.system?.rolls?.find((r) => r.type === "dano")?.parts?.[0];
	const valor = furtivo.effect.system.changes.find((c) => c.key === "dano")?.value;
	for (const rolagem of item.system.rolls.filter((r) => r.type === "dano")) {
		const i = rolagem.parts.findIndex((p) => p === doPoder || (valor && valor !== "roll" && String(p[0]) === String(valor)));
		if (i < 0) continue;
		const [formula, tipo, extra] = rolagem.parts[i];
		rolagem.parts[i] = [String(formula).replace(/d6(?!\d)/g, `d8${rerolar ? "r1" : ""}`), tipo, extra];
	}
}

/**
 * Fortificado (encanto, JdA p. 339) e Aço-Rubi (armadura/escudo, p. 167): chance de ignorar o dano extra
 * de acertos críticos e ataques furtivos. Fortificado: 50% armadura, 25% escudo; Aço-Rubi: 50% armadura
 * pesada, 25% leve ou escudo; "cumulativas entre si" (somadas, até 100%).
 */
function chanceDeFortificacao(actor) {
	let chance = 0;
	for (const item of actor?.itemTypes?.equipamento ?? []) {
		if (!item.system?.equipado || !["leve", "pesada", "escudo"].includes(item.system?.tipo)) continue;
		for (const ef of item.effects) {
			const tipo = ef.system?.upgrade?.type;
			if (ef.name === "Fortificado" && tipo === "enchantment") chance += item.system.tipo === "escudo" ? 25 : 50;
			if (ef.name === "Aço-Rubi" && tipo === "material") chance += item.system.tipo === "pesada" ? 50 : 25;
		}
	}
	return Math.min(chance, 100);
}

/** Dano extra do crítico (dados além dos normais da arma) e do Ataque Furtivo, numa rolagem de dano feita. */
function danoExtra(dano, critico, furtivoValor) {
	let extra = 0;
	const dados = dano.terms.filter((t) => t instanceof foundry.dice.terms.Die);
	if (critico && dados[0]) {
		const mult = Number(dano.options?.criticalMultiplier) || 2;
		const normais = Math.max(1, Math.round(dados[0].number / mult));
		extra += dados[0].results.slice(normais).reduce((a, r) => a + (r.active === false ? 0 : r.result), 0);
	}
	for (const d of dados.slice(1)) {
		const furtivo = d.options?.flavor === "dano" || (furtivoValor && `${d.number}d${d.faces}` === String(furtivoValor));
		if (furtivo) extra += d.total;
	}
	return extra;
}

async function fortificacao(item, options) {
	if (item.type !== "arma") return;
	const rolled = item.system.rolled ?? {};
	const ataque = Object.values(rolled).find((r) => r?.options?.type === "attack" || r?.dice?.[0]?.faces === 20);
	const dano = Object.values(rolled).find((r) => r?.options?.type === "damage");
	if (!dano) return;
	const critico = Boolean(ataque?._critical);
	const furtivo = aprimoramentosAplicados(item, options).find(({ effect }) => ehFurtivo(effect));
	if (!critico && !furtivo) return;
	const furtivoValor = furtivo?.effect.system.changes.find((c) => c.key === "dano")?.value;
	for (const alvo of [...(game.user.targets ?? [])].map((t) => t.actor).filter(Boolean)) {
		const chance = chanceDeFortificacao(alvo);
		if (!chance) continue;
		const roll = await new Roll("1d100").evaluate();
		const ignora = roll.total <= chance;
		rolled[`Fortificação de ${alvo.name} (${chance}%): ${ignora ? "ignora o extra" : "não ignora"}`] = roll;
		if (!ignora) continue;
		const semExtra = Math.max(0, dano.total - danoExtra(dano, critico, furtivoValor));
		const tipo = dano.dice?.[0]?.options?.flavor;
		rolled[`Dano em ${alvo.name} sem o extra (aplique este)`] = await new Roll(`${semExtra}${tipo ? `[${tipo}]` : ""}`, {}, { type: "damage" }).evaluate();
	}
}

/** Encanto aplicado ou tirado durante a sessão: os efeitos que o completam entram ou saem junto (em memória). */
function sincronizar(effect, entrou) {
	const item = effect.parent;
	if (item?.documentName !== "Item") return;
	if (entrou) {
		// Só no efeito do item (a cópia aplicada no personagem fica como veio) e só em memória.
		const copia = effect.toObject();
		if (ajustarPrincipal(copia)) effect.updateSource({ disabled: copia.disabled, flags: copia.flags });
		for (const dados of companheirosDe(copia)) {
			if (item.effects.has(dados._id)) item.effects.delete(dados._id);
			item.effects.set(dados._id, item.effects.createDocument(dados));
		}
	} else {
		for (const companheiro of item.effects.filter((e) => e.getFlag(MODULE_ID, "companheiroDe") === effect.id)) {
			item.effects.delete(companheiro.id);
		}
	}
	item.actor?.render?.(false);
}

export default {
	id: "encantosAtivados",
	name: "Encantos com parte ativada (2 PM e afins)",
	hint: "Acrescenta aos itens a parte ativada dos encantos: as opções de 2 PM da Congelante, Corrosiva, Elétrica, Flamejante e Tumular, as labaredas da Incandescente, o +5 contra necromancia do Abençoado e o custo do Alado; dá duração ao enredado da Congelante e ao veneno da Venenosa. Nada é gravado.",
	init() {
		wrap("CONFIG.Item.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => completarEncantos(source, stats));
			return wrapped(source, ...args);
		});
		// Opção "1×/rodada" já usada nesta rodada: bloqueada no diálogo de uso.
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			const rodada = rodadaAtual();
			if (!root || !rodada) return;
			for (const input of root.querySelectorAll("input[name$='.aplica']")) {
				const effect = app.item?.applicableOnUseEffects?.find((e) => e.id === input.name.split(".")[1]);
				if (!effect?.getFlag(MODULE_ID, "umaVezPorRodada") || usados.get(chaveDeUso(app.item.actor, effect)) !== rodada) continue;
				const li = input.closest("li") ?? input.parentElement;
				if (input.type === "checkbox") input.checked = false;
				else input.value = 0;
				input.disabled = true;
				li.style.opacity = "0.55";
				li.dataset.t20cFixo = "1";
				li.dataset.tooltip = "Uma vez por rodada: já usada nesta rodada (JdA p. 335).";
				const aviso = document.createElement("span");
				aviso.className = "t20c-uso";
				aviso.textContent = " (já usada nesta rodada)";
				aviso.style.cssText = "font-size: 0.85em; opacity: 0.8;";
				(li.querySelector(".item-name") ?? li).append(aviso);
			}
		});
		Hooks.on("createActiveEffect", (effect) => seguro(() => sincronizar(effect, true)));
		Hooks.on("deleteActiveEffect", (effect) => seguro(() => sincronizar(effect, false)));
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			if (config.options) {
				try {
					await aplicarOpcoes(this, config.options);
					await fortificacao(this, config.options);
				} catch (error) {
					warn("Falha ao aplicar a parte ativada de um encanto.", error);
				}
			}
			return wrapped(config, ...args);
		});
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", function (wrapped, config = {}, ...args) {
			try {
				danoAssassino(this, config.options ?? {});
			} catch (error) {
				warn("Falha ao aplicar a Assassina.", error);
			}
			return wrapped(config, ...args);
		});
	},
	ready() {
		const total = Object.values(stats).reduce((a, b) => a + b, 0);
		if (total) log(`Encantos completados com a parte ativada: ${total}.`, stats);
	}
};
