import { MODULE_ID } from "../constants.mjs";
import { wrap } from "../util.mjs";

/**
 * Regra (JdA p. 106): uma noite de descanso recupera PV e PM pelo nível: ruim, metade; normal, o nível;
 * confortável, o dobro; luxuosa, o triplo. Cuidados prolongados (Cura, p. 117): "aumenta sua
 * recuperação de PV em +1 por nível nesse dia". Pontos temporários "desaparecem no fim do dia" (p. 106).
 * Bugs: cuidados prolongados dobravam a recuperação de PV (em descanso luxuoso, 6× o nível); a opção
 * "Acompanhamento Médico (+1 PV/nível)" dobrava os PM; os pontos temporários não sumiam.
 * Correção: substitui ActorT20#descanso com as contas do livro; a opção de acompanhamento passa a fazer
 * o que o rótulo diz (+1 PV por nível).
 */
/** Categorias de descanso (JdA p. 106): ruim ½, normal 1, confortável 2, luxuosa 3 × o nível. */
const CATEGORIAS = [0.5, 1, 2, 3];
const subirCategoria = (m) => CATEGORIAS.find((c) => c > Number(m)) ?? Number(m);
const tem = (actor, nome) => actor.items.some((i) => i.name === nome);

async function descansar(actor, modificador = 1, modPV = 0, modPM = 0, curaCP = false, curaAC = false, toChat = true) {
	const nivel = Number(actor.system.attributes?.nivel?.value) || 1;
	// Prato do aventureiro / Sopa de peixe (JdA p. 162): +1 PV ou PM por nível na próxima noite de sono.
	const refeicao = actor.getFlag(MODULE_ID, "refeicao") ?? {};
	const notas = [];
	// Herança de Vitalia (HdA): a recuperação de PV sobe uma categoria.
	let categoriaPV = Number(modificador);
	if (tem(actor, "Herança de Vitalia")) {
		categoriaPV = subirCategoria(categoriaPV);
		notas.push("Herança de Vitalia: PV uma categoria acima");
	}
	// Sucata (golem, Ameaças de Arton): cuidados prolongados com Ofício (artesão) dão +2 PV por nível (em vez de +1).
	const porCuidados = curaCP ? (tem(actor, "Sucata") ? 2 : 1) * nivel : 0;
	let pv = Math.floor(nivel * (categoriaPV + Number(modPV || 0))) + porCuidados + (curaAC ? nivel : 0) + (Number(refeicao.pv) || 0);
	let pm = Math.floor(nivel * (Number(modificador) + Number(modPM || 0))) + (Number(refeicao.pm) || 0);
	// Hedonista (complicação, HdA): luxuosa = nível; confortável = metade; normal ou ruim = 1 PV e 1 PM.
	if (tem(actor, "Hedonista")) {
		const m = Number(modificador);
		const base = m >= 3 ? nivel : m >= 2 ? Math.floor(nivel / 2) : 1;
		pv = base + porCuidados + (curaAC ? nivel : 0) + (Number(refeicao.pv) || 0);
		pm = base + (Number(refeicao.pm) || 0);
		notas.push("Hedonista");
	}
	// Rato das Ruas (goblin, JdA): a recuperação nunca é inferior ao nível.
	if (tem(actor, "Rato das Ruas") && (pv < nivel || pm < nivel)) {
		pv = Math.max(pv, nivel);
		pm = Math.max(pm, nivel);
		notas.push("Rato das Ruas: no mínimo o nível");
	}
	await actor.update({ "system.attributes.pv.temp": 0, "system.attributes.pm.temp": 0, [`flags.${MODULE_ID}.-=refeicao`]: null });
	await actor.modifyTokenAttribute("attributes.pv", pv, true, true);
	await actor.modifyTokenAttribute("attributes.pm", pm, true, true);
	const descricao = `${actor.name} recuperou ${pv} PV e ${pm} PM${notas.length ? ` (${notas.join("; ")})` : ""}.`;
	// Começa um novo dia (teste diário das doenças).
	Hooks.callAll("t20cDescanso", actor);
	await opcoesDoDescanso(actor, Number(modificador), categoriaPV, nivel);
	if (!toChat) return descricao;
	const html = await foundry.applications.handlebars.renderTemplate("systems/tormenta20/templates/chat/chat-card.hbs", {
		item: { name: game.i18n.localize("T20.Rest"), img: "icons/svg/regen.svg" },
		system: { description: { value: `<p>${descricao}</p>` } }
	});
	await ChatMessage.create({ user: game.user.id, content: html });
	return descricao;
}

