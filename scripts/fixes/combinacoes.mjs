import { MODULE_ID } from "../constants.mjs";
import { aplicarPatches, compara, donosEMestre, efeitoContador, gravarContador, marcaAgora, resolver, rodadaAtual, slug, temItem } from "../contadores.mjs";
import { aprimoramentosAplicados } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";
import { bloquear, linhas, quantidade } from "./dialogo-magia.mjs";

/**
 * Combinações Desarmadas do Lutador (Heróis de Arton p. 73–74): "Quando acerta um ataque usando um poder
 * de Combinação, você começa uma contagem (individual por oponente). O próximo ataque de Combinação recebe
 * um bônus de contagem. A contagem zera se você passar uma rodada sem acertar um ataque usando um poder de
 * combinação." Só com ataques desarmados; cada Combinação uma vez por rodada; uma por ataque.
 * Os dados só cobravam PM: os bônus pela contagem eram escolhidos à mão.
 * Correção:
 * - a contagem fica num efeito do lutador ("Combinações: Goblin 2"), que some no fim do combate;
 * - o golpe usa a contagem de antes dele (Quebra-guarda +N no ataque, Boca do Estômago +N no dano,
 *   Chute Circular +Nd6, Um-Dois +N na Defesa e +2 por flanquear sozinho, Chute no Joelho –N no oponente,
 *   Técnica de Sacrifício +N na manobra, Esquiva Técnica +N no Reflexos);
 * - acertar o alvo marcado (20 natural acerta, 1 natural erra; Técnica: vencer a manobra) soma +1, ou +2 com
 *   Mestre das Combinações para cada golpe que ainda não acertou aquele oponente na sequência;
 * - qualquer acerto de Combinação mantém todas as contagens; uma rodada inteira sem acerto zera todas;
 * - o diálogo trava Combinações fora do ataque desarmado (ou manopla), as já usadas na rodada e mais de
 *   uma por ataque. Sem alvo marcado, o cartão pergunta se acertou.
 */
const CONDICOES_ATE_O_PROXIMO_TURNO = { "boca-do-estomago": ["enjoado"], "chute-no-joelho": ["lento"], "quebra-guarda": ["vulneravel"] };
const FIM_DO_PROXIMO_TURNO = { value: 1, units: "rounds", expiry: "turnEnd" };
const mudanca = (key, value, type = "add") => ({ key, type, value: String(value), phase: "initial", priority: null });

/** Patches de dados (Heróis de Arton), por id do efeito; conferem o nome do item. */
const PATCHES = {
	PPhAeyiH7a0Ad2Dq: { item: "Combinação: Um-Dois", patch: { flags: { [MODULE_ID]: { combinacao: "um-dois" } }, system: { changes: [mudanca("ataque", 2)] } } },
	SSGIgTQAwwyoCeLl: { item: "Combinação: Um-Dois", patch: { duration: FIM_DO_PROXIMO_TURNO, flags: { [MODULE_ID]: { cartaoDe: "um-dois" } }, system: { changes: [mudanca("system.attributes.defesa.bonus", "@combinacao")] } } },
	rGOcxlVyUvyyXtbn: { item: "Combinação: Um-Dois", patch: { system: { abilityUse: { types: [] } } } },
	ly1FIQgqKzxM6qRp: { item: "Combinação: Técnica de Sacrifício", patch: { flags: { [MODULE_ID]: { combinacao: "tecnica-de-sacrificio" } }, system: { changes: [mudanca("ataque", "@combinacao"), mudanca("condicao", "agarrado"), mudanca("condicao", "caido")] } } },
	VoGMsRze7ZJeZDPu: { item: "Combinação: Boca do Estômago", patch: { flags: { [MODULE_ID]: { combinacao: "boca-do-estomago" } }, system: { changes: [mudanca("dano", "@combinacao"), mudanca("condicao", "enjoado")] } } },
	ToWc81YqXJ8cAMoP: { item: "Combinação: Chute Circular", patch: { flags: { [MODULE_ID]: { combinacao: "chute-circular" } }, system: { changes: [mudanca("dano", "@combinacaoDados")] } } },
	ECHlspK4edFEo7vA: { item: "Combinação: Chute Circular", patch: { system: { abilityUse: { types: [] } } } },
	"4Hbpm5SXFfhPlrzZ": { item: "Combinação: Chute no Joelho", patch: { flags: { [MODULE_ID]: { combinacao: "chute-no-joelho" } }, system: { changes: [mudanca("condicao", "lento")] } } },
	x5GGRSwV6DhePZEr: { item: "Combinação: Chute no Joelho", patch: { duration: FIM_DO_PROXIMO_TURNO, flags: { [MODULE_ID]: { cartaoDe: "chute-no-joelho" } }, system: { changes: [mudanca("system.modificadores.dano.geral", "-@combinacao"), mudanca("system.modificadores.ataque.geral", "-@combinacao")] } } },
	"7pWcW3rVml3bxsmH": { item: "Combinação: Chute no Joelho", patch: { system: { abilityUse: { types: [] } } } },
	J1lMy3UD9Xqcxxvj: { item: "Combinação: Quebra-guarda", patch: { flags: { [MODULE_ID]: { combinacao: "quebra-guarda" } }, system: { changes: [mudanca("ataque", "@combinacao"), mudanca("condicao", "vulneravel")] } } },
	otFqks3y8Q7jTY1v: { item: "Combinação: Esquiva Técnica", patch: { flags: { [MODULE_ID]: { combinacao: "esquiva-tecnica" } }, system: { changes: [mudanca("roll", "@combinacao")] } } }
};

