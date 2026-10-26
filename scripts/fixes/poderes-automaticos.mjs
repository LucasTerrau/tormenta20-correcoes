import { MODULE_ID } from "../constants.mjs";
import { aprimoramentosAplicados, equipado } from "../magia/regras.mjs";
import { ehEspada } from "./proficiencia.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Poderes dos suplementos que traziam a nota "faça manualmente" e precisam de código (os que se resolvem
 * com dados estão em scripts/migracao/suplementos-efeitos.mjs):
 * - Estilo de Combate Arcano (Distinções, HdA p. 171): "Escolha um estilo… essa escolha não pode ser
 *   mudada". Ao receber o poder, o jogador escolhe; o outro estilo fica desligado.
 * - Encouraçado Místico ("se estiver de armadura") e Conjurador Encouraçado ("com armaduras pesadas", HdA
 *   p. 180): o efeito só vale com a armadura certa vestida. O mesmo mecanismo serve aos poderes do Jogo do
 *   Ano que exigem armadura, escudo ou arma (Encouraçado, Pele de Ferro, Esquiva Sagaz, os Estilos,
 *   Especialização em Armadura…; tabela em scripts/migracao/classes-dados.mjs).
 * - Língua Afiada (HdA p. 132): Audácia em Enganação, Diplomacia ou Intimidação custa –1 PM (mínimo 1).
 * - Ordens Agressivas (HdA p. 75): Gritar Ordens também soma o bônus na primeira rolagem de dano dos
 *   aliados (o bônus sai do efeito depois dessa rolagem).
 * - Força dos Titãs (Galokk, HdA): "role um dado extra, até um limite de dados extras igual à sua Força". O efeito
 *   vinha com "xY=Z" e a nota mandava editar à mão; o valor passa a ser "x<Força>=" (até Força dados extras no
 *   resultado máximo do dado), recalculado a cada preparo da ficha.
 * - Ataque Furtivo Letal (HdA p. 71): "sempre que rolar o resultado máximo ou um ponto abaixo em um dado
 *   da habilidade, role um dado extra" (dado que explode).
 * - Pose: Poder da Amizade (Deuses p. 100): PV temporários a cada turno; o cartão mantém o tipo (curatpv)
 *   que o sistema apagava ao montar o efeito.
 * - Opções com "aumenta" cuja quantidade vem da ficha (Conjuração Magibélica, Herói da Realidade, Arsenal
 *   do Caçador): o diálogo mostra a quantidade e não deixa passar dela.
 */
const ESCOLHA_UNICA = new Set([
	"Estilo de Combate Arcano",
	"Caminho do Arcanista",
	"Caminho do Cavaleiro",
	"Bênção da Justiça",
	"Resistência Elemental",
	"Linhagem Dracônica Básica",
	"Linhagem Dracônica Superior",
	// Escolhas da revisão dos poderes (dev/varredura/revisao-poderes-2.json): elemento, terreno, tabu, caminho.
	"Elemental",
	"Fonte Elemental",
	"Temperado pelo Clima",
	"Tabu",
	"Linhagem Dracônica",
	"Visconde",
	"Balística",
	"Afinidade",
	"Tradição Perdida"
]);
const PERICIAS_DA_LINGUA = new Set(["Enganação", "Diplomacia", "Intimidação"]);

/* -------------------------------------------- escolha única */

async function escolher(item) {
	// Opções marcadas com a flag "escolha" (Caminhos, tipos de dano) vêm todas desligadas; sem a flag, as
	// opções são os efeitos passivos do poder, todos ligados até alguém escolher.
	const passivos = item.effects.filter((e) => !e.system?.onuse);
	const marcadas = passivos.filter((e) => e.getFlag(MODULE_ID, "escolha"));
	const opcoes = marcadas.length > 1 ? marcadas : passivos;
	const ativas = opcoes.filter((e) => !e.disabled).length;
	// Já escolhido (pela correção ou desligando um à mão): não pergunta.
	if (item.getFlag(MODULE_ID, "escolha") || (marcadas.length > 1 ? ativas > 0 : ativas < 2)) return;
	const escolha = await foundry.applications.api.DialogV2.wait({
		window: { title: `${item.name}: escolha` },
		content: `<p>${item.actor?.name ?? ""}: escolha uma opção de <strong>${item.name}</strong>. A escolha não pode ser mudada depois.</p>`,
		buttons: opcoes.map((e, i) => ({ action: e.id, label: e.name, default: i === 0 })),
		rejectClose: false
	});
	if (!escolha) return;
	await item.updateEmbeddedDocuments("ActiveEffect", opcoes.map((e) => ({ _id: e.id, disabled: e.id !== escolha })));
	await item.setFlag(MODULE_ID, "escolha", escolha);
}

