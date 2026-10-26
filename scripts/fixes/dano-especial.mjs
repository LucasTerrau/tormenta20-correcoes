import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";
import { dadoDesarmado } from "./atributo-arma.mjs";
import { fonteDaMetade } from "./dano-magico.mjs";

/**
 * Regras que mudam o dano recebido (JdA p. 229, 236 e fichas do cap. 7):
 * - Dano reduzido à metade por tipo (Ogro: "todo o dano de corte, impacto e perfuração… reduzido à
 *   metade"; enxames e Dragão-Rei: dano de armas ou mundano), antes da RD. O sistema só tinha RD fixa,
 *   imunidade e vulnerabilidade. "Armas" conta como corte, impacto e perfuração. "Fontes mundanas" e
 *   "armas mundanas sem melhorias" usam a marca da correção "Dano mágico e mundano"; sem ela (dano
 *   digitado, correção desligada), também viram corte, impacto e perfuração.
 * - Imunidade a acertos críticos: o crítico vira acerto normal. Fraqueza Zumbi: o dobro do dano do
 *   crítico (o cartão avisa para aplicar com o botão de dobro).
 * - Dano não letal: conta para desmaiar, mas não para sangrar ou morrer; arma letal sofre –5 para causar
 *   dano não letal, e o ataque desarmado (não letal) sofre –5 para causar dano letal, a não ser com Briga
 *   ou Estilo Desarmado (sem penalidade). Simplificação: o dano não letal leva os PV no máximo até 0, com
 *   inconsciente sem sangrando (a correção "0 PV e morte" lê a marca do dano).
 * As marcas vêm da varredura das fichas do livro (flags danoMetade, imuneCritico, fraquezaZumbi).
 */
const OPCAO_NAO_LETAL = { id: "t20cNaoLetal0000", name: "Dano não letal", descricao: "Causa dano não letal (–5 no ataque com arma letal, p. 236)." };
const OPCAO_LETAL = { id: "t20cLetal0000000", name: "Dano letal", descricao: "Ataque desarmado causando dano letal (–5 no ataque, p. 236)." };

const flagDo = (actor, chave) => actor?.getFlag?.(MODULE_ID, chave) ?? actor?.flags?.[MODULE_ID]?.[chave];

/* -------------------------------------------- metade por tipo */

const sabor = (roll, termo, padrao) => termo.options?.flavor ?? roll.terms[0]?.options?.flavor ?? padrao;

function somaPorTipo(roll, padrao) {
	const somas = {};
	let sinal = 1;
	for (const t of roll.terms) {
		if (t.operator) {
			sinal = t.operator === "-" ? -1 : 1;
			continue;
		}
		const tipo = sabor(roll, t, padrao);
		somas[tipo] = (somas[tipo] ?? 0) + sinal * (Number(t.total) || 0);
	}
	return somas;
}

/* -------------------------------------------- crítico e não letal */

const ehDesarmado = (item) => /^ataque desarmado$/i.test(item?.name ?? "");
const alvosMarcados = () => [...(game.user?.targets ?? [])].map((t) => t.actor).filter(Boolean);

function criarOpcao(item, opcao, penalidade) {
	return new CONFIG.ActiveEffect.documentClass(
		{
			_id: opcao.id,
			name: opcao.name,
			img: "icons/svg/sleep.svg",
			description: `<p>${opcao.descricao}</p>`,
			type: "base",
			system: {
				onuse: true,
				changes: penalidade ? [{ key: "ataque", type: "add", value: "-5", phase: "initial", priority: null }] : [],
				abilityUse: { description: "", automatic: false, aumenta: false, custo: null, names: [], types: ["self"] }
			}
		},
		{ parent: item }
	);
}

function marcada(resultado, id) {
	const valor = resultado?.aprs?.[id]?.aplica ?? resultado?.[`aprs.${id}.aplica`];
	return valor === true || Number(valor) > 0;
}

/** O ataque deste item causa dano não letal? (desarmado sem a opção "letal", ou arma com a opção "não letal") */
function naoLetal(item) {
	if (item?.type !== "arma") return false;
	const escolhas = item._t20cLetalidade;
	if (ehDesarmado(item) && !dadoDesarmado(item.actor)) return escolhas !== "letal";
	return escolhas === "naoLetal";
}

