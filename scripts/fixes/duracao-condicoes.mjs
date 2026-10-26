import { MODULE_ID } from "../constants.mjs";
import { duracaoDoEfeito } from "./duracao.mjs";
import { wrap } from "../util.mjs";

/**
 * Bug: no cartão, o sistema troca o efeito de condição pela condição pura (ability-use.mjs) e descarta a
 * duração da magia ou habilidade. "Fica enredado por 1 rodada" virava enredado até alguém tirar; uma
 * condição de magia sustentada não terminava com a magia.
 * Correção: a condição que ainda está com a duração padrão (fim da cena) recebe a duração do item, com a
 * mesma conversão que o sistema usa nos outros efeitos. Instantânea, especial e permanente não mudam
 * nada. Sustentada usa a mesma origem dos outros efeitos sustentados do cartão (um "Sustentando" só).
 */
function duracaoPadrao(duration) {
	return !Number(duration?.value) && [undefined, null, "sceneEnd"].includes(duration?.expiry);
}

async function valorDaDuracao(duracao) {
	const texto = String(duracao?.value ?? "").trim();
	if (/^\d+d\d+/.test(texto)) return (await new Roll(texto).evaluate()).total;
	return Number(texto) || 1;
}

export default {
	id: "duracaoCondicoes",
	name: "Condições do cartão com a duração da habilidade",
	hint: "Condições aplicadas pelo cartão de uma magia ou habilidade (enredado, lento, apavorado…) passam a durar o que a magia ou habilidade dura, em vez de ficar até o fim da cena. Em magia sustentada, a condição termina junto com a magia.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			const options = config.options;
			const units = this.system?.duracao?.units;
			if (options?.effects?.length && units && !["inst", "special", "perm"].includes(units)) {
				const efeitos = options.effects.map((lista) => (Array.isArray(lista) ? lista[0] : lista)).filter(Boolean);
				const condicoes = efeitos.filter((e) => e.statuses?.length && duracaoPadrao(e.duration));
				if (condicoes.length) {
					const valor = await valorDaDuracao(this.system.duracao);
					const origemSustentada = efeitos.find((e) => e.duration?.expiry === "sustainEnd" && /\.ActiveEffect\./.test(e.origin ?? ""))?.origin;
					for (const efeito of condicoes) {
						efeito.duration = duracaoDoEfeito(units, valor, efeito.duration ?? {});
						if (efeito.duration.expiry === "sustainEnd") {
							efeito.origin = origemSustentada ?? `${this.actor?.uuid}.ActiveEffect.${foundry.utils.randomID()}`;
							// Para a regra "uma magia sustentada por vez" (correção Sustentadas).
							if (this.type === "magia") foundry.utils.setProperty(efeito, `flags.${MODULE_ID}.magiaSustentada`, true);
						}
					}
				}
			}
			return wrapped(config, ...args);
		});
	}
};