/**
 * Benefícios do descanso que dependem do jogador (regra por botão, nunca sozinha): cartão sussurrado ao dono.
 * - Aristocrata Dai'zenshi (origem, Atlas): sem testes de Enganação, Furtividade ou Ladinagem desde o último descanso,
 *   +1 PM temporário a cada dois níveis.
 * - Sono Reparador (Neruíte): dormindo em condição normal ou melhor, a recuperação de PV ou de PM sobe um passo.
 */
async function opcoesDoDescanso(actor, modificador, categoriaPV, nivel) {
	const botoes = [];
	if (actor.items.some((i) => /^Aristocrata Dai.zenshi$/.test(i.name)) && nivel >= 2) {
		botoes.push({ acao: "pmTemp", valor: Math.floor(nivel / 2), rotulo: `Não fiz testes de Enganação, Furtividade nem Ladinagem: +${Math.floor(nivel / 2)} PM temporários (Aristocrata Dai'zenshi)` });
	}
	if (tem(actor, "Sono Reparador") && modificador >= 1) {
		const extra = (de) => Math.floor(nivel * subirCategoria(de)) - Math.floor(nivel * de);
		if (extra(categoriaPV) > 0) botoes.push({ acao: "pv", valor: extra(categoriaPV), rotulo: `Sono Reparador: +${extra(categoriaPV)} PV (um passo acima)` });
		if (extra(modificador) > 0) botoes.push({ acao: "pm", valor: extra(modificador), rotulo: `Sono Reparador: +${extra(modificador)} PM (um passo acima)` });
	}
	if (!botoes.length) return;
	const donos = game.users.filter((u) => actor.testUserPermission(u, "OWNER")).map((u) => u.id);
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		whisper: donos,
		content: `<div class="t20c-aviso-nivel"><p><strong>${foundry.utils.escapeHTML(actor.name)}</strong>: benefícios do descanso.</p>${botoes.map((b) => `<button type="button" data-t20c-descanso="${b.acao}" data-valor="${b.valor}" data-ator="${actor.uuid}">${foundry.utils.escapeHTML(b.rotulo)}</button>`).join("")}${botoes.some((b) => b.acao !== "pmTemp") ? "<p><small>Sono Reparador: escolha PV ou PM (ou o sonho inspirador, +1d6 num teste, pela opção do poder).</small></p>" : ""}</div>`,
		flags: { [MODULE_ID]: { descanso: true } }
	});
}

async function usarBotaoDoDescanso(message, botao) {
	const actor = await fromUuid(botao.dataset.ator);
	if (!actor?.isOwner) return ui.notifications.warn("Só o dono do personagem usa esse botão.");
	const usados = message.getFlag(MODULE_ID, "usados") ?? [];
	const acao = botao.dataset.t20cDescanso;
	// Sono Reparador: PV ou PM, não os dois.
	if (usados.includes(acao) || (["pv", "pm"].includes(acao) && usados.some((u) => ["pv", "pm"].includes(u)))) return ui.notifications.info("Esse benefício já foi usado.");
	const valor = Number(botao.dataset.valor) || 0;
	if (acao === "pmTemp") await actor.update({ "system.attributes.pm.temp": (Number(actor.system.attributes.pm.temp) || 0) + valor });
	else await actor.modifyTokenAttribute(`attributes.${acao}`, valor, true, true);
	await message.setFlag(MODULE_ID, "usados", [...usados, acao]);
	ui.notifications.info(`${actor.name}: ${botao.textContent.trim()}`);
}

export default {
	id: "descanso",
	name: "Descanso pelas contas do livro",
	hint: "Cuidados prolongados somam +1 PV por nível (não dobram); pontos de vida e mana temporários somem com o descanso (JdA p. 106 e 117). Poderes que mudam o descanso: Rato das Ruas, Herança de Vitalia, Hedonista, Sucata; Aristocrata Dai'zenshi e Sono Reparador por botão.",
	init() {
		wrap("CONFIG.Actor.documentClass.prototype.descanso", function (wrapped, ...args) {
			return descansar(this, ...args);
		});
		Hooks.on("renderChatMessageHTML", (message, html) => {
			for (const botao of html.querySelectorAll?.("[data-t20c-descanso]") ?? []) {
				botao.addEventListener("click", () => usarBotaoDoDescanso(message, botao).catch((error) => console.error("tormenta20-correcoes | Falha no botão do descanso.", error)));
			}
		});
	}
};
