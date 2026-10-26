/**
 * Poderes raciais e de linhagem do Jogo do Ano que não faziam o que o livro diz:
 * - Pequeno e Rechonchudo (Hynne, p. 28): tamanho Pequeno e deslocamento 6 m (só tinha o +2 em Enganação);
 * - Conhecimento das Rochas (Anão, p. 20): visão no escuro (não tinha sentido nenhum);
 * - Herança Divina (Suraggel, p. 31): visão no escuro (dava penumbra) e tipo espírito (não mudava o tipo);
 * - Resistência Elemental (Qareen, p. 26): RD 10 no tipo da ascendência. A chave "???" nunca valia;
 * - Linhagem Dracônica Básica (Feiticeiro, p. 39): Carisma nos PV iniciais e RD 5 no tipo escolhido. O
 *   efeito não era transferido para a ficha e a RD tinha "???";
 * - Linhagem Dracônica Superior: mais uma vez o Carisma nos PV iniciais e imunidade ao tipo (não tinha efeito).
 * As escolhas de tipo viram opções desligadas: ao receber o poder, a correção "Poderes dos suplementos que
 * eram feitos à mão" pergunta qual vale.
 */
import { MODULE_ID } from "../constants.mjs";
import { mesclar } from "./suplementos.mjs";

const mudanca = (key, type, value) => ({ key, type, value, phase: "initial", priority: null });

function efeito(id, nome, img, changes, { escolha = null, disabled = false } = {}) {
	return {
		_id: id,
		name: nome,
		img,
		type: "base",
		transfer: true,
		disabled,
		duration: { value: null, units: "seconds", expiry: null },
		system: { changes, onuse: false },
		flags: { [MODULE_ID]: escolha ? { escolha, poderRacial: true } : { poderRacial: true } }
	};
}

const TIPOS_QAREEN = [
	["frio", "frio (qareen da água)"],
	["eletricidade", "eletricidade (qareen do ar)"],
	["fogo", "fogo (qareen do fogo)"],
	["acido", "ácido (qareen da terra)"],
	["luz", "luz (qareen da luz)"],
	["trevas", "trevas (qareen das trevas)"]
];
const TIPOS_DRAGAO = [
	["acido", "ácido"],
	["eletricidade", "eletricidade"],
	["fogo", "fogo"],
	["frio", "frio"]
];
const IMG_QAREEN = "systems/tormenta20/icons/racas/qareen.webp";
const IMG_DRAGAO = "icons/creatures/reptiles/dragon-horned-blue.webp";

/** Por id do poder no compêndio do sistema: efeitos a mesclar (pelo id) e efeitos novos. */
const PODERES = {
	fLezjAZcNHYRx7rV: {
		nome: "Pequeno e Rechonchudo",
		novos: [efeito("fLezjAZcNHYRt20c", "Pequeno e Rechonchudo (tamanho e deslocamento)", "systems/tormenta20/icons/racas/hynne.webp", [mudanca("system.tracos.tamanho", "override", "peq"), mudanca("system.attributes.movement.walk.base", "override", 6)])]
	},
	"726XcodKEzHaBYI7": {
		nome: "Conhecimento das Rochas",
		novos: [efeito("726XcodKEzHat20c", "Conhecimento das Rochas (visão no escuro)", "systems/tormenta20/icons/racas/anao.webp", [mudanca("system.attributes.sentidos.value", "add", "escuro")])]
	},
	WEQnmmUNI1guD5HV: {
		nome: "Herança Divina",
		efeitos: { hXD4Zg1ZULMtHGVS: { system: { changes: [mudanca("system.attributes.sentidos.value", "add", "escuro"), mudanca("system.detalhes.tipo", "override", "esp")] } } }
	},
	hpb7TnXraUY1qevb: {
		nome: "Resistência Elemental",
		efeitos: { Q3qMj1DjSIm6jetH: { name: `Resistência Elemental: ${TIPOS_QAREEN[0][1]}`, disabled: true, system: { changes: [mudanca(`system.tracos.resistencias.${TIPOS_QAREEN[0][0]}.bonus`, "add", 10)] }, flags: { [MODULE_ID]: { escolha: "tipo" } } } },
		novos: TIPOS_QAREEN.slice(1).map(([tipo, rotulo], i) => efeito(`hpb7TnXraUYt20c${i}`, `Resistência Elemental: ${rotulo}`, IMG_QAREEN, [mudanca(`system.tracos.resistencias.${tipo}.bonus`, "add", 10)], { escolha: "tipo", disabled: true }))
	},
	zN0rhkCdrNYDXb0d: {
		nome: "Linhagem Dracônica Básica",
		efeitos: { SkxNZ7zAwytIgSY8: { transfer: true, name: "Linhagem Dracônica Básica (Carisma nos PV iniciais)", system: { changes: [mudanca("system.attributes.pv.atributos.car", "override", true)] } } },
		novos: TIPOS_DRAGAO.map(([tipo, rotulo], i) => efeito(`zN0rhkCdrNYt20c${i}`, `Linhagem Dracônica: RD 5 contra ${rotulo}`, IMG_DRAGAO, [mudanca(`system.tracos.resistencias.${tipo}.bonus`, "add", 5)], { escolha: "tipo", disabled: true }))
	},
	WfXsE12QuL31ns3S: {
		nome: "Linhagem Dracônica Superior",
		novos: [
			efeito("WfXsE12QuL31t20c", "Linhagem Dracônica Superior (Carisma de novo nos PV iniciais)", IMG_DRAGAO, [mudanca("system.attributes.pv.bonus.total", "add", "@car")]),
			...TIPOS_DRAGAO.map(([tipo, rotulo], i) => efeito(`WfXsE12QuL3t20c${i}`, `Linhagem Dracônica: imunidade a ${rotulo}`, IMG_DRAGAO, [mudanca(`system.tracos.resistencias.${tipo}.imunidade`, "override", true)], { escolha: "tipo", disabled: true }))
		]
	}
};

function contar(stats, regra) {
	if (stats) stats[regra] = (stats[regra] ?? 0) + 1;
}

function idDoPoder(item) {
	if (PODERES[item._id]?.nome === item.name) return item._id;
	const origem = item._stats?.compendiumSource ?? item.flags?.core?.sourceId ?? "";
	// Fichas antigas guardam a origem sem o ".Item." (Compendium.tormenta20.poderes.<id>).
	const id = origem.match(/^Compendium\.tormenta20\.poderes\.(?:Item\.)?(\w{16})$/)?.[1];
	return id && PODERES[id] ? id : null;
}

/** @returns {boolean} se mudou algo */
export function corrigirPoderesRaciais(item, stats) {
	if (item?.type !== "poder") return false;
	const id = idDoPoder(item);
	if (!id) return false;
	const entrada = PODERES[id];
	let mudou = false;
	item.effects ??= [];
	for (const ef of item.effects) {
		const patch = entrada.efeitos?.[ef._id];
		if (!patch) continue;
		// A escolha já feita (opção ligada) não volta a ficar desligada.
		const escolhido = ef.disabled === false && item.flags?.[MODULE_ID]?.escolha;
		if (mesclar(ef, escolhido ? { ...patch, disabled: false } : patch)) mudou = true;
	}
	for (const novo of entrada.novos ?? []) {
		if (item.effects.some((e) => e._id === novo._id)) continue;
		item.effects.push(structuredClone(novo));
		mudou = true;
	}
	if (mudou) contar(stats, "poder-racial");
	return mudou;
}
