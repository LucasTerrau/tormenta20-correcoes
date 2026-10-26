import { MODULE_ID } from "../constants.mjs";
import { alternativas } from "../fixes/atributos-dinamicos.mjs";
import { dadosDa, faltando } from "../fixes/subir-nivel.mjs";
import { Assistente } from "./assistente.mjs";
import { aplicarBonusDasConcessoes, erroDasConcessoes, escolhasDasConcessoes, fontesDeConcessao, renderConcessoes } from "./concessoes.mjs";
import { conteudo, dados, dadosDoItem } from "./fontes.mjs";
import { anotarParceiro, aplicarOpcao, busca, cartao, termo, erroDasEscolhas, escolhasDoNivel, expandirPericias, fixaComoEscolha, listaDeEscolhas, nomeEscola, nomePericia, oficios, periciaPorNome, seloPrerequisito, situacao } from "./pecas.mjs";
import { ATRIBUTOS, NOME_ATRIBUTO, PONTOS, SIGLA, custo, escapar, normalizar, pontosGastos, rolarAtributos } from "./regras.mjs";

/**
 * Assistente de criação de personagem (JdA p. 16–17, 85 e 140): atributos (pontos ou rolagem), raça, classe,
 * origem, divindade, perícias, magias, equipamento e toques finais. Aplica tudo de uma vez na ficha.
 */
const ITENS_DO_LIVRO = "Compendium.tormenta20-correcoes.itens-do-livro.Item.";
const sinal = (v) => (v > 0 ? `+${v}` : `${v}`);
const lista = (v) => [v ?? []].flat();

/** Quanto a raça aumenta o atributo: o modificador fixo (positivo), 0.5 se só dá para escolher, 0 se não aumenta. */
function aumentoDaRaca(raca, k) {
	const fixo = Number(raca.system?.atributos?.[k]) || 0;
	if (fixo > 0) return fixo;
	return temEscolhaDeAtributo(raca) && [...(raca.system.atributosDinamicos.value ?? [])].includes(k) ? 0.5 : 0;
}

/** Raça com atributos à escolha (Humano, Lefou…); o texto padrão aparece até nas que não têm. */
export function temEscolhaDeAtributo(raca) {
	const din = raca?.system?.atributosDinamicos;
	return Boolean(din?.description) && [...(din?.value ?? [])].length > 0;
}

function racaComoDocumento(raca) {
	const din = raca?.system?.atributosDinamicos ?? {};
	return { system: { atributos: raca?.system?.atributos ?? {}, atributosDinamicos: { value: new Set(din.value ?? []), description: din.description ?? "" } } };
}

export class CriacaoDePersonagem extends Assistente {
	static DEFAULT_OPTIONS = { window: { title: "Criar personagem", icon: "fa-solid fa-user-plus" } };

	get title() {
		return `Criar personagem: ${this.actor.name}`;
	}

	get rotuloConcluir() {
		return "Criar personagem";
	}

	async _prepareContext(options) {
		this.c ??= await conteudo();
		this.d ??= await dados();
		this.estado.metodo ??= "pontos";
		this.estado.base ??= Object.fromEntries(ATRIBUTOS.map((k) => [k, 0]));
		this.estado.nome ??= this.actor.name;
		return super._prepareContext(options);
	}

	/* ---------------------------------------- derivados */

	get raca() {
		return this.c.racas.find((r) => r.uuid === this.estado.raca);
	}

	get classe() {
		return this.d?.CLASSES?.[this.estado.classe];
	}

	get origem() {
		return this.semOrigem ? null : this.d?.ORIGENS?.[this.estado.origem];
	}

	/** Golem (Propósito de Criação): não tem origem. */
	get semOrigem() {
		return this.poderesDaRaca().some((p) => normalizar(p?.name) === "proposito de criacao");
	}

	poderesDaRaca() {
		return (this.raca?.system?.grants ?? []).flatMap((g) => (g.choices ?? []).map((c) => this.c.itens.find((i) => i.uuid === c.uuid))).filter(Boolean);
	}

	/** Poderes que o personagem recebe na criação e que dão outra escolha (Versátil, Estandarte Vivo…). */
	get fontes() {
		const e = this.estado;
		const cls = this.classe;
		const uuids = [];
		const o = this.origem;
		if (o && o.tipo !== "basica") {
			uuids.push(o.unico?.uuid);
			(o.poderes ?? []).forEach((p, i) => uuids.push((p.escolha ? p.escolha[Number(e.origemPoderes?.[i]) || 0] : p)?.uuid));
		}
		for (const b of this.beneficios()) if (b.startsWith("u:")) uuids.push(b.slice(2));
		(cls?.niveis?.["1"] ?? []).forEach((h, i) => uuids.push(h.uuid, h.escolha?.[Number(e.escolhas?.[`n1_${i}`])]?.uuid));
		if (this.caminho === "feiticeiro") uuids.push(cls?.linhagens?.[Number(e.linhagem)]?.basica?.uuid);
		uuids.push(...lista(e.poderConcedido));
		const itens = [...this.poderesDaRaca(), ...uuids.filter(Boolean).map((u) => this.c.itens.find((i) => i.uuid === u))];
		return fontesDeConcessao(this, itens.filter(Boolean));
	}

	get divindade() {
		return this.d?.DIVINDADES?.[this.estado.divindade];
	}

	get base() {
		if (this.estado.metodo === "rolagem") {
			const valores = this.estado.rolagem?.valores ?? [];
			return Object.fromEntries(ATRIBUTOS.map((k) => [k, valores[Number(this.estado.atribRolagem?.[k])] ?? 0]));
		}
		return this.estado.base;
	}

	/** Modificadores raciais finais (fixos + escolhidos). */
	get racial() {
		const fixos = this.raca?.system?.atributos ?? {};
		const aberta = game.settings.get("tormenta20", "openRaces");
		return Object.fromEntries(ATRIBUTOS.map((k) => [k, (aberta ? 0 : Number(fixos[k]) || 0) + (Number(this.estado.escolhaRacial?.[k]) || 0)]));
	}

	get atributos() {
		const racial = this.racial;
		return Object.fromEntries(ATRIBUTOS.map((k) => [k, (Number(this.base[k]) || 0) + racial[k]]));
	}

	/** Perícias treinadas, cada uma com a origem do treino. */
	get treinadas() {
		const mapa = new Map();
		const adicionar = (k, de) => k && !mapa.has(k) && mapa.set(k, de);
		const cls = this.classe;
		const P = this.d?.PERICIAS;
		(cls?.pericias?.fixas ?? []).forEach((f, i) => {
			const x = fixaComoEscolha(f, P);
			adicionar(Array.isArray(x) ? this.estado.fixas?.[i] : x, "classe");
		});
		this.periciasLivres().forEach((k) => adicionar(k, "classe"));
		// Habilidades do 1º nível que treinam perícias (Vassalo: Jovem Pajem).
		(cls?.niveis?.["1"] ?? []).forEach((h, i) => (h.treina ?? []).forEach((t, j) => adicionar(Array.isArray(t) ? this.estado.treina?.[`n1_${i}_${j}`] : t, "classe")));
		const o = this.origem;
		if (o && o.tipo !== "basica") this.periciasDaOrigem().forEach((x) => adicionar(x.pericia, "origem"));
		else
			this.beneficios()
				.filter((b) => b.startsWith("p:"))
				.forEach((b) => adicionar(b.slice(2), "origem"));
		// Perícias de poderes da raça e afins (Versátil, Memória Póstuma…).
		for (const { pericia, fonte } of escolhasDasConcessoes(this, this.fontes).pericias) adicionar(pericia, fonte);
		lista(this.estado.periciasInt).forEach((k) => adicionar(k, "Inteligência"));
		return mapa;
	}

