import { aprimoramentosAplicados, normalizar, substituiONormal, textoDoAprimoramento } from "../magia/regras.mjs";
import { wrap } from "../util.mjs";

/**
 * Bugs na montagem dos efeitos que vão para os alvos (ability-use.mjs):
 * 1. Aprimoramentos "em vez do normal" só conseguem somar ao efeito base, nunca trocá-lo.
 *    Ex.: Campo de Força "RD 30 contra o próximo ataque" dava a RD normal + 30; Armadura Arcana
 *    reativa continuava dando o bônus normal.
 * 2. Toda alteração de aprimoramento é copiada para o efeito aplicado, inclusive chaves que só
 *    fazem sentido na hora do uso (alcance, alvo, dano, duracao…), que viram lixo no alvo.
 * Correção (antes de criar o cartão no chat):
 * - com "em vez do normal": se o aprimoramento traz o próprio efeito ou condição, o efeito base
 *   sai; senão, o efeito base fica só com as alterações vindas dos aprimoramentos;
 * - efeitos aplicados que não são de uso perdem as chaves de uso;
 * - duas alterações de texto na mesma chave (duas imunidades) não viram uma só com valor nulo.
 */
const CHAVES_DE_USO = new Set([
	"alcance",
	"alvo",
	"area",
	"execucao",
	"duracao",
	"resistencia",
	"atributoCD",
	"cd",
	"CD",
	"efeito",
	"condicao",
	"treino",
	"custo",
	"roll",
	"ataque",
	"dano",
	"passos",
	"atributoDano",
	"tipoDano",
	"pericia",
	"atributoAtq",
	"danoCritico",
	"critico",
	"ignoraRD",
	"danoMultiplicavel"
]);

export function chaveDeUso(key) {
	const base = String(key ?? "").split(/[:&]/)[0];
	return CHAVES_DE_USO.has(base) || base.startsWith("efeito.");
}

const ehCaminhoDeDados = (key) => /^\+?(system|flags|token)\./.test(String(key ?? ""));

/** Alterações de dados (system./flags./token.) dos aprimoramentos, multiplicadas pela quantidade. */
function alteracoesDosAprimoramentos(aplicados) {
	const resultado = [];
	for (const { effect, qty } of aplicados) {
		for (const change of effect.system.changes) {
			if (!ehCaminhoDeDados(change.key)) continue;
			const key = change.key.replace(/^\+/, "");
			const numero = Number(change.value);
			const value = change.type === "add" && Number.isFinite(numero) ? numero * qty : change.value;
			// "Substituir" numa lista de bônus apagaria os bônus de outras fontes: vira "somar".
			const type = change.type === "override" && ehLista(key) ? "add" : change.type;
			const anterior = resultado.find((c) => c.key === key && c.type === type);
			if (anterior && type === "add" && Number.isFinite(Number(anterior.value)) && Number.isFinite(Number(value))) {
				anterior.value = Number(anterior.value) + Number(value);
			} else if (anterior && type === "override") {
				anterior.value = value;
			} else {
				resultado.push({ key, type, value, phase: change.phase ?? "initial", priority: change.priority ?? null });
			}
		}
	}
	return resultado;
}

/** O campo do personagem é uma lista de bônus (onde "substituir" apagaria os bônus de outras fontes)? */
function ehLista(key) {
	const field = CONFIG.Actor.dataModels?.character?.schema?.getField?.(String(key).replace(/^system\./, ""));
	return field instanceof foundry.data.fields.ArrayField || field instanceof foundry.data.fields.SetField;
}

/**
 * "Muda a RD para 20" (Instante Estoico), "Valor da Constante M": o aprimoramento substitui um valor
 * do efeito base. O sistema funde as duas alterações (RD 10 + "substituir 20" vira "substituir 30")
 * ou descarta a substituição; e um "substituir" numa lista de bônus apaga os bônus de outras fontes.
 * Aqui sobra uma alteração só, com o valor do aprimoramento e o tipo original do efeito base.
 */