const ehCombinacao = (ef) => Boolean(ef?.getFlag?.(MODULE_ID, "combinacao") ?? ef?.flags?.[MODULE_ID]?.combinacao);
const golpeDe = (ef) => ef?.getFlag?.(MODULE_ID, "combinacao") ?? ef?.flags?.[MODULE_ID]?.combinacao;

/** Ataque desarmado (ou manopla, que "conta como ataque desarmado"). */
export function permiteCombinacao(item) {
	return item?.type === "arma" && /desarmad|manopla/.test(slug(item.name));
}

/* -------------------------------------------- contagem */

const dadosDoContador = (actor) => efeitoContador(actor, "combinacoes")?.flags?.[MODULE_ID] ?? {};

/** Oponente da combinação: 1) alvo marcado; 2) quem está no turno (reação); 3) o último. */
export function oponenteAtual(actor) {
	const marcados = canvas?.ready ? [...(game.user?.targets ?? [])] : [];
	if (marcados.length) {
		const t = marcados[0].document;
		return { id: t.id, uuid: t.uuid, nome: t.name, origem: "alvo" };
	}
	const c = game.combat?.started ? game.combat.combatant : null;
	if (c?.token && c.actor && c.actor !== actor) return { id: c.token.id, uuid: c.token.uuid, nome: c.token.name, origem: "turno" };
	const u = dadosDoContador(actor).ultimoAlvo;
	return u ? { ...u, origem: "ultimo" } : null;
}

export function contagemContra(actor, id) {
	return (dadosDoContador(actor).alvos ?? []).find((a) => a.id === id)?.contagem ?? 0;
}

const nomeDasCombinacoes = (alvos) => (alvos.length ? `Combinações: ${alvos.map((a) => `${a.nome} ${a.contagem}`).join(" · ")}` : "Combinações");

async function garantirContador(actor) {
	const atual = efeitoContador(actor, "combinacoes");
	if (atual) return atual;
	const poder = actor.items.find((i) => i.effects.some((e) => ehCombinacao(e)));
	return gravarContador(actor, "combinacoes", {
		name: "Combinações",
		img: poder?.img ?? "icons/svg/combat.svg",
		origin: poder?.uuid,
		transfer: false,
		duration: { expiry: "combatEnd", units: "rounds", value: null },
		system: { changes: [] },
		flags: { [MODULE_ID]: { alvos: [], usadas: [], fonte: "sempre" } }
	});
}

async function registrarUso(actor, golpe) {
	const rodada = rodadaAtual();
	if (!rodada) return;
	const ef = await garantirContador(actor);
	const usadas = (ef.getFlag(MODULE_ID, "usadas") ?? []).filter((u) => u.slug !== golpe && u.rodada === rodada);
	await ef.update({ [`flags.${MODULE_ID}.usadas`]: [...usadas, { slug: golpe, rodada }] });
}

