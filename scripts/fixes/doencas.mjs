import { MODULE_ID } from "../constants.mjs";
import { DOENCAS } from "../migracao/doencas-dados.mjs";
import { equipado } from "../magia/regras.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Doenças (JdA p. 318; Ameaças de Arton p. 358–359). O sistema só tem a condição Doente, sem regra.
 * - Exposição: teste de Fortitude contra a CD da doença; se falhar, fica contaminado (ainda sem efeito).
 *   Não acumula: quem já tem a doença não é contaminado de novo. Imunes: imunidade a doença ou a
 *   metabolismo (construtos, mortos-vivos, "imunidade a doenças"), Pingente da Saúde.
 * - No início de cada dia, novo teste. Falhou: sofre o efeito do dia; em dias seguidos, o próximo estágio
 *   ("/" no livro). Passou: volta um estágio (sem efeito se não houver anterior). Dois sucessos seguidos
 *   curam (três na Maldição Pegajosa). Podridão da Múmia (só cura por magia) e Praga Coral (sem cura):
 *   passar só "impede a progressão" — leitura do módulo, confirmada pelo usuário: fica no mesmo estágio
 *   (sofre o efeito dele de novo), não melhora, não chega à cura e não perde mais atributo. Na Praga, um
 *   efeito que cura doenças também só impede a progressão: conta como passar no próximo teste do dia.
 * - Tratamento (Cura, p. 117): ação completa, teste de Cura contra a CD; passou, +5 no próximo teste.
 * Como usar: as criaturas com a habilidade "Doença" ganham no cartão de ataque um botão que expõe os alvos;
 * "/doenca <nome> [cd N] [imediato]" expõe os alvos (ou os tokens selecionados); o descanso, ou
 * "/doenca dia", põe no chat o teste do dia de cada doente. Remover a condição Doente cura a doença (menos a
 * Praga Coral, que não tem cura: o mestre escolhe entre "foi um efeito de cura" e tirar mesmo).
 */
const STATUS = "doente";
const NOMES_CONDICAO = { fraco: "fraco", debilitado: "debilitado", inconsciente: "inconsciente", frustrado: "frustrado", esmorecido: "esmorecido", confuso: "confuso", alquebrado: "alquebrado", vulneravel: "vulnerável", enjoado: "enjoado", lento: "lento", fatigado: "fatigado", exausto: "exausto" };
const ATRIBUTOS = { for: "Força", des: "Destreza", con: "Constituição", int: "Inteligência", sab: "Sabedoria", car: "Carisma" };
// Partes do corpo que aparecem em "uma criatura mordida/atingida pelos chifres… é exposta à doença".
const GATILHOS = ["mordid", "chifre", "pancada", "tromba", "garra", "ferrao", "tentaculo", "picada", "cauda"];
const DIA = 86400;

