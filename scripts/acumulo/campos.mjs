/**
 * Campos da ficha que o sistema soma juntos numa mesma rolagem. A regra de acúmulo (JdA p. 226) vale
 * por característica, mas o sistema guarda "todas as perícias", "resistências" e "Fortitude" em
 * campos diferentes: comparando só campo a campo, item +2 em todas as perícias e item +3 em
 * Fortitude davam +5 em Fortitude.
 */

/** Campos que o sistema soma num teste de perícia (CreatureData#prepareSkill). */
export function camposDaPericia(actor, id) {
	const m = "system.modificadores.pericias";
	const resistencia = Object.keys(CONFIG.T20?.resistencias ?? {}).includes(id);
	const tipo = resistencia ? "resistencia" : ["luta", "pont"].includes(id) ? "ataque" : "semataque";
	const atributo = actor?.system?.pericias?.[id]?.atributo;
	return [`system.pericias.${id}.bonus`, `${m}.geral`, `${m}.${tipo}`, ...(atributo ? [`${m}.atr.${atributo}`] : [])];
}

/** Quanto uma mesma fonte soma a mais por aparecer em mais de um destes campos. */
function excesso(vencedores, campos) {
	const porGrupo = new Map();
	for (const campo of campos) {
		for (const [grupo, valor] of vencedores.get(campo) ?? []) {
			if (!porGrupo.has(grupo)) porGrupo.set(grupo, []);
			porGrupo.get(grupo).push(valor);
		}
	}
	let total = 0;
	for (const valores of porGrupo.values()) {
		if (valores.length < 2) continue;
		const maior = valores.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a));
		total += valores.reduce((a, b) => a + b, 0) - maior;
	}
	return total;
}

/**
 * Depois de aplicar os efeitos, desconta o excesso num campo que só entra naquela rolagem: no bônus da
 * própria perícia, no ataque corpo a corpo/à distância, no dano corpo a corpo/à distância/de magias
 * e no teste de cada atributo.
 * @param {Actor} actor
 * @param {Map<string, Map<string, number>>} vencedores  por chave, o valor que ficou em cada grupo
 */
export function compensarCampos(actor, vencedores) {
	const descontar = (caminho, valor) => {
		if (!valor) return;
		const lista = foundry.utils.getProperty(actor, caminho);
		if (Array.isArray(lista)) lista.push(String(-valor));
	};
	const m = "system.modificadores";
	for (const id of Object.keys(actor.system.pericias ?? {})) {
		descontar(`system.pericias.${id}.bonus`, excesso(vencedores, camposDaPericia(actor, id)));
	}
	// Ataque: a perícia (Luta/Pontaria) já foi descontada acima; aqui só o que sobra com os campos de ataque.
	for (const [pericia, alcance] of [
		["luta", "cac"],
		["pont", "ad"]
	]) {
		const daPericia = camposDaPericia(actor, pericia);
		const total = excesso(vencedores, [...daPericia, `${m}.ataque.geral`, `${m}.ataque.${alcance}`]);
		descontar(`${m}.ataque.${alcance}`, total - excesso(vencedores, daPericia));
	}
	for (const tipo of ["cac", "ad", "mag"]) {
		descontar(`${m}.dano.${tipo}`, excesso(vencedores, [`${m}.dano.geral`, `${m}.dano.${tipo}`]));
	}
	for (const atributo of ["for", "des", "con", "int", "sab", "car"]) {
		const grupo = ["for", "des", "con"].includes(atributo) ? "fisicos" : "mentais";
		descontar(`${m}.atributos.${atributo}`, excesso(vencedores, [`${m}.atributos.geral`, `${m}.atributos.${grupo}`, `${m}.atributos.${atributo}`]));
	}
}
