import { camposDaPericia } from "./campos.mjs";
import { FONTES_EXCLUSIVAS, fonteDoEfeito } from "./fontes.mjs";
import { atributoDoValor, estimar } from "./motor.mjs";

/**
 * Regra de acúmulo (JdA p. 226) para bônus que só entram na hora da rolagem: efeitos de uso de
 * outros itens/poderes/magias ou do próprio personagem (ex.: resistência a magia +5 do Abascanto,
 * +1 em ataques de Arma Mágica). Aprimoramentos do próprio item usado não disputam: fazem parte dele.
 * O bônus de uso também disputa com os bônus fixos da mesma fonte que já estão na ficha e entram na
 * rolagem (ataque, dano, perícias, resistências e atributos; duas magias: vale a maior) e, se for
 * bônus de encanto (Arma Mágica), com os encantos da própria arma (Formidável).
 */

/** "roll"/"ataque" mexem no teste; "dano" (e "dano:fogo") no dano. */
function caracteristica(key) {
	const base = String(key ?? "").split(/[:&]/)[0];
	if (base === "roll" || base === "ataque") return "teste";
	if (base === "dano") return "dano";
	return null;
}

const ehDado = (value) => /\d*d\d+/i.test(String(value ?? ""));

function chaveDaFonte(origem) {
	return FONTES_EXCLUSIVAS.has(origem.fonte) ? origem.fonte : `${origem.fonte}:${origem.chave}`;
}

/** Atributo que o efeito soma numa característica (todas as alterações dela somam o mesmo), ou null. */
function atributoNaCaracteristica(changes, c, campos = null) {
	const relevantes = changes.filter((ch) => (campos ? campos.includes(ch.key) : caracteristica(ch.key) === c));
	const atributos = new Set(relevantes.map((ch) => atributoDoValor(ch.value)));
	return relevantes.length && atributos.size === 1 ? [...atributos][0] : null;
}

/** @returns {Record<string, number>} bônus por característica, já multiplicado pela quantidade */
export function bonusDeRolagem(effect, qty, data) {
	const bonus = {};
	for (const change of effect.system?.changes ?? []) {
		const c = caracteristica(change.key);
		if (!c || !["add", "custom"].includes(change.type)) continue;
		const valor = estimar(change.value, data);
		if (!valor) continue;
		bonus[c] = (bonus[c] ?? 0) + valor * qty;
	}
	return bonus;
}

/** Perícia do ataque da arma ("luta", "pont"…), como o sistema decide corpo a corpo ou distância. */
function periciaDoAtaque(item) {
	const ataque = (item.system?.rolls ?? []).find((r) => r.type === "ataque") ?? item.system?.rolls?.[0];
	return ataque?.parts?.[1]?.[0] ?? "luta";
}

/**
 * Campos de bônus fixos da ficha que o sistema soma nesta rolagem (item.mjs rollAttack/rollDamage,
 * CreatureData#prepareSkill, ActorT20#rollAtributo).
 */
function camposFixos(item, actor) {
	const m = "system.modificadores";
	if (item?.type === "arma") {
		const pericia = periciaDoAtaque(item);
		const alcance = pericia === "pont" ? "ad" : "cac";
		return {
			teste: [`${m}.ataque.geral`, `${m}.ataque.${alcance}`, ...camposDaPericia(actor, pericia)],
			dano: [`${m}.dano.geral`, `${m}.dano.${alcance}`]
		};
	}
	if (item?.type === "magia") return { dano: [`${m}.dano.geral`, `${m}.dano.mag`] };
	if (item?.type === "pericia") return { teste: camposDaPericia(actor, item.id) };
	if (item?.type === "atributo") {
		const grupo = ["for", "des", "con"].includes(item.id) ? "fisicos" : "mentais";
		return { teste: [`${m}.atributos.geral`, `${m}.atributos.${grupo}`, `${m}.atributos.${item.id}`] };
	}
	return {};
}

