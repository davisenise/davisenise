// Carrosséis (1080×1350, o 4:5 do carrossel do Instagram). Cada slide é uma arte; a legenda vale para o
// carrossel inteiro e fica no primeiro slide. Fonte única: edite aqui e rode o gerador.
// Marcação nos títulos: [[texto]] = bloco verde. No texto corrido: **texto** = destaque verde.

const CTA = 'Chama no Direct: @vertice.xy';
const base = { H: 1350, hMax: 520, cap: 200, textW: 920, corpoSize: 36, limpo: true };
const igual = (n, total) => `Slide ${n} de ${total}. A legenda é a do primeiro slide.`;

const A = (n, extra) => ({ ...extra, car: 'ORÇAMENTO', pos: n, total: 8, preset: 'B' });
const B = (n, extra) => ({ ...extra, car: 'MITO OU VERDADE', pos: n, total: 7, preset: 'C' });

const lista = [
  // ─── Carrossel 1: como pedir um orçamento em 4 passos ───
  A(1, {
    slug: 'orcamento-capa', data: '2026-12-16',
    lines: ['COMO PEDIR', 'UM ORÇAMENTO', 'EM [[4 PASSOS.]]'], illo: 'deslize',
    corpo: 'Do primeiro Direct até a proposta, sem tecniquês.',
    condicao: 'O fluxo precisa ser o praticado de fato: triagem com 5 perguntas pelo Douglas e proposta de 2 páginas válida por 10 dias.',
    alt: 'Capa do carrossel "Como pedir um orçamento em 4 passos", com o convite para deslizar.',
    legenda: `Como pedir um orçamento em 4 passos.

1. Chama no Direct do @vertice.xy.
2. Conta o que você precisa, do jeito que conseguir.
3. Recebe o valor inicial do que se encaixa.
4. A equipe confirma escopo e prazo, e você recebe a proposta aprovada.

Salva esse resumo para quando precisar. ${CTA}`,
  }),
  A(2, { slug: 'orcamento-passo-1', lines: ['[[PASSO 1]]', 'CHAMA NO DIRECT.'], illo: 'passo1',
    corpo: 'Manda uma mensagem para **@vertice.xy**. Pode ser uma frase só: o que hoje te dá mais trabalho na empresa?',
    alt: 'Passo 1: chama no Direct. Um exemplo de mensagem pedindo ajuda com estoque e o perfil @vertice.xy.', legenda: igual(2, 8) }),
  A(3, { slug: 'orcamento-passo-2', lines: ['[[PASSO 2]]', 'CONTA O QUE', 'PRECISA.'], illo: 'triagem',
    corpo: 'Do jeito que conseguir. O Douglas faz **cinco perguntas**, uma de cada vez, para entender o seu caso.',
    alt: 'Passo 2: conta o que precisa. As cinco perguntas de triagem: como resolve hoje, quantas pessoas usam, o que acontece se erra, já tentou algo pronto e quem decide.', legenda: igual(3, 8) }),
  A(4, { slug: 'orcamento-passo-3', lines: ['[[PASSO 3]]', 'RECEBE O', 'VALOR INICIAL.'], illo: 'precoMesa',
    corpo: 'Um ponto de partida, com o que entra e o que fica de fora. **Valor inicial não é preço final.**',
    alt: 'Passo 3: recebe o valor inicial. Os três valores iniciais: landing page R$ 790, site institucional R$ 1.490 e loja e catálogo R$ 2.490.', legenda: igual(4, 8) }),
  A(5, { slug: 'orcamento-passo-4', lines: ['[[PASSO 4]]', 'APROVA A', 'PROPOSTA.'], illo: 'proposta',
    corpo: 'A equipe confirma escopo, prazo e preço. Você recebe uma proposta de **duas páginas**, válida por 10 dias.',
    alt: 'Passo 4: aprova a proposta. Um documento de proposta com escopo, prazo e valor, válido por 10 dias.', legenda: igual(5, 8) }),
  A(6, { slug: 'orcamento-o-que-ter', lines: ['O QUE AJUDA', 'TER POR [[PERTO.]]'], illo: 'oQueMandar',
    corpo: 'Não tem tudo? A gente combina o que falta.',
    alt: 'Lista do que ajuda ter por perto: logo e cores, textos, fotos e imagens, acessos se houver e referências.', legenda: igual(6, 8) }),
  A(7, { slug: 'orcamento-resumo', lines: ['[[SALVA]]', 'ESSE RESUMO.'], illo: 'resumoPassos', hMax: 380,
    alt: 'Resumo salvável: chama no Direct, conta o que precisa, recebe o valor inicial, aprova a proposta.', legenda: igual(7, 8) }),
  A(8, { slug: 'orcamento-cta', lines: ['CHAMA NO', '[[DIRECT.]]'], illo: 'fechamento', hMax: 400,
    corpo: 'É só uma conversa para começar.',
    alt: 'Último slide: chama no Direct, com o símbolo da Vértice e o perfil @vertice.xy em destaque.', legenda: igual(8, 8) }),

  // ─── Carrossel 2: mito ou verdade ───
  B(1, {
    slug: 'mito-capa', data: '2026-12-23',
    lines: ['MITO', 'OU', '[[VERDADE?]]'], illo: 'carimbos',
    corpo: 'Cinco frases sobre site e sistema. Desliza e confere.',
    condicao: 'O slide 5 (demonstração de 30 minutos a cada marco) só vale quando essa prática estiver ativa na entrega.',
    alt: 'Capa do carrossel "Mito ou verdade?", com os carimbos mito e verdade.',
    legenda: `Mito ou verdade sobre site e sistema?

1. Um site pronto resolve tudo.
2. Planilha é sempre pior que sistema.
3. Valor inicial é preço final.
4. Dá para ver o projeto antes de terminar.
5. Você precisa entender de tecnologia.

Qual dessas você já ouviu? Conta nos comentários. ${CTA}`,
  }),
  B(2, { slug: 'mito-site-pronto', lines: ['UM SITE PRONTO', 'RESOLVE', '[[TUDO.]]'], illo: 'carimboMito', corpo: 'Resolve muita coisa. Mas quando o seu processo não cabe no pronto, ou os sistemas precisam conversar, compensa sob medida. E se o pronto resolve, **a gente fala e não vende.**',
    alt: 'Mito: um site pronto resolve tudo. Carimbo de mito e a explicação.', legenda: igual(2, 7) }),
  B(3, { slug: 'mito-planilha', lines: ['PLANILHA É', 'SEMPRE PIOR QUE', '[[SISTEMA.]]'], illo: 'carimboMito', corpo: 'Planilha resolve muita coisa. O problema começa quando cada pessoa tem uma versão e **ninguém sabe qual vale**.',
    alt: 'Mito: planilha é sempre pior que sistema. Carimbo de mito e a explicação.', legenda: igual(3, 7) }),
  B(4, { slug: 'mito-valor-inicial', lines: ['VALOR INICIAL', 'É PREÇO', '[[FINAL.]]'], illo: 'carimboMito', corpo: 'É o ponto de partida do escopo base. Domínio, hospedagem, checkout e integrações são avaliados à parte, e a **proposta final depende do que você precisa**.',
    alt: 'Mito: valor inicial é preço final. Carimbo de mito e a explicação.', legenda: igual(4, 7) }),
  B(5, { slug: 'verdade-ver-antes', lines: ['DÁ PARA VER O', 'PROJETO ANTES DE', '[[TERMINAR.]]'], illo: 'carimboVerdade', corpo: 'A cada marco, uma **demonstração de 30 minutos**. Você vê funcionando antes de seguir para a próxima etapa.',
    alt: 'Verdade: dá para ver o projeto antes de terminar. Carimbo de verdade e a explicação.', legenda: igual(5, 7) }),
  B(6, { slug: 'mito-entender-tecnologia', lines: ['VOCÊ PRECISA', 'ENTENDER DE', '[[TECNOLOGIA.]]'], illo: 'carimboMito', corpo: 'A gente traduz e explica cada passo em português simples. **Você só precisa contar o problema.**',
    alt: 'Mito: você precisa entender de tecnologia. Carimbo de mito e a explicação.', legenda: igual(6, 7) }),
  B(7, { slug: 'mito-cta', lines: ['CHAMA NO', '[[DIRECT.]]'], illo: 'fechamento', hMax: 400, corpo: 'Ficou alguma dúvida? Manda a frase que você quer ver aqui.',
    alt: 'Último slide: chama no Direct, com o símbolo da Vértice e o perfil @vertice.xy em destaque.', legenda: igual(7, 7) }),
];

export const posts = lista.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { ...base, ...p, n, tema: `${p.car} ${p.pos}/${p.total}`, tag: `${p.car} · ${p.pos}/${p.total}`, seed: 801 + i * 29 };
});

export const hashtags = '#desenvolvimentoweb #sistemasparaempresas #landingpage #gestao #vérticedigital';
