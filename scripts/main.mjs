import { MODULE_ID, SYSTEM_VERSION_VERIFIED } from "./constants.mjs";
import { FIXES } from "./fixes/index.mjs";
import { log, warn } from "./util.mjs";

const active = [];

Hooks.once("init", () => {
	if (game.system.id !== "tormenta20") return;

	for (const fix of FIXES) {
		game.settings.register(MODULE_ID, fix.id, {
			name: fix.name,
			hint: fix.hint,
			scope: "world",
			config: true,
			type: Boolean,
			default: fix.default ?? true,
			requiresReload: true
		});
	}

	if (!globalThis.libWrapper) {
		warn("libWrapper não está ativo; nenhuma correção foi carregada.");
		return;
	}

	for (const fix of FIXES) {
		if (!game.settings.get(MODULE_ID, fix.id)) continue;
		try {
			fix.init?.();
			active.push(fix);
		} catch (error) {
			console.error(`${MODULE_ID} | Falha ao ativar "${fix.id}"`, error);
		}
	}
	log(`Correções ativas: ${active.map((f) => f.id).join(", ") || "nenhuma"}`);
});

Hooks.once("ready", () => {
	if (game.system.id !== "tormenta20") return;

	if (!globalThis.libWrapper && game.user.isGM) {
		ui.notifications.error("Tormenta20 — Correções: ative o módulo libWrapper para as correções funcionarem.", {
			permanent: true
		});
	}
	if (game.system.version !== SYSTEM_VERSION_VERIFIED && game.user.isGM) {
		ui.notifications.warn(
			`Tormenta20 — Correções foi conferido com o sistema ${SYSTEM_VERSION_VERIFIED}; você está usando ${game.system.version}. `
				+ "Se algo estranho acontecer, desligue a correção suspeita nas configurações do módulo."
		);
	}

	for (const fix of active) {
		try {
			fix.ready?.();
		} catch (error) {
			console.error(`${MODULE_ID} | Falha no "ready" de "${fix.id}"`, error);
		}
	}
});
