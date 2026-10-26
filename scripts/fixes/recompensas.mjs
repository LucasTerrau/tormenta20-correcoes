import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Recompensas (JdA p. 282 e 326; Ameaças de Arton, "Encontros" e "Recompensas por Vários Inimigos"):
 * - XP de uma ameaça = ND × 1.000, dividido igualmente entre o grupo. A ficha do NPC arredondava o ND para
 *   1 antes da conta: ND 1/4 e 1/2 mostravam 1.000 XP (deviam 250 e 500).
 * - Desafio vencido: XP total; empate: metade; derrota dos heróis: um quarto.
 * - Desafio com ND 5 ou mais abaixo do nível do grupo não rende XP.
 * - ND do encontro: ameaças de mesmo ND formam um grupo (abaixo de ND 1, ND × quantidade; de ND 1 em
 *   diante, +2 cada vez que a quantidade dobra); grupos de ND diferente somam ao maior +1 (até 1 ponto
 *   abaixo), +½ (2 pontos) ou +¼ (3 pontos). Por padrão a XP usa o ND de cada criatura; a regra opcional do
 *   Ameaças de Arton usa o ND do encontro.
 * O sistema só mostrava o XP na ficha. Correção: ao terminar um combate, o mestre recebe um cartão com as
 * ameaças (marcadas as hostis; ND editável, para chefe final ou parceiro que não conta), os personagens, o
 * ND do encontro e os botões que lançam a XP nas fichas.
 */

/** ND como número ("1/4" → 0,25; S e S+ contam como 20). */
export function ndNumerico(nd) {
	const texto = String(nd ?? "").trim();
	if (/^s\+?$/i.test(texto)) return 20;
	const [num, den] = texto.split("/").map(Number);
	if (!Number.isFinite(num)) return 0;
	return den ? num / den : num;
}

const formatarND = (nd) => {
	const fracoes = { 0.25: "1/4", 0.5: "1/2", 0.125: "1/8", 0.75: "3/4" };
	return fracoes[nd] ?? String(Math.round(nd * 100) / 100).replace(".", ",");
};

/** ND de um grupo de ameaças de mesmo ND. */
function ndDoGrupo(nd, quantidade) {
	if (nd < 1) return nd * quantidade;
	return nd + 2 * Math.floor(Math.log2(quantidade));
}

/** ND do encontro (Ameaças de Arton): agrupa por ND, repete enquanto houver grupos iguais, soma ao maior. */
export function ndDoEncontro(nds) {
	let grupos = nds.filter((n) => n > 0);
	if (!grupos.length) return 0;
	for (;;) {
		const contagem = new Map();
		for (const n of grupos) contagem.set(n, (contagem.get(n) ?? 0) + 1);
		const novos = [...contagem].map(([nd, q]) => (q > 1 ? ndDoGrupo(nd, q) : nd));
		if (novos.length === grupos.length) {
			grupos = novos;
			break;
		}
		grupos = novos;
	}
	grupos.sort((a, b) => b - a);
	const [base, ...outros] = grupos;
	let total = base;
	for (const n of outros) {
		const d = base - n;
		total += d <= 1 ? 1 : d <= 2 ? 0.5 : d <= 3 ? 0.25 : 0;
	}
	return total;
}

/* -------------------------------------------- cartão de XP */

const ehAmeaca = (c) => ["npc", "hazard"].includes(c.actor?.type);
const ehPersonagem = (c) => c.actor?.type === "character";

function linhasDoCartao(combat) {
	const ameacas = [];
	const personagens = new Map();
	for (const c of combat.combatants) {
		if (ehPersonagem(c)) personagens.set(c.actor.uuid, { uuid: c.actor.uuid, nome: c.actor.name, nivel: Number(c.actor.system.attributes?.nivel?.value) || 1 });
		else if (ehAmeaca(c)) {
			const hostil = (c.token?.disposition ?? -1) === CONST.TOKEN_DISPOSITIONS.HOSTILE;
			ameacas.push({ nome: c.name, nd: c.actor.system.attributes?.nd ?? "1", incluir: hostil, tokenUuid: c.token?.uuid ?? null, actorUuid: c.actor.uuid, tesouro: String(c.actor.system.detalhes?.tesouro ?? "") });
		}
	}
	return { ameacas, personagens: [...personagens.values()] };
}

