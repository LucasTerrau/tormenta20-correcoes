import { wrap } from "../util.mjs";

/**
 * Bug do sistema 1.6.5 no Foundry v14: o menu de contexto das mensagens (botão direito) chama onClick(evento, li),
 * mas as opções do sistema foram escritas como onClick(li). "Aplicar Dano", "Aplicar Dano em Dobro", "Aplicar Dano
 * pela Metade", "Aplicar Cura" e "Gastar Mana" recebiam o evento no lugar da mensagem e quebravam com "Cannot read
 * properties of undefined (reading 'messageId')": o PV do token nunca mudava.
 * Correção: essas opções passam a receber a mensagem. Só mexe nas que ainda esperam um parâmetro, então uma versão
 * do sistema que já corrija isso continua como está.
 */
const DO_SISTEMA = new Set(["Aplicar Dano", "Aplicar Dano em Dobro", "Aplicar Dano pela Metade", "Aplicar Cura", "Gastar Mana"]);

export default {
	id: "menuDoChat",
	name: "Menu do chat: aplicar dano, cura e mana",
	hint: "No Foundry v14, as opções \"Aplicar Dano\" (normal, em dobro e pela metade), \"Aplicar Cura\" e \"Gastar Mana\" do botão direito nas mensagens não faziam nada (o sistema esperava a mensagem e recebia o clique). Voltam a aplicar nos tokens selecionados.",
	init() {
		wrap("CONFIG.ui.chat.prototype._getEntryContextOptions", function (wrapped, ...args) {
			const opcoes = wrapped(...args);
			for (const opcao of opcoes ?? []) {
				if (!DO_SISTEMA.has(opcao.label) || typeof opcao.onClick !== "function" || opcao.onClick.length !== 1) continue;
				const original = opcao.onClick;
				opcao.onClick = (event, li) => original(li ?? event);
			}
			return opcoes;
		});
	}
};
