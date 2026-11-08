// Monta o HTML de um post: fundo -> ilustração -> título -> rótulos -> grão.
import { pathToFileURL } from 'node:url';
import { C, rng, blobPath, tornBand, globe, mira, cruz, fita, halftone, defs } from './estilo.mjs';
import { ilustracoes } from './ilustracoes.mjs';
import { extras } from './ilustracoes-extra.mjs';

const TODAS = { ...ilustracoes, ...extras };

const espelha = (x, m) => (m ? 1080 - x : x);

function presets(nome) {
  if (nome === 'A') return {
    blobs: [[820, 110, 190], [70, 1010, 150]],
    verdes: [[985, 520, 110, 150, -4], [150, 905, 120, 120, 3]],
    globos: [[1062, 112, 120, 10], [60, 1045, 165, -15]],
    meios: [[20, 860, 140, 160, 0], [1000, 600, 90, 130, 0]],
    faixas: [[150, 1052, 660, 1004, 70]],
    miras: [[978, 104], [1012, 470], [84, 748], [330, 1012]],
    fitas: [[40, 690, 130, 46, -22], [930, 800, 120, 46, 24]],
  };
  if (nome === 'C') return {
    blobs: [[130, 800, 230], [930, 70, 140]],
    verdes: [[1000, 330, 100, 140, 5], [700, 1000, 150, 100, -3]],
    globos: [[1020, 1020, 200, -8], [1060, 110, 100, 12]],
    meios: [[30, 640, 120, 150, 0], [880, 120, 150, 120, 0]],
    faixas: [[-20, 1010, 640, 930, 80]],
    miras: [[1000, 700], [420, 1000], [120, 600], [800, 70]],
    fitas: [[60, 640, 120, 46, 18], [880, 880, 130, 46, -20]],
  };
  // B: espelho de A, com ajustes
  return {
    blobs: [[260, 90, 170], [1010, 990, 150]],
    verdes: [[95, 560, 110, 150, 4], [900, 880, 120, 120, -3]],
    globos: [[1066, 100, 115, 10], [40, 1050, 170, -14]],
    meios: [[930, 850, 140, 160, 0], [30, 620, 90, 130, 0]],
    faixas: [[-30, 940, 600, 1070, 90]],
    miras: [[980, 470], [70, 520], [1000, 770], [740, 1010]],
    fitas: [[930, 540, 120, 46, 22], [70, 830, 120, 46, -24]],
  };
}