/** Quem decide pelo personagem: o jogador dono; sem jogador, o mestre. */
export function decideAqui(actor) {
	const jogadores = game.users.filter((u) => !u.isGM && actor.testUserPermission(u, "OWNER"));
	return jogadores.length ? jogadores.some((u) => u.isSelf) : game.user.isActiveGM;
}

/* -------------------------------------------- armadura exigida */

/**
 * Condições de equipamento (flags do efeito):
 * - requerArmadura: "pesada", "qualquer" (leve ou pesada), "semPesada" (leve ou nenhuma), "nenhuma"
 *   (escudo não conta como armadura), "escudo";
 * - requerArma: "duasMaos" (arma corpo a corpo de duas mãos, não leve), "umaArma" (uma arma corpo a corpo
 *   numa mão e nada na outra), "leveOuAgil" (arma corpo a corpo leve ou ágil), "fogo" (arma de fogo),
 *   "duasArmasLeve" (duas armas empunhadas, uma delas leve);
 * - requerMontaria: só com a condição Montado (deslocamento das montarias, "enquanto montado").
 * Valem pelo que está empunhado ou vestido agora.
 */
const MONTADO = "montado";

/** Defesa do escudo empunhado (Solidez: "aplica o bônus na Defesa recebido pelo escudo em testes de resistência"). */
function defesaDoEscudo(actor) {
	const slots = game.settings.get("tormenta20", "equipmentSlots");
	const escudo = (actor.itemTypes?.equipamento ?? []).find((i) => i.system?.tipo === "escudo" && (slots ? i.system.equipado2?.slot : i.system.equipado));
	return Number(escudo?.system?.armadura?.value) || 0;
}
function semEquipamentoExigido(effect) {
	const armaduraExigida = effect.getFlag?.(MODULE_ID, "requerArmadura");
	const armaExigida = effect.getFlag?.(MODULE_ID, "requerArma");
	// Deslocamento dos poderes de montaria ("Montaria: Cavalo", "Montaria: Pégaso"…) é o da montaria: só montado.
	const montariaExigida = effect.getFlag?.(MODULE_ID, "requerMontaria") || (/^Montaria:/.test(effect.parent?.name ?? "") && (effect.system?.changes ?? []).some((c) => /\.movement\./.test(c.key ?? "")));
	if (!armaduraExigida && !armaExigida && !montariaExigida) return false;
	const actor = effect.target ?? effect.parent?.actor;
	if (actor?.documentName !== "Actor") return false;
	// "Enquanto montado": vale com a condição Montado no personagem (o deslocamento da montaria não é o do cavaleiro a pé).
	if (montariaExigida && !actor.effects.some((e) => !e.disabled && e.statuses?.has(MONTADO))) return true;
	if (armaduraExigida) {
		const equipamentos = (actor.itemTypes?.equipamento ?? []).filter((i) => equipado(i));
		const tipo = equipamentos.find((i) => ["leve", "pesada"].includes(i.system?.tipo))?.system?.tipo;
		const escudo = equipamentos.some((i) => i.system?.tipo === "escudo");
		const ok = { pesada: tipo === "pesada", qualquer: Boolean(tipo), semPesada: tipo !== "pesada", nenhuma: !tipo, escudo }[armaduraExigida];
		if (ok === false) return true;
	}
	if (armaExigida) {
		const armas = (actor.itemTypes?.arma ?? []).filter((i) => equipado(i));
		const corpoACorpo = armas.filter((a) => a.system?.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0] === "luta" && !/^ataque desarmado$/i.test(a.name));
		const leve = (a) => a.system?.empunhadura === "leve";
		const agil = (a) => Boolean(a.system?.propriedades?.agi || a.system?.propriedades?.agil);
		const outraMao = armas.length > 1 || (actor.itemTypes?.equipamento ?? []).some((i) => equipado(i) && i.system?.tipo === "escudo");
		const ok = {
			duasMaos: corpoACorpo.some((a) => !leve(a) && (a.system?.empunhadura === "duas" || equipado(a, true))),
			umaArma: corpoACorpo.length === 1 && !outraMao && !equipado(corpoACorpo[0], true) && corpoACorpo[0].system?.empunhadura !== "duas",
			leveOuAgil: corpoACorpo.some((a) => leve(a) || agil(a)),
			fogo: armas.some((a) => a.system?.proficiencia === "fogo"),
			// Escola Ambidestra: duas armas empunhadas, pelo menos uma leve.
			duasArmasLeve: armas.filter((a) => !/^ataque desarmado$/i.test(a.name)).length >= 2 && armas.some((a) => !/^ataque desarmado$/i.test(a.name) && leve(a))
		}[armaExigida];
		if (ok === false) return true;
	}
	return false;
}

