import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Situações de combate da Tabela 5-3 e das ações (JdA p. 233–239) que o sistema não aplicava:
 * - Alvo caído: –5 na Defesa contra corpo a corpo e +5 contra ataques à distância. O sistema dava –5 na
 *   Defesa contra tudo, gravado com "rebaixar" no campo "Outros" (apagava o "Outros" positivo da ficha).
 *   A alteração sai da condição (correção de dados) e o ataque contra alvo caído ganha +5 ou –5.
 * - Flanquear: +2 no ataque corpo a corpo quando um aliado está do lado oposto do alvo (o alvo entre
 *   vocês). Lados opostos: a linha entre os centros de vocês entra e sai do espaço do alvo por bordas opostas
 *   (cantos contam; exemplos do JdA p. 237). Não vale à distância nem com ataque desarmado, a não ser com
 *   Briga ou Estilo Desarmado; armas naturais (mordida, garras) flanqueiam.
 * - Atirando em combate corpo a corpo: –5 no ataque à distância contra alvo que está no alcance natural
 *   de um inimigo dele (inclusive você). Mirar (opção no diálogo) e Disparo Preciso anulam.
 * - Alcance: até o dobro do alcance da arma, –5.
 * - Investida: opção no diálogo do ataque corpo a corpo, +2 no ataque e –2 na Defesa até o próximo turno.
 * - Arremessar arma corpo a corpo de arremesso (adaga, machadinha, lança, tridente): opção no diálogo que
 *   ataca com Pontaria (p. 142).
 * - Cobertura leve: condição no HUD do token, +5 na Defesa.
 * Com vários alvos marcados, só entra o que vale para todos.
 */
const COBERTURA = { id: "coberturaLeve", name: "Cobertura leve", img: "icons/svg/shield.svg" };

/** Alcance natural por tamanho (1,5 m para Pequeno e Médio). */
const ALCANCE_NATURAL = { min: 1.5, peq: 1.5, med: 1.5, gra: 3, eno: 4.5, col: 9 };
/** Alcance das armas à distância, em metros (p. 143). */
const ALCANCE_DA_ARMA = { short: 9, medium: 30, long: 90 };

const OPCOES = {
	investida: { id: "t20cInvestida000", name: "Investida", descricao: "+2 no ataque; –2 na Defesa até o seu próximo turno (p. 235).", changes: [["ataque", "add", "2"]] },
	mirar: { id: "t20cMirar0000000", name: "Mirar", descricao: "Anula o –5 por atirar em alvo em combate corpo a corpo (ação de movimento, p. 234).", changes: [] },
	arremessar: { id: "t20cArremessar00", name: "Arremessar", descricao: "Ataque à distância com a arma, usando Pontaria (p. 142).", changes: [["pericia", "override", "pont"]] }
};
const ID_DA_OPCAO = new Map(Object.entries(OPCOES).map(([chave, o]) => [o.id, chave]));

/* -------------------------------------------- geometria */

function quadrado() {
	return canvas?.grid?.size || 100;
}

/** Retângulo do token pela posição gravada (o do canvas atrasa durante a animação do movimento). */
function caixa(t) {
	const d = t.document ?? t;
	return { x: d.x, y: d.y, width: (d.width || 1) * quadrado(), height: (d.height || 1) * quadrado() };
}

function centro(t) {
	const c = caixa(t);
	return { x: c.x + c.width / 2, y: c.y + c.height / 2 };
}

/** Distância entre as bordas de dois tokens, em quadrados (0 = adjacentes, inclusive na diagonal). */
function folga(a, b) {
	const A = caixa(a), B = caixa(b);
	const gx = Math.max(0, Math.max(A.x, B.x) - Math.min(A.x + A.width, B.x + B.width));
	const gy = Math.max(0, Math.max(A.y, B.y) - Math.min(A.y + A.height, B.y + B.height));
	return Math.max(gx, gy) / quadrado();
}

const metrosPorQuadrado = () => (canvas?.scene?.grid?.units === "ft" ? canvas.scene.grid.distance * 0.3 : canvas?.scene?.grid?.distance) || 1.5;

/** O token `a` alcança `b` com o alcance natural. */
function alcanca(a, b) {
	const alcance = ALCANCE_NATURAL[a.actor?.system?.tracos?.tamanho] ?? 1.5;
	return folga(a, b) * metrosPorQuadrado() < alcance - 0.01;
}

/** Distância em metros entre os tokens (bordas), para alcance de armas. */
function metros(a, b) {
	return (folga(a, b) + 1) * metrosPorQuadrado();
}

const fora = (token) => ["inconsciente", "paralisado", "morto", "indefeso", "atordoado", "pasmo"].some((s) => token.actor?.statuses?.has(s));