function fundo(post) {
  const H = post.H || 1080;
  const R = rng(post.seed * 977 + 13);
  const p = presets(post.preset || 'A');
  const k = H / 1080;
  if (k !== 1) {
    const sy = (arr, idx) => arr.map((r) => r.map((v, i) => (idx.includes(i) ? v * k : v)));
    p.blobs = sy(p.blobs, [1]); p.verdes = sy(p.verdes, [1]); p.globos = sy(p.globos, [1]);
    p.meios = sy(p.meios, [1]); p.faixas = sy(p.faixas, [1, 3]); p.miras = sy(p.miras, [1]); p.fitas = sy(p.fitas, [1]);
  }
  // Post com texto corrido: manchas de fundo saem de baixo do texto (verde sobe pra borda, cobalto e halftone descem pro canto)
  if (post.corpo || post.limpo) {
    p.miras = p.miras.filter((m) => !(m[0] < 200 && m[1] > H * 0.3 && m[1] < H * 0.8));
    p.verdes = p.verdes.filter((v) => v[0] >= 900);
    p.blobs = p.blobs.map(([cx, cy, r]) => [cx, cy > H * 0.4 ? H - 40 : cy, r]);
    p.meios = p.meios.map((m) => [m[0], m[1] > H * 0.4 ? H - 230 : m[1], ...m.slice(2)]);
  }
  let s = '';
  s += `<rect width="1080" height="${H}" fill="${C.paper}"/>`;
  s += `<g filter="url(#rough)"><rect x="28" y="28" width="1024" height="${H - 56}" fill="${C.ink}"/></g>`;
  for (const [x1, y1, x2, y2, t] of p.faixas) {
    s += `<g filter="url(#rough)"><path d="${tornBand(x1, y1, x2, y2, t + 16, R)}" fill="${C.paper}"/></g>`;
    s += `<g filter="url(#rough)"><path d="${tornBand(x1, y1, x2, y2, t - 6, R)}" fill="#1b1b1b"/></g>`;
  }
  for (const [x, y, w, h, rot] of p.meios) s += halftone(x, y, w, h, rot);
  for (const [cx, cy, r] of p.blobs) {
    s += `<g filter="url(#ink)"><path d="${blobPath(cx, cy, r, R)}" fill="${C.blue}"/></g>`;
    for (let i = 0; i < 7; i++) {
      const a = R() * 6.28, d = r * (1.0 + R() * 0.5);
      s += `<g filter="url(#ink)"><circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d * 0.8).toFixed(1)}" r="${(3 + R() * 9).toFixed(1)}" fill="${C.blue}"/></g>`;
    }
  }
  for (const [x, y, w, h, rot] of p.verdes) {
    s += `<g filter="url(#ink)"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.acid}" transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"/></g>`;
  }
  for (const [cx, cy, r, rot] of p.globos) s += `<g filter="url(#xerox)">${globe(cx, cy, r, rot)}</g>`;
  for (const [x, y] of p.miras) s += `<g filter="url(#xerox)">${Math.abs(x - 1000) < 90 || R() > 0.5 ? mira(x, y, 18) : cruz(x, y, 20)}</g>`;
  return { svg: s, fitas: p.fitas, R };
}

function poeira(R, H = 1080) {
  let s = '';
  for (let i = 0; i < 160; i++) {
    const x = (R() * 1080).toFixed(0), y = (R() * H).toFixed(0), r = (0.6 + R() * 1.8).toFixed(1);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${R() > 0.5 ? C.paper : C.ink}" opacity="${(0.25 + R() * 0.5).toFixed(2)}"/>`;
  }
  for (let i = 0; i < 3; i++) {
    const x = R() * 1080, y = R() * H, l = 30 + R() * 110, a = R() * 3.14;
    s += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x + Math.cos(a) * l).toFixed(0)}" y2="${(y + Math.sin(a) * l).toFixed(0)}" stroke="${C.paper}" stroke-width="1.2" opacity=".2"/>`;
  }
  return s;
}

// [[destaque]] = bloco verde; __sublinhado__ = traço verde embaixo
function marcaLinha(t) {
  return t
    .replace(/\[\[(.+?)\]\]/g, (_, x) => `<span class="hl${/[ÁÀÂÃÉÊÍÓÔÕÚ]/.test(x) ? ' acc' : ''}">${x}</span>`)
    .replace(/__(.+?)__/g, '<span class="ul">$1</span>');
}

function fotoBloco(post, assetDir) {
  if (!post.foto) return '';
  const { src, x, y, w, h, rot = 0, nw = 451, nh = 532, zoom = 1.4, fx = 0.51, fy = 0.4, ax = 0.5, ay = 0.36 } = post.foto;
  const url = pathToFileURL(`${assetDir}/${src}`).href;
  const k = Math.max(w / nw, h / nh) * zoom;
  const iw = nw * k, ih = nh * k;
  const ix = x + w * ax - fx * iw, iy = y + h * ay - fy * ih;
  return `<g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <g filter="url(#rough)"><rect x="${x - 16}" y="${y - 16}" width="${w + 32}" height="${h + 32}" fill="${C.paper}"/></g>
    <mask id="mk"><g filter="url(#rough)"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/></g></mask>
    <g mask="url(#mk)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#101010"/>
      <image href="${url}" x="${ix.toFixed(1)}" y="${iy.toFixed(1)}" width="${iw.toFixed(1)}" height="${ih.toFixed(1)}" preserveAspectRatio="none" filter="url(#foto)"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#dotsGray)" opacity=".8"/>
    </g></g>`;
}

