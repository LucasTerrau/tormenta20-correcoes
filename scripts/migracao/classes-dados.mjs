/**
 * Gerado por dev/gerar-classes.mjs a partir da varredura das classes do Jogo do Ano. Não editar à mão.
 * - CORRECOES: efeitos de habilidades de classe com número ou condição errados (Redução de Dano do
 *   Bárbaro, Ataque Furtivo, Golpe Cruel e Violento, Casca Grossa, Braços Calejados, Escudeiro, Couraceiro).
 * - REQUER: efeitos que só valem com certa armadura, escudo ou arma.
 * - PROGRESSAO: habilidades fixas de cada classe por nível (oferecidas ao subir de nível).
 * - NOVOS_ITENS: habilidades do livro que faltam no compêndio (Caminho do Arcanista, Caminho do
 *   Cavaleiro, Bênção da Justiça).
 */
export const CORRECOES = [
	{
		"id": "CMsmsKiFKpZTgQtB",
		"nome": "Redução de Dano",
		"efeitos": {
			"XbsFbC7qjVcrI7pR": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"value": "min(10, max(0, floor((@nvl.barbaro - 5)/3) * 2 + 2))",
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		},
		"patch": {},
		"novos": []
	},
	{
		"id": "sE4mWoW3zqLZaCYC",
		"nome": "Ataque Furtivo",
		"efeitos": {},
		"patch": {
			"system.rolls": [
				{
					"name": "Dano",
					"key": "dano0",
					"type": "dano",
					"parts": [
						[
							"(ceil(@nvl.ladino/2))d6",
							"dano",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			]
		},
		"novos": []
	},
	{
		"id": "fVPH9kywOoQ7eluT",
		"nome": "Golpe Cruel",
		"efeitos": {
			"kuBUsLlfmuPsxJDc": {
				"system": {
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [
							"Ataque desarmado"
						],
						"types": []
					}
				}
			}
		},
		"patch": {},
		"novos": []
	},
	{
		"id": "lMQD3zWlwjng6Fty",
		"nome": "Golpe Violento",
		"efeitos": {
			"5y66S2WngfbuhUzd": {
				"system": {
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [
							"Ataque desarmado"
						],
						"types": []
					}
				}
			}
		},
		"patch": {},
		"novos": []
	},
	{
		"id": "ONGux7IwKSsKy383",
		"nome": "Casca Grossa",
		"efeitos": {
			"ZtVtzd6WvSsYwFMK": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"value": "(min(@nivel, @con))",
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		},
		"patch": {},
		"novos": [
			{
				"_id": "t20cCascaGrossa4",
				"name": "Casca Grossa (+1 a cada 4 níveis)",
				"img": "systems/tormenta20/icons/poderes/classes/combatentes/casca-grossa.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"parteDaHabilidade": true
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": false,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"value": "(max(0, floor((@nvl.lutador - 3)/4)))",
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			}
		]
	},
	{
		"id": "iKlZxO8G4GFO5HlO",
		"nome": "Braços Calejados",
		"efeitos": {
			"JoMUslyL4JPQhvHn": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"value": "(min(@nivel, @for))",
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		},
		"patch": {},
		"novos": []
	},
	{
		"id": "IUNGyJZZyiwAevJ6",
		"nome": "Escudeiro",
		"efeitos": {
			"mLZJ8cLwZwEX85OA": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.dano.cac",
							"value": 1,
							"priority": null,
							"type": "add",
							"phase": "initial"
						},
						{
							"key": "system.modificadores.dano.ad",
							"value": 1,
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		},
		"patch": {},
		"novos": [
			{
				"_id": "t20cEscudeiroDef",
				"name": "Escudeiro (armadura +1)",
				"img": "systems/tormenta20/icons/classes/cavaleiro.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.IUNGyJZZyiwAevJ6",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"requerArmadura": "qualquer"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": false,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"value": 1,
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			}
		]
	},
	{
		"id": "XbndSZpX3PC0tiWv",
		"nome": "Couraceiro",
		"efeitos": {
			"7th2Z9Rheq6XuBUb": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.atributo",
							"value": "int",
							"priority": null,
							"type": "override",
							"phase": "initial"
						}
					]
				}
			}
		},
		"patch": {},
		"novos": []
	},
	{
		"id": "PmIU9RUwNQRtI4UU",
		"nome": "Força da Natureza",
		"efeitos": {
			"9f3F2AXNifxpkNxb": {
				"system": {
					"abilityUse": {
						"automatic": true
					}
				}
			}
		},
		"patch": {},
		"novos": [
			{
				"_id": "t20cForcaNatur02",
				"name": "Força da Natureza: em terreno natural (dobro)",
				"img": "systems/tormenta20/icons/poderes/classes/conjuradores/forca-da-natureza.webp",
				"type": "base",
				"transfer": true,
				"disabled": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": -2,
						"names": [],
						"types": [
							"spell"
						]
					},
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"classe": true
					}
				}
			}
		]
	}
];

