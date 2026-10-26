import { MODULE_ID } from "../constants.mjs";
import { conteudo } from "../criador/fontes.mjs";
import { escapar } from "../criador/regras.mjs";
import { conjurador } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";
import { decideAqui } from "./poderes-automaticos.mjs";

/**
 * Poderes em que o jogador escolhe magias ("uma magia arcana de 1º círculo a sua escolha", "duas das magias a seguir",
 * "escolha uma magia que possa lançar", "escolha uma escola") não faziam nada: a magia não ia para a ficha e o desconto
 * de –1 PM valia para todas as magias (Foco em Magia, Mestre em Escola).
 * Correção: ao receber o poder (ou ao abrir o mundo, se ainda não escolheu), uma janela pede a escolha; as magias vão
 * para a ficha marcadas como concedidas (atributo-chave e tipo do texto). Distinções que dão mais magias a cada dois
 * outros poderes perguntam de novo quando o número cresce. Foco em Magia e Mestre em Escola passam a descontar só na
 * magia ou na escola escolhida (o desconto entra sozinho no diálogo).
 */
const slug = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const outrosDaDistincao = (item) => (item.actor?.itemTypes?.poder ?? []).filter((i) => i.id !== item.id && slug(i.system?.subtipo) === slug(item.system?.subtipo)).length;

/** Nome do poder → regra da escolha. lista: nomes do livro; filtro: tipo/círculo/escola; quantidade(item). */
const ESCOLHAS = {
	"Estudante da Academia": { subtipos: ["Academia Arcana"], filtro: { tipo: "arc", circulo: 1 }, quantidade: () => 1, atributo: "int", tipo: "arc" },
	"Dádivas do Dragão": { subtipos: ["Tirano do Terceiro"], filtro: { tipo: "div", circulo: 1 }, quantidade: (item) => 1 + Math.floor(outrosDaDistincao(item) / 2), atributo: "sab", tipo: "div" },
	"Auxiliar Divino (Marca)": { subtipos: ["Taumaturgista"], lista: ["Conjurar Monstro", "Montaria Arcana", "Servos Invisíveis"], quantidade: (item) => 1 + Math.floor(outrosDaDistincao(item) / 2), tipo: "div" },
	"Pena e Pergaminho (Marca)": { subtipos: ["Professor de Magia"], filtro: { escola: "adv", circulo: "acesso" }, quantidade: () => 1 },
	"Elo Com a Natureza Maior": { subtipos: ["Caçador"], lista: ["Abençoar Alimentos", "Acalmar Animal", "Alarme", "Aviso", "Conjurar Armadilha", "Detectar Ameaças", "Orientação", "Suporte Ambiental"], quantidade: () => 2, atributo: "sab", tipo: "div" },
	Espiritualista: { subtipos: ["Bárbaro"], lista: ["Augúrio", "Voz Divina", "Mapear", "Físico Divino", "Localização", "Camuflagem Ilusória", "Vestimenta da Fé", "Soco do Mestre"], quantidade: () => 1, atributo: "sab", rotulo: "a magia do seu animal totêmico" },
	"Canção dos Mares": { subtipos: ["Sereia/tritão"], lista: ["Amedrontar", "Comando", "Despedaçar", "Enfeitiçar", "Hipnotismo", "Sono"], quantidade: () => 2, atributo: "car" },
	"Magia das Fadas": { subtipos: ["Sílfide"], lista: ["Criar Ilusão", "Enfeitiçar", "Luz", "Sono"], quantidade: () => 2, atributo: "car", tipo: "arc" },
	"Foco em Magia": { especial: "foco" },
	"Mestre em Escola": { especial: "escola" }
};

const regraDe = (item) => {
	const r = ESCOLHAS[item.name];
	return r && (!r.subtipos || r.subtipos.some((s) => slug(s) === slug(item.system?.subtipo))) ? r : null;
};

/** Mesmo nome sem acento e com plural na última palavra ("Conjurar Armadilhas" = "Conjurar Armadilha"). */
const casa = (a, b) => {
	const x = slug(a);
	const y = slug(b);
	return x === y || x.replace(/(oes|s)$/, "") === y.replace(/(ao|s)$/, "") || y.replace(/(oes|s)$/, "") === x.replace(/(ao|s)$/, "");
};

