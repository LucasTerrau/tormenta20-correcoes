// Gerado por dev/gerar-suplementos.mjs a partir de dev/varredura/*.json. Não editar à mão.
// 615 correções (520 de confiança alta, 46 médias e mecânicas, 49 médias decididas com o usuário).

/** _id do efeito → correções (item e nome do efeito para conferir; patch mesclado no efeito). */
export const EFEITOS = {
	"5yGLhuAMraLpEBvy": [
		{
			"item": "Abraçar Anticriação",
			"subtipo": "Algoz da Tormenta",
			"nome": "Abraçar Anticriação",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "(@Algoz-1)d6",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"9JvB7zpTby02XTEj": [
		{
			"item": "Apoteose do Terceiro",
			"subtipo": "Tirano do Terceiro",
			"nome": "Apoteose do Terceiro",
			"patch": {
				"transfer": false,
				"duration": {
					"expiry": "sustainEnd",
					"units": "rounds",
					"value": null
				}
			}
		}
	],
	"tJjHM9aWc0Ttr64P": [
		{
			"item": "Arsenal do Caçador",
			"subtipo": "Caçador de Cabeça",
			"nome": "Arsenal do Caçador",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "@sab",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "cd",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"aplicacoes": "@sab"
					}
				}
			}
		}
	],
	"ZwlyIXmDvre4L9Vk": [
		{
			"item": "Atrás das Linhas Inimigas",
			"subtipo": "Cavaleiro do Corvo",
			"nome": "Atrás das Linhas Inimigas",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "atordoado",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "cansaco",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"O4zyZVOuwlVmt0Or": [
		{
			"item": "Blindado",
			"subtipo": "Ornitópteros Goblins",
			"nome": "Blindado",
			"patch": {
				"transfer": false
			}
		}
	],
	"OxA40p9HEjjTjX2X": [
		{
			"item": "Bombardeiro",
			"subtipo": "Ornitópteros Goblins",
			"nome": "Bombardeiro: +2 na CD",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"RP5NJtgZaeplsule": [
		{
			"item": "Cabeça nas Nuvens",
			"subtipo": "Aeronauta Goblin",
			"nome": "Cabeça nas Nuvens",
			"patch": {
				"disabled": true
			}
		}
	],
	"sOUYlSarE8sDGGwZ": [
		{
			"item": "Carne Monstruosa",
			"subtipo": "Ingredientes Monstruosos",
			"nome": "Carne Monstruosa",
			"patch": {
				"transfer": false
			}
		}
	],
	"o9BjxCIfw7NnCO87": [
		{
			"item": "Ciências Médicas (Marca)",
			"subtipo": "Médico de Salistick",
			"nome": "Ciências Médicas (Marca)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.cura.atributo",
							"type": "override",
							"value": "int",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"kADuUAhij6JUYi8s": [
		{
			"item": "Componente Especial (Marca)",
			"subtipo": "Mago da Ordem do Vazio",
			"nome": "Componente Especial",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"AFEsEPizn9TJMAKb": [
		{
			"item": "Conjuração Furtiva",
			"subtipo": "Infiltrador de Wynlla",
			"nome": "Conjuração Furtiva (–5 em testes de resistência)",
			"patch": {
				"transfer": false
			}
		}
	],
	"cgmj7sZOplIXqbYw": [
		{
			"item": "Conjuração Magibélica: Intensificar",
			"subtipo": "Conjuração Magibélica",
			"nome": "Conjuração Magibélica: Intensificar",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					}
				},
				"flags": {
					"tormenta20-correcoes": {
						"aplicacoes": "1+@Magodebatalha2"
					}
				}
			}
		}
	],
	"QU8KFbfu3X74UgjU": [
		{
			"item": "Controlar a Respiração",
			"subtipo": "Campeão de Dojo",
			"nome": "Controlar a Respiração: +2d6 de cura",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"4mdxnUOw9WXbkdoA": [
		{
			"item": "Corpo Resiliente",
			"subtipo": "Cobaia dos Médicos Monstros",
			"nome": "Corpo Resiliente",
			"patch": {
				"disabled": true
			}
		}
	],
	"hvyAv6EYY0LBTiss": [
		{
			"item": "Desprezo Profano",
			"subtipo": "Algoz da Tormenta",
			"nome": "Desprezo Profano",
			"patch": {
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"types": [
							"skill"
						],
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "@Algoz",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"zAFAfNvOlfnuqZk5": [
		{
			"item": "Destemor Inflamado",
			"subtipo": "Caçador de Cabeças",
			"nome": "Destemor Inflamado",
			"patch": {
				"transfer": false,
				"duration": {
					"expiry": "sceneEnd",
					"units": "rounds",
					"value": null
				},
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.geral",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"QTKfmmpjT1HiTXiV": [
		{
			"item": "Entortar Escamas",
			"subtipo": "Caçador de Dragões",
			"nome": "Entortar Escamas",
			"patch": {
				"transfer": false,
				"duration": {
					"expiry": "sceneEnd",
					"units": "rounds",
					"value": null
				}
			}
		}
	],
	"CZhc1ZOsAAszwvhF": [
		{
			"item": "Flecha Fantasma",
			"subtipo": "Arqueiro de Lenórienn",
			"nome": "Flecha Fantasma: +5 no teste de ataque e ignora cobertura leve e 20 pontos da redução de dano do alvo.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "ignoraRD",
							"type": "add",
							"value": "20",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"LPuatKIlm6mq0tlx": [
		{
			"item": "Golpe Concentrado",
			"subtipo": "Campeão de Dojo",
			"nome": "Golpe Concentrado",
			"patch": {
				"transfer": false
			}
		}
	],
	"fcy6MOtVifJt2IRl": [
		{
			"item": "Golpes Pesados",
			"subtipo": "Gigante Furioso",
			"nome": "manobra empurrar contra o alvo como uma ação livre",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1,
						"aumenta": false
					}
				}
			}
		}
	],
	"x7fZZDhCn9pjBwAa": [
		{
			"item": "Inovação: Mira Calibrável (Arma)",
			"subtipo": "Inovação",
			"nome": "Mira Calibrável",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "criticoM",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"jdSl9QOO7oz2hhzY": [
		{
			"item": "Ira Dracônica",
			"subtipo": "Tirano do Terceiro",
			"nome": "Ira Dracônica",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.ataque.geral",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.cd",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"duration": {
					"expiry": "sceneEnd",
					"units": "rounds",
					"value": null
				}
			}
		}
	],
	"in93hyYyREre6yQU": [
		{
			"item": "Lâminas Feéricas",
			"subtipo": "Cavaleiro Feérico",
			"nome": "Lâminas Feéricas",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "criticoM",
							"type": "add",
							"value": "-1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"XhJFrJ7fyuzKD4vs": [
		{
			"item": "Língua Afiada",
			"subtipo": "Capitão do Conclave Pirata",
			"nome": "Língua Afiada: +2d6 pra cada poder da distinção que tiver",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": false,
						"types": [],
						"names": []
					}
				}
			}
		}
	],
	"bn71QwZHNzRUrvdw": [
		{
			"item": "Magia Antiaberrante",
			"subtipo": "Bruxo da Tormenta",
			"nome": "Magia Antiaberrante: Ignora 10 de RD",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ignoraRD",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"K2zJrpmt4XKTcTon": [
		{
			"item": "Magia Sagrada",
			"subtipo": "Inquisidor de Wynna",
			"nome": "Para cada outro poder de inquisidor, pode gastar 1 PM para aumenta o dano em +1d8.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d8",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"oW9anbe99spYIAVj": [
		{
			"item": "Medicina Avançada",
			"subtipo": "Médico de Salistick",
			"nome": "Medicina Avançada: O dado de cura do poder Medicina aumenta para d10",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					},
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d10",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"I8mEE6Hpk9ElDeTv": [
		{
			"item": "Mestre Dracônico (Marca)",
			"nome": "Mestre Dracônico (Marca)",
			"patch": {
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"types": [
							"spell"
						],
						"names": []
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"kktTTwMe0hO7S2sX": [
		{
			"item": "Nunca Ceder",
			"subtipo": "Amazona",
			"nome": "Nunca Cede: +1 pra cada poder da Distinção",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 2,
						"aumenta": false,
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "@Amazona",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"EpLUtnbnNGthtE8j": [
		{
			"item": "Olhos de Chumbo",
			"subtipo": "Chapéu-Preto",
			"nome": "Olhos de Chumbo",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "-2-(@Chpreto2)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "-2-(@Chpreto2)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"KcpdJCcvfN1gvMn8": [
		{
			"item": "Palma Mística (Marca)",
			"subtipo": "Mestre Mahou-Jutsu",
			"nome": "Palma Mística: você recebe +2 em testes de ataque realizados como parte de magias",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"spell"
						]
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "cd",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"FD6iKmKudScyHdbw": [
		{
			"item": "Perfume Intoxicante",
			"subtipo": "Drogadora",
			"nome": "Perfume Intoxicante (Marca de Feromônio)",
			"patch": {
				"transfer": false
			}
		}
	],
	"wWGlhN6cxYG4zLPQ": [
		{
			"item": "Prata da Casa",
			"subtipo": "Mestre de Armearia",
			"nome": "Prata da Casa: +1 em testes de ataque e rolagens de dano com armas de fogo que tenha fabricado",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "1+(@Mestrearma2)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "1+(@Mestrearma2)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"XSJJhFL2ILnVdG39": [
		{
			"item": "Predadora",
			"subtipo": "Amazona",
			"nome": "Predadora",
			"patch": {
				"transfer": false,
				"duration": {
					"expiry": "sceneEnd",
					"units": "rounds",
					"value": null
				}
			}
		}
	],
	"nYyv994TvtF7kVvH": [
		{
			"item": "Preparação Corporal (Marca)",
			"subtipo": "Mutagenista",
			"nome": "Preparação Corporal (Marca)",
			"patch": {
				"disabled": true
			}
		}
	],
	"2Sh3aqojxvfQYKN9": [
		{
			"item": "Quem Ri Por Último…",
			"subtipo": "Bufão de Hyninn",
			"nome": "Quem Ri Por Último…",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.cd",
							"type": "add",
							"value": "1+(@Bufaohyninn2)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.pericias.geral",
							"type": "add",
							"value": "1+(@Bufaohyninn2)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"dKFC49iSDAq0smh5": [
		{
			"item": "Rainha Amazona",
			"subtipo": "Amazona",
			"nome": "Rainha Amazona",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.atributos.car.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"d4r3R2MNScEG1VHk": [
		{
			"item": "Rápido ou Morto",
			"subtipo": "Chapéu-Preto",
			"nome": "Rápido ou Morto",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.inic.bonus",
							"type": "add",
							"value": "2+(@Chpreto2)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.walk.bonus",
							"type": "add",
							"value": "3+1.5*(@Chpreto2)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"J72ImUwWwNFhvXe8": [
		{
			"item": "Sal Azul",
			"subtipo": "Ingredientes Monstruosos",
			"nome": "Sal Azul",
			"patch": {
				"transfer": false
			}
		}
	],
	"iY3Zt5PdbGCsjAbP": [
		{
			"item": "Saúde Perfeita",
			"subtipo": "Médico de Salistick",
			"nome": "Saúde Perfeita",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "2*(@Medsaulis)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.con.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "veneno",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"vy5CBj9lh2goikkn": [
		{
			"item": "Traçar Perfil",
			"subtipo": "Detetive de Tanna-Toh",
			"nome": "Traçar Perfil",
			"patch": {
				"duration": {
					"expiry": "sceneEnd",
					"units": "rounds",
					"value": null
				}
			}
		}
	],
	"T3rSJYELXqeysXOj": [
		{
			"item": "Acorde Poderoso",
			"subtipo": "Bardo",
			"nome": "Acorde Poderoso: aumenta os dados de dano para d10, o alcance para médio e deixa desprevenido em vez de vulnerável.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"ZbkTBeC9fAMz2jCe": [
		{
			"item": "Adaga Oposta",
			"nome": "Adaga Oposta: quando usa uma habilidade que permite fazer um ataque para evitar ou reduzir dano, recebe +2 nesse teste.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"CHzk5EaPb0dCMIIM": [
		{
			"item": "Agrilhoar os Caídos",
			"subtipo": "Arcanista",
			"nome": "Espírito Caído",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"W6992h4PJS3KAV4G": [
		{
			"item": "Amuleto da visão etérea",
			"nome": "Resistência a Ilusões +5",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Vontade"
						]
					}
				}
			}
		}
	],
	"QMPU2RygY0kdsJ2s": [
		{
			"item": "Anel da proteção mental",
			"nome": "Anel da proteção mental: resistência a efeitos mentais +5",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Vontade"
						]
					}
				}
			}
		}
	],
	"BXENJ5OYo0GtOQQP": [
		{
			"item": "Aquecimento",
			"subtipo": "Lutador",
			"nome": "Aquecimento (Dano)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.ataque.cac",
							"type": "add",
							"value": "(min(@nvl.lutador, @con))",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"T091R3JLqVotEnAt": [
		{
			"item": "Arco das sombras",
			"nome": "Sombrio",
			"patch": {
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"disabled": false,
				"transfer": true
			}
		}
	],
	"UtGQajJtKgJL8wls": [
		{
			"item": "Arco do crepúsculo",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"toQ95mbDSEaMbER7": [
		{
			"item": "Arma Divina",
			"subtipo": "Clérigo",
			"nome": "Arma Divina",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"74k2NqVvuPq82qMq": [
		{
			"item": "Armação para Mochila",
			"nome": "Armação para Mochila",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.carga.bonus",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"TKnNYUeScxnBnKKj": [
		{
			"item": "Armadura das Sombras Profundas",
			"nome": "Armadura das Sombras Profundas",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.luz.bonus",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"NeWq6AopdWtvxtPU": [
		{
			"item": "Armadura do Dragão Ancião",
			"nome": "Armadura do Dragão Ancião",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.eletricidade.bonus",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.fogo.bonus",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"cpMbbs4EumZBSXDW": [
		{
			"item": "Arremesso de Investida",
			"subtipo": "Guerreiro",
			"nome": "Arremesso de Investida: faz um ataque a distância adicional...",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					}
				}
			}
		}
	],
	"4elvgQhkwdRp4YBU": [
		{
			"item": "Aura Vingadora",
			"subtipo": "Paladino",
			"nome": "Aura Vingadora (Dano)",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					}
				}
			}
		}
	],
	"L9O4oKVnEDsrDdxs": [
		{
			"item": "Aura Vingadora",
			"subtipo": "Paladino",
			"nome": "Aura Vingadora: você e seus aliados recebem +1d6 de luz em uma rolagem de dano corpo a corpo uma vez por rodada",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"09x72Q8vIOpdtudF": [
		{
			"item": "Barba queimada",
			"nome": "Barba queimada",
			"patch": {
				"transfer": false
			}
		}
	],
	"ksCBZoCNwtLIMI9g": [
		{
			"item": "Barragem de Golpes",
			"subtipo": "Grupo",
			"nome": "Barragem de Golpes: +1 em rolagens de dano",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"WzCTaPHR7SYaSffm": [
		{
			"item": "Bênção de Batalha",
			"subtipo": "Clérigo",
			"nome": "Bênção de Batalha: na primeira rodada de um combate, a execução se torna movimento.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"xSrJ8J22CY3vssrE": [
		{
			"item": "Besta Estelar",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"jdmAKShuTR9aCDLw": [
		{
			"item": "Bolsões Insanos",
			"subtipo": "Tormenta",
			"nome": "Bolsões Insanos: você recebe +5 em testes de Ladinagem para ocultar itens nesses espaços.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Ladinagem"
						]
					}
				}
			}
		}
	],
	"UVeyK184TEjb4YZ6": [
		{
			"item": "Botas do andarilho das sombras",
			"nome": "+5 em testes de Furtividade realizados em ambientes urbanos ou escuros",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"Hjw0zHbf5i5S2ugj": [
		{
			"item": "Braçadeiras da força do colosso",
			"nome": "Braçadeiras da força do colosso",
			"patch": {
				"transfer": false
			}
		}
	],
	"x2IQd6vg50eaIsIX": [
		{
			"item": "Bracelete do Coração Vivaz",
			"nome": "Bracelete do Coração Vivaz",
			"patch": {
				"disabled": true
			}
		}
	],
	"FGWX6aYkF81ImopC": [
		{
			"item": "Brado: Assombroso",
			"subtipo": "Bárbaro",
			"nome": "Causa 1d6 de dano por PM gasto (limitado por sua Constituição).",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"ONq7y0gwkkisUmbJ": [
		{
			"item": "Cajado das Marés",
			"nome": "Cajado das Marés",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"llZxLXXzSKWR2hdy": [
		{
			"item": "Camuflagem Mimética (Sereia/Tritão)",
			"subtipo": "Sereia/Tritão",
			"nome": "Camuflagem Mimética: +5 em Furtividade se estiver de armadura leve e/ou com até dois itens vestidos",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		},
		{
			"item": "Camuflagem Mimética (Trog)",
			"subtipo": "Trog",
			"nome": "Camuflagem Mimética: +5 em Furtividade se estiver de armadura leve e/ou com até dois itens vestidos",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"Ruoi0D48MCwYrwsX": [
		{
			"item": "Camuflagem Mimética (Sereia/Tritão)",
			"subtipo": "Sereia/Tritão",
			"nome": "Camuflagem Mimética: +10 em Furtividade se estiver sem armadura e com no máximo um item vestido",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		},
		{
			"item": "Camuflagem Mimética (Trog)",
			"subtipo": "Trog",
			"nome": "Camuflagem Mimética: +10 em Furtividade se estiver sem armadura e com no máximo um item vestido",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"ZSfVZjw7A1u2vsdX": [
		{
			"item": "Camuflagem Mimética (Sereia/Tritão)",
			"subtipo": "Sereia/Tritão",
			"nome": "Camuflagem Mimética: +2 em Furtividade se estiver de armadura pesada e/ou com mais de dois itens vestidos.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		},
		{
			"item": "Camuflagem Mimética (Trog)",
			"subtipo": "Trog",
			"nome": "Camuflagem Mimética: +2 em Furtividade se estiver de armadura pesada e/ou com mais de dois itens vestidos.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"hIQAnRgZZLr8Sa6G": [
		{
			"item": "Canalizar Concentrado",
			"subtipo": "Clérigo",
			"nome": "Canalizar Concentrado: afeta apenas uma criatura no alcance, aumenta o efeito em +1 por dado e a CD em +2.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": null
					}
				}
			}
		}
	],
	"i5wmzOOqdCzsDgat": [
		{
			"item": "Canalizar Poderoso",
			"subtipo": "Clérigo",
			"nome": "Canalizar Poderoso: muda os dados de dano para d10.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"guDK0YmW4Rsi6Vyg": [
		{
			"item": "Carcaça do predador primal",
			"nome": "Carcaça do predador primal",
			"patch": {
				"disabled": true
			}
		}
	],
	"ZtVtzd6WvSsYwFMK": [
		{
			"item": "Casca Grossa",
			"subtipo": "Atleta",
			"nome": "Casca Grossa (Atleta)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "(min(@nvl.atleta, @con))",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "semPesada"
					}
				}
			}
		}
	],
	"bJJuxQIh8lyesdHl": [
		{
			"item": "Cascos Poderosos (Centauro)",
			"subtipo": "Centauro",
			"nome": "Cascos Poderosos: +1 de dano por dado.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d",
							"phase": "initial",
							"priority": null
						}
					],
					"abilityUse": {
						"aumenta": false,
						"custo": 1
					}
				}
			}
		},
		{
			"item": "Cascos Poderosos (Minotauro)",
			"subtipo": "Minotauro",
			"nome": "Cascos Poderosos: +1 de dano por dado.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d",
							"phase": "initial",
							"priority": null
						}
					],
					"abilityUse": {
						"aumenta": false,
						"custo": 1
					}
				}
			}
		},
		{
			"item": "Cascos Poderosos (Sátiro)",
			"subtipo": "Sátiro",
			"nome": "Cascos Poderosos: +1 de dano por dado.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1,
						"aumenta": false
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"xGBI7dRwPyvvmoK4": [
		{
			"item": "Catafractário",
			"subtipo": "Combate",
			"nome": "Catafractário: +1 na Defesa por nível do parceiro.",
			"patch": {
				"transfer": false
			}
		}
	],
	"fzFofaJ3zHeztWgV": [
		{
			"item": "Celebridade Artoniana",
			"subtipo": "Bardo",
			"nome": "Celebridade Artoniana (+5 em testes contra)",
			"patch": {
				"transfer": false
			}
		}
	],
	"RiqVIK5bRDi1Sx3E": [
		{
			"item": "Celebridade Artoniana",
			"subtipo": "Bardo",
			"nome": "Celebridade Artoniana (-5 em todos contra o ídolo)",
			"patch": {
				"transfer": false
			}
		}
	],
	"BPmkfyHFfLppNK6o": [
		{
			"item": "Cerveja Deheoni",
			"nome": "Cerveja Deheoni: Fornece +1 em testes de resistência",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"WOEP2qobAlW3DZLn": [
		{
			"item": "Cinturão do trobo",
			"nome": "Cinturão do trobo",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.carga.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"KLLB1OeMAyhOOVBz": [
		{
			"item": "Citadino (Humano)",
			"subtipo": "Humano",
			"nome": "Citadino",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.atr.car",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.ades.bonus",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Citadino (Kliren)",
			"subtipo": "Kliren",
			"nome": "Citadino",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.atr.car",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.ades.bonus",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Citadino (Meio-elfo)",
			"subtipo": "Meio-elfo",
			"nome": "Citadino",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.atr.car",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.ades.bonus",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"1eRKtyQNOicGxjRE": [
		{
			"item": "Clava de Lava",
			"nome": "Flamenjante + Clava de Lava",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"2FC3rYsHg1KfIJxr": [
		{
			"item": "Clava de Lava",
			"nome": "Flamejante",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"HVOA0oJNZl2V2oBz": [
		{
			"item": "Clava de Lava",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"rWrG6Awsqyj6TDqS": [
		{
			"item": "Cocheiro",
			"subtipo": "Mundana",
			"nome": "Cocheiro (+2 na Defesa)",
			"patch": {
				"transfer": false
			}
		}
	],
	"FnBKduoqtPbBw1Nz": [
		{
			"item": "Combalido",
			"nome": "Combalido",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.fort.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.nivel",
							"type": "add",
							"value": "-1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"ECHlspK4edFEo7vA": [
		{
			"item": "Combinação: Chute Circular",
			"subtipo": "Lutador",
			"nome": "Chute Circular: Causa +1d6 pontos de dano para cada ponto em sua contagem de combinações.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"SYS3neNH0RhInwHB": [
		{
			"item": "Conforto do Aço",
			"subtipo": "Anão",
			"nome": "Conforto do Aço: se estiver usando armadura pesada, recebe +2 na Defesa.",
			"patch": {
				"system": {
					"onuse": false
				},
				"disabled": false,
				"transfer": true,
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "pesada"
					}
				}
			}
		}
	],
	"3tzB5kzjhO4J8lys": [
		{
			"item": "Contrabandista",
			"subtipo": "Mundana",
			"nome": "Contrabandista: +5 em testes de Ladinagem para ocultar itens em si mesmo ou em veículos.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Ladinagem"
						]
					}
				}
			}
		}
	],
	"U4UizuZFqOm0XlcI": [
		{
			"item": "Coragem Aguerrida",
			"subtipo": "Combate",
			"nome": "Coragem Aguerrida",
			"patch": {
				"transfer": false
			}
		}
	],
	"nd0sNhAAU8YbY0NH": [
		{
			"item": "Coro Sibilante",
			"subtipo": "Medusa",
			"nome": "Coro Sibilante",
			"patch": {
				"transfer": false,
				"duration": {
					"value": null,
					"units": "rounds",
					"expiry": "sceneEnd"
				}
			}
		}
	],
	"K6OKC21AanUUMo4u": [
		{
			"item": "Couraça do Guardião Celeste",
			"nome": "Couraça do Guardião Celeste",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.car.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"RTN5gY7tbJUFTGTm": [
		{
			"item": "Couraça do Guardião Celeste",
			"nome": "Defensora: +2 em testes de resistência",
			"patch": {
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.modificadores.pericias.resistencia",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"disabled": false,
				"transfer": true
			}
		}
	],
	"8zVptb6AgaTewCg0": [
		{
			"item": "Covarde",
			"nome": "Covarde: Você sofre –5 em testes de resistência contra efeitos de medo.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Vontade"
						]
					}
				}
			}
		}
	],
	"yYhlmh9l1sVoSkFK": [
		{
			"item": "Cozido de Pimenta",
			"nome": "Cozido de Pimenta: +1 em fortitude",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude"
						]
					}
				}
			}
		}
	],
	"oPnvdnyOO7ibKhiN": [
		{
			"item": "Criança da Luz",
			"subtipo": "Aggelus",
			"nome": "Criança da Luz",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.eletricidade.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.dipl.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.intu.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"CwSKPHXmah7X37fP": [
		{
			"item": "Criança das Trevas",
			"subtipo": "Sulfure",
			"nome": "Criança das Trevas",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.trevas.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.enga.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"C61n4D0mz3ATWVKJ": [
		{
			"item": "Curandeiro dos Ermos",
			"subtipo": "Caçador",
			"nome": "Curandeiro dos Ermos: muda a execução para movimento e os dados de cura para d8.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"FtFf6jnkIQgLY7fr": [
		{
			"item": "Dança Defensiva",
			"subtipo": "Magimarcialista",
			"nome": "Dança Defensiva: você pode gastar 1 carga marcial para receber +5 em um teste de resistência.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"BQBTJNAatdzOUD7Z": [
		{
			"item": "Defesa Armada",
			"subtipo": "Combate",
			"nome": "Defesa Armada",
			"patch": {
				"transfer": false
			}
		}
	],
	"Hxp7ZwLhcyRoEn8q": [
		{
			"item": "Descobrir Fraqueza",
			"nome": "além do normal, você recebe +2 em testes contra a criatura até o fim da cena. Requer 2° círculo.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.geral",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"76EL8u7qAAKRwvQi": [
		{
			"item": "Diagrama Anatômico",
			"nome": "Diagrama Anatômico",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					}
				}
			}
		}
	],
	"nkrln6sVhgqz6E3u": [
		{
			"item": "Diligente",
			"subtipo": "Destino",
			"nome": "Diligente",
			"patch": {
				"transfer": false
			}
		}
	],
	"vxCByECRacJ3AryJ": [
		{
			"item": "Discrição",
			"nome": "Discrição",
			"patch": {
				"system": {
					"changes": []
				}
			}
		}
	],
	"eeD8hM6NL5vM2Tji": [
		{
			"item": "Discrição Divina",
			"subtipo": "Usurpador",
			"nome": "Discrição Divina (Resistências)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"4qmfbc8sCccysjEm": [
		{
			"item": "Domador Cativante",
			"subtipo": "Treinador",
			"nome": "Domador Cativante: os dados de dano dessa habilidade aumentam para d10",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d10",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "@car",
							"phase": "initial",
							"priority": null
						}
					],
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"OmvzFI8JcHSt5jib": [
		{
			"item": "Domador Lendário",
			"subtipo": "Treinador",
			"nome": "Domador Lendário: muda os dados de dano para d12...",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 2
					},
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d12",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"AgdENn1CEEFxjd3r": [
		{
			"item": "Égide da Fé",
			"subtipo": "Clérigo",
			"nome": "Égide da Fé: concede 5 PV temporários para cada +1 em Defesa concedido pela magia.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"quR8cEOdpHEzR1fB": [
		{
			"item": "Elixir da eternidade",
			"nome": "Elixir da eternidade: resistencia a trevas +5",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"IY1bIkIBtRrMFUF7": [
		{
			"item": "Encastelado",
			"subtipo": "Combate",
			"nome": "Encastelado",
			"patch": {
				"duration": {
					"value": null,
					"expiry": null
				}
			}
		}
	],
	"sDnlIuQVtf2mk5Yk": [
		{
			"item": "Escapada Criativa (Goblin)",
			"subtipo": "Goblin",
			"nome": "Escapada Criativa: Quando faz um teste de resistência, você pode gastar 2 PM para somar sua Inteligência ao resultado do teste.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		},
		{
			"item": "Escapada Criativa (Meio-elfo)",
			"subtipo": "Meio-elfo",
			"nome": "Escapada Criativa: Quando faz um teste de resistência, você pode gastar 2 PM para somar sua Inteligência ao resultado do teste.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"p78iEH942d1vWUWK": [
		{
			"item": "Escola de Duelo: Tiro",
			"subtipo": "Duelista",
			"nome": "Escola Clássica: Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 em rolagens de",
			"patch": {
				"system": {
					"changes": []
				}
			}
		},
		{
			"item": "Escola de Duelo: Clássica",
			"subtipo": "Duelista",
			"nome": "Escola Clássica: Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 em rolagens de dano com essa arma.",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArma": "umaArma"
					}
				}
			}
		}
	],
	"EBDDBOuhBhnrcqAG": [
		{
			"item": "Escriba",
			"subtipo": "Mundana",
			"nome": "Escriba: Se tiver Lendas e Historias (poder de bardo), recebe +5 no teste dessa habilidade.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Conhecimento",
							"Misticismo",
							"Nobreza",
							"Religião"
						]
					}
				}
			}
		}
	],
	"LoiTvEDpupcjvqvt": [
		{
			"item": "Escudo da Natureza Viva",
			"nome": "Madeira Tollon",
			"patch": {
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"types": [
							"skill"
						],
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"ygutvoadBUnHaLYB": [
		{
			"item": "Escudo do Trovão",
			"nome": "Polida",
			"patch": {
				"disabled": true
			}
		}
	],
	"Hg6mEuq0zCtdv30z": [
		{
			"item": "Escudo Heroico",
			"subtipo": "Combate",
			"nome": "Escudo Heroico: Penalidade (-1 para cada acerto)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"A8V0mCAWKtQx21cI": [
		{
			"item": "Espada da Tempestade",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						],
						"automatic": true
					}
				}
			}
		}
	],
	"pK6Q5v0f0w0RNvgF": [
		{
			"item": "Espada do Guardião",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"8GBKvxTuzV9cfept": [
		{
			"item": "Espada Solar",
			"nome": "Magnífica",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						],
						"automatic": true
					}
				}
			}
		}
	],
	"tKSdunKUCFcgVf3E": [
		{
			"item": "Especialização em Magia",
			"subtipo": "magia",
			"nome": "Especialização em Magia: +2 na CD da magia escolhida",
			"patch": {
				"system": {
					"abilityUse": {
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
				}
			}
		}
	],
	"qpSrtUIVTUtWEQwF": [
		{
			"item": "Esquiva Sagaz",
			"subtipo": "Duelista",
			"nome": "Esquiva Sagaz (Duelista)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "floor((@nvl.duelista - 3)/4 + 1)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.refl.bonus",
							"type": "add",
							"value": "floor((@nvl.duelista - 3)/4 + 1)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"IVzU08V6D007Jcyj": [
		{
			"item": "Exaltação do Rejeitado (Kaijin)",
			"subtipo": "Kaijin",
			"nome": "Exaltação do Rejeitado: Quando lança uma magia divina, você recebe um bônus em testes de resistência igual ao círculo da magia lançada, até o início do seu próximo turno.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		},
		{
			"item": "Exaltação do Rejeitado (Lefou)",
			"subtipo": "Lefou",
			"nome": "Exaltação do Rejeitado: Quando lança uma magia divina, você recebe um bônus em testes de resistência igual ao círculo da magia lançada, até o início do seu próximo turno.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"hWhH7XzbP1paXhH9": [
		{
			"item": "Exército de um Grupo Só",
			"subtipo": "Grupo",
			"nome": "Exército de um Grupo Só: +2 em testes de ataque.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"uxBWVwxobkPzFlKY": [
		{
			"item": "Expurgo de Wynna",
			"nome": "Expurgo de Wynna: –5 em testes de resistência contra efeitos mágicos.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"fbNZVFGBP6c28BfH": [
		{
			"item": "Faro Aprimorado (Minotauro)",
			"subtipo": "Minotauro",
			"nome": "Faro Aprimorado: +5 em testes de Sobrevivência para rastrear.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Sobrevivência"
						]
					}
				}
			}
		},
		{
			"item": "Faro Aprimorado (Moreau do Lobo)",
			"subtipo": "Moreau do Lobo",
			"nome": "Faro Aprimorado: +5 em testes de Sobrevivência para rastrear.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"clU4SozcrFntmmXt": [
		{
			"item": "Florete do Vendaval",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"OATNxzaxvRbzjug8": [
		{
			"item": "Florete do Vendaval",
			"nome": "Florete do Vendaval",
			"patch": {
				"transfer": false
			}
		}
	],
	"wexPHOHlsssbELW6": [
		{
			"item": "Forma Esquelética",
			"subtipo": "Druida",
			"nome": "Forma Esquelética",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "cansaco",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "metabolismo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "veneno",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.corte.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.perfuracao.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.detalhes.tipo",
							"type": "override",
							"value": "mor",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"biKVxMFMUvQBj1Gv": [
		{
			"item": "Freira",
			"subtipo": "Mundana",
			"nome": "Freira - Perícias Treinadas",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.cura.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"awVolBD9vLuHAHwh": [
		{
			"item": "Fulgor Ardente",
			"subtipo": "Paladino",
			"nome": "Fulgor Ardente: Se acertar um ataque usando Golpe Divino, todos os inimigos a até 6m do alvo do ataque sofrem dano de lu",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"attack"
						]
					}
				}
			}
		}
	],
	"Ehmfr85h2GMMr8Op": [
		{
			"item": "Fúria Primitiva",
			"subtipo": "Machado de Pedra",
			"nome": "Fúria Primitiva (PV's Temporarios)",
			"patch": {
				"transfer": false
			}
		}
	],
	"w3wjo9AyZpaBsT4C": [
		{
			"item": "Garras do predador primal",
			"nome": "Garras do predador primal",
			"patch": {
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"types": [
							"attack"
						],
						"names": []
					}
				},
				"disabled": true
			}
		}
	],
	"TSuhLobRcTDl1sLS": [
		{
			"item": "Gavinhas",
			"subtipo": "Dahllan",
			"nome": "Gavinhas: +2 em testes para de desarmar e derrubar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"4vX717u4eBEZfuZj": [
		{
			"item": "Ginete de Javali",
			"subtipo": "Anão",
			"nome": "Ginete de Javali: +2 em Adestramento e Cavalgar com o Javali doherita.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Adestramento",
							"Cavalgar"
						]
					}
				}
			}
		}
	],
	"muHkO2STRV9nlqmR": [
		{
			"item": "Golpe do Predador",
			"subtipo": "Caçador",
			"nome": "Sangrando (d10)",
			"patch": {
				"statuses": [
					"sangrando"
				]
			}
		},
		{
			"item": "Onda de Sangue",
			"subtipo": "Bucaneiro",
			"nome": "Sangrando (d10)",
			"patch": {
				"statuses": [
					"sangrando"
				]
			}
		}
	],
	"PhAmzdSfb2gfmhaM": [
		{
			"item": "Golpe do Predador",
			"subtipo": "Caçador",
			"nome": "Sangrando (d12)",
			"patch": {
				"statuses": [
					"sangrando"
				]
			}
		},
		{
			"item": "Onda de Sangue",
			"subtipo": "Bucaneiro",
			"nome": "Sangrando (d12)",
			"patch": {
				"statuses": [
					"sangrando"
				]
			}
		}
	],
	"pkQn90ATlLPKeZGn": [
		{
			"item": "Golpe do Predador",
			"subtipo": "Caçador",
			"nome": "Sangrando (d8)",
			"patch": {
				"statuses": [
					"sangrando"
				]
			}
		},
		{
			"item": "Onda de Sangue",
			"subtipo": "Bucaneiro",
			"nome": "Sangrando (d8)",
			"patch": {
				"statuses": [
					"sangrando"
				]
			}
		}
	],
	"6XxynBqlcCfmaMII": [
		{
			"item": "Grandão",
			"subtipo": "Destino",
			"nome": "Grandão",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.carga.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"4qslmsqb7i46QNkE": [
		{
			"item": "Grunhidos",
			"subtipo": "Machado de Pedra",
			"nome": "aumentar os bônus em +1.",
			"patch": {
				"system": {
					"onuse": false,
					"changes": []
				},
				"disabled": true
			}
		}
	],
	"ivFBBzT74mDJAAqK": [
		{
			"item": "Grunhidos",
			"subtipo": "Machado de Pedra",
			"nome": "Fúria",
			"patch": {
				"disabled": true,
				"system": {
					"changes": []
				}
			}
		}
	],
	"cNmbhUB3COM4ahhr": [
		{
			"item": "Herança de Kundali",
			"subtipo": "Suraggel",
			"nome": "Herança de Kundali: +2 em testes de manobra",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"mdcYkMwD1sjlbDwd": [
		{
			"item": "Herança de Serena",
			"subtipo": "Suraggel",
			"nome": "Herança de Serena",
			"patch": {
				"disabled": true
			}
		}
	],
	"aU8iJGrbey8N7G5w": [
		{
			"item": "Herança de Sombria",
			"subtipo": "Suraggel",
			"nome": "Herança de Sombria",
			"patch": {
				"disabled": true
			}
		}
	],
	"BCZqOBH6AxaUZ5gM": [
		{
			"item": "Herança de Venomia",
			"subtipo": "Suraggel",
			"nome": "Herança de Venomia: +2 em testes para evitar manobras de combate e efeitos de movimento.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"9zLTYhjoB5dUkiFO": [
		{
			"item": "Herói dos Sete Instrumentos",
			"subtipo": "Destino",
			"nome": "Herói dos Sete Instrumentos: +1 em testes de perícias nas quais não é treinado.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "1+floor((@nivel+1)/8)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"pa3i7TXlJp9ZvCkO": [
		{
			"item": "Ímpio",
			"nome": "Ímpio:  –5 em testes de resistência contra magias divinas.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"Fscqth17BX6S5yqs": [
		{
			"item": "Instinto Selvagem",
			"subtipo": "Machado de Pedra",
			"nome": "Instinto Selvagem",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.perc.bonus",
							"type": "add",
							"value": "floor((@nvl.machado-de-pedra - 3)/6 + 1)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.refl.bonus",
							"type": "add",
							"value": "floor((@nvl.machado-de-pedra - 3)/6 + 1)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "floor((@nvl.machado-de-pedra - 3)/6 + 1)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"WCfJPw6EnOJntrqI": [
		{
			"item": "Insuflar Investida",
			"subtipo": "Nobre",
			"nome": "1 PM para cada aliado no alcance que quiser afetar.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"BaATRj4QmywyXYpU": [
		{
			"item": "Introdução Calorosa",
			"subtipo": "Bucaneiro",
			"nome": "Introdução Calorosa: +2 em perícias baseadas em Carisma.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Adestramento",
							"Atuação",
							"Diplomacia",
							"Enganação",
							"Intimidação",
							"Jogatina"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"M0YEnbTeGHpavyUS": [
		{
			"item": "Jaqueta de Couro",
			"nome": "Jaqueta de Couro",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					],
					"abilityUse": {
						"names": [
							"Investigação"
						]
					}
				}
			}
		}
	],
	"nstdrtKqt3LQ1SSD": [
		{
			"item": "Julgamento Divino: Desafio",
			"subtipo": "Paladino",
			"nome": "Julgamento Divino: Desafio",
			"patch": {
				"transfer": false
			}
		}
	],
	"DM3jhdwYYeZCQ0zQ": [
		{
			"item": "Ladainha de Combate",
			"subtipo": "Santo",
			"nome": "Ladainha de Combate (Nível 1)",
			"patch": {
				"transfer": false,
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.ataque",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"R0MbMZlq3863nAdE": [
		{
			"item": "Ladainha de Combate",
			"subtipo": "Santo",
			"nome": "Ladainha de Combate (Nível 5)",
			"patch": {
				"transfer": false,
				"system": {
					"changes": [
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "1d8[luz]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"g4Dpst36iVfKW3lZ": [
		{
			"item": "Ladrão de Túmulos",
			"subtipo": "Mundana",
			"nome": "Ladrão de Túmulos",
			"patch": {
				"transfer": false
			}
		}
	],
	"T5DWj5xc807VWOVY": [
		{
			"item": "Lança da Fênix",
			"nome": "Magnífica",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"AGgiTz01Trpkuv3I": [
		{
			"item": "Linhagem Distinta",
			"subtipo": "Nobre",
			"nome": "Linhagem Distinta: Orgulho custa -1 PM.",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					}
				}
			}
		}
	],
	"AYmZuIBeP16k5iCf": [
		{
			"item": "Machado da Natureza",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"owzwrnGXgKFjqdF1": [
		{
			"item": "Machado do abismo",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"heyFk6suOw2OHzSa": [
		{
			"item": "Machado do vulcão",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"oHVsK6Fig41hK42D": [
		{
			"item": "Magificação",
			"subtipo": "Magimarcialista",
			"nome": "Magificação: Se tiver pelo menos 1 carga arcana e 1 carga marcial, você recebe +2 em testes de ataque e rolagens de dano",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2+floor((@nvl.magimarcialista - 1)/5)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "2+floor((@nvl.magimarcialista - 1)/5)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Phd3QmZKnN7x8wE1": [
		{
			"item": "Manipulação Esquelética",
			"subtipo": "Osteon",
			"nome": "Manipulação Esquelética: +5 em Furtividade (nessa forma você só pode fazer reações ou cancelar esse efeito).",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"QR7Myw3lJohnrp50": [
		{
			"item": "Marcado pelo Passado",
			"nome": "Marcado pelo Passado",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.dipl.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pm.bonus.nivel",
							"type": "add",
							"value": "-1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"fOeTPHBws0DML6uc": [
		{
			"item": "Martelo da terra",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"1OcqfAFk1dx6Gv4S": [
		{
			"item": "Martelo do titã",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"RZmtP52YCdfjJaRj": [
		{
			"item": "Máscara do predador",
			"nome": "+5 para Procurar",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Investigação"
						]
					}
				}
			}
		}
	],
	"xw6Lb3hWVKNS9wKU": [
		{
			"item": "Máscara do predador",
			"nome": "+5 para Rastrear",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"hEFZORgF7rGEpxjn": [
		{
			"item": "Meditação Autoafirmativa",
			"subtipo": "Destino",
			"nome": "Meditação Autoafirmativa: \"Ninguém toca em mim\"",
			"patch": {
				"disabled": true,
				"transfer": true,
				"system": {
					"onuse": false
				}
			}
		}
	],
	"4rgTVeSIEFj9wnWp": [
		{
			"item": "Missa: Mente Abençoada",
			"subtipo": "Clérigo",
			"nome": "Missa: Mente Abençoada",
			"patch": {
				"transfer": false
			}
		}
	],
	"cUTNrzlJ72Mkn5AN": [
		{
			"item": "Monóculo da franqueza",
			"nome": "+10 para perceber Mentiras",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Intuição"
						]
					}
				}
			}
		}
	],
	"icxaKFjNQYvruEGb": [
		{
			"item": "Na Mosca",
			"subtipo": "Combate",
			"nome": "Na Mosca: +1 dado extra.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"o4Bx4P4nHVA8GuQ5": [
		{
			"item": "Necrologia",
			"subtipo": "Necromante",
			"nome": "Necrologia",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.cura.bonus",
							"type": "add",
							"value": "2+floor((@nvl.necromante-3)/5)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.fort.bonus",
							"type": "add",
							"value": "2+floor((@nvl.necromante-3)/5)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Necropotência",
			"subtipo": "Necromante",
			"nome": "Necrologia",
			"patch": {
				"disabled": true
			}
		}
	],
	"rfoEVDueZV9GN92J": [
		{
			"item": "Necrologia",
			"subtipo": "Necromante",
			"nome": "Necrologia: +2 na CD para resistir às suas magias de necromancia.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": "2+floor((@nvl.necromante-3)/5)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Necropotência",
			"subtipo": "Necromante",
			"nome": "Necrologia: +2 na CD para resistir às suas magias de necromancia.",
			"patch": {
				"system": {
					"onuse": false,
					"changes": []
				},
				"disabled": true
			}
		}
	],
	"yLIj09u6Tw8AD3vz": [
		{
			"item": "Palavras de Efeito",
			"subtipo": "Nobre",
			"nome": "Palavras de Efeito: soma seu Carisma no dano e reduz a ação para usá-la em um passo.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": []
					}
				}
			}
		}
	],
	"KgiqEWjDOcRTLh0O": [
		{
			"item": "Papiro das estrelas",
			"nome": "+5 em Percepção para evitar ser surpreendido por inimigos nos ermos",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Percepção"
						]
					}
				}
			}
		}
	],
	"nIZp535wN181SciU": [
		{
			"item": "Papiro das estrelas",
			"nome": "+5 em Sobrevivência para orientar-se e rastrear",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"jQFt68WB1ur8Jf5z": [
		{
			"item": "Parede de Escudos",
			"subtipo": "Grupo",
			"nome": "Parede de Escudos",
			"patch": {
				"transfer": false
			}
		}
	],
	"gxp1YOkjeV3Z60La": [
		{
			"item": "Pena da criação",
			"nome": "Pena da criação",
			"patch": {
				"disabled": true
			}
		}
	],
	"WcaCFadTe82fd0a0": [
		{
			"item": "Penas do predador primal",
			"nome": "Penas do predador primal",
			"patch": {
				"disabled": true
			}
		}
	],
	"fz8sP6wfQUPEQ9Bg": [
		{
			"item": "Pescador",
			"subtipo": "Mundana",
			"nome": "Pescador: sempre que prepara uma ação, recebe +2 em testes para executá-la.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"attack",
							"skill"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"z0ZFro1zzRPuFY4c": [
		{
			"item": "Piscar",
			"nome": "Piscar",
			"patch": {
				"transfer": false
			}
		}
	],
	"qF9RUy15AEhzCEiI": [
		{
			"item": "Poderio Muscular",
			"subtipo": "Atleta",
			"nome": "Façanha Atlética: Quando faz um teste de perícia, você pode gastar uma quantidade de PM a sua escolha (limitada pela sua Força). Para cada PM que gastar, recebe +2 no teste.",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					}
				}
			}
		}
	],
	"SijtSmEPtWGm73zj": [
		{
			"item": "Postura de Combate: Armamento Pesado",
			"subtipo": "Cavaleiro",
			"nome": "Postura de Combate: Armamento Pesado",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude"
						]
					}
				}
			}
		}
	],
	"l4cyWxAbiamdPDOx": [
		{
			"item": "Precavido",
			"subtipo": "Guerreiro",
			"nome": "Precavido: -2 em testes de resistência.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"e5UbTZBV8pqkHbRW": [
		{
			"item": "Primeiro Sangue",
			"subtipo": "Caçador",
			"nome": "Primeiro Sangue: Na primeira rodada de cada combate, você recebe +2 em testes de ataque e todos os seus dados de dano aumentam em dois passos.",
			"patch": {
				"disabled": false,
				"duration": {
					"value": 1,
					"units": "rounds",
					"expiry": "turnStart"
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "passos",
							"type": "custom",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"W1Wy7FNBORvbE1eF": [
		{
			"item": "Provocação Ousada",
			"subtipo": "Ventanista",
			"nome": "Provocação Ousada",
			"patch": {
				"duration": {
					"value": null,
					"units": "rounds",
					"expiry": "sceneEnd"
				}
			}
		}
	],
	"IsHxP6q6nY0gDm9B": [
		{
			"item": "Punhal das profundezas",
			"nome": "+3d6 pontos de dano de ácido",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "3d6[acido]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"tch5IPkFv9H3YOXu": [
		{
			"item": "Punhal das profundezas",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"XbsFbC7qjVcrI7pR": [
		{
			"item": "Resiliência Primal",
			"subtipo": "Machado de Pedra",
			"nome": "Resiliência Primal",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "min(15, 3*floor((@nvl.machado-de-pedra - 2)/3))",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"cXrkUib5dEiJxnbx": [
		{
			"item": "Saraivada Alquímica",
			"subtipo": "inventor",
			"nome": "Saraivada Alquímica: ao usar um preparado ou poção de dano, usa outra dose do mesmo item para aumentar o dano causado em",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 2
					}
				}
			}
		}
	],
	"2dxFMoS202iqunZo": [
		{
			"item": "Saúde Coletiva",
			"subtipo": "Grupo",
			"nome": "Saúde Coletiva: Sempre que você curar outro membro do grupo que tenham o poder Saúde Coletiva  , os PV recuperados aumentam em +2 por dado de cura.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d*2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"mSdWNHXnx9pxU9yD": [
		{
			"item": "Sede Sanguinária",
			"subtipo": "Bárbaro",
			"nome": "Rigidez Selvagem: Bônus da Fúria em Defesa, Fortitude e RD.",
			"patch": {
				"system": {
					"onuse": false,
					"changes": []
				},
				"disabled": true
			}
		}
	],
	"pQuEOAotVcdSpMBd": [
		{
			"item": "Servo",
			"subtipo": "Mundana",
			"nome": "Servo: recebe +2 em testes de Diplomacia e Enganação contra alvos que tenham status ou posição superior à sua.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					],
					"abilityUse": {
						"names": [
							"Diplomacia",
							"Enganação"
						]
					}
				}
			}
		}
	],
	"6DeJILS3tNhjruh9": [
		{
			"item": "Simetria Radial",
			"subtipo": "Tormenta",
			"nome": "Simetria Radial: recebe um bônus de +5 para evitar ser agarrado.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						],
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"JZ05xZEViKN6qEei": [
		{
			"item": "Suserano",
			"subtipo": "Vassalo",
			"nome": "Suserano: ocê recebe +5 em testes de Diplomacia e Intimidação ao lidar com vassalos de seu suserano de nível inferior ao seu.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Diplomacia",
							"Intimidação"
						]
					}
				}
			}
		}
	],
	"XKtcc1iQ8XdPOo54": [
		{
			"item": "Tanga de Peles",
			"subtipo": "Machado de Pedra",
			"nome": "Tanga de Peles",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "(max(0, floor((@nvl.machado-de-pedra +1)/4)))",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"iKVoiHZ9Ac9eVVs8": [
		{
			"item": "Tipo: Espírito",
			"subtipo": "Treinador",
			"nome": "Tipo: Espírito",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.atributos.sab.racial",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.car.racial",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "@nvl.melhor-amigo/2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.for.racial",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.des.racial",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.int.racial",
							"type": "add",
							"value": "-4",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.con.racial",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.walk.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Bb1e9HpmH3xSnRuu": [
		{
			"item": "Totem Gigante",
			"subtipo": "Bárbaro",
			"nome": "Totem Gigante",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.pda",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.carga.bonus",
							"type": "add",
							"value": "-10",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"iOd30YiHHVUCNrhg": [
		{
			"item": "Valentia Inata",
			"subtipo": "Hynne",
			"nome": "Valentia Inata",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.inic.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "medo",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"TV2my8cpC5zdnfje": [
		{
			"item": "Varinha Milenar",
			"nome": "Varinha Milenar",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "passos",
							"type": "custom",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"IDEH61x1nKlJxsQr": [
		{
			"item": "Vaso do Espírito",
			"subtipo": "Santo",
			"nome": "Vaso do Espírito: você pode gastar 1 PM para somar seu Carisma nesse teste.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"aoqymOsVNXJSKdHJ": [
		{
			"item": "Veloz",
			"subtipo": "Melhor Amigo",
			"nome": "Veloz",
			"patch": {
				"disabled": true
			}
		}
	],
	"4CxFZ6EA7p2WhoCT": [
		{
			"item": "Vingador Santificado",
			"subtipo": "Santo",
			"nome": "Vingador Santificado",
			"patch": {
				"transfer": false
			}
		}
	],
	"ffgmlATgMUTV7QJ2": [
		{
			"item": "Vinho Pruss",
			"nome": "Vinho Pruss",
			"patch": {
				"transfer": false
			}
		}
	],
	"4JfMXPddtKf9Jxem": [
		{
			"item": "Voz da Razão",
			"nome": "Voz da Razão (+2 PM)",
			"patch": {
				"transfer": false
			}
		}
	],
	"yq5T6a5mwiTUAIBn": [
		{
			"item": "Barreira de Coral",
			"subtipo": "Oceano",
			"nome": "Barreira de Coral",
			"patch": {
				"transfer": false
			}
		}
	],
	"4gNpGbE4lSyUN7X7": [
		{
			"item": "Poder de Kallyadranoch",
			"nome": "Poder de Kallyadranoch",
			"patch": {
				"transfer": false
			}
		}
	],
	"4IV9vmuU8k5zkHK8": [
		{
			"item": "Toque de Megalokk",
			"nome": "Toque de Megalokk",
			"patch": {
				"transfer": false,
				"system": {
					"changes": [
						{
							"key": "system.pericias.inti.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.ades.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.atua.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.dipl.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.enga.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.joga.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"8bkxhSzG5ziDOEOm": [
		{
			"item": "Ferramentas da Guerra",
			"subtipo": "Arsenal",
			"nome": "Ferramentas da Guerra: RD 2",
			"patch": {
				"transfer": false
			}
		}
	],
	"fX8q7Fw5I0oau3CZ": [
		{
			"item": "Paixão de Marah",
			"nome": "Paixão de Marah",
			"patch": {
				"transfer": false
			}
		}
	],
	"MSJNwFS6zDfpUdq3": [
		{
			"item": "Exaltar Honra",
			"subtipo": "Honra",
			"nome": "Exaltar Honra (Pessoas Honradas)",
			"patch": {
				"transfer": false
			}
		}
	],
	"0lhUqNtEozRCAVuz": [
		{
			"item": "Exaltar Honra",
			"subtipo": "Honra",
			"nome": "Exaltar Honra (Pessoas Desonradas)",
			"patch": {
				"transfer": false,
				"system": {
					"changes": [
						{
							"key": "system.pericias.enga.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.ladi.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"2SivF4lh9m42RRO6": [
		{
			"item": "Perturbação Sombria",
			"nome": "Perturbação Sombria",
			"patch": {
				"transfer": false
			}
		}
	],
	"2kweFX6JRLbExbgu": [
		{
			"item": "Guardei para Você",
			"subtipo": "Mauziell, a Deusa das Avós",
			"nome": "Guardei para Você",
			"patch": {
				"transfer": false
			}
		}
	],
	"YxuRTo98UZ17UgKu": [
		{
			"item": "Posse de Arsenal",
			"nome": "Posse de Arsenal",
			"patch": {
				"transfer": false
			}
		}
	],
	"zdP290pYTuI0ZVsG": [
		{
			"item": "Percepção Rubra",
			"nome": "Percepção Rubra",
			"patch": {
				"transfer": false
			}
		}
	],
	"URs6nmqNS2VHkMcp": [
		{
			"item": "Pilar de Heredrimm",
			"subtipo": "Khalmyr",
			"nome": "Pilar de Heredrimm",
			"patch": {
				"transfer": false
			}
		}
	],
	"euJMEnagrNB1Z4Ai": [
		{
			"item": "Proteção de Tauron",
			"nome": "Proteção de Tauron",
			"patch": {
				"transfer": false
			}
		}
	],
	"K3lCyGrFnCK0hVhK": [
		{
			"item": "Cancioneiro da Esperança",
			"subtipo": "Marah",
			"nome": "Cancioneiro da Esperança",
			"patch": {
				"transfer": false
			}
		}
	],
	"Iff5qDObwy6FUB8E": [
		{
			"item": "Dádiva da Fé: Cólera Divina",
			"subtipo": "Frade",
			"nome": "Dádiva da Fé: Cólera Divina",
			"patch": {
				"transfer": false
			}
		}
	],
	"DWM56ug1RBsTN0E4": [
		{
			"item": "Infortúnio de Sszzaas",
			"nome": "Infortúnio de Sszzaas (Fortitude)",
			"patch": {
				"transfer": false
			}
		}
	],
	"81SJ6jnN4Lsc1zrG": [
		{
			"item": "Infortúnio de Sszzaas",
			"nome": "Infortúnio de Sszzaas (Reflexos)",
			"patch": {
				"transfer": false
			}
		}
	],
	"fB8zDfgu7JCqv3uh": [
		{
			"item": "Infortúnio de Sszzaas",
			"nome": "Infortúnio de Sszzaas (Vontade)",
			"patch": {
				"transfer": false
			}
		}
	],
	"ej0EeLzfJDECURek": [
		{
			"item": "Couraça de Allihanna",
			"nome": "Couraça de Allihanna",
			"patch": {
				"transfer": false
			}
		}
	],
	"obQpQ23v4ifdAa6l": [
		{
			"item": "Instante Estoico",
			"nome": "Instante Estoico (RD 10)",
			"patch": {
				"transfer": false
			}
		}
	],
	"wZ7FmY9lB1y11Zwx": [
		{
			"item": "Futuro Melhor",
			"nome": "Futuro Melhor",
			"patch": {
				"transfer": false
			}
		}
	],
	"YOUuQWtjWA0rDVCW": [
		{
			"item": "Dádiva da Fé: Proteção Sagrada",
			"subtipo": "Frade",
			"nome": "Dádiva da Fé: Proteção Sagrada",
			"patch": {
				"transfer": false
			}
		}
	],
	"3lkrWsVvTlFlKJST": [
		{
			"item": "Escapatória de Hyninn",
			"nome": "Escapatória de Hyninn (Ladinagem)",
			"patch": {
				"transfer": false
			}
		}
	],
	"y6wKyzlITXIRbJUa": [
		{
			"item": "Escapatória de Hyninn",
			"nome": "Escapatória de Hyninn (Reflexos)",
			"patch": {
				"transfer": false
			}
		}
	],
	"NIxAZR4brETV6NRD": [
		{
			"item": "Selvageria Marcial",
			"subtipo": "Hurlaagh,   o Deus dos Hobgoblins",
			"nome": "Selvageria Marcial - Ativar se Treinado em Guerra",
			"patch": {
				"transfer": false
			}
		}
	],
	"aRiAoNw5NLae3u25": [
		{
			"item": "Chassi Dourado",
			"subtipo": "Golem",
			"nome": "Chassi Dourado: +1d6 pontos de dano de luz",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[luz]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"asOoQ5tth2sd2kjC": [
		{
			"item": "Espírito Animal",
			"subtipo": "Allihanna",
			"nome": "+5 PV temporarios",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"D8ULFoN97qScgINe": [
		{
			"item": "Quebrar Encanto",
			"subtipo": "Khalmyr",
			"nome": "Quebrar Encanto",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"I09huvhiV7ZFmnsu": [
		{
			"item": "Armadura de Ossos",
			"subtipo": "Tenebra",
			"nome": "Armadura de Ossos",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.inti.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.corte.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.trevas.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"NzM7YQ5g3h2zahuD": [
		{
			"item": "Fúria dos Antepassados",
			"nome": "aumenta o dano psíquico e de luz em +1d6 cada.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[psiquico]",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[luz]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"qIdLI1UPwO8rEW5Y": [
		{
			"item": "Bola de Fogo Flamejante",
			"nome": "Sob o sol",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "6d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"3MzCpMqkNQT1fhrk": [
		{
			"item": "Espada Monástica",
			"nome": "Inscritura - formidável",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"fIgwhmEYpxs6Icsy": [
		{
			"item": "Espada Monástica",
			"nome": "Inscritura - magnífica",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"1wdUO0qblITJpnOO": [
		{
			"item": "Alfange Dourado",
			"nome": "Lamina Dourada (1To$)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"AzZjZjs0GfDb4NNJ": [
		{
			"item": "Alfange Dourado",
			"nome": "Lamina dourada (10 To$)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"yAxSb5Yk9zQ9TRtE": [
		{
			"item": "Alfange Dourado",
			"nome": "Lamina Dourada (50 To$)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "6",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"RhYgFU9rJo3hxZdu": [
		{
			"item": "Alfange Dourado",
			"nome": "Lamina Dourada (100 To$)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "7",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"d0CwyGqxjPC5EgFv": [
		{
			"item": "Ouro de Dragão",
			"nome": "Ouro do Dragão: +1 em testes de ataque.",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Xrf2UUg4KlRJBrkl": [
		{
			"item": "Dente do Leviatã",
			"nome": "Pungente",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "ignoraRD",
							"type": "add",
							"value": "30",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"c3AxyA6TXnkht7PS": [
		{
			"item": "Raio de Sol",
			"nome": "Energética",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "ignoraRD",
							"type": "add",
							"value": "20",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"BcWZWyNSViL0rU5K": [
		{
			"item": "Martelo dos Trovões",
			"nome": "Cruel",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"vkOiFteuRhiSWim5": [
		{
			"item": "Cajado das Matas (Campeão)",
			"nome": "Magnífico",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Yx5yG4wQzUeKVAMu": [
		{
			"item": "Maça Monstruosa (Campeão)",
			"nome": "Magnífica",
			"patch": {
				"name": "Formidável",
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"NXJrXHORBbKvfBUn": [
		{
			"item": "Vestido Noturno",
			"nome": "Vestido Noturno",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.refl.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.enga.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Vestido Noturno (Devoto)",
			"nome": "Vestido Noturno",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.refl.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.enga.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"mBqHlzR8926ORSMG": [
		{
			"item": "Sandálias",
			"nome": "Sandálias: -2 em testes para resistir a condições climáticas e para evitar ser derrubado no chão.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"OES50fDWOfZLjGPk": [
		{
			"item": "Patuá",
			"nome": "Patuá",
			"patch": {
				"system": {
					"changes": []
				}
			}
		}
	],
	"UPQKhPfaFIVJLnHI": [
		{
			"item": "Perturbação Sombria",
			"nome": "muda o efeito para aura de 9m.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "area",
							"type": "override",
							"value": "circulo 9m",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Idnvj8kWtszosd4y": [
		{
			"item": "Coroa de flores",
			"nome": "Coroa de flores",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": false,
						"automatic": true
					},
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d*1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"pTzOS2QqAu6ylOE7": [
		{
			"item": "Siroco de Azgher",
			"nome": "muda o tipo de dano para luz.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "tipoDano",
							"type": "override",
							"value": "luz",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"sLiV5kFphlBeuHFi": [
		{
			"item": "Versiculário",
			"subtipo": "Frade",
			"nome": "Versiculário: +1 PM para gastar em aprimoramentos.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": -1
					}
				}
			}
		}
	],
	"uY2CxKP8uCGCC8WG": [
		{
			"item": "Poder de Kallyadranoch",
			"nome": "aumenta a CD em +1 (bônus máximo limitado pelo círculo máximo de magias que você pode lançar). Requer 3° círculo.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 2
					}
				}
			}
		}
	],
	"NMYrZeWMmdC22r8f": [
		{
			"item": "Palavra de Poder",
			"subtipo": "Tanna-Toh",
			"nome": "Palavras de Poder: -1 PM em comando",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": -1
					}
				}
			}
		}
	],
	"VKbGGxjjh4Jdqg3d": [
		{
			"item": "Ampliar Sacrário",
			"subtipo": "Frade",
			"nome": "Ampliar Sacrário: Você pode criar sacrários em alcance médio e eles passam a ocupar uma esfera de 6m de raio.",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": null,
						"automatic": true
					},
					"changes": [
						{
							"key": "area",
							"type": "override",
							"value": "raio 6m",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "alcance",
							"type": "override",
							"value": "médio",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"kAHBX5m5iJ52q4GF": [
		{
			"item": "Ego",
			"subtipo": "Sckhar, o Dragão-Rei do Fogo",
			"nome": "Ego - Perícia",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"zONGz8bcEIkobjpa": [
		{
			"item": "Ego",
			"subtipo": "Sckhar, o Dragão-Rei do Fogo",
			"nome": "Ego - Atributo",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"0XN1BGSasNVpymM7": [
		{
			"item": "Ego",
			"subtipo": "Sckhar, o Dragão-Rei do Fogo",
			"nome": "Ego - Ataque",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"EF2dnR3sdIhffrLa": [
		{
			"item": "Adaga Noturna",
			"subtipo": "Tenebra",
			"nome": "Adaga Noturna",
			"patch": {
				"system": {
					"abilityUse": {
						"custo": null
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[frio]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"aJnwAoMw3dMVSK4p": [
		{
			"item": "Couraça de Allihanna",
			"nome": "além do normal, o alvo fornece o mesmo bônus em testes de resistência. Requer 3° círculo.",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": false
					}
				}
			}
		}
	],
	"y3SUMl2HG6cNYyXi": [
		{
			"item": "Instante Estoico",
			"nome": "além do normal, para cada 10 pontos de dano que a magia reduzir em um turno, sua próxima rolagem de dano feita até a próxima rodada causa +1d6 pontos de dano de essência.",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": false
					}
				}
			}
		}
	],
	"DhupPF204cD93dFt": [
		{
			"item": "Mago Branco",
			"subtipo": "Frade",
			"nome": "Mago Branco: –1 PM em magias de cura de luz e curam +1 PV por dado de cura.",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					}
				}
			}
		}
	],
	"414fDF8tKERTC2Gn": [
		{
			"item": "Alcançar os Céus",
			"subtipo": "Hydora,   o Dragão-Rei das Nuvens",
			"nome": "+3m de Voo por PM",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						],
						"automatic": false
					}
				}
			}
		}
	],
	"xpq9UewfQ2e48Exc": [
		{
			"item": "Chamado da Colmeia",
			"subtipo": "Apis, a Deusa das Abelhas",
			"nome": "Chamado da Colmeia",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"LTuYri2XwOCD5Uzh": [
		{
			"item": "Um Contra Um",
			"subtipo": "Drumak, o Deus do Duelo",
			"nome": "Um Contra Um: +2 em testes de ataque e rolagens de dano contra ele até o fim da cena.",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					}
				}
			}
		}
	],
	"DPoPaCqIk5jzcZpz": [
		{
			"item": "Um Contra Um",
			"subtipo": "Drumak, o Deus do Duelo",
			"nome": "Um Contra Um: Se tiver a habilidade Duelo, em vez disso seu custo diminui em –1 PM.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"dC7vnNHxIKUafV3M": [
		{
			"item": "Jogada Decisiva",
			"subtipo": "Champarr, o Deus dos Jogos",
			"nome": "Jogada Decisiva: Uma vez por dia, quando faz um teste, você pode gastar 1 PM para somar +2 por patamar no teste.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.geral",
							"type": "add",
							"value": "2*@patamar",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"PR4ZJ3O5E2D8yqRf": [
		{
			"item": "Manha da Cidade",
			"subtipo": "O Deus das Cidades",
			"nome": "Manha da Cidade: Quando está em uma comunidade, você soma sua Sabedoria (mínimo de 1) em testes de Conhecimento, Investigação, Ladinagem e Nobreza.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Conhecimento",
							"Investigação",
							"Ladinagem",
							"Nobreza"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "max(1, @sab)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"rZ2sVs0PQfv8iJY9": [
		{
			"item": "Inimigo dos Deuses",
			"subtipo": "Sartan, o Deus da Desolação",
			"nome": "Inimigo dos Deuses: Resistência a Magia Divina +5",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"P9KTHby32nr9Pf7O": [
		{
			"item": "Luminar (Parceiro)",
			"subtipo": "Parceiro",
			"nome": "Luminar (Veterano): pode gastar 2 PM para conceder um bônus de +2 em seus testes de ataque e de resistência, e nos de seus aliados em alcance curto, por 1 rodada.",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"sxqxn0vhmBd0SaIL": [
		{
			"item": "Sono Reparador",
			"subtipo": "Neruíte, a Deusa do Sono",
			"nome": "Sono Reparador: recebe +1d6 em um teste de perícia a sua escolha realizado até o fim do dia.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "1d6",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Vbo31Vv05DARaGAb": [
		{
			"item": "Ossos de Dracônicos (Devoto)",
			"nome": "Ossos de Dragão",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"power",
							"spell"
						]
					}
				}
			}
		}
	],
	"LaLR3qYdLkoBNhpu": [
		{
			"item": "Bordão Sabichão (Devoto)",
			"nome": "Conselho do Sabichão",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"skill",
							"attack"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "@sab",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "ataque",
							"type": "add",
							"value": "@sab",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"UaK2XEJp3YbLv44P": [
		{
			"item": "Montaria: Pégaso de Khalmyr",
			"subtipo": "Montaria",
			"nome": "Pégaso de Khalmyr: Caso aprenda Círculo da Justiça novamente, seu custo diminui em -1 PM",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Círculo da Justiça"
						]
					}
				}
			}
		}
	],
	"ZVkAL7wJFfgDzMoI": [
		{
			"item": "Canção Divina",
			"subtipo": "Canora,   a Deusa da Canção",
			"nome": "Canção Divina: Caso aprenda Despedaçar novamente, seu custo diminui em –1 PM",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Despedaçar"
						]
					}
				}
			}
		}
	],
	"ZIho1esdcMri1g6F": [
		{
			"item": "Pureza Corporal",
			"subtipo": "Caerdellach,   o Deus dos Unicórnios",
			"nome": "Pureza Corporal: Além disso, se aprender a magia Purificação, o custo dela diminui em –1 PM.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Purificação"
						]
					}
				}
			}
		}
	],
	"usjI54hJGjhpBXZP": [
		{
			"item": "Máscara Mística",
			"subtipo": "Blinar,   o Deus das Máscaras",
			"nome": "Máscara Mística: Caso aprenda uma dessas magias, seu custo diminui em –1 PM enquanto você estiver de máscara.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Disfarce Ilusório",
							"Proteção Divina"
						]
					}
				}
			}
		}
	],
	"uV91UMCDvxIXr0AH": [
		{
			"item": "Mangual Aventureiro (Devoto)",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					}
				}
			}
		}
	],
	"BBmWzfxsl4QKKRs4": [
		{
			"item": "Machado Lamnoriano (Devoto)",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					}
				}
			}
		}
	],
	"VkWLaCzO3W1DQAsc": [
		{
			"item": "Espada Imaculada (Devoto)",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					}
				}
			}
		}
	],
	"gAmGPXW2Q3FRPe7j": [
		{
			"item": "Inoculadora",
			"nome": "Magnífica",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					}
				}
			}
		}
	],
	"eaoMDqLkynanzAo3": [
		{
			"item": "Arsenal do Oceano",
			"subtipo": "Tessalus, o Deus dos Elfos-do-Mar",
			"nome": "Arsenal do Oceano",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "criticoM",
							"type": "add",
							"value": "-1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"7GYwttPVNYsYxjNc": [
		{
			"item": "Espadachim Divino",
			"subtipo": "A Espada-Deus",
			"nome": "Espadachim Divino",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true,
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "criticoX",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"soComArma": "espada"
					}
				}
			}
		}
	],
	"xZfnXi8h9nhNQYwo": [
		{
			"item": "Ginete Altivo",
			"subtipo": "Hippion",
			"nome": "Ginete Ativo",
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": false,
						"types": [
							"attack",
							"skill"
						],
						"names": [
							"Cavalgar"
						]
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "roll",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"ROSsKQHhrIotWzUn": [
		{
			"item": "Igual ao Lar",
			"subtipo": "Gratissa,   a Deusa da Hospitalidade",
			"nome": "Igual ao Lar",
			"patch": {
				"disabled": true
			}
		}
	],
	"JAZaoYVA6vUggX5r": [
		{
			"item": "Irmão da Coragem",
			"subtipo": "Zakharov, o Deus da Bravura",
			"nome": "Irmão da Coragem - Se Imune a Medo",
			"patch": {
				"disabled": true
			}
		}
	],
	"tRDC1hP40kSYphsR": [
		{
			"item": "Pé na Estrada",
			"subtipo": "Laan, o Deus das Viagens",
			"nome": "Pé na Estrada",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.movement.walk.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "imovel",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "lento",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"twRxGWUxlv2RAt0I": [
		{
			"item": "Montaria: Gamo",
			"subtipo": "Montaria",
			"nome": "Montaria: Gamo Veterano",
			"patch": {
				"disabled": true
			}
		}
	],
	"BgtAOD998pSd5L4y": [
		{
			"item": "Montaria: Pégaso",
			"subtipo": "Montaria",
			"nome": "Montaria: Pégaso Veterano",
			"patch": {
				"disabled": true
			}
		}
	],
	"2VP6Fd1haOLsrBTx": [
		{
			"item": "Montaria: Pégaso",
			"subtipo": "Montaria",
			"nome": "Montaria: Pégaso Mestre",
			"patch": {
				"disabled": true
			}
		}
	],
	"HyPudJzlt7khj6FW": [
		{
			"item": "Pena de Anjo",
			"nome": "Pena de Anjo: Os alvos de uma magia divina lançada com uma pena de anjo recuperam 1d8 PV (além dos efeitos da magia).",
			"patch": {
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"types": [
							"consumable",
							"spell"
						]
					}
				}
			}
		}
	],
	"5Ta6KIKV0xDjE2pV": [
		{
			"item": "Lantejoula",
			"nome": "Lantejoula: Diminui o custo de magias de ilusão em –1 PM.",
			"patch": {
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"types": [
							"consumable",
							"spell"
						]
					}
				}
			}
		}
	],
	"MnhkSWSXuvEWijjp": [
		{
			"item": "Frasco de Luz",
			"nome": "Frasco de Luz: +2 na CD de magias de luz",
			"patch": {
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"types": [
							"consumable",
							"spell"
						]
					}
				}
			}
		}
	],
	"mrPRyFQvxBLSqfea": [
		{
			"item": "Pedra de Sombras",
			"nome": "Pedra de Sombras: –1 PM o custo de magias de trevas.",
			"patch": {
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"types": [
							"consumable",
							"spell"
						]
					}
				}
			}
		}
	],
	"Twf4bsfuq338DqJO": [
		{
			"item": "Fitilho consagrado",
			"nome": "Fitilho Consagrado: +1 PM para gastar em um aprimoramento.",
			"patch": {
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"types": [
							"consumable",
							"spell"
						]
					}
				}
			}
		}
	],
	"pITEZetMMPrYL6Ju": [
		{
			"item": "Katana da Determinação (Devoto)",
			"nome": "Derrotar Lefeu",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		},
		{
			"item": "Katana da Determinação (Campeão)",
			"nome": "Derrotar Lefeu",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"oxK74YYXm5s5Hltn": [
		{
			"item": "Tridente Aquoso",
			"nome": "Magnífica",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"6k6CCyRCGlMZqU1Q": [
		{
			"item": "Euforia de Valkaria",
			"nome": "muda a execução para reação e a duração para 1 rodada. Em vez do normal, o alvo recebe imunidade a medo e +5 em Vontade. Requer 2° círculo.",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"4lMRiAeT7K76Qyuc": [
		{
			"item": "Ferramentas da Guerra",
			"subtipo": "Arsenal",
			"nome": "Ferramentas da Guerra: +2 em rolagens de dano",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"fNPvpb7aHHKnbp0f": [
		{
			"item": "Imolação Sagrada",
			"subtipo": "Azgher, Thyatis",
			"nome": "Imolação Sagrada",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"w6Xt7G3GEknMaAKR": [
		{
			"item": "Assado de Entranhas",
			"nome": "Assado de Entranhas:  +1 nas rolagens de dano com armas corpo a corpo",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"yT1DaZlfYAhqeUd5": [
		{
			"item": "Joia do Deserto",
			"nome": "Joia do Deserto: +1d6 pontos de dano de fogo",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"SPiGGj47OPVlDYqy": [
		{
			"item": "Joia do Deserto",
			"nome": "Joia do Deserto: +2d6 pontos de dano de fogo contra mortos-vivos",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"0373SeJii7eI1tTB": [
		{
			"item": "Sacrário da Erudição",
			"subtipo": "Frade",
			"nome": "Sacrário de Erudição: Quando lançam magias a partir de pergaminhos, você e seus aliados dentro do sacrário recebem +1 PM para gastar em aprimoramentos",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"abilityUse": {
						"types": [
							"consumable"
						]
					}
				}
			}
		}
	],
	"WvDEn4t30DnJKHPQ": [
		{
			"item": "Cimitarra Solar (Campeão)",
			"nome": "Pungente",
			"patch": {
				"name": "Precisa",
				"system": {
					"changes": [
						{
							"key": "criticoM",
							"type": "add",
							"value": "-1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"iDDRgU4TyDgoiICZ": [
		{
			"item": "Montaria: Troll",
			"subtipo": "Montaria",
			"nome": "Troll Veterano: você recebe +2 em testes para agarrar e derrubar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"hg6pdhlp5gELPw3H": [
		{
			"item": "Montaria: Troll",
			"subtipo": "Montaria",
			"nome": "Troll Mestre: o bônus para agarrar e derrubar aumenta para +5.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"6reU76b8ldEk6IjW": [
		{
			"item": "Montaria: Tuntram",
			"subtipo": "Montaria",
			"nome": "Tuntram Iniciante: você recebe +2 em testes de ataque para derrubar e empurrar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"LO8XkerHwbP22yx7": [
		{
			"item": "Montaria: Deinonico",
			"subtipo": "Montaria",
			"nome": "Deinonico Veterano: você recebe +5 em testes de Atletismo para saltar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Atletismo"
						]
					}
				}
			}
		}
	],
	"C2MJlTxWyg8IYjJq": [
		{
			"item": "Montaria: Urso Panda",
			"subtipo": "Montaria",
			"nome": "Urso Panda Iniciante: +2 em Diplomacia.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Diplomacia"
						]
					}
				}
			}
		}
	],
	"v02sFR2gqJpWjOsB": [
		{
			"item": "Veste de Teia de Aranha",
			"nome": "Veste de Teia de Aranha: +5 na furtividade.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"LqMJNPik7hihWfeC": [
		{
			"item": "Montaria: Dai-Kabuto",
			"subtipo": "Montaria",
			"nome": "Dai-Kabuto Iniciante: recebe +2 em testes de agarrar e derrubar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"KlEEtEMRHHd6xMSv": [
		{
			"item": "Perdigueiro Troll (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Perdigueiro Troll Iniciante: você recebe +2 em Percepção e Sobrevivência.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Percepção",
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"CrWNNduMXgIV8xjq": [
		{
			"item": "Perdigueiro Troll (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Perdigueiro Troll Veterano: você recebe +2 em testes para agarrar e derrubar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"SDPxOA5j4kq51d4n": [
		{
			"item": "Perdigueiro Troll (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Perdigueiro Troll Mestre: você recebe +5 em Percepção e Sobrevivência.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Percepção",
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"pFQIEFzZUklwoopT": [
		{
			"item": "Saltador",
			"subtipo": "Tabrachi",
			"nome": "+10 em atletismo para saltar",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Atletismo"
						]
					}
				}
			}
		}
	],
	"LmGkaKNMfeHzF4tF": [
		{
			"item": "Montaria: Sapo Atroz",
			"subtipo": "Montaria",
			"nome": "Sapo Atroz Iniciante: +5 em testes de Atletismo para saltar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Atletismo"
						]
					}
				}
			}
		}
	],
	"7Af8EpbDpdZnEefy": [
		{
			"item": "Montaria: Sapo Atroz",
			"subtipo": "Montaria",
			"nome": "Sapo Atroz Veterano: você recebe +2 em testes para derrubar e desarmar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"BZOkTJTGl8x39Yir": [
		{
			"item": "Montaria: Sapo Atroz",
			"subtipo": "Montaria",
			"nome": "Sapo Atroz Mestre: muda o bônus de Atletismo para +10.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Atletismo"
						]
					}
				}
			}
		}
	],
	"xA8ehXy34LajrQiF": [
		{
			"item": "Gambá (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Gambá Mestre: +5 em Iniciativa e Percepção",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Iniciativa",
							"Percepção"
						]
					}
				}
			}
		}
	],
	"HWWW4G55Izp7qYct": [
		{
			"item": "Montaria: Elefante",
			"subtipo": "Montaria",
			"nome": "Elefante Mestre: Você recebe +5 em testes de manobra para atropelar.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Luta"
						]
					}
				}
			}
		}
	],
	"wvwXpKLSqIRSkD3B": [
		{
			"item": "Montaria: Galhada (Macho)",
			"subtipo": "Montaria",
			"nome": "Galhada (Macho) Iniciante: +2 em Sobrevivência",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"LMzQVme1ap7h48ry": [
		{
			"item": "Montaria: Hippossauro",
			"subtipo": "Montaria",
			"nome": "Hippossauro Macho Iniciante: +2 em Diplomacia.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Diplomacia"
						]
					}
				}
			}
		}
	],
	"sbz3gmlVTkqn3dEE": [
		{
			"item": "Montaria: Hippossauro",
			"subtipo": "Montaria",
			"nome": "Hippossauro Fêmea Iniciante: +2 em Furtividade.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Furtividade"
						]
					}
				}
			}
		}
	],
	"xkLPdVJXQ6MMknaa": [
		{
			"item": "Montaria: Cavalo Esqueleto",
			"subtipo": "Montaria",
			"nome": "Cavalo Esqueleto Veterano: +2 em Intimidação.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Intimidação"
						]
					}
				}
			}
		}
	],
	"xxZrqPD4T4Wd39mb": [
		{
			"item": "Montaria: Dromedário",
			"subtipo": "Montaria",
			"nome": "Dromedário Veterano: você recebe +2 em Percepção e Sobrevivência (este bônus é dobrado em desertos).",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Percepção",
							"Sobrevivência"
						]
					}
				}
			}
		}
	],
	"kMn6Bh0JlS0Sc5GB": [
		{
			"item": "Montaria: Tigre",
			"subtipo": "Montaria",
			"nome": "Tigre Iniciante: +5 em Iniciativa",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Iniciativa"
						]
					}
				}
			}
		}
	],
	"cs9Kzf7yg9ZoVTaF": [
		{
			"item": "Tentacute (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Tentacute Iniciante: você recebe +2 em Percepção.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Percepção"
						]
					}
				}
			}
		}
	],
	"dKF1ss3lw7JvoHQa": [
		{
			"item": "Tentacute (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Tentacute Mestre: você recebe +4 em Percepção.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Percepção"
						]
					}
				}
			}
		}
	],
	"UHrFReWus8gUz3ja": [
		{
			"item": "Turista da Academia",
			"subtipo": "Academia Arcana",
			"nome": "Resistência a Magia +2",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"V4Ao8pZ8qP087mSW": [
		{
			"item": "Lupa",
			"nome": "+1 em investigação.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Investigação"
						]
					}
				}
			}
		}
	],
	"FcWHp2jv6MfkESoF": [
		{
			"item": "Escudeiro Solitário",
			"subtipo": "Bielefeld",
			"nome": "Escudeiro Solitário: +10 em enganação",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Enganação"
						]
					}
				}
			}
		}
	],
	"knOzRm7bDFVKJMwI": [
		{
			"item": "Títulos de terras expirados",
			"nome": "+2 em diplomacia.",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Diplomacia"
						]
					}
				}
			}
		}
	],
	"pJGpPpg3ER5bvv6Z": [
		{
			"item": "Procurado: Vivo ou Morto",
			"subtipo": "Smokestone",
			"nome": "Procurado: Vivo ou Morto (Intimidação)",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Intimidação"
						]
					}
				}
			}
		}
	],
	"WvjAehfCbfwJjJpw": [
		{
			"item": "Tatuagem Mística",
			"nome": "Tatuagem Mística: Resistência a Magia +2",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"Vr0i9Z6imiNLNrbH": [
		{
			"item": "Gambá (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Gambá Iniciante: +2 em Iniciativa e Percepção",
			"patch": {
				"system": {
					"abilityUse": {
						"names": [
							"Iniciativa",
							"Percepção"
						]
					}
				}
			}
		}
	],
	"N3brMJmNKdWpoc9j": [
		{
			"item": "Pistola Demoníaca",
			"nome": "Ameaçadora",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"VeEA2fdi82nOs1wf": [
		{
			"item": "Pistola Demoníaca",
			"nome": "Formidável",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"reodh1KB09NLW6c0": [
		{
			"item": "Pistola Demoníaca",
			"nome": "Profana",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"6XxVILJ5jKLz5Kr4": [
		{
			"item": "Pistola-Punhal",
			"nome": "Dano extra corpo a corpo",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"FPixg7yFKQtdgvDT": [
		{
			"item": "Pistola-Punhal",
			"nome": "Ataque a distancia",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"7yE2Q6KGSFhScuQd": [
		{
			"item": "Lança de Fogo",
			"nome": "Arma de fogo",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"wb3gBhYciJIgfGdb": [
		{
			"item": "Tetsubo",
			"nome": "Tetsubo: +2 em testes para derrubar ou empurrar.",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"ocnn7OOTTCn1q6VE": [
		{
			"item": "Mordida do Diabo",
			"nome": "Arma Versátil: +2 em testes de agarrar",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"NtAuMq6dhsvAC0OM": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Magnífica",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"6nBzyiBVnguTrCTQ": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Sagrado",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"wnW6qOAfYO6iBsL1": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Piedoso",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"IvbI18Nx9fetSRJS": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Profano",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"hUUzQ52vCS40Qndo": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Arremesso",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"2xR9PlAnhHmFDeav": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Dilacerante",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"gfFjapUCxsO0920b": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Energética",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"Tk5Y3E1RtB8cfaXK": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Defensora",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"BNO3nE1qtQ5gn8Yl": [
		{
			"item": "Uyzrrak Da’ukthra",
			"nome": "Adamante",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"iIM4UxdwwsqVqAiJ": [
		{
			"item": "Rompedor da Realidade",
			"nome": "Matéria Vermelha",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"d5arkrATy6UjUkxB": [
		{
			"item": "Rompedor da Realidade",
			"nome": "Magnífica",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"self"
						]
					}
				}
			}
		}
	],
	"ku00EcStgwgwTtn7": [
		{
			"item": "Transformação em Dragão",
			"nome": "Transformação em Dragão",
			"patch": {
				"transfer": false
			}
		}
	],
	"nKQwKMCbDsNju8yZ": [
		{
			"item": "Pernas Aprimoradas",
			"subtipo": "Mashin",
			"nome": "Pernas Aprimoradas",
			"patch": {
				"transfer": false,
				"duration": {
					"value": null,
					"units": "rounds",
					"expiry": "sceneEnd"
				}
			}
		}
	],
	"GTW2mnUkt8uknJCI": [
		{
			"item": "Asas Dracônicas",
			"subtipo": "Kallyanach",
			"nome": "Asas Dracônicas",
			"patch": {
				"transfer": false
			}
		}
	],
	"CuYd4Iz6wA7ABzvW": [
		{
			"item": "Cria das Águas",
			"subtipo": "Elfo-do-Mar",
			"nome": "Cria das Águas",
			"patch": {
				"disabled": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"890IWftCoDmRddit": [
		{
			"item": "Estirge (Familiar)",
			"subtipo": "Arcanista",
			"nome": "Estirge (Familiar)",
			"patch": {
				"transfer": false
			}
		}
	],
	"bZZRbl6yXkNYpnjk": [
		{
			"item": "Sashimi de Kraken",
			"nome": "Sashimi de Kraken",
			"patch": {
				"transfer": false
			}
		}
	],
	"ggwo0bkARX9s45hH": [
		{
			"item": "Cozido de Serpe",
			"nome": "Cozido de Serpe",
			"patch": {
				"transfer": false
			}
		}
	],
	"8TcmatQDBrSNNmgi": [
		{
			"item": "Omelete Monstruosa",
			"nome": "Omelete Monstruosa",
			"patch": {
				"transfer": false
			}
		}
	],
	"wzapeV5eXOOdPojD": [
		{
			"item": "Feroz",
			"subtipo": "Orc",
			"nome": "Feroz (+2)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"xzmygFXS2U0Vn2GZ": [
		{
			"item": "Feroz",
			"subtipo": "Orc",
			"nome": "Feroz (+4)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": 4,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"CLSSkK9n7doUO4WA": [
		{
			"item": "Táticas de Matilha",
			"subtipo": "Moreau (Lobo)",
			"nome": "Táticas de Matilha",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "criticoM",
							"type": "add",
							"value": -2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"h6cKLozNVn6sYqQE": [
		{
			"item": "Espreitador",
			"subtipo": "Moreau (Coruja)",
			"nome": "Espreitador",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.perc.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.vont.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"62jFSpTplionoyAR": [
		{
			"item": "Montaria: Warg",
			"subtipo": "Montaria",
			"nome": "Montaria: Warg Veterano",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"3chpjrlmzN1vhhrU": [
		{
			"item": "Cocatriz (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Cocatriz Veterano: a CD para resistir a essas habilidades aumenta em +2.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"WXzGNe7gw5N8b57V": [
		{
			"item": "Dragão Filhote (Familiar)",
			"subtipo": "Arcanista",
			"nome": "Dragão Filhote: suas magias que causam dano do mesmo tipo que o sopro do dragão têm a CD aumentada em +2 e custam –1 PM",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"QPpxHaXuqjFSxPAx": [
		{
			"item": "Montaria: Tumarkhân",
			"subtipo": "Montaria",
			"nome": "Montaria: Tumarkhân Iniciante",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.movement.walk.base",
							"type": "override",
							"value": 12,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.carga.bonus",
							"type": "add",
							"value": 5,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"qaQIgvf91VcIUGU6": [
		{
			"item": "Montaria: Tumarkhân",
			"subtipo": "Montaria",
			"nome": "Montaria: Tumarkhân Mestre",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.carga.bonus",
							"type": "add",
							"value": 5,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"qHSzcpyDXxOy1wR3": [
		{
			"item": "Trapaceiro Ahleniense",
			"subtipo": "Ahlen",
			"nome": "Trapaceiro Ahleniense",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.enga.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"gCn55Va0VBrhm5fV": [
		{
			"item": "Algravia",
			"nome": "Algravia: +1 em perícias baseadas em carisma.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"nZHU17OJssHyhs8H": [
		{
			"item": "Atributos - Kaijin",
			"subtipo": "Kaijin",
			"nome": "Atributos - Kaijin",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.atributos.for.racial",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.con.racial",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.atributos.car.racial",
							"type": "add",
							"value": -2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"bIE59ZJxKwcUUDlL": [
		{
			"item": "Gelo",
			"subtipo": "Golem",
			"nome": "Gelo",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.atributos.con.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"5HTRKx46ZIML2ZAX": [
		{
			"item": "Sucata",
			"subtipo": "Golem",
			"nome": "Sucata",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.movement.walk.base",
							"type": "downgrade",
							"value": 6,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"9RwnankSD5BDEzEZ": [
		{
			"item": "Peças Metálicas",
			"subtipo": "Yidishan",
			"nome": "Peças Metálicas",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.defesa.pda",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Garras",
			"subtipo": "Voracis",
			"nome": "Atributos - Voracis",
			"patch": {
				"system": {
					"changes": []
				},
				"disabled": true
			}
		},
		{
			"item": "Quase Anão",
			"subtipo": "Trog Anão",
			"nome": "Quase Anão",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.movement.walk.base",
							"type": "downgrade",
							"value": 6,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.nivel",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"SCGOETcTTTR8JiXU": [
		{
			"item": "Ko-kabuto (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Ko-kabuto Mestre: +2 na Defesa.",
			"patch": {
				"disabled": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"h31DOilEc6lPptw2": [
		{
			"item": "Nobre Zakharoviano",
			"subtipo": "Zakharov",
			"nome": "Nobre Zakharoviano",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "@patamar*2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"wz2vejP1sYgKRKRi": [
		{
			"item": "Canhão Energético",
			"subtipo": "Mashin",
			"nome": "Canhão Energético",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "1d6",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"WYDZgc2SCHZab0ih": [
		{
			"item": "Tomo do Rancor",
			"nome": "Tomo do Rancor: +2d8+2 pontos de dano de corte, impacto ou perfuração, a sua escolha.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2d8+2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"9nLbDEzDtADeEhcY": [
		{
			"item": "Reservatório Alquímico",
			"subtipo": "Mashin",
			"nome": "Auxílio de Mira",
			"patch": {
				"system": {
					"changes": []
				},
				"disabled": true
			}
		}
	],
	"6BRWLPOVveO5kpLC": [
		{
			"item": "Transformação em Dragão",
			"nome": "aumenta o bônus na Defesa em +1.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		},
		{
			"item": "Momento de Tormenta",
			"nome": "além do normal, criaturas na área ficam alquebradas enquanto permanecerem na área.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "condicao",
							"type": "add",
							"value": "alquebrado",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"tLTQ6fiOjKSSQGMv": [
		{
			"item": "Transformação em Dragão",
			"nome": "além do normal, asas de couro brotam de suas costas. Você recebe deslocamento de voo 18m.",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.movement.fly.base",
							"type": "upgrade",
							"value": 18,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"OxMg4QYkmvUwFdis": [
		{
			"item": "Tatuagem Mística",
			"nome": "Tatuagem Mística: +1 na defesa",
			"patch": {
				"disabled": true,
				"transfer": true,
				"system": {
					"onuse": false,
					"abilityUse": {
						"automatic": false,
						"types": [],
						"names": []
					}
				}
			}
		}
	],
	"TgnmbHmkOblvavHb": [
		{
			"item": "Escudo de Couro",
			"nome": "Escudo de Couro: +2 na defesa para ataques a distância.",
			"patch": {
				"disabled": true,
				"transfer": true,
				"system": {
					"onuse": false,
					"abilityUse": {
						"automatic": false,
						"types": [],
						"names": []
					}
				}
			}
		}
	],
	"eyA8wRtG7DX75ikC": [
		{
			"item": "Aquin’ne (Familiar)",
			"subtipo": "Arcanista",
			"nome": "Aquin’ne (Familiar)",
			"patch": {
				"disabled": false,
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"onuse": false,
					"abilityUse": {
						"automatic": false,
						"types": [],
						"names": []
					}
				}
			}
		}
	],
	"3cO24hupYeuQ5S0B": [
		{
			"item": "Verilêmur (Parceiro)",
			"subtipo": "Parceiros",
			"nome": "Verilêmur Iniciante: se já sabe Círculo da Justiça, seu custo diminui em -1 PM",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"spell"
						],
						"names": [
							"Círculo da Justiça"
						]
					}
				}
			}
		}
	],
	"X248JkjFbu5hYtDN": [
		{
			"item": "Peçonha Anciã",
			"nome": "Peçonha Anciã: perde 3d12 PV por rodada durante 3 rodadas e ignora imunidade a venenos",
			"patch": {
				"system": {
					"abilityUse": {
						"types": [
							"attack"
						]
					}
				}
			}
		}
	],
	"D7CbXfePKh6uzPmd": [
		{
			"item": "Dardo Gélido",
			"nome": "aumenta o dano em +1d6.",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					}
				}
			}
		}
	],
	"F7xwcXU2pHhvwIxF": [
		{
			"item": "Recruta da Fênix",
			"subtipo": "Triunphus",
			"nome": "Recruta da Fênix",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.cava.treinado",
							"type": "override",
							"value": true,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.fogo.bonus",
							"type": "add",
							"value": 5,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.nivel",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"uCHy7wC7Ih9immkK": [
		{
			"item": "Insurgente Tapistano",
			"subtipo": "Império de Tauron",
			"nome": "Insurgente Tapistano",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.fort.bonus",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.refl.bonus",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.vont.bonus",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.nivel",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"aAYiqoyB1MgGQT3u": [
		{
			"item": "Pescador Parrudo",
			"subtipo": "Khubar",
			"nome": "Pescador Parrudo",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.atle.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.fort.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.sobr.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": 3,
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"VPzXKZI5BNEsPZMs": [
		{
			"item": "Vigor Brutal",
			"subtipo": "Orc",
			"nome": "Vigor Brutal",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.fort.condi",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "@for",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"8eHAvBpd7L8sf70T": [
		{
			"item": "Legionário",
			"subtipo": "Império de Tauron",
			"nome": "Legionário (+1 na defesa)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"2xffAe6LX7C5xpk8": [
		{
			"item": "Selvagem Sanguinário",
			"subtipo": "Sanguinárias",
			"nome": "Selvagem Sanguinário (Se não estiver usando Armadura Pesada, tem 1 de RD)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "semPesada"
					}
				}
			}
		}
	],
	"r1elidfgeZVwf6TN": [
		{
			"item": "Andarilho Ubaneri",
			"subtipo": "Ubani",
			"nome": "Andarilho Ubaneri (+2 na Defesa)",
			"patch": {
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		}
	],
	"bKiw8mhViHKavIBG": [
		{
			"item": "Arsenal Arcano",
			"subtipo": "Mago de batalha de Wynlla",
			"nome": "Arsenal Arcano: soma bônus de dano de melhorias e encantos da arma no poder Arcano de Batalha",
			"patch": {
				"name": "Arsenal Arcano: bônus de dano de melhorias e encantos da arma no Arcano de Batalha (aplique uma vez por ponto de bônus)",
				"system": {
					"abilityUse": {
						"aumenta": true
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"D0Ymd4lRD0ljwg0n": [
		{
			"item": "Herói da Realidade",
			"subtipo": "Guardião da Realidade",
			"nome": "Ignora RD de criaturas da Tormenta dentro da área.",
			"patch": {
				"name": "Herói da Realidade: ignora RD de criaturas da Tormenta na aura (aplique uma vez por ponto de Carisma)",
				"system": {
					"abilityUse": {
						"automatic": false,
						"aumenta": true,
						"types": [
							"attack",
							"spell",
							"power"
						]
					},
					"changes": [
						{
							"key": "ignoraRD",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"aplicacoes": "@car"
					}
				}
			}
		}
	],
	"jSrmzO2xPBmhHrVu": [
		{
			"item": "Herói da Realidade",
			"subtipo": "Guardião da Realidade",
			"nome": "Penalidade em rolagens de dano para criaturas da Tormenta dentro da área.",
			"patch": {
				"name": "Aura de realidade: –Car nas rolagens de dano (aplique nas criaturas da Tormenta na aura)",
				"disabled": false,
				"transfer": false,
				"duration": {
					"value": null,
					"units": "rounds",
					"expiry": "sceneEnd"
				},
				"system": {
					"onuse": false,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"changes": [
						{
							"key": "system.modificadores.dano.geral",
							"type": "add",
							"value": "-@car",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"IAjMnjQ45ferkdHL": [
		{
			"item": "Conjuração Magibélica: Expandir",
			"subtipo": "Conjuração Magibélica",
			"nome": "Conjuração Magibélica: Expandir",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					}
				},
				"flags": {
					"tormenta20-correcoes": {
						"aplicacoes": "1+@Magodebatalha2"
					}
				}
			}
		}
	],
	"fC5HJCjOtAb1mRNu": [
		{
			"item": "Conjuração Magibélica: Fortalecer",
			"subtipo": "Conjuração Magibélica",
			"nome": "Conjuração Magibélica: Fortalecer",
			"patch": {
				"system": {
					"abilityUse": {
						"aumenta": true
					}
				},
				"flags": {
					"tormenta20-correcoes": {
						"aplicacoes": "1+@Magodebatalha2"
					}
				}
			}
		}
	],
	"cDEUGdXQY6cknB88": [
		{
			"item": "Destruir Anticriação",
			"subtipo": "Guardião da Realidade",
			"nome": "Destruir Anticriação",
			"patch": {
				"name": "Destruir Anticriação (sem Golpe Divino): +Car no ataque e +1d8 no dano"
			}
		}
	],
	"uOZAFBodTJMTRJ5l": [
		{
			"item": "Pose: Julgamento Heroico",
			"subtipo": "Herói Henshin",
			"nome": "Julgamento Heroico",
			"patch": {
				"name": "Julgamento Heroico: +1d8 de luz contra o inimigo escolhido (um passo a mais a cada dois outros poderes da distinção)",
				"system": {
					"abilityUse": {
						"automatic": false
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d8[luz]",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "passos",
							"type": "custom",
							"value": "@Henshin2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"qNRCCUOZjgCen9bX": [
		{
			"item": "Lanceiro",
			"subtipo": "Caçador",
			"nome": "Lanceiro: Se usar uma lança com as duas mãos, aumenta o dano em um passo.",
			"patch": {
				"name": "Lanceiro: lança empunhada com as duas mãos (+1 passo de dano)",
				"system": {
					"abilityUse": {
						"automatic": false,
						"types": [],
						"names": [
							"Lança",
							"Lança de Falange",
							"Lança da Fênix",
							"Lança Animalesca",
							"Lança da Dominação",
							"Pique",
							"Azagaia"
						]
					}
				}
			}
		}
	],
	"Pm3dAP5KGGLSOd8X": [
		{
			"item": "Transformação Repugnante",
			"subtipo": "Druida",
			"nome": "Transformação Repugnante",
			"patch": {
				"name": "Alquebrado",
				"disabled": false,
				"transfer": false,
				"duration": {
					"value": null,
					"units": "rounds",
					"expiry": "sceneEnd"
				},
				"system": {
					"onuse": false,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"changes": []
				}
			}
		}
	],
	"klyv4vWHmwneJl6r": [
		{
			"item": "Executor",
			"subtipo": "Guerreiro",
			"nome": "Executor: causa dano adicional contra criaturas com metade ou menos de seus PV máximos..",
			"patch": {
				"name": "Executor: +1d6 de dano contra criaturas com menos da metade dos PV (um passo a mais a cada 4 níveis de guerreiro além do 1º)",
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d6",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "passos",
							"type": "custom",
							"value": "floor((@nvl.guerreiro-1)/4)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"vOAZpx55HnEUOsC4": [
		{
			"item": "Armadura de Chumbo",
			"nome": "Armadura de Chumbo: resistência a magia +2.",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"fonte": "sempre"
					}
				}
			}
		}
	],
	"BYYwfpeXd3vT67ek": [
		{
			"item": "Estilo de Combate Arcano",
			"subtipo": "Guerreiro Mágico",
			"nome": "Encouraçado Místico",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "qualquer"
					}
				}
			}
		}
	],
	"NLCXny0aX1Wd2Y9G": [
		{
			"item": "Conjurador Encouraçado",
			"subtipo": "Mago de batalha de Wynlla",
			"nome": "Conjurador Encouraçado",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "pesada"
					}
				}
			}
		}
	],
	"zOSomt4h4VHBGfJ5": [
		{
			"item": "Pose: Poder da Amizade",
			"subtipo": "Herói Henshin",
			"nome": "Poder da Amizade",
			"patch": {
				"name": "Poder da Amizade: PV temporários aos aliados no início do seu turno (aplique em você)",
				"flags": {
					"tormenta20-correcoes": {
						"manterFormula": true
					}
				},
				"system": {
					"changes": [
						{
							"key": "danoContinuo",
							"type": "add",
							"value": "5[curatpv]+@Henshin[curatpv]",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"e5BHmTQgmOD2d0g2": [
		{
			"item": "Urro Divino",
			"subtipo": "Monstros",
			"nome": "Urro Divino",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "max(1, @con)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"Sjl55suDl9jka94Z": [
		{
			"item": "Avantajado",
			"subtipo": "Centauro",
			"nome": "Avantajado",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.tamanho",
							"type": "override",
							"value": "gra",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.walk.base",
							"type": "upgrade",
							"value": "12",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"pVDe2wgn4JHitjpH": [
		{
			"item": "Paquidérmico",
			"subtipo": "Ceratops",
			"nome": "Paquidérmico",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.inti.atributo",
							"type": "override",
							"value": "for",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.tamanho",
							"type": "override",
							"value": "gra",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"fuohrw71vizSvOcL": [
		{
			"item": "Carne",
			"subtipo": "Golem",
			"nome": "Carne",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "metamorfose",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "trevas",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.trevas.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.walk.base",
							"type": "downgrade",
							"value": "6",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"UF3pfRUG2Az4m5wj": [
		{
			"item": "Sopro de Dragão",
			"subtipo": "Kallyanach",
			"nome": "Sopro (aumentar dano)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "1d12",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"E3enav6kFNcfyIbP": [
		{
			"item": "Carapaça Kappa",
			"subtipo": "Kappa",
			"nome": "Carapaça Kappa",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "semPesada"
					}
				}
			}
		}
	],
	"G06vcvbjO0EM04y5": [
		{
			"item": "Dança da Areia",
			"subtipo": "Miragem",
			"nome": "Dança da Areia (Dano)",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "semPesada"
					}
				}
			}
		}
	],
	"CTDLeBH0IjRiRMza": [
		{
			"item": "Visão Noturna",
			"subtipo": "Místico",
			"nome": "Visão Noturna",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.perc.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"z0mfVsHddmmm4mJc": [
		{
			"item": "Coração de Trovão",
			"subtipo": "Miragem",
			"nome": "Coração de Trovão",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.vont.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "medo",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"XirqNEC3POnKaFqy": [
		{
			"item": "Amazona de Hippion",
			"subtipo": "Deheon, Namalkah",
			"nome": "Amazona de Hippion",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "semPesada"
					}
				}
			}
		}
	],
	"kJrHO4o2sRWKtmmH": [
		{
			"item": "Armadura das Amazonas (Marca)",
			"subtipo": "Amazona",
			"nome": "Armadura das Amazonas",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "semPesada"
					}
				}
			}
		}
	],
	"7lzssvIm6quR3hes": [
		{
			"item": "Forma Vegetal",
			"subtipo": "Druida",
			"nome": "Forma Vegetal",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.corte.excecao",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.resistencias.fogo.excecao",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "atordoado",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"6YE9MXOIGc7dTjz9": [
		{
			"item": "Técnica Avançada: Escola de Tiro",
			"subtipo": "Duelista",
			"nome": "Técnica Avançada - Escola de Tiro: Seu dano com armas de fogo aumenta em um passo.",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArma": "fogo"
					}
				}
			}
		}
	],
	"C83E0hKev9h66RYE": [
		{
			"item": "Escudeiro Aprendiz",
			"subtipo": "Vassalo",
			"nome": "Escudeiro Aprendiz: Se já tiver proficiência com armaduras pesadas, recebe +2 na Defesa enquanto usa uma armadura pesada.",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "pesada"
					}
				}
			}
		}
	],
	"k8x1bp45ZnS8f7SR": [
		{
			"item": "Tradição de Ayrelynn",
			"subtipo": "Anão",
			"nome": "Tradição de Ayrelynn",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArma": "fogo"
					}
				}
			}
		}
	],
	"b2VczNml8bgRxqYP": [
		{
			"item": "Técnica Avançada: Escola Clássica",
			"subtipo": "Duelista",
			"nome": "Técnica Avançada - Escola Clássica: Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +5 em rolagens de dano com essa arma.",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArma": "umaArma"
					}
				}
			}
		}
	],
	"ZaM34Yfs5U3EvR8G": [
		{
			"item": "Pólvora Sagrada",
			"subtipo": "Garth, o Deus da Pólvora",
			"nome": "Pólvora Sagrada",
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArma": "fogo"
					}
				}
			}
		}
	],
	"THWTOqPWxsCNC8dd": [
		{
			"item": "Mestre do Tridente",
			"subtipo": "Sereia/tritão",
			"nome": "Mestre do Tridente",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"WoYZYSubI5fTCYrg": [
		{
			"item": "Sentidos Élficos",
			"subtipo": "Elfo",
			"nome": "Sentidos Élficos",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.mist.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.perc.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "penumbra",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"97epjFA6hxb3RZob": [
		{
			"item": "Inimigo de (Criatura)",
			"subtipo": "Caçador",
			"nome": "Inimigo de (Criatura)",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "efeito.dano",
							"type": "multiply",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"SiOpIxFlWr3t6yEe": [
		{
			"item": "Dom da Esperança",
			"subtipo": "Paz",
			"nome": "Dom da Esperança",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "flags.tormenta20.substituirCon",
							"type": "override",
							"value": "sab",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "alquebrado",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "esmorecido",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "frustrado",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"wUg2HIeftCw24Jdn": [
		{
			"item": "Familiar Gato",
			"subtipo": "Arcanista",
			"nome": "Familiar Gato",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.furt.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"t20cMontCaoCae00": [
		{
			"item": "Montaria: Cão de Caça",
			"subtipo": "Parceiro",
			"nome": "Montaria: Cão de Caça Iniciante",
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "faro",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.walk.base",
							"type": "override",
							"value": "9",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"zpwKdEUmGCAK0Z0p": [
		{
			"item": "Dracomancia",
			"subtipo": "Dracomante",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"types": [],
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						]
					}
				}
			}
		}
	],
	"a4pDOPbZo7xt87EB": [
		{
			"item": "Vínculo com a Terra",
			"subtipo": "Ermitão",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": -1
					}
				}
			}
		}
	],
	"WvW6x5mC9jC6C0fP": [
		{
			"item": "Linhagem Rubra Aprimorada",
			"subtipo": "Arcanista",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": -1
					}
				}
			}
		}
	],
	"7hkxNTPRJaBWNsZu": [
		{
			"item": "Aspecto da Primavera",
			"subtipo": "Druida",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": -1
					}
				}
			}
		}
	],
	"3TFpJUkhBRTplQGG": [
		{
			"item": "Verilêmur (Parceiro)",
			"subtipo": "Parceiros",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"types": [],
						"names": [
							"Círculo da Justiça"
						]
					}
				}
			}
		}
	],
	"FOzvHwAfatFkma02": [
		{
			"item": "Predação Monstruosa",
			"subtipo": "Colecionador Monstruoso",
			"nome": null,
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"pnZqksrdr8R74xVN": [
		{
			"item": "Lar Infernal",
			"subtipo": "Algoz da Tormenta",
			"nome": null,
			"patch": {
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"kq23RYoWS9LeWhCz": [
		{
			"item": "Invencível",
			"subtipo": "Lutador",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"types": [],
						"names": [
							"Adestramento",
							"Atuação",
							"Diplomacia",
							"Enganação",
							"Intimidação",
							"Jogatina"
						]
					}
				}
			}
		}
	],
	"ONNW4VR4SOdljDYT": [
		{
			"item": "Prisão Gélida",
			"subtipo": "magia",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"yVcuZAckGFREbdPq": [
		{
			"item": "Miasma Tóxico",
			"subtipo": "magia",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"88jWuSwTJgedspXs": [
		{
			"item": "Explosão Fulgente",
			"subtipo": "magia",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 1
					}
				}
			}
		}
	],
	"KtqcyxoiWZWVQ58N": [
		{
			"item": "Companheiro Aberrante",
			"subtipo": "Druida",
			"nome": null,
			"patch": {
				"name": "Companheiro Aberrante Mestre: perde 3d4 PM."
			}
		}
	],
	"KuvqysuEGa5TLU10": [
		{
			"item": "Médico",
			"subtipo": "Parceiros",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 2
					}
				}
			}
		}
	],
	"kPfjycPCqxtkDP7h": [
		{
			"item": "Médico",
			"subtipo": "Parceiros",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": 4
					}
				}
			}
		}
	],
	"8zqjwTU5U9kL2YuS": [
		{
			"item": "Escola de Duelo: Ambidestra",
			"subtipo": "Duelista",
			"nome": null,
			"patch": {
				"flags": {
					"tormenta20-correcoes": {
						"requerArma": "duasArmasLeve"
					}
				}
			}
		}
	],
	"f2kzLOhqsD25i8lQ": [
		{
			"item": "Aspecto do Inverno",
			"subtipo": "Druida",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					},
					"changes": [
						{
							"key": "dano:frio",
							"type": "custom",
							"value": "d*1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"JD6RyIWTKLmQkL0V": [
		{
			"item": "Exercitar os Músculos Arcanos",
			"subtipo": "Mago da Ordem do Vazio",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"custo": -1
					}
				}
			}
		}
	],
	"wR1x7LbayInDJHHx": [
		{
			"item": "Campeão",
			"subtipo": "Guerreiro",
			"nome": null,
			"patch": {
				"system": {
					"abilityUse": {
						"automatic": true
					}
				}
			}
		}
	],
	"wyAfvNFSXCdqosUR": [
		{
			"item": "Aura Restauradora",
			"subtipo": "Vida",
			"nome": null,
			"patch": {
				"transfer": true,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"types": [
							"spell",
							"power",
							"consumable"
						],
						"names": []
					},
					"changes": [
						{
							"key": "dano:curapv",
							"type": "custom",
							"value": "d*1",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"WujM2pTO7gLuuJCk": [
		{
			"item": "Perseguidor",
			"subtipo": "Parceiros",
			"nome": null,
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.perc.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"PuhMZiugbVf0SWMk": [
		{
			"item": "Perseguidor",
			"subtipo": "Parceiros",
			"nome": null,
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "cegas",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"FjEoPS4Yh69wiuSW": [
		{
			"item": "Olhar Assustador",
			"subtipo": "Samurai",
			"nome": null,
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.inti.bonus",
							"type": "add",
							"value": "floor((@nvl.samurai+3)/6)",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.intu.bonus",
							"type": "add",
							"value": "floor((@nvl.samurai+3)/6)",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	],
	"NzHRF0FOvdGzK9UL": [
		{
			"item": "Tradição Oral",
			"subtipo": "Místico",
			"nome": null,
			"patch": {
				"system": {
					"changes": [
						{
							"key": "system.pericias.mist.bonus",
							"type": "add",
							"value": "2*(1+min(1,floor(@nvl.mistico/9))+min(1,floor(@nvl.mistico/13)))",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		}
	]
};

/** Correções no próprio item (caminhos com ponto) e efeitos que faltavam. Casam por _id ou por nome e tipo. */
export const ITENS = [
	{
		"id": "7gr4g8SvaNHdtsxl",
		"nome": "Adaga da bruma",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "YljHxz9TEXWOjUZ3",
		"nome": "Arco das sombras",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "OBycPMtgZCm4XWIT",
		"nome": "Arco do crepúsculo",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "xNvPSSf7VpRqhm9f",
		"nome": "Baba de Troll",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "IZUkqhwGGoxG69O5",
		"nome": "Barba queimada",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "JkhT2dVa59bzoWQI",
		"nome": "Besta Estelar",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "ChrBQchesyBHtWvu",
		"nome": "Bravura Indômita",
		"tipo": "poder",
		"subtipo": "Combate",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "hZBKD7ACjDj4eh1j",
		"nome": "Cerveja Deheoni",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "MDXDSMKeNIUE1fTh",
		"nome": "Charme",
		"tipo": "poder",
		"subtipo": "Ventanista",
		"patch": {},
		"novos": [
			{
				"name": "Charme (PM)",
				"type": "base",
				"transfer": true,
				"disabled": false,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.atributos.car",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "MDXDSMKeNIUESp01",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "2cwBlZ7lXIYc1HpH",
		"nome": "Cinturão do trobo",
		"tipo": "equipamento",
		"patch": {},
		"novos": [
			{
				"name": "Cinturão do trobo: +5 em Atletismo para erguer peso",
				"disabled": true,
				"transfer": false,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"types": [
							"skill"
						],
						"names": [
							"Atletismo"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "2cwBlZ7lXIYcSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "2SJgHsMBcwod4833",
		"nome": "Citadino Abastado",
		"tipo": "poder",
		"subtipo": "Mundana",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "d6MeUQ7qbnfl4sRE",
		"nome": "Cozido de Pimenta",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "dBphHXOMDlWtehet",
		"nome": "Dança Marcial",
		"tipo": "poder",
		"subtipo": "Lutador",
		"patch": {
			"system.ativacao.execucao": "move"
		},
		"novos": []
	},
	{
		"id": "vE0m29joNhTMLNPD",
		"nome": "Espada da Tempestade",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "1KePgVQVcl7Kv50s",
		"nome": "Espada do Guardião",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "zz4qtf7KeywIJ0ap",
		"nome": "Espada Solar",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "8HH0NH5SOZKJaaJx",
		"nome": "Florete do Vendaval",
		"tipo": "arma",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "Rd536xR7XZK6wksQ",
		"nome": "Hidromel Uivante",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "eHwqfjFeXr2gONDH",
		"nome": "Licor Feérico",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "XzyUdh3Wcw8BV3Z1",
		"nome": "Padeiro",
		"tipo": "poder",
		"subtipo": "Mundana",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "d8gqM8xKMTKxGEqA",
		"nome": "Sidra Ahleniense",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "bp5eRnhWrMmiRq1d",
		"nome": "Tanga de Peles",
		"tipo": "poder",
		"subtipo": "Machado de Pedra",
		"patch": {},
		"novos": [
			{
				"name": "Tanga de Peles: Constituição na Defesa",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "@con",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"requerArmadura": "nenhuma",
						"parteDaHabilidade": true,
						"suplemento": true
					}
				},
				"_id": "bp5eRnhWrMmiSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "1qJNMjVVHoiXVsuh",
		"nome": "Tiro de Abate",
		"tipo": "poder",
		"subtipo": "Caçador",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "MoI0zqdc7yoK6S5u",
		"nome": "Transliteração Impossível",
		"tipo": "poder",
		"subtipo": "Arcanista",
		"patch": {
			"system.ativacao.custo": 0
		},
		"novos": []
	},
	{
		"id": "un3FNGoDN8YjRSJO",
		"nome": "Vinho Elfico",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "Bwe3xvoAfVvvY9Jv",
		"nome": "Vinho Pruss",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "A6oLIPlmW7Z2Edcx",
		"nome": "Barreira de Coral",
		"tipo": "poder",
		"subtipo": "Oceano",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "RRnilM5qOfqqERXZ",
		"nome": "Exaltar Honra",
		"tipo": "poder",
		"subtipo": "Honra",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "egETMYpHwKpfq9dv",
		"nome": "Pilar de Heredrimm",
		"tipo": "poder",
		"subtipo": "Khalmyr",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "gOgaw3utd3YXS34e",
		"nome": "Cancioneiro da Esperança",
		"tipo": "poder",
		"subtipo": "Marah",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "iFSiAqThzRACmb41",
		"nome": "Dádiva da Fé: Cólera Divina",
		"tipo": "poder",
		"subtipo": "Frade",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "qs13hyuzIzkAAgB3",
		"nome": "Dádiva da Fé: Proteção Sagrada",
		"tipo": "poder",
		"subtipo": "Frade",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "R4VyisWuNE7WI6TY",
		"nome": "Sacrário da Solenidade",
		"tipo": "poder",
		"subtipo": "Frade",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "uPtSdPeRtlzlPXWj",
		"nome": "Sacrário da Resiliência",
		"tipo": "poder",
		"subtipo": "Frade",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "MBcxw4gUHuO33no1",
		"nome": "Ferramentas da Guerra",
		"tipo": "poder",
		"subtipo": "Arsenal",
		"patch": {
			"system.duracao.value": 1,
			"system.duracao.units": "day"
		},
		"novos": []
	},
	{
		"id": "hCNje4sTfNDb3bHF",
		"nome": "Despertar do Gigante",
		"tipo": "poder",
		"subtipo": "Teldiskan, o Gigante Máximo",
		"patch": {
			"system.duracao.units": "scene",
			"system.ativacao.execucao": "move"
		},
		"novos": []
	},
	{
		"id": "ov8jAp6BrzJ5BlFW",
		"nome": "Pé na Estrada",
		"tipo": "poder",
		"subtipo": "Laan, o Deus das Viagens",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "inLlutIW8xRcmsZE",
		"nome": "Maça Monstruosa (Devoto)",
		"tipo": "arma",
		"patch": {
			"system.rolls": [
				{
					"name": "Ataque",
					"key": "ataque0",
					"type": "ataque",
					"parts": [
						[
							"1d20",
							"",
							""
						],
						[
							"luta",
							"",
							""
						],
						[
							"",
							"",
							""
						]
					],
					"adaptavel": "",
					"versatil": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d12",
							"impacto",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"adaptavel": "",
					"versatil": ""
				}
			]
		},
		"novos": []
	},
	{
		"id": "xIZ9OZ7pzBO5SSy1",
		"nome": "Inspiração Concedida",
		"tipo": "poder",
		"subtipo": "Anilatir, a Deusa da Inspiração",
		"patch": {
			"system.ativacao.custo": 2
		},
		"novos": []
	},
	{
		"id": "IO7PLUGWSCHpNb9r",
		"nome": "Chamado da Colmeia",
		"tipo": "poder",
		"subtipo": "Apis, a Deusa das Abelhas",
		"patch": {
			"system.resistencia.txt": "Reflexos CD Sab reduz à metade",
			"system.resistencia.atributo": "sab"
		},
		"novos": []
	},
	{
		"id": "sf83BrPJoQSvqpBT",
		"nome": "Espadachim Divino",
		"tipo": "poder",
		"subtipo": "A Espada-Deus",
		"patch": {
			"system.description.value": "<p>Você recebe +1 nas rolagens de dano e no multiplicador de crítico com espadas e, para você, todas as espadas marciais são armas simples.</p>"
		},
		"novos": []
	},
	{
		"id": "coIIPoIbe2EaGnUA",
		"nome": "Irmão da Coragem",
		"tipo": "poder",
		"subtipo": "Zakharov, o Deus da Bravura",
		"patch": {},
		"novos": [
			{
				"_id": "corrIrmaoMedo001",
				"type": "base",
				"img": "icons/skills/melee/unarmed-punch-fist-yellow-red.webp",
				"origin": null,
				"description": "",
				"statuses": [],
				"sort": 0,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				},
				"name": "Irmão da Coragem",
				"transfer": true,
				"disabled": false,
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "medo",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		]
	},
	{
		"id": "4bJ8qepE0rRw2RCl",
		"nome": "Canção Divina",
		"tipo": "poder",
		"subtipo": "Canora,   a Deusa da Canção",
		"patch": {},
		"novos": [
			{
				"_id": "corrCancaoAtua01",
				"type": "base",
				"img": "systems/tormenta20/icons/classes/bardo.webp",
				"origin": null,
				"description": "",
				"statuses": [],
				"sort": 0,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				},
				"name": "Canção Divina",
				"transfer": true,
				"disabled": false,
				"system": {
					"changes": [
						{
							"key": "system.pericias.atua.atributo",
							"type": "override",
							"value": "sab",
							"phase": "initial",
							"priority": null
						}
					]
				}
			}
		]
	},
	{
		"id": "up8llQuEYIQfEwZd",
		"nome": "Sacrário da Erudição",
		"tipo": "poder",
		"subtipo": "Frade",
		"patch": {
			"system.ativacao.execucao": "action"
		},
		"novos": []
	},
	{
		"id": "9tm0bcNxoYD6E0Fy",
		"nome": "Pernas Aprimoradas",
		"tipo": "poder",
		"subtipo": "Mashin",
		"patch": {
			"system.duracao.units": "scene"
		},
		"novos": []
	},
	{
		"id": "QCqM5y2uXj8NYNHh",
		"nome": "Sashimi de Kraken",
		"tipo": "consumivel",
		"patch": {
			"system.tipo": "food"
		},
		"novos": []
	},
	{
		"id": "YPK4vpctswr0XzxN",
		"nome": "Cativo das Fadas",
		"tipo": "poder",
		"subtipo": "Pondsmânia",
		"patch": {},
		"novos": [
			{
				"name": "Cativo das Fadas",
				"disabled": false,
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.nivel",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "YPK4vpctswr0Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "J0OOJoUmFZ4280JJ",
		"nome": "Fofo (Parceiro)",
		"tipo": "poder",
		"subtipo": "Parceiros",
		"patch": {},
		"novos": [
			{
				"name": "Fofo Iniciante: redução de dano 1",
				"type": "base",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "J0OOJoUmFZ42Sp01",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Fofo Veterano: RD +1 (total 2; ligue também o Iniciante)",
				"type": "base",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "J0OOJoUmFZ42Sp02",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Fofo Mestre: RD +1 (total 3; ligue Iniciante e Veterano)",
				"type": "base",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "J0OOJoUmFZ42Sp03",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "jx3pFp5vU3ckt7BC",
		"nome": "Destruir Anticriação",
		"tipo": "poder",
		"subtipo": "Guardião da Realidade",
		"patch": {},
		"novos": [
			{
				"name": "Destruir Anticriação (com Golpe Divino): Golpe Divino causa +2 dados de dano",
				"type": "base",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": 2,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2d8",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "jx3pFp5vU3ckSp01",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "qEKea7brRDDIBxaa",
		"nome": "Pose: Julgamento Heroico",
		"tipo": "poder",
		"subtipo": "Herói Henshin",
		"patch": {},
		"novos": [
			{
				"name": "Julgamento Heroico: –2 em testes de ataque contra outras criaturas",
				"type": "base",
				"transfer": false,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "-2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "qEKea7brRDDISp01",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "5Jm4jxUyqfTe417T",
		"nome": "Lanceiro",
		"tipo": "poder",
		"subtipo": "Caçador",
		"patch": {},
		"novos": [
			{
				"name": "Lanceiro: +2 em testes de ataque e rolagens de dano com lanças",
				"type": "base",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [
							"Lança",
							"Lança de Falange",
							"Lança da Fênix",
							"Lança Animalesca",
							"Lança da Dominação",
							"Pique",
							"Azagaia"
						],
						"types": []
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "5Jm4jxUyqfTeSp01",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "IiLPZaWVY50Ef5Us",
		"nome": "Ordens Encorajadoras",
		"tipo": "poder",
		"subtipo": "Nobre",
		"patch": {
			"system.rolls": [
				{
					"name": "PV temporários",
					"key": "dano0",
					"type": "dano",
					"parts": [
						[
							"10",
							"curatpv",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.ativacao.execucao": "free"
		},
		"novos": []
	},
	{
		"id": "VgKGBlSR2kRYKFim",
		"nome": "Transformação Repugnante",
		"tipo": "poder",
		"subtipo": "Druida",
		"patch": {
			"system.rolls": [
				{
					"name": "Dano psíquico",
					"key": "dano0",
					"type": "dano",
					"parts": [
						[
							"(@Tormenta)d6",
							"psiquico",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.resistencia.txt": "Vontade reduz à metade e evita condições",
			"system.resistencia.pericia": "",
			"system.resistencia.atributo": "sab",
			"system.resistencia.bonus": 0,
			"system.ativacao.execucao": "free",
			"system.ativacao.custo": 2,
			"system.alcance": "short"
		},
		"novos": [
			{
				"name": "Frustrado",
				"type": "base",
				"transfer": false,
				"disabled": false,
				"duration": {
					"value": null,
					"units": "rounds",
					"expiry": "sceneEnd"
				},
				"system": {
					"onuse": false,
					"changes": []
				},
				"_id": "VgKGBlSR2kRYSp01",
				"img": "icons/svg/upgrade.svg",
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "V3q4HUC44dVArANf",
		"nome": "Língua Afiada",
		"tipo": "poder",
		"subtipo": "Capitão do Conclave Pirata",
		"patch": {
			"system.rolls": [
				{
					"name": "Dano",
					"key": "dano0",
					"type": "dano",
					"parts": [
						[
							"(2*@Pirata)d6",
							"psiquico"
						]
					],
					"adaptavel": "",
					"versatil": ""
				}
			]
		},
		"novos": []
	},
	{
		"id": "AEhyZeaBwD3lAVSI",
		"nome": "Casca Grossa",
		"tipo": "poder",
		"subtipo": "Atleta",
		"patch": {},
		"novos": [
			{
				"name": "Casca Grossa (Atleta): +1 a cada 4 níveis",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "(max(0, floor((@nvl.atleta -3)/4)))",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"parteDaHabilidade": true,
						"suplemento": true
					}
				},
				"_id": "AEhyZeaBwD3lSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "Ohv1mLTxYzqlqBxD",
		"nome": "Corpo Vegetal",
		"tipo": "poder",
		"patch": {},
		"novos": [
			{
				"name": "Corpo Vegetal (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "Ohv1mLTxYzqlSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "p5JL78lJqgThFfkP",
		"nome": "Natureza Vegetal",
		"tipo": "poder",
		"subtipo": "Hab. Gerais de Criaturas",
		"patch": {},
		"novos": [
			{
				"name": "Natureza Vegetal (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "atordoado",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "metamorfose",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "p5JL78lJqgThSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "NMYpoqfTH54B4YzN",
		"nome": "Vapor",
		"tipo": "poder",
		"subtipo": "Golem",
		"patch": {},
		"novos": [
			{
				"name": "Vapor (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "NMYpoqfTH54BSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "OzmNBs528sKp2LSZ",
		"nome": "Kill’bone (Parceiro)",
		"tipo": "poder",
		"subtipo": "Parceiros",
		"patch": {},
		"novos": [
			{
				"name": "Kill’bone (Parceiro) (correção)",
				"transfer": true,
				"disabled": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "faro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "OzmNBs528sKpSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "WWtQTbuUSiUekrRW",
		"nome": "Híbrido Mecânico",
		"tipo": "poder",
		"subtipo": "Yidishan",
		"patch": {},
		"novos": [
			{
				"name": "Híbrido Mecânico (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.detalhes.tipo",
							"type": "override",
							"value": "con",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "WWtQTbuUSiUeSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "cFziHZD01AjhVDlH",
		"nome": "Criatura das Profundezas",
		"tipo": "poder",
		"subtipo": "Meio-Orc",
		"patch": {},
		"novos": [
			{
				"name": "Criatura das Profundezas (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "cFziHZD01AjhSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "dlZ1wWbIaKn1tRnr",
		"nome": "Natureza Esquelética",
		"tipo": "poder",
		"subtipo": "Soterrado",
		"patch": {},
		"novos": [
			{
				"name": "Natureza Esquelética (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.detalhes.tipo",
							"type": "override",
							"value": "mor",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "dlZ1wWbIaKn1Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "qw9NHbKbmDYFNeK5",
		"nome": "Criatura Artificial",
		"tipo": "poder",
		"subtipo": "Golem",
		"patch": {},
		"novos": [
			{
				"name": "Criatura Artificial (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.detalhes.tipo",
							"type": "override",
							"value": "con",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "escuro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "qw9NHbKbmDYFSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "T1jGydVqm6twOL31",
		"nome": "Honra Inabalável",
		"tipo": "poder",
		"subtipo": "Samurai",
		"patch": {},
		"novos": [
			{
				"name": "Honra Inabalável (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "@sab",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "medo",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "T1jGydVqm6twSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "1rYQsUVXY11hprEm",
		"nome": "Herança de Vitalia",
		"tipo": "poder",
		"subtipo": "Suraggel",
		"patch": {},
		"novos": [
			{
				"name": "Herança de Vitalia (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "5*(1+min(1,floor(@nivel/5))+min(1,floor(@nivel/11))+min(1,floor(@nivel/17)))",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "1rYQsUVXY11hSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "TrkemPOFbPJTZGwz",
		"nome": "Coração de Pedra (Medusa)",
		"tipo": "poder",
		"subtipo": "Medusa",
		"patch": {},
		"novos": [
			{
				"name": "Coração de Pedra (Medusa) (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "@nivel",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "petrificado",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "TrkemPOFbPJTSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "ua2tNCq0GNOScPct",
		"nome": "Coração de Pedra (Anão)",
		"tipo": "poder",
		"subtipo": "Anão",
		"patch": {},
		"novos": [
			{
				"name": "Coração de Pedra (Anão) (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "@nivel",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "petrificado",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "ua2tNCq0GNOSSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "Y5wVBhEisEUVjIBz",
		"nome": "Coragem Total",
		"tipo": "poder",
		"subtipo": "Guerra, Justiça, Samurai, Ambição",
		"patch": {},
		"novos": [
			{
				"name": "Coragem Total (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "medo",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "Y5wVBhEisEUVSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "mNeLncOZHhKVE5Zc",
		"nome": "Dom Artístico",
		"tipo": "poder",
		"subtipo": "Artista",
		"patch": {},
		"novos": [
			{
				"name": "Dom Artístico (correção)",
				"transfer": true,
				"system": {
					"changes": [
						{
							"key": "system.pericias.atua.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "mNeLncOZHhKVSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "7cnHMOqv4a1h2sog",
		"nome": "...Maior a Porrada",
		"tipo": "poder",
		"subtipo": "Ogro",
		"patch": {},
		"novos": [
			{
				"name": "...Maior a Porrada: +1d8 de dano",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d8",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "7cnHMOqv4a1hSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "OeZUT7B2CmeQsjWF",
		"nome": "Arte da Guerra",
		"tipo": "poder",
		"subtipo": "Hobgoblin",
		"patch": {},
		"novos": [
			{
				"name": "Arte da Guerra: +2 de dano com armas marciais (proficiência repetida)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "OeZUT7B2CmeQSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "f8qvwzGNbFmFamT6",
		"nome": "Elemental",
		"tipo": "poder",
		"subtipo": "Golem",
		"patch": {},
		"novos": [
			{
				"name": "Elemental: água (frio)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.frio.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "f8qvwzGNbFmFSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Elemental: ar (eletricidade)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.eletricidade.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "f8qvwzGNbFmFSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Elemental: fogo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "f8qvwzGNbFmFSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Elemental: terra (ácido)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.acido.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "f8qvwzGNbFmFSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "atxIPGkyTZHA4Qlm",
		"nome": "Shogun",
		"tipo": "poder",
		"subtipo": "Samurai",
		"patch": {},
		"novos": [
			{
				"name": "Shogun: +2 no multiplicador de crítico com a arma ancestral",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "criticoX",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "atxIPGkyTZHASp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "6vVApd5yRvfSiQLw",
		"nome": "Armas da Selvageria",
		"tipo": "poder",
		"subtipo": "Megalokk",
		"patch": {},
		"novos": [
			{
				"name": "Armas da Selvageria: +2 de dano com armas naturais",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "6vVApd5yRvfSSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "kqpseZ9lKZRrjbFB",
		"nome": "Ushultt",
		"tipo": "poder",
		"subtipo": "Thwor",
		"patch": {},
		"novos": [
			{
				"name": "Ushultt: +2 em ataque e dano (ushultt em alcance curto)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "kqpseZ9lKZRrSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "dKRFxBSNuIN8HSvW",
		"nome": "Através da Selvageria (Marca)",
		"tipo": "poder",
		"subtipo": "Colecionador Monstruoso",
		"patch": {},
		"novos": [
			{
				"name": "Através da Selvageria: tipo monstro na Forma Selvagem",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.detalhes.tipo",
							"type": "override",
							"value": "mon",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "dKRFxBSNuIN8Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "vFrIzK6zZ5HDHgto",
		"nome": "Dracomancia",
		"tipo": "poder",
		"subtipo": "Dracomante",
		"patch": {},
		"novos": [
			{
				"name": "Dracomancia: redução de dano 5 (depois de lançar magia)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "vFrIzK6zZ5HDSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "2VrgzgiRp4hPo8em",
		"nome": "Gingado Elusivo",
		"tipo": "poder",
		"subtipo": "Lutador",
		"patch": {},
		"novos": [
			{
				"name": "Gingado Elusivo: +5 na Defesa contra o efeito hostil",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "2VrgzgiRp4hPSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "JLwI1MA71ONIkzKW",
		"nome": "Triunfo do Amor",
		"tipo": "poder",
		"subtipo": "Bardo",
		"patch": {},
		"novos": [
			{
				"name": "Triunfo do Amor: conquista 1 (+1 PM por nível)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "@nivel",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"parteDaHabilidade": true,
						"suplemento": true
					}
				},
				"_id": "JLwI1MA71ONISp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Triunfo do Amor: conquista 2 (+1 PM por nível)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "@nivel",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"parteDaHabilidade": true,
						"suplemento": true
					}
				},
				"_id": "JLwI1MA71ONISp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "NZi8WbRtG5s2Utc2",
		"nome": "Arsenal de Lisandra",
		"tipo": "poder",
		"subtipo": "Dahllan",
		"patch": {},
		"novos": [
			{
				"name": "Arsenal de Lisandra: Defesa da Armadura de Allihanna por patamar",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "floor((@nivel+1)/6)+1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "NZi8WbRtG5s2Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "SyDxpXXcOz3yVSur",
		"nome": "Barreira Mística",
		"tipo": "poder",
		"subtipo": "magia",
		"patch": {},
		"novos": [
			{
				"name": "Barreira Mística: +4 na Defesa até o seu próximo turno",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "4",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "SyDxpXXcOz3ySp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "X4Wqd8QD3g0l8hDX",
		"nome": "Temperado pelo Clima",
		"tipo": "poder",
		"subtipo": "Ermitão",
		"patch": {},
		"novos": [
			{
				"name": "Temperado pelo Clima: RD 5 contra eletricidade",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.eletricidade.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Temperado pelo Clima: RD 5 contra frio",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Temperado pelo Clima: RD 5 contra impacto",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.impacto.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Temperado pelo Clima: RD 5 contra fogo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Temperado pelo Clima: RD 5 contra corte",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.corte.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp05",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Temperado pelo Clima: RD 5 contra perfuracao",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.perfuracao.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp06",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Temperado pelo Clima: RD 5 contra acido",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.acido.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "X4Wqd8QD3g0lSp07",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "XrKOLJazzurasfAR",
		"nome": "Tabu",
		"tipo": "poder",
		"subtipo": "Duende",
		"patch": {},
		"novos": [
			{
				"name": "Tabu: –5 em Diplomacia",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.dipl.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "XrKOLJazzuraSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tabu: –5 em Iniciativa",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.inic.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "XrKOLJazzuraSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tabu: –5 em Luta",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.luta.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "XrKOLJazzuraSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tabu: –5 em Percepção",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.perc.bonus",
							"type": "add",
							"value": "-5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "XrKOLJazzuraSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "aB2HULub8BOSOGal",
		"nome": "Lâminas Guardiãs",
		"tipo": "poder",
		"subtipo": "Caçador",
		"patch": {},
		"novos": [
			{
				"name": "Lâminas Guardiãs: +2 na Defesa",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "aB2HULub8BOSSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "8YAkSXbaV3Fg2x4U",
		"nome": "Natureza Gloriosa",
		"tipo": "poder",
		"subtipo": "Zadbblein, a Dragoa-Rainha das Florestas",
		"patch": {},
		"novos": [
			{
				"name": "Natureza Gloriosa: +2 na Defesa",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "8YAkSXbaV3FgSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Natureza Gloriosa: +6m de deslocamento",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.movement.walk.bonus",
							"type": "add",
							"value": "6",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "8YAkSXbaV3FgSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Natureza Gloriosa: natação 9m",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.movement.swim.base",
							"type": "upgrade",
							"value": "9",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "8YAkSXbaV3FgSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Natureza Gloriosa: faro",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "faro",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "8YAkSXbaV3FgSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Natureza Gloriosa: +5 em Atletismo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.atle.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "8YAkSXbaV3FgSp05",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Natureza Gloriosa: +5 em Fortitude",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.fort.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "8YAkSXbaV3FgSp06",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "CutkE1YnR1v2iUha",
		"nome": "Ginete Altivo",
		"tipo": "poder",
		"subtipo": "Hippion",
		"patch": {},
		"novos": [
			{
				"name": "Ginete Altivo: +2 de dano em investida (centauro)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "CutkE1YnR1v2Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "ut0KX9Q2RX78E58t",
		"nome": "Revoada de Texugos",
		"tipo": "poder",
		"subtipo": "system.pericias.perc.bonus",
		"patch": {},
		"novos": [
			{
				"name": "Revoada de Texugos: +2 na Defesa e no dano corpo a corpo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.modificadores.dano.cac",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "ut0KX9Q2RX78Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "z0bXfOHpcBfRVNYZ",
		"nome": "Quebrar Tudo!",
		"tipo": "poder",
		"patch": {},
		"novos": [
			{
				"name": "Quebrar Tudo!: +2 no ataque e +1d8 de dano contra objetos",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "1d8",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "z0bXfOHpcBfRSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "1rcfZtZarZwGs5JH",
		"nome": "Fonte Elemental",
		"tipo": "poder",
		"subtipo": "Golem",
		"patch": {},
		"novos": [
			{
				"name": "Fonte Elemental: água (frio)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.frio.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "1rcfZtZarZwGSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Fonte Elemental: ar (eletricidade)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.eletricidade.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "1rcfZtZarZwGSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Fonte Elemental: fogo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "1rcfZtZarZwGSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Fonte Elemental: terra (ácido)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.acido.imunidade",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "1rcfZtZarZwGSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "p4KZ2EwgXEdrLKGp",
		"nome": "Escavador",
		"tipo": "poder",
		"subtipo": "Minerador",
		"patch": {},
		"novos": [
			{
				"name": "Escavador: +1 de dano com picareta",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [
							"Picareta"
						],
						"types": []
					},
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "p4KZ2EwgXEdrSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "w48gktCMFpuvvHoO",
		"nome": "Linhagem Dracônica",
		"tipo": "poder",
		"subtipo": "Arcanista",
		"patch": {},
		"novos": [
			{
				"name": "Linhagem Dracônica: Carisma nos PV",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "@car",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "w48gktCMFpuvSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			},
			{
				"name": "Linhagem Dracônica: RD 5 contra ácido",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.acido.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "w48gktCMFpuvSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Linhagem Dracônica: RD 5 contra eletricidade",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.eletricidade.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "w48gktCMFpuvSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Linhagem Dracônica: RD 5 contra fogo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "w48gktCMFpuvSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Linhagem Dracônica: RD 5 contra frio",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "w48gktCMFpuvSp05",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Linhagem Dracônica: RD 5 contra luz",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.luz.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "w48gktCMFpuvSp06",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Linhagem Dracônica: RD 5 contra trevas",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.trevas.bonus",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "w48gktCMFpuvSp07",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "JgSENL2nMCam6jqP",
		"nome": "Predação Monstruosa",
		"tipo": "poder",
		"subtipo": "Colecionador Monstruoso",
		"patch": {},
		"novos": [
			{
				"name": "Predação Monstruosa: +1 no ataque e dano com armas naturais",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "JgSENL2nMCamSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "TQhECCkd6eGkzD1t",
		"nome": "Destemor Inflamado",
		"tipo": "poder",
		"subtipo": "Caçador de Cabeças",
		"patch": {},
		"novos": [
			{
				"name": "Destemor Inflamado: imune a medo",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "medo",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "TQhECCkd6eGkSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "lnE53FxgS02WBZos",
		"nome": "Batráquio",
		"tipo": "poder",
		"subtipo": "Tabrachi",
		"patch": {},
		"novos": [
			{
				"name": "Batráquio: penumbra e natação",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "penumbra",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.swim.base",
							"type": "upgrade",
							"value": "9",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "lnE53FxgS02WSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "XmvVZuxR6oN9suel",
		"nome": "Demônio de Areia: Serpente",
		"tipo": "poder",
		"patch": {},
		"novos": [
			{
				"name": "Demônio de Areia: percepção às cegas",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "cegas",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "XmvVZuxR6oN9Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "zNmegW5BQUyy8d9L",
		"nome": "Familiar Morcego",
		"tipo": "poder",
		"subtipo": "Arcanista",
		"patch": {},
		"novos": [
			{
				"name": "Familiar Morcego: percepção às cegas",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.sentidos.value",
							"type": "add",
							"value": "cegas",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "zNmegW5BQUyySp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "XlE8uo7RoLhPLeUy",
		"nome": "Lenhador de Tollon",
		"tipo": "poder",
		"subtipo": "Tollon",
		"patch": {},
		"novos": [
			{
				"name": "Lenhador de Tollon: treinado em Ofício (artesão)",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.pericias.arte.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "XlE8uo7RoLhPSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "xEehXpDZeiMOZvVz",
		"nome": "Sucata",
		"tipo": "poder",
		"subtipo": "Golem",
		"patch": {},
		"novos": [
			{
				"name": "Sucata: deslocamento não reduzido por armadura ou carga",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.movement.tags",
							"type": "add",
							"value": "ignora-armadura",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.attributes.movement.tags",
							"type": "add",
							"value": "ignora-carga",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "xEehXpDZeiMOSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "FF34akm8n2QgrdFH",
		"nome": "Solidez (Guerreiro)",
		"tipo": "poder",
		"subtipo": "Guerreiro",
		"patch": {},
		"novos": [
			{
				"name": "Solidez: Defesa do escudo nos testes de resistência",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.modificadores.pericias.resistencia",
							"type": "add",
							"value": "@escudoDefesa",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "FF34akm8n2QgSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "GUEIcmOtBHif587v",
		"nome": "Solidez (Cavaleiro)",
		"tipo": "poder",
		"subtipo": "Cavaleiro",
		"patch": {},
		"novos": [
			{
				"name": "Solidez: Defesa do escudo nos testes de resistência",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.modificadores.pericias.resistencia",
							"type": "add",
							"value": "@escudoDefesa",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "GUEIcmOtBHifSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "peVIm8wylNohDNEm",
		"nome": "Resiliência Marcial",
		"tipo": "poder",
		"subtipo": "Guerreiro",
		"patch": {},
		"novos": [
			{
				"name": "Resiliência Marcial: RD acumulada",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.dano.bonus",
							"type": "add",
							"value": "@resilienciaMarcial",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "peVIm8wylNohSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "SdtF5pdpzIY6Aez7",
		"nome": "Resiliência Sombria",
		"tipo": "poder",
		"patch": {},
		"novos": [
			{
				"name": "Resiliência Sombria: RD 5/luz",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.luz.excecao",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "SdtF5pdpzIY6Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "i5EbR8SrD8UcA7Gz",
		"nome": "Balística",
		"tipo": "poder",
		"subtipo": "inventor",
		"patch": {},
		"novos": [
			{
				"name": "Balística: armas marciais de ataque à distância",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.profArmas.value",
							"type": "add",
							"value": "marcial-dist",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "i5EbR8SrD8UcSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Balística: armas de fogo",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.profArmas.value",
							"type": "add",
							"value": "fogo",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "i5EbR8SrD8UcSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Balística: Inteligência no ataque à distância",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "atributoAtq",
							"type": "override",
							"value": "int",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"soComArma": "distancia",
						"suplemento": true
					}
				},
				"_id": "i5EbR8SrD8UcSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Balística: Inteligência no dano à distância (Estilo de Disparo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"attack"
						]
					},
					"changes": [
						{
							"key": "atributoDano",
							"type": "override",
							"value": "int",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"soComArma": "distancia",
						"requerPoder": "Estilo de Disparo",
						"suplemento": true
					}
				},
				"_id": "i5EbR8SrD8UcSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "eOS4DvsGTXiy4IMd",
		"nome": "Barão Arruinado",
		"tipo": "poder",
		"subtipo": "Khalifor",
		"patch": {},
		"novos": [
			{
				"name": "Barão Arruinado: +2 na perícia em que falhou com consequência (até o fim da cena)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"skill"
						]
					},
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": "2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "eOS4DvsGTXiySp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "flUx0JnwWQ9GGl5l",
		"nome": "Afinidade",
		"tipo": "poder",
		"subtipo": "Místico",
		"patch": {},
		"novos": [
			{
				"name": "Afinidade: água (RD frio 5 por círculo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.frio.bonus",
							"type": "add",
							"value": "5*@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.dipl.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"elemento": "agua",
						"suplemento": true
					}
				},
				"_id": "flUx0JnwWQ9GSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Afinidade: ar (RD eletricidade 5 por círculo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.eletricidade.bonus",
							"type": "add",
							"value": "5*@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.enga.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"elemento": "ar",
						"suplemento": true
					}
				},
				"_id": "flUx0JnwWQ9GSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Afinidade: fogo (RD fogo 5 por círculo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.fogo.bonus",
							"type": "add",
							"value": "5*@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.acro.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"elemento": "fogo",
						"suplemento": true
					}
				},
				"_id": "flUx0JnwWQ9GSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Afinidade: luz (RD luz 5 por círculo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.luz.bonus",
							"type": "add",
							"value": "5*@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.cura.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"elemento": "luz",
						"suplemento": true
					}
				},
				"_id": "flUx0JnwWQ9GSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Afinidade: terra (RD acido 5 por círculo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.acido.bonus",
							"type": "add",
							"value": "5*@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.inve.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"elemento": "terra",
						"suplemento": true
					}
				},
				"_id": "flUx0JnwWQ9GSp05",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Afinidade: trevas (RD trevas 5 por círculo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.tracos.resistencias.trevas.bonus",
							"type": "add",
							"value": "5*@circulo",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.inti.treinado",
							"type": "override",
							"value": "true",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"elemento": "trevas",
						"suplemento": true
					}
				},
				"_id": "flUx0JnwWQ9GSp06",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "Ko3j2ROOQGKtA9lj",
		"nome": "Comunhão Suprema",
		"tipo": "poder",
		"subtipo": "Místico",
		"patch": {},
		"novos": [
			{
				"name": "Comunhão Suprema: metade do custo (elemento da Afinidade)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": true,
					"abilityUse": {
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": []
					},
					"changes": [
						{
							"key": "custo",
							"type": "custom",
							"value": "/2",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "Ko3j2ROOQGKtSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "fPuvWCTeXA8zTC6l",
		"nome": "Tradição Perdida",
		"tipo": "poder",
		"subtipo": "Várias",
		"patch": {},
		"novos": [
			{
				"name": "Tradição Perdida: Força nos PM",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "min(@for, 6+2*(@patamar-1)) - @atributoChave",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "fPuvWCTeXA8zSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tradição Perdida: Destreza nos PM",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "min(@des, 6+2*(@patamar-1)) - @atributoChave",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "fPuvWCTeXA8zSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tradição Perdida: Constituição nos PM",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "min(@con, 6+2*(@patamar-1)) - @atributoChave",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "fPuvWCTeXA8zSp03",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tradição Perdida: Inteligência nos PM",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "min(@int, 6+2*(@patamar-1)) - @atributoChave",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "fPuvWCTeXA8zSp04",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tradição Perdida: Sabedoria nos PM",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "min(@sab, 6+2*(@patamar-1)) - @atributoChave",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "fPuvWCTeXA8zSp05",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Tradição Perdida: Carisma nos PM",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "min(@car, 6+2*(@patamar-1)) - @atributoChave",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "fPuvWCTeXA8zSp06",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "IvFHjNKYKYcpaOOb",
		"nome": "Espiritualista",
		"tipo": "poder",
		"subtipo": "Bárbaro",
		"patch": {},
		"novos": [
			{
				"name": "Espiritualista: +1 PM por nível ímpar de bárbaro",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "floor((@nvl.barbaro+1)/2)",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "IvFHjNKYKYcpSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "N1tZu5r5nXgkJFBg",
		"nome": "Visconde",
		"tipo": "poder",
		"subtipo": "Vassalo",
		"patch": {},
		"novos": [
			{
				"name": "Visconde: Caminho do Soldado (+1 PV por nível de vassalo)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "@nvl.vassalo",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "N1tZu5r5nXgkSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			},
			{
				"name": "Visconde: Caminho do Governante (+1 em Inteligência)",
				"transfer": true,
				"disabled": true,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.atributos.int.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"flags": {
					"tormenta20-correcoes": {
						"escolha": "opcao",
						"suplemento": true
					}
				},
				"_id": "N1tZu5r5nXgkSp02",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				}
			}
		]
	},
	{
		"id": "qsde91VxLOT4SKsW",
		"nome": "Amalkhan (Marca)",
		"tipo": "poder",
		"subtipo": "Ginete de Namalkah",
		"patch": {},
		"novos": [
			{
				"name": "Amalkhan: +1 na Defesa e em Reflexos",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						},
						{
							"key": "system.pericias.refl.bonus",
							"type": "add",
							"value": "1",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "qsde91VxLOT4Sp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	},
	{
		"id": "ymu36rJrl7cW5Xy2",
		"nome": "Abraçar Anticriação",
		"tipo": "poder",
		"subtipo": "Algoz da Tormenta",
		"patch": {},
		"novos": [
			{
				"name": "Abraçar Anticriação: tipo monstro (lefeu)",
				"transfer": true,
				"disabled": false,
				"system": {
					"onuse": false,
					"changes": [
						{
							"key": "system.detalhes.tipo",
							"type": "override",
							"value": "mon",
							"phase": "initial",
							"priority": null
						}
					]
				},
				"_id": "ymu36rJrl7cWSp01",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null
				},
				"flags": {
					"tormenta20-correcoes": {
						"suplemento": true
					}
				}
			}
		]
	}
];
