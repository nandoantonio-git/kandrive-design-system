---
tags: [regra, travada]
---

# Regra 2 — Nomenclatura de Tokens

**Resolvido em 2026-09-25** (Q13, fase E do plano de fechamento): o nome oficial de um token é o do Figma (`Categoria/Papel`, ex. `Neutral/Text/Primary`), não o formato antigo `cor/categoria/papel/valor-semântico`. O CSS é uma **tradução mecânica**: `/` vira `-` e tudo minúsculo (`Neutral/Text/Primary` → `--neutral-text-primary`). A coluna "Figma" das páginas de tokens e da documentação sempre cita o nome do Figma; o código usa a tradução.

`src/components/tokens/figma-color-bridge.ts` (`CSS_TO_FIGMA`, `FIGMA_COLORS`) é a **tabela oficial** dessa tradução — qualquer token novo entra ali antes de virar variável CSS.

## Exceção aceita: papel de texto × papel de superfície

Alguns tokens do código não são a tradução direta de 1 variável Figma — eles separam explicitamente o papel de **texto** do papel de **superfície/fundo**, porque um único nome do Figma às vezes serve pros dois sem distinguir (achado da revisão dark/WCAG de 2026-09-23/24, ver [[Regra 3 - Cores da Marca|Regra 3]]). Nesses casos, o sufixo `-action` ou `-surface` marca o papel de superfície, e o nome sem sufixo é o papel de texto:

| Texto | Superfície |
| --- | --- |
| `--brand-teal` | `--brand-teal-action` |
| `--brand-teal-dark` | `--brand-teal-dark-surface` |

Isso é uma exceção **aceita** à tradução mecânica, não um desvio — documentar o novo par nesta tabela quando surgir outro.

## Aplicação prática

Quando um valor não tem token semântico formal ainda mas é reaproveitado de um token existente (ex. cor com o mesmo RGB de outro papel), o código usa o token existente via modificador de opacidade (`bg-brand-secondary-light/45`) em vez de introduzir um hex literal novo.

## Ver também

- [[Tokens de Cor]]
- [[Regra 3 - Cores da Marca]]
