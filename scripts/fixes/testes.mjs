import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regras de testes e iniciativa (JdA p. 220–222, 231, 234):
 * - Iniciativa: empate vai para o maior bônus de Iniciativa (o Foundry desempatava pelo id); "o mestre faz
 *   um único teste para todos os inimigos, usando o menor bônus"; o surpreendido não age na 1ª rodada.
 * - Escolher 10 e escolher 20 (p. 222): opções no diálogo do teste de perícia (o diálogo só tinha
 *   "Melhor/Pior de 2d20", que não é regra do JdA).
 * - Testes opostos (p. 220): vence o maior total; no empate, o maior bônus. Botão "Teste oposto" no cartão
 *   do teste de perícia, contra os alvos marcados. Enganação contra Reflexos é Fintar (desprevenido contra
 *   o próximo ataque, até o fim do seu próximo turno); Intimidação contra Vontade é Assustar (abalado pela
 *   cena; vencendo por 10 ou mais, apavorado por 1 rodada e depois abalado).
 * - Manobras (p. 234, Tabela 1-21): ataque corpo a corpo oposto ao Luta do alvo, com o modificador de
 *   tamanho (Minúsculo –5 … Colossal +10) e +2 de armas versáteis. Opção "Manobra" no diálogo do ataque.
 */
const OPCAO_MANOBRA = { id: "t20cManobra00000", name: "Manobra (teste oposto)", descricao: "Agarrar, derrubar, desarmar, empurrar ou quebrar: teste oposto contra o Luta do alvo, com o modificador de tamanho (p. 234)." };
const TAMANHO_MANOBRA = { min: -5, peq: -2, med: 0, gra: 2, eno: 5, col: 10 };
const tamanhoNaManobra = (actor) => TAMANHO_MANOBRA[actor?.system?.tracos?.tamanho] ?? 0;

const OPOSTOS = { enga: "refl", inti: "vont" };
const shift = () => ({ shiftKey: game.settings.get("tormenta20", "UsageConfig") === "default" });
const natural = (roll) => roll?.dice?.find((d) => d.faces === 20)?.total;

/* -------------------------------------------- iniciativa */

const bonusDeIniciativa = (c) => Number(c.actor?.system?.pericias?.inic?.value) || 0;
const ehInimigo = (c) => c.actor?.type === "npc" && !c.hasPlayerOwner && (c.token?.disposition ?? c.actor?.prototypeToken?.disposition) === CONST.TOKEN_DISPOSITIONS.HOSTILE;