function marcaBloco(post, assetDir) {
  if (!post.marca) return '';
  const [x, y, t, rot = 0] = post.marca;
  const url = pathToFileURL(`${assetDir}/marca/vertice-mark.png`).href;
  return `<g transform="rotate(${rot} ${x + t / 2} ${y + t / 2})"><image href="${url}" x="${x}" y="${y}" width="${t}" height="${t * 0.945}" filter="url(#marca)"/></g>`;
}

export function paginaHTML(post, { fontDir, assetDir }) {
  const H = post.H || 1080;
  const f = (n) => pathToFileURL(`${fontDir}/${n}`).href;
  const bg = fundo(post);
  const marcaUrl = pathToFileURL(`${assetDir}/marca/vertice-mark.png`).href;
  const illo = (TODAS[post.illo] ? TODAS[post.illo]() : '').replaceAll('{{MARCA}}', marcaUrl);
  const fixa = Array.isArray(post.illoPos);
  const [ix, iy, is = 1] = post.illoPos || [0, 0, 1];
  const fitas = bg.fitas.map(([x, y, w, h, r]) => fita(x, y, w, h, r)).join('');
  // linha com letra acentuada (fora a primeira) ganha respiro, senão o acento invade a linha de cima
const linhasHTML = post.lines.map((l, i) => {
  const acento = i > 0 && /[ÁÀÂÃÉÊÍÓÔÕÚ]/.test(l.replace(/\[\[|\]\]|__/g, ''));
  return `<div class="ln" style="z-index:${i + 1}${acento ? ';margin-top:.16em' : ''}">${marcaLinha(l)}</div>`;
}).join('');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face{font-family:Anton;src:url(${f('Anton-Regular.ttf')})}
@font-face{font-family:'Archivo Black';src:url(${f('ArchivoBlack-Regular.ttf')})}
@font-face{font-family:'DM Mono';font-weight:400;src:url(${f('DMMono-Regular.ttf')})}
@font-face{font-family:'DM Mono';font-weight:500;src:url(${f('DMMono-Medium.ttf')})}
html,body{margin:0;background:#000}
#c{position:relative;width:1080px;height:${H}px;overflow:hidden}
svg.l{position:absolute;left:0;top:0}
.tag{position:absolute;left:72px;top:${post.tagTop ?? 54}px;text-shadow:0 0 8px #080808,0 0 3px #080808;font:500 28px 'DM Mono';letter-spacing:.14em;color:${C.paper};text-transform:uppercase;text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:11px;filter:url(#xerox)}
.foot{position:absolute;right:62px;bottom:${post.footBottom ?? 42}px;background:#080808;padding:8px 10px 14px 14px;font:500 26px 'DM Mono';letter-spacing:.22em;color:${C.paper};text-transform:uppercase;text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:11px;filter:url(#xerox)}
#head{position:absolute;left:${post.headX ?? 70}px;top:${post.headY ?? 112}px;filter:url(#xerox);transform:rotate(${post.headRot ?? -1}deg);transform-origin:0 0}
.ln{position:relative;font-family:Anton;text-transform:uppercase;color:${C.paper};white-space:nowrap;line-height:1.02;letter-spacing:-.004em;width:max-content}
.hl{background:${C.acid};color:${C.ink};padding:0 .09em;display:inline-block;transform:rotate(-1.4deg);box-shadow:.05em .05em 0 rgba(8,8,8,.5)}
.hl.acc::before{content:'';position:absolute;left:0;right:0;top:-.19em;height:.2em;background:${C.acid};z-index:-1}
.ul{position:relative;display:inline-block}
.ul::after{content:'';position:absolute;left:-1.5%;right:-3%;bottom:.02em;height:.085em;background:${C.acid};transform:rotate(-.7deg);border-radius:3px}
.corpo{position:absolute;left:${post.headX ?? 70}px;top:0;width:${post.corpoW ?? 900}px;font:500 ${post.corpoSize ?? 32}px/1.5 'DM Mono';color:${C.paper};filter:url(#xerox)}
.corpo b{background:${C.acid};color:${C.ink};padding:0 .22em;font-weight:500}
.sub{position:absolute;font:500 26px 'DM Mono';letter-spacing:.1em;color:${C.paper};text-transform:uppercase;filter:url(#xerox)}
</style></head><body><div id="c">
<svg class="l" width="1080" height="${H}" viewBox="0 0 1080 ${H}">${defs(post.seed, H)}${bg.svg}</svg>
<svg class="l" width="1080" height="${H}" viewBox="0 0 1080 ${H}">
  <g filter="url(#xerox)">${fotoBloco(post, assetDir)}</g>
  <g filter="url(#xerox)">${marcaBloco(post, assetDir)}</g>
  <g id="illo" ${fixa ? `transform="translate(${ix} ${iy}) scale(${is})"` : ''} filter="url(#xerox)">${illo}</g>
  ${fitas}
</svg>
${post.semRotulo ? '' : `<div class="tag">${post.tag}</div>`}
<div id="head">${linhasHTML}</div>
${post.corpo ? `<div id="corpo" class="corpo">${String(post.corpo).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>')}</div>` : ''}
${post.semRotulo ? '' : '<div class="foot">VÉRTICE DIGITAL</div>'}
<svg class="l" width="1080" height="${H}" viewBox="0 0 1080 ${H}" style="pointer-events:none">
  <rect width="1080" height="${H}" filter="url(#grao)" style="mix-blend-mode:overlay" opacity=".26"/>
  <g filter="url(#xerox)">${poeira(bg.R, H)}</g>
</svg>
</div>
<script>
(async()=>{
  await document.fonts.ready;
  const W=${post.textW ?? 920}, CAP=${post.cap ?? 235}, HMAX=${post.hMax ?? 560};
  const lns=[...document.querySelectorAll('.ln')];
  lns.forEach(l=>{l.style.fontSize='100px'});
  lns.forEach(l=>{const w=l.getBoundingClientRect().width; l.style.fontSize=Math.min(CAP,100*W/w)+'px';});
  const head=document.getElementById('head');
  let h=head.getBoundingClientRect().height;
  if(h>HMAX){const k=HMAX/h; lns.forEach(l=>l.style.fontSize=(parseFloat(l.style.fontSize)*k)+'px');}
  let baseBottom=head.getBoundingClientRect().bottom;
  const corpo=document.getElementById('corpo');
  if(corpo){corpo.style.top=(baseBottom+34)+'px'; baseBottom=corpo.getBoundingClientRect().bottom;}
  if(${post.centro ? 'true' : 'false'}){head.style.left=((1080-head.getBoundingClientRect().width)/2)+'px';}
  const il=document.getElementById('illo');
  if(il && ${post.illoPos ? 'false' : 'true'}){
    const BOX=${JSON.stringify(post.illoBox || null)}; const bb=il.getBBox();
    const top=BOX?BOX[1]:baseBottom+30; const availH=BOX?BOX[3]:${H - 106}-top; const availW=BOX?BOX[2]:960; const left=BOX?BOX[0]:60;
    const k=Math.min(${post.illoMax ?? 1.12}, availW/bb.width, availH/bb.height);
    const x=left+(availW-bb.width*k)/2-bb.x*k;
    const y=top+(BOX?(availH-bb.height*k)/2:Math.min(36,(availH-bb.height*k)/2))-bb.y*k;
    il.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+') scale('+k.toFixed(3)+')');
    window.__illo={k:k,w:bb.width*k,h:bb.height*k,y:y+bb.y*k};
  }
  window.__info={illo:window.__illo||null,bottom:baseBottom,right:Math.max(...lns.map(l=>l.getBoundingClientRect().right))};
  window.__pronto=true;
})();
</script></body></html>`;
}