export const REQUER = [
	{
		"id": "KFGQMJDKyccD7Fie",
		"nome": "Especialização em Armadura (Guerreiro)",
		"efeito": "92BaZGglROJpXZ7I",
		"armadura": "pesada"
	},
	{
		"id": "KPN2DuNAQZ7ncCnb",
		"nome": "Especialização em Armadura (Cavaleiro)",
		"efeito": "MqpnREw0KeLnVlma",
		"armadura": "pesada"
	},
	{
		"id": "mEWpEEjrXP2q7sxI",
		"nome": "Pele de Ferro",
		"efeito": "jSLCo4ANqTrExqod",
		"armadura": "semPesada"
	},
	{
		"id": "1WIJH1LhIqUxQPfQ",
		"nome": "Pele de Aço",
		"efeito": "rMyFCUlet6vafSxi",
		"armadura": "semPesada"
	},
	{
		"id": "ONGux7IwKSsKy383",
		"nome": "Casca Grossa",
		"efeito": "ZtVtzd6WvSsYwFMK",
		"armadura": "semPesada"
	},
	{
		"id": "i98ipNXoK3Uw17HX",
		"nome": "Esquiva Sagaz",
		"efeito": "qpSrtUIVTUtWEQwF",
		"armadura": "semPesada"
	},
	{
		"id": "pCXbUTE2qivVEe37",
		"nome": "Insolência",
		"efeito": "NyHxPzqyy6vT5pwg",
		"armadura": "semPesada"
	},
	{
		"id": "iKlZxO8G4GFO5HlO",
		"nome": "Braços Calejados",
		"efeito": "JoMUslyL4JPQhvHn",
		"armadura": "nenhuma"
	},
	{
		"id": "IUNGyJZZyiwAevJ6",
		"nome": "Escudeiro",
		"efeito": "t20cEscudeiroDef",
		"armadura": "qualquer"
	},
	{
		"id": "XbndSZpX3PC0tiWv",
		"nome": "Couraceiro",
		"efeito": "7th2Z9Rheq6XuBUb",
		"armadura": "qualquer"
	},
	{
		"id": "IWpWSfSXeQbEPw4Z",
		"nome": "Blindagem",
		"efeito": "okKdUuTe3Potb7fU",
		"armadura": "pesada"
	},
	{
		"id": "VQMc6Kc7AwsT2ab7",
		"nome": "Encouraçado",
		"efeito": "GXVs0iml2rfBR3UV",
		"armadura": "pesada"
	},
	{
		"id": "5Ti6oLK8wRgjLWcM",
		"nome": "Inexpugnável",
		"efeito": "oIYXRlRRgP8hH5ZD",
		"armadura": "pesada"
	},
	{
		"id": "lno7NNNEUJJhhMZO",
		"nome": "Fanático",
		"efeito": "L2MdRZH3u7EMow0O",
		"armadura": "pesada"
	},
	{
		"id": "jnejEG7oaQrHKlCG",
		"nome": "Estilo de Arma e Escudo",
		"efeito": "dUOu223E4E9DnIvd",
		"armadura": "escudo"
	},
	{
		"id": "29020onqtdmtOG3B",
		"nome": "Escaramuça",
		"efeito": "RljUcWz5cgr5VS4v",
		"armadura": "semPesada"
	},
	{
		"id": "29020onqtdmtOG3B",
		"nome": "Escaramuça",
		"efeito": "17v216RYpe8ojpCM",
		"armadura": "semPesada"
	},
	{
		"id": "29020onqtdmtOG3B",
		"nome": "Escaramuça",
		"efeito": "EsGPMLrJ2luG7yaR",
		"armadura": "semPesada"
	},
	{
		"id": "3AyZ8AOGrzH0rHMw",
		"nome": "Reptiliano",
		"efeito": "EUk9D2pS6pcnFvTh",
		"armadura": "nenhuma"
	},
	{
		"id": "aeXR1kOB1PZt2sUL",
		"nome": "Estilo de Duas Mãos",
		"efeito": "BBiO7aceLqeW90k2",
		"arma": "duasMaos"
	},
	{
		"id": "1exB4BFKdPWFOZwV",
		"nome": "Estilo de Uma Arma",
		"efeito": "B4V2txyvBXZ3Goeh",
		"arma": "umaArma"
	},
	{
		"id": "1exB4BFKdPWFOZwV",
		"nome": "Estilo de Uma Arma",
		"efeito": "Wij2VWKxiQ6INLzR",
		"arma": "umaArma"
	},
	{
		"id": "4kjvx9DHlb04ImrO",
		"nome": "Esgrimista (Guerreiro)",
		"efeito": "FbymAeL2o4yUHWmv",
		"arma": "leveOuAgil"
	},
	{
		"id": "RhzORvHf916ajwbI",
		"nome": "Esgrimista (Bucaneiro)",
		"efeito": "5uPPI51yOtcI9zvZ",
		"arma": "leveOuAgil"
	},
	{
		"id": "EMramxpu1YogEN9u",
		"nome": "Pistoleiro",
		"efeito": "EWSJevpTx4qOEJKx",
		"arma": "fogo"
	}
];