export async function registrarAcerto(actor, alvo, golpe) {
	const ef = await garantirContador(actor);
	const alvos = foundry.utils.deepClone(ef.getFlag(MODULE_ID, "alvos") ?? []);
	let entrada = alvos.find((a) => a.id === alvo.id);
	if (!entrada) alvos.push((entrada = { id: alvo.id, uuid: alvo.uuid, nome: alvo.nome, contagem: 0, golpes: [] }));
	const antes = entrada.contagem;
	const novo = !entrada.golpes.includes(golpe);
	entrada.contagem += temItem(actor, "mestredascombinacoes") && novo ? 2 : 1;
	if (novo) entrada.golpes.push(golpe);
	await ef.update({
		name: nomeDasCombinacoes(alvos),
		[`flags.${MODULE_ID}.alvos`]: alvos,
		[`flags.${MODULE_ID}.ultimoAlvo`]: { id: alvo.id, uuid: alvo.uuid, nome: alvo.nome },
		[`flags.${MODULE_ID}.ultimoAcerto`]: marcaAgora()
	});
	return { antes, depois: entrada.contagem };
}

/** Início do turno do lutador: sem acerto de Combinação desde o início do turno anterior, tudo zera. */
async function renovar(combat, combatant) {
	const actor = combatant?.actor;
	const ef = efeitoContador(actor, "combinacoes");
	if (!ef || !game.user.isActiveGM) return;
	const agora = marcaAgora(combat);
	const { inicioTurno, ultimoAcerto, alvos = [] } = ef.flags[MODULE_ID];
	const anterior = inicioTurno?.combate === combat.id ? inicioTurno : null;
	const acertou = ultimoAcerto?.combate === combat.id && (!anterior || compara(ultimoAcerto, anterior) >= 0);
	if (anterior && !acertou && alvos.length) {
		await ef.update({ name: nomeDasCombinacoes([]), [`flags.${MODULE_ID}.alvos`]: [], [`flags.${MODULE_ID}.inicioTurno`]: agora });
		await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), whisper: donosEMestre(actor), content: `<p>Combinações de <strong>${actor.name}</strong>: uma rodada sem acertar, a contagem zerou (Heróis p. 74).</p>` });
		return;
	}
	await ef.update({ [`flags.${MODULE_ID}.inicioTurno`]: agora });
}

/* -------------------------------------------- cartão do ataque */

function acertou(item, plano) {
	if (plano.golpe === "tecnica-de-sacrificio") {
		const r = (item._t20cResultadoManobra ?? []).find((m) => m.alvo?.id === plano.alvo?.id);
		return r ? (r.venceu ? "acertou" : "errou") : "indefinido";
	}
	const roll = Object.values(item.system.rolled ?? {}).find((r) => r?.dice?.[0]?.faces === 20);
	if (!roll) return "indefinido";
	const d = roll.dice[0].total;
	if (d === 20) return "acertou";
	if (d === 1) return "errou";
	const token = plano.alvo && plano.origemAlvo === "alvo" ? foundry.utils.fromUuidSync(plano.alvo.uuid, { strict: false }) : null;
	const defesa = Number(token?.actor?.system?.attributes?.defesa?.value);
	if (!Number.isFinite(defesa)) return "indefinido";
	return roll.total >= defesa ? "acertou" : "errou";
}

