// Peças de estilo da Vértice: papel rasgado, tinta falhada, halftone, globo, mira, fita.
// Tudo é SVG gerado por código, com sementes fixas, então o resultado é repetível.

export const C = {
  ink: '#080808',
  paper: '#f1efe6',
  acid: '#a7ff00',
  blue: '#0047ff',
  gray: '#989891',
  dark: '#171717',
};

export function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

const f = (n) => Number(n).toFixed(1);

// Mancha irregular (para tinta de cobalto)
export function blobPath(cx, cy, r, rand, n = 16, jit = 0.5) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (1 - jit / 2 + rand() * jit);
    pts.push([cx + Math.cos(a) * rr * 1.15, cy + Math.sin(a) * rr * 0.85]);
  }
  return 'M' + pts.map((p) => f(p[0]) + ',' + f(p[1])).join(' L') + 'Z';
}

// Faixa de papel rasgado entre dois pontos
export function tornBand(x1, y1, x2, y2, thick, rand) {
  const n = 22;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len, ny = dx / len;
  const a = [], b = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const bx = x1 + dx * t, by = y1 + dy * t;
    const j1 = (rand() - 0.5) * thick * 0.3;
    const j2 = (rand() - 0.5) * thick * 0.3;
    a.push([bx + nx * (thick / 2 + j1), by + ny * (thick / 2 + j1)]);
    b.push([bx - nx * (thick / 2 + j2), by - ny * (thick / 2 + j2)]);
  }
  const all = a.concat(b.reverse());
  return 'M' + all.map((p) => f(p[0]) + ',' + f(p[1])).join(' L') + 'Z';
}

// Globo em grade (wireframe)
export function globe(cx, cy, r, rot = 0) {
  let s = `<g transform="rotate(${rot} ${cx} ${cy})" stroke="${C.paper}" stroke-width="3.6" fill="none">`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.ink}"/>`;
  for (const k of [0.3, 0.62, 0.88]) s += `<ellipse cx="${cx}" cy="${cy}" rx="${f(r * k)}" ry="${r}"/>`;
  s += `<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"/>`;
  for (const lat of [-0.62, -0.32, 0.32, 0.62]) {
    const rx = r * Math.sqrt(1 - lat * lat);
    s += `<ellipse cx="${cx}" cy="${f(cy + r * lat)}" rx="${f(rx)}" ry="${f(r * 0.11)}"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;
  return s + '</g>';
}

// Mira de registro
export function mira(x, y, r = 20) {
  return `<g stroke="${C.paper}" stroke-width="3" fill="none">
    <circle cx="${x}" cy="${y}" r="${r}"/>
    <line x1="${x - r - 14}" y1="${y}" x2="${x + r + 14}" y2="${y}"/>
    <line x1="${x}" y1="${y - r - 14}" x2="${x}" y2="${y + r + 14}"/></g>`;
}

export function cruz(x, y, s = 20) {
  return `<g stroke="${C.paper}" stroke-width="3"><line x1="${x - s}" y1="${y}" x2="${x + s}" y2="${y}"/><line x1="${x}" y1="${y - s}" x2="${x}" y2="${y + s}"/></g>`;
}

// Fita adesiva translúcida com pontas serrilhadas
export function fita(x, y, w, h, rot, rand) {
  const teeth = 6;
  const pts = [];
  for (let i = 0; i <= teeth; i++) pts.push([0 + (i % 2 ? 5 : 0), (h / teeth) * i]);
  const right = [];
  for (let i = teeth; i >= 0; i--) right.push([w - (i % 2 ? 5 : 0), (h / teeth) * i]);
  const all = pts.concat(right);
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M${all.map((p) => f(p[0]) + ',' + f(p[1])).join(' L')}Z" fill="rgba(222,222,214,.32)"/></g>`;
}

let _uid = 0;
export function halftone(x, y, w, h, rot = 0, cor = C.paper, fade = 'r') {
  const id = 'ht' + _uid++;
  const grad = fade === 'r'
    ? `<radialGradient id="g${id}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>`
    : `<linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`;
  return `<defs>${grad}<mask id="m${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g${id})"/></mask></defs>
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})" mask="url(#m${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dots${cor === C.ink ? 'Ink' : ''})"/></g>`;
}

// Filtros compartilhados. "seed" muda a textura de cada post.
export function defs(seed) {
  return `<defs>
  <filter id="rough" filterUnits="userSpaceOnUse" x="-80" y="-80" width="1240" height="1240">
    <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="3" seed="${seed}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="${seed + 3}" result="n2"/>
    <feDisplacementMap in="d" in2="n2" scale="8" xChannelSelector="G" yChannelSelector="R"/>
  </filter>
  <filter id="ink" filterUnits="userSpaceOnUse" x="-80" y="-80" width="1240" height="1240">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="${seed + 5}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="${seed + 9}" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  15 0 0 0 -8.9" result="holes"/>
    <feComposite in="d" in2="holes" operator="out"/>
  </filter>
  <filter id="xerox" x="-4%" y="-4%" width="108%" height="108%">
    <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="${seed + 1}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${seed + 21}" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  26 0 0 0 -20.6" result="holes"/>
    <feComposite in="d" in2="holes" operator="out"/>
  </filter>
  <filter id="foto" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feColorMatrix type="matrix" values="0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0 0 0 1 0"/>
    <feComponentTransfer><feFuncR type="gamma" amplitude="1.5" exponent="1.5" offset="-.08"/><feFuncG type="gamma" amplitude="1.5" exponent="1.5" offset="-.08"/><feFuncB type="gamma" amplitude="1.5" exponent="1.5" offset="-.08"/></feComponentTransfer>
  </filter>
  <filter id="marca" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .655  0 0 0 0 1  0 0 0 0 0  -2.126 -7.152 -.722 9.5 0"/></filter>
  <filter id="grao" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="${seed + 7}"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0" intercept="1"/></feComponentTransfer>
  </filter>
  <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><circle cx="5" cy="5" r="2.7" fill="${C.paper}"/></pattern>
  <pattern id="dotsInk" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><circle cx="5" cy="5" r="2.7" fill="${C.ink}"/></pattern>
  <pattern id="dotsGray" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><circle cx="3.5" cy="3.5" r="1.7" fill="${C.ink}" opacity=".75"/></pattern>
  <pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="6" height="14" fill="${C.paper}"/></pattern>
</defs>`;
}
