/**
 * Dados de regras do criador de personagens e da subida de nível (Tormenta20 1.6.5).
 * GERADO por dev/criador/gerar-dados.mjs a partir de dev/criador/fontes/*.json — não editar à mão.
 *
 * PERICIAS   chave do sistema -> nome. "ofic" (fora da lista) = um Ofício a escolher (REGRAS.pericias).
 * CLASSES    pv.inicial/porNivel e pm.porNivel como no livro (o sistema soma a Constituição).
 *            pericias.fixas: uma lista interna = escolha uma delas. niveis: cada linha da tabela da classe;
 *            { poder: true } = "Poder de <classe>" ({ poder, classe } nas variantes = lista da classe básica);
 *            { nome, detalhe? } = habilidade nova; { nome, detalhe, melhora: true } = só melhora uma habilidade
 *            já recebida (uuid = o da habilidade-base); { nome, escolha: [...] } = opções a escolher;
 *            novo = _id em NOVOS_ITENS de scripts/migracao/classes-dados.mjs (habilidade que falta no compêndio).
 *            variante = chave da classe básica (Heróis de Arton). devocao: null | "obrigatoria" | "proibida",
 *            com devocaoRegra { divindades (chaves de DIVINDADES; null = qualquer), nota }. Ver REGRAS.classes.
 * ORIGENS    tipo "basica" (JdA: escolha 2 entre pericias/poderes/poderesEscolha/unico), "especial" (Heróis
 *            de Arton) ou "regional" (Atlas de Arton): recebe tudo; ver REGRAS.origens. itens: { nome, qtd?,
 *            uuid? }, { escolha: [...] }, { categoria } (genérico), { dinheiro }, { animal }.
 * DIVINDADES energia, devotos, poderes concedidos (com a fonte de cada um), obrigacoes. Ver REGRAS.divindades.
 * Nomes sem uuid não existem nos compêndios (fica só o nome do livro).
 */
export const PERICIAS = {
	"acro": "Acrobacia",
	"ades": "Adestramento",
	"atle": "Atletismo",
	"atua": "Atuação",
	"cava": "Cavalgar",
	"conh": "Conhecimento",
	"cura": "Cura",
	"dipl": "Diplomacia",
	"enga": "Enganação",
	"fort": "Fortitude",
	"furt": "Furtividade",
	"guer": "Guerra",
	"inic": "Iniciativa",
	"inti": "Intimidação",
	"intu": "Intuição",
	"inve": "Investigação",
	"joga": "Jogatina",
	"ladi": "Ladinagem",
	"luta": "Luta",
	"mist": "Misticismo",
	"nobr": "Nobreza",
	"perc": "Percepção",
	"pilo": "Pilotagem",
	"pont": "Pontaria",
	"refl": "Reflexos",
	"reli": "Religião",
	"sobr": "Sobrevivência",
	"vont": "Vontade",
	"alfa": "Ofício: Alfaiate",
	"alqu": "Ofício: Alquimista",
	"arme": "Ofício: Armeiro",
	"arte": "Ofício: Artesão",
	"cozi": "Ofício: Cozinheiro",
	"enge": "Ofício: Engenhoqueiro"
};

