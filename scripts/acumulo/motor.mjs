import { acessoriosEquipados, armaduraVestida, DEFESA, defesaDoItem, ehBracelete, armaduraDoCorpo } from "./acessorios.mjs";
import { FONTES_EXCLUSIVAS, fonteDoEfeito } from "./fontes.mjs";

/**
 * Chaves fora da regra geral. RD acumula (JdA p. 229: "Múltiplos efeitos de RD são cumulativos").
 * Penalidade de armadura é de cada item (Reforçada, Ajustada…), não um bônus em disputa.
 */
const ISENTAS = [/^system\.tracos\.resistencias\./, /^system\.attributes\.defesa\.pda$/];

export const CUSTO_PM = "system.modificadores.custoPM";

/** Mesmas chaves "curinga" que o sistema expande em ActiveEffectT20._prepareProxyChange. */
const CURINGAS = {
	"system.atributos": null,
	"system.pericias": null,
	"system.attributes.movement": (key) => key in (CONFIG.T20?.movementTypes ?? {})
};

/** Expande "system.pericias.*.bonus" em uma chave por perícia; chaves normais voltam como estão. */
function expandir(actor, key) {
	const match = key.match(/^(.+)\.\*(\..+)?$/);
	if (!match) return [key];
	const [, path, rest = ""] = match;
	if (!(path in CURINGAS)) return [key];
	const filtro = CURINGAS[path] ?? (() => true);
	const alvo = foundry.utils.getProperty(actor, path) ?? {};
	return Object.keys(alvo)
		.filter(filtro)
		.map((k) => `${path}.${k}${rest}`);
}

/**
 * Valor aproximado de uma alteração, só para comparar quem é maior.
 * Dados viram a média (1d6 -> 3,5). Fórmulas inválidas -> null (a alteração fica fora da regra).
 */
export function estimar(value, data) {
	if (typeof value === "number") return value;
	const text = String(value ?? "").trim();
	if (!text) return null;
	try {
		const formula = Roll.replaceFormulaData(text, data, { missing: "0" }).replace(
			/(\d*)d(\d+)/gi,
			(_, n, faces) => `(${n || 1}*(${faces}+1)/2)`
		);
		const result = Roll.safeEval(formula);
		return Number.isFinite(result) ? result : null;
	} catch {
		return null;
	}
}

export const NOMES_DE_ATRIBUTO = { for: "Força", des: "Destreza", con: "Constituição", int: "Inteligência", sab: "Sabedoria", car: "Carisma" };

/**
 * Atributo somado por um valor de efeito ("@sab", "(min(@nvl.miragem, @sab))", "(@car)+5").
 * null quando não soma atributo ou soma mais de um.
 */
export function atributoDoValor(value) {
	const atributos = new Set([...String(value ?? "").matchAll(/@(for|des|con|int|sab|car)\b/g)].map((m) => m[1]));
	return atributos.size === 1 ? [...atributos][0] : null;
}

/** Grupo de competição de uma entrada para uma chave. Entradas no mesmo grupo não acumulam. */
function grupo(key, entrada, opcoes) {
	if (key === CUSTO_PM && entrada.valor < 0 && opcoes.reducaoCusto) return "reducao-custo";
	if (!FONTES_EXCLUSIVAS.has(entrada.fonte)) return `${entrada.fonte}:${entrada.chave}`;
	// Defesa: escudo acumula com armadura e com um outro item (JdA p. 226).
	if (key === "system.attributes.defesa.bonus" && entrada.fonte === "item") {
		const tipo = entrada.item?.system?.tipo;
		if (["leve", "pesada"].includes(tipo) || ehBracelete(entrada.item)) return "item:armadura";
		if (tipo === "escudo") return "item:escudo";
		return "item:outro";
	}
	return entrada.fonte;
}

/**
 * Calcula, para uma fase de aplicação, quais alterações de efeitos não devem ser aplicadas.
 * @param {Actor} actor
 * @param {string} phase
 * @param {object} opcoes                 {acumulo, reducaoCusto, acessorios: boolean}
 * @returns {{bloqueadas: WeakSet<object>, parciais: Map<ActiveEffect, Map<string, Set<string>>>,
 *            relatorio: object[], nativosSuprimidos: Set<string>, vencedores: Map<string, Map<string, number>>}}
 *          nativosSuprimidos: ids de acessórios cuja Defesa do próprio item não deve contar.
 *          vencedores: por chave, o valor que ficou em cada grupo de disputa.
 */
