---
tags: [estado, plano, tokens]
---

# Plano da taxonomia de variáveis (2026-09-30)

Decisões do usuário: três coleções (`Primitives`, `Color`, `Dimension`), cores de base na escala 50 a 950, junção só de valores que não se distinguem na tela (diferença abaixo de 2), grupos por papel sem o prefixo `Neutral/`, e os nomes CSS do código mantidos (o Figma passa a apontar para o nome real do `index.css`). ✅ Aprovado e executado em 2026-09-30 (ver "Execução" no fim).

## Já corrigido (2026-09-30)

- A coleção `Storage` foi apagada. As 3 variáveis dela pintavam 423 camadas como cor de texto comum (links em teal, texto terciário, ícone de alerta), não como armazenamento. Cada camada foi religada à variável da `Core` que já usava na prática (`Brand/Primary/Default`, `Neutral/Text/Tertiary`, `Brand/Feedback/Warning/Default`), sem mudança visual.
- `Storage/FastAccess` (na `Core`) apontava para uma variável apagada. Agora aponta para o rosa `Brand/Theme/Pink/Dark` (`#b5254a`, Regra 3).
- O nome de código de `Neutral/Surface/Dark/Deep` e `/Deeper` estava trocado.

## 1. Coleções

| Coleção | Modos | Conteúdo |
| --- | --- | --- |
| `Primitives` | um só | 89 cores de base, sem escopo (não aparecem nos seletores) |
| `Color` | Light, Dark | 120 papéis, cada um apontando para uma cor de base, com opacidade quando precisa |
| `Dimension` | um só | raio e espaçamento |

## 2. Junções (valores que não se distinguem na tela)

Ficam de fora das junções as cores da página Design Language, as paradas do gradiente do logo, o branco e o preto. A tabela aprovada tinha 20 junções; na execução, com a ordem de junção fixada, ficaram 19.

| Valor antigo | Passa a usar | Diferença | Cor de base |
| --- | --- | --- | --- |
| `#006377` | `#006579` | 0.8 | `Teal/725` |
| `#1a1c1c` | `#1a1a1a` | 1.3 | `Gray/925` |
| `#1f1f23` | `#222226` | 1.5 | `Zinc/875` |
| `#2a2a2a` | `#262626` | 1.9 | `Gray/875` |
| `#32312e` | `#31302d` | 0.5 | `Stone/800` |
| `#71717b` | `#71717a` | 0.6 | `Zinc/525` |
| `#727272` | `#707070` | 0.8 | `Gray/525` |
| `#bfbfbf` | `#bbbbbb` | 1.5 | `Gray/250` |
| `#c0392b` | `#bc3426` | 1.8 | `Red/575` |
| `#d9d9d9` | `#d4d4d4` | 1.8 | `Gray/150` |
| `#e4e4e7` | `#e2e2e5` | 0.7 | `Gray/100` |
| `#e5e5e5` | `#eaeaea` | 1.8 | `Gray/75` |
| `#ececec` | `#eaeaea` | 0.7 | `Gray/75` |
| `#eef9fa` | `#ecfbfd` | 1.5 | `Teal/25` |
| `#f3f4f6` | `#f3f3f3` | 1.1 | `Gray/50` |
| `#f5f5f5` | `#f3f3f3` | 0.7 | `Gray/50` |
| `#f7f7f7` | `#f3f3f3` | 1.4 | `Gray/50` |
| `#fafafa` | `#ffffff` | 1.7 | `Base/White` |
| `#fffbeb` | `#fff8e6` | 1.7 | `Amber/25` |

## 3. Cores de base (`Primitives`)

