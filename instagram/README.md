# Instagram — Vértice Digital

Artes do Instagram `@vertice.xy`, geradas por código no estilo cartaz xerox da marca
(preto, off-white, verde ácido, azul cobalto, papel rasgado, halftone, globo em grade).

```
instagram/
├── _assets/            fontes (Anton, Archivo Black, DM Mono), marca e foto da equipe
├── _gerador/           template + ilustrações + renderizador (Playwright)
└── 30-dias-nov-dez-2026/   lote atual: 30 posts, um por dia, de 09/11 a 08/12/2026
    ├── posts.mjs       fonte única: título, legenda, texto alternativo (a ordem da lista = ordem de publicação)
    ├── png/            30 artes 1080×1080
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
node render.mjs ../30-dias-nov-dez-2026          # todos os posts (~25 s)
node render.mjs ../30-dias-nov-dez-2026 03 07    # só o 03 e o 07
```

A ilustração de cada post é medida e encaixada sozinha embaixo do título. Só os posts de equipe
(com foto) usam posição fixa (`illoPos`).

Para mudar um texto, edite `30-dias-nov-dez-2026/posts.mjs` e rode de novo.
`legendas.md` e `calendario.md` são sobrescritos a cada rodada, então não edite eles à mão.

Marcação nos títulos: `[[texto]]` = bloco verde, `__texto__` = sublinhado verde.

## Regras que o lote segue

- Contato público é só o Instagram `@vertice.xy` (sem e-mail e sem WhatsApp da Vértice).
- Preços e prazos são os valores iniciais/de referência do catálogo, nunca preço final.
- Nenhum cliente, depoimento, número de resultado ou trabalho entregue é inventado.
- Leonardo = conteúdo/foto/vídeo; Douglas = prospecção/operação; Davi = design/programação.
- **Datas do calendário são sugestões.** Nada foi publicado nem agendado.

## Pendências

- Posts 12, 18 e 25 (Davi, Douglas, Leonardo) usam as fotos que já estão no site. Confirmar com cada
  um se podem ir pro Instagram antes de publicar.
- Post 08 cita a Black Friday em 27/11: se a data mudar, ajustar texto e posição no calendário.
- Post 19 é uma demonstração **fictícia** (barbearia exemplo); os selos "conceito fictício" e
  "não é cliente real" não devem ser removidos.
- Confirmar oferta e datas antes de publicar.