export function calcular(actor, phase, opcoes) {
	const bloqueadas = new WeakSet();
	const parciais = new Map();
	const relatorio = [];
	const nativosSuprimidos = new Set();
	// chave -> grupo de disputa -> valor que ficou (para comparar campos diferentes da mesma rolagem)
	const vencedores = new Map();
	const rollData = actor.getRollData();

	// chave concreta -> efeito -> {valor, alteracoes, ...fonte}
	const porChave = new Map();
	for (const effect of actor.allApplicableEffects()) {
		if (!effect.active) continue;
		const origem = fonteDoEfeito(effect);
		if (!origem) continue;
		const data = effect.getReplacementData(rollData);
		for (const change of effect.system.changes) {
			if (change.type !== "add" || !change.key) continue;
			if (ISENTAS.some((re) => re.test(change.key))) continue;
			if (!effect.shouldApplyChange(change, { phase, replacementData: data })) continue;
			const valor = estimar(change.value, data);
			if (!valor) continue;
			for (const key of expandir(actor, change.key)) {
				const ehCusto = key === CUSTO_PM;
				const defesaDeItem = opcoes.acessorios && key === DEFESA && origem.fonte === "item";
				if (ehCusto ? !opcoes.reducaoCusto && !opcoes.acumulo : !opcoes.acumulo && !defesaDeItem) continue;
				if (!porChave.has(key)) porChave.set(key, new Map());
				const porEfeito = porChave.get(key);
				const entrada = porEfeito.get(effect) ?? { effect, valor: 0, alteracoes: [], ...origem };
				// Atributo somado: só vale se todas as alterações desta chave somam o mesmo atributo.
				const atributo = atributoDoValor(change.value);
				entrada.atributo = entrada.alteracoes.length ? (entrada.atributo === atributo ? atributo : null) : atributo;
				entrada.valor += valor;
				entrada.alteracoes.push(change);
				porEfeito.set(effect, entrada);
			}
		}
	}

	if (opcoes.acessorios && phase === "initial") incluirDefesaDosItens(actor, porChave);

	// Encanto de Defesa vindo de magia (Vestimenta da Fé, Couraça de Allihanna) é encanto da armadura
	// em que foi lançado: disputa com os encantos dela e soma com as melhorias.
	const armadura = porChave.has(DEFESA) ? armaduraVestida(actor) : null;
	if (armadura) {
		for (const entrada of porChave.get(DEFESA).values()) {
			if (entrada.fonte === "encanto" && entrada.effect?.parent?.documentName !== "Item") entrada.alvo = armadura;
		}
	}

	for (const [key, porEfeito] of porChave) {
		agregarPorItem(key, porEfeito, bloqueadas, relatorio, nativosSuprimidos);
		if (opcoes.acumulo) mesmoAtributo(actor, key, porEfeito, bloqueadas, relatorio);
		const grupos = new Map();
		for (const entrada of porEfeito.values()) {
			if (!entrada.valor) continue;
			// Bônus e penalidades competem separadamente: vale o maior bônus e a pior penalidade.
			if (key === CUSTO_PM && !opcoes.acumulo && entrada.valor > 0) continue;
			const id = `${grupo(key, entrada, opcoes)}|${entrada.valor > 0 ? "+" : "-"}`;
			if (!grupos.has(id)) grupos.set(id, []);
			grupos.get(id).push(entrada);
		}
		const porGrupo = new Map();
		vencedores.set(key, porGrupo);
		for (const [id, entradas] of grupos) {
			const vencedor = entradas.reduce((a, b) => (Math.abs(b.valor) > Math.abs(a.valor) ? b : a));
			porGrupo.set(id, vencedor.valor);
			if (entradas.length < 2) continue;
			for (const perdedor of entradas) {
				if (perdedor === vencedor) continue;
				relatorio.push({
					effectId: perdedor.effect?.id ?? null,
					itemId: perdedor.item?.id ?? itemDoEfeito(perdedor.effect),
					effectName: perdedor.effect?.name ?? (perdedor.nativo ? `${perdedor.item.name} (Defesa do item)` : perdedor.item.name),
					key,
					fonte: perdedor.fonte,
					valor: perdedor.valor,
					vencedor: vencedor.effect?.name ?? vencedor.item.name,
					valorVencedor: vencedor.valor
				});
				if (perdedor.nativo || perdedor.nativoMantido) nativosSuprimidos.add(perdedor.item.id);
				if (perdedor.nativo) continue;
				for (const change of perdedor.alteracoes) {
					if (!change.key.includes("*")) {
						bloqueadas.add(change);
						continue;
					}
					const efeito = perdedor.effect ?? perdedor.efeitoDe?.get(change);
					if (!efeito) continue;
					if (!parciais.has(efeito)) parciais.set(efeito, new Map());
					const porAlteracao = parciais.get(efeito);
					if (!porAlteracao.has(change.key)) porAlteracao.set(change.key, new Set());
					porAlteracao.get(change.key).add(key);
				}
			}
		}
	}

	// Curinga que perdeu em todas as chaves: bloqueia a alteração inteira.
	for (const [effect, porAlteracao] of parciais) {
		for (const change of effect.system.changes) {
			const perdidas = porAlteracao.get(change.key);
			if (perdidas && perdidas.size >= expandir(actor, change.key).length) bloqueadas.add(change);
		}
	}

	return { bloqueadas, parciais, relatorio, nativosSuprimidos, vencedores };
}

