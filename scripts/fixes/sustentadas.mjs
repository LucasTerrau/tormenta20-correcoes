import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 227, Duração): "O personagem deve gastar 1 PM como uma ação livre no início de cada turno
 * seu para manter o efeito ativo. Se não o fizer, a habilidade termina. Você pode manter diversas
 * habilidades sustentadas, pagando o custo de cada uma, mas apenas uma magia sustentada por vez."
 * O sistema cria "Sustentando (X)" em quem lançou e, no início do turno, pergunta o que sustentar
 * (cobra 1 PM por efeito). Mas, sem resposta, o efeito seguia de graça até o fim da cena, e nada
 * impedia duas magias sustentadas ao mesmo tempo.
 * Correção: em combate, no fim do turno de quem sustenta, o que não foi pago neste turno termina (o que
 * foi lançado neste turno já está pago). Aplicar uma nova magia sustentada encerra a anterior.
 * Também: ao terminar, o sistema só tirava o efeito de alvos que são atores do mundo; tokens não
 * vinculados ficavam com ele. A morte de quem sustenta encerra o efeito ("Morte e duração", JdA p. 227).
 */
const marca = (combat, { round, turn } = combat ?? {}) => (combat ? `${combat.id}:${round}:${turn}` : null);
const sustentando = (effect) => effect.statuses?.has("sustentando");
const deMagia = (effect) => Boolean(effect.getFlag(MODULE_ID, "magia"));

/** "Sustentando (Escudo Mental)" -> "Escudo Mental". */
const habilidade = (effect) => String(effect.name ?? "").match(/\(([^)]+)\)\s*$/)?.[1] ?? effect.name;

async function encerrarNaoPagos(combat, combatant, context) {
	const actor = combatant?.actor;
	// Turno pulado (o mestre avançou vários de uma vez): não houve chance de pagar.
	if (!actor || context?.skipped) return;
	// Em _onEndTurn o combate já está no turno seguinte; o contexto traz o turno que terminou.
	const agora = marca(combat, context);
	const vencidos = actor.effects.filter((e) => sustentando(e) && e.getFlag(MODULE_ID, "sustentadoEm") !== agora);
	if (!vencidos.length) return;
	await actor.deleteEmbeddedDocuments("ActiveEffect", vencidos.map((e) => e.id));
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		content: `<p><strong>${actor.name}</strong> não pagou para sustentar ${vencidos.map(habilidade).join(", ")}: o efeito terminou (JdA p. 227).</p>`
	});
}

/**
 * O efeito sustentado chegou a um alvo; o "Sustentando" de quem lançou já existe com o id do fim da
 * origem (o sistema o cria no _preCreate do efeito). Sendo magia, marca o "Sustentando" e encerra as
 * outras magias sustentadas de quem lançou.
 */
async function umaMagiaPorVez(data) {
	const [uuid, id] = String(data.origin ?? "").split(".ActiveEffect.");
	const caster = id ? foundry.utils.fromUuidSync(uuid) : null;
	const atual = caster?.effects?.get(id);
	if (!atual || !sustentando(atual)) return;
	if (!deMagia(atual)) await atual.setFlag(MODULE_ID, "magia", true);
	const anteriores = caster.effects.filter((e) => e.id !== id && sustentando(e) && deMagia(e));
	if (!anteriores.length) return;
	await caster.deleteEmbeddedDocuments("ActiveEffect", anteriores.map((e) => e.id));
	ui.notifications.info(`${caster.name}: só uma magia sustentada por vez; ${anteriores.map(habilidade).join(", ")} terminou (JdA p. 227).`);
}

export default {
	id: "sustentadas",
	name: "Sustentadas: pagar a cada turno, uma magia por vez",
	hint: "Em combate, efeito sustentado que não foi pago no turno de quem o sustenta termina no fim desse turno. Aplicar uma nova magia sustentada encerra a anterior (habilidades sustentadas que não são magia continuam). JdA p. 227.",
	init() {
		// Marca, no cartão, os efeitos sustentados que vêm de magia (a marca vai junto para o alvo).
		wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
			if (this.type === "magia") {
				for (const lista of config.options?.effects ?? []) {
					const efeito = Array.isArray(lista) ? lista[0] : lista;
					if (efeito?.duration?.expiry === "sustainEnd") foundry.utils.setProperty(efeito, `flags.${MODULE_ID}.magiaSustentada`, true);
				}
			}
			return wrapped(config, ...args);
		});
		Hooks.on("preCreateActiveEffect", (effect, data) => {
			// "Sustentando" criado neste turno: já conta como pago (o custo da magia cobre o turno em que foi lançada).
			if (sustentando(effect)) effect.updateSource({ [`flags.${MODULE_ID}.sustentadoEm`]: marca(game.combat) });
			else if (data.flags?.[MODULE_ID]?.magiaSustentada && data.duration?.expiry === "sustainEnd") {
				umaMagiaPorVez(data).catch((error) => warn("Falha ao encerrar a magia sustentada anterior.", error));
			}
		});
		// O diálogo "sustentar" do sistema renova o efeito (duração 1): é o pagamento deste turno.
		Hooks.on("preUpdateActiveEffect", (effect, changes) => {
			if (!sustentando(effect) || !foundry.utils.hasProperty(changes, "duration.value")) return;
			foundry.utils.setProperty(changes, `flags.${MODULE_ID}.sustentadoEm`, marca(game.combat));
		});
		// "A morte de um personagem não afeta suas habilidades (exceto sustentadas)" (JdA p. 227): morto, o
		// que ele sustentava termina.
		Hooks.on("createActiveEffect", (effect) => {
			const actor = effect.parent;
			if (!game.user.isActiveGM || actor?.documentName !== "Actor" || !effect.statuses?.has("morto")) return;
			const ids = actor.effects.filter((e) => sustentando(e)).map((e) => e.id);
			if (ids.length) actor.deleteEmbeddedDocuments("ActiveEffect", ids).catch((error) => warn("Falha ao encerrar sustentadas de quem morreu.", error));
		});
		// Fim do "Sustentando": o sistema só tira o efeito dos alvos que são atores do mundo (game.actors);
		// em tokens não vinculados (quase todo NPC) o efeito ficava. Tira deles também.
		Hooks.on("deleteActiveEffect", (effect) => {
			if (!game.user.isActiveGM || !sustentando(effect) || effect.parent?.documentName !== "Actor") return;
			const uuid = effect.uuid;
			for (const scene of game.scenes) {
				for (const token of scene.tokens) {
					if (token.actorLink || !token.delta?.effects?.size) continue;
					const ids = token.actor?.effects.filter((e) => e.origin === uuid).map((e) => e.id) ?? [];
					if (ids.length) token.actor.deleteEmbeddedDocuments("ActiveEffect", ids).catch((error) => warn("Falha ao encerrar efeito sustentado num token.", error));
				}
			}
		});
		// Fim do turno (o Foundry só chama _onEndTurn no mestre ativo).
		wrap("CONFIG.Combat.documentClass.prototype._onEndTurn", async function (wrapped, combatant, context, ...args) {
			const resultado = await wrapped(combatant, context, ...args);
			try {
				await encerrarNaoPagos(this, combatant, context);
			} catch (error) {
				warn("Falha ao encerrar efeitos sustentados não pagos.", error);
			}
			return resultado;
		});
	}
};
