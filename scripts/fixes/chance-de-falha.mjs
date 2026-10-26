import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 244–245, Tabela 5-3 e Camuflagem): atacante cego tem 50% de chance de falha; alvo sob
 * camuflagem leve, 20% (1 ou 2 no d10); sob camuflagem total, 50% (1 a 5 no d10). Atacante invisível
 * recebe +5 no ataque (não contra alvos cegos). O sistema não rolava nada disso.
 * Correção:
 * - condições "Camuflagem leve" e "Camuflagem total" no HUD do token (névoa, escuridão, Camuflagem
 *   Ilusória…). Invisível conta como camuflagem total para quem ataca;
 * - no cartão de um ataque, uma rolagem de d10 por alvo marcado (e pelo atacante cego), dizendo se o ataque
 *   falha;
 * - atacante invisível: +5 no ataque, a não ser que todos os alvos marcados estejam cegos;
 * - arma Caçadora ignora a camuflagem (JdA p. 335).
 */
const CONDICOES = {
	camuflagem: { name: "Camuflagem leve", img: "icons/svg/mystery-man.svg" },
	camuflagemTotal: { name: "Camuflagem total", img: "icons/svg/mystery-man-black.svg" }
};

function instalarCondicoes() {
	for (const [id, dados] of Object.entries(CONDICOES)) {
		if (CONFIG.statusEffects?.[id]) continue;
		const fonte = { name: dados.name, img: dados.img, statuses: [id], duration: { expiry: "sceneEnd" }, system: { status: { category: "" } } };
		CONFIG.statusEffects[id] = { id, name: dados.name, img: dados.img, category: "", description: "", _source: fonte };
	}
}

/** Arma Caçadora (JdA p. 335): "anulando penalidades por camuflagem leve e total". */
const ehCacadora = (item) => item?.type === "arma" && item.effects.some((e) => e.name === "Caçadora" && e.system?.upgrade?.type === "enchantment");

/** Distância em metros entre dois tokens (null sem cena). Alcance curto = 9 m. */
function distancia(a, b) {
	if (!a || !b || !canvas?.grid) return null;
	try {
		const d = canvas.grid.measurePath([a.center, b.center]).distance;
		return canvas.scene?.grid?.units === "ft" ? d * 0.3 : d;
	} catch {
		return null;
	}
}

/**
 * Chance de falha (em %) de um ataque do item contra o alvo (token). Sentidos do atacante (JdA p. 229):
 * percepção às cegas ignora escuridão, invisibilidade e cegueira em alcance curto; com faro, camuflagem
 * total contra quem está em alcance curto dá só 20%.
 */
function chanceContra(item, alvoToken) {
	const sentidos = item.actor?.system?.attributes?.sentidos?.value;
	const perto = (distancia(item.actor?.getActiveTokens?.()[0], alvoToken) ?? Infinity) <= 9;
	if (sentidos?.has?.("cegas") && (perto || !alvoToken)) return 0;
	let chance = item.actor?.statuses?.has("cego") ? 50 : 0;
	const s = alvoToken?.actor?.statuses;
	if (ehCacadora(item)) return chance;
	if (s?.has("camuflagemTotal") || s?.has("invisivel")) chance = Math.max(chance, sentidos?.has?.("faro") && perto ? 20 : 50);
	else if (s?.has("camuflagem")) chance = Math.max(chance, 20);
	return chance;
}

function temAtaque(item) {
	return Object.values(item.system?.rolled ?? {}).some((r) => r?.options?.type === "attack" || r?.dice?.[0]?.faces === 20);
}

async function rolarFalhas(item) {
	if (!temAtaque(item)) return;
	const alvos = [...(game.user.targets ?? [])].filter((t) => t.actor);
	const casos = alvos.length ? alvos.map((alvo) => ({ alvo: alvo.actor, chance: chanceContra(item, alvo) })) : [{ alvo: null, chance: chanceContra(item, null) }];
	for (const { alvo, chance } of casos) {
		if (!chance) continue;
		const roll = await new Roll("1d10").evaluate();
		const falha = roll.total <= chance / 10;
		const contra = alvo ? ` contra ${alvo.name}` : "";
		item.system.rolled[`Chance de falha${contra} (${chance}%): ${falha ? "o ataque FALHA" : "passa"}`] = roll;
	}
}

export default {
	id: "chanceDeFalha",
	name: "Chance de falha e invisibilidade no ataque",
	hint: "Condições Camuflagem leve (20%) e Camuflagem total (50%) no HUD; o cartão do ataque rola a chance de falha contra cada alvo marcado (camuflagem, invisível) e do atacante cego (50%). Atacante invisível recebe +5 no ataque (JdA p. 244–245).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			try {
				await rolarFalhas(this);
			} catch (error) {
				warn("Falha ao rolar a chance de falha.", error);
			}
			return wrapped(config, ...args);
		});
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const actor = this.actor;
			if (actor?.statuses?.has("invisivel") && Array.isArray(resultado?.parts)) {
				const alvos = [...(game.user?.targets ?? [])].map((t) => t.actor).filter(Boolean);
				if (!alvos.length || !alvos.every((a) => a.statuses?.has("cego"))) resultado.parts.push("5");
			}
			return resultado;
		});
	},
	async ready() {
		// O sistema monta CONFIG.statusEffects a partir do compêndio de condições, sem esperar, no ready.
		for (let i = 0; i < 100 && !CONFIG.statusEffects?.inconsciente; i++) await new Promise((r) => setTimeout(r, 100));
		instalarCondicoes();
	}
};