	/** Perícias obrigatórias da classe já definidas (fixas e alternativas escolhidas) e se falta alguma alternativa. */
	obrigatoriasDaClasse() {
		const c = this.classe;
		const P = this.d?.PERICIAS;
		const definidas = new Set();
		let falta = false;
		(c?.pericias?.fixas ?? []).forEach((f, i) => {
			const x = fixaComoEscolha(f, P);
			const k = Array.isArray(x) ? this.estado.fixas?.[i] : x;
			if (k) definidas.add(k);
			else falta = true;
		});
		return { definidas, falta };
	}

	/**
	 * Perícias livres da classe: só as da lista da classe atual (trocar de classe não leva as antigas) e sem as que já
	 * são obrigatórias (trocar a alternativa não deixa repetida).
	 */
	periciasLivres() {
		const { definidas } = this.obrigatoriasDaClasse();
		const opcoes = new Set(expandirPericias(this.classe?.pericias?.opcoes, this.d?.PERICIAS));
		return lista(this.estado.periciasClasse).filter((k) => opcoes.has(k) && !definidas.has(k));
	}

	/** Perícias que a classe treina (obrigatórias, livres e as do 1º nível). */
	treinadasPelaClasse() {
		const set = new Set([...this.obrigatoriasDaClasse().definidas, ...this.periciasLivres()]);
		(this.classe?.niveis?.["1"] ?? []).forEach((h, i) => (h.treina ?? []).forEach((t, j) => {
			const k = Array.isArray(t) ? this.estado.treina?.[`n1_${i}_${j}`] : t;
			if (k) set.add(k);
		}));
		return set;
	}

	/** Lista de perícias da classe (obrigatórias e opções), para trocar a perícia repetida de uma origem especial. */
	listaDaClasse() {
		const P = this.d?.PERICIAS;
		const fixas = (this.classe?.pericias?.fixas ?? []).flatMap((f) => [f].flat());
		return [...new Set(expandirPericias([...fixas, ...(this.classe?.pericias?.opcoes ?? [])], P))];
	}

	/**
	 * Perícias da origem especial ou regional. "Se o benefício incluir treinamento em uma perícia na qual você já é
	 * treinado, você pode ser treinado em outra perícia de classe" (HdA p. 46): a repetida pede uma troca.
	 * @returns {{original, pericia, repetida}[]}  pericia = a que vale (a troca, se escolhida)
	 */
	periciasDaOrigem() {
		const o = this.origem;
		if (!o || (o.tipo ?? "basica") === "basica") return [];
		const daClasse = this.treinadasPelaClasse();
		return (o.pericias ?? [])
			.map((k) => (k === "ofic" ? this.estado.oficioOrigem : k))
			.filter(Boolean)
			.map((k) => {
				if (!daClasse.has(k)) return { original: k, pericia: k, repetida: false };
				const troca = this.estado.origemTroca?.[k];
				return { original: k, pericia: troca && !daClasse.has(troca) ? troca : null, repetida: true };
			});
	}

	/** Benefícios marcados que pertencem à origem atual (trocar de origem não leva os antigos). */
	beneficios() {
		const o = this.origem;
		if (!o || (o.tipo ?? "basica") !== "basica") return [];
		const daClasse = this.treinadasPelaClasse();
		const validos = new Set([
			...expandirPericias(o.pericias, this.d?.PERICIAS)
				.filter((k) => !daClasse.has(k))
				.map((k) => `p:${k}`),
			...[...(o.poderes ?? []), o.unico].filter((p) => p?.uuid).map((p) => `u:${p.uuid}`)
		]);
		return lista(this.estado.beneficios).filter((b) => validos.has(b));
	}

	/** Caminho do Arcanista escolhido ("bruxo", "feiticeiro", "mago") ou null. */
	get caminho() {
		const i = (this.classe?.niveis?.["1"] ?? []).findIndex((h) => h.novo === "t20cCamArcanista");
		if (i < 0) return null;
		const op = this.classe.niveis["1"][i].escolha?.[Number(this.estado.escolhas?.[`n1_${i}`])];
		return op ? normalizar(op.nome) : null;
	}

	/** Magias iniciais (o Mago começa com uma a mais). */
	get magiasIniciais() {
		const m = this.classe?.magias;
		if (!m) return 0;
		return Number(m.caminhos?.[this.caminho]?.iniciais) || Number(m.iniciais) || 0;
	}

	nomeDe(uuid) {
		return this.c.itens.find((i) => i.uuid === uuid)?.name ?? fromUuidSync(uuid)?.name ?? "";
	}

	contexto() {
		const nomes = new Set();
		for (const g of this.raca?.system?.grants ?? []) for (const ch of g.choices ?? []) nomes.add(normalizar(this.nomeDe(ch.uuid)));
		for (const h of this.classe?.niveis?.["1"] ?? []) if (h.nome) nomes.add(normalizar(h.nome));
		for (const b of this.beneficios()) if (b.startsWith("u:")) nomes.add(normalizar(this.nomeDe(b.slice(2))));
		for (const uuid of lista(this.estado.poderConcedido)) nomes.add(normalizar(this.nomeDe(uuid)));
		for (const uuid of escolhasDasConcessoes(this, this.fontes).poderes) nomes.add(normalizar(this.nomeDe(uuid)));
		if (this.classe?.magias) nomes.add("magias");
		return {
			atributos: this.atributos,
			nivel: 1,
			niveis: this.estado.classe ? { [this.estado.classe]: 1 } : {},
			pericias: new Set(this.treinadas.keys()),
			periciaPorNome: (n) => periciaPorNome(n, this.d?.PERICIAS),
			nomes,
			nomesConhecidos: new Set(this.c.poderes.map((p) => normalizar(p.name)))
		};
	}

	/* ---------------------------------------- passos */

	get passos() {
		return [PASSO_ATRIBUTOS, PASSO_RACA, PASSO_CLASSE, PASSO_ORIGEM, PASSO_DIVINDADE, PASSO_CONCESSOES, PASSO_PERICIAS, PASSO_MAGIAS, PASSO_EQUIPAMENTO, PASSO_FINAL];
	}

	/* ---------------------------------------- aplicar */

