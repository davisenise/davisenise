# Instagram — Vértice Digital

Artes do Instagram `@vertice.xy`, geradas por código no estilo cartaz xerox da marca
(preto, off-white, verde ácido, azul cobalto, papel rasgado, halftone, globo em grade).

```
instagram/
├── _assets/                  fontes (Anton, Archivo Black, DM Mono), marca e fotos da equipe
├── _gerador/                 template + ilustrações + renderizador (Playwright)
├── 30-dias-nov-dez-2026/     30 posts, um por dia, de 09/11 a 08/12/2026 (1080×1080)
├── linha-empresa-angulos/    7 posts dos ângulos da Linha Empresa (1080×1080), cada um com condição para publicar
├── stories/                  7 modelos de story (1080×1920) com roteiro de uso
└── destaques/                10 capas de destaque (1080×1920)
```

Em cada lote: `posts.mjs` é a fonte única (títulos, legendas, texto alternativo), `png/` guarda as artes e
`legendas.md` é gerado a partir do `posts.mjs`. Lotes com datas também geram `calendario.md`.

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
node render.mjs ../stories                       # qualquer outro lote
```

A ilustração de cada post é medida e encaixada sozinha embaixo do título. Só os posts de equipe
(com foto) usam posição fixa (`illoPos`).

Para mudar um texto, edite `30-dias-nov-dez-2026/posts.mjs` e rode de novo.
`legendas.md` e `calendario.md` são sobrescritos a cada rodada, então não edite eles à mão.

Marcação nos títulos: `[[texto]]` = bloco verde, `__texto__` = sublinhado verde.

## Condição para publicar

Os posts de `linha-empresa-angulos/` afirmam coisas que ainda dependem de decisão do time (contrato com
exportação de dados, valor aprovado, programa de cliente-piloto). Cada um tem o campo `condicao` em
`posts.mjs` e em `legendas.md`. Não publicar antes de cumprir.

## Regras que os lotes seguem

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
