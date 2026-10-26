import { MODULE_ID } from "../constants.mjs";
import { corrigirAtor, corrigirEfeito, corrigirItem } from "../migracao/dados.mjs";
import { corrigirEncantosDoItem } from "../migracao/encantos.mjs";
import { log, warn, wrap } from "../util.mjs";

/**
 * Bug: dados quebrados nos compêndios do sistema, do Bestiário e dos Suplementos de Arton —
 * chaves com caminho antigo ou erro de digitação (o bônus nunca é aplicado), valores inválidos,
 * "substituir" que apaga outros bônus e efeitos de aprimoramento ligados por engano (valem sempre).
 * Correção: ajusta os dados ao carregar cada ator/item/efeito, em memória (nada é gravado nos
 * compêndios). Roda depois da conversão de efeitos antigos. Detalhes de cada regra em
 * scripts/migracao/dados.mjs.
 */
const stats = {};

/** Penalidade de armadura do próprio item (valor positivo), com as melhorias dele (Reforçada, Sob Medida, Mitral…). */
function penalidadeDoItem(item) {
	let penalidade = Math.abs(Number(item.system?.armadura?.penalidade) || 0);
	for (const ef of item.effects) {
		if (ef.disabled) continue;
		for (const c of ef.system.changes ?? []) {
			if (c.key === "system.attributes.defesa.pda" && c.type === "add") penalidade += Number(c.value) || 0;
		}
	}
	return Math.max(penalidade, 0);
}

function seguro(fn) {
	try {
		fn();
	} catch (error) {
		warn("Falha ao corrigir dados de compêndio; dados mantidos como estavam.", error);
	}
}

export default {
	id: "dadosCompendios",
	name: "Dados quebrados dos compêndios",
	hint: "Corrige, ao carregar, chaves de efeito com caminho antigo ou erro de digitação (ex.: Símbolo Sagrado do Bestiário, Folião, Luva de Falcoaria), valores inválidos e efeitos de aprimoramento que ficavam sempre ligados (ex.: Luz +5 PM, Fogo e Aço). Nada é gravado nos compêndios.",
	init() {
		wrap("CONFIG.Actor.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => corrigirAtor(source, stats));
			return wrapped(source, ...args);
		});
		wrap("CONFIG.Item.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => corrigirItem(source, stats));
			return wrapped(source, ...args);
		});
		wrap("CONFIG.ActiveEffect.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => corrigirEfeito(source, stats));
			return wrapped(source, ...args);
		});
		// Encanto aplicado num item durante a sessão (aba de melhorias): as correções que dependem do item
		// (Ameaçadora, Adamante, Gelo Eterno) valem já, sem esperar recarregar.
		Hooks.on("preCreateActiveEffect", (effect) => {
			const item = effect.parent;
			if (item?.documentName !== "Item" || !effect.system?.upgrade?.type) return;
			seguro(() => {
				const copia = effect.toObject();
				// Os outros efeitos do item vão junto só para consulta (Aprimorado procura a perícia do item).
				const outros = item.effects.map((e) => e.toObject());
				if (corrigirEncantosDoItem({ type: item.type, name: item.name, system: item._source.system, effects: [copia, ...outros] }, stats)) {
					effect.updateSource({ "system.changes": copia.system.changes, "system.abilityUse": copia.system.abilityUse, disabled: copia.disabled, flags: copia.flags });
				}
			});
		});
		// Falange da Decúria: "enquanto tiver pelo menos metade de seus PV" — abaixo disso o efeito sai.
		Hooks.on("updateActor", (actor, changes) => {
			if (!game.user.isActiveGM || !foundry.utils.hasProperty(changes, "system.attributes.pv")) return;
			const pv = actor.system.attributes?.pv;
			if (!pv || pv.value >= pv.max / 2) return;
			const ids = actor.effects.filter((e) => e.getFlag(MODULE_ID, "acabaAbaixoDaMetade")).map((e) => e.id);
			if (ids.length) actor.deleteEmbeddedDocuments("ActiveEffect", ids);
		});
		// Efeito com origem num compêndio ainda não aberto (Bola de Fogo do Pergaminho de Bola de Fogo): o
		// sistema lia a entrada do índice como documento e quebrava ao criar o efeito (inclusive na limpeza de
		// ids repetidos que ele faz ao carregar o mundo). Só documentos de verdade contam como ancestrais.
		wrap("CONFIG.ActiveEffect.documentClass.prototype.getAncestors", function (wrapped, ...args) {
			try {
				return wrapped(...args);
			} catch {
				const ancestors = {};
				for (const uuid of [this.origin, this._stats?.duplicateSource]) {
					let parent = uuid ? foundry.utils.fromUuidSync(uuid, { strict: false }) : null;
					while (parent?.collectionName) {
						ancestors[parent.collectionName.replace(/s$/, "")] = parent;
						parent = parent.parent;
					}
				}
				return ancestors;
			}
		});
		// Acrobático e Sombrio usam "@item.pda" ("ignora a penalidade de armadura do item"), mas o valor
		// vai como texto para a lista de bônus e é resolvido depois, sem o item: virava 0.
		// Troca pelo número na hora de aplicar (e na estimativa usada pela regra de acúmulo).
		wrap("CONFIG.ActiveEffect.documentClass.applyChange", function (wrapped, targetDoc, change, ...args) {
			const item = change?.effect?.parent;
			if (item?.documentName === "Item" && String(change.value).includes("@item.pda")) {
				change = { ...change, value: String(change.value).replaceAll("@item.pda", String(penalidadeDoItem(item))) };
			}
			return wrapped(targetDoc, change, ...args);
		});
		wrap("CONFIG.ActiveEffect.documentClass.prototype.getReplacementData", function (wrapped, baseData, ...args) {
			const data = wrapped(baseData, ...args);
			const item = this.parent?.documentName === "Item" ? this.parent : null;
			if (!item || !this.system?.changes?.some((c) => String(c.value).includes("@item."))) return data;
			return { ...data, item: { pda: penalidadeDoItem(item) } };
		});
	},
	ready() {
		const total = Object.values(stats).reduce((a, b) => a + b, 0);
		if (total) log(`Correções de dados aplicadas ao carregar: ${total}`, stats);
	}
};