/** Efeito de uso preso a um tipo de arma (flag soComArma): vale só no ataque com ela. */
function armaAceita(effect, item) {
	// requerPoder: a opção só existe para quem tem o poder (Balística: o dano com Inteligência pede Estilo de Disparo).
	const poder = effect.getFlag?.(MODULE_ID, "requerPoder");
	if (poder && !item?.actor?.items?.some((i) => i.name === poder)) return false;
	const tipo = effect.getFlag?.(MODULE_ID, "soComArma");
	if (!tipo) return true;
	if (tipo === "espada") return ehEspada(item);
	// Arma de ataque à distância (o teste é de Pontaria).
	if (tipo === "distancia") return item?.type === "arma" && item.system?.rolls?.find((r) => r.type === "ataque")?.parts?.[1]?.[0] === "pont";
	return true;
}

/* -------------------------------------------- Força dos Titãs */

/** Valor do dano de uso da Força dos Titãs com a Força atual (só na memória: muda junto com a Força). */
function forcaDosTitas(actor) {
	const forca = Math.max(1, Number(actor.system?.atributos?.for?.value) || 0);
	for (const item of actor.itemTypes?.poder ?? []) {
		if (item.name !== "Força dos Titãs") continue;
		for (const ef of item.effects) {
			for (const change of ef.system?.changes ?? []) {
				if (change.key === "dano" && change.type === "custom" && /^x/.test(String(change.value))) change.value = `x${forca}=`;
			}
		}
	}
}

/* -------------------------------------------- uso */

function quantidadeMarcada(resultado, id) {
	const valor = resultado?.aprs?.[id]?.aplica ?? resultado?.[`aprs.${id}.aplica`];
	return valor === true ? 1 : Number(valor) || 0;
}

const ehFurtivo = (effect) => [effect?.name, effect?.parent?.name].some((n) => /^Ataque Furtivo$/.test(n ?? "")) && effect.system?.changes?.some((c) => c.key === "dano");

/** Ataque Furtivo Letal: os dados do Ataque Furtivo explodem no máximo ou um abaixo. */
function furtivoLetal(item, options) {
	if (item.type !== "arma" || !item.actor?.items.some((i) => i.name === "Ataque Furtivo Letal")) return;
	const furtivo = aprimoramentosAplicados(item, options).find(({ effect }) => ehFurtivo(effect));
	if (!furtivo) return;
	const doPoder = furtivo.effect.parent?.system?.rolls?.find((r) => r.type === "dano")?.parts?.[0];
	for (const rolagem of item.system.rolls.filter((r) => r.type === "dano")) {
		const i = rolagem.parts.findIndex((p) => p === doPoder || p?.[1] === "dano");
		if (i < 0) continue;
		const [formula, tipo, extra] = rolagem.parts[i];
		const nova = String(formula).replace(/(\d*)d(\d+)(?![\dx])/g, (m, n, f) => (Number(f) > 2 ? `${n}d${f}x>=${Number(f) - 1}` : m));
		rolagem.parts[i] = [nova, tipo, extra];
	}
}

