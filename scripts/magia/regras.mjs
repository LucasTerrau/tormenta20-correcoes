import { MODULE_ID } from "../constants.mjs";

/**
 * Regras de conjuração do Tormenta20 JdA usadas pelas correções de magia.
 * Círculos por nível: arcanista e clérigo ganham um círculo a cada 4 níveis a partir do 1º
 * (p. 37 e 57); bardo e druida no 1º, 6º, 10º e 14º (p. 44 e 61).
 * Limite de PM por uso = nível na classe que dá a habilidade; outras fontes usam o nível de
 * personagem (p. 224). Pré-requisito de círculo vale para a classe que ensinou a magia; magias
 * aprendidas de outra forma não cumprem esses pré-requisitos (p. 171).
 */
const PROGRESSOES = {
	rapida: [1, 5, 9, 13, 17],
	lenta: [1, 6, 10, 14]
};

const CLASSES_CONJURADORAS = {
	arcanista: { tipos: ["arc"], progressao: "rapida", atributo: "int" },
	bardo: { tipos: ["arc"], progressao: "lenta", atributo: "car" },
	// Variante de bardo (Heróis de Arton p. 33): "Magias. Como o bardo básico."
	magimarcialista: { tipos: ["arc"], progressao: "lenta", atributo: "car" },
	clerigo: { tipos: ["div"], progressao: "rapida", atributo: "sab" },
	druida: { tipos: ["div"], progressao: "lenta", atributo: "sab" }
};

/** Classes do livro básico que não lançam magias. */
const CLASSES_SEM_MAGIA = new Set([
	"barbaro",
	"bucaneiro",
	"cacador",
	"cavaleiro",
	"guerreiro",
	"inventor",
	"ladino",
	"lutador",
	"nobre",
	"paladino"
]);

function slug(text) {
	return String(text ?? "")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "");
}

export function normalizar(text) {
	return String(text ?? "")
		.replace(/<[^>]+>/g, " ")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/\s+/g, " ")
		.trim();
}

/** Texto completo de um aprimoramento (o nome antigo fica na descrição depois da migração 1.6.0). */
export function textoDoAprimoramento(effect) {
	return `${effect.name ?? ""} ${effect.description ?? ""}`;
}

/** "Requer 3º círculo" -> 3; sem requisito -> 0 */
export function circuloExigido(effect) {
	const match = normalizar(textoDoAprimoramento(effect)).match(/requer (\d)\s*(?:o|º|°)?\s*circulo/);
	return match ? Number(match[1]) : 0;
}

export function substituiONormal(effect) {
	return normalizar(textoDoAprimoramento(effect)).includes("em vez do normal");
}

/** Item empunhado/vestido, com o mesmo critério do sistema (espaços de equipamento ou "equipado"). */
export function equipado(item, duasMaos = false) {
	const slots = game.settings.get("tormenta20", "equipmentSlots");
	if (duasMaos) return slots ? Number(item.system.equipado2?.slot) === 12 : Number(item.system.equipado) === 2;
	return Boolean(slots ? item.system.equipado2?.slot : item.system.equipado);
}

function valorAtributo(actor, chave) {
	return Number(actor.system.atributos?.[chave]?.value) || 0;
}

/**
 * Itens e poderes que aumentam o limite de PM de magias. Não há dado para isso no sistema, então
 * são reconhecidos pelo nome.
 * - Magia Ilimitada: soma o atributo-chave (JdA p. 131).
 * - Cajado Arcano (empunhado com as duas mãos) e Orbe Cristalina: +1 em magias arcanas (JdA p. 160).
 * - Melhoria Canalizador em esotérico: +1 (JdA p. 165); Potencializador: +2 (Heróis de Arton).
 * - Contas de Oração: +1 em magias divinas (Deuses de Arton).
 * - Presente dos Deuses: soma a Sabedoria em magias divinas de quem já lança magias (Deuses de Arton).
 * Outros casos (temporários, situacionais): efeito com a chave flags.tormenta20-correcoes.limitePM.
 */