- **Amber:** `Amber/25` #fff8e6, `Amber/200` #f5c35a, `Amber/225` #f5b544, `Amber/275` #f59e0b, `Amber/400` #c38418, `Amber/425` #d97706, `Amber/600` #80590d, `Amber/800` #3b2f12
- **Blue:** `Blue/200` #92ccff
- **Gray:** `Base/White` #ffffff, `Gray/25` #f9f9f9, `Gray/50` #f3f3f3, `Gray/75` #eaeaea, `Gray/100` #e2e2e5, `Gray/150` #d4d4d4, `Gray/250` #bbbbbb, `Gray/525` #707070, `Gray/725` #404040, `Gray/750` #3a3a3a, `Gray/800` #333333, `Gray/850` #27272a, `Gray/875` #262626, `Gray/900` #1c1c1f, `Gray/925` #1a1a1a, `Gray/950` #18181b, `Gray/975` #09090b, `Base/Black` #000000
- **Green:** `Green/250` #34d399, `Green/450` #009966, `Green/550` #047857
- **Pink:** `Pink/350` #f27a95, `Pink/450` #e8476a, `Pink/475` #d94f72, `Pink/600` #b5254a
- **Red:** `Red/350` #f07a6a, `Red/425` #e35d4a, `Red/575` #bc3426
- **Slate:** `Slate/150` #cbd5e1, `Slate/175` #c5ced2, `Slate/200` #bec8cc, `Slate/225` #bfc7d2, `Slate/275` #a8b0bd, `Slate/325` #9aa5a9, `Slate/350` #94a3b8, `Slate/500` #6e797d, `Slate/525` #64748b, `Slate/650` #475569, `Slate/675` #48535a, `Slate/700` #3f4850, `Slate/725` #3e484c
- **Stone:** `Stone/50` #f5f4f2, `Stone/100` #e5e4e0, `Stone/200` #c9c7c2, `Stone/325` #a8a6a1, `Stone/550` #6b6b68, `Stone/650` #565652, `Stone/800` #31302d, `Stone/925` #1a1714
- **Teal:** `Teal/25` #ecfbfd, `Teal/50` #e0f0f2, `Teal/150` #c8dce3, `Teal/450` #2391aa, `Teal/525` #007e96, `Teal/550` #04798f, `Teal/575` #337084, `Teal/600` #2c6c7f, `Teal/625` #0f6b7f, `Teal/650` #006b80, `Teal/675` #176a78, `Teal/700` #236579, `Teal/725` #006579, `Teal/750` #1b5e6e, `Teal/775` #1a5e6e, `Teal/900` #001f27, `Teal/925` #001d31
- **Zinc:** `Zinc/50` #ececf0, `Zinc/150` #d4d4d8, `Zinc/175` #ccced6, `Zinc/350` #a1a1aa, `Zinc/400` #92929b, `Zinc/525` #71717a, `Zinc/625` #59595f, `Zinc/650` #52525b, `Zinc/725` #3f3f46, `Zinc/775` #333537, `Zinc/800` #303036, `Zinc/825` #282a2c, `Zinc/875` #222226, `Zinc/900` #1a1c1e

## 4. Papéis (`Color`)

