import { MODULE_ID } from "../constants.mjs";
import { equipado } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 228): "Cura acelerada X/tipo. No início de seu turno, a criatura recupera X pontos de
 * vida", exceto se sofreu dano do tipo indicado desde o último turno; não recupera perda de vida; várias
 * curas aceleradas se acumulam. O sistema não fazia nada (trolls, Hidra, Vampiro, Finntrolls; Anel da
 * Regeneração).
 * Correção: no início do turno (cliente do mestre), soma as Curas Aceleradas da criatura (habilidade
 * "Cura Acelerada N" ou "Cura acelerada N/tipo"; Anel da Regeneração vestido, 5; flag "curaAcelerada")
 * e manda a cura para o chat com os botões de aplicar, como o dano do Em Chamas. O tipo que bloqueia
 * aparece no cartão, e o mestre decide.
 */
const CURA = /^cura acelerada\s+(\d+)\s*(?:\/\s*(.+))?$/i;

function curas(actor) {
	const lista = [];
	for (const item of actor.items) {
		const m = String(item.name).trim().match(CURA);
		if (m) lista.push({ valor: Number(m[1]), exceto: m[2]?.trim() ?? "" });
		else if (/^anel da regenera[cç][aã]o$/i.test(item.name) && equipado(item)) lista.push({ valor: 5, exceto: "" });
	}
	// Regeneração Sobrenatural (bárbaro, HdA): Cura Acelerada 5 em fúria e com menos da metade dos PV máximos.
	const pv = actor.system?.attributes?.pv;
	const emFuria = actor.effects.some((e) => !e.disabled && /^f[uú]ria\b/i.test(e.name ?? ""));
	if (actor.items.some((i) => i.name === "Regeneração Sobrenatural") && emFuria && Number(pv?.value) < Number(pv?.max) / 2) lista.push({ valor: 5, exceto: "" });
	// Escrita no texto de resistências da ficha ("cura acelerada 15/ácido ou fogo"): a varredura dos NPCs do
	// livro grava o valor numa flag; em outras fichas, o texto é lido aqui.
	const flag = Number(actor.getFlag(MODULE_ID, "curaAcelerada"));
	if (flag) lista.push({ valor: flag, exceto: (actor.getFlag(MODULE_ID, "curaAceleradaExceto") ?? []).join(" ou ") });
	else {
		const m = String(actor.system?.detalhes?.resistencias ?? "").match(/cura acelerada\s+(\d+)(?:\s*\/\s*([^,;.()]+))?/i);
		if (m) lista.push({ valor: Number(m[1]), exceto: m[2]?.trim() ?? "" });
	}
	return lista;
}

async function curar(actor) {
	if (!actor || actor.statuses?.has("morto")) return;
	const lista = curas(actor);
	const total = lista.reduce((s, c) => s + c.valor, 0);
	if (!total) return;
	const pv = actor.system.attributes?.pv;
	if (pv && pv.value >= pv.max) return;
	const excecoes = lista.filter((c) => c.exceto).map((c) => c.exceto);
	const nota = excecoes.length ? ` (não vale se sofreu dano de ${excecoes.join(" ou ")} desde o último turno)` : "";
	const roll = await new Roll(`${total}[curapv]`).evaluate();
	await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `Cura acelerada ${total}${nota}`, rolls: [roll] });
}

export default {
	id: "curaAcelerada",
	name: "Cura acelerada no início do turno",
	hint: "No início do turno, criaturas com Cura Acelerada (trolls, Hidra, Vampiro…) e quem veste o Anel da Regeneração recebem a cura no chat, com o botão de aplicar. O tipo que bloqueia (\"/fogo\") aparece no cartão (JdA p. 228).",
	init() {
		wrap("CONFIG.Combat.documentClass.prototype._onStartTurn", async function (wrapped, combatant, ...args) {
			const resultado = await wrapped(combatant, ...args);
			try {
				await curar(combatant?.actor);
			} catch (error) {
				warn("Falha ao rolar a cura acelerada.", error);
			}
			return resultado;
		});
	}
};
