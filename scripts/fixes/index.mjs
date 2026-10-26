import { acumuloBonus, defesaAcessorios, reducaoCusto } from "./acumulo-bonus.mjs";
import aprimoramentoCustoZero from "./aprimoramento-custo-zero.mjs";
import assistenteEfeitos from "./assistente-efeitos.mjs";
import atributosDinamicos from "./atributos-dinamicos.mjs";
import condicaoPorNome from "./condicao-por-nome.mjs";
import criarAprimoramento from "./criar-aprimoramento.mjs";
import custoPmReal from "./custo-pm-real.mjs";
import dadosCompendios from "./dados-compendios.mjs";
import descanso from "./descanso.mjs";
import duracaoCondicoes from "./duracao-condicoes.mjs";
import cdPersonagem from "./cd-personagem.mjs";
import tamanhoArma from "./tamanho-arma.mjs";
import chanceDeFalha from "./chance-de-falha.mjs";
import poderesAutomaticos from "./poderes-automaticos.mjs";
import { bonusDeUso, circuloMinimo, limitePM, truqueExclusivo } from "./dialogo-magia.mjs";
import duracaoAprimoramento from "./duracao.mjs";
import efeitoBase from "./efeito-base.mjs";
import encantosAtivados from "./encantos-ativados.mjs";
import efeitosAntigos from "./efeitos-antigos.mjs";
import escaladaCondicoes from "./escalada-condicoes.mjs";
import expiracaoTokens from "./expiracao-tokens.mjs";
import macroSemEvento from "./macro-sem-evento.mjs";
import oleos from "./oleos.mjs";
import penalidadeArmadura from "./penalidade-armadura.mjs";
import resistenciaCondicao from "./resistencia-condicao.mjs";
import sangrando from "./sangrando.mjs";
import sustentadas from "./sustentadas.mjs";
import visao from "./visao.mjs";
import luzDoDia from "./luz-do-dia.mjs";
import cdNpc from "./cd-npc.mjs";
import atributoArma from "./atributo-arma.mjs";
import ferimentos from "./ferimentos.mjs";
import combateTatico from "./combate-tatico.mjs";
import pvPmAtributos from "./pv-pm-atributos.mjs";
import tiposDeCriatura from "./tipos-de-criatura.mjs";
import condicoesExtras from "./condicoes-extras.mjs";
import esotericos from "./esotericos.mjs";
import subirNivel from "./subir-nivel.mjs";
import proficiencia from "./proficiencia.mjs";
import perdaCarisma from "./perda-carisma.mjs";
import curaAcelerada from "./cura-acelerada.mjs";
import recarga from "./recarga.mjs";
import danoEspecial from "./dano-especial.mjs";
import magiaArmadura from "./magia-armadura.mjs";
import consumiveis from "./consumiveis.mjs";
import testes from "./testes.mjs";
import combinacoes from "./combinacoes.mjs";
import cargasMagimarciais from "./cargas-magimarciais.mjs";
import recompensas from "./recompensas.mjs";
import tesouro from "./tesouro.mjs";
import encantosCritico from "./encantos-critico.mjs";
import alimentacao from "./alimentacao.mjs";
import fabricacao from "./fabricacao.mjs";
import danoMagico from "./dano-magico.mjs";
import doencas from "./doencas.mjs";
import assistentes from "./assistentes.mjs";
import imunidadeCondicoes from "./imunidade-condicoes.mjs";
import magiasConcedidas from "./magias-concedidas.mjs";
import escolhasDeMagia from "./escolhas-de-magia.mjs";
import poderesDeDano from "./poderes-de-dano.mjs";
import poderesDeUso from "./poderes-de-uso.mjs";

/**
 * Lista de correções. Cada uma vira uma opção (ligada por padrão) nas configurações do módulo.
 * Campos: id, name, hint, init() (registro no "init"), ready() opcional.
 */
export const FIXES = [
	efeitosAntigos,
	dadosCompendios,
	acumuloBonus,
	reducaoCusto,
	defesaAcessorios,
	bonusDeUso,
	limitePM,
	circuloMinimo,
	truqueExclusivo,
	efeitoBase,
	duracaoAprimoramento,
	aprimoramentoCustoZero,
	criarAprimoramento,
	condicaoPorNome,
	custoPmReal,
	macroSemEvento,
	assistenteEfeitos,
	expiracaoTokens,
	oleos,
	escaladaCondicoes,
	sangrando,
	resistenciaCondicao,
	visao,
	luzDoDia,
	atributosDinamicos,
	penalidadeArmadura,
	sustentadas,
	descanso,
	encantosAtivados,
	duracaoCondicoes,
	cdPersonagem,
	tamanhoArma,
	chanceDeFalha,
	poderesAutomaticos,
	cdNpc,
	atributoArma,
	ferimentos,
	combateTatico,
	pvPmAtributos,
	tiposDeCriatura,
	condicoesExtras,
	esotericos,
	subirNivel,
	proficiencia,
	perdaCarisma,
	curaAcelerada,
	recarga,
	danoEspecial,
	magiaArmadura,
	consumiveis,
	testes,
	combinacoes,
	cargasMagimarciais,
	recompensas,
	tesouro,
	encantosCritico,
	alimentacao,
	fabricacao,
	danoMagico,
	doencas,
	assistentes,
	imunidadeCondicoes,
	magiasConcedidas,
	escolhasDeMagia,
	poderesDeDano,
	poderesDeUso
];