/**
 * "O valor de um mesmo atributo não se acumula em características do personagem" (JdA p. 226):
 * dois efeitos que somam Sabedoria na Defesa valem uma vez só, de qualquer fonte. A Defesa já usa um
 * atributo (Destreza): somá-lo de novo não vale. Perícias são a exceção: dá para somar o atributo que
 * a perícia já usa, uma vez. Quem perde sai da disputa por fonte.
 */
function mesmoAtributo(actor, key, porEfeito, bloqueadas, relatorio) {
	const porAtributo = new Map();
	for (const [id, entrada] of porEfeito) {
		if (!entrada.atributo || !(entrada.valor > 0) || entrada.nativo) continue;
		if (!porAtributo.has(entrada.atributo)) porAtributo.set(entrada.atributo, []);
		porAtributo.get(entrada.atributo).push([id, entrada]);
	}
	// Com armadura pesada o sistema não soma o atributo da Defesa: um bônus dele (Delicada) não repete nada.
	const pesada = key === DEFESA && armaduraVestida(actor)?.system?.tipo === "pesada";
	const daDefesa = key === DEFESA && !pesada ? actor.system.attributes?.defesa?.atributo : null;
	const perder = (id, entrada, vencedor, valorVencedor) => {
		for (const change of entrada.alteracoes) bloqueadas.add(change);
		porEfeito.delete(id);
		relatorio.push({
			effectId: entrada.effect?.id ?? null,
			itemId: itemDoEfeito(entrada.effect),
			effectName: entrada.effect?.name ?? entrada.item?.name,
			key,
			fonte: entrada.fonte,
			valor: entrada.valor,
			vencedor,
			valorVencedor
		});
	};
	for (const [atributo, lista] of porAtributo) {
		const nome = NOMES_DE_ATRIBUTO[atributo] ?? atributo;
		if (atributo === daDefesa) {
			for (const [id, e] of lista) perder(id, e, `${nome} já entra na Defesa (mesmo atributo não acumula, JdA p. 226)`, 0);
			continue;
		}
		if (lista.length < 2) continue;
		const [, vencedor] = lista.reduce((a, b) => (b[1].valor > a[1].valor ? b : a));
		for (const [id, e] of lista) {
			if (e !== vencedor) perder(id, e, `${vencedor.effect?.name} (mesmo atributo não acumula, JdA p. 226)`, vencedor.valor);
		}
	}
}

/** Efeitos transferidos de itens aparecem na linha do item na ficha, não na lista de efeitos. */
function itemDoEfeito(effect) {
	return effect?.parent?.documentName === "Item" ? effect.parent.id : null;
}

/** Põe a Defesa do campo "armadura" de cada acessório equipado na disputa de "outro item" da Defesa. */
function incluirDefesaDosItens(actor, porChave) {
	if (!porChave.has(DEFESA)) porChave.set(DEFESA, new Map());
	const porEfeito = porChave.get(DEFESA);
	for (const item of acessoriosEquipados(actor)) {
		const nativo = defesaDoItem(item);
		if (nativo <= 0) continue;
		porEfeito.set(`nativo:${item.id}`, {
			effect: null,
			nativo: true,
			item,
			valor: nativo,
			alteracoes: [],
			fonte: "item",
			chave: item.name.toLowerCase()
		});
	}
	// Com braceletes, a Defesa da própria armadura entra na disputa com eles (vale o maior).
	const armadura = acessoriosEquipados(actor).some(ehBracelete) ? armaduraDoCorpo(actor) : null;
	if (armadura && defesaDoItem(armadura) > 0) {
		porEfeito.set(`nativo:${armadura.id}`, { effect: null, nativo: true, item: armadura, valor: defesaDoItem(armadura), alteracoes: [], fonte: "item", chave: armadura.name.toLowerCase() });
	}
}

