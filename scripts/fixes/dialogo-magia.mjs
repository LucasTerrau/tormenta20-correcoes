import { aplicarAjustes, perdedoresDeUso } from "../acumulo/uso.mjs";
import {
	aumentosPorNivel,
	calcularCusto,
	circuloExigido,
	circuloMaximo,
	conjurador,
	limiteDeAumento,
	limiteDeHabilidade,
	normalizar
} from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regras do diálogo de uso (magias, poderes, armas, perícias, atributos) que o sistema não aplica:
 * - limite de PM por uso = nível na classe da magia (JdA p. 224 e 171);
 * - aprimoramentos com "Requer Nº círculo" exigem lançar magias desse círculo com a classe da magia (p. 171);
 * - aumentos "limitados pelo círculo máximo de magia que você pode lançar" param no teto;
 * - pergaminho: aprimoramentos só para quem conhece a magia, com as mesmas regras dela (p. 341);
 * - Truque não pode ser usado junto com outros aprimoramentos (p. 171);
 * - bônus de uso de itens, magias e parceiros não acumulam entre si, nem os da mesma habilidade (p. 226).
 * O total mostrado no diálogo passa a ser o custo que será cobrado (o do sistema somava errado).
 */
const regras = { limite: false, circulo: false, truque: false, bonusUso: false };
let instalado = false;

function instalar() {
	if (instalado) return;
	instalado = true;
	Hooks.on("renderAbilityUseDialog", (app, html) => {
		const root = html instanceof HTMLElement ? html : html[0];
		if (!root) return;
		const janela = root.closest(".app") ?? root;
		prepararLinhas(app, root);
		// O sistema só recalcula no clique e nos botões +/-: digitar a quantidade deixava total e limite errados.
		for (const input of root.querySelectorAll("input[name$='.aplica']")) {
			input.addEventListener("change", () => app._onInputChange(app.element));
		}
		// Bloqueia o envio se, por algum caminho, o estado ficar inválido.
		for (const botao of janela.querySelectorAll("button[data-button]")) {
			botao.addEventListener(
				"click",
				(event) => {
					const estado = atualizar(app, root);
					// Bônus que não acumulam saem antes de o sistema ler o formulário.
					for (const linha of estado.perdedores) {
						if (linha.input.type === "checkbox") linha.input.checked = false;
						else linha.input.value = 0;
					}
					if (!estado.erro) {
						// Os que só somam a diferença ficam reduzidos até a rolagem terminar.
						if (estado.ajustes.length) desfazerDepois.push(aplicarAjustes(estado.ajustes));
						return;
					}
					event.preventDefault();
					event.stopImmediatePropagation();
					ui.notifications.warn(estado.erro);
				},
				{ capture: true }
			);
		}
		atualizar(app, root);
	});
	// O total do sistema ignora custo 0, Truque, redução à metade e o modificador de custo:
	// substitui o cálculo (não chama o original).
	wrap("tormenta20.applications.AbilityUseDialog.prototype._onInputChange", function (wrapped, html) {
		const root = html?.[0] ?? html ?? this.element?.[0];
		if (root) atualizar(this, root);
	});
}

export function linhas(app, root) {
	const efeitos = app.item.applicableOnUseEffects ?? [];
	return [...root.querySelectorAll(".aprimoramentos-list li.item")]
		.map((li) => {
			const input = li.querySelector("input[name$='.aplica']");
			const effect = input && efeitos.find((e) => e.id === input.name.split(".")[1]);
			return effect ? { li, input, effect } : null;
		})
		.filter(Boolean);
}

export function quantidade(input) {
	if (input.type === "checkbox") return input.checked ? 1 : 0;
	return Number(input.value) || 0;
}

export function bloquear(linha, motivo) {
	const { li, input } = linha;
	if (input.type === "checkbox") input.checked = false;
	else input.value = 0;
	input.disabled = true;
	for (const botao of li.querySelectorAll(".numCtrl")) botao.disabled = true;
	li.style.opacity = "0.55";
	li.dataset.tooltip = motivo;
}