/** Ordens Agressivas: o efeito do Gritar Ordens também soma o bônus no dano, só na primeira rolagem. */
function ordensAgressivas(item, options) {
	if (item.name !== "Gritar Ordens" || !item.actor?.items.some((i) => i.name === "Ordens Agressivas")) return;
	for (const lista of options.effects ?? []) {
		const efeito = Array.isArray(lista) ? lista[0] : lista;
		const changes = efeito?.system?.changes ?? [];
		const bonus = changes.filter((c) => c.key === "system.modificadores.pericias.geral").reduce((a, c) => a + (Number(c.value) || 0), 0);
		if (!bonus) continue;
		changes.push({ key: "system.modificadores.dano.geral", type: "add", value: String(bonus), phase: "initial", priority: null });
		foundry.utils.setProperty(efeito, `flags.${MODULE_ID}.primeiroDano`, true);
	}
}

async function consumirPrimeiroDano(actor) {
	const efeitos = actor?.effects.filter((e) => e.getFlag(MODULE_ID, "primeiroDano")) ?? [];
	if (!efeitos.length) return;
	await actor.updateEmbeddedDocuments(
		"ActiveEffect",
		efeitos.map((e) => ({
			_id: e.id,
			"system.changes": e._source.system.changes.filter((c) => c.key !== "system.modificadores.dano.geral"),
			[`flags.${MODULE_ID}.primeiroDano`]: false
		}))
	);
}

/** Efeitos marcados "manterFormula" (Poder da Amizade): o cartão leva as alterações gravadas, com o tipo. */
function manterFormulas(item, options) {
	for (const lista of options.effects ?? []) {
		const efeito = Array.isArray(lista) ? lista[0] : lista;
		if (!efeito?.flags?.[MODULE_ID]?.manterFormula) continue;
		const fonte = item.effects.get(efeito._id);
		if (fonte) efeito.system.changes = foundry.utils.deepClone(fonte._source.system.changes);
	}
}

function quantidadeDaFicha(actor, formula) {
	try {
		return Math.max(0, Math.floor(Roll.safeEval(Roll.replaceFormulaData(String(formula), actor.getRollData(), { missing: 0 }))));
	} catch {
		return null;
	}
}