const normalizar = (texto) => String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const limpar = (html) => String(html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const shiftSemDialogo = () => game.settings.get("tormenta20", "UsageConfig") === "default";
const dadosDe = (efeito) => efeito?.getFlag?.(MODULE_ID, "doenca") ?? efeito?.flags?.[MODULE_ID]?.doenca;

/** Doença pelo nome escrito ("infecção do esgoto", "Alergia Elemental (fogo)"). */
export function doencaPeloNome(texto) {
	const alvo = normalizar(texto).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
	if (!alvo) return null;
	const entradas = Object.entries(DOENCAS).map(([k, d]) => [k, normalizar(d.nome).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim()]);
	return (entradas.find(([, n]) => n === alvo) ?? entradas.find(([, n]) => n.startsWith(alvo)) ?? entradas.find(([, n]) => alvo.startsWith(n)) ?? entradas.find(([k]) => k === alvo.replace(/ /g, "-")))?.[0] ?? null;
}

/** Habilidades "Doença" do atacante: doença, CD (quando o texto traz "Fort CD N") e as partes do corpo. */
function doencasDoAtor(actor) {
	const lista = [];
	for (const item of actor?.items ?? []) {
		if (item.type !== "poder") continue;
		const texto = limpar(item.system?.description?.value);
		const m = texto.match(/expost[oa]s? (?:a|à) doen[çc]a ([^.(,]+)/i);
		const chave = m && doencaPeloNome(m[1]);
		if (!chave) continue;
		const cd = Number(texto.match(/\(Fort(?:itude)? CD (\d+)/i)?.[1]) || DOENCAS[chave].cd;
		const norm = normalizar(texto);
		lista.push({ chave, cd, gatilhos: GATILHOS.filter((g) => norm.includes(g)), item });
	}
	return lista;
}

function imune(actor) {
	const ic = actor.system?.tracos?.ic?.value;
	const tem = (v) => (ic instanceof Set ? ic.has(v) : Array.isArray(ic) ? ic.includes(v) : false);
	if (tem(STATUS) || tem("metabolismo")) return "imune a doenças";
	// "recebe imunidade a doenças e venenos. Os efeitos só se ativam após uma semana de uso" (JdA p. 345).
	if (actor.items?.some((i) => /^pingente da sa[úu]de/i.test(i.name) && equipado(i))) return "Pingente da Saúde";
	return null;
}

function efeitosDeDoenca(actor) {
	return actor?.effects?.filter((e) => dadosDe(e)?.chave) ?? [];
}

async function rolarFortitude(actor, cd, bonus = 0) {
	const teste = await actor.rollPericia("fort", { event: { shiftKey: shiftSemDialogo() }, message: false });
	if (!teste) return null;
	// 20 natural sempre passa e 1 natural sempre falha (JdA p. 227).
	const natural = teste.dice?.find((d) => d.faces === 20)?.total;
	const total = teste.total + bonus;
	return { teste, total, passou: natural === 20 || (natural !== 1 && total >= cd) };
}

/* -------------------------------------------- exposição */

async function criarEfeitoDaDoenca(actor, chave, cd) {
	const doenca = DOENCAS[chave];
	const base = (await CONFIG.ActiveEffect.documentClass.fromStatusEffect(STATUS)).toObject();
	base.name = `Doente (${doenca.nome})`;
	base.duration = { value: null, units: "seconds", expiry: null };
	base.description = `<p>${doenca.nome} (${doenca.fonte}): ${doenca.transmissao}, CD ${cd}. ${descreverDoenca(doenca)}</p>`;
	foundry.utils.setProperty(base, `flags.${MODULE_ID}.doenca`, { chave, cd, estagio: 0, sucessos: 0, tratamento: false, perdas: [] });
	const [efeito] = await actor.createEmbeddedDocuments("ActiveEffect", [base]);
	return efeito;
}

/**
 * Expõe a criatura a uma doença. @param {object} op  cd (outra CD), imediato (sem teste de exposição e
 * já com o teste do dia, como a Doença do Rogar Maldição: "sem período de incubação").
 */
export async function expor(actor, chave, op = {}) {
	const doenca = DOENCAS[chave];
	if (!actor || !doenca) return;
	const cd = Number(op.cd) || doenca.cd;
	const speaker = ChatMessage.getSpeaker({ actor });
	const motivo = imune(actor);
	if (motivo) return ChatMessage.create({ speaker, flavor: `${doenca.nome}: ${actor.name} não é afetado (${motivo}).` });
	if (efeitosDeDoenca(actor).some((e) => dadosDe(e).chave === chave)) return ChatMessage.create({ speaker, flavor: `${doenca.nome}: ${actor.name} já está contaminado (a contaminação não acumula).` });
	if (op.imediato) {
		const efeito = await criarEfeitoDaDoenca(actor, chave, cd);
		await ChatMessage.create({ speaker, flavor: `${doenca.nome}: ${actor.name} contrai a doença, que o afeta imediatamente.` });
		return testeDoDia(actor, efeito);
	}
	const r = await rolarFortitude(actor, cd);
	if (!r) return;
	await r.teste.toMessage({ speaker, flavor: `Exposição a ${doenca.nome} (${doenca.transmissao}): Fortitude contra CD ${cd} — ${r.passou ? "resistiu" : "contaminado; o primeiro efeito vem com o teste do início do próximo dia"}` });
	if (!r.passou) await criarEfeitoDaDoenca(actor, chave, cd);
}

/* -------------------------------------------- estágios */

function descreverEstagio(e) {
	if (!e) return "sem efeito";
	const partes = [];
	if (e.condicoes?.length) partes.push(`fica ${e.condicoes.map((id) => NOMES_CONDICAO[id] ?? id).join(" e ")}`);
	if (e.vulneravelA) partes.push(`fica vulnerável a ${e.vulneravelA}`);
	if (e.pm) partes.push(`perde ${e.pm} PM`);
	if (e.perda) partes.push(`perde ${e.perda} PV`);
	if (e.atributos?.length) partes.push(`perde 1 de ${e.atributos.map((a) => ATRIBUTOS[a]).join(", ")}${e.cumulativo ? " (cumulativo)" : " (permanente)"}`);
	if (e.morte) partes.push("morre");
	if (e.nota) partes.push(e.nota);
	return partes.join("; ");
}

function descreverDoenca(doenca) {
	const curaTexto =
		doenca.cura === "magica"
			? "Só é curada por magia; passar no teste só impede que ela avance (fica no mesmo estágio, sem nova perda de atributo)."
			: doenca.cura === "nenhuma"
				? "Não tem cura conhecida; passar no teste, ou um efeito que cure doenças, só impede que ela avance naquele dia (fica no mesmo estágio, sem nova perda de atributo)."
				: `Cura com ${doenca.cura ?? 2} testes seguidos.`;
	return `Estágios: ${doenca.estagios.map(descreverEstagio).join(" / ")}. ${curaTexto}${doenca.nota ? ` ${doenca.nota[0].toUpperCase()}${doenca.nota.slice(1)}.` : ""}`;
}

async function limparEstagio(actor, efeito) {
	const ids = actor.effects.filter((e) => e.getFlag(MODULE_ID, "doencaDe") === efeito.id).map((e) => e.id);
	if (ids.length) await actor.deleteEmbeddedDocuments("ActiveEffect", ids, { t20cDoenca: true });
}

/** Aplica o efeito do dia. @returns {string[]} linhas para o chat */
async function aplicarEstagio(actor, efeito, estagio, { semNovaPerda = false } = {}) {
	const dados = dadosDe(efeito);
	const doenca = DOENCAS[dados.chave];
	await limparEstagio(actor, efeito);
	if (estagio <= 0) return [];
	const e = doenca.estagios[Math.min(estagio, doenca.estagios.length) - 1];
	const perdas = [...(dados.perdas ?? [])];
	const semAtributo = Boolean(e.atributos?.length) && (semNovaPerda || (!e.cumulativo && perdas.includes(dados.chave)));
	const linhas = [descreverEstagio(semAtributo ? { ...e, atributos: [] } : e) || "sem efeito novo"];
	if (semAtributo) linhas.push(semNovaPerda ? "sem nova perda de atributo (a doença não progrediu)" : "a perda de atributo desta doença já aconteceu");
	const novos = [];
	const marca = { [`flags.${MODULE_ID}.doencaDe`]: efeito.id };
	for (const id of e.condicoes ?? []) {
		const fonte = (await CONFIG.ActiveEffect.documentClass.fromStatusEffect(id)).toObject();
		fonte.name = `${fonte.name} (${doenca.nome})`;
		fonte.duration = { value: DIA, units: "seconds", expiry: null };
		novos.push(foundry.utils.mergeObject(fonte, foundry.utils.expandObject(marca)));
	}
	if (e.vulneravelA) {
		novos.push(
			foundry.utils.mergeObject(
				{
					name: `${doenca.nome}: vulnerável a ${e.vulneravelA}`,
					img: efeito.img,
					type: "base",
					duration: { value: DIA, units: "seconds", expiry: null },
					system: { changes: [{ key: `system.tracos.resistencias.${e.vulneravelA}.vulnerabilidade`, type: "override", value: "true", phase: "initial", priority: null }] }
				},
				foundry.utils.expandObject(marca)
			)
		);
	}
	if (e.atributos?.length && !semAtributo) {
		// Perda permanente: fica depois da cura (não leva a marca do estágio).
		novos.push({
			name: `Perda permanente: ${e.atributos.map((a) => `–1 ${ATRIBUTOS[a]}`).join(", ")} (${doenca.nome})`,
			img: efeito.img,
			type: "base",
			system: { changes: e.atributos.map((a) => ({ key: `system.atributos.${a}.bonus`, type: "add", value: "-1", phase: "initial", priority: null })) },
			flags: { [MODULE_ID]: { perdaPermanente: dados.chave } }
		});
		perdas.push(dados.chave);
	}
	// O próprio estágio pede a condição: não é "ficar de novo" para a regra de condições que pioram.
	if (novos.length) await actor.createEmbeddedDocuments("ActiveEffect", novos, { t20cEscalada: true });
	if (e.pm) {
		const r = await new Roll(e.pm).evaluate();
		const pm = actor.system.attributes.pm;
		await actor.update({ "system.attributes.pm.value": Math.max(0, (Number(pm.value) || 0) - r.total) });
		linhas.push(`perdeu ${r.total} PM`);
	}
	if (e.perda) {
		const r = await new Roll(`${e.perda}[perda]`).evaluate();
		await actor.applyDamageV2(r, 1);
		linhas.push(`perdeu ${r.total} PV`);
	}
	if (e.explosao) {
		const r = await new Roll(e.explosao).evaluate();
		await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `${doenca.nome}: explosão (raio de 3m)`, rolls: [r] });
	}
	if (e.morte && !actor.statuses?.has("morto")) await actor.toggleStatusEffect("morto", { active: true });
	await efeito.update({ [`flags.${MODULE_ID}.doenca.perdas`]: perdas });
	return linhas;
}

/* -------------------------------------------- teste do dia */

/**
 * "Impede a progressão" (Podridão da Múmia e Praga Coral) explicado no chat. Leitura do módulo, confirmada
 * pelo usuário: o estágio não muda, o efeito dele vale de novo, não há melhora nem nova perda de atributo.
 */
function explicarProgressaoImpedida(doenca, porCura) {
	const motivo = porCura ? "Um efeito que cura doenças foi usado: a Praga não progride hoje, mesmo com a falha." : "Por isso a doença não progride hoje.";
	const regra = "Ela fica no mesmo estágio: o efeito dele vale de novo, mas a vítima não melhora e não perde mais atributo.";
	const cura = doenca.cura === "magica" ? "Esta doença só sai com magia." : "Esta doença não tem cura conhecida: nem o teste nem efeitos que curam doenças a removem.";
	return `${motivo} ${regra} ${cura}`;
}

export async function testeDoDia(actor, efeito) {
	const dados = dadosDe(efeito);
	const doenca = DOENCAS[dados?.chave];
	if (!doenca) return;
	const bonus = dados.tratamento ? 5 : 0;
	const r = await rolarFortitude(actor, dados.cd, bonus);
	if (!r) return;
	const n = doenca.estagios.length;
	const soImpede = doenca.cura === "magica" || doenca.cura === "nenhuma";
	// Praga Coral: um efeito que cura doenças foi usado desde o último teste (conta como passar).
	const porCura = Boolean(dados.impedida) && !r.passou;
	const impedida = soImpede && (r.passou || porCura);
	let { estagio = 0, sucessos = 0 } = dados;
	if (r.passou && !soImpede) {
		sucessos++;
		estagio = Math.max(0, estagio - 1);
	} else if (!r.passou) {
		sucessos = 0;
		if (!porCura) estagio = Math.min(n, estagio + 1);
	}
	const curado = !soImpede && sucessos >= (doenca.cura ?? 2);
	const cabecalho = `${doenca.nome}: Fortitude ${r.teste.total}${bonus ? ` + 5 (tratamento) = ${r.total}` : ""} contra CD ${dados.cd} — ${r.passou ? "passou" : "falhou"}`;
	if (curado) {
		await r.teste.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `${cabecalho}. ${sucessos} sucessos seguidos: curado.` });
		await limparEstagio(actor, efeito);
		await efeito.delete({ t20cCurado: true });
		return;
	}
	await efeito.update({ [`flags.${MODULE_ID}.doenca`]: { ...dados, estagio, sucessos, tratamento: false, impedida: false } });
	const linhas = await aplicarEstagio(actor, efeito, estagio, { semNovaPerda: impedida });
	const resumo = estagio ? `Hoje: ${linhas.join("; ")}.` : "Hoje: sem efeito.";
	const extra = impedida ? ` ${explicarProgressaoImpedida(doenca, porCura)}` : r.passou ? ` ${sucessos} de ${doenca.cura ?? 2} sucessos seguidos para curar.` : "";
	await r.teste.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `${cabecalho}. ${resumo}${extra}` });
	const reinicio = doenca.estagios[estagio - 1]?.reinicia;
	if (reinicio) await efeito.update({ [`flags.${MODULE_ID}.doenca.estagio`]: 0 });
}

