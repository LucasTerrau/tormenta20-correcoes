import { wrap } from "../util.mjs";

/**
 * Bug: o diálogo de Atributos Dinâmicos das raças (Humano "+1 em três atributos diferentes",
 * Kallyanach "+2 em um ou +1 em dois"…) aceita qualquer coisa: +6 num atributo, decimais, nenhum
 * atributo. Fechar a janela criava a raça só com os modificadores fixos, sem aviso.
 * Correção: a regra é lida do texto da raça e o botão Aplicar só funciona com uma escolha válida.
 * Fechar a janela cancela a raça (nada muda na ficha). Com Raças Abertas, o jogador distribui
 * exatamente os modificadores da raça. O bônus escolhido pode cair num atributo que já tem bônus
 * fixo quando o texto não diz "outro" (os atributos proibidos já ficam fora da lista).
 * Substitui ItemT20#_onCreateOwnedRace, repetindo o que o sistema faz depois da escolha.
 */
const NUMEROS = { um: 1, uma: 1, outro: 1, outra: 1, dois: 2, duas: 2, tres: 3, "três": 3 };

/** Escolhas válidas, cada uma como valores em ordem decrescente: "+2 em um ou +1 em dois" -> ["2", "1,1"]. null = sem regra legível. */
export function alternativas(raca, aberta) {
	const { atributos, atributosDinamicos } = raca.system;
	let opcoes = [];
	if (atributosDinamicos.value.size) {
		for (const parte of String(atributosDinamicos.description ?? "").split(/\bou\b/i)) {
			const valores = [...parte.matchAll(/\+(\d)\s+em\s+(um|uma|outro|outra|dois|duas|tr[eê]s)\b/gi)].flatMap((m) =>
				Array(NUMEROS[m[2].toLowerCase()]).fill(Number(m[1]))
			);
			if (valores.length) opcoes.push(valores);
		}
		if (!opcoes.length) return null;
	}
	if (aberta) {
		const fixos = Object.values(atributos).filter((v) => v);
		opcoes = (opcoes.length ? opcoes : [[]]).map((o) => [...fixos, ...o]);
	}
	return opcoes.map((o) => o.sort((a, b) => b - a).join(","));
}

let ATUAL = null;

function validar(form) {
	const valores = [...form.querySelectorAll('input[type="number"]')].map((i) => (i.value === "" ? 0 : Number(i.value)));
	if (valores.some((v) => !Number.isInteger(v))) return "Use apenas números inteiros.";
	if (!ATUAL.aberta && valores.some((v) => v < 0)) return "Valores negativos não são permitidos.";
	if (!ATUAL.opcoes) return null;
	const escolha = valores.filter((v) => v).sort((a, b) => b - a).join(",");
	if (ATUAL.opcoes.includes(escolha)) return null;
	const legivel = ATUAL.opcoes.map((o) => o.split(",").map((v) => (v > 0 ? `+${v}` : v)).join(" ")).join(" ou ");
	return ATUAL.aberta
		? `Raças Abertas: distribua exatamente os modificadores da raça (${legivel}), um por atributo.`
		: `Escolha conforme a raça: ${ATUAL.descricao} (${legivel}, um por atributo).`;
}

async function criarRaca(item) {
	const updates = {};
	const changes = Object.fromEntries(Object.entries(item.system.atributos).map(([key, valor]) => [`system.atributos.${key}.racial`, valor]));
	const aberta = game.settings.get("tormenta20", "openRaces");
	const { atributosDinamicos, grants } = item.system;
	// O assistente de criação já escolheu os modificadores raciais (valor final de cada atributo).
	const doAssistente = item._t20cRacial;
	delete item._t20cRacial;
	if (doAssistente) {
		for (const key of Object.keys(CONFIG.T20.atributos)) changes[`system.atributos.${key}.racial`] = Number(doAssistente[key]) || 0;
	} else if (atributosDinamicos.value.size || aberta) {
		const description = aberta ? "Distribua os atributos da sua raça" : atributosDinamicos.description;
		const atributosList = aberta ? Object.keys(CONFIG.T20.atributos) : atributosDinamicos.value;
		ATUAL = { aberta, opcoes: alternativas(item, aberta), descricao: description };
		let escolha;
		try {
			escolha = await foundry.applications.api.DialogV2.wait({
				window: { contentClasses: ["standard-form", "attribute-config", "t20c-atributos-dinamicos"], title: "Atributos Dinâmicos" },
				position: { width: 400 },
				content: await foundry.applications.handlebars.renderTemplate("systems/tormenta20/templates/apps/dynamic-attributes-dialog.hbs", {
					config: CONFIG.T20,
					description,
					atributosList
				}),
				buttons: [
					{
						action: "apply",
						label: game.i18n.localize("T20.Apply"),
						callback: (event, button) => new foundry.applications.ux.FormDataExtended(button.form).object
					}
				]
			});
		} finally {
			ATUAL = null;
		}
		if (!escolha) {
			item._t20cRacaCancelada = true;
			ui.notifications.info(`${item.name} não foi adicionada: os atributos da raça não foram escolhidos.`);
			return updates;
		}
		for (const [key, valor] of Object.entries(escolha)) {
			const base = aberta ? 0 : item.system.atributos[key];
			changes[`system.atributos.${key}.racial`] = base + (valor ?? 0);
		}
	}
	item.actor.update(changes);

	// Poderes raciais, como o sistema.
	const items = [];
	const grantedItems = [];
	for (const grant of grants) {
		for (const choice of grant.choices) {
			const poder = await fromUuid(choice.uuid);
			if (!poder) continue;
			items.push(poder.toObject());
			grantedItems.push(poder.id);
		}
	}
	if (items.length) {
		await CONFIG.Item.documentClass.createDocuments(items, { keepId: true, parent: item.parent, pack: item.actor.pack });
		updates["flags.tormenta20.grantedItems"] = grantedItems;
	}
	return updates;
}

export default {
	id: "atributosDinamicos",
	name: "Atributos Dinâmicos das raças",
	hint: "O diálogo de atributos da raça só aceita a escolha que a raça permite (\"+1 em três atributos diferentes\", \"+2 em um ou +1 em dois\"…). Fechar a janela cancela a raça. Com Raças Abertas, distribua exatamente os modificadores da raça.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype._onCreateOwnedRace", function (wrapped) {
			return criarRaca(this);
		});
		wrap("CONFIG.Item.documentClass.prototype._preCreate", async function (wrapped, ...args) {
			if (args[1]?.t20cRacial && this.type === "race") this._t20cRacial = args[1].t20cRacial;
			const resultado = await wrapped(...args);
			if (!this._t20cRacaCancelada) return resultado;
			delete this._t20cRacaCancelada;
			return false;
		});
		Hooks.on("renderDialogV2", (app, element) => {
			if (!ATUAL || !element.querySelector(".t20c-atributos-dinamicos")) return;
			const form = element.querySelector("form") ?? element;
			const bloquear = (event) => {
				const erro = validar(form);
				if (!erro) return;
				event.preventDefault();
				event.stopImmediatePropagation();
				ui.notifications.warn(erro);
			};
			for (const input of form.querySelectorAll('input[type="number"]')) {
				input.step = "1";
				if (!ATUAL.aberta) input.min = "0";
			}
			element.querySelector('button[data-action="apply"]')?.addEventListener("click", bloquear, { capture: true });
			form.addEventListener("submit", bloquear, { capture: true });
		});
	}
};