export default {
	id: "poderesAutomaticos",
	name: "Poderes dos suplementos que eram feitos à mão",
	hint: "Estilo de Combate Arcano pede a escolha; Encouraçado Místico e Conjurador Encouraçado só valem com armadura; Língua Afiada barateia a Audácia; Ordens Agressivas soma o bônus no primeiro dano; Ataque Furtivo Letal explode os dados; Poder da Amizade dá PV temporários a cada turno.",
	init() {
		// @escudoDefesa nas fórmulas dos efeitos (Solidez).
		wrap("CONFIG.Actor.documentClass.prototype.getRollData", function (wrapped, ...args) {
			const data = wrapped(...args);
			try {
				if (data && this.type === "character") data.escudoDefesa = defesaDoEscudo(this);
			} catch (error) {
				warn("Falha ao calcular a Defesa do escudo.", error);
			}
			return data;
		});
		Hooks.on("createItem", (item, options, userId) => {
			if (userId !== game.userId || item.parent?.documentName !== "Actor" || !ESCOLHA_UNICA.has(item.name)) return;
			escolher(item).catch((error) => warn("Falha na escolha do poder.", error));
		});
		wrap("CONFIG.Actor.documentClass.prototype.applyActiveEffects", function (wrapped, phase, ...args) {
			const resultado = wrapped(phase, ...args);
			if (phase === "final") {
				try {
					forcaDosTitas(this);
				} catch (error) {
					warn("Falha ao preencher a Força dos Titãs.", error);
				}
			}
			return resultado;
		});
		wrap("CONFIG.ActiveEffect.dataModels.base.prototype.isSuppressed", function (wrapped, ...args) {
			return wrapped(...args) || semEquipamentoExigido(this.parent);
		});
		// Opções de uso com condição de equipamento (Estilo de Uma Arma, Escaramuça…) só aparecem quando valem; as de um
		// tipo de arma (flag soComArma: Espadachim Divino só com espadas) só no ataque com essa arma.
		wrap("CONFIG.Item.documentClass.prototype._allApplicableOnUseEffects", function (wrapped, ...args) {
			return wrapped(...args).filter((ef) => !semEquipamentoExigido(ef) && armaAceita(ef, this));
		});
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				if (resultado && item?.type === "pericia" && PERICIAS_DA_LINGUA.has(item.name) && item.actor?.items.some((i) => i.name === "Língua Afiada")) {
					const audacia = item.actor.items.getName("Audácia")?.effects.find((e) => e.system?.onuse);
					const custo = Number(item.system?.ativacao?.custo);
					if (audacia && quantidadeMarcada(resultado, audacia.id) && custo > 1) item.system.ativacao.custo = custo - 1;
				}
			} catch (error) {
				warn("Falha ao aplicar a Língua Afiada.", error);
			}
			return resultado;
		});
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html?.[0];
			const actor = app.item?.actor;
			if (!root || !actor) return;
			for (const input of root.querySelectorAll("input[name$='.aplica']")) {
				const effect = app.item.applicableOnUseEffects?.find((e) => e.id === input.name.split(".")[1]);
				const formula = effect?.getFlag(MODULE_ID, "aplicacoes");
				if (!formula) continue;
				const n = quantidadeDaFicha(actor, formula);
				if (n === null) continue;
				const li = input.closest("li") ?? input.parentElement;
				if (input.type === "number") input.max = n;
				li.dataset.t20cMaximo = String(n);
				const aviso = document.createElement("span");
				aviso.className = "t20c-maximo";
				aviso.textContent = ` (até ${n})`;
				aviso.style.cssText = "font-size: 0.85em; opacity: 0.8;";
				aviso.dataset.tooltip = `Quantidade pela ficha: ${formula}.`;
				(li.querySelector(".item-name") ?? li).append(aviso);
			}
		});
		wrap("CONFIG.Item.documentClass.prototype.displayCard", function (wrapped, config = {}, ...args) {
			if (config.options) {
				try {
					ordensAgressivas(this, config.options);
					manterFormulas(this, config.options);
				} catch (error) {
					warn("Falha ao montar o cartão do poder.", error);
				}
			}
			return wrapped(config, ...args);
		});
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", async function (wrapped, config = {}, ...args) {
			try {
				furtivoLetal(this, config.options ?? {});
			} catch (error) {
				warn("Falha ao aplicar o Ataque Furtivo Letal.", error);
			}
			const resultado = await wrapped(config, ...args);
			try {
				await consumirPrimeiroDano(this.actor);
			} catch (error) {
				warn("Falha ao consumir o bônus de Ordens Agressivas.", error);
			}
			return resultado;
		});
	},
	async ready() {
		// Personagens que já tinham o poder antes da correção: pede a escolha uma vez.
		for (const actor of game.actors.filter((a) => a.type === "character" && decideAqui(a))) {
			for (const item of actor.items.filter((i) => ESCOLHA_UNICA.has(i.name))) {
				escolher(item).catch((error) => warn("Falha na escolha do poder.", error));
			}
		}
		// Condição Montado (HUD do token): o sistema monta CONFIG.statusEffects do compêndio no ready, sem esperar.
		for (let i = 0; i < 100 && !CONFIG.statusEffects?.inconsciente; i++) await new Promise((r) => setTimeout(r, 100));
		if (!CONFIG.statusEffects?.[MONTADO]) {
			const img = "icons/environment/creatures/horse-brown.webp";
			const system = { changes: [], status: { category: "" } };
			CONFIG.statusEffects[MONTADO] = { id: MONTADO, name: "Montado", img, category: "", description: "Montado na sua montaria: vale o deslocamento dela.", system, _source: { name: "Montado", img, statuses: [MONTADO], system } };
		}
	}
};