| Antes | Agora | Light | Dark | CSS |
| --- | --- | --- | --- | --- |
| `UI/Button/Border/Ghost` | `Border/Button/Ghost` | Slate/700 · 15% | Base/White · 15% | — |
| `UI/Connector/Border` | `Border/Connector` | Slate/700 · 30% | Base/White · 30% | — |
| `Neutral/Border/Cool` | `Border/Cool` | Slate/200 | Slate/675 | `--neutral-border-cool` |
| `Neutral/Border/Default` | `Border/Default` | Gray/525 | Zinc/650 | `--neutral-border-default` |
| `Neutral/Border/Ghost` | `Border/Ghost` | Base/Black · 6% | Base/White · 6% | — |
| `UI/Input/Border` | `Border/Input` | Slate/700 | Base/White · 15% | — |
| `Neutral/Border/Light` | `Border/Light` | Gray/250 | Zinc/725 | `--neutral-border-light` |
| `Neutral/Border/Medium` | `Border/Medium` | Gray/150 | Gray/725 | `--neutral-border-medium` |
| `Neutral/Border/Zinc` | `Border/Soft` | Gray/100 | Zinc/725 | `--neutral-border-zinc` |
| `Neutral/Border/Strong` | `Border/Strong` | Gray/750 | Zinc/350 | — |
| `Neutral/Border/Strong/Subtle` | `Border/Strong/Subtle` | Gray/750 · 22% | Base/White · 22% | — |
| `Neutral/Border/Subtle` | `Border/Subtle` | Zinc/50 | Base/White · 10% | `--neutral-border-subtle` |
| `Brand/Theme/Pink/Dark` | `Brand/Accent/Dark` | Pink/600 | Pink/475 | `--brand-pink-dark` |
| `Brand/Theme/Pink/Light` | `Brand/Accent/Light` | Pink/450 | Pink/350 | `--brand-pink-light` |
| `Brand/Primary/Action` | `Brand/Primary/Action` | Teal/525 | Teal/525 | `--brand-teal-action` |
| `Brand/Primary/Action/Hover` | `Brand/Primary/Action/Hover` | Teal/650 | Teal/650 | `--brand-teal-action-hover` |
| `Brand/Primary/Dark` | `Brand/Primary/Dark` | Teal/775 | Teal/450 | `--brand-teal-dark` |
| `Brand/Primary/Dark/Surface` | `Brand/Primary/Dark/Surface` | Teal/775 | Teal/775 | `--brand-teal-dark-surface` |
| `Brand/Primary/Deep` | `Brand/Primary/Deep` | Teal/725 | Teal/450 | `--brand-primary-deep` |
| `Brand/Primary/Teal/Deep` | `Brand/Primary/Deep/Alt` | Teal/675 | Teal/450 | `--brand-primary-teal-deep` |
| `Brand/Primary/Default` | `Brand/Primary/Default` | Teal/725 | Gray/50 | `--brand-teal` |
| `Brand/Primary/Disabled` | `Brand/Primary/Disabled` | Teal/25 · 90% | Teal/775 · 50% | `--brand-primary-disabled` |
| `Brand/Primary/Foreground` | `Brand/Primary/Foreground` | Base/White | Base/White | `--brand-teal-foreground` |
| `Brand/Primary/Hover` | `Brand/Primary/Hover` | Teal/650 | Gray/75 | — |
| `Brand/Primary/Ink` | `Brand/Primary/Ink` | Teal/900 | Teal/150 | `--brand-primary-ink` |
| `Brand/Primary/Ink/20` | `Brand/Primary/Ink/20` | Teal/900 · 20% | Teal/150 · 20% | `--brand-primary-ink-20` |
| `Brand/Primary/Light` | `Brand/Primary/Light` | Teal/150 | Teal/150 | `--brand-teal-light` |
| `Brand/Primary/Light/Surface` | `Brand/Primary/Light/Surface` | Teal/150 | Teal/775 · 40% | `--brand-teal-light-surface` |
| `Brand/Primary/Mid` | `Brand/Primary/Mid` | Teal/575 | Teal/575 | `--brand-primary-mid` |
| `Brand/Primary/Tint` | `Brand/Primary/Tint` | Teal/50 | Teal/775 · 40% | `--brand-primary-tint` |
| `Brand/Primary/Tint/Subtle` | `Brand/Primary/Tint/Subtle` | Teal/25 | Teal/775 · 20% | `--brand-primary-tint-subtle` |
| `Brand/Secondary/Dark` | `Brand/Secondary/Dark` | Stone/925 | Stone/50 | `--brand-secondary-dark` |
| `Brand/Secondary/Default` | `Brand/Secondary/Default` | Stone/800 | Stone/200 | `--brand-secondary` |
| `Brand/Secondary/Foreground` | `Brand/Secondary/Foreground` | Base/White | Stone/925 | `--brand-secondary-foreground` |
| `Brand/Secondary/Light` | `Brand/Secondary/Light` | Stone/650 | Stone/325 | `--brand-secondary-light` |
| `Effect/Glass/Dark/20` | `Effect/Glass/Dark/20` | Base/Black · 20% | Base/White · 20% | `--effect-glass-dark-20` |
| `Effect/Glass/Frost/80` | `Effect/Glass/Frost/80` | Gray/25 · 80% | Gray/925 · 80% | `--effect-glass-frost-80` |
| `Effect/Glass/Frost/90` | `Effect/Glass/Frost/90` | Gray/25 · 90% | Gray/925 · 90% | `--effect-glass-frost-90` |
| `Effect/Glass/Light/45` | `Effect/Glass/Light/45` | Gray/50 · 45% | Gray/875 · 45% | `--effect-glass-light-45` |
| `Effect/Glass/Surface/Dark` | `Effect/Glass/Surface/Dark` | Gray/875 | Gray/875 | `--effect-glass-surface-dark` |
| `Effect/Glass/Surface/Light` | `Effect/Glass/Surface/Light` | Base/White · 60% | Gray/875 | `--effect-glass-surface-light` |
| `Effect/Glass/White/05` | `Effect/Glass/White/05` | Base/White · 5% | Gray/925 · 5% | `--effect-glass-white-05` |
| `Effect/Glass/White/36` | `Effect/Glass/White/36` | Base/White · 36% | Gray/925 · 36% | `--effect-glass-white-36` |
| `Effect/Glass/White/50` | `Effect/Glass/White/50` | Base/White · 50% | Gray/925 · 50% | `--effect-glass-white-50` |
| `Effect/Glass/White/60` | `Effect/Glass/White/60` | Base/White · 60% | Gray/925 · 60% | `--effect-glass-white-60` |
| `Effect/Glass/White/70` | `Effect/Glass/White/70` | Base/White · 70% | Gray/925 · 70% | `--effect-glass-white-70` |
| `Effect/Overlay/Dark` | `Effect/Overlay/Dark` | Base/Black · 45% | Base/White · 45% | — |
| `Effect/Overlay/Default` | `Effect/Overlay/Default` | Base/Black · 50% | Base/White | `--effect-overlay-default` |
| `Effect/Overlay/Heavy` | `Effect/Overlay/Heavy` | Base/Black · 85% | Base/White · 85% | — |
| `Effect/Overlay/Light` | `Effect/Overlay/Light` | Gray/75 · 60% | Gray/850 · 60% | `--effect-overlay-light` |
| `Effect/Overlay/MD` | `Effect/Overlay/Medium` | Base/Black · 14% | Base/White | — |
| `Effect/Overlay/Secondary` | `Effect/Overlay/Secondary` | Stone/550 · 45% | Stone/325 · 45% | — |
| `Effect/Overlay/Strong` | `Effect/Overlay/Strong` | Gray/750 · 90% | Gray/750 · 90% | — |
| `Effect/Overlay/Subtle` | `Effect/Overlay/Subtle` | Slate/225 · 10% | Slate/275 · 15% | `--effect-overlay-subtle` |
| `Brand/Feedback/Danger/Default` | `Feedback/Danger/Default` | Red/575 | Red/350 | `--destructive` |
| `Brand/Feedback/Danger/Disabled` | `Feedback/Danger/Disabled` | Red/575 · 30% | Red/350 · 30% | — |
| `Brand/Feedback/Danger/Subtle` | `Feedback/Danger/Subtle` | Red/575 · 35% | Red/425 · 35% | — |
| `Brand/Feedback/Danger/Surface` | `Feedback/Danger/Surface` | Red/575 | Red/575 | `--destructive-surface` |
| `Brand/Feedback/Success/Default` | `Feedback/Success/Default` | Green/450 | Green/250 | — |
| `Brand/Feedback/Success/Subtle` | `Feedback/Success/Subtle` | Green/450 · 35% | Green/250 · 35% | — |
| `Brand/Feedback/Success/Surface` | `Feedback/Success/Surface` | Green/450 | Green/550 | `--brand-feedback-success-surface` |
| `Brand/Feedback/Warning/Default` | `Feedback/Warning/Default` | Amber/400 | Amber/225 | — |
| `Brand/Feedback/Warning/Subtle` | `Feedback/Warning/Subtle` | Amber/275 · 20% | Amber/275 · 20% | — |
| `Brand/Feedback/Warning/Surface` | `Feedback/Warning/Surface` | Amber/25 | Amber/800 | `--brand-feedback-warning-surface` |
| `Brand/Feedback/Warning/Surface/Alt` | `Feedback/Warning/Surface/Alt` | Amber/25 | Amber/800 | `--brand-feedback-warning-surface-alt` |
| `Brand/Feedback/Warning/Text` | `Feedback/Warning/Text` | Amber/600 | Amber/200 | `--brand-feedback-warning-text` |
| `Brand/Primary/Focus` | `Focus/Ring` | Blue/200 | Blue/200 | `--brand-primary-focus` |
| `Neutral/Icon/Default` | `Icon/Default` | Stone/800 | Stone/100 | `--neutral-icon-default` |
| `Logo/Glyph` | `Logo/Glyph` | Base/White | Stone/50 | — |
| `Logo/Symbol/Stop1` | `Logo/Symbol/Stop1` | Teal/525 | Teal/575 | — |
| `Logo/Symbol/Stop2` | `Logo/Symbol/Stop2` | Teal/550 | Teal/600 | — |
| `Logo/Symbol/Stop3` | `Logo/Symbol/Stop3` | Teal/625 | Teal/700 | — |
| `Logo/Symbol/Stop4` | `Logo/Symbol/Stop4` | Teal/750 | Teal/775 | — |
| `Logo/Wordmark/Accent` | `Logo/Wordmark/Accent` | Teal/525 | Teal/575 | — |
| `Logo/Wordmark/Base` | `Logo/Wordmark/Base` | Stone/800 | Stone/50 | — |
| `Storage/FastAccess` | `Storage/FastAccess` | Pink/600 | Pink/475 | — |
| `Storage/FastAccess/Surface` | `Storage/FastAccess/Surface` | Pink/600 | Pink/600 | `--storage-fast-access-surface` |
| `Storage/LongTerm` | `Storage/LongTerm` | Teal/725 | Gray/50 | — |
| `Storage/LongTerm/Surface` | `Storage/LongTerm/Surface` | Teal/775 | Teal/525 | `--storage-long-term-surface` |
| `Storage/Ready` | `Storage/Ready` | Amber/425 | Amber/275 | — |
| `Neutral/Surface/Background` | `Surface/Background` | Gray/50 | Gray/950 | `--neutral-surface-background` |
| `Neutral/Surface/Background/Alt` | `Surface/Background/Alt` | Gray/50 | Gray/900 | `--neutral-surface-background-alt` |
| `Neutral/Surface/Button/Secondary` | `Surface/Button/Secondary` | Base/White · 80% | Zinc/725 · 80% | `--neutral-surface-button-secondary` |
| `Neutral/Surface/Card` | `Surface/Card` | Base/White | Zinc/875 | `--neutral-surface-card` |
| `Neutral/Surface/Steel` | `Surface/Cool/Strong` | Slate/500 | Slate/325 | `--neutral-surface-steel` |
| `Neutral/Surface/Subtle/Cool` | `Surface/Cool/Subtle` | Gray/50 | Gray/850 | `--neutral-surface-subtle-cool` |
| `Neutral/Surface/Elevated` | `Surface/Elevated` | Base/White | Gray/850 | `--neutral-surface-elevated` |
| `Neutral/Surface/Dark/Base` | `Surface/Fixed/Dark/Base` | Gray/800 | Gray/800 | — |
| `Neutral/Surface/Dark/Deep` | `Surface/Fixed/Dark/Deep` | Zinc/825 | Zinc/825 | — |
| `Neutral/Surface/Dark/Deeper` | `Surface/Fixed/Dark/Deeper` | Zinc/900 | Zinc/900 | — |
| `Neutral/Surface/Dark` | `Surface/Fixed/Dark/Default` | Zinc/875 | Zinc/875 | — |
| `Neutral/Surface/Dark/Elevated` | `Surface/Fixed/Dark/Elevated` | Gray/875 | Gray/875 | — |
| `Neutral/Surface/Dark/Input` | `Surface/Fixed/Dark/Input` | Zinc/775 | Zinc/775 | — |
| `Neutral/Surface/Constant/Light` | `Surface/Fixed/Light` | Gray/50 | Gray/50 | `--neutral-surface-constant-light` |
| `Neutral/Surface/Ghost` | `Surface/Ghost` | Stone/550 · 5% | Stone/325 · 5% | — |
| `Neutral/Surface/Ghost/Secondary` | `Surface/Ghost/Secondary` | Stone/550 · 10% | Stone/325 · 10% | — |
| `Neutral/Surface/Medium` | `Surface/Medium` | Zinc/650 | Zinc/350 | `--neutral-surface-medium` |
| `Neutral/Surface/Muted` | `Surface/Muted` | Zinc/525 · 20% | Zinc/350 · 20% | — |
| `Neutral/Surface/Gray` | `Surface/Placeholder` | Gray/150 | Gray/750 | `--neutral-surface-gray` |
| `Neutral/Surface/Subtle` | `Surface/Subtle` | Gray/75 | Gray/850 | `--neutral-surface-subtle` |
| `Neutral/Surface/Subtle/Alt` | `Surface/Subtle/Alt` | Gray/100 | Zinc/800 | — |
| `Neutral/Text/Slate` | `Text/Cool/Primary` | Slate/725 | Slate/175 | `--neutral-text-slate` |
| `Neutral/Text/Slate/600` | `Text/Cool/Secondary` | Slate/650 | Slate/150 | `--neutral-text-slate-600` |
| `Neutral/Slate/400` | `Text/Cool/Tertiary` | Slate/350 | Slate/525 | `--neutral-slate-400` |
| `Neutral/Text/Disabled` | `Text/Disabled` | Zinc/175 | Zinc/400 | — |
| `Neutral/Text/Constant/Dark` | `Text/Fixed/Dark` | Zinc/725 | Zinc/725 | `--neutral-text-constant-dark` |
| `Neutral/Text/OnDark/Deep` | `Text/Fixed/Navy` | Teal/925 | Teal/925 | — |
| `Neutral/Text/Ink` | `Text/Ink` | Base/Black | Base/White | — |
| `Neutral/Text/Ink/85` | `Text/Ink/85` | Base/Black · 85% | Base/White · 85% | `--neutral-text-ink-85` |
| `Neutral/Text/Muted` | `Text/Muted` | Zinc/525 | Zinc/350 | `--neutral-text-muted` |
| `Neutral/Text/OnDark` | `Text/OnDark` | Base/White | Base/White | — |
| `Neutral/Text/OnDark/Disabled` | `Text/OnDark/Disabled` | Base/White · 80% | Base/White · 80% | — |
| `Neutral/Text/Vibrant/Primary` | `Text/OnGlass/Primary` | Gray/925 | Gray/50 | `--neutral-text-vibrant-primary` |
| `Neutral/Text/Vibrant/Secondary` | `Text/OnGlass/Secondary` | Gray/525 | Zinc/150 | `--neutral-text-vibrant-secondary` |
| `Neutral/Text/Vibrant/Tertiary` | `Text/OnGlass/Tertiary` | Gray/250 | Zinc/350 | `--neutral-text-vibrant-tertiary` |
| `Neutral/Text/Placeholder` | `Text/Placeholder` | Slate/225 | Zinc/350 | `--neutral-text-placeholder` |
| `Neutral/Text/Primary` | `Text/Primary` | Gray/975 | Base/White | `--neutral-text-primary` |
| `Neutral/Text/Secondary` | `Text/Secondary` | Zinc/725 | Zinc/150 | `--neutral-text-secondary` |
| `Neutral/Text/Graphite` | `Text/Strong` | Gray/925 | Gray/75 | `--neutral-text-graphite` |
| `Neutral/Text/Tertiary` | `Text/Tertiary` | Zinc/625 | Zinc/350 | `--neutral-text-tertiary` |