export function liberar(linha) {
	const { li, input } = linha;
	if (li.dataset.t20cFixo) return;
	input.disabled = false;
	for (const botao of li.querySelectorAll(".numCtrl")) botao.disabled = false;
	li.style.opacity = "";
	delete li.dataset.tooltip;
}

/**
 * Magia por trás do uso: a própria magia ou, num pergaminho, a magia de mesmo nome que o personagem
 * conhece (null se não conhece). undefined para o resto.
 */
function magiaDoUso(item) {
	if (item.type === "magia") return item;
	if (item.type !== "consumivel" || item.system.tipo !== "scroll") return undefined;
	const nome = normalizar(item.name);
	return item.actor.items.find((i) => i.type === "magia" && nome.includes(normalizar(i.name))) ?? null;
}

/** Bloqueios fixos (círculo, pergaminho) e a linha de informação do limite. */
function prepararLinhas(app, root) {
	const item = app.item;
	if (!item || item.actor?.type !== "character") return;
	const magia = magiaDoUso(item);
	if (magia === undefined) {
		prepararHabilidade(app, root);
		return;
	}
	if (magia === null) {
		// "Caso conheça a magia, pode aplicar aprimoramentos nela" (JdA p. 341).
		if (!regras.circulo) return;
		for (const linha of linhas(app, root)) {
			if (linha.effect.parent?.id !== item.id) continue;
			bloquear(linha, "Só quem conhece a magia pode aplicar aprimoramentos ao ativar um pergaminho (JdA p. 341).");
			linha.li.dataset.t20cFixo = "1";
		}
		return;
	}
	const info = conjurador(item.actor, magia);
	app._t20cConjurador = info;
	if (!regras.circulo || info.circulo === null) return;
	const maior = circuloMaximo(item.actor, magia);
	for (const linha of linhas(app, root)) {
		if (linha.effect.parent?.id !== item.id) continue; // só aprimoramentos da própria magia
		const exigido = circuloExigido(linha.effect);
		if (exigido > info.circulo) {
			const fonte = info.classe ? `com ${info.classe} você lança até o ${info.circulo}º círculo` : "magias aprendidas fora de uma classe não cumprem pré-requisitos de círculo";
			bloquear(linha, `Requer ${exigido}º círculo (${fonte}; JdA p. 171).`);
			linha.li.dataset.t20cFixo = "1";
			continue;
		}
		const teto = limiteDeAumento(linha.effect, item, maior);
		if (!teto) continue;
		const conta = `${teto.base ? `base ${teto.base} + ` : ""}aumentos de ${teto.passo} até ${teto.teto}, pelo ${maior}º círculo`;
		if (teto.maximo === 0) {
			bloquear(linha, `Já está no máximo para quem lança até o ${maior}º círculo (${conta}).`);
			linha.li.dataset.t20cFixo = "1";
			continue;
		}
		linha.li.dataset.t20cMaximo = String(teto.maximo);
		if (linha.input.type === "number") linha.input.max = teto.maximo;
		const aviso = document.createElement("span");
		aviso.className = "t20c-maximo";
		aviso.textContent = ` (máx. ${teto.maximo})`;
		aviso.style.cssText = "font-size: 0.85em; opacity: 0.8;";
		aviso.dataset.tooltip = `Limitado pelo círculo máximo de magia que você lança: ${conta}.`;
		(linha.li.querySelector(".item-name") ?? linha.li).append(aviso);
	}
}

/**
 * Poderes e outras habilidades: limite de PM por uso (nível na classe do poder ou de personagem) e
 * "a cada N níveis, pode gastar +1 PM" como teto comum aos aumentos do próprio poder.
 */