function bonusDeLimite(actor, tipo, classe) {
	const fontes = [];
	const somar = (rotulo, valor) => valor && fontes.push({ rotulo, valor });
	const arcana = tipo === "arc" || tipo === "uni";
	const divina = tipo === "div" || tipo === "uni";

	for (const item of actor.items) {
		const nome = slug(item.name);
		if (item.type === "poder" && nome === "magiailimitada") {
			// Atributo-chave da classe que lança a magia. O arcanista pode usar Int ou Car (campo de
			// conjuração da ficha); as outras classes têm atributo fixo, o que importa em multiclasse.
			const arcanista = !classe || slug(classe.nome) === "arcanista";
			const chave = arcanista ? actor.system.attributes?.conjuracao || classe?.cfg.atributo : classe.cfg.atributo;
			if (chave) somar("Magia Ilimitada", Math.max(valorAtributo(actor, chave), 0));
		} else if (item.type === "poder" && nome === "presentedosdeuses" && divina && classe?.cfg.tipos.includes("div")) {
			somar("Presente dos Deuses", Math.max(valorAtributo(actor, "sab"), 0));
		} else if (["cajadoarcano", "cajadodadestruicao", "cajadodopoder"].includes(nome) && arcana && equipado(item, true)) {
			// As armas específicas "funcionam como um cajado arcano" (JdA p. 336–337); o Cajado da Vida, para
			// magias divinas.
			somar(item.name, 1);
		} else if (nome === "cajadodavida" && divina && equipado(item, true)) {
			somar(item.name, 1);
		} else if (nome === "orbecristalina" && arcana && equipado(item)) {
			somar("Orbe Cristalina", 1);
		} else if (nome === "contasdeoracao" && divina && equipado(item)) {
			somar("Contas de Oração", 1);
		}
		if (item.type === "equipamento" && item.system.tipo === "esoterico" && equipado(item)) {
			for (const ef of item.effects) {
				if (ef.disabled) continue;
				if (slug(ef.name) === "canalizador") somar(`Canalizador (${item.name})`, 1);
				if (slug(ef.name) === "potencializador") somar(`Potencializador (${item.name})`, 2);
			}
		}
	}
	const manual = Number(foundry.utils.getProperty(actor, `flags.${MODULE_ID}.limitePM`)) || 0;
	somar("efeitos", manual);
	return fontes;
}

/**
 * Quem está lançando esta magia e com que limites.
 * @returns {{classe: string|null, nivel: number, limite: number, circulo: number|null, bonus: {rotulo, valor}[]}}
 *          circulo null = não dá para saber (classe fora da tabela): não bloqueia nada.
 */
export function conjurador(actor, magia) {
	const nivelPersonagem = Number(actor.system.attributes?.nivel?.value) || 1;
	const tipo = magia.system?.tipo;
	const classes = actor.items.filter((i) => i.type === "classe");

	// Teurgista Místico (qualquer círculo) e Linhagem Abençoada Básica (1º círculo): magias do outro tipo contam como
	// da classe conjuradora.
	const circuloDaMagia = Number(magia.system?.circulo) || 1;
	const outroTipo = ["arc", "div"].includes(tipo) && actor.items.some((i) => i.type === "poder" && (i.name === "Teurgista Místico" || (i.name === "Linhagem Abençoada Básica" && circuloDaMagia <= 1)));
	const candidatas = classes
		.map((c) => ({ nome: c.name, nivel: Number(c.system.niveis) || 1, cfg: CLASSES_CONJURADORAS[slug(c.name)] }))
		.filter((c) => c.cfg && (tipo === "uni" || c.cfg.tipos.includes(tipo) || (outroTipo && c.cfg.tipos.some((t) => ["arc", "div"].includes(t)))));
	if (candidatas.length) {
		const melhor = candidatas.reduce((a, b) => (b.nivel > a.nivel ? b : a));
		const circulo = PROGRESSOES[melhor.cfg.progressao].filter((n) => melhor.nivel >= n).length;
		const bonus = bonusDeLimite(actor, tipo, melhor);
		const limite = melhor.nivel + bonus.reduce((s, b) => s + b.valor, 0);
		return { classe: melhor.nome, nivel: melhor.nivel, limite, circulo, bonus };
	}

	// Magia concedida por um poder (Luz Sagrada, Olhar Amedrontador…) a quem não a lança pela classe: pode lançá-la,
	// com o limite de PM do nível de personagem.
	if (magia.flags?.[MODULE_ID]?.concedida) {
		const bonus = bonusDeLimite(actor, tipo, null);
		const limite = nivelPersonagem + bonus.reduce((s, b) => s + b.valor, 0);
		return { classe: null, nivel: nivelPersonagem, limite, circulo: circuloDaMagia, bonus };
	}

	// Engenhocas e magias simuladas têm regras próprias; classes fora da tabela (variantes,
	// suplementos, homebrew) não dão como saber o círculo: nesses casos não bloqueamos.
	const desconhecida = classes.some((c) => !CLASSES_SEM_MAGIA.has(slug(c.name)) && !CLASSES_CONJURADORAS[slug(c.name)]);
	const circulo = ["eng", "sim"].includes(tipo) || desconhecida ? null : 0;
	const bonus = bonusDeLimite(actor, tipo, null);
	const limite = nivelPersonagem + bonus.reduce((s, b) => s + b.valor, 0);
	return { classe: null, nivel: nivelPersonagem, limite, circulo, bonus };
}

