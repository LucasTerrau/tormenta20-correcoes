/**
 * Melhorias, materiais e encantos (compêndio Efeitos do sistema, JdA p. 164–167 e 335–339) que não
 * faziam nada ou faziam errado. Cada regra só mexe enquanto o dado ainda está no estado errado.
 * Limite do sistema: cada encanto copia um único efeito para o item; quando o encanto tem parte fixa
 * e parte ativada, fica a parte que dá para automatizar.
 */
import { MODULE_ID } from "../constants.mjs";

const mudanca = (key, type, value) => ({ key, type, value, phase: "initial", priority: null });
const temMudanca = (ef, key, type, value) =>
	(ef.system?.changes ?? []).some((c) => c.key === key && (!type || c.type === type) && (value === undefined || String(c.value) === String(value)));
const vazio = (ef) => !(ef.system?.changes ?? []).length;

/** Ativado ao usar o item, cobrando PM: o cartão traz a condição e a resistência (CD de Carisma). */
function ativacaoComCondicao(custo, condicao, resistencia) {
	return (ef) => {
		ef.system.onuse = true;
		ef.system.abilityUse = { ...(ef.system.abilityUse ?? {}), automatic: false, aumenta: false, custo, types: ["self"], names: [] };
		ef.system.changes = [mudanca("condicao", "add", condicao), mudanca("resistencia", "override", resistencia), mudanca("atributoCD", "override", "car")];
		ef.disabled = true;
		ef.transfer = false;
	};
}

/** Botão no cartão ao usar o item, aplicando um efeito temporário no personagem (não cobra PM). */
function botao(changes, duration, sempreAcumula = false) {
	return (ef) => {
		ef.system.onuse = false;
		ef.system.changes = changes;
		ef.disabled = false;
		ef.transfer = false;
		ef.duration = { ...(ef.duration ?? {}), ...duration };
		ef.flags ??= {};
		ef.flags[MODULE_ID] = { ...(ef.flags[MODULE_ID] ?? {}), ativavel: true, ...(sempreAcumula ? { fonte: "sempre" } : {}) };
	};
}

