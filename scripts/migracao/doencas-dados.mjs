/**
 * Doenças do Jogo do Ano (p. 318) e das Ameaças de Arton (p. 358–359), transcritas à mão.
 * Cada estágio é o efeito de um dia de doença; "/" no livro separa os estágios progressivos:
 * - condicoes: condições que valem naquele dia;
 * - perda: PV perdidos (dado); pm: PM perdidos (dado);
 * - atributos: perda permanente de 1 ponto (só uma vez por doença, a não ser com `cumulativo`);
 * - vulneravelA: vulnerabilidade a um tipo de dano; morte; explosao: dano em área ao morrer;
 * - reinicia: depois do efeito, a doença volta ao começo (Náusea Antinatural); nota: o que fica com o mestre.
 * cura: testes seguidos para curar (2 pelo JdA); "magica": só por magia, passar só impede a progressão;
 * "nenhuma": não tem cura, passar só impede a progressão naquele dia.
 */
const c = (...condicoes) => ({ condicoes });
const perda = (dado) => ({ perda: dado });
const atributo = (...atributos) => ({ atributos });
const morte = (extra = {}) => ({ morte: true, ...extra });

export const DOENCAS = {
	// Jogo do Ano, p. 318
	"calafrio-diabolico": { nome: "Calafrio Diabólico", fonte: "JdA p. 318", transmissao: "contato", cd: 25, estagios: [c("fraco"), c("debilitado"), c("inconsciente"), morte()] },
	"febre-do-riso": { nome: "Febre do Riso", fonte: "JdA p. 318", transmissao: "inalação", cd: 20, estagios: [c("frustrado"), c("esmorecido"), c("confuso")], nota: "a condição se ativa no início de cada cena" },
	"febre-mental": { nome: "Febre Mental", fonte: "JdA p. 318", transmissao: "inalação", cd: 20, estagios: [c("frustrado"), c("esmorecido"), c("alquebrado")] },
	"infeccao-do-esgoto": { nome: "Infecção do Esgoto", fonte: "JdA p. 318", transmissao: "contato", cd: 15, estagios: [c("fraco"), c("debilitado")] },
	"maldicao-pegajosa": { nome: "Maldição Pegajosa", fonte: "JdA p. 318", transmissao: "contato", cd: 20, estagios: [perda("1d12"), perda("2d12"), perda("4d12")], cura: 3 },
	"molestia-demoniaca": { nome: "Moléstia Demoníaca", fonte: "JdA p. 318", transmissao: "contato", cd: 20, estagios: [perda("1d12"), perda("2d12"), atributo("con"), morte()] },
	tremores: { nome: "Tremores", fonte: "JdA p. 318", transmissao: "contato", cd: 15, estagios: [c("vulneravel")] },
	variola: { nome: "Varíola", fonte: "JdA p. 318", transmissao: "inalação", cd: 20, estagios: [c("enjoado"), c("debilitado"), atributo("car"), morte()] },
	// Ameaças de Arton, p. 358–359
	"descompressao-eterea": { nome: "Doença de Descompressão Etérea", fonte: "Ameaças de Arton p. 358", transmissao: "contato", cd: 20, estagios: [c("esmorecido"), { pm: "2d10", nota: "os PM perdidos não podem ser recuperados até a doença ser curada" }] },
	"febre-do-carnical": { nome: "Febre do Carniçal", fonte: "Ameaças de Arton p. 358", transmissao: "contato", cd: 15, estagios: [c("fraco"), c("enjoado"), morte({ nota: "retorna como um carniçal na próxima meia-noite" })] },
	"febre-necrotica": { nome: "Febre Necrótica", fonte: "Ameaças de Arton p. 358", transmissao: "contato", cd: 20, estagios: [c("fraco"), c("debilitado"), morte({ nota: "se torna um zumbi três dias depois" })] },
	"gripe-do-fluxo": { nome: "Gripe do Fluxo", fonte: "Ameaças de Arton p. 358", transmissao: "inalação", cd: 25, estagios: [c("esmorecido"), { nota: "não pode sustentar magias até o fim da doença" }, atributo("sab")] },
	"infeccao-escarlate": { nome: "Infecção Escarlate", fonte: "Ameaças de Arton p. 358", transmissao: "contato", cd: 20, estagios: [perda("1d12"), perda("2d12"), atributo("car"), morte({ nota: "retorna como um infecto no dia seguinte" })] },
	"nausea-antinatural": {
		nome: "Náusea Antinatural",
		fonte: "Ameaças de Arton p. 358",
		transmissao: "contato",
		cd: 25,
		estagios: [
			{ pm: "1d4", perda: "1d12" },
			{ pm: "2d4", perda: "2d12" },
			{ reinicia: true, nota: "expele 1 enxame infernal (Ameaças de Arton p. 21) e o ciclo da doença se reinicia" }
		],
		nota: "os PM e PV perdidos não podem ser recuperados até a doença ser curada"
	},
	"podridao-da-mumia": { nome: "Podridão da Múmia", fonte: "Ameaças de Arton p. 358", transmissao: "contato", cd: 20, estagios: [c("lento"), c("fatigado"), c("exausto"), atributo("con"), morte()], cura: "magica" },
	"praga-coral": {
		nome: "Praga Coral",
		fonte: "Ameaças de Arton p. 358",
		transmissao: "contato e inalação",
		cd: 35,
		estagios: [c("fraco"), c("debilitado"), { condicoes: ["debilitado"], atributos: ["for", "con", "car"], cumulativo: true, nota: "se qualquer atributo chegar a –5, a vítima se torna um monstro sob controle do mestre" }],
		cura: "nenhuma"
	},
	"pulmao-em-brasa": { nome: "Pulmão em Brasa", fonte: "Ameaças de Arton p. 359", transmissao: "inalação", cd: 20, estagios: [c("fatigado"), c("exausto"), morte({ explosao: "6d6[fogo]", nota: "morre em uma explosão: 6d6 de fogo em todas as criaturas num raio de 3m" })] },
	"rinite-feerica": {
		nome: "Rinite Feérica",
		fonte: "Ameaças de Arton p. 359",
		transmissao: "inalação",
		cd: 20,
		estagios: [{ nota: "vulnerável a magia" }, { condicoes: ["alquebrado"], nota: "vulnerável a magia" }, { condicoes: ["alquebrado"], nota: "vulnerável a magia; quando é afetada por um efeito mágico, fica enjoada por 1 rodada" }]
	},
	"tremedeira-desastrada": { nome: "Tremedeira Desastrada", fonte: "Ameaças de Arton p. 359", transmissao: "inalação", cd: 20, estagios: [c("fatigado"), c("exausto"), { condicoes: ["exausto"], nota: "a cada ataque, 25% de chance (1 em 1d4) de deixar a arma cair" }] }
};

// Alergia Elemental: uma versão por tipo de energia (Ameaças de Arton p. 358).
const ALERGIAS = { acido: ["ácido", "fica vulnerável"], eletricidade: ["eletricidade", "fica ofuscada"], fogo: ["fogo", "fica em chamas"], frio: ["frio", "fica lenta"], luz: ["luz", "fica cega"], trevas: ["trevas", "a recuperação de PV cai à metade"] };
for (const [tipo, [nome, condicao]] of Object.entries(ALERGIAS)) {
	DOENCAS[`alergia-elemental-${tipo}`] = {
		nome: `Alergia Elemental (${nome})`,
		fonte: "Ameaças de Arton p. 358",
		transmissao: "contato e ingestão",
		cd: 25,
		estagios: [
			{ vulneravelA: tipo },
			{ vulneravelA: tipo, nota: `quando sofre dano de ${nome}, perde 1 PM` },
			{ vulneravelA: tipo, nota: `quando sofre dano de ${nome}, perde 1 PM e ${condicao}` }
		]
	};
}
