---
tags: [design-system, tokens]
---

# Tokens de Cor

Fonte: `stories/tokens/Colors.mdx` + `src/components/tokens/color-data.ts`. Formato semântico obrigatório (Regra 2): `cor/categoria/papel/valor-semântico` — nunca um nome que vaza implementação.

## Marca

| Token | Hex | Papel |
| --- | --- | --- |
| `cor/marca/primária/teal-base` | `#007e96` | Primária, ação — ver [[Regra 3 - Cores da Marca]] |
| `cor/marca/primária/teal-dark` | `#1a5e6e` | Hover/pressed, modo escuro |
| `cor/marca/secundária/wordmark` | `#31302d` | Cinza do wordmark |
| `cor/categoria/acesso-rápido/rosa-dark` | `#b5254a` | Categoria "Acesso rápido" (dado/estado, não só branding) |
| `cor/categoria/acesso-rápido/rosa-light` | `#e8476a` | idem |

## Feedback

| Token | Hex | Papel |
| --- | --- | --- |
| `cor/feedback/perigo/padrão` | `#bc3426` | Erro, ação destrutiva |
| `cor/feedback/sucesso/base` | `#009966` | Confirmação |
| `cor/feedback/aviso/base` | `#c38418` | Aviso |

## Neutros — `ui-*` é família técnica separada, não Zinc

✅ Resolvido em 2026-08-23 (decisão humana, ver [[Regra 3 - Cores da Marca]]): a Regra 3 original presumia neutros = rampa Zinc do Tailwind. A reconciliação encontrou uma paleta neutra própria do Figma (`neutral-*`/`ui-*`, ~30 variáveis) — só texto primário/secundário/terciário e superfície média batem exato com um degrau Zinc; o resto, inclusive toda a família `ui-*` (bordas de input/conector), usa tons com tinte azulado próprio. Aceito como paleta técnica separada — mantém os valores reais do Figma em vez de forçar o degrau Zinc mais próximo.

## Visualização

Desde a [[Sessão 2026-08-15]], `Tokens/Colors` no Storybook renderiza um `ColorPalette` real (`src/components/tokens/color-swatch.tsx`) — grade de swatches visuais por seção, com as tabelas antigas preservadas em `<details>` pra quem quiser o detalhe tabular. Antes disso era só tabela de hex em texto.

## Ver também

- [[Regra 2 - Nomenclatura de Tokens]]
- [[Regra 3 - Cores da Marca]]
