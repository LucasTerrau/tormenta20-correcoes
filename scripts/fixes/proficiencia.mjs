import { equipado } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";
import { ARMA_PREFERIDA, PROFICIENCIAS_CONCEDIDAS } from "./concessoes-dados.mjs";

/**
 * Regras (JdA p. 35, 142, 152):
 * - todos sabem usar armas simples e armaduras leves; a classe inicial dá as demais proficiências
 *   (uma nova classe não dá proficiências); o poder Proficiência dá uma à escolha;
 * - "se você atacar com uma arma com a qual não seja proficiente, sofre –5 nos testes de ataque";
 * - armadura ou escudo sem proficiência: a penalidade de armadura vale em todas as perícias baseadas em
 *   Força e Destreza (inclusive Luta e Pontaria).
 * O sistema guardava as proficiências como texto e nunca comparava.
 * Correção (só personagens): a proficiência vem da classe inicial (tabela do livro), das proficiências
 * marcadas na ficha (lista ou texto com o nome da arma), da raça (Anão: machados, martelos, marretas e
 * picaretas; Mestre do Tridente; Espadachim Divino: espadas marciais) e do poder Proficiência (pelo nome; sem a escolha no nome, conta como
 * todas). Personagem sem classe inicial marcada ou com classe fora do livro básico fica sem penalidade.
 * Poderes que dão proficiência ("recebe proficiência com armas de fogo", "em katana e arco longo", "na arma preferida
 * de sua divindade", "armas marciais corpo a corpo") vêm da tabela gerada do texto (concessoes-dados.mjs).
 */
const DA_CLASSE = {
	arcanista: [],
	barbaro: ["marcial", "esc"],
	bardo: ["marcial"],
	bucaneiro: ["marcial"],
	cacador: ["marcial", "esc"],
	cavaleiro: ["marcial", "pes", "esc"],
	clerigo: ["pes", "esc"],
	druida: ["esc"],
	guerreiro: ["marcial", "pes", "esc"],
	inventor: [],
	ladino: [],
	lutador: [],
	nobre: ["marcial", "pes", "esc"],
	paladino: ["marcial", "pes", "esc"]
};
const TODAS = ["simples", "marcial", "exotica", "fogo", "lev", "pes", "esc"];

const slug = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const NOME_DE_ESPADA = /\b(espada|espadim|montante|cimitarra|florete|katana|wakizashi|sabre|rapieira|gladio|alfange|khopesh|cinquedea)\b/;
const TEXTO_DE_ESPADA = /\b(esta|essa|uma|a)\s+(espada|cimitarra|katana|florete|montante|alfange|rapieira|sabre)\b/;

/** Espada: pelo nome ("Espada longa", "Cimitarra") ou, nas armas de nome próprio, pelo começo do texto ("Esta espada longa…"). */
export function ehEspada(arma) {
	if (arma?.type !== "arma") return false;
	if (NOME_DE_ESPADA.test(slug(arma.name))) return true;
	const texto = slug(String(arma.system?.description?.value ?? "").replace(/<[^>]+>/g, " ")).slice(0, 120);
	return TEXTO_DE_ESPADA.test(texto);
}

/** Proficiências do personagem, ou null quando não dá para saber (sem penalidade nenhuma). */
export function proficiencias(actor) {
	if (actor?.type !== "character") return null;
	const inicial = actor.items.find((i) => i.type === "classe" && i.system?.inicial);
	const daClasse = inicial ? DA_CLASSE[slug(inicial.name).replace(/[^a-z]/g, "")] : undefined;
	if (!daClasse) return null;
	const lista = new Set(["simples", "lev", ...daClasse]);
	const tracos = actor.system.tracos ?? {};
	for (const p of [...(tracos.profArmas?.value ?? []), ...(tracos.profArmaduras?.value ?? [])]) lista.add(p);
	for (const poder of actor.items.filter((i) => /^profici[eê]ncia\b/i.test(i.name))) {
		const n = slug(poder.name);
		const escolha = [
			[/marcia/, "marcial"],
			[/fogo/, "fogo"],
			[/pesad/, "pes"],
			[/escudo/, "esc"],
			[/exotic/, "exotica"]
		].filter(([re]) => re.test(n));
		for (const p of escolha.length ? escolha.map(([, p]) => p) : TODAS) lista.add(p);
	}
	const textos = slug([tracos.profArmas?.custom, tracos.profArmaduras?.custom].join(";"));
	// Poderes que dão proficiência (tabela do texto; o subtipo separa poderes de mesmo nome em livros diferentes).
	const armas = new Set();
	for (const poder of actor.itemTypes?.poder ?? []) {
		const dado = PROFICIENCIAS_CONCEDIDAS[poder.name];
		if (!dado || !dado.subtipos.some((s) => slug(s) === slug(poder.system?.subtipo))) continue;
		for (const c of dado.categorias) lista.add(c);
		for (const a of dado.armas) armas.add(a);
		const preferida = dado.divindade ? ARMA_PREFERIDA[slug(actor.system.detalhes?.divindade)] : null;
		if (preferida) armas.add(preferida);
	}
	return { lista, textos, armas, anao: actor.items.some((i) => i.type === "race" && /^anao/.test(slug(i.name))) || slug(actor.system.detalhes?.raca).startsWith("anao"), tridente: actor.items.some((i) => i.name === "Mestre do Tridente"), espadachim: actor.items.some((i) => i.name === "Espadachim Divino") };
}

