// Fonte única dos posts de novembro de 2026. Edite aqui e rode o gerador de novo.
// Marcação nos títulos: [[texto]] = bloco verde, __texto__ = sublinhado verde.
//
// Regras seguidas (ver CLAUDE_CONTEXT.md): contato público é só o Instagram @vertice.xy,
// preços são valores iniciais do catálogo, nada aqui é trabalho entregue ou cliente real.

const CTA = 'Chama no Direct: @vertice.xy';

export const posts = [
  {
    n: '01', slug: 'custo-valor', tag: '01 / CUSTO VS VALOR',
    lines: ['O SITE', 'NÃO É GASTO.', 'É [[CAMINHO.]]'],
    illo: 'caminho', illoPos: [70, 704, 0.94], preset: 'A', seed: 11,
    data: '2026-11-09',
    alt: 'Cartaz preto e off-white com a frase "O site não é gasto. É caminho." e uma janela de site ligada por uma seta a um balão de conversa.',
    legenda: `O site não é um gasto que você paga e esquece.

É o caminho que leva alguém até você: a pessoa vê o que você faz, entende rápido e sabe como chamar.

Antes de olhar só o preço, vale perguntar: esse site facilita o próximo contato?

A gente começa por aí. Conta o que você precisa e a gente vê junto o ponto de partida certo.

${CTA}`,
  },
  {
    n: '02', slug: 'painel', tag: '02 / PAINEL ADMINISTRATIVO',
    lines: ['TUDO', '[[NUMA TELA]]', 'SÓ.'],
    illo: 'painel', illoPos: [66, 704, 0.94], preset: 'B', seed: 23, marca: [690, 470, 230, -8],
    data: '2026-11-11',
    alt: 'Cartaz com a frase "Tudo numa tela só" e um painel administrativo com menu lateral, gráfico de barras e lista de tarefas marcadas.',
    legenda: `Planilha, mensagem solta, anotação no caderno… e no fim ninguém sabe em que pé está cada coisa.

Um painel administrativo junta dados, etapas e tarefas da sua operação em uma tela só. Você olha e entende o que está pendente, o que está andando e o que já foi.

Cada painel é orçado pelo que a sua rotina pede. Prazo de referência: 15 a 25 dias úteis, dependendo do escopo.

Quer organizar a operação? ${CTA}`,
  },
  {
    n: '03', slug: 'landing-page', tag: '03 / LANDING PAGE',
    lines: ['UMA PÁGINA.', 'UM OBJETIVO.', '[[A PARTIR DE R$ 790]]'],
    illo: 'landing', illoPos: [60, 664, 0.96], preset: 'C', seed: 37, hMax: 520,
    data: '2026-11-13',
    alt: 'Cartaz com a frase "Uma página. Um objetivo." e uma landing page com cinco seções numeradas, ao lado do valor inicial R$ 790.',
    legenda: `Uma página, um objetivo. Sem menu infinito e sem distração: a pessoa chega, entende a oferta e sabe qual é o próximo passo.

Landing page a partir de R$ 790:
• 1 página com até 5 seções
• contato direto
• painel básico para editar textos e imagens
• textos e imagens fornecidos por você

Domínio, hospedagem e produção de conteúdo são avaliados à parte. É um valor inicial, não o preço final: a proposta depende do que você precisa. Prazo de referência: 5 a 7 dias úteis.

${CTA}`,
  },
  {
    n: '04', slug: 'diagnostico', tag: '04 / DIAGNÓSTICO DIGITAL',
    lines: ['NÃO SABE', 'POR ONDE', '[[COMEÇAR?]]'],
    illo: 'diagnostico', illoPos: [60, 700, 1], preset: 'A', seed: 41,
    data: '2026-11-16',
    alt: 'Cartaz com a frase "Não sabe por onde começar?" e uma lista de verificação com uma lupa, ao lado da indicação de 2 a 3 dias úteis.',
    legenda: `Você sabe que o digital da sua empresa podia ajudar mais, mas não sabe por onde começar?

O diagnóstico digital é uma análise do que está travando e do que vale priorizar. Você sai com clareza do que fazer primeiro, antes de gastar com a coisa errada.

Prazo de referência: 2 a 3 dias úteis.

Conta o que está pegando, no Direct: @vertice.xy`,
  },
  {
    n: '05', slug: 'processo', tag: '05 / PROCESSO',
    lines: ['VAMOS', 'POR [[PARTES.]]'],
    illo: 'processo', illoPos: [60, 600, 1], preset: 'B', seed: 53, hMax: 380, cap: 250,
    data: '2026-11-18',
    alt: 'Cartaz com a frase "Vamos por partes" e quatro cartões numerados: você conta, a gente organiza, a gente constrói, você recebe.',
    legenda: `Você não precisa saber explicar tudo em linguagem técnica.

1. Você conta o que está acontecendo, do jeito que conseguir.
2. A gente organiza e combina o que vem primeiro.
3. A gente constrói e mostra o avanço no caminho.
4. Você recebe, e a gente explica como usar.

Pode começar pelo problema: @vertice.xy`,
  },
  {
    n: '06', slug: 'equipe-davi', tag: '06 / EQUIPE / DAVI',
    lines: ['DAVI', '[[DESIGN +]]', 'CÓDIGO.'],
    illo: 'davi', illoPos: [60, 740, 1], preset: 'C', seed: 61, textW: 470, hMax: 520, cap: 200,
    foto: { src: 'equipe/davi.png', x: 590, y: 240, w: 430, h: 600, rot: 3 },
    data: '2026-11-20',
    alt: 'Retrato em preto e branco do Davi sobre papel rasgado, com a frase "Davi, design + código".',
    legenda: `Esse é o Davi. Cuida do design e da programação da Vértice: do wireframe ao deploy, e confirma o que é viável, o escopo e o prazo técnico de cada projeto.

Também atua com suporte técnico de informática e criação de conteúdo.

Perfil: @0ffdavi
Projetos: @vertice.xy`,
  },
  {
    n: '07', slug: 'contato', tag: '07 / CONTATO',
    lines: ['CONTE O QUE', 'ESTÁ [[PEGANDO.]]'],
    illo: 'contato', illoPos: [60, 556, 1], preset: 'B', seed: 79, hMax: 380, cap: 250,
    data: '2026-11-23',
    alt: 'Cartaz com a frase "Conte o que está pegando", uma tela de conversa e o perfil @vertice.xy em destaque.',
    legenda: `Pode ser uma ideia ainda no papel, uma tarefa repetitiva ou um site que não está ajudando.

Manda uma mensagem no Direct do @vertice.xy e conta o que está pegando. A equipe ajuda a achar o próximo passo.`,
  },
];

export const hashtags = '#desenvolvimentoweb #landingpage #sitesprofissionais #automacao #vérticedigital';
