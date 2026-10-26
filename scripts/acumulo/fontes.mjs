import { MODULE_ID } from "../constants.mjs";

/**
 * Fontes de efeito do Tormenta20 (JdA p. 226) usadas pela regra de acúmulo.
 * "" = descobrir sozinho; "sempre" = ignorar a regra para este efeito.
 */
export const FONTES = {
	"": "Automático",
	habilidade: "Habilidade (poder, classe, raça, origem)",
	pericia: "Perícia",
	item: "Item",
	magia: "Magia",
	encanto: "Encanto (ex.: Arma Mágica, Vestimenta da Fé)",
	parceiro: "Parceiro",
	ambiente: "Ambiente",
	sempre: "Sempre acumula (ignora a regra)"
};

/** Fontes que não acumulam entre si (vale só o melhor). As demais só não acumulam com a mesma habilidade/perícia. */
export const FONTES_EXCLUSIVAS = new Set(["item", "magia", "encanto", "parceiro", "ambiente"]);

/**
 * Magias e óleos cujo bônus "conta como um bônus de encanto" (Arma Mágica, Vestimenta da Fé, Arma de
 * Jade, Arsenal e Couraça de Allihanna) ou é "não cumulativo com bônus de encantos" (Óleo de Arma
 * Mágica): não acumulam com encantos, mas acumulam com bônus de magia (JdA p. 334).
 */
export function contaComoEncanto(item) {
	if (!["magia", "consumivel"].includes(item?.type)) return false;
	const texto = String(item.system?.description?.value ?? "")
		.replace(/<[^>]+>/g, " ")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/\s+/g, " ");
	return /contam? como (um )?bonus de encanto|nao cumulativ[oa] com (os )?bonus de encantos?/.test(texto);
}

/**
 * Poder que se pode escolher mais de uma vez ("Aumento de Atributo: você pode escolher este poder várias
 * vezes, mas apenas uma vez por patamar para um mesmo atributo"): cada cópia é uma escolha própria e soma.
 */
export function podeRepetir(item) {
	const texto = String(item?.system?.description?.value ?? "")
		.replace(/<[^>]+>/g, " ")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/\s+/g, " ");
	return /pode escolher (este|esse) poder (varias vezes|quantas vezes quiser|mais de uma vez|outras vezes)/.test(texto);
}

/** Fonte de um item, pelo tipo. null = sem regra (ex.: cômodos de base, que têm regra própria). */
export function fonteDoItem(item) {
	if (!item) return null;
	if (contaComoEncanto(item)) return "encanto";
	switch (item.type) {
		case "magia":
			return "magia";
		case "consumivel":
			return ["potion", "scroll"].includes(item.system?.tipo) ? "magia" : "item";
		case "arma":
		case "equipamento":
		case "tesouro":
			return "item";
		case "poder": {
			const source = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
			return source.startsWith("Compendium.tormenta20.parceiros.") ? "parceiro" : "habilidade";
		}
		case "classe":
		case "race":
		case "background":
		case "devotion":
			return "habilidade";
		default:
			return null;
	}
}

/** "Escudo da Fé (Cena)" -> "escudo da fé" */
export function nomeBase(name) {
	return String(name ?? "")
		.replace(/\s*\([^)]*\)\s*$/, "")
		.trim()
		.toLowerCase();
}

/**
 * Origem dentro do próprio ator do efeito (o ator, um item ou um efeito dele), resolvida sem fromUuidSync.
 * Num token sem vínculo, o ator sintético é montado dentro do getter `delta`: buscar o uuid dele nesse
 * momento recriava o ator em cascata (vimos 151 níveis no Gnoll Xamã, com efeito vindo dele mesmo).
 * @returns {Document|null|undefined}  undefined = a origem está fora do ator
 */
function origemNoProprioAtor(effect) {
	const dono = effect.parent?.documentName === "Actor" ? effect.parent : null;
	if (!dono) return undefined;
	const base = dono.uuid;
	if (effect.origin === base) return dono;
	if (!effect.origin.startsWith(`${base}.`)) return undefined;
	const [, colecao, id] = effect.origin.slice(base.length).split(".");
	if (colecao === "Item") return dono.items.get(id) ?? null;
	if (colecao === "ActiveEffect") return dono.effects.get(id) ?? null;
	return null;
}

function itemDeOrigem(effect) {
	if (effect.parent?.documentName === "Item") return effect.parent;
	if (!effect.origin) return null;
	let origin = origemNoProprioAtor(effect);
	if (origin === undefined) {
		try {
			origin = foundry.utils.fromUuidSync(effect.origin, { strict: false });
		} catch {
			return null;
		}
	}
	if (origin?.documentName === "Item") return origin;
	if (origin?.documentName === "ActiveEffect" && origin.parent?.documentName === "Item") return origin.parent;
	// Efeitos aplicados pelo chat têm como origem o ator que lançou: procura o item pelo nome.
	const caster = origin?.documentName === "Actor" ? origin : origin?.actor;
	if (caster?.items) {
		const base = nomeBase(effect.name);
		return caster.items.find((i) => nomeBase(i.name) === base) ?? null;
	}
	return null;
}

/**
 * Descobre de que fonte vem um efeito e qual habilidade/item específico o gerou.
 * @returns {{fonte: string, chave: string, item: Item|null}|null}  null = efeito fora da regra
 */
export function fonteDoEfeito(effect) {
	const escolhida = effect.getFlag(MODULE_ID, "fonte") || "";
	if (escolhida === "sempre") return null;
	// Condições têm regra própria (o sistema já não deixa a mesma condição acumular).
	if (effect.statuses?.size) return null;

	const marcada = effect.getFlag(MODULE_ID, "origem");
	const item = itemDeOrigem(effect);
	// Marcas antigas diziam "magia" para Arma Mágica e afins: o texto do item manda.
	const fonte = escolhida || (contaComoEncanto(item) ? "encanto" : marcada?.fonte) || fonteDoItem(item);
	if (!fonte) return null;
	let chave = nomeBase(item?.name ?? marcada?.nome ?? effect.name);
	if (item?.documentName === "Item" && podeRepetir(item)) chave += `#${item.id}`;
	// Outra parte da mesma habilidade (Tanga de Peles: Constituição sem armadura e +1 por nível): soma com as
	// outras partes do item em vez de disputar com elas.
	if (effect.getFlag(MODULE_ID, "parteDaHabilidade")) chave += `#${effect.id}`;
	return { fonte, chave, item };
}