function prepararHabilidade(app, root) {
	const item = app.item;
	app._t20cConjurador = limiteDeHabilidade(item.actor, item);
	app._t20cOrcamentos = [];
	app._t20cPoderes = [];
	if (!regras.limite) return;
	// Agrupa as linhas pelo poder dono: o próprio poder usado, ou poderes que entram num ataque
	// (Golpe Divino, Ataque Especial). Cada poder tem o seu limite e o seu "a cada N níveis".
	const grupos = new Map();
	for (const linha of linhas(app, root)) {
		const dono = linha.effect.parent;
		if (dono?.documentName !== "Item" || dono.type !== "poder") continue;
		if (!grupos.has(dono)) grupos.set(dono, []);
		grupos.get(dono).push(linha);
	}
	for (const [dono, lista] of grupos) {
		const info = limiteDeHabilidade(item.actor, dono);
		if (dono.id !== item.id) app._t20cPoderes.push({ dono, info, nomes: new Set(lista.map((l) => l.input.name)) });
		const regra = aumentosPorNivel(dono, info.nivel);
		const aumentos = lista.filter((l) => l.effect.system.abilityUse.aumenta);
		if (!regra || !aumentos.length) continue;
		const nivel = `${info.classe ? `${info.classe} ${info.nivel}` : `nível ${info.nivel}`}`;
		const conta = `${dono.name}: a cada ${regra.passo} níveis${regra.depois ? " após o 1º" : ""}; ${nivel}`;
		app._t20cOrcamentos.push({ maximo: regra.maximo, nomes: new Set(aumentos.map((l) => l.input.name)) });
		for (const linha of aumentos) {
			if (regra.maximo === 0) {
				bloquear(linha, `Ainda não dá para gastar PM extra (${conta}).`);
				linha.li.dataset.t20cFixo = "1";
				continue;
			}
			const aviso = document.createElement("span");
			aviso.className = "t20c-maximo";
			aviso.textContent = ` (máx. ${regra.maximo}${aumentos.length > 1 ? " no total" : ""})`;
			aviso.style.cssText = "font-size: 0.85em; opacity: 0.8;";
			aviso.dataset.tooltip = `Aumentos permitidos pelo nível: ${regra.maximo} (${conta}).`;
			(linha.li.querySelector(".item-name") ?? linha.li).append(aviso);
		}
	}
}

/**
 * Marca os bônus de uso escolhidos que não acumulam (com outros de uso ou com bônus fixos da mesma fonte).
 * @returns {{perdedores: object[], ajustes: {change, valor}[]}} linhas que saem e reduções dos que ficam
 */
function marcarBonusQueNaoAcumulam(app, todas) {
	for (const linha of todas) linha.li.querySelector(".t20c-uso")?.remove();
	const vazio = { perdedores: [], ajustes: [] };
	const actor = app.item?.actor;
	if (!regras.bonusUso || !actor) return vazio;
	const escolhidos = todas.map((l) => ({ effect: l.effect, qty: quantidade(l.input) }));
	const motivos = perdedoresDeUso(app.item, escolhidos, actor.getRollData(), actor);
	const resultado = vazio;
	for (const linha of todas) {
		const motivo = motivos.get(linha.effect.id);
		if (!motivo) continue;
		const aviso = document.createElement("span");
		aviso.className = "t20c-uso";
		aviso.textContent = motivo.total ? " (não acumula)" : " (soma só a diferença)";
		aviso.style.cssText = "color: var(--color-level-warning, #d98c00); font-size: 0.85em;";
		aviso.dataset.tooltip = `${motivo.total ? "Será ignorado: " : ""}${motivo.texto} (JdA p. 226).`;
		(linha.li.querySelector(".item-name") ?? linha.li).append(aviso);
		if (motivo.total) resultado.perdedores.push(linha);
		else resultado.ajustes.push(...motivo.ajustes);
	}
	return resultado;
}