async function tratar(paciente, efeito, curandeiro) {
	const dados = dadosDe(efeito);
	const doenca = DOENCAS[dados?.chave];
	if (!doenca || !curandeiro) return ui.notifications.warn("Selecione o token de quem vai tratar.");
	if (!curandeiro.system?.pericias?.cura?.treinado) return ui.notifications.warn(`${curandeiro.name} precisa ser treinado em Cura para tratar doenças (JdA p. 117).`);
	const teste = await curandeiro.rollPericia("cura", { event: { shiftKey: shiftSemDialogo() }, message: false });
	if (!teste) return;
	const natural = teste.dice?.find((d) => d.faces === 20)?.total;
	const passou = natural === 20 || (natural !== 1 && teste.total >= dados.cd);
	await teste.toMessage({ speaker: ChatMessage.getSpeaker({ actor: curandeiro }), flavor: `Tratamento de ${doenca.nome} em ${paciente.name} (Cura contra CD ${dados.cd}) — ${passou ? "+5 no próximo teste de Fortitude contra a doença" : "não ajudou"}` });
	if (passou) await efeito.update({ [`flags.${MODULE_ID}.doenca.tratamento`]: true });
}

/**
 * Tiraram a condição Doente de quem tem a Praga Coral. "Até hoje nenhuma cura é conhecida; passar no teste de
 * Fortitude, bem como efeitos que curam doenças, apenas impedem a progressão da Praga naquele dia" (Ameaças
 * p. 358). O mestre decide se foi um efeito de cura ou se tira a doença mesmo; para jogadores, é efeito de cura.
 */
