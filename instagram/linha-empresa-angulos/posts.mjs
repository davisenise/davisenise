// Posts dos ângulos da Linha Empresa (feed 1080×1080). Fonte única: edite aqui e rode o gerador.
// IMPORTANTE: cada post tem uma "condicao". Vários afirmam algo que ainda depende de decisão do time
// (contrato, valor aprovado, programa de piloto). Não publicar antes de a condição estar cumprida.
// Marcação nos títulos: [[texto]] = bloco verde, __texto__ = sublinhado verde.

const CTA = 'Chama no Direct: @vertice.xy';
const INICIO = '2026-12-09'; // sugestão: logo depois dos 30 dias, de dois em dois dias

const lista = [
  {
    slug: 'estoque-memoria', tema: 'ESTOQUE',
    lines: ['SEU ESTOQUE', 'MORA NA MEMÓRIA', 'DE UMA [[PESSOA.]]'], illo: 'memoria',
    condicao: 'Controle de Estoque com entregável, prazo e valor aprovados pelo Davi.',
    alt: 'Cartaz com a frase "Seu estoque mora na memória de uma pessoa", uma prateleira com itens marcados por interrogação e um bilhete "Só o Zé sabe".',
    legenda: `Seu estoque mora na memória de uma pessoa?

Enquanto só o Zé sabe onde está cada item, qualquer falta, férias ou erro vira prejuízo.

Um controle de estoque simples resolve o básico: cadastro de itens, entradas e saídas, saldo, aviso de estoque mínimo e inventário. A gente importa a planilha que você já tem.

Prazo de referência: 15 a 25 dias úteis, conforme o escopo. Valor sob consulta.

${CTA}`,
  },
  {
    slug: 'preco-na-mesa', tema: 'PREÇO NA MESA',
    lines: ['QUANTO CUSTA?', 'ESTÁ NO', '[[SITE.]]'], illo: 'precoMesa',
    condicao: 'Conferir se a tabela de valores iniciais continua a vigente (R$ 790, R$ 1.490 e R$ 2.490).',
    alt: 'Cartaz com a frase "Quanto custa? Está no site" e três cartões com os valores iniciais: landing page R$ 790, site institucional R$ 1.490, loja e catálogo R$ 2.490.',
    legenda: `Quanto custa? Está no site.

• Landing page: a partir de R$ 790
• Site institucional: a partir de R$ 1.490
• Loja e catálogo: a partir de R$ 2.490

Valor inicial, não preço final: o que entra em cada pacote está explicado, e domínio, hospedagem, produção de conteúdo, checkout e integrações são avaliados à parte.

Preço na mesa é o começo da conversa, não o fim. ${CTA}`,
  },
  {
    slug: 'sem-tecniques', tema: 'SEM ENROLAÇÃO',
    lines: ['SEM TECNIQUÊS.', 'SEM REUNIÃO', 'DE [[3 HORAS.]]'], illo: 'semTecniques',
    condicao: 'A prática de marcos com demonstração de 30 minutos e relatório de 1 página precisa estar valendo na entrega.',
    alt: 'Cartaz com a frase "Sem tecniquês. Sem reunião de 3 horas", um relógio riscado e o selo "demo de 30 minutos".',
    legenda: `Sem tecniquês. Sem reunião de três horas.

A gente trabalha por marcos. A cada etapa, uma demonstração de 30 minutos e um relatório de 1 página, em português de gente. Você vê o projeto funcionando antes de seguir para a próxima.

Quem decide tem pouco tempo. O processo foi feito para respeitar isso.

${CTA}`,
  },
  {
    slug: 'dado-e-seu', tema: 'O DADO É SEU',
    lines: ['O DADO', 'É SEU.', '[[SEMPRE.]]'], illo: 'dadoSeu',
    condicao: 'Cláusula de exportação de dados e de hospedagem na conta do cliente já incluída no contrato-modelo, revisada por advogado.',
    alt: 'Cartaz com a frase "O dado é seu. Sempre", uma pasta "seus dados" ligada por seta a arquivos CSV e XLSX.',
    legenda: `O dado é seu. Sempre.

Nos projetos da Vértice, você pode exportar o que é seu quando quiser, em formatos que qualquer ferramenta abre. Sem refém, sem taxa para pegar o que já era seu.

Sempre que possível, a hospedagem fica na sua conta, e cada marco entregue vem com uma página de documentação.

${CTA}`,
  },
  {
    slug: 'quando-nao-contratar', tema: 'HONESTIDADE',
    lines: ['QUANDO NÃO', 'CONTRATAR A', '[[VÉRTICE.]]'], illo: 'quandoNao',
    condicao: 'Revisão de tom pelo Douglas, que é quem vai atender quem se identificar.',
    alt: 'Cartaz com a frase "Quando não contratar a Vértice" e quatro motivos marcados com X: um sistema pronto já resolve, só quer o mais barato, não vai ver nenhum marco, quer tudo pronto em 3 dias.',
    legenda: `Quando NÃO contratar a Vértice:

1. Um sistema pronto já resolve o seu caso. A gente fala e indica.
2. Você só quer o mais barato.
3. Não vai ter tempo de ver e aprovar cada marco.
4. Quer tudo pronto em 3 dias.

Nada disso é você? Então vamos conversar. ${CTA}`,
  },
  {
    slug: 'tres-vagas-piloto', tema: 'CLIENTE-PILOTO',
    lines: ['3 PRIMEIROS', 'CASOS.', '[[3 VAGAS.]]'], illo: 'piloto',
    condicao: 'Programa de cliente-piloto aprovado: número de vagas, abatimento e termo de autorização do caso por escrito. Só dizer "3 vagas" se forem 3 de verdade.',
    alt: 'Cartaz com a frase "3 primeiros casos, 3 vagas", três molduras numeradas de 1 a 3 e a condição: caso autorizado por escrito.',
    legenda: `Estamos montando os nossos 3 primeiros casos.

São 3 vagas de cliente-piloto. Você entra com condições especiais e, em troca, a gente documenta o projeto como caso, sempre com a sua autorização por escrito.

Se a sua empresa tem uma dor de estoque, de dados ou de rotina manual, essa é a hora. ${CTA}`,
  },
  {
    slug: 'raio-x-de-dados', tema: 'RAIO-X DE DADOS',
    lines: ['SEUS NÚMEROS', 'NUMA [[PÁGINA.]]'], illo: 'raiox', hMax: 400, cap: 250,
    condicao: 'Raio-X de Dados com entregável, prazo e valor aprovados pelo Davi.',
    alt: 'Cartaz com a frase "Seus números numa página", um painel de indicadores com uma lupa e os itens do Raio-X de Dados: mapa das fontes, painel, relatório de 1 página e 3 decisões.',
    legenda: `Seus números numa página.

O Raio-X de Dados mapeia onde estão os seus dados, monta um painel com 5 a 8 indicadores e entrega um relatório de 1 página com 3 decisões para tomar.

Prazo de referência: 5 a 7 dias úteis. Valor sob consulta, e se você seguir para um projeto, o Raio-X abate do valor.

${CTA}`,
  },
];

const DIA = 86400000;
export const posts = lista.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  const data = new Date(new Date(INICIO + 'T12:00:00Z').getTime() + i * 2 * DIA).toISOString().slice(0, 10);
  return { ...p, n, tag: `${n} / ${p.tema}`, data, seed: 211 + i * 17, preset: ['B', 'C', 'A'][i % 3] };
});

export const hashtags = '#desenvolvimentoweb #sistemasparaempresas #controledeestoque #gestao #vérticedigital';