/** Recalcula total, limite, Truque e bônus que não acumulam. @returns {{erro: string|null, perdedores: object[]}} */
function atualizar(app, root) {
	const item = app.item;
	const todas = linhas(app, root);

	for (const linha of todas) {
		const maximo = linha.li.dataset.t20cMaximo;
		if (maximo !== undefined && quantidade(linha.input) > Number(maximo)) linha.input.value = maximo;
	}
	// Teto comum aos aumentos de um poder ("a cada quatro níveis…"), distribuído na ordem da lista.
	for (const orcamento of app._t20cOrcamentos ?? []) {
		let resto = orcamento.maximo;
		for (const linha of todas) {
			if (!orcamento.nomes.has(linha.input.name)) continue;
			const q = Math.min(quantidade(linha.input), resto);
			if (q !== quantidade(linha.input)) {
				if (linha.input.type === "checkbox") linha.input.checked = q > 0;
				else linha.input.value = q;
			}
			resto -= q;
		}
	}

	if (regras.truque && item?.type === "magia") {
		const truques = todas.filter((l) => l.effect.system.isCantrip);
		const truqueMarcado = truques.some((l) => quantidade(l.input) > 0);
		const outroMarcado = todas.some((l) => !l.effect.system.isCantrip && quantidade(l.input) > 0);
		for (const linha of todas) {
			const ehTruque = linha.effect.system.isCantrip;
			if (truqueMarcado && !ehTruque) bloquear(linha, "Truques não podem ser usados com outros aprimoramentos (JdA p. 171).");
			else if (!truqueMarcado && outroMarcado && ehTruque) bloquear(linha, "Truques não podem ser usados com outros aprimoramentos (JdA p. 171).");
			else liberar(linha);
		}
	}

	const { perdedores, ajustes } = marcarBonusQueNaoAcumulam(app, todas);
	const escolhas = todas.map((l) => ({ effect: l.effect, qty: perdedores.includes(l) ? 0 : quantidade(l.input) }));
	const custo = calcularCusto(item, escolhas);
	const campo = root.querySelector(".total-cost .cost");
	if (campo) campo.value = custo.total;

	let erro = null;
	const info = app._t20cConjurador;
	// Fora de magias, o aviso só aparece quando há PM em jogo (um ataque comum não precisa dele).
	const temPM = item?.type === "magia" || calcularCusto(item, []).total > 0 || todas.some((l) => Number(l.effect.system.abilityUse.custo) > 0);
	if (regras.limite && info && temPM && item.actor?.type === "character") {
		// PM gastos em poderes que entram nesta rolagem (Golpe Divino num ataque) contam no limite do
		// poder, pela classe dele; o resto conta no limite do item usado.
		const dePoder = new Set((app._t20cPoderes ?? []).flatMap((p) => [...p.nomes]));
		const custoDoItem = calcularCusto(item, escolhas.filter((e, i) => !dePoder.has(todas[i].input.name))).total;
		const errosDePoder = [];
		for (const { dono, info: limiteDoPoder, nomes } of app._t20cPoderes ?? []) {
			let gasto = 0;
			let minimoDoPoder = 0; // o uso básico, sem aumentos: sempre permitido (JdA p. 224)
			todas.forEach((l, i) => {
				if (!nomes.has(l.input.name)) return;
				const pm = (Number(l.effect.system.abilityUse.custo) || 0) * escolhas[i].qty;
				gasto += pm;
				if (!l.effect.system.abilityUse.aumenta) minimoDoPoder += pm;
			});
			if (gasto <= Math.max(limiteDoPoder.limite, minimoDoPoder)) continue;
			const nivelDoPoder = limiteDoPoder.classe ? `${limiteDoPoder.classe} ${limiteDoPoder.nivel}` : `nível ${limiteDoPoder.nivel}`;
			errosDePoder.push(`${dono.name}: ${gasto} PM passa do limite de ${limiteDoPoder.limite} PM (${nivelDoPoder}; JdA p. 224).`);
		}
		const minimo = calcularCusto(item, []).total;
		// Conjuração Magibélica: Potencializar (Distinções): marcada, o limite de PM desta magia aumenta em +2, +1 a cada
		// dois outros poderes da distinção.
		let potencializar = 0;
		todas.forEach((l, i) => {
			if (escolhas[i].qty > 0 && l.effect.parent?.name === "Conjuração Magibélica: Potencializar") {
				const outros = (item.actor?.itemTypes?.poder ?? []).filter((p) => p.system?.subtipo === l.effect.parent.system?.subtipo && p.id !== l.effect.parent.id).length;
				potencializar = 2 + Math.floor(outros / 2);
			}
		});
		const info = potencializar ? { ...app._t20cConjurador, limite: app._t20cConjurador.limite + potencializar, bonus: [...(app._t20cConjurador.bonus ?? []), { rotulo: "Potencializar", valor: potencializar }] } : app._t20cConjurador;
		const permitido = Math.max(info.limite, minimo);
		const extras = (info.bonus ?? []).map((b) => ` ${b.valor > 0 ? "+" : ""}${b.valor} ${b.rotulo}`).join(",");
		const fonte = `${info.classe ? `${info.classe} ${info.nivel}` : `nível ${info.nivel}`}${extras}`;
		let aviso = root.querySelector(".t20c-limite");
		if (!aviso && campo) {
			aviso = document.createElement("p");
			aviso.className = "t20c-limite hint";
			campo.closest(".form-group")?.after(aviso);
		}
		// "Você sempre pode usar a habilidade em seu custo mínimo" (JdA p. 224).
		const oQue = item.type === "magia" ? "a magia" : "a habilidade";
		const nota = minimo > info.limite ? ` Sem aprimoramentos, ${oQue} (${minimo} PM) sempre pode ser usada.` : "";
		if (custoDoItem > permitido || errosDePoder.length) {
			const doItem = custoDoItem > permitido ? `Custo de ${custoDoItem} PM passa do limite de ${info.limite} PM (${fonte}; JdA p. 224).${nota}` : "";
			erro = [doItem, ...errosDePoder].filter(Boolean).join(" ");
			if (aviso) {
				aviso.textContent = erro;
				aviso.style.color = "var(--color-level-error, #c00)";
			}
		} else if (aviso) {
			const poderes = (app._t20cPoderes ?? []).map(({ dono, info: l }) => ` ${dono.name}: ${l.limite} (${l.classe ? `${l.classe} ${l.nivel}` : `nível ${l.nivel}`}).`);
			aviso.textContent = `Limite de PM por uso: ${info.limite} (${fonte}).${nota}${poderes.join("")}`;
			aviso.style.color = "";
		}
		const janela = root.closest(".app") ?? root;
		for (const botao of janela.querySelectorAll("button[data-button]")) botao.disabled = Boolean(erro);
	}
	return { erro, perdedores, ajustes };
}