	async aplicar() {
		const actor = this.actor;
		const e = this.estado;
		const cls = this.classe;
		const dinheiroDaOrigem = (this.origem?.itens ?? []).reduce((s, it) => s + (Number(it.dinheiro) || 0), 0);
		const divindade = this.divindade?.nome ?? (e.divindade === "panteao" ? "Panteão" : e.divindade === "bem" ? "O bem" : "");
		const update = { name: e.nome || actor.name, "system.detalhes.origem": this.origem?.nome ?? "", "system.detalhes.divindade": divindade, "system.dinheiro.tp": (Number(e.dinheiro) || 0) + dinheiroDaOrigem };
		for (const k of ATRIBUTOS) update[`system.atributos.${k}.base`] = Number(this.base[k]) || 0;
		for (const k of this.treinadas.keys()) update[`system.pericias.${k}.treinado`] = true;
		await actor.update(update);

		// Raça: os modificadores escolhidos vão prontos para a correção de atributos dinâmicos.
		const raca = await dadosDoItem(e.raca);
		if (raca) await actor.createEmbeddedDocuments("Item", [raca], { t20cRacial: this.racial });

		// Classe e habilidades do 1º nível.
		const classe = await dadosDoItem(cls.uuid, { system: { niveis: 1, inicial: true } });
		const [criada] = await actor.createEmbeddedDocuments("Item", [classe], { t20cAssistente: true });
		const itens = [];
		const nomes = new Set(actor.items.map((i) => i.name));
		const adicionar = async (uuid, extra = {}) => {
			const dadosItem = await dadosDoItem(uuid, extra);
			if (!dadosItem || nomes.has(dadosItem.name)) return null;
			nomes.add(dadosItem.name);
			itens.push(dadosItem);
			return dadosItem;
		};
		for (const [i, h] of (cls.niveis?.["1"] ?? []).entries()) {
			if (h.uuid && !h.poder && !h.melhora) await adicionar(h.uuid);
			// Escolha dentro do nível (Escola de Duelo…): cria a opção escolhida.
			const op = h.escolha?.[Number(e.escolhas?.[`n1_${i}`])];
			if (op?.uuid) await adicionar(op.uuid);
		}
		for (const h of criada ? faltando(actor, criada) : []) {
			if (nomes.has(h.nome)) continue;
			const dadosItem = await dadosDa(h);
			if (dadosItem) {
				nomes.add(dadosItem.name);
				itens.push(dadosItem);
			}
		}
		// Itens de escolha do módulo (Caminho do Arcanista): liga o efeito da opção escolhida.
		for (const [i, h] of (cls.niveis?.["1"] ?? []).entries()) {
			const op = h.novo && h.escolha?.[Number(e.escolhas?.[`n1_${i}`])];
			const item = op && itens.find((x) => x.flags?.[MODULE_ID]?.itemDoLivro === h.novo);
			if (item) aplicarOpcao(item, op.nome, actor.system.tracos?.tamanho);
		}
		// O Feiticeiro ganha a herança básica da linhagem.
		const linhagem = cls.linhagens?.[Number(e.linhagem)];
		if (this.caminho === "feiticeiro" && linhagem?.basica?.uuid) await adicionar(linhagem.basica.uuid);
		// Origem: benefícios escolhidos (comum) ou o poder único e os poderes fixos ou à escolha (Heróis e Atlas), e os itens.
		const origem = this.origem;
		if (origem && origem.tipo !== "basica") {
			if (origem.unico?.uuid) await adicionar(origem.unico.uuid);
			for (const [i, poder] of (origem.poderes ?? []).entries()) {
				const escolhido = poder.escolha ? poder.escolha[Number(e.origemPoderes?.[i]) || 0] : poder;
				if (escolhido?.uuid) await adicionar(escolhido.uuid);
			}
		}
		for (const b of this.beneficios()) if (b.startsWith("u:")) await adicionar(b.slice(2));
		for (const [i, item] of (origem?.itens ?? []).entries()) {
			const escolhido = item.escolha ? item.escolha[Number(e.origemItens?.[i]) || 0] : item;
			if (escolhido?.dinheiro) continue;
			const uuid = escolhido?.uuid ?? this.c.porNome.get(normalizar(escolhido?.nome))?.uuid;
			const criado = uuid ? await adicionar(uuid, escolhido.qtd ? { system: { qtd: escolhido.qtd } } : {}) : null;
			// Animais comprados são parceiros iniciantes (JdA p. 162).
			if (criado && escolhido.animal) anotarParceiro(criado, `${escolhido.nome}, da origem ${origem.nome}: parceiro iniciante.`);
		}
		// Divindade (clérigo, druida, paladino e frade recebem dois poderes concedidos).
		for (const uuid of lista(e.poderConcedido)) await adicionar(uuid);
		// Poderes que outros poderes dão (Versátil, Estandarte Vivo…); as perícias já entraram com as treinadas.
		const concessoes = escolhasDasConcessoes(this, this.fontes);
		for (const uuid of concessoes.poderes) await adicionar(uuid);
		// Magias.
		for (const uuid of lista(e.magias)) await adicionar(uuid);
		// Equipamento inicial (JdA p. 140) e o ataque desarmado, que todo personagem tem (a Briga e o Estilo Desarmado
		// aumentam o dado dele pela correção de armas).
		for (const nome of ["ataque desarmado", "mochila", "saco de dormir", "traje de viajante"]) {
			const uuid = this.c.porNome.get(nome)?.uuid;
			if (uuid) await adicionar(uuid);
		}
		for (const uuid of [e.arma, e.marcial, e.armadura]) if (uuid) await adicionar(uuid);
		if (e.escudo) await adicionar(this.c.porNome.get("escudo leve")?.uuid);
		if (itens.length) await actor.createEmbeddedDocuments("Item", itens, { t20cAssistente: true });
		await aplicarBonusDasConcessoes(actor, concessoes.bonus, this.d?.PERICIAS);
		// Armadura e escudo vestidos; PV e PM cheios.
		const vestir = actor.items.filter((i) => i.type === "equipamento" && ["leve", "pesada", "escudo"].includes(i.system?.tipo)).map((i) => ({ _id: i.id, "system.equipado": true }));
		if (vestir.length) await actor.updateEmbeddedDocuments("Item", vestir);
		await actor.update({ "system.attributes.pv.value": Number(actor.system.attributes.pv.max) || 0, "system.attributes.pm.value": Number(actor.system.attributes.pm.max) || 0 });
		// Escolhas permanentes que o subir de nível precisa saber.
		await actor.update({ [`flags.${MODULE_ID}.criadoPeloAssistente`]: true, [`flags.${MODULE_ID}.caminho`]: this.caminho ?? null, [`flags.${MODULE_ID}.escolasDeMagia`]: lista(e.escolas) });
		ui.notifications.info(`${actor.name} está pronto para a aventura.`);
		actor.sheet?.render(true);
	}
}

/* -------------------------------------------- 1. atributos */

