/**
 * Gerado por dev/gerar-npcs.mjs a partir da varredura das fichas de NPC. Não editar à mão.
 * Por id do ator (Ameaças do sistema, cópia do Bestiário, Bestiário de Arton): tipo de criatura, Int nula,
 * imunidades escritas no texto, tipos de dano que faltavam, números errados, CD de cada habilidade (flag
 * "cd"), recarga, cura acelerada do texto de resistências, sentidos, imunidade a crítico, Fraqueza Zumbi,
 * dano à metade e incorpóreo.
 */
export const ATORES = {
	"MKKB4eECVXAjyvRy": {
		"nome": "Aparição",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {
			"1dUkvjqGzvhL4L2M": {
				"nome": "Toque drenante",
				"patch": {
					"system.resistencia.txt": "Fortitude"
				},
				"flags": {
					"cd": 21
				}
			}
		}
	},
	"XAJNOpuVGZSZpjW7": {
		"nome": "Esqueleto",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"0QJaEz9fdHb47RXi": {
		"nome": "Esqueleto de Elite",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"xMTYBQqQ15QmIqPH": {
		"nome": "Falange",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"Qk9okLSrfLXz55jd": {
		"nome": "Turba Zumbi",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {
			"intNula": true,
			"fraquezaZumbi": true
		},
		"itens": {}
	},
	"d5Im71VWcxIz9xKM": {
		"nome": "Vampiro",
		"patch": {
			"system.detalhes.tipo": "mor",
			"system.tracos.resistencias.dano.value": 0,
			"system.tracos.resistencias.dano.base": 0
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 10
		},
		"itens": {
			"mZck2eUTP7KO1ZmU": {
				"nome": "Dominação Vampírica",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 29
				}
			},
			"fwBnTCYmym5Put9h": {
				"nome": "Presença Majestosa",
				"patch": {
					"system.resistencia.txt": "Vontade"
				},
				"flags": {
					"cd": 29
				}
			}
		}
	},
	"aDJoJf7PgQ33UvNA": {
		"nome": "Zumbi",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"fraquezaZumbi": true
		},
		"itens": {}
	},
	"xsx0SHWS66Bhwgdd": {
		"nome": "Aparição",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {
			"1dUkvjqGzvhL4L2M": {
				"nome": "Toque drenante",
				"patch": {
					"system.resistencia.txt": "Fortitude"
				},
				"flags": {
					"cd": 21
				}
			}
		}
	},
	"b1Hggn06kKX22ksj": {
		"nome": "Esqueleto",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"FNGdDiBpdohhmGuh": {
		"nome": "Esqueleto de Elite",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"NyRDPVAVuWw4zjUK": {
		"nome": "Falange",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"8zMS5KYCAqN38Pyl": {
		"nome": "Turba Zumbi",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {
			"intNula": true,
			"fraquezaZumbi": true
		},
		"itens": {}
	},
	"Ac1nQ4BV8Cq08LoY": {
		"nome": "Vampiro",
		"patch": {
			"system.detalhes.tipo": "mor",
			"system.tracos.resistencias.dano.value": 0,
			"system.tracos.resistencias.dano.base": 0
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 10
		},
		"itens": {
			"mZck2eUTP7KO1ZmU": {
				"nome": "Dominação Vampírica",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 29
				}
			},
			"fwBnTCYmym5Put9h": {
				"nome": "Presença Majestosa",
				"patch": {
					"system.resistencia.txt": "Vontade"
				},
				"flags": {
					"cd": 29
				}
			}
		}
	},
	"QnMjmERFrvAgzXYj": {
		"nome": "Zumbi",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"fraquezaZumbi": true
		},
		"itens": {}
	},
	"sfD0Pg3PyF0X9M0v": {
		"nome": "Dromedário",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"EO0Naxv2xCFzEQoG": {
		"nome": "Fantasma Ancestral",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"Xve6eeQIWFDTACmJ": {
		"nome": "Fanático Lefou",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"7BRNcw6Qbjpii12y": {
		"nome": "Golem de Barro",
		"patch": {
			"system.detalhes.tipo": "con"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"5zMkjxa1nif9hiWk": {
		"nome": "Iniciada de Sszzaas",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"FhmsMd5LB5mmfnHF": {
		"nome": "Kishin",
		"patch": {
			"system.detalhes.tipo": "con"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"qprwVQZPTBFsITyN": {
		"nome": "Líder Fanático Lefou",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"4NVglJnkC6dYt7OO": {
		"nome": "Necrodraco Lich",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"RxvVX9KnwZBooGSv": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"RAT3UJIC2AvzfQex": {
		"nome": "Pliorex",
		"patch": {
			"system.detalhes.tipo": "ani"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"uauLN2NDlX9a26NX": {
		"nome": "Tatu-Montanha",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"YbkdQMk8FPD8etE5": {
				"nome": "Varrer Ameaças",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"ydfQY3p0b1er6RbV": {
		"nome": "Trog Caçador",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"HVf3gTV0B9v64RnO": {
		"nome": "Trog Rei dos Túneis",
		"patch": {
			"system.detalhes.tipo": "mon"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"oiKDpDI7ZOWXgt1W": {
		"nome": "Wisphago",
		"patch": {
			"system.detalhes.tipo": "mor"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"lvrM7A870HZz21fL": {
		"nome": "Yidishan Bugbear",
		"patch": {
			"system.detalhes.tipo": "con"
		},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"XWPOb2SGAjEXS3XQ": {
				"nome": "Soco Pneumático",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"WMcZXuIIRzCPzr6a": {
		"nome": "Colosso Supremo",
		"patch": {},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {
			"intNula": true,
			"curaAcelerada": 20
		},
		"itens": {
			"aHHwjYFkyIHuEhlF": {
				"nome": "Passar por Cima",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 38
				}
			},
			"iyRHwPujSriaKVlC": {
				"nome": "Fumos Tóxicos",
				"patch": {},
				"flags": {
					"cd": 38
				}
			},
			"SHrDe5wuIWkPnNMc": {
				"nome": "Jato de Chamas",
				"patch": {},
				"flags": {
					"cd": 38
				}
			}
		}
	},
	"XxD1i2mq6QdiJmzP": {
		"nome": "Engenho de Guerra Goblin",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"qeQTpUD6Kixxwous": {
				"nome": "Canhão elétrico 1",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 22
				}
			},
			"VRjQZsBB6WlTcaah": {
				"nome": "Balestra ácida 2",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 22
				}
			},
			"Ev84iq6B6bvRBwKv": {
				"nome": "Foles 3",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 23
				}
			},
			"TLX9unucnb9Yxmf6": {
				"nome": "Poça de óleo 5",
				"patch": {},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"7kH7Ze9ZyQXkDlhT": {
		"nome": "Glop",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"jiX0Itt2On27hc30": {
		"nome": "Golem de Ferro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"cSx3ha1NIJEA4hJ5": {
				"nome": "Sopro",
				"patch": {
					"system.resistencia.txt": "Fortitude reduz à metade"
				},
				"flags": {
					"cd": 30,
					"recarga": "movimento"
				}
			}
		}
	},
	"aeRk88qsewpzr7KJ": {
		"nome": "Colosso Supremo",
		"patch": {},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {
			"intNula": true,
			"curaAcelerada": 20
		},
		"itens": {
			"aHHwjYFkyIHuEhlF": {
				"nome": "Passar por Cima",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 38
				}
			},
			"iyRHwPujSriaKVlC": {
				"nome": "Fumos Tóxicos",
				"patch": {},
				"flags": {
					"cd": 38
				}
			},
			"SHrDe5wuIWkPnNMc": {
				"nome": "Jato de Chamas",
				"patch": {},
				"flags": {
					"cd": 38
				}
			}
		}
	},
	"zygdaNCiUnoAxMit": {
		"nome": "Engenho de Guerra Goblin",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"qeQTpUD6Kixxwous": {
				"nome": "Canhão elétrico 1",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 22
				}
			},
			"VRjQZsBB6WlTcaah": {
				"nome": "Balestra ácida 2",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 22
				}
			},
			"Ev84iq6B6bvRBwKv": {
				"nome": "Foles 3",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 23
				}
			},
			"TLX9unucnb9Yxmf6": {
				"nome": "Poça de óleo 5",
				"patch": {},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"UAlTqtC6DoMLkMzi": {
		"nome": "Glop",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"eogg1bnqZc83zEgg": {
		"nome": "Golem de Ferro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"cSx3ha1NIJEA4hJ5": {
				"nome": "Sopro",
				"patch": {
					"system.resistencia.txt": "Fortitude reduz à metade"
				},
				"flags": {
					"cd": 30,
					"recarga": "movimento"
				}
			}
		}
	},
	"xn8hAbcfYGtIEbkN": {
		"nome": "Brawar",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"miC1junhlnHvtkyj": {
		"nome": "Chacal-Zumbi",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"fraquezaZumbi": true
		},
		"itens": {}
	},
	"diap18bIAu7m20KZ": {
		"nome": "Corcel de Comando",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"E7FbnaZLe97rm9gB": {
		"nome": "Esmagador Coletivo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"imuneCritico": true
		},
		"itens": {}
	},
	"S87pZiEPzjOjFaE4": {
		"nome": "Garra-Zumbi",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"ybnVfVOcdAwcjWpu": {
		"nome": "Garra-Zumbi Enxame",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"fkiJAqZMvMrpzWYP": {
		"nome": "Garra-Zumbi Gigante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"u8nMsTBtDFg3Y6PQ": {
		"nome": "Garra-Zumbi Ogro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"eHpovtdPvhG9xbUi": {
		"nome": "Glooop",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"dzdClLqMTKxZl0sN": {
		"nome": "Glop",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"6gvXsLl13scO1YDH": {
		"nome": "Golem de Bronze",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"ryEZRzrCCLop1243": {
				"nome": "Soar os Sinos",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"SCxES8can6RhFPZ8": {
		"nome": "Golem de Carne",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"S5yV2Eq0qSeJmH8y": {
		"nome": "Golem de Espelhos",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"QRqLwMChm0yJSYeQ": {
		"nome": "Golem de Ferro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"zdd9Vspf78AZDWy8": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"s8NL5OTsMFaNFLov": {
		"nome": "Golem de Ferro Superior",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"0ImJTFocwgFNlzMy": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"YX9QzhyPZRJeK1hB": {
		"nome": "Golem de Matéria Vermelha",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"imuneCritico": true
		},
		"itens": {}
	},
	"oH9KPyUZkEphpLZd": {
		"nome": "Golem de Nor Enorme",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"JTTKjAkKSOt46e1x": {
		"nome": "Golem de Nor Grande",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"9x4r3CORfDgvML3n": {
		"nome": "Golem de Nor Médio",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"jvyyJh8GZs6GogQj": {
		"nome": "Golem de Pedra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"w5jsppxxIMtORAVw": {
		"nome": "Hidra Esqueleto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"curaAcelerada": 100
		},
		"itens": {}
	},
	"jczf1B4qlWqOxbx9": {
		"nome": "Homúnculo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"ZWqxMplVWn5jWJyy": {
		"nome": "Infecto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"NSRlcPca0y6NXfpI": {
		"nome": "Instrumento Divino",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"6L8Y8QbOBoGWd5Lc": {
		"nome": "Kishinauros",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"Bhkpqbr1GrMbEm3D": {
				"nome": "Balista Explosiva",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			},
			"Cgm80k3cyUpBEPq5": {
				"nome": "Canhão Final",
				"patch": {},
				"flags": {
					"recarga": "padrão"
				}
			},
			"8WR0Vqcz2n4HCOkp": {
				"nome": "Morteiro Elemental x4",
				"patch": {},
				"flags": {
					"recarga": "movimento, apenas com sobrecarga 0"
				}
			},
			"PUZ2x1BSVBdZtfl4": {
				"nome": "Balística Avançada",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"r4QMzPJ32OMQuOZJ": {
		"nome": "Mamãe Glop",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"9Sqkp5GiCdi7YJF2": {
		"nome": "Ogro Esqueleto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"danoMetade": [
				"corte",
				"frio",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"ZKTCDWjsAh49T42H": {
		"nome": "Rei-Tirano Esqueleto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"UjHctIYwdJQkaYR0": {
		"nome": "Soldado Mecânico",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {
			"etnoX8c9o1Xsgqjr": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"pWwOTP82GsQQUudt": {
		"nome": "Soterrado vagante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"Q3557HBx9ASqffCs": {
		"nome": "Turba de Infectos",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"1Q8jrBfdxJ1XHP3B": {
		"nome": "Zumbi Peçonha",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true,
			"fraquezaZumbi": true
		},
		"itens": {}
	},
	"yntUf2h63Y9o8eSA": {
		"nome": "Árvore-Matilha",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"intNula": true
		},
		"itens": {}
	},
	"1WalURwykNVk3Ahu": {
		"nome": "Sacerdote da Tormenta",
		"patch": {},
		"ic": [
			"confuso"
		],
		"sentidos": [],
		"flags": {},
		"itens": {
			"RTzcRMpceke1w2kG": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"Uq71Bq8sMlpzMaX7": {
				"nome": "Sangue Ácido",
				"patch": {
					"system.rolls.0.parts.0.0": "10"
				},
				"flags": {}
			}
		}
	},
	"7mnCbWPNinbZpRwe": {
		"nome": "Otyugh",
		"patch": {},
		"ic": [
			"doente",
			"veneno"
		],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"N1zMOukMdldQKz6y": {
		"nome": "Serpe",
		"patch": {},
		"ic": [
			"paralisado"
		],
		"sentidos": [],
		"flags": {},
		"itens": {
			"5FxctnjGJpEK6iXF": {
				"nome": "Peçonha Concentrada",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"Tt9OlKR8iAPD9zvz": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 20
				}
			}
		}
	},
	"oZgZENn3I6vseSWs": {
		"nome": "Guerreiro de Chifres",
		"patch": {},
		"ic": [
			"veneno"
		],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"CvA2wgBaDeyhE23C": {
		"nome": "Assassino Aberrante",
		"patch": {
			"system.tracos.resistencias.acido.imunidade": true,
			"system.tracos.resistencias.eletricidade.imunidade": true,
			"system.tracos.resistencias.fogo.imunidade": true,
			"system.tracos.resistencias.frio.imunidade": true,
			"system.tracos.resistencias.luz.imunidade": true,
			"system.tracos.resistencias.trevas.imunidade": true
		},
		"ic": [
			"cansaco",
			"exausto",
			"fatigado",
			"luz",
			"metabolismo",
			"doente",
			"enjoado",
			"sangrando",
			"metamorfose",
			"petrificado",
			"paralisado",
			"trevas",
			"veneno",
			"envenenado"
		],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"dG9iiX93WteKbAIF": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 26
				}
			},
			"wdvIwduar9PAX00W": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 26
				}
			}
		}
	},
	"ZPxFnXhUZ2dbcedC": {
		"nome": "Enxame Kobold",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"IiW8RCS8dtgBgXjk": {
				"nome": "Caixa com Pregos",
				"patch": {},
				"flags": {
					"cd": 16
				}
			}
		}
	},
	"v4wsRftxUrW1sbiV": {
		"nome": "Sacerdote de Aharadak",
		"patch": {},
		"ic": [
			"confuso"
		],
		"sentidos": [],
		"flags": {},
		"itens": {
			"RTzcRMpceke1w2kG": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"Uq71Bq8sMlpzMaX7": {
				"nome": "Sangue Ácido",
				"patch": {
					"system.rolls.0.parts.0.0": "10"
				},
				"flags": {}
			}
		}
	},
	"7vrne1SjF205tXlN": {
		"nome": "Otyugh",
		"patch": {},
		"ic": [
			"doente",
			"veneno"
		],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"wdYYHtKa59RuVAbP": {
		"nome": "Serpe",
		"patch": {},
		"ic": [
			"paralisado"
		],
		"sentidos": [],
		"flags": {},
		"itens": {
			"5FxctnjGJpEK6iXF": {
				"nome": "Peçonha Concentrada",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"Tt9OlKR8iAPD9zvz": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 20
				}
			}
		}
	},
	"sFx6F6TQtfTccYmI": {
		"nome": "Guerreiro de Chifres",
		"patch": {},
		"ic": [
			"veneno"
		],
		"sentidos": [],
		"flags": {},
		"itens": {}
	},
	"UxaQQ1wDPeETznsy": {
		"nome": "Reishid",
		"patch": {
			"system.tracos.resistencias.acido.imunidade": true,
			"system.tracos.resistencias.eletricidade.imunidade": true,
			"system.tracos.resistencias.fogo.imunidade": true,
			"system.tracos.resistencias.frio.imunidade": true,
			"system.tracos.resistencias.luz.imunidade": true,
			"system.tracos.resistencias.trevas.imunidade": true
		},
		"ic": [
			"cansaco",
			"exausto",
			"fatigado",
			"luz",
			"metabolismo",
			"doente",
			"enjoado",
			"sangrando",
			"metamorfose",
			"petrificado",
			"paralisado",
			"trevas",
			"veneno",
			"envenenado"
		],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"dG9iiX93WteKbAIF": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 26
				}
			},
			"wdvIwduar9PAX00W": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 26
				}
			}
		}
	},
	"Pbqt0ydiLgNWZJY3": {
		"nome": "Enxame Kobold",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"IiW8RCS8dtgBgXjk": {
				"nome": "Caixa com Pregos",
				"patch": {},
				"flags": {
					"cd": 16
				}
			}
		}
	},
	"BdRSaQ7u74LMUELW": {
		"nome": "Formiga Aberrante Maior",
		"patch": {
			"system.tracos.resistencias.acido.imunidade": true,
			"system.tracos.resistencias.eletricidade.imunidade": true,
			"system.tracos.resistencias.fogo.imunidade": true,
			"system.tracos.resistencias.frio.imunidade": true,
			"system.tracos.resistencias.luz.imunidade": true,
			"system.tracos.resistencias.trevas.imunidade": true
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"zHBO7YrJ6yTxdo27": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"FF9PpLugg4L34Jh1": {
		"nome": "Besouro Aberrante",
		"patch": {
			"system.tracos.resistencias.acido.imunidade": true,
			"system.tracos.resistencias.eletricidade.imunidade": true,
			"system.tracos.resistencias.fogo.imunidade": true,
			"system.tracos.resistencias.frio.imunidade": true,
			"system.tracos.resistencias.luz.imunidade": true,
			"system.tracos.resistencias.trevas.imunidade": true
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"7uea1a24gB2hD6W3": {
				"nome": "Jato de Ácido",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 42,
					"recarga": "movimento"
				}
			},
			"9Tvji8APEDib4fYm": {
				"nome": "Passar por Cima",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 42
				}
			},
			"SADg9xY46Gfm1Hbw": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 42
				}
			}
		}
	},
	"f0d4hGjc8Z4O4fRQ": {
		"nome": "Geraktril",
		"patch": {
			"system.tracos.resistencias.acido.imunidade": true,
			"system.tracos.resistencias.eletricidade.imunidade": true,
			"system.tracos.resistencias.fogo.imunidade": true,
			"system.tracos.resistencias.frio.imunidade": true,
			"system.tracos.resistencias.luz.imunidade": true,
			"system.tracos.resistencias.trevas.imunidade": true
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"zHBO7YrJ6yTxdo27": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"KyvdVkhyKDTfP7vU": {
		"nome": "Thuwarokk",
		"patch": {
			"system.tracos.resistencias.acido.imunidade": true,
			"system.tracos.resistencias.eletricidade.imunidade": true,
			"system.tracos.resistencias.fogo.imunidade": true,
			"system.tracos.resistencias.frio.imunidade": true,
			"system.tracos.resistencias.luz.imunidade": true,
			"system.tracos.resistencias.trevas.imunidade": true
		},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"7uea1a24gB2hD6W3": {
				"nome": "Jato de Ácido",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 42,
					"recarga": "movimento"
				}
			},
			"9Tvji8APEDib4fYm": {
				"nome": "Passar por Cima",
				"patch": {
					"system.resistencia.txt": "Reflexos reduz à metade"
				},
				"flags": {
					"cd": 42
				}
			},
			"SADg9xY46Gfm1Hbw": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 42
				}
			}
		}
	},
	"7TCQN1jw49OLjGb6": {
		"nome": "Arauto dos Goblinoides",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"cEZfIDOH5GcQgTdj": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"AyNZLJFQ4Hyjc6vb": {
				"nome": "Amedrontar",
				"patch": {},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"A7BX3loo7rrGf1PT": {
		"nome": "Basilisco",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"fuOM6FJuDQZ9SVvn": {
				"nome": "Peçonha Concentrada",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"34oReGY7DxpW1Rw3": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "1d12"
				},
				"flags": {
					"cd": 18
				}
			},
			"ux1BjaRHL4495IGd": {
				"nome": "Olhar Petrificante",
				"patch": {
					"system.resistencia.txt": "Reflexos"
				},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"2kweWiPEjdPB3zkv": {
		"nome": "Capelão de Guerra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"55VMtJnF6GZIAWMV": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"W49k1LMMJIxCwAnI": {
				"nome": "Soco de Arsenal",
				"patch": {
					"system.resistencia.txt": "Fortitude reduz à metade"
				},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"RHLtYwYren3OrRSw": {
		"nome": "Cascavel",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"gTNoWaGhS6Yl5cQy": {
				"nome": "Peçonha Comum",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"iYGWCt64Fy4OeNR4": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "1d12",
					"system.resistencia.txt": "Fortitude evita"
				},
				"flags": {
					"cd": 16
				}
			}
		}
	},
	"yDY9SyAksM37Lw0h": {
		"nome": "Centauro Xamã",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"LNJcwSRw886ytNOK": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"imyqBuF2CQCfn5ew": {
				"nome": "Controlar Plantas",
				"patch": {},
				"flags": {
					"cd": 17
				}
			}
		}
	},
	"QmbDo3LPMBsBDcno": {
		"nome": "Cultista da Traição",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"KJi0Nb9mxWJSiCC6": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"4VDUR5DwYQEw4vYq": {
				"nome": "Miasma Mefítico",
				"patch": {
					"system.rolls.0.parts.0.1": "acido"
				},
				"flags": {
					"cd": 22
				}
			},
			"W8OfYNgtIMplAmGM": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "2d12"
				},
				"flags": {
					"cd": 22
				}
			},
			"zaS4yvszWuhJnPBD": {
				"nome": "Ataque Furtivo",
				"patch": {
					"system.rolls.0.parts.0.0": "5d6"
				},
				"flags": {}
			},
			"DKxOiJEylJzZ3bYU": {
				"nome": "Olhar Atordoante",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"uAmsaSF5Jf3M775Y": {
				"nome": "Comando",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"HrJfJffvmLfSSQ7V": {
				"nome": "Escuridão",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"ccEfBDAfvUmJp4Qh": {
				"nome": "Enxame de Pestes",
				"patch": {},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"eHAHgDlAXql7oMgP": {
		"nome": "Dragão Adulto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"VyB0mbDfLQoAJPZX": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"fq9a31LnXik0Kl84": {
				"nome": "Sopro",
				"patch": {
					"system.rolls.0.parts.0.1": "fogo"
				},
				"flags": {
					"cd": 32,
					"recarga": "movimento"
				}
			},
			"3yO9ZGGHb5EK0UEU": {
				"nome": "Aura Aterradora",
				"patch": {},
				"flags": {
					"cd": 21
				}
			},
			"mEKYitiaSXwc1FVY": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 32
				}
			}
		}
	},
	"vOboZ4AoGFu1xTjh": {
		"nome": "Dragão Jovem",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"HqJco7CmwPV5BBzK": {
				"nome": "Sopro",
				"patch": {
					"system.rolls.0.parts.0.1": "fogo"
				},
				"flags": {
					"cd": 25,
					"recarga": "movimento"
				}
			}
		}
	},
	"DmNUlGZn7LP3qJkW": {
		"nome": "Dragão Venerável",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"LHza7TIGnB9th940": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"i0MVCWnGKkJ29EiG": {
				"nome": "Aura Aterradora",
				"patch": {},
				"flags": {
					"cd": 40
				}
			},
			"2FZR6fzx0c9mqMj1": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 40
				}
			},
			"9xD2obRg4PlyvZep": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 40,
					"recarga": "movimento"
				}
			}
		}
	},
	"Y2et7W3oI63C9xB9": {
		"nome": "Dragão-Rei",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"wsRQVcotrU0pRPW6": {
				"nome": "Segunda Chance",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"YfTwPZHBlJZkeDUS": {
				"nome": "Aura Aterradora",
				"patch": {},
				"flags": {
					"cd": 50
				}
			},
			"1hFlNTevgoPXMRpG": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 50
				}
			},
			"2SSGHzSjF4ZYlEm5": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 50,
					"recarga": "movimento"
				}
			}
		}
	},
	"Uo4OND7Ih8o4Jh2D": {
		"nome": "Finntroll Feitor",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"QSFvFHPWzxBp11GC": {
				"nome": "Adaga Mental",
				"patch": {
					"system.rolls.0.parts.0.1": "psiquico"
				},
				"flags": {
					"cd": 28
				}
			},
			"qCvxLPYmwtEiu2QS": {
				"nome": "Regeneração Vegetal",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"AyzPmHwQEbgNwPhw": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"DdlurIufynUoVlLq": {
				"nome": "Desespero Esmagador",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"imywfPnWLc4526MS": {
				"nome": "Marca da Obediência",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"EStE2LSAmGm5FIxF": {
				"nome": "Relâmpago",
				"patch": {},
				"flags": {
					"cd": 26
				}
			}
		}
	},
	"C5SzE4C5zcu4Y9SJ": {
		"nome": "Sombra dos Goblinoides",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"2IHRVba0VsUQME2o": {
				"nome": "Peçonha Potente",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"KSz7CKDue4EKKapC": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "2d12"
				},
				"flags": {
					"cd": 26
				}
			},
			"MESkbOImBoxLfaqg": {
				"nome": "Ataque Furtivo",
				"patch": {
					"system.rolls.0.parts.0.0": "7d6"
				},
				"flags": {}
			}
		}
	},
	"Sk2D0UyicFhZYldq": {
		"nome": "Arauto de Thwor",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"cEZfIDOH5GcQgTdj": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"AyNZLJFQ4Hyjc6vb": {
				"nome": "Amedrontar",
				"patch": {},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"KiGrGUsLiIdB0giU": {
		"nome": "Basilisco",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"fuOM6FJuDQZ9SVvn": {
				"nome": "Peçonha Concentrada",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"34oReGY7DxpW1Rw3": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "1d12"
				},
				"flags": {
					"cd": 18
				}
			},
			"ux1BjaRHL4495IGd": {
				"nome": "Olhar Petrificante",
				"patch": {
					"system.resistencia.txt": "Reflexos"
				},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"6ofeLUlYMGGRGEFm": {
		"nome": "Capelão de Guerra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"55VMtJnF6GZIAWMV": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"W49k1LMMJIxCwAnI": {
				"nome": "Soco de Arsenal",
				"patch": {
					"system.resistencia.txt": "Fortitude reduz à metade"
				},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"ZmwbLLzBdY23BY1T": {
		"nome": "Cascavel",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"gTNoWaGhS6Yl5cQy": {
				"nome": "Peçonha Comum",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"iYGWCt64Fy4OeNR4": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "1d12",
					"system.resistencia.txt": "Fortitude evita"
				},
				"flags": {
					"cd": 16
				}
			}
		}
	},
	"e6Vp9TygqvBsIZSv": {
		"nome": "Centauro Xamã",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"LNJcwSRw886ytNOK": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"imyqBuF2CQCfn5ew": {
				"nome": "Controlar Plantas",
				"patch": {},
				"flags": {
					"cd": 17
				}
			}
		}
	},
	"REJdd9E4mC14aF4B": {
		"nome": "Cultista de Sszzaas",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"KJi0Nb9mxWJSiCC6": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"4VDUR5DwYQEw4vYq": {
				"nome": "Miasma Mefítico",
				"patch": {
					"system.rolls.0.parts.0.1": "acido"
				},
				"flags": {
					"cd": 22
				}
			},
			"W8OfYNgtIMplAmGM": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "2d12"
				},
				"flags": {
					"cd": 22
				}
			},
			"zaS4yvszWuhJnPBD": {
				"nome": "Ataque Furtivo",
				"patch": {
					"system.rolls.0.parts.0.0": "5d6"
				},
				"flags": {}
			},
			"DKxOiJEylJzZ3bYU": {
				"nome": "Olhar Atordoante",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"uAmsaSF5Jf3M775Y": {
				"nome": "Comando",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"HrJfJffvmLfSSQ7V": {
				"nome": "Escuridão",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"ccEfBDAfvUmJp4Qh": {
				"nome": "Enxame de Pestes",
				"patch": {},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"UCNt8QqdnPgjl1x6": {
		"nome": "Dragão Adulto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"VyB0mbDfLQoAJPZX": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"fq9a31LnXik0Kl84": {
				"nome": "Sopro",
				"patch": {
					"system.rolls.0.parts.0.1": "fogo"
				},
				"flags": {
					"cd": 32,
					"recarga": "movimento"
				}
			},
			"3yO9ZGGHb5EK0UEU": {
				"nome": "Aura Aterradora",
				"patch": {},
				"flags": {
					"cd": 21
				}
			},
			"mEKYitiaSXwc1FVY": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 32
				}
			}
		}
	},
	"ziq5xNNVDsoqnOvc": {
		"nome": "Dragão Jovem",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"HqJco7CmwPV5BBzK": {
				"nome": "Sopro",
				"patch": {
					"system.rolls.0.parts.0.1": "fogo"
				},
				"flags": {
					"cd": 25,
					"recarga": "movimento"
				}
			}
		}
	},
	"YLwOSfcsS4pTiHYS": {
		"nome": "Dragão Venerável",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"LHza7TIGnB9th940": {
				"nome": "Curar Ferimentos",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"i0MVCWnGKkJ29EiG": {
				"nome": "Aura Aterradora",
				"patch": {},
				"flags": {
					"cd": 40
				}
			},
			"2FZR6fzx0c9mqMj1": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 40
				}
			},
			"9xD2obRg4PlyvZep": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 40,
					"recarga": "movimento"
				}
			}
		}
	},
	"f9VyLUeOVZNl9ZUB": {
		"nome": "Dragão-Rei",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"wsRQVcotrU0pRPW6": {
				"nome": "Segunda Chance",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"YfTwPZHBlJZkeDUS": {
				"nome": "Aura Aterradora",
				"patch": {},
				"flags": {
					"cd": 50
				}
			},
			"1hFlNTevgoPXMRpG": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 50
				}
			},
			"2SSGHzSjF4ZYlEm5": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 50,
					"recarga": "movimento"
				}
			}
		}
	},
	"q0gPM6XS1YHHDoKM": {
		"nome": "Finntroll Feitor",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"QSFvFHPWzxBp11GC": {
				"nome": "Adaga Mental",
				"patch": {
					"system.rolls.0.parts.0.1": "psiquico"
				},
				"flags": {
					"cd": 28
				}
			},
			"qCvxLPYmwtEiu2QS": {
				"nome": "Regeneração Vegetal",
				"patch": {
					"system.rolls.0.parts.0.1": "curapv"
				},
				"flags": {}
			},
			"AyzPmHwQEbgNwPhw": {
				"nome": "Enfeitiçar",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"DdlurIufynUoVlLq": {
				"nome": "Desespero Esmagador",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"imywfPnWLc4526MS": {
				"nome": "Marca da Obediência",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"EStE2LSAmGm5FIxF": {
				"nome": "Relâmpago",
				"patch": {},
				"flags": {
					"cd": 26
				}
			}
		}
	},
	"pwGdlpbCaf8V4YZ5": {
		"nome": "Sombra de Thwor",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"2IHRVba0VsUQME2o": {
				"nome": "Peçonha Potente",
				"patch": {
					"system.rolls.0.parts.0.1": "perda"
				},
				"flags": {}
			},
			"KSz7CKDue4EKKapC": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "2d12"
				},
				"flags": {
					"cd": 26
				}
			},
			"MESkbOImBoxLfaqg": {
				"nome": "Ataque Furtivo",
				"patch": {
					"system.rolls.0.parts.0.0": "7d6"
				},
				"flags": {}
			}
		}
	},
	"dtqJL9MBvKQun2LL": {
		"nome": "Lagash",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"B1UOqENPEgGQGCxT": {
				"nome": "Constrição",
				"patch": {
					"system.rolls.0.parts.0.0": "6d12+28"
				},
				"flags": {}
			},
			"gdD770HikqzgAHFf": {
				"nome": "Cuspe Venenoso",
				"patch": {
					"system.rolls.0.parts.0.0": "6d12",
					"system.resistencia.txt": "Fortitude reduz à metade"
				},
				"flags": {
					"cd": 35
				}
			},
			"TKf77DpO6pjktHvw": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 35
				}
			},
			"nnUDYToTQ9ckjGGs": {
				"nome": "Crias da Traição",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"WUIMRtDAcGN8Y5zn": {
		"nome": "Sargento da Guarda",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"E5bmbpv4GVHCZdXO": {
				"nome": "Besta leve",
				"patch": {
					"system.rolls.1.parts.0.0": "1d8+5"
				},
				"flags": {}
			}
		}
	},
	"eqTw16BCIsgXUsnW": {
		"nome": "Sargento-mor",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"P5iB8ll87Xr9jK4F": {
				"nome": "Besta pesada",
				"patch": {
					"system.rolls.1.parts.0.0": "1d12+10"
				},
				"flags": {}
			}
		}
	},
	"4bdMgKDWlnZ7SaO1": {
		"nome": "Cavaleiro Supremacista",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"kxLrwP7Rsiiuwkl2": {
				"nome": "Toque Chocante",
				"patch": {
					"system.resistencia.txt": ""
				},
				"flags": {
					"cd": 28
				}
			}
		}
	},
	"nhvQoA8jY5I8stzV": {
		"nome": "Hobgoblin Mago de Batalha",
		"patch": {},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {},
		"itens": {
			"VApFrrNxNrScDi3b": {
				"nome": "Toque Vampírico",
				"patch": {
					"system.resistencia.txt": ""
				},
				"flags": {
					"cd": 22
				}
			},
			"L8Hgrhp5elDOlB3A": {
				"nome": "Amedrontar",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"6tf6AEuTnfNhqB1d": {
				"nome": "Bola de Fogo",
				"patch": {},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"9MQN5SeYTHyo0JAE": {
		"nome": "Lagash",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"B1UOqENPEgGQGCxT": {
				"nome": "Constrição",
				"patch": {
					"system.rolls.0.parts.0.0": "6d12+28"
				},
				"flags": {}
			},
			"gdD770HikqzgAHFf": {
				"nome": "Cuspe Venenoso",
				"patch": {
					"system.rolls.0.parts.0.0": "6d12",
					"system.resistencia.txt": "Fortitude reduz à metade"
				},
				"flags": {
					"cd": 35
				}
			},
			"TKf77DpO6pjktHvw": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 35
				}
			},
			"nnUDYToTQ9ckjGGs": {
				"nome": "Crias da Traição",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"2ynCBExOVuKd4fhn": {
		"nome": "Sargento da Guarda",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"E5bmbpv4GVHCZdXO": {
				"nome": "Besta leve",
				"patch": {
					"system.rolls.1.parts.0.0": "1d8+5"
				},
				"flags": {}
			}
		}
	},
	"SnHdyrt24INLoRxz": {
		"nome": "Sargento-mor",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"P5iB8ll87Xr9jK4F": {
				"nome": "Besta pesada",
				"patch": {
					"system.rolls.1.parts.0.0": "1d12+10"
				},
				"flags": {}
			}
		}
	},
	"2eGcPj87namklv6U": {
		"nome": "Cavaleiro do Leopardo Sargento",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"kxLrwP7Rsiiuwkl2": {
				"nome": "Toque Chocante",
				"patch": {
					"system.resistencia.txt": ""
				},
				"flags": {
					"cd": 28
				}
			}
		}
	},
	"9HSkvmZUFAIqImtg": {
		"nome": "Hobgoblin Mago de Batalha",
		"patch": {},
		"ic": [],
		"sentidos": [
			"escuro"
		],
		"flags": {},
		"itens": {
			"VApFrrNxNrScDi3b": {
				"nome": "Toque Vampírico",
				"patch": {
					"system.resistencia.txt": ""
				},
				"flags": {
					"cd": 22
				}
			},
			"L8Hgrhp5elDOlB3A": {
				"nome": "Amedrontar",
				"patch": {},
				"flags": {
					"cd": 22
				}
			},
			"6tf6AEuTnfNhqB1d": {
				"nome": "Bola de Fogo",
				"patch": {},
				"flags": {
					"cd": 22
				}
			}
		}
	},
	"6SHilVskguBrTbNH": {
		"nome": "Hynne Dormente",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"34nC3MKb6YfOWSmu": {
				"nome": "Veneno",
				"patch": {
					"system.rolls.0.parts.0.0": "1d12"
				},
				"flags": {}
			}
		}
	},
	"jO8lLHfMjq56c3v2": {
		"nome": "Bogum",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"OuDPK3426e9sqfS6": {
				"nome": "Veneno",
				"patch": {
					"system.rolls": []
				},
				"flags": {}
			}
		}
	},
	"iGXel8GSixRnxR1H": {
		"nome": "Reishid",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"KWo5rvUewFtCDGmU": {
				"nome": "Veneno",
				"patch": {
					"system.rolls": []
				},
				"flags": {}
			}
		}
	},
	"4s7gPL0b7WbBaWrG": {
		"nome": "Reishid Líder de Culto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"u5bSW1vf2mZDAZtT": {
				"nome": "Veneno",
				"patch": {
					"system.rolls": []
				},
				"flags": {}
			}
		}
	},
	"oN3x5fZqZvKK6RoX": {
		"nome": "Irukanjin",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"VPxtgySsoy43fV8J": {
				"nome": "Tentáculos",
				"patch": {
					"system.rolls.1.parts.2": [
						"",
						"",
						""
					]
				},
				"flags": {}
			},
			"Z2hKaIP8kSbLud92": {
				"nome": "Impacto Mental",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"k65bWNrBEUEym7wo": {
		"nome": "Arquibruxo da Tormenta",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"tIcs7yt7vO5qFngU": {
				"nome": "Raio Arcano",
				"patch": {
					"system.rolls.0.parts.0.0": "4d12+7"
				},
				"flags": {}
			}
		}
	},
	"tmdrHeAHQgaEzuVm": {
		"nome": "Dracomante Superior do Fogo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"hWkOodlNQEWHQGVn": {
				"nome": "Raio Arcano",
				"patch": {
					"system.rolls.0.parts.0.0": "4d12+8"
				},
				"flags": {}
			}
		}
	},
	"ODnb4Ppf9hlmFxam": {
		"nome": "Dracomante do Fogo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"yR0tJrGiWc05rcHJ": {
				"nome": "Raio Arcano",
				"patch": {
					"system.rolls.0.parts.0.0": "2d12+6"
				},
				"flags": {}
			}
		}
	},
	"Gc5ZED1Dw60SGxjb": {
		"nome": "Jhumariel",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"6iYmPkSOpvFJhrUB": {
				"nome": "Cuspe",
				"patch": {
					"system.rolls.0.parts.0.0": "8d8"
				},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"aR9YXtSPDZUzAswl": {
		"nome": "Avatar de Thyatis",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"7DQU8v12pub25w6D": {
				"nome": "Armas abençoadas",
				"patch": {
					"system.rolls.0.parts.0.0": "4d8"
				},
				"flags": {}
			}
		}
	},
	"WN1JcKrIXBrpMepk": {
		"nome": "Minotauro da Manada",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"e5zcM4pGg9vHLVw1": {
				"nome": "Capturar",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"27MfW9PSTo8NY3Ni": {
		"nome": "Kallyanach Morte Glacial",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"XG5hl9UVZO4CfzcU": {
				"nome": "Sopro de Dragão",
				"patch": {
					"system.rolls.0.parts.0.0": "6d12"
				},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"7HB2oloRHQeTptMd": {
		"nome": "Kobold Bruto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"JAZndJ9MQ40bziDw": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"M8G9acDvskJUP2Nx": {
		"nome": "Kobold Explosivo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"RRg3UL2IHm31fLbc": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"W6ErWWznqLIstYQn": {
		"nome": "Kobold Patrulheiro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"kuu5LwCBOl3BxbJp": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"Y0XNt9nyRV55b5HF": {
		"nome": "Kobold Veterano",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"JSigPpnl5y9C8UyQ": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"ur6t2CtUAmQz4d91": {
		"nome": "Kobold Xamã",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"gr59c7Qu9G5L7uWa": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"fkNb6qUPGeVRrDu4": {
		"nome": "Kobold-Mãe",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"IoLG2mu6TZ4cwX5l": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			},
			"MPGb9srqzI6DkMF6": {
				"nome": "Canção de Ninar",
				"patch": {},
				"flags": {
					"recarga": "usar queridinho da mamãe"
				}
			},
			"PJqNQF3GuHwnkM2H": {
				"nome": "Ovos",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"IjSZVvo0xnNYwVCx": {
		"nome": "Patrulha Kobold",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"Fu9rfJ9bztnnMBwO": {
				"nome": "Peste Oportunista",
				"patch": {
					"system.rolls.0.parts.0.0": "1d4"
				},
				"flags": {}
			}
		}
	},
	"aJHKa88HMhvaCnE7": {
		"nome": "Troll das Cavernas",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 20,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {
			"dSt4YfZECd4xi2jJ": {
				"nome": "Golpe Avassalador",
				"patch": {
					"system.resistencia.txt": "Fortitude evita"
				},
				"flags": {
					"cd": 28
				}
			}
		}
	},
	"a4o3vOZbpJJdoN1N": {
		"nome": "Formiga Aberrante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"ZJxgSY1krDDi3U6v": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 17
				}
			}
		}
	},
	"i1ncWfKoHp18E7iH": {
		"nome": "Troll das Cavernas",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 20,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {
			"dSt4YfZECd4xi2jJ": {
				"nome": "Golpe Avassalador",
				"patch": {
					"system.resistencia.txt": "Fortitude evita"
				},
				"flags": {
					"cd": 28
				}
			}
		}
	},
	"yx1zWEYdCbXfILi4": {
		"nome": "Uktril",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"ZJxgSY1krDDi3U6v": {
				"nome": "Insanidade da Tormenta",
				"patch": {
					"system.resistencia.txt": "Vontade evita"
				},
				"flags": {
					"cd": 17
				}
			}
		}
	},
	"ZjAV3NXuB0ZROCHs": {
		"nome": "Aranha Gigante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"CQEAc3WNb3LKA7uv": {
				"nome": "Teia",
				"patch": {},
				"flags": {
					"cd": 18
				}
			},
			"TOPEg89ljB7bPAjd": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"iwhH7ljtDB7JxYSY": {
		"nome": "Cão do Inferno",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"wW47jZrxp73K6hcn": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 17,
					"recarga": "movimento"
				}
			}
		}
	},
	"w0qJgxy3z24Cb34H": {
		"nome": "Dragão Filhote",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"QXhwU56xreSiE8wv": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 18,
					"recarga": "movimento"
				}
			}
		}
	},
	"G7CDTFhKKlvssbYh": {
		"nome": "Goblin Engenhoqueiro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"hZHBWWoRVpBnxu7r": {
				"nome": "Cospe-chamas",
				"patch": {},
				"flags": {
					"cd": 19
				}
			}
		}
	},
	"JvLt0xyUsK8xSmbB": {
		"nome": "Mantícora",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"DXm91sjmLhnTMgvi": {
				"nome": "Espinhos",
				"patch": {},
				"flags": {
					"cd": 22,
					"recarga": "movimento"
				}
			}
		}
	},
	"eBr5U0NRUIhaz2JM": {
		"nome": "Nagah Mística",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"2F8GTI6BYcw4vqeq": {
				"nome": "Relâmpago",
				"patch": {},
				"flags": {
					"cd": 24
				}
			}
		}
	},
	"RRa9FDDcVgGAJQXB": {
		"nome": "Naja",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"zKLkkG8TIr2Mgif0": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"vAEW5YDnI2ECPVRs": {
		"nome": "Necromante",
		"patch": {},
		"ic": [],
		"sentidos": [
			"penumbra"
		],
		"flags": {},
		"itens": {
			"wPwIA1PBv0s2u2EI": {
				"nome": "Amedrontar",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"GPm3N7mryDF24SwL": {
				"nome": "Crânio Voador",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"WoyWSYhMaI9eEcty": {
				"nome": "Toque Vampírico",
				"patch": {},
				"flags": {
					"cd": 28
				}
			}
		}
	},
	"vZGGIFyhurCYpnNR": {
		"nome": "Tirano do Terceiro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"pSKvLmGjckOyHLTP": {
				"nome": "Bola de Fogo",
				"patch": {},
				"flags": {
					"cd": 30
				}
			}
		}
	},
	"rUt3QVqY96mvNkhR": {
		"nome": "Trog",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"nU3X63uU1XCuR2Il": {
				"nome": "Mau Cheiro",
				"patch": {},
				"flags": {
					"cd": 15
				}
			}
		}
	},
	"fP68DR1d4QMuzhaX": {
		"nome": "Aranha Gigante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"CQEAc3WNb3LKA7uv": {
				"nome": "Teia",
				"patch": {},
				"flags": {
					"cd": 18
				}
			},
			"TOPEg89ljB7bPAjd": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"FKZoo7WKfftcY1Zc": {
		"nome": "Cão do Inferno",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"wW47jZrxp73K6hcn": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 17,
					"recarga": "movimento"
				}
			}
		}
	},
	"cBz80UpFIiOM66BG": {
		"nome": "Dragão Filhote",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"QXhwU56xreSiE8wv": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"cd": 18,
					"recarga": "movimento"
				}
			}
		}
	},
	"KtMjKNyYIkI1NXhP": {
		"nome": "Goblin Engenhoqueiro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"hZHBWWoRVpBnxu7r": {
				"nome": "Cospe-chamas",
				"patch": {},
				"flags": {
					"cd": 19
				}
			}
		}
	},
	"xzUnN3qUjgXcGR3s": {
		"nome": "Mantícora",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"DXm91sjmLhnTMgvi": {
				"nome": "Espinhos",
				"patch": {},
				"flags": {
					"cd": 22,
					"recarga": "movimento"
				}
			}
		}
	},
	"UN5Tp4h5dVoyzp0l": {
		"nome": "Nagah Mística",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"2F8GTI6BYcw4vqeq": {
				"nome": "Relâmpago",
				"patch": {},
				"flags": {
					"cd": 24
				}
			}
		}
	},
	"ckTp5bKqAsOgZsUQ": {
		"nome": "Naja",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"zKLkkG8TIr2Mgif0": {
				"nome": "Veneno",
				"patch": {},
				"flags": {
					"cd": 18
				}
			}
		}
	},
	"ulW1CYNEL2HUkBKM": {
		"nome": "Necromante",
		"patch": {},
		"ic": [],
		"sentidos": [
			"penumbra"
		],
		"flags": {},
		"itens": {
			"wPwIA1PBv0s2u2EI": {
				"nome": "Amedrontar",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"GPm3N7mryDF24SwL": {
				"nome": "Crânio Voador",
				"patch": {},
				"flags": {
					"cd": 28
				}
			},
			"WoyWSYhMaI9eEcty": {
				"nome": "Toque Vampírico",
				"patch": {},
				"flags": {
					"cd": 28
				}
			}
		}
	},
	"VivhQIa9I15Ruy2W": {
		"nome": "Tirano do Terceiro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"pSKvLmGjckOyHLTP": {
				"nome": "Bola de Fogo",
				"patch": {},
				"flags": {
					"cd": 30
				}
			}
		}
	},
	"8uboMeY1udAgxsRa": {
		"nome": "Trog",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"nU3X63uU1XCuR2Il": {
				"nome": "Mau Cheiro",
				"patch": {},
				"flags": {
					"cd": 15
				}
			}
		}
	},
	"kqgNlhnGkWUTJ30V": {
		"nome": "Aquin’ne",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"NsHza7ObCPnHM5xC": {
		"nome": "Aspecto de Aharadak",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"1Ey9Us47KlGSjdV0": {
		"nome": "Avatar de Aharadak",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"ZQBT7rdxOjXY9B8M": {
		"nome": "Bando de Pamgras",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"aeKv3zRMesVy9yR2": {
				"nome": "Abalo Sísmico",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"gym3t74EFK3jKl4C": {
		"nome": "Ber-baram",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"AMyWVC6IFdJzYqKw": {
				"nome": "Baforada Flamejante",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			},
			"irYg0DPzjl8VvEHN": {
				"nome": "Marrada Explosiva",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"mmH86i99nDwsr8A9": {
		"nome": "Corgann",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"VcTsENGNgzNegqo3": {
				"nome": "Jato Pressurizado",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"pAUPyxyIWgIXYU0H": {
		"nome": "Elemental Corrompido",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"90sy5V2SGT3PmzeV": {
				"nome": "Torrente Cáustica",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"54xwNznOdCYvPL95": {
		"nome": "Elemental do Veneno Grande",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"uG9vF9Z2D9pvWsId": {
		"nome": "Elemental do Veneno Médio",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"XaOCj34fcNz0I7a3": {
		"nome": "Elemental do Veneno Pequeno",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"g9zOEnYNR7AItlbY": {
		"nome": "Enxame Infernal",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"pdaJRii2Edt96Ai5": {
		"nome": "Gatzvalith,Lorde da Tormenta",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			],
			"curaAcelerada": 50
		},
		"itens": {}
	},
	"Pvowpv97t5w0XQ3P": {
		"nome": "Hallus’tir",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"R7Hsa90B2Z3EIQhm": {
		"nome": "Lefeu, Burodron",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"ewqgrRe5lzqjvY6Z": {
		"nome": "Lefeu, Ezzayn",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"YsgRbTedVHrYNp5N": {
		"nome": "Lefeu, Ezzayn (Batalhão Burodron)",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"eLrmCwG1hjy8rZpe": {
		"nome": "Lefeu, Ezzayn (Cavalaria Hurobakk)",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"afuYDDiajIzwWIKi": {
		"nome": "Lefeu, Ezzayn (Esquadrão Veridak)",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true,
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"x3ShbkLUK9zKSEeC": {
		"nome": "Lefeu, Hurobakk",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"5HaDTRMrSGU6Psmo": {
		"nome": "Lefeu, Morgadrel",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"PzXIyQnIaCAcSnmT": {
				"nome": "Disparar Espinhos",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			},
			"Sa9wrsB4yjBXuew0": {
				"nome": "Jato de Ácido",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"uvUszm5rpP9CrI0K": {
		"nome": "Lefeu, Veridak",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"X7GSfmZtWoFq3BIG": {
		"nome": "Namasqall",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"NnVW9vapuL6D2j2G": {
		"nome": "Nereida",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"pKOE3jiQeZLFfRdc": {
				"nome": "Convocação Marinha",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"iQNFlJHpet2sRKGi": {
		"nome": "Pakk",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"5lvquKgUloLEC84S": {
				"nome": "Arco de Chamas",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"9BQfm5pMeznEOgBe": {
		"nome": "Pamgra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"9wEQuguRuOKELuH4": {
		"nome": "Rarvnaak",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"WHcqw0stdHN8tR14": {
		"nome": "Senhor do Gigante Rubro Forma Final",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"9GWawiEnWwP0eeqD": {
		"nome": "Senhor do Gigante Rubro Forma Inicial",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"I1EctCESvF1ZULsp": {
		"nome": "Serpentaar",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"HPTui16AbswbA9eg": {
				"nome": "Irromper",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"AeGf67ymvzajJQA3": {
		"nome": "Tanaloom",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"WnV6vcazOh1lu5EN": {
		"nome": "Terrier",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {
			"yCLiRQqu57qoJQ5T": {
				"nome": "Pedra-Punho",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"7xwxWavECdd8bO6O": {
		"nome": "T’Peel",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"imuneCritico": true
		},
		"itens": {}
	},
	"52lXRrEVf9xX7quM": {
		"nome": "Necrodraco Zumbi",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"fraquezaZumbi": true
		},
		"itens": {
			"mcBPHbXw3tXL7Z1Q": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"4zzHSrERPWvDQQav": {
		"nome": "Ogro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"VNgK5Qvuzk8ii1Nd": {
		"nome": "Ogro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"E0sABHNqtwQB9QkP": {
		"nome": "Ogro Furioso",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"UqUrwMA8jvL7R7yH": {
		"nome": "Chapéu-Preto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"YmUgwmCQ6EWd4EW9": {
		"nome": "Ogro Caçador",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"oDvlVrpZVTGET6a9": {
		"nome": "Ogro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"cEbqlBcJdOnBOxUL": {
		"nome": "Sckhar, Dragão-Rei do fogo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"68wMrUcIijvEW92j": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"sikhaAkZajp8154F": {
		"nome": "Tarso, Dragão-Rei dos Mortos",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {
			"NuXVdKlfhWoIAlp9": {
				"nome": "Sopro Tenebroso",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"grEvLVCd7aiarJuG": {
		"nome": "Forjador Litúrgico",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"zroRqW7DlTMIg1BU": {
		"nome": "Concílio Forjador",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"GOtPlbhmFRite9aa": {
		"nome": "Enxame Estirge",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"zp4G7Bdffo3IhCXa": {
		"nome": "Enxame Larval",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"5i9AzQPkmAZljcgM": {
		"nome": "Enxame de Gali-Gali",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"z4I4v3BFCPJ3zwTo": {
		"nome": "Enxame de Águas-vivas",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"hBPbBhvahulfflGy": {
		"nome": "Gangue Goblin",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"xfF6BCJfSI0QhI07": {
		"nome": "Horda Goblin",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"CL7vGYkEwTS9Q070": {
		"nome": "Horda Mycotann",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"uDuJ2jBMUfVJc6mF": {
		"nome": "Nuvem de Estirges",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"danoMetade": [
				"corte",
				"impacto",
				"perfuracao"
			]
		},
		"itens": {}
	},
	"BGrPN8UDG2slJcZh": {
		"nome": "Alma Acorrentada",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"OsJ4lJW5nWHDFy45": {
		"nome": "Guerreiro Perpétuo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"WSqOJDkFIG5ip13C": {
		"nome": "Fantasma",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"dTUVR5J3uVcZMKl2": {
		"nome": "Mortalha",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"8Cln6JrxGckCw9b2": {
		"nome": "Sszzaazita Celebrante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"Iq2Y6ufSWTZ1mxCi": {
		"nome": "Sangue do Ayrrak",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"incorporeo": true
		},
		"itens": {}
	},
	"HZ42DL62joiPLBL5": {
		"nome": "Hidra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 100
		},
		"itens": {}
	},
	"sZtq7Z3CrNz856BO": {
		"nome": "Troll",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"IEh8Co1ddfmUhGTR": {
		"nome": "Troll Aquático",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"uHqdtkwqOOoYidcu": {
		"nome": "Troll Subterrâneo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"UaDhpn5X9GnzisN9": {
		"nome": "Troll do Gelo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"xFunykYsAUy0vDt4": {
		"nome": "Ghillanin",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"xr8pFtfChKOT6iXT": {
		"nome": "Glacioll",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"gBY510WZNQHJcvu8": {
		"nome": "Hidra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 100
		},
		"itens": {}
	},
	"cToxa1lwnLTDdwQr": {
		"nome": "Troll",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"seNsYFnDUtcc1HZu": {
		"nome": "Vrakoll",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"acido",
				"fogo"
			]
		},
		"itens": {}
	},
	"7TCYQXoozkp4wGoI": {
		"nome": "Defeituoso",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15,
			"curaAceleradaExceto": [
				"especial"
			]
		},
		"itens": {}
	},
	"lUDEen0m22CD1hLQ": {
		"nome": "Duplo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 5
		},
		"itens": {}
	},
	"yNSLH4d8W56VEOKZ": {
		"nome": "Kaiju",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 50,
			"curaAceleradaExceto": [
				"kaiju"
			]
		},
		"itens": {
			"iPu4SADuympXvKpZ": {
				"nome": "Arsenal Titânico",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"YnsJNPOTgy4U4oQt": {
		"nome": "Rhandomm",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 100
		},
		"itens": {}
	},
	"RXjgEeqKvTX6zN4Z": {
		"nome": "Totem de Sarana (Aspecto de Marah)",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 10,
			"curaAceleradaExceto": [
				"trevas"
			]
		},
		"itens": {}
	},
	"qSD0xwELs15IAEe4": {
		"nome": "Totem do Rei-Tirano (Aspecto de Megalokk)",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {
			"curaAcelerada": 15
		},
		"itens": {}
	},
	"mkeQ4xkpzsgHsswO": {
		"nome": "Arcanista Finntroll",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"UU1ZfD2UgmU7N3Fa": {
				"nome": "Conjurar Trolloides",
				"patch": {},
				"flags": {
					"recarga": "todos os trolloides foram destruídos"
				}
			}
		}
	},
	"DqWqH8SpyU8rYkii": {
		"nome": "Aucharai",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"RaWpoxGXbtpbB30l": {
				"nome": "Escurecer Olhos",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"W0ABy6Gxc8FW7a4r": {
		"nome": "Avatar de Kallyadranoch",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"7JnqhVa95iypCMFN": {
				"nome": "Sopro Supremo",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"tKbN0tUu2pClQNba": {
		"nome": "Baleote",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"TyGL63cqjtbaHR4r": {
				"nome": "Descarga Elétrica",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"QAzC3GlNIVhlm1uM": {
		"nome": "Bando de Deinonicos",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"E7uJ8ZXoDVn45U3b": {
				"nome": "Caçada Primal",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"9bYO9905k08yCTy2": {
		"nome": "Brontotério",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"ZoChzXh28f0yVvBL": {
				"nome": "Besta Trovão",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"6y3E6mcaquqcELz2": {
		"nome": "Búfalo Paladino de Bullton",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"BLhlUxPCM1JuhhzK": {
				"nome": "Fúria Sagrada (Livre)",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"4mXrRhn04uElE70K": {
		"nome": "Búfalo-de-Guerra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"TkdqXhguLgtQTIuA": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"4uZGC8lhlVM3YmZf": {
		"nome": "Canceronte de Guerra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"3P9CBG5ECc00TtQF": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"6Yt7ITBcNg9P6HO4": {
		"nome": "Capitão Pirata",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"DEIkf8EbJSWsBjQN": {
				"nome": "Terror dos Mares",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"eGHPIo9B1JXzktzH": {
		"nome": "Cavalo Glacial",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"4WWl96C4EtNhjBdb": {
				"nome": "Esguicho",
				"patch": {},
				"flags": {
					"recarga": "passar 1 rodada submerso em água"
				}
			}
		}
	},
	"Ncf7s0uBGWQgK1Ox": {
		"nome": "Ceratops Chefe da Tribo",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"dYYhFaYSIC1Ieyj7": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"SRbMWxA9SQLAdykW": {
		"nome": "Ceratops Guerreiro",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"vH9231aPAIhDgriZ": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"glveeIWbsV1pzFqE": {
		"nome": "Corcel de Kally",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"G8C4IPZmTAtGauPV": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"72eHQSgAphNW0xc4": {
		"nome": "Cão de Kally",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"0BM4PP5JOaw5iA9z": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"pT1pfddkXt63VikP": {
		"nome": "Dançarino de Guerra",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"venPFVLqi4wJhTaX": {
				"nome": "Matar É Viver",
				"patch": {},
				"flags": {
					"recarga": "realizar uma investida"
				}
			}
		}
	},
	"iHLtyDetpdpWufyo": {
		"nome": "Dançarino de Guerra Veterano",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"9rsgTbsnpMfOfjj1": {
				"nome": "Matar É Viver",
				"patch": {},
				"flags": {
					"recarga": "realizar uma investida"
				}
			}
		}
	},
	"EXCiDoxJ7lUoKYVW": {
		"nome": "Diabrete Negociante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"6wIweyBuzpP5Ykic": {
				"nome": "Confundir",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"WrlSGVN4XqsVmkPx": {
		"nome": "Dragão Adulto da Tirania",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"039ZpITg8jU6fqCS": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"N6rfBSl5sBnlpEer": {
		"nome": "Dragão Adulto dos Segredos",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"IxVr8C8FrWv3tjfX": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"YqOYHOmq7Q8YqGsn": {
		"nome": "Dragão Celestial Venerável",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"2C5yTcZeHZevcfw1": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"LMRSSoB7v3DfpTOE": {
		"nome": "Dragão Feral",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"PB9aKRDMMyKx6QCR": {
				"nome": "Investida Imparável",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			},
			"vEtP5Xh1BCUlMZbB": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"SzwDJnD9fRaw9X0w": {
		"nome": "Dragão Filhote do Bosque",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"RAF63LTg0IBjTeCr": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"GVelJ4sskwRDVVbd": {
		"nome": "Dragão Filhote dos Rios",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"JrLr96ZY2LTzjwdk": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"9XmpEQq1koPH90JE": {
		"nome": "Dragão Jovem da Proteção",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"cSEWqpl2OdKsKohR": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"bMeoxhheQe1wjNdC": {
		"nome": "Dragão Jovem do Ocaso",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"gGeknVHoI56hltKz": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"q2rFzkBZNWpWcVqx": {
		"nome": "Dragão Venerável da Equidade",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"yI0Ab30z8WYv6g4c": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"AC8HAu19pFYR70rD": {
		"nome": "Dragão Venerável dos Recifes",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"Pms5MRMgRyyKqXsQ": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"KmVmn91yB8w5rVn5": {
		"nome": "Elefante",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"tbkj9vwwWpEe9UEp": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"OnQTqV1NQ8GvbxYw": {
		"nome": "Enguia Rainha",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"keMroU3BpZglvCPm": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"j3B5z12QYz5Px0fE": {
		"nome": "Ente",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"usbGiDAv4heW5Jhq": {
				"nome": "Árvore Ancestral",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"J2sPoIhcjBlSnI89": {
		"nome": "Gladiador Táurico",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"p2TEdBt0epsUKitf": {
				"nome": "Agitar a Torcida",
				"patch": {},
				"flags": {
					"recarga": "usar estilo espetacular e sangue e areia contra o mesmo inimigo"
				}
			}
		}
	},
	"agZm3qZdWr6hqBqs": {
		"nome": "Jhumariel",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"5CvNg0ZHVAWIkkVt": {
				"nome": "Cuspe",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"OygI81xtoNSsLd46": {
		"nome": "Kill’Bone",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"cca9LvFIyMUSNFaE": {
				"nome": "Rolamento Ofensivo",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"jl5J9SMSLYTmrjg2": {
		"nome": "Lyuba",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"IZD54mDoutn7yjPD": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"LshzDDxRDl7XsXKn": {
		"nome": "Lívido",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"U94T9E9jt0385S80": {
				"nome": "Trapaceiro do Além",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"cjiwaroYCrLJKpMY": {
		"nome": "Mamute",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"CRmbqO99L5vKNz97": {
				"nome": "Arremessar",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			},
			"KqwLGpKVI3UWWOVz": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"VbuLyH0DEkMV5XsM": {
		"nome": "Mamute Esqueleto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"SAorg9D7Oe6GpIgv": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"fGsX33WPsDuMk9uz": {
		"nome": "Mantícora",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"vRqkbn6TX4imRNhr": {
				"nome": "Espinhos",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"MzCVjDqj8NkLV8me": {
		"nome": "Mantícora Primal",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"hfTjvaPuRnCchFnQ": {
				"nome": "Espinhos",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"IUKFfPAGuI6bfmQo": {
		"nome": "Mashin Samurai",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"N6Nh6FKGm4wHmz6B": {
				"nome": "Kiai Divino",
				"patch": {},
				"flags": {
					"recarga": "padrão"
				}
			}
		}
	},
	"5QUTD3CZL9KPHgwt": {
		"nome": "Matrona Gnoll",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"wXYMe9fDK1XY3Uvt": {
				"nome": "Latido Enervante",
				"patch": {},
				"flags": {
					"recarga": "acertar um ataque de mordida"
				}
			},
			"EtVwhdbd4uE9p154": {
				"nome": "Pega!",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"XCemnuiYByJCdTnz": {
		"nome": "Necrodraco Esqueleto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"i3p6IJ9c2s6rFzbN": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"y3mp2GaLkrKWCOmE": {
		"nome": "Ninhada de Dragões Filhotes",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"X6cvMEyc3myAyp3G": {
				"nome": "Sopro Duplo",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"mj116mjmg5OueTjZ": {
		"nome": "Quimera",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"krg38NJk5YMGXKLZ": {
				"nome": "Três Cabeças",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"PRXM1Q0GfVnowN8c": {
		"nome": "Serpe Anciã",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"fdl2Isf692ZetSG2": {
				"nome": "Jato de Podridão",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"3ANaaywm4vPIs2XD": {
		"nome": "Tigre-de-Hyninn Primordial",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"WVRgTlZKeml11F0B": {
				"nome": "Sopro",
				"patch": {},
				"flags": {
					"recarga": "no início de cada rodada do tigre, jogue um dado; recarrega com um resultado par"
				}
			}
		}
	},
	"XUAZt9tLCIgVROvC": {
		"nome": "Tumarkhân",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"IohxTtQ9MXFNeyDD": {
				"nome": "Atropelamento",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"OedlTglro8nrPIpo": {
		"nome": "Tuntram",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"3Uoo8QbLkee1UO7z": {
				"nome": "Amontoar",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"T983cVAUNDZSPYZ8": {
		"nome": "Uraghian Adulto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"DnBY7xj3dHakTI5F": {
				"nome": "Rajada Flamejante",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"p4r4WCDDUEmYcvwA": {
		"nome": "Uraghian Jovem",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"qHfxS4zfKBe7X95Y": {
				"nome": "Rajada Flamejante",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"EsbAXVxAqZUWimpq": {
		"nome": "Verme do Gelo Adulto",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"GNV4l0J1cNnZV0Gu": {
				"nome": "Sopro Glacial",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"ArSsfRAFKfCjIyKc": {
		"nome": "Verme do Gelo Larva",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"apRz2mc515J0frJq": {
				"nome": "Sopro Glacial",
				"patch": {},
				"flags": {
					"recarga": "movimento"
				}
			}
		}
	},
	"JGKGPjhik94n3fgQ": {
		"nome": "Voracis Rainha",
		"patch": {},
		"ic": [],
		"sentidos": [],
		"flags": {},
		"itens": {
			"sG8YRipSklHEgKK2": {
				"nome": "Fúria Primeva",
				"patch": {},
				"flags": {
					"recarga": "matar uma criatura"
				}
			}
		}
	}
};