export default {
	id: "danoEspecial",
	name: "Dano à metade, imunidade a crítico e dano não letal",
	hint: "Dano de certos tipos reduzido à metade antes da RD (Ogro, enxames, Dragão-Rei); alvo imune a críticos recebe acerto normal (Fraqueza Zumbi: aviso de dano dobrado); opções de dano não letal e letal no ataque (–5), com o dano não letal levando a 0 PV e inconsciente sem sangrar (JdA p. 229, 236).",
	init() {
		// Metade antes da RD: o dano à metade menos a RD é o mesmo que a RD aumentada na outra metade.
		wrap("CONFIG.Actor.documentClass.prototype.applyDamageV2", async function (wrapped, roll, multiplier = 1, type = "dano", ...args) {
			let tipos = flagDo(this, "danoMetade");
			const rds = this.system?.tracos?.resistencias;
			const extras = [];
			// Com a rolagem marcada pela correção "Dano mágico e mundano": "fontes mundanas" vale para todo
			// dano mundano (e não para o mágico); "armas mundanas sem melhorias" só para essas armas.
			const fonte = fonteDaMetade(this);
			if (fonte && roll?.options?.t20cMagico !== undefined) {
				const o = roll.options;
				const aplica = fonte.tipo === "mundano" ? !o.t20cMagico && !(fonte.excetoAcoRubi && o.t20cAcoRubi) : Boolean(o.t20cArmaMundana);
				tipos = aplica ? "todos" : [];
			}
			if ((tipos === "todos" || (Array.isArray(tipos) && tipos.length)) && multiplier > 0 && rds && roll?.terms) {
				try {
					for (const [tipo, soma] of Object.entries(somaPorTipo(roll, type))) {
						if (tipos !== "todos" && !tipos.includes(tipo)) continue;
						if (["perda", "curapv", "curatpv", "curapm", "curatpm"].includes(tipo) || !rds[tipo] || soma <= 0) continue;
						const bruto = Math.floor(soma * multiplier);
						const extra = bruto - Math.floor(bruto / 2);
						rds[tipo].value = (Number(rds[tipo].value) || 0) + extra;
						extras.push([tipo, extra]);
					}
				} catch (error) {
					warn("Falha ao reduzir o dano à metade.", error);
				}
			}
			// Dano não letal: marca para a correção de 0 PV (o PV não passa de 0 e não sangra).
			this._t20cNaoLetal = Boolean(roll?.options?.t20cNaoLetal) && multiplier > 0;
			try {
				return await wrapped(roll, multiplier, type, ...args);
			} finally {
				for (const [tipo, extra] of extras) rds[tipo].value = Math.max(0, (Number(rds[tipo].value) || 0) - extra);
				this._t20cNaoLetal = false;
			}
		});
		// Opções de letalidade no diálogo do ataque.
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const lista = wrapped(...args);
			try {
				if (this.type === "arma" && this.actor && this.system?.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0] === "luta") {
					// Com Briga ou Estilo Desarmado o desarmado causa dano letal ou não letal sem penalidade.
					if (ehDesarmado(this)) lista.push(dadoDesarmado(this.actor) ? criarOpcao(this, OPCAO_NAO_LETAL, false) : criarOpcao(this, OPCAO_LETAL, true));
					else lista.push(criarOpcao(this, OPCAO_NAO_LETAL, true));
				}
			} catch (error) {
				warn("Falha ao montar as opções de dano letal e não letal.", error);
			}
			return lista;
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			if (resultado && item?.type === "arma") {
				if (marcada(resultado, OPCAO_NAO_LETAL.id)) item._t20cLetalidade = "naoLetal";
				else if (marcada(resultado, OPCAO_LETAL.id)) item._t20cLetalidade = "letal";
			}
			return resultado;
		});
		// Crítico contra imune vira acerto normal; dano não letal vai marcado na rolagem.
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", async function (wrapped, config = {}, ...args) {
			const avisos = [];
			try {
				const ataque = this.system?.rolled?.Ataque;
				const alvos = alvosMarcados();
				if (ataque?._critical && alvos.length && alvos.every((a) => flagDo(a, "imuneCritico"))) {
					ataque._critical = false;
					avisos.push("alvo imune a acertos críticos: dano normal");
				}
				if (ataque?._critical && alvos.some((a) => flagDo(a, "fraquezaZumbi"))) avisos.push("Fraqueza Zumbi: aplique o dano em dobro");
			} catch (error) {
				warn("Falha ao conferir a imunidade a críticos.", error);
			}
			const resultado = await wrapped(config, ...args);
			try {
				const dano = this.system?.rolled?.Dano ?? Object.values(this.system?.rolled ?? {}).find((r) => r?.options?.type === "damage");
				if (dano && naoLetal(this)) {
					dano.options.t20cNaoLetal = true;
					avisos.push("dano não letal");
				}
				if (avisos.length) this.system.chatFlavor = [this.system.chatFlavor, `${avisos.join("; ")}.`].filter(Boolean).join(" ");
			} catch (error) {
				warn("Falha ao marcar o dano não letal.", error);
			}
			return resultado;
		});
	}
};