const PASSO_ATRIBUTOS = {
	id: "atributos",
	titulo: "Atributos",
	dica: "Pontos: todos começam em 0 e você tem 10 pontos (Tabela 1-1); cada atributo baixado para –1 dá 1 ponto a mais. Rolagem: 4d6 sem o menor dado, seis vezes, distribuídos como quiser (JdA p. 17).",
	render(app) {
		const e = app.estado;
		const racial = app.racial;
		const metodo = `<div class="t20c-alternador">
			<button type="button" data-campo="metodo" data-valor="pontos" class="${e.metodo === "pontos" ? "ativo" : ""}"><i class="fa-solid fa-coins"></i> Pontos</button>
			<button type="button" data-campo="metodo" data-valor="rolagem" class="${e.metodo === "rolagem" ? "ativo" : ""}"><i class="fa-solid fa-dice"></i> Rolagem</button>
		</div>`;
		if (e.metodo === "pontos") {
			const gastos = pontosGastos(e.base);
			const linhas = ATRIBUTOS.map((k) => {
				const v = Number(e.base[k]) || 0;
				const caro = v < 4 && custo(v + 1) - custo(v) > PONTOS - gastos;
				return `<tr><th>${NOME_ATRIBUTO[k]}</th>
					<td><button type="button" class="t20c-mini" data-acao="menos" data-atr="${k}" ${v <= -1 ? "disabled" : ""}>−</button>
					<span class="t20c-valor">${sinal(v)}</span>
					<button type="button" class="t20c-mini" data-acao="mais" data-atr="${k}" ${v >= 4 || caro ? "disabled" : ""}>+</button></td>
					<td class="t20c-mudo">${custo(v)} pt</td>
					<td class="t20c-mudo">${racial[k] ? `${sinal(racial[k])} raça` : ""}</td>
					<td class="t20c-total">${sinal(app.atributos[k])}</td></tr>`;
			}).join("");
			return `${metodo}<p class="t20c-pontos ${gastos > PONTOS ? "nao" : ""}">Pontos: <strong>${PONTOS - gastos}</strong> de ${PONTOS} restantes</p>
				<table class="t20c-atributos"><thead><tr><th></th><th>Valor</th><th>Custo</th><th>Raça</th><th>Total</th></tr></thead><tbody>${linhas}</tbody></table>`;
		}
		const r = e.rolagem;
		if (!r) return `${metodo}<p><button type="button" data-acao="rolar" class="t20c-principal"><i class="fa-solid fa-dice"></i> Rolar atributos</button></p>`;
		const opcoes = r.valores.map((v, i) => [i, `${sinal(v)} (rolou ${r.rolagens[i]})`]);
		const usados = Object.values(e.atribRolagem ?? {}).filter((x) => x !== "");
		const linhas = ATRIBUTOS.map((k) => {
			const atual = e.atribRolagem?.[k] ?? "";
			return `<tr><th>${NOME_ATRIBUTO[k]}</th><td><select data-campo="atribRolagem.${k}"><option value="">—</option>${opcoes
				.map(([i, rotulo]) => `<option value="${i}" ${String(atual) === String(i) ? "selected" : ""} ${usados.includes(String(i)) && String(atual) !== String(i) ? "disabled" : ""}>${rotulo}</option>`)
				.join("")}</select></td><td class="t20c-mudo">${racial[k] ? `${sinal(racial[k])} raça` : ""}</td><td class="t20c-total">${sinal(app.atributos[k])}</td></tr>`;
		}).join("");
		return `${metodo}<p>Rolagens: ${r.rolagens.map((t, i) => `<span class="t20c-chip">${t} → ${sinal(r.valores[i])}</span>`).join(" ")} <button type="button" class="t20c-mini" data-acao="rolar" title="Rolar de novo"><i class="fa-solid fa-rotate"></i></button></p>
			<table class="t20c-atributos"><thead><tr><th></th><th>Valor</th><th>Raça</th><th>Total</th></tr></thead><tbody>${linhas}</tbody></table>`;
	},
	erro(app) {
		const e = app.estado;
		if (e.metodo === "pontos") {
			if (pontosGastos(e.base) > PONTOS) return "Você gastou mais de 10 pontos.";
			return null;
		}
		if (!e.rolagem) return "Role os atributos.";
		const usados = ATRIBUTOS.map((k) => e.atribRolagem?.[k]).filter((x) => x !== undefined && x !== "");
		if (usados.length < 6 || new Set(usados).size < 6) return "Distribua cada rolagem em um atributo.";
		return null;
	},
	acoes: {
		mais(app, el) {
			const k = el.dataset.atr;
			app.estado.base[k] = Math.min(4, (Number(app.estado.base[k]) || 0) + 1);
		},
		menos(app, el) {
			const k = el.dataset.atr;
			const novo = (Number(app.estado.base[k]) || 0) - 1;
			app.estado.base[k] = Math.max(-1, novo);
		},
		async rolar(app) {
			const r = await rolarAtributos();
			app.estado.rolagem = { rolagens: r.rolagens, valores: r.valores };
			app.estado.atribRolagem = {};
			await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: app.actor }), flavor: `Atributos (4d6, descarta o menor): ${r.rolagens.join(", ")} → ${r.valores.map(sinal).join(", ")}`, rolls: r.rolls });
		}
	}
};

/* -------------------------------------------- 2. raça */

const PASSO_RACA = {
	id: "raca",
	titulo: "Raça",
	dica: "A raça modifica seus atributos e dá habilidades raciais (JdA cap. 1).",
	render(app) {
		// Filtro "aumenta": a raça precisa aumentar todos os atributos marcados (fixo ou à escolha); as de bônus fixo
		// vêm primeiro, das que mais aumentam para as que menos.
		const filtro = lista(app.estado.filtroRaca);
		const soFixo = Boolean(app.estado.filtroRacaFixo);
		const vale = (r, k) => (soFixo ? aumentoDaRaca(r, k) >= 1 : aumentoDaRaca(r, k) > 0);
		const peso = (r) => filtro.reduce((s, k) => s + aumentoDaRaca(r, k), 0);
		const todas = [...app.c.racas];
		const racas = todas.filter((r) => filtro.every((k) => vale(r, k))).sort((a, b) => peso(b) - peso(a) || a.name.localeCompare(b.name));
		const filtros = `<div class="t20c-filtros"><span>Aumenta:</span>
			<div class="t20c-alternador">${ATRIBUTOS.map((k) => `<button type="button" data-campo="filtroRaca" data-lista data-valor="${k}" class="${filtro.includes(k) ? "ativo" : ""}" data-tooltip="Raças que aumentam ${NOME_ATRIBUTO[k] ?? SIGLA[k]}">${SIGLA[k]} <small>${todas.filter((r) => vale(r, k)).length}</small></button>`).join("")}</div>
			<label class="t20c-check"><input type="checkbox" data-campo="filtroRacaFixo" ${soFixo ? "checked" : ""}> Só bônus fixo (sem as de atributo à escolha)</label>
		</div>`;
		const resumo = (r) =>
			ATRIBUTOS.filter((k) => r.system?.atributos?.[k])
				.map((k) => `${SIGLA[k]} ${sinal(r.system.atributos[k])}`)
				// O texto da escolha vem preenchido até em raças sem escolha (Anão): só conta com atributos para escolher.
				.concat(temEscolhaDeAtributo(r) ? [escapar(r.system.atributosDinamicos.description)] : [])
				.join(", ");
		const cartoes = racas.map((r) => cartao({ campo: "raca", valor: r.uuid, nome: r.name, img: r.img, sub: `${resumo(r)}<br>${escapar(r.livro)}`, selecionado: r.uuid === app.estado.raca, dica: { uuid: r.uuid } })).join("");
		let detalhe = "";
		const raca = app.raca;
		if (raca) {
			const aberta = game.settings.get("tormenta20", "openRaces");
			const din = raca.system?.atributosDinamicos ?? {};
			const escolhiveis = aberta ? ATRIBUTOS : (din.value ?? []);
			const poderes = (raca.system?.grants ?? []).flatMap((g) => (g.choices ?? []).map((c) => [app.nomeDe(c.uuid), c.uuid])).filter(([n]) => n);
			detalhe = `<div class="t20c-detalhe"><h3>${escapar(raca.name)}</h3>
				${poderes.length ? `<p><strong>Habilidades raciais:</strong> ${poderes.map(([n, u]) => termo(n, u)).join(" ")}</p>` : ""}
				${
					escolhiveis.length
						? `<p><strong>Escolha:</strong> ${escapar(aberta ? "Raças Abertas: distribua os modificadores da raça" : din.description)}</p>
					<div class="t20c-linha">${escolhiveis
						.map((k) => `<label class="t20c-num">${SIGLA[k]} <input type="number" step="1" ${aberta ? "" : 'min="0"'} data-campo="escolhaRacial.${k}" value="${Number(app.estado.escolhaRacial?.[k]) || 0}"></label>`)
						.join("")}</div>`
						: ""
				}</div>`;
		}
		const vazio = racas.length ? "" : `<p class="t20c-vazio">Nenhuma raça aumenta ${filtro.map((k) => SIGLA[k]).join(" e ")}${soFixo ? " com bônus fixo" : ""}.</p>`;
		return `${detalhe}${filtros}${busca(".t20c-cartao")}${vazio}<div class="t20c-cartoes">${cartoes}</div>`;
	},
	erro(app) {
		const raca = app.raca;
		if (!raca) return "Escolha uma raça.";
		const aberta = game.settings.get("tormenta20", "openRaces");
		const din = raca.system?.atributosDinamicos ?? {};
		if (!aberta && !(din.value ?? []).length) return null;
		const opcoes = alternativas(racaComoDocumento(raca), aberta);
		if (!opcoes) return null;
		const valores = ATRIBUTOS.map((k) => Number(app.estado.escolhaRacial?.[k]) || 0).filter((v) => v);
		const escolha = (aberta ? valores : valores).sort((a, b) => b - a).join(",");
		return opcoes.includes(escolha) ? null : `Escolha os atributos da raça conforme a regra (${escapar(aberta ? "Raças Abertas" : din.description)}).`;
	}
};