export const CLASSES = {
	"arcanista": {
		"nome": "Arcanista",
		"fonte": "JdA p. 36",
		"pv": {
			"inicial": 8,
			"porNivel": 2
		},
		"pm": {
			"porNivel": 6
		},
		"pericias": {
			"fixas": [
				"mist",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"conh",
				"dipl",
				"enga",
				"guer",
				"inic",
				"inti",
				"intu",
				"inve",
				"nobr",
				"ofic",
				"perc"
			]
		},
		"proficiencias": [],
		"magias": {
			"tipo": "arc",
			"atributo": "int",
			"atributoPorCaminho": {
				"bruxo": "int",
				"feiticeiro": "car",
				"mago": "int"
			},
			"iniciais": 3,
			"porNivel": {
				"2": 1,
				"3": 1,
				"4": 1,
				"5": 1,
				"6": 1,
				"7": 1,
				"8": 1,
				"9": 1,
				"10": 1,
				"11": 1,
				"12": 1,
				"13": 1,
				"14": 1,
				"15": 1,
				"16": 1,
				"17": 1,
				"18": 1,
				"19": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"5": 2,
				"9": 3,
				"13": 4,
				"17": 5
			},
			"escolas": null,
			"caminhos": {
				"feiticeiro": {
					"porNivel": {
						"3": 1,
						"5": 1,
						"7": 1,
						"9": 1,
						"11": 1,
						"13": 1,
						"15": 1,
						"17": 1,
						"19": 1
					},
					"nota": "Aprende uma magia nova a cada nível ímpar (3º, 5º, 7º etc.), em vez de a cada nível."
				},
				"mago": {
					"iniciais": 4,
					"porCirculoNovo": 1,
					"nota": "Começa com uma magia adicional (total de 4) e, sempre que ganha acesso a um novo círculo, aprende uma magia adicional daquele círculo. Só lança magias memorizadas (metade das que conhece, escolhidas ao estudar o grimório por uma hora, uma vez por dia)."
				}
			},
			"nota": "Magias arcanas de 1º círculo; um círculo maior a cada quatro níveis (2º no 5º nível, 3º no 9º etc.). Começa com três magias de 1º círculo e aprende uma de qualquer círculo que possa lançar a cada nível. O atributo-chave vem do Caminho (Bruxo e Mago: Inteligência; Feiticeiro: Carisma) e é somado aos PM."
		},
		"devocao": null,
		"nota": "Caminho do Arcanista (1º nível, permanente): Bruxo (lança por um foco; Int), Feiticeiro (linhagem — recebe a herança básica da linhagem escolhida: Linhagem Dracônica, Feérica ou Rubra Básica; Car) ou Mago (grimório e memorização; Int). Ver magias.caminhos e linhagens.",
		"linhagens": [
			{
				"nome": "Linhagem Dracônica",
				"fonte": "JdA p. 39",
				"basica": {
					"nome": "Linhagem Dracônica Básica",
					"uuid": "Compendium.tormenta20.poderes.Item.zN0rhkCdrNYDXb0d"
				}
			},
			{
				"nome": "Linhagem Feérica",
				"fonte": "JdA p. 39",
				"basica": {
					"nome": "Linhagem Feérica Básica",
					"uuid": "Compendium.tormenta20.poderes.Item.oMsR6mOGj5yQjQU3"
				}
			},
			{
				"nome": "Linhagem Rubra",
				"fonte": "JdA p. 39",
				"basica": {
					"nome": "Linhagem Rubra Básica",
					"uuid": "Compendium.tormenta20.poderes.Item.j7UGNfhrx5OonTZb"
				}
			},
			{
				"nome": "Linhagem Abençoada",
				"fonte": "DdA p. 33",
				"basica": {
					"nome": "Linhagem Abençoada Básica",
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.NdH59YoixFppfAFF"
				}
			}
		],
		"uuid": "Compendium.tormenta20.classes.Item.TH7OIKaDqtLLQUrs",
		"niveis": {
			"1": [
				{
					"nome": "Caminho do Arcanista",
					"novo": "t20cCamArcanista",
					"escolha": [
						{
							"nome": "Bruxo"
						},
						{
							"nome": "Feiticeiro"
						},
						{
							"nome": "Mago"
						}
					]
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.tormenta20.poderes.Item.h9AyRa8MIyNyhBen"
				}
			],
			"2": [
				{
					"poder": true
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.h9AyRa8MIyNyhBen"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.h9AyRa8MIyNyhBen"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.h9AyRa8MIyNyhBen"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Magias",
					"detalhe": "5º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.h9AyRa8MIyNyhBen"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Alta Arcana",
					"uuid": "Compendium.tormenta20.poderes.Item.rZ6PYYmxg4z2Q3I7"
				},
				{
					"poder": true
				}
			]
		}
	},
	"barbaro": {
		"nome": "Bárbaro",
		"fonte": "JdA p. 40",
		"pv": {
			"inicial": 24,
			"porNivel": 6
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"fort",
				"luta"
			],
			"escolha": 4,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"inic",
				"inti",
				"ofic",
				"perc",
				"pont",
				"sobr",
				"vont"
			]
		},
		"proficiencias": [
			"marciais",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"uuid": "Compendium.tormenta20.classes.Item.FiMbJLurhpstUxu1",
		"niveis": {
			"1": [
				{
					"nome": "Fúria",
					"detalhe": "+2",
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				}
			],
			"2": [
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Instinto Selvagem",
					"detalhe": "+1",
					"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"poder": true
				},
				{
					"nome": "Redução de Dano",
					"detalhe": "2",
					"uuid": "Compendium.tormenta20.poderes.Item.CMsmsKiFKpZTgQtB"
				}
			],
			"6": [
				{
					"nome": "Fúria",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				},
				{
					"nome": "Redução de Dano",
					"detalhe": "4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.CMsmsKiFKpZTgQtB"
				}
			],
			"9": [
				{
					"nome": "Instinto Selvagem",
					"detalhe": "+2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"nome": "Fúria",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"poder": true
				},
				{
					"nome": "Redução de Dano",
					"detalhe": "6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.CMsmsKiFKpZTgQtB"
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				},
				{
					"nome": "Redução de Dano",
					"detalhe": "8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.CMsmsKiFKpZTgQtB"
				}
			],
			"15": [
				{
					"nome": "Instinto Selvagem",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
				},
				{
					"poder": true
				}
			],
			"16": [
				{
					"nome": "Fúria",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"poder": true
				}
			],
			"17": [
				{
					"poder": true
				},
				{
					"nome": "Redução de Dano",
					"detalhe": "10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.CMsmsKiFKpZTgQtB"
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Fúria Titânica",
					"uuid": "Compendium.tormenta20.poderes.Item.fuzKiQyprFslFK41"
				},
				{
					"poder": true
				}
			]
		}
	},
	"bardo": {
		"nome": "Bardo",
		"fonte": "JdA p. 43",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"atua",
				"refl"
			],
			"escolha": 6,
			"opcoes": [
				"acro",
				"cava",
				"conh",
				"dipl",
				"enga",
				"furt",
				"inic",
				"intu",
				"inve",
				"joga",
				"ladi",
				"luta",
				"mist",
				"nobr",
				"perc",
				"pont",
				"vont"
			]
		},
		"proficiencias": [
			"marciais"
		],
		"magias": {
			"tipo": "arc",
			"atributo": "car",
			"iniciais": 2,
			"porNivel": {
				"2": 1,
				"4": 1,
				"6": 1,
				"8": 1,
				"10": 1,
				"12": 1,
				"14": 1,
				"16": 1,
				"18": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"6": 2,
				"10": 3,
				"14": 4
			},
			"escolas": null,
			"escolherEscolas": 3,
			"nota": "Escolha três escolas de magia (permanente); só lança magias arcanas dessas escolas. Começa com duas magias de 1º círculo e aprende uma de qualquer círculo e escola que possa lançar a cada nível par. Pode lançar vestindo armadura leve sem teste de Misticismo. Soma o Carisma nos PM."
		},
		"devocao": null,
		"uuid": "Compendium.tormenta20.classes.Item.u3fr3IOtTXmsk2BT",
		"niveis": {
			"1": [
				{
					"nome": "Inspiração",
					"detalhe": "+1",
					"uuid": "Compendium.tormenta20.poderes.Item.Uv6GW8R54wUtv3sm"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.tormenta20.poderes.Item.5i2hWzYKWOjGtnyA"
				}
			],
			"2": [
				{
					"poder": true
				},
				{
					"nome": "Eclético",
					"uuid": "Compendium.tormenta20.poderes.Item.3EgQ8dXJNByFCZI6"
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Inspiração",
					"detalhe": "+2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Uv6GW8R54wUtv3sm"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5i2hWzYKWOjGtnyA"
				},
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Inspiração",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Uv6GW8R54wUtv3sm"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5i2hWzYKWOjGtnyA"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Inspiração",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Uv6GW8R54wUtv3sm"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5i2hWzYKWOjGtnyA"
				},
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Inspiração",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Uv6GW8R54wUtv3sm"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Artista Completo",
					"uuid": "Compendium.tormenta20.poderes.Item.6BsXApytiJlmZBxV"
				},
				{
					"poder": true
				}
			]
		}
	},
	"bucaneiro": {
		"nome": "Bucaneiro",
		"fonte": "JdA p. 46",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				[
					"luta",
					"pont"
				],
				"refl"
			],
			"escolha": 4,
			"opcoes": [
				"acro",
				"atle",
				"atua",
				"enga",
				"fort",
				"furt",
				"inic",
				"inti",
				"joga",
				"luta",
				"ofic",
				"perc",
				"pilo",
				"pont"
			]
		},
		"proficiencias": [
			"marciais"
		],
		"magias": null,
		"devocao": null,
		"uuid": "Compendium.tormenta20.classes.Item.uvMolF7vcMs0KbQl",
		"niveis": {
			"1": [
				{
					"nome": "Audácia",
					"uuid": "Compendium.tormenta20.poderes.Item.YmeB9GgmcJ54D9WU"
				},
				{
					"nome": "Insolência",
					"uuid": "Compendium.tormenta20.poderes.Item.pCXbUTE2qivVEe37"
				}
			],
			"2": [
				{
					"nome": "Evasão",
					"uuid": "Compendium.tormenta20.poderes.Item.1aHAxGnkuTaaBJDx"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+1",
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Panache",
					"uuid": "Compendium.tormenta20.poderes.Item.as8J99HTbAAOFVNA"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Evasão Aprimorada",
					"uuid": "Compendium.tormenta20.poderes.Item.SDSlkLynTwwAZkjR"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true
				}
			],
			"20": [
				{
					"poder": true
				},
				{
					"nome": "Sorte de Nimb",
					"uuid": "Compendium.tormenta20.poderes.Item.S1Rj3QDTfM8qytad"
				}
			]
		}
	},
	"cacador": {
		"nome": "Caçador",
		"fonte": "JdA p. 49",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				[
					"luta",
					"pont"
				],
				"sobr"
			],
			"escolha": 6,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"cura",
				"fort",
				"furt",
				"inic",
				"inve",
				"luta",
				"ofic",
				"perc",
				"pont",
				"refl"
			]
		},
		"proficiencias": [
			"marciais",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"nota": "Explorador: no 3º nível escolhe um tipo de terreno; a cada quatro níveis escolhe outro terreno ou aumenta em +2 o bônus em um já escolhido (área de Tormenta disponível a partir do 11º nível).",
		"uuid": "Compendium.tormenta20.classes.Item.xwI9ItqovNe5RMdF",
		"niveis": {
			"1": [
				{
					"nome": "Marca da Presa",
					"detalhe": "+1d4",
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"nome": "Rastreador",
					"uuid": "Compendium.tormenta20.poderes.Item.DRmhP15LqKyO9c4u"
				}
			],
			"2": [
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Explorador",
					"uuid": "Compendium.tormenta20.poderes.Item.756GKQn2ux8mAugb"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Caminho do Explorador",
					"uuid": "Compendium.tormenta20.poderes.Item.5tqYhzofvjgcBHGj"
				},
				{
					"nome": "Marca da Presa",
					"detalhe": "+1d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"nome": "Explorador",
					"detalhe": "outro terreno ou +2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.756GKQn2ux8mAugb"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Marca da Presa",
					"detalhe": "+1d12",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"nome": "Explorador",
					"detalhe": "outro terreno ou +2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.756GKQn2ux8mAugb"
				},
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Marca da Presa",
					"detalhe": "+2d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"nome": "Explorador",
					"detalhe": "outro terreno ou +2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.756GKQn2ux8mAugb"
				},
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Marca da Presa",
					"detalhe": "+2d10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"nome": "Explorador",
					"detalhe": "outro terreno ou +2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.756GKQn2ux8mAugb"
				},
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Mestre Caçador",
					"uuid": "Compendium.tormenta20.poderes.Item.fhHEWWNgKxS4xUal"
				},
				{
					"poder": true
				}
			]
		}
	},
	"cavaleiro": {
		"nome": "Cavaleiro",
		"fonte": "JdA p. 52",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"fort",
				"luta"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"dipl",
				"guer",
				"inic",
				"inti",
				"nobr",
				"perc",
				"vont"
			]
		},
		"proficiencias": [
			"marciais",
			"pesadas",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"nota": "Caminho do Cavaleiro (5º nível): Bastião ou Montaria.",
		"uuid": "Compendium.tormenta20.classes.Item.fzTv6gS1qu4lpstx",
		"niveis": {
			"1": [
				{
					"nome": "Baluarte",
					"detalhe": "+2",
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Código de Honra",
					"uuid": "Compendium.tormenta20.poderes.Item.kVmOn7TQXvedO40o"
				}
			],
			"2": [
				{
					"nome": "Duelo",
					"detalhe": "+2",
					"uuid": "Compendium.tormenta20.poderes.Item.oEVsmhWuBhpcXALl"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Caminho do Cavaleiro",
					"novo": "t20cCamCavaleiro",
					"escolha": [
						{
							"nome": "Bastião"
						},
						{
							"nome": "Montaria"
						}
					]
				},
				{
					"nome": "Baluarte",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"nome": "Baluarte",
					"detalhe": "aliados adjacentes",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Duelo",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.oEVsmhWuBhpcXALl"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Baluarte",
					"detalhe": "+6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				},
				{
					"nome": "Resoluto",
					"uuid": "Compendium.tormenta20.poderes.Item.PANeuipqdolT72aq"
				}
			],
			"12": [
				{
					"nome": "Duelo",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.oEVsmhWuBhpcXALl"
				},
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Baluarte",
					"detalhe": "+8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"nome": "Baluarte",
					"detalhe": "aliados em alcance curto",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Baluarte",
					"detalhe": "+10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Duelo",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.oEVsmhWuBhpcXALl"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Bravura Final",
					"uuid": "Compendium.tormenta20.poderes.Item.5bBcVLtoh86nEYuS"
				},
				{
					"poder": true
				}
			]
		}
	},
	"clerigo": {
		"nome": "Clérigo",
		"fonte": "JdA p. 56",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 5
		},
		"pericias": {
			"fixas": [
				"reli",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"conh",
				"cura",
				"dipl",
				"fort",
				"inic",
				"intu",
				"luta",
				"mist",
				"nobr",
				"ofic",
				"perc"
			]
		},
		"proficiencias": [
			"pesadas",
			"escudos"
		],
		"magias": {
			"tipo": "div",
			"atributo": "sab",
			"iniciais": 3,
			"porNivel": {
				"2": 1,
				"3": 1,
				"4": 1,
				"5": 1,
				"6": 1,
				"7": 1,
				"8": 1,
				"9": 1,
				"10": 1,
				"11": 1,
				"12": 1,
				"13": 1,
				"14": 1,
				"15": 1,
				"16": 1,
				"17": 1,
				"18": 1,
				"19": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"5": 2,
				"9": 3,
				"13": 4,
				"17": 5
			},
			"escolas": null,
			"nota": "Magias divinas de 1º círculo; um círculo maior a cada quatro níveis (2º no 5º nível, 3º no 9º etc.). Começa com três magias de 1º círculo e aprende uma de qualquer círculo que possa lançar a cada nível. Soma a Sabedoria nos PM."
		},
		"devocao": "obrigatoria",
		"devocaoRegra": {
			"divindades": null,
			"panteao": true,
			"nota": "Devoto Fiel: devoto de um deus maior (regras de devotos, p. 96); recebe dois poderes concedidos em vez de um. Alternativa: cultuar o Panteão como um todo — nenhum poder concedido; única obrigação e restrição é não usar armas cortantes ou perfurantes; arma preferida maça; canaliza energia positiva ou negativa a sua escolha (permanente). Cultuar o Panteão conta como sua devoção."
		},
		"uuid": "Compendium.tormenta20.classes.Item.EnHy1teosvZmcp4D",
		"niveis": {
			"1": [
				{
					"nome": "Devoto Fiel",
					"uuid": "Compendium.tormenta20.poderes.Item.VPqDSTuhkXo58XzA"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.tormenta20.poderes.Item.cgYwUcWVGrsAqVWF"
				}
			],
			"2": [
				{
					"poder": true
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.cgYwUcWVGrsAqVWF"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.cgYwUcWVGrsAqVWF"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.cgYwUcWVGrsAqVWF"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Magias",
					"detalhe": "5º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.cgYwUcWVGrsAqVWF"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Mão da Divindade",
					"uuid": "Compendium.tormenta20.poderes.Item.zIcI0vQGjAj1uCm0"
				},
				{
					"poder": true
				}
			]
		}
	},
	"druida": {
		"nome": "Druida",
		"fonte": "JdA p. 60",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"sobr",
				"vont"
			],
			"escolha": 4,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"conh",
				"cura",
				"fort",
				"inic",
				"intu",
				"luta",
				"mist",
				"ofic",
				"perc",
				"reli"
			]
		},
		"proficiencias": [
			"escudos"
		],
		"magias": {
			"tipo": "div",
			"atributo": "sab",
			"iniciais": 2,
			"porNivel": {
				"2": 1,
				"4": 1,
				"6": 1,
				"8": 1,
				"10": 1,
				"12": 1,
				"14": 1,
				"16": 1,
				"18": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"6": 2,
				"10": 3,
				"14": 4
			},
			"escolas": null,
			"escolherEscolas": 3,
			"nota": "Escolha três escolas de magia (permanente); só lança magias divinas dessas escolas. Começa com duas magias de 1º círculo e aprende uma de qualquer círculo e escola que possa lançar a cada nível par. Soma a Sabedoria nos PM."
		},
		"devocao": "obrigatoria",
		"devocaoRegra": {
			"divindades": [
				"allihanna",
				"megalokk",
				"oceano"
			],
			"nota": "Devoto Fiel: devoto de um deus disponível para druidas (Allihanna, Megalokk ou Oceano); recebe dois poderes concedidos em vez de um."
		},
		"uuid": "Compendium.tormenta20.classes.Item.ROLLbOHDe9gWNazQ",
		"niveis": {
			"1": [
				{
					"nome": "Devoto Fiel",
					"uuid": "Compendium.tormenta20.poderes.Item.a2c1cG5wrgJDHoKr"
				},
				{
					"nome": "Empatia Selvagem",
					"uuid": "Compendium.tormenta20.poderes.Item.vOXQtd4cC7bbh6u4"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.tormenta20.poderes.Item.EIM4Ph8h4v1WdLT4"
				}
			],
			"2": [
				{
					"nome": "Caminho dos Ermos",
					"uuid": "Compendium.tormenta20.poderes.Item.lItROoF5BIshKjat"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"poder": true
				}
			],
			"6": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.EIM4Ph8h4v1WdLT4"
				},
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.EIM4Ph8h4v1WdLT4"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"poder": true
				}
			],
			"14": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.EIM4Ph8h4v1WdLT4"
				},
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Força da Natureza",
					"uuid": "Compendium.tormenta20.poderes.Item.PmIU9RUwNQRtI4UU"
				},
				{
					"poder": true
				}
			]
		}
	},
	"guerreiro": {
		"nome": "Guerreiro",
		"fonte": "JdA p. 64",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				[
					"luta",
					"pont"
				],
				"fort"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"guer",
				"inic",
				"inti",
				"luta",
				"ofic",
				"perc",
				"pont",
				"refl"
			]
		},
		"proficiencias": [
			"marciais",
			"pesadas",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"uuid": "Compendium.tormenta20.classes.Item.DPhWNP689FygcOSZ",
		"niveis": {
			"1": [
				{
					"nome": "Ataque Especial",
					"detalhe": "+4",
					"uuid": "Compendium.tormenta20.poderes.Item.pO3Qh76K5lm9ukXH"
				}
			],
			"2": [
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Durão",
					"uuid": "Compendium.tormenta20.poderes.Item.VTzVqjsiOsECTkM1"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Ataque Especial",
					"detalhe": "+8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.pO3Qh76K5lm9ukXH"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"nome": "Ataque Extra",
					"uuid": "Compendium.tormenta20.poderes.Item.fhV9WO6UwhpmOgBS"
				},
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Ataque Especial",
					"detalhe": "+12",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.pO3Qh76K5lm9ukXH"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Ataque Especial",
					"detalhe": "+16",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.pO3Qh76K5lm9ukXH"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Ataque Especial",
					"detalhe": "+20",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.pO3Qh76K5lm9ukXH"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Campeão",
					"uuid": "Compendium.tormenta20.poderes.Item.j9JP0cwZtKXHek0D"
				},
				{
					"poder": true
				}
			]
		}
	},
	"inventor": {
		"nome": "Inventor",
		"fonte": "JdA p. 67",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"ofic",
				"vont"
			],
			"escolha": 4,
			"opcoes": [
				"conh",
				"cura",
				"dipl",
				"fort",
				"inic",
				"inve",
				"luta",
				"mist",
				"ofic",
				"pilo",
				"perc",
				"pont"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"nota": "Protótipo: começa o jogo com um item superior ou 10 itens alquímicos, com preço total de até T$ 500. Fabricar Item Superior (2º): recebe um item superior de até T$ 2.000 (troca nos níveis 5, 8 e 11 por itens com 2, 3 e 4 melhorias).",
		"uuid": "Compendium.tormenta20.classes.Item.WAyBowpFRVKRr0mq",
		"niveis": {
			"1": [
				{
					"nome": "Engenhosidade",
					"uuid": "Compendium.tormenta20.poderes.Item.P29KKQdQdwTCVuTj"
				},
				{
					"nome": "Protótipo",
					"uuid": "Compendium.tormenta20.poderes.Item.mu98bcBwZDZbWNcC"
				}
			],
			"2": [
				{
					"nome": "Fabricar Item Superior",
					"detalhe": "1 melhoria",
					"uuid": "Compendium.tormenta20.poderes.Item.Aj3ZiNCirzOhyOcG"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Comerciante",
					"uuid": "Compendium.tormenta20.poderes.Item.PTc85fan1L3fbGlM"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Fabricar Item Superior",
					"detalhe": "2 melhorias",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Aj3ZiNCirzOhyOcG"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"nome": "Encontrar Fraqueza",
					"uuid": "Compendium.tormenta20.poderes.Item.SW7dLug114XX3Mer"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"nome": "Fabricar Item Superior",
					"detalhe": "3 melhorias",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Aj3ZiNCirzOhyOcG"
				},
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Fabricar Item Mágico",
					"detalhe": "menor",
					"uuid": "Compendium.tormenta20.poderes.Item.ezYAnyUMkw6hf8iD"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Olho do Dragão",
					"uuid": "Compendium.tormenta20.poderes.Item.dehNb66kOtwgAiB5"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"nome": "Fabricar Item Superior",
					"detalhe": "4 melhorias",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.Aj3ZiNCirzOhyOcG"
				},
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Fabricar Item Mágico",
					"detalhe": "médio",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ezYAnyUMkw6hf8iD"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Fabricar Item Mágico",
					"detalhe": "maior",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ezYAnyUMkw6hf8iD"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Obra-Prima",
					"uuid": "Compendium.tormenta20.poderes.Item.QwVGkwCRe33OTz2v"
				},
				{
					"poder": true
				}
			]
		}
	},
	"ladino": {
		"nome": "Ladino",
		"fonte": "JdA p. 72",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"ladi",
				"refl"
			],
			"escolha": 8,
			"opcoes": [
				"acro",
				"atle",
				"atua",
				"cava",
				"conh",
				"dipl",
				"enga",
				"furt",
				"inic",
				"inti",
				"intu",
				"inve",
				"joga",
				"luta",
				"ofic",
				"perc",
				"pilo",
				"pont"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"uuid": "Compendium.tormenta20.classes.Item.hBx9rVg3XGQ5wsd1",
		"niveis": {
			"1": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+1d6",
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"nome": "Especialista",
					"uuid": "Compendium.tormenta20.poderes.Item.08Or2dxtMBSLKVHW"
				}
			],
			"2": [
				{
					"nome": "Evasão",
					"uuid": "Compendium.tormenta20.poderes.Item.HGh7ECxVmjfrdd8u"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+2d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"nome": "Esquiva Sobrenatural",
					"uuid": "Compendium.tormenta20.poderes.Item.iK1tC8jN9AnZI3Bo"
				},
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+3d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+4d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"nome": "Olhos nas Costas",
					"uuid": "Compendium.tormenta20.poderes.Item.v3Vruwa4uFKSL0UJ"
				},
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+5d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Evasão Aprimorada",
					"uuid": "Compendium.tormenta20.poderes.Item.feeuIYbp7Pv7E8Db"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+6d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+7d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+8d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+9d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"nome": "Ataque Furtivo",
					"detalhe": "+10d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
				},
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "A Pessoa Certa para o Trabalho",
					"uuid": "Compendium.tormenta20.poderes.Item.5KE43Jef0bsueKX7"
				},
				{
					"poder": true
				}
			]
		}
	},
	"lutador": {
		"nome": "Lutador",
		"fonte": "JdA p. 75",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"fort",
				"luta"
			],
			"escolha": 4,
			"opcoes": [
				"acro",
				"ades",
				"atle",
				"enga",
				"furt",
				"inic",
				"inti",
				"ofic",
				"perc",
				"pont",
				"refl"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"uuid": "Compendium.tormenta20.classes.Item.pBABExUf8ATkRnHM",
		"niveis": {
			"1": [
				{
					"nome": "Briga",
					"detalhe": "1d6",
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"nome": "Golpe Relâmpago",
					"uuid": "Compendium.tormenta20.poderes.Item.tf5KggNQBbBIeXUs"
				}
			],
			"2": [
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con",
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Briga",
					"detalhe": "1d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"nome": "Golpe Cruel",
					"uuid": "Compendium.tormenta20.poderes.Item.fVPH9kywOoQ7eluT"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con+1",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Briga",
					"detalhe": "1d10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"nome": "Golpe Violento",
					"uuid": "Compendium.tormenta20.poderes.Item.lMQD3zWlwjng6Fty"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con+2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Briga",
					"detalhe": "2d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Briga",
					"detalhe": "2d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Dono da Rua",
					"detalhe": "2d10",
					"uuid": "Compendium.tormenta20.poderes.Item.SfRiFzM5mEcxWtew"
				},
				{
					"poder": true
				}
			]
		}
	},
	"nobre": {
		"nome": "Nobre",
		"fonte": "JdA p. 78",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				[
					"dipl",
					"inti"
				],
				"vont"
			],
			"escolha": 4,
			"opcoes": [
				"ades",
				"atua",
				"cava",
				"conh",
				"dipl",
				"enga",
				"fort",
				"guer",
				"inic",
				"inti",
				"intu",
				"inve",
				"joga",
				"luta",
				"nobr",
				"ofic",
				"perc",
				"pont"
			]
		},
		"proficiencias": [
			"marciais",
			"pesadas",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"nota": "Espólio: recebe um item a sua escolha com preço de até T$ 2.000.",
		"uuid": "Compendium.tormenta20.classes.Item.kg8tLXlPNJSlwWcc",
		"niveis": {
			"1": [
				{
					"nome": "Autoconfiança",
					"uuid": "Compendium.tormenta20.poderes.Item.eGw7yqknnodmR6fW"
				},
				{
					"nome": "Espólio",
					"uuid": "Compendium.tormenta20.poderes.Item.r3KvyjKj0U2or4BC"
				},
				{
					"nome": "Orgulho",
					"uuid": "Compendium.tormenta20.poderes.Item.NUezHHlKivTJ6lAd"
				}
			],
			"2": [
				{
					"nome": "Palavras Afiadas",
					"detalhe": "2d6",
					"uuid": "Compendium.tormenta20.poderes.Item.zcqfqdZfcQiOM5Sv"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"poder": true
				},
				{
					"nome": "Riqueza",
					"uuid": "Compendium.tormenta20.poderes.Item.skgFrh3jknl2xCMJ"
				}
			],
			"4": [
				{
					"nome": "Gritar Ordens",
					"uuid": "Compendium.tormenta20.poderes.Item.HhO0oqwrgIBaUq8K"
				},
				{
					"poder": true
				}
			],
			"5": [
				{
					"poder": true
				},
				{
					"nome": "Presença Aristocrática",
					"uuid": "Compendium.tormenta20.poderes.Item.OuuBxkiipKEs4ycx"
				}
			],
			"6": [
				{
					"nome": "Palavras Afiadas",
					"detalhe": "4d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.zcqfqdZfcQiOM5Sv"
				},
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Palavras Afiadas",
					"detalhe": "6d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.zcqfqdZfcQiOM5Sv"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"poder": true
				}
			],
			"14": [
				{
					"nome": "Palavras Afiadas",
					"detalhe": "8d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.zcqfqdZfcQiOM5Sv"
				},
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"poder": true
				}
			],
			"18": [
				{
					"nome": "Palavras Afiadas",
					"detalhe": "10d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.zcqfqdZfcQiOM5Sv"
				},
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"nome": "Realeza",
					"uuid": "Compendium.tormenta20.poderes.Item.893W9N6002rbwgy9"
				},
				{
					"poder": true
				}
			]
		}
	},
	"paladino": {
		"nome": "Paladino",
		"fonte": "JdA p. 81",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"luta",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"cura",
				"dipl",
				"fort",
				"guer",
				"inic",
				"intu",
				"nobr",
				"perc",
				"reli"
			]
		},
		"proficiencias": [
			"marciais",
			"pesadas",
			"escudos"
		],
		"magias": null,
		"devocao": "obrigatoria",
		"devocaoRegra": {
			"divindades": [
				"azgher",
				"khalmyr",
				"lena",
				"linwu",
				"marah",
				"tannatoh",
				"thyatis",
				"valkaria"
			],
			"bem": true,
			"nota": "Abençoado: devoto de um deus disponível para paladinos (Azgher, Khalmyr, Lena, Lin-Wu, Marah, Tanna-Toh, Thyatis, Valkaria); recebe dois poderes concedidos em vez de um. Alternativa: paladino do bem — nenhum poder concedido e nenhuma Obrigação & Restrição além do Código do Herói. Cultuar o bem conta como sua devoção. Abençoado também soma o Carisma nos PM no 1º nível."
		},
		"nota": "Bênção da Justiça (5º nível): Égide Sagrada ou Montaria Sagrada. Paladino não lança magias no Jogo do Ano.",
		"uuid": "Compendium.tormenta20.classes.Item.VnjstNLqk1lgxsEn",
		"niveis": {
			"1": [
				{
					"nome": "Abençoado",
					"uuid": "Compendium.tormenta20.poderes.Item.AUHTUQExPifU7clf"
				},
				{
					"nome": "Código do Herói",
					"uuid": "Compendium.tormenta20.poderes.Item.49W6ulVKcMAyd47P"
				},
				{
					"nome": "Golpe Divino",
					"detalhe": "+1d8",
					"uuid": "Compendium.tormenta20.poderes.Item.FXGduQkI6D6rGEA9"
				}
			],
			"2": [
				{
					"nome": "Cura pelas Mãos",
					"detalhe": "1d8+1 PV",
					"uuid": "Compendium.tormenta20.poderes.Item.ROo7BuZfbxA21iz0"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"nome": "Aura Sagrada",
					"uuid": "Compendium.tormenta20.poderes.Item.VPLIpFxeBH3BYY2t"
				},
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Bênção da Justiça",
					"novo": "t20cBencaoJustic",
					"escolha": [
						{
							"nome": "Égide Sagrada"
						},
						{
							"nome": "Montaria Sagrada"
						}
					]
				},
				{
					"nome": "Golpe Divino",
					"detalhe": "+2d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.FXGduQkI6D6rGEA9"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"nome": "Cura pelas Mãos",
					"detalhe": "2d8+2 PV",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ROo7BuZfbxA21iz0"
				},
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Golpe Divino",
					"detalhe": "+3d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.FXGduQkI6D6rGEA9"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Cura pelas Mãos",
					"detalhe": "3d8+3 PV",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ROo7BuZfbxA21iz0"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Golpe Divino",
					"detalhe": "+4d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.FXGduQkI6D6rGEA9"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"nome": "Cura pelas Mãos",
					"detalhe": "4d8+4 PV",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ROo7BuZfbxA21iz0"
				},
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Golpe Divino",
					"detalhe": "+5d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.FXGduQkI6D6rGEA9"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"nome": "Cura pelas Mãos",
					"detalhe": "5d8+5 PV",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ROo7BuZfbxA21iz0"
				},
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"poder": true
				},
				{
					"nome": "Vingador Sagrado",
					"uuid": "Compendium.tormenta20.poderes.Item.fdHDY8tcvrhNY5r7"
				}
			]
		}
	},
	"treinador": {
		"nome": "Treinador",
		"fonte": "HdA p. 16",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"ades",
				"vont"
			],
			"escolha": 4,
			"opcoes": [
				"atle",
				"cava",
				"dipl",
				"guer",
				"inic",
				"inti",
				"intu",
				"luta",
				"ofic",
				"perc",
				"pont",
				"refl",
				"reli",
				"sobr"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"nota": "Melhor Amigo: parceiro especial com ficha própria (ver REGRAS.classes.melhorAmigo); começa com 2 truques e ganha 1 a cada três níveis (4º, 7º...). Treino Especializado (5º): escolha Conquistar pelos Números (segundo melhor amigo) ou Treino Intensivo. Os poderes de treinador estão no pacote herois-de-arton com subtipo Treinador; os truques do melhor amigo, com subtipo Melhor Amigo.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Tdm3LGZwZqlaEAhG",
		"niveis": {
			"1": [
				{
					"nome": "Direcionar",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.WudIAuSdqKN1Xe93"
				},
				{
					"nome": "Melhor Amigo",
					"detalhe": "2 truques",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				}
			],
			"2": [
				{
					"nome": "Domar Criatura",
					"detalhe": "2d8",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"poder": true
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"nome": "Melhor Amigo",
					"detalhe": "3 truques",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				},
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Domar Criatura",
					"detalhe": "cena",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"poder": true
				},
				{
					"nome": "Treino Especializado",
					"escolha": [
						{
							"nome": "Conquistar pelos Números",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.52lA1vD3JXw9ZcBr"
						},
						{
							"nome": "Treino Intensivo",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bj8x6JOEJZ6OfOR1"
						}
					]
				}
			],
			"6": [
				{
					"nome": "Domar Criatura",
					"detalhe": "4d8",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"poder": true
				},
				{
					"nome": "Sincronia de Combate",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.GptDa1Wx610hR2Sh"
				}
			],
			"7": [
				{
					"nome": "Melhor Amigo",
					"detalhe": "4 truques",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				},
				{
					"poder": true
				}
			],
			"8": [
				{
					"nome": "Domar Criatura",
					"detalhe": "dia",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"poder": true
				}
			],
			"9": [
				{
					"poder": true
				}
			],
			"10": [
				{
					"nome": "Domar Criatura",
					"detalhe": "6d8",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"nome": "Melhor Amigo",
					"detalhe": "5 truques",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				},
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Melhor Amigo",
					"detalhe": "6 truques",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"nome": "Domar Criatura",
					"detalhe": "8d8",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"nome": "Melhor Amigo",
					"detalhe": "7 truques",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				},
				{
					"poder": true
				}
			],
			"17": [
				{
					"poder": true
				}
			],
			"18": [
				{
					"nome": "Domar Criatura",
					"detalhe": "10d8",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g6KHhIN6Epl3OHLg"
				},
				{
					"poder": true
				}
			],
			"19": [
				{
					"nome": "Melhor Amigo",
					"detalhe": "8 truques",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.47XU6ZVqYfigWtzW"
				},
				{
					"poder": true
				}
			],
			"20": [
				{
					"poder": true
				},
				{
					"nome": "Sincronia Perfeita",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.TikBLJ9yrXrxoUuD"
				}
			]
		}
	},
	"alquimista": {
		"nome": "Alquimista",
		"fonte": "HdA p. 22",
		"variante": "inventor",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"alqu",
				"vont"
			],
			"escolha": 4,
			"opcoes": [
				"conh",
				"cura",
				"dipl",
				"fort",
				"inic",
				"inve",
				"luta",
				"mist",
				"ofic",
				"pilo",
				"perc",
				"pont"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"nota": "Perícias: como o inventor básico, mas o Ofício inicial é Ofício (alquimista) — por isso 'alqu' nas fixas. Laboratório Pessoal: começa com instrumentos de alquimista aprimorados e 10 itens alquímicos com preço total de até T$ 300. Alquimista Iniciado (2º) e Mestre Alquimista (10º) são os poderes de inventor do Jogo do Ano (Tormenta20 p. 68-69) concedidos automaticamente; o pacote herois-de-arton também tem cópias com subtipo Alquimista.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.nOGW8R4N04h2vyhd",
		"niveis": {
			"1": [
				{
					"nome": "Engenhosidade",
					"uuid": "Compendium.tormenta20.poderes.Item.P29KKQdQdwTCVuTj"
				},
				{
					"nome": "Laboratório Pessoal",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.hUCwyEXszlrPghZv"
				}
			],
			"2": [
				{
					"nome": "Alquimista Iniciado",
					"uuid": "Compendium.tormenta20.poderes.Item.jQZPCBxLtJxntynq"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"3": [
				{
					"nome": "Mistura Básica",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xQQHyfzJ3NriUy5H"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"5": [
				{
					"nome": "Aplicação Rápida",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.6GLtWScMIlbZa5Ge"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"7": [
				{
					"nome": "Magia Engarrafada",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.PiTvbKq0uyaBctwZ"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"8": [
				{
					"nome": "Odores Alquímicos",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.6tYWjslGeQPaxczF"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"9": [
				{
					"nome": "Fabricar Emulsão",
					"detalhe": "1 encanto",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.2fPspY040zsWR1HK"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"10": [
				{
					"nome": "Mestre Alquimista",
					"uuid": "Compendium.tormenta20.poderes.Item.anGFgBM64UpxWdiL"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"11": [
				{
					"nome": "Bombardeio Eficiente",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.iTqbF8CEMYCQ60jA"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"13": [
				{
					"nome": "Fabricar Emulsão",
					"detalhe": "2 encantos",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.2fPspY040zsWR1HK"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"17": [
				{
					"nome": "Fabricar Emulsão",
					"detalhe": "3 encantos",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.2fPspY040zsWR1HK"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "inventor"
				}
			],
			"20": [
				{
					"nome": "Pedra Filosofal",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.g8KJo5cfw5yYixYw"
				},
				{
					"poder": true,
					"classe": "inventor"
				}
			]
		}
	},
	"atleta": {
		"nome": "Atleta",
		"fonte": "HdA p. 24",
		"variante": "lutador",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"atle",
				"luta"
			],
			"escolha": 4,
			"opcoes": [
				"acro",
				"ades",
				"cava",
				"cura",
				"fort",
				"inic",
				"inti",
				"ofic",
				"perc",
				"pilo",
				"pont",
				"refl"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"nota": "Tabela 1-4 sai achatada no texto (coluna de níveis separada); reconstruída na ordem do livro e conferida com o texto das habilidades (Arremesso Atlético e Poderio Muscular no 2º, Casca Grossa no 3º, Mais Alto e Mais Rápido no 5º, Disciplina Atlética no 9º, Corpo Ideal no 20º) e com a progressão de Briga/Casca Grossa do lutador básico. Corpo Ideal muda o dano desarmado e de arremesso para 2d10.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.nGXPEGivGGtNaUfl",
		"niveis": {
			"1": [
				{
					"nome": "Briga",
					"detalhe": "1d6",
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"nome": "Façanha Atlética",
					"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cFacanhaAtlet"
				}
			],
			"2": [
				{
					"nome": "Arremesso Atlético",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.3oZRyNkWe8IyXZKY"
				},
				{
					"poder": true,
					"classe": "lutador"
				},
				{
					"nome": "Poderio Muscular",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.z5xAeS4qxsTvckFW"
				}
			],
			"3": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con",
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"5": [
				{
					"nome": "Briga",
					"detalhe": "1d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"nome": "Mais Alto e Mais Rápido",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4TJgtmKvawvf6qjN"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"7": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con +1",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"9": [
				{
					"nome": "Briga",
					"detalhe": "1d10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"nome": "Disciplina Atlética",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.OOxBx9JwHn4Lzp8M"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"11": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con +2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"13": [
				{
					"nome": "Briga",
					"detalhe": "2d6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"15": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con +3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"17": [
				{
					"nome": "Briga",
					"detalhe": "2d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"19": [
				{
					"nome": "Casca Grossa",
					"detalhe": "Con +4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			],
			"20": [
				{
					"nome": "Corpo Ideal",
					"detalhe": "2d10",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.pCSVfzrfqiU7p6Gf"
				},
				{
					"poder": true,
					"classe": "lutador"
				}
			]
		}
	},
	"burgues": {
		"nome": "Burguês",
		"fonte": "HdA p. 25",
		"variante": "nobre",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"dipl",
				"vont"
			],
			"escolha": 6,
			"opcoes": [
				"ades",
				"atua",
				"cava",
				"conh",
				"dipl",
				"enga",
				"fort",
				"guer",
				"inic",
				"inti",
				"intu",
				"inve",
				"joga",
				"luta",
				"nobr",
				"ofic",
				"perc",
				"pont"
			]
		},
		"proficiencias": [],
		"magias": null,
		"devocao": null,
		"nota": "A linha do 20º nível da Tabela 1-5 traz só 'Magnata' (sem poder de nobre), conforme o texto extraído do livro. Meios de Produção: T$ 100 por aventura (T$ 300 veterano, T$ 600 campeão, T$ 1.000 lenda). Desmoralizar e Suborno são magias simuladas (Perdição e Enfeitiçar).",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.6vKClF83bcAcfIlh",
		"niveis": {
			"1": [
				{
					"nome": "Meios de Produção",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.shY0o5vIjKFh8BbP"
				},
				{
					"nome": "Orgulho",
					"uuid": "Compendium.tormenta20.poderes.Item.NUezHHlKivTJ6lAd"
				},
				{
					"nome": "Poder Monetário",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xDbjac6eXx6S7zuN"
				}
			],
			"2": [
				{
					"nome": "Desmoralizar",
					"detalhe": "–1",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EezupPrIRM5G1AUH"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"3": [
				{
					"nome": "Negociante Nato",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.z1zEBiHKtAn9AmcO"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "nobre"
				},
				{
					"nome": "Suborno",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.PtepZX4t2Q6YcbfS"
				}
			],
			"5": [
				{
					"nome": "Ostentação",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Jifg4Smwee4Rj6Ox"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"6": [
				{
					"nome": "Desmoralizar",
					"detalhe": "–2",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EezupPrIRM5G1AUH"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"9": [
				{
					"nome": "Novo Rico",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yasQ98gNQFUutmCF"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"10": [
				{
					"nome": "Desmoralizar",
					"detalhe": "–3",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EezupPrIRM5G1AUH"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"14": [
				{
					"nome": "Desmoralizar",
					"detalhe": "–4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EezupPrIRM5G1AUH"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"18": [
				{
					"nome": "Desmoralizar",
					"detalhe": "–5",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EezupPrIRM5G1AUH"
				},
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "nobre"
				}
			],
			"20": [
				{
					"nome": "Magnata",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.7BNt1YgUSayLyfDC"
				}
			]
		}
	},
	"duelista": {
		"nome": "Duelista",
		"fonte": "HdA p. 27",
		"variante": "bucaneiro",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				[
					"luta",
					"pont"
				],
				"refl"
			],
			"escolha": 2,
			"opcoes": [
				"acro",
				"atle",
				"atua",
				"dipl",
				"fort",
				"inic",
				"inti",
				"luta",
				"ofic",
				"perc",
				"pilo",
				"pont"
			]
		},
		"proficiencias": [
			"marciais"
		],
		"magias": null,
		"devocao": null,
		"nota": "Duelo do duelista é próprio da variante (não é o Duelo do cavaleiro). Escola de Tiro concede proficiência com armas de fogo leves e de uma mão.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.50uCZN8zNMMwYIWY",
		"niveis": {
			"1": [
				{
					"nome": "Duelo",
					"detalhe": "+2",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.VltChCMlpqiQeOXm"
				},
				{
					"nome": "Insolência",
					"uuid": "Compendium.tormenta20.poderes.Item.pCXbUTE2qivVEe37"
				}
			],
			"2": [
				{
					"nome": "Escola de Duelo",
					"escolha": [
						{
							"nome": "Escola Ambidestra",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.RMBpgdWyeD4ubt68"
						},
						{
							"nome": "Escola Clássica",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.tciul7t9Cv0U9Hxm"
						},
						{
							"nome": "Escola de Tiro",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.TwV4WP6Xt9Ii1jGg"
						}
					]
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"3": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+1",
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "bucaneiro"
				},
				{
					"nome": "Truques de Capa",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4Aa2a8cmOV7fOjHq"
				}
			],
			"5": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"6": [
				{
					"nome": "Duelo",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.VltChCMlpqiQeOXm"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"7": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"9": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "bucaneiro"
				},
				{
					"nome": "Técnica Avançada",
					"escolha": [
						{
							"nome": "Escola Ambidestra",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.B27zhMSF4PtaQRmi"
						},
						{
							"nome": "Escola Clássica",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.kw1c1yCjMXT139jZ"
						},
						{
							"nome": "Escola de Tiro",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.8LQImYcfIVEZ0ZR9"
						}
					],
					"nota": "a técnica da escola de duelo escolhida no 2º nível"
				}
			],
			"11": [
				{
					"nome": "Duelo",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.VltChCMlpqiQeOXm"
				},
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"15": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"16": [
				{
					"nome": "Duelo",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.VltChCMlpqiQeOXm"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"19": [
				{
					"nome": "Esquiva Sagaz",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			],
			"20": [
				{
					"nome": "Duelista Lendário",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.VAa3tvBNW3gDodv4"
				},
				{
					"poder": true,
					"classe": "bucaneiro"
				}
			]
		}
	},
	"ermitao": {
		"nome": "Ermitão",
		"fonte": "HdA p. 29",
		"variante": "druida",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"sobr",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"conh",
				"cura",
				"fort",
				"inic",
				"intu",
				"luta",
				"mist",
				"ofic",
				"perc",
				"reli"
			]
		},
		"proficiencias": [],
		"magias": {
			"tipo": "div",
			"atributo": "sab",
			"iniciais": 2,
			"porNivel": {
				"2": 1,
				"4": 1,
				"6": 1,
				"8": 1,
				"10": 1,
				"12": 1,
				"14": 1,
				"16": 1,
				"18": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"6": 2,
				"10": 3,
				"14": 4
			},
			"escolas": null,
			"escolherEscolas": 3,
			"nota": "Como o druida básico: escolha três escolas de magia (permanente); magias divinas dessas escolas; soma a Sabedoria nos PM; aprende uma magia em cada nível par."
		},
		"devocao": "obrigatoria",
		"devocaoRegra": {
			"divindades": [
				"allihanna",
				"megalokk",
				"oceano"
			],
			"nota": "Devoto Fiel como o druida básico: devoto de Allihanna, Megalokk ou Oceano; recebe dois poderes concedidos."
		},
		"nota": "Poder de druida: não pode escolher Forma Selvagem nem poderes que a tenham como pré-requisito. Empatia Selvagem é a do druida, mas também funciona com criaturas vegetais não inteligentes e espíritos (usa a cópia do pacote herois-de-arton). Sítio Sagrado (3º): área erma de 5 km de raio com terreno associado (aquático, ártico, colina, deserto, floresta, montanha, pântano, planície ou subterrâneo).",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.5GzKDeXTA6CjVUeE",
		"niveis": {
			"1": [
				{
					"nome": "Devoto Fiel",
					"uuid": "Compendium.tormenta20.poderes.Item.a2c1cG5wrgJDHoKr"
				},
				{
					"nome": "Empatia Selvagem",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.fRTEUHi44z6PII1M"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.psIIAGvlOxhIhJqh"
				}
			],
			"2": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"3": [
				{
					"poder": true,
					"classe": "druida"
				},
				{
					"nome": "Sítio Sagrado",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.dq4Ov2eEzafYlpBs"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"5": [
				{
					"poder": true,
					"classe": "druida"
				},
				{
					"nome": "Vínculo com a Terra",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xwxUg3I2gHtdZAgA"
				}
			],
			"6": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.psIIAGvlOxhIhJqh"
				},
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"9": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"10": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.psIIAGvlOxhIhJqh"
				},
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "druida"
				},
				{
					"nome": "Temperado pelo Clima",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.X4Wqd8QD3g0l8hDX"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"14": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.psIIAGvlOxhIhJqh"
				},
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "druida"
				}
			],
			"20": [
				{
					"nome": "Eixo de Pedras",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.SbK60PqAxORn35oq"
				},
				{
					"poder": true,
					"classe": "druida"
				}
			]
		}
	},
	"inovador": {
		"nome": "Inovador",
		"fonte": "HdA p. 30",
		"variante": "guerreiro",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				[
					"luta",
					"pont"
				],
				"acro"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"conh",
				"fort",
				"guer",
				"inic",
				"inti",
				"inve",
				"luta",
				"ofic",
				"pont",
				"refl"
			]
		},
		"proficiencias": [
			"marciais",
			"pesadas",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"nota": "Proficiências como o guerreiro básico, mas Do Bom e do Melhor: começa com uma arma, armadura ou escudo superior de até T$ 500 e é considerado não proficiente em qualquer arma, armadura ou escudo que não seja superior ou mágico. A tabela chama a habilidade do 7º nível de 'técnica excêntrica'; o texto e o compêndio a chamam Técnica Revolucionária.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.LgtDA6g3HEmG5CNd",
		"niveis": {
			"1": [
				{
					"nome": "Do Bom e do Melhor",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.G0tu3UMZQ0tFxJIo"
				},
				{
					"nome": "Sequência Especial",
					"detalhe": "+2",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.DCJtY6uipdoP9YXd"
				}
			],
			"2": [
				{
					"nome": "Bombardeio Sequencial",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.IOPsIAmNsBGMCeBr"
				},
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"3": [
				{
					"nome": "Acrobacia Defensiva",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.8uslJdxrMO1WM27Y"
				},
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"4": [
				{
					"nome": "Domínio Excêntrico",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.UXLrTFyZTvD10pyA"
				},
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"5": [
				{
					"poder": true,
					"classe": "guerreiro"
				},
				{
					"nome": "Sequência Especial",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.DCJtY6uipdoP9YXd"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "guerreiro"
				},
				{
					"nome": "Técnica Revolucionária",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.zvKkRcyhiSFnOCdo"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"9": [
				{
					"poder": true,
					"classe": "guerreiro"
				},
				{
					"nome": "Sequência Especial",
					"detalhe": "+6",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.DCJtY6uipdoP9YXd"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "guerreiro"
				},
				{
					"nome": "Sequência Especial",
					"detalhe": "+8",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.DCJtY6uipdoP9YXd"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "guerreiro"
				},
				{
					"nome": "Sequência Especial",
					"detalhe": "+10",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.DCJtY6uipdoP9YXd"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "guerreiro"
				}
			],
			"20": [
				{
					"nome": "Estilo Único",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.mUBzQdLpmOkGesdM"
				},
				{
					"poder": true,
					"classe": "guerreiro"
				}
			]
		}
	},
	"machadodepedra": {
		"nome": "Machado de Pedra",
		"fonte": "HdA p. 32",
		"variante": "barbaro",
		"pv": {
			"inicial": 24,
			"porNivel": 6
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"fort",
				"luta"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"inic",
				"inti",
				"ofic",
				"perc",
				"pont",
				"sobr",
				"vont"
			]
		},
		"proficiencias": [
			"escudos"
		],
		"semProficiencia": [
			"simples",
			"leves"
		],
		"magias": null,
		"devocao": null,
		"nota": "Machado de Pedra: NÃO recebe proficiência com armas simples; sabe usar apenas adaga, azagaia, clava, funda, lança, machadinha e tacape (no 9º nível aprende uma arma simples ou marcial a sua escolha). Tanga de Peles: NÃO recebe proficiência com armaduras leves; sem armadura soma a Constituição na Defesa. Grunhidos: só fala o idioma da sua comunidade (aprende uma palavra de valkar por nível). O item de classe do compêndio tem pericias.numero 0; o livro diz 'mais 2 a sua escolha'.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.UeYBFyKw7QJSSs90",
		"niveis": {
			"1": [
				{
					"nome": "Fúria",
					"detalhe": "+2",
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"nome": "Grunhidos",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.DSEqSE378hwUUwDZ"
				},
				{
					"nome": "Machado de Pedra",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yvKar5pz1jIwiAFo"
				},
				{
					"nome": "Tanga de Peles",
					"detalhe": "Con",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bp5eRnhWrMmiRq1d"
				}
			],
			"2": [
				{
					"nome": "Fúria Primitiva",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4O4aBz0g5003kji0"
				},
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"3": [
				{
					"nome": "Instinto Selvagem",
					"detalhe": "+1",
					"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
				},
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Tanga de Peles",
					"detalhe": "Def +1",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bp5eRnhWrMmiRq1d"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"5": [
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Resiliência Primal",
					"detalhe": "3",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yKsXMcLhZaERDjRc"
				}
			],
			"6": [
				{
					"nome": "Fúria",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Tanga de Peles",
					"detalhe": "Def +2",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bp5eRnhWrMmiRq1d"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Resiliência Primal",
					"detalhe": "6",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yKsXMcLhZaERDjRc"
				}
			],
			"9": [
				{
					"nome": "Instinto Selvagem",
					"detalhe": "+2",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
				},
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"11": [
				{
					"nome": "Fúria",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Resiliência Primal",
					"detalhe": "9",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yKsXMcLhZaERDjRc"
				},
				{
					"nome": "Tanga de Peles",
					"detalhe": "Def +3",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bp5eRnhWrMmiRq1d"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Resiliência Primal",
					"detalhe": "12",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yKsXMcLhZaERDjRc"
				}
			],
			"15": [
				{
					"nome": "Instinto Selvagem",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
				},
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Tanga de Peles",
					"detalhe": "Def +4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bp5eRnhWrMmiRq1d"
				}
			],
			"16": [
				{
					"nome": "Fúria",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
				},
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Resiliência Primal",
					"detalhe": "15",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.yKsXMcLhZaERDjRc"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "barbaro"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "barbaro"
				},
				{
					"nome": "Tanga de Peles",
					"detalhe": "Def +5",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.bp5eRnhWrMmiRq1d"
				}
			],
			"20": [
				{
					"nome": "Fúria Rústica",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.o0tGjSfpZEUt8oEu"
				},
				{
					"poder": true,
					"classe": "barbaro"
				}
			]
		}
	},
	"magimarcialista": {
		"nome": "Magimarcialista",
		"fonte": "HdA p. 33",
		"variante": "bardo",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"atua",
				"luta"
			],
			"escolha": 6,
			"opcoes": [
				"acro",
				"atle",
				"cava",
				"conh",
				"dipl",
				"enga",
				"fort",
				"guer",
				"inic",
				"joga",
				"mist",
				"refl"
			]
		},
		"proficiencias": [
			"marciais"
		],
		"magias": {
			"tipo": "arc",
			"atributo": "car",
			"iniciais": 2,
			"porNivel": {
				"2": 1,
				"4": 1,
				"6": 1,
				"8": 1,
				"10": 1,
				"12": 1,
				"14": 1,
				"16": 1,
				"18": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"6": 2,
				"10": 3,
				"14": 4
			},
			"escolas": null,
			"escolherEscolas": 3,
			"nota": "Como o bardo básico: escolha três escolas de magia (permanente); soma o Carisma nos PM; aprende uma magia em cada nível par; pode lançar vestindo armadura leve sem teste de Misticismo."
		},
		"devocao": null,
		"nota": "Magificação conta como estar sob Inspiração para efeitos baseados nisso.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Ag1YVFSheentmTCi",
		"niveis": {
			"1": [
				{
					"nome": "Cadência Magimarcial",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.d1Cgm11wSM9cMKsC"
				},
				{
					"nome": "Magificação",
					"detalhe": "+2",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.q5LuSP66vmirW6kK"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.trFXbT5lsxabfIuS"
				}
			],
			"2": [
				{
					"nome": "Bravado Magimarcial",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EnvkKOhdWJSzkLtG"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"3": [
				{
					"nome": "Dança Defensiva",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.tHfZLBe3KKpTHyJU"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"5": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"6": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.trFXbT5lsxabfIuS"
				},
				{
					"nome": "Magificação",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.q5LuSP66vmirW6kK"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"7": [
				{
					"nome": "Arte Sublime",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.BHwqUwRniuNrwd1I"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"9": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"10": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.trFXbT5lsxabfIuS"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"11": [
				{
					"nome": "Magificação",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.q5LuSP66vmirW6kK"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"14": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.trFXbT5lsxabfIuS"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"16": [
				{
					"nome": "Magificação",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.q5LuSP66vmirW6kK"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "bardo"
				}
			],
			"20": [
				{
					"nome": "Crescendo Vitorioso",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.qNdyRVh0Fg87tAJB"
				},
				{
					"poder": true,
					"classe": "bardo"
				}
			]
		}
	},
	"necromante": {
		"nome": "Necromante",
		"fonte": "HdA p. 34",
		"variante": "arcanista",
		"pv": {
			"inicial": 8,
			"porNivel": 2
		},
		"pm": {
			"porNivel": 6
		},
		"pericias": {
			"fixas": [
				"mist",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"conh",
				"cura",
				"dipl",
				"enga",
				"fort",
				"inic",
				"inti",
				"intu",
				"inve",
				"nobr",
				"ofic",
				"perc"
			]
		},
		"proficiencias": [],
		"magias": {
			"tipo": "arc",
			"atributo": "int",
			"iniciais": 3,
			"porNivel": {
				"2": 1,
				"3": 1,
				"4": 1,
				"5": 1,
				"6": 1,
				"7": 1,
				"8": 1,
				"9": 1,
				"10": 1,
				"11": 1,
				"12": 1,
				"13": 1,
				"14": 1,
				"15": 1,
				"16": 1,
				"17": 1,
				"18": 1,
				"19": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"5": 2,
				"9": 3,
				"13": 4,
				"17": 5
			},
			"escolas": null,
			"nota": "Como o arcanista básico (3 magias iniciais, uma por nível, soma a Inteligência nos PM), com o Caminho do Necromante no lugar do Caminho do Arcanista: pode aprender magias divinas de necromancia como arcanas; não pode aprender magias de encantamento; pelo menos metade das magias aprendidas devem ser de necromancia; para lançar precisa ativar a conexão com a morte gastando PV iguais ao círculo máximo que quer usar (dura a cena). Atributo-chave Inteligência."
		},
		"devocao": null,
		"nota": "Ritual do Lich é um poder de classe exclusivo do necromante (pré-requisitos: Celebrar Ritual, Escrever Pergaminho, Preparar Poção, 17º nível de necromante).",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.AFyH8kHOFpEsqTE3",
		"niveis": {
			"1": [
				{
					"nome": "Caminho do Necromante",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.u3g70plvNM1GhifO"
				},
				{
					"nome": "Falar com Mortos",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.LaxU9gyGI0NoSwN5"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.uqVYOqnGmBj7hVvb"
				}
			],
			"2": [
				{
					"nome": "Animar Cadáver",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.NKImgLHPoAE3efd1"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"3": [
				{
					"nome": "Necrologia",
					"detalhe": "+2",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.JD0ifJi03BaWGqzP"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"4": [
				{
					"nome": "Distorção Necrótica",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.WklLHGnI57lxIbp4"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"5": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.uqVYOqnGmBj7hVvb"
				},
				{
					"nome": "Necropotência",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.JIGsSpDHnxzHoTfg"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"8": [
				{
					"nome": "Necrologia",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.JD0ifJi03BaWGqzP"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"9": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.uqVYOqnGmBj7hVvb"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"13": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.uqVYOqnGmBj7hVvb"
				},
				{
					"nome": "Necrologia",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.JD0ifJi03BaWGqzP"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"17": [
				{
					"nome": "Magias",
					"detalhe": "5º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.uqVYOqnGmBj7hVvb"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"18": [
				{
					"nome": "Necrologia",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.JD0ifJi03BaWGqzP"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "arcanista"
				}
			],
			"20": [
				{
					"nome": "Domínio Sobre a Morte",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.ydDEPzshTFBWXg8E"
				},
				{
					"poder": true,
					"classe": "arcanista"
				}
			]
		}
	},
	"santo": {
		"nome": "Santo",
		"fonte": "HdA p. 37",
		"variante": "paladino",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"reli",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"conh",
				"cura",
				"dipl",
				"fort",
				"guer",
				"inic",
				"intu",
				"luta",
				"ofic",
				"perc"
			]
		},
		"proficiencias": [
			"marciais",
			"pesadas",
			"escudos"
		],
		"magias": null,
		"devocao": "obrigatoria",
		"devocaoRegra": {
			"divindades": [
				"azgher",
				"khalmyr",
				"lena",
				"linwu",
				"marah",
				"tannatoh",
				"thyatis",
				"valkaria"
			],
			"nota": "Abençoado como o paladino básico (devoto de um deus disponível para paladinos, dois poderes concedidos), mas não pode escolher ser um santo/paladino do bem."
		},
		"nota": "Tabela 1-12 sai achatada no texto; reconstruída na ordem do livro e conferida com o texto (Santo Curandeiro 2º, Vaso do Espírito 3º, Mártir 6º, Pira Santa 8º, Ladainha +1 a cada quatro níveis: 1º, 5º, 9º, 13º, 17º). A tabela chama a habilidade do 3º nível de 'vaso sagrado'; o texto e o compêndio a chamam Vaso do Espírito. Ladainha de Combate conta como Aura Sagrada para pré-requisitos e efeitos de poderes de paladino. PM: 4 por nível (o paladino básico tem 3).",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xu96Cv5jign3ULJ8",
		"niveis": {
			"1": [
				{
					"nome": "Abençoado",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xBufOKSxx3dq9AtH"
				},
				{
					"nome": "Código do Herói",
					"uuid": "Compendium.tormenta20.poderes.Item.49W6ulVKcMAyd47P"
				},
				{
					"nome": "Ladainha de Combate",
					"detalhe": "+1",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.sE6lsiYFzQp5qSjH"
				}
			],
			"2": [
				{
					"poder": true,
					"classe": "paladino"
				},
				{
					"nome": "Santo Curandeiro",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xcdXacfl29F2ATM5"
				}
			],
			"3": [
				{
					"poder": true,
					"classe": "paladino"
				},
				{
					"nome": "Vaso do Espírito",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.wTYr85WXGqRCwNX3"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"5": [
				{
					"nome": "Ladainha de Combate",
					"detalhe": "+2, sacra",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.sE6lsiYFzQp5qSjH"
				},
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"6": [
				{
					"nome": "Mártir",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.XISxsSahpOksnnHf"
				},
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"8": [
				{
					"nome": "Pira Santa",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.ca3dmAZW2ck0orX8"
				},
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"9": [
				{
					"nome": "Ladainha de Combate",
					"detalhe": "+3, veloz",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.sE6lsiYFzQp5qSjH"
				},
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"13": [
				{
					"nome": "Ladainha de Combate",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.sE6lsiYFzQp5qSjH"
				},
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"17": [
				{
					"nome": "Ladainha de Combate",
					"detalhe": "+5",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.sE6lsiYFzQp5qSjH"
				},
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "paladino"
				}
			],
			"20": [
				{
					"poder": true,
					"classe": "paladino"
				},
				{
					"nome": "Vingador Santificado",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.0mOsA9X5syivtyCd"
				}
			]
		}
	},
	"seteiro": {
		"nome": "Seteiro",
		"fonte": "HdA p. 38",
		"variante": "cacador",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"pont",
				"sobr"
			],
			"escolha": 6,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"cura",
				"fort",
				"furt",
				"inic",
				"inve",
				"luta",
				"ofic",
				"perc",
				"refl"
			]
		},
		"proficiencias": [
			"marciais"
		],
		"magias": null,
		"devocao": null,
		"nota": "Caminho do Atirador: as habilidades de seteiro ligadas a ataques e armas só funcionam com arcos e bestas. Rajada de Flechas (10º) não existe no compêndio.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.RwAXDLG9mhibVg9q",
		"niveis": {
			"1": [
				{
					"nome": "Caminho do Atirador",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.hsqXN9XWscsryugu"
				},
				{
					"nome": "Marca da Presa",
					"detalhe": "+1d4",
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"nome": "Tiro de Supressão",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.iySt2a8X0YFlA2Qv"
				}
			],
			"2": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"3": [
				{
					"nome": "Evasão",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.nmSjGHUa9rzaRo1Q"
				},
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"4": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"5": [
				{
					"nome": "Disparo Constritor",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4a33nVtMyClkUilG"
				},
				{
					"nome": "Marca da Presa",
					"detalhe": "+1d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"9": [
				{
					"nome": "Marca da Presa",
					"detalhe": "+1d12",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "cacador"
				},
				{
					"nome": "Rajada de Flechas",
					"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cRajadaFlecha"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"13": [
				{
					"nome": "Evasão Aprimorada",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.nNEAcGVkgWlRoJH1"
				},
				{
					"nome": "Marca da Presa",
					"detalhe": "+2d8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"15": [
				{
					"poder": true,
					"classe": "cacador"
				},
				{
					"nome": "Sentinela",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.VXNn1pZ1UpLvxzgp"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"17": [
				{
					"nome": "Marca da Presa",
					"detalhe": "+2d10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
				},
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "cacador"
				}
			],
			"20": [
				{
					"poder": true,
					"classe": "cacador"
				},
				{
					"nome": "Mestre do Disparo",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.haukN9NbH0AbQlXT"
				}
			]
		}
	},
	"usurpador": {
		"nome": "Usurpador",
		"fonte": "HdA p. 40",
		"variante": "clerigo",
		"pv": {
			"inicial": 16,
			"porNivel": 4
		},
		"pm": {
			"porNivel": 5
		},
		"pericias": {
			"fixas": [
				"enga",
				"vont"
			],
			"escolha": 2,
			"opcoes": [
				"atua",
				"conh",
				"cura",
				"dipl",
				"furt",
				"inic",
				"inti",
				"intu",
				"mist",
				"nobr",
				"ofic",
				"perc",
				"refl",
				"reli"
			]
		},
		"proficiencias": [],
		"magias": {
			"tipo": "div",
			"atributo": "car",
			"iniciais": 0,
			"porNivel": {},
			"circulos": {
				"1": 1,
				"5": 2,
				"9": 3,
				"13": 4,
				"17": 5
			},
			"escolas": null,
			"nota": "Não começa com magias nem aprende magias automaticamente: com Usurpar lança qualquer magia divina de um círculo a que tenha acesso, passando num teste de Enganação (CD 15 + custo em PM). Soma o Carisma nos PM. Conhecimento Mágico é proibido."
		},
		"devocao": "proibida",
		"devocaoRegra": {
			"divindades": [],
			"nota": "Inimigo dos Deuses: o usurpador não pode ter nenhuma devoção."
		},
		"nota": "Poder de clérigo: não pode escolher Conhecimento Mágico; troca Sabedoria por Carisma nos poderes de clérigo e concedidos. Poder Capturado (4º) permite usar um poder concedido de um deus maior por dia, sem devoção.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.R3iYujyrk9WfwC4Y",
		"niveis": {
			"1": [
				{
					"nome": "Inimigo dos Deuses",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.zTEWyAzsMCfaHbqf"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Or31WT7dmC9crGtT"
				},
				{
					"nome": "Usurpar",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.HSAVHE89uqkR4mf0"
				}
			],
			"2": [
				{
					"nome": "Canalização Falsa",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.lUmKNTZrxKk7yPUC"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"3": [
				{
					"nome": "Discrição Divina",
					"detalhe": "+1",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.C4XHljDiO7ywBTD7"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"4": [
				{
					"nome": "Poder Capturado",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.zUk5lkPLFkG7FVk7"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"5": [
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Or31WT7dmC9crGtT"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"8": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"9": [
				{
					"nome": "Discrição Divina",
					"detalhe": "+2",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.C4XHljDiO7ywBTD7"
				},
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Or31WT7dmC9crGtT"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"10": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"13": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Or31WT7dmC9crGtT"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"15": [
				{
					"nome": "Discrição Divina",
					"detalhe": "+3",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.C4XHljDiO7ywBTD7"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"17": [
				{
					"nome": "Magias",
					"detalhe": "5º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Or31WT7dmC9crGtT"
				},
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "clerigo"
				}
			],
			"20": [
				{
					"poder": true,
					"classe": "clerigo"
				},
				{
					"nome": "Roubo Divino",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.3aG5x47fVJpbj6nX"
				}
			]
		}
	},
	"vassalo": {
		"nome": "Vassalo",
		"fonte": "HdA p. 41",
		"variante": "cavaleiro",
		"pv": {
			"inicial": 20,
			"porNivel": 5
		},
		"pm": {
			"porNivel": 3
		},
		"pericias": {
			"fixas": [
				"fort",
				"luta"
			],
			"escolha": 2,
			"opcoes": [
				"ades",
				"atle",
				"cava",
				"dipl",
				"guer",
				"inic",
				"inti",
				"nobr",
				"perc",
				"vont"
			]
		},
		"proficiencias": [
			"marciais",
			"escudos"
		],
		"magias": null,
		"devocao": null,
		"nota": "O vassalo não tem 'poder de cavaleiro' na tabela: os poderes vêm das próprias habilidades (campo concedePoder = listas de onde escolher). treina = perícias treinadas pela habilidade (lista interna = escolha uma); se já for treinado, recebe +2 nela (HdA p. 43). Proficiências: armas marciais e escudos (armaduras pesadas só com Escudeiro Aprendiz no 3º). Exige um suserano aprovado pelo mestre; se deixar de servi-lo, perde todos os PM até ser aceito por outro.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.cbvl9ibh0OawCHHq",
		"niveis": {
			"1": [
				{
					"nome": "Baluarte",
					"detalhe": "+2",
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Código de Honra",
					"uuid": "Compendium.tormenta20.poderes.Item.kVmOn7TQXvedO40o"
				},
				{
					"nome": "Jovem Pajem",
					"treina": [
						[
							"ades",
							"arme"
						]
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.zAioaTM713How7eC"
				},
				{
					"nome": "Suserano",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.n5bwuegiBlIZGy5C"
				}
			],
			"2": [
				{
					"nome": "Valete",
					"treina": [
						[
							"dipl",
							"nobr"
						]
					],
					"concedePoder": [
						"cavaleiro"
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.fAlB6I8mCsoZZ1lE"
				}
			],
			"3": [
				{
					"nome": "Escudeiro Aprendiz",
					"treina": [
						"cava"
					],
					"proficiencias": [
						"pesadas"
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.PmVc7MGYWn9FPQQ6"
				}
			],
			"4": [
				{
					"nome": "Guarda do Castelo",
					"treina": [
						"intu"
					],
					"concedePoder": [
						"cavaleiro"
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.jC0hMbdUk9kaidSY"
				}
			],
			"5": [
				{
					"nome": "Baluarte",
					"detalhe": "+4",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Vigilante de Estradas",
					"treina": [
						"perc"
					],
					"nota": "recebe a habilidade Montaria (cavaleiro)",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.gagoBFyyLEEq5mx9"
				}
			],
			"6": [
				{
					"nome": "Cavaleiro do Reino",
					"concedePoder": [
						"cavaleiro"
					],
					"nota": "também uma arma, armadura ou escudo superior com duas melhorias",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.IRPrJx1G7DZUOwC0"
				}
			],
			"7": [
				{
					"nome": "Sargento do Reino",
					"concedePoder": [
						"cavaleiro",
						"guerreiro"
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.PCUpqbWwxIkcWJui"
				}
			],
			"8": [
				{
					"nome": "Capitão do Reino",
					"nota": "recebe o poder Escudeiro e a habilidade Golpe Divino (como paladino de nível igual)",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.0RNN2HqssoafVoPW"
				}
			],
			"9": [
				{
					"nome": "Baluarte",
					"detalhe": "+6",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Lorde",
					"escolha": [
						{
							"nome": "Caminho do Soldado",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.gZDyYkPEvWunFRDH"
						},
						{
							"nome": "Caminho do Governante",
							"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.cZV8uPttcnAoEhap"
						}
					],
					"nota": "recebe o poder Autoridade Feudal; Soldado = um poder de guerreiro, Governante = um poder de nobre"
				}
			],
			"10": [
				{
					"nome": "Barão",
					"nota": "recebe o poder Título e um domínio de nível 1",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.TMZX1e94TjtmgR9m"
				}
			],
			"11": [
				{
					"nome": "Visconde",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.N1tZu5r5nXgkJFBg"
				}
			],
			"12": [
				{
					"nome": "Conde",
					"concedePoder": [
						"cavaleiro",
						"geral"
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Al4eojWjbLVdz5ZF"
				}
			],
			"13": [
				{
					"nome": "Baluarte",
					"detalhe": "+8",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Marquês",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.EyjW2bfOVHx9YBnO"
				}
			],
			"14": [
				{
					"nome": "Duque",
					"concedePoder": [
						"cavaleiro"
					],
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.dmy6Di9QXE4UmQ6G"
				}
			],
			"15": [
				{
					"nome": "Arquiduque",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.8YLn9OPq77L918oy"
				}
			],
			"16": [
				{
					"nome": "Conselheiro Real",
					"concedePoder": [
						"cavaleiro"
					],
					"nota": "também aprende uma magia divina de até 4º círculo (atributo-chave Carisma)",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.M9RbPO4S5gTLSVKB"
				}
			],
			"17": [
				{
					"nome": "Baluarte",
					"detalhe": "+10",
					"melhora": true,
					"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
				},
				{
					"nome": "Rei Mercenário",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.SnA4Rr8nBWvhhoQ1"
				}
			],
			"18": [
				{
					"nome": "Rei",
					"concedePoder": [
						"cavaleiro"
					],
					"nota": "+1 em Carisma",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.IkN9UIcxzOJfb3Ny"
				}
			],
			"19": [
				{
					"nome": "Alto Rei",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.dxJCSM8UDJFmh7Js"
				}
			],
			"20": [
				{
					"nome": "Imperador",
					"nota": "+1 em dois atributos e uma magia divina de até 5º círculo (atributo-chave Carisma)",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.KtL2EN4qdTl67E4U"
				}
			]
		}
	},
	"ventanista": {
		"nome": "Ventanista",
		"fonte": "HdA p. 44",
		"variante": "ladino",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 4
		},
		"pericias": {
			"fixas": [
				"ladi",
				"refl"
			],
			"escolha": 8,
			"opcoes": [
				"acro",
				"atle",
				"atua",
				"cava",
				"conh",
				"dipl",
				"enga",
				"furt",
				"inic",
				"inti",
				"intu",
				"inve",
				"joga",
				"nobr",
				"ofic",
				"perc",
				"pilo"
			]
		},
		"proficiencias": [],
		"magias": {
			"tipo": "arc",
			"atributo": "int",
			"iniciais": 2,
			"porNivel": {
				"2": 1,
				"4": 1,
				"6": 1,
				"8": 1,
				"10": 1,
				"12": 1,
				"14": 1,
				"16": 1,
				"18": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"6": 2,
				"10": 3,
				"14": 4
			},
			"escolas": [
				"enc",
				"ilu"
			],
			"simuladas": true,
			"nota": "Truques do Ofício: magias simuladas (não são habilidades mágicas, HdA p. 44) arcanas, apenas de encantamento e ilusão; pode lançá-las vestindo armadura leve sem teste de Misticismo."
		},
		"devocao": null,
		"nota": "Charme: soma o Carisma no total de PM. O Grande Golpe (20º) não existe no compêndio.",
		"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.5d1pz82gzjgjOfsz",
		"niveis": {
			"1": [
				{
					"nome": "Charme",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.MDXDSMKeNIUE1fTh"
				},
				{
					"nome": "Truques do Ofício",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.ip7sUTs4B9LCgcZP"
				}
			],
			"2": [
				{
					"nome": "Evasão",
					"uuid": "Compendium.tormenta20.poderes.Item.HGh7ECxVmjfrdd8u"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"3": [
				{
					"nome": "Disfarce Elaborado",
					"detalhe": "1 poder",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.XYJ9ksBusdVfkrGW"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"4": [
				{
					"nome": "Esquiva Sobrenatural",
					"uuid": "Compendium.tormenta20.poderes.Item.iK1tC8jN9AnZI3Bo"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"5": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"6": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"7": [
				{
					"poder": true,
					"classe": "ladino"
				},
				{
					"nome": "Virar a Casaca",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.iAcK6sJW5GCHPFBZ"
				}
			],
			"8": [
				{
					"nome": "Olhos nas Costas",
					"uuid": "Compendium.tormenta20.poderes.Item.v3Vruwa4uFKSL0UJ"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"9": [
				{
					"nome": "Disfarce Elaborado",
					"detalhe": "2 poderes",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.XYJ9ksBusdVfkrGW"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"10": [
				{
					"nome": "Evasão Aprimorada",
					"uuid": "Compendium.tormenta20.poderes.Item.feeuIYbp7Pv7E8Db"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"11": [
				{
					"poder": true,
					"classe": "ladino"
				},
				{
					"nome": "Provocação Ousada",
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4X45u7WZNvT9LdeV"
				}
			],
			"12": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"13": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"14": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"15": [
				{
					"nome": "Disfarce Elaborado",
					"detalhe": "3 poderes",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.XYJ9ksBusdVfkrGW"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"16": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"17": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"18": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"19": [
				{
					"poder": true,
					"classe": "ladino"
				}
			],
			"20": [
				{
					"nome": "O Grande Golpe",
					"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cGrandeGolpe0"
				},
				{
					"poder": true,
					"classe": "ladino"
				}
			]
		}
	},
	"frade": {
		"nome": "Frade",
		"fonte": "DdA p. 38",
		"pv": {
			"inicial": 12,
			"porNivel": 3
		},
		"pm": {
			"porNivel": 6
		},
		"pericias": {
			"fixas": [
				"reli",
				"vont"
			],
			"escolha": 4,
			"opcoes": [
				"ades",
				"atua",
				"conh",
				"cura",
				"dipl",
				"fort",
				"guer",
				"inic",
				"inti",
				"intu",
				"inve",
				"mist",
				"ofic",
				"perc",
				"nobr"
			]
		},
		"proficiencias": [],
		"magias": {
			"tipo": "div",
			"atributo": "sab",
			"iniciais": 3,
			"porNivel": {
				"2": 1,
				"3": 1,
				"4": 1,
				"5": 1,
				"6": 1,
				"7": 1,
				"8": 1,
				"9": 1,
				"10": 1,
				"11": 1,
				"12": 1,
				"13": 1,
				"14": 1,
				"15": 1,
				"16": 1,
				"17": 1,
				"18": 1,
				"19": 1,
				"20": 1
			},
			"circulos": {
				"1": 1,
				"5": 2,
				"9": 3,
				"13": 4,
				"17": 5
			},
			"escolas": null,
			"nota": "Soma a Sabedoria nos PM. Pode lançar vestindo armadura leve; com armadura pesada precisa de teste de Misticismo como um conjurador arcano."
		},
		"devocao": "obrigatoria",
		"devocaoRegra": {
			"divindades": null,
			"nota": "Devoto Fiel: devoto de um deus maior (dois poderes concedidos) ou culto ao Panteão como um todo (sem poder concedido; única obrigação: não usar armas cortantes ou perfurantes; arma preferida maça; canaliza energia positiva ou negativa, escolha permanente). Ver também REGRAS.classes.devocaoAmpla."
		},
		"nota": "Dádiva da Fé (5º): Proteção Sagrada se a divindade canaliza energia positiva, Cólera Divina se negativa. O poder concedido Dom da Ressurreição também pode ser escolhido por frades de Thyatis (DdA p. 41). Os poderes de frade estão no pacote deuses-de-arton com subtipo Frade.",
		"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.TNROEtAv8QiigOfQ",
		"niveis": {
			"1": [
				{
					"nome": "Devoto Fiel",
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.DTc1hOe9nKLwZHdf"
				},
				{
					"nome": "Erudição",
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.mdBv8Evjn2Vtkbu3"
				},
				{
					"nome": "Magias",
					"detalhe": "1º círculo",
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gVcBS6UBcDM485rr"
				}
			],
			"2": [
				{
					"poder": true
				},
				{
					"nome": "Versiculário",
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.4lO5u3lhsezgLP6Y"
				}
			],
			"3": [
				{
					"poder": true
				}
			],
			"4": [
				{
					"poder": true
				}
			],
			"5": [
				{
					"nome": "Dádiva da Fé",
					"escolha": [
						{
							"nome": "Proteção Sagrada",
							"nota": "divindade que canaliza energia positiva",
							"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.qs13hyuzIzkAAgB3"
						},
						{
							"nome": "Cólera Divina",
							"nota": "divindade que canaliza energia negativa",
							"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.iFSiAqThzRACmb41"
						}
					]
				},
				{
					"nome": "Magias",
					"detalhe": "2º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gVcBS6UBcDM485rr"
				},
				{
					"poder": true
				}
			],
			"6": [
				{
					"poder": true
				}
			],
			"7": [
				{
					"poder": true
				}
			],
			"8": [
				{
					"poder": true
				}
			],
			"9": [
				{
					"nome": "Magias",
					"detalhe": "3º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gVcBS6UBcDM485rr"
				},
				{
					"poder": true
				}
			],
			"10": [
				{
					"poder": true
				}
			],
			"11": [
				{
					"poder": true
				}
			],
			"12": [
				{
					"poder": true
				}
			],
			"13": [
				{
					"nome": "Magias",
					"detalhe": "4º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gVcBS6UBcDM485rr"
				},
				{
					"poder": true
				}
			],
			"14": [
				{
					"poder": true
				}
			],
			"15": [
				{
					"poder": true
				}
			],
			"16": [
				{
					"poder": true
				}
			],
			"17": [
				{
					"nome": "Magias",
					"detalhe": "5º círculo",
					"melhora": true,
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gVcBS6UBcDM485rr"
				},
				{
					"poder": true
				}
			],
			"18": [
				{
					"poder": true
				}
			],
			"19": [
				{
					"poder": true
				}
			],
			"20": [
				{
					"poder": true
				},
				{
					"nome": "Solo Santificado",
					"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.rweDRYvRxyymf5me"
				}
			]
		}
	}
};

export const ORIGENS = {
	"acolito": {
		"nome": "Acólito",
		"fonte": "JdA p. 85",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Símbolo sagrado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.GN5S9awu41thdvCn"
			},
			{
				"nome": "Traje de sacerdote",
				"uuid": "Compendium.tormenta20.equipamentos.Item.7WaWtssy7ROODAEX"
			}
		],
		"pericias": [
			"cura",
			"reli",
			"vont"
		],
		"poderes": [
			{
				"nome": "Medicina",
				"uuid": "Compendium.tormenta20.poderes.Item.0sanox342d7LHPhb"
			},
			{
				"nome": "Vontade de Ferro",
				"uuid": "Compendium.tormenta20.poderes.Item.JqIyfIszukoGImxz"
			}
		],
		"unico": {
			"nome": "Membro da Igreja",
			"uuid": "Compendium.tormenta20.poderes.Item.QX1mfKNFzGMfbYLG"
		}
	},
	"amigodosanimais": {
		"nome": "Amigo dos Animais",
		"fonte": "JdA p. 85",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Cão de caça",
						"animal": true,
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontCaoCaca0"
					},
					{
						"nome": "Cavalo",
						"animal": true,
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontCavalo00"
					},
					{
						"nome": "Pônei",
						"animal": true,
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontPonei000"
					},
					{
						"nome": "Trobo",
						"animal": true,
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontTrobo000"
					}
				]
			}
		],
		"pericias": [
			"ades",
			"cava"
		],
		"poderes": [],
		"unico": {
			"nome": "Amigo Especial",
			"uuid": "Compendium.tormenta20.poderes.Item.ow7ELtuGr37MtO5A"
		}
	},
	"amnesico": {
		"nome": "Amnésico",
		"fonte": "JdA p. 86",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Um ou mais itens (somando até T$ 500), aprovados pelo mestre",
				"categoria": true,
				"nota": "podem ser uma pista misteriosa do seu passado"
			}
		],
		"pericias": [],
		"poderes": [],
		"unico": {
			"nome": "Lembranças Graduais",
			"uuid": "Compendium.tormenta20.poderes.Item.2H9Pt66jRvNBOO4F"
		},
		"beneficioEspecial": {
			"periciasDoMestre": 1,
			"poderesDoMestre": 1,
			"unicoAutomatico": true
		},
		"nota": "Em vez de dois benefícios de uma lista, recebe uma perícia e um poder escolhidos pelo mestre e o poder Lembranças Graduais."
	},
	"aristocrata": {
		"nome": "Aristocrata",
		"fonte": "JdA p. 86",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Joia de família",
				"nota": "no valor de T$ 300",
				"uuid": "Compendium.tormenta20.equipamentos.Item.XBqfTkg4n5Qnj6Le"
			},
			{
				"nome": "Traje da corte",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JwWMw9SpTVXSVIBp"
			}
		],
		"pericias": [
			"dipl",
			"enga",
			"nobr"
		],
		"poderes": [
			{
				"nome": "Comandar",
				"uuid": "Compendium.tormenta20.poderes.Item.u9TgbL6zCLQADGZg"
			}
		],
		"unico": {
			"nome": "Sangue Azul",
			"uuid": "Compendium.tormenta20.poderes.Item.4R8EP1vHPKrXkney"
		}
	},
	"artesao": {
		"nome": "Artesão",
		"fonte": "JdA p. 86",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Instrumentos de ofício",
				"nota": "qualquer",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Um item que você possa fabricar de até T$ 50",
				"categoria": true
			}
		],
		"pericias": [
			"ofic",
			"vont"
		],
		"poderes": [
			{
				"nome": "Sortudo",
				"uuid": "Compendium.tormenta20.poderes.Item.9ufcM7yTLDVvJVP2"
			}
		],
		"unico": {
			"nome": "Frutos do Trabalho",
			"uuid": "Compendium.tormenta20.poderes.Item.bMv6aGYlFsvJv0kE"
		}
	},
	"artista": {
		"nome": "Artista",
		"fonte": "JdA p. 86",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Estojo de disfarces",
						"uuid": "Compendium.tormenta20.equipamentos.Item.7d9rOIGNdGSTnXUG"
					},
					{
						"nome": "Instrumento musical",
						"uuid": "Compendium.tormenta20.equipamentos.Item.7GHJtYRc9uVb5l7q"
					}
				]
			}
		],
		"pericias": [
			"atua",
			"enga"
		],
		"poderes": [
			{
				"nome": "Atraente",
				"uuid": "Compendium.tormenta20.poderes.Item.2TvrxZ8tW7KSPOE6"
			},
			{
				"nome": "Sortudo",
				"uuid": "Compendium.tormenta20.poderes.Item.9ufcM7yTLDVvJVP2"
			},
			{
				"nome": "Torcida",
				"uuid": "Compendium.tormenta20.poderes.Item.xZz3ZMJ47L2pzPmG"
			}
		],
		"unico": {
			"nome": "Dom Artístico",
			"uuid": "Compendium.tormenta20.poderes.Item.mNeLncOZHhKVE5Zc"
		}
	},
	"assistentedelaboratorio": {
		"nome": "Assistente de Laboratório",
		"fonte": "JdA p. 87",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Instrumentos de Ofício (alquimista)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			}
		],
		"pericias": [
			"alqu",
			"mist"
		],
		"poderes": [
			{
				"nome": "Venefício",
				"uuid": "Compendium.tormenta20.poderes.Item.xXBwgDlKVLB94WuT"
			}
		],
		"poderesEscolha": [
			{
				"grupo": "tormenta",
				"texto": "Um poder da Tormenta a sua escolha"
			}
		],
		"unico": {
			"nome": "Esse Cheiro...",
			"uuid": "Compendium.tormenta20.poderes.Item.MfqDUMq8Oqr7xMEc"
		}
	},
	"batedor": {
		"nome": "Batedor",
		"fonte": "JdA p. 88",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Barraca",
				"uuid": "Compendium.tormenta20.equipamentos.Item.k9mpsAd6FWQjqYpB"
			},
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			},
			{
				"nome": "Uma arma simples ou marcial de ataque à distância",
				"categoria": true
			}
		],
		"pericias": [
			"furt",
			"perc",
			"sobr"
		],
		"poderes": [
			{
				"nome": "Estilo de Disparo",
				"uuid": "Compendium.tormenta20.poderes.Item.sRuSasAfCGydYSnj"
			},
			{
				"nome": "Sentidos Aguçados",
				"uuid": "Compendium.tormenta20.poderes.Item.QEkw59wKjXEN2IMZ"
			}
		],
		"unico": {
			"nome": "À Prova de Tudo",
			"uuid": "Compendium.tormenta20.poderes.Item.oNrI37ebj6fRFifd"
		}
	},
	"capanga": {
		"nome": "Capanga",
		"fonte": "JdA p. 88",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Tatuagem",
				"nota": "ou outro adereço de sua gangue (+1 em Intimidação)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.U46WyhdXk6LSjCps"
			},
			{
				"nome": "Uma arma simples corpo a corpo",
				"categoria": true
			}
		],
		"pericias": [
			"luta",
			"inti"
		],
		"poderes": [],
		"poderesEscolha": [
			{
				"grupo": "combate",
				"texto": "Um poder de combate a sua escolha"
			}
		],
		"unico": {
			"nome": "Confissão",
			"uuid": "Compendium.tormenta20.poderes.Item.jyYBVpG2SCZ75st9"
		}
	},
	"charlatao": {
		"nome": "Charlatão",
		"fonte": "JdA p. 88",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Estojo de disfarces",
				"uuid": "Compendium.tormenta20.equipamentos.Item.7d9rOIGNdGSTnXUG"
			},
			{
				"nome": "Joia falsificada",
				"nota": "valor aparente de T$ 100, sem valor real",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jMyQyuL38JtOcqvY"
			}
		],
		"pericias": [
			"enga",
			"joga"
		],
		"poderes": [
			{
				"nome": "Aparência Inofensiva",
				"uuid": "Compendium.tormenta20.poderes.Item.8lUie2yAnlqjfZdc"
			},
			{
				"nome": "Sortudo",
				"uuid": "Compendium.tormenta20.poderes.Item.9ufcM7yTLDVvJVP2"
			}
		],
		"unico": {
			"nome": "Alpinista Social",
			"uuid": "Compendium.tormenta20.poderes.Item.5MvPN6kvr0yGTRGY"
		}
	},
	"circense": {
		"nome": "Circense",
		"fonte": "JdA p. 89",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Três bolas coloridas para malabarismo",
				"nota": "+1 em Atuação",
				"uuid": "Compendium.tormenta20.equipamentos.Item.ikiyOP1h4nm4m9M2"
			}
		],
		"pericias": [
			"acro",
			"atua",
			"refl"
		],
		"poderes": [
			{
				"nome": "Acrobático",
				"uuid": "Compendium.tormenta20.poderes.Item.OU0FdvMcZsoZMqzG"
			},
			{
				"nome": "Torcida",
				"uuid": "Compendium.tormenta20.poderes.Item.xZz3ZMJ47L2pzPmG"
			}
		],
		"unico": {
			"nome": "Truque de Mágica",
			"uuid": "Compendium.tormenta20.poderes.Item.HI7ORqJRA79m9gZB"
		}
	},
	"criminoso": {
		"nome": "Criminoso",
		"fonte": "JdA p. 89",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Estojo de disfarces",
						"uuid": "Compendium.tormenta20.equipamentos.Item.7d9rOIGNdGSTnXUG"
					},
					{
						"nome": "Gazua",
						"uuid": "Compendium.tormenta20.equipamentos.Item.Wjpiz1Um7NkFXPDa"
					}
				]
			}
		],
		"pericias": [
			"enga",
			"furt",
			"ladi"
		],
		"poderes": [
			{
				"nome": "Venefício",
				"uuid": "Compendium.tormenta20.poderes.Item.xXBwgDlKVLB94WuT"
			}
		],
		"unico": {
			"nome": "Punguista",
			"uuid": "Compendium.tormenta20.poderes.Item.AdtKhdDbNfEfC9bd"
		}
	},
	"curandeiro": {
		"nome": "Curandeiro",
		"fonte": "JdA p. 89",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"qtd": 2,
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			}
		],
		"pericias": [
			"cura",
			"vont"
		],
		"poderes": [
			{
				"nome": "Medicina",
				"uuid": "Compendium.tormenta20.poderes.Item.0sanox342d7LHPhb"
			},
			{
				"nome": "Venefício",
				"uuid": "Compendium.tormenta20.poderes.Item.xXBwgDlKVLB94WuT"
			}
		],
		"unico": {
			"nome": "Médico de Campo",
			"uuid": "Compendium.tormenta20.poderes.Item.ShzXxMr4B8jOlMnV"
		}
	},
	"eremita": {
		"nome": "Eremita",
		"fonte": "JdA p. 89",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Barraca",
				"uuid": "Compendium.tormenta20.equipamentos.Item.k9mpsAd6FWQjqYpB"
			},
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			}
		],
		"pericias": [
			"mist",
			"reli",
			"sobr"
		],
		"poderes": [
			{
				"nome": "Lobo Solitário",
				"uuid": "Compendium.tormenta20.poderes.Item.2LxEtm7P7roK2dCt"
			}
		],
		"unico": {
			"nome": "Busca Interior",
			"uuid": "Compendium.tormenta20.poderes.Item.3VjKAe6oPOjqeA6K"
		}
	},
	"escravo": {
		"nome": "Escravo",
		"fonte": "JdA p. 89",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Algemas",
				"uuid": "Compendium.tormenta20.equipamentos.Item.lkNT2EjekhRIb5vt"
			},
			{
				"nome": "Ferramenta pesada",
				"nota": "mesmas estatísticas de uma maça",
				"uuid": "Compendium.tormenta20.equipamentos.Item.FX43nQcWjWrhuhPt"
			}
		],
		"pericias": [
			"atle",
			"fort",
			"furt"
		],
		"poderes": [
			{
				"nome": "Vitalidade",
				"uuid": "Compendium.tormenta20.poderes.Item.vcYz5xdAi4RluSoM"
			}
		],
		"unico": {
			"nome": "Desejo de Liberdade",
			"uuid": "Compendium.tormenta20.poderes.Item.1GKFOwZTHwrMVq3z"
		}
	},
	"estudioso": {
		"nome": "Estudioso",
		"fonte": "JdA p. 90",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Coleção de livros",
				"nota": "+1 em Conhecimento, Guerra, Misticismo ou Nobreza, a sua escolha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jhJviQkVaDYk28yY"
			}
		],
		"pericias": [
			"conh",
			"guer",
			"mist"
		],
		"poderes": [
			{
				"nome": "Aparência Inofensiva",
				"uuid": "Compendium.tormenta20.poderes.Item.8lUie2yAnlqjfZdc"
			}
		],
		"unico": {
			"nome": "Palpite Fundamentado",
			"uuid": "Compendium.tormenta20.poderes.Item.wyn9z5L1MDDsuDvq"
		}
	},
	"fazendeiro": {
		"nome": "Fazendeiro",
		"fonte": "JdA p. 90",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Carroça",
				"uuid": "Compendium.tormenta20.equipamentos.Item.9AshEQWx8xIxDXj2"
			},
			{
				"nome": "Ferramenta agrícola",
				"nota": "mesmas estatísticas de uma lança",
				"uuid": "Compendium.tormenta20.equipamentos.Item.yGPbdsEqxwHuP5UD"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 10,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			},
			{
				"nome": "Animal não combativo",
				"nota": "como uma galinha, porco ou ovelha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.YsZ9tRVQjPQOBdYx"
			}
		],
		"pericias": [
			"ades",
			"cava",
			"ofic",
			"sobr"
		],
		"oficio": "fazendeiro",
		"poderes": [
			{
				"nome": "Ginete",
				"uuid": "Compendium.tormenta20.poderes.Item.k2f9RHm5zbpkKjMa"
			}
		],
		"unico": {
			"nome": "Água no Feijão",
			"uuid": "Compendium.tormenta20.poderes.Item.1Upw4jLE5wXjSaaX"
		},
		"nota": "A Tabela 1-19 diz Ofício (fazendeiro); o texto da origem diz apenas Ofício."
	},
	"forasteiro": {
		"nome": "Forasteiro",
		"fonte": "JdA p. 90",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			},
			{
				"nome": "Instrumento musical exótico",
				"nota": "+1 em uma perícia de Carisma aprovada pelo mestre",
				"uuid": "Compendium.tormenta20.equipamentos.Item.3HxySPDqYzqwf9UD"
			},
			{
				"nome": "Traje estrangeiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.0JbdprQmQxxwHVzJ"
			}
		],
		"pericias": [
			"cava",
			"pilo",
			"sobr"
		],
		"poderes": [
			{
				"nome": "Lobo Solitário",
				"uuid": "Compendium.tormenta20.poderes.Item.2LxEtm7P7roK2dCt"
			}
		],
		"unico": {
			"nome": "Cultura Exótica",
			"uuid": "Compendium.tormenta20.poderes.Item.M1brJAJBNptnmcSe"
		}
	},
	"gladiador": {
		"nome": "Gladiador",
		"fonte": "JdA p. 90",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Uma arma marcial ou exótica",
				"categoria": true
			},
			{
				"nome": "Um item sem valor recebido de um admirador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.0yzCqLRmvb6rOcOI"
			}
		],
		"pericias": [
			"atua",
			"luta"
		],
		"poderes": [
			{
				"nome": "Atraente",
				"uuid": "Compendium.tormenta20.poderes.Item.2TvrxZ8tW7KSPOE6"
			},
			{
				"nome": "Torcida",
				"uuid": "Compendium.tormenta20.poderes.Item.xZz3ZMJ47L2pzPmG"
			}
		],
		"poderesEscolha": [
			{
				"grupo": "combate",
				"texto": "Um poder de combate a sua escolha"
			}
		],
		"unico": {
			"nome": "Pão e Circo",
			"uuid": "Compendium.tormenta20.poderes.Item.k4kKX4hcWhrum67F"
		}
	},
	"guarda": {
		"nome": "Guarda",
		"fonte": "JdA p. 91",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Apito",
				"uuid": "Compendium.tormenta20.equipamentos.Item.34fxMzAB529DbF96"
			},
			{
				"nome": "Insígnia da milícia",
				"uuid": "Compendium.tormenta20.equipamentos.Item.ynFEILQg1LJQ4Zmm"
			},
			{
				"nome": "Uma arma marcial",
				"categoria": true
			}
		],
		"pericias": [
			"inve",
			"luta",
			"perc"
		],
		"poderes": [
			{
				"nome": "Investigador",
				"uuid": "Compendium.tormenta20.poderes.Item.wcpALlTnf92pBYXT"
			}
		],
		"poderesEscolha": [
			{
				"grupo": "combate",
				"texto": "Um poder de combate a sua escolha"
			}
		],
		"unico": {
			"nome": "Detetive",
			"uuid": "Compendium.tormenta20.poderes.Item.DM5mVhPPtsguw7NV"
		}
	},
	"herdeiro": {
		"nome": "Herdeiro",
		"fonte": "JdA p. 91",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Anel de sinete",
						"uuid": "Compendium.tormenta20.equipamentos.Item.WRGRaGbu7LKhyVpZ"
					},
					{
						"nome": "Manto cerimonial",
						"uuid": "Compendium.tormenta20.equipamentos.Item.y7N3CVY9eZmSEIj6"
					}
				],
				"nota": "Um símbolo de sua herança, como um anel de sinete ou manto cerimonial; com ele você pode ser reconhecido por sua descendência."
			}
		],
		"pericias": [
			"mist",
			"nobr",
			"ofic"
		],
		"poderes": [
			{
				"nome": "Comandar",
				"uuid": "Compendium.tormenta20.poderes.Item.u9TgbL6zCLQADGZg"
			}
		],
		"unico": {
			"nome": "Herança",
			"uuid": "Compendium.tormenta20.poderes.Item.GoeNF1Tp5FRicwau"
		},
		"nota": "Herança pode ser escolhido duas vezes (os dois benefícios), para um item de até T$ 2.000 em vez de T$ 1.000."
	},
	"heroicampones": {
		"nome": "Herói Camponês",
		"fonte": "JdA p. 91",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Instrumentos de ofício",
						"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
					},
					{
						"nome": "Uma arma simples",
						"categoria": true
					}
				]
			},
			{
				"nome": "Traje de plebeu",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cTrajePlebeu0"
			}
		],
		"pericias": [
			"ades",
			"ofic"
		],
		"poderes": [
			{
				"nome": "Sortudo",
				"uuid": "Compendium.tormenta20.poderes.Item.9ufcM7yTLDVvJVP2"
			},
			{
				"nome": "Surto Heroico",
				"uuid": "Compendium.tormenta20.poderes.Item.pGwlyl63wgYeqwrQ"
			},
			{
				"nome": "Torcida",
				"uuid": "Compendium.tormenta20.poderes.Item.xZz3ZMJ47L2pzPmG"
			}
		],
		"unico": {
			"nome": "Coração Heroico",
			"uuid": "Compendium.tormenta20.poderes.Item.p7dIr74C74XUbfr4"
		}
	},
	"marujo": {
		"nome": "Marujo",
		"fonte": "JdA p. 92",
		"tipo": "basica",
		"itens": [
			{
				"nome": "T$ 2d6",
				"dinheiro": "2d6",
				"nota": "seu último salário"
			},
			{
				"nome": "Corda",
				"uuid": "Compendium.tormenta20.equipamentos.Item.zhN019SNUiYzz3aU"
			}
		],
		"pericias": [
			"atle",
			"joga",
			"pilo"
		],
		"poderes": [
			{
				"nome": "Acrobático",
				"uuid": "Compendium.tormenta20.poderes.Item.OU0FdvMcZsoZMqzG"
			}
		],
		"unico": {
			"nome": "Passagem de Navio",
			"uuid": "Compendium.tormenta20.poderes.Item.q9kEETjXJROCaWNt"
		}
	},
	"mateiro": {
		"nome": "Mateiro",
		"fonte": "JdA p. 92",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Arco curto",
				"uuid": "Compendium.tormenta20.equipamentos.Item.E8czrmn4rH7Fqyea"
			},
			{
				"nome": "Barraca",
				"uuid": "Compendium.tormenta20.equipamentos.Item.k9mpsAd6FWQjqYpB"
			},
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			},
			{
				"nome": "Flechas",
				"qtd": 20,
				"uuid": "Compendium.tormenta20.equipamentos.Item.UI59UM7vpFaHRc18"
			}
		],
		"pericias": [
			"atle",
			"furt",
			"sobr"
		],
		"poderes": [
			{
				"nome": "Lobo Solitário",
				"uuid": "Compendium.tormenta20.poderes.Item.2LxEtm7P7roK2dCt"
			},
			{
				"nome": "Sentidos Aguçados",
				"uuid": "Compendium.tormenta20.poderes.Item.QEkw59wKjXEN2IMZ"
			}
		],
		"unico": {
			"nome": "Vendedor de Carcaças",
			"uuid": "Compendium.tormenta20.poderes.Item.GzCUpZohTh1j6BBX"
		}
	},
	"membrodeguilda": {
		"nome": "Membro de Guilda",
		"fonte": "JdA p. 92",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Gazua",
						"uuid": "Compendium.tormenta20.equipamentos.Item.Wjpiz1Um7NkFXPDa"
					},
					{
						"nome": "Instrumentos de ofício",
						"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
					}
				]
			}
		],
		"pericias": [
			"dipl",
			"enga",
			"mist",
			"ofic"
		],
		"poderes": [
			{
				"nome": "Foco em Perícia",
				"uuid": "Compendium.tormenta20.poderes.Item.2cbFrAuQY6dmk8eS"
			}
		],
		"unico": {
			"nome": "Rede de Contatos",
			"uuid": "Compendium.tormenta20.poderes.Item.4HDe54InDUrAw30B"
		}
	},
	"mercador": {
		"nome": "Mercador",
		"fonte": "JdA p. 93",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Carroça",
				"uuid": "Compendium.tormenta20.equipamentos.Item.9AshEQWx8xIxDXj2"
			},
			{
				"nome": "Trobo",
				"animal": true,
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontTrobo000"
			},
			{
				"nome": "Mercadorias para vender no valor de T$ 100",
				"categoria": true
			}
		],
		"pericias": [
			"dipl",
			"intu",
			"ofic"
		],
		"poderes": [
			{
				"nome": "Proficiência",
				"uuid": "Compendium.tormenta20.poderes.Item.AD22Tx3t0ur2lL2e"
			},
			{
				"nome": "Sortudo",
				"uuid": "Compendium.tormenta20.poderes.Item.9ufcM7yTLDVvJVP2"
			}
		],
		"unico": {
			"nome": "Negociação",
			"uuid": "Compendium.tormenta20.poderes.Item.QafEpkmPPxAbqOOr"
		}
	},
	"minerador": {
		"nome": "Minerador",
		"fonte": "JdA p. 93",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Gemas preciosas",
				"nota": "no valor de T$ 100",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mtYCAxyyPgevtFvX"
			},
			{
				"nome": "Picareta",
				"uuid": "Compendium.tormenta20.equipamentos.Item.nsTbFWXERXChuTS4"
			}
		],
		"pericias": [
			"atle",
			"fort",
			"ofic"
		],
		"oficio": "minerador",
		"poderes": [
			{
				"nome": "Ataque Poderoso",
				"uuid": "Compendium.tormenta20.poderes.Item.H3XFozZPWLh3lGE0"
			},
			{
				"nome": "Sentidos Aguçados",
				"uuid": "Compendium.tormenta20.poderes.Item.QEkw59wKjXEN2IMZ"
			}
		],
		"unico": {
			"nome": "Escavador",
			"uuid": "Compendium.tormenta20.poderes.Item.p4KZ2EwgXEdrLKGp"
		}
	},
	"nomade": {
		"nome": "Nômade",
		"fonte": "JdA p. 93",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Bordão",
				"uuid": "Compendium.tormenta20.equipamentos.Item.HyJBwTLK0vY5F1Vp"
			},
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			}
		],
		"pericias": [
			"cava",
			"pilo",
			"sobr"
		],
		"poderes": [
			{
				"nome": "Lobo Solitário",
				"uuid": "Compendium.tormenta20.poderes.Item.2LxEtm7P7roK2dCt"
			},
			{
				"nome": "Sentidos Aguçados",
				"uuid": "Compendium.tormenta20.poderes.Item.QEkw59wKjXEN2IMZ"
			}
		],
		"unico": {
			"nome": "Mochileiro",
			"uuid": "Compendium.tormenta20.poderes.Item.4vn79PMyfSXYVGnl"
		}
	},
	"pivete": {
		"nome": "Pivete",
		"fonte": "JdA p. 93",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Gazua",
				"uuid": "Compendium.tormenta20.equipamentos.Item.Wjpiz1Um7NkFXPDa"
			},
			{
				"nome": "Traje de plebeu",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cTrajePlebeu0"
			},
			{
				"nome": "Animal urbano",
				"nota": "como um cão, gato, rato ou pombo",
				"uuid": "Compendium.tormenta20.equipamentos.Item.dkfaboJqs4Q1yh6i"
			}
		],
		"pericias": [
			"furt",
			"inic",
			"ladi"
		],
		"poderes": [
			{
				"nome": "Acrobático",
				"uuid": "Compendium.tormenta20.poderes.Item.OU0FdvMcZsoZMqzG"
			},
			{
				"nome": "Aparência Inofensiva",
				"uuid": "Compendium.tormenta20.poderes.Item.8lUie2yAnlqjfZdc"
			}
		],
		"unico": {
			"nome": "Quebra-Galho",
			"uuid": "Compendium.tormenta20.poderes.Item.Q2LEsFutm0QGG8tr"
		}
	},
	"refugiado": {
		"nome": "Refugiado",
		"fonte": "JdA p. 93",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Item estrangeiro",
				"nota": "um item estrangeiro de até T$ 100",
				"uuid": "Compendium.tormenta20.equipamentos.Item.6zy7ZAb2GvdKD8Qw"
			}
		],
		"pericias": [
			"fort",
			"refl",
			"vont"
		],
		"poderes": [
			{
				"nome": "Vontade de Ferro",
				"uuid": "Compendium.tormenta20.poderes.Item.JqIyfIszukoGImxz"
			}
		],
		"unico": {
			"nome": "Estoico",
			"uuid": "Compendium.tormenta20.poderes.Item.ZBsQwPh48dhm4CGt"
		}
	},
	"seguidor": {
		"nome": "Seguidor",
		"fonte": "JdA p. 94",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Um item recebido de seu mestre de até T$ 100",
				"categoria": true
			}
		],
		"pericias": [
			"ades",
			"ofic"
		],
		"poderes": [
			{
				"nome": "Proficiência",
				"uuid": "Compendium.tormenta20.poderes.Item.AD22Tx3t0ur2lL2e"
			},
			{
				"nome": "Surto Heroico",
				"uuid": "Compendium.tormenta20.poderes.Item.pGwlyl63wgYeqwrQ"
			}
		],
		"unico": {
			"nome": "Antigo Mestre",
			"uuid": "Compendium.tormenta20.poderes.Item.0EHJjnDT0P0iZGeR"
		}
	},
	"selvagem": {
		"nome": "Selvagem",
		"fonte": "JdA p. 94",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Uma arma simples",
				"categoria": true
			},
			{
				"nome": "Pequeno animal de estimação",
				"nota": "como um pássaro ou esquilo",
				"uuid": "Compendium.tormenta20.equipamentos.Item.dSa6SuhQGcQ407Wj"
			}
		],
		"pericias": [
			"perc",
			"refl",
			"sobr"
		],
		"poderes": [
			{
				"nome": "Lobo Solitário",
				"uuid": "Compendium.tormenta20.poderes.Item.2LxEtm7P7roK2dCt"
			},
			{
				"nome": "Vitalidade",
				"uuid": "Compendium.tormenta20.poderes.Item.vcYz5xdAi4RluSoM"
			}
		],
		"unico": {
			"nome": "Vida Rústica",
			"uuid": "Compendium.tormenta20.poderes.Item.eAZIoBypQUPTvqA2"
		}
	},
	"soldado": {
		"nome": "Soldado",
		"fonte": "JdA p. 94",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true
			},
			{
				"nome": "Uniforme militar",
				"uuid": "Compendium.tormenta20.equipamentos.Item.PWrI3tRiTMYo7Qs7"
			},
			{
				"nome": "Insígnia de seu exército",
				"uuid": "Compendium.tormenta20.equipamentos.Item.FOat9pnq9RNt0ThW"
			}
		],
		"pericias": [
			"fort",
			"guer",
			"luta",
			"pont"
		],
		"poderes": [],
		"poderesEscolha": [
			{
				"grupo": "combate",
				"texto": "Um poder de combate a sua escolha"
			}
		],
		"unico": {
			"nome": "Influência Militar",
			"uuid": "Compendium.tormenta20.poderes.Item.LC7Zj48ZrAV0Ta6e"
		}
	},
	"taverneiro": {
		"nome": "Taverneiro",
		"fonte": "JdA p. 94",
		"tipo": "basica",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Rolo de macarrão",
						"uuid": "Compendium.tormenta20.equipamentos.Item.XcSLRivuLbQJOGo4"
					},
					{
						"nome": "Martelo de carne",
						"uuid": "Compendium.tormenta20.equipamentos.Item.1Wwm1hksFzkzB82S"
					}
				],
				"nota": "mesmas estatísticas de uma clava"
			},
			{
				"nome": "Panela",
				"uuid": "Compendium.tormenta20.equipamentos.Item.N4U5odsI1LYIa1YP"
			},
			{
				"nome": "Avental",
				"uuid": "Compendium.tormenta20.equipamentos.Item.z0J8QGLzEsHt9Luf"
			},
			{
				"nome": "Caneca",
				"uuid": "Compendium.tormenta20.equipamentos.Item.nWvPmSgkwxKY05Sm"
			},
			{
				"nome": "Pano sujo",
				"uuid": "Compendium.tormenta20.equipamentos.Item.irmf9iIGjG2z6bZF"
			}
		],
		"pericias": [
			"dipl",
			"joga",
			"cozi"
		],
		"poderes": [
			{
				"nome": "Proficiência",
				"uuid": "Compendium.tormenta20.poderes.Item.AD22Tx3t0ur2lL2e"
			},
			{
				"nome": "Vitalidade",
				"uuid": "Compendium.tormenta20.poderes.Item.vcYz5xdAi4RluSoM"
			}
		],
		"unico": {
			"nome": "Gororoba",
			"uuid": "Compendium.tormenta20.poderes.Item.VweL3eGjdeSFVA4x"
		}
	},
	"trabalhador": {
		"nome": "Trabalhador",
		"fonte": "JdA p. 95",
		"tipo": "basica",
		"itens": [
			{
				"nome": "Ferramenta pesada",
				"nota": "mesmas estatísticas de uma maça ou lança, a sua escolha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.FX43nQcWjWrhuhPt"
			}
		],
		"pericias": [
			"atle",
			"fort"
		],
		"poderes": [
			{
				"nome": "Atlético",
				"uuid": "Compendium.tormenta20.poderes.Item.3xj6PavO9eazdqRx"
			}
		],
		"unico": {
			"nome": "Esforçado",
			"uuid": "Compendium.tormenta20.poderes.Item.SooBC7lZw8kXFzEq"
		}
	},
	"bacharel": {
		"nome": "Bacharel",
		"fonte": "HdA p. 46",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"conh",
			"dipl",
			"nobr"
		],
		"beneficio": "Você é treinado em Conhecimento, Diplomacia e Nobreza. Além disso, uma vez por cena pode usar Diplomacia para mudar atitude como uma ação livre.",
		"itens": [
			{
				"nome": "Tabardo com o símbolo de Khalmyr",
				"uuid": "Compendium.tormenta20.equipamentos.Item.w04ErUI4RPrDP9ax"
			},
			{
				"nome": "Uma coleção de livros a sua escolha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jhJviQkVaDYk28yY"
			}
		],
		"unico": {
			"nome": "Bacharel",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.rjDu30jbDro1D6dy"
		}
	},
	"boticario": {
		"nome": "Boticário",
		"fonte": "HdA p. 47",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"cura",
			"alqu"
		],
		"beneficio": "Você é treinado em Cura e Ofício (alquimista). Além disso, pode fabricar poções de duas fórmulas de 1º círculo a sua escolha, como se tivesse o poder Alquimista Iniciado.",
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Instrumentos de Ofício (alquimista)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			}
		],
		"unico": {
			"nome": "Boticário",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.r612drQAfvdEn17C"
		}
	},
	"cacadorderatos": {
		"nome": "Caçador de Ratos",
		"fonte": "HdA p. 47",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"furt",
			"inve",
			"sobr"
		],
		"beneficio": "Você é treinado em Furtividade, Investigação e Sobrevivência, e recebe +2 em testes de perícias contra criaturas de duas categorias de tamanho menor que a sua (mínimo Minúsculas).",
		"itens": [
			{
				"nome": "Clava",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JUlyA7UGoTGdXkCP"
			},
			{
				"nome": "Gato",
				"animal": true,
				"nota": "um parceiro perseguidor iniciante",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cParcGato0000"
			},
			{
				"nome": "T$ 50",
				"dinheiro": 50,
				"nota": "recompensa por sua última caçada"
			}
		],
		"unico": {
			"nome": "Caçador de Ratos",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.QVwUcwFPH1RQ4yuF"
		}
	},
	"caodebriga": {
		"nome": "Cão de Briga",
		"fonte": "HdA p. 48",
		"tipo": "especial",
		"poderes": [],
		"pericias": [],
		"beneficio": "Na primeira vez a cada cena em que você faz a ação agredir, pode fazer um ataque extra.",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Manoplas",
						"uuid": "Compendium.tormenta20.equipamentos.Item.bsKUfUMnqIXt4dGl"
					},
					{
						"nome": "Uma arma marcial",
						"categoria": true
					}
				]
			}
		],
		"unico": {
			"nome": "Cão de Briga",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4nxAWIB33ZjERlxj"
		}
	},
	"carcereiro": {
		"nome": "Carcereiro",
		"fonte": "HdA p. 48",
		"tipo": "especial",
		"poderes": [],
		"pericias": [],
		"beneficio": "Você recebe +2 em testes contra efeitos mentais, Enganação, Furtividade e Intimidação.",
		"itens": [
			{
				"nome": "Algemas",
				"uuid": "Compendium.tormenta20.equipamentos.Item.lkNT2EjekhRIb5vt"
			},
			{
				"nome": "Lampião",
				"uuid": "Compendium.tormenta20.equipamentos.Item.hSNkEKLoTHuywNya"
			},
			{
				"nome": "Uma arma de até T$ 500 a sua escolha",
				"categoria": true,
				"nota": "que você pode ou não ter obtido de um detento"
			}
		],
		"unico": {
			"nome": "Carcereiro",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.BADWxBqfvVMdyiIL"
		}
	},
	"carpinteirodeguilda": {
		"nome": "Carpinteiro de Guilda",
		"fonte": "HdA p. 48",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"arte"
		],
		"beneficio": "Você é treinado em Ofício (artesão). Além disso, recebe redução de corte 2 e, em suas mãos, armas de corte ignoram 5 pontos de redução de dano.",
		"itens": [
			{
				"nome": "Instrumentos de Ofício (carpinteiro)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Uma arma de corte a sua escolha",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Carpinteiro de Guilda",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Smnr5x6VuT5CywiX"
		}
	},
	"catadordacatastrofe": {
		"nome": "Catador da Catástrofe",
		"fonte": "HdA p. 48",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"fort",
			"perc"
		],
		"beneficio": "Você é treinado em Fortitude e Percepção. No início de cada aventura, pode fazer um teste de Percepção (CD 15 + metade do seu nível). Se passar, encontra um tesouro correspondente a seu próprio ND.",
		"itens": [
			{
				"nome": "Dois equipamentos de aventura de até T$ 150 cada a sua escolha",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Catador da Catástrofe",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.l9bQJp6iXXsQT7O1"
		}
	},
	"chefhynne": {
		"nome": "Chef Hynne",
		"fonte": "HdA p. 48",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"cozi"
		],
		"beneficio": "Você é treinado em Ofício (cozinheiro). Quando prepara um prato especial, seu benefício dura mais 1 dia.",
		"itens": [
			{
				"nome": "Cutelo",
				"nota": "mesmas estatísticas de uma foice",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cCutelo000000"
			},
			{
				"nome": "Instrumentos de cozinheiro aprimorados",
				"nota": "cozinheiro, aprimorados",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			}
		],
		"unico": {
			"nome": "Chef Hynne",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.44FsojcYoxZTeOml"
		}
	},
	"cirurgiaobarbeiro": {
		"nome": "Cirurgião-Barbeiro",
		"fonte": "HdA p. 49",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"cura",
			"ofic"
		],
		"oficio": "barbeiro",
		"beneficio": "Você é treinado em Cura e Ofício (barbeiro). Além disso, pode gastar uma ação completa e 2 PM para remover uma condição de uma criatura adjacente (lista no livro); a criatura perde 1d6 PV.",
		"itens": [
			{
				"nome": "Dente falso",
				"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.MibKODBeu41pw5DO"
			},
			{
				"nome": "Instrumentos de barbeiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			}
		],
		"unico": {
			"nome": "Cirurgião-Barbeiro",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.7ZDqgLp5SqbDthw0"
		}
	},
	"citadinoabastado": {
		"nome": "Citadino Abastado",
		"fonte": "HdA p. 49",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"nobr",
			"ofic"
		],
		"beneficio": "Você é treinado em Nobreza e em um Ofício a sua escolha. Em cidade grande, pode gastar T$ 10 x nível para usar por uma cena um poder de combate, de destino ou de uma de suas classes (até o fim da aventura).",
		"itens": [
			{
				"nome": "Uma arma, armadura, ferramenta ou vestuário no valor de até T$ 500",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Citadino Abastado",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.2SJgHsMBcwod4833"
		},
		"nota": "O Ofício é à escolha do jogador."
	},
	"cocheiro": {
		"nome": "Cocheiro",
		"fonte": "HdA p. 49",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"ades",
			"pilo"
		],
		"beneficio": "Você é treinado em Adestramento e Pilotagem e, quando está conduzindo um veículo, você e o veículo recebem +2 na Defesa e em testes de resistência.",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Cavalo",
						"animal": true,
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontCavalo00"
					},
					{
						"nome": "Trobo",
						"animal": true,
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontTrobo000"
					}
				]
			},
			{
				"nome": "Carroça",
				"uuid": "Compendium.tormenta20.equipamentos.Item.9AshEQWx8xIxDXj2"
			}
		],
		"unico": {
			"nome": "Cocheiro",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.kixcd4nWd4I6YYl4"
		}
	},
	"construtor": {
		"nome": "Construtor",
		"fonte": "HdA p. 49",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"fort",
			"ofic"
		],
		"oficio": "pedreiro",
		"beneficio": "Você é treinado em Fortitude e Ofício (pedreiro). Pode pagar 2 PM para que você ou um aliado em alcance curto ignore 5 pontos da RD de uma criatura ou objeto em alcance curto por uma cena.",
		"itens": [
			{
				"escolha": [
					{
						"nome": "Instrumentos de pedreiro",
						"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
					},
					{
						"nome": "Ferramenta pesada",
						"nota": "mesmas estatísticas de uma maça ou lança, a sua escolha",
						"uuid": "Compendium.tormenta20.equipamentos.Item.FX43nQcWjWrhuhPt"
					}
				]
			}
		],
		"unico": {
			"nome": "Construtor",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.kbqcdO6yWTtyt9f8"
		}
	},
	"contrabandista": {
		"nome": "Contrabandista",
		"fonte": "HdA p. 50",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"enga",
			"ladi"
		],
		"beneficio": "Você é treinado em Enganação e Ladinagem, e recebe +5 em testes de Ladinagem para ocultar itens em si mesmo ou em veículos. Sua capacidade de carga aumenta em 2 espaços.",
		"itens": [
			{
				"nome": "Uma arma de fogo, ou 10 doses de venenos, com preço total de até T$ 500",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Contrabandista",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.GvweVhNOzY1KGO6Y"
		}
	},
	"coureiro": {
		"nome": "Coureiro",
		"fonte": "HdA p. 50",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"fort",
			"ofic"
		],
		"oficio": "coureiro",
		"beneficio": "Você é treinado em Fortitude e Ofício (coureiro). Pode gastar 10 minutos e T$ 10 para melhorar uma armadura de couro (+1 Defesa, –2 na penalidade) por um dia.",
		"itens": [
			{
				"nome": "Faca de corte",
				"nota": "como uma adaga, mas com dano de corte",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cFacaCorte000"
			},
			{
				"nome": "Instrumentos de coureiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "T$ 100 em itens alquímicos",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Coureiro",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.m3beczHFF62zO4rB"
		}
	},
	"escriba": {
		"nome": "Escriba",
		"fonte": "HdA p. 50",
		"tipo": "especial",
		"poderes": [
			{
				"nome": "Lendas e Histórias",
				"uuid": "Compendium.tormenta20.poderes.Item.pa9O0ay5tYiQrRjE"
			}
		],
		"pericias": [
			"conh",
			"ofic"
		],
		"oficio": "escriba",
		"beneficio": "Você é treinado em Conhecimento e Ofício (escriba) e recebe o poder de bardo Lendas e Histórias. Se receber esse poder novamente, em seu lugar recebe +5 ao rolar novamente um teste usando seu efeito.",
		"itens": [
			{
				"nome": "Instrumentos de escriba",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Organizador de pergaminhos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.xSbZylg3KpduPDBE"
			},
			{
				"nome": "Uma coleção de livros a sua escolha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jhJviQkVaDYk28yY"
			}
		],
		"unico": {
			"nome": "Escriba",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.RkAXG9D9Pnucc0GB"
		}
	},
	"espiao": {
		"nome": "Espião",
		"fonte": "HdA p. 50",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"enga",
			"ladi"
		],
		"beneficio": "Você é treinado em Enganação e Ladinagem. Escolha uma de suas perícias (exceto Luta ou Pontaria): você pode usar Carisma como atributo-chave dela.",
		"itens": [
			{
				"nome": "Estojo de disfarces",
				"uuid": "Compendium.tormenta20.equipamentos.Item.7d9rOIGNdGSTnXUG"
			},
			{
				"nome": "Gazua",
				"uuid": "Compendium.tormenta20.equipamentos.Item.Wjpiz1Um7NkFXPDa"
			},
			{
				"nome": "Luneta",
				"uuid": "Compendium.tormenta20.equipamentos.Item.DIGKu51vzwEm60Rz"
			},
			{
				"nome": "Cosmético",
				"qtd": 3,
				"uuid": "Compendium.tormenta20.equipamentos.Item.QmgdY2V0DgK55myC"
			}
		],
		"unico": {
			"nome": "Espião",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.PaKwukfCG1zPYtEJ"
		}
	},
	"ferreiromilitar": {
		"nome": "Ferreiro Militar",
		"fonte": "HdA p. 51",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"arme"
		],
		"beneficio": "Você é treinado em Ofício (armeiro). Além disso, recebe +2 em rolagens de dano com martelos e marretas de qualquer tipo.",
		"itens": [
			{
				"nome": "Instrumentos de armeiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Martelo leve",
				"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.vCFVNmmQ5kttr6lD"
			}
		],
		"unico": {
			"nome": "Ferreiro Militar",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.wFlO6iCHH1RLmd5J"
		}
	},
	"freira": {
		"nome": "Freira",
		"fonte": "HdA p. 51",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"cura"
		],
		"beneficio": "Você é treinada em Cura. Ao ajudar, pode gastar 1 PM para +1d4 no bônus; ao usar um efeito de cura, pode gastar 1 PM para +1 dado do mesmo tipo.",
		"itens": [
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			},
			{
				"nome": "Manto eclesiástico",
				"uuid": "Compendium.tormenta20.equipamentos.Item.ZtzSpOyjFyUrPRPk"
			},
			{
				"nome": "Símbolo sagrado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.GN5S9awu41thdvCn"
			}
		],
		"unico": {
			"nome": "Freira",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.OzO4Nk0o061p3XUW"
		}
	},
	"goradista": {
		"nome": "Goradista",
		"fonte": "HdA p. 51",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"cozi"
		],
		"beneficio": "Você é treinado em Ofício (cozinheiro); pode gastar T$ 10 a mais num prato especial para cobertura de gorad (2 PM temporários por patamar do comensal).",
		"itens": [
			{
				"nome": "Instrumentos de cozinheiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "T$ 36 em ingredientes para produzir gorad quente",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Goradista",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.M6WCBI3hUrfQl0Um"
		}
	},
	"insciente": {
		"nome": "Insciente",
		"fonte": "HdA p. 51",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"sobr"
		],
		"beneficio": "Você é treinado em Sobrevivência e recebe resistência a magia +5.",
		"itens": [
			{
				"nome": "Uma arma simples ou ferramenta a sua escolha de até T$ 100",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Insciente",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.65XsECZs2cNllbjL"
		}
	},
	"interrogador": {
		"nome": "Interrogador",
		"fonte": "HdA p. 51",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"inti",
			"inve"
		],
		"beneficio": "Você é treinado em Intimidação e Investigação, e recebe +1 na margem de ameaça contra criaturas feridas (PV abaixo do total).",
		"itens": [
			{
				"nome": "Um ou mais itens somando T$ 100 que pertenciam a antigos interrogados",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Interrogador",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.5qRv8SgeGgzzTXWg"
		}
	},
	"ladraodetumulos": {
		"nome": "Ladrão de Túmulos",
		"fonte": "HdA p. 52",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"ladi",
			"sobr"
		],
		"beneficio": "Você é treinado em Ladinagem e Sobrevivência, recebe +2 na Defesa e em testes de perícia contra mortos-vivos e redução de trevas 5 (morto-vivo: +1 PV por dado de dano de trevas).",
		"itens": [
			{
				"nome": "Pá",
				"nota": "mesmas estatísticas de uma lança",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cPa0000000000"
			},
			{
				"nome": "Pé de cabra",
				"uuid": "Compendium.tormenta20.equipamentos.Item.0QLhtTZeNl25J8sg"
			}
		],
		"unico": {
			"nome": "Ladrão de Túmulos",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Kkttn5qQutlaxSV1"
		}
	},
	"menestrel": {
		"nome": "Menestrel",
		"fonte": "HdA p. 52",
		"tipo": "especial",
		"poderes": [
			{
				"escolha": [
					{
						"nome": "Balada Fascinante",
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMusicaBalada"
					},
					{
						"nome": "Canção Assustadora",
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMusicaCancao"
					},
					{
						"nome": "Melodia Curativa",
						"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMusicaMelodi"
					}
				],
				"nota": "um poder de Música de bardo"
			}
		],
		"pericias": [
			"atua"
		],
		"beneficio": "Você é treinado em Atuação e recebe um poder de Música de bardo, escolhido entre Balada Fascinante, Canção Assustadora e Melodia Curativa.",
		"itens": [
			{
				"nome": "Um instrumento musical de até T$ 35 a sua escolha",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Menestrel",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.Qe7XxfNkfD2LK7MW"
		}
	},
	"mensageiro": {
		"nome": "Mensageiro",
		"fonte": "HdA p. 52",
		"tipo": "especial",
		"poderes": [],
		"pericias": [],
		"beneficio": "Você recebe +3m em seu deslocamento e +2 em testes de resistência.",
		"itens": [
			{
				"nome": "Cavalo",
				"animal": true,
				"nota": "com sela",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontCavalo00"
			},
			{
				"nome": "Sela",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1ZF7UB1MesD7ca8A"
			},
			{
				"nome": "Mochila de aventureiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.pteAAJNAkuo7C2Uv"
			},
			{
				"nome": "Traje de viajante",
				"uuid": "Compendium.tormenta20.equipamentos.Item.5S1fxBo6Z5KXuMTC"
			}
		],
		"unico": {
			"nome": "Mensageiro",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.xpjGWwc4HYqUBWr3"
		}
	},
	"naufrago": {
		"nome": "Náufrago",
		"fonte": "HdA p. 52",
		"tipo": "especial",
		"poderes": [],
		"pericias": [],
		"beneficio": "Você recebe +5 PV e +2 PM. Uma vez por cena, pode gastar 2 PM para receber até o fim da cena: treinamento em uma perícia; proficiência com uma arma, armadura ou escudo; ou usar uma ferramenta no lugar de outra.",
		"itens": [
			{
				"nome": "Arco curto",
				"uuid": "Compendium.tormenta20.equipamentos.Item.E8czrmn4rH7Fqyea"
			},
			{
				"nome": "Flechas",
				"qtd": 20,
				"uuid": "Compendium.tormenta20.equipamentos.Item.UI59UM7vpFaHRc18"
			},
			{
				"nome": "Uma bola (ou outro objeto simples) com uma cara pintada e nome de gente",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Náufrago",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.oXD1HVCxgGVEf3Cx"
		}
	},
	"padeiro": {
		"nome": "Padeiro",
		"fonte": "HdA p. 52",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"cozi"
		],
		"beneficio": "Você é treinado em Ofício (cozinheiro), recebe +1 em rolagens de dano com armas de impacto e pode substituir testes de Atletismo por Ofício (cozinheiro).",
		"itens": [
			{
				"nome": "Instrumentos de Ofício (cozinheiro)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Rolo de massa",
				"nota": "mesmas estatísticas de uma clava",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cRoloMassa000"
			}
		],
		"unico": {
			"nome": "Padeiro",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.XzyUdh3Wcw8BV3Z1"
		}
	},
	"pedinte": {
		"nome": "Pedinte",
		"fonte": "HdA p. 53",
		"tipo": "especial",
		"poderes": [],
		"pericias": [],
		"beneficio": "Você recebe +2 em Enganação e Furtividade. Ao usar um alimento, preparado alquímico ou poção, pode rolar o efeito duas vezes e usar o melhor, ou dividir o item com um aliado adjacente.",
		"itens": [
			{
				"nome": "Andrajos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.QI4K4c7dDG99PEt9"
			},
			{
				"nome": "Bálsamo restaurador",
				"nota": "esmolas que guardou",
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Essência de mana",
				"nota": "esmolas que guardou",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			}
		],
		"unico": {
			"nome": "Pedinte",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.jiyniHczBGEoeFqJ"
		}
	},
	"pescador": {
		"nome": "Pescador",
		"fonte": "HdA p. 53",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"ofic",
			"sobr"
		],
		"oficio": "pescador",
		"beneficio": "Você é treinado em Ofício (pescador) e Sobrevivência. Recebe +2 em Iniciativa e, sempre que prepara uma ação, +2 em testes para executá-la.",
		"itens": [
			{
				"nome": "Bolsa cheia de minhocas",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cBolsaMinhoca"
			},
			{
				"nome": "Instrumentos de pescador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			}
		],
		"unico": {
			"nome": "Pescador",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.4LllYmdJrfdQHI9f"
		}
	},
	"servo": {
		"nome": "Servo",
		"fonte": "HdA p. 53",
		"tipo": "especial",
		"poderes": [],
		"pericias": [
			"dipl",
			"ofic"
		],
		"oficio": "serviçal",
		"beneficio": "Você é treinado em Diplomacia e Ofício (serviçal), recebe +2 em Diplomacia e Enganação contra alvos de status superior e pode substituir testes de Nobreza por Ofício (serviçal).",
		"itens": [
			{
				"nome": "Balde e vassoura",
				"nota": "mesmas estatísticas de um bordão",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cBaldeVassour"
			},
			{
				"nome": "Tabardo de seu patrono",
				"uuid": "Compendium.tormenta20.equipamentos.Item.w04ErUI4RPrDP9ax"
			}
		],
		"unico": {
			"nome": "Servo",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.lUGIueesUL1JJatc"
		}
	},
	"suportedetropas": {
		"nome": "Suporte de Tropas",
		"fonte": "HdA p. 53",
		"tipo": "especial",
		"poderes": [],
		"pericias": [],
		"beneficio": "Sempre que você faz um teste para ajudar, o bônus que fornece aumenta em +2. Quando flanqueia um inimigo, o bônus que você e seus aliados recebem em testes de ataque aumenta para +4.",
		"itens": [
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			},
			{
				"nome": "Instrumentos de ofício",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			}
		],
		"unico": {
			"nome": "Suporte de Tropas",
			"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.sgQicS4QBoQBkEmZ"
		}
	},
	"agricultorsambur": {
		"nome": "Agricultor Sambur",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": "Repúblicas Livres de Sambúrdia",
		"pericias": [
			"ades",
			"sobr"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Ferramenta agrícola",
				"nota": "mesmas estatísticas de uma lança",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.rrRyPYbgME2rO3Oo"
			},
			{
				"nome": "T$ 100",
				"dinheiro": 100,
				"nota": "um presente de despedida da sua família"
			}
		],
		"unico": {
			"nome": "Agricultor Sambur",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.TChCsG7ZcXIYJA4f"
		},
		"beneficio": "Treinado em Adestramento e Sobrevivência; uma vez por cena, pode gastar 1 PM para +1d6 em um teste de perícia."
	},
	"amazonadehippion": {
		"nome": "Amazona de Hippion",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": [
			"Deheon",
			"Namalkah"
		],
		"pericias": [
			"cava"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Cavalo de guerra",
				"animal": true,
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontCavGuerr"
			}
		],
		"unico": {
			"nome": "Amazona de Hippion",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.uhqYyYi3A5U2EXjC"
		},
		"beneficio": "Treinada em Cavalgar; sem armadura pesada, soma Carisma nos PM, limitado pelo nível (após um dia)."
	},
	"amoquepurpura": {
		"nome": "Amoque Púrpura",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": "Ermos Púrpuras",
		"pericias": [
			"inti"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples",
				"categoria": true
			},
			{
				"nome": "Estandarte da sua tribo",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cEstandTribo0"
			}
		],
		"unico": {
			"nome": "Amoque Púrpura",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.9fA1cRdpP9LvNYQo"
		},
		"beneficio": "Treinado em Intimidação; sob Fúria, Fúria Divina ou Poder Oculto, +2 em rolagens de dano."
	},
	"anaodearmas": {
		"nome": "Anão de Armas",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": "Doherimm",
		"pericias": [
			"arme"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma marcial tradicional anã",
				"categoria": true
			},
			{
				"nome": "Instrumentos de Ofício (armeiro)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			}
		],
		"unico": {
			"nome": "Anão de Armas",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.0rLc2VeUrWwUAL68"
		},
		"beneficio": "Treinado em Ofício (armeiro); +2 em rolagens de dano com armas tradicionais anãs (machados, martelos, marretas e picaretas)."
	},
	"andarilhoubaneri": {
		"nome": "Andarilho Ubaneri",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": "Ubani",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Escudo pesado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1yGTB9tyXXSaN1wS"
			},
			{
				"nome": "Lança",
				"uuid": "Compendium.tormenta20.equipamentos.Item.vaCe85lpdH10teLi"
			}
		],
		"unico": {
			"nome": "Andarilho Ubaneri",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.ijfBMEj68ZDj8H3b"
		},
		"beneficio": "Recebe um alikunhá (parceiro iniciante que não conta no limite; quadro na p. 471) e proficiência com escudos (se já tiver, o bônus na Defesa do escudo aumenta em +1).",
		"proficiencias": [
			"escudos"
		]
	},
	"aprendizdedragoeiro": {
		"nome": "Aprendiz de Dragoeiro",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": "Sckharshantallas",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Troféu de caça",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cTrofeuCaca00"
			},
			{
				"nome": "Treckod",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.VoWfHMEaRjoqpZd7"
			}
		],
		"unico": {
			"nome": "Aprendiz de Dragoeiro",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.PqkVxVuVpWSYfBfY"
		},
		"beneficio": "+2 na Defesa contra criaturas maiores e +2 em Reflexos; se passar em Reflexos, ataques contra a fonte causam +1d8 até o fim da cena."
	},
	"aprendizdedrogadora": {
		"nome": "Aprendiz de Drogadora",
		"fonte": "Atlas p. 470",
		"tipo": "regional",
		"regiao": "Galrasia",
		"pericias": [
			"cura",
			"alqu"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"qtd": 2,
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Poção de curar ferimentos",
				"qtd": 2,
				"nota": "o livro não indica aprimoramento; resolvida para a versão básica (2d8+2 PV)",
				"uuid": "Compendium.tormenta20.pocoes.Item.TrQw6O1ebgl4AGvY"
			},
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			}
		],
		"unico": {
			"nome": "Aprendiz de Drogadora",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.lUvUIqQiJnpPyXXD"
		},
		"beneficio": "Treinada em Cura e Ofício (alquimista); gasta só 1/4 do preço em matérias-primas de preparados alquímicos e poções."
	},
	"aristocratadaizenshi": {
		"nome": "Aristocrata Dai'zenshi",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Tamu-ra",
		"pericias": [
			"nobr"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Traje da corte",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JwWMw9SpTVXSVIBp"
			},
			{
				"nome": "Katana",
				"nota": "superior com uma melhoria (exceto material especial)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.Flif0uZZpMv1qcQw"
			}
		],
		"unico": {
			"nome": "Aristocrata Dai'zenshi",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.cE8d4Bc3bdIucy1W"
		},
		"beneficio": "Treinado em Nobreza; ao descansar sem ter feito testes de Enganação, Furtividade ou Ladinagem desde o último descanso, +1 PM temporário a cada dois níveis."
	},
	"armeiroarmado": {
		"nome": "Armeiro Armado",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Zakharov",
		"pericias": [
			"arme"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true
			},
			{
				"nome": "Instrumentos de Ofício (armeiro)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			}
		],
		"unico": {
			"nome": "Armeiro Armado",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.byDYtiq3jmQZU57u"
		},
		"beneficio": "Treinado em Ofício (armeiro) e pode fabricar armas com uma melhoria; se aprender a fabricar armas superiores por outra habilidade, gasta 1/4 do preço das melhorias."
	},
	"aspiranteaheroi": {
		"nome": "Aspirante a Herói",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Deheon",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Essência de mana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			},
			{
				"nome": "Mochila de aventureiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.pteAAJNAkuo7C2Uv"
			}
		],
		"unico": {
			"nome": "Aspirante a Herói",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.W7Ni43HKzVVmAxZB"
		},
		"beneficio": "+1 em um atributo à sua escolha.",
		"atributo": 1
	},
	"assistenteforense": {
		"nome": "Assistente Forense",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Salistick",
		"pericias": [
			"inve"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Lupa",
				"nota": "conta como uma ferramenta que fornece +1 em Investigação",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.9hwFeq8jUCp3k74M"
			}
		],
		"unico": {
			"nome": "Assistente Forense",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.neScx4Jw0ocweiOV"
		},
		"beneficio": "Treinado em Investigação; usa-a para necropsia, identificar itens alquímicos e rastrear, e para identificar criaturas numa cena de crime."
	},
	"bandoleirodafortaleza": {
		"nome": "Bandoleiro da Fortaleza",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Khalifor",
		"pericias": [
			"furt",
			"inti"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Adaga",
				"uuid": "Compendium.tormenta20.equipamentos.Item.XuObO7LzBBNoIsGv"
			},
			{
				"nome": "Gazua",
				"uuid": "Compendium.tormenta20.equipamentos.Item.Wjpiz1Um7NkFXPDa"
			},
			{
				"nome": "Manto camuflado",
				"nota": "urbano",
				"uuid": "Compendium.tormenta20.equipamentos.Item.FMnT2iyH7mRPChuN"
			}
		],
		"unico": {
			"nome": "Bandoleiro da Fortaleza",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.RwUpHnaySK92GYX9"
		},
		"beneficio": "Treinado em Furtividade e Intimidação; resistência a medo +5."
	},
	"baraoarruinado": {
		"nome": "Barão Arruinado",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Feudos de Trebuck",
		"pericias": [
			"nobr"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Anel com símbolo da família",
				"nota": "T$ 200",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Yp2GZzrakpJ92m2f"
			},
			{
				"nome": "Títulos de terras expirados",
				"nota": "+2 em Diplomacia com nobres e burocratas",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.j7xvNZu4W5HfPUHu"
			},
			{
				"nome": "Traje da corte",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JwWMw9SpTVXSVIBp"
			}
		],
		"unico": {
			"nome": "Barão Arruinado",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.eOS4DvsGTXiy4IMd"
		},
		"beneficio": "Treinado em Nobreza; ao falhar num teste de perícia com consequência negativa, +2 em testes da mesma perícia até o fim da cena.",
		"nota": "O livro (texto e tabela) põe esta origem em Trebuck; o compêndio marca o subtipo como Khalifor."
	},
	"catadordacidadevelha": {
		"nome": "Catador da Cidade Velha",
		"fonte": "Atlas p. 471",
		"tipo": "regional",
		"regiao": "Nova Malpetrim",
		"pericias": [
			"fort",
			"perc"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Luneta",
				"uuid": "Compendium.tormenta20.equipamentos.Item.DIGKu51vzwEm60Rz"
			},
			{
				"nome": "Luvas de pelica",
				"uuid": "Compendium.tormenta20.equipamentos.Item.7F1CRKWOqkzn4a1u"
			},
			{
				"nome": "Tranqueiras resgatadas do mar",
				"nota": "2 espaços, valor de venda T$ 100",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.qL1iEwSKPLV9tWht"
			}
		],
		"unico": {
			"nome": "Catador da Cidade Velha",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.EtHZAULduS9ESInv"
		},
		"beneficio": "Treinado em Fortitude e Percepção; pode gastar 1 PM para receber deslocamento de natação igual ao básico (ou +3m) por uma cena."
	},
	"cativodasfadas": {
		"nome": "Cativo das Fadas",
		"fonte": "Atlas p. 472",
		"tipo": "regional",
		"regiao": "Pondsmânia",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Corda",
				"uuid": "Compendium.tormenta20.equipamentos.Item.zhN019SNUiYzz3aU"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 10,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			},
			{
				"nome": "Essência de mana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			}
		],
		"unico": {
			"nome": "Cativo das Fadas",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.YPK4vpctswr0XzxN"
		},
		"beneficio": "Resistência a espíritos e magia +2 e +1 PV por nível de personagem."
	},
	"competidordocircuito": {
		"nome": "Competidor do Circuito",
		"fonte": "Atlas p. 472",
		"tipo": "regional",
		"regiao": "Feudos de Trebuck",
		"pericias": [],
		"poderes": [
			{
				"nome": "Torcida",
				"uuid": "Compendium.tormenta20.poderes.Item.xZz3ZMJ47L2pzPmG"
			}
		],
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true
			},
			{
				"nome": "T$ 100",
				"dinheiro": 100,
				"nota": "suas economias para comprar equipamentos de torneio"
			}
		],
		"unico": {
			"nome": "Competidor do Circuito",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Pxgxb2DbIA9TkFt1"
		},
		"beneficio": "Recebe o poder Torcida; sob efeito dele, sempre que reduz um inimigo a 0 PV com um ataque corpo a corpo, recupera 1 PM."
	},
	"cosmopolita": {
		"nome": "Cosmopolita",
		"fonte": "Atlas p. 472",
		"tipo": "regional",
		"regiao": "Valkaria",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Equipamento de viagem",
				"uuid": "Compendium.tormenta20.equipamentos.Item.j0io05hClsF3OR26"
			},
			{
				"nome": "Traje de viajante",
				"uuid": "Compendium.tormenta20.equipamentos.Item.5S1fxBo6Z5KXuMTC"
			},
			{
				"nome": "Item artístico de origem cultural indefinida",
				"nota": "½ espaço, T$ 100",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.bZjYQssDbqgS355I"
			}
		],
		"unico": {
			"nome": "Cosmopolita",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Vf9OveLYRUmyjBJg"
		},
		"poderesEscolha": [
			{
				"grupo": [
					"geral",
					"classe"
				],
				"texto": "Um poder geral ou de uma classe na qual você tenha pelo menos dois níveis, cujos requisitos cumpra (exceto concedidos ou da Tormenta); pode trocá-lo uma vez por aventura após um descanso."
			}
		],
		"beneficio": "Escolha um poder geral ou de uma classe na qual tenha pelo menos dois níveis (exceto concedidos ou da Tormenta); uma vez por aventura, após descansar, pode trocá-lo."
	},
	"criadafavela": {
		"nome": "Cria da Favela",
		"fonte": "Atlas p. 472",
		"tipo": "regional",
		"regiao": "Valkaria",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Andrajos de aldeão",
				"uuid": "Compendium.tormenta20.equipamentos.Item.QI4K4c7dDG99PEt9"
			},
			{
				"nome": "Corda",
				"uuid": "Compendium.tormenta20.equipamentos.Item.zhN019SNUiYzz3aU"
			},
			{
				"nome": "Vara de madeira (3m)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.iLBmT2s4tuCfvT8R"
			}
		],
		"unico": {
			"nome": "Cria da Favela",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.4dR6tKvAiSrOEu6Y"
		},
		"beneficio": "+1 em Constituição; sua recuperação ao descansar é sempre pelo menos normal.",
		"atributo": {
			"con": 1
		}
	},
	"criadopelasvoracis": {
		"nome": "Criado pelas Voracis",
		"fonte": "Atlas p. 472",
		"tipo": "regional",
		"regiao": "Galrasia",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples",
				"categoria": true
			},
			{
				"nome": "Uma armadura leve",
				"categoria": true
			},
			{
				"nome": "Lança",
				"uuid": "Compendium.tormenta20.equipamentos.Item.vaCe85lpdH10teLi"
			}
		],
		"unico": {
			"nome": "Criado pelas Voracis",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.LHCFsF1dlpetebu5"
		},
		"beneficio": "+2 na Defesa e Sobrevivência e +3m de deslocamento."
	},
	"deoutromundo": {
		"nome": "De Outro Mundo",
		"fonte": "Atlas p. 472",
		"tipo": "regional",
		"regiao": "Éter Divino",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Trajes exóticos",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cTrajesExotic"
			},
			{
				"nome": "Um item qualquer de até T$ 100 do seu mundo natal",
				"categoria": true
			}
		],
		"unico": {
			"nome": "De Outro Mundo",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.eXyOxqfs4WxLgQLH"
		},
		"beneficio": "Escolha uma magia de 1º círculo e um atributo-chave: habilidade (lança a magia) ou tecnologia (item que empunha para lançá-la, limite de PM +2); mágico ou mundano. O mestre tem a palavra final."
	},
	"descendentecolleniano": {
		"nome": "Descendente Colleniano",
		"fonte": "Atlas p. 473",
		"tipo": "regional",
		"regiao": "Ahlen",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples",
				"categoria": true
			},
			{
				"nome": "Estojo de disfarces",
				"uuid": "Compendium.tormenta20.equipamentos.Item.7d9rOIGNdGSTnXUG"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 5,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			}
		],
		"unico": {
			"nome": "Descendente colleniano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.sURke6vQmtJzrdxp"
		},
		"beneficio": "+2 em Percepção e pode lançar Visão Mística (se aprendê-la de novo, custo –1 PM)."
	},
	"desertordasupremacia": {
		"nome": "Desertor da Supremacia",
		"fonte": "Atlas p. 473",
		"tipo": "regional",
		"regiao": "Supremacia Purista",
		"pericias": [
			"guer"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Brunea",
				"nota": "com símbolo purista raspado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.0Zlo3JJpJsaZwyNS"
			},
			{
				"nome": "Escudo pesado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1yGTB9tyXXSaN1wS"
			},
			{
				"nome": "Espada bastarda",
				"uuid": "Compendium.tormenta20.equipamentos.Item.Vl8EoLKtzI7wyT1V"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 10,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			}
		],
		"unico": {
			"nome": "Desertor da Supremacia",
			"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cDesertorSupr"
		},
		"proficiencias": [
			"espada bastarda",
			"escudos"
		],
		"beneficio": "Treinado em Guerra; proficiência com espadas bastardas e escudos; empunhando espada bastarda e escudo pesado, +2 em testes de ataque.",
		"nota": "Única forma de jogar com um nativo da Supremacia Purista (quadro Personagens Puristas, p. 471). Não há poder desta origem no compêndio."
	},
	"duplofeerico": {
		"nome": "Duplo Feérico",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Pondsmânia",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Essência de mana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			},
			{
				"nome": "Marca no corpo ou característica física não possuída pela sua versão original"
			}
		],
		"unico": {
			"nome": "Duplo Feérico",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.OQdST4YLqJyyGqzC"
		},
		"beneficio": "Escolha uma habilidade de classe de 1º nível de outra classe e use-a como se tivesse 1 nível nela (Magias: uma única magia e +1 PM, sem somar o atributo-chave)."
	},
	"duyshidakkinfiltrado": {
		"nome": "Duyshidakk Infiltrado",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Ruínas de Tyrondir",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true
			},
			{
				"nome": "Peças sobressalentes (T$ 100 para vender ou construir engenhocas)",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Duyshidakk Infiltrado",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.4oUTcrf3YdaAK5HF"
		},
		"beneficio": "+2 em Furtividade e Vontade; pode usar Sabedoria como atributo-chave de Enganação."
	},
	"emissarioubaneri": {
		"nome": "Emissário Ubaneri",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Ubani",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Essência de mana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			},
			{
				"nome": "Mochila de aventureiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.pteAAJNAkuo7C2Uv"
			}
		],
		"unico": {
			"nome": "Emissário Ubaneri",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.HoPgy7IWOIPGj25r"
		},
		"beneficio": "Recebe um alikunhá (parceiro iniciante que não conta no limite) e pode usar Sabedoria como atributo-chave de Misticismo."
	},
	"escudeirodaluz": {
		"nome": "Escudeiro da Luz",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Bielefeld",
		"pericias": [
			"nobr"
		],
		"poderes": [],
		"itens": [
			{
				"escolha": [
					{
						"nome": "Cota de malha",
						"uuid": "Compendium.tormenta20.equipamentos.Item.wvwi8zPSP8mRx7LO"
					},
					{
						"nome": "Escudo pesado",
						"uuid": "Compendium.tormenta20.equipamentos.Item.1yGTB9tyXXSaN1wS"
					}
				]
			},
			{
				"nome": "Enfeite de elmo",
				"nota": "com o símbolo da Ordem da Luz",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jxCpE9ebnpdwKLP0"
			}
		],
		"unico": {
			"nome": "Escudeiro da Luz",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.fVYyUO4W6NzXFuEz"
		},
		"beneficio": "Treinado em Nobreza; +2 na Defesa e +3 PM."
	},
	"escudeirosolitario": {
		"nome": "Escudeiro Solitário",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Bielefeld",
		"pericias": [
			"enga",
			"ladi"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Cota de malha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.wvwi8zPSP8mRx7LO"
			},
			{
				"nome": "Escudo pesado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1yGTB9tyXXSaN1wS"
			},
			{
				"nome": "Enfeite de elmo",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jxCpE9ebnpdwKLP0"
			}
		],
		"unico": {
			"nome": "Escudeiro Solitário",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.EoLFE9ngNqERCcZa"
		},
		"beneficio": "Treinado em Enganação e Ladinagem; +10 em Enganação para se disfarçar como cavaleiro da Luz; atacar pelas costas não viola Código de Honra."
	},
	"estandartevivo": {
		"nome": "Estandarte Vivo",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Ermos Púrpuras",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Gibão de peles",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JKt9XIXTwuIjMbLD"
			},
			{
				"nome": "Fragmento do estandarte do seu povo",
				"nota": "se vestido, fornece +1 em testes de Vontade",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cFragEstandar"
			}
		],
		"unico": {
			"nome": "Estandarte Vivo",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.TT5DXjltrzUT8xlm"
		},
		"poderesEscolha": [
			{
				"grupo": [
					"combate",
					"tormenta"
				],
				"texto": "Um poder de combate ou da Tormenta à sua escolha"
			}
		],
		"beneficio": "+2 em Sobrevivência e um poder de combate ou da Tormenta à sua escolha."
	},
	"estudantedaacademia": {
		"nome": "Estudante da Academia",
		"fonte": "Atlas p. 474",
		"tipo": "regional",
		"regiao": "Academia Arcana",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Coleção de livros",
				"nota": "uma qualquer",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jhJviQkVaDYk28yY"
			},
			{
				"nome": "Essência de mana",
				"qtd": 2,
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			}
		],
		"unico": {
			"nome": "Estudante da Academia",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.64sbQGNkDiB0TXnN"
		},
		"beneficio": "Aprende e pode lançar uma magia arcana de 1º círculo (atributo-chave Inteligência); pode testar Misticismo sem treino e, se treinado, recebe +2 nela."
	},
	"estudantedocolegioreal": {
		"nome": "Estudante do Colégio Real",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Salistick",
		"pericias": [
			"cura"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"qtd": 3,
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Maleta de medicamentos",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MJkN9zjZCSzauSy4"
			}
		],
		"unico": {
			"nome": "Estudante do Colégio Real",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.jNzvhaV1TcS16hfu"
		},
		"beneficio": "Treinado em Cura; seus efeitos de cura recuperam +2 PV por dado. Perde o benefício se se tornar devoto de qualquer tipo."
	},
	"exploradorderuinas": {
		"nome": "Explorador de Ruínas",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Ruínas de Tyrondir",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Mochila de aventureiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.pteAAJNAkuo7C2Uv"
			},
			{
				"nome": "Tocha",
				"uuid": "Compendium.tormenta20.equipamentos.Item.ujmPaJ9SNjtVnfLB"
			},
			{
				"nome": "Vara de madeira (3m)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.iLBmT2s4tuCfvT8R"
			}
		],
		"unico": {
			"nome": "Explorador de Ruínas",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.QVe478FTivFaYbcG"
		},
		"beneficio": "+2 em Ladinagem, Percepção e Reflexos e +3m de deslocamento."
	},
	"filhotedarevoada": {
		"nome": "Filhote da Revoada",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Lamnor",
		"pericias": [
			"acro",
			"pilo"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Instrumentos de Ofício (artesão)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.mMPUi2VjdE3rNGkg"
			},
			{
				"nome": "T$ 100",
				"dinheiro": 100,
				"nota": "que você está juntando para fabricar seu primeiro veículo aéreo"
			}
		],
		"unico": {
			"nome": "Filhote da Revoada",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.TJMOqFhYw2c0xc61"
		},
		"beneficio": "Treinado em Acrobacia e Pilotagem; ao testar uma delas, pode gastar 1 PM para rolar um dado adicional e usar o melhor."
	},
	"futuralenda": {
		"nome": "Futura Lenda",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Nova Malpetrim",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial com nome pomposo (e nenhuma melhoria)",
				"categoria": true
			},
			{
				"nome": "Essência de mana",
				"qtd": 2,
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			}
		],
		"unico": {
			"nome": "Futura Lenda",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.muTECMiPCYlAURM2"
		},
		"poderesEscolha": [
			{
				"grupo": "classe",
				"texto": "Um dos poderes de sua classe, normalmente disponíveis a partir do 2º nível"
			}
		],
		"beneficio": "Escolha um dos poderes de sua classe (normalmente disponíveis a partir do 2º nível) e receba-o."
	},
	"ginetedetumarkhan": {
		"nome": "Ginete de Tumarkhân",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Khubar",
		"pericias": [
			"cava"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Sela",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1ZF7UB1MesD7ca8A"
			}
		],
		"unico": {
			"nome": "Ginete de Tumarkhân",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.cXft9miIGQV8UVHd"
		},
		"beneficio": "Treinado em Cavalgar; possui um parceiro tumarkhân iniciante, com quem recebe +2 em Adestramento e Cavalgar; pode usá-lo como montaria especial de outros poderes."
	},
	"grumetepirata": {
		"nome": "Grumete Pirata",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Três Mares",
		"pericias": [
			"acro",
			"atle",
			"refl"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Adaga",
				"uuid": "Compendium.tormenta20.equipamentos.Item.XuObO7LzBBNoIsGv"
			},
			{
				"nome": "Corda",
				"uuid": "Compendium.tormenta20.equipamentos.Item.zhN019SNUiYzz3aU"
			},
			{
				"nome": "Tatuagem",
				"nota": "de sua antiga tripulação (+1 em Intimidação)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.U46WyhdXk6LSjCps"
			}
		],
		"unico": {
			"nome": "Grumete Pirata",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.SKIYXpzym5kTvX3q"
		},
		"beneficio": "Treinado em Acrobacia, Atletismo e Reflexos; equilibrando-se, escalando ou nadando, só cai ou afunda se falhar por 10 ou mais."
	},
	"guardiaoglacial": {
		"nome": "Guardião Glacial",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Montanhas Uivantes",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Casaco longo",
				"uuid": "Compendium.tormenta20.equipamentos.Item.WA5FyTfRnOcGZVHU"
			},
			{
				"nome": "Cavalo glacial",
				"animal": true,
				"uuid": "Compendium.suplementos-de-arton.ameacas-de-arton.Item.TaIgi8VeVfDqYqMO"
			}
		],
		"unico": {
			"nome": "Guardião Glacial",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.1ys7ZIbTfXuNJKTG"
		},
		"proficiencias": [
			"arco longo",
			"machado de batalha"
		],
		"beneficio": "Redução de frio 5 e proficiência em arco longo e machado de batalha (se já tiver, +2 em rolagens de dano com elas)."
	},
	"iniciadodoscacamonstros": {
		"nome": "Iniciado dos Caça-Monstros",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Montanhas Sanguinárias",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Gibão de peles",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JKt9XIXTwuIjMbLD"
			}
		],
		"unico": {
			"nome": "Iniciado dos Caça-Monstros",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.NJk35ZShu2zBPm2L"
		},
		"beneficio": "Identifica criaturas com uma ação de movimento; ao acertar uma criatura não humanoide, pode gastar 1 PM para +1d8 de dano."
	},
	"insurgentetapistano": {
		"nome": "Insurgente Tapistano",
		"fonte": "Atlas p. 475",
		"tipo": "regional",
		"regiao": "Império de Tauron",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Amuleto com um símbolo da resistência",
				"nota": "reconhecível por outros rebeldes",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cAmuletoResis"
			},
			{
				"nome": "Uma arma simples",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Insurgente Tapistano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.nITcg0KObOsTkVib"
		},
		"beneficio": "+1 em Fortitude, Reflexos e Vontade; +3 PV no 1º nível e +1 PV por nível seguinte."
	},
	"irmaosemesporas": {
		"nome": "Irmão sem Esporas",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Namalkah",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Sela",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1ZF7UB1MesD7ca8A"
			}
		],
		"unico": {
			"nome": "Irmão sem Esporas",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.ug9he9YKeRv8KEkO"
		},
		"beneficio": "Possui um irmão cavalo (cavalo de guerra parceiro iniciante) que fornece +1 em testes de ataque e Reflexos; pode usá-lo como montaria especial de outros poderes."
	},
	"legionario": {
		"nome": "Legionário",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Império de Tauron",
		"pericias": [
			"guer"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Brunea",
				"nota": "com símbolo de sua legião",
				"uuid": "Compendium.tormenta20.equipamentos.Item.0Zlo3JJpJsaZwyNS"
			},
			{
				"nome": "Escudo pesado",
				"uuid": "Compendium.tormenta20.equipamentos.Item.1yGTB9tyXXSaN1wS"
			},
			{
				"nome": "Gládio",
				"uuid": "Compendium.suplementos-de-arton.ameacas-de-arton.Item.DEmgTYU8yH1yrVVH"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 10,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			}
		],
		"unico": {
			"nome": "Legionário",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.QmXLg1ABMVNt25kn"
		},
		"proficiencias": [
			"gládio",
			"escudos"
		],
		"beneficio": "Treinado em Guerra; proficiência com gládios e escudos; empunhando gládio e escudo pesado, +1 na margem de ameaça e +1 na Defesa."
	},
	"lenhadordetollon": {
		"nome": "Lenhador de Tollon",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Floresta de Tollon",
		"pericias": [
			"arte"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Um item superior de madeira Tollon",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Lenhador de Tollon",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.XlE8uo7RoLhPLeUy"
		},
		"proficiencias": [
			"machadinha",
			"machado de batalha"
		],
		"beneficio": "Treinado em Ofício (artesão); +5 em testes de perícia (exceto ataque) relacionados a madeira; proficiência com machadinhas e machados de batalha (se já tiver, +2 em dano com eles)."
	},
	"liricistadelenorienn": {
		"nome": "Liricista de Lenórienn",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Lamnor",
		"pericias": [
			"atua"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Alaúde élfico",
				"uuid": "Compendium.tormenta20.equipamentos.Item.DlRSy7UHhSCKv3uk"
			},
			{
				"nome": "Réplica de uma peça artística élfica (1 espaço, T$ 50)",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Liricista de Lenórienn",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.RqpKJTW34wf2HjtH"
		},
		"beneficio": "Treinado em Atuação e +2 nela; pode usar Carisma como atributo-chave de Misticismo."
	},
	"membrodoprincipado": {
		"nome": "Membro do Principado",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Repúblicas Livres de Sambúrdia",
		"pericias": [
			"dipl",
			"intu"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Carroça",
				"uuid": "Compendium.tormenta20.equipamentos.Item.9AshEQWx8xIxDXj2"
			},
			{
				"nome": "Mercadorias sortidas (8 espaços, T$ 400)",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Membro do Principado",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.yOqAlrtXE5WgZmfU"
		},
		"beneficio": "Treinado em Diplomacia e Intuição; na primeira chegada a uma cidade em cada aventura, Diplomacia CD 20 dá 10% de desconto nas compras ali."
	},
	"nitamuraniano": {
		"nome": "Nitamuraniano",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Valkaria",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"escolha": [
					{
						"nome": "Arco longo",
						"uuid": "Compendium.tormenta20.equipamentos.Item.B1hiWU8eEI1NHwcv"
					},
					{
						"nome": "Katana",
						"uuid": "Compendium.tormenta20.equipamentos.Item.Flif0uZZpMv1qcQw"
					}
				]
			},
			{
				"escolha": [
					{
						"nome": "Camisa bufante",
						"uuid": "Compendium.tormenta20.equipamentos.Item.KnKvwLyvuko20Huj"
					},
					{
						"nome": "Traje de seda",
						"nota": "o livro diz 'traje de seda'; resolvido para a Veste de Seda do Jogo do Ano",
						"uuid": "Compendium.tormenta20.equipamentos.Item.xp0RnbT05IAeH8cg"
					}
				]
			}
		],
		"unico": {
			"nome": "Nitamuraniano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.gLDRdjBNUATC89B2"
		},
		"proficiencias": [
			"katana",
			"arco longo"
		],
		"beneficio": "Proficiência em katana e arco longo (se receber de novo, +2 em dano com elas); ao falhar num teste de perícia baseada em Sabedoria, pode gastar 2 PM para refazê-lo."
	},
	"nobrezakharoviano": {
		"nome": "Nobre Zakharoviano",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Zakharov",
		"pericias": [
			"arme"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Traje da corte",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JwWMw9SpTVXSVIBp"
			}
		],
		"unico": {
			"nome": "Nobre Zakharoviano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Sdf0bjsRzmZWOIXG"
		},
		"beneficio": "Treinado em Ofício (armeiro) e recebe uma arma superior com uma melhoria (exceto material especial); de posse dela, +2 PM por patamar (após um dia)."
	},
	"nomadesarallan": {
		"nome": "Nômade Sar-Allan",
		"fonte": "Atlas p. 476",
		"tipo": "regional",
		"regiao": "Halak-Tûr",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"escolha": [
					{
						"nome": "Corcel do deserto",
						"animal": true,
						"uuid": "Compendium.suplementos-de-arton.ameacas-de-arton.Item.prV0G6KIoZAngvl4"
					},
					{
						"nome": "Dromedário",
						"animal": true,
						"uuid": "Compendium.suplementos-de-arton.ameacas-de-arton.Item.sjdxDc1jTsE68fIo"
					}
				],
				"nota": "veja Ameaças de Arton"
			},
			{
				"nome": "Manto camuflado",
				"nota": "deserto",
				"uuid": "Compendium.tormenta20.equipamentos.Item.FMnT2iyH7mRPChuN"
			}
		],
		"unico": {
			"nome": "Nômade Sar-Allan",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.eywVOeG9zZyTljdn"
		},
		"beneficio": "+2 em Fortitude e Sobrevivência e nas rolagens de dano com alfanges, arcos curtos e cimitarras."
	},
	"pescadorparrudo": {
		"nome": "Pescador Parrudo",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Khubar",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Vara de pesca",
				"nota": "pode usar Sobrevivência para sustento",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cVaraPesca000"
			},
			{
				"nome": "Peixes raros salgados para revenda (1 espaço, T$ 50)",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Pescador Parrudo",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.trx390yhJ6jTHRDM"
		},
		"beneficio": "+2 em Atletismo, Fortitude e Sobrevivência e +3 PV; ao nadar, avança seu deslocamento inteiro."
	},
	"plebeuarcano": {
		"nome": "Plebeu Arcano",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Wynlla",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Bandoleira de poções",
				"uuid": "Compendium.tormenta20.equipamentos.Item.MXbMLLc2MxQwENbh"
			},
			{
				"nome": "Gorro de ervas",
				"uuid": "Compendium.tormenta20.equipamentos.Item.vfgEloFPf9c65ui9"
			},
			{
				"nome": "Uma poção arcana de 1º círculo",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Plebeu Arcano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.1P48QxrtOrAri8Cf"
		},
		"beneficio": "+2 PM; uma vez por rodada, ao falhar num teste de resistência contra efeito mágico, pode gastar 1 PM para rolar de novo."
	},
	"prisioneirodascatacumbas": {
		"nome": "Prisioneiro das Catacumbas",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Catacumbas de Leverick",
		"pericias": [
			"perc",
			"refl"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true,
				"nota": "encontrada no corpo de alguém que não sobreviveu às Catacumbas"
			}
		],
		"unico": {
			"nome": "Prisioneiro das Catacumbas",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Y5MCh9agmq9Dnur6"
		},
		"beneficio": "Treinado em Percepção e Reflexos; resistência a armadilhas e efeitos de movimento +5."
	},
	"procuradovivooumorto": {
		"nome": "Procurado: Vivo ou Morto",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Smokestone",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Pistola",
				"uuid": "Compendium.tormenta20.equipamentos.Item.TILlgOKqyS3Ps4le"
			},
			{
				"nome": "Balas cruéis",
				"qtd": 20,
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cBalasCrueis0"
			}
		],
		"unico": {
			"nome": "Procurado: Vivo ou Morto",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.ljnOdcmDNY5c0bi6"
		},
		"proficiencias": [
			"armas de fogo"
		],
		"beneficio": "Proficiência com armas de fogo; +5 em Intimidação e –5 em Diplomacia contra quem o reconheça.",
		"nota": "Uma vez por aventura, a critério do mestre, o grupo é atacado por caçadores de recompensa (quadro Por um Punhado de Tibares)."
	},
	"profetadoakzath": {
		"nome": "Profeta do Akzath",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Lamnor",
		"pericias": [
			"reli"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Bordão",
				"uuid": "Compendium.tormenta20.equipamentos.Item.HyJBwTLK0vY5F1Vp"
			},
			{
				"nome": "Pergaminho com diagrama do Akzath",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cPergAkzath00"
			}
		],
		"unico": {
			"nome": "Profeta do Akzath",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.q1OddQzYXG4JukgK"
		},
		"beneficio": "Treinado em Religião; pode lançar magias mesmo sob efeito de Fúria Divina."
	},
	"queridofilho": {
		"nome": "Querido Filho",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Aslothia",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Essência de sombra",
				"uuid": "Compendium.tormenta20.equipamentos.Item.efp33Oq12RykdKSC"
			},
			{
				"nome": "Manto camuflado",
				"nota": "urbano",
				"uuid": "Compendium.tormenta20.equipamentos.Item.FMnT2iyH7mRPChuN"
			}
		],
		"unico": {
			"nome": "Querido Filho",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.oQtyIZP3a0e4laOj"
		},
		"beneficio": "Redução de frio e trevas 5 e visão no escuro (se já tiver, +2 em Percepção)."
	},
	"rebeldeagitador": {
		"nome": "Rebelde Agitador",
		"fonte": "Atlas p. 477",
		"tipo": "regional",
		"regiao": "Sckharshantallas",
		"pericias": [
			"inic"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Panfleto revolucionário",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cPanfletoRevo"
			},
			{
				"nome": "T$ 6d12",
				"dinheiro": "6d12",
				"nota": "impostos que você deixou de pagar"
			}
		],
		"unico": {
			"nome": "Rebelde Agitador",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.nkYNlbzMGRzxO0FC"
		},
		"beneficio": "Treinado em Iniciativa; uma vez por aventura, gasta um dia e faz Diplomacia CD 10 para convencer pessoas comuns (uma +1 a cada 10 pontos acima), cada uma usável como parceiro iniciante por uma cena."
	},
	"receptadordasnuvens": {
		"nome": "Receptador das Nuvens",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Vectora",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Mercadorias raras e variadas (2 espaços, T$ 300)",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Receptador das Nuvens",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.VKX2SSHcns92l0gb"
		},
		"beneficio": "Em cidade com acesso a seus contatos, gasta 1 dia para obter um aparato mágico (lança uma magia de 1º círculo escolhida, atributo-chave Inteligência); até 2 aparatos."
	},
	"recrutaarcano": {
		"nome": "Recruta Arcano",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Wynlla",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Essência de mana",
				"qtd": 2,
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			},
			{
				"nome": "Varinha arcana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.wPChv8ymcWkPofWu"
			}
		],
		"unico": {
			"nome": "Recruta Arcano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.QL2NSlxwxxUZqeN5"
		},
		"beneficio": "A CD para resistir a suas magias arcanas aumenta em +1 e elas causam +1 ponto de dano."
	},
	"recrutadafenix": {
		"nome": "Recruta da Fênix",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Triunphus",
		"pericias": [
			"cava"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true
			},
			{
				"nome": "Brunea",
				"uuid": "Compendium.tormenta20.equipamentos.Item.0Zlo3JJpJsaZwyNS"
			},
			{
				"nome": "Grifo",
				"animal": true,
				"nota": "grifo iniciante",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cMontGrifo000"
			}
		],
		"unico": {
			"nome": "Recruta da Fênix",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.ei54ZAqAgyxRmMyO"
		},
		"beneficio": "+1 PV por nível, redução de fogo 5 e treinado em Cavalgar."
	},
	"sabiomatematico": {
		"nome": "Sábio Matemático",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Halak-Tûr",
		"pericias": [
			"conh"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Coleção de livros",
				"uuid": "Compendium.tormenta20.equipamentos.Item.jhJviQkVaDYk28yY"
			},
			{
				"nome": "Luneta",
				"uuid": "Compendium.tormenta20.equipamentos.Item.DIGKu51vzwEm60Rz"
			}
		],
		"unico": {
			"nome": "Sábio Matemático",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.5Do0AnHYWXAXrFmd"
		},
		"beneficio": "Treinado em Conhecimento; aprende e pode lançar Concentração de Combate e Orientação (não são magias nem mágicas, exceto para acúmulo)."
	},
	"selvagemsanguinario": {
		"nome": "Selvagem Sanguinário",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Montanhas Sanguinárias",
		"pericias": [
			"sobr"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma marcial",
				"categoria": true
			},
			{
				"nome": "Gibão de peles",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JKt9XIXTwuIjMbLD"
			}
		],
		"unico": {
			"nome": "Selvagem Sanguinário",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.OTvtwdeIbGq2Wrnk"
		},
		"beneficio": "Treinado em Sobrevivência; sem armadura pesada, +1 em rolagens de dano com armas e redução de dano 1."
	},
	"sucateirodebatalhas": {
		"nome": "Sucateiro de Batalhas",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Conflagração do Aço",
		"pericias": [
			"guer",
			"inve"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Bálsamo restaurador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"escolha": [
					{
						"nome": "Escudo leve",
						"uuid": "Compendium.tormenta20.equipamentos.Item.0w1vZm2RGM40opxT"
					},
					{
						"nome": "Escudo pesado",
						"uuid": "Compendium.tormenta20.equipamentos.Item.1yGTB9tyXXSaN1wS"
					}
				]
			},
			{
				"nome": "Essência de mana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 5,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			},
			{
				"nome": "T$ 4d6",
				"dinheiro": "4d6"
			}
		],
		"unico": {
			"nome": "Sucateiro de Batalhas",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.yR3s1iz7UzAgGzpI"
		},
		"beneficio": "Treinado em Guerra e Investigação; ao rolar na Tabela 8-1 (Tesouro por ND), pode rolar de novo cada tipo de tesouro."
	},
	"tamalu": {
		"nome": "Tamalu",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Khubar",
		"pericias": [
			"dipl",
			"nobr"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Traje da corte",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JwWMw9SpTVXSVIBp"
			},
			{
				"nome": "Tatuagem mística",
				"nota": "concedida pelo benefício, à sua escolha entre +1 na Defesa, resistência a magia +2 ou uma magia de 1º círculo (atributo-chave Sabedoria)",
				"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.xEcaGSG9VPX2aWuN"
			}
		],
		"unico": {
			"nome": "Tamalu",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Uz2kDatfyX59ArGG"
		},
		"beneficio": "Treinado em Diplomacia e Nobreza e recebe uma tatuagem mística à sua escolha."
	},
	"tocadopeladamaaltiva": {
		"nome": "Tocado pela Dama Altiva",
		"fonte": "Atlas p. 478",
		"tipo": "regional",
		"regiao": "Moreania",
		"pericias": [
			"ades"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Bordão",
				"uuid": "Compendium.tormenta20.equipamentos.Item.HyJBwTLK0vY5F1Vp"
			},
			{
				"nome": "Ração de viagem",
				"qtd": 5,
				"uuid": "Compendium.tormenta20.equipamentos.Item.idPweKe7ZWln7xQf"
			}
		],
		"unico": {
			"nome": "Tocado pela Dama Altiva",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.1CrKD22pNvD4cCVa"
		},
		"beneficio": "Treinado em Adestramento; pode gastar 1 minuto e 1 PM para convocar um animal Minúsculo que dá +2 numa perícia até o fim da cena (máximo simultâneo = Sabedoria, mínimo 1)."
	},
	"tocadopeloindomavel": {
		"nome": "Tocado pelo Indomável",
		"fonte": "Atlas p. 479",
		"tipo": "regional",
		"regiao": "Moreania",
		"pericias": [
			"atle"
		],
		"poderes": [],
		"itens": [
			{
				"nome": "Trapos surrados",
				"uuid": "Compendium.tormenta20-correcoes.itens-do-livro.Item.t20cTraposSurrad"
			},
			{
				"nome": "Carcaça de couro de algum animal caçado por você",
				"nota": "conta como um gibão de peles",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JKt9XIXTwuIjMbLD"
			}
		],
		"unico": {
			"nome": "Tocado pelo Indomável",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.GXiprLztbgClY4Aa"
		},
		"beneficio": "Treinado em Atletismo; +2 em rolagens de dano com armas naturais e ataques desarmados."
	},
	"tradicionalistasvalano": {
		"nome": "Tradicionalista Svalano",
		"fonte": "Atlas p. 479",
		"tipo": "regional",
		"regiao": "Svalas",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Uma arma simples ou marcial",
				"categoria": true
			},
			{
				"nome": "Corda",
				"uuid": "Compendium.tormenta20.equipamentos.Item.zhN019SNUiYzz3aU"
			},
			{
				"nome": "Mochila de aventureiro",
				"uuid": "Compendium.tormenta20.equipamentos.Item.pteAAJNAkuo7C2Uv"
			},
			{
				"nome": "Vara de madeira (3m)",
				"uuid": "Compendium.tormenta20.equipamentos.Item.iLBmT2s4tuCfvT8R"
			}
		],
		"unico": {
			"nome": "Tradicionalista Svalano",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.7oru35VTHiq4lDrm"
		},
		"beneficio": "Pode usar Sabedoria como atributo-chave de Conhecimento e Nobreza e testá-las sem treinamento; +1 em Fortitude e Vontade."
	},
	"trapaceiroahleniense": {
		"nome": "Trapaceiro Ahleniense",
		"fonte": "Atlas p. 479",
		"tipo": "regional",
		"regiao": "Ahlen",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Essência de sombra",
				"uuid": "Compendium.tormenta20.equipamentos.Item.efp33Oq12RykdKSC"
			},
			{
				"nome": "Gazua",
				"uuid": "Compendium.tormenta20.equipamentos.Item.Wjpiz1Um7NkFXPDa"
			},
			{
				"nome": "Estojo de disfarces",
				"uuid": "Compendium.tormenta20.equipamentos.Item.7d9rOIGNdGSTnXUG"
			}
		],
		"unico": {
			"nome": "Trapaceiro Ahleniense",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.Fwprhm77vLlpIeXf"
		},
		"beneficio": "+2 em Enganação e Furtividade; pode usar Carisma como atributo-chave de Ladinagem."
	},
	"turistadaacademia": {
		"nome": "Turista da Academia",
		"fonte": "Atlas p. 479",
		"tipo": "regional",
		"regiao": "Academia Arcana",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Três pergaminhos de magias arcanas de 1º círculo à sua escolha",
				"categoria": true
			}
		],
		"unico": {
			"nome": "Turista da Academia",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.0X2r1ALbXvONkkX9"
		},
		"beneficio": "Resistência a magia +2; pode ativar pergaminhos de todas as magias arcanas de 1º círculo como se as conhecesse."
	},
	"umcomoskami": {
		"nome": "Um com os Kami",
		"fonte": "Atlas p. 479",
		"tipo": "regional",
		"regiao": "Tamu-ra",
		"pericias": [],
		"poderes": [],
		"itens": [
			{
				"nome": "Bálsamo restaurador",
				"uuid": "Compendium.tormenta20.equipamentos.Item.26L5Yr66Qmiu02oY"
			},
			{
				"nome": "Essência de mana",
				"uuid": "Compendium.tormenta20.equipamentos.Item.JC6bm2uh4g7oaGge"
			}
		],
		"unico": {
			"nome": "Um com os Kami",
			"uuid": "Compendium.suplementos-de-arton.atlas-de-arton.Item.m1lJQvzZncJbBhkm"
		},
		"beneficio": "Pode usar Sabedoria como atributo-chave de Misticismo; acompanhado por um kami (parceiro especial incorpóreo e invisível que não conta no limite)."
	}
};

