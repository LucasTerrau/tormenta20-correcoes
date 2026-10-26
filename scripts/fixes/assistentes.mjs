import { MODULE_ID } from "../constants.mjs";
import { CriacaoDePersonagem } from "../criador/criacao.mjs";
import { SubirDeNivel } from "../criador/nivel.mjs";
import { dados } from "../criador/fontes.mjs";
import { escapar, normalizar, xpDoNivel } from "../criador/regras.mjs";
import { warn } from "../util.mjs";
import { decideAqui } from "./poderes-automaticos.mjs";

/**
 * Assistentes de criação de personagem e de subir de nível (JdA p. 16–17, 35, 85 e 140).
 * - Ficha de personagem sem classe: botão "Criar personagem". Com classe: "Subir de nível".
 * - Aba de atores: botão para criar um personagem novo já pelo assistente. Jogador sem a permissão "Criar novos atores"
 *   (desligada para jogadores no Foundry) pede pelo socket: o mestre conectado cria a ficha com o jogador como dono e o
 *   assistente abre para o jogador. Se ele já tem uma ficha sem classe, o assistente abre nela em vez de pedir outra.
 * - Classe apagada da ficha: pergunta se apaga também as habilidades dela e os poderes da classe (a variante usa os
 *   poderes da básica), menos os que outra classe da ficha ainda usa.
 * - Quando a XP alcança o próximo nível (Tabela 1-4), o dono do personagem recebe no chat um cartão com o
 *   botão do assistente (uma vez por nível).
 */
export function abrirCriacao(actor) {
	if (actor.items.some((i) => i.type === "classe")) ui.notifications.warn(`${actor.name} já tem classe: o assistente de criação foi feito para fichas novas.`);
	return new CriacaoDePersonagem(actor).render({ force: true });
}

export function abrirSubirDeNivel(actor) {
	return new SubirDeNivel(actor).render({ force: true });
}

const CANAL = `module.${MODULE_ID}`;
/** Pedido de ficha que este jogador mandou ao mestre (a ficha chega com a mesma marca e o assistente abre). */
let pedido = null;

async function novoPersonagem() {
	if (game.user.can("ACTOR_CREATE")) {
		const actor = await Actor.create({ name: "Novo personagem", type: "character" });
		if (actor) abrirCriacao(actor);
		return;
	}
	const dono = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
	const semClasse = game.actors.find((a) => a.type === "character" && a.ownership?.[game.user.id] === dono && !a.items.some((i) => i.type === "classe"));
	if (semClasse) {
		ui.notifications.info(`Você já tem uma ficha sem classe (${semClasse.name}): o assistente abre nela.`);
		return abrirCriacao(semClasse);
	}
	if (!game.users.activeGM) {
		return ui.notifications.warn("Nenhum mestre conectado para criar a ficha. Peça ao mestre, ou para ele ligar \"Criar novos atores\" para jogadores (Configurações → Permissões de usuário).", { permanent: true });
	}
	const meu = (pedido = foundry.utils.randomID());
	game.socket.emit(CANAL, { tipo: "criarPersonagem", usuario: game.user.id, pedido: meu });
	ui.notifications.info("Pedindo ao mestre para criar a sua ficha…");
	// O servidor só repassa o pedido se o mundo foi aberto já com esta versão do módulo (module.json com "socket").
	setTimeout(() => {
		if (pedido !== meu) return;
		pedido = null;
		ui.notifications.warn("O mestre não respondeu ao pedido de ficha. Se o módulo acabou de ser atualizado, o mestre precisa fechar e abrir o mundo de novo; ou ele pode ligar \"Criar novos atores\" para jogadores.", { permanent: true });
	}, 10000);
}

/** Lado do mestre: cria a ficha do jogador (dono só ele) e, se ele ainda não tem personagem, a deixa como o dele. */
async function criarParaJogador({ usuario, pedido }) {
	if (!game.user.isActiveGM) return;
	const user = game.users.get(usuario);
	if (!user || user.isGM) return;
	const actor = await Actor.create({
		name: "Novo personagem",
		type: "character",
		ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE, [user.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER },
		flags: { [MODULE_ID]: { pedido } }
	});
	if (actor && !user.character) await user.update({ character: actor.id });
}

