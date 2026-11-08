// Modelos de story (1080×1920). Faixas de segurança: ~250 px no topo e ~340 px embaixo ficam livres
// para a interface do Instagram. O texto em "legenda" é o roteiro de uso de cada modelo.

const base = { H: 1920, tagTop: 250, footBottom: 380, headY: 340, hMax: 700, cap: 280 };

const lista = [
  {
    slug: 'enquete', tema: 'STORY / ENQUETE',
    lines: ['VOCÊ AINDA', 'FAZ ISSO', 'NA [[MÃO?]]'], illo: 'slotEnquete', illoBox: [90, 1070, 900, 380],
    alt: 'Modelo de story com a pergunta "Você ainda faz isso na mão?" e um cartão com exemplo para colocar a enquete.',
    legenda: `Segunda-feira. Troque o exemplo do cartão pela tarefa da semana. Coloque o sticker de enquete ("Sim" e "Não") sobre a área indicada. No quadro seguinte, mostre o resultado e convide: "Chama no Direct: @vertice.xy".`,
  },
  {
    slug: 'caixa-de-perguntas', tema: 'STORY / PERGUNTAS',
    lines: ['PERGUNTA', 'PRO [[DAVI.]]'], illo: 'slotPergunta', illoBox: [90, 900, 900, 520], hMax: 520,
    alt: 'Modelo de story com a chamada "Pergunta pro Davi" e um cartão para colocar a caixa de perguntas.',
    legenda: `Quinta-feira. Coloque o sticker de caixa de perguntas sobre a área indicada. As respostas viram novos stories (em vídeo ou em cartaz), e as melhores viram post de "Resposta do Direct". Troque o nome se outra pessoa da equipe responder.`,
  },
  {
    slug: 'mito-ou-verdade', tema: 'STORY / MITO OU VERDADE',
    lines: ['MITO', 'OU', '[[VERDADE?]]'], illo: 'slotMito', illoBox: [90, 1070, 900, 390],
    alt: 'Modelo de story com "Mito ou verdade?", a afirmação "Site precisa de login?" e os dois carimbos mito e verdade.',
    legenda: `Terça-feira. Troque a afirmação do cartão. Use o sticker de quiz para a resposta. No quadro seguinte, explique em uma frase. Escolha afirmações que a equipe consegue sustentar.`,
  },
  {
    slug: 'bastidor', tema: 'STORY / BASTIDOR',
    lines: ['BASTIDOR', '[[HOJE.]]'], illo: 'slotBastidor', illoBox: [90, 770, 900, 690], hMax: 380,
    alt: 'Modelo de story com a palavra "Bastidor hoje" e uma moldura de papel rasgado para foto ou vídeo do dia.',
    legenda: `Quarta-feira. Coloque uma foto ou um vídeo curto do dia sobre a área escura da moldura: o Davi na tela, o Leonardo na produção, o Douglas em uma conversa. Marque com o @ quem aparece. Nunca mostre dados de cliente.`,
  },
  {
    slug: 'preco-na-mesa', tema: 'STORY / PREÇO NA MESA',
    lines: ['PREÇO', 'NA [[MESA.]]'], illo: 'precoMesaV', illoBox: [90, 770, 900, 670], hMax: 380,
    alt: 'Modelo de story com "Preço na mesa" e os três valores iniciais: landing page R$ 790, site institucional R$ 1.490, loja e catálogo R$ 2.490.',
    legenda: `Sexta-feira. Usa só os valores iniciais já aprovados. Antes de postar, conferir se a tabela continua a vigente. Feche com um quadro de "Chama no Direct".`,
  },
  {
    slug: 'chama-no-direct', tema: 'STORY / CONTATO',
    lines: ['CHAMA NO', '[[DIRECT.]]'], illo: 'contatoStory', illoBox: [90, 800, 900, 620], hMax: 380,
    alt: 'Modelo de story com a frase "Chama no Direct" e o perfil @vertice.xy em destaque.',
    legenda: `Domingo, ou o último quadro de qualquer sequência. É o único contato público aprovado: Instagram @vertice.xy.`,
  },
  {
    slug: 'contagem-black-friday', tema: 'STORY / CONTAGEM',
    lines: ['BLACK FRIDAY', 'É DIA', '[[27/11.]]'], illo: 'slotContagem', illoBox: [90, 1070, 900, 390],
    alt: 'Modelo de story com "Black Friday é dia 27/11", uma contagem regressiva e a pergunta "Sua página está pronta?".',
    legenda: `Para os dias antes de 27/11. Coloque o sticker de contagem regressiva sobre os números "00". Não é promoção da Vértice: é lembrete para quem quer divulgar uma oferta. Não prometa prazo sem a palavra "referência".`,
  },
];

export const posts = lista.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  return { ...base, ...p, n, tag: p.tema, seed: 401 + i * 19, preset: ['A', 'B', 'C'][i % 3] };
});

export const hashtags = '';
