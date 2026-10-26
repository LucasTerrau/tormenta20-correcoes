import { fecharDicas, ligarDicas } from "./dicas.mjs";

/**
 * Janela em passos dos assistentes de criação e de subir de nível.
 * Cada passo: { id, titulo, dica?, visivel?(app), render(app) → HTML, erro?(app) → texto, acoes?: { nome(app, el) } }.
 * Campos ligados ao estado: [data-campo="caminho"] em inputs, selects e botões (com data-valor). Em listas,
 * data-lista marca/desmarca o valor no array (data-max limita). Filtro sem redesenhar: input[data-filtro="seletor"]
 * (compara com data-busca, data-nome ou o texto; esconde .t20c-grupo que ficar vazio).
 */
export class Assistente extends foundry.applications.api.ApplicationV2 {
	static DEFAULT_OPTIONS = {
		classes: ["t20c-assistente"],
		window: { resizable: true },
		position: { width: 900, height: 720 }
	};

	constructor(actor, options = {}) {
		super(options);
		this.actor = actor;
		this.estado = {};
		this.atual = 0;
	}

	/** @abstract @returns {object[]} */
	get passos() {
		return [];
	}

	get rotuloConcluir() {
		return "Concluir";
	}

	/** @abstract */
	async aplicar() {}

	async close(options) {
		fecharDicas();
		return super.close(options);
	}

	visiveis() {
		return this.passos.filter((p) => !p.visivel || p.visivel(this));
	}

	async _renderHTML() {
		const passos = this.visiveis();
		this.atual = Math.max(0, Math.min(this.atual, passos.length - 1));
		const passo = passos[this.atual];
		let corpo;
		try {
			corpo = await passo.render(this);
		} catch (error) {
			console.error(error);
			corpo = `<p class="t20c-aviso">Erro ao montar este passo: ${foundry.utils.escapeHTML(error.message)}</p>`;
		}
		const erros = passos.map((p) => {
			try {
				return p.erro?.(this) ?? null;
			} catch {
				return null;
			}
		});
		const raiz = document.createElement("div");
		raiz.className = "t20c-assistente-raiz";
		raiz.innerHTML = `<nav class="t20c-passos">${passos
			.map((p, i) => {
				const estado = i === this.atual ? "atual" : erros[i] ? (i < this.atual ? "pendente" : "") : i < this.atual ? "feito" : "";
				return `<a data-ir="${i}" class="${estado}"><span class="num">${erros[i] || i >= this.atual ? i + 1 : '<i class="fa-solid fa-check"></i>'}</span><span>${p.titulo}</span></a>`;
			})
			.join("")}</nav>
			<section class="t20c-passo" data-passo="${passo.id}">
				<header class="t20c-passo-cabecalho"><h2>${passo.titulo}</h2>${passo.dica ? `<p class="t20c-dica">${passo.dica}</p>` : ""}</header>
				<div class="t20c-corpo">${corpo}</div>
				<footer class="t20c-rodape">
					<span class="t20c-erro">${erros[this.atual] ? `<i class="fa-solid fa-circle-exclamation"></i> ${erros[this.atual]}` : ""}</span>
					<button type="button" data-voltar ${this.atual === 0 ? "disabled" : ""}><i class="fa-solid fa-arrow-left"></i> Voltar</button>
					${
						this.atual < passos.length - 1
							? `<button type="button" data-avancar class="t20c-principal">Avançar <i class="fa-solid fa-arrow-right"></i></button>`
							: `<button type="button" data-concluir class="t20c-principal"><i class="fa-solid fa-check"></i> ${this.rotuloConcluir}</button>`
					}
				</footer>
			</section>`;
		return raiz;
	}

	_replaceHTML(resultado, conteudo) {
		const rolagem = conteudo.querySelector(".t20c-corpo")?.scrollTop ?? 0;
		const foco = document.activeElement?.dataset?.filtro;
		const filtros = Object.fromEntries([...conteudo.querySelectorAll("input[data-filtro]")].map((i) => [i.dataset.filtro, i.value]));
		fecharDicas();
		conteudo.replaceChildren(resultado);
		const corpo = conteudo.querySelector(".t20c-corpo");
		if (corpo) corpo.scrollTop = rolagem;
		for (const input of conteudo.querySelectorAll("input[data-filtro]")) {
			if (filtros[input.dataset.filtro]) {
				input.value = filtros[input.dataset.filtro];
				this.#filtrar(input);
			}
			if (foco && input.dataset.filtro === foco) input.focus();
		}
		// Liga no conteúdo novo (o elemento da janela é o mesmo a cada redesenho).
		this.#ligar(resultado);
		ligarDicas(resultado, this);
	}

