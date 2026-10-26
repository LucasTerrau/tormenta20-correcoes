/**
 * Segunda parte dos encantos (JdA p. 335–339). O sistema copia um único efeito por encanto para o item;
 * quando o encanto tem uma parte fixa e uma ativada ("Uma vez por rodada, quando ataca, você pode gastar
 * 2 PM…"), a parte ativada ficava de fora. Aqui o item ganha, em memória, os efeitos que faltam: uma
 * opção de uso com o custo em PM e, quando preciso, o efeito guardado que essa opção puxa para o cartão.
 * Os efeitos novos têm id fixo derivado do encanto e somem junto com ele.
 */
import { MODULE_ID } from "../constants.mjs";

const mudanca = (key, type, value) => ({ key, type, value, phase: "initial", priority: null });
const CENA = { expiry: "sceneEnd", units: "rounds", value: null };
const rodadas = (value) => ({ expiry: "turnStart", units: "rounds", value });

/** Opção no diálogo de uso do item, desmarcada, com custo em PM. */
const uso = (sufixo, nome, { custo = null, aumenta = false, changes = [], types = ["self"], names = [], flags = {} } = {}) => ({
	sufixo,
	nome,
	onuse: true,
	disabled: true,
	abilityUse: { automatic: false, aumenta, custo, types, names },
	changes,
	flags
});

/** Efeito guardado no item (desligado): só entra no cartão puxado por uma opção de uso ("efeito"). */
const guardado = (sufixo, nome, changes, duration, flags = {}) => ({ sufixo, nome, onuse: false, disabled: true, changes, duration, flags });

/**
 * [encanto, tipo de item, efeitos novos, ajuste no efeito do próprio encanto, tipo de aprimoramento (padrão: encanto)]
 * Flags usadas pela correção "encantosAtivados" na hora do uso:
 * - rolagem: rolagem extra no cartão (o raio da Elétrica, a bola de fogo da Flamejante, a perda de vida da Tumular);
 * - condicao: duração e dano por rodada da condição que a opção aplica (o sistema não dá duração a condições);
 * - umaVezPorRodada: depois de usada, a opção fica bloqueada até a rodada seguinte (em combate).
 */
