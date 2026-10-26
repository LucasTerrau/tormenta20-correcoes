import { migrarAtor, migrarEfeito, migrarItem } from "../migracao/legado.mjs";
import { log, warn, wrap } from "../util.mjs";

/**
 * Bug: a migração 1.6.0 do sistema converte efeitos de uso (aprimoramentos) do formato antigo só
 * no mundo e em compêndios locais. Os compêndios do Bestiário de Arton e dos Suplementos de Arton
 * (e NPCs importados deles depois da migração) continuam com os flags antigos: os aprimoramentos
 * não aparecem ao lançar, efeitos de uso ligados ficam valendo o tempo todo e efeitos de NPCs
 * aparecem/valem duas vezes (cópia antiga no ator + original no item).
 * Correção: converte os dados ao carregar cada ator/item/efeito, em memória (nada é gravado).
 */
const contagem = { efeitos: 0, copias: 0 };

function seguro(fn) {
	try {
		fn();
	} catch (error) {
		warn("Falha ao converter efeito antigo; dados mantidos como estavam.", error);
	}
}

export default {
	id: "efeitosAntigos",
	name: "Efeitos antigos do Bestiário, Suplementos e NPCs importados",
	hint: "Converte, ao carregar, aprimoramentos e efeitos de uso no formato antigo (v13) para o formato atual: eles passam a aparecer ao lançar magias e usar poderes, e cópias duplicadas em NPCs deixam de valer em dobro. Nada é gravado nos compêndios.",
	init() {
		wrap("CONFIG.Actor.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => {
				const r = migrarAtor(source);
				contagem.efeitos += r.efeitos;
				contagem.copias += r.copias;
			});
			return wrapped(source, ...args);
		});
		wrap("CONFIG.Item.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => (contagem.efeitos += migrarItem(source)));
			return wrapped(source, ...args);
		});
		// Efeitos soltos (fora de item/ator), ex.: compêndios de efeitos.
		wrap("CONFIG.ActiveEffect.documentClass.migrateData", function (wrapped, source, ...args) {
			seguro(() => migrarEfeito(source) && contagem.efeitos++);
			return wrapped(source, ...args);
		});
	},
	ready() {
		if (contagem.efeitos || contagem.copias) {
			log(`Efeitos antigos convertidos ao carregar: ${contagem.efeitos}; cópias duplicadas removidas: ${contagem.copias}.`);
		}
	}
};