export function proficienteNaArma(actor, arma, prof = proficiencias(actor)) {
	if (!prof || arma?.type !== "arma") return true;
	const nome = slug(arma.name);
	let categoria = arma.system?.proficiencia || "simples";
	if (prof.anao && /^(machad|martel|marreta|picareta)/.test(nome)) categoria = "simples";
	if (prof.tridente && /^tridente/.test(nome)) categoria = "simples";
	// Espadachim Divino (Espada-Deus): "para você, todas as espadas marciais são armas simples".
	if (prof.espadachim && categoria === "marcial" && ehEspada(arma)) categoria = "simples";
	// Katana e espada bastarda empunhadas com as duas mãos contam como marciais (p. 147–148).
	if (categoria === "exotica" && /^(katana|espada bastarda)/.test(nome) && equipado(arma, true)) categoria = "marcial";
	if (prof.lista.has(categoria)) return true;
	const base = nome.replace(/\s*\(.*\)$/, "");
	// Armas dadas por poder, pelo nome ("katana", "machado de batalha"); "marcial-cac": só as marciais corpo a corpo.
	if ([...(prof.armas ?? [])].some((a) => base === a || base.startsWith(`${a} `))) return true;
	const periciaDoAtaque = arma.system?.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0];
	if (categoria === "marcial" && prof.lista.has("marcial-cac") && periciaDoAtaque === "luta") return true;
	// Balística: marciais de ataque à distância.
	if (categoria === "marcial" && prof.lista.has("marcial-dist") && periciaDoAtaque === "pont") return true;
	return Boolean(nome) && prof.textos.includes(base);
}

function armaduraSemProficiencia(actor, prof) {
	if (!prof) return false;
	return (actor.itemTypes?.equipamento ?? []).some((i) => {
		if (!equipado(i)) return false;
		const tipo = i.system?.tipo;
		if (tipo === "pesada") return !prof.lista.has("pes");
		if (tipo === "escudo") return !prof.lista.has("esc");
		if (tipo === "leve") return !prof.lista.has("lev");
		return false;
	});
}

export default {
	id: "proficiencia",
	name: "Proficiência em armas e armaduras",
	hint: "–5 no ataque com arma sem proficiência; armadura ou escudo sem proficiência aplica a penalidade de armadura em todas as perícias de Força e Destreza. A proficiência vem da classe inicial, da raça, do poder Proficiência, dos poderes que a concedem (armas de fogo, katana, arma preferida da divindade…) e do que estiver marcado na ficha (JdA p. 142, 152).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			try {
				if (Array.isArray(resultado?.parts) && this.type === "arma" && !proficienteNaArma(this.actor, this)) resultado.parts.push("-5");
			} catch (error) {
				warn("Falha ao conferir a proficiência na arma.", error);
			}
			return resultado;
		});
		wrap("CONFIG.Actor.dataModels.character.prototype.prepareDerivedData", function (wrapped, ...args) {
			try {
				const actor = this.parent;
				const sem = armaduraSemProficiencia(actor, proficiencias(actor));
				const fonte = actor._source?.system?.pericias ?? {};
				for (const [id, pericia] of Object.entries(this.pericias ?? {})) {
					if (!["for", "des"].includes(pericia.atributo)) continue;
					pericia.pda = Boolean(fonte[id]?.pda ?? pericia.pda) || sem;
				}
			} catch (error) {
				warn("Falha ao conferir a proficiência na armadura.", error);
			}
			return wrapped(...args);
		});
	}
};
