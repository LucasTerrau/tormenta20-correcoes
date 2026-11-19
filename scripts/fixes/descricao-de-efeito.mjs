import { warn, wrap } from "../util.mjs";

/**
 * Bug do sistema 1.6.5 (corrigido na 1.6.6): ao montar a lista de efeitos "ao usar" (janela de uso e aba de efeitos
 * da ficha do item), o sistema lê a descrição do efeito com foundry.utils.parseHTML e põe o nome na frente com
 * .prepend(). parseHTML devolve null para texto puro e uma lista para vários parágrafos; nos dois casos o .prepend
 * quebra e a janela não abre. Os compêndios dos suplementos têm 33 efeitos assim (Cruel, Atroz, Certeira, Pungente,
 * Precisa, Maciça… de armas mágicas como a Katana da Determinação): a ficha da arma e a janela de ataque não abriam.
 * O mesmo acontece com qualquer efeito de uso que o mestre escreva com dois parágrafos.
 * Correção: só na memória (os dados não mudam), a descrição de efeito de uso passa a ser um elemento só — texto
 * solto vira um parágrafo e vários elementos ficam dentro de um bloco. Vale também quando a descrição é editada.
 */
const BLOCOS = new Set(["P", "DIV", "UL", "OL", "TABLE", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "SECTION", "FIGURE", "HR"]);

export function descricaoDeUmElemento(html) {
	if (typeof html !== "string" || !html.trim()) return html;
	const div = document.createElement("div");
	div.innerHTML = html.trim();
	const textoSolto = [...div.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
	if (div.children.length === 1 && !textoSolto && BLOCOS.has(div.children[0].tagName)) return html;
	const temBloco = [...div.children].some((e) => BLOCOS.has(e.tagName));
	return temBloco ? `<div>${html.trim()}</div>` : `<p>${html.trim()}</p>`;
}

export default {
	id: "descricaoDeEfeito",
	name: "Efeitos de uso com descrição em texto puro",
	hint: "No sistema 1.6.5, efeito \"ao usar\" com descrição em texto puro ou com mais de um parágrafo impedia a ficha do item e a janela de uso de abrir (armas mágicas dos suplementos como a Katana da Determinação). A descrição passa a ser montada como um bloco só, na memória.",
	init() {
		wrap("CONFIG.ActiveEffect.documentClass.prototype._initialize", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			try {
				if (this.system?.onuse && typeof this.description === "string") {
					const nova = descricaoDeUmElemento(this.description);
					if (nova !== this.description) this.description = nova;
				}
			} catch (error) {
				warn("Falha ao ajustar a descrição do efeito.", error);
			}
			return resultado;
		});
	}
};
