import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 284, "Tipos de criaturas"; p. 228 e 284 sobre atributo nulo):
 * - construtos: visão no escuro; imunes a efeitos de cansaço, metabólicos e de veneno; não recuperam PV
 *   por descanso nem por efeitos de cura;
 * - mortos-vivos: visão no escuro; imunes a efeitos de cansaço, metabólicos, de trevas e de veneno;
 *   sofrem dano por efeitos mágicos de cura de luz (Vontade reduz à metade) e recuperam PV com dano de
 *   trevas;
 * - "Int –" (atributo nulo): não é capaz de pensar, então efeitos mentais e de medo não o afetam.
 * O sistema só guardava o tipo: nada disso era aplicado, e Curar Ferimentos curava um esqueleto.
 * Correção: as imunidades e a visão no escuro vêm do tipo (também para personagens de raça morto-viva ou
 * construto, cujo poder racial muda o tipo); a cura vira dano de luz no morto-vivo, o dano de trevas o
 * cura, e o construto ignora a cura. A Vontade para reduzir à metade fica com o mestre (aviso no chat).
 */
const IMUNIDADES = {
	con: ["cansaco", "metabolismo", "veneno"],
	mor: ["cansaco", "metabolismo", "trevas", "veneno"]
};

/** Tipo da criatura, contando o poder racial que muda o tipo (aplicado depois desta etapa). */
export function tipoDaCriatura(actor) {
	let tipo = actor?._source?.system?.detalhes?.tipo ?? actor?.system?.detalhes?.tipo;
	for (const item of actor?.items ?? []) {
		for (const ef of item.effects ?? []) {
			if (ef.disabled || !ef.transfer) continue;
			const mudanca = ef.system?.changes?.find((c) => c.key === "system.detalhes.tipo" && c.type === "override");
			if (mudanca) tipo = String(mudanca.value);
		}
	}
	return tipo;
}

export const intNula = (actor) => Boolean(actor?.getFlag?.(MODULE_ID, "intNula") ?? actor?.flags?.[MODULE_ID]?.intNula);

function aplicarTipo(system, actor) {
	const tipo = tipoDaCriatura(actor);
	const ic = system.tracos?.ic?.value;
	if (!(ic instanceof Set)) return;
	for (const id of IMUNIDADES[tipo] ?? []) ic.add(id);
	if (IMUNIDADES[tipo]) system.attributes?.sentidos?.value?.add?.("escuro");
	if (tipo === "mor" && system.tracos?.resistencias?.trevas) system.tracos.resistencias.trevas.imunidade = true;
	if (intNula(actor)) {
		ic.add("mental");
		ic.add("medo");
	}
}

/* -------------------------------------------- dano e cura */

const sabor = (roll, termo, padrao) => termo.options?.flavor ?? roll.terms[0]?.options?.flavor ?? padrao;
const termos = (roll) => roll.terms.filter((t) => !t.operator && Number.isFinite(t.total));

/** Soma das partes de um tipo, respeitando os sinais. */
function somaDoTipo(roll, tipo, padrao) {
	let total = 0;
	let sinal = 1;
	for (const t of roll.terms) {
		if (t.operator) {
			sinal = t.operator === "-" ? -1 : 1;
			continue;
		}
		if (sabor(roll, t, padrao) === tipo) total += sinal * (Number(t.total) || 0);
	}
	return Math.max(0, total);
}

async function avisar(actor, texto) {
	await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<p>${texto}</p>`, whisper: game.users.filter((u) => u.isGM).map((u) => u.id) });
}

export default {
	id: "tiposDeCriatura",
	name: "Tipos de criatura: imunidades e cura",
	hint: "Construtos e mortos-vivos ganham visão no escuro e imunidade a cansaço, metabolismo e veneno (mortos-vivos também a trevas); Int nula ignora mental e medo. Cura fere morto-vivo (dano de luz) e trevas o cura; construto não recupera PV com cura (JdA p. 284).",
	init() {
		for (const tipo of ["character", "npc"]) {
			wrap(`CONFIG.Actor.dataModels.${tipo}.prototype.prepareBaseData`, function (wrapped, ...args) {
				const resultado = wrapped(...args);
				try {
					aplicarTipo(this, this.parent);
				} catch (error) {
					warn("Falha ao aplicar o tipo de criatura.", error);
				}
				return resultado;
			});
		}
		wrap("CONFIG.Actor.documentClass.prototype.applyDamageV2", async function (wrapped, roll, multiplier = 1, type = "dano", ...args) {
			const tipo = tipoDaCriatura(this);
			if (!["mor", "con"].includes(tipo) || !roll?.terms) return wrapped(roll, multiplier, type, ...args);
			const partes = termos(roll);
			const ehCura = (t) => sabor(roll, t, type) === "curapv";
			if (multiplier < 0 && partes.some(ehCura)) {
				if (tipo === "con") {
					if (partes.every(ehCura)) return avisar(this, `${this.name} é um construto: não recupera PV com efeitos de cura (Ofício artesão faz as vezes de Cura).`);
					return wrapped(roll, multiplier, type, ...args);
				}
				// Morto-vivo: a cura vira dano de luz.
				const copia = Roll.fromData(roll.toJSON());
				for (const t of copia.terms) if (!t.operator && sabor(copia, t, type) === "curapv") t.options.flavor = "luz";
				if (copia.terms[0]?.options?.flavor === "curapv") copia.terms[0].options.flavor = "luz";
				const resultado = await wrapped(copia, Math.abs(multiplier), type, ...args);
				await avisar(this, `${this.name} é um morto-vivo: a cura de luz causou dano. Se passar em Vontade (CD do efeito), o dano cai à metade.`);
				return resultado;
			}
			if (tipo === "mor" && multiplier > 0) {
				// Morto-vivo: imune ao dano de trevas (o sistema zera) e recupera esse valor em PV.
				const trevas = Math.floor(somaDoTipo(roll, "trevas", type) * multiplier);
				const resultado = await wrapped(roll, multiplier, type, ...args);
				if (trevas > 0) {
					const pv = this.system.attributes.pv;
					await this.update({ "system.attributes.pv.value": Math.min(pv.max, pv.value + trevas) });
					await avisar(this, `${this.name} é um morto-vivo: recuperou ${trevas} PV com o dano de trevas.`);
				}
				return resultado;
			}
			return wrapped(roll, multiplier, type, ...args);
		});
	}
};