/** [nome, tipo de aprimoramento, ainda errado?, corrige] */
const REGRAS = [
	// Assustador / Hipnótico / Reluzente (JdA p. 338–339): ação + PM, inimigos em alcance curto resistem ou ficam com a condição.
	["Assustador", "enchantment", vazio, ativacaoComCondicao(2, "abalado", "Vontade anula")],
	["Hipnótico", "enchantment", vazio, ativacaoComCondicao(3, "fascinado", "Vontade anula")],
	["Reluzente", "enchantment", vazio, ativacaoComCondicao(2, "cego", "Reflexos anula")],
	// Alado (p. 338): 2 PM para voar 12m, sustentado. O PM fica à mão (botão não cobra). A chave antiga
	// (movement.fly, o objeto inteiro) não dava voo nenhum.
	["Alado", "enchantment", (ef) => vazio(ef) || temMudanca(ef, "system.attributes.movement.fly"), botao([mudanca("system.attributes.movement.fly.base", "upgrade", "12")], { expiry: "sustainEnd", units: "rounds", value: null })],
	// Polida (p. 166): +5 na Defesa do item só na primeira rodada e com luz. É melhoria da armadura: soma com tudo.
	[
		"Polida",
		"improvement",
		(ef) => !ef.flags?.[MODULE_ID]?.ativavel && temMudanca(ef, "system.attributes.defesa.bonus", "add", 5),
		botao([mudanca("system.attributes.defesa.bonus", "add", "5")], { expiry: "turnStart", units: "rounds", value: 1 }, true)
	],
	// Incandescente (p. 339): redução de fogo 10 (as labaredas ativadas ficam à mão).
	[
		"Incandescente",
		"enchantment",
		vazio,
		(ef) => {
			ef.system.onuse = false;
			ef.system.changes = [mudanca("system.tracos.resistencias.fogo.bonus", "add", "10")];
			ef.transfer = true;
			ef.disabled = false;
		}
	],
	// Drenante (p. 335): em acerto crítico, a criatura viva fica fraca (marque no ataque). PV temporários à mão.
	[
		"Drenante",
		"enchantment",
		vazio,
		(ef) => {
			ef.system.onuse = true;
			ef.system.abilityUse = { ...(ef.system.abilityUse ?? {}), automatic: false, aumenta: false, custo: null, types: ["self"], names: [] };
			ef.system.changes = [mudanca("condicao", "add", "fraco")];
			ef.disabled = true;
		}
	],
	// Invulnerável (p. 339): "redução de dano 2 (escudos) ou 5 (armaduras)"; dava Defesa.
	...["Invulnerável (Armadura)", "Invulnerável (Escudo)"].map((nome) => [
		nome,
		"enchantment",
		(ef) => temMudanca(ef, "system.attributes.defesa.bonus"),
		(ef) => {
			for (const c of ef.system.changes) if (c.key === "system.attributes.defesa.bonus") c.key = "system.tracos.resistencias.dano.bonus";
		}
	]),
	// Abençoado (p. 338): redução de trevas 10 (era só +5 em testes, e só se marcado). O +5 contra necromancia fica à mão.
	[
		"Abençoado",
		"enchantment",
		(ef) => ef.system.onuse && temMudanca(ef, "roll"),
		(ef) => {
			ef.system.onuse = false;
			ef.system.abilityUse = { ...(ef.system.abilityUse ?? {}), automatic: false, custo: null, types: [], names: [] };
			ef.system.changes = [mudanca("system.tracos.resistencias.trevas.bonus", "add", "10")];
			ef.transfer = true;
			ef.disabled = false;
		}
	],
	// Excruciante (p. 335): a criatura fica fraca; se já estiver fraca, debilitada. Aplicava as duas no
	// mesmo golpe. Fraco de novo vira debilitado pela regra de condições que pioram.
	[
		"Excruciante",
		"enchantment",
		(ef) => temMudanca(ef, "condicao", null, "debilitado"),
		(ef) => {
			ef.system.changes = ef.system.changes.filter((c) => !(c.key === "condicao" && c.value === "debilitado"));
		}
	],
	// Anticriatura (p. 335): opcional, 1x por rodada, contra o tipo escolhido; gastava 2 PM em todo ataque.
	["Anticriatura", "enchantment", (ef) => ef.system.abilityUse?.automatic, (ef) => (ef.system.abilityUse.automatic = false)],
	// Harmonizado (p. 165): só a magia escolhida custa –1 PM; valia para todas.
	["Harmonizado", "improvement", (ef) => ef.system.abilityUse?.automatic, (ef) => (ef.system.abilityUse.automatic = false)],
	// Energético (p. 165): +1d6 só em magias que causam dano; somava também na cura.
	["Energético", "improvement", (ef) => ef.system.abilityUse?.automatic, (ef) => (ef.system.abilityUse.automatic = false)],
	// Profana (p. 336): "+2d8 de dano" — o tipo "treva" não existe. Tumular: "+1d8 de dano de trevas" sem tipo.
	["Profana", "enchantment", (ef) => temMudanca(ef, "dano", null, "2d8[treva]"), (ef) => setarValor(ef, "dano", "2d8")],
	["Tumular", "enchantment", (ef) => temMudanca(ef, "dano", null, "1d8"), (ef) => setarValor(ef, "dano", "1d8[trevas]")],
	// Gelo Eterno (arma, p. 166): "+2 pontos de dano por frio"; "2[frio]" quebrava a rolagem e "daon" nem existe.
	[
		"Gelo Eterno",
		"material",
		(ef) => (ef.system?.upgrade?.itemType ?? []).includes("weapon") && (temMudanca(ef, "daon") || temMudanca(ef, "dano", null, "2[frio]")),
		(ef) => {
			for (const c of ef.system.changes) if (["daon", "dano"].includes(c.key)) Object.assign(c, { key: "dano", value: "2d1[frio]" });
		}
	],
	// Sob Medida (p. 166): "reduz a penalidade de armadura em 2" e exige Ajustada (–1). O dado somava –2
	// à Ajustada (–3 no total); fica –1, para o total ser –2.
	[
		"Sob Medida",
		"improvement",
		(ef) => temMudanca(ef, "system.attributes.defesa.pda", "add", -2),
		(ef) => setarValor(ef, "system.attributes.defesa.pda", "-1")
	],
	// Matéria Vermelha (armadura, p. 167): –2 nas perícias de Carisma; faltava Jogatina.
	[
		"Matéria Vermelha",
		"material",
		(ef) => temMudanca(ef, "system.pericias.dipl.bonus") && !temMudanca(ef, "system.pericias.joga.bonus"),
		(ef) => ef.system.changes.push(mudanca("system.pericias.joga.bonus", "add", "-2"))
	]
];

/** Nomes do escudo usado como arma no compêndio de Equipamentos ("Escudo pesado (Arma)"). */
function armasDoEscudo(item) {
	const nomes = [`${item.name} (Arma)`];
	if (!/^escudo (leve|pesado)$/i.test(String(item.name ?? "").trim())) nomes.push("Escudo leve (Arma)", "Escudo pesado (Arma)");
	return nomes;
}

/**
 * Melhorias que dependem do item onde estão:
 * - Delicada (p. 164): "permite que o personagem aplique 1 ponto de sua Destreza na Defesa". O dado dava
 *   +1 sempre; vira até 1 ponto de Destreza (nada com Destreza 0 ou negativa).
 * - Aprimorado (p. 164): "+1 nessa perícia" (a que a ferramenta ou o vestuário modifica). O dado dava +1
 *   em Acrobacia em qualquer item; passa para a perícia do item. Sem perícia no item, fica desligado.
 * - Esmagador (encanto, p. 338) e Espinhosa (melhoria, p. 165) de escudo: valem nos ataques com o escudo,
 *   que no sistema é outro item ("Escudo pesado (Arma)"); no escudo-armadura não valiam em nada.
 */
