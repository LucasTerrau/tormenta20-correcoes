import { wrap } from "../util.mjs";

/**
 * Bug: `ItemT20#roll` lê `event.shiftKey`, mas a macro da barra de atalhos (rollItemMacro)
 * chama `item.roll({configureDialog, extra})` sem `event`, e o uso trava com erro.
 * Correção: quando não há evento, cria um equivalente a partir de `configureDialog`.
 */
export default {
	id: "macroSemEvento",
	name: "Macros de item na barra de atalhos",
	hint: "Usar uma magia, poder ou arma por macro da barra de atalhos não trava mais.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.roll", function (wrapped, config = {}, ...args) {
			if (config.event) return wrapped(config, ...args);
			const usageDefault = game.settings.get("tormenta20", "UsageConfig") === "default";
			const wantsDialog = config.configureDialog ?? true;
			// Padrão: diálogo sem Shift. Configuração invertida: diálogo com Shift.
			const shiftKey = usageDefault ? !wantsDialog : wantsDialog;
			return wrapped({ ...config, event: { shiftKey } }, ...args);
		});
	}
};