/**
 * Atributo-chave da magia (JdA p. 173 e 227: "CD = 10 + metade do nível + atributo-chave"): o da classe
 * que ensinou a magia. Arcanista usa o do seu Caminho (atributo de conjuração da ficha); bardo usa Car;
 * clérigo e druida, Sab. O sistema grava um atributo só por personagem ao soltar a magia na ficha.
 * @returns {string|null} null quando a magia tem um atributo próprio (diferente do da ficha) ou nenhuma
 *          classe conjuradora a explica.
 */
export function atributoDeConjuracao(actor, magia) {
	const padrao = actor.system.attributes?.conjuracao || "int";
	const gravado = magia.system?.resistencia?.atributo;
	// Magia concedida com atributo-chave no texto do poder ("atributo-chave Carisma").
	const concedida = magia.flags?.[MODULE_ID]?.concedida;
	if (concedida?.atributo) return concedida.atributo;
	// O atributo gravado veio da ficha (o de agora, o de antes do Caminho ou o padrão "int"): recalcula.
	const daFicha = new Set([padrao, actor._source?.system?.attributes?.conjuracao, "int"]);
	if (gravado && !daFicha.has(gravado)) return null;
	const { classe } = conjurador(actor, magia);
	const cfg = CLASSES_CONJURADORAS[slug(classe)];
	if (!cfg) return null;
	return slug(classe) === "arcanista" ? padrao : cfg.atributo;
}

/**
 * Limite de PM por uso de um poder ou outra habilidade (JdA p. 224): "igual ao seu nível na classe que
 * fornece a habilidade"; habilidades de raça, origem ou outras fontes e poderes gerais usam o nível de
 * personagem. Poderes de classe têm tipo "classe" ou "ability" e o nome da classe em subtipo.
 * @returns {{classe: string|null, nivel: number, limite: number, bonus: object[]}}
 */
export function limiteDeHabilidade(actor, item) {
	const nivelPersonagem = Number(actor.system.attributes?.nivel?.value) || 1;
	if (item.type === "poder" && ["classe", "ability"].includes(item.system?.tipo)) {
		const alvo = slug(item.system.subtipo);
		const classe = alvo && actor.items.find((i) => i.type === "classe" && slug(i.name) === alvo);
		if (classe) {
			const nivel = Number(classe.system.niveis) || 1;
			return { classe: classe.name, nivel, limite: nivel, bonus: [] };
		}
	}
	return { classe: null, nivel: nivelPersonagem, limite: nivelPersonagem, bonus: [] };
}

const NUMEROS = { dois: 2, tres: 3, quatro: 4, cinco: 5, seis: 6 };

/**
 * Níveis da classe em que cada aumento libera, pelas tabelas das classes (JdA cap. 1). O texto só diz "a cada N
 * níveis", e as tabelas contam a partir do nível em que a habilidade é ganha: Ataque Especial (1º) aumenta no 5º, 9º…;
 * Duelo (2º) no 7º, 12º e 17º. A Fúria é a exceção: 5º, 10º e 15º.
 */
