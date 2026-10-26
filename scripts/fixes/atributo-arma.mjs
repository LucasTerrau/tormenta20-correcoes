import { warn, wrap } from "../util.mjs";

/**
 * Regras (JdA p. 124–125, 142–143, 146):
 * - Acuidade com Arma: com arma corpo a corpo leve ou de arremesso, Destreza em vez de Força nos testes
 *   de ataque e nas rolagens de dano.
 * - Ágil: a arma pode ser usada com Acuidade mesmo sem ser leve (florete, cimitarra, chicote, katana…).
 * - Estilo de Disparo: soma a Destreza nas rolagens de dano com arma de disparo.
 * - Adaga: "pode usar sua Destreza em vez de Força nos testes de ataque" mesmo sem Acuidade.
 * Bugs: o sistema só troca o atributo do dano quando ele está como "padrão", e todas as armas do
 * compêndio gravam "@for" (o dano nunca usava Destreza); as armas de disparo têm o atributo vazio
 * (Estilo de Disparo nunca somava); a propriedade Ágil era ignorada.
 * Correção: só em personagens e só quando a arma não tem um atributo escolhido à mão.
 */
function usaAcuidade(actor) {
	const { for: forca, des } = actor.system.atributos ?? {};
	const tem = game.settings.get("tormenta20", "lightFinesseWeapons") || actor.flags?.tormenta20?.acuidade;
	return Boolean(tem) && Number(des?.value) > Number(forca?.value);
}

const agil = (item) => Boolean(item.system.propriedades?.agi || item.system.propriedades?.agil);
const leve = (item) => item.system.empunhadura === "leve";

function periciaDoAtaque(item) {
	return item.system.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0];
}

/** Atributo do ataque que o sistema não escolheria sozinho (null = deixa o sistema decidir). */
function atributoDoAtaque(item) {
	const actor = item.actor;
	if (periciaDoAtaque(item) !== "luta") return null;
	const { for: forca, des } = actor.system.atributos ?? {};
	if (/^adaga\b/i.test(item.name) && Number(des?.value) > Number(forca?.value)) return "des";
	if (agil(item) && !leve(item) && usaAcuidade(actor)) return "des";
	return null;
}

function ajustarDano(item) {
	const actor = item.actor;
	const flags = actor.flags?.tormenta20 ?? {};
	const { proposito } = item.system;
	const pericia = periciaDoAtaque(item);
	for (const rolagem of item.system.rolls ?? []) {
		if (rolagem.type !== "dano" || !Array.isArray(rolagem.parts)) continue;
		const atributo = rolagem.parts[1];
		if (proposito === "disparo") {
			if (!flags.estiloDisparo || rolagem.parts.some((p) => p?.[0] === "@des")) continue;
			// Arco longo e funda já somam a Força: a Destreza entra junto.
			if (atributo && !atributo[0]) atributo[0] = "@des";
			else rolagem.parts.push(["@des", "", ""]);
			continue;
		}
		if (atributo?.[0] !== "@for" || !usaAcuidade(actor)) continue;
		// Arremessada (ataque com Pontaria), leve ou ágil.
		if (pericia === "pont" || leve(item) || agil(item)) atributo[0] = "@des";
	}
}

/**
 * Briga (Lutador, JdA p. 76): "seus ataques desarmados causam 1d6 pontos de dano", que sobe para 1d8 no
 * 5º nível, 1d10 no 9º, 2d6 no 13º, 2d8 no 17º e 2d10 no 20º. Estilo Desarmado (p. 128): 1d6. O
 * "Ataque desarmado" do sistema ficava sempre em 1d3.
 */
const BRIGA = [
	[20, "2d10"],
	[17, "2d8"],
	[13, "2d6"],
	[9, "1d10"],
	[5, "1d8"],
	[1, "1d6"]
];

function nivelNaClasse(actor, nome) {
	return actor.items.filter((i) => i.type === "classe" && i.name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().startsWith(nome)).reduce((s, c) => s + (Number(c.system.niveis) || 0), 0);
}

export function dadoDesarmado(actor) {
	if (actor.items.some((i) => i.name === "Briga")) {
		const nivel = Math.max(1, nivelNaClasse(actor, "lutador"));
		return BRIGA.find(([n]) => nivel >= n)[1];
	}
	if (actor.items.some((i) => i.name === "Estilo Desarmado")) return "1d6";
	return null;
}

function ajustarDesarmado(item) {
	if (!/^ataque desarmado$/i.test(item.name)) return;
	const dado = dadoDesarmado(item.actor);
	if (!dado) return;
	for (const rolagem of item.system.rolls ?? []) {
		if (rolagem.type !== "dano" || !rolagem.parts?.[0]) continue;
		// Só troca o dado-base do item; dados já mudados por poderes ou à mão ficam.
		if (/^1d3$/i.test(String(rolagem.parts[0][0]).trim())) rolagem.parts[0][0] = dado;
	}
}

export default {
	id: "atributoArma",
	name: "Armas: Acuidade, Ágil, Estilo de Disparo e Briga",
	hint: "Acuidade com Arma passa a usar Destreza também no dano (as armas do compêndio gravam Força e o sistema não trocava); a propriedade Ágil vale para Acuidade; Estilo de Disparo soma Destreza no dano das armas de disparo; Adaga ataca com Destreza; o ataque desarmado do Lutador sobe com Briga (1d6 a 2d10) e com Estilo Desarmado (1d6). JdA p. 76, 124–128, 143, 146.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const ataque = this.type === "arma" && this.actor?.type === "character" ? this.system.rolls?.find((r) => r.type === "ataque") : null;
			const parte = ataque?.parts?.[1];
			if (!parte || parte[1]) return wrapped(...args);
			let atributo = null;
			try {
				atributo = atributoDoAtaque(this);
			} catch (error) {
				warn("Falha ao escolher o atributo do ataque.", error);
			}
			if (!atributo) return wrapped(...args);
			parte[1] = atributo;
			try {
				return wrapped(...args);
			} finally {
				parte[1] = "";
			}
		});
		// rollDamage roda num clone do item (Item#roll): mudar as partes aqui não mexe no item da ficha.
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", async function (wrapped, ...args) {
			if (this.type === "arma" && this.actor?.type === "character") {
				try {
					ajustarDesarmado(this);
					ajustarDano(this);
				} catch (error) {
					warn("Falha ao ajustar o atributo do dano.", error);
				}
			}
			return wrapped(...args);
		});
	}
};
