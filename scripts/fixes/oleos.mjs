import { equipado } from "../magia/regras.mjs";
import { wrap } from "../util.mjs";
import { chaveDeUso } from "./efeito-base.mjs";

/**
 * Bug: óleos de arma não fazem nada. O +1 do Óleo de Arma Mágica (e o +3) fica num efeito de uso de
 * ataque dentro do frasco, e efeito temporário dentro de item nunca entra nas rolagens; a chave
 * "?.items.arma" que deveria escolher a arma não é lida pelo sistema. O Óleo de Armamento da Natureza
 * é um efeito comum com "passos", que no personagem não vale nada.
 * Correção: ao usar o consumível, o cartão ganha um botão que aplica no personagem um efeito de uso
 * automático nos ataques, até o fim da cena. Com uma só arma empunhada, vale só para ela.
 */
function mudancasDeArma(effect) {
	const changes = effect.system.changes.filter((c) => !String(c.key).startsWith("?"));
	if (!changes.length) return null;
	if (effect.system.onuse) return effect.system.abilityUse.types.has("attack") ? changes : null;
	return changes.every((c) => chaveDeUso(c.key)) ? changes : null;
}

function efeitoNoPersonagem(item, effect, changes) {
	const data = effect.toObject();
	const armas = item.actor.items.filter((i) => i.type === "arma" && equipado(i));
	data.system.changes = foundry.utils.deepClone(changes);
	data.system.onuse = true;
	data.system.abilityUse.automatic = true;
	data.system.abilityUse.custo = null;
	data.system.abilityUse.types = armas.length === 1 ? [] : ["attack"];
	data.system.abilityUse.names = armas.length === 1 ? [armas[0].name] : [];
	data.disabled = false;
	data.transfer = false;
	data.origin = item.uuid;
	if (!data.duration?.expiry) data.duration = { expiry: "sceneEnd", units: "rounds", value: null };
	if (armas.length === 1) data.name = `${data.name} (${armas[0].name})`;
	return data;
}

export default {
	id: "oleos",
	name: "Óleos de arma aplicam o bônus",
	hint: "Óleo de Arma Mágica, Arma Mágica (+3) e Armamento da Natureza não faziam nada. Ao usar o óleo, o cartão ganha um botão que aplica o bônus nos ataques do personagem até o fim da cena (só na arma empunhada, se houver uma só).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
			const options = config.options;
			if (this.type !== "consumivel" || !options || !this.actor) return wrapped(config, ...args);
			const convertidos = new Set();
			const novos = [];
			for (const effect of this.effects) {
				const changes = mudancasDeArma(effect);
				if (!changes) continue;
				convertidos.add(effect.id);
				novos.push([efeitoNoPersonagem(this, effect, changes)]);
			}
			if (novos.length) {
				const restantes = (options.effects ?? []).filter((lista) => {
					const efeito = Array.isArray(lista) ? lista[0] : lista;
					return !convertidos.has(efeito?._id);
				});
				options.effects = [...restantes, ...novos];
			}
			return wrapped(config, ...args);
		});
	}
};