/** Maior bônus fixo (e pior penalidade) de cada fonte nesta rolagem. @returns {Map<string, object>} "fonte|c|sinal" -> {valor, nome} */
function bonusFixos(actor, item, data) {
	const campos = camposFixos(item, actor);
	const resultado = new Map();
	if (!actor?.allApplicableEffects || !Object.keys(campos).length) return resultado;
	for (const effect of actor.allApplicableEffects()) {
		if (!effect.active || effect.system?.onuse) continue;
		const origem = fonteDoEfeito(effect);
		if (!origem) continue;
		for (const [c, lista] of Object.entries(campos)) {
			let valor = 0;
			for (const change of effect.system.changes ?? []) {
				if (lista.includes(change.key) && change.type === "add") valor += estimar(change.value, data) ?? 0;
			}
			if (!valor) continue;
			const ids = [`${chaveDaFonte(origem)}|${c}|${valor > 0 ? "+" : "-"}`];
			const atributo = atributoNaCaracteristica(effect.system.changes ?? [], c, lista);
			if (atributo && valor > 0) ids.push(`atributo:${atributo}|${c}|+`);
			for (const id of ids) {
				const atual = resultado.get(id);
				if (!atual || Math.abs(valor) > Math.abs(atual.valor)) resultado.set(id, { valor, nome: effect.name });
			}
		}
	}
	return resultado;
}

/**
 * Entre os efeitos de uso escolhidos para uma rolagem, quais não acumulam.
 * @param {{id: string, type?: string}} item  item (ou perícia/atributo) sendo rolado
 * @param {{effect, qty}[]} escolhidos
 * @param {object} data                       dados de rolagem do ator
 * @param {Actor} [actor]                     para comparar com os bônus fixos da ficha
 * @returns {Map<string, {total: boolean, vencedor: string, caracteristica: string, ajustes: {change, valor}[], texto: string}>}
 *          id do efeito -> o que muda: `total` = sai da rolagem; senão, `ajustes` reduzem só a parte que não acumula.
 */