const ENCANTOS = [
	[
		"Congelante",
		"weapon",
		[
			uso("T2c1", "Congelante: vítima enredada por 1 rodada (2 PM, 1×/rodada)", {
				custo: 2,
				changes: [mudanca("condicao", "add", "enredado")],
				flags: { condicao: { status: "enredado", rodadas: 1 }, umaVezPorRodada: true }
			})
		]
	],
	[
		"Corrosiva",
		"weapon",
		[
			uso("T2c1", "Corrosiva: 4d4 de ácido na próxima rodada (2 PM, 1×/rodada)", { custo: 2, changes: [mudanca("efeito", "add", "Ácido da Corrosiva")], flags: { umaVezPorRodada: true } }),
			guardado("T2c2", "Ácido da Corrosiva", [mudanca("danoContinuo", "add", "4d4[acido]")], rodadas(1))
		]
	],
	[
		"Elétrica",
		"weapon",
		[
			uso("T2c1", "Elétrica: raio de 3d8 em outra criatura (2 PM, 1×/rodada)", {
				custo: 2,
				flags: { rolagem: { formula: "3d8[eletricidade]", titulo: "Raio da Elétrica (outra criatura em alcance curto)" }, umaVezPorRodada: true }
			})
		]
	],
	[
		"Flamejante",
		"weapon",
		[
			uso("T2c1", "Flamejante: bola de fogo em vez do ataque (2 PM, 1×/rodada)", {
				custo: 2,
				flags: {
					rolagem: { formula: "6d6[fogo]", titulo: "Bola de fogo da Flamejante (alcance médio)", resistencia: "Reflexos", atributos: ["for", "des"], emVezDoAtaque: true },
					umaVezPorRodada: true
				}
			})
		]
	],
	[
		"Tumular",
		"weapon",
		[
			uso("T2c1", "Tumular: +1d8 de trevas, você perde 1d8 PV (2 PM, 1×/rodada)", {
				custo: 2,
				changes: [mudanca("dano", "add", "1d8[trevas]")],
				flags: { rolagem: { formula: "1d8[perda]", titulo: "Tumular: você perde 1d8 PV" }, umaVezPorRodada: true }
			})
		]
	],
	// Venenosa: a opção de 2 PM já existe; faltavam as 3 rodadas e a perda de 1d12 PV por rodada.
	[
		"Venenosa",
		"weapon",
		[],
		(ef) => {
			setarFlag(ef, "condicao", { status: "envenenado", rodadas: 3, dano: "1d12[perda]" });
			setarFlag(ef, "umaVezPorRodada", true);
		}
	],
	// Anticriatura: a opção de 2 PM já existe (desmarcada pela correção de dados); falta o 1×/rodada.
	["Anticriatura", "weapon", [], (ef) => setarFlag(ef, "umaVezPorRodada", true)],
	[
		"Abençoado",
		"armor",
		[
			uso("T2c1", "Abençoado: +5 em resistência contra necromancia", {
				types: ["skill"],
				names: ["Fortitude", "Reflexos", "Vontade"],
				changes: [mudanca("roll", "add", "5")],
				flags: { fonte: "encanto" }
			})
		]
	],
	[
		"Incandescente",
		"armor",
		[
			uso("T2c1", "Incandescente: labaredas até o fim da cena (movimento, 2 PM)", { custo: 2, changes: [mudanca("efeito", "add", "Labaredas do Incandescente: 1d6 de fogo nas criaturas adjacentes")] }),
			guardado("T2c2", "Labaredas do Incandescente: 1d6 de fogo nas criaturas adjacentes", [mudanca("danoContinuo", "add", "1d6[fogo]")], CENA)
		]
	],
	// Alado: o voo (efeito do próprio encanto) passa a ser puxado pela opção que cobra os 2 PM.
	["Alado", "armor", [uso("T2c1", "Alado: asas, voo 12m sustentado (2 PM)", { custo: 2, changes: [mudanca("efeito", "add", "Alado")] })], (ef) => (ef.disabled = true)],
	// Encantos que eram só texto (JdA p. 335–339): o que tem mecânica no sistema.
	// Arremesso: arremessar a arma é ataque à distância (Pontaria); o alcance e a volta ficam no texto.
	["Arremesso", "weapon", [uso("T2c1", "Arremesso: atacar arremessando (Pontaria; a arma volta)", { changes: [mudanca("pericia", "override", "pont")] })]],
	// Assassina: dados do Ataque Furtivo viram d8 (marca no principal); 2 PM rola de novo os 1.
	["Assassina", "weapon", [uso("T2c1", "Assassina: rolar de novo os 1 do Ataque Furtivo (2 PM)", { custo: 2, flags: { assassina: "rerolar" } })], (ef) => setarFlag(ef, "assassina", "d8")],
	// Dançarina: 1 PM, a arma ataca sozinha; sustentada (o sistema cria o "Sustentando").
	[
		"Dançarina",
		"weapon",
		[
			uso("T2c1", "Dançarina: a arma flutua e ataca sozinha (movimento, 1 PM, sustentada)", { custo: 1, changes: [mudanca("efeito", "add", "Arma dançarina")] }),
			guardado("T2c2", "Arma dançarina", [], { expiry: "sustainEnd", units: "rounds", value: null })
		]
	],
	// Animado: 1 PM, o escudo flutua e defende sozinho até o fim da cena (marcador; a Defesa já conta o escudo).
	[
		"Animado",
		"armor",
		[
			uso("T2c1", "Animado: o escudo flutua até o fim da cena (movimento, 1 PM)", { custo: 1, changes: [mudanca("efeito", "add", "Escudo animado")] }),
			guardado("T2c2", "Escudo animado", [], CENA)
		]
	],
	// Fantasmagórico: lançar Manto de Sombras (6 PM, sustentada; conta como magia para "uma por vez").
	[
		"Fantasmagórico",
		"armor",
		[
			uso("T2c1", "Fantasmagórico: Manto de Sombras (6 PM, sustentada)", { custo: 6, changes: [mudanca("efeito", "add", "Manto de Sombras (Fantasmagórico)")] }),
			guardado("T2c2", "Manto de Sombras (Fantasmagórico)", [], { expiry: "sustainEnd", units: "rounds", value: null }, { magiaSustentada: true })
		]
	],
	["Ilusório", "armor", [uso("T2c1", "Ilusório: parecer roupa comum (movimento, 1 PM)", { custo: 1 })]],
	["Zeloso", "armor", [uso("T2c1", "Zeloso: tornar-se o alvo do ataque contra aliado adjacente (1 PM, 1×/rodada)", { custo: 1, flags: { umaVezPorRodada: true } })]],
	// Refletor: PM igual ao custo da magia refletida (a quantidade da opção), 1×/rodada; o reflexo fica à mão.
	["Refletor", "armor", [uso("T2c1", "Refletor: refletir magia (PM = custo da magia, 1×/rodada)", { custo: 1, aumenta: true, flags: { umaVezPorRodada: true } })]],
	// Espinhosa (armadura, melhoria): dano de perfuração igual à Força ao agarrar e no início de cada turno.
	[
		"Espinhosa (Armadura)",
		"armor",
		[
			uso("T2c1", "Espinhosa: agarrou ou foi agarrado (dano = Força, perfuração)", {
				changes: [mudanca("efeito", "add", "Espinhos da armadura (agarrando)")],
				flags: { rolagem: { formula: "@for[perfuracao]", titulo: "Espinhosa: dano na criatura do agarrão" } }
			}),
			guardado("T2c2", "Espinhos da armadura (agarrando)", [mudanca("danoContinuo", "add", "@for[perfuracao]")], CENA)
		],
		null,
		"improvement"
	],
	// Injeção Alquímica (melhoria): a carga do preparado no acerto (as 2 doses ficam à mão).
	[
		"Injeção Alquímica",
		"weapon",
		[
			uso("T2c1", "Injeção alquímica: ácido (2d4)", { flags: { rolagem: { formula: "2d4[acido]", titulo: "Injeção alquímica: ácido", resistencia: "Reflexos", atributos: ["des"] } } }),
			uso("T2c2", "Injeção alquímica: fogo alquímico (1d6, em chamas)", {
				changes: [mudanca("condicao", "add", "em chamas")],
				flags: { rolagem: { formula: "1d6[fogo]", titulo: "Injeção alquímica: fogo (Reflexos também evita as chamas)", resistencia: "Reflexos", atributos: ["des"] } }
			}),
			uso("T2c3", "Injeção alquímica: água benta (2d10 de luz; morto-vivo, demônio, diabo)", {
				flags: { rolagem: { formula: "2d10[luz]", titulo: "Injeção alquímica: água benta", resistencia: "Reflexos", atributos: ["sab"] } }
			})
		],
		null,
		"improvement"
	]
];

