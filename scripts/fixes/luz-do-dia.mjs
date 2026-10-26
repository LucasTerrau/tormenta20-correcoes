import { MODULE_ID } from "../constants.mjs";
import { warn } from "../util.mjs";

/**
 * Luz do dia. No Foundry v14 toda cena nasce com a iluminação global desligada, e sem ela o token só enxerga onde há fonte
 * de luz: os personagens do sistema têm alcance de visão 0 ("vê o que está iluminado"), então de dia não viam nada além do
 * próprio quadrado. Cena sem iluminação global gravada ganha luz do dia na hora de montar o ambiente do canvas (gancho
 * configureCanvasEnvironment, que vale por cima do que está gravado; nada é gravado): clara e só enquanto a escuridão não
 * passar de 0,25, então se apaga sozinha ao anoitecer.
 * Cena que deve ficar escura mesmo com pouca escuridão (caverna, interior): flag tormenta20-correcoes.semLuzDoDia.
 */
const LIMITE_DIA = 0.25;

export default {
	id: "luz-do-dia",
	name: "Luz do dia nas cenas",
	hint: "Cena sem iluminação global ganha luz do dia enquanto a escuridão estiver até 0,25 (os tokens enxergam longe); ela se apaga sozinha quando a escuridão sobe. No Foundry v14 a iluminação global nasce desligada e os personagens não enxergavam nada de dia. Nada é gravado na cena.",
	init() {
		Hooks.on("configureCanvasEnvironment", (config) => {
			try {
				const scene = canvas.scene;
				const gravada = scene?._source.environment?.globalLight;
				if (!gravada || gravada.enabled || scene.getFlag(MODULE_ID, "semLuzDoDia")) return;
				const ambiente = (config.environment ??= {});
				ambiente.globalLight = foundry.utils.mergeObject(
					{ enabled: true, bright: true, darkness: { min: 0, max: Math.min(gravada.darkness?.max ?? 1, LIMITE_DIA) } },
					ambiente.globalLight ?? {},
					{ inplace: false }
				);
			} catch (error) {
				warn("Falha ao aplicar a luz do dia na cena.", error);
			}
		});
	}
};