function htmlDoCartao({ ameacas, personagens }) {
	const extraivel = (a) => /recurso|extra[ií]|extrair/i.test(a.tesouro);
	const linhaAmeaca = (a, i) =>
		`<tr><td><input type="checkbox" name="a${i}" ${a.incluir ? "checked" : ""}></td><td>${a.nome}${a.tesouro ? `<br><span style="font-size:.8em;opacity:.75">Tesouro: ${a.tesouro}</span>` : ""}</td><td><input type="text" name="nd${i}" value="${a.nd}" style="width:3.5em"></td><td>${extraivel(a) ? `<button type="button" data-t20c-extrair="${i}" title="Extrair recursos (CD 15 + ND)">Extrair</button>` : ""}</td></tr>`;
	const linhaPersonagem = (p, i) => `<label style="display:block"><input type="checkbox" name="p${i}" checked> ${p.nome} (${p.nivel}º)</label>`;
	return `<div class="t20c-xp">
		<p><strong>Fim do combate: experiência</strong></p>
		<table><tr><th></th><th>Ameaça</th><th>ND</th><th></th></tr>${ameacas.map(linhaAmeaca).join("")}</table>
		<p style="margin:0.3em 0 0.1em">Personagens:</p>${personagens.map(linhaPersonagem).join("")}
		<p style="margin:0.3em 0">
			<label><input type="checkbox" name="encontro"> XP pelo ND do encontro (Ameaças de Arton)</label>
		</p>
		<p class="t20c-xp-previa" style="font-size:0.9em;opacity:0.85"></p>
		<div style="display:flex;gap:4px">
			<button type="button" data-t20c-xp="1">Vitória</button>
			<button type="button" data-t20c-xp="0.5">Empate (½)</button>
			<button type="button" data-t20c-xp="0.25">Derrota (¼)</button>
		</div>
		<div style="display:flex;gap:4px;margin-top:4px">
			<button type="button" data-t20c-tesouro>Rolar tesouro</button>
		</div>
	</div>`;
}

/** Lê o formulário do cartão e calcula a XP de cada personagem. */
function calcular(raiz, dados) {
	const valor = (nome) => raiz.querySelector(`[name="${nome}"]`);
	const ameacas = dados.ameacas.map((a, i) => ({ ...a, incluir: valor(`a${i}`)?.checked, nd: ndNumerico(valor(`nd${i}`)?.value ?? a.nd) })).filter((a) => a.incluir && a.nd > 0);
	const personagens = dados.personagens.filter((p, i) => valor(`p${i}`)?.checked);
	if (!personagens.length) return null;
	const nivelDoGrupo = Math.floor(personagens.reduce((s, p) => s + p.nivel, 0) / personagens.length);
	const ndEncontro = ndDoEncontro(ameacas.map((a) => a.nd));
	const pelaRegraDoEncontro = valor("encontro")?.checked;
	const irrelevante = (nd) => nd <= nivelDoGrupo - 5;
	let total;
	let ignoradas = [];
	if (pelaRegraDoEncontro) total = irrelevante(ndEncontro) ? 0 : ndEncontro * 1000;
	else {
		ignoradas = ameacas.filter((a) => irrelevante(a.nd));
		total = ameacas.filter((a) => !irrelevante(a.nd)).reduce((s, a) => s + a.nd * 1000, 0);
	}
	return { personagens, nivelDoGrupo, ndEncontro, total, porPersonagem: Math.floor(total / personagens.length), ignoradas, pelaRegraDoEncontro };
}

function previa(raiz, dados) {
	const r = calcular(raiz, dados);
	const alvo = raiz.querySelector(".t20c-xp-previa");
	if (!alvo) return;
	if (!r) {
		alvo.textContent = "Marque ao menos um personagem.";
		return;
	}
	const ignoradas = r.ignoradas.length ? ` Sem XP (ND 5 ou mais abaixo do nível ${r.nivelDoGrupo} do grupo): ${r.ignoradas.map((a) => a.nome).join(", ")}.` : "";
	alvo.textContent = `ND do encontro ${formatarND(r.ndEncontro)}. Vitória: ${r.total} XP, ${r.porPersonagem} para cada um.${ignoradas}`;
}

async function darXP(message, raiz, fator) {
	const dados = message.getFlag(MODULE_ID, "xp");
	const r = calcular(raiz, dados);
	if (!r) return ui.notifications.warn("Marque ao menos um personagem.");
	const xp = Math.floor(r.porPersonagem * fator);
	const linhas = [];
	for (const p of r.personagens) {
		const actor = foundry.utils.fromUuidSync(p.uuid);
		if (!actor) continue;
		const atual = Number(actor.system.attributes?.nivel?.xp?.value) || 0;
		await actor.update({ "system.attributes.nivel.xp.value": atual + xp });
		linhas.push(`${actor.name}: ${atual} → ${atual + xp}`);
	}
	const resultado = { 1: "vitória", 0.5: "empate (metade)", 0.25: "derrota (um quarto)" }[fator];
	await message.setFlag(MODULE_ID, "xpAplicado", true);
	await ChatMessage.create({
		content: `<p><strong>XP do combate</strong> (${resultado}${r.pelaRegraDoEncontro ? ", pelo ND do encontro" : ""}): +${xp} para cada um.</p><ul>${linhas.map((l) => `<li>${l}</li>`).join("")}</ul>`
	});
}