/** Efeitos de uso que o sistema oferece numa rolagem de perícia ("skill") ou atributo ("ability"). */
function aplicaveisPorTipo(actor, tipo, nome) {
	const lista = [];
	for (const [path, doc] of actor.traverseEmbeddedDocuments()) {
		if (doc.documentName !== "ActiveEffect" || !doc.system?.onuse) continue;
		if (doc.isTemporary && path !== "effects") continue;
		const { types, names } = doc.system.abilityUse;
		if (!types.has(tipo)) continue;
		if (names.size && !names.has(nome)) continue;
		lista.push(doc);
	}
	return lista;
}

/** Reduções feitas no clique do diálogo; desfeitas quando a rolagem termina. */
const desfazerDepois = [];

/**
 * Sem diálogo (Shift), o sistema aplica todos os efeitos de uso automáticos. Durante a parte
 * síncrona da rolagem, desmarca "automático" dos que não acumulam e restaura logo depois. Os que só
 * somam a diferença (bônus fixo da mesma fonte menor) ficam reduzidos até a rolagem terminar, junto
 * com os ajustes feitos no diálogo.
 */
function semPerdedoresAutomaticos(actor, alvo, lista, chamar) {
	const trocados = [];
	let desfazer = null;
	try {
		const automaticos = lista.filter((e) => e.system?.onuse && e.system.abilityUse.automatic).map((effect) => ({ effect, qty: 1 }));
		if (automaticos.length) {
			const ajustes = [];
			for (const [id, motivo] of perdedoresDeUso(alvo, automaticos, actor.getRollData(), actor)) {
				const effect = lista.find((e) => e.id === id);
				if (!effect) continue;
				if (!motivo.total) {
					ajustes.push(...motivo.ajustes);
					continue;
				}
				effect.system.abilityUse.automatic = false;
				trocados.push(effect);
			}
			if (ajustes.length) desfazer = aplicarAjustes(ajustes);
		}
	} catch (error) {
		warn("Falha ao conferir acúmulo de bônus automáticos; rolagem segue como no sistema.", error);
	}
	let resultado;
	try {
		resultado = chamar();
	} finally {
		for (const effect of trocados) effect.system.abilityUse.automatic = true;
	}
	return Promise.resolve(resultado).finally(() => {
		desfazer?.();
		while (desfazerDepois.length) desfazerDepois.pop()();
	});
}

