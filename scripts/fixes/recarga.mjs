import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Regra (JdA p. 284): "Algumas habilidades terminam com o termo 'recarga' e um tipo de ação. Nesse caso,
 * sempre que usar a habilidade, a criatura precisará gastar a ação determinada para recarregá-la antes de
 * poder usá-la novamente." O sistema deixava o sopro do dragão sair todo turno.
 * Correção: usar uma habilidade com recarga a deixa descarregada (marca no item). Ao tentar usá-la de novo,
 * o módulo pergunta se a criatura gasta a ação para recarregar; a habilidade só volta depois disso.
 */
const RECARGA = /\brecarga\s*\(\s*(?:a[cç][aã]o\s+(?:de\s+)?)?(padr[aã]o|movimento|completa|livre)\s*\)/i;

function textoDe(item) {
	return `${item.name} ${String(item.system?.description?.value ?? "").replace(/<[^>]+>/g, " ")}`;
}

export function acaoDeRecarga(item) {
	if (item?.actor?.type !== "npc" || !["poder", "magia"].includes(item.type)) return null;
	// Conferida na varredura das fichas do livro; nas outras, lida do texto.
	const conferida = item.getFlag?.(MODULE_ID, "recarga");
	if (conferida) return String(conferida);
	const m = textoDe(item).match(RECARGA);
	if (!m) return null;
	return (m[1] ?? "padrão").toLowerCase().replace("padrao", "padrão");
}

async function recarregar(item, acao) {
	const resposta = await foundry.applications.api.DialogV2.confirm({
		window: { title: `${item.name}: descarregada` },
		content: `<p><strong>${item.name}</strong> precisa ser recarregada. ${item.actor.name} gasta uma ação ${acao === "padrão" ? "padrão" : `de ${acao}`} para recarregá-la?</p>`,
		rejectClose: false
	});
	if (!resposta) return;
	await item.unsetFlag(MODULE_ID, "descarregada");
	await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: item.actor }), content: `<p>${item.actor.name} gasta uma ação ${acao === "padrão" ? "padrão" : `de ${acao}`} para recarregar <strong>${item.name}</strong>.</p>` });
}

export default {
	id: "recarga",
	name: "Recarga das habilidades de NPC",
	hint: "Habilidade de NPC com \"recarga\" (sopros, olhares…) fica descarregada depois de usada; para usar de novo, a criatura gasta a ação indicada para recarregar (JdA p. 284).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.roll", async function (wrapped, ...args) {
			let acao = null;
			try {
				acao = acaoDeRecarga(this);
				if (acao && this.getFlag(MODULE_ID, "descarregada")) {
					await recarregar(this, acao);
					return null;
				}
			} catch (error) {
				warn("Falha ao conferir a recarga.", error);
			}
			const resultado = await wrapped(...args);
			if (acao && resultado) await this.setFlag(MODULE_ID, "descarregada", true).catch((error) => warn("Falha ao marcar a recarga.", error));
			return resultado;
		});
	}
};
