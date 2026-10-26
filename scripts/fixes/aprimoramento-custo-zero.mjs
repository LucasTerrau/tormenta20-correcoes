/**
 * Bug: no diálogo de uso, um aprimoramento com custo 0 não recebe o campo oculto
 * `aprs.<id>.custo` (o template só cobre null e custo > 0). Sem o campo, o custo enviado
 * fica `undefined` e `!Number(undefined + 1)` marca a magia inteira como Truque (0 PM).
 * Correção: acrescenta o campo com valor 0 depois que o diálogo é desenhado.
 */
export default {
	id: "aprimoramentoCustoZero",
	name: "Aprimoramento de 0 PM não vira Truque",
	hint: "Sem esta correção, marcar um aprimoramento de custo 0 (ex.: Físico Divino, Velocidade, Luz) zera o custo da magia inteira, como se fosse Truque.",
	init() {
		Hooks.on("renderAbilityUseDialog", (app, html) => {
			const root = html instanceof HTMLElement ? html : html[0];
			if (!root) return;
			for (const input of root.querySelectorAll(".aprimoramentos-list input[name$='.aplica']")) {
				const id = input.name.split(".")[1];
				const costName = `aprs.${id}.custo`;
				const container = input.closest(".item-cost");
				if (!container || container.querySelector(`input[name="${costName}"]`)) continue;

				const label = document.createElement("label");
				label.textContent = `0 ${game.i18n.localize("T20.MP")}`;
				const hidden = document.createElement("input");
				hidden.type = "hidden";
				hidden.name = costName;
				hidden.value = "0";
				container.append(label, hidden);
			}
		});
	}
};
