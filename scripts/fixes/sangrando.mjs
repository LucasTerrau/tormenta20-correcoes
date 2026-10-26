import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 394): "Sangrando. No início de seu turno, o personagem deve fazer um teste de
 * Constituição (CD 15). Se falhar, perde 1d6 pontos de vida e continua sangrando. Se passar, remove
 * essa condição." No sistema a condição não fazia nada.
 * Correção: no início do turno (só no cliente do mestre ativo, onde o Foundry roda _onStartTurn), rola
 * o teste de Constituição com os modificadores da ficha. Passou: a condição sai. Falhou: a perda de 1d6
 * vai para o chat com os botões de aplicar, como o dano do Em Chamas. Sangramento mais forte (d8, d10,
 * d12) rola o dado dele; se chegou em quem já sangrava, o próximo teste falha sozinho.
 */
const CD = 15;

/**
 * Dado da perda: 1d6 da condição, ou o maior dos sangramentos mais fortes que o personagem tem
 * (Golpe do Predador, Onda de Sangue: "a perda de vida por sangramento aumenta em um passo", até d12).
 * O dado vem do nome ("Sangrando (d10)") ou de uma alteração de dano do efeito.
 */
function dadoDaPerda(actor) {
	let faces = 6;
	for (const ef of actor.effects) {
		// O sistema suprime o sangrando mais antigo quando chega outro: o dado vale mesmo assim.
		if (!ef.statuses.has("sangrando") || ef.disabled) continue;
		const textos = [ef.name, ...(ef.system?.changes ?? []).filter((c) => /dano|perda/i.test(c.key)).map((c) => String(c.value))];
		for (const texto of textos) {
			const m = String(texto).match(/\d*d(\d+)/);
			if (m) faces = Math.max(faces, Number(m[1]));
		}
	}
	return faces;
}

async function sangrar(actor) {
	if (!actor?.statuses?.has("sangrando")) return;
	// Sem diálogo: o atalho depende da configuração "UsageConfig" do sistema.
	const shiftKey = game.settings.get("tormenta20", "UsageConfig") === "default";
	const speaker = ChatMessage.getSpeaker({ actor });
	// "Ela falha automaticamente em seu próximo teste de Constituição para remover essa condição" (Golpe do
	// Predador, Onda de Sangue): marcado quando o sangramento mais forte chegou.
	const marcados = actor.effects.filter((e) => e.statuses.has("sangrando") && e.getFlag(MODULE_ID, "falhaNoProximoTeste"));
	let passou = false;
	if (marcados.length) {
		await actor.updateEmbeddedDocuments("ActiveEffect", marcados.map((e) => ({ _id: e.id, [`flags.${MODULE_ID}.falhaNoProximoTeste`]: false })));
		await ChatMessage.create({ speaker, flavor: "Sangrando: falha automática no teste de Constituição (o sangramento piorou)" });
	} else {
		const teste = await actor.rollAtributo("con", { event: { shiftKey }, message: false });
		if (!teste) return;
		// 20 natural sempre passa e 1 natural sempre falha (JdA p. 227).
		const natural = teste.dice?.find((d) => d.faces === 20)?.total;
		passou = natural === 20 || (natural !== 1 && teste.total >= CD);
		await teste.toMessage({
			speaker,
			flavor: `Sangrando: teste de Constituição (CD ${CD}) — ${passou ? "passou, a condição acaba" : "falhou"}`
		});
	}
	if (passou) {
		const ids = actor.effects.filter((e) => e.statuses.has("sangrando")).map((e) => e.id);
		if (ids.length) await actor.deleteEmbeddedDocuments("ActiveEffect", ids);
		return;
	}
	const perda = await new Roll(`1d${dadoDaPerda(actor)}[perda]`).evaluate();
	await ChatMessage.create({ speaker, flavor: "Sangrando: perda de vida", rolls: [perda] });
}

export default {
	id: "sangrando",
	name: "Sangrando: teste de Constituição no início do turno",
	hint: "No início do turno de quem está sangrando, rola Constituição CD 15: se passar, a condição acaba; se falhar, a perda de 1d6 PV (ou o dado do sangramento mais forte, como o do Golpe do Predador) vai para o chat com os botões de aplicar (JdA p. 394).",
	init() {
		// Sangramento mais forte ("Sangrando (d8)", "(d10)"…) chegando em quem já sangra: o próximo teste falha.
		Hooks.on("preCreateActiveEffect", (effect) => {
			const actor = effect.parent;
			if (actor?.documentName !== "Actor" || !effect.statuses?.has("sangrando") || !actor.statuses?.has("sangrando")) return;
			const faces = Number(String(effect.name).match(/\(\s*\d*d(\d+)\s*\)/)?.[1]);
			if (faces > 6) effect.updateSource({ [`flags.${MODULE_ID}.falhaNoProximoTeste`]: true });
		});
		wrap("CONFIG.Combat.documentClass.prototype._onStartTurn", async function (wrapped, combatant, ...args) {
			const resultado = await wrapped(combatant, ...args);
			try {
				await sangrar(combatant?.actor);
			} catch (error) {
				warn("Falha ao rolar o teste de Sangrando.", error);
			}
			return resultado;
		});
	}
};