const NIVEIS_DOS_AUMENTOS = {
	ataqueespecial: [5, 9, 13, 17], // Guerreiro
	baluarte: [5, 9, 13, 17], // Cavaleiro
	curapelasmaos: [6, 10, 14, 18], // Paladino
	duelo: [7, 12, 17], // Cavaleiro
	furia: [5, 10, 15], // Bárbaro
	golpedivino: [5, 9, 13, 17], // Paladino
	inspiracao: [5, 9, 13, 17], // Bardo
	marcadapresa: [5, 9, 13, 17], // Caçador
	palavrasafiadas: [6, 10, 14, 18] // Nobre
};

/**
 * "A cada quatro níveis, você pode gastar +1 PM para aumentar…" (Ataque Especial, Golpe Divino,
 * Fúria, Inspiração…): quantos aumentos o nível permite. Poderes do Jogo do Ano seguem a tabela da classe
 * (NIVEIS_DOS_AUMENTOS); os outros, a conta do texto. Também "a cada quatro níveis após o 1º".
 * Fórmulas fora do padrão ("a cada cinco níveis seguintes (11º e 16º)") ficam de fora.
 * @returns {{maximo: number, passo: number, depois: number, niveis?: number[]}|null}
 */
export function aumentosPorNivel(item, nivel) {
	const texto = normalizar(item.system?.description?.value);
	const m = texto.match(/a cada (dois|tres|quatro|cinco|seis|\d+) niveis([^.]{0,60}?)pode gastar \+\d+ pm/);
	if (!m || /seguintes/.test(m[2])) return null;
	const passo = NUMEROS[m[1]] ?? Number(m[1]);
	if (!passo) return null;
	const depois = /(apos|acima d)o 1/.test(m[2]) ? 1 : 0;
	const niveis = NIVEIS_DOS_AUMENTOS[slug(item.name)];
	if (niveis) return { maximo: niveis.filter((n) => nivel >= n).length, passo, depois, niveis };
	return { maximo: Math.max(0, Math.floor((nivel - depois) / passo)), passo, depois };
}

/**
 * Maior círculo de magia que o personagem lança, por qualquer classe (nunca menor que o da
 * própria magia). null quando há classe fora da tabela: não dá para saber.
 */
export function circuloMaximo(actor, magia) {
	let maximo = Number(magia?.system?.circulo) || 0;
	for (const c of actor.items) {
		if (c.type !== "classe") continue;
		const cfg = CLASSES_CONJURADORAS[slug(c.name)];
		if (!cfg) {
			if (!CLASSES_SEM_MAGIA.has(slug(c.name))) return null;
			continue;
		}
		const nivel = Number(c.system.niveis) || 1;
		maximo = Math.max(maximo, PROGRESSOES[cfg.progressao].filter((n) => nivel >= n).length);
	}
	return maximo;
}

/** "2" -> {n: 2}; "1d6" ou "d8" -> {n: 1, faces: 6}; texto -> null */
function valorDaMudanca(value) {
	const texto = String(value ?? "").trim();
	if (/^[+-]?\d+$/.test(texto)) return { n: Number(texto) };
	const dado = texto.match(/^(\d*)d(\d+)/i);
	return dado ? { n: Number(dado[1] || 1), faces: Number(dado[2]) } : null;
}

/** Dados de dano da própria magia (das faces indicadas, se houver). */
function dadosDoDano(magia, faces) {
	let total = 0;
	for (const rolagem of magia.system?.rolls ?? []) {
		for (const [formula] of rolagem.parts ?? []) {
			for (const [, n, f] of String(formula ?? "").matchAll(/(\d*)d(\d+)/gi)) {
				if (!faces || Number(f) === faces) total += Number(n || 1);
			}
		}
		if (total) break;
	}
	return total;
}

/** Valor base do bônus que o aprimoramento aumenta: mesma chave num efeito da magia que não é aprimoramento pago. */
function valorBase(magia, aprimoramento, chave) {
	const mesmaChave = (outra) => outra === chave || (!chave.includes(".") && outra.split(".").pop() === chave);
	let base = 0;
	for (const ef of magia.effects) {
		if (ef.id === aprimoramento.id || (ef.system.onuse && Number(ef.system.abilityUse?.custo) > 0)) continue;
		for (const c of ef.system.changes ?? []) {
			const valor = valorDaMudanca(c.value);
			if (mesmaChave(c.key) && valor && !valor.faces) base = Math.max(base, Math.abs(valor.n));
		}
	}
	return base;
}