/* -------------------------------------------- 3. classe */

const DEVOCAO = { obrigatoria: "Devoção obrigatória", proibida: "Não pode ter devoção" };

const PASSO_CLASSE = {
	id: "classe",
	titulo: "Classe",
	dica: "A classe define seus pontos de vida e de mana, perícias, proficiências e habilidades. As classes variantes da Heróis de Arton substituem a classe básica (JdA cap. 1; HdA cap. 1).",
	render(app) {
		if (!app.d?.CLASSES) return `<p class="t20c-aviso">As tabelas de classes ainda não foram geradas (scripts/criador/dados.mjs).</p>`;
		const P = app.d.PERICIAS;
		const classes = Object.entries(app.d.CLASSES).sort((a, b) => a[1].nome.localeCompare(b[1].nome));
		const cartoes = classes
			.map(([slug, c]) => {
				const img = app.c.itens.find((i) => i.uuid === c.uuid)?.img;
				const base = c.variante ? `variante de ${escapar(app.d.CLASSES[c.variante]?.nome ?? c.variante)} · ` : "";
				return cartao({ campo: "classe", valor: slug, nome: c.nome, img, sub: `PV ${c.pv?.inicial} + Con, ${c.pv?.porNivel}/nível · PM ${c.pm?.porNivel}/nível<br>${base}${escapar(c.fonte ?? "")}`, selecionado: slug === app.estado.classe, dica: { uuid: c.uuid } });
			})
			.join("");
		const c = app.classe;
		let detalhe = "";
		if (c) {
			const fixas = (c.pericias?.fixas ?? [])
				.map((f, i) => {
					const x = fixaComoEscolha(f, P);
					return Array.isArray(x)
						? `<span class="t20c-ou">${x.map((k) => `<label><input type="radio" name="fixa${i}" data-campo="fixas.${i}" value="${k}" ${app.estado.fixas?.[i] === k ? "checked" : ""}> ${escapar(nomePericia(app, k))}</label>`).join(" ou ")}</span>`
						: `<span class="t20c-chip">${escapar(nomePericia(app, x))}</span>`;
				})
				.join(" ");
			// Livres sem as obrigatórias; a lista guardada é limpa para o limite (data-max) contar certo.
			const { definidas, falta } = app.obrigatoriasDaClasse();
			const escolhidas = (app.estado.periciasClasse = app.periciasLivres());
			const opcoes = [...new Set(expandirPericias(c.pericias?.opcoes, P))]
				.filter((k) => !definidas.has(k))
				.map((k) => `<label class="t20c-check ${falta ? "t20c-mudo" : ""}"><input type="checkbox" data-campo="periciasClasse" data-lista data-max="${c.pericias.escolha}" value="${k}" ${escolhidas.includes(k) ? "checked" : ""} ${falta ? "disabled" : ""}> ${escapar(nomePericia(app, k))}</label>`)
				.join("");
			const nivel1 = (c.niveis?.["1"] ?? [])
				.map((h) => (h.poder ? '<span class="t20c-chip">Poder de classe</span>' : `${termo(`${h.nome}${h.detalhe ? ` ${h.detalhe}` : ""}`, h.uuid ?? (h.novo ? ITENS_DO_LIVRO + h.novo : null))}${h.uuid || h.novo || h.escolha ? "" : ' <small class="t20c-mudo">(adicione à mão)</small>'}`))
				.join(" ");
			const regra = c.devocaoRegra?.nota;
			detalhe = `<div class="t20c-detalhe"><h3>${escapar(c.nome)}</h3>
				<p><strong>PV:</strong> ${c.pv?.inicial} + Constituição (${c.pv?.porNivel} + Con por nível) · <strong>PM:</strong> ${c.pm?.porNivel} por nível${c.proficiencias?.length ? ` · <strong>Proficiências:</strong> ${c.proficiencias.join(", ")}` : ""}</p>
				<p><strong>Perícias obrigatórias:</strong> ${fixas}</p>
				${c.pericias?.escolha ? `<p><strong>Mais ${c.pericias.escolha} à escolha</strong> (${escolhidas.length}/${c.pericias.escolha})${falta ? ' <span class="t20c-aviso">Escolha primeiro entre as obrigatórias acima.</span>' : ""}:</p><div class="t20c-grade">${opcoes}</div>` : ""}
				<p><strong>1º nível:</strong> ${nivel1 || "—"}</p>
				${escolhasDoNivel(app, c, 1, "n1_")}
				${c.magias ? `<p><strong>Magias:</strong> ${c.magias.tipo === "arc" ? "arcanas" : "divinas"}, ${app.magiasIniciais} no 1º nível.</p>` : ""}
				${c.devocao ? `<p class="t20c-mudo">${DEVOCAO[c.devocao] ?? escapar(c.devocao)}${regra ? `: ${escapar(regra)}` : "."}</p>` : ""}
				${c.nota ? `<p class="t20c-mudo">${escapar(c.nota)}</p>` : ""}
			</div>`;
		}
		return `${detalhe}${busca(".t20c-cartao")}<div class="t20c-cartoes">${cartoes}</div>`;
	},
	erro(app) {
		const c = app.classe;
		if (!c) return "Escolha uma classe.";
		const P = app.d?.PERICIAS;
		const faltaFixa = (c.pericias?.fixas ?? []).some((f, i) => Array.isArray(fixaComoEscolha(f, P)) && !app.estado.fixas?.[i]);
		if (faltaFixa) return "Escolha entre as perícias alternativas da classe.";
		if (app.periciasLivres().length < (c.pericias?.escolha ?? 0)) return `Escolha ${c.pericias.escolha} perícias da classe.`;
		return erroDasEscolhas(app, c, 1, "n1_");
	}
};

/* -------------------------------------------- 4. origem */

const TIPO_ORIGEM = { basica: "Origens comuns (Jogo do Ano)", especial: "Origens de Heróis de Arton", regional: "Origens regionais (Atlas de Arton)" };