/**
 * Habilidades (poder do tipo "ability") e poderes de classe (tipo "classe") da classe apagada: o subtipo deles é o nome
 * da classe; os poderes de uma variante são os da classe básica. Fica o que outra classe da ficha ainda usa.
 */
async function itensDaClasse(actor, classe) {
	const CLASSES = (await dados())?.CLASSES ?? {};
	const tabela = (nome) => Object.values(CLASSES).find((c) => normalizar(c.nome) === normalizar(nome));
	const daTabela = tabela(classe.name);
	const ficam = new Set();
	for (const outra of actor.items.filter((i) => i.type === "classe" && i.id !== classe.id)) {
		ficam.add(normalizar(outra.name));
		const variante = tabela(outra.name)?.variante;
		if (variante) ficam.add(normalizar(CLASSES[variante]?.nome));
	}
	const habilidades = new Set([normalizar(classe.name)]);
	const poderes = new Set([normalizar(classe.name), normalizar(CLASSES[daTabela?.variante]?.nome)].filter(Boolean));
	// Item de habilidade sem subtipo: vale o nome na tabela de níveis da classe.
	const nomesDaTabela = new Set(
		Object.values(daTabela?.niveis ?? {})
			.flat()
			.flatMap((h) => [h.nome, ...(h.escolha ?? []).map((o) => o.nome)])
			.filter(Boolean)
			.map(normalizar)
	);
	return actor.items.filter((i) => {
		if (i.type !== "poder") return false;
		const tipo = i.system?.tipo;
		const sub = normalizar(i.system?.subtipo);
		if (sub && ficam.has(sub)) return false;
		if (tipo === "ability") return sub ? habilidades.has(sub) : nomesDaTabela.has(normalizar(i.name));
		return tipo === "classe" && poderes.has(sub);
	});
}

async function perguntarPoderesDaClasse(actor, classe) {
	const itens = await itensDaClasse(actor, classe);
	if (!itens.length) return;
	const linhas = itens
		.sort((a, b) => (a.system.tipo === b.system.tipo ? a.name.localeCompare(b.name) : a.system.tipo === "ability" ? -1 : 1))
		.map((i) => `<label class="t20c-check"><input type="checkbox" name="${i.id}" checked> ${escapar(i.name)} <small class="t20c-mudo">${i.system.tipo === "ability" ? "habilidade" : "poder"}</small></label>`)
		.join("");
	const ids = await foundry.applications.api.DialogV2.wait({
		window: { title: `${classe.name} saiu da ficha`, icon: "fa-solid fa-trash" },
		classes: ["t20c-apagar-classe"],
		content: `<p>Apagar também as habilidades e os poderes de ${escapar(classe.name)} que ficaram em ${escapar(actor.name)}? Desmarque o que quiser manter.</p><div class="t20c-apagar-lista">${linhas}</div>`,
		buttons: [
			{ action: "apagar", label: "Apagar os marcados", icon: "fa-solid fa-trash", default: true, callback: (event, botao) => [...botao.form.querySelectorAll("input[type=checkbox]:checked")].map((c) => c.name) },
			{ action: "manter", label: "Manter tudo", icon: "fa-solid fa-xmark" }
		],
		rejectClose: false
	});
	const apagar = Array.isArray(ids) ? ids.filter((id) => actor.items.has(id)) : [];
	if (apagar.length) await actor.deleteEmbeddedDocuments("Item", apagar);
}

async function avisarNivel(actor) {
	const nivel = Number(actor.system?.attributes?.nivel?.value) || 0;
	const xp = Number(actor.system?.attributes?.nivel?.xp?.value) || 0;
	if (nivel < 1 || nivel >= 20 || xp < xpDoNivel(nivel + 1)) return;
	if ((Number(actor.getFlag(MODULE_ID, "avisoDeNivel")) || 0) >= nivel + 1) return;
	await actor.setFlag(MODULE_ID, "avisoDeNivel", nivel + 1);
	const donos = game.users.filter((u) => actor.testUserPermission(u, "OWNER")).map((u) => u.id);
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		whisper: donos,
		content: `<div class="t20c-aviso-nivel"><p><strong>${foundry.utils.escapeHTML(actor.name)}</strong> tem XP para o ${nivel + 1}º nível.</p><button type="button" data-t20c-subir="${actor.uuid}"><i class="fa-solid fa-angles-up"></i> Subir de nível</button></div>`
	});
}