export const DIVINDADES = {
	"aharadak": {
		"nome": "Aharadak",
		"titulo": "Deus da Tormenta",
		"fonte": "JdA p. 96",
		"energia": "negativa",
		"armaPreferida": "Corrente de espinhos",
		"simbolo": "Um olho macabro de pupila vertical e cercado de espinhos",
		"devotos": "Quaisquer. A Tormenta aceita tudo e todos.",
		"devotosLista": {
			"racas": "todas",
			"classes": "todas"
		},
		"poderes": [
			{
				"nome": "Afinidade com a Tormenta",
				"fonte": "JdA p. 96",
				"uuid": "Compendium.tormenta20.poderes.Item.WHe196oPItMogDSE"
			},
			{
				"nome": "Êxtase da Loucura",
				"fonte": "JdA p. 96",
				"uuid": "Compendium.tormenta20.poderes.Item.omKfBFC5vH1zujMJ"
			},
			{
				"nome": "Percepção Temporal",
				"fonte": "JdA p. 96",
				"uuid": "Compendium.tormenta20.poderes.Item.CqZXnDBiP5Vj9oFv"
			},
			{
				"nome": "Rejeição Divina",
				"fonte": "JdA p. 96",
				"uuid": "Compendium.tormenta20.poderes.Item.959wpT3zgDErAGpY"
			},
			{
				"nome": "Corromper Equipamento",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.9uTytUs9zBShzHyD"
			},
			{
				"nome": "Espalhar a Corrupção",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.t8qLGLGLaeOBn3mP"
			},
			{
				"nome": "Júbilo na Dor",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.rN1fjCtUBvmjFQP3"
			},
			{
				"nome": "Mediador da Tempestade",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.k55TOZLhEgSzPyna"
			}
		],
		"obrigacoes": "Devotos que preservam sua humanidade (sem crimes ou profanações) pagam um preço: no início de qualquer cena de ação, role 1d6; com resultado ímpar, fica fascinado na primeira rodada (mesmo que imune a esta condição).",
		"devotosDdA": {
			"racas": "todas",
			"classes": "todas",
			"fonte": "DdA p. 34-35"
		}
	},
	"allihanna": {
		"nome": "Allihanna",
		"titulo": "Deusa da Natureza",
		"fonte": "JdA p. 97",
		"energia": "positiva",
		"armaPreferida": "Bordão",
		"simbolo": "O animal do culto (bárbaros e adoradores de animais); para outros, uma pequena árvore",
		"devotos": "Dahllan, elfos, sílfides, bárbaros, caçadores, druidas.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"elfos",
				"sílfides"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida"
			]
		},
		"poderes": [
			{
				"nome": "Compreender os Ermos",
				"fonte": "JdA p. 97",
				"uuid": "Compendium.tormenta20.poderes.Item.wRvYCrpwaWALmLPg"
			},
			{
				"nome": "Dedo Verde",
				"fonte": "JdA p. 97",
				"uuid": "Compendium.tormenta20.poderes.Item.u6EhXGRfH5zuRgtR"
			},
			{
				"nome": "Descanso Natural",
				"fonte": "JdA p. 97",
				"uuid": "Compendium.tormenta20.poderes.Item.V4smKsew63Rwl2TD"
			},
			{
				"nome": "Voz da Natureza",
				"fonte": "JdA p. 97",
				"uuid": "Compendium.tormenta20.poderes.Item.Y9MfowI3KydAdgND"
			},
			{
				"nome": "Companheiro Silvestre",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.uN1otpUO0fRLOe1Z"
			},
			{
				"nome": "Espírito Animal",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.TBNP8w61zBNETp8M"
			},
			{
				"nome": "Estouro da Trobada",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.wIXTB9mhTxzgwNIE"
			},
			{
				"nome": "O Sol que nos Aquece",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.I5ZyNh53eg4u1Cnt"
			},
			{
				"nome": "Trilha Desimpedida",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.githtb1TRcdo3p7o"
			}
		],
		"obrigacoes": "Não pode usar armaduras e escudos de metal (só armadura acolchoada, de couro, gibão de peles e escudo leve, ou itens de materiais especiais não metálicos). Não pode descansar em comunidade maior que uma aldeia (não perde poderes, mas não recupera PV nem PM).",
		"devotosDdA": {
			"racas": [
				"centauro",
				"ceratops",
				"dahllan",
				"duende",
				"eiradaan",
				"elfo",
				"elfo-do-mar",
				"galokk",
				"gnoll",
				"nagah",
				"ogro",
				"orc",
				"pteros",
				"sátiro",
				"sílfide",
				"tabrachi",
				"velocis",
				"voracis"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"treinador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"arsenal": {
		"nome": "Arsenal",
		"titulo": "Deus da Guerra",
		"fonte": "JdA p. 98",
		"energia": "qualquer",
		"armaPreferida": "Martelo de guerra",
		"simbolo": "Um martelo de guerra e uma espada longa cruzados sobre um escudo",
		"devotos": "Anões, minotauros, bárbaros, cavaleiros, guerreiros, lutadores.",
		"devotosLista": {
			"racas": [
				"anões",
				"minotauros"
			],
			"classes": [
				"barbaro",
				"cavaleiro",
				"guerreiro",
				"lutador"
			]
		},
		"poderes": [
			{
				"nome": "Conjurar Arma",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.Dwbr8XnZGv9XlIYX"
			},
			{
				"nome": "Coragem Total",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.Y5wVBhEisEUVjIBz"
			},
			{
				"nome": "Fé Guerreira",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.kyPHPi4M03FnThps"
			},
			{
				"nome": "Sangue de Ferro",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.HUdNN0VdkkDWVpmQ"
			},
			{
				"nome": "Armas da Destruição",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.f2qbb9Ml5Ne4S6Wo"
			},
			{
				"nome": "Expurgar a Derrota",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.YOyvkhGSLPalFbVW"
			},
			{
				"nome": "Ferramentas da Guerra",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.MBcxw4gUHuO33no1"
			},
			{
				"nome": "Vitória a Qualquer Custo",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.bQH1uEWDvRryzpIX"
			}
		],
		"obrigacoes": "Proibido de ser derrotado em qualquer tipo de combate ou disputa (como um teste oposto para ver quem é mais forte). Se seu grupo for derrotado, isso também viola as obrigações.",
		"devotosDdA": {
			"racas": [
				"anão",
				"bugbear",
				"ceratops",
				"elfo-do-mar",
				"galokk",
				"hobgoblin",
				"kallyanach",
				"kaijin",
				"minotauro",
				"nezumi",
				"ogro",
				"orc",
				"tengu",
				"voracis",
				"yidishan"
			],
			"classes": [
				"barbaro",
				"cavaleiro",
				"guerreiro",
				"lutador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"azgher": {
		"nome": "Azgher",
		"titulo": "Deus-Sol",
		"fonte": "JdA p. 98",
		"energia": "positiva",
		"armaPreferida": "Cimitarra",
		"simbolo": "Um sol dourado",
		"devotos": "Aggelus, qareen, arcanistas, bárbaros, caçadores, cavaleiros, guerreiros, nobres, paladinos.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"qareen"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Espada Solar",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.seHht1EYivTWatKh"
			},
			{
				"nome": "Fulgor Solar",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.m6zYuRBPDXvCFDOK"
			},
			{
				"nome": "Habitante do Deserto",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.AVx9eTYu8gnVuHwy"
			},
			{
				"nome": "Inimigo de Tenebra",
				"fonte": "JdA p. 98",
				"nota": "No compêndio: 'Inimigo das Trevas'.",
				"uuid": "Compendium.tormenta20.poderes.Item.q2bsVtoBG4izYF2l"
			},
			{
				"nome": "Imolação Sagrada",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.T9ThJDSuy9dxNrhq"
			},
			{
				"nome": "O Sol que nos Aquece",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.FokqB2i9kHGRDqc6"
			},
			{
				"nome": "Proeminência Solar",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.s0PHVCAgibfqGVOP"
			},
			{
				"nome": "Resplendor Divino",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.hpLK9haWlNbXKNsW"
			}
		],
		"obrigacoes": "Deve manter o rosto sempre coberto (máscara, capuz ou trapos); a face só pode ser revelada ao sumo-sacerdote ou em seu funeral. Deve doar à igreja de Azgher 20% de qualquer tesouro obtido, em ouro (moedas ou itens).",
		"devotosDdA": {
			"racas": [
				"aggelus",
				"ceratops",
				"qareen"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"hyninn": {
		"nome": "Hyninn",
		"titulo": "Deus da Trapaça",
		"fonte": "JdA p. 98",
		"energia": "qualquer",
		"armaPreferida": "Adaga",
		"simbolo": "Uma adaga atravessando uma máscara, ou uma raposa",
		"devotos": "Hynne, goblins, sílfides, bardos, bucaneiros, ladinos, inventores, nobres.",
		"devotosLista": {
			"racas": [
				"hynne",
				"goblins",
				"sílfides"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"ladino",
				"inventor",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Apostar com o Trapaceiro",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.zeEpAhQcqAHA0qsn"
			},
			{
				"nome": "Farsa do Fingidor",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.6HsKF5U5mfbWZlwV"
			},
			{
				"nome": "Forma de Macaco",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.x5UBiKNadzbvh5Df"
			},
			{
				"nome": "Golpista Divino",
				"fonte": "JdA p. 98",
				"uuid": "Compendium.tormenta20.poderes.Item.qrtL3ZLIlK4r1jz4"
			},
			{
				"nome": "A Ferramenta Certa",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.sF0OSGAhziYchWEr"
			},
			{
				"nome": "Armadilha Divina",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.CNH2TCt9O0nmGjj6"
			},
			{
				"nome": "Dom da Furtividade",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.xrAiFBACgnCwnPGg"
			},
			{
				"nome": "O Dobro ou Nada",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.sCOh5XYDX3R5klsi"
			}
		],
		"obrigacoes": "Não recusa participação em golpe, trapaça ou artimanha, exceto quando prejudica seus aliados. Deve fazer um ato furtivo, ousado ou proibido por dia (ou por sessão, o que demorar mais) como oferenda: uma ação exigindo teste de Enganação ou Ladinagem com CD mínima 15 + metade do nível. (p. 99)",
		"devotosDdA": {
			"racas": [
				"duende",
				"elfo-do-mar",
				"gnoll",
				"goblin",
				"harpia",
				"hynne",
				"kappa",
				"nagah",
				"naidora",
				"sátiro",
				"sílfide"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"ladino",
				"inventor",
				"nobre"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"kallyadranoch": {
		"nome": "Kallyadranoch",
		"titulo": "Deus dos Dragões",
		"fonte": "JdA p. 99",
		"energia": "negativa",
		"armaPreferida": "Lança",
		"simbolo": "Escamas de cinco cores diferentes",
		"devotos": "Elfos, medusas, sulfure, arcanistas, cavaleiros, guerreiros, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"elfos",
				"medusas",
				"sulfure"
			],
			"classes": [
				"arcanista",
				"cavaleiro",
				"guerreiro",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Aura de Medo",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.KCaPgkZ86O1Jp2GH"
			},
			{
				"nome": "Escamas Dracônicas",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.r0a9VM16j4AsNZbk"
			},
			{
				"nome": "Presas Primordiais",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.f3a4wgr41V6oIqRD"
			},
			{
				"nome": "Servos do Dragão",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.06DG5FvoJF2vIKsW"
			},
			{
				"nome": "Alimentar-se do Pavor",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.UjckMbs3nT4IOHzm"
			},
			{
				"nome": "Baforada Dracônica",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.1vay843eZkJ9fXK2"
			},
			{
				"nome": "Poder sem Limites",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.DElOJ5AgcObwCawG"
			},
			{
				"nome": "Temor Arcano",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.r4ZebxHkPSDxuN7s"
			},
			{
				"nome": "Terror Profundo",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.UcX5FnjtvAcEdllq"
			}
		],
		"obrigacoes": "Para subir de nível, além do XP, deve fazer uma oferenda em tesouro igual a 20% da diferença do dinheiro inicial do nível que vai alcançar para o nível atual (ex.: T$ 80 para subir para o 4º nível).",
		"devotosDdA": {
			"racas": [
				"elfo",
				"finntroll",
				"kallyanach",
				"kobolds",
				"medusa",
				"nagah",
				"naidora",
				"sulfure"
			],
			"classes": [
				"arcanista",
				"cavaleiro",
				"guerreiro",
				"lutador",
				"nobre"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"khalmyr": {
		"nome": "Khalmyr",
		"titulo": "Deus da Justiça",
		"fonte": "JdA p. 99",
		"energia": "positiva",
		"armaPreferida": "Espada longa",
		"simbolo": "Espada sobreposta a uma balança",
		"devotos": "Aggelus, anões, cavaleiros, guerreiros, nobres, paladinos.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"anões"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Coragem Total",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.Y5wVBhEisEUVjIBz"
			},
			{
				"nome": "Dom da Verdade",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.NUxqUQUhiByDPK6Z"
			},
			{
				"nome": "Espada Justiceira",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.EJChqrSZJIXgcuxD"
			},
			{
				"nome": "Reparar Injustiça",
				"fonte": "JdA p. 99",
				"uuid": "Compendium.tormenta20.poderes.Item.enc2pWpBKqJcbjre"
			},
			{
				"nome": "Dom da Vontade",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.w0HX01lwiKTTAEgv"
			},
			{
				"nome": "Jurista Divino",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.rYcLyeAJoXy7uyqM"
			},
			{
				"nome": "Pilar de Heredrimm",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.egETMYpHwKpfq9dv"
			},
			{
				"nome": "Quebrar Encanto",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.e6VpztwiEhr5XUb4"
			}
		],
		"obrigacoes": "Não pode recusar pedidos de ajuda de pessoas inocentes. Deve cumprir as ordens de superiores na hierarquia da igreja (devotos de Khalmyr de nível maior) e só pode usar itens mágicos permanentes criados por devotos do mesmo deus.",
		"devotosDdA": {
			"racas": [
				"aggelus",
				"anão",
				"kobolds",
				"tengu"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"lena": {
		"nome": "Lena",
		"titulo": "Deusa da Vida",
		"fonte": "JdA p. 99",
		"energia": "positiva",
		"armaPreferida": "Não há (servos de Lena não podem lançar Arma Espiritual e similares)",
		"simbolo": "Lua crescente prateada",
		"devotos": "Dahllan, qareen, nobres, paladinos.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"qareen"
			],
			"classes": [
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Ataque Piedoso",
				"fonte": "JdA p. 100",
				"uuid": "Compendium.tormenta20.poderes.Item.whJFemzRCrz6gvtp"
			},
			{
				"nome": "Aura Restauradora",
				"fonte": "JdA p. 100",
				"uuid": "Compendium.tormenta20.poderes.Item.J3wBeeUlf8m2WjSk"
			},
			{
				"nome": "Cura Gentil",
				"fonte": "JdA p. 100",
				"uuid": "Compendium.tormenta20.poderes.Item.3Hr5IHsISX8a4cRS"
			},
			{
				"nome": "Curandeira Perfeita",
				"fonte": "JdA p. 100",
				"uuid": "Compendium.tormenta20.poderes.Item.Ecesw31b7jMDRBbt"
			},
			{
				"nome": "Companheiro Celeste",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.oLfKlBVRufuJm7ff"
			},
			{
				"nome": "Curar o Espírito",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.wp24orRGiO0W8ioG"
			},
			{
				"nome": "Magia Piedosa",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.LOraWv5NlP18o5Vo"
			},
			{
				"nome": "Transbordar Cura",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.UvT3FhSvHL3nUPlm"
			}
		],
		"obrigacoes": "Não pode causar dano letal ou perda de PV a criaturas vivas (fornecer bônus em dano letal também é proibido); dano não letal e condições são permitidos. Apenas mulheres podem ser devotas; uma clériga precisa dar à luz pelo menos uma vez antes de receber seus poderes. Paladinos de Lena podem ser homens (os únicos devotos masculinos permitidos) ou mulheres. (p. 100)",
		"nota": "Restrição de devoção: só mulheres, exceto paladinos.",
		"devotosDdA": {
			"racas": [
				"ceratops",
				"dahllan",
				"eiradaan",
				"qareen",
				"kappa",
				"kobolds",
				"pteros",
				"velocis"
			],
			"classes": [
				"nobre",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"linwu": {
		"nome": "Lin-Wu",
		"titulo": "Deus Samurai",
		"fonte": "JdA p. 100",
		"energia": "qualquer",
		"armaPreferida": "Katana",
		"simbolo": "Placa de metal com a silhueta de um dragão-serpente celestial",
		"devotos": "Anões, cavaleiros, guerreiros, nobres, paladinos.",
		"devotosLista": {
			"racas": [
				"anões"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Coragem Total",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.Y5wVBhEisEUVjIBz"
			},
			{
				"nome": "Kiai Divino",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.3f0ZGFYYeDHh0hjQ"
			},
			{
				"nome": "Mente Vazia",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.UOzqz9v3jx4Hc7Mb"
			},
			{
				"nome": "Tradição de Lin-Wu",
				"fonte": "JdA p. 101",
				"nota": "No compêndio: 'Tradição de Samurai'.",
				"uuid": "Compendium.tormenta20.poderes.Item.MQVfA5kgyBGEqz3D"
			},
			{
				"nome": "Cerimonialista Divino",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.jsgWHr0JAGBrfeKR"
			},
			{
				"nome": "Exaltar Honra",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.RRnilM5qOfqqERXZ"
			},
			{
				"nome": "Jurista Divino",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.ClkQDYL0Ld6eY3He"
			},
			{
				"nome": "Mestre de Si",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.5QpBxafEyeReg4Ci"
			},
			{
				"nome": "Saque Celestial",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.BSJJfto3GA9cRAJo"
			}
		],
		"obrigacoes": "Comportamento honrado, sem mentiras ou subterfúgios: proibido tentar qualquer ação que exija teste de Enganação, Furtividade ou Ladinagem. (p. 101)",
		"devotosDdA": {
			"racas": [
				"anão",
				"kaijin",
				"kappa",
				"mashin",
				"tengu"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"marah": {
		"nome": "Marah",
		"titulo": "Deusa da Paz",
		"fonte": "JdA p. 101",
		"energia": "positiva",
		"armaPreferida": "Não há (devotos não podem lançar Arma Espiritual e similares)",
		"simbolo": "Um coração vermelho",
		"devotos": "Aggelus, elfos, hynne, qareen, bardos, nobres, paladinos.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"elfos",
				"hynne",
				"qareen"
			],
			"classes": [
				"bardo",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Aura de Paz",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.2Ez0hINMBDSMC3YW"
			},
			{
				"nome": "Dom da Esperança",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.bTocosYd9lw0Vil8"
			},
			{
				"nome": "Palavras de Bondade",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.KZBYNBs2jj4D0jfn"
			},
			{
				"nome": "Talento Artístico",
				"fonte": "JdA p. 101",
				"uuid": "Compendium.tormenta20.poderes.Item.uWXyA5uVOcqIYbRi"
			},
			{
				"nome": "Cancioneiro da Esperança",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gOgaw3utd3YXS34e"
			},
			{
				"nome": "Companheiro Celeste",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.Zf8wXXCBpJ7GScv2"
			},
			{
				"nome": "Discurso Conciliador",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.m8BVNgOu4nGH0rcF"
			},
			{
				"nome": "Remorso do Belicista",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.m612GDL8Jj513MUR"
			}
		],
		"obrigacoes": "Não pode causar dano, perda de PV ou condições a criaturas, exceto enfeitiçado, fascinado e pasmo (fornecer bônus em dano também é proibido). Em combate, só pode proteger ou curar, fugir, render-se ou aceitar a morte.",
		"devotosDdA": {
			"racas": [
				"aggelus",
				"elfo",
				"gnoll",
				"hynne",
				"qareen",
				"pteros",
				"sátiro",
				"velocis"
			],
			"classes": [
				"bardo",
				"nobre",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"megalokk": {
		"nome": "Megalokk",
		"titulo": "Deus dos Monstros",
		"fonte": "JdA p. 101",
		"energia": "negativa",
		"armaPreferida": "Maça",
		"simbolo": "A garra de um monstro",
		"devotos": "Goblins, medusas, minotauros, sulfure, trogs, bárbaros, caçadores, druidas, lutadores.",
		"devotosLista": {
			"racas": [
				"goblins",
				"medusas",
				"minotauros",
				"sulfure",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"lutador"
			]
		},
		"poderes": [
			{
				"nome": "Olhar Amedrontador",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.PihxJtRqlqDzFaVk"
			},
			{
				"nome": "Presas Primordiais",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.f3a4wgr41V6oIqRD"
			},
			{
				"nome": "Urro Divino",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.bGVNLGaJ5FQzVgUG"
			},
			{
				"nome": "Voz dos Monstros",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.YTvSa0Ts5LHe6212"
			},
			{
				"nome": "Alimentar-se do Pavor",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.4BKhp314CKentosa"
			},
			{
				"nome": "Armas da Selvageria",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.6vVApd5yRvfSiQLw"
			},
			{
				"nome": "Chamado Monstruoso",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.idq2uTCJgMMwDfuh"
			},
			{
				"nome": "Terror Profundo",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.QHYHQPSxBj12JXzx"
			}
		],
		"obrigacoes": "Proibido usar perícias baseadas em Inteligência ou Carisma (exceto Adestramento e Intimidação); não pode preparar uma ação, escolher 10 ou 20 em testes nem lançar magias sustentadas. (p. 102)",
		"devotosDdA": {
			"racas": [
				"bugbear",
				"centauro",
				"ceratops",
				"elfo-do-mar",
				"finntroll",
				"galokk",
				"gnoll",
				"goblin",
				"harpia",
				"hobgoblin",
				"kallyanach",
				"kobolds",
				"medusa",
				"minotauro",
				"nagah",
				"nezumi",
				"ogro",
				"orc",
				"sulfure",
				"tabrachi",
				"trog",
				"voracis",
				"yidishan"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"lutador",
				"treinador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"nimb": {
		"nome": "Nimb",
		"titulo": "Deus do Caos",
		"fonte": "JdA p. 102",
		"energia": "qualquer",
		"armaPreferida": "Nenhuma e todas (ao usar efeito que dependa de arma preferida, qualquer arma ou objeto pode aparecer, a critério do mestre)",
		"simbolo": "Um dado de seis faces",
		"devotos": "Goblins, qareen, sílfides, arcanistas, bárbaros, bardos, bucaneiros, inventores, ladinos.",
		"devotosLista": {
			"racas": [
				"goblins",
				"qareen",
				"sílfides"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Êxtase da Loucura",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.omKfBFC5vH1zujMJ"
			},
			{
				"nome": "Poder Oculto",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.CaydxkHRMO6NuZyj"
			},
			{
				"nome": "Sorte dos Loucos",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.bNv2Rufni0aDDnbI"
			},
			{
				"nome": "Transmissão da Loucura",
				"fonte": "JdA p. 102",
				"uuid": "Compendium.tormenta20.poderes.Item.EwDapR826hz2edl3"
			},
			{
				"nome": "Magia Caótica",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.suceqnQx2P9FoYsv"
			},
			{
				"nome": "Nimb",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.OGKdfLKKWmONk4BE"
			},
			{
				"nome": "O Dobro ou Nada",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.CsB04XRC35ab8qr4"
			},
			{
				"nome": "Só os Loucos Sabem",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.UP4LRZgmMJSH65mD"
			}
		],
		"obrigacoes": "Sem obrigações verdadeiras (nunca perde PM por descumprir O&R), mas sofre restrições: –5 em testes de perícias baseadas em Carisma; no início de cada cena de ação, role 1d6 — com 1, fica confuso (mesmo que imune a esta condição).",
		"nota": "Devotos de Nimb nunca perdem PM por violar Obrigações & Restrições.",
		"devotosDdA": {
			"racas": [
				"duende",
				"gnoll",
				"goblin",
				"naidora",
				"orc",
				"qareen",
				"sátiro",
				"sílfide",
				"tabrachi",
				"yidishan"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino",
				"treinador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"oceano": {
		"nome": "Oceano",
		"titulo": "Deus dos Mares",
		"fonte": "JdA p. 102",
		"energia": "qualquer",
		"armaPreferida": "Tridente",
		"simbolo": "Uma concha",
		"devotos": "Dahllan, hynne, minotauros, sereias/tritões, bárbaros, bucaneiros, caçadores, druidas.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"hynne",
				"minotauros",
				"sereias/tritões"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"druida"
			]
		},
		"poderes": [
			{
				"nome": "Anfíbio",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.FQwvH2mRTntQKq2h"
			},
			{
				"nome": "Arsenal das Profundezas",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.7tTutIetS7XoKEXp"
			},
			{
				"nome": "Mestre dos Mares",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.mekjIF9AY4N966pb"
			},
			{
				"nome": "Sopro do Mar",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.5bEzzIEEFqOgc10k"
			},
			{
				"nome": "Barreira de Coral",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.A6oLIPlmW7Z2Edcx"
			},
			{
				"nome": "Égide dos Mares",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.xGdPUKQlL94FAtLP"
			},
			{
				"nome": "Golpe Tempestuoso",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.uF4i0h5ylETbTkMV"
			},
			{
				"nome": "Mar Revolto",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.DpghztvyYGXKaevx"
			},
			{
				"nome": "Navegador Sagrado",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.8H5WQgGnlkhwvuSs"
			}
		],
		"obrigacoes": "As únicas armas permitidas são azagaia, lança, tridente e rede; só pode usar armaduras leves; não pode se manter afastado do oceano por mais de um mês. (p. 103)",
		"devotosDdA": {
			"racas": [
				"dahllan",
				"elfo-do-mar",
				"hynne",
				"kappa",
				"minotauro",
				"sereia/tritão"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"druida",
				"treinador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"sszzaas": {
		"nome": "Sszzaas",
		"titulo": "Deus da Traição",
		"fonte": "JdA p. 103",
		"energia": "negativa",
		"armaPreferida": "Adaga",
		"simbolo": "Uma naja vertendo veneno pelas presas",
		"devotos": "Medusas, arcanistas, bardos, bucaneiros, inventores, ladinos, nobres.",
		"devotosLista": {
			"racas": [
				"medusas"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Astúcia da Serpente",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.RDZ4Iieg7ffqmjLE"
			},
			{
				"nome": "Familiar Ofídico",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.ZlgkzfCdGZKlhFsJ"
			},
			{
				"nome": "Presas Venenosas",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.59z8asrLz1R0a6RL"
			},
			{
				"nome": "Sangue Ofídico",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.tkixzUzqKytmZJW0"
			},
			{
				"nome": "Dom dos Segredos",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.PXTcKw87d0RpeJil"
			},
			{
				"nome": "Magia Venenosa",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.r1es93YwFeJ51HxJ"
			},
			{
				"nome": "Manto Ardiloso",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.DFL1mziAOzBRYbi6"
			},
			{
				"nome": "Mordida de Víbora",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.tU4IkTTPOOEWl6VX"
			}
		],
		"obrigacoes": "Deve fazer um ato de traição, intriga ou corrupção por dia (ou por sessão, o que demorar mais) como oferenda, contra aliado ou inimigo: uma ação exigindo teste de Enganação com CD mínima 15 + metade do nível.",
		"devotosDdA": {
			"racas": [
				"finntroll",
				"medusa",
				"nagah",
				"tabrachi"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino",
				"nobre"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"tannatoh": {
		"nome": "Tanna-Toh",
		"titulo": "Deusa do Conhecimento",
		"fonte": "JdA p. 103",
		"energia": "qualquer",
		"armaPreferida": "Bordão",
		"simbolo": "Pergaminho e pena",
		"devotos": "Golens, kliren, arcanistas, bardos, inventores, nobres, paladinos.",
		"devotosLista": {
			"racas": [
				"golens",
				"kliren"
			],
			"classes": [
				"arcanista",
				"bardo",
				"inventor",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Conhecimento Enciclopédico",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.jjQgutXSxMtBrMWA"
			},
			{
				"nome": "Mente Analítica",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.Mqyj3NlGuv9rhQpH"
			},
			{
				"nome": "Pesquisa Abençoada",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.5528bIwydLqg1PhQ"
			},
			{
				"nome": "Voz da Civilização",
				"fonte": "JdA p. 103",
				"uuid": "Compendium.tormenta20.poderes.Item.snaGhwLNB4h2Y9rJ"
			},
			{
				"nome": "Biblioteca Divina",
				"fonte": "DdA p. 43",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.4iR9KvtG46zfKdgp"
			},
			{
				"nome": "Espírito do Conhecimento",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.7rgNIp7tIsQKHaiQ"
			},
			{
				"nome": "Golpe Semântico",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.R1r0AvDIEBYR3TmI"
			},
			{
				"nome": "Palavra de Poder",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.AqA9Ft0Mb7nzmxi2"
			},
			{
				"nome": "Perceber Farsas",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.h1pSw4g9rXJ8lLwa"
			}
		],
		"obrigacoes": "Jamais pode recusar uma missão que envolva a busca por um novo conhecimento ou informação. Sempre deve dizer a verdade e nunca pode se recusar a responder uma pergunta direta; é proibido esconder qualquer conhecimento.",
		"devotosDdA": {
			"racas": [
				"golem",
				"kliren",
				"mashin",
				"tengu"
			],
			"classes": [
				"arcanista",
				"bardo",
				"inventor",
				"nobre",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"tenebra": {
		"nome": "Tenebra",
		"titulo": "Deusa das Trevas",
		"fonte": "JdA p. 104",
		"energia": "negativa",
		"armaPreferida": "Adaga",
		"simbolo": "Estrela negra de cinco pontas",
		"devotos": "Anões, medusas, qareen, osteon, sulfure, trogs, arcanistas, bardos, ladinos.",
		"devotosLista": {
			"racas": [
				"anões",
				"medusas",
				"qareen",
				"osteon",
				"sulfure",
				"trogs"
			],
			"classes": [
				"arcanista",
				"bardo",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Carícia Sombria",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.OfBZl1NhiMQ4oYN3"
			},
			{
				"nome": "Manto da Penumbra",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.H44C0wAQby5qnVrx"
			},
			{
				"nome": "Visão nas Trevas",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.YNcTUUQeH2S5d0LA"
			},
			{
				"nome": "Zumbificar",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.pT9MEJaQAKcNRfFF"
			},
			{
				"nome": "Adaga Noturna",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.0HDqi1D65wgGb9Rw"
			},
			{
				"nome": "Armadura de Ossos",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.xXcycxLgfufwgaM8"
			},
			{
				"nome": "Passo Sombrio",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.zILXMnSspyQrSgro"
			},
			{
				"nome": "Toque de Não Vida",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.codr7k6NQp92aikv"
			}
		],
		"obrigacoes": "Proibido ser tocado por Azgher: deve se cobrir inteiramente durante o dia, sem expor ao sol nenhum pedaço de pele.",
		"devotosDdA": {
			"racas": [
				"anão",
				"bugbear",
				"finntroll",
				"gnoll",
				"harpia",
				"hobgoblin",
				"kobolds",
				"medusa",
				"nagah",
				"nezumi",
				"qareen",
				"ogro",
				"orc",
				"osteon",
				"sulfure",
				"tabrachi",
				"trog"
			],
			"classes": [
				"arcanista",
				"bardo",
				"druida",
				"ladino",
				"treinador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"thwor": {
		"nome": "Thwor",
		"titulo": "Deus dos Goblinoides",
		"fonte": "JdA p. 104",
		"energia": "qualquer",
		"armaPreferida": "Machado de guerra",
		"simbolo": "Um grande punho fechado",
		"devotos": "Qualquer duyshidakk (veja Obrigações & Restrições).",
		"devotosLista": {
			"racas": "todas",
			"classes": "todas",
			"condicao": "ser duyshidakk (aceito como membro do povo goblinoide)"
		},
		"poderes": [
			{
				"nome": "Almejar o Impossível",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.07Lj0txt3V5tfos6"
			},
			{
				"nome": "Fúria Divina",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.cfHF0uul45eLC3KX"
			},
			{
				"nome": "Olhar Amedrontador",
				"fonte": "JdA p. 104",
				"uuid": "Compendium.tormenta20.poderes.Item.PihxJtRqlqDzFaVk"
			},
			{
				"nome": "Tropas Duyshidakk",
				"fonte": "JdA p. 104",
				"nota": "No compêndio: 'Tropas Goblinóides'.",
				"uuid": "Compendium.tormenta20.poderes.Item.fjNvBQ33DmjPwGyV"
			},
			{
				"nome": "Alma de Mudança",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.gNqXtZJOwru3kjMl"
			},
			{
				"nome": "O Futuro que Vier Disso",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.8FHLeDIpWEhFs7Yu"
			},
			{
				"nome": "Terror Profundo",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.4RaeBoPdHMaJbBSM"
			},
			{
				"nome": "Ushultt",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.kqpseZ9lKZRrjbFB"
			}
		],
		"obrigacoes": "Independentemente da raça, deve ser duyshidakk (aceito como membro do povo goblinoide). Deve se esforçar para que o 'Mundo Como Deve Ser' tome o continente (p. 386), sempre procurar alianças com goblinoides e só lutar contra eles em último caso.",
		"devotosDdA": {
			"racas": "todas",
			"classes": "todas",
			"condicao": "duyshidakk, exceto raças/classes com devoção específica que não inclui Thwor",
			"fonte": "DdA p. 34-35"
		}
	},
	"thyatis": {
		"nome": "Thyatis",
		"titulo": "Deus da Ressurreição e da Profecia",
		"fonte": "JdA p. 104",
		"energia": "positiva",
		"armaPreferida": "Espada longa",
		"simbolo": "Uma ave fênix",
		"devotos": "Aggelus, cavaleiros, guerreiros, inventores, lutadores, paladinos.",
		"devotosLista": {
			"racas": [
				"aggelus"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"inventor",
				"lutador",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Ataque Piedoso",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.whJFemzRCrz6gvtp"
			},
			{
				"nome": "Dom da Imortalidade",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.pTCZidM8hUslgx4u"
			},
			{
				"nome": "Dom da Profecia",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.ER3qYUu8vpKPM1zU"
			},
			{
				"nome": "Dom da Ressurreição",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.f1wsMyoaUc84zuqx"
			},
			{
				"nome": "Abraço da Fênix",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.y4m781OCWJt0Pe5O"
			},
			{
				"nome": "Imolação Sagrada",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.ZyQSYgvjhBsdFgX6"
			},
			{
				"nome": "Magia Piedosa",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.B1Ry9BFdzTZNxPMw"
			},
			{
				"nome": "Redirecionar Destino",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.9dYWodxs5XHtuAkw"
			}
		],
		"obrigacoes": "Proibido matar criaturas inteligentes (Int –3 ou maior); pode atacar e causar dano, mas jamais levar à morte. (p. 105)",
		"devotosDdA": {
			"racas": [
				"aggelus",
				"eiradaan"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"inventor",
				"lutador",
				"paladino"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"valkaria": {
		"nome": "Valkaria",
		"titulo": "Deusa da Ambição",
		"fonte": "JdA p. 105",
		"energia": "positiva",
		"armaPreferida": "Mangual",
		"simbolo": "A Estátua de Valkaria ou seis faixas entrelaçadas",
		"devotos": "Aventureiros; membros de todas as classes podem ser devotos de Valkaria.",
		"devotosLista": {
			"racas": [],
			"classes": "todas"
		},
		"poderes": [
			{
				"nome": "Almejar o Impossível",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.07Lj0txt3V5tfos6"
			},
			{
				"nome": "Armas da Ambição",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.xuUwDxxO97yE2Ekz"
			},
			{
				"nome": "Coragem Total",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.Y5wVBhEisEUVjIBz"
			},
			{
				"nome": "Liberdade Divina",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.mFp7Seto2Uo8YxD1"
			},
			{
				"nome": "Alma de Mudança",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.VERB2qiutG1zERs2"
			},
			{
				"nome": "Andarilho Carregado",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.rw2M27L5vTWpFq0p"
			},
			{
				"nome": "Aventureiro Inquieto",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.2L0JWqMWLbP7Jbiv"
			},
			{
				"nome": "Convicção Ambiciosa",
				"fonte": "DdA p. 44",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.YPsrVripghfsiLk2"
			}
		],
		"obrigacoes": "Proibido fixar moradia: não pode permanecer mais de 2d10+10 dias na mesma cidade (ou vila, aldeia, povoado...) nem 1d4+2 meses no mesmo reino. Proibido se casar ou formar qualquer união estável.",
		"devotosDdA": {
			"racas": "todas",
			"classes": "todas",
			"condicao": "exceto classes com devoção específica que não inclui Valkaria (como druida)",
			"fonte": "DdA p. 34-35"
		}
	},
	"wynna": {
		"nome": "Wynna",
		"titulo": "Deusa da Magia",
		"fonte": "JdA p. 105",
		"energia": "qualquer",
		"armaPreferida": "Adaga",
		"simbolo": "Um anel metálico",
		"devotos": "Elfos, golens, qareen, sílfides, arcanistas, bardos.",
		"devotosLista": {
			"racas": [
				"elfos",
				"golens",
				"qareen",
				"sílfides"
			],
			"classes": [
				"arcanista",
				"bardo"
			]
		},
		"poderes": [
			{
				"nome": "Bênção do Mana",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.mIJosF8T9x1eKyV8"
			},
			{
				"nome": "Centelha Mágica",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.RVcn4COzkbMzDcTp"
			},
			{
				"nome": "Escudo Mágico",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.On6DFwWTValJhmHm"
			},
			{
				"nome": "Teurgista Místico",
				"fonte": "JdA p. 105",
				"uuid": "Compendium.tormenta20.poderes.Item.Esp2Su5Fyg0g52TM"
			},
			{
				"nome": "Belo Presente",
				"fonte": "DdA p. 42",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.QMZYOmRICYU9w05p"
			},
			{
				"nome": "Familiar Elemental",
				"fonte": "DdA p. 45",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.Xp5wPQu8VRNF2EK2"
			},
			{
				"nome": "Poder do Vínculo",
				"fonte": "DdA p. 46",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.1Y2EkY8cVtxTDOZk"
			},
			{
				"nome": "Sorvo de Mana",
				"fonte": "DdA p. 47",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.uHA1u1rIoSxAYpLQ"
			}
		],
		"obrigacoes": "Deve praticar a bondade e a generosidade, jamais recusando um pedido de ajuda de alguém inocente. Proibido matar seres mágicos (elfos, qareen, sílfides e outros a critério do mestre) e conjuradores arcanos.",
		"devotosDdA": {
			"racas": [
				"duende",
				"elfo",
				"eiradaan",
				"golem",
				"kallyanach",
				"mashin",
				"nagah",
				"pteros",
				"qareen",
				"sátiro",
				"sílfide",
				"tengu"
			],
			"classes": [
				"arcanista",
				"bardo",
				"treinador"
			],
			"fonte": "DdA p. 34-35"
		}
	},
	"gwendolynn": {
		"nome": "Gwendolynn",
		"titulo": "Deusa da Liberdade",
		"fonte": "DdA p. 231",
		"energia": "positiva",
		"natureza": "Mortal ascendida",
		"status": 3,
		"armaPreferida": "Cajado de batalha (Guia de NPCs, p. 17)",
		"simbolo": "Um elo de corrente partido ao meio",
		"devotos": "Dahllan, duendes, elfos, elfos-do-mar, eiradaan, galokk, goblins, lefou, minotauros, qareen, kliren, sátiros, sílfides, velocis, bardos, bucaneiros, inventores, ladinos, paladino (único).",
		"devotosLista": {
			"racas": [
				"dahllan",
				"duendes",
				"elfos",
				"elfos-do-mar",
				"eiradaan",
				"galokk",
				"goblins",
				"lefou",
				"minotauros",
				"qareen",
				"kliren",
				"sátiros",
				"sílfides",
				"velocis"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Liberdade Irrestrita",
				"fonte": "DdA p. 231",
				"nota": "No compêndio do sistema (subtipo 'Libertadora').",
				"uuid": "Compendium.tormenta20.poderes.Item.PUiaAuvbt0NDLBR0"
			}
		],
		"obrigacoes": "Jamais pode recusar uma missão que envolva a libertação de escravos, exceto quando isso significa a morte ou a ruína de seus próprios aliados.",
		"menor": true,
		"paladinoUnico": true
	},
	"mauziell": {
		"nome": "Mauziell",
		"titulo": "Deusa das Avós",
		"fonte": "DdA p. 231",
		"energia": "positiva",
		"natureza": "Entidade primordial",
		"status": 4,
		"armaPreferida": "Bengala (conta como uma clava)",
		"simbolo": "Uma cesta de piquenique",
		"devotos": "Anões, centauros, duendes, elfos, gnolls, lefou, qareen, hynne, sátiros, tengu, arcanistas, bardos, caçadores, cavaleiros, guerreiros, nobres, paladino (único).",
		"devotosLista": {
			"racas": [
				"anões",
				"centauros",
				"duendes",
				"elfos",
				"gnolls",
				"lefou",
				"qareen",
				"hynne",
				"sátiros",
				"tengu"
			],
			"classes": [
				"arcanista",
				"bardo",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Guardei para Você",
				"fonte": "DdA p. 233",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.Wa3FuReDwKmIUtkW"
			}
		],
		"obrigacoes": "O devoto é, para todos os efeitos, uma avó: deve pedir a ajuda de uma criatura para realizar alguma tarefa pelo menos uma vez por dia (ou por sessão, o que demorar mais); a criatura deve passar em um teste de perícia aplicável com CD mínima 15 + metade do seu nível.",
		"menor": true,
		"paladinoUnico": true
	},
	"tibar": {
		"nome": "Tibar",
		"titulo": "Deus do Comércio",
		"fonte": "DdA p. 233",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 5,
		"armaPreferida": "Não há (devotos não podem usar Arma Espiritual e similares)",
		"simbolo": "Um tibar",
		"devotos": "Anões, elfos, golens, hynne, kallyanach, kliren, minotauros, nagahs, qareen, arcanistas, bardos, bucaneiros, caçadores, guerreiros, inventores, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"golens",
				"hynne",
				"kallyanach",
				"kliren",
				"minotauros",
				"nagahs",
				"qareen"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"cacador",
				"guerreiro",
				"inventor",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Incentivador da Economia",
				"fonte": "DdA p. 233",
				"uuid": "Compendium.suplementos-de-arton.deuses-de-arton.Item.yGFPij0bwYdAgTE0"
			}
		],
		"obrigacoes": "Nunca pode deixar de comercializar: sempre deve barganhar em qualquer transação financeira de que participar e, uma vez por semana, deve gastar pelo menos T$ 50 por patamar em itens ou serviços.",
		"menor": true
	},
	"espadadeus": {
		"nome": "A Espada-Deus",
		"fonte": "GDM p. 5",
		"energia": "qualquer",
		"natureza": "Objeto desperto",
		"status": 1,
		"armaPreferida": "Espada longa",
		"simbolo": "Uma espada",
		"devotos": "Anões, elfos, minotauros, bárbaros, caçadores, cavaleiros, guerreiros.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"minotauros"
			],
			"classes": [
				"barbaro",
				"cacador",
				"cavaleiro",
				"guerreiro"
			]
		},
		"poderes": [
			{
				"nome": "Espadachim Divino",
				"fonte": "GDM p. 5",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.sf83BrPJoQSvqpBT"
			}
		],
		"obrigacoes": "As únicas armas empunhadas que o devoto da Espada-Deus pode usar são espadas. Além disso, para atacar com outras armas (como naturais), ele deve fazer ao menos um ataque com espada na rodada.",
		"menor": true
	},
	"akok": {
		"nome": "Akok",
		"titulo": "Deus dos Lobos",
		"fonte": "GDM p. 5",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Espada curta",
		"simbolo": "Uma grande pata de lobo rodeada por patas menores",
		"devotos": "Centauros, dahllan, elfos, gnolls, goblins, kobolds, bárbaros, caçadores, druidas, guerreiros, ladinos, lutadores, treinadores.",
		"devotosLista": {
			"racas": [
				"centauros",
				"dahllan",
				"elfos",
				"gnolls",
				"goblins",
				"kobolds"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"guerreiro",
				"ladino",
				"lutador",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Espírito da Alcateia",
				"fonte": "GDM p. 5",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.OHMMYJBv3EPoYG6e"
			}
		],
		"obrigacoes": "Devotos de Akok não podem aprisionar ou matar lobos de qualquer tipo (como lobos-das-cavernas), nem permitir que outros o façam. Além disso, o grupo ao qual o devoto pertence (família, aventureiros, guilda…) é considerado sua alcateia. Ele não pode enganá-la, traí-la ou abandoná-la.",
		"menor": true
	},
	"altair": {
		"nome": "Altair",
		"titulo": "Deus das Montanhas",
		"fonte": "GDM p. 6",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Machado de guerra",
		"simbolo": "Uma montanha com um machado cravado",
		"devotos": "Anões, minotauros, naidoras, trogs, bárbaros, caçadores, druidas, guerreiros, lutadores.",
		"devotosLista": {
			"racas": [
				"anões",
				"minotauros",
				"naidoras",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"guerreiro",
				"lutador"
			]
		},
		"poderes": [
			{
				"nome": "Liberdade das Montanhas",
				"fonte": "GDM p. 6",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.R5NyKO1zNuf8OJNo"
			}
		],
		"obrigacoes": "Devotos de Altair nunca podem recusar uma missão que envolva escalar ou desbravar uma montanha. Além disso, a cada 1d4+2 meses o devoto deve escalar a maior montanha da região onde está e passar um dia meditando em seu cume, para se reconectar com a natureza e com sua divindade.",
		"menor": true,
		"nota": "Sobrepujado pela horda lefeu na Batalha de Tamu-ra (GDM p. 6); ver REGRAS.divindades.menores.deusesMortos."
	},
	"anilatir": {
		"nome": "Anilatir",
		"titulo": "Deusa da Inspiração",
		"fonte": "GDM p. 7",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Adaga, espada, arco longo… — muda na mesma frequência que seu símbolo sagrado",
		"simbolo": "Um escorpião, uma máscara, uma estrela, um pincel… — seu símbolo muda a cada 2d10+10 dias, mas seus devotos estão sempre cientes da mudança",
		"devotos": "Quaisquer. Anilatir não rejeita ninguém que queira criar ou ser algo novo.",
		"devotosLista": {
			"racas": "todas",
			"classes": "todas"
		},
		"poderes": [
			{
				"nome": "Inspiração Concedida",
				"fonte": "GDM p. 7",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.xIZ9OZ7pzBO5SSy1"
			}
		],
		"obrigacoes": "Devotos de Anilatir devem trocar pelo menos um item vestido ou empunhado por outro que ainda não tenham usado a cada 2d10+10 dias. (Para este efeito, versões aprimoradas ou encantadas de itens contam como itens diferentes.) Além disso, deve estar sempre atento às tramas de Yasshara, a Deusa Menor da Opressão, inimiga mortal de Anilatir.",
		"menor": true
	},
	"apis": {
		"nome": "Apis",
		"titulo": "Deusa das Abelhas",
		"fonte": "GDM p. 8",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Lança",
		"simbolo": "Uma abelha em um hexágono imitando um favo de mel",
		"devotos": "Dahllan, hobgoblins, kobolds, sílfides, trogs, bárbaros, caçadores, druidas.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"hobgoblins",
				"kobolds",
				"sílfides",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida"
			]
		},
		"poderes": [
			{
				"nome": "Chamado da Colmeia",
				"fonte": "GDM p. 8",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.IO7PLUGWSCHpNb9r"
			}
		],
		"obrigacoes": "Devotos de Apis não podem aprisionar ou matar abelhas de qualquer tipo (como abelhas monstruosas), nem permitir que outros o façam. Além disso, devem consumir T$ 1 por nível em mel todos os dias.",
		"menor": true
	},
	"artaphan": {
		"nome": "Artaphan",
		"titulo": "Deus da Amizade",
		"fonte": "GDM p. 8",
		"energia": "positiva",
		"natureza": "Conceito vivo",
		"status": 2,
		"armaPreferida": "Funda",
		"simbolo": "Um par de mãos dadas",
		"devotos": "Gnolls, goblins, hynne, qareen, sílfides, bardos, cavaleiros, nobres, treinadores, paladino.",
		"devotosLista": {
			"racas": [
				"gnolls",
				"goblins",
				"hynne",
				"qareen",
				"sílfides"
			],
			"classes": [
				"bardo",
				"cavaleiro",
				"nobre",
				"treinador",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Poder da Amizade",
				"fonte": "GDM p. 8",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.66mD56QoSyx6vH76"
			}
		],
		"obrigacoes": "Devotos de Artaphan devem espalhar a amizade. Uma vez por dia (ou por sessão de jogo, o que demorar mais), o devoto deve aproximar pessoas. Ele pode convencer alguém a ajudar outrem, passar um recado com uma mensagem positiva, colocar duas pessoas para beber juntas… Em termos de jogo, uma ação exigindo um teste de Diplomacia com CD mínima 15 + metade do seu nível.",
		"menor": true,
		"paladinoUnico": true
	},
	"ayllana": {
		"nome": "Ayllana",
		"titulo": "Deusa das Sereias",
		"fonte": "GDM p. 9",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Não há. Devotos desta deusa não podem usar a magia Arma Espiritual e similares",
		"simbolo": "Uma barbatana dorsal multicolorida",
		"devotos": "Qareen, sereias/tritões, arcanistas, bardos, bucaneiros.",
		"devotosLista": {
			"racas": [
				"qareen",
				"sereias/tritões"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro"
			]
		},
		"poderes": [
			{
				"nome": "Canção dos Mares",
				"fonte": "GDM p. 9",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.BDP1edzu0gRHB0r9"
			}
		],
		"obrigacoes": "Devotos de Ayllana são proibidos de matar sereias e tritões, recusar-se a ajudar sereias e tritões inocentes, e recusar missões para resgatar ou proteger sereias/tritões e sua cultura.",
		"menor": true
	},
	"beluhga": {
		"nome": "Beluhga",
		"titulo": "Dragoa-Rainha do Gelo",
		"fonte": "GDM p. 10",
		"energia": "positiva",
		"natureza": "Dragão-Real",
		"status": 4,
		"armaPreferida": "Machado de guerra",
		"simbolo": "Uma lágrima azul cristalizada",
		"devotos": "Anões, hynne, galokk, golens, kallyanach, minotauros, ogros, bárbaros, caçadores, druidas, guerreiros, paladino.",
		"devotosLista": {
			"racas": [
				"anões",
				"hynne",
				"galokk",
				"golens",
				"kallyanach",
				"minotauros",
				"ogros"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"guerreiro",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Bênção do Frio",
				"fonte": "GDM p. 10",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.SsosgzmonXoYLXfR"
			}
		],
		"obrigacoes": "Devotos de Beluhga não devem permitir que não nativos das Uivantes adentrem a caverna onde repousa o corpo da Dragoa-Rainha. Não podem negar pedidos de ajuda feitos por um nativo inocente das Uivantes. Além disso, devem retornar às Uivantes para prestar seus respeitos a Beluhga a cada 1d4+2 meses.",
		"menor": true,
		"paladinoUnico": true,
		"nota": "Morta: o corpo repousa nas Uivantes (GDM p. 10)."
	},
	"benthos": {
		"nome": "Benthos",
		"titulo": "Dragão-Rei dos Mares",
		"fonte": "GDM p. 11",
		"energia": "qualquer",
		"natureza": "Dragão-Real",
		"status": 4,
		"armaPreferida": "Tridente",
		"simbolo": "Uma coroa feita de conchas e pérolas",
		"devotos": "Elfos-do-mar, kallyanach, sereias/tritões, tabrachi, bucaneiros, caçadores, druidas, guerreiros, ladinos.",
		"devotosLista": {
			"racas": [
				"elfos-do-mar",
				"kallyanach",
				"sereias/tritões",
				"tabrachi"
			],
			"classes": [
				"bucaneiro",
				"cacador",
				"druida",
				"guerreiro",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Investida Tempestade",
				"fonte": "GDM p. 11",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.1H70xrFbNss6BIBQ"
			}
		],
		"obrigacoes": "Devotos de Benthos não podem recusar pedidos de ajuda feitos por criaturas marinhas ou khubarianos inocentes. Além disso, não podem permanecer mais de um dia sem contato com água.",
		"menor": true
	},
	"betsumial": {
		"nome": "Betsumial",
		"titulo": "Deus dos Vigias",
		"fonte": "GDM p. 11",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 1,
		"armaPreferida": "Arco longo",
		"simbolo": "Um olho aberto",
		"devotos": "Anões, elfos, hynne, kliren, naidoras, bárbaros, bucaneiros, caçadores, cavaleiros, guerreiros, ladinos, paladino.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"hynne",
				"kliren",
				"naidoras"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"ladino",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Olhos do Vigia",
				"fonte": "GDM p. 11",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.pDsQwjFs0cdJ5GV7"
			}
		],
		"obrigacoes": "Devotos de Betsumial sempre se oferecem para vigiar um local, objeto ou criatura, se isso for necessário, e jamais se recusam a fazê-lo (mas não precisam permanecer em vigília por mais de 1 dia).",
		"menor": true,
		"paladinoUnico": true
	},
	"blinar": {
		"nome": "Blinar",
		"titulo": "Deus das Máscaras",
		"fonte": "GDM p. 12",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Adaga",
		"simbolo": "Uma máscara de baile",
		"devotos": "Goblins, hynne, medusas, osteon, sílfides, sulfure, bardos, bucaneiros, ladinos, nobres.",
		"devotosLista": {
			"racas": [
				"goblins",
				"hynne",
				"medusas",
				"osteon",
				"sílfides",
				"sulfure"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"ladino",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Máscara Mística",
				"fonte": "GDM p. 12",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.tBIR1shZiZa8Ni7E"
			}
		],
		"obrigacoes": "Devotos de Blinar devem sempre usar máscaras em público (a máscara conta como um item vestido). Além disso, uma vez por semana devem fazer um estranho acreditar que sua identidade é outra.",
		"menor": true
	},
	"caerdellach": {
		"nome": "Caerdellach",
		"titulo": "Deus dos Unicórnios",
		"fonte": "GDM p. 13",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Lança",
		"simbolo": "Um chifre dourado",
		"devotos": "Aggelus, centauros, dahllan, eiradaan, elfos, meios-elfos, sílfides, cavaleiros, druidas, treinadores, paladino.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"centauros",
				"dahllan",
				"eiradaan",
				"elfos",
				"meios-elfos",
				"sílfides"
			],
			"classes": [
				"cavaleiro",
				"druida",
				"treinador",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Pureza Corporal",
				"fonte": "GDM p. 13",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.xhbwjCSQdh5SfYWm"
			}
		],
		"obrigacoes": "Devotos de Caerdellach devem ser sacros e castos, recusando-se a se casar ou ter relações íntimas com outras pessoas. Além disso, não podem recusar pedidos de ajuda de pessoas inocentes ou animais em perigo.",
		"menor": true,
		"paladinoUnico": true
	},
	"canastra": {
		"nome": "Canastra",
		"titulo": "Deus das Armadilhas",
		"fonte": "GDM p. 13",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Rede",
		"simbolo": "Uma armadilha arataca",
		"devotos": "Finntroll, gnolls, goblins, harpias, hynne, kliren, kobolds, nezumi, sílfides, trogs, bardos, caçadores, inventores, ladinos.",
		"devotosLista": {
			"racas": [
				"finntroll",
				"gnolls",
				"goblins",
				"harpias",
				"hynne",
				"kliren",
				"kobolds",
				"nezumi",
				"sílfides",
				"trogs"
			],
			"classes": [
				"bardo",
				"cacador",
				"inventor",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Dom de Armadilheiro",
				"fonte": "GDM p. 13",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.G5FdM8gX7ZaxWVBt"
			}
		],
		"obrigacoes": "Devotos de Canastra devem sempre estar um passo à frente de seus adversários. Uma vez por dia (ou por sessão de jogo, o que demorar mais), devem executar uma armadilha ou uma emboscada com sucesso.",
		"menor": true
	},
	"canora": {
		"nome": "Canora",
		"titulo": "Deusa da Canção",
		"fonte": "GDM p. 14",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Florete",
		"simbolo": "Uma flor em forma de nota musical",
		"devotos": "Anões, elfos, harpias, hynne, qareen, sátiros, sereias/tritões, sílfides, arcanistas, bardos, bucaneiros, nobres, paladino.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"harpias",
				"hynne",
				"qareen",
				"sátiros",
				"sereias/tritões",
				"sílfides"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Canção Divina",
				"fonte": "GDM p. 14",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.4bJ8qepE0rRw2RCl"
			}
		],
		"obrigacoes": "Devotos de Canora nunca recusam uma oportunidade de cantar. Além disso, uma vez por semana (ou por sessão de jogo, o que demorar mais), devem se apresentar para uma grande plateia, como uma taverna lotada, a corte de um nobre local ou um festival em uma vila.",
		"menor": true,
		"paladinoUnico": true
	},
	"cette": {
		"nome": "Cette",
		"titulo": "Deus dos Arqueiros",
		"fonte": "GDM p. 14",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Arco longo",
		"simbolo": "Uma flecha com folhas verdes",
		"devotos": "Elfos, medusas, naidoras, caçadores, inventores, guerreiros, nobres, paladino.",
		"devotosLista": {
			"racas": [
				"elfos",
				"medusas",
				"naidoras"
			],
			"classes": [
				"cacador",
				"inventor",
				"guerreiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Disparo Sublime",
				"fonte": "GDM p. 14",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.tkRKSxbzrIQLkFlW"
			}
		],
		"obrigacoes": "As únicas armas empunhadas que o devoto de Cette pode usar são arcos. Além disso, para atacar com outras armas (como naturais), ele deve fazer ao menos um ataque com arco na rodada.",
		"menor": true,
		"paladinoUnico": true
	},
	"champarr": {
		"nome": "Champarr",
		"titulo": "Deus dos Jogos",
		"fonte": "GDM p. 15",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Espada curta",
		"simbolo": "Um troféu",
		"devotos": "Anões, elfos, hynne, sátiros, sílfides, bardos, bucaneiros, guerreiros, ladinos, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"hynne",
				"sátiros",
				"sílfides"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"guerreiro",
				"ladino",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Jogada Decisiva",
				"fonte": "GDM p. 15",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.G2j57PaduF94HxL4"
			}
		],
		"obrigacoes": "Devotos de Champarr devem vencer um jogo por dia (ou por sessão de jogo, o que demorar mais). Em termos de regras, devem vencer um teste oposto de Jogatina, Luta ou Pontaria contra um oponente digno (a critério do mestre). Outras perícias podem ser usadas para atender essa obrigação, também a critério do mestre.",
		"menor": true
	},
	"dahriol": {
		"nome": "Dahriol",
		"titulo": "Deus dos Selos",
		"fonte": "GDM p. 16",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 1,
		"armaPreferida": "Bordão",
		"simbolo": "Um selo de cera",
		"devotos": "Anões, elfos, qareen, arcanistas, bardos, cavaleiros, guerreiros, nobres, paladino.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"qareen"
			],
			"classes": [
				"arcanista",
				"bardo",
				"cavaleiro",
				"guerreiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Selo Impedidor",
				"fonte": "GDM p. 16",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.p6OYfiU5sQqYLeFu"
			}
		],
		"obrigacoes": "Devotos de Dahriol não podem recusar pedidos de ajuda para entregar mensagens ou impedir que selos sejam abertos. Além disso, não podem abrir selos trancados sem permissão. Para estes fins, um “selo” é qualquer barreira, como uma porta, tranca ou fechadura, mundana ou mágica.",
		"menor": true,
		"paladinoUnico": true
	},
	"drumak": {
		"nome": "Drumak",
		"titulo": "Deus do Duelo",
		"fonte": "GDM p. 16",
		"energia": "qualquer",
		"natureza": "Conceito vivo",
		"status": 1,
		"armaPreferida": "Espada longa",
		"simbolo": "Duas espadas se cruzando",
		"devotos": "Quaisquer “combatentes”. A critério do mestre, qualquer personagem que use o combate físico como tática principal pode ser convidado para o Torneio Deus do Duelo e, assim também pode ser devoto de Drumak.",
		"devotosLista": {
			"racas": "todas",
			"classes": "todas",
			"condicao": "qualquer personagem que use o combate físico como tática principal (a critério do mestre)"
		},
		"poderes": [
			{
				"nome": "Um Contra Um",
				"fonte": "GDM p. 16",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.3RMGA6wHETw3kln9"
			}
		],
		"obrigacoes": "Devotos de Drumak devem competir no Torneio Deus do Duelo e não podem interromper ou recusar lutas justas entre dois oponentes.",
		"menor": true
	},
	"dunsark": {
		"nome": "Dunsark",
		"titulo": "Deus dos Mercenários",
		"fonte": "GDM p. 17",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Espada longa",
		"simbolo": "Uma espada longa entre joias",
		"devotos": "Gnolls, goblins, kobolds, lefou, nezumi, orcs, osteon, suraggel, trogs, bárbaros, bucaneiros, caçadores, guerreiros, ladinos, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"gnolls",
				"goblins",
				"kobolds",
				"lefou",
				"nezumi",
				"orcs",
				"osteon",
				"suraggel",
				"trogs"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"guerreiro",
				"ladino",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Armas e Espólios",
				"fonte": "GDM p. 17",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.P1tSo9Jg4bgbQOqu"
			}
		],
		"obrigacoes": "Devotos de Dunsark não podem recusar aventuras que envolvam uma recompensa em dinheiro e não podem aceitar aventuras que não tenham esse tipo de recompensa. Além disso, não podem ajudar alguém sem receber algo em troca e devem ajudar quem estiver disposto a pagar mais.",
		"menor": true
	},
	"elrophin": {
		"nome": "Elrophin",
		"titulo": "Deus da Vaidade",
		"fonte": "GDM p. 18",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Espada bastarda",
		"simbolo": "Uma espada bastarda entre rosas",
		"devotos": "Elfos, goblins, medusas, minauros, minotauros, naidoras, qareen, suraggel, tabrachi, bardos, bucaneiros, cavaleiros, guerreiros, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"elfos",
				"goblins",
				"medusas",
				"minauros",
				"minotauros",
				"naidoras",
				"qareen",
				"suraggel",
				"tabrachi"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"cavaleiro",
				"guerreiro",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Vanglória",
				"fonte": "GDM p. 18",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.LJ0c4t0xXpOeAEDY"
			}
		],
		"obrigacoes": "Devotos de Elrophin devem pregar o quanto eles mesmos — e seu deus — são incríveis e convencer pessoas de seus feitos pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais). Em termos de jogo, uma ação exigindo um teste de Diplomacia com CD mínima 15 + metade do seu nível.",
		"menor": true
	},
	"escamandra": {
		"nome": "Escamandra",
		"titulo": "Deusa da Permanência",
		"fonte": "GDM p. 19",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 1,
		"armaPreferida": "Arco curto",
		"simbolo": "Olhos de cobra em uma face de mármore",
		"devotos": "Anões, centauros, elfos, golens, medusas, osteon, arcanistas, bárbaros, caçadores, cavaleiros, druidas, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"centauros",
				"elfos",
				"golens",
				"medusas",
				"osteon"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"cacador",
				"cavaleiro",
				"druida",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Olhar Atordoante",
				"fonte": "GDM p. 19",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.26mqgcptz6gDRESE"
			}
		],
		"obrigacoes": "Devotos de Escamandra não podem causar dano letal ou perda de PV a medusas, nagahs, trogs e outras criaturas relacionadas com cobras (fornecer bônus em dano letal contra elas também é proibido) a critério do mestre. Podem causar dano não letal e prejudicar essas criaturas (em termos de jogo, impondo condições), desde que não causem dano letal ou perda de PV. Além disso, não podem recusar pedidos de ajuda de medusas inocentes.",
		"menor": true
	},
	"esmeralda": {
		"nome": "Esmeralda",
		"titulo": "Deusa das Joias",
		"fonte": "GDM p. 19",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Picareta",
		"simbolo": "Um colar de ouro com um pingente de esmeralda",
		"devotos": "Anões, elfos, qareen, sílfides, arcanistas, bardos, bucaneiros, inventores, ladinos, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"qareen",
				"sílfides"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Toque de Esmeralda",
				"fonte": "GDM p. 19",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.DtF5FUgmBKzhffqb"
			}
		],
		"obrigacoes": "Devotos de Esmeralda devem usar um item na forma de uma joia — que sempre será considerado um item vestido. A joia deve estar exposta. Se não estiver usando uma joia por motivo justificável (se for furtado ou preso, por exemplo), o devoto tem um dia para voltar a usar uma joia antes de descumprir estas Obrigações & Restrições.",
		"menor": true
	},
	"garanaam": {
		"nome": "Garanaam",
		"titulo": "Deus das Charadas",
		"fonte": "GDM p. 20",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Bordão",
		"simbolo": "Um ponto de interrogação",
		"devotos": "Goblins, kliren, qareen, arcanistas, bardos, bucaneiros, inventores, ladinos.",
		"devotosLista": {
			"racas": [
				"goblins",
				"kliren",
				"qareen"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"inventor",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Na Ponta da Língua",
				"fonte": "GDM p. 20",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.M1Y8VW4Hjoy8HT5Z"
			}
		],
		"obrigacoes": "Um devoto de Garanaam deve, pelo menos uma vez por cena, responder a uma pergunta com um enigma, uma charada ou um jogo de palavras que devem ser decifrados por quem perguntou.",
		"menor": true
	},
	"garth": {
		"nome": "Garth",
		"titulo": "Deus da Pólvora",
		"fonte": "GDM p. 20",
		"energia": "negativa",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Pistola",
		"simbolo": "Uma pistola",
		"devotos": "Anões, goblins, hobgoblins, kliren, meios-orcs, minauros, osteon, sulfure, bucaneiros, caçadores, inventores, ladinos.",
		"devotosLista": {
			"racas": [
				"anões",
				"goblins",
				"hobgoblins",
				"kliren",
				"meios-orcs",
				"minauros",
				"osteon",
				"sulfure"
			],
			"classes": [
				"bucaneiro",
				"cacador",
				"inventor",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Pólvora Sagrada",
				"fonte": "GDM p. 20",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.74v3e83VqrsMIWth"
			}
		],
		"obrigacoes": "Devotos de Garth não podem poupar inimigos nem aceitar ou oferecer perdão. Além disso, devem se vingar (de forma letal, usando armas de pólvora) de qualquer um que os prejudique seriamente.",
		"menor": true
	},
	"goharom": {
		"nome": "Goharom",
		"titulo": "Deus dos Machados",
		"fonte": "GDM p. 21",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 4,
		"armaPreferida": "Machado anão",
		"simbolo": "Um machado",
		"devotos": "Anões, galokk, trogs, bárbaros, caçadores, cavaleiros, guerreiros, inventores.",
		"devotosLista": {
			"racas": [
				"anões",
				"galokk",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"inventor"
			]
		},
		"poderes": [
			{
				"nome": "Amor ao Machado",
				"fonte": "GDM p. 21",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.uWeau7E5tI9Bd6zz"
			}
		],
		"obrigacoes": "As únicas armas empunhadas que o devoto de Goharom pode usar são machados. Além disso, para atacar com outras armas (como naturais), ele deve fazer ao menos um ataque com machado na rodada.",
		"menor": true
	},
	"granto": {
		"nome": "Granto",
		"titulo": "Deus dos Escultores",
		"fonte": "GDM p. 22",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 4,
		"armaPreferida": "Martelo leve (Heróis de Arton, p. 221)",
		"simbolo": "Um cinzel e um martelo",
		"devotos": "Anões, golens, kliren, qareen, bárbaros, cavaleiros, guerreiros, inventores, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"golens",
				"kliren",
				"qareen"
			],
			"classes": [
				"barbaro",
				"cavaleiro",
				"guerreiro",
				"inventor",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Âmago de Escultor",
				"fonte": "GDM p. 22",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.Sfjpj2qMCtLlRmXG"
			}
		],
		"obrigacoes": "Devotos de Granto devem fabricar ou consertar uma escultura (um item não consumível simples com preço de T$ 150 por patamar) pelo menos uma vez por aventura.",
		"menor": true,
		"nota": "Morto pelas forças lefeu na Batalha de Tamu-ra (GDM p. 22); ver REGRAS.divindades.menores.deusesMortos."
	},
	"gratissa": {
		"nome": "Gratissa",
		"titulo": "Deusa da Hospitalidade",
		"fonte": "GDM p. 23",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Não há. Devotos desta deusa não podem lançar a magia Arma Espiritual e similares",
		"simbolo": "Uma lareira",
		"devotos": "Anões, centauros, elfos, hynne, minotauros, qareen, bardos, bucaneiros, caçadores, druidas, nobres, paladino.",
		"devotosLista": {
			"racas": [
				"anões",
				"centauros",
				"elfos",
				"hynne",
				"minotauros",
				"qareen"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"cacador",
				"druida",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Igual ao Lar",
				"fonte": "GDM p. 23",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.1oaEthIV83vYGQD4"
			}
		],
		"obrigacoes": "Devotos de Gratissa não podem causar dano, perda de PV e condições (exceto enfeitiçado, fascinado e pasmo) a criaturas inteligentes (Int –3 ou maior) que estejam convivendo, hospedadas ou sendo recebidas no mesmo local (como fregueses em uma taverna ou membros de uma caravana), nem podem fornecer bônus em dano contra essas criaturas. Além disso, não podem recusar hospitalidade a ninguém.",
		"menor": true,
		"paladinoUnico": true
	},
	"hippion": {
		"nome": "Hippion",
		"titulo": "Deus dos Cavalos",
		"fonte": "GDM p. 24",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 4,
		"armaPreferida": "Lança",
		"simbolo": "Um cavalo galopando",
		"devotos": "Aggelus, centauros, eiradaan, bárbaros, caçadores, cavaleiros, druidas, guerreiros, nobres, treinadores, paladino.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"centauros",
				"eiradaan"
			],
			"classes": [
				"barbaro",
				"cacador",
				"cavaleiro",
				"druida",
				"guerreiro",
				"nobre",
				"treinador",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Ginete Altivo",
				"fonte": "GDM p. 24",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.CutkE1YnR1v2iUha"
			}
		],
		"obrigacoes": "Devotos de Hippion jamais podem matar cavalos, nem mesmo suas variantes monstruosas (como cavalos glaciais). Além disso, não podem permitir que cavalos sejam assassinados ou maltratados. Também nunca podem usar selas ou outros equipamentos de montaria enquanto estiverem montados.",
		"menor": true,
		"paladinoUnico": true
	},
	"hurlaagh": {
		"nome": "Hurlaagh",
		"titulo": "Deus dos Hobgoblins",
		"fonte": "GDM p. 25",
		"energia": "negativa",
		"natureza": "Entidade primordial",
		"status": 3,
		"armaPreferida": "Espada longa",
		"simbolo": "Tambor de guerra hobgoblin",
		"devotos": "Goblins, hobgoblins, minotauros, orcs, bárbaros, caçadores, cavaleiros, guerreiros.",
		"devotosLista": {
			"racas": [
				"goblins",
				"hobgoblins",
				"minotauros",
				"orcs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"cavaleiro",
				"guerreiro"
			]
		},
		"poderes": [
			{
				"nome": "Selvageria Marcial",
				"fonte": "GDM p. 25",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.vv5OsT85Qhkaym62"
			}
		],
		"obrigacoes": "Devotos de Hurlaagh jamais podem desobedecer à ordem de um superior (devoto de Hurlaagh de nível maior ou hobgoblin de patente militar superior). Além disso, devem lutar contra “o Mundo Como Deve Ser” proposto por Thwor.",
		"menor": true
	},
	"hydora": {
		"nome": "Hydora",
		"titulo": "Dragão-Rei das Nuvens",
		"fonte": "GDM p. 26",
		"energia": "qualquer",
		"natureza": "Dragão-Real",
		"status": 4,
		"armaPreferida": "Cimitarra",
		"simbolo": "Uma nuvem negra em forma de asa cuspindo três raios",
		"devotos": "Elfos, kallyanach, kliren, naidoras, qareen, sílfides, suraggel, tengu, arcanistas, bardos, caçadores, cavaleiros, guerreiros, inventores.",
		"devotosLista": {
			"racas": [
				"elfos",
				"kallyanach",
				"kliren",
				"naidoras",
				"qareen",
				"sílfides",
				"suraggel",
				"tengu"
			],
			"classes": [
				"arcanista",
				"bardo",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"inventor"
			]
		},
		"poderes": [
			{
				"nome": "Alcançar os Céus",
				"fonte": "GDM p. 26",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.Leeuvo4iYsawMLfv"
			}
		],
		"obrigacoes": "Devotos de Hydora devem ser inquietos e inconstantes como os ventos, proibidos de passar mais de um dia com os pés no chão — escalar uma montanha ou voar por uma rodada é suficiente para agradar ao Dragão-Rei. Além disso, não podem fixar moradia exceto em local mais próximo dos céus do que da terra.",
		"menor": true
	},
	"inghlblhpholstgt": {
		"nome": "Inghlblhpholstgt",
		"titulo": "A Grande Divindade Anfíbia",
		"fonte": "GDM p. 27",
		"energia": "qualquer",
		"natureza": "Entidade primordial",
		"status": 3,
		"armaPreferida": "Lança",
		"simbolo": "Um sapo sobre uma pirâmide",
		"devotos": "Dahllan, goblins, lefou, sereias/tritões, tabrachi, trogs, arcanistas, bárbaros, caçadores, druidas, ladinos, treinadores.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"goblins",
				"lefou",
				"sereias/tritões",
				"tabrachi",
				"trogs"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"cacador",
				"druida",
				"ladino",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Salto Anurídeo",
				"fonte": "GDM p. 27",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.PMF06GWlGDeaoIl6"
			}
		],
		"obrigacoes": "Devotos de Inghlblhpholstgt devem espalhar sua fé com afinco, angariando pelo menos um novo devoto por mês. Além disso, devem ajudar e proteger criaturas anfíbias, desde que isso não prejudique seus aliados.",
		"menor": true
	},
	"irione": {
		"nome": "Irione",
		"titulo": "Deus da Sedução",
		"fonte": "GDM p. 28",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Chicote",
		"simbolo": "Marca de beijo",
		"devotos": "Elfos, harpias, medusas, nagahs, naidoras, sereias/tritões, sílfides, suraggel, arcanistas, bardos, bucaneiros, ladinos, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"elfos",
				"harpias",
				"medusas",
				"nagahs",
				"naidoras",
				"sereias/tritões",
				"sílfides",
				"suraggel"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"ladino",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Fisgar Corações",
				"fonte": "GDM p. 28",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.mBBQlkya7X7Y8exj"
			}
		],
		"obrigacoes": "Devotos de Irione devem obter a adoração de uma pessoa que originalmente não era prestativa, pelo menos uma vez por avetura (ou por mês, o que demorar menos), como forma de honrar sua divindade. Isso significa tornar um NPC prestativo e, após isso, tornar-se objeto da admiração e adoração desse personagem.",
		"menor": true
	},
	"jandra": {
		"nome": "Jandra",
		"titulo": "Deusa das Boas Maneiras",
		"fonte": "GDM p. 29",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Adaga",
		"simbolo": "Uma xícara",
		"devotos": "Aggelus, anões, elfos, golens, hynne, minotauros, bardos, cavaleiros, nobres.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"anões",
				"elfos",
				"golens",
				"hynne",
				"minotauros"
			],
			"classes": [
				"bardo",
				"cavaleiro",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Etiqueta à Toda Hora",
				"fonte": "GDM p. 29",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.GiC6H1pYg8k8BTPA"
			}
		],
		"obrigacoes": "Devotos de Jandra nunca deixam de fazer testes de Diplomacia ou Nobreza quando isso é socialmente adequado. Além disso, não suportam falta de modos e desconhecimento de etiqueta; quando presencia uma falha em um teste de Diplomacia ou Nobreza, o devoto deve corrigir a pessoa que falhou (em termos de jogo, deve passar em um teste da perícia apropriada com a mesma CD, enquanto explica de forma discreta e elegante onde ela errou).",
		"menor": true
	},
	"klangor": {
		"nome": "Klangor",
		"titulo": "Deus das Armaduras",
		"fonte": "GDM p. 29",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 4,
		"armaPreferida": "Martelo de guerra",
		"simbolo": "Um elmo anão",
		"devotos": "Aggelus, anões, cavaleiros, guerreiros, inventores, paladino.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"anões"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"inventor",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Manutenção Sagrada",
				"fonte": "GDM p. 29",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.t8bGOAuWy7EiVbil"
			}
		],
		"obrigacoes": "Devotos de Klangor devem passar pelo menos uma hora por dia limpando, consertando ou polindo uma armadura, ou treinando enquanto trajam uma armadura. Além disso, pelo menos uma vez por aventura o devoto deve fabricar uma armadura qualquer.",
		"menor": true,
		"paladinoUnico": true
	},
	"kururlianth": {
		"nome": "Kurur Lianth",
		"titulo": "Deus Vulcão de Khubar",
		"fonte": "GDM p. 30",
		"energia": "negativa",
		"natureza": "Objeto desperto",
		"status": 1,
		"armaPreferida": "Lança",
		"simbolo": "Um vulcão em erupção",
		"devotos": "Qareen, suraggel, trogs, bárbaros, bardos, druidas, guerreiros, lutadores.",
		"devotosLista": {
			"racas": [
				"qareen",
				"suraggel",
				"trogs"
			],
			"classes": [
				"barbaro",
				"bardo",
				"druida",
				"guerreiro",
				"lutador"
			]
		},
		"poderes": [
			{
				"nome": "Alma em Erupção",
				"fonte": "GDM p. 30",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.lS30DwM9z1W3eVIo"
			}
		],
		"obrigacoes": "Devotos de Kurur Lianth devem se reunir com seu deus uma vez por ano para sacrificar um humanoide voluntário. Na ausência de um voluntário, o devoto mais velho deve se oferecer de imediato. Se não o fizer, deixa de ser um devoto imediatamente e seu destino como sacrifício passa para outro devoto mais velho.",
		"menor": true
	},
	"laan": {
		"nome": "Laan",
		"titulo": "Deus das Viagens",
		"fonte": "GDM p. 31",
		"energia": "positiva",
		"natureza": "Entidade primordial",
		"status": 3,
		"armaPreferida": "Bordão",
		"simbolo": "Uma estrada que se perde no horizonte",
		"devotos": "Goblins, golens, kliren, lefou, naidoras, bardos, bucaneiros, caçadores, guerreiros, paladino.",
		"devotosLista": {
			"racas": [
				"goblins",
				"golens",
				"kliren",
				"lefou",
				"naidoras"
			],
			"classes": [
				"bardo",
				"bucaneiro",
				"cacador",
				"guerreiro",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Pé na Estrada",
				"fonte": "GDM p. 31",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.ov8jAp6BrzJ5BlFW"
			}
		],
		"obrigacoes": "Devotos de Laan são proibidos de fixar moradia, não podendo permanecer mais de 1d10+10 dias na mesma cidade (ou vila, aldeia, povoado...) ou 1d4+1 meses no mesmo reino.",
		"menor": true,
		"paladinoUnico": true
	},
	"lamashtu": {
		"nome": "Lamashtu",
		"titulo": "Deusa da Matança",
		"fonte": "GDM p. 32",
		"energia": "negativa",
		"natureza": "Entidade primordial",
		"status": 4,
		"armaPreferida": "Cimitarra",
		"simbolo": "Uma joia ensanguentada",
		"devotos": "Medusas, minotauros, osteon, sulfure, trogs, bárbaros, bucaneiros, guerreiros, ladinos, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"medusas",
				"minotauros",
				"osteon",
				"sulfure",
				"trogs"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"guerreiro",
				"ladino",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Furacão de Lâminas",
				"fonte": "GDM p. 32",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.Tq9LUq9uBqtCV2OA"
			}
		],
		"obrigacoes": "Uma vez por nível, o personagem deve consagrar uma de suas vítimas fatais a Lamashtu. Essa vítima pode ser qualquer criatura inteligente (Int –3 ou maior) que o personagem tenha matado (para criaturas que o grupo inteiro enfrentou em combate, o devoto deve ter sido responsável pelo golpe fatal). Para devotar a criatura, o personagem deve executar um ritual, com a presença do corpo da vítima, e sacrificar um valor em joias igual a 10% da diferença do dinheiro inicial do nível atual para o seguinte (por exemplo, T$ 40 para subir para o 4° nível).",
		"menor": true
	},
	"lupan": {
		"nome": "Lupan",
		"titulo": "Deus dos Caçadores",
		"fonte": "GDM p. 33",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Arco curto",
		"simbolo": "Um cão de caça",
		"devotos": "Dahllan, elfos, medusas, sereias/tritões, trogs, bárbaros, caçadores, druidas, ladinos, treinadores.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"elfos",
				"medusas",
				"sereias/tritões",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"ladino",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Passo do Caçador",
				"fonte": "GDM p. 33",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.iaXU0COme6cV9NRt"
			}
		],
		"obrigacoes": "Devotos de Lupan não podem matar criaturas não inteligentes (Int –4 ou –5) grávidas ou filhotes, nem permitir que elas sejam mortas. Além disso, devem extrair algo de útil de qualquer criatura não inteligente que matarem (em termos de jogo, passar em um teste de Sobrevivência com CD 15 + ND da criatura). Alternativamente, se você tiver o suplemento Ameaças de Arton, o devoto deve extrair pelo menos um recurso natural da criatura (veja p. 401).",
		"menor": true
	},
	"luvithy": {
		"nome": "Luvithy",
		"titulo": "Deusa da Peste",
		"fonte": "GDM p. 33",
		"energia": "negativa",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Gadanho",
		"simbolo": "Um crânio encapuzado",
		"devotos": "Dahllan, kobolds, nezumi, orcs, osteon, sulfure, trogs, arcanistas, bárbaros, caçadores, druidas, guerreiros, ladinos.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"kobolds",
				"nezumi",
				"orcs",
				"osteon",
				"sulfure",
				"trogs"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"cacador",
				"druida",
				"guerreiro",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Toque Pestilento",
				"fonte": "GDM p. 33",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.Uqtir8L7D6CAjPxJ"
			}
		],
		"obrigacoes": "Devotos de Luvithy devem contaminar pelo menos uma criatura Pequena ou maior com uma doença por semana. Na falta de uma vítima adequada, um devoto pode contaminar a si mesmo.",
		"menor": true
	},
	"marina": {
		"nome": "Marina",
		"titulo": "Deusa dos Marinheiros",
		"fonte": "GDM p. 34",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Florete",
		"simbolo": "Um redemoinho marinho",
		"devotos": "Elfos, elfos-do-mar, hynne, kappa, minotauros, qareen, sereias/tritões, arcanistas, bárbaros, bucaneiros, caçadores, druidas, ladinos.",
		"devotosLista": {
			"racas": [
				"elfos",
				"elfos-do-mar",
				"hynne",
				"kappa",
				"minotauros",
				"qareen",
				"sereias/tritões"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"bucaneiro",
				"cacador",
				"druida",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Mar Aberto",
				"fonte": "GDM p. 34",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.TZLyjBGRppyWZjEh"
			}
		],
		"obrigacoes": "Devotos de Marina devem sempre carregar consigo um recipiente fechado com água do mar (em termos de jogo, um item que ocupa 0,5 espaço). Além disso, uma vez por aventura, devem passar pelo menos uma noite em uma embarcação no mar.",
		"menor": true
	},
	"mzzileyn": {
		"nome": "Mzzileyn",
		"titulo": "Dragão-Rei das Trevas",
		"fonte": "GDM p. 34",
		"energia": "negativa",
		"natureza": "Dragão-Real",
		"status": 3,
		"armaPreferida": "Adaga",
		"simbolo": "O crânio de um dragão vertendo sombras",
		"devotos": "Finntroll, gnolls, goblins, kallyanach, nagah, tengu, arcanistas, bardos, bucaneiros, ladinos.",
		"devotosLista": {
			"racas": [
				"finntroll",
				"gnolls",
				"goblins",
				"kallyanach",
				"nagah",
				"tengu"
			],
			"classes": [
				"arcanista",
				"bardo",
				"bucaneiro",
				"ladino"
			]
		},
		"poderes": [
			{
				"nome": "Sombras Venenosas",
				"fonte": "GDM p. 34",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.tXws4Ao5eqpDoYiF"
			}
		],
		"obrigacoes": "Sempre que estiver diante de um desafio (um combate, um perigo complexo ou outra cena que envolva vencer ou superar algo desafiador) você deve passar em pelo menos um teste de Enganação que seja útil contra esse desafio. O mestre tem a palavra final sobre quais ações se encaixam nessa descrição.",
		"menor": true
	},
	"nerelim": {
		"nome": "Nerelim",
		"titulo": "Deusa da Água Doce",
		"fonte": "GDM p. 35",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Arpão (Ameaças de Arton, p. 392)",
		"simbolo": "Um rio cortando a várzea",
		"devotos": "Elfos, elfos-do-mar, hynne, kappa, minotauros, qareen, sereias/tritões, bárbaros, bucaneiros, caçadores, druidas, treinadores.",
		"devotosLista": {
			"racas": [
				"elfos",
				"elfos-do-mar",
				"hynne",
				"kappa",
				"minotauros",
				"qareen",
				"sereias/tritões"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"druida",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Água da Vida",
				"fonte": "GDM p. 35",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.amUFXgMmxgWafaUA"
			}
		],
		"obrigacoes": "Devotos de Nerelim não podem se manter afastados de um grande corpo de água doce (como um lago ou rio) por mais de um mês. Além disso, devem pescar em um rio ou outro corpo de água doce pelo menos uma vez por semana.",
		"menor": true
	},
	"neruite": {
		"nome": "Neruíte",
		"titulo": "Deusa do Sono",
		"fonte": "GDM p. 36",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Maça",
		"simbolo": "Uma vela apagada",
		"devotos": "Aggelus, elfos, qareen, sereias/tritões, sílfides, arcanistas, bardos, caçadores, nobres.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"elfos",
				"qareen",
				"sereias/tritões",
				"sílfides"
			],
			"classes": [
				"arcanista",
				"bardo",
				"cacador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Sono Reparador",
				"fonte": "GDM p. 36",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.WALuAk4MlJOfVkgN"
			}
		],
		"obrigacoes": "Devotos de Neruíte jamais podem acordar intencionalmente alguém que esteja dormindo, ou permitir que outros o façam. Além disso, sempre que acorda, o devoto fica pasmo por 1 rodada, enquanto seu espírito lentamente desperta de seu sono sagrado.",
		"menor": true
	},
	"deuscristaldeurielka": {
		"nome": "O Deus Cristal de Urielka",
		"fonte": "GDM p. 37",
		"energia": "positiva",
		"natureza": "Objeto desperto",
		"status": 1,
		"armaPreferida": "Lança",
		"simbolo": "Um cristal",
		"devotos": "Aggelus, elfos, hynne, qareen, bardos, caçadores, cavaleiros, nobres, paladino.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"elfos",
				"hynne",
				"qareen"
			],
			"classes": [
				"bardo",
				"cacador",
				"cavaleiro",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Conjurar Cristal",
				"fonte": "GDM p. 37",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.RRhwJoCb3NRQOwMj"
			}
		],
		"obrigacoes": "Devotos do Deus Cristal de Urielka devem peregrinar até a aldeia pelo menos uma vez por aventura (ou tempo entre aventuras) e, pelo menos uma vez por ano, devem fazer essa peregrinação levando consigo um novo devoto convertido.",
		"menor": true,
		"paladinoUnico": true
	},
	"deusdascidades": {
		"nome": "O Deus das Cidades",
		"fonte": "GDM p. 37",
		"energia": "qualquer",
		"natureza": "Conceito vivo",
		"status": 4,
		"armaPreferida": "Martelo de guerra",
		"simbolo": "Torres amontoadas atrás de um muro",
		"devotos": "Anões, elfos, goblins, hynne, kliren, minotauros, arcanistas, bardos, inventores, ladinos, lutadores, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"goblins",
				"hynne",
				"kliren",
				"minotauros"
			],
			"classes": [
				"arcanista",
				"bardo",
				"inventor",
				"ladino",
				"lutador",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Manha da Cidade",
				"fonte": "GDM p. 37",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.8DpCpe5k7U2P8aZd"
			}
		],
		"obrigacoes": "Devotos do Deus das Cidades jamais podem se manter afastados de um centro urbano por mais 2d10+10 dias, nem se recusar a auxiliar uma comunidade.",
		"menor": true
	},
	"deusdomedo": {
		"nome": "O Deus do Medo",
		"fonte": "GDM p. 38",
		"energia": "negativa",
		"natureza": "Conceito vivo",
		"status": 4,
		"armaPreferida": "Corrente de espinhos",
		"simbolo": "Uma silhueta sombria",
		"devotos": "Bugbears, lefou, minotauros, medusas, osteon, sulfure, trogs, voracis, arcanistas, bárbaros, bardos, bucaneiros, guerreiros, ladinos, lutadores.",
		"devotosLista": {
			"racas": [
				"bugbears",
				"lefou",
				"minotauros",
				"medusas",
				"osteon",
				"sulfure",
				"trogs",
				"voracis"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"bardo",
				"bucaneiro",
				"guerreiro",
				"ladino",
				"lutador"
			]
		},
		"poderes": [
			{
				"nome": "Domínio do Medo",
				"fonte": "GDM p. 38",
				"nota": "No compêndio: 'Medo Verdadeiro' (mesmo texto).",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.6lj7RtlumygX1Ug9"
			}
		],
		"obrigacoes": "Devotos do Deus do Medo devem deixar uma criatura sob qualquer efeito de medo pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais) em adoração a sua divindade.",
		"menor": true
	},
	"piscigeros": {
		"nome": "Piscigeros",
		"titulo": "Deus dos Homens-Peixes",
		"fonte": "GDM p. 39",
		"energia": "negativa",
		"natureza": "Conceito vivo",
		"status": 1,
		"armaPreferida": "Tridente",
		"simbolo": "Um peixe imenso em um cardume de peixes menores",
		"devotos": "Dahllan, elfos-do-mar, hynne, kappa, minotauros, sereias/tritões, bárbaros, bucaneiros, caçadores, druidas, treinadores.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"elfos-do-mar",
				"hynne",
				"kappa",
				"minotauros",
				"sereias/tritões"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"druida",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Bolha Hídrica",
				"fonte": "GDM p. 39",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.dcbqDuFosFqBqf9z"
			}
		],
		"obrigacoes": "Devotos de Piscigeros jamais podem ignorar um pedido de ajuda de um homem-peixe e devem proteger qualquer membro de seu povo até a morte, se preciso. Além disso, devotos do Pai Peixe jamais podem desobedecer às ordens dos arautos de sua divindade ou causar dano letal ou perda de PV a eles (habilidades que forneçam bônus em dano letal ou em perda de vida para criaturas em combate contra eles também são proibidas). Esse último dogma vem sendo contestado por alguns sacerdotes de Piscigeros, mas não se sabe ainda as consequências de fazer isso.",
		"menor": true
	},
	"rhond": {
		"nome": "Rhond",
		"titulo": "Deus das Armas",
		"fonte": "GDM p. 39",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Martelo de guerra",
		"simbolo": "Uma espada, um machado de batalha e um martelo de guerra cruzados sobre uma bigorna",
		"devotos": "Anões, elfos, golens, minotauros, bárbaros, bucaneiros, caçadores, cavaleiros, guerreiros, inventores, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"golens",
				"minotauros"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"cavaleiro",
				"guerreiro",
				"inventor",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Artista das Armas",
				"fonte": "GDM p. 39",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.YetrR97eB7caWX2e"
			}
		],
		"obrigacoes": "Devotos de Rhond devem passar pelo menos uma hora por dia limpando, consertando ou afiando uma arma, ou treinando com uma arma. Além disso, pelo menos uma vez por aventura o devoto deve fabricar uma arma qualquer.",
		"menor": true
	},
	"sartan": {
		"nome": "Sartan",
		"titulo": "Deus da Desolação",
		"fonte": "GDM p. 41",
		"energia": "negativa",
		"natureza": "Entidade primordial",
		"status": 4,
		"armaPreferida": "Maça",
		"simbolo": "Uma cabeça de demônio com a bocarra arreganhada",
		"devotos": "Quaisquer. Sartan não rejeita ninguém que queira ajudá-lo a retornar a Arton.",
		"devotosLista": {
			"racas": "todas",
			"classes": "todas"
		},
		"poderes": [
			{
				"nome": "Inimigo dos Deuses",
				"fonte": "GDM p. 41",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.zPSHi0xtrp5WWYiU"
			}
		],
		"obrigacoes": "Devotos de Sartan jamais podem se recusar a participar de tentativas de trazer seu padroeiro de volta para Arton. Eles devem estar sempre estudando os alinhamentos dos astros para antecipar seu retorno. Além disso, devem praticar o mal através de algum ato de crueldade, como ferir uma criatura indefesa, pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais), como oferenda a Sartan.",
		"menor": true,
		"nota": "Esta divindade menor não é permitida para jogadores (GDM p. 41).",
		"proibidoJogadores": true
	},
	"sckhar": {
		"nome": "Sckhar",
		"titulo": "Dragão-Rei do Fogo",
		"fonte": "GDM p. 42",
		"energia": "negativa",
		"natureza": "Dragão-Real",
		"status": 5,
		"armaPreferida": "Lança",
		"simbolo": "Chamas vermelhas com uma coroa dourada no centro",
		"devotos": "Elfos, kallyanach, meios-elfos, arcanistas, bardos, cavaleiros, nobres, treinadores.",
		"devotosLista": {
			"racas": [
				"elfos",
				"kallyanach",
				"meios-elfos"
			],
			"classes": [
				"arcanista",
				"bardo",
				"cavaleiro",
				"nobre",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Ego",
				"fonte": "GDM p. 42",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.GwLaZXPEyuGCIrDX"
			}
		],
		"obrigacoes": "Devotos de Sckhar devem obedecer cegamente às ordens do seu Dragão-Rei, especialmente quando convocados para expulsar dragões e outras criaturas aparentadas do território de Sckharshantallas. Além disso, uma vez por mês, os devotos devem doar 20% de todo seu tesouro para os cofres de Sckhar. Essa doação deve ser feita em ouro.",
		"menor": true
	},
	"sunnary": {
		"nome": "Sunnary",
		"titulo": "Deusa da Culinária",
		"fonte": "GDM p. 43",
		"energia": "positiva",
		"natureza": "Mortal ascendido",
		"status": 2,
		"armaPreferida": "Adaga",
		"simbolo": "Panela sobre uma fogueira",
		"devotos": "Aggelus, anões, elfos, hynne, qareen, bardos, druidas, nobres, paladino.",
		"devotosLista": {
			"racas": [
				"aggelus",
				"anões",
				"elfos",
				"hynne",
				"qareen"
			],
			"classes": [
				"bardo",
				"druida",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Alimento da Alma",
				"fonte": "GDM p. 43",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.E2lal1M6y9KBaHN0"
			}
		],
		"obrigacoes": "Devotos de Sunnary não podem se negar a atender um pedido para cozinhar para alguém, e devem preparar pelo menos um prato especial por semana.",
		"menor": true,
		"paladinoUnico": true
	},
	"tamagrah": {
		"nome": "Tamagrah",
		"titulo": "Deus da Ilha Viva",
		"fonte": "GDM p. 44",
		"energia": "qualquer",
		"natureza": "Entidade primordial",
		"status": 3,
		"armaPreferida": "Lança",
		"simbolo": "Um casco de tartaruga com seis nadadeiras de peixe",
		"devotos": "Anões, dahllan, elfos, hynne, sílfides, bárbaros, bucaneiros, caçadores, druidas, treinadores.",
		"devotosLista": {
			"racas": [
				"anões",
				"dahllan",
				"elfos",
				"hynne",
				"sílfides"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador",
				"druida",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Casco de Tartaruga",
				"fonte": "GDM p. 44",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.bqvhcBiTLXp0DSo7"
			}
		],
		"obrigacoes": "Devotos de Tamagrah devem proteger seu deus e, consequentemente, seu habitat, por meio de missões além mar para prevenir ameaças (pelo menos uma missão a cada 1d4+2 meses), mas não podem permanecer mais de 1d4+2 meses longe de Tamagrah.",
		"menor": true
	},
	"teldiskan": {
		"nome": "Teldiskan",
		"titulo": "O Gigante Máximo",
		"fonte": "GDM p. 44",
		"energia": "qualquer",
		"natureza": "Entidade primordial",
		"status": 1,
		"armaPreferida": "Tacape",
		"simbolo": "Vários picos de montanhas surgindo por cima das nuvens",
		"devotos": "Dahllan, gnolls, harpias, hynne, kallyanach, medusas, ogros, trogs, bárbaros, caçadores, druidas, lutadores.",
		"devotosLista": {
			"racas": [
				"dahllan",
				"gnolls",
				"harpias",
				"hynne",
				"kallyanach",
				"medusas",
				"ogros",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida",
				"lutador"
			]
		},
		"poderes": [
			{
				"nome": "Despertar do Gigante",
				"fonte": "GDM p. 44",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.hCNje4sTfNDb3bHF"
			}
		],
		"obrigacoes": "Devotos de Teldiskan devem pregar a benevolência de sua divindade por meio de seus atos e previsões climáticas. Uma vez por dia (ou por sessão de jogo, o que demorar mais), o devoto precisa convencer outra pessoa de que Teldiskan é um salvador ou prever o clima da região. Em termos de jogo, deve passar em um teste de Enganação ou Sobrevivência com CD mínima 15 + metade do seu nível.",
		"menor": true
	},
	"tessalus": {
		"nome": "Tessalus",
		"titulo": "Deus dos Elfos-do-Mar",
		"fonte": "GDM p. 46",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Tridente",
		"simbolo": "Um tridente",
		"devotos": "Elfos-do-mar, qareen, bárbaros, bucaneiros, caçadores.",
		"devotosLista": {
			"racas": [
				"elfos-do-mar",
				"qareen"
			],
			"classes": [
				"barbaro",
				"bucaneiro",
				"cacador"
			]
		},
		"poderes": [
			{
				"nome": "Arsenal do Oceano",
				"fonte": "GDM p. 46",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.oxBbtdPIxqQ0ZSxm"
			}
		],
		"obrigacoes": "Devotos de Tessalus são proibidos de matar elfos-do-mar, recusar-se a ajudar elfos-do-mar, e recusar missões para resgatar ou proteger elfos-do-mar e seus ritos.",
		"menor": true
	},
	"toris": {
		"nome": "Toris",
		"titulo": "Deusa de Jallar",
		"fonte": "GDM p. 46",
		"energia": "qualquer",
		"natureza": "Entidade primordial",
		"status": 1,
		"armaPreferida": "Espada longa",
		"simbolo": "Um castelo dentro de um círculo",
		"devotos": "Caçadores, cavaleiros, guerreiros, ladinos, nobres, paladino.",
		"devotosLista": {
			"racas": [],
			"classes": [
				"cacador",
				"cavaleiro",
				"guerreiro",
				"ladino",
				"nobre",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Véu de Toris",
				"fonte": "GDM p. 46",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.LPQWyhOoLNGOootM"
			}
		],
		"obrigacoes": "Devotos de Toris jamais podem ignorar um pedido de ajuda de um cidadão de Jallar e devem proteger qualquer membro de seu povo até a morte, se preciso. Além disso, mesmo nas raras ocasiões em que deve sair do reino para realizar alguma missão a pedido de sua deusa, o devoto deve manter contato com ela, não podendo permanecer mais de 2d10+10 dias sem conversar com ela (por meios mundanos ou mágicos) nem passar 1d4+2 meses sem voltar a Jallar para se reportar pessoalmente. Qualquer atenção demasiada que um devoto dê a qualquer outra pessoa, coisa ou entidade pode valer sua fúria (contando como um descumprimento das Obrigações & Restrições).",
		"menor": true,
		"paladinoUnico": true
	},
	"tukala": {
		"nome": "Tukala",
		"titulo": "Deusa dos Texugos Alados",
		"fonte": "GDM p. 47",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 1,
		"armaPreferida": "Espada curta",
		"simbolo": "Contorno cinza do rosto de um texugo sobreposto a um par de asas de morcego",
		"devotos": "Duendes, goblins, kobolds, sílfides, bárbaros, bardos, caçadores, druidas, inventores, treinadores.",
		"devotosLista": {
			"racas": [
				"duendes",
				"goblins",
				"kobolds",
				"sílfides"
			],
			"classes": [
				"barbaro",
				"bardo",
				"cacador",
				"druida",
				"inventor",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Revoada de Texugos",
				"fonte": "GDM p. 47",
				"nota": "No compêndio, o subtipo deste poder está errado ('system.pericias.perc.bonus').",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.ut0KX9Q2RX78E58t"
			}
		],
		"obrigacoes": "Devotos de Tukala não podem trilhar os caminhos de Sszzaas; eles são proibidos de mentir ou usar qualquer forma de Enganação. Eles também são proibidos de matar texugos e outros pequenos mamíferos escavadores (incluindo carcajus, raposas, tatus e canídeos). Jamais podem negar o desejo de voar de outras criaturas, a menos que isso seja usado para a mentira ou o mal.",
		"menor": true
	},
	"ur": {
		"nome": "Ur",
		"titulo": "Deus dos Carvalhos",
		"fonte": "GDM p. 48",
		"energia": "positiva",
		"natureza": "Entidade primordial",
		"status": 3,
		"armaPreferida": "Bordão",
		"simbolo": "Um carvalho com uma face",
		"devotos": "Anões, dahllan, eiradaan, elfos, sílfides, bárbaros, caçadores, druidas.",
		"devotosLista": {
			"racas": [
				"anões",
				"dahllan",
				"eiradaan",
				"elfos",
				"sílfides"
			],
			"classes": [
				"barbaro",
				"cacador",
				"druida"
			]
		},
		"poderes": [
			{
				"nome": "Trilhas das Árvores Antigas",
				"fonte": "GDM p. 48",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.O8dtiS6nm6flNnZv"
			}
		],
		"obrigacoes": "Devotos de Ur não podem causar dano de fogo direta ou indiretamente a nenhuma criatura. Além disso, não podem descansar em nenhuma comunidade maior que uma aldeia (não perdem seus poderes, mas também não recuperam pontos de vida ou mana).",
		"menor": true
	},
	"yasshara": {
		"nome": "Yasshara",
		"titulo": "Deusa da Opressão",
		"fonte": "GDM p. 49",
		"energia": "negativa",
		"natureza": "Mortal ascendido",
		"status": 3,
		"armaPreferida": "Espada longa",
		"simbolo": "Uma balança dentro de um círculo perfeito",
		"devotos": "Anões, elfos, finntroll, minotauros, cavaleiros, guerreiros, nobres.",
		"devotosLista": {
			"racas": [
				"anões",
				"elfos",
				"finntroll",
				"minotauros"
			],
			"classes": [
				"cavaleiro",
				"guerreiro",
				"nobre"
			]
		},
		"poderes": [
			{
				"nome": "Oprimir Escolhas",
				"fonte": "GDM p. 49",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.eOQyv7YbKmctT0cy"
			}
		],
		"obrigacoes": "Devotos de Yasshara devem escolher o destino dos outros para que o mundo tenha ordem óbvia. Eles precisam garantir que, pelo menos uma vez por dia (ou por sessão de jogo, o que demorar mais), uma criatura obedeça a suas ordens. Em termos de jogo, uma ação exigindo um teste de Diplomacia ou Intimidação com CD mínima 15 + metade do seu nível. Além disso, o devoto deve estar sempre atento às tramas de Anilatir, a Deusa Menor da Inspiração, inimiga mortal de Yasshara. Por último, sempre que houver possibilidade de escolher 10 em um teste, o devoto deve fazer isso.",
		"menor": true
	},
	"zadbblein": {
		"nome": "Zadbblein",
		"titulo": "Dragoa-Rainha das Florestas",
		"fonte": "GDM p. 50",
		"energia": "negativa",
		"natureza": "Dragão-Real",
		"status": 4,
		"armaPreferida": "Bordão",
		"simbolo": "Árvore cujas folhas são escamas verdes",
		"devotos": "Centauros, dahllan, eiradaan, elfos, kallyanach, sátiros, tabrachi, trogs, arcanistas, bárbaros, caçadores, druidas, guerreiros, treinadores.",
		"devotosLista": {
			"racas": [
				"centauros",
				"dahllan",
				"eiradaan",
				"elfos",
				"kallyanach",
				"sátiros",
				"tabrachi",
				"trogs"
			],
			"classes": [
				"arcanista",
				"barbaro",
				"cacador",
				"druida",
				"guerreiro",
				"treinador"
			]
		},
		"poderes": [
			{
				"nome": "Natureza Gloriosa",
				"fonte": "GDM p. 50",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.8YAkSXbaV3Fg2x4U"
			}
		],
		"obrigacoes": "Devotos de Zadbblein devem proteger a Floresta das Escamas Verdes e não podem ferir nenhum animal ou dragão nativo dessa floresta, ou de outras florestas que sejam território de Zadbblein. Além disso, uma vez por mês, devem expandir os domínios ou a influência da Dragoa-Rainha significativamente.",
		"menor": true
	},
	"zakharov": {
		"nome": "Zakharov",
		"titulo": "Deus da Bravura",
		"fonte": "GDM p. 51",
		"energia": "qualquer",
		"natureza": "Mortal ascendido",
		"status": 4,
		"armaPreferida": "Machado anão",
		"simbolo": "Um braço segurando o machado Zakharin",
		"devotos": "Anões, centauros, golens, minotauros, trogs, bárbaros, cavaleiros, guerreiros, lutadores, paladino.",
		"devotosLista": {
			"racas": [
				"anões",
				"centauros",
				"golens",
				"minotauros",
				"trogs"
			],
			"classes": [
				"barbaro",
				"cavaleiro",
				"guerreiro",
				"lutador",
				"paladino"
			]
		},
		"poderes": [
			{
				"nome": "Irmão da Coragem",
				"fonte": "GDM p. 51",
				"uuid": "Compendium.suplementos-de-arton.guia-de-deuses-menores.Item.coIIPoIbe2EaGnUA"
			}
		],
		"obrigacoes": "Devotos de Zakharov devem fazer pelo menos uma demonstração de coragem por aventura (ou por mês, de acordo com o mestre): qualquer ato no qual o personagem possa morrer ou sofrer uma consequência grave e/ou permanente, realizado sem nenhuma preparação que garanta sua segurança (ex.: lutar sozinho contra um ogro; escalar uma montanha sem equipamento; tomar para si um item mágico que provavelmente é amaldiçoado). O mestre tem a palavra final.",
		"menor": true,
		"paladinoUnico": true
	}
};