async function seguraPraga(efeito) {
	const actor = efeito.parent;
	const doenca = DOENCAS[dadosDe(efeito).chave];
	let tirar = false;
	if (game.user.isGM) {
		const escolha = await foundry.applications.api.DialogV2.wait({
			window: { title: `${doenca.nome}: ${actor.name}` },
			content: `<p>A ${doenca.nome} não tem cura conhecida: efeitos que curam doenças só impedem que ela avance naquele dia (Ameaças de Arton p. 358).</p><p>O que aconteceu?</p>`,
			buttons: [
				{ action: "cura", label: "Foi um efeito de cura (só segura o próximo dia)", default: true },
				{ action: "tirar", label: "Tirar a doença mesmo (decisão do mestre)" }
			],
			rejectClose: false
		});
		if (!escolha) return;
		tirar = escolha === "tirar";
	}
	if (tirar) {
		// O gancho de deleteActiveEffect limpa o efeito do dia.
		await efeito.delete({ t20cCurado: true });
		return ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `${doenca.nome}: o mestre tirou a doença de ${actor.name}.` });
	}
	await efeito.setFlag(MODULE_ID, "doenca.impedida", true);
	return ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		flavor: `${doenca.nome}: um efeito de cura não remove a doença de ${actor.name}, só impede que ela avance. No próximo teste do dia ela não progride, mesmo se o teste falhar (fica no estágio, sem nova perda de atributo).`
	});
}

