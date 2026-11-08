// Ilustrações em SVG, uma por post. Coordenadas locais: caixa de 960 de largura.
import { C } from './estilo.mjs';

const K = C.ink, P = C.paper, G = C.acid, B = C.blue;
const GR = '#9a9a93', LG = '#d6d4ca';
const SW = 5;

const janela = (x, y, w, h, inner = '', { barra = 40 } = {}) => `<g transform="translate(${x} ${y})">
  <rect x="12" y="12" width="${w}" height="${h}" rx="12" fill="url(#dots)"/>
  <rect width="${w}" height="${h}" rx="12" fill="${P}" stroke="${K}" stroke-width="${SW}"/>
  <path d="M0 ${barra}V12a12 12 0 0 1 12-12H${w - 12}a12 12 0 0 1 12 12V${barra}Z" fill="${K}"/>
  <circle cx="26" cy="${barra / 2}" r="6" fill="${P}"/><circle cx="48" cy="${barra / 2}" r="6" fill="${P}"/><circle cx="70" cy="${barra / 2}" r="6" fill="${P}"/>
  ${inner}</g>`;

const linhas = (x, y, w, n, gap = 18, h = 9, cor = GR) =>
  Array.from({ length: n }, (_, i) =>
    `<rect x="${x}" y="${y + i * gap}" width="${i === n - 1 ? w * 0.6 : w}" height="${h}" rx="3" fill="${cor}"/>`).join('');

const barras = (x, y, w, h, vals, cor = K, destaque = -1) => {
  const gap = w / vals.length, bw = gap * 0.62;
  return vals.map((v, i) =>
    `<rect x="${x + i * gap}" y="${y + h - v * h}" width="${bw}" height="${v * h}" fill="${i === destaque ? G : cor}" ${i === destaque ? `stroke="${K}" stroke-width="3"` : ''}/>`).join('');
};

const visto = (x, y, s = 1, cor = K, sw = 7) =>
  `<path d="M${x} ${y} l${10 * s} ${11 * s} l${20 * s} ${-24 * s}" fill="none" stroke="${cor}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

const ponta = (x, y, ang, s = 22, cor = G, sw = 8) =>
  `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M${-s} ${-s * 0.75}L0 0L${-s} ${s * 0.75}" fill="none" stroke="${cor}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></g>`;

const seta = (d, x, y, ang, cor = G) =>
  `<path d="${d}" fill="none" stroke="${cor}" stroke-width="8" stroke-linecap="round"/>${ponta(x, y, ang, 22, cor)}`;

const balao = (x, y, w, h, inner = '', { cor = P, cauda = 'l' } = {}) => {
  const bx = cauda === 'l' ? 34 : w - 74;
  const tip = cauda === 'l' ? 26 : w - 28;
  return `<g transform="translate(${x} ${y})">
  <path d="M${bx} ${h - 2}L${tip} ${h + 36}L${bx + 40} ${h - 2}" fill="${cor}" stroke="${K}" stroke-width="${SW}" stroke-linejoin="round"/>
  <rect width="${w}" height="${h}" rx="18" fill="${cor}" stroke="${K}" stroke-width="${SW}"/>
  <rect x="${bx + 4}" y="${h - 4}" width="32" height="8" fill="${cor}"/>
  ${inner}</g>`;
};

const lampada = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0-34a30 30 0 0 1 21 51c-6 6-8 12-8 19h-26c0-7-2-13-8-19A30 30 0 0 1 0-34Z" fill="${P}" stroke="${K}" stroke-width="5"/>
  <rect x="-13" y="38" width="26" height="9" fill="${K}"/>
  <path d="M-10-6 0 10 10-6" fill="none" stroke="${K}" stroke-width="5" stroke-linejoin="round"/></g>`;

