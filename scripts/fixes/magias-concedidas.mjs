import { MODULE_ID } from "../constants.mjs";
import { warn } from "../util.mjs";
import { MAGIAS_CONCEDIDAS } from "./concessoes-dados.mjs";
import { decideAqui } from "./poderes-automaticos.mjs";

/**
 * Poderes que dão magia ("Você aprende e pode lançar Amedrontar", "pode lançar Luz (como uma magia divina;
 * atributo-chave Carisma)", Ditames com magias no 6º, 10º e 14º nível…) não punham a magia na ficha: o jogador
 * tinha de achar e arrastar, e o atributo-chave e o tipo ficavam errados.
 * Correção: com o poder na ficha (e o nível alcançado), a magia é adicionada com a marca "concedida" (atributo-chave e
 * tipo do texto; quem não é conjurador pode lançá-la, ver magia/regras.mjs). O poder guarda o que já concedeu: magia
 * apagada à mão não volta. Tabela gerada do texto dos poderes (concessoes-dados.mjs); escolhas ("duas das magias a
 * seguir") ficam com o jogador.
 */
const slug = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** Magias que os poderes do personagem já deviam ter dado, pelo nível atual. */
function devidas(actor) {
	const nivel = Number(actor.system?.attributes?.nivel?.value) || 1;
	const lista = [];
	for (const poder of actor.itemTypes?.poder ?? []) {
		const dado = MAGIAS_CONCEDIDAS[poder.name];
		if (!dado || !dado.subtipos.some((s) => slug(s) === slug(poder.system?.subtipo))) continue;
		const feitas = poder.getFlag(MODULE_ID, "magiasConcedidas") ?? [];
		for (const m of dado.magias) if ((m.nivel ?? 0) <= nivel && !feitas.includes(m.nome)) lista.push({ poder, magia: m });
	}
	return lista;
}

const emAndamento = new Set();

/** Magias já concedidas seguem a tabela (atributo-chave e tipo), se ela mudou depois. */
async function atualizarConcedidas(actor) {
	const mudancas = [];
	for (const magia of actor.itemTypes?.magia ?? []) {
		const marca = magia.getFlag(MODULE_ID, "concedida");
		const dado = marca && MAGIAS_CONCEDIDAS[marca.poder]?.magias.find((m) => m.nome === magia.name);
		if (!dado || ((dado.atributo ?? null) === marca.atributo && (dado.tipo ?? null) === marca.tipo)) continue;
		mudancas.push({ _id: magia.id, [`flags.${MODULE_ID}.concedida`]: { ...marca, atributo: dado.atributo ?? null, tipo: dado.tipo ?? null }, ...(dado.tipo ? { "system.tipo": dado.tipo } : {}) });
	}
	if (mudancas.length) await actor.updateEmbeddedDocuments("Item", mudancas);
}

async function conceder(actor) {
	if (actor?.type !== "character" || !decideAqui(actor) || emAndamento.has(actor.id)) return;
	await atualizarConcedidas(actor);
	const lista = devidas(actor);
	if (!lista.length) return;
	emAndamento.add(actor.id);
	try {
		const criar = [];
		const porPoder = new Map();
		for (const { poder, magia } of lista) {
			porPoder.set(poder, [...(porPoder.get(poder) ?? []), magia.nome]);
			if (actor.itemTypes.magia.some((i) => i.name === magia.nome) || criar.some((d) => d.name === magia.nome)) continue;
			const doc = await fromUuid(magia.uuid);
			if (!doc) continue;
			const dados = doc.toObject();
			delete dados._id;
			if (magia.tipo) dados.system.tipo = magia.tipo;
			dados.flags = { ...(dados.flags ?? {}), [MODULE_ID]: { ...(dados.flags?.[MODULE_ID] ?? {}), concedida: { poder: poder.name, atributo: magia.atributo ?? null, tipo: magia.tipo ?? null } } };
			criar.push(dados);
		}
		if (criar.length) await actor.createEmbeddedDocuments("Item", criar);
		for (const [poder, nomes] of porPoder) await poder.setFlag(MODULE_ID, "magiasConcedidas", [...new Set([...(poder.getFlag(MODULE_ID, "magiasConcedidas") ?? []), ...nomes])]);
		if (criar.length) ui.notifications.info(`${actor.name} recebeu ${criar.map((d) => d.name).join(", ")} (magias concedidas por ${[...new Set(lista.filter((x) => criar.some((d) => d.name === x.magia.nome)).map((x) => x.poder.name))].join(", ")}).`);
	} finally {
		emAndamento.delete(actor.id);
	}
}

export default {
	id: "magiasConcedidas",
	name: "Magias concedidas por poderes",
	hint: "O poder que dá uma magia (Olhar Amedrontador, Luz Sagrada, Ditames…) põe a magia na ficha, com o atributo-chave e o tipo do texto, no nível certo. Quem não é conjurador pode lançá-la. Teurgista Místico e Linhagem Abençoada deixam lançar magias do outro tipo.",
	init() {
		const tentar = (actor) => conceder(actor).catch((error) => warn("Falha ao conceder as magias do poder.", error));
		Hooks.once("ready", async () => {
			for (const actor of game.actors.filter((a) => a.type === "character")) await tentar(actor);
		});
		Hooks.on("createItem", (item, options, userId) => {
			if (userId !== game.userId || !["poder", "classe"].includes(item.type) || item.parent?.documentName !== "Actor") return;
			tentar(item.parent);
		});
		Hooks.on("updateItem", (item, changes, options, userId) => {
			if (userId !== game.userId || item.type !== "classe" || !foundry.utils.hasProperty(changes, "system.niveis") || item.parent?.documentName !== "Actor") return;
			tentar(item.parent);
		});
	}
};