/* -------------------------------------------- chat */

async function cartaoDoDia(actor) {
	const efeitos = efeitosDeDoenca(actor);
	if (!efeitos.length) return;
	const linhas = efeitos.map((e) => {
		const d = dadosDe(e);
		const doenca = DOENCAS[d.chave];
		const estado = d.estagio ? `estágio ${d.estagio}: ${descreverEstagio(doenca.estagios[d.estagio - 1])}` : "contaminado, ainda sem efeito";
		return `<li><strong>${doenca.nome}</strong> (CD ${d.cd}; ${estado}${d.tratamento ? "; +5 do tratamento" : ""})<br>
			<button type="button" data-t20c-doenca-teste="${e.id}">Teste de Fortitude do dia</button>
			<button type="button" data-t20c-doenca-tratar="${e.id}">Tratamento (Cura)</button></li>`;
	});
	await ChatMessage.create({
		speaker: ChatMessage.getSpeaker({ actor }),
		content: `<div class="t20c-doencas"><p>Início do dia: ${actor.name} está doente (JdA p. 318).</p><ul>${linhas.join("")}</ul></div>`,
		flags: { [MODULE_ID]: { doencas: { ator: actor.uuid } } }
	});
}

/** Doentes vivos: tokens da cena e atores do mundo (sem repetir o ator que só aparece pelo token sem vínculo). */
function doentes() {
	const atores = new Map();
	const vivo = (a) => a && !a.statuses?.has("morto") && efeitosDeDoenca(a).length;
	const tokens = canvas.scene?.tokens ?? [];
	for (const t of tokens) if (vivo(t.actor)) atores.set(t.actor.uuid, t.actor);
	for (const a of game.actors) {
		if (!vivo(a)) continue;
		// O token sem vínculo herda os efeitos do ator: já entrou pelo token.
		if (tokens.some((t) => !t.actorLink && t.actorId === a.id && t.actor && efeitosDeDoenca(t.actor).length)) continue;
		atores.set(a.uuid, a);
	}
	return [...atores.values()];
}

