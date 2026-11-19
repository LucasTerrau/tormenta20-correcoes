import { MODULE_ID } from "../constants.mjs";

/**
 * Bug do sistema 1.6.5 (corrigido na 1.6.7): a janela que edita campos em JSON — "Comportamentos de Região" da área
 * de uma magia ou habilidade e o JSON dos comportamentos de uma aura no efeito — aponta para um molde que não veio no
 * pacote (templatesV2/api/document-field.hbs) e não abre ("Failed to load template").
 * Correção: enquanto o sistema apontar para o molde que falta, a janela usa um molde equivalente do módulo.
 */
const QUEBRADO = "systems/tormenta20/templatesV2/api/document-field.hbs";

export default {
	id: "editorDeCampos",
	name: "Editor de comportamentos de região",
	hint: "No sistema 1.6.5, o botão de Comportamentos de Região da área (magias e habilidades) e o editor de JSON das auras nos efeitos não abriam (faltava um arquivo do sistema). Voltam a abrir.",
	init() {
		const janela = globalThis.tormenta20?.applications?.api?.DocumentFieldSheet;
		const parte = janela?.PARTS?.body;
		if (parte?.template === QUEBRADO) parte.template = `modules/${MODULE_ID}/templates/campos-do-documento.hbs`;
	}
};
