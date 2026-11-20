import { wrap } from "../util.mjs";

/**
 * Bug do sistema 1.6.7 (a mudança da Acuidade): ao montar o ataque de um item, o sistema lê system.propriedades.agi
 * para saber se a arma é ágil. Poderes, magias e itens que não são arma mas têm rolagem de ataque não têm o campo
 * propriedades, e a leitura quebra. Como os rótulos são montados na preparação de dados, a ficha inteira do
 * personagem deixa de ser preparada ("Failed data preparation… Cannot read properties of undefined (reading 'agi')").
 * Pega poderes de ataque natural (Mordida, Chifres, Cascos, Presas Primordiais, Asas de Aço, Marrada, Implante:
 * Garras… 40 nos compêndios) e alguns itens e magias com ataque.
 * Correção: durante o cálculo do ataque, item que não tem propriedades recebe um conjunto vazio (nenhuma
 * propriedade), que é o que ele é. Não muda nada no 1.6.5, que não lia esse campo.
 */
export default {
	id: "ataqueDePoder",
	name: "Ataques de poderes e itens que não são arma",
	hint: "No sistema 1.6.7, personagem com poder de ataque natural (Mordida, Chifres, Cascos, Asas de Aço…) ou outro item não-arma com rolagem de ataque tinha a ficha quebrada: o sistema procurava a propriedade Ágil num item que não tem propriedades. O ataque desses itens passa a ser calculado sem propriedades.",
	init() {
		wrap("CONFIG.Item.documentClass.prototype.getAttackToHit", function (wrapped, ...args) {
			const system = this.system;
			if (!system || system.propriedades !== undefined) return wrapped(...args);
			system.propriedades = {};
			try {
				return wrapped(...args);
			} finally {
				delete system.propriedades;
			}
		});
	}
};