function corrigirMelhoriaPeloItem(item, ef) {
	const changes = ef.system?.changes ?? [];
	if (ef.name === "Delicada" && ef.system.upgrade.type === "improvement" && temMudanca(ef, "system.attributes.defesa.bonus", "add", 1)) {
		setarValor(ef, "system.attributes.defesa.bonus", "min(1, max(0, @des))");
		return true;
	}
	if (ef.name === "Aprimorado" && ef.system.upgrade.type === "improvement" && !ef.flags?.[MODULE_ID]?.periciaDoItem) {
		const pericia = (item.effects ?? [])
			.filter((o) => o !== ef && !o.system?.upgrade?.type)
			.flatMap((o) => o.system?.changes ?? [])
			.map((c) => String(c.key).match(/^system\.pericias\.(\w+)\.bonus$/)?.[1])
			.find(Boolean);
		ef.flags ??= {};
		ef.flags[MODULE_ID] = { ...(ef.flags[MODULE_ID] ?? {}), periciaDoItem: pericia ?? "nenhuma" };
		if (pericia) ef.system.changes = changes.map((c) => (/^system\.pericias\.\w+\.bonus$/.test(c.key) ? { ...c, key: `system.pericias.${pericia}.bonus` } : c));
		else ef.disabled = true;
		return true;
	}
	const deEscudo = (ef.name === "Esmagador" && ef.system.upgrade.type === "enchantment") || (ef.name === "Espinhosa (Escudo)" && ef.system.upgrade.type === "improvement");
	if (deEscudo && item.type === "equipamento" && ef.system?.onuse && !ef.system.abilityUse?.names?.length) {
		ef.system.abilityUse = { ...(ef.system.abilityUse ?? {}), types: [], names: armasDoEscudo(item) };
		return true;
	}
	return false;
}

function setarValor(ef, key, valor) {
	for (const c of ef.system.changes) if (c.key === key) c.value = valor;
}

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

/** Correções que não dependem do item onde o encanto está. */
export function corrigirEncanto(ef, stats) {
	const tipo = ef?.system?.upgrade?.type;
	if (!tipo) return false;
	let mudou = false;
	for (const [nome, tipoDaRegra, errado, corrigir] of REGRAS) {
		if (ef.name !== nome || tipo !== tipoDaRegra || !errado(ef)) continue;
		corrigir(ef);
		contar(stats, `encanto-${nome}`);
		mudou = true;
	}
	return mudou;
}

/**
 * Correções que dependem do item:
 * - Ameaçadora (p. 335): "a margem de ameaça da arma duplica… aplicados antes de quaisquer efeitos que
 *   a aumentem". O dado multiplicava o número (19 virava 38: nunca crítico). Margem 19–20 vira 17–20:
 *   soma (margem − 21) ao número, antes da Precisa.
 * - Adamante e Gelo Eterno (armadura, p. 166): leve e escudo, 2/5; pesada, 5/10. O efeito somava os
 *   dois. Gelo Eterno é redução de fogo, não de frio.
 */
export function corrigirEncantosDoItem(item, stats) {
	let mudou = false;
	for (const ef of item?.effects ?? []) {
		const upgrade = ef.system?.upgrade;
		if (!upgrade?.type) continue;
		if (corrigirMelhoriaPeloItem(item, ef)) {
			contar(stats, `encanto-${ef.name}`);
			mudou = true;
		}
		if (item.type === "arma" && ef.name === "Ameaçadora" && temMudanca(ef, "criticoM", "multiply", 2)) {
			const margem = Number(item.system?.criticoM) || 20;
			ef.system.changes = ef.system.changes.map((c) => (c.key === "criticoM" && c.type === "multiply" ? mudanca("criticoM", "add", String(margem - 21)) : c));
			contar(stats, "encanto-Ameaçadora");
			mudou = true;
		}
		if (item.type !== "equipamento" || upgrade.type !== "material") continue;
		const pesada = item.system?.tipo === "pesada";
		const regras = { Adamante: ["system.tracos.resistencias.dano.bonus", [2, 5]], "Gelo Eterno": ["system.tracos.resistencias.frio.bonus", [5, 10]] };
		const regra = regras[ef.name];
		if (!regra) continue;
		const [chave, [leve, pesadoValor]] = regra;
		const daChave = ef.system.changes.filter((c) => c.key === chave);
		if (daChave.length < 2) continue;
		const fica = pesada ? pesadoValor : leve;
		ef.system.changes = [
			...ef.system.changes.filter((c) => c.key !== chave),
			mudanca(ef.name === "Gelo Eterno" ? "system.tracos.resistencias.fogo.bonus" : chave, "add", String(fica))
		];
		contar(stats, `encanto-${ef.name}`);
		mudou = true;
	}
	return mudou;
}