async function surpresa(combat, combatant) {
	const actor = combatant?.actor;
	if (combat.round !== 1 || !actor?.statuses?.has("surpreendido") || !game.user.isActiveGM) return;
	await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<p>${actor.name} está surpreendido e não age na primeira rodada.</p>` });
	await combat.nextTurn();
}

async function fimDaSurpresa(combat) {
	if (combat.round < 2 || !game.user.isActiveGM) return;
	// Pelo sistema, para sair junto o "desprevenido" que a condição cria.
	for (const c of combat.combatants) if (c.actor?.statuses?.has("surpreendido")) await c.actor.toggleStatusEffect("surpreendido", { active: false });
}

/* -------------------------------------------- testes opostos */

async function opor(message, pericia, total, bonus) {
	const alvos = [...(game.user.targets ?? [])].filter((t) => t.actor);
	if (!alvos.length) return ui.notifications.warn("Marque o alvo do teste oposto.");
	const contra = OPOSTOS[pericia] ?? pericia;
	const linhas = [];
	for (const alvo of alvos) {
		const teste = await alvo.actor.rollPericia(contra, { event: shift(), message: false });
		if (!teste) continue;
		await teste.toMessage({ speaker: ChatMessage.getSpeaker({ token: alvo.document }), flavor: `Teste oposto: ${CONFIG.T20.pericias[contra]?.label ? game.i18n.localize(CONFIG.T20.pericias[contra].label) : contra}` });
		const bonusAlvo = Number(alvo.actor.system.pericias?.[contra]?.value) || 0;
		const venceu = total > teste.total || (total === teste.total && bonus > bonusAlvo);
		const diferenca = total - teste.total;
		let texto = `${alvo.name}: ${teste.total} — ${venceu ? `vence por ${diferenca}` : "perde"}`;
		if (venceu && game.user.isGM) texto += await consequencia(pericia, alvo.actor, diferenca);
		linhas.push(texto);
	}
	await ChatMessage.create({ speaker: message.speaker, content: `<p><strong>Teste oposto</strong> (${total})</p><ul>${linhas.map((l) => `<li>${l}</li>`).join("")}</ul>` });
}

async function aplicarCondicao(actor, status, duracao) {
	const efeito = await ActiveEffect.implementation.fromStatusEffect(status);
	const dados = efeito.toObject();
	if (duracao) dados.duration = duracao;
	await actor.createEmbeddedDocuments("ActiveEffect", [dados]);
}

async function consequencia(pericia, actor, diferenca) {
	if (pericia === "enga") {
		await aplicarCondicao(actor, "desprevenido", { value: 1, units: "rounds", expiry: "turnEnd" });
		return " (Fintar: desprevenido contra o próximo ataque, até o fim do seu próximo turno)";
	}
	if (pericia === "inti") {
		if (diferenca >= 10) {
			await aplicarCondicao(actor, "apavorado", { value: 1, units: "rounds", expiry: "turnEnd" });
			await aplicarCondicao(actor, "abalado", { expiry: "sceneEnd" });
			return " (Assustar: apavorado por 1 rodada, depois abalado pela cena)";
		}
		await aplicarCondicao(actor, "abalado", { expiry: "sceneEnd" });
		return " (Assustar: abalado pela cena)";
	}
	return "";
}

/* -------------------------------------------- manobras */

function criarOpcaoManobra(item) {
	return new CONFIG.ActiveEffect.documentClass(
		{
			_id: OPCAO_MANOBRA.id,
			name: OPCAO_MANOBRA.name,
			img: "icons/svg/combat.svg",
			description: `<p>${OPCAO_MANOBRA.descricao}</p>`,
			type: "base",
			system: { onuse: true, changes: [], abilityUse: { description: "", automatic: false, aumenta: false, custo: null, names: [], types: ["self"] } }
		},
		{ parent: item }
	);
}

function marcada(resultado, id) {
	const valor = resultado?.aprs?.[id]?.aplica ?? resultado?.[`aprs.${id}.aplica`];
	return valor === true || Number(valor) > 0;
}

/** Resolve a manobra contra cada alvo marcado. @returns {{alvo, venceu, diferenca}[]} */
async function resolverManobra(item) {
	const ataque = Object.values(item.system.rolled ?? {}).find((r) => r?.dice?.[0]?.faces === 20);
	if (!ataque) return [];
	const resultados = [];
	for (const alvo of [...(game.user.targets ?? [])].filter((t) => t.actor && t.actor !== item.actor)) {
		const teste = await alvo.actor.rollPericia("luta", { event: shift(), message: false });
		if (!teste) continue;
		const tamanho = tamanhoNaManobra(alvo.actor);
		const total = teste.total + tamanho;
		const bonusMeu = (Number(item.actor.system.pericias?.luta?.value) || 0) + tamanhoNaManobra(item.actor);
		const bonusAlvo = (Number(alvo.actor.system.pericias?.luta?.value) || 0) + tamanho;
		const venceu = ataque.total > total || (ataque.total === total && bonusMeu > bonusAlvo);
		item.system.rolled[`Manobra: ${alvo.name} (Luta${tamanho ? ` ${tamanho > 0 ? "+" : ""}${tamanho} de tamanho` : ""}) — ${venceu ? `você vence por ${ataque.total - total}` : "o alvo vence"}`] = teste;
		resultados.push({ alvo: alvo.document, venceu, diferenca: ataque.total - total });
	}
	return resultados;
}

export default {
	id: "testes",
	name: "Iniciativa, escolher 10/20, testes opostos e manobras",
	hint: "Empate de iniciativa pelo maior bônus; um teste só para os inimigos (o menor bônus); surpreendido perde a 1ª rodada. Escolher 10/20 no diálogo de perícia. Botão de teste oposto no cartão de perícia (Fintar e Assustar aplicam a condição). Opção Manobra no ataque corpo a corpo, oposta ao Luta do alvo, com tamanho e +2 de arma versátil (JdA p. 220–222, 231, 234).",
	init() {
		wrap("CONFIG.Combat.documentClass.prototype._sortCombatants", function (wrapped, a, b) {
			const ia = Number.isNumeric(a.initiative) ? Number(a.initiative) : null;
			const ib = Number.isNumeric(b.initiative) ? Number(b.initiative) : null;
			if (ia === null || ib === null || ia !== ib) return wrapped(a, b);
			return bonusDeIniciativa(b) - bonusDeIniciativa(a) || wrapped(a, b);
		});
		wrap("CONFIG.Combat.documentClass.prototype.rollInitiative", async function (wrapped, ids, ...args) {
			try {
				const lista = (typeof ids === "string" ? [ids] : ids ?? []).map((id) => this.combatants.get(id)).filter(Boolean);
				const inimigos = lista.filter(ehInimigo);
				if (inimigos.length) {
					const jaRolado = this.combatants.find((c) => ehInimigo(c) && Number.isNumeric(c.initiative) && !inimigos.includes(c));
					const outros = lista.filter((c) => !inimigos.includes(c)).map((c) => c.id);
					let valor = jaRolado ? Number(jaRolado.initiative) : null;
					let resultado = this;
					if (valor === null) {
						const menor = inimigos.reduce((m, c) => (bonusDeIniciativa(c) < bonusDeIniciativa(m) ? c : m));
						resultado = await wrapped([menor.id], ...args);
						valor = Number(this.combatants.get(menor.id)?.initiative);
					}
					const resto = inimigos.filter((c) => c.initiative !== valor || !Number.isNumeric(c.initiative)).map((c) => ({ _id: c.id, initiative: valor }));
					if (Number.isFinite(valor) && resto.length) await this.updateEmbeddedDocuments("Combatant", resto);
					if (outros.length) resultado = await wrapped(outros, ...args);
					return resultado;
				}
			} catch (error) {
				warn("Falha na iniciativa dos inimigos.", error);
			}
			return wrapped(ids, ...args);
		});
		wrap("CONFIG.Combat.documentClass.prototype._onStartTurn", async function (wrapped, combatant, ...args) {
			const resultado = await wrapped(combatant, ...args);
			await surpresa(this, combatant).catch((error) => warn("Falha na surpresa.", error));
			return resultado;
		});
		wrap("CONFIG.Combat.documentClass.prototype._onStartRound", async function (wrapped, ...args) {
			const resultado = await wrapped(...args);
			await fimDaSurpresa(this).catch((error) => warn("Falha ao tirar a surpresa.", error));
			return resultado;
		});
		// Escolher 10 / 20 no diálogo da perícia.
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			const select = root?.querySelector?.("select[name='rollKeep']");
			if (!select || app.item?.type !== "pericia") return;
			for (const [valor, rotulo] of [["t20c10", "Escolher 10"], ["t20c20", "Escolher 20"]]) {
				const opcao = document.createElement("option");
				opcao.value = valor;
				opcao.textContent = rotulo;
				select.append(opcao);
			}
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				if (resultado && item?.type === "pericia" && ["t20c10", "t20c20"].includes(resultado.rollKeep)) {
					const fixo = resultado.rollKeep === "t20c10" ? "10" : "20";
					resultado.rollKeep = "";
					if (Array.isArray(item.parts) && /d20/.test(String(item.parts[0]))) item.parts[0] = fixo;
				}
				if (resultado && item?.type === "arma" && marcada(resultado, OPCAO_MANOBRA.id)) item._t20cManobra = true;
			} catch (error) {
				warn("Falha ao escolher 10/20.", error);
			}
			return resultado;
		});
		// Manobra: opção no ataque corpo a corpo; tamanho e arma versátil somam no teste.
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			const lista = wrapped(...args);
			if (this.type === "arma" && this.actor && this.system?.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0] === "luta") lista.push(criarOpcaoManobra(this));
			return lista;
		});
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			if (this._t20cManobra && Array.isArray(resultado?.parts)) {
				const tamanho = tamanhoNaManobra(this.actor);
				if (tamanho) resultado.parts.push(String(tamanho));
				if (this.system?.propriedades?.ver || this.system?.propriedades?.versatil) resultado.parts.push("2");
			}
			return resultado;
		});
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, ...args) {
			if (this._t20cManobra) {
				try {
					this._t20cResultadoManobra = await resolverManobra(this);
				} catch (error) {
					warn("Falha ao resolver a manobra.", error);
				}
			}
			return wrapped(...args);
		});
		// Botão de teste oposto nos cartões de perícia.
		Hooks.on("renderChatMessageHTML", (message, html) => {
			const roll = message.rolls?.[0];
			// Cartão de perícia do sistema: sem item ligado, com o nome da perícia no título.
			if (message.flags?.tormenta20?.rollTotal === undefined || !natural(roll) || !(message.isAuthor || game.user.isGM)) return;
			if (!/data-item-id(=""|>|\s)/.test(message.content ?? "") ) return;
			const titulo = html.querySelector?.(".card-header .item-name")?.textContent?.trim().toLowerCase();
			const pericia = Object.entries(CONFIG.T20.pericias).find(([, p]) => game.i18n.localize(p.label).toLowerCase() === titulo)?.[0];
			if (!pericia) return;
			const botao = document.createElement("button");
			botao.type = "button";
			botao.className = "t20c-oposto";
			botao.textContent = OPOSTOS[pericia] === "refl" ? "Fintar (oposto: Reflexos do alvo)" : OPOSTOS[pericia] === "vont" ? "Assustar (oposto: Vontade do alvo)" : "Teste oposto contra o alvo";
			botao.addEventListener("click", (event) => {
				event.preventDefault();
				const actor = ChatMessage.getSpeakerActor(message.speaker);
				const bonus = Number(actor?.system?.pericias?.[pericia]?.value) || 0;
				opor(message, pericia, roll.total, bonus).catch((error) => warn("Falha no teste oposto.", error));
			});
			(html.querySelector(".chat-card") ?? html.querySelector(".message-content") ?? html).append(botao);
		});
	}
};