const PASSO_ORIGEM = {
	id: "origem",
	visivel: (app) => !app.semOrigem,
	titulo: "Origem",
	dica: "Origem comum: os itens e dois benefícios da lista (duas perícias, dois poderes ou uma de cada; o poder único só para quem tem a origem). As origens de Heróis de Arton e as regionais do Atlas entram no lugar da comum e dão um benefício fixo; a regional exige ser nativo da região (JdA p. 85; HdA p. 46; Atlas p. 470).",
	render(app) {
		if (!app.d?.ORIGENS) return `<p class="t20c-aviso">As tabelas de origens ainda não foram geradas.</p>`;
		const grupos = Object.keys(TIPO_ORIGEM)
			.map((tipo) => {
				const origens = Object.entries(app.d.ORIGENS)
					.filter(([, o]) => (o.tipo ?? "basica") === tipo)
					.sort((a, b) => a[1].nome.localeCompare(b[1].nome));
				if (!origens.length) return "";
				const cartoes = origens.map(([slug, o]) => cartao({ campo: "origem", valor: slug, nome: o.nome, sub: escapar([o.regiao, o.fonte].filter(Boolean).join(" · ")), selecionado: slug === app.estado.origem, dica: { origem: slug } })).join("");
				return `<section class="t20c-grupo"><h3 class="t20c-subtitulo">${TIPO_ORIGEM[tipo]}</h3><div class="t20c-cartoes t20c-cartoes-texto">${cartoes}</div></section>`;
			})
			.join("");
		const o = app.origem;
		let detalhe = "";
		if (o) {
			const P = app.d.PERICIAS;
			const itens = (o.itens ?? [])
				.map((it, i) =>
					it.escolha
						? `<label>Escolha: <select data-campo="origemItens.${i}">${it.escolha.map((x, j) => `<option value="${j}" ${Number(app.estado.origemItens?.[i]) === j ? "selected" : ""}>${escapar(x.nome)}</option>`).join("")}</select></label>`
						: `<span class="t20c-chip" ${it.uuid ? `data-dica-uuid="${escapar(it.uuid)}"` : ""}>${escapar(it.nome)}${it.qtd ? ` ×${it.qtd}` : ""}${it.uuid || it.dinheiro ? "" : " <small>(à mão)</small>"}</span>`
				)
				.join(" ");
			if ((o.tipo ?? "basica") === "basica") {
				const marcados = app.beneficios();
				const ctx = app.contexto();
				// Perícia que a classe já treina não pode ser um benefício (seria escolhida duas vezes).
				const daClasse = app.treinadasPelaClasse();
				app.estado.beneficios = marcados;
				const pericias = [...new Set(expandirPericias(o.pericias, P))]
					.map((k) => {
						const repetida = daClasse.has(k);
						return `<label class="t20c-check ${repetida ? "t20c-mudo" : ""}"><input type="checkbox" data-campo="beneficios" data-lista data-max="2" value="p:${k}" ${marcados.includes(`p:${k}`) ? "checked" : ""} ${repetida ? "disabled" : ""}> ${escapar(nomePericia(app, k))} <small>${repetida ? "(já treinada pela classe)" : "(perícia)"}</small></label>`;
					})
					.join("");
				const poderes = [...(o.poderes ?? []), ...(o.unico ? [{ ...o.unico, unico: true }] : [])]
					.map((p) => {
						const item = p.uuid ? app.c.itens.find((i) => i.uuid === p.uuid) : null;
						const s = item ? situacao(item, ctx) : { estado: true, linhas: [] };
						return `<label class="t20c-check ${p.uuid ? "" : "t20c-mudo"}"><input type="checkbox" data-campo="beneficios" data-lista data-max="2" value="u:${escapar(p.uuid ?? "")}" ${p.uuid ? "" : "disabled"} ${marcados.includes(`u:${p.uuid}`) ? "checked" : ""}> ${termo(p.nome, p.uuid, "t20c-termo")} <small>(${p.unico ? "poder único" : "poder"})</small>${seloPrerequisito(s)}</label>`;
					})
					.join("");
				detalhe = `<div class="t20c-detalhe"><h3>${escapar(o.nome)}</h3>
					<p><strong>Itens:</strong> ${itens || "—"}</p>
					<p><strong>Benefícios</strong> (${marcados.length}/2):</p><div class="t20c-grade">${pericias}${poderes}</div></div>`;
			} else {
				const oficio = (o.pericias ?? []).includes("ofic")
					? `<p><strong>Ofício:</strong> <select data-campo="oficioOrigem"><option value="">—</option>${oficios(P)
							.map((k) => `<option value="${k}" ${app.estado.oficioOrigem === k ? "selected" : ""}>${escapar(nomePericia(app, k))}</option>`)
							.join("")}</select></p>`
					: "";
				const poderes = (o.poderes ?? [])
					.map((p, i) =>
						p.escolha
							? `<select class="t20c-em-linha" data-campo="origemPoderes.${i}">${p.escolha.map((x, j) => `<option value="${j}" ${(Number(app.estado.origemPoderes?.[i]) || 0) === j ? "selected" : ""}>${escapar(x.nome)}</option>`).join("")}</select>`
							: termo(p.nome, p.uuid)
					)
					.join(" ");
				const daOrigem = app.periciasDaOrigem();
				const ocupadas = new Set([...app.treinadasPelaClasse(), ...daOrigem.map((x) => x.pericia).filter(Boolean)]);
				const trocas = daOrigem
					.filter((x) => x.repetida)
					.map((x) => {
						const opcoes = app
							.listaDaClasse()
							.filter((k) => k === x.pericia || !ocupadas.has(k))
							.sort((a, b) => nomePericia(app, a).localeCompare(nomePericia(app, b)))
							.map((k) => `<option value="${k}" ${k === x.pericia ? "selected" : ""}>${escapar(nomePericia(app, k))}</option>`)
							.join("");
						return `<p class="t20c-aviso">${escapar(nomePericia(app, x.original))} já é treinada pela classe: escolha outra perícia da classe <select class="t20c-em-linha" data-campo="origemTroca.${x.original}"><option value="">—</option>${opcoes}</select></p>`;
					})
					.join("");
				detalhe = `<div class="t20c-detalhe"><h3>${escapar(o.nome)}</h3>
					${o.regiao ? `<p class="t20c-aviso">Origem regional: o personagem precisa ser nativo de ${escapar(o.regiao)} ou ter crescido lá.</p>` : ""}
					<p><strong>Benefício:</strong> ${escapar(o.beneficio ?? "")}</p>
					${trocas}
					<p><strong>Perícias treinadas:</strong> ${(o.pericias ?? []).filter((k) => k !== "ofic").map((k) => `<span class="t20c-chip">${escapar(nomePericia(app, k))}</span>`).join(" ") || "—"} ${o.unico ? `· <strong>Poder:</strong> ${termo(o.unico.nome, o.unico.uuid, "t20c-termo")}` : ""}</p>
					${poderes ? `<p><strong>Também recebe:</strong> ${poderes}</p>` : ""}
					${oficio}
					<p><strong>Itens:</strong> ${itens || "—"}</p></div>`;
			}
		}
		return `${detalhe}${busca(".t20c-cartao")}${grupos}`;
	},
	erro(app) {
		const o = app.origem;
		if (!o) return "Escolha uma origem.";
		if ((o.tipo ?? "basica") === "basica") return app.beneficios().length < 2 ? "Escolha dois benefícios da origem." : null;
		if ((o.pericias ?? []).includes("ofic") && !app.estado.oficioOrigem) return "Escolha o Ofício da origem.";
		const semTroca = app.periciasDaOrigem().find((x) => x.repetida && !x.pericia);
		return semTroca ? `${nomePericia(app, semTroca.original)} já é treinada pela classe: escolha outra perícia da classe.` : null;
	}
};

/* -------------------------------------------- 5. divindade */

/** Divindades que a classe permite e quantos poderes concedidos o devoto recebe. */
function regraDeDevocao(app) {
	const c = app.classe;
	const regra = c?.devocaoRegra ?? {};
	const obrigatoria = c?.devocao === "obrigatoria";
	let deuses = Object.entries(app.d?.DIVINDADES ?? {});
	if (Array.isArray(regra.divindades)) deuses = deuses.filter(([k]) => regra.divindades.includes(k));
	// Devoto Fiel e Abençoado: deus maior (os deuses menores do Guia têm "status").
	else if (obrigatoria) deuses = deuses.filter(([, d]) => d.status === undefined);
	return { obrigatoria, deuses: deuses.sort((a, b) => a[1].nome.localeCompare(b[1].nome)), poderes: obrigatoria ? 2 : 1, panteao: Boolean(regra.panteao), bem: Boolean(regra.bem) };
}