function setarFlag(ef, chave, valor) {
	ef.flags ??= {};
	ef.flags[MODULE_ID] = { ...(ef.flags[MODULE_ID] ?? {}), [chave]: valor };
}

/** Muda quando a tabela muda: cópias gravadas de uma versão antiga são trocadas. */
const VERSAO = 3;
const ehCompanheiro = (ef) => Boolean(ef?.flags?.[MODULE_ID]?.companheiroDe);
const idDoCompanheiro = (principal, sufixo) => `${String(principal._id).slice(0, 12)}${sufixo}`;

function regraDoEncanto(ef) {
	const tipoDoAprimoramento = ef?.system?.upgrade?.type;
	if (!tipoDoAprimoramento) return null;
	const tipos = [...(ef.system.upgrade.itemType ?? [])];
	return (
		ENCANTOS.find(
			([nome, tipo, , , aprimoramento = "enchantment"]) =>
				nome === ef.name && aprimoramento === tipoDoAprimoramento && (tipos.includes(tipo) || (tipo === "armor" && tipos.includes("shield")))
		) ?? null
	);
}

/** Dados dos efeitos novos de um encanto (planos, prontos para o item). */
export function companheirosDe(principal) {
	const regra = regraDoEncanto(principal);
	if (!regra || !principal._id) return [];
	return regra[2].map((c) => ({
		_id: idDoCompanheiro(principal, c.sufixo),
		name: c.nome,
		img: principal.img,
		type: principal.type ?? "base",
		description: principal.description ?? "",
		disabled: c.disabled,
		transfer: false,
		// Opção de uso sem duração: o sistema não oferece opções "temporárias" de itens.
		duration: c.duration ?? { value: null, units: "seconds", expiry: null },
		statuses: [],
		origin: null,
		flags: { [MODULE_ID]: { companheiroDe: principal._id, versao: VERSAO, ...c.flags } },
		system: {
			changes: structuredClone(c.changes),
			identifier: "",
			targets: [],
			onuse: c.onuse,
			abilityUse: structuredClone(c.abilityUse ?? { automatic: false, aumenta: false, custo: null, types: [], names: [] }),
			upgrade: { type: null, itemType: [] }
		}
	}));
}

/** Ajuste do efeito do próprio encanto (Alado desligado, Venenosa com duração). */
export function ajustarPrincipal(principal) {
	const ajuste = regraDoEncanto(principal)?.[3];
	if (!ajuste) return false;
	ajuste(principal);
	return true;
}

/**
 * Acrescenta (em memória) os efeitos que completam os encantos do item. Os que já vierem gravados de
 * uma versão antiga desta tabela (cópias feitas ao duplicar ou exportar o item) são trocados, e os de
 * um encanto que não está mais no item saem.
 * @returns {number} quantos efeitos foram acrescentados
 */
export function completarEncantos(item, stats) {
	const effects = item?.effects;
	if (!Array.isArray(effects) || !effects.length) return 0;
	const principais = new Set(effects.filter((ef) => !ehCompanheiro(ef)).map((ef) => ef._id));
	const ficam = effects.filter((ef) => !ehCompanheiro(ef) || (principais.has(ef.flags[MODULE_ID].companheiroDe) && ef.flags[MODULE_ID].versao === VERSAO));
	const ids = new Set(ficam.map((ef) => ef._id));
	let n = 0;
	for (const ef of effects) {
		if (ehCompanheiro(ef) || !regraDoEncanto(ef)) continue;
		ajustarPrincipal(ef);
		for (const novo of companheirosDe(ef)) {
			if (ids.has(novo._id)) continue;
			ficam.push(novo);
			ids.add(novo._id);
			n++;
			if (stats) stats[`ativado-${ef.name}`] = (stats[`ativado-${ef.name}`] ?? 0) + 1;
		}
	}
	if (n || ficam.length !== effects.length) item.effects = ficam;
	return n;
}
