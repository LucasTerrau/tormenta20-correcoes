/**
 * Gerado por dev/gerar-itens-magicos.mjs a partir da varredura de itens do Jogo do Ano. Não editar à mão.
 * Armas específicas (Tabela 8-9, p. 336–337) com os encantos e poderes do livro; acessórios com número
 * (Anel da Energia, Anel da Vitalidade, Botas Velozes, Pingente da Saúde, Manto da Resistência, Couraça do
 * Comando); Flauta mística; Armadura acolchoada; catalisadores, Costela de lich e venenos (tipo de dano,
 * resistência e preço); granadas; parceiro Combatente (+2/+3/+4).
 */
export const ITENS = [
	{
		"id": "1ZXiPXFQmdWUr51u",
		"nome": "Punhal Traiçoeiro",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d4",
							"perfuracao",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 100000,
			"system.espacos": 1,
			"system.alcance": "short",
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV",
				"Compendium.world.item-upgrades.ActiveEffect.dilj4zcKjgo7fhU6",
				"Compendium.world.item-upgrades.ActiveEffect.tdL1zviBVsmykSpW"
			]
		},
		"novos": [
			{
				"_id": "1ZXiPXFQmdWUFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "1ZXiPXFQmdWUAssn",
				"name": "Assassina",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma aumenta os dados de dano extra de um ataque furtivo para d8. Além disso, quando faz um Ataque Furtivo, você pode gastar 2 PM. Se fizer isso, pode rolar novamente quaisquer resultados 1 nesses dados de dano extra.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
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
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "assassin"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.dilj4zcKjgo7fhU6"
				}
			},
			{
				"_id": "1ZXiPXFQmdWUVnns",
				"name": "Venenosa",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, a vítima fica envenenada, perdendo 1d12 pontos de vida por rodada durante 3 rodadas. Uma arma venenosa verte um líquido verde e viscoso.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "condicao",
							"type": "add",
							"value": "envenenado",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": 2,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "poisonous"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.tdL1zviBVsmykSpW"
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "7ZSpOEZBMbT3aVsO",
		"nome": "Lâmina da Luz",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d10",
							"corte",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 45000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "7ZSpOEZBMbT3Fmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "8BBFvJdLe3sCiX8f",
		"nome": "Vingadora Sagrada",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d8",
							"corte",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 200000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "8BBFvJdLe3sCFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "8BBFvJdLe3sCOp01",
				"name": "Vingadora Sagrada: empunhada por paladino (+5 em ataque e dano)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Se você for um paladino, recebe +5 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 5,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 5,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "8BBFvJdLe3sCOp02",
				"name": "Vingadora Sagrada: paladino, resistência a magia +5",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Se você for um paladino, você (e seus aliados em alcance curto) recebem resistência a magia +5.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "roll",
							"type": "add",
							"value": 5,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [
							"Fortitude",
							"Reflexos",
							"Vontade"
						],
						"types": [
							"skill"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "8tAO6PDX7s5DJOiN",
		"nome": "Machado Silvestre",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d8",
							"corte",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 70000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "8tAO6PDX7s5DFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "8tAO6PDX7s5DOp01",
				"name": "Machado Silvestre: ambiente ermo e ao ar livre (+1d8)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando você usa o machado silvestre em um ambiente ermo e ao ar livre, causa +1d8 de dano.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d8",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "02lvsZmWSfVanJi0",
		"nome": "Cajado da Destruição",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"impacto",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 60000,
			"system.espacos": 2,
			"system.empunhadura": "duas",
			"system.propriedades.duasMaos": true,
			"system.propriedades.dupla": true,
			"system.propriedades.dup": true,
			"system.upgrades.itemType": [
				"weapon",
				"esoteric"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "02lvsZmWSfVaFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "02lvsZmWSfVaOp01",
				"name": "Cajado da Destruição (cajado arcano): CD +1 das magias arcanas",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Conta como um cajado arcano: a CD para resistir às suas magias arcanas aumenta em +1 (JdA p. 160).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"spell"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "02lvsZmWSfVaOp02",
				"name": "Cajado da Destruição: magia de dano, +1 por dado",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando você lança uma magia de dano, ela causa +1 ponto de dano por dado.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d*1",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"spell"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "LtG3azBFsLf4OkV1",
		"nome": "Cajado do Poder",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"impacto",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 180000,
			"system.espacos": 2,
			"system.empunhadura": "duas",
			"system.propriedades.duasMaos": true,
			"system.propriedades.dupla": true,
			"system.propriedades.dup": true,
			"system.upgrades.itemType": [
				"weapon",
				"esoteric"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV",
				"Compendium.world.item-upgrades.ActiveEffect.0hFE9OZaqn6yQCEi",
				"Compendium.world.item-upgrades.ActiveEffect.Et3jF5pcRw2COWaN"
			]
		},
		"novos": [
			{
				"_id": "LtG3azBFsLf4Fmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "LtG3azBFsLf4Mgnf",
				"name": "Magnífica",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes perfeitos. Ela fornece +4 em testes de ataque e rolagens de dano. Pré-requisito: formidável.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "magnificent"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.0hFE9OZaqn6yQCEi"
				}
			},
			{
				"_id": "LtG3azBFsLf4Dfsr",
				"name": "Defensora",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma se movimenta para aparar ataques contra você. Você recebe +2 na Defesa.</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
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
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "defending"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.Et3jF5pcRw2COWaN"
				}
			},
			{
				"_id": "LtG3azBFsLf4Op01",
				"name": "Cajado do Poder: CD +3 das magias arcanas",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Conta como um cajado arcano (+1) e a CD para resistir às suas magias arcanas aumenta em +2 (para um aumento total de +3).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": 3,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"spell"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "LtG3azBFsLf4Op02",
				"name": "Cajado do Poder: magias arcanas custam −1 PM",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>O custo de suas magias arcanas diminui em −1 PM (cumulativo com Mestre em Escola).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": -1,
						"names": [],
						"types": [
							"spell"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "TlNcV8TJ62EXQMm8",
		"nome": "Cajado da Vida",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"impacto",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 60000,
			"system.espacos": 2,
			"system.empunhadura": "duas",
			"system.propriedades.duasMaos": true,
			"system.propriedades.dupla": true,
			"system.propriedades.dup": true,
			"system.upgrades.itemType": [
				"weapon",
				"esoteric"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "TlNcV8TJ62EXFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "TlNcV8TJ62EXOp01",
				"name": "Cajado da Vida (cajado arcano, magias divinas): CD +1",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Conta como um cajado arcano, mas afeta magias divinas: a CD para resistir a elas aumenta em +1.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "cd",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"spell"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "TlNcV8TJ62EXOp02",
				"name": "Cajado da Vida: magia de cura, +2 PV por dado",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando você lança uma magia de cura, ela cura +2 pontos de vida por dado.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "custom",
							"value": "d*2",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"spell"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "NGJkBqxukaxF9jza",
		"nome": "Florete Fugaz",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"perfuracao",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 50000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "NGJkBqxukaxFFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "NGJkBqxukaxFOp01",
				"name": "Florete Fugaz: 1 PM (crítico no turno dá um ataque adicional)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando usa a ação agredir, você pode gastar 1 PM. Se fizer isso e acertar um crítico no turno, pode fazer um ataque adicional contra a mesma criatura.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": 1,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "iFaZtyir56zrjir9",
		"nome": "Besta Explosiva",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"pont",
							"",
							""
						],
						[
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d12",
							"perfuracao",
							""
						],
						[
							"",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 100000,
			"system.espacos": 2,
			"system.alcance": "medium",
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "iFaZtyir56zrFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "iFaZtyir56zrOp01",
				"name": "Besta Explosiva: virote de Bola de Fogo no alvo (3 PM)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Faça um ataque contra o alvo. Se acertar, ele sofre o dano do disparo mais 6d6 de fogo, e todas as criaturas a até 6m do alvo sofrem 6d6 de fogo (Ref CD Des reduz à metade). Se errar, o virote se desfaz em cinzas.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "6d6[fogo]",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": 3,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true,
						"rolagem": {
							"formula": "6d6[fogo]",
							"titulo": "Besta Explosiva: criaturas a até 6m do alvo (só se o ataque acertar)",
							"resistencia": "Reflexos",
							"atributos": [
								"des"
							]
						}
					}
				}
			},
			{
				"_id": "iFaZtyir56zrOp02",
				"name": "Besta Explosiva: Bola de Fogo num ponto (3 PM, sem ataque)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Funciona como a magia Bola de Fogo: nenhum teste de ataque; todas as criaturas a 6m do ponto escolhido em alcance médio sofrem 6d6 de fogo (Ref reduz à metade).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": 3,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true,
						"rolagem": {
							"formula": "6d6[fogo]",
							"titulo": "Besta Explosiva: Bola de Fogo (criaturas a 6m do ponto)",
							"resistencia": "Reflexos",
							"atributos": [
								"des"
							],
							"emVezDoAtaque": true
						}
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "jhdwYNYHEozyC6wy",
		"nome": "Maça do Terror",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d8",
							"impacto",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 45000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "jhdwYNYHEozyFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "jhdwYNYHEozyOp01",
				"name": "Maça do Terror: Amedrontar custa −1 PM",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Caso já conheça a magia Amedrontar, o custo para lançá-la diminui em −1 PM.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": -1,
						"names": [
							"Amedrontar"
						],
						"types": []
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "nqrXpjRujHTalKhC",
		"nome": "Martelo dos Anões",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d8",
							"impacto",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 70000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "nqrXpjRujHTaFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "nqrXpjRujHTaOp01",
				"name": "Martelo de Doherimm (anão): +1d8 de dano",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando empunhado por um anão, aumenta seu dano em +1d8.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "1d8",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "nqrXpjRujHTaOp02",
				"name": "Martelo de Doherimm (anão), alvo Grande ou maior: +2d8 de dano",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando empunhado por um anão, o dano aumenta em +2d8 contra criaturas Grandes ou maiores (em vez de +1d8).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "dano",
							"type": "add",
							"value": "2d8",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "nqrXpjRujHTaOp03",
				"name": "Martelo de Doherimm (anão): arremessar (Pontaria; a arma volta)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Quando empunhado por um anão, adquire o encanto arremesso: pode ser arremessado em alcance curto e volta voando para você.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "pericia",
							"type": "override",
							"value": "pont",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "tZZb0i0i1eg3E6BJ",
		"nome": "Língua do Deserto",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"corte",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 90000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "tZZb0i0i1eg3Fmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "tZZb0i0i1eg3Op01",
				"name": "Língua do Deserto: lâmina em chamas (dano +1 passo, fogo)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>Ação de movimento e 1 PM (pague ao ativar): até o fim da cena, o dano da arma aumenta em um passo e passa a ser do tipo fogo. Marque nos ataques enquanto durar.</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "passos",
							"type": "custom",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "tipoDano",
							"type": "override",
							"value": "fogo",
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "uUp6qw8AnoR6igO1",
		"nome": "Lança Animalesca",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"perfuracao",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 45000,
			"system.espacos": 1,
			"system.alcance": "short",
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "uUp6qw8AnoR6Fmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "ykRLVOsNEnypuNUA",
		"nome": "Espada Sortuda",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"0",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d6",
							"perfuracao",
							""
						],
						[
							"@for",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 110000,
			"system.espacos": 1,
			"system.upgrades.itemType": [
				"weapon"
			],
			"system.upgrades.enchantment": [
				"Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
			]
		},
		"novos": [
			{
				"_id": "ykRLVOsNEnypFmdv",
				"name": "Formidável",
				"type": "base",
				"img": "icons/commodities/treasure/token-engraved-purple-glowing.webp",
				"description": "<p style=\"text-align:justify\">A arma é encantada para desferir golpes precisos. Ela fornece +2 em testes de ataque e rolagens de dano.</p>",
				"transfer": false,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": true,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": "enchantment",
						"itemType": [
							"weapon"
						]
					},
					"identifier": "formidable"
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				},
				"_stats": {
					"compendiumSource": "Compendium.world.item-upgrades.ActiveEffect.GC1N8KuycOLZKJQV"
				}
			},
			{
				"_id": "ykRLVOsNEnypPas1",
				"name": "Espada Sortuda: +2 em testes de resistência",
				"type": "base",
				"img": "systems/tormenta20/icons/itens/itens-magicos/espada-sortuda.webp",
				"description": "<p>Você recebe +2 nos testes de resistência.</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.modificadores.pericias.resistencia",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
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
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "zKL5mWuHBsXAm4Fy",
		"nome": "Espada Baronial",
		"tipo": "arma",
		"pacote": "equipamentos-magicos",
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
							"1",
							"",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				},
				{
					"name": "Dano",
					"key": "dano1",
					"type": "dano",
					"parts": [
						[
							"1d8",
							"corte",
							""
						],
						[
							"@for",
							"",
							""
						],
						[
							"1",
							"corte",
							""
						]
					],
					"versatil": "",
					"adaptavel": ""
				}
			],
			"system.preco": 30000,
			"system.espacos": 1
		},
		"novos": [
			{
				"_id": "zKL5mWuHBsXAOp01",
				"name": "Espada Baronial: +1 (possuir um código de conduta)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>O bônus da espada aumenta em +1 se você possuir um código de conduta. Os bônus são cumulativos (até +4).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "zKL5mWuHBsXAOp02",
				"name": "Espada Baronial: +1 (for devoto de Khalmyr)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>O bônus da espada aumenta em +1 se você for devoto de Khalmyr. Os bônus são cumulativos (até +4).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			},
			{
				"_id": "zKL5mWuHBsXAOp03",
				"name": "Espada Baronial: +1 (for treinado em Nobreza)",
				"type": "base",
				"img": "icons/svg/upgrade.svg",
				"description": "<p>O bônus da espada aumenta em +1 se você for treinado em Nobreza. Os bônus são cumulativos (até +4).</p>",
				"transfer": false,
				"disabled": true,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "ataque",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						},
						{
							"key": "dano",
							"type": "add",
							"value": 1,
							"phase": "initial",
							"priority": null
						}
					],
					"targets": [],
					"status": null,
					"onuse": true,
					"abilityUse": {
						"description": "",
						"automatic": false,
						"aumenta": false,
						"custo": null,
						"names": [],
						"types": [
							"self"
						]
					},
					"aura": {
						"isAura": false,
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "eAsClXIWZNoFXiqW",
		"nome": "Anel da Energia",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [
			{
				"_id": "eAsClXIWZNoFPas1",
				"name": "Anel da Energia",
				"type": "base",
				"img": "systems/tormenta20/icons/itens/itens-magicos/anel.webp",
				"description": "<p>Você recebe +5 PM (somente após um dia de uso).</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.attributes.pm.bonus.total",
							"type": "add",
							"value": "5",
							"phase": "initial",
							"priority": null
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
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "BPnw00NblhjMIwm0",
		"nome": "Anel da Vitalidade",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [
			{
				"_id": "BPnw00NblhjMPas1",
				"name": "Anel da Vitalidade",
				"type": "base",
				"img": "systems/tormenta20/icons/itens/itens-magicos/anel.webp",
				"description": "<p>Você recebe +10 PV (somente após um dia de uso).</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.attributes.pv.bonus.total",
							"type": "add",
							"value": "10",
							"phase": "initial",
							"priority": null
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
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "PihGn7sFqQLTc7IC",
		"nome": "Botas Velozes",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [
			{
				"_id": "PihGn7sFqQLTPas1",
				"name": "Botas Velozes",
				"type": "base",
				"img": "systems/tormenta20/icons/itens/itens-magicos/botas-velozes.webp",
				"description": "<p>Você recebe +3m em seu deslocamento.</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.attributes.movement.walk.bonus",
							"type": "add",
							"value": "3",
							"phase": "initial",
							"priority": null
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
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "RJYF7ocMNcZqOm4j",
		"nome": "Pingente da Saúde",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [
			{
				"_id": "RJYF7ocMNcZqPas1",
				"name": "Pingente da Saúde",
				"type": "base",
				"img": "systems/tormenta20/icons/itens/itens-magicos/pingente.webp",
				"description": "<p>Imunidade a doenças e venenos (após uma semana de uso).</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.tracos.ic.value",
							"type": "add",
							"value": "doente",
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
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "zPxlM4MNoKihGsDn",
		"nome": "Manto da Resistência",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [],
		"efeitos": {
			"p3l6lvXx7HMjVtS0": {
				"disabled": false
			}
		}
	},
	{
		"id": "MGQyoR2Jm9Db6sP2",
		"nome": "Couraça do Comando",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [],
		"efeitos": {
			"Qxt0OZht8i68jDiO": {
				"disabled": false
			},
			"QVBsccfKQnMBKwpA": {
				"disabled": false,
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.pda",
							"value": -2,
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			},
			"H321M4Evtmiu74hD": {
				"disabled": false
			},
			"yothk5q9V5aB358t": {
				"disabled": false
			}
		}
	},
	{
		"id": "BfZoAqLXeM2mBUfi",
		"nome": "Manto da Noite",
		"tipo": "equipamento",
		"pacote": "equipamentos-magicos",
		"patch": {},
		"novos": [],
		"efeitos": {
			"s4NpA1IPwitjdwfg": {
				"system": {
					"changes": [
						{
							"key": "system.attributes.defesa.pda",
							"value": -1,
							"priority": null,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "48AZOSnlc4gRYffv",
		"nome": "Flauta Mística",
		"tipo": "equipamento",
		"pacote": "equipamentos",
		"patch": {},
		"novos": [],
		"efeitos": {
			"bQoexW1WrGdPD7pS": {
				"system": {
					"abilityUse": {
						"types": [
							"spell"
						]
					}
				}
			}
		}
	},
	{
		"id": "1YPU63ssevbZjxzw",
		"nome": "Armadura acolchoada",
		"tipo": "equipamento",
		"pacote": "equipamentos",
		"patch": {},
		"novos": [
			{
				"_id": "1YPU63ssevbZPas1",
				"name": "Armadura acolchoada: +2 em Fortitude",
				"type": "base",
				"img": "systems/tormenta20/icons/itens/equipamentos/armadura-acolchoada.webp",
				"description": "<p>Protege todo o corpo, fornecendo +2 em Fortitude.</p>",
				"transfer": true,
				"disabled": false,
				"origin": null,
				"tint": "#ffffff",
				"statuses": [],
				"showIcon": 1,
				"start": null,
				"duration": {
					"value": null,
					"units": "seconds",
					"expiry": null,
					"expired": false
				},
				"system": {
					"changes": [
						{
							"key": "system.pericias.fort.bonus",
							"type": "add",
							"value": 2,
							"phase": "initial",
							"priority": null
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
						"range": 0
					},
					"upgrade": {
						"type": null,
						"itemType": []
					},
					"identifier": ""
				},
				"flags": {
					"tormenta20-correcoes": {
						"itemMagico": true
					}
				}
			}
		],
		"efeitos": {}
	},
	{
		"id": "MT4QgnaAwWgr4pet",
		"nome": "Baga-de-Fogo",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 30
		},
		"novos": [],
		"efeitos": {
			"DbA4MssXPSgV7cEr": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[fogo]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "y9YQu2wxYDpMEDtU",
		"nome": "Líquen Lilás",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 30
		},
		"novos": [],
		"efeitos": {
			"GG7omD87AZj9nFRP": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[frio]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "ZTL25EsE31e1WcTG",
		"nome": "Terra de Cemitério",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 30
		},
		"novos": [],
		"efeitos": {
			"sHgWrgVjCnIPZofI": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[trevas]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "hJSIRtVZKM0fmDb5",
		"nome": "Costela de Lich",
		"tipo": "equipamento",
		"pacote": "equipamentos",
		"patch": {},
		"novos": [],
		"efeitos": {
			"Y0ErGUWIQw1Y4o2p": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[trevas]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "JgHtHH40AcZqCRg1",
		"nome": "Dente-de-Dragão",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 45
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "ucdl25Utxqgj0F7y",
		"nome": "Musgo Púrpura",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 45
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "h01YOTRjSBEUROhl",
		"nome": "Ossos de Monstro",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 45
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "j250fWNvySzrUnsg",
		"nome": "Saco de Sal",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 45
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "w79bnyKbahOGaY1h",
		"nome": "Ramo Verdejante",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.preco": 45,
			"system.espacos": 0.5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "labWwyXiXHl7JvE0",
		"nome": "Água benta",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "sab"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "5D42HnDgEirhlxS5",
		"nome": "Beladona",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial",
			"system.resistencia.bonus": 5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "AR9UuAfq1S79LCKu",
		"nome": "Cicuta",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "NsULSsz7FpJiBIZO",
		"nome": "Riso do Louco",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "V8YwNH55UVO1jo74",
		"nome": "Peçonha Comum",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude anula"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "bOB6wziZ6QSoP5Gc",
		"nome": "Bruma Sonolenta",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial",
			"system.resistencia.bonus": 0
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "eei0UxgEGZ0rzqy4",
		"nome": "Peçonha Potente",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "efp33Oq12RykdKSC",
		"nome": "Essência de Sombra",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "kmbfQJLBekZl3cNM",
		"nome": "Peçonha Concentrada",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "rVf3avjsoKoSn5q3",
		"nome": "Névoa Tóxica",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "t6KNqLZXkb5VHN71",
		"nome": "Veneno de aranha gigante",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude anula"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "vWFPY6WKfjpZ1zZR",
		"nome": "Pó de Lich",
		"tipo": "consumivel",
		"pacote": "equipamentos",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial",
			"system.resistencia.bonus": 5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "okK7ZXnCohxFizUe",
		"nome": "Granada de Bola de Fogo",
		"tipo": "consumivel",
		"pacote": "pocoes",
		"patch": {
			"system.resistencia.atributo": "int"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "uujNCTQJR9CjJg2N",
		"nome": "Granada de Bola de Fogo (10d6)",
		"tipo": "consumivel",
		"pacote": "pocoes",
		"patch": {
			"system.resistencia.atributo": "int"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "XgRYUChRMmaCzVdw",
		"nome": "Granada de Área Escorregadia",
		"tipo": "consumivel",
		"pacote": "pocoes",
		"patch": {
			"system.resistencia.atributo": "int"
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "nNpGA5SWMj7rtUQR",
		"nome": "Combatente",
		"tipo": "poder",
		"pacote": "parceiros",
		"patch": {},
		"novos": [],
		"efeitos": {
			"0XdtJE9twft7P06y": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"value": 2,
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			},
			"8HB07xD3YNsKwoVi": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"value": 3,
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			},
			"kkGIh1gcIfCkUSnZ": {
				"system": {
					"changes": [
						{
							"key": "ataque",
							"value": 4,
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "7lfeJh64Fgc2fwyS",
		"nome": "Terra de Cemitério",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.preco": 30
		},
		"novos": [],
		"efeitos": {
			"mhMNYFNWFT6UyhFS": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[trevas]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "O0IklBvPPNcN8mRS",
		"nome": "Terra de Cemitério",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.preco": 30
		},
		"novos": [],
		"efeitos": {
			"mhMNYFNWFT6UyhFS": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[trevas]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "q2c2D56nNJafWET2",
		"nome": "Terra de Cemitério",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.preco": 30
		},
		"novos": [],
		"efeitos": {
			"mhMNYFNWFT6UyhFS": {
				"system": {
					"changes": [
						{
							"key": "dano",
							"value": "1d6[trevas]",
							"priority": 0,
							"type": "add",
							"phase": "initial"
						}
					]
				}
			}
		}
	},
	{
		"id": "8IqtEk4YMIrGk0Pk",
		"nome": "Beladona",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial",
			"system.resistencia.bonus": 5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "Pkh57CcAyqOuOZyo",
		"nome": "Pó de Lich",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial",
			"system.resistencia.bonus": 5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "RYN7exGjmP9vlxti",
		"nome": "Pó de Lich",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.resistencia.atributo": "int",
			"system.resistencia.txt": "Fortitude parcial",
			"system.resistencia.bonus": 5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "WZUqSRiX8rQvQWvs",
		"nome": "Ramo Verdejante",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.preco": 45,
			"system.espacos": 0.5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "SmgfFG1YRTRAAft1",
		"nome": "Ramo Verdejante",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.preco": 45,
			"system.espacos": 0.5
		},
		"novos": [],
		"efeitos": {}
	},
	{
		"id": "BNgdNKyTvMoSiKPx",
		"nome": "Ramo Verdejante",
		"tipo": "consumivel",
		"pacote": "bestiario-de-arton.bestiario-de-arton",
		"patch": {
			"system.preco": 45
		},
		"novos": [],
		"efeitos": {}
	}
];