function alvosOuSelecionados() {
	const alvos = [...(game.user?.targets ?? [])].map((t) => t.actor).filter(Boolean);
	return alvos.length ? alvos : (canvas.tokens?.controlled ?? []).map((t) => t.actor).filter(Boolean);
}

function comandoDoenca(texto) {
	const resto = texto.replace(/^\/doen[çc]a\s*/i, "").trim();
	if (!resto) {
		const lista = Object.values(DOENCAS).map((d) => `${d.nome} (${d.transmissao}, CD ${d.cd})`).join("; ");
		return ChatMessage.create({ whisper: [game.user.id], content: `<p><strong>/doenca &lt;nome&gt; [cd N] [imediato]</strong> expõe os alvos marcados (ou os tokens selecionados). <strong>/doenca dia</strong> põe o teste do dia de cada doente no chat.</p><p>${lista}</p>` });
	}
	if (/^dia$/i.test(resto)) {
		const lista = doentes();
		if (!lista.length) return ui.notifications.info("Ninguém está doente.");
		return Promise.all(lista.map((a) => cartaoDoDia(a)));
	}
	const cd = Number(resto.match(/\bcd\s*(\d+)/i)?.[1]) || null;
	const imediato = /\bimediat[oa]\b/i.test(resto);
	const nome = resto.replace(/\bcd\s*\d+/i, "").replace(/\bimediat[oa]\b/i, "").trim();
	const chave = doencaPeloNome(nome);
	if (!chave) return ui.notifications.warn(`Doença "${nome}" não encontrada. Digite /doenca para ver a lista.`);
	const atores = alvosOuSelecionados();
	if (!atores.length) return ui.notifications.warn("Marque os alvos (ou selecione os tokens) que serão expostos.");
	return (async () => {
		for (const a of atores) await expor(a, chave, { cd, imediato });
	})();
}

