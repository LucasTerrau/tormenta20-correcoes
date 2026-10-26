import { log, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 394): "se ficar abalado novamente, em vez disso fica apavorado". Vale para fraco →
 * debilitado, frustrado → esmorecido, fatigado → exausto e, de novo, debilitado ou exausto →
 * inconsciente. O sistema só suprime a condição repetida.
 * Correção: ao criar uma condição que o personagem já tem, cria a condição pior no lugar. A antiga
 * fica (o sistema a suprime). Condições filhas criadas pelo próprio sistema (o debilitado do exausto)
 * não contam como "ficar de novo".
 */
const ESCALADA = {
	abalado: "apavorado",
	fraco: "debilitado",
	frustrado: "esmorecido",
	fatigado: "exausto",
	debilitado: "inconsciente",
	exausto: "inconsciente"
};

/** Filhas têm como origem a condição-mãe no mesmo ator (TormentaEffectData#_createChildStatus). */
function ehFilha(actor, data) {
	return String(data.origin ?? "").startsWith(`${actor.uuid}.ActiveEffect.`);
}

async function piorar(actor, status, pior, data) {
	const efeito = await CONFIG.ActiveEffect.documentClass.fromStatusEffect(pior);
	const fonte = efeito.toObject();
	if (data.duration?.expiry || Number.isFinite(data.duration?.value)) fonte.duration = data.duration;
	if (data.origin) fonte.origin = data.origin;
	await actor.createEmbeddedDocuments("ActiveEffect", [fonte], { t20cEscalada: true });
	const nome = (id) => CONFIG.statusEffects[id]?.name ?? id;
	ui.notifications.info(`${actor.name} ficou ${nome(status).toLowerCase()} de novo: agora está ${nome(pior).toLowerCase()} (JdA p. 394).`);
	log(`Escalada de condição: ${actor.name} ${status} → ${pior}`);
}

export default {
	id: "escaladaCondicoes",
	name: "Condições que pioram ao se repetir",
	hint: "Ficar abalado de novo deixa apavorado; fraco → debilitado; frustrado → esmorecido; fatigado → exausto; debilitado ou exausto de novo → inconsciente (JdA p. 394). A condição mais fraca deixa de valer enquanto a mais forte estiver ativa (fraco + debilitado dava –7 em testes de atributo).",
	init() {
		// O sistema confere a condição pior em actor.statuses, que o Foundry vai preenchendo no mesmo laço
		// que aplica os efeitos: a condição mais antiga (fraco) é aplicada antes de a pior (debilitado)
		// entrar na lista, e as duas somam. Olha os efeitos do ator direto.
		wrap("CONFIG.ActiveEffect.dataModels.base.prototype.isSuppressedByUpgrade", function (wrapped, ...args) {
			const pior = this.status?.upgrade;
			const actor = this.parent?.actor;
			if (!pior || !actor?.effects) return wrapped(...args);
			return actor.effects.some((e) => e !== this.parent && !e.disabled && e.statuses.has(pior)) || wrapped(...args);
		});
		Hooks.on("preCreateActiveEffect", (effect, data, options) => {
			if (options.t20cEscalada) return;
			const actor = effect.parent;
			if (actor?.documentName !== "Actor") return;
			const status = [...(effect.statuses ?? [])].find((s) => ESCALADA[s]);
			if (!status || !actor.statuses.has(status) || ehFilha(actor, data)) return;
			piorar(actor, status, ESCALADA[status], data);
			return false;
		});
	}
};
