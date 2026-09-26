---
tags: [regra, revogada]
---

# Regra 1 — Botão Único (REVOGADA em 2026-09-23)

> **Status:** revogada pelo dono do produto na auditoria do Figma (KanDrive V0.2.1, decisão Q20). O Figma passou a ter **dois** componentes de botão com papéis distintos. Esta nota fica como histórico.

## Regra atual

| Componente | Papel | Props (Figma) |
|---|---|---|
| `atom/Button` | CTA de produto (Salvar alterações, Entrar, Confirmar upgrade, Adicionar arquivos…) | `Style` Primary · Outline · Destructive · Glass · Secondary — `Size` MD · LG — `Shape` Rounded · Pill — `Label` |
| `atom/PushButton` | Botão estilo macOS de diálogos e toolbars | `Style` (8 valores) · `State` · `Selected` · `ActiveWindow` · `WithIcon` · `Label` · `Icon` |
| `atom/IconButton` | Botão só com ícone | `Icon` · `Style` · `State` · `Selected` |

- `atom/Button` foi extraído dos botões soltos das telas (Settings, Payment, Login, estados mobile) — valores Figma-confirmados. Hover/Pressed **não existem** nas telas → gap de engenharia (ver [[Regra 7 - Gaps Conhecidos]]), não inventar.
- `Destructive` do `atom/Button` é **fundo vermelho preenchido** (`#bc3426`, tela Settings/DeleteAccount); o `isDestructive` do PushButton continua sendo só texto em cor de perigo.
- Código: criar `atom/Button` (ou mapear para `ui/button` com as variantes acima) antes de substituir usos de PushButton em CTAs.

## Histórico (regra antiga)

`atom/PushButton` era o **único** componente de botão do MVP; variações eram props (`variant`, `isDestructive`) e qualquer botão separado no Figma era CONFLICT. Achado antigo: o enum `Style` do PushButton tinha 7 valores no Figma e só 2 implementados — continua válido para o PushButton.

## Ver também

- [[PushButton]]
- [[Conflitos Abertos]]