/**
 * Aprimoramentos "aumenta" com teto no círculo: "bônus máximo limitado pelo círculo máximo de magia
 * que você pode lançar" (Bênção, Arma Mágica, Oração…), "ao dobro do círculo", "total de dados",
 * "número de alvos adicionais". O teto vale para o total (base + aumentos), exceto quando o texto
 * fala só dos adicionais. Base desconhecida conta como 0 (nunca bloqueia a mais).
 * @returns {{maximo: number, teto: number, base: number, passo: number}|null}
 */
export function limiteDeAumento(effect, magia, circulo) {
	if (!effect.system.abilityUse?.aumenta || circulo === null) return null;
	const nota = normalizar(textoDoAprimoramento(effect)).match(/\(([^)]*limitad[oa]s? (pel[oa]|ao dobro do) circulo maximo[^)]*)\)/);
	if (!nota) return null;
	const teto = circulo * (nota[2] === "ao dobro do" ? 2 : 1);
	const mudanca = effect.system.changes.find((c) => valorDaMudanca(c.value));
	const valor = mudanca ? valorDaMudanca(mudanca.value) : null;
	const passo = Math.abs(valor?.n ?? 1) || 1;
	let base = 0;
	if (/adiciona/.test(nota[1])) base = 0;
	else if (/total de alvos/.test(nota[1])) base = 1;
	else if (/total de dados|dados .*maximos/.test(nota[1])) base = dadosDoDano(magia, valor?.faces);
	else if (mudanca && !valor.faces) base = valorBase(magia, effect, mudanca.key);
	return { maximo: Math.max(0, Math.floor((teto - base) / passo)), teto, base, passo };
}

/** Efeito (aprimoramento) reduz o custo à metade? */
export function reduzAMetade(effect) {
	return effect.system.changes.some((c) => c.key === "custo" && String(c.value).trim() === "/2");
}

/**
 * Custo de PM igual ao que o sistema vai cobrar (item.mjs roll), com o mínimo de 1 PM.
 * @param {Item} item               clone usado no diálogo (custo ainda sem aprimoramentos)
 * @param {{effect, qty}[]} escolhas
 */
export function calcularCusto(item, escolhas) {
	const base = Number(item.system.ativacao?.custo) || 0;
	let soma = base;
	let truque = false;
	let metade = false;
	for (const { effect, qty } of escolhas) {
		if (qty <= 0) continue;
		if (effect.system.isCantrip) truque = true;
		soma += (Number(effect.system.abilityUse.custo) || 0) * qty;
		if (reduzAMetade(effect)) metade = true;
	}
	if (truque) return { total: 0, truque, metade };
	const temCusto = base > 0 || soma > 0;
	let total = Math.max(soma, 0) || (base > 0 ? 1 : 0);
	// Alquebrado (+1) e afins só mexem em habilidades que custam PM (o sistema só cobra nesse caso).
	if (temCusto) total += Number(item.actor?.system.modificadores?.custoPM) || 0;
	if (metade) total = Math.floor(total / 2);
	if (temCusto) total = Math.max(total, 1);
	return { total, truque, metade };
}

/**
 * Aprimoramentos escolhidos num uso: pelas opções do diálogo (aprs.<id>.aplica) ou, sem diálogo,
 * os automáticos.
 * @returns {{effect: ActiveEffect, qty: number}[]}
 */
export function aprimoramentosAplicados(item, options = {}) {
	const lista = item.applicableOnUseEffects ?? [];
	const qtd = (id) => {
		const nested = options.aprs?.[id]?.aplica;
		const flat = options[`aprs.${id}.aplica`];
		const valor = nested ?? flat;
		return valor === true ? 1 : Number(valor) || 0;
	};
	const temEscolhas = options.aprs || Object.keys(options).some((k) => k.startsWith("aprs."));
	if (temEscolhas) return lista.map((effect) => ({ effect, qty: qtd(effect.id) })).filter((a) => a.qty > 0);
	return lista.filter((effect) => effect.system.abilityUse.automatic).map((effect) => ({ effect, qty: 1 }));
}