const PASSO_DIVINDADE = {
	id: "divindade",
	titulo: "Divindade",
	dica: "Opcional, a não ser para clérigos, druidas, paladinos e frades, que são devotos e recebem dois poderes concedidos. O devoto segue as obrigações e restrições do deus (JdA p. 96).",
	visivel: (app) => app.classe?.devocao !== "proibida",
	render(app) {
		if (!app.d?.DIVINDADES) return `<p class="t20c-aviso">As tabelas de divindades ainda não foram geradas.</p>`;
		const r = regraDeDevocao(app);
		const especial = (valor, nome, sub, icone) => `<button type="button" class="t20c-cartao ${(app.estado.divindade ?? "") === valor ? "selecionado" : ""}" data-campo="divindade" data-valor="${valor}"><span class="t20c-sem-img"><i class="fa-solid ${icone}"></i></span><span class="t20c-cartao-texto"><strong>${nome}</strong><small>${sub}</small></span></button>`;
		const cartoes = [
			...(r.obrigatoria ? [] : [especial("", "Nenhuma", "Não é devoto", "fa-ban")]),
			...(r.panteao ? [especial("panteao", "Panteão", "Sem poder concedido", "fa-circle-nodes")] : []),
			...(r.bem ? [especial("bem", "O bem", "Sem poder concedido", "fa-sun")] : []),
			...r.deuses.map(([slug, d]) => cartao({ campo: "divindade", valor: slug, nome: d.nome, sub: escapar([d.titulo, d.fonte].filter(Boolean).join(" · ")), selecionado: slug === app.estado.divindade, dica: { divindade: slug } }))
		].join("");
		const d = app.divindade;
		let detalhe = "";
		if (d) {
			const itens = (d.poderes ?? []).map((p) => app.c.itens.find((i) => i.uuid === p.uuid)).filter(Boolean);
			const classes = d.devotosLista?.classes;
			const fora = Array.isArray(classes) && app.estado.classe && !classes.includes(app.estado.classe) && !classes.includes(app.classe?.variante);
			detalhe = `<div class="t20c-detalhe"><h3>${escapar(d.nome)}${d.titulo ? ` <small>${escapar(d.titulo)}</small>` : ""}</h3>
				${d.devotos ? `<p><strong>Devotos:</strong> ${escapar(d.devotos)}</p>` : ""}
				${fora ? `<p class="t20c-aviso">${escapar(app.classe.nome)} não está entre os devotos deste deus.</p>` : ""}
				${d.energia ? `<p><strong>Energia:</strong> ${escapar(d.energia)}${d.armaPreferida ? ` · <strong>Arma preferida:</strong> ${escapar(d.armaPreferida)}` : ""}</p>` : ""}
				${d.obrigacoes ? `<p><strong>Obrigações e restrições:</strong> ${escapar(d.obrigacoes)}</p>` : ""}
				<p><strong>Poder${r.poderes > 1 ? "es" : ""} concedido${r.poderes > 1 ? "s" : ""}</strong> (${lista(app.estado.poderConcedido).length}/${Math.min(r.poderes, itens.length)}):</p>
				${listaDeEscolhas(app, { campo: "poderConcedido", itens, contexto: app.contexto(), max: r.poderes })}</div>`;
		}
		return `${detalhe}${busca(".t20c-cartao")}<div class="t20c-cartoes t20c-cartoes-texto">${cartoes}</div>`;
	},
	erro(app) {
		const r = regraDeDevocao(app);
		const e = app.estado;
		if (r.obrigatoria && !e.divindade) return `${app.classe.nome} precisa ser devoto.`;
		if (!app.divindade) return null;
		const disponiveis = (app.divindade.poderes ?? []).filter((p) => p.uuid).length;
		const precisa = Math.min(r.poderes, disponiveis);
		return lista(e.poderConcedido).length < precisa ? `Escolha ${precisa} ${precisa > 1 ? "poderes concedidos" : "poder concedido"}.` : null;
	}
};

/* -------------------------------------------- 6. perícias */

const PASSO_CONCESSOES = {
	id: "concessoes",
	titulo: "Escolhas dos poderes",
	dica: "Alguns poderes da raça, da origem ou da classe dão outra escolha: uma perícia treinada, um bônus em perícia ou um poder (ex.: Versátil do humano, Deformidade do lefou, Estandarte Vivo).",
	visivel: (app) => app.fontes.length > 0,
	render(app) {
		const fontes = app.fontes;
		// Perícias treinadas por outras fontes (as escolhidas aqui continuam nas opções da própria vaga).
		const treinadas = new Set([...app.treinadas.entries()].filter(([, de]) => !fontes.some((f) => f.item.name === de)).map(([k]) => k));
		return renderConcessoes(app, fontes, { contexto: app.contexto(), treinadas, raca: app.raca?.name });
	},
	erro: (app) => erroDasConcessoes(app, app.fontes)
};

const PASSO_PERICIAS = {
	id: "pericias",
	titulo: "Perícias",
	dica: "Além das perícias da classe e da origem, Inteligência positiva dá esse número de perícias treinadas, de qualquer lista (JdA p. 17).",
	render(app) {
		const treinadas = app.treinadas;
		const extra = Math.max(0, app.atributos.int);
		const escolhidas = lista(app.estado.periciasInt);
		const jaTem = [...treinadas.entries()].filter(([, de]) => de !== "Inteligência");
		const todas = Object.entries(app.d?.PERICIAS ?? {}).sort((a, b) => a[1].localeCompare(b[1]));
		const opcoes = todas
			.filter(([k]) => !jaTem.some(([t]) => t === k))
			.map(([k, nome]) => `<label class="t20c-check"><input type="checkbox" data-campo="periciasInt" data-lista data-max="${extra}" value="${k}" ${escolhidas.includes(k) ? "checked" : ""}> ${escapar(nome)}</label>`)
			.join("");
		return `<p><strong>Treinadas pela classe, pela origem e pelos poderes:</strong> ${jaTem.map(([k, de]) => `<span class="t20c-chip">${escapar(nomePericia(app, k))} <small>${de}</small></span>`).join(" ") || "—"}</p>
			${extra ? `<p><strong>Pela Inteligência (${sinal(app.atributos.int)}):</strong> escolha ${extra} (${escolhidas.length}/${extra})</p><div class="t20c-grade">${opcoes}</div>` : `<p class="t20c-mudo">Inteligência ${sinal(app.atributos.int)}: nenhuma perícia extra.</p>`}`;
	},
	erro(app) {
		const extra = Math.max(0, app.atributos.int);
		return lista(app.estado.periciasInt).length < extra ? `Escolha ${extra} perícias pela Inteligência.` : null;
	}
};

/* -------------------------------------------- 7. magias */

/** Magias da classe até o círculo, nas escolas permitidas (bardo e druida escolhem três). */
export function magiasDisponiveis(c, classe, circuloMax, escolas) {
	const m = classe?.magias;
	if (!m) return [];
	const permitidas = m.escolherEscolas ? escolas : m.escolas;
	return c.magias
		.filter((s) => [m.tipo, "uni"].includes(s.system?.tipo) && (Number(s.system?.circulo) || 1) <= circuloMax && (!permitidas?.length || permitidas.includes(s.system?.escola)))
		.sort((a, b) => (a.system.circulo ?? 0) - (b.system.circulo ?? 0) || a.name.localeCompare(b.name));
}

const PASSO_MAGIAS = {
	id: "magias",
	titulo: "Magias",
	dica: "Arcanistas, bardos, clérigos, druidas e frades começam com magias de 1º círculo. Bardos e druidas escolhem três escolas de magia, para sempre (JdA cap. 1 e 4).",
	visivel: (app) => Boolean(app.classe?.magias),
	render(app) {
		const m = app.classe.magias;
		let escolas = "";
		if (m.escolherEscolas) {
			const marcadas = lista(app.estado.escolas);
			const todas = [...new Set(app.c.magias.filter((s) => [m.tipo, "uni"].includes(s.system?.tipo)).map((s) => s.system?.escola).filter(Boolean))].sort();
			escolas = `<p><strong>Escolas</strong> (${marcadas.length}/${m.escolherEscolas}):</p><div class="t20c-grade">${todas
				.map((k) => `<label class="t20c-check"><input type="checkbox" data-campo="escolas" data-lista data-max="${m.escolherEscolas}" value="${k}" ${marcadas.includes(k) ? "checked" : ""}> ${escapar(nomeEscola(k))}</label>`)
				.join("")}</div>`;
			if (marcadas.length < m.escolherEscolas) return `${escolas}<p class="t20c-mudo">Escolha as escolas para ver as magias.</p>`;
		}
		const itens = magiasDisponiveis(app.c, app.classe, 1, lista(app.estado.escolas));
		const n = app.magiasIniciais;
		return `${escolas}<p>${m.tipo === "arc" ? "Magias arcanas" : "Magias divinas"} de 1º círculo: escolha ${n} (${lista(app.estado.magias).length}/${n}).${m.nota ? ` <span class="t20c-mudo">${escapar(m.nota)}</span>` : ""}</p>
			${listaDeEscolhas(app, { campo: "magias", itens, max: n, extra: (s) => ` <small class="t20c-mudo">${escapar(nomeEscola(s.system?.escola))} · ${escapar(s.livro)}</small>` })}`;
	},
	erro(app) {
		const m = app.classe?.magias;
		if (!m) return null;
		if (m.escolherEscolas && lista(app.estado.escolas).length < m.escolherEscolas) return `Escolha ${m.escolherEscolas} escolas de magia.`;
		return lista(app.estado.magias).length < app.magiasIniciais ? `Escolha ${app.magiasIniciais} magias.` : null;
	}
};

