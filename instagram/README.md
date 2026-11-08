# Instagram — Vértice Digital

Artes do Instagram `@vertice.xy`, geradas por código no estilo cartaz xerox da marca
(preto, off-white, verde ácido, azul cobalto, papel rasgado, halftone, globo em grade).

```
instagram/
├── _assets/            fontes (Anton, Archivo Black, DM Mono), marca e foto da equipe
├── _gerador/           template + ilustrações + renderizador (Playwright)
└── novembro-2026/      lote atual
    ├── posts.mjs       fonte única: título, legenda, texto alternativo, data sugerida
    ├── png/            artes 1080×1080
    ├── legendas.md     gerado a partir de posts.mjs
    └── calendario.md   gerado a partir de posts.mjs
```

## Como gerar de novo

Precisa de Node 18+ e Playwright (uma vez):

```bash
npm i playwright
npx playwright install chromium
```

Depois, de dentro de `instagram/_gerador/`:

```bash
node render.mjs ../novembro-2026          # todos os posts
node render.mjs ../novembro-2026 03 07    # só o 03 e o 07
```

Para mudar um texto, edite `novembro-2026/posts.mjs` e rode de novo.
`legendas.md` e `calendario.md` são sobrescritos a cada rodada, então não edite eles à mão.

Marcação nos títulos: `[[texto]]` = bloco verde, `__texto__` = sublinhado verde.

## Regras que o lote segue

- Contato público é só o Instagram `@vertice.xy` (sem e-mail e sem WhatsApp da Vértice).
- Preços e prazos são os valores iniciais/de referência do catálogo, nunca preço final.
- Nenhum cliente, depoimento, número de resultado ou trabalho entregue é inventado.
- Leonardo = conteúdo/foto/vídeo; Douglas = prospecção/operação; Davi = design/programação.
- **Datas do calendário são sugestões.** Nada foi publicado nem agendado.

## Pendências

- Post 06 usa a foto do Davi que já está no site. Os próximos da série (Leonardo e Douglas)
  precisam de foto autorizada e do papel correto de cada um.
- Confirmar oferta e datas antes de publicar.
