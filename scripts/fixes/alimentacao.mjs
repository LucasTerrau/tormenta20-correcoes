import { MODULE_ID } from "../constants.mjs";
import { warn, wrap } from "../util.mjs";

/**
 * Pratos especiais (JdA p. 162): o bônus dura um dia e "você só pode receber um bônus de alimentação por
 * dia". Golem e Osteon não se beneficiam de alimentação (p. 27 e 29). Bom de Garfo (Heróis de Arton, regra
 * opcional de culinária) permite dois pratos por dia.
 * Bugs: os pratos não faziam nada (os dados ficaram da 1ª edição); a opção +1d6 da Batata aparecia em todo
 * teste enquanto ela estivesse no inventário, e nunca era gasta; não havia limite diário.
 * Correção: Gorad e Macarrão rolam os pontos temporários no cartão (correção de dados); Prato do aventureiro
 * e Sopa de peixe guardam +1 PV/PM por nível para a próxima noite (lido pelo descanso); a Batata dá ao
 * personagem uma opção de +1d6 que some depois de usada ou no fim do dia. Um segundo prato no mesmo dia
 * (decisão do usuário) é consumido sem o bônus, com aviso no chat.
 */
const DIA = 86400;
const diaDoMundo = () => Math.floor((game.time.worldTime ?? 0) / DIA);

const ehPrato = (item) => item?.type === "consumivel" && Boolean(item.getFlag?.(MODULE_ID, "pratoEspecial"));

function limiteDiario(actor) {
	return actor.items.some((i) => i.name === "Bom de Garfo") ? 2 : 1;
}

function naoSeAlimenta(actor) {
	const raca = actor.items.find((i) => i.type === "race")?.name ?? actor.system.detalhes?.raca ?? "";
	return /^(golem|osteon)/i.test(String(raca).normalize("NFD").replace(/[̀-ͯ]/g, ""));
}

/** Pode receber o bônus de mais um prato hoje? */
function podeComer(actor) {
	if (naoSeAlimenta(actor)) return { pode: false, motivo: `${actor.name} não se beneficia de alimentação` };
	const registro = actor.getFlag(MODULE_ID, "pratosDoDia") ?? {};
	const hoje = registro.dia === diaDoMundo() ? Number(registro.qtd) || 0 : 0;
	if (hoje >= limiteDiario(actor)) return { pode: false, motivo: `${actor.name} já recebeu o bônus de alimentação de hoje` };
	return { pode: true, hoje };
}

async function beneficios(actor, item, hoje) {
	const nivel = Number(actor.system.attributes?.nivel?.value) || 1;
	const updates = { [`flags.${MODULE_ID}.pratosDoDia`]: { dia: diaDoMundo(), qtd: hoje + 1 } };
	const refeicao = item.getFlag(MODULE_ID, "refeicao");
	if (refeicao) updates[`flags.${MODULE_ID}.refeicao`] = { pv: refeicao.pv ? nivel : 0, pm: refeicao.pm ? nivel : 0 };
	await actor.update(updates);
	if (item.getFlag(MODULE_ID, "batata")) {
		await actor.createEmbeddedDocuments("ActiveEffect", [
			{
				name: "Batata valkariana (+1d6 em um teste)",
				img: item.img,
				type: "base",
				duration: { value: DIA, units: "seconds" },
				system: {
					onuse: true,
					changes: [{ key: "roll", type: "add", value: "1d6", phase: "initial", priority: null }],
					abilityUse: { description: "", automatic: false, aumenta: false, custo: null, names: [], types: ["ability", "attack", "skill"] }
				},
				flags: { [MODULE_ID]: { usoUnico: true } }
			}
		]);
	}
}

export default {
	id: "alimentacao",
	name: "Alimentação: pratos especiais",
	hint: "Pratos especiais fazem efeito (Gorad +2 PM temporários, Macarrão de Yuvalin +5 PV temporários, Prato do aventureiro e Sopa de peixe +1 PV/PM por nível no próximo descanso, Batata valkariana +1d6 num teste do dia) e só um vale por dia (dois com Bom de Garfo); Golem e Osteon não se beneficiam (JdA p. 162).",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.roll", async function (wrapped, ...args) {
			if (!ehPrato(this) || !this.actor) return wrapped(...args);
			const actor = this.actor;
			const estado = podeComer(actor);
			actor._t20cPratoBloqueado = !estado.pode;
			try {
				const resultado = await wrapped(...args);
				if (resultado !== undefined && resultado !== null) {
					if (estado.pode) await beneficios(actor, this, estado.hoje);
					else await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content: `<p>${estado.motivo}: ${this.name} foi consumido sem o bônus.</p>` });
				}
				return resultado;
			} catch (error) {
				warn("Falha no prato especial.", error);
				throw error;
			} finally {
				actor._t20cPratoBloqueado = false;
			}
		});
		// Prato bloqueado não rola os pontos temporários.
		wrap("CONFIG.Item.documentClass.prototype.rollDamage", async function (wrapped, ...args) {
			if (ehPrato(this) && this.actor?._t20cPratoBloqueado) return null;
			return wrapped(...args);
		});
		// Opção de uso único (Batata): sai depois de usada.
		wrap("tormenta20.applications.AbilityUseDialog.create", async function (wrapped, item, ...args) {
			const resultado = await wrapped(item, ...args);
			try {
				const usados = (item?.applicableOnUseEffects ?? []).filter((ef) => {
					if (!ef.getFlag?.(MODULE_ID, "usoUnico") || ef.parent?.documentName !== "Actor") return false;
					const valor = resultado?.aprs?.[ef.id]?.aplica ?? resultado?.[`aprs.${ef.id}.aplica`];
					return valor === true || Number(valor) > 0;
				});
				for (const ef of usados) await ef.delete();
			} catch (error) {
				warn("Falha ao gastar a opção de uso único.", error);
			}
			return resultado;
		});
	}
};