export default {
	id: "assistentes",
	name: "Assistentes de criação e de subir de nível",
	hint: "Criação passo a passo (atributos por pontos ou rolagem, raça, classe, origem, divindade, perícias, magias, equipamento) e subir de nível com as habilidades da tabela, o poder, as magias e a multiclasse. Botões na ficha e na aba de atores (jogador sem permissão de criar atores pede, e o mestre conectado cria a ficha para ele); ao apagar uma classe, oferece apagar as habilidades e os poderes dela; aviso no chat quando a XP chega ao próximo nível (JdA p. 16–17, 35, 85, 140).",
	init() {
		Hooks.on("getActorSheetHeaderButtons", (app, botoes) => {
			const actor = app.document ?? app.actor;
			if (actor?.type !== "character" || !actor.isOwner) return;
			const temClasse = actor.items.some((i) => i.type === "classe");
			botoes.unshift(
				temClasse
					? { label: "Subir de nível", class: "t20c-subir", icon: "fa-solid fa-angles-up", onclick: () => abrirSubirDeNivel(actor) }
					: { label: "Criar personagem", class: "t20c-criar", icon: "fa-solid fa-user-plus", onclick: () => abrirCriacao(actor) }
			);
		});
		Hooks.on("deleteItem", (item, options, userId) => {
			if (userId !== game.userId || item.type !== "classe" || item.parent?.type !== "character" || options.t20cSemPerguntar) return;
			perguntarPoderesDaClasse(item.parent, item).catch((error) => warn("Falha ao oferecer apagar os poderes da classe.", error));
		});
		Hooks.on("updateActor", (actor, changes) => {
			if (actor.type !== "character" || !foundry.utils.hasProperty(changes, "system.attributes.nivel.xp.value") || !decideAqui(actor)) return;
			avisarNivel(actor).catch((error) => warn("Falha ao avisar o novo nível.", error));
		});
		Hooks.on("renderChatMessageHTML", (message, html) => {
			const botao = html.querySelector?.("[data-t20c-subir]");
			if (!botao) return;
			botao.addEventListener("click", async () => {
				const actor = await fromUuid(botao.dataset.t20cSubir);
				if (!actor?.isOwner) return ui.notifications.warn("Só o dono do personagem sobe de nível.");
				abrirSubirDeNivel(actor);
			});
		});
		Hooks.on("renderActorDirectory", (app, html) => {
			const raiz = html instanceof HTMLElement ? html : html?.[0];
			const acoes = raiz?.querySelector(".header-actions");
			if (!acoes || acoes.querySelector(".t20c-novo-personagem")) return;
			const botao = document.createElement("button");
			botao.type = "button";
			botao.className = "t20c-novo-personagem";
			botao.innerHTML = `<i class="fa-solid fa-user-plus"></i> Criar personagem`;
			botao.addEventListener("click", () => novoPersonagem().catch((error) => warn("Falha ao criar o personagem.", error)));
			acoes.appendChild(botao);
		});
		Hooks.on("createActor", (actor) => {
			if (!pedido || actor.getFlag(MODULE_ID, "pedido") !== pedido) return;
			pedido = null;
			abrirCriacao(actor);
		});
		const modulo = game.modules.get(MODULE_ID);
		Hooks.once("ready", () => {
			game.socket.on(CANAL, (dados) => {
				if (dados?.tipo === "criarPersonagem") criarParaJogador(dados).catch((error) => warn("Falha ao criar a ficha pedida pelo jogador.", error));
			});
			modulo.api = { ...(modulo.api ?? {}), criarPersonagem: abrirCriacao, subirDeNivel: abrirSubirDeNivel };
		});
	}
};
