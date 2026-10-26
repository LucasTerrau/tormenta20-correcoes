import { MODULE_ID } from "../constants.mjs";
import { NOVOS_ITENS, PROGRESSAO } from "../migracao/classes-dados.mjs";
import { warn } from "../util.mjs";
import { decideAqui } from "./poderes-automaticos.mjs";

/**
 * Regra (JdA p. 35): ao subir de nível, "você ganha todas as habilidades do nível alcançado" (tabela de
 * cada classe). O sistema só muda o número de níveis da classe: o jogador tinha de arrastar cada
 * habilidade do compêndio na hora certa, e três delas nem existem no compêndio (Caminho do Arcanista,
 * Caminho do Cavaleiro, Bênção da Justiça). Sem o Caminho, o arcanista não somava o atributo-chave nos PM.
 * Correção: ao ganhar uma classe ou subir de nível nela, o módulo lista as habilidades fixas que faltam
 * até aquele nível e cria as marcadas (as escolhas, como poderes de classe, continuam com o jogador).
 * Arcanistas que já existiam sem o Caminho recebem a oferta uma vez.
 */
const slug = (texto) => String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");

export function faltando(actor, classe) {
	const nivel = Number(classe.system?.niveis) || 0;
	const tem = new Set(actor.items.map((i) => i.name));
	return (PROGRESSAO[slug(classe.name)] ?? []).filter((h) => h.nivel <= nivel && !tem.has(h.nome));
}

export async function dadosDa(habilidade) {
	if (habilidade.novo) {
		const dados = structuredClone(NOVOS_ITENS.find((i) => i._id === habilidade.novo));
		if (!dados) return null;
		delete dados._id;
		foundry.utils.setProperty(dados, `flags.${MODULE_ID}.itemDoLivro`, habilidade.novo);
		return dados;
	}
	const doc = await fromUuid(habilidade.uuid);
	return doc ? game.items.fromCompendium(doc) : null;
}

async function oferecer(actor, classe, lista) {
	if (!lista.length) return;
	const linhas = lista
		.map((h, i) => `<label style="display:block"><input type="checkbox" name="h${i}" checked> ${h.nivel}º nível: <strong>${h.nome}</strong></label>`)
		.join("");
	const marcadas = await foundry.applications.api.DialogV2.wait({
		window: { title: `${actor.name}: habilidades de ${classe.name}` },
		content: `<p>Habilidades da tabela de ${classe.name} até o ${classe.system.niveis}º nível que ainda não estão na ficha:</p>${linhas}<p style="opacity:.8">Poderes de classe e outras escolhas continuam à mão.</p>`,
		buttons: [
			{ action: "criar", label: "Adicionar marcadas", default: true, callback: (event, button) => lista.filter((h, i) => button.form.elements[`h${i}`]?.checked) },
			{ action: "nao", label: "Agora não" }
		],
		rejectClose: false
	});
	if (!Array.isArray(marcadas) || !marcadas.length) return marcadas === "nao" ? "recusou" : null;
	const dados = (await Promise.all(marcadas.map(dadosDa))).filter(Boolean);
	if (dados.length) await actor.createEmbeddedDocuments("Item", dados);
	return "criou";
}

async function aoMudarClasse(classe) {
	const actor = classe.parent;
	if (actor?.documentName !== "Actor" || actor.type !== "character") return;
	await oferecer(actor, classe, faltando(actor, classe));
}

export default {
	id: "subirNivel",
	name: "Habilidades da classe ao subir de nível",
	hint: "Ao ganhar uma classe ou subir de nível nela, oferece as habilidades fixas da tabela que faltam na ficha (inclusive Caminho do Arcanista, Caminho do Cavaleiro e Bênção da Justiça, que faltam no compêndio). JdA p. 35.",
	init() {
		// Com o assistente de criação ou de subir de nível, as habilidades já vêm com ele.
		Hooks.on("createItem", (item, options, userId) => {
			if (userId !== game.userId || item.type !== "classe" || options.t20cAssistente) return;
			aoMudarClasse(item).catch((error) => warn("Falha ao oferecer as habilidades da classe.", error));
		});
		Hooks.on("updateItem", (item, changes, options, userId) => {
			if (userId !== game.userId || item.type !== "classe" || options.t20cAssistente || !foundry.utils.hasProperty(changes, "system.niveis")) return;
			aoMudarClasse(item).catch((error) => warn("Falha ao oferecer as habilidades da classe.", error));
		});
	},
	async ready() {
		// Arcanistas criados antes da correção: o Caminho define o atributo-chave dos PM. Pergunta uma vez.
		for (const actor of game.actors.filter((a) => a.type === "character" && decideAqui(a) && !a.getFlag(MODULE_ID, "caminhoOferecido"))) {
			const classe = actor.items.find((i) => i.type === "classe" && slug(i.name) === "arcanista");
			if (!classe || actor.items.some((i) => i.name === "Caminho do Arcanista")) continue;
			const lista = faltando(actor, classe).filter((h) => h.novo);
			try {
				const resultado = await oferecer(actor, classe, lista);
				if (resultado) await actor.setFlag(MODULE_ID, "caminhoOferecido", true);
			} catch (error) {
				warn("Falha ao oferecer o Caminho do Arcanista.", error);
			}
		}
	}
};