export default {
	id: "doencas",
	name: "Doenças: exposição, teste do dia e cura",
	hint: "Exposição com Fortitude contra a CD; contaminado faz o teste no início de cada dia (cartão no chat depois do descanso, ou /doenca dia): falhou, sofre o efeito do dia e progride; passou, regride; dois sucessos seguidos curam. Tratamento com Cura dá +5. Botão de exposição no ataque das criaturas com a habilidade Doença; /doenca <nome> expõe os alvos. 20 doenças do JdA e das Ameaças de Arton (JdA p. 117 e 318).",
	init() {
		// Botões nos cartões: exposição no ataque de quem tem a habilidade Doença; teste e tratamento do dia.
		Hooks.on("renderChatMessageHTML", (message, html) => {
			try {
				const raiz = html instanceof HTMLElement ? html : html?.[0];
				if (!raiz) return;
				const dadosDia = message.getFlag(MODULE_ID, "doencas");
				if (dadosDia) {
					const actor = fromUuidSync(dadosDia.ator);
					for (const botao of raiz.querySelectorAll("[data-t20c-doenca-teste]")) {
						botao.addEventListener("click", async () => {
							const efeito = actor?.effects.get(botao.dataset.t20cDoencaTeste);
							if (!efeito) return ui.notifications.warn("Essa doença já foi curada.");
							if (!actor.isOwner) return ui.notifications.warn("Só o dono do personagem ou o mestre rola o teste.");
							if (efeito.getFlag(MODULE_ID, "cartaoTestado") === message.id) return ui.notifications.warn("O teste deste dia já foi feito.");
							await efeito.setFlag(MODULE_ID, "cartaoTestado", message.id);
							await testeDoDia(actor, efeito);
						});
					}
					for (const botao of raiz.querySelectorAll("[data-t20c-doenca-tratar]")) {
						botao.addEventListener("click", async () => {
							const efeito = actor?.effects.get(botao.dataset.t20cDoencaTratar);
							if (!efeito) return ui.notifications.warn("Essa doença já foi curada.");
							const curandeiro = canvas.tokens?.controlled?.map((t) => t.actor).find((a) => a && a !== actor) ?? game.user.character;
							await tratar(actor, efeito, curandeiro);
						});
					}
					return;
				}
				const itemId = message.content?.match(/data-item-id="([^"]+)"/)?.[1];
				const atacante = ChatMessage.getSpeakerActor(message.speaker);
				const item = atacante?.items?.get(itemId);
				if (!item || item.type !== "arma" || !game.user.isGM) return;
				const nomeArma = normalizar(item.name);
				const doencas = doencasDoAtor(atacante).filter((d) => d.gatilhos.some((g) => nomeArma.includes(g)));
				if (!doencas.length) return;
				const caixa = document.createElement("div");
				caixa.className = "t20c-doenca-expor";
				caixa.innerHTML = doencas.map((d) => `<button type="button" data-chave="${d.chave}" data-cd="${d.cd}">Se acertou, expor os alvos a ${DOENCAS[d.chave].nome} (Fort CD ${d.cd})</button>`).join("");
				for (const botao of caixa.querySelectorAll("button")) {
					botao.addEventListener("click", async () => {
						const atores = alvosOuSelecionados();
						if (!atores.length) return ui.notifications.warn("Marque os alvos (ou selecione os tokens) atingidos.");
						for (const a of atores) await expor(a, botao.dataset.chave, { cd: Number(botao.dataset.cd) });
					});
				}
				(raiz.querySelector(".card-content, .message-content") ?? raiz).appendChild(caixa);
			} catch (error) {
				warn("Falha ao montar os botões de doença.", error);
			}
		});
		// "/doenca …" (mestre).
		Hooks.on("chatMessage", (log, texto) => {
			if (!/^\/doen[çc]a\b/i.test(String(texto).trim())) return true;
			if (!game.user.isGM) {
				ui.notifications.warn("Só o mestre expõe criaturas a doenças.");
				return false;
			}
			Promise.resolve(comandoDoenca(String(texto).trim())).catch((error) => warn("Falha no comando /doenca.", error));
			return false;
		});
		// Teste do dia depois do descanso. Com a correção "Descanso" ligada, ela avisa pelo gancho (o wrapper
		// dela não chama o original); com ela desligada, este wrapper roda.
		Hooks.on("t20cDescanso", (actor) => cartaoDoDia(actor).catch((error) => warn("Falha ao montar o teste do dia.", error)));
		wrap("CONFIG.Actor.documentClass.prototype.descanso", async function (wrapped, ...args) {
			const resultado = await wrapped(...args);
			cartaoDoDia(this).catch((error) => warn("Falha ao montar o teste do dia.", error));
			return resultado;
		});
		// Praga Coral: tirar a condição Doente não cura (veja seguraPraga).
		Hooks.on("preDeleteActiveEffect", (efeito, options, userId) => {
			if (userId !== game.user.id || options.t20cDoenca || options.t20cCurado) return;
			const dados = dadosDe(efeito);
			if (DOENCAS[dados?.chave]?.cura !== "nenhuma" || efeito.parent?.documentName !== "Actor") return;
			seguraPraga(efeito).catch((error) => warn("Falha ao tratar a remoção da Praga Coral.", error));
			return false;
		});
		// Remover a condição Doente (Cura pelas Mãos, Santo Curandeiro…) cura: tira o efeito do dia.
		Hooks.on("deleteActiveEffect", (efeito, options, userId) => {
			if (userId !== game.user.id || options.t20cDoenca) return;
			const dados = dadosDe(efeito);
			const actor = efeito.parent;
			if (!dados?.chave || actor?.documentName !== "Actor") return;
			limparEstagio(actor, efeito).catch((error) => warn("Falha ao limpar o efeito da doença.", error));
			if (options.t20cCurado) return;
			const doenca = DOENCAS[dados.chave];
			const aviso = doenca.cura === "magica" ? " (A Podridão da Múmia só é curada por magia: confira se o efeito foi mágico.)" : "";
			ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), flavor: `${doenca.nome}: a condição Doente foi removida de ${actor.name}; a doença acabou.${aviso}` });
		});
		const modulo = game.modules.get(MODULE_ID);
		Hooks.once("ready", () => {
			modulo.api = { ...(modulo.api ?? {}), exporDoenca: expor, testeDaDoenca: testeDoDia, doencaPeloNome };
		});
	}
};
