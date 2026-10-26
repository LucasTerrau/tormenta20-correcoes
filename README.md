# Tormenta20 — Correções de Regras

Módulo para o Foundry VTT que corrige bugs do sistema **Tormenta20** para ele seguir as regras do livro: custo e limite de PM, aprimoramentos de magia, acúmulo de bônus, condições, efeitos dos compêndios (inclusive dos módulos Bestiário e Suplementos de Arton), doenças, tesouro, XP e mais. Também traz um assistente de criação de personagem e de subida de nível.

**Cada correção é uma opção** em *Configurações → Configurar Módulos → Tormenta20 — Correções de Regras*: dá para desligar qualquer uma.

## Requisitos

- **Foundry VTT v14** (testado no build 367). Não funciona na v13.
- **Sistema Tormenta20 1.6.5**.
- **libWrapper** (o Foundry instala junto).

Se você joga na v13 e não quer migrar as mesas, dá para ter as duas versões instaladas, cada uma com sua pasta de dados (atalho com `--dataPath="..."`). Faça backup antes: abrir um mundo na v14 converte os dados e não tem volta.

## Instalação

No Foundry: *Módulos de Complemento → Instalar Módulo*, cole o link abaixo em **URL do Manifesto** e clique em Instalar.

```
https://github.com/LucasTerrau/tormenta20-correcoes/releases/latest/download/module.json
```

As atualizações chegam pelo próprio Foundry.

## Correções (70)

- 0 PV e morte
- Acúmulo de bônus pela regra do livro
- Alimentação: pratos especiais
- Aprimoramento de 0 PM não vira Truque
- Aprimoramentos criados na ficha funcionam
- Armas: Acuidade, Ágil, Estilo de Disparo e Briga
- Assistente de efeitos: modo e Passo de Dano
- Assistentes de criação e de subir de nível
- Atributos Dinâmicos das raças
- Batata valkariana (+1d6 em um teste)
- Bônus na hora da rolagem também seguem o acúmulo
- Catalisadores gastos e CD de poções
- CD de personagem: bônus e atributo da classe
- CD própria de cada habilidade de NPC
- Chance de falha e invisibilidade no ataque
- Combinações
- Combinações do Lutador: contagem automática
- Condição pelo chat rola a resistência
- Condições aplicadas por nome
- Condições do cartão com a duração da habilidade
- Condições que pioram ao se repetir
- Confuso rola o d6; Sobrecarregado se atualiza
- Cura acelerada no início do turno
- Custo de PM: conferência e mínimo de 1 PM
- Dados quebrados dos compêndios
- Dano mágico e mundano: Incorpóreo, RD/mágico e fontes mundanas
- Dano à metade, imunidade a crítico e dano não letal
- Defesa: só um item além de armadura e escudo
- Descanso pelas contas do livro
- Dilacerante e Lancinante no crítico
- Doenças: exposição, teste do dia e cura
- Efeitos antigos do Bestiário, Suplementos e NPCs importados
- Efeitos de tokens sem vínculo expiram depois de recarregar
- Encantos com parte ativada (2 PM e afins)
- Escolhas de magia dos poderes
- Esotéricos empunhados e um por magia
- Fabricação: Preparar Poção, Escrever Pergaminho e botão Fabricar
- Habilidades da classe ao subir de nível
- Imunidade a condição vinda de efeito
- Iniciativa, escolher 10/20, testes opostos e manobras
- Investida (–2 na Defesa)
- Limite de PM por uso (magias e poderes)
- Luz do dia nas cenas
- Macros de item na barra de atalhos
- Magia arcana de armadura e Dissipar Magia
- Magias concedidas por poderes
- Magias: \
- Magias: durações com acento, plural e semana
- Magias: pré-requisito e teto de círculo dos aprimoramentos
- Magias: Truque não combina com outros aprimoramentos
- Magimarcialista: cargas arcanas e marciais
- Novo personagem
- Penalidade de armadura: reduções reduzem
- Poderes da Tormenta tiram Carisma
- Poderes de uso (Comunhão Suprema, Exercitar, Campeão, Aura Restauradora)
- Poderes dos suplementos que eram feitos à mão
- Poderes que reagem ao dano (Ossos Frágeis, Resiliência Marcial)
- Proficiência em armas e armaduras
- PV e PM contam bônus de atributo
- Recarga das habilidades de NPC
- Reduções de custo de PM não acumulam
- Sangrando: teste de Constituição no início do turno
- Situações de combate (caído, flanquear, distância, investida, cobertura)
- Sustentadas: pagar a cada turno, uma magia por vez
- Tamanho da arma
- Tesouro: Tabela 8-1, tabelas do JdA e itens dos suplementos
- Tipos de criatura: imunidades e cura
- Visão pelos sentidos da ficha
- XP por ND e cartão de recompensas do combate
- Óleos de arma aplicam o bônus

## Bugs e sugestões

Abra uma issue aqui no GitHub ou me chame no Discord (Terrinha). Diga a versão do Foundry, do sistema e qual correção estava ligada.

## Aviso

Projeto de fã, sem vínculo com a Jambô Editora nem com os autores do sistema Tormenta20 para Foundry. Tormenta20 é marca e propriedade da Jambô Editora. Este pacote não traz texto nem ilustrações dos livros: só código, números de regras e referências de página. Para jogar, use os seus livros.

Código sob licença MIT (arquivo `LICENSE`).
