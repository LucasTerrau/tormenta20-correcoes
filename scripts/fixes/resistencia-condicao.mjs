/**
 * Bug: o botão de condição do cartão (Em Chamas da Explosão de Chamas, Imóvel do Campo de Força…)
 * aplica a condição em todos os tokens selecionados, mesmo nos que passariam na resistência.
 * Correção: se o efeito é uma condição e o cartão tem resistência com CD ("Reflexos parcial (CD 17)"),
 * o clique rola a resistência de cada token selecionado e só aplica em quem falhar. O resultado vai
 * para o chat. Efeitos que não são condição (Bênção, Escudo da Fé) seguem como no sistema.
 */
const PERICIAS = { fortitude: "fort", reflexos: "refl", vontade: "vont" };

function resistenciaDoCartao(message) {
	const texto = String(message.content ?? "")
		.replace(/<[^>]+>/g, " ")
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/\s+/g, " ");
	const m = texto.match(/Resistencia:\s*(Fortitude|Reflexos|Vontade)\b[^(]{0,40}\(CD (\d+)\)/i);
	if (!m) return null;
	const nome = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
	return { pericia: PERICIAS[m[1].toLowerCase()], nome, cd: Number(m[2]) };
}

/**
 * Cartões de item sem resistência no texto (armadura Assustadora, Hipnótica, Reluzente): procura no item
 * o aprimoramento de uso que gerou a condição, com "resistencia" e "atributoCD". CD = 10 + metade do
 * nível + atributo.
 */
function resistenciaDoItem(message, statuses) {
	const actorId = message.content?.match(/data-actor-id="([^"]+)"/)?.[1] ?? message.speaker?.actor;
	const itemId = message.content?.match(/data-item-id="([^"]+)"/)?.[1];
	const actor = ChatMessage.getSpeakerActor(message.speaker) ?? game.actors.get(actorId);
	const item = actor?.items.get(itemId);
	if (!item) return null;
	for (const ef of item.effects) {
		const changes = ef.system?.changes ?? [];
		const condicao = changes.find((c) => c.key === "condicao" && statuses.includes(String(c.value).toLowerCase().replace(/\s+/g, "")));
		const texto = changes.find((c) => c.key === "resistencia")?.value;
		const atributo = changes.find((c) => c.key === "atributoCD")?.value;
		const m = String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").match(/^(Fortitude|Reflexos|Vontade)/i);
		if (!condicao || !m || !atributo) continue;
		const nivel = Number(actor.system.attributes?.nivel?.value) || 1;
		const cd = 10 + Math.floor(nivel / 2) + (Number(actor.system.atributos?.[atributo]?.value) || 0);
		const nome = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
		return { pericia: PERICIAS[m[1].toLowerCase()], nome, cd };
	}
	return null;
}

async function aplicarComResistencia(message, efeitos, resistencia, tokens) {
	const shiftKey = game.settings.get("tormenta20", "UsageConfig") === "default";
	const nomes = efeitos.map((e) => e.name).join(", ");
	const dados = foundry.utils.deepClone(efeitos);
	if (dados[0]?.duration?.seconds) dados[0].duration.startTime = game.time.worldTime;
	for (const token of tokens) {
		const actor = token.actor;
		if (!actor) continue;
		// Indefeso "falha automaticamente em testes de Reflexos" (JdA p. 394).
		if (resistencia.pericia === "refl" && actor.statuses?.has("indefeso")) {
			await ChatMessage.create({
				speaker: ChatMessage.getSpeaker({ token: token.document }),
				flavor: `${resistencia.nome} (CD ${resistencia.cd}) contra ${nomes}: indefeso, falha automaticamente, fica ${nomes.toLowerCase()}`
			});
			await actor.createEmbeddedDocuments("ActiveEffect", foundry.utils.deepClone(dados), { toChat: true });
			continue;
		}
		const teste = await actor.rollPericia(resistencia.pericia, { event: { shiftKey }, message: false });
		if (!teste) continue;
		// 20 natural sempre passa e 1 natural sempre falha (JdA p. 227).
		const natural = teste.dice?.find((d) => d.faces === 20)?.total;
		const passou = natural === 20 || (natural !== 1 && teste.total >= resistencia.cd);
		await teste.toMessage({
			speaker: ChatMessage.getSpeaker({ token: token.document }),
			flavor: `${resistencia.nome} (CD ${resistencia.cd}) contra ${nomes}: ${passou ? "passou, não fica" : "falhou, fica"} ${nomes.toLowerCase()}`
		});
		if (!passou) await actor.createEmbeddedDocuments("ActiveEffect", foundry.utils.deepClone(dados), { toChat: true });
	}
}

export default {
	id: "resistenciaCondicao",
	name: "Condição pelo chat rola a resistência",
	hint: "O botão de condição do cartão de uma magia ou habilidade com resistência rola o teste de cada token selecionado contra a CD do cartão e só aplica a condição em quem falhar.",
	init() {
		Hooks.on("renderChatMessageHTML", (message, html) => {
			// Captura no cartão: roda antes do clique do sistema no botão.
			html.addEventListener(
				"click",
				(event) => {
					const botao = event.target.closest?.(".chat-apply-ae");
					if (!botao) return;
					const efeitos = message.flags?.tormenta20?.effects?.[botao.dataset.effectIndex];
					if (!efeitos?.some((e) => e.statuses?.length)) return;
					const statuses = efeitos.flatMap((e) => e.statuses ?? []);
					const resistencia = resistenciaDoCartao(message) ?? resistenciaDoItem(message, statuses);
					const tokens = canvas.tokens?.controlled ?? [];
					if (!resistencia || !tokens.length) return;
					event.preventDefault();
					event.stopImmediatePropagation();
					aplicarComResistencia(message, efeitos, resistencia, tokens);
				},
				{ capture: true }
			);
		});
	}
};
