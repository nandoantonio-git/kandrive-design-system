---
tags: [design-system, marca]
---

# Logo

Fonte: Figma KanDrive V0.2.1, componentes `Kandrive_logo_principal` e `foundation/LogoVertical` na página "✨Design System", e página Design Language (`1594:8007`).

## Símbolo: Kan, o canguru

O símbolo é o **Kan, um canguru**, e não um coelho. É um marsupial que **guarda as coisas na bolsa**. O bolso é a metáfora do produto: um lugar seguro onde se guarda algo por muito tempo e de onde se recupera quando precisar. É daí que vem o "Kan" do nome. Ver [[Tom de Voz e Personalidade da Marca]] para a personalidade do Kan.

## Cores por modo (variáveis `Logo/*`)

| Parte | Variável | Light | Dark |
|---|---|---|---|
| "Kan" (wordmark) | `Logo/Wordmark/Base` | #31302D | #F5F4F2 |
| "drive" (wordmark) | `Logo/Wordmark/Accent` | #007E96 | #337084 |
| Canguru (glifo) | `Logo/Glyph` | #FFFFFF | #F5F4F2 |
| Fundo do símbolo (gradiente) | `Logo/Symbol/Stop1–4` | #007E96 → #1B5E6E | #337084 → #1A5E6E |

- Todos os tons do Dark vêm da paleta da marca na Design Language; nenhum foi inventado (ver [[Tokens de Cor]]).
- Até 2026-09-24, no Figma, o corpo do canguru usava `Neutral/Surface/Card` e ficava escuro no Dark. Agora usa `Logo/Glyph`.

## No código

- `src/assets/logo/kandrive-logo.svg` é o logo Light, e `kandrive-logo-dark.svg` é o Dark.
- `organisms/Header` e `pages/LoginPage` mostram as duas versões e trocam pela classe `dark:`, com `dark:hidden` / `hidden dark:block`.
