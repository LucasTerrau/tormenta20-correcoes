/**
 * Bug: aprimoramentos com a alteração `condicao` procuram a condição por
 * `CONFIG.statusEffects[valor.toLowerCase()]`. Isso só funciona quando o valor já é o id
 * (ex.: "emchamas"); valores escritos como no livro ("em chamas", "imóvel") falham em silêncio.
 * Afeta Explosão de Chamas, Lança Ígnea e Campo de Força, entre outros.
 * Correção: cria apelidos não enumeráveis em CONFIG.statusEffects (nome, nome sem acento,
 * nome sem espaço) que apontam para a condição real. Como não são enumeráveis, não aparecem
 * em listas de condições nem no HUD do token.
 */
export default {
	id: "condicaoPorNome",
	name: "Condições aplicadas por nome",
	hint: "Aprimoramentos que aplicam condições escritas por extenso (\"em chamas\", \"imóvel\") passam a funcionar.",
	init() {
		Hooks.once("setup", installAliases);
	}
};

function aliasesFor(id, name) {
	const lower = String(name ?? "").toLowerCase().trim();
	const plain = lower.normalize("NFD").replace(/[̀-ͯ]/g, "");
	return new Set([lower, plain, lower.replaceAll(" ", ""), plain.replaceAll(" ", "")].filter((a) => a && a !== id));
}

function installAliases() {
	const conditions = CONFIG.T20?.conditions ?? {};
	const statuses = CONFIG.statusEffects;
	for (const [id, condition] of Object.entries(conditions)) {
		for (const alias of aliasesFor(id, condition.name)) {
			if (Object.prototype.hasOwnProperty.call(statuses, alias)) continue;
			// Getter: o sistema recria a lista de condições no "ready"; o apelido sempre lê a versão atual.
			Object.defineProperty(statuses, alias, {
				get: () => CONFIG.statusEffects[id],
				enumerable: false,
				configurable: true
			});
		}
	}
}
