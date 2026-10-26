import { warn, wrap } from "../util.mjs";

/**
 * Regras de consumíveis (JdA p. 160 e 333):
 * - catalisador: "é gasto ao ser usado"; uma magia só recebe o benefício de um catalisador. O sistema
 *   oferecia o bônus no diálogo da magia, mas a quantidade nunca diminuía e dava para marcar vários;
 * - poções e pergaminhos: a CD usa "Inteligência, Sabedoria ou Carisma, à escolha do usuário". O sistema
 *   fixava Sabedoria.
 * Correção: marcar a opção de um catalisador desmarca a de outro; depois do uso, cada catalisador marcado
 * perde 1 de quantidade. A CD de poção e pergaminho usa o maior entre Int, Sab e Car de quem usa.
 */
const ehCatalisador = (item) => item?.type === "consumivel" && item.system?.tipo === "alchemy" && item.effects?.some((e) => e.system?.onuse);

function marcados(item, resultado) {
	const ids = [];
	for (const ef of item.applicableOnUseEffects ?? []) {
		const valor = resultado?.aprs?.[ef.id]?.aplica ?? resultado?.[`aprs.${ef.id}.aplica`];
		if ((valor === true || Number(valor) > 0) && ehCatalisador(ef.parent) && ef.parent !== item) ids.push(ef.parent.id);
	}
	return [...new Set(ids)];
}

async function gastar(actor, ids) {
	const updates = [];
	const apagar = [];
	for (const id of ids) {
		const catalisador = actor.items.get(id);
		if (!catalisador) continue;
		const qtd = Number(catalisador.system.qtd) || 0;
		if (qtd > 1) updates.push({ _id: id, "system.qtd": qtd - 1 });
		else apagar.push(id);
	}
	if (updates.length) await actor.updateEmbeddedDocuments("Item", updates);
	if (apagar.length) await actor.deleteEmbeddedDocuments("Item", apagar);
}

function melhorAtributo(actor) {
	return ["int", "sab", "car"].reduce((melhor, a) => ((Number(actor.system.atributos?.[a]?.value) || 0) > (Number(actor.system.atributos?.[melhor]?.value) || 0) ? a : melhor), "int");
}

export default {
	id: "consumiveis",
	name: "Catalisadores gastos e CD de poções",
	hint: "Catalisador marcado no diálogo da magia é gasto depois do uso, e só um vale por magia; a CD de poções e pergaminhos usa o maior entre Int, Sab e Car de quem usa (JdA p. 160, 333).",
	init() {
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				if (resultado && item?.actor) item._t20cCatalisadores = marcados(item, resultado);
			} catch (error) {
				warn("Falha ao conferir os catalisadores.", error);
			}
			return resultado;
		});
		// O cartão só sai quando o uso deu certo (sem PM, Item#roll para antes).
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, ...args) {
			const resultado = await wrapped(...args);
			const ids = this._t20cCatalisadores;
			if (ids?.length && this.actor) {
				this._t20cCatalisadores = [];
				await gastar(this.actor, ids).catch((error) => warn("Falha ao gastar os catalisadores.", error));
			}
			return resultado;
		});
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			const item = app.item;
			if (!root || item?.type !== "magia") return;
			const doCatalisador = new Map();
			for (const input of root.querySelectorAll("input[name$='.aplica']")) {
				const ef = item.applicableOnUseEffects?.find((e) => e.id === input.name.split(".")[1]);
				if (ehCatalisador(ef?.parent)) doCatalisador.set(input, ef.parent.id);
			}
			if (new Set(doCatalisador.values()).size < 2) return;
			const marcado = (i) => (i.type === "checkbox" ? i.checked : Number(i.value) > 0);
			for (const input of doCatalisador.keys()) {
				input.addEventListener("change", () => {
					if (!marcado(input)) return;
					for (const [outro, id] of doCatalisador) {
						if (id === doCatalisador.get(input) || !marcado(outro)) continue;
						if (outro.type === "checkbox") outro.checked = false;
						else outro.value = 0;
						outro.dispatchEvent(new Event("change", { bubbles: true }));
					}
				});
			}
		});
		wrap("CONFIG.Item.documentClass.prototype.prepareFinalAttributes", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const actor = this.actor;
			const resistencia = this.system?.resistencia;
			if (actor?.type === "character" && this.type === "consumivel" && ["potion", "scroll"].includes(this.system?.tipo) && resistencia?.txt) {
				const atributo = melhorAtributo(actor);
				if (atributo !== resistencia.atributo) {
					const nivel = Math.floor((Number(actor.system.attributes?.nivel?.value) || 0) / 2);
					resistencia.atributo = atributo;
					resistencia.cd = 10 + nivel + (Number(actor.system.atributos?.[atributo]?.value) || 0) + (Number(resistencia.bonus) || 0);
					this._prepareLabels?.();
				}
			}
			return resultado;
		});
	}
};
