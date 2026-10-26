import { warn, wrap } from "../util.mjs";

/**
 * Substitui o essencial do módulo Visão para Tormenta20 (vision-t20), que quebra no Foundry v14.
 * Sentidos da ficha (JdA, glossário de criaturas):
 * - Visão no escuro: "enxerga em escuridão total em alcance curto (exceto mágica)": visão no escuro
 *   de 9m no token;
 * - Percepção às cegas: "efeitos relacionados à visão, como escuridão e invisibilidade, não a afetam…
 *   alcance curto": modo de detecção "perceber tudo" de 9m;
 * - Visão na penumbra: luz fraca o Foundry já mostra; faro não é visão.
 * Tudo nos dados preparados do token (nada é gravado): nunca diminui o que já estiver configurado.
 */
const CURTO_EM_METROS = 9;

function alcanceCurto(token) {
	const unidade = String(token.parent?.grid?.units ?? "m").toLowerCase();
	return unidade.startsWith("m") ? CURTO_EM_METROS : 30;
}

function aplicarSentidos(token) {
	const sentidos = token.actor?.system?.attributes?.sentidos?.value;
	if (!sentidos?.size) return;
	const curto = alcanceCurto(token);
	if (sentidos.has("escuro") && token.sight) {
		if ((token.sight.range ?? 0) < curto) token.sight.range = curto;
		if (!token.sight.visionMode || token.sight.visionMode === "basic") token.sight.visionMode = "darkvision";
		const basica = token.detectionModes?.basicSight;
		if (basica && Number.isFinite(basica.range) && basica.range < curto) basica.range = curto;
	}
	if (sentidos.has("cegas") && token.detectionModes) {
		const atual = token.detectionModes.senseAll;
		if (!atual || (Number.isFinite(atual.range) && atual.range < curto)) token.detectionModes.senseAll = { enabled: true, range: curto };
	}
}

export default {
	id: "visao",
	name: "Visão pelos sentidos da ficha",
	hint: "Visão no escuro e percepção às cegas da ficha viram visão no escuro e \"perceber tudo\" de 9m no token (alcance curto). Substitui o módulo Visão para Tormenta20, que não funciona no Foundry v14; com ele ligado, esta correção fica parada.",
	init() {
		Hooks.once("ready", () => {
			if (game.modules.get("vision-t20")?.active) warn("O módulo Visão para Tormenta20 está ligado; a visão pelos sentidos da ficha fica desligada.");
		});
		wrap("CONFIG.Token.documentClass.prototype.prepareBaseData", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			if (game.modules.get("vision-t20")?.active) return resultado;
			try {
				aplicarSentidos(this);
			} catch (error) {
				warn("Falha ao aplicar os sentidos da ficha no token.", error);
			}
			return resultado;
		});
		// Mudou o sentido na ficha: os tokens do ator refazem a visão.
		Hooks.on("updateActor", (actor, mudancas) => {
			if (!foundry.utils.hasProperty(mudancas, "system.attributes.sentidos")) return;
			for (const token of actor.getActiveTokens()) {
				token.document.reset();
				token.initializeVisionSource?.();
			}
		});
	}
};