function planoDeCombinacao(item, options) {
	const escolhida = aprimoramentosAplicados(item, options).find((a) => ehCombinacao(a.effect));
	if (!escolhida) return null;
	const actor = item.actor;
	const golpe = golpeDe(escolhida.effect);
	const poder = escolhida.effect.parent;
	const alvo = oponenteAtual(actor);
	const rollData = actor.getRollData();
	const comDuracao = new Set(CONDICOES_ATE_O_PROXIMO_TURNO[golpe] ?? []);
	for (const lista of options.effects ?? []) {
		const ef = Array.isArray(lista) ? lista[0] : lista;
		const statuses = ef?.statuses instanceof Set ? [...ef.statuses] : ef?.statuses ?? [];
		if (statuses.some((s) => comDuracao.has(s))) ef.duration = { ...FIM_DO_PROXIMO_TURNO };
	}
	// Efeitos de cartão do poder (Um-Dois: Defesa; Chute no Joelho: penalidade), com a contagem resolvida.
	for (const ef of poder?.effects?.filter((e) => e.getFlag(MODULE_ID, "cartaoDe") === golpe) ?? []) {
		const dados = ef.toObject();
		delete dados._id;
		dados.disabled = false;
		dados.origin = actor.uuid;
		dados.duration = { ...FIM_DO_PROXIMO_TURNO };
		dados.system.changes = dados.system.changes.map((c) => ({ ...c, value: String(resolver(c.value, rollData)) }));
		options.effects = [...(options.effects ?? []), [dados]];
	}
	return { golpe, nome: poder?.name ?? golpe, alvo, origemAlvo: alvo?.origem ?? null, contagem: alvo ? contagemContra(actor, alvo.id) : 0 };
}

async function perguntarAcerto(actor, plano) {
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		whisper: donosEMestre(actor),
		content: `<p><strong>${plano.nome}</strong>${plano.alvo ? ` contra ${plano.alvo.nome}` : ""}: acertou? (marque o alvo antes de clicar, se não houver)</p><button type="button" class="t20c-combinacao-acertou">Acertou</button>`,
		flags: { [MODULE_ID]: { combinacao: { actorUuid: actor.uuid, golpe: plano.golpe, alvo: plano.alvo } } }
	});
}

/* -------------------------------------------- diálogo */

function prepararDialogo(app, root) {
	const item = app.item;
	const actor = item?.actor;
	const lista = linhas(app, root).filter((l) => ehCombinacao(l.effect));
	if (!actor || !lista.length) return;
	const alvo = oponenteAtual(actor);
	const n = alvo ? contagemContra(actor, alvo.id) : 0;
	const aviso = document.createElement("p");
	aviso.className = "t20c-combinacoes";
	aviso.style.cssText = "margin: 0.25em 0; font-size: 0.9em;";
	aviso.textContent = alvo
		? `Combinações — ${alvo.nome}${alvo.origem === "alvo" ? "" : alvo.origem === "turno" ? " (quem está no turno)" : " (último oponente)"}: contagem ${n}.`
		: "Combinações — nenhum oponente marcado: contagem 0. Marque o alvo para usar a contagem.";
	lista[0].li.parentElement?.before(aviso);
	const rodada = rodadaAtual();
	const usadas = new Set((dadosDoContador(actor).usadas ?? []).filter((u) => u.rodada === rodada).map((u) => u.slug));
	for (const linha of lista) {
		if (item.type === "arma" && !permiteCombinacao(item)) {
			bloquear(linha, "Combinações só podem ser usadas com ataques desarmados (Heróis p. 74).");
			linha.li.dataset.t20cFixo = "1";
		} else if (usadas.has(golpeDe(linha.effect))) {
			bloquear(linha, "Já usada nesta rodada (Heróis p. 74).");
			linha.li.dataset.t20cFixo = "1";
		}
	}
	// Uma Combinação por ataque.
	for (const linha of lista) {
		linha.input.addEventListener("change", () => {
			if (!quantidade(linha.input)) return;
			for (const outra of lista) {
				if (outra === linha || !quantidade(outra.input)) continue;
				if (outra.input.type === "checkbox") outra.input.checked = false;
				else outra.input.value = 0;
				outra.input.dispatchEvent(new Event("change", { bubbles: true }));
			}
		});
	}
}