/**
 * O alvo fica entre o atacante e o aliado: a linha entre os centros dos dois entra e sai do espaço do alvo por
 * bordas opostas (esquerda e direita, ou cima e baixo; um canto conta como as duas bordas que forma).
 */
function ladosOpostos(atacante, aliado, alvo) {
	const b = caixa(alvo);
	const p = centro(atacante), q = centro(aliado);
	const dx = q.x - p.x, dy = q.y - p.y;
	// Trecho da linha dentro do espaço do alvo (recorte de Liang–Barsky).
	let t0 = 0, t1 = 1;
	for (const [k, d] of [[-dx, p.x - b.x], [dx, b.x + b.width - p.x], [-dy, p.y - b.y], [dy, b.y + b.height - p.y]]) {
		if (k === 0) {
			if (d < 0) return false;
			continue;
		}
		const r = d / k;
		if (k < 0) t0 = Math.max(t0, r);
		else t1 = Math.min(t1, r);
		if (t0 > t1) return false;
	}
	const bordas = (t) => {
		const x = p.x + t * dx, y = p.y + t * dy, e = 0.5;
		return { e: Math.abs(x - b.x) < e, d: Math.abs(x - b.x - b.width) < e, c: Math.abs(y - b.y) < e, b: Math.abs(y - b.y - b.height) < e };
	};
	const A = bordas(t0), B = bordas(t1);
	return (A.e && B.d) || (A.d && B.e) || (A.c && B.b) || (A.b && B.c);
}

/** Aliado do atacante (mesma disposição) que também luta corpo a corpo contra o alvo, do outro lado dele. */
function flanqueado(atacante, alvo) {
	if (!alcanca(atacante, alvo)) return false;
	const lado = atacante.document.disposition;
	if (alvo.document.disposition === lado) return false;
	return canvas.tokens.placeables.some((t) => t !== atacante && t !== alvo && t.actor && !fora(t) && t.document.disposition === lado && alcanca(t, alvo) && ladosOpostos(atacante, t, alvo));
}

const hostis = (a, b) => a.document.disposition * b.document.disposition === -1;

function engajado(alvo, atacante) {
	return canvas.tokens.placeables.some((t) => t !== alvo && t.actor && !fora(t) && (t === atacante || hostis(t, alvo)) && alcanca(t, alvo));
}

/* -------------------------------------------- modificadores */

const temItem = (actor, ...nomes) => actor?.items?.some((i) => nomes.includes(i.name));

/** Ataque desarmado (armas naturais, como mordida e garras, não são desarmadas). */
function ehDesarmado(item) {
	return /^ataque desarmado$/i.test(item.name ?? "");
}

/** Modificadores (lista de [rótulo, valor]) do ataque deste item contra o alvo. */
function modificadoresContra(item, pericia, atacante, alvo, opcoes) {
	const mods = [];
	const s = alvo.actor?.statuses;
	const corpoACorpo = pericia !== "pont";
	if (s?.has("caido")) mods.push(["alvo caído", corpoACorpo ? 5 : -5]);
	if (!atacante) return mods;
	if (corpoACorpo) {
		const podeFlanquear = !ehDesarmado(item) || temItem(item.actor, "Briga", "Estilo Desarmado");
		if (podeFlanquear && flanqueado(atacante, alvo)) mods.push(["flanqueando", 2]);
	} else {
		if (!opcoes.has("mirar") && !temItem(item.actor, "Disparo Preciso") && engajado(alvo, atacante)) mods.push(["alvo em corpo a corpo", -5]);
		const alcance = ALCANCE_DA_ARMA[item.system?.alcance];
		if (item.type === "arma" && alcance && metros(atacante, alvo) > alcance + 0.01) mods.push(["além do alcance", -5]);
	}
	return mods;
}

/** Só o que vale contra todos os alvos marcados. */
function comuns(listas) {
	if (!listas.length) return [];
	return listas[0].filter(([rotulo, valor]) => listas.every((l) => l.some(([r, v]) => r === rotulo && v === valor)));
}

function periciaDoAtaque(item) {
	return item.system?.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0];
}

/* -------------------------------------------- opções sintéticas */

function opcoesDaArma(item) {
	if (item.type !== "arma" || !item.actor) return [];
	const pericia = periciaDoAtaque(item);
	const lista = [];
	if (pericia === "luta") lista.push("investida");
	if (pericia === "pont") lista.push("mirar");
	const p = item.system.propriedades ?? {};
	if (pericia === "luta" && (p.arr || p.arremesso) && item.system.proposito !== "disparo") lista.push("arremessar", "mirar");
	return [...new Set(lista)];
}

