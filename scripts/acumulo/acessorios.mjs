/**
 * Defesa vinda do próprio item (campo "armadura" de acessórios, trajes etc.), que o sistema soma
 * para todos os itens equipados em AttributesFields.prepareDefense. Pelo JdA p. 226, além de
 * armadura e escudo só conta a Defesa de um outro item.
 */
export const DEFESA = "system.attributes.defesa.bonus";

/** Mesmo filtro de prepareDefense: equipamentos equipados que não são armadura nem escudo. */
export function acessoriosEquipados(actor) {
	const slots = game.settings.get("tormenta20", "equipmentSlots");
	return (actor.itemTypes?.equipamento ?? []).filter(
		(i) => (slots ? i.system.equipado2?.slot : i.system.equipado) && !["escudo", "leve", "pesada"].includes(i.system.tipo)
	);
}

/** Armadura vestida (ou, sem ela, o escudo empunhado): onde cai um encanto de Defesa vindo de magia. */
export function armaduraVestida(actor) {
	const slots = game.settings.get("tormenta20", "equipmentSlots");
	const equipados = (actor.itemTypes?.equipamento ?? []).filter((i) => (slots ? i.system.equipado2?.slot : i.system.equipado));
	return equipados.find((i) => ["leve", "pesada"].includes(i.system.tipo)) ?? equipados.find((i) => i.system.tipo === "escudo") ?? null;
}

/**
 * Braceletes de Bronze e de Ouro (JdA p. 342): "cumulativo com outros itens mágicos, mas não com armaduras".
 * Disputam com a armadura vestida (vale o maior bônus de Defesa), e não com o "outro item".
 */
export const ehBracelete = (item) => /^braceletes de (bronze|ouro)\b/i.test(item?.name ?? "");

/** Armadura (leve ou pesada) vestida, sem contar escudo. */
export function armaduraDoCorpo(actor) {
	const slots = game.settings.get("tormenta20", "equipmentSlots");
	return (actor.itemTypes?.equipamento ?? []).find((i) => (slots ? i.system.equipado2?.slot : i.system.equipado) && ["leve", "pesada"].includes(i.system.tipo)) ?? null;
}

export function defesaDoItem(item) {
	return Number(item.system?.armadura?.value) || 0;
}
