// Capas de destaque (1080×1920). O desenho fica no centro, onde o Instagram recorta o círculo.
// Cada capa ilustra um destaque do documento "Banco de ideias". Os dois últimos ficam guardados
// até haver conteúdo para eles (ver "Quando criar" no documento).

const base = {
  H: 1920, semRotulo: true, centro: true, headY: 1100, textW: 760, cap: 190, hMax: 230, headRot: -1,
  illoBox: [240, 520, 600, 520],
};

const lista = [
  { slug: 'comeca-aqui', tema: 'COMEÇA AQUI', lines: ['COMEÇA [[AQUI]]'], illo: 'capaSeta', texto: 'Quem somos, o que fazemos e como pedir.' },
  { slug: 'empresa', tema: 'EMPRESA', lines: ['[[EMPRESA]]'], illo: 'capaEngrenagem', texto: 'As soluções da Linha Empresa, uma por quadro. Criar quando tiverem valor aprovado.' },
  { slug: 'leve', tema: 'LEVE', lines: ['[[LEVE]]'], illo: 'capaRaio', texto: 'Landing page, site, loja, cartão digital e auditoria.' },
  { slug: 'precos', tema: 'PREÇOS', lines: ['[[PREÇOS]]'], illo: 'capaEtiqueta', texto: 'Valores iniciais e o que fica de fora. Só com valores aprovados.' },
  { slug: 'processo', tema: 'PROCESSO', lines: ['[[PROCESSO]]'], illo: 'capaPassos', texto: '"Vamos por partes", marcos e prazos de referência.' },
  { slug: 'duvidas', tema: 'DÚVIDAS', lines: ['[[DÚVIDAS]]'], illo: 'capaInterro', texto: 'Respostas da caixa de perguntas e mitos. Criar depois da primeira caixa.' },
  { slug: 'equipe', tema: 'EQUIPE', lines: ['[[EQUIPE]]'], illo: 'capaRostos', texto: 'Davi, Douglas e Leonardo, cada um no seu papel, com autorização de cada um.' },
  { slug: 'contato', tema: 'CONTATO', lines: ['[[CONTATO]]'], illo: 'capaBalao', texto: 'Como chamar e o que contar no primeiro Direct.' },
  { slug: 'bastidor', tema: 'BASTIDOR', lines: ['[[BASTIDOR]]'], illo: 'capaBastidor', texto: 'Making-of, diário do Núcleo e produção das artes. Guardar até haver 5 quadros.' },
  { slug: 'casos', tema: 'CASOS', lines: ['[[CASOS]]'], illo: 'capaVisto', texto: 'Casos de clientes-piloto, só com autorização por escrito. Guardar até existir o primeiro.' },
];

export const posts = lista.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    ...base, ...p, n, tag: p.tema, seed: 601 + i * 23, preset: ['A', 'B', 'C'][i % 3],
    alt: `Capa de destaque "${p.tema.toLowerCase()}" com ícone em verde ácido e papel rasgado, no estilo da Vértice.`,
    legenda: `Nome do destaque: **${p.tema}**. ${p.texto}`,
  };
});

export const hashtags = '';