export function perdedoresDeUso(item, escolhidos, data, actor = item?.actor) {
	// Efeitos do mesmo item formam um bloco: o Golpe Divino e o aumento dele (ou as opções do Ataque
	// Especial) são um bônus só e não disputam entre si.
	const blocos = new Map();
	for (const { effect, qty } of escolhidos) {
		if (qty <= 0 || effect.parent?.id === item?.id) continue;
		const origem = fonteDoEfeito(effect);
		if (!origem) continue;
		const dono = effect.parent?.documentName === "Item" ? effect.parent : effect;
		if (!blocos.has(dono)) blocos.set(dono, { nome: dono.name, origem, membros: [] });
		blocos.get(dono).membros.push({ effect, qty });
	}
	const grupos = new Map();
	for (const bloco of blocos.values()) {
		const valores = {};
		for (const { effect, qty } of bloco.membros) {
			for (const [c, v] of Object.entries(bonusDeRolagem(effect, qty, data))) valores[c] = (valores[c] ?? 0) + v;
		}
		bloco.changes = bloco.membros.flatMap((m) => m.effect.system.changes);
		for (const [c, valor] of Object.entries(valores)) {
			if (!valor) continue;
			// Também disputa com quem soma o mesmo atributo na mesma rolagem, de qualquer fonte (p. 226).
			const atributo = valor > 0 ? atributoNaCaracteristica(bloco.changes, c) : null;
			const ids = [`${chaveDaFonte(bloco.origem)}|${c}|${valor > 0 ? "+" : "-"}`, ...(atributo ? [`atributo:${atributo}|${c}|+`] : [])];
			for (const id of ids) {
				if (!grupos.has(id)) grupos.set(id, []);
				grupos.get(id).push({ bloco, valor, c });
			}
		}
	}

	// Por bloco e característica: quanto ainda soma (0 = nada) e contra quem perdeu.
	const resto = new Map();
	const marcar = (entrada, valor, vencedor) => {
		if (!resto.has(entrada.bloco)) resto.set(entrada.bloco, {});
		const cs = resto.get(entrada.bloco);
		// Perdendo em mais de um grupo (fonte e atributo), fica o que soma menos.
		if (cs[entrada.c] && Math.abs(cs[entrada.c].valor) <= Math.abs(valor)) return;
		cs[entrada.c] = { valor, original: entrada.valor, vencedor };
	};
	const fixos = bonusFixos(actor, item, data);
	// Encantos da própria arma (Formidável, Magnífica…) disputam com bônus de encanto de fora, como
	// Arma Mágica. O sistema modela Magnífica como +2 somado ao Formidável, então eles somam aqui.
	const daArma = {};
	for (const { effect, qty } of escolhidos) {
		if (qty <= 0 || effect.parent?.id !== item?.id || effect.system.upgrade?.type !== "enchantment") continue;
		for (const change of effect.system.changes) {
			const c = caracteristica(change.key);
			if (!c || change.type !== "add" || ehDado(change.value)) continue;
			daArma[c] = (daArma[c] ?? 0) + (estimar(change.value, data) ?? 0) * qty;
		}
	}
	for (const [c, valor] of Object.entries(daArma)) {
		const id = `encanto|${c}|${valor > 0 ? "+" : "-"}`;
		if (valor && Math.abs(valor) > Math.abs(fixos.get(id)?.valor ?? 0)) fixos.set(id, { valor, nome: `encantos de ${item.name}` });
	}
	for (const [id, entradas] of grupos) {
		const vencedor = entradas.reduce((a, b) => (Math.abs(b.valor) > Math.abs(a.valor) ? b : a));
		for (const e of entradas) if (e !== vencedor) marcar(e, 0, vencedor.bloco.nome);
		const fixo = fixos.get(id);
		const comDado = vencedor.bloco.changes.some((ch) => caracteristica(ch.key) === vencedor.c && ehDado(ch.value));
		if (!fixo || comDado) continue;
		if (Math.abs(fixo.valor) >= Math.abs(vencedor.valor)) marcar(vencedor, 0, fixo.nome);
		else marcar(vencedor, vencedor.valor - fixo.valor, fixo.nome);
	}

	const resultado = new Map();
	for (const [bloco, cs] of resto) {
		// O que sobra de cada característica vai para a primeira alteração do bloco; as outras zeram.
		const ajustesPorEfeito = new Map(bloco.membros.map((m) => [m.effect, []]));
		for (const [c, { valor }] of Object.entries(cs)) {
			let falta = valor;
			for (const { effect, qty } of bloco.membros) {
				for (const change of effect.system.changes) {
					if (caracteristica(change.key) !== c) continue;
					// Valor por unidade: a quantidade escolhida multiplica a mudança na rolagem.
					ajustesPorEfeito.get(effect).push({ change, valor: falta / qty });
					falta = 0;
				}
			}
		}
		const partes = Object.entries(cs).map(([car, i]) =>
			i.valor === 0 ? `não acumula com ${i.vencedor} no ${car}` : `no ${car} soma só ${i.valor > 0 ? "+" : ""}${i.valor} (não acumula com ${i.vencedor})`
		);
		const [c, primeiro] = Object.entries(cs)[0];
		for (const { effect, qty } of bloco.membros) {
			const ajustes = ajustesPorEfeito.get(effect);
			if (!ajustes.length) continue;
			// Sai da rolagem se tudo que ele soma ficou zerado; senão, entra reduzido.
			const caracteristicas = Object.keys(bonusDeRolagem(effect, qty, data));
			const total = caracteristicas.length > 0 && caracteristicas.every((car) => cs[car]) && ajustes.every((a) => a.valor === 0);
			resultado.set(effect.id, { total, vencedor: primeiro.vencedor, caracteristica: c, ajustes: total ? [] : ajustes, texto: partes.join("; ") });
		}
	}
	return resultado;
}

/** Aplica os ajustes nos dados preparados dos efeitos. @returns {Function} desfaz */
export function aplicarAjustes(ajustes) {
	const antigos = ajustes.map(({ change }) => [change, change.value]);
	for (const { change, valor } of ajustes) change.value = valor;
	return () => {
		for (const [change, value] of antigos) change.value = value;
	};
}