async function candidatas(item, regra) {
	const actor = item.actor;
	const { magias } = await conteudo();
	const jaTem = new Set(actor.itemTypes.magia.map((m) => slug(m.name)));
	let lista;
	if (regra.lista) lista = regra.lista.map((n) => magias.find((m) => casa(m.name, n))).filter(Boolean);
	else {
		const f = regra.filtro;
		let teto = f.circulo;
		if (teto === "acesso") teto = Math.max(1, ...["arc", "div"].map((tipo) => Number(conjurador(actor, { system: { tipo, circulo: 1 }, flags: {} }).circulo) || 0));
		lista = magias.filter((m) => (!f.tipo || m.system?.tipo === f.tipo || m.system?.tipo === "uni") && (!f.escola || m.system?.escola === f.escola) && (Number(m.system?.circulo) || 1) <= teto);
	}
	const vistos = new Set();
	return lista.filter((m) => !jaTem.has(slug(m.name)) && !vistos.has(slug(m.name)) && vistos.add(slug(m.name))).sort((a, b) => (a.system?.circulo ?? 1) - (b.system?.circulo ?? 1) || a.name.localeCompare(b.name));
}

async function perguntar({ titulo, texto, opcoes, max }) {
	const tipo = max === 1 ? "radio" : "checkbox";
	const linhas = opcoes.map((o) => `<label class="t20c-check"><input type="${tipo}" name="opcao" value="${escapar(o.valor)}"> ${escapar(o.rotulo)}${o.sub ? ` <small class="t20c-mudo">${escapar(o.sub)}</small>` : ""}</label>`).join("");
	return foundry.applications.api.DialogV2.wait({
		window: { title: titulo, icon: "fa-solid fa-wand-sparkles" },
		classes: ["t20c-apagar-classe"],
		content: `<p>${texto}</p><div class="t20c-apagar-lista">${linhas}</div>`,
		buttons: [
			{
				action: "ok",
				label: "Escolher",
				icon: "fa-solid fa-check",
				default: true,
				callback: (event, botao) => {
					const marcados = [...botao.form.querySelectorAll("input[name=opcao]:checked")].map((i) => i.value);
					if (!marcados.length || marcados.length > max) {
						ui.notifications.warn(`Escolha ${max === 1 ? "uma opção" : `até ${max} opções`}.`);
						return false;
					}
					return marcados;
				}
			},
			{ action: "depois", label: "Agora não", icon: "fa-solid fa-xmark" }
		],
		rejectClose: false
	});
}

const NOMES_DE_ESCOLA = () => Object.fromEntries(Object.entries(CONFIG.T20?.spellSchools ?? {}).map(([k, v]) => [k, game.i18n.localize(v)]));

async function escolherPara(item) {
	const regra = regraDe(item);
	if (!regra) return;
	const actor = item.actor;
	const marca = item.getFlag(MODULE_ID, "escolhaDeMagia") ?? {};
	if (regra.especial === "escola") {
		if (marca.escola || marca.recusado) return;
		const escolas = NOMES_DE_ESCOLA();
		const r = await perguntar({ titulo: `${item.name}: escolha a escola`, texto: `${escapar(actor.name)}: o custo das magias da escola escolhida diminui em –1 PM.`, opcoes: Object.entries(escolas).map(([valor, rotulo]) => ({ valor, rotulo })), max: 1 });
		await item.setFlag(MODULE_ID, "escolhaDeMagia", Array.isArray(r) ? { escola: r[0] } : { recusado: true });
		return;
	}
	if (regra.especial === "foco") {
		if (marca.magias?.length || marca.recusado) return;
		const focadas = new Set(actor.itemTypes.poder.filter((p) => p.name === "Foco em Magia" && p.id !== item.id).flatMap((p) => p.getFlag(MODULE_ID, "escolhaDeMagia")?.magias ?? []));
		const opcoes = actor.itemTypes.magia.filter((m) => !focadas.has(m.name)).map((m) => ({ valor: m.name, rotulo: m.name, sub: `${m.system?.circulo ?? 1}º círculo` }));
		if (!opcoes.length) return;
		const r = await perguntar({ titulo: "Foco em Magia: escolha a magia", texto: `${escapar(actor.name)}: o custo da magia escolhida diminui em –1 PM.`, opcoes, max: 1 });
		await item.setFlag(MODULE_ID, "escolhaDeMagia", Array.isArray(r) ? { magias: r } : { recusado: true });
		return;
	}
	const quantidade = regra.quantidade(item);
	const feitas = marca.magias ?? [];
	const faltam = quantidade - feitas.length;
	if (faltam <= 0 || (marca.recusadoAte ?? 0) >= quantidade) return;
	const opcoes = (await candidatas(item, regra)).map((m) => ({ valor: m.uuid, rotulo: m.name, sub: `${m.system?.circulo ?? 1}º círculo` }));
	if (!opcoes.length) return;
	const r = await perguntar({
		titulo: `${item.name}: escolha ${faltam > 1 ? `${faltam} magias` : "a magia"}`,
		texto: `${escapar(actor.name)} aprende ${escapar(regra.rotulo ?? (faltam > 1 ? `${faltam} magias` : "uma magia"))} de <strong>${escapar(item.name)}</strong>${regra.atributo ? ` (atributo-chave ${escapar(game.i18n.localize(CONFIG.T20?.atributos?.[regra.atributo] ?? regra.atributo))})` : ""}.`,
		opcoes,
		max: faltam
	});
	if (!Array.isArray(r)) return item.setFlag(MODULE_ID, "escolhaDeMagia", { ...marca, recusadoAte: quantidade });
	const criar = [];
	for (const uuid of r) {
		const doc = await fromUuid(uuid);
		if (!doc) continue;
		const dados = doc.toObject();
		delete dados._id;
		if (regra.tipo) dados.system.tipo = regra.tipo;
		dados.flags = { ...(dados.flags ?? {}), [MODULE_ID]: { ...(dados.flags?.[MODULE_ID] ?? {}), concedida: { poder: item.name, atributo: regra.atributo ?? null, tipo: regra.tipo ?? null } } };
		criar.push(dados);
	}
	if (criar.length) await actor.createEmbeddedDocuments("Item", criar);
	await item.setFlag(MODULE_ID, "escolhaDeMagia", { ...marca, magias: [...feitas, ...criar.map((d) => d.name)] });
}