/** Tipos de aprimoramento de item que somam ao bônus do item; encantos ("enchantment") não acumulam entre si. */
const MELHORIAS = new Set(["improvement", "material", "innovation", "curse"]);

/**
 * Junta, para uma característica, tudo que vem do mesmo item num bônus só (JdA p. 334):
 * - Defesa do campo do item e efeito próprio do item são a mesma coisa (Anel da Proteção: +2 e +2):
 *   vale o maior;
 * - melhorias e materiais somam;
 * - encantos não acumulam entre si: vale o maior (Defensor +2 e Guardião +4 = +4), contando o
 *   encanto de magia lançado na armadura (Vestimenta da Fé);
 * - melhorias e encanto somam ("some os bônus fornecidos por melhorias e encantos").
 * O total do item é que disputa com os outros itens.
 */
function agregarPorItem(key, porEfeito, bloqueadas, relatorio, nativosSuprimidos) {
	const porItem = new Map();
	for (const [id, entrada] of porEfeito) {
		const doItem = entrada.fonte === "item" && entrada.effect?.parent?.documentName === "Item" ? entrada.effect.parent : null;
		const item = entrada.nativo ? entrada.item : (entrada.alvo ?? doItem);
		if (!item) continue;
		if (!porItem.has(item)) porItem.set(item, []);
		porItem.get(item).push([id, entrada]);
	}

	const descartar = (item, entrada, vencedor, valorVencedor) => {
		for (const change of entrada.alteracoes) bloqueadas.add(change);
		if (entrada.nativo) nativosSuprimidos.add(item.id);
		relatorio.push({
			effectId: entrada.effect?.id ?? null,
			itemId: entrada.alvo ? null : item.id,
			effectName: entrada.effect?.name ?? `${item.name} (Defesa do item)`,
			key,
			fonte: "item",
			valor: entrada.valor,
			vencedor,
			valorVencedor
		});
	};

	for (const [item, lista] of porItem) {
		if (lista.length < 2) continue;
		const entradas = lista.map(([, e]) => e);
		const tipo = (e) => (e.alvo ? "enchantment" : (e.effect?.system?.upgrade?.type ?? null));
		const nativo = entradas.find((e) => e.nativo);
		const base = entradas.filter((e) => !e.nativo && !tipo(e));
		const melhorias = entradas.filter((e) => MELHORIAS.has(tipo(e)));
		const encantos = entradas.filter((e) => tipo(e) === "enchantment");
		const mantidos = [...melhorias];
		let nativoMantido = false;

		let valorBase = base.reduce((s, e) => s + e.valor, 0);
		if (nativo && base.length && valorBase >= nativo.valor) {
			descartar(item, nativo, `${item.name} (efeito)`, valorBase);
			mantidos.push(...base);
		} else if (nativo) {
			for (const e of base) descartar(item, e, `${item.name} (Defesa do item)`, nativo.valor);
			valorBase = nativo.valor;
			nativoMantido = true;
		} else mantidos.push(...base);

		let valorEncanto = 0;
		if (encantos.length) {
			const melhor = encantos.reduce((a, b) => (Math.abs(b.valor) > Math.abs(a.valor) ? b : a));
			for (const e of encantos) if (e !== melhor) descartar(item, e, `${melhor.effect.name} (encantos não acumulam, JdA p. 334)`, melhor.valor);
			valorEncanto = melhor.valor;
			mantidos.push(melhor);
		}

		const valorMelhorias = melhorias.reduce((s, e) => s + e.valor, 0);
		for (const [id] of lista) porEfeito.delete(id);
		porEfeito.set(`item:${item.id}`, {
			effect: null,
			item,
			nativoMantido,
			valor: valorBase + valorMelhorias + valorEncanto,
			alteracoes: mantidos.flatMap((e) => e.alteracoes),
			efeitoDe: new Map(mantidos.flatMap((e) => e.alteracoes.map((c) => [c, e.effect]))),
			fonte: "item",
			chave: item.name.toLowerCase()
		});
	}
}

export { expandir };