/** Tesouro das ameaças marcadas: por criatura, ou uma vez pelo ND do encontro (categoria da de maior ND). */
async function rolarTesouroDoCartao(raiz, dados) {
	const api = game.modules.get(MODULE_ID).api;
	if (!api?.rolarTesouro) return ui.notifications.warn("Ligue a correção de tesouro.");
	const valor = (nome) => raiz.querySelector(`[name="${nome}"]`);
	const ameacas = dados.ameacas.map((a, i) => ({ ...a, incluir: valor(`a${i}`)?.checked, nd: valor(`nd${i}`)?.value ?? a.nd })).filter((a) => a.incluir);
	if (!ameacas.length) return ui.notifications.warn("Marque ao menos uma ameaça.");
	const personagens = dados.personagens.filter((p, i) => valor(`p${i}`)?.checked).map((p) => foundry.utils.fromUuidSync(p.uuid)).filter(Boolean);
	const mods = api.modificadoresDoGrupo(personagens);
	const resultados = [];
	if (valor("encontro")?.checked) {
		const maior = ameacas.reduce((m, a) => (ndNumerico(a.nd) > ndNumerico(m.nd) ? a : m));
		const nd = ndDoEncontro(ameacas.map((a) => ndNumerico(a.nd)));
		resultados.push(await api.rolarTesouro({ nd, categoria: api.categoriaDoTexto(maior.tesouro), nome: "Encontro", mods }));
	} else {
		for (const a of ameacas) resultados.push(await api.rolarTesouro({ nd: a.nd, categoria: api.categoriaDoTexto(a.tesouro), nome: a.nome, mods }));
	}
	await api.postarTesouro(resultados, { mods, titulo: "Tesouro do combate" });
}

export default {
	id: "recompensas",
	name: "XP por ND e cartão de recompensas do combate",
	hint: "A ficha do NPC mostra a XP de ND fracionário (1/4 = 250, 1/2 = 500; o sistema mostrava 1.000). Ao terminar um combate, o mestre recebe um cartão com as ameaças, o ND do encontro e botões que lançam a XP nas fichas (vitória, empate ½, derrota ¼; ND 5 ou mais abaixo do grupo não rende XP; opção pelo ND do encontro). JdA p. 282 e 326; Ameaças de Arton.",
	init() {
		wrap("CONFIG.Actor.dataModels.npc.prototype.prepareBaseData", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const xp = this.attributes?.nivel?.xp;
			if (xp) xp.value = Math.floor(ndNumerico(this.attributes.nd) * 1000);
			return resultado;
		});
		Hooks.on("deleteCombat", (combat, options, userId) => {
			if (userId !== game.userId || !game.user.isGM || !combat.started) return;
			try {
				const dados = linhasDoCartao(combat);
				if (!dados.ameacas.length || !dados.personagens.length) return;
				ChatMessage.create({ content: htmlDoCartao(dados), whisper: game.users.filter((u) => u.isGM).map((u) => u.id), flags: { [MODULE_ID]: { xp: dados } } });
			} catch (error) {
				warn("Falha ao montar o cartão de XP.", error);
			}
		});
		Hooks.on("renderChatMessageHTML", (message, html) => {
			const dados = message.getFlag(MODULE_ID, "xp");
			const raiz = html.querySelector?.(".t20c-xp");
			if (!dados || !raiz) return;
			if (!game.user.isGM) {
				raiz.querySelectorAll("button, input").forEach((e) => (e.disabled = true));
				return;
			}
			previa(raiz, dados);
			raiz.addEventListener("change", () => previa(raiz, dados));
			raiz.addEventListener("input", () => previa(raiz, dados));
			raiz.querySelector("[data-t20c-tesouro]")?.addEventListener("click", (event) => {
				event.preventDefault();
				rolarTesouroDoCartao(raiz, dados).catch((error) => warn("Falha ao rolar o tesouro.", error));
			});
			for (const botao of raiz.querySelectorAll("[data-t20c-extrair]")) {
				botao.addEventListener("click", (event) => {
					event.preventDefault();
					const i = Number(botao.dataset.t20cExtrair);
					const nd = raiz.querySelector(`[name="nd${i}"]`)?.value ?? dados.ameacas[i].nd;
					game.modules.get(MODULE_ID).api?.extrairRecursos?.(nd);
				});
			}
			for (const botao of raiz.querySelectorAll("[data-t20c-xp]")) {
				botao.addEventListener("click", async (event) => {
					event.preventDefault();
					if (message.getFlag(MODULE_ID, "xpAplicado")) {
						const confirma = await foundry.applications.api.DialogV2.confirm({ window: { title: "XP já lançada" }, content: "<p>A XP deste combate já foi lançada. Lançar de novo?</p>", rejectClose: false });
						if (!confirma) return;
					}
					darXP(message, raiz, Number(botao.dataset.t20cXp)).catch((error) => warn("Falha ao lançar a XP.", error));
				});
			}
		});
	}
};
