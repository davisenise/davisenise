// Uso: node render.mjs <pasta-do-lote> [numero ...]
//   ex: node render.mjs ../novembro-2026          -> todos os posts
//       node render.mjs ../novembro-2026 01 04    -> só 01 e 04
// Requer: npm i playwright (o Chromium vem junto: npx playwright install chromium)
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { paginaHTML } from './pagina.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const aqui = dirname(fileURLToPath(import.meta.url));
const lote = resolve(process.argv[2] || join(aqui, '../novembro-2026'));
const filtro = process.argv.slice(3);
const { posts, hashtags } = await import(pathToFileURL(join(lote, 'posts.mjs')).href);

const fontDir = join(aqui, '../_assets/fonts');
const assetDir = join(aqui, '../_assets');
const tmp = join(aqui, '.tmp');
const png = join(lote, 'png');
mkdirSync(tmp, { recursive: true });
mkdirSync(png, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
for (const p of posts) {
  if (filtro.length && !filtro.includes(p.n)) continue;
  const html = join(tmp, `${p.n}.html`);
  writeFileSync(html, paginaHTML(p, { fontDir, assetDir }));
  await page.goto(pathToFileURL(html).href);
  await page.waitForFunction('window.__pronto === true');
  await page.waitForTimeout(150);
  const out = join(png, `${p.n}-${p.slug}.png`);
  await page.locator('#c').screenshot({ path: out });
  const info = await page.evaluate('window.__info');
  console.log(`${p.n} ${p.slug}  título termina em y=${Math.round(info.bottom)}, x=${Math.round(info.right)}`);
}
await browser.close();

// Legendas e calendário a partir dos mesmos dados
const dias = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
let leg = `# Legendas — ${lote.split('/').pop()}\n\n> Gerado por \`_gerador/render.mjs\` a partir de \`posts.mjs\`. Edite lá, não aqui.\n> Texto alternativo (acessibilidade) vem logo abaixo de cada legenda.\n\n`;
let cal = `# Calendário sugerido\n\n> **Datas são sugestões.** Nada foi publicado nem agendado. Confirme oferta, data e tom antes de postar.\n\n| Post | Data sugerida | Tema | Arquivo |\n|---|---|---|---|\n`;
for (const p of posts) {
  const d = new Date(p.data + 'T12:00:00');
  leg += `## ${p.n} — ${p.tag.replace(/^\d+ \/ /, '')}\n\n${p.legenda}\n\n${hashtags}\n\n**Texto alternativo:** ${p.alt}\n\n---\n\n`;
  cal += `| ${p.n} | ${dias[d.getDay()]} ${p.data.split('-').reverse().join('/')} | ${p.tag.replace(/^\d+ \/ /, '')} | \`png/${p.n}-${p.slug}.png\` |\n`;
}
writeFileSync(join(lote, 'legendas.md'), leg);
writeFileSync(join(lote, 'calendario.md'), cal);
console.log('legendas.md e calendario.md atualizados');