export default {
	id: "combinacoes",
	name: "Combinações do Lutador: contagem automática",
	hint: "Conta as Combinações (Heróis de Arton) por oponente: os golpes usam a contagem (Quebra-guarda, Boca do Estômago, Chute Circular, Um-Dois, Chute no Joelho, Técnica de Sacrifício, Esquiva Técnica), o acerto soma +1 (+2 com Mestre das Combinações por golpe novo) e uma rodada sem acerto zera tudo. O diálogo trava golpes fora do desarmado, repetidos na rodada e mais de um por ataque.",
	init() {
		wrap("CONFIG.Item.documentClass.migrateData", function (wrapped, source, ...args) {
			try {
				aplicarPatches(source, PATCHES);
			} catch (error) {
				warn("Falha nos dados das Combinações.", error);
			}
			return wrapped(source, ...args);
		});
		wrap("CONFIG.Actor.documentClass.prototype.getRollData", function (wrapped, ...args) {
			const data = wrapped(...args);
			let n = 0;
			try {
				const alvo = efeitoContador(this, "combinacoes") ? oponenteAtual(this) : null;
				n = alvo ? contagemContra(this, alvo.id) : 0;
			} catch {
				n = 0;
			}
			data.combinacao = n;
			data.combinacaoDados = n > 0 ? `${n}d6` : "0";
			return data;
		});
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			if (!root) return;
			try {
				prepararDialogo(app, root);
			} catch (error) {
				warn("Falha no diálogo das Combinações.", error);
			}
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				if (resultado && item?.actor) {
					const escolhida = aprimoramentosAplicados(item, resultado).find((a) => ehCombinacao(a.effect));
					const golpe = golpeDe(escolhida?.effect);
					// Técnica de Sacrifício vira manobra agarrar (correção "Testes": teste oposto contra o Luta do alvo).
					if (golpe === "tecnica-de-sacrificio") item._t20cManobra = true;
					// Esquiva Técnica é um teste de Reflexos: o uso conta aqui (não passa pelo cartão do item).
					if (golpe && ["pericia", "atributo"].includes(item.type)) await registrarUso(item.actor, golpe);
				}
			} catch (error) {
				warn("Falha ao registrar a Combinação.", error);
			}
			return resultado;
		});
		wrap("CONFIG.Item.documentClass.prototype.displayCard", async function (wrapped, config = {}, ...args) {
			let plano = null;
			try {
				if (config.options && this.actor && this.type === "arma") plano = planoDeCombinacao(this, config.options);
				if (plano) {
					const estado = acertou(this, plano);
					plano.estado = estado;
					const texto =
						estado === "acertou"
							? `${plano.nome}: acertou ${plano.alvo?.nome ?? "o alvo"} (contagem usada: ${plano.contagem})`
							: estado === "errou"
								? `${plano.nome}: errou (contagem fica ${plano.contagem})`
								: `${plano.nome}: confirme o acerto no chat`;
					this.system.chatFlavor = [this.system.chatFlavor, `${texto}.`].filter(Boolean).join(" ");
				}
			} catch (error) {
				warn("Falha ao montar a Combinação.", error);
			}
			const resultado = await wrapped(config, ...args);
			if (plano) {
				try {
					await registrarUso(this.actor, plano.golpe);
					if (plano.estado === "acertou" && plano.alvo) await registrarAcerto(this.actor, plano.alvo, plano.golpe);
					else if (plano.estado === "indefinido") await perguntarAcerto(this.actor, plano);
				} catch (error) {
					warn("Falha ao registrar a Combinação.", error);
				}
			}
			return resultado;
		});
		wrap("CONFIG.Combat.documentClass.prototype._onStartTurn", async function (wrapped, combatant, ...args) {
			const resultado = await wrapped(combatant, ...args);
			await renovar(this, combatant).catch((error) => warn("Falha ao renovar as Combinações.", error));
			return resultado;
		});
		Hooks.on("renderChatMessageHTML", (message, html) => {
			const botao = html.querySelector?.(".t20c-combinacao-acertou");
			const info = message.getFlag(MODULE_ID, "combinacao");
			if (!botao || !info) return;
			botao.addEventListener("click", async (event) => {
				event.preventDefault();
				const actor = foundry.utils.fromUuidSync(info.actorUuid);
				if (!actor?.isOwner) return;
				const marcado = [...(game.user.targets ?? [])][0]?.document;
				const alvo = info.alvo ?? (marcado ? { id: marcado.id, uuid: marcado.uuid, nome: marcado.name } : null);
				if (!alvo) return ui.notifications.warn("Marque o alvo que foi acertado.");
				const { antes, depois } = await registrarAcerto(actor, alvo, info.golpe);
				botao.disabled = true;
				await ChatMessage.create({ speaker: message.speaker, whisper: donosEMestre(actor), content: `<p>Combinação contra ${alvo.nome}: contagem ${antes} → ${depois}.</p>` });
			});
		});
	}
};