export const limitePM = {
	id: "limitePM",
	name: "Limite de PM por uso (magias e poderes)",
	hint: "Personagens não podem gastar mais PM por uso que o nível na classe que fornece a magia ou o poder; raça, origem, poderes gerais e itens usam o nível de personagem (JdA p. 224). \"A cada quatro níveis, pode gastar +1 PM…\" limita os aumentos. Magia Ilimitada, Cajado Arcano, Orbe Cristalina, Contas de Oração, Presente dos Deuses e as melhorias Canalizador/Potencializador somam no limite de magias; outros aumentos (temporários) podem ser um efeito com a chave flags.tormenta20-correcoes.limitePM.",
	init() {
		regras.limite = true;
		instalar();
	}
};

export const circuloMinimo = {
	id: "circuloMinimo",
	name: "Magias: pré-requisito e teto de círculo dos aprimoramentos",
	hint: "Aprimoramentos com \"Requer Nº círculo\" ficam bloqueados se o personagem ainda não lança magias desse círculo com a classe da magia (JdA p. 171). Aumentos com \"bônus máximo limitado pelo círculo máximo de magia que você pode lançar\" (Bênção, Arma Mágica, Oração…) param no teto.",
	init() {
		regras.circulo = true;
		instalar();
	}
};

export const bonusDeUso = {
	id: "bonusDeUso",
	name: "Bônus na hora da rolagem também seguem o acúmulo",
	hint: "Bônus de efeitos de uso (ex.: resistência a magia de um item, +1 de Arma Mágica) seguem a regra de acúmulo: de itens, magias e parceiros vale só o maior; da mesma habilidade, só um (JdA p. 226). Em ataque e dano, também disputam com os bônus fixos da mesma fonte (duas magias) e, se forem bônus de encanto (Arma Mágica, óleos), com os encantos da arma (Formidável). No diálogo, o que não acumula aparece marcado; sem diálogo, ele não entra ou soma só a diferença.",
	init() {
		regras.bonusUso = true;
		instalar();
		wrap("CONFIG.Item.documentClass.prototype.roll", function (wrapped, ...args) {
			if (!this.actor || !this.isEmbedded) return wrapped(...args);
			return semPerdedoresAutomaticos(this.actor, this, this._allApplicableOnUseEffects(), () => wrapped(...args));
		});
		wrap("CONFIG.Actor.documentClass.prototype.rollPericia", function (wrapped, key, ...args) {
			const nome = this.system.pericias?.[key]?.label;
			return semPerdedoresAutomaticos(this, { id: key, type: "pericia" }, aplicaveisPorTipo(this, "skill", nome), () => wrapped(key, ...args));
		});
		wrap("CONFIG.Actor.documentClass.prototype.rollAtributo", function (wrapped, key, ...args) {
			const nome = this.system.atributos?.[key]?.name;
			return semPerdedoresAutomaticos(this, { id: key, type: "atributo" }, aplicaveisPorTipo(this, "ability", nome), () => wrapped(key, ...args));
		});
	}
};

export const truqueExclusivo = {
	id: "truqueExclusivo",
	name: "Magias: Truque não combina com outros aprimoramentos",
	hint: "Marcar o Truque bloqueia os outros aprimoramentos da magia, e vice-versa (JdA p. 171). Sem isso, o Truque zerava o custo de tudo que estivesse marcado.",
	init() {
		regras.truque = true;
		instalar();
	}
};
