import { warn, wrap } from "../util.mjs";

/**
 * Condições que o sistema só marcava (JdA p. 394–395):
 * - Confuso: "no início de seus turnos, role 1d6": 1 — anda numa direção aleatória (1d8); 2–3 — não faz
 *   nada; 4–5 — ataca a criatura mais próxima; 6 — a condição termina. O sistema não rolava nada.
 * - Sobrecarregado: o sistema só revia a carga quando o próprio ator mudava. Pegar, largar ou mudar a
 *   quantidade de um item não ligava nem desligava a condição (a penalidade de –5 ficava atrasada).
 * As perícias que faltavam em Fraco, Debilitado, Cego (Ladinagem) e Frustrado, Esmorecido (Ofícios) são
 * corrigidas nos dados da condição.
 */
const CONFUSO = {
	1: "anda em uma direção aleatória (1d8: 1 norte, 2 nordeste, 3 leste, 4 sudeste, 5 sul, 6 sudoeste, 7 oeste, 8 noroeste), uma ação de movimento",
	2: "fica parado, sem fazer nada",
	3: "fica parado, sem fazer nada",
	4: "ataca a criatura mais próxima (ou a si mesmo, se não houver ninguém)",
	5: "ataca a criatura mais próxima (ou a si mesmo, se não houver ninguém)",
	6: "a condição termina e pode agir normalmente"
};

async function rolarConfuso(actor) {
	if (!actor?.statuses?.has("confuso")) return;
	const roll = await new Roll("1d6").evaluate();
	const rolls = [roll];
	let texto = CONFUSO[roll.total];
	if (roll.total === 1) {
		const direcao = await new Roll("1d8").evaluate();
		rolls.push(direcao);
		texto += ` — direção ${direcao.total}`;
	}
	await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `Confuso (1d6 = ${roll.total}): ${texto}.`, rolls });
	if (roll.total === 6) {
		const ids = actor.effects.filter((e) => e.statuses.has("confuso")).map((e) => e.id);
		if (ids.length) await actor.deleteEmbeddedDocuments("ActiveEffect", ids);
	}
}

/** Liga ou desliga o Sobrecarregado pela carga atual (e apaga cópias repetidas). */
async function sobrecarga(actor) {
	const efeitos = actor.effects.filter((e) => e.statuses.has("sobrecarregado"));
	const pesado = Boolean(actor.system.attributes?.carga?.encumbered);
	if (pesado && !efeitos.length) await actor.toggleStatusEffect("sobrecarregado", { active: true });
	else if (!pesado && efeitos.length) await actor.deleteEmbeddedDocuments("ActiveEffect", efeitos.map((e) => e.id));
	else if (efeitos.length > 1) await actor.deleteEmbeddedDocuments("ActiveEffect", efeitos.slice(1).map((e) => e.id));
}

// Vários itens mudando de uma vez (arrastar uma pilha, apagar vários) davam várias conferências ao mesmo
// tempo, e cada uma criava o seu Sobrecarregado: uma conferência só por ator, logo depois da última mudança.
const pendentes = new Map();

function reverCarga(item, userId) {
	const actor = item.parent;
	if (userId !== game.userId || actor?.documentName !== "Actor" || actor.type !== "character") return;
	clearTimeout(pendentes.get(actor.uuid));
	pendentes.set(
		actor.uuid,
		setTimeout(() => {
			pendentes.delete(actor.uuid);
			sobrecarga(actor).catch((error) => warn("Falha ao rever a carga.", error));
		}, 100)
	);
}

export default {
	id: "condicoesExtras",
	name: "Confuso rola o d6; Sobrecarregado se atualiza",
	hint: "Confuso rola 1d6 no início do turno (e 1d8 de direção), e a condição sai com 6. Sobrecarregado entra e sai ao pegar, largar ou mudar itens. Fraco, Debilitado e Cego passam a pegar Ladinagem; Frustrado e Esmorecido, os Ofícios (JdA p. 394–395).",
	init() {
		wrap("CONFIG.Combat.documentClass.prototype._onStartTurn", async function (wrapped, combatant, ...args) {
			const resultado = await wrapped(combatant, ...args);
			try {
				await rolarConfuso(combatant?.actor);
			} catch (error) {
				warn("Falha ao rolar o Confuso.", error);
			}
			return resultado;
		});
		for (const evento of ["createItem", "updateItem", "deleteItem"]) {
			Hooks.on(evento, (item, ...args) => reverCarga(item, args.at(-1)));
		}
	}
};
