import { wrap } from "../util.mjs";

/**
 * Regra (JdA p. 106, Tamanho): criaturas Minúsculas usam armas reduzidas (um passo a menos de dano);
 * Grandes e Enormes, armas aumentadas (um passo a mais); Colossais, armas gigantes (dois passos a mais).
 * "Uma criatura pode usar uma arma feita para até uma categoria de tamanho maior ou menor que a dela,
 * mas sofre –5 nos testes de ataque e a arma ocupa um espaço a mais ou a menos (mínimo meio espaço)."
 * O campo "Tamanho" da arma existia na ficha sem fazer nada (o próprio sistema o marca "Não Automatizado").
 * Correção:
 * - mudar o tamanho da arma na ficha ajusta o dado de dano e os espaços dela, como se faria à mão (armas
 *   de NPC já vêm com o dano do tamanho certo, por isso nada muda sozinho);
 * - personagem com arma de outra categoria de tamanho sofre –5 no ataque (a ficha de NPC já traz o valor
 *   final do livro).
 */
const PASSOS = { reduzida: -1, normal: 0, aumentada: 1, gigante: 2 };
const CATEGORIA_DA_ARMA = { reduzida: 0, normal: 1, aumentada: 2, gigante: 3 };
const CATEGORIA_DA_CRIATURA = { min: 0, peq: 1, med: 1, gra: 2, eno: 2, col: 3 };

/** Sobe ou desce o dado em passos pela tabela de dano do sistema (a mesma conta do efeito "passos"). */
export function darPassos(dano, passos) {
	const texto = String(dano ?? "");
	const base = texto.match(/^\d+d\d+|^\d+/)?.[0];
	if (!base || !passos) return texto;
	const procurado = { "2d4": "1d8", "2d6": "1d12", "3d4": "1d12" }[base] ?? base;
	const linha = (CONFIG.T20?.passosDano ?? []).find((l) => l.includes(procurado));
	if (!linha) return texto;
	const novo = Math.max(0, Math.min(linha.indexOf(procurado) + passos, linha.length - 1));
	return texto.replace(/^\d+d\d+|^\d+/, linha[novo]);
}

function penalidadeDeTamanho(item) {
	const actor = item.actor;
	if (actor?.type !== "character" || item.type !== "arma") return 0;
	const arma = CATEGORIA_DA_ARMA[item.system?.size ?? "normal"];
	const criatura = CATEGORIA_DA_CRIATURA[actor.system?.tracos?.tamanho ?? "med"];
	if (arma === undefined || criatura === undefined || arma === criatura) return 0;
	return -5;
}

export default {
	id: "tamanhoArma",
	name: "Tamanho da arma",
	hint: "Mudar o tamanho da arma (reduzida, aumentada, gigante) ajusta o dano em passos e os espaços; personagem com arma de outra categoria de tamanho sofre –5 no ataque (JdA p. 106).",
	init() {
		Hooks.on("preUpdateItem", (item, changes) => {
			if (item.type !== "arma" || !foundry.utils.hasProperty(changes, "system.size")) return;
			const antes = PASSOS[item.system.size ?? "normal"] ?? 0;
			const depois = PASSOS[foundry.utils.getProperty(changes, "system.size")] ?? 0;
			const diferenca = depois - antes;
			// Quem mudou o tamanho e o dano na mesma edição já fez a conta.
			if (!diferenca || foundry.utils.hasProperty(changes, "system.rolls")) return;
			const rolls = foundry.utils.deepClone(item._source.system.rolls ?? []);
			const avisos = [];
			for (const rolagem of rolls) {
				if (rolagem.type !== "dano" || !rolagem.parts?.[0]) continue;
				const anterior = rolagem.parts[0][0];
				rolagem.parts[0][0] = darPassos(anterior, diferenca);
				if (rolagem.parts[0][0] !== anterior) avisos.push(`${anterior} → ${rolagem.parts[0][0]}`);
			}
			foundry.utils.setProperty(changes, "system.rolls", rolls);
			const espacos = Number(item._source.system.espacos);
			if (Number.isFinite(espacos) && espacos > 0) foundry.utils.setProperty(changes, "system.espacos", Math.max(0.5, espacos + diferenca));
			if (avisos.length) ui.notifications.info(`${item.name}: dano ${avisos.join(", ")} (arma ${foundry.utils.getProperty(changes, "system.size")}, JdA p. 106).`);
		});
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const resultado = wrapped(...args);
			const penalidade = penalidadeDeTamanho(this);
			if (penalidade && Array.isArray(resultado?.parts)) resultado.parts.push(String(penalidade));
			return resultado;
		});
	}
};