const engrenagem = (x, y, r, cor = P) => {
  let t = '';
  for (let i = 0; i < 8; i++)
    t += `<rect x="${-r * 0.17}" y="${-r}" width="${r * 0.34}" height="${r * 0.5}" transform="rotate(${i * 45})" fill="${cor}" stroke="${K}" stroke-width="4"/>`;
  return `<g transform="translate(${x} ${y})">${t}<circle r="${r * 0.78}" fill="${cor}" stroke="${K}" stroke-width="4"/><circle r="${r * 0.3}" fill="${K}"/></g>`;
};

const cursor = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <polygon points="0,0 0,52 14,40 24,62 36,57 26,36 44,36" fill="${P}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
  <g stroke="${P}" stroke-width="5" stroke-linecap="round"><line x1="-18" y1="14" x2="-34" y2="8"/><line x1="-6" y1="-8" x2="-14" y2="-22"/><line x1="16" y1="-10" x2="18" y2="-26"/></g></g>`;

const lupa = (x, y, r) => `<g transform="translate(${x} ${y})">
  <line x1="${r * 0.72}" y1="${r * 0.72}" x2="${r * 1.75}" y2="${r * 1.75}" stroke="${K}" stroke-width="${r * 0.4}" stroke-linecap="round"/>
  <line x1="${r * 0.72}" y1="${r * 0.72}" x2="${r * 1.75}" y2="${r * 1.75}" stroke="${P}" stroke-width="${r * 0.26}" stroke-linecap="round"/>
  <circle r="${r}" fill="rgba(167,255,0,.2)" stroke="${K}" stroke-width="${r * 0.3}"/>
  <circle r="${r}" fill="none" stroke="${P}" stroke-width="${r * 0.17}"/></g>`;

const alerta = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0-40 44 34H-44Z" fill="${G}" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
  <rect x="-4" y="-14" width="8" height="28" fill="${K}"/><circle cy="24" r="5" fill="${K}"/></g>`;

