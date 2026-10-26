import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regras (JdA p. 335–336):
 * - Dilacerante: no acerto crítico, +10 de dano.
 * - Lancinante: no crítico, à escolha, +10 de dano ou multiplicar também os bônus numéricos; "este efeito
 *   substitui o efeito de dilacerante" (que é pré-requisito).
 * Bugs: o sistema, com Lancinante, multiplicava todos os números da rolagem, inclusive o +10 da Dilacerante
 * e penalidades (machado de batalha ×3, For 4, Formidável: 3d8+48 em vez de 3d8+18). E o +10 da Dilacerante
 * saía com um "tipo de dano" próprio, que escapava da RD e da imunidade do alvo.
 * Correção (decisão do usuário: o módulo escolhe a melhor opção): no crítico, a Lancinante calcula as duas
 * e usa a que dá mais dano; o +10 da Dilacerante fica com o tipo de dano da arma. Com a regra opcional
 * "Lancinante revisada" ligada nas configurações do sistema, o sistema decide como antes.
 */
const temEncanto = (item, identificador, nome) =>
	item.effects?.some((e) => !e.disabled && (e.system?.identifier === identificador || (e.system?.upgrade?.type === "enchantment" && e.name === nome)));

function bonusNumerico(item, rolagem) {
	const rollData = item.getRollData();
	let soma = 0;
	for (const [i, parte] of rolagem.parts.entries()) {
		const [formula, tipo] = parte;
		if (i === 0 || tipo === "danoCritico" || /d\d/i.test(String(formula))) continue;
		try {
			const v = Number(Roll.safeEval(Roll.replaceFormulaData(String(formula), rollData, { missing: "0" })));
			if (v > 0) soma += v;
		} catch {
			// fórmula não numérica: fica de fora
		}
	}
	// Bônus de dano da ficha que o sistema soma dentro da rolagem.
	const mods = item.actor?.system?.modificadores?.dano ?? {};
	const pericia = item.system.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0];
	const lista = [...(mods.geral ?? []), ...(pericia === "luta" ? mods.cac ?? [] : []), ...(pericia === "pont" ? mods.ad ?? [] : [])];
	for (const f of lista) {
		try {
			const v = Number(Roll.safeEval(Roll.replaceFormulaData(String(f), rollData, { missing: "0" })));
			if (v > 0) soma += v;
		} catch {
			// idem
		}
	}
	return soma;
}

export default {
	id: "encantosCritico",
	name: "Dilacerante e Lancinante no crítico",
	hint: "Lancinante: no crítico, o módulo calcula +10 ou os bônus numéricos multiplicados e usa o que der mais (o sistema multiplicava tudo, inclusive o +10 da Dilacerante e as penalidades). O +10 da Dilacerante sai com o tipo de dano da arma, sujeito à RD e à imunidade (JdA p. 335–336).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", async function (wrapped, config = {}, ...args) {
			const restaurar = [];
			try {
				const critico = this.type === "arma" && this.system?.rolled?.Ataque?._critical;
				if (critico) {
					const lancinante = temEncanto(this, "lancinating", "Lancinante");
					const revisada = game.settings.get("tormenta20", "lancinatingVersion") === "revised";
					for (const rolagem of this.system.rolls ?? []) {
						if (rolagem.type !== "dano" || !Array.isArray(rolagem.parts)) continue;
						const tipoDaArma = rolagem.parts[0]?.[1] ?? "";
						if (lancinante && !revisada) {
							// Substitui a Dilacerante: o +10 dela sai, e entra a melhor das duas opções.
							rolagem.parts = rolagem.parts.filter((p) => p[1] !== "danoCritico");
							const mult = Number(this.system.criticoX) || 2;
							const multiplicado = (mult - 1) * bonusNumerico(this, rolagem);
							const opcao = multiplicado > 10 ? multiplicado : 10;
							rolagem.parts.push([String(opcao), tipoDaArma, ""]);
							this._t20cLancinante = multiplicado > 10 ? `Lancinante: bônus numéricos multiplicados (+${multiplicado})` : "Lancinante: +10 de dano";
						} else {
							// Dilacerante: o +10 com o tipo de dano da arma.
							for (const p of rolagem.parts) if (p[1] === "danoCritico") p[1] = tipoDaArma;
						}
					}
					if (lancinante && !revisada) {
						// O sistema não multiplica mais nada além dos dados.
						for (const ef of this.effects) {
							if (ef.system?.identifier !== "lancinating") continue;
							restaurar.push(ef);
							ef.system.identifier = `${MODULE_ID}-lancinante`;
						}
					}
				}
			} catch (error) {
				warn("Falha ao aplicar Dilacerante/Lancinante.", error);
			}
			try {
				const resultado = await wrapped(config, ...args);
				if (this._t20cLancinante) this.system.chatFlavor = [this.system.chatFlavor, `${this._t20cLancinante}.`].filter(Boolean).join(" ");
				return resultado;
			} finally {
				for (const ef of restaurar) ef.system.identifier = "lancinating";
			}
		});
	}
};
