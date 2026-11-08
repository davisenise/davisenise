// Ilustrações dos posts 02 em diante. Mesmo traço de cartaz xerox das primeiras.
// "{{MARCA}}" é trocado pelo caminho do PNG da marca em pagina.mjs.
import { C } from './estilo.mjs';
import {
  janela, linhas, barras, visto, ponta, seta, balao, engrenagem, cursor, lupa, alerta, selo, pilula,
} from './ilustracoes.mjs';

const K = C.ink, P = C.paper, G = C.acid, B = C.blue;
const GR = '#9a9a93', LG = '#d6d4ca';
const SW = 5;

const t = (x, y, s, { size = 22, font = 'DM Mono', w = 500, fill = K, anchor = 'start', ls = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-weight="${w}" font-size="${size}" letter-spacing="${ls}" text-anchor="${anchor}" fill="${fill}">${s}</text>`;

const anton = (x, y, s, size, fill = K, anchor = 'start') => t(x, y, s, { size, font: 'Anton', w: 400, fill, anchor });

const caixa = (x, y, w, h, texto, { cor = P, tx = K, size = 34 } = {}) => {
  const ls = [].concat(texto);
  const gap = size * 1.15;
  const y0 = h / 2 - ((ls.length - 1) * gap) / 2 + size * 0.36;
  return `<g transform="translate(${x} ${y})"><rect x="9" y="9" width="${w}" height="${h}" fill="url(#dots)"/>
  <rect width="${w}" height="${h}" fill="${cor}" stroke="${K}" stroke-width="4"/>
  ${ls.map((l, i) => anton(w / 2, (y0 + i * gap).toFixed(1), l, size, tx, 'middle')).join('')}</g>`;
};

const blocoHandle = (x, y, w, h, rot, rotulo, tam) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="12" y="12" width="${w}" height="${h}" fill="url(#dots)"/>
  <rect width="${w}" height="${h}" fill="${G}" stroke="${K}" stroke-width="5"/>
  ${t(24, 42, rotulo, { size: 24, ls: 4 })}
  <text x="24" y="${h - 22}" font-family="Anton" font-size="${tam}" fill="${K}" textLength="${w - 48}" lengthAdjust="spacingAndGlyphs">@VERTICE.XY</text></g>`;

const caixaCheck = (x, y, txt, ok = true, size = 24) =>
  `<g transform="translate(${x} ${y})"><rect width="34" height="34" fill="${ok ? G : P}" stroke="${K}" stroke-width="4"/>${ok ? visto(8, 19, 0.7, K, 5) : ''}${t(54, 26, txt, { size })}</g>`;

export const extras = {
  // 02 / quem somos
  quemSomos: () => `<image href="{{MARCA}}" x="0" y="0" width="300" height="284" filter="url(#marca)"/>`
    + pilula(360, 10, 'DESIGN + PROGRAMAÇÃO') + pilula(360, 72, 'CONTEÚDO + MARCA')
    + pilula(360, 134, 'PROSPECÇÃO + OPERAÇÃO') + pilula(360, 204, 'DIREÇÃO PRÓPRIA', { cor: G }),

  // 04 / celular
  celular: () => {
    const fone = `<g><rect x="12" y="12" width="210" height="350" rx="30" fill="url(#dots)"/>
      <rect width="210" height="350" rx="30" fill="${P}" stroke="${K}" stroke-width="${SW}"/>
      <rect x="70" y="14" width="70" height="14" rx="7" fill="${K}"/>
      <rect x="18" y="44" width="174" height="86" fill="${K}"/><polygon points="30,118 58,76 86,118" fill="${P}"/>
      <rect x="104" y="64" width="76" height="8" fill="${P}"/><rect x="104" y="82" width="56" height="8" fill="${P}"/>
      ${linhas(18, 150, 174, 3, 16, 8)}
      <rect x="18" y="218" width="174" height="44" fill="${G}" stroke="${K}" stroke-width="4"/>
      ${linhas(18, 282, 174, 3, 16, 8, LG)}<rect x="75" y="338" width="60" height="6" rx="3" fill="${K}"/></g>`;
    return fone + cursor(120, 236, 0.8)
      + pilula(300, 30, 'ABRE BEM NO CELULAR') + pilula(300, 92, 'BOTÃO FÁCIL DE TOCAR')
      + pilula(300, 154, 'TEXTO FÁCIL DE LER') + pilula(300, 216, 'LEVE PRA CARREGAR', { cor: G });
  },

  // 05 / site institucional
  siteInst: () => {
    const mini = (x, txt) => janela(x, 200, 124, 100, t(62, 66, txt, { size: 15, anchor: 'middle' }) + linhas(18, 78, 88, 2, 14, 6), { barra: 28, pontos: false });
    const xs = [0, 142, 284, 426];
    const lig = xs.map((x) => `<path d="M275 136V168H${x + 62}V198" fill="none" stroke="${P}" stroke-width="4"/>`).join('');
    const topo = janela(195, 0, 160, 128, t(80, 78, 'INÍCIO', { size: 24, anchor: 'middle' }) + linhas(20, 92, 120, 2, 14, 6), { barra: 34 });
    return lig + topo + ['SERVIÇOS', 'SOBRE', 'CONTATO', 'EQUIPE'].map((n, i) => mini(xs[i], n)).join('')
      + selo(620, 6, 'A PARTIR DE', 'R$ 1.490', { rot: -3, tam: 76 })
      + pilula(620, 216, 'ATÉ 5 PÁGINAS') + pilula(620, 272, 'CONTATO DIRETO', { cor: G });
  },

  // 06 / linguagem simples
  naoEntende: () =>
    balao(0, 0, 560, 150, t(30, 54, 'PRECISO DE UM SITE,', { size: 32 }) + t(30, 94, 'MAS NÃO ENTENDO', { size: 32 }) + t(30, 134, 'NADA DE TECNOLOGIA.', { size: 32 }), { cauda: 'l' })
    + balao(330, 190, 630, 170, anton(30, 64, 'TUDO BEM. A GENTE', 46) + anton(30, 116, 'EXPLICA EM LINGUAGEM', 46) + anton(30, 168, 'SIMPLES.', 46), { cor: G, cauda: 'r' }),

  // 08 / página de campanha
  campanha: () => {
    const jan = janela(0, 0, 500, 320, `<rect x="22" y="58" width="456" height="116" fill="${K}"/>
      ${anton(42, 138, 'OFERTA', 78, P)}${t(300, 124, '(EXEMPLO)', { size: 20, fill: G })}
      ${[0, 1, 2, 3].map((i) => `<g transform="translate(${22 + i * 116} 190)"><rect width="104" height="52" fill="${LG}" stroke="${K}" stroke-width="3"/>${anton(52, 40, '00', 36, K, 'middle')}</g>`).join('')}
      <rect x="22" y="258" width="210" height="38" fill="${G}" stroke="${K}" stroke-width="4"/>${anton(127, 286, 'QUERO', 26, K, 'middle')}`);
    return jan + cursor(214, 276, 0.8)
      + pilula(550, 16, '1 OFERTA') + pilula(550, 78, '1 PRAZO') + pilula(550, 140, '1 BOTÃO', { cor: G })
      + selo(550, 216, 'REFERÊNCIA', '5 A 7 DIAS ÚTEIS', { rot: -2, tam: 44 });
  },

  // 10 / planilha vs sistema
  planilha: () => {
    const fills = [null, G, null, null, LG, null, null, null, B, null, null, G, LG, null, null, null, G, null, null, B, null, LG, null, null];
    let g = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      const f = fills[r * 6 + c];
      g += `<rect x="${14 + c * 60}" y="${58 + r * 52}" width="60" height="52" fill="${f ?? P}" stroke="${K}" stroke-width="2.5"/>`;
      if (!f && (r + c) % 3 === 0) g += `<rect x="${22 + c * 60}" y="${78 + r * 52}" width="${28 + ((r * 7 + c * 3) % 3) * 8}" height="7" fill="${GR}"/>`;
    }
    const dash = janela(560, 16, 330, 250, `${barras(30, 96, 150, 110, [0.4, 0.7, 0.55, 0.9], K, 3)}
      <rect x="206" y="64" width="100" height="40" fill="${LG}" stroke="${K}" stroke-width="3"/><rect x="214" y="74" width="50" height="14" fill="${K}"/>
      ${linhas(206, 124, 100, 4, 22, 8)}`);
    return janela(0, 0, 388, 284, g) + dash
      + seta('M414 140 C 450 120, 490 120, 534 140', 538, 141, 12)
      + pilula(30, 316, 'PLANILHA SOLTA') + pilula(560, 316, 'SISTEMA ORGANIZADO', { cor: G });
  },

  // 11 / sinais
  sinais: () => ['NINGUÉM SABE COMO CHAMAR', 'DIFÍCIL DE ATUALIZAR SOZINHO', 'ABRE MAL NO CELULAR']
    .map((s, i) => alerta(40, 44 + i * 96, 0.8) + pilula(104, 22 + i * 96, s, { size: 26 })).join('')
    + lupa(800, 120, 58),

  // 13 / domínio e hospedagem
  dominio: () => {
    const c1 = janela(0, 0, 420, 320, `<rect x="20" y="58" width="380" height="46" fill="${LG}" stroke="${K}" stroke-width="3"/>${t(34, 89, 'seunome.com.br', { size: 26 })}
      ${linhas(24, 134, 372, 3, 22)}${anton(24, 258, 'DOMÍNIO', 64)}${t(26, 302, '= O ENDEREÇO', { size: 26 })}`);
    const server = [0, 1, 2].map((i) => `<g transform="translate(24 ${54 + i * 46})"><rect width="372" height="38" fill="${i === 1 ? G : LG}" stroke="${K}" stroke-width="3"/><circle cx="24" cy="21" r="6" fill="${K}"/><rect x="48" y="14" width="150" height="9" fill="${GR}"/></g>`).join('');
    const c2 = `<g transform="translate(540 0)"><rect x="12" y="12" width="420" height="320" rx="12" fill="url(#dots)"/>
      <rect width="420" height="320" rx="12" fill="${P}" stroke="${K}" stroke-width="${SW}"/>
      <path d="M0 40V12A12 12 0 0 1 12 0H408A12 12 0 0 1 420 12V40Z" fill="${K}"/>
      ${server}${anton(24, 258, 'HOSPEDAGEM', 64)}${t(26, 302, '= O TERRENO', { size: 26 })}</g>`;
    return c1 + c2 + anton(480, 190, '+', 120, G, 'middle');
  },

  // 15 / loja e catálogo
  loja: () => {
    const card = (x, y, i) => `<g transform="translate(${x} ${y})"><rect width="164" height="126" fill="${LG}" stroke="${K}" stroke-width="3"/>
      <rect x="8" y="8" width="148" height="70" fill="${K}"/><polygon points="22,70 50,34 78,70" fill="${P}"/><circle cx="108" cy="34" r="8" fill="${P}"/>
      <rect x="8" y="90" width="80" height="8" fill="${GR}"/><rect x="8" y="106" width="46" height="12" fill="${i % 2 ? G : P}" stroke="${K}" stroke-width="2"/></g>`;
    let g = '';
    for (let i = 0; i < 6; i++) g += card(24 + (i % 3) * 182, 58 + Math.floor(i / 3) * 142, i);
    return janela(0, 0, 580, 356, g)
      + selo(620, 10, 'A PARTIR DE', 'R$ 2.490', { rot: -3, tam: 74 })
      + pilula(620, 204, 'ATÉ 12 PRODUTOS') + pilula(620, 260, 'CATÁLOGO EDITÁVEL') + pilula(620, 316, 'CHECKOUT À PARTE', { cor: G });
  },

  // 16 / valor inicial vs preço final
  orcamento: () => caixa(0, 170, 290, 112, ['01', 'VALOR', 'INICIAL'], { size: 30 })
    + caixa(330, 90, 290, 192, ['02', 'ESCOPO', 'COMBINADO'], { size: 40 })
    + caixa(660, 10, 290, 272, ['03', 'PROPOSTA', 'APROVADA'], { size: 48, cor: G })
    + ponta(322, 226, 0, 20, G, 8) + ponta(652, 186, 0, 20, G, 8),

  // 17 / automação
  automacao: () => {
    const row = (y, s) => `${engrenagem(48, y + 18, 16)}${t(78, y + 25, s, { size: 20 })}`;
    const jan = janela(0, 0, 340, 280, row(68, 'COPIAR DADOS') + row(124, 'ENVIAR E-MAIL') + row(180, 'ATUALIZAR PLANILHA') + `<rect x="22" y="236" width="296" height="10" fill="${LG}"/>`);
    return jan + seta('M362 140 H 436', 440, 140, 0) + engrenagem(548, 140, 84, G)
      + seta('M658 140 H 730', 734, 140, 0) + caixa(750, 70, 190, 140, ['FEITO.'], { size: 54 })
      + pilula(360, 236, '3 A 7 DIAS ÚTEIS', { size: 22 });
  },

  // 18 / equipe: Douglas
  douglas: () => pilula(0, 0, 'PROSPECÇÃO + CONTATO') + pilula(0, 62, 'PRAZOS + REVISÃO') + pilula(0, 124, '@DOUGLAS.FD', { cor: G }),

  // 25 / equipe: Leonardo
  leonardo: () => pilula(0, 0, 'FOTO + VÍDEO') + pilula(0, 62, 'ROSTO DA VÉRTICE') + pilula(0, 124, '@O_LEO_GARCIA', { cor: G }),

  // 19 / demonstração fictícia
  conceito: () => {
    const poste = `<g transform="translate(40 76)"><defs><clipPath id="poleclip"><rect width="56" height="210" rx="10"/></clipPath></defs>
      <g clip-path="url(#poleclip)"><rect width="56" height="210" fill="${P}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M-10 ${i * 34 - 20} L66 ${i * 34 + 20}" stroke="${B}" stroke-width="14"/>`).join('')}</g>
      <rect width="56" height="210" rx="10" fill="none" stroke="${K}" stroke-width="4"/></g>`;
    const jan = janela(0, 0, 560, 330, `${poste}${anton(130, 132, 'BARBEARIA', 64)}${anton(130, 196, 'EXEMPLO', 64)}${t(132, 232, 'AGENDE SEU HORÁRIO', { size: 20 })}
      <rect x="130" y="250" width="220" height="42" fill="${G}" stroke="${K}" stroke-width="4"/>${anton(240, 280, 'AGENDAR', 26, K, 'middle')}`);
    return jan + cursor(344, 276, 0.8)
      + selo(610, 6, 'CONCEITO', 'FICTÍCIO', { rot: -5, tam: 64 })
      + pilula(610, 196, 'NÃO É CLIENTE REAL') + pilula(610, 252, 'SÓ UM EXEMPLO VISUAL', { cor: G });
  },

  // 20 / MVP
  mvp: () => caixa(0, 60, 190, 110, ['IDEIA'], { size: 44 }) + caixa(250, 60, 190, 110, ['VERSÃO 1'], { size: 44 })
    + caixa(500, 60, 190, 110, ['USO REAL'], { size: 44 }) + caixa(750, 60, 210, 110, ['AJUSTE'], { size: 44, cor: G })
    + ponta(240, 115, 0, 20, G, 8) + ponta(490, 115, 0, 20, G, 8) + ponta(740, 115, 0, 20, G, 8)
    + seta('M855 196 C 850 290, 100 290, 95 200', 96, 196, -90)
    + pilula(240, 304, '15 A 30 DIAS ÚTEIS · REFERÊNCIA', { size: 20 }),

  // 21 / o que mandar
  oQueMandar: () => janela(0, 0, 520, 330, ['LOGO E CORES', 'TEXTOS', 'FOTOS E IMAGENS', 'ACESSOS, SE HOUVER', 'REFERÊNCIAS']
    .map((s, i) => caixaCheck(26, 62 + i * 52, s)).join(''))
    + balao(570, 30, 380, 170, anton(28, 74, 'FALTA ALGO?', 52) + anton(28, 134, 'A GENTE COMBINA.', 44), { cor: G, cauda: 'l' }),

  // 23 / integrações
  integracoes: () => caixa(0, 110, 200, 90, ['FORMULÁRIO'], { size: 30 }) + caixa(330, 0, 200, 90, ['PLANILHA'], { size: 30 })
    + caixa(330, 220, 200, 90, ['E-MAIL'], { size: 30 }) + caixa(660, 110, 200, 90, ['API'], { size: 34, cor: G })
    + seta('M214 140 C 262 140, 280 50, 316 48', 320, 48, 0) + seta('M214 170 C 262 170, 280 262, 316 262', 320, 262, 0)
    + seta('M548 48 C 600 48, 620 140, 646 144', 650, 144, 0) + seta('M548 262 C 600 262, 620 160, 646 164', 650, 164, 0)
    + pilula(230, 352, '2 A 5 DIAS ÚTEIS · REFERÊNCIA', { size: 20 }),

  // 24 / prazos
  prazos: () => {
    const rows = [['LANDING PAGE', 5, 7], ['SITE INSTITUCIONAL', 10, 15], ['PAINEL ADMIN.', 15, 25], ['SISTEMA / MVP', 15, 30], ['AUTOMAÇÃO', 3, 7]];
    const X0 = 270, S = 12;
    const g = rows.map(([n, a, b], i) => {
      const y = 62 + i * 56;
      return t(24, y + 28, n, { size: 21 }) + `<rect x="${X0}" y="${y + 4}" width="${30 * S}" height="30" fill="${LG}"/>`
        + `<rect x="${X0 + a * S}" y="${y + 4}" width="${(b - a) * S}" height="30" fill="${G}" stroke="${K}" stroke-width="3"/>`
        + t(X0 + 30 * S + 14, y + 28, `${a}–${b}`, { size: 22 });
    }).join('');
    return janela(0, 0, 760, 380, g + t(24, 356, 'DIAS ÚTEIS · REFERÊNCIA INICIAL', { size: 18, fill: GR }));
  },

  // 26 / perguntas
  perguntas: () => ['O QUE ESTÁ INCLUSO?', 'QUEM EDITA DEPOIS?', 'QUAL É O PRAZO?', 'O QUE FICA DE FORA?', 'COMO É O SUPORTE?']
    .map((s, i) => pilula((i % 2) * 50, i * 66, `${i + 1} / ${s}`, { size: 28, cor: i === 4 ? G : P })).join('')
    + `<g transform="rotate(8 780 160)">${anton(700, 262, '?', 250, G)}</g>`,

  // 27 / manutenção
  manutencao: () => janela(0, 0, 440, 300, [0, 1, 2].map((i) => `<g transform="translate(26 ${62 + i * 60})"><rect width="34" height="34" fill="${i < 2 ? G : P}" stroke="${K}" stroke-width="4"/>${i < 2 ? visto(8, 19, 0.7, K, 5) : ''}${linhas(54, 6, 300, 2, 16, 8)}</g>`).join(''))
    + engrenagem(400, 250, 54) + engrenagem(448, 196, 28, G)
    + selo(520, 14, 'RESPOSTA INICIAL', 'ATÉ 48H ÚTEIS', { rot: -2, tam: 54 })
    + pilula(520, 196, 'RESPOSTA, NÃO ENTREGA', { size: 22 }),

  // 28 / fim de ano
  fimDeAno: () => {
    const it = ['INFORMAÇÕES ATUALIZADAS?', 'CONTATO FUNCIONANDO?', 'ABRE BEM NO CELULAR?', 'PLANOS PRO ANO NOVO?'];
    const jan = janela(0, 0, 560, 300, it.map((s, i) => caixaCheck(26, 64 + i * 54, s, i < 3, 22)).join(''));
    let cel = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) cel += `<rect x="${20 + c * 38}" y="${100 + r * 44}" width="30" height="32" fill="${r === 3 && c === 6 ? G : LG}" stroke="${K}" stroke-width="2"/>`;
    const cal = `<g transform="translate(620 6)"><rect x="12" y="12" width="300" height="290" fill="url(#dots)"/>
      <rect width="300" height="290" fill="${P}" stroke="${K}" stroke-width="${SW}"/><rect width="300" height="76" fill="${G}" stroke="${K}" stroke-width="5"/>${anton(150, 60, 'DEZEMBRO', 54, K, 'middle')}${cel}</g>`;
    return jan + cal;
  },

  // 29 / como pedir
  comoPedir: () => ['CHAMA NO DIRECT', 'CONTA O QUE PRECISA', 'RECEBE O VALOR INICIAL', 'APROVA A PROPOSTA']
    .map((s, i) => `<g transform="translate(0 ${i * 78})"><circle cx="34" cy="34" r="30" fill="${G}" stroke="${K}" stroke-width="4"/>${anton(34, 50, String(i + 1), 40, K, 'middle')}</g>${pilula(84, i * 78 + 6, s, { size: 26 })}`).join('')
    + blocoHandle(620, 80, 340, 150, -3, 'DIRECT', 70),

  // 30 / fechamento
  fechamento: () => `<image href="{{MARCA}}" x="0" y="10" width="260" height="246" filter="url(#marca)"/>`
    + blocoHandle(330, 60, 560, 190, -3, 'MANDA NO DIRECT', 120)
    + seta('M330 290 C 300 330, 220 330, 200 280', 196, 276, -100)
    + cursor(860, 250, 1),
};