export const PROGRESSAO = {
	"arcanista": [
		{
			"nivel": 1,
			"nome": "Caminho do Arcanista",
			"novo": "t20cCamArcanista"
		},
		{
			"nivel": 1,
			"nome": "Magias (Arcanista)",
			"uuid": "Compendium.tormenta20.poderes.Item.h9AyRa8MIyNyhBen"
		},
		{
			"nivel": 20,
			"nome": "Alta Arcana",
			"uuid": "Compendium.tormenta20.poderes.Item.rZ6PYYmxg4z2Q3I7"
		}
	],
	"barbaro": [
		{
			"nivel": 1,
			"nome": "Fúria",
			"uuid": "Compendium.tormenta20.poderes.Item.5WrlYKOHYLWpI9jD"
		},
		{
			"nivel": 3,
			"nome": "Instinto Selvagem",
			"uuid": "Compendium.tormenta20.poderes.Item.U6Op7yMmr16WMRRY"
		},
		{
			"nivel": 5,
			"nome": "Redução de Dano",
			"uuid": "Compendium.tormenta20.poderes.Item.CMsmsKiFKpZTgQtB"
		},
		{
			"nivel": 20,
			"nome": "Fúria Titânica",
			"uuid": "Compendium.tormenta20.poderes.Item.fuzKiQyprFslFK41"
		}
	],
	"bardo": [
		{
			"nivel": 1,
			"nome": "Inspiração",
			"uuid": "Compendium.tormenta20.poderes.Item.Uv6GW8R54wUtv3sm"
		},
		{
			"nivel": 1,
			"nome": "Magias (Bardo)",
			"uuid": "Compendium.tormenta20.poderes.Item.5i2hWzYKWOjGtnyA"
		},
		{
			"nivel": 2,
			"nome": "Eclético",
			"uuid": "Compendium.tormenta20.poderes.Item.3EgQ8dXJNByFCZI6"
		},
		{
			"nivel": 20,
			"nome": "Artista Completo",
			"uuid": "Compendium.tormenta20.poderes.Item.6BsXApytiJlmZBxV"
		}
	],
	"bucaneiro": [
		{
			"nivel": 1,
			"nome": "Audácia",
			"uuid": "Compendium.tormenta20.poderes.Item.YmeB9GgmcJ54D9WU"
		},
		{
			"nivel": 1,
			"nome": "Insolência",
			"uuid": "Compendium.tormenta20.poderes.Item.pCXbUTE2qivVEe37"
		},
		{
			"nivel": 2,
			"nome": "Evasão (Bucaneiro)",
			"uuid": "Compendium.tormenta20.poderes.Item.1aHAxGnkuTaaBJDx"
		},
		{
			"nivel": 3,
			"nome": "Esquiva Sagaz",
			"uuid": "Compendium.tormenta20.poderes.Item.i98ipNXoK3Uw17HX"
		},
		{
			"nivel": 5,
			"nome": "Panache",
			"uuid": "Compendium.tormenta20.poderes.Item.as8J99HTbAAOFVNA"
		},
		{
			"nivel": 10,
			"nome": "Evasão Aprimorada (Bucaneiro)",
			"uuid": "Compendium.tormenta20.poderes.Item.SDSlkLynTwwAZkjR"
		},
		{
			"nivel": 20,
			"nome": "Sorte do Louco",
			"uuid": "Compendium.tormenta20.poderes.Item.S1Rj3QDTfM8qytad"
		}
	],
	"cacador": [
		{
			"nivel": 1,
			"nome": "Marca da Presa",
			"uuid": "Compendium.tormenta20.poderes.Item.KCcnANguX0TehmNR"
		},
		{
			"nivel": 1,
			"nome": "Rastreador",
			"uuid": "Compendium.tormenta20.poderes.Item.DRmhP15LqKyO9c4u"
		},
		{
			"nivel": 3,
			"nome": "Explorador",
			"uuid": "Compendium.tormenta20.poderes.Item.756GKQn2ux8mAugb"
		},
		{
			"nivel": 5,
			"nome": "Caminho do Explorador",
			"uuid": "Compendium.tormenta20.poderes.Item.5tqYhzofvjgcBHGj"
		},
		{
			"nivel": 20,
			"nome": "Mestre Caçador",
			"uuid": "Compendium.tormenta20.poderes.Item.fhHEWWNgKxS4xUal"
		}
	],
	"cavaleiro": [
		{
			"nivel": 1,
			"nome": "Baluarte",
			"uuid": "Compendium.tormenta20.poderes.Item.B7Bn9sW2pPs3xc77"
		},
		{
			"nivel": 1,
			"nome": "Código de Honra",
			"uuid": "Compendium.tormenta20.poderes.Item.kVmOn7TQXvedO40o"
		},
		{
			"nivel": 2,
			"nome": "Duelo",
			"uuid": "Compendium.tormenta20.poderes.Item.oEVsmhWuBhpcXALl"
		},
		{
			"nivel": 5,
			"nome": "Caminho do Cavaleiro",
			"novo": "t20cCamCavaleiro"
		},
		{
			"nivel": 11,
			"nome": "Resoluto",
			"uuid": "Compendium.tormenta20.poderes.Item.PANeuipqdolT72aq"
		},
		{
			"nivel": 20,
			"nome": "Bravura Final",
			"uuid": "Compendium.tormenta20.poderes.Item.5bBcVLtoh86nEYuS"
		}
	],
	"clerigo": [
		{
			"nivel": 1,
			"nome": "Devoto Fiel (Clérigo)",
			"uuid": "Compendium.tormenta20.poderes.Item.VPqDSTuhkXo58XzA"
		},
		{
			"nivel": 1,
			"nome": "Magias (Clérigo)",
			"uuid": "Compendium.tormenta20.poderes.Item.cgYwUcWVGrsAqVWF"
		},
		{
			"nivel": 20,
			"nome": "Mão da Divindade",
			"uuid": "Compendium.tormenta20.poderes.Item.zIcI0vQGjAj1uCm0"
		}
	],
	"druida": [
		{
			"nivel": 1,
			"nome": "Devoto Fiel (Druida)",
			"uuid": "Compendium.tormenta20.poderes.Item.a2c1cG5wrgJDHoKr"
		},
		{
			"nivel": 1,
			"nome": "Empatia Selvagem (Druida)",
			"uuid": "Compendium.tormenta20.poderes.Item.vOXQtd4cC7bbh6u4"
		},
		{
			"nivel": 1,
			"nome": "Magias (Druida)",
			"uuid": "Compendium.tormenta20.poderes.Item.EIM4Ph8h4v1WdLT4"
		},
		{
			"nivel": 2,
			"nome": "Caminho dos Ermos",
			"uuid": "Compendium.tormenta20.poderes.Item.lItROoF5BIshKjat"
		},
		{
			"nivel": 20,
			"nome": "Força da Natureza",
			"uuid": "Compendium.tormenta20.poderes.Item.PmIU9RUwNQRtI4UU"
		}
	],
	"guerreiro": [
		{
			"nivel": 1,
			"nome": "Ataque Especial",
			"uuid": "Compendium.tormenta20.poderes.Item.pO3Qh76K5lm9ukXH"
		},
		{
			"nivel": 3,
			"nome": "Durão",
			"uuid": "Compendium.tormenta20.poderes.Item.VTzVqjsiOsECTkM1"
		},
		{
			"nivel": 6,
			"nome": "Ataque Extra",
			"uuid": "Compendium.tormenta20.poderes.Item.fhV9WO6UwhpmOgBS"
		},
		{
			"nivel": 20,
			"nome": "Campeão",
			"uuid": "Compendium.tormenta20.poderes.Item.j9JP0cwZtKXHek0D"
		}
	],
	"inventor": [
		{
			"nivel": 1,
			"nome": "Engenhosidade (Inventor)",
			"uuid": "Compendium.tormenta20.poderes.Item.P29KKQdQdwTCVuTj"
		},
		{
			"nivel": 1,
			"nome": "Protótipo",
			"uuid": "Compendium.tormenta20.poderes.Item.mu98bcBwZDZbWNcC"
		},
		{
			"nivel": 2,
			"nome": "Fabricar Item Superior",
			"uuid": "Compendium.tormenta20.poderes.Item.Aj3ZiNCirzOhyOcG"
		},
		{
			"nivel": 3,
			"nome": "Comerciante",
			"uuid": "Compendium.tormenta20.poderes.Item.PTc85fan1L3fbGlM"
		},
		{
			"nivel": 7,
			"nome": "Encontrar Fraqueza",
			"uuid": "Compendium.tormenta20.poderes.Item.SW7dLug114XX3Mer"
		},
		{
			"nivel": 9,
			"nome": "Fabricar Item Mágico",
			"uuid": "Compendium.tormenta20.poderes.Item.ezYAnyUMkw6hf8iD"
		},
		{
			"nivel": 10,
			"nome": "Olho de Dragão",
			"uuid": "Compendium.tormenta20.poderes.Item.dehNb66kOtwgAiB5"
		},
		{
			"nivel": 20,
			"nome": "Obra-Prima",
			"uuid": "Compendium.tormenta20.poderes.Item.QwVGkwCRe33OTz2v"
		}
	],
	"ladino": [
		{
			"nivel": 1,
			"nome": "Ataque Furtivo",
			"uuid": "Compendium.tormenta20.poderes.Item.sE4mWoW3zqLZaCYC"
		},
		{
			"nivel": 1,
			"nome": "Especialista",
			"uuid": "Compendium.tormenta20.poderes.Item.08Or2dxtMBSLKVHW"
		},
		{
			"nivel": 2,
			"nome": "Evasão (Ladino)",
			"uuid": "Compendium.tormenta20.poderes.Item.HGh7ECxVmjfrdd8u"
		},
		{
			"nivel": 4,
			"nome": "Esquiva Sobrenatural (Ladino)",
			"uuid": "Compendium.tormenta20.poderes.Item.iK1tC8jN9AnZI3Bo"
		},
		{
			"nivel": 8,
			"nome": "Olhos nas Costas",
			"uuid": "Compendium.tormenta20.poderes.Item.v3Vruwa4uFKSL0UJ"
		},
		{
			"nivel": 10,
			"nome": "Evasão Aprimorada (Ladino)",
			"uuid": "Compendium.tormenta20.poderes.Item.feeuIYbp7Pv7E8Db"
		},
		{
			"nivel": 20,
			"nome": "A Pessoa Certa para o Trabalho",
			"uuid": "Compendium.tormenta20.poderes.Item.5KE43Jef0bsueKX7"
		}
	],
	"lutador": [
		{
			"nivel": 1,
			"nome": "Briga",
			"uuid": "Compendium.tormenta20.poderes.Item.1gvsbH8ljOuhBdKM"
		},
		{
			"nivel": 1,
			"nome": "Golpe Relâmpago",
			"uuid": "Compendium.tormenta20.poderes.Item.tf5KggNQBbBIeXUs"
		},
		{
			"nivel": 3,
			"nome": "Casca Grossa",
			"uuid": "Compendium.tormenta20.poderes.Item.ONGux7IwKSsKy383"
		},
		{
			"nivel": 5,
			"nome": "Golpe Cruel",
			"uuid": "Compendium.tormenta20.poderes.Item.fVPH9kywOoQ7eluT"
		},
		{
			"nivel": 9,
			"nome": "Golpe Violento",
			"uuid": "Compendium.tormenta20.poderes.Item.lMQD3zWlwjng6Fty"
		},
		{
			"nivel": 20,
			"nome": "Dono da Rua",
			"uuid": "Compendium.tormenta20.poderes.Item.SfRiFzM5mEcxWtew"
		}
	],
	"nobre": [
		{
			"nivel": 1,
			"nome": "Autoconfiança",
			"uuid": "Compendium.tormenta20.poderes.Item.eGw7yqknnodmR6fW"
		},
		{
			"nivel": 1,
			"nome": "Espólio",
			"uuid": "Compendium.tormenta20.poderes.Item.r3KvyjKj0U2or4BC"
		},
		{
			"nivel": 1,
			"nome": "Orgulho",
			"uuid": "Compendium.tormenta20.poderes.Item.NUezHHlKivTJ6lAd"
		},
		{
			"nivel": 2,
			"nome": "Palavras Afiadas",
			"uuid": "Compendium.tormenta20.poderes.Item.zcqfqdZfcQiOM5Sv"
		},
		{
			"nivel": 3,
			"nome": "Riqueza",
			"uuid": "Compendium.tormenta20.poderes.Item.skgFrh3jknl2xCMJ"
		},
		{
			"nivel": 4,
			"nome": "Gritar Ordens",
			"uuid": "Compendium.tormenta20.poderes.Item.HhO0oqwrgIBaUq8K"
		},
		{
			"nivel": 5,
			"nome": "Presença Aristocrática",
			"uuid": "Compendium.tormenta20.poderes.Item.OuuBxkiipKEs4ycx"
		},
		{
			"nivel": 20,
			"nome": "Realeza",
			"uuid": "Compendium.tormenta20.poderes.Item.893W9N6002rbwgy9"
		}
	],
	"paladino": [
		{
			"nivel": 1,
			"nome": "Abençoado",
			"uuid": "Compendium.tormenta20.poderes.Item.AUHTUQExPifU7clf"
		},
		{
			"nivel": 1,
			"nome": "Código do Herói",
			"uuid": "Compendium.tormenta20.poderes.Item.49W6ulVKcMAyd47P"
		},
		{
			"nivel": 1,
			"nome": "Golpe Divino",
			"uuid": "Compendium.tormenta20.poderes.Item.FXGduQkI6D6rGEA9"
		},
		{
			"nivel": 2,
			"nome": "Cura pelas Mãos",
			"uuid": "Compendium.tormenta20.poderes.Item.ROo7BuZfbxA21iz0"
		},
		{
			"nivel": 3,
			"nome": "Aura Sagrada",
			"uuid": "Compendium.tormenta20.poderes.Item.VPLIpFxeBH3BYY2t"
		},
		{
			"nivel": 5,
			"nome": "Bênção da Justiça",
			"novo": "t20cBencaoJustic"
		},
		{
			"nivel": 20,
			"nome": "Vingador Sagrado",
			"uuid": "Compendium.tormenta20.poderes.Item.fdHDY8tcvrhNY5r7"
		}
	]
};