export const REGRAS = {
	"pericias": {
		"oficioCuringa": "ofic",
		"oficios": [
			"alfa",
			"alqu",
			"arme",
			"arte",
			"cozi",
			"enge"
		],
		"nota": "Nas listas de perícias, \"ofic\" significa \"Ofício (Int)\": o jogador escolhe um dos ofícios (as chaves de PERICIAS que começam com \"Ofício:\" ou um ofício personalizado)."
	},
	"magias": {
		"escolas": {
			"abj": "Abjuração",
			"adv": "Adivinhação",
			"con": "Convocação",
			"enc": "Encantamento",
			"evo": "Evocação",
			"ilu": "Ilusão",
			"nec": "Necromancia",
			"tra": "Transmutação"
		}
	},
	"criacao": {
		"fonte": "JdA p. 16",
		"passos": [
			"Defina seus atributos",
			"Escolha sua raça",
			"Escolha sua classe",
			"Escolha sua origem",
			"Escolha sua divindade (opcional)",
			"Escolha suas perícias",
			"Anote seu equipamento (itens da origem e da classe)",
			"Magias (apenas arcanistas, bardos, clérigos e druidas)",
			"Toques finais: PV, PM, tamanho, deslocamento, Defesa, ataques, nome"
		]
	},
	"atributos": {
		"fonte": "JdA p. 17",
		"lista": [
			"for",
			"des",
			"con",
			"int",
			"sab",
			"car"
		],
		"pontos": {
			"total": 10,
			"inicial": 0,
			"custo": {
				"0": 0,
				"1": 1,
				"2": 2,
				"3": 4,
				"4": 7,
				"-1": -1
			},
			"nota": "Todos os atributos começam em 0 e você recebe 10 pontos para aumentá-los (custo na tabela). Pode reduzir um atributo para –1 para receber 1 ponto adicional. Os modificadores de raça são aplicados depois e podem passar de 4 ou ficar abaixo de –2 (JdA p. 18)."
		},
		"rolagem": {
			"dados": "4d6, descarte o menor; repita até ter seis números",
			"conversao": [
				{
					"min": null,
					"max": 7,
					"valor": -2
				},
				{
					"min": 8,
					"max": 9,
					"valor": -1
				},
				{
					"min": 10,
					"max": 11,
					"valor": 0
				},
				{
					"min": 12,
					"max": 13,
					"valor": 1
				},
				{
					"min": 14,
					"max": 15,
					"valor": 2
				},
				{
					"min": 16,
					"max": 17,
					"valor": 3
				},
				{
					"min": 18,
					"max": 18,
					"valor": 4
				}
			],
			"minimoSoma": 6,
			"nota": "Distribua os seis valores como quiser. Se os atributos não somarem pelo menos 6, role de novo o menor valor; repita até somarem 6 ou mais."
		},
		"inteligencia": "Se a Inteligência for positiva, você recebe um número de perícias treinadas igual ao valor dela; elas não precisam ser da lista da classe (JdA p. 17 e Tabela 1-3, p. 32)."
	},
	"classes": {
		"fonte": "JdA p. 32-35",
		"habilidadesIniciais": "Você começa o jogo com todas as habilidades do 1º nível da sua classe (JdA p. 33).",
		"pvPm": "1º nível: PV iniciais da classe + Constituição; a cada nível seguinte, PV por nível + Constituição (mínimo 1 PV por nível). PM: PM por nível da classe a cada nível (inclusive o 1º). A Constituição muda os PV retroativamente (JdA p. 17, 35).",
		"pericias": "Perícias treinadas: as fixas da classe (lista interna = escolha uma) + a quantidade 'escolha' entre as 'opcoes' da classe + perícias pela Inteligência (de qualquer lista) + as da origem.",
		"proficiencias": "Todos os personagens sabem usar armas simples e armaduras leves. Valores de 'proficiencias': marciais = armas marciais, escudos, pesadas = armaduras pesadas (JdA p. 32).",
		"poderes": "Cada 'Poder de <classe>' ({ poder: true }) permite escolher um poder da lista da classe, cumprindo os pré-requisitos (pode escolher no nível em que os atinge). Salvo indicação, não se escolhe o mesmo poder duas vezes. Você sempre pode substituir um poder de classe por um poder geral (JdA p. 33).",
		"convencoesNiveis": "niveis[n] traz as linhas da tabela da classe: { nome, detalhe? } = habilidade nova (detalhe = valor entre parênteses na tabela); { nome, detalhe, melhora: true } = só melhora uma habilidade já recebida (o uuid é o da habilidade-base; não adicionar outro item); { escolha: [...] } dentro de uma habilidade = opções a escolher; novo = _id em NOVOS_ITENS de scripts/migracao/classes-dados.mjs (habilidade que o compêndio não tem e o módulo cria).",
		"magias": "magias.iniciais = magias conhecidas no 1º nível; porNivel[n] = magias aprendidas ao chegar no nível n; circulos[n] = círculo máximo liberado no nível n; escolherEscolas = quantas escolas escolher (permanente); o atributo-chave é somado aos PM. Arcanista: atributo e aprendizado dependem do Caminho (magias.atributoPorCaminho, magias.caminhos).",
		"devocao": "devocao: 'obrigatoria' = a classe é devota automaticamente (JdA p. 96); devocaoRegra.divindades = chaves de DIVINDADES permitidas (null = qualquer deus maior); devocaoRegra.panteao (clérigo) / devocaoRegra.bem (paladino) = alternativa sem poder concedido.",
		"variantes": {
			"fonte": "HdA p. 22",
			"lista": {
				"arcanista": [
					"necromante"
				],
				"barbaro": [
					"machadodepedra"
				],
				"bardo": [
					"magimarcialista"
				],
				"bucaneiro": [
					"duelista"
				],
				"cacador": [
					"seteiro"
				],
				"cavaleiro": [
					"vassalo"
				],
				"clerigo": [
					"usurpador"
				],
				"druida": [
					"ermitao"
				],
				"guerreiro": [
					"inovador"
				],
				"inventor": [
					"alquimista"
				],
				"ladino": [
					"ventanista"
				],
				"lutador": [
					"atleta"
				],
				"nobre": [
					"burgues"
				],
				"paladino": [
					"santo"
				]
			},
			"substituiBase": true,
			"mesmaListaDePoderes": true,
			"contaComoBase": true,
			"multiclasseComBase": false,
			"quandoEscolher": "na criação do personagem ou ao alcançar o 1º nível da classe; não pode ser mudada depois",
			"nota": "As características e habilidades da variante substituem as da classe básica (o que não está listado não faz parte da variante). Fora isso funciona como a classe básica: usa a mesma lista de poderes (os espaços { poder: true, classe: <básica> }) e serve para cumprir pré-requisitos que exijam a classe básica. Não é possível fazer multiclasse entre uma classe básica e uma de suas variantes — para todos os efeitos são a mesma classe."
		},
		"magiasSimuladas": {
			"fonte": "HdA p. 44",
			"nota": "Habilidade não mágica que reproduz o efeito de uma magia. Segue as regras de magias, mas não conta como magia (não se beneficia de itens esotéricos e catalisadores, não exige concentração) e não se acumula com outras magias, simuladas ou não. CLASSES.ventanista.magias.simuladas = true."
		},
		"convencoes": {
			"treina": "Em uma habilidade de nível: perícias que ela torna treinadas (lista interna = escolha uma). No vassalo, se já for treinado, recebe +2 na perícia (HdA p. 43).",
			"concedePoder": "Em uma habilidade de nível: a habilidade concede um poder a escolher de uma destas listas (cavaleiro, guerreiro, nobre, geral).",
			"semProficiencia": "Proficiências básicas que a classe NÃO recebe (simples = armas simples, leves = armaduras leves).",
			"devocaoProibida": "devocao: \"proibida\" = a classe não pode ter devoção (usurpador)."
		},
		"melhorAmigo": {
			"fonte": "HdA p. 20",
			"classeTreinador": "treinador",
			"uuidFicha": "Compendium.suplementos-de-arton.herois-de-arton.Item.KakJdIEaLVDK8cci",
			"nota": "O item de classe 'Melhor Amigo' do compêndio é a ficha do parceiro, não uma classe de personagem. O melhor amigo é um parceiro iniciante com ficha completa; só fornece benefícios em alcance curto; o treinador gasta as próprias ações (e PM) com ele; usa o nível do treinador.",
			"tamanho": [
				"Pequeno",
				"Médio",
				"Grande"
			],
			"atributos": {
				"for": 1,
				"des": 1,
				"con": 1,
				"int": -4,
				"sab": 1,
				"car": 0
			},
			"pv": {
				"inicial": 16,
				"porNivel": 4
			},
			"pm": null,
			"pericias": {
				"escolha": 3,
				"opcoes": [
					"acro",
					"atle",
					"fort",
					"furt",
					"luta",
					"perc",
					"pont",
					"refl",
					"sobr",
					"vont"
				]
			},
			"defesa": "10 + Destreza + Carisma do treinador + metade do nível do treinador",
			"deslocamento": "12m (montaria: usa os deslocamentos que fornece)",
			"ataque": "uma arma natural: 1d8, crítico x2, corte, impacto ou perfuração",
			"tipos": {
				"animal": {
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.XkldgGq0BBXziobr",
					"nota": "+1 For, Des e Sab; faro, visão na penumbra; treinado em Percepção e Sobrevivência; +1 na margem de ameaça das armas naturais"
				},
				"construto": {
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.ej8EjdEvTBSbVdAJ",
					"nota": "+2 Con; visão no escuro; imune a cansaço, metabolismo e veneno"
				},
				"espirito": {
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.oC06zMFqAewzRLj9",
					"nota": "+1 Sab e Car; forma incorpórea Minúscula de energia positiva ou negativa"
				},
				"monstro": {
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.R4AgIOYM4v9w4abS",
					"nota": "+1 For e Des; visão no escuro; segunda arma natural"
				},
				"mortoVivo": {
					"uuid": "Compendium.suplementos-de-arton.herois-de-arton.Item.TgnP9tUsVFA4sc73",
					"nota": "+2 Con; visão no escuro; imune a cansaço, metabolismo, trevas e veneno"
				}
			},
			"truques": "Começa com 2 e ganha 1 a cada três níveis de treinador (ver CLASSES.treinador.niveis). Os truques estão no pacote herois-de-arton com subtipo 'Melhor Amigo'.",
			"equipamento": "não empunha nem carrega itens; pode vestir até dois itens adequados"
		},
		"devocaoAmpla": {
			"fonte": "DdA p. 11",
			"nota": "Nova regra: clérigos e frades do Panteão, druidas de Arton e paladinos do bem não recebem poderes concedidos; em compensação, por sua devoção ampla, recebem +2 PM por patamar."
		},
		"frade": {
			"fonte": "DdA p. 38-41",
			"sacrarios": "Alguns poderes de frade são sacrários: criar gasta ação padrão e 3 PM; esfera de 3m de raio em alcance curto; dura a cena; número de sacrários ativos igual à Sabedoria.",
			"domDaRessurreicao": "O poder concedido Dom da Ressurreição (clérigos) também pode ser escolhido por frades de Thyatis."
		}
	},
	"niveis": {
		"fonte": "JdA p. 33-35",
		"xp": {
			"1": 0,
			"2": 1000,
			"3": 3000,
			"4": 6000,
			"5": 10000,
			"6": 15000,
			"7": 21000,
			"8": 28000,
			"9": 36000,
			"10": 45000,
			"11": 55000,
			"12": 66000,
			"13": 78000,
			"14": 91000,
			"15": 105000,
			"16": 120000,
			"17": 136000,
			"18": 153000,
			"19": 171000,
			"20": 190000
		},
		"subir": "Ao subir de nível: (1) PV e PM aumentam conforme a classe (soma a Constituição aos PV, mínimo 1 PV); (2) ganha todas as habilidades do nível alcançado na tabela da classe; (3) o bônus em perícias é metade do nível (aumenta a cada nível par).",
		"patamares": {
			"iniciante": [
				1,
				4
			],
			"veterano": [
				5,
				10
			],
			"campeao": [
				11,
				16
			],
			"lenda": [
				17,
				20
			]
		},
		"nivelMaximo": 20
	},
	"multiclasse": {
		"fonte": "JdA p. 35",
		"regra": "Ao subir de nível, você pode escolher outra classe.",
		"pv": "No primeiro nível de uma nova classe você ganha os PV de um nível subsequente (PV por nível), não os PV iniciais.",
		"pm": "Some os PM fornecidos por cada classe.",
		"periciasProficiencias": "No primeiro nível de uma nova classe você não ganha as perícias treinadas nem as proficiências dela.",
		"niveis": "Nível de classe = níveis em uma classe; nível de personagem = soma dos níveis de todas as classes.",
		"variantes": "Não há multiclasse entre uma classe básica e suas variantes (ver classes.variantes).",
		"devocao": "Ver divindades.devocao.multiclasse."
	},
	"equipamentoInicial": {
		"fonte": "JdA p. 140",
		"itens": [
			"Os itens da origem.",
			"Uma mochila, um saco de dormir e um traje de viajante.",
			"Uma arma simples a sua escolha; se tiver proficiência com armas marciais, também uma arma marcial a sua escolha.",
			"Uma armadura de couro, couro batido ou gibão de peles a sua escolha; com proficiência em armaduras pesadas pode começar com uma brunea em vez disso; com proficiência em escudos, também um escudo leve. Exceção: arcanistas começam sem armadura.",
			"T$ 4d6."
		],
		"dinheiroInicial": {
			"1": "4d6",
			"2": 300,
			"3": 600,
			"4": 1000,
			"5": 2000,
			"6": 3000,
			"7": 5000,
			"8": 7000,
			"9": 10000,
			"10": 13000,
			"11": 19000,
			"12": 27000,
			"13": 36000,
			"14": 49000,
			"15": 66000,
			"16": 88000,
			"17": 110000,
			"18": 150000,
			"19": 200000,
			"20": 260000
		},
		"nota": "Personagens acima do 1º nível começam com o dinheiro da Tabela 3-1 (valores em T$). Itens de classe extras (Protótipo do inventor, Espólio do nobre, Laboratório Pessoal do alquimista etc.) estão na nota de cada classe."
	},
	"oficios": {
		"fonte": "JdA p. 121",
		"nota": "Ofício são várias perícias diferentes: armeiro (armas, armaduras e escudos), artesão (equipamento de aventura, ferramentas, esotéricos e veículos), alquimista (alquímicos), cozinheiro (alimentação), alfaiate (vestuário). Pode-se inventar outros (carpinteiro, pedreiro, ourives, fazendeiro, pescador, estalajadeiro, escriba, escultor, pintor...) combinando os usos com o mestre. O sistema tem ainda Ofício (engenhoqueiro), usado pelo inventor."
	},
	"divindades": {
		"devocao": {
			"fonte": "JdA p. 96",
			"quando": "Na construção do personagem ou sempre que subir de nível. Só uma devoção, e não pode mudá-la (exceto a critério do mestre). Clérigos, druidas e paladinos são devotos automaticamente.",
			"quemPode": "A raça ou a classe do personagem deve estar na lista 'Devotos' do deus. Humanos e clérigos podem ser devotos de qualquer divindade.",
			"beneficio": "Ao se tornar devoto, recebe 1 poder concedido à escolha da lista do deus e passa a seguir as Obrigações & Restrições dele.",
			"poderesExtras": "Poderes concedidos são um grupo de poderes gerais (JdA p. 124: 'sempre que você recebe um poder de classe, pode trocá-lo por um poder geral'); têm como pré-requisito ser devoto de um dos deuses indicados e o atributo-chave deles é Sabedoria (JdA p. 132). Assim, o devoto pode pegar outros poderes da lista do seu deus no lugar de poderes de classe.",
			"violacao": "Se violar as Obrigações & Restrições, perde todos os PM e só pode recuperá-los a partir do próximo dia. Se violar de novo na mesma aventura, perde todos os PM e não pode recuperá-los até fazer uma penitência (perícia Religião: sacrifício de T$ 100 por nível de personagem do devoto ou missão sagrada, a critério do mestre; JdA p. 122).",
			"multiclasse": "Em classes com listas de devoções permitidas, a classe com menos opções determina a que deve ser seguida (isso permite mudar uma devoção anterior). Se não houver devoção compatível, a multiclasse não pode ser feita.",
			"canalizarEnergia": "Tipo de energia que a divindade canaliza. Devotos de deuses com energia 'qualquer' escolhem positiva ou negativa (uma vez feita, a escolha não pode ser mudada). (JdA p. 96)",
			"armaPreferida": "Arma típica dos devotos, importante para certas habilidades e magias. (JdA p. 96)"
		},
		"classesDivinas": {
			"fonte": "JdA p. 57, 61, 82; DdA p. 11, 24-28, 34",
			"clerigo": "Devoto Fiel: devoto de um deus maior (qualquer), recebe 2 poderes concedidos em vez de 1. Alternativa: cultuar o Panteão — nenhum poder concedido; única O&R é não usar armas cortantes ou perfurantes; arma preferida maça; escolhe energia positiva ou negativa (permanente). (JdA p. 57)",
			"druida": "Devoto Fiel: devoto de um deus disponível para druidas (Allihanna, Megalokk ou Oceano no JdA p. 61), recebe 2 poderes concedidos em vez de 1. Deuses de Arton (p. 24-27) acrescenta druidas de Aharadak e de Tenebra (mesmas O&R do devoto do deus, com acesso aos poderes concedidos) e o druida de Arton (não é devotado a um único deus nem tem poderes concedidos; O&R: nunca matar ou destruir seres que não ameaçam sua sobrevivência ou a de seus aliados; arma preferida foice; conta como devoção).",
			"paladino": "Abençoado: devoto de um deus disponível para paladinos (Azgher, Khalmyr, Lena, Lin-Wu, Marah, Tanna-Toh, Thyatis, Valkaria), recebe 2 poderes concedidos em vez de 1. Alternativa: paladino do bem — nenhum poder concedido, nenhuma O&R além do Código do Herói; conta como devoção. (JdA p. 82; DdA p. 28 confirma a lista)",
			"frade": "Clérigos e frades são livres para escolher qualquer divindade como padroeira, não importando a raça. (DdA p. 34)",
			"devocaoAmpla": "Nova regra (DdA p. 11): clérigos e frades do Panteão, druidas de Arton e paladinos do bem não recebem poderes concedidos; em compensação recebem +2 PM por patamar.",
			"fundamentalista": "Opcional (DdA p. 11): um fundamentalista recebe um poder concedido adicional, mas segue também os dogmas do seu deus/classe e usa apenas a arma preferida; violar dogma = perde PM e habilidades de classe divina até o dia seguinte; segunda violação na aventura exige penitência imposta por outro fundamentalista. Devotos de outras classes escolhem o dogma de clérigo/druida/frade/paladino."
		},
		"devotosDdA": {
			"fonte": "DdA p. 34",
			"racasLivres": "Humanos, meios-elfos, meios-orcs, minauros, moreau e finntroll (Ameaças de Arton) podem escolher qualquer divindade. Membros de outras raças podem ser devotos quando a raça aparece na lista do deus, não importando a classe. Exceção: suraggel sempre podem ser devotos da divindade relacionada a sua herança planar.",
			"classes": "Clérigos e frades escolhem qualquer divindade. Druidas e paladinos são restritos aos deuses listados em suas habilidades de classe. Outras classes podem ser devotas quando a classe aparece na lista do deus, não importando a raça. Exceção: feiticeiros abençoados sempre podem ser devotos do deus de sua herança de linhagem.",
			"nota": "Cada divindade maior tem 'devotosDdA' com as listas atualizadas (inclui raças de Ameaças de Arton e Heróis de Arton). A lista do JdA fica em 'devotos'/'devotosLista'."
		},
		"menores": {
			"fonte": "DdA p. 228-233; GDM p. 2-4",
			"devotos": "Todos os deuses menores podem ter clérigos e frades. Conforme suas naturezas, também podem ter druidas e paladinos, bem como aceitar devotos de outras raças ou classes (a lista 'Devotos' de cada um).",
			"poderConcedido": "Cada deus menor oferece um único poder concedido. Para devotos de classes divinas (que normalmente teriam dois poderes concedidos), em vez do segundo poder o devoto recebe PM adicionais iguais a 1 + o status divino do deus, limitados por seu nível.",
			"circulos": "Devotos de deuses menores em classes conjuradoras divinas (clérigos, druidas, frades...) só podem aprender e lançar magias até o círculo máximo que seu deus oferece, mesmo que o nível permita mais. (Não achei nos textos uma tabela de círculo máximo por status; fica a critério do mestre.)",
			"paladinoUnico": "Um deus menor que aceite paladinos pode ter apenas um paladino por vez (o paladino único); nas listas aparece como 'paladino' ou 'paladino (único)'.",
			"status": "Status divino de 1 a 5 (acima de 5 = deus maior).",
			"deusesMortos": "Vários deuses menores do GDM estão mortos na época atual (muitos na Batalha de Tamu-ra). O GDM (p. 52-53) sugere jogar numa época anterior (todos vivos durante A Libertação de Valkaria), ressuscitá-los, ou ter um novo deus que assume o portfólio — a critério do mestre.",
			"proibidos": "Sartan não é permitido para jogadores (GDM p. 41)."
		}
	},
	"origens": {
		"fonte": "JdA p. 85",
		"umaOrigem": "O personagem tem uma única origem. As origens de Heróis de Arton (tipo \"especial\") e do Atlas de Arton (tipo \"regional\") são escolhidas no lugar da origem comum (HdA p. 46; Atlas p. 470).",
		"itens": "Você começa com todos os itens descritos na linha \"Itens\" de sua origem sem pagar por eles (JdA p. 85). Vale também para as especiais e regionais (\"use as mesmas regras de origens\", Atlas p. 470).",
		"tipos": {
			"basica": {
				"fonte": "JdA p. 85",
				"regra": "Cada origem tem uma lista de benefícios com perícias e poderes gerais. Escolha dois benefícios da lista: duas perícias, dois poderes ou uma perícia e um poder. Se preferir regras mais rápidas, escolha apenas perícias.",
				"pericia": "Você se torna treinado na perícia escolhida.",
				"poder": "Você recebe o poder escolhido, mas ainda precisa cumprir seus pré-requisitos.",
				"unico": "Cada origem tem um poder exclusivo (campo unico). Ele pode ser escolhido como um de seus dois benefícios. Apenas personagens com essa origem podem escolher esse poder.",
				"campos": "pericias + poderes + poderesEscolha + unico formam a lista de opções; o jogador escolhe 2 no total.",
				"excecao": "amnesico: em vez de dois benefícios da lista, recebe uma perícia e um poder escolhidos pelo mestre e o poder Lembranças Graduais (campo beneficioEspecial)."
			},
			"especial": {
				"fonte": "HdA p. 46",
				"regra": "Origens ligadas a lugares, organizações ou eventos específicos de Arton. Você pode escolher uma delas (no lugar de sua origem comum) se sua história estiver de alguma forma ligada aos elementos dessa origem. Em vez de uma lista, fornecem um benefício único e fixo.",
				"campos": "Não há escolha de dois benefícios: o personagem recebe tudo. pericias = perícias em que o benefício treina; poderes = poderes que o benefício concede ({ escolha } = escolha um); beneficio = resumo do texto; unico = poder do compêndio (subtipo \"Mundana\" no pacote herois-de-arton) que contém o benefício."
			},
			"regional": {
				"fonte": "Atlas p. 470",
				"regra": "Origens relacionadas a um reino ou região de Arton. Você pode escolher uma delas (no lugar de sua origem comum) se for nativo desse local ou tiver passado os seus anos formativos lá. Fornecem um benefício único, característico do local. Para os demais efeitos, use as mesmas regras de origens.",
				"campos": "Iguais aos de \"especial\"; regiao = região (ou lista de regiões) da Tabela: Origens Regionais (Atlas p. 472-473), que é o requisito de escolha. unico = poder do compêndio (pacote atlas-de-arton, subtipo = região)."
			}
		},
		"periciaRepetida": "Origens especiais e regionais: se o benefício incluir treinamento em uma perícia na qual você já seja treinado, você pode ser treinado em outra perícia de classe (HdA p. 46; Atlas p. 470).",
		"acumulo": "Origens especiais e regionais: efeitos de origens contam como efeitos de habilidades para fins de acúmulo (HdA p. 46; Atlas p. 470).",
		"personalizar": "Sua Própria Origem (JdA p. 95): negociando com o mestre, o jogador pode trocar perícias, itens ou poderes de uma origem (ex.: trocar Vontade por Intuição no Curandeiro) ou inventar uma origem nova.",
		"camposComuns": {
			"pericias": "Chaves de PERICIAS. \"ofic\" = um Ofício; se a origem nomeia um Ofício que não existe no sistema, ele vem em \"oficio\" (ex.: fazendeiro, minerador, barbeiro) e o assistente deve criar esse Ofício personalizado.",
			"poderesEscolha": "Cada entrada é uma opção de benefício que vale um poder qualquer do(s) grupo(s) indicado(s) (combate, tormenta, geral, classe) cujos pré-requisitos o personagem cumpra; o texto diz as restrições.",
			"itens.categoria": "Item genérico a escolher (\"uma arma marcial\", \"um item de até T$ 100\"): não há item único no compêndio.",
			"itens.dinheiro": "Tibares que a origem dá (número ou fórmula de dados, ex.: \"2d6\").",
			"itens.animal": "Animal ou montaria (cão, cavalo, trobo, grifo...): não é um item dos compêndios.",
			"itens.escolha": "Escolha um dos itens da lista.",
			"proficiencias": "Proficiências concedidas pelo benefício (texto curto).",
			"atributo": "Aumento de atributo concedido pelo benefício (1 = +1 num atributo à escolha)."
		}
	}
};
