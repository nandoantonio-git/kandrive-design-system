---
tags: [pagina]
---

# Onboarding

**No Storybook:** `Pages/Onboarding`, histórias `Welcome`, `DominantHand` (tela cheia).


✅ Figma KanDrive V0.2.1: `Onboarding/Welcome`, `DominantHand`, `Theme` e `Done` (Mobile), aprovados em 2026-09-24 (F8).

## Uso

A configuração inicial, no primeiro acesso depois do cadastro: mão dominante e tema. Há "Pular" em todas as etapas. O tour pelas funções ficou para uma fase seguinte.


## Etapas

| Etapa | Conteúdo |
| --- | --- |
| `welcome` | Tela cheia teal com o Kan (`MobileSuccess`): "Bem-vindo ao KanDrive", "Começar" e "Pular" |
| `hand` | "Com qual mão você usa o celular?", com o `HandPicker` ligado às preferências |
| `theme` | "Claro ou escuro?", com o card Tema de Aparência |
| `done` | Tela cheia teal com o Kan: "Tudo pronto!" e "Ir para a Home" |

- **Boas-vindas e conclusão** são telas de feedback: sem gaveta nem barras e iguais no Light e no Dark. O botão Secondary fica com as cores do Light.
- **Etapas 2 e 3:** 3 pontos de progresso, título 25px Medium, texto 16px, e na base "Continuar" (`Button` Primary LG Pill) e "Pular".
- **No tablet e no desktop**, o conteúdo fica numa coluna central de até 420px. O Figma só tem o mobile.

Antes era a aba Docs de `Pages/Onboarding` no Storybook; saiu em 2026-09-29 porque as telas de largura fixa quebravam dentro da Docs (ver [[Plano das pendências (2026-09-29)]]).