export const NOVOS_ITENS = [
	{
		"_collection": "items",
		"_id": "t20cCamArcanista",
		"name": "Caminho do Arcanista",
		"type": "poder",
		"img": "systems/tormenta20/icons/classes/arcanista.webp",
		"effects": [
			{
				"_id": "t20cCamArcBruxo0",
				"name": "Caminho do Arcanista: Bruxo",
				"img": "systems/tormenta20/icons/poderes/classes/conjuradores/caminho-arcanista-bruxo.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cCamArcanista",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "caminho",
						"opcao": "bruxo"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.atributos.int",
							"value": true,
							"priority": null,
							"type": "override",
							"phase": "initial"
						},
						{
							"key": "system.attributes.conjuracao",
							"value": "int",
							"priority": null,
							"type": "override",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			},
			{
				"_id": "t20cCamArcFeitic",
				"name": "Caminho do Arcanista: Feiticeiro",
				"img": "systems/tormenta20/icons/poderes/classes/conjuradores/caminho-arcanista-feiticeiro.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cCamArcanista",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "caminho",
						"opcao": "feiticeiro"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.atributos.car",
							"value": true,
							"priority": null,
							"type": "override",
							"phase": "initial"
						},
						{
							"key": "system.attributes.conjuracao",
							"value": "car",
							"priority": null,
							"type": "override",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			},
			{
				"_id": "t20cCamArcMago00",
				"name": "Caminho do Arcanista: Mago",
				"img": "systems/tormenta20/icons/poderes/classes/conjuradores/caminho-arcanista-mago.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cCamArcanista",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "caminho",
						"opcao": "mago"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.atributos.int",
							"value": true,
							"priority": null,
							"type": "override",
							"phase": "initial"
						},
						{
							"key": "system.attributes.conjuracao",
							"value": "int",
							"priority": null,
							"type": "override",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			}
		],
		"folder": "dB8yQeNYIsAMdhNN",
		"sort": 0,
		"flags": {
			"tormenta20-correcoes": {
				"novo": true
			}
		},
		"system": {
			"description": {
				"value": "<p style=\"text-align:justify\">A magia pode vir de fontes distintas, cada uma com suas regras. Escolha uma das opções abaixo; a escolha não pode ser mudada. O atributo-chave do caminho é usado para lançar magias e somado ao total de PM.</p><p style=\"text-align:justify\"><strong>Bruxo.</strong> Você lança magias através de um foco (varinha, cajado, chapéu…), empunhado com uma mão enquanto gesticula com a outra. Sem empunhar o foco, precisa passar num teste de Misticismo (CD 20 + custo em PM da magia); se falhar, a magia não funciona e os PM são gastos. O foco tem RD 10 e PV iguais à metade dos seus, é totalmente restaurado quando você recupera PM e, se for destruído, você fica atordoado por uma rodada. Um foco perdido ou destruído pode ser refeito com uma semana de trabalho e T$ 100. Atributo-chave: <strong>Inteligência</strong>.</p><p style=\"text-align:justify\"><strong>Feiticeiro.</strong> Sua magia é um poder inato do sangue. Escolha uma linhagem (p. 39) e receba a herança básica dela. Você não depende de itens nem de estudo, mas aprende magias novas apenas nos níveis ímpares (3º, 5º, 7º etc.), em vez de a cada nível. Atributo-chave: <strong>Carisma</strong>.</p><p style=\"text-align:justify\"><strong>Mago.</strong> Você lança magias estudando e memorizando fórmulas, e só pode lançar magias memorizadas. Uma vez por dia, com uma hora de estudo do grimório, memoriza metade das magias que conhece (arredondado para baixo). Sem o grimório (que segue as regras de um foco), não pode trocar as magias memorizadas. Você começa com uma magia adicional (4 no total) e, sempre que ganha acesso a um novo círculo, aprende uma magia adicional desse círculo. Atributo-chave: <strong>Inteligência</strong>.</p>",
				"unidentified": ""
			},
			"source": "Tormenta20 — Edição Jogo do Ano, p. 37",
			"ativacao": {
				"execucao": "passive",
				"custo": 0,
				"qtd": "",
				"condicao": "",
				"special": ""
			},
			"duracao": {
				"value": 0,
				"units": "inst",
				"special": ""
			},
			"range": {
				"value": null,
				"units": ""
			},
			"efeito": "",
			"alcance": "none",
			"area": "",
			"resistencia": {
				"pericia": "",
				"atributo": "sab",
				"bonus": 0,
				"txt": ""
			},
			"rolls": [],
			"tipo": "ability",
			"subtipo": "Arcanista",
			"chatFlavor": "",
			"origin": "",
			"tags": [],
			"chatGif": "",
			"rolltags": [],
			"automationtags": []
		},
		"ownership": {
			"default": 0
		},
		"_stats": {
			"compendiumSource": null,
			"duplicateSource": null,
			"exportSource": null,
			"coreVersion": "14.366",
			"systemId": "tormenta20",
			"systemVersion": "1.6.5",
			"createdTime": null,
			"modifiedTime": null,
			"lastModifiedBy": null
		}
	},
	{
		"_collection": "items",
		"_id": "t20cCamCavaleiro",
		"name": "Caminho do Cavaleiro",
		"type": "poder",
		"img": "systems/tormenta20/icons/classes/cavaleiro.webp",
		"effects": [
			{
				"_id": "t20cCamCavBastia",
				"name": "Caminho do Cavaleiro: Bastião",
				"img": "systems/tormenta20/icons/poderes/classes/combatentes/caminho-cavaleiro-bastiao.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cCamCavaleiro",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "caminho",
						"opcao": "bastiao",
						"requerArmadura": "pesada"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"value": 5,
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			},
			{
				"_id": "t20cCamCavMontar",
				"name": "Caminho do Cavaleiro: Montaria",
				"img": "systems/tormenta20/icons/poderes/classes/combatentes/caminho-cavaleiro-montaria.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cCamCavaleiro",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "caminho",
						"opcao": "montaria"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.pericias.ades.bonus",
							"value": 5,
							"priority": null,
							"type": "add",
							"phase": "initial"
						},
						{
							"key": "system.pericias.cava.bonus",
							"value": 5,
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			}
		],
		"folder": "FOdOQA7oDXTWqj5Z",
		"sort": 0,
		"flags": {
			"tormenta20-correcoes": {
				"novo": true
			}
		},
		"system": {
			"description": {
				"value": "<p style=\"text-align:justify\">No 5º nível, escolha entre Bastião e Montaria. A escolha não pode ser mudada.</p><p style=\"text-align:justify\"><strong>Bastião.</strong> Se estiver usando armadura pesada, você recebe redução de dano 5 (cumulativa com a RD de Especialização em Armadura).</p><p style=\"text-align:justify\"><strong>Montaria.</strong> Você recebe um cavalo de guerra e tem +5 em testes de Adestramento e Cavalgar com ele. A montaria fornece os benefícios de um parceiro veterano do seu tipo e, a partir do 11º nível, de um parceiro mestre. Com a permissão do mestre, pode ser outro tipo de montaria (lista na p. 261). Se ela morrer, você pode comprar outra pelo preço normal e treiná-la com uma semana de trabalho para receber os benefícios desta habilidade.</p>",
				"unidentified": ""
			},
			"source": "Tormenta20 — Edição Jogo do Ano, p. 55",
			"ativacao": {
				"execucao": "passive",
				"custo": 0,
				"qtd": "",
				"condicao": "",
				"special": ""
			},
			"duracao": {
				"value": 0,
				"units": "inst",
				"special": ""
			},
			"range": {
				"value": null,
				"units": ""
			},
			"efeito": "",
			"alcance": "none",
			"area": "",
			"resistencia": {
				"pericia": "",
				"atributo": "sab",
				"bonus": 0,
				"txt": ""
			},
			"rolls": [],
			"tipo": "ability",
			"subtipo": "Cavaleiro",
			"chatFlavor": "",
			"origin": "",
			"tags": [],
			"chatGif": "",
			"rolltags": [],
			"automationtags": []
		},
		"ownership": {
			"default": 0
		},
		"_stats": {
			"compendiumSource": null,
			"duplicateSource": null,
			"exportSource": null,
			"coreVersion": "14.366",
			"systemId": "tormenta20",
			"systemVersion": "1.6.5",
			"createdTime": null,
			"modifiedTime": null,
			"lastModifiedBy": null
		}
	},
	{
		"_collection": "items",
		"_id": "t20cBencaoJustic",
		"name": "Bênção da Justiça",
		"type": "poder",
		"img": "systems/tormenta20/icons/classes/paladino.webp",
		"effects": [
			{
				"_id": "t20cBenJusEgide0",
				"name": "Bênção da Justiça: Égide Sagrada",
				"img": "systems/tormenta20/icons/poderes/classes/combatentes/bencao-justica-egide.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cBencaoJustic",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "bencao",
						"opcao": "egide"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			},
			{
				"_id": "t20cBenJusMontar",
				"name": "Bênção da Justiça: Montaria Sagrada",
				"img": "systems/tormenta20/icons/poderes/classes/combatentes/bencao-justica-montaria.webp",
				"type": "base",
				"origin": "Compendium.tormenta20.poderes.Item.t20cBencaoJustic",
				"tint": "#ffffff",
				"flags": {
					"tormenta20": {},
					"tormenta20-correcoes": {
						"escolha": "bencao",
						"opcao": "montaria"
					}
				},
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"disabled": true,
				"transfer": true,
				"system": {
					"changes": [],
					"targets": [],
					"status": null,
					"onuse": false,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0,
						"disposition": []
					}
				},
				"description": "",
				"statuses": [],
				"sort": 0,
				"start": null,
				"showIcon": 1,
				"folder": null,
				"_stats": {
					"compendiumSource": null,
					"duplicateSource": null,
					"exportSource": null,
					"coreVersion": "14.366",
					"systemId": "tormenta20",
					"systemVersion": "1.6.5",
					"createdTime": null,
					"modifiedTime": null,
					"lastModifiedBy": null
				}
			}
		],
		"folder": "VwM7ZxttHPFuX6M4",
		"sort": 0,
		"flags": {
			"tormenta20-correcoes": {
				"novo": true
			}
		},
		"system": {
			"description": {
				"value": "<p style=\"text-align:justify\">No 5º nível, escolha entre Égide Sagrada e Montaria Sagrada. A escolha não pode ser mudada.</p><p style=\"text-align:justify\"><strong>Égide Sagrada.</strong> Você pode gastar uma ação de movimento e 2 PM para cobrir de energia seu escudo ou símbolo sagrado. Até o fim da cena, você e todos os aliados adjacentes recebem um bônus na Defesa igual ao seu Carisma. A partir do 11º nível, você pode gastar 5 PM para rolar novamente um teste de resistência contra uma magia recém-lançada contra você; se passar e for o único alvo, a magia é revertida contra o conjurador (mantendo CD e demais características).</p><p style=\"text-align:justify\"><strong>Montaria Sagrada.</strong> Você pode gastar uma ação de movimento e 2 PM para invocar uma montaria sagrada (normalmente um cavalo de guerra, ou um pônei para personagens Pequenos), que fica até o fim da cena. Vocês têm um vínculo mental (não é preciso testar Adestramento) e ela cumpre qualquer ordem sua. Fornece os benefícios de um parceiro veterano do seu tipo e, a partir do 11º nível, de um parceiro mestre (lista de parceiros na p. 260). Se morrer, você fica atordoado por uma rodada e só pode invocar outra após um dia de prece e meditação. Em campanhas mais realistas, a montaria pode ser um animal mundano que já está sempre com você.</p>",
				"unidentified": ""
			},
			"source": "Tormenta20 — Edição Jogo do Ano, p. 84",
			"ativacao": {
				"execucao": "passive",
				"custo": 0,
				"qtd": "",
				"condicao": "",
				"special": ""
			},
			"duracao": {
				"value": 0,
				"units": "inst",
				"special": ""
			},
			"range": {
				"value": null,
				"units": ""
			},
			"efeito": "",
			"alcance": "none",
			"area": "",
			"resistencia": {
				"pericia": "",
				"atributo": "sab",
				"bonus": 0,
				"txt": ""
			},
			"rolls": [],
			"tipo": "ability",
			"subtipo": "Paladino",
			"chatFlavor": "",
			"origin": "",
			"tags": [],
			"chatGif": "",
			"rolltags": [],
			"automationtags": []
		},
		"ownership": {
			"default": 0
		},
		"_stats": {
			"compendiumSource": null,
			"duplicateSource": null,
			"exportSource": null,
			"coreVersion": "14.366",
			"systemId": "tormenta20",
			"systemVersion": "1.6.5",
			"createdTime": null,
			"modifiedTime": null,
			"lastModifiedBy": null
		}
	}
];