	/** Lê ou grava um caminho do estado ("pericias.escolhas"). */
	ler(caminho) {
		return foundry.utils.getProperty(this.estado, caminho);
	}

	gravar(caminho, valor) {
		foundry.utils.setProperty(this.estado, caminho, valor);
	}

	#passoAtual() {
		return this.visiveis()[this.atual];
	}

	#filtrar(input) {
		const termo = input.value
			.normalize("NFD")
			.replace(/[̀-ͯ]/g, "")
			.toLowerCase()
			.trim();
		const corpo = input.closest(".t20c-corpo");
		for (const el of corpo?.querySelectorAll(input.dataset.filtro) ?? []) {
			const nome = (el.dataset.busca ?? el.dataset.nome ?? el.textContent).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
			el.classList.toggle("t20c-oculto", Boolean(termo) && !nome.includes(termo));
		}
		// Grupo (título + cartões) sem nenhum resultado some junto.
		for (const grupo of corpo?.querySelectorAll(".t20c-grupo") ?? []) {
			const itens = [...grupo.querySelectorAll(input.dataset.filtro)];
			grupo.classList.toggle("t20c-oculto", itens.length > 0 && itens.every((el) => el.classList.contains("t20c-oculto")));
		}
	}

	#definir(el) {
		const caminho = el.dataset.campo;
		let valor;
		if (el.dataset.valor !== undefined && el.tagName !== "SELECT" && el.type !== "checkbox") valor = el.dataset.valor;
		else if (el.type === "checkbox" && el.dataset.lista === undefined) valor = el.checked;
		else if (el.type === "number" || el.dataset.numero !== undefined) valor = el.value === "" ? 0 : Number(el.value);
		else valor = el.value;
		if (el.dataset.lista !== undefined) {
			const item = el.dataset.valor ?? el.value;
			const lista = [...(this.ler(caminho) ?? [])];
			const i = lista.indexOf(item);
			const max = Number(el.dataset.max) || Infinity;
			if (i >= 0) lista.splice(i, 1);
			else if (lista.length >= max) {
				ui.notifications.warn(`Escolha no máximo ${max}.`);
				return false;
			} else lista.push(item);
			this.gravar(caminho, lista);
			return true;
		}
		this.gravar(caminho, valor);
		return true;
	}

	#ligar(raiz) {
		for (const a of raiz.querySelectorAll("[data-ir]")) {
			a.addEventListener("click", () => {
				this.atual = Number(a.dataset.ir);
				this.render();
			});
		}
		raiz.querySelector("[data-voltar]")?.addEventListener("click", () => {
			this.atual--;
			this.render();
		});
		raiz.querySelector("[data-avancar]")?.addEventListener("click", () => {
			const erro = this.#passoAtual()?.erro?.(this);
			if (erro) return ui.notifications.warn(erro);
			this.atual++;
			this.render();
		});
		raiz.querySelector("[data-concluir]")?.addEventListener("click", () => this.#concluir());
		for (const input of raiz.querySelectorAll("input[data-filtro]")) input.addEventListener("input", () => this.#filtrar(input));
		raiz.addEventListener("change", (event) => {
			const el = event.target.closest("[data-campo]");
			if (!el || el.tagName === "BUTTON") return;
			if (this.#definir(el) === false) el.checked = !el.checked;
			this.render();
		});
		raiz.addEventListener("click", async (event) => {
			const campo = event.target.closest("button[data-campo], a[data-campo]");
			if (campo) {
				event.preventDefault();
				this.#definir(campo);
				return this.render();
			}
			const el = event.target.closest("[data-acao]");
			if (!el) return;
			event.preventDefault();
			const passo = this.#passoAtual();
			try {
				await passo?.acoes?.[el.dataset.acao]?.(this, el, event);
			} catch (error) {
				console.error(error);
				ui.notifications.error(`Falha: ${error.message}`);
			}
			this.render();
		});
	}

	async #concluir() {
		const passos = this.visiveis();
		const pendente = passos.findIndex((p) => p.erro?.(this));
		if (pendente >= 0) {
			this.atual = pendente;
			this.render();
			return ui.notifications.warn(`Falta resolver: ${passos[pendente].titulo}. ${passos[pendente].erro(this)}`);
		}
		const botao = this.element.querySelector("[data-concluir]");
		if (botao) botao.disabled = true;
		try {
			await this.aplicar();
			await this.close();
		} catch (error) {
			console.error(error);
			ui.notifications.error(`Não deu para concluir: ${error.message}`);
			if (botao) botao.disabled = false;
		}
	}
}
