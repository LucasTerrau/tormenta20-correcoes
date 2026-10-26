/**
 * Bugs do Assistente de Efeitos (Shift+clique em "criar efeito"):
 * 1. O seletor de modo usa os modos numéricos antigos (v13) e o código só lê a classe `.mode`,
 *    mas o seletor tem a classe `.type`: toda alteração é salva como "somar".
 * 2. O atalho "Passo de Dano" grava a chave `passo`, mas o sistema só entende `passos`.
 * Correção: troca as opções do seletor pelos tipos de alteração do v14 e guarda a escolha no
 * próprio assistente (a lista de alterações dele é privada; o contexto que recebemos é uma cópia).
 * Quando o efeito é criado, os tipos guardados substituem o "somar" fixo.
 */
const CHOSEN_TYPES = "_t20cChangeTypes";

export default {
	id: "assistenteEfeitos",
	name: "Assistente de efeitos: modo e Passo de Dano",
	hint: "No assistente de efeitos, o modo escolhido (somar, multiplicar, substituir…) passa a ser salvo e o atalho \"Passo de Dano\" usa a chave certa.",
	init() {
		Hooks.on("renderActiveEffectWizard", onRender);
		Hooks.on("preCreateActiveEffect", applyChosenTypes);
	}
};

function onRender(app, element, context) {
	const chosen = (app[CHOSEN_TYPES] ??= []);
	const types = CONFIG.ActiveEffect.documentClass.CHANGE_TYPES;

	for (const li of element.querySelectorAll(".changes-list li[data-index]")) {
		const index = Number(li.dataset.index);
		const select = li.querySelector("select.type");
		if (select) {
			const current = chosen[index] ?? context?.changes?.[index]?.type ?? "add";
			select.replaceChildren(
				...Object.entries(types).map(([value, { label }]) => {
					const option = document.createElement("option");
					option.value = value;
					option.textContent = game.i18n.localize(label);
					option.selected = value === current;
					return option;
				})
			);
			select.addEventListener("change", () => (chosen[index] = select.value));
		}
		// Mantém os índices alinhados quando uma alteração é removida.
		li.querySelector("[data-action='deleteChange']")?.addEventListener("click", () => chosen.splice(index, 1));
	}

	for (const button of element.querySelectorAll("button[data-key='passo']")) button.dataset.key = "passos";
}

function applyChosenTypes(effect, data, options, userId) {
	if (userId !== game.user.id) return;
	const wizard = [...foundry.applications.instances.values()].find(
		(app) => app.constructor.name === "ActiveEffectWizard" && app.document === effect.parent && app[CHOSEN_TYPES]?.length
	);
	if (!wizard) return;
	const chosen = wizard[CHOSEN_TYPES];
	const changes = effect._source.system.changes.map((change, i) => ({ ...change, type: chosen[i] ?? change.type }));
	effect.updateSource({ "system.changes": changes });
}