const selo = (x, y, pequeno, grande, { rot = -4, tam = 110, cor = G } = {}) => {
  const bw = grande.length * tam * 0.47;
  const w = Math.max(bw, pequeno.length * 15) + 52;
  const h = tam + 62;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="9" y="9" width="${w}" height="${h}" fill="url(#dots)"/>
    <rect width="${w}" height="${h}" fill="${cor}" stroke="${K}" stroke-width="4"/>
    <text x="26" y="40" font-family="DM Mono" font-weight="500" font-size="22" letter-spacing="3" fill="${K}">${pequeno}</text>
    <text x="26" y="${h - 22}" font-family="Anton" font-size="${tam}" fill="${K}" textLength="${w - 52}" lengthAdjust="spacingAndGlyphs">${grande}</text></g>`;
};

const pilula = (x, y, txt, { cor = P, tx = K, size = 24 } = {}) => {
  const w = txt.length * (size * 0.6 + 2.4) + 40;
  return `<g transform="translate(${x} ${y})"><rect x="6" y="6" width="${w}" height="46" fill="url(#dots)"/><rect width="${w}" height="46" fill="${cor}" stroke="${K}" stroke-width="4"/>
  <text x="18" y="31" font-family="DM Mono" font-weight="500" font-size="${size}" letter-spacing="2" fill="${tx}">${txt}</text></g>`;
};

export const ilustracoes = {
  // 01 / custo vs valor: o site como caminho até a pessoa
  caminho: () => {
    const jan = janela(10, 10, 390, 280, `
      <rect x="22" y="58" width="346" height="96" fill="${K}"/>
      <polygon points="40,140 82,88 122,140" fill="${P}"/><circle cx="158" cy="88" r="11" fill="${P}"/>
      <rect x="200" y="84" width="150" height="10" fill="${P}"/><rect x="200" y="106" width="115" height="10" fill="${P}"/>
      ${linhas(22, 176, 346, 3, 20)}
      <rect x="22" y="238" width="150" height="32" fill="${G}" stroke="${K}" stroke-width="4"/>`);
    const chat1 = balao(640, 24, 300, 116, `<circle cx="84" cy="58" r="12" fill="${K}"/><circle cx="130" cy="58" r="12" fill="${K}"/><circle cx="176" cy="58" r="12" fill="${K}"/>`, { cauda: 'l' });
    const chat2 = balao(700, 190, 240, 84, linhas(28, 24, 184, 3, 20, 9, P), { cor: K, cauda: 'r' });
    return jan
      + seta('M430 160 C 490 40, 560 40, 628 112', 632, 116, 38)
      + chat1 + chat2
      + cursor(112, 232, 0.9);
  },

  // 02 / painel administrativo
  painel: () => {
    const kpis = [0, 1, 2].map((i) => `<g transform="translate(${142 + i * 156} 58)"><rect width="140" height="66" fill="${LG}" stroke="${K}" stroke-width="3"/>
      <rect x="12" y="14" width="70" height="20" fill="${K}"/><rect x="12" y="44" width="${50 + i * 24}" height="9" fill="${i === 1 ? B : GR}"/></g>`).join('');
    const jan = janela(10, 10, 640, 282, `
      <rect x="0" y="40" width="118" height="242" fill="${K}"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="14" y="${58 + i * 40}" width="90" height="26" fill="${i === 1 ? G : '#2a2a2a'}"/><rect x="22" y="${66 + i * 40}" width="40" height="9" fill="${i === 1 ? K : P}"/>`).join('')}
      ${kpis}
      <rect x="142" y="138" width="280" height="136" fill="${P}" stroke="${K}" stroke-width="3"/>
      ${barras(162, 150, 244, 104, [0.4, 0.62, 0.5, 0.85, 0.7, 0.95], K, 3)}
      <g transform="translate(440 138)">${[0, 1, 2, 3].map((i) => `<rect y="${i * 36}" width="26" height="26" fill="${P}" stroke="${K}" stroke-width="3"/>${i < 3 ? visto(5, 14 + i * 36, 0.55, K, 4) : ''}<rect x="40" y="${i * 36 + 4}" width="${140 - i * 10}" height="9" fill="${GR}"/><rect x="40" y="${i * 36 + 18}" width="80" height="7" fill="${LG}"/>`).join('')}</g>`);
    const lista = `<g transform="translate(700 6)">
      <rect x="12" y="12" width="250" height="184" fill="url(#dots)"/>
      <rect width="250" height="184" fill="${P}" stroke="${K}" stroke-width="${SW}"/>
      <rect x="18" y="18" width="120" height="14" fill="${K}"/>
      ${[0, 1, 2].map((i) => `<rect x="18" y="${50 + i * 42}" width="30" height="30" fill="${i < 2 ? G : P}" stroke="${K}" stroke-width="3"/>${i < 2 ? visto(24, 66 + i * 42, 0.6, K, 4.5) : ''}<rect x="62" y="${54 + i * 42}" width="${150 - i * 20}" height="10" fill="${GR}"/><rect x="62" y="${70 + i * 42}" width="90" height="8" fill="${LG}"/>`).join('')}</g>`;
    return jan + lista + engrenagem(790, 250, 46) + engrenagem(850, 214, 26, G)
      + cursor(560, 214, 0.85);
  },

  // 03 / landing page: 1 página, até 5 seções (o preço vai no título)
  landing: () => {
    const sec = (y, inner = '') => `<g transform="translate(22 ${y})">${inner}</g>`;
    const jan = janela(10, 6, 400, 316, `
      ${sec(52, `<rect width="356" height="70" fill="${K}"/><polygon points="14,58 46,20 78,58" fill="${P}"/><rect x="108" y="16" width="200" height="9" fill="${P}"/><rect x="108" y="36" width="150" height="9" fill="${P}"/>`)}
      ${sec(134, [0, 1, 2].map((i) => `<rect x="${i * 124}" width="108" height="50" fill="${LG}" stroke="${K}" stroke-width="3"/><rect x="${i * 124 + 12}" y="12" width="42" height="8" fill="${K}"/><rect x="${i * 124 + 12}" y="30" width="68" height="7" fill="${GR}"/>`).join(''))}
      ${sec(196, linhas(0, 4, 350, 3, 14, 7))}
      ${sec(244, `<rect width="160" height="34" fill="${G}" stroke="${K}" stroke-width="4"/>`)}
      ${sec(288, `<rect width="356" height="16" fill="${GR}"/>`)}`);
    const nums = [88, 166, 214, 262, 296].map((y, i) => `<g transform="translate(442 ${y})"><circle r="16" fill="${G}" stroke="${K}" stroke-width="4"/><text y="8" text-anchor="middle" font-family="Anton" font-size="22" fill="${K}">${i + 1}</text></g>`).join('');
    const marc = `<path d="M434 88V296" stroke="${P}" stroke-width="3" stroke-dasharray="3 9" fill="none"/>`;
    return jan + marc + nums
      + pilula(520, 30, '1 PÁGINA') + pilula(520, 92, 'ATÉ 5 SEÇÕES') + pilula(520, 154, 'CONTATO DIRETO')
      + pilula(520, 216, 'EDIÇÃO BÁSICA', { cor: G })
      + pilula(520, 278, 'TEXTO E IMAGEM: VOCÊ')
      + cursor(160, 270, 0.8);
  },

  // 04 / diagnóstico digital
  diagnostico: () => {
    const rows = [0, 1, 2, 3].map((i) => {
      const ok = i !== 1 && i !== 3;
      return `<g transform="translate(28 ${58 + i * 48})"><rect width="32" height="32" fill="${ok ? G : P}" stroke="${K}" stroke-width="4"/>
      ${ok ? visto(7, 18, 0.65, K, 5) : `<path d="M8 8L24 24M24 8L8 24" stroke="${K}" stroke-width="5" stroke-linecap="round"/>`}
      <rect x="50" y="3" width="${210 - i * 18}" height="11" fill="${GR}"/><rect x="50" y="19" width="${124 - i * 6}" height="8" fill="${LG}"/></g>`;
    }).join('');
    const jan = janela(10, 8, 420, 256, rows);
    return jan + alerta(70, 22, 0.7)
      + lupa(366, 170, 58)
      + selo(520, 4, 'DIAGNÓSTICO DIGITAL', '2 A 3 DIAS ÚTEIS', { rot: -2, tam: 54 })
      + pilula(520, 130, '01 / ENTENDER') + pilula(520, 184, '02 / PRIORIZAR') + pilula(520, 238, '03 / DECIDIR');
  },

  // 05 / processo em 4 passos
  processo: () => {
    const cards = [
      { n: '01', t: ['VOCÊ', 'CONTA'], icon: balao(0, 0, 96, 62, `<circle cx="28" cy="31" r="7" fill="${K}"/><circle cx="48" cy="31" r="7" fill="${K}"/><circle cx="68" cy="31" r="7" fill="${K}"/>`, { cauda: 'l' }) },
      { n: '02', t: ['A GENTE', 'ORGANIZA'], icon: `<g>${[0, 1, 2].map((i) => `<rect y="${i * 26}" width="24" height="20" fill="${i === 0 ? G : P}" stroke="${K}" stroke-width="3"/><rect x="36" y="${i * 26 + 4}" width="${64 - i * 10}" height="9" fill="${K}"/>`).join('')}</g>` },
      { n: '03', t: ['A GENTE', 'CONSTRÓI'], icon: engrenagem(48, 38, 42, G) },
      { n: '04', t: ['VOCÊ', 'RECEBE'], icon: `<g><rect y="14" width="100" height="58" fill="${P}" stroke="${K}" stroke-width="4"/><rect y="0" width="100" height="22" fill="${G}" stroke="${K}" stroke-width="4"/>${visto(30, 52, 1.1, K, 7)}</g>` },
    ];
    const out = cards.map((c, i) => `<g transform="translate(${10 + i * 236} 20)">
      <rect x="12" y="12" width="210" height="330" fill="url(#dots)"/>
      <rect width="210" height="330" fill="${P}" stroke="${K}" stroke-width="${SW}"/>
      <rect width="210" height="84" fill="${K}"/>
      <text x="16" y="68" font-family="Anton" font-size="68" fill="${G}">${c.n}</text>
      <g transform="translate(54 112)">${c.icon}</g>
      <text x="16" y="270" font-family="Anton" font-size="36" fill="${K}">${c.t[0]}</text>
      <text x="16" y="312" font-family="Anton" font-size="36" fill="${K}">${c.t[1]}</text></g>`).join('');
    const setas = [0, 1, 2].map((i) => ponta(10 + (i + 1) * 236 - 14, 62, 0, 20, G, 8)).join('');
    return out + setas;
  },

  // 06 / equipe: rótulos de atuação (a foto entra por pagina.mjs)
  davi: () => pilula(0, 0, 'WIREFRAME / DEPLOY') + pilula(0, 62, 'ESCOPO + PRAZO TÉCNICO')
    + pilula(0, 124, '@0FFDAVI', { cor: G }),

  // 07 / contato pelo Instagram
  contato: () => {
    const tela = `<g transform="translate(10 0)">
      <rect x="12" y="12" width="400" height="420" rx="26" fill="url(#dots)"/>
      <rect width="400" height="420" rx="26" fill="${P}" stroke="${K}" stroke-width="${SW}"/>
      <path d="M0 80V26a26 26 0 0 1 26-26H374a26 26 0 0 1 26 26V80Z" fill="${K}"/>
      <circle cx="46" cy="40" r="20" fill="${G}" stroke="${P}" stroke-width="3"/>
      <rect x="82" y="26" width="130" height="12" fill="${P}"/><rect x="82" y="46" width="80" height="8" fill="${GR}"/>
      <g transform="translate(26 110)"><rect width="240" height="78" rx="14" fill="${LG}" stroke="${K}" stroke-width="4"/>${linhas(20, 20, 196, 3, 18, 9)}</g>
      <g transform="translate(134 214)"><rect width="240" height="92" rx="14" fill="${K}"/>${linhas(20, 22, 196, 3, 20, 9, P)}</g>
      <g transform="translate(26 328)"><rect width="110" height="46" rx="14" fill="${LG}" stroke="${K}" stroke-width="4"/><circle cx="32" cy="23" r="7" fill="${K}"/><circle cx="55" cy="23" r="7" fill="${K}"/><circle cx="78" cy="23" r="7" fill="${K}"/></g>
      <rect x="26" y="382" width="290" height="28" rx="14" fill="${LG}" stroke="${K}" stroke-width="3"/>
      <circle cx="350" cy="396" r="16" fill="${G}" stroke="${K}" stroke-width="3"/></g>`;
    const bloco = `<g transform="translate(500 120) rotate(-3)">
      <rect x="12" y="12" width="460" height="176" fill="url(#dots)"/>
      <rect width="460" height="176" fill="${G}" stroke="${K}" stroke-width="5"/>
      <text x="24" y="42" font-family="DM Mono" font-weight="500" font-size="24" letter-spacing="4" fill="${K}">CHAMA NO DIRECT</text>
      <text x="24" y="156" font-family="Anton" font-size="104" fill="${K}" textLength="412" lengthAdjust="spacingAndGlyphs">@VERTICE.XY</text></g>`;
    return tela + bloco
      + seta('M590 296 C 540 340, 490 336, 452 300', 448, 296, 215)
      + cursor(930, 300, 1);
  },
};