/* -------------------------------------------- 8. equipamento */

const PASSO_EQUIPAMENTO = {
	id: "equipamento",
	titulo: "Equipamento",
	dica: "Você começa com os itens da origem, mochila, saco de dormir, traje de viajante, uma arma simples (e uma marcial, se tiver proficiência), armadura leve (ou brunea com proficiência em armaduras pesadas), escudo leve com proficiência em escudos, e T$ 4d6. Arcanistas começam sem armadura (JdA p. 140).",
	render(app) {
		const prof = new Set(app.classe?.proficiencias ?? []);
		// Só as armas das tabelas de armas (pastas Simples e Marciais): o Cajado arcano é esotérico (T$ 1.000), e
		// tocha, escudos, ferramentas e itens de origem também estão no compêndio como "arma".
		const armas = app.c.equipamentos.filter((i) => i.type === "arma" && i.pacote === "tormenta20.equipamentos" && ["Simples", "Marciais"].includes(i.pasta) && i.name !== "Ataque desarmado");
		const opcoesArma = (tipo, campo) =>
			`<select data-campo="${campo}"><option value="">—</option>${armas
				.filter((a) => a.system?.proficiencia === tipo)
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((a) => `<option value="${a.uuid}" ${app.estado[campo] === a.uuid ? "selected" : ""}>${escapar(a.name)}</option>`)
				.join("")}</select>`;
		const arcanista = app.estado.classe === "arcanista";
		const armaduras = ["armadura de couro", "couro batido", "gibão de peles", ...(prof.has("pesadas") ? ["brunea"] : [])].map((n) => app.c.porNome.get(n)).filter(Boolean);
		const origemItens = (app.origem?.itens ?? []).map((it, i) => (it.escolha ? it.escolha[Number(app.estado.origemItens?.[i]) || 0]?.nome : it.nome)).filter(Boolean);
		return `<p><strong>Itens da origem:</strong> ${origemItens.map((n) => `<span class="t20c-chip">${escapar(n)}</span>`).join(" ") || "—"}</p>
			<p><strong>Sempre:</strong> <span class="t20c-chip">Ataque desarmado</span> <span class="t20c-chip">Mochila</span> <span class="t20c-chip">Saco de dormir</span> <span class="t20c-chip">Traje de viajante</span></p>
			<div class="t20c-form">
				<label>Arma simples ${opcoesArma("simples", "arma")}</label>
				${prof.has("marciais") ? `<label>Arma marcial ${opcoesArma("marcial", "marcial")}</label>` : ""}
				${arcanista ? `<p class="t20c-mudo">Arcanistas começam sem armadura.</p>` : `<label>Armadura <select data-campo="armadura"><option value="">—</option>${armaduras.map((a) => `<option value="${a.uuid}" ${app.estado.armadura === a.uuid ? "selected" : ""}>${escapar(a.name)}</option>`).join("")}</select></label>`}
				${prof.has("escudos") ? `<label class="t20c-check"><input type="checkbox" data-campo="escudo" ${app.estado.escudo ? "checked" : ""}> Escudo leve</label>` : ""}
				<label>Dinheiro (T$) <input type="number" min="0" data-campo="dinheiro" value="${Number(app.estado.dinheiro) || 0}"> <button type="button" class="t20c-mini" data-acao="dinheiro"><i class="fa-solid fa-dice"></i> 4d6</button></label>
			</div>`;
	},
	erro(app) {
		if (!app.estado.arma) return "Escolha a arma simples.";
		return null;
	},
	acoes: {
		async dinheiro(app) {
			const r = await new Roll("4d6").evaluate();
			app.estado.dinheiro = r.total;
			await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: app.actor }), flavor: "Dinheiro inicial (T$ 4d6)", rolls: [r] });
		}
	}
};

/* -------------------------------------------- 9. toques finais */

const PASSO_FINAL = {
	id: "final",
	titulo: "Toques finais",
	dica: "Confira tudo antes de criar. PV, PM, Defesa e perícias são calculados pela ficha.",
	render(app) {
		const a = app.atributos;
		const linha = (rotulo, valor) => `<tr><th>${rotulo}</th><td>${valor || "—"}</td></tr>`;
		const pericias = [...app.treinadas.keys()].map((k) => escapar(nomePericia(app, k))).join(", ");
		const o = app.origem;
		const fixos = o && o.tipo !== "basica" ? [o.unico?.nome, ...(o.poderes ?? []).map((p, i) => (p.escolha ? p.escolha[Number(app.estado.origemPoderes?.[i]) || 0]?.nome : p.nome))] : [];
		const esc = escolhasDasConcessoes(app, app.fontes);
		const concessoes = [
			...esc.pericias.map((p) => `${nomePericia(app, p.pericia)} (${p.fonte})`),
			...esc.bonus.map((b) => `+${b.valor} em ${nomePericia(app, b.pericia)} (${b.fonte})`),
			...esc.poderes.map((u) => app.nomeDe(u))
		]
			.map(escapar)
			.join(", ");
		const beneficios = [...app.beneficios().map((b) => (b.startsWith("p:") ? nomePericia(app, b.slice(2)) : app.nomeDe(b.slice(2)))), ...fixos]
			.filter(Boolean)
			.map(escapar)
			.join(", ");
		return `<label class="t20c-nome">Nome <input type="text" data-campo="nome" value="${escapar(app.estado.nome)}"></label>
			<table class="t20c-resumo">
				${linha("Atributos", ATRIBUTOS.map((k) => `${SIGLA[k]} ${sinal(a[k])}`).join(" · "))}
				${linha("Raça", escapar(app.raca?.name))}
				${linha("Classe", escapar(app.classe?.nome))}
				${linha("Origem", `${escapar(app.origem?.nome ?? "")}${beneficios ? ` (${beneficios})` : ""}`)}
				${concessoes ? linha("Escolhas dos poderes", concessoes) : ""}
				${linha("Divindade",app.divindade ? `${escapar(app.divindade.nome)} (${lista(app.estado.poderConcedido).map((u) => escapar(app.nomeDe(u))).join(", ")})` : app.estado.divindade === "panteao" ? "Panteão" : app.estado.divindade === "bem" ? "O bem" : "Nenhuma")}
				${linha("Perícias treinadas", pericias)}
				${app.classe?.magias ? linha("Magias", lista(app.estado.magias).map((u) => escapar(app.nomeDe(u))).join(", ")) : ""}
				${linha("Dinheiro", `T$ ${Number(app.estado.dinheiro) || 0}`)}
			</table>`;
	},
	erro(app) {
		return app.estado.nome?.trim() ? null : "Dê um nome ao personagem.";
	}
};
