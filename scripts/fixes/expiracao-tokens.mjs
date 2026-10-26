import { log, wrap } from "../util.mjs";

/**
 * Bug (Foundry v14.367): o registro de expiração só recebe os efeitos de um token sem vínculo quando o
 * ator sintético dele é montado, e só se o registro já estiver pronto. Os combatentes são montados
 * antes disso (Combatant#prepareDerivedData → updateResource → actor → _forceDeltaActor): depois de
 * recarregar a página com um combate aberto, condições e magias nos NPCs sem vínculo não expiram mais
 * (por turno, rodada ou fim de cena).
 * Correção: guarda esses tokens e registra os efeitos deles quando o mundo termina de carregar.
 */
const pendentes = new Set();

export default {
	id: "expiracaoTokens",
	name: "Efeitos de tokens sem vínculo expiram depois de recarregar",
	hint: "Sem isso, depois de recarregar a página, efeitos temporários em tokens sem vínculo (a maioria dos NPCs) não expiram no turno, na rodada nem no fim de cena.",
	init() {
		wrap("CONFIG.Token.documentClass.prototype._onDeltaMaterialized", function (wrapped, ...args) {
			if (!CONFIG.ActiveEffect.documentClass.registry.initialized) pendentes.add(this);
			return wrapped(...args);
		});
	},
	ready() {
		const registro = CONFIG.ActiveEffect.documentClass.registry;
		let total = 0;
		for (const token of pendentes) {
			const actor = token.actor;
			if (!actor) continue;
			registro.addFromParent(actor);
			const efeitos = [...actor.effects, ...actor.items.contents.flatMap((i) => [...i.effects])];
			for (const effect of efeitos) {
				if (!registro.has(effect)) continue;
				effect.updateDuration();
				total++;
			}
		}
		pendentes.clear();
		if (total) log(`Efeitos de tokens sem vínculo registrados para expirar: ${total}`);
	}
};