`Neutral/Surface/Ghost/Map` e `Effect/Glass/Fill/Light` foram apagadas (eram apelidos); as camadas passaram para `Surface/Ghost/Secondary` e `Effect/Glass/Surface/Light`.

## 5. Medidas (`Dimension`)

Um modo só (hoje estão dentro de Light e Dark, com o mesmo valor). Nomes pelo valor em px, sem misturar com tamanhos de camiseta.

| Hoje | Proposto | Valor |
| --- | --- | --- |
| `Radius/XS` | `Radius/4` | 4 |
| `Radius/SM` | `Radius/6` | 6 |
| `Radius/MD` | `Radius/8` | 8 |
| `Radius/LG` | `Radius/12` | 12 |
| `Radius/XL` | `Radius/16` | 16 |
| `Radius/20` | `Radius/20` | 20 |
| `Radius/2XL` | `Radius/24` | 24 |
| `Radius/3XL` | `Radius/32` | 32 |
| `Radius/Full` (100) e `Radius/Pill` (9999) | `Radius/Full` | 9999 ⚠️ junção: as duas deixam qualquer elemento de até 200px totalmente arredondado |
| `Spacing/1`, `Spacing/2` | `Spacing/1`, `Spacing/2` | 1, 2 |
| `Spacing/XS`, `SM`, `MD` | `Spacing/4`, `Spacing/6`, `Spacing/8` | 4, 6, 8 |
| `Spacing/10` | `Spacing/10` | 10 |
| `Spacing/LG`, `XL` | `Spacing/12`, `Spacing/16` | 12, 16 |
| `Spacing/20` | `Spacing/20` | 20 |
| `Spacing/2XL`, `3XL`, `4XL` | `Spacing/24`, `Spacing/32`, `Spacing/36` | 24, 32, 36 |
| `Spacing/48`, `Spacing/64` | `Spacing/48`, `Spacing/64` | 48, 64 |
| `Spacing/Nav` | `Spacing/70` | 70 |