function criarOpcao(item, chave) {
	const o = OPCOES[chave];
	const data = {
		_id: o.id,
		name: o.name,
		img: "icons/svg/combat.svg",
		description: `<p>${o.descricao}</p>`,
		type: "base",
		transfer: false,
		disabled: false,
		system: {
			onuse: true,
			changes: o.changes.map(([key, type, value]) => ({ key, type, value, phase: "initial", priority: null })),
			abilityUse: { description: "", automatic: false, aumenta: false, custo: null, names: [], types: ["self"] }
		},
		flags: { [MODULE_ID]: { opcaoDeCombate: chave } }
	};
	return new CONFIG.ActiveEffect.documentClass(data, { parent: item });
}

function marcadas(resultado) {
	const escolhidas = new Set();
	for (const [id, chave] of ID_DA_OPCAO) {
		const valor = resultado?.aprs?.[id]?.aplica ?? resultado?.[`aprs.${id}.aplica`];
		if (valor === true || Number(valor) > 0) escolhidas.add(chave);
	}
	return escolhidas;
}

async function aplicarInvestida(actor) {
	await actor.createEmbeddedDocuments("ActiveEffect", [
		{
			name: "Investida (–2 na Defesa)",
			img: "icons/svg/combat.svg",
			type: "base",
			system: { changes: [{ key: "system.attributes.defesa.bonus", type: "add", value: "-2", phase: "initial", priority: null }] },
			duration: { value: 1, units: "rounds", expiry: "turnStart" },
			flags: { [MODULE_ID]: { fonte: "sempre" } }
		}
	]);
}

/* -------------------------------------------- condição de cobertura */

function instalarCobertura() {
	if (CONFIG.statusEffects?.[COBERTURA.id]) return;
	const system = { changes: [{ key: "system.attributes.defesa.bonus", type: "add", value: "5", phase: "initial", priority: null }], status: { category: "" } };
	const fonte = { name: COBERTURA.name, img: COBERTURA.img, statuses: [COBERTURA.id], duration: { expiry: "sceneEnd" }, system };
	CONFIG.statusEffects[COBERTURA.id] = { id: COBERTURA.id, name: COBERTURA.name, img: COBERTURA.img, category: "", description: "", system, _source: fonte };
}

export default {
	id: "combateTatico",
	name: "Situações de combate (caído, flanquear, distância, investida, cobertura)",
	hint: "Alvo caído: +5 contra corpo a corpo e –5 contra distância (o sistema dava –5 na Defesa contra tudo). Flanquear +2; –5 ao atirar em alvo em corpo a corpo (Mirar e Disparo Preciso anulam) e além do alcance; opções Investida, Mirar e Arremessar no diálogo do ataque; condição Cobertura leve (+5 na Defesa). JdA p. 233–239.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const lista = wrapped(...args);
			try {
				for (const chave of opcoesDaArma(this)) lista.push(criarOpcao(this, chave));
			} catch (error) {
				warn("Falha ao montar as opções de combate.", error);
			}
			return lista;
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				if (resultado && item?.type === "arma") {
					const escolhidas = marcadas(resultado);
					item._t20cOpcoes = escolhidas;
					if (escolhidas.has("investida") && item.actor) await aplicarInvestida(item.actor);
				}
			} catch (error) {
				warn("Falha ao aplicar a opção de combate.", error);
			}
			return resultado;
		});
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			try {
				if (!Array.isArray(resultado?.parts) || !this.actor || !canvas?.ready) return resultado;
				const alvos = [...(game.user?.targets ?? [])].filter((t) => t.actor && t.actor !== this.actor);
				if (!alvos.length) return resultado;
				// O token selecionado do ator (um ator com vínculo pode ter vários tokens na cena).
				const atacante = canvas.tokens.controlled.find((t) => t.actor === this.actor) ?? this.actor.getActiveTokens?.()[0] ?? null;
				const pericia = periciaDoAtaque(this);
				const opcoes = this._t20cOpcoes ?? new Set();
				const mods = comuns(alvos.map((alvo) => modificadoresContra(this, pericia, atacante, alvo, opcoes)));
				for (const [, valor] of mods) resultado.parts.push(String(valor));
				if (mods.length) this._t20cSituacoes = mods;
			} catch (error) {
				warn("Falha ao calcular as situações de combate.", error);
			}
			return resultado;
		});
		// Nota no cartão: quais situações entraram no ataque.
		wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
			const mods = this._t20cSituacoes;
			if (mods?.length) {
				const texto = mods.map(([r, v]) => `${r} ${v > 0 ? "+" : ""}${v}`).join(", ");
				config.t20cSituacoes = texto;
				this.system.chatFlavor = [this.system.chatFlavor, `Situações: ${texto}.`].filter(Boolean).join(" ");
			}
			return wrapped(config, ...args);
		});
	},
	async ready() {
		for (let i = 0; i < 100 && !CONFIG.statusEffects?.inconsciente; i++) await new Promise((r) => setTimeout(r, 100));
		instalarCobertura();
	}
};