function aplicarMudancas(efeitos, aplicados, item) {
	const mudancas = new Map();
	for (const { effect } of aplicados) {
		if (effect.parent?.id !== item.id) continue;
		for (const change of effect.system.changes) {
			if (change.type === "override" && /^system\./.test(change.key)) mudancas.set(change.key, change.value);
		}
	}
	if (!mudancas.size) return;
	for (const efeito of efeitos) {
		if (efeito?.system?.onuse || efeito?.statuses?.length || !Array.isArray(efeito?.system?.changes)) continue;
		const originais = item.effects.get(efeito._id)?._source?.system?.changes ?? [];
		for (const [key, value] of mudancas) {
			const daChave = efeito.system.changes.filter((c) => c.key === key);
			if (!daChave.length) continue;
			const type = originais.find((c) => c.key === key)?.type ?? (ehLista(key) ? "add" : "override");
			const unica = { ...daChave[0], type, value };
			efeito.system.changes = efeito.system.changes.filter((c) => c.key !== key).concat(unica);
		}
	}
}

/**
 * Ao montar o cartão, o sistema junta as alterações de mesma chave somando como número. Duas alterações
 * de texto na mesma chave (duas imunidades a condição, por exemplo) viravam uma só com valor NaN/null.
 * Volta as alterações originais do efeito do item no lugar da que quebrou.
 */
function restaurarTextosSomados(efeito, item) {
	const fonte = item.effects.get(efeito._id);
	if (!fonte) return;
	const quebradas = efeito.system.changes.filter((c) => c.value === null || (typeof c.value === "number" && Number.isNaN(c.value)));
	for (const quebrada of quebradas) {
		const originais = (fonte._source.system?.changes ?? []).filter((c) => c.key === quebrada.key);
		if (originais.length < 2) continue;
		efeito.system.changes.splice(efeito.system.changes.indexOf(quebrada), 1, ...foundry.utils.deepClone(originais));
	}
}

/**
 * Truque que troca o efeito da magia (JdA p. 171): a magia não causa o dano normal. "Não causa dano"
 * (Explosão de Chamas) ou "em vez do normal" sem dano (Raio Solar, Miasma Mefítico): sem rolagem de
 * dano. "Em vez do normal, causa 1d8 pontos de dano de luz" (Curar Ferimentos): rola só esse dano.
 * @returns {null|{formula: string, tipo: string}|"nenhum"}  null = rolagem normal
 */
function danoDoTruque(item, options) {
	if (item.type !== "magia") return null;
	const truque = aprimoramentosAplicados(item, options).find((a) => a.effect.parent?.id === item.id && a.effect.system.isCantrip);
	if (!truque) return null;
	const texto = normalizar(textoDoAprimoramento(truque.effect));
	if (/nao causa (nenhum )?dano/.test(texto)) return "nenhum";
	if (!substituiONormal(truque.effect)) return null;
	const causa = texto.match(/em vez do normal[^.]*?causa (\d+d\d+(?:\s*\+\s*\d+)?) pontos de dano de (\w+)/);
	if (causa) return { formula: causa[1].replace(/\s+/g, ""), tipo: causa[2] };
	return /\bdano\b/.test(texto) ? null : "nenhum";
}