const emAndamento = new Set();
async function escolherTudo(actor) {
	if (actor?.type !== "character" || !decideAqui(actor) || emAndamento.has(actor.id)) return;
	emAndamento.add(actor.id);
	try {
		for (const item of actor.itemTypes.poder) if (regraDe(item)) await escolherPara(item);
	} finally {
		emAndamento.delete(actor.id);
	}
}

/** Foco em Magia e Mestre em Escola: o desconto vale só na magia ou na escola escolhida e entra sozinho (só na memória). */
function descontosEscolhidos(actor) {
	for (const item of actor.itemTypes?.poder ?? []) {
		const regra = regraDe(item);
		if (!regra?.especial) continue;
		const marca = item.getFlag(MODULE_ID, "escolhaDeMagia");
		const nomes = regra.especial === "foco" ? (marca?.magias ?? []) : marca?.escola ? actor.itemTypes.magia.filter((m) => m.system?.escola === marca.escola).map((m) => m.name) : [];
		if (!nomes.length) continue;
		// O sistema aceita o efeito se o tipo OU o nome bater: com o tipo "spell", valeria para toda magia.
		for (const ef of item.effects) {
			const uso = ef.system?.abilityUse;
			if (!ef.system?.onuse || !uso) continue;
			uso.types = new Set();
			uso.names = new Set(nomes);
			uso.automatic = true;
		}
	}
}

export default {
	id: "escolhasDeMagia",
	name: "Escolhas de magia dos poderes",
	hint: "Poderes que dão magias à escolha (Estudante da Academia, Dádivas do Dragão, Auxiliar Divino, Pena e Pergaminho, Elo com a Natureza Maior, Espiritualista, Canção dos Mares, Magia das Fadas) perguntam quais magias e as põem na ficha. Foco em Magia e Mestre em Escola perguntam a magia ou a escola e descontam só nela.",
	init() {
		const tentar = (actor) => escolherTudo(actor).catch((error) => warn("Falha na escolha de magias do poder.", error));
		Hooks.once("ready", async () => {
			for (const actor of game.actors.filter((a) => a.type === "character")) await tentar(actor);
		});
		Hooks.on("createItem", (item, options, userId) => {
			if (userId !== game.userId || item.type !== "poder" || item.parent?.documentName !== "Actor") return;
			tentar(item.parent);
		});
		wrap("CONFIG.Actor.documentClass.prototype.applyActiveEffects", function (wrapped, phase, ...args) {
			const resultado = wrapped(phase, ...args);
			if (phase === "final") {
				try {
					descontosEscolhidos(this);
				} catch (error) {
					warn("Falha ao limitar o desconto escolhido.", error);
				}
			}
			return resultado;
		});
	}
};