## 6. Estilos e escopos

- Os 66 estilos de cor que repetem uma variável saem. Ficam os 3 gradientes (`Color/Brand/Gradient/*`), agora ligados às cores de base.
- Escopo por papel: `Text/*` só em texto; `Surface/*`, `Effect/*` e `Storage/*/Surface` só em preenchimento; `Border/*` só em traço; `Radius/*` só em raio; `Spacing/*` só em espaço e padding. As cores de base ficam sem escopo.

## 7. Para confirmar

- `Neutral/Text/OnDark/Deep`: o nome diz "sobre escuro", mas o valor é um azul-marinho (`#001d31`) nos dois modos. Proposta: `Text/Fixed/Navy`.
- `Neutral/Surface/Gray`: proposta `Surface/Placeholder` (cinza das miniaturas vazias).
- `Brand/Primary/Teal/Deep`: proposta `Brand/Primary/Deep/Alt`.

## Execução (2026-09-30)

- `Primitives` (89 cores, sem escopo, fora da publicação) e `Dimension` (24 medidas) criadas; `Core` virou `Color` com os papéis renomeados no lugar (as ligações das camadas se mantêm), apontando para as cores de base com opacidade quando precisa, com o escopo por papel e o nome CSS real (`codeSyntax`).
- 3.794 camadas religadas em 7 páginas: raio e espaçamento para `Dimension`, os dois apelidos apagados, e os 66 estilos de cor trocados pela variável que eles já usavam. Uma grade de layout do Header Tablet estava ligada a `Radius/2XL`; passou para `Spacing/24` (mesmo valor).
- Apagados: as 25 medidas antigas, os 2 apelidos e os 66 estilos. Ficam os 3 gradientes.
- Código: `figma-color-bridge.ts` gerado de novo a partir do Figma (nomes novos e cor de base por modo); o `index.css` recebeu os valores das junções (diferenças imperceptíveis); a página `Tokens/Colors` mostra 77 tokens iguais ao Figma e 0 divergentes; 55 arquivos de docs e comentários passaram a citar os nomes novos.
- Conferido por captura: `Home/Grid/Desktop` (claro) e `Settings/Account/Desktop · Dark`.

## Ordem de execução (planejada)

1. Criar `Primitives` e `Dimension`.
2. Mover os papéis para `Color`, apontando para as cores de base, com os nomes novos, o nome CSS real e o escopo.
3. Religar as camadas das variáveis apagadas (`Ghost/Map`, `Glass/Fill/Light`, `Radius/Pill`) e dos estilos que saem.
4. Conferir por captura as telas principais em Light e Dark.
5. Atualizar a página `Tokens/Colors` do Storybook com os cartões e a nova correspondência.