export default {
	id: "efeitoBase",
	name: "Magias: \"em vez do normal\" e \"muda\" substituem o efeito base",
	hint: "Aprimoramentos que dizem \"em vez do normal\" trocam o efeito base da magia em vez de somar a ele; os que mudam um valor (\"muda a RD para 20\") trocam só esse valor, sem apagar bônus de outras fontes. Os efeitos aplicados nos alvos deixam de carregar alterações que só valem na hora do uso.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
			const options = config.options;
			// Bônus fixos de arma ou equipamento (Reforçada, Adamante…) já valem enquanto o item está
			// equipado: como botão no cartão, só serviriam para aplicar o bônus em dobro.
			if (options?.effects?.length && ["arma", "equipamento"].includes(this.type)) {
				// Encantos sem alteração nenhuma (Zeloso, Fantasmagórico…) também viravam botões vazios. Olha os dados
				// gravados: ao usar, o sistema enfia nos efeitos fixos as alterações das opções marcadas.
				const vazio = (e) => e.system.upgrade?.type && !e._source.system?.changes?.length;
				const fixos = new Set(this.effects.filter((e) => !e.system.onuse && !e.disabled && (e.transfer || vazio(e))).map((e) => e.id));
				options.effects = options.effects.filter((lista) => !fixos.has((Array.isArray(lista) ? lista[0] : lista)?._id));
			}
			if (options?.effects?.length) {
				const efeitos = options.effects.map((lista) => (Array.isArray(lista) ? lista[0] : lista));
				for (const efeito of efeitos) {
					if (efeito?.system?.onuse || !Array.isArray(efeito?.system?.changes)) continue;
					efeito.system.changes = efeito.system.changes.filter((c) => !chaveDeUso(c.key));
					restaurarTextosSomados(efeito, this);
				}

				const aplicados = aprimoramentosAplicados(this, options);
				aplicarMudancas(efeitos, aplicados, this);
				// Só aprimoramentos da própria magia/poder trocam o efeito base dela.
				const substitutos = aplicados.filter((a) => a.effect.parent?.id === this.id && substituiONormal(a.effect));
				if (substitutos.length) {
					const baseIds = new Set(this.effects.filter((e) => !e.system.onuse && !e.disabled).map((e) => e.id));
					const trazProprio = substitutos.some((a) =>
						a.effect.system.changes.some((c) => ["efeito", "condicao"].includes(c.key))
					);
					const novas = alteracoesDosAprimoramentos(aplicados);
					options.effects = options.effects.filter((lista) => {
						const efeito = Array.isArray(lista) ? lista[0] : lista;
						if (!baseIds.has(efeito?._id)) return true;
						if (trazProprio) return false;
						efeito.system.changes = foundry.utils.deepClone(novas);
						return true;
					});
				}
			}
			return wrapped(config, ...args);
		});
		// O sistema põe cada alteração de rolagem na parte de mesma fonte (sourceName). Com a origem gravada nos
		// compêndios ("Item.<id antigo>", "Compendium.…") a fonte saía "Desconhecido" para quase todos, e um
		// "passos" ou dado extra caía na parte errada (Lanceiro subia o dado da Marca da Presa). Sem origem que
		// resolva, a fonte é o item dono do efeito.
		wrap("CONFIG.ActiveEffect.documentClass.prototype.sourceName", function (wrapped, ...args) {
			const nome = wrapped(...args);
			if (this.parent?.documentName !== "Item") return nome;
			const vazios = [game.i18n.localize("COMMON.None"), game.i18n.localize("COMMON.Unknown")];
			return vazios.includes(nome) ? this.parent.name : nome;
		});
		// "dano: roll" (Ataque Furtivo de jogador) acha o item do poder por origin.split(".")[3], que só funciona
		// com origem "Actor.<id>.Item.<id>". Com a origem gravada ("Item.<id>", ou vazia) o ataque dava erro.
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const efeitos = wrapped(...args);
			for (const ef of efeitos ?? []) {
				const item = ef.parent;
				if (item?.documentName !== "Item" || !item.actor) continue;
				if (!ef.system?.changes?.some((c) => c.value === "roll")) continue;
				if (String(ef.origin ?? "").split(".")[3] !== item.id) ef.updateSource({ origin: `Actor.${item.actor.id}.Item.${item.id}` });
			}
			return efeitos;
		});
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", function (wrapped, config = {}, ...args) {
			const troca = danoDoTruque(this, config.options ?? {});
			if (troca === "nenhum") return undefined;
			if (troca) {
				// O item rolado é um clone feito pelo sistema para este uso: pode ser alterado.
				for (const rolagem of this.system.rolls) if (rolagem.type === "dano") rolagem.parts = [[troca.formula, troca.tipo, ""]];
			}
			return wrapped(config, ...args);
		});
	}
};
