---
tags: [estado, plano, tokens]
---

# Plano da taxonomia de variáveis (2026-09-30)

Decisões do usuário: três coleções (`Primitives`, `Color`, `Dimension`), cores de base na escala 50 a 950, junção só de valores que não se distinguem na tela (diferença abaixo de 2), grupos por papel sem o prefixo `Neutral/`, e os nomes CSS do código mantidos (o Figma passa a apontar para o nome real do `index.css`). Nada foi renomeado ainda: esta tabela é para aprovação.

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

Ficam de fora das junções as cores da página Design Language, as paradas do gradiente do logo, o branco e o preto.

| Valor atual | Passa a usar | Diferença | Cor de base |
| --- | --- | --- | --- |
| `#006377` | `#006579` | 0.8 | `Teal/725` |
| `#1a1c1c` | `#1a1a1a` | 1.3 | `Gray/925` |
| `#1f1f23` | `#222226` | 1.5 | `Zinc/875` |
| `#2a2a2a` | `#262626` | 1.9 | `Gray/875` |
| `#32312e` | `#31302d` | 0.5 | `Stone/800` |
| `#707070` | `#727272` | 0.8 | `Gray/525` |
| `#71717b` | `#71717a` | 0.6 | `Zinc/525` |
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
| `#fafafa` | `#ffffff` | 1.7 | `White` |
| `#fffbeb` | `#fff8e6` | 1.7 | `Amber/25` |

## 3. Cores de base (`Primitives`)

- **Amber:** `Amber/25` #fff8e6, `Amber/200` #f5c35a, `Amber/225` #f5b544, `Amber/275` #f59e0b, `Amber/400` #c38418, `Amber/425` #d97706, `Amber/600` #80590d, `Amber/800` #3b2f12
- **Blue:** `Blue/200` #92ccff
- **Gray:** `White` #ffffff, `Gray/25` #f9f9f9, `Gray/50` #f3f3f3, `Gray/75` #eaeaea, `Gray/100` #e2e2e5, `Gray/150` #d4d4d4, `Gray/250` #bbbbbb, `Gray/525` #727272, `Gray/725` #404040, `Gray/750` #3a3a3a, `Gray/800` #333333, `Gray/850` #27272a, `Gray/875` #262626, `Gray/900` #1c1c1f, `Gray/925` #1a1a1a, `Gray/950` #18181b, `Gray/975` #09090b, `Black` #000000
- **Green:** `Green/250` #34d399, `Green/450` #009966, `Green/550` #047857
- **Pink:** `Pink/350` #f27a95, `Pink/450` #e8476a, `Pink/475` #d94f72, `Pink/600` #b5254a
- **Red:** `Red/350` #f07a6a, `Red/425` #e35d4a, `Red/575` #bc3426
- **Slate:** `Slate/150` #cbd5e1, `Slate/175` #c5ced2, `Slate/200` #bec8cc, `Slate/225` #bfc7d2, `Slate/275` #a8b0bd, `Slate/325` #9aa5a9, `Slate/350` #94a3b8, `Slate/500` #6e797d, `Slate/525` #64748b, `Slate/650` #475569, `Slate/675` #48535a, `Slate/700` #3f4850, `Slate/725` #3e484c
- **Stone:** `Stone/50` #f5f4f2, `Stone/100` #e5e4e0, `Stone/200` #c9c7c2, `Stone/325` #a8a6a1, `Stone/550` #6b6b68, `Stone/650` #565652, `Stone/800` #31302d, `Stone/925` #1a1714
- **Teal:** `Teal/25` #ecfbfd, `Teal/50` #e0f0f2, `Teal/150` #c8dce3, `Teal/450` #2391aa, `Teal/525` #007e96, `Teal/550` #04798f, `Teal/575` #337084, `Teal/600` #2c6c7f, `Teal/625` #0f6b7f, `Teal/650` #006b80, `Teal/675` #176a78, `Teal/700` #236579, `Teal/725` #006579, `Teal/750` #1b5e6e, `Teal/775` #1a5e6e, `Teal/900` #001f27, `Teal/925` #001d31
- **Zinc:** `Zinc/50` #ececf0, `Zinc/150` #d4d4d8, `Zinc/175` #ccced6, `Zinc/350` #a1a1aa, `Zinc/400` #92929b, `Zinc/525` #71717a, `Zinc/625` #59595f, `Zinc/650` #52525b, `Zinc/725` #3f3f46, `Zinc/775` #333537, `Zinc/800` #303036, `Zinc/825` #282a2c, `Zinc/875` #222226, `Zinc/900` #1a1c1e

`Teal/750` (`#1b5e6e`) e `Teal/775` (`#1a5e6e`) são quase iguais, mas os dois ficam: o primeiro é parada do gradiente do logo.

## 4. Papéis (`Color`)

"CSS" é a variável do `index.css` com o mesmo valor nos dois modos; "—" quer dizer que o código não tem uma com o mesmo valor (ou não tem nenhuma). ⚠️ "era" marca uma junção da seção 2.

| Hoje | Proposto | Light | Dark | CSS | Motivo |
| --- | --- | --- | --- | --- | --- |
| `Brand/Secondary/Dark` | `Brand/Secondary/Dark` | Stone/925 | Stone/50 | `--brand-secondary-dark` |  |
| `Brand/Secondary/Default` | `Brand/Secondary/Default` | Stone/800 | Stone/200 | `--brand-secondary` |  |
| `Brand/Primary/Dark` | `Brand/Primary/Dark` | Teal/775 | Teal/450 | `--brand-teal-dark` |  |
| `Brand/Primary/Default` | `Brand/Primary/Default` | Teal/725 | Gray/50 ⚠️ era #f5f5f5 | `--brand-teal` |  |
| `Brand/Primary/Light` | `Brand/Primary/Light` | Teal/150 | Teal/150 | `--brand-teal-light` |  |
| `Brand/Primary/Disabled` | `Brand/Primary/Disabled` | Teal/25 · 90% ⚠️ era #ecfbfd | Teal/775 · 50% | — |  |
| `Brand/Secondary/Light` | `Brand/Secondary/Light` | Stone/650 | Stone/325 | `--brand-secondary-light` |  |
| `Brand/Feedback/Danger/Default` | `Feedback/Danger/Default` | Red/575 | Red/350 | — |  |
| `Neutral/Text/Primary` | `Text/Primary` | Gray/975 | White ⚠️ era #fafafa | `--neutral-text-primary` |  |
| `Neutral/Text/Secondary` | `Text/Secondary` | Zinc/725 | Zinc/150 | `--neutral-text-secondary` |  |
| `Neutral/Text/Tertiary` | `Text/Tertiary` | Zinc/625 | Zinc/350 | `--neutral-text-tertiary` |  |
| `Neutral/Text/Disabled` | `Text/Disabled` | Zinc/175 | Zinc/400 | — |  |
| `Neutral/Text/OnDark` | `Text/OnDark` | White | White | — |  |
| `Neutral/Border/Strong` | `Border/Strong` | Gray/750 | Zinc/350 | — |  |
| `Neutral/Text/OnDark/Disabled` | `Text/OnDark/Disabled` | White · 80% | White · 80% | — |  |
| `Neutral/Border/Default` | `Border/Default` | Gray/525 | Zinc/650 | `--neutral-border-default` |  |
| `Neutral/Border/Subtle` | `Border/Subtle` | Zinc/50 | White · 10% | `--neutral-border-subtle` |  |
| `Neutral/Surface/Dark` | `Surface/Fixed/Dark/Default` | Zinc/875 | Zinc/875 | — | superfícies escuras iguais nos dois modos |
| `Neutral/Surface/Medium` | `Surface/Medium` | Zinc/650 | Zinc/350 | `--neutral-surface-medium` |  |
| `Neutral/Surface/Subtle` | `Surface/Subtle` | Gray/75 | Gray/850 | `--neutral-surface-subtle` |  |
| `Neutral/Surface/Background` | `Surface/Background` | Gray/50 | Gray/950 | `--neutral-surface-background` |  |
| `Neutral/Surface/Card` | `Surface/Card` | White | Zinc/875 ⚠️ era #1f1f23 | `--neutral-surface-card` |  |
| `Brand/Primary/Mid` | `Brand/Primary/Mid` | Teal/575 | Teal/575 | `--brand-primary-mid` |  |
| `Brand/Feedback/Danger/Subtle` | `Feedback/Danger/Subtle` | Red/575 · 35% ⚠️ era #c0392b | Red/425 · 35% | — |  |
| `Brand/Feedback/Danger/Disabled` | `Feedback/Danger/Disabled` | Red/575 · 30% | Red/350 · 30% | — |  |
| `Brand/Feedback/Success/Default` | `Feedback/Success/Default` | Green/450 | Green/250 | — |  |
| `Brand/Feedback/Success/Subtle` | `Feedback/Success/Subtle` | Green/450 · 35% | Green/250 · 35% | — |  |
| `Neutral/Text/Placeholder` | `Text/Placeholder` | Slate/225 | Zinc/350 | `--neutral-text-placeholder` |  |
| `Neutral/Border/Light` | `Border/Light` | Gray/250 | Zinc/725 | `--neutral-border-light` |  |
| `Neutral/Surface/Muted` | `Surface/Muted` | Zinc/525 · 20% ⚠️ era #71717a | Zinc/350 · 20% | — |  |
| `Effect/Glass/Dark/20` | `Effect/Glass/Dark/20` | Black · 20% | White · 20% | `--effect-glass-dark-20` |  |
| `Effect/Overlay/Default` | `Effect/Overlay/Default` | Black · 50% | White | `--effect-overlay-default` |  |
| `Effect/Overlay/Heavy` | `Effect/Overlay/Heavy` | Black · 85% | White · 85% | — |  |
| `Effect/Overlay/MD` | `Effect/Overlay/Medium` | Black · 14% | White | — | nome por extenso, como os vizinhos |
| `Effect/Overlay/Dark` | `Effect/Overlay/Dark` | Black · 45% | White · 45% | — |  |
| `Neutral/Surface/Background/Alt` | `Surface/Background/Alt` | Gray/50 ⚠️ era #f7f7f7 | Gray/900 | `--neutral-surface-background-alt` |  |
| `Effect/Glass/Light/45` | `Effect/Glass/Light/45` | Gray/50 · 45% ⚠️ era #f7f7f7 | Gray/875 · 45% ⚠️ era #2a2a2a | `--effect-glass-light-45` |  |
| `Effect/Glass/White/50` | `Effect/Glass/White/50` | White · 50% | Gray/925 · 50% | `--effect-glass-white-50` |  |
| `Effect/Glass/White/36` | `Effect/Glass/White/36` | White · 36% | Gray/925 · 36% | `--effect-glass-white-36` |  |
| `Effect/Glass/White/70` | `Effect/Glass/White/70` | White · 70% | Gray/925 · 70% | `--effect-glass-white-70` |  |
| `Neutral/Surface/Dark/Base` | `Surface/Fixed/Dark/Base` | Gray/800 | Gray/800 | — | idem |
| `Neutral/Surface/Dark/Elevated` | `Surface/Fixed/Dark/Elevated` | Gray/875 | Gray/875 | `--effect-glass-surface-dark` | idem |
| `Neutral/Surface/Dark/Deep` | `Surface/Fixed/Dark/Deep` | Zinc/825 | Zinc/825 | — | idem |
| `Neutral/Surface/Dark/Deeper` | `Surface/Fixed/Dark/Deeper` | Zinc/900 | Zinc/900 | — | idem |
| `Neutral/Surface/Dark/Input` | `Surface/Fixed/Dark/Input` | Zinc/775 | Zinc/775 | — | idem |
| `Neutral/Text/OnDark/Deep` | `Text/Fixed/Navy` | Teal/925 | Teal/925 | — | ⚠️ a confirmar: o nome diz "sobre escuro", mas o valor é um azul-marinho escuro (#001d31) nos dois modos |
| `Neutral/Border/Strong/Subtle` | `Border/Strong/Subtle` | Gray/750 · 22% | White · 22% | — |  |
| `Neutral/Surface/Ghost/Secondary` | `Surface/Ghost/Secondary` | Stone/550 · 10% | Stone/325 · 10% | — |  |
| `Neutral/Surface/Ghost` | `Surface/Ghost` | Stone/550 · 5% | Stone/325 · 5% | — |  |
| `Neutral/Surface/Ghost/Map` | (apagar → Surface/Ghost/Secondary) | Stone/550 · 10% | Stone/325 · 10% | — | é só um apelido de Ghost/Secondary |
| `Effect/Overlay/Secondary` | `Effect/Overlay/Secondary` | Stone/550 · 45% | Stone/325 · 45% | — |  |
| `Effect/Overlay/Strong` | `Effect/Overlay/Strong` | Gray/750 · 90% | Gray/750 · 90% | — |  |
| `Effect/Overlay/Light` | `Effect/Overlay/Light` | Gray/75 · 60% | Gray/850 · 60% | `--effect-overlay-light` |  |
| `Neutral/Surface/Subtle/Alt` | `Surface/Subtle/Alt` | Gray/100 | Zinc/800 | — |  |
| `Effect/Overlay/Subtle` | `Effect/Overlay/Subtle` | Slate/225 · 10% | Slate/275 · 15% | `--effect-overlay-subtle` |  |
| `Neutral/Text/Ink` | `Text/Ink` | Black | White | — |  |
| `Brand/Primary/Focus` | `Focus/Ring` | Blue/200 | Blue/200 | `--brand-primary-focus` | foco não é marca |
| `Neutral/Border/Ghost` | `Border/Ghost` | Black · 6% | White · 6% | — |  |
| `Effect/Glass/White/05` | `Effect/Glass/White/05` | White · 5% | Gray/925 · 5% | `--effect-glass-white-05` |  |
| `UI/Input/Border` | `Border/Input` | Slate/700 | White · 15% | — | `UI/*` entra em Border |
| `UI/Connector/Border` | `Border/Connector` | Slate/700 · 30% | White · 30% | — | idem |
| `UI/Button/Border/Ghost` | `Border/Button/Ghost` | Slate/700 · 15% | White · 15% | — | idem |
| `Effect/Glass/Surface/Light` | `Effect/Glass/Surface/Light` | White · 60% ⚠️ era #fafafa | Gray/875 | — |  |
| `Effect/Glass/Surface/Dark` | `Effect/Glass/Surface/Dark` | Gray/875 | Gray/875 | `--effect-glass-surface-dark` |  |
| `Effect/Glass/Fill/Light` | (apagar → Effect/Glass/Surface/Light) | White · 60% ⚠️ era #fafafa | Gray/875 | — | é só um apelido de Glass/Surface/Light |
| `Storage/FastAccess` | `Storage/FastAccess` | (apelido quebrado) | (apelido quebrado) | — |  |
| `Storage/LongTerm` | `Storage/LongTerm` | Teal/725 | Gray/50 ⚠️ era #f5f5f5 | — |  |
| `Storage/Ready` | `Storage/Ready` | Amber/425 | Amber/275 | — |  |
| `Brand/Feedback/Warning/Default` | `Feedback/Warning/Default` | Amber/400 | Amber/225 | — |  |
| `Brand/Feedback/Warning/Subtle` | `Feedback/Warning/Subtle` | Amber/275 · 20% | Amber/275 · 20% | — |  |
| `Brand/Primary/Hover` | `Brand/Primary/Hover` | Teal/650 | Gray/100 ⚠️ era #e5e5e5 | — |  |
| `Neutral/Surface/Elevated` | `Surface/Elevated` | White | Gray/850 | `--neutral-surface-elevated` |  |
| `Brand/Theme/Pink/Dark` | `Brand/Accent/Dark` | Pink/600 | Pink/475 | `--brand-pink-dark` |  |
| `Brand/Theme/Pink/Light` | `Brand/Accent/Light` | Pink/450 | Pink/350 | `--brand-pink-light` |  |
| `Neutral/Text/Slate` | `Text/Cool/Primary` | Slate/725 | Slate/175 | `--neutral-text-slate` | nome de cor avulso vira papel |
| `Neutral/Border/Cool` | `Border/Cool` | Slate/200 | Slate/675 | `--neutral-border-cool` |  |
| `Neutral/Border/Medium` | `Border/Medium` | Gray/150 | Gray/725 | `--neutral-border-medium` |  |
| `Neutral/Border/Zinc` | `Border/Soft` | Gray/100 ⚠️ era #e4e4e7 | Zinc/725 | `--neutral-border-zinc` | nome de cor avulso vira papel |
| `Neutral/Text/Ink/85` | `Text/Ink/85` | Black · 85% | White · 85% | `--neutral-text-ink-85` |  |
| `Neutral/Text/Muted` | `Text/Muted` | Zinc/525 | Zinc/350 | `--neutral-text-muted` |  |
| `Neutral/Slate/400` | `Text/Cool/Tertiary` | Slate/350 | Slate/525 | `--neutral-slate-400` | grupo solto `Neutral/Slate` entra em Text |
| `Effect/Glass/Frost/80` | `Effect/Glass/Frost/80` | Gray/25 · 80% | Gray/925 · 80% | `--effect-glass-frost-80` |  |
| `Neutral/Text/Graphite` | `Text/Strong` | Gray/925 ⚠️ era #1a1c1c | Gray/75 ⚠️ era #ececec | `--neutral-text-graphite` | nome de cor avulso vira papel |
| `Brand/Primary/Ink` | `Brand/Primary/Ink` | Teal/900 | Teal/150 | `--brand-primary-ink` |  |
| `Brand/Primary/Ink/20` | `Brand/Primary/Ink/20` | Teal/900 · 20% | Teal/150 · 20% | `--brand-primary-ink-20` |  |
| `Effect/Glass/Frost/90` | `Effect/Glass/Frost/90` | Gray/25 · 90% | Gray/925 · 90% | — |  |
| `Neutral/Surface/Gray` | `Surface/Placeholder` | Gray/150 ⚠️ era #d9d9d9 | Gray/750 | `--neutral-surface-gray` | ⚠️ a confirmar: cinza neutro usado nas miniaturas vazias |
| `Effect/Glass/White/60` | `Effect/Glass/White/60` | White · 60% | Gray/925 · 60% | `--effect-glass-white-60` |  |
| `Brand/Primary/Deep` | `Brand/Primary/Deep` | Teal/725 ⚠️ era #006377 | Teal/450 | `--brand-primary-deep` |  |
| `Neutral/Text/Slate/600` | `Text/Cool/Secondary` | Slate/650 | Slate/150 | `--neutral-text-slate-600` | escala do Tailwind vira papel |
| `Brand/Feedback/Warning/Text` | `Feedback/Warning/Text` | Amber/600 | Amber/200 | `--brand-feedback-warning-text` |  |
| `Brand/Primary/Teal/Deep` | `Brand/Primary/Deep/Alt` | Teal/675 | Teal/450 | `--brand-primary-teal-deep` | "Teal" repete a família dentro de Primary |
| `Neutral/Surface/Steel` | `Surface/Cool/Strong` | Slate/500 | Slate/325 | `--neutral-surface-steel` | nome de cor avulso vira papel |
| `Neutral/Icon/Default` | `Icon/Default` | Stone/800 ⚠️ era #32312e | Stone/100 | `--neutral-icon-default` |  |
| `Brand/Primary/Foreground` | `Brand/Primary/Foreground` | White | White | — |  |
| `Brand/Primary/Action` | `Brand/Primary/Action` | Teal/525 | Teal/525 | `--brand-teal-action` |  |
| `Brand/Primary/Action/Hover` | `Brand/Primary/Action/Hover` | Teal/650 | Teal/650 | `--brand-teal-action-hover` |  |
| `Storage/FastAccess/Surface` | `Storage/FastAccess/Surface` | Pink/600 | Pink/600 | `--storage-fast-access-surface` |  |
| `Storage/LongTerm/Surface` | `Storage/LongTerm/Surface` | Teal/775 | Teal/525 | `--storage-long-term-surface` |  |
| `Neutral/Surface/Constant/Light` | `Surface/Fixed/Light` | Gray/50 | Gray/50 | `--neutral-surface-constant-light` | idem |
| `Neutral/Text/Constant/Dark` | `Text/Fixed/Dark` | Zinc/725 | Zinc/725 | `--neutral-text-constant-dark` | "Constant" vira "Fixed": igual nos dois modos |
| `Neutral/Text/Vibrant/Primary` | `Text/OnGlass/Primary` | Gray/925 | Gray/50 ⚠️ era #f5f5f5 | `--neutral-text-vibrant-primary` | "Vibrant" é texto sobre vidro |
| `Neutral/Text/Vibrant/Secondary` | `Text/OnGlass/Secondary` | Gray/525 ⚠️ era #727272 | Zinc/150 | `--neutral-text-vibrant-secondary` | idem |
| `Neutral/Text/Vibrant/Tertiary` | `Text/OnGlass/Tertiary` | Gray/250 ⚠️ era #bfbfbf | Zinc/350 | `--neutral-text-vibrant-tertiary` | idem |
| `Brand/Feedback/Danger/Surface` | `Feedback/Danger/Surface` | Red/575 | Red/575 | `--destructive-surface` |  |
| `Brand/Primary/Dark/Surface` | `Brand/Primary/Dark/Surface` | Teal/775 | Teal/775 | `--brand-teal-dark-surface` |  |
| `Brand/Feedback/Success/Surface` | `Feedback/Success/Surface` | Green/450 | Green/550 | `--brand-feedback-success-surface` |  |
| `Brand/Feedback/Warning/Surface` | `Feedback/Warning/Surface` | Amber/25 ⚠️ era #fff8e6 | Amber/800 | `--brand-feedback-warning-surface` |  |
| `Brand/Secondary/Foreground` | `Brand/Secondary/Foreground` | White | Stone/925 | `--brand-secondary-foreground` |  |
| `Neutral/Surface/Button/Secondary` | `Surface/Button/Secondary` | White · 80% | Zinc/725 · 80% | `--neutral-surface-button-secondary` |  |
| `Brand/Primary/Tint` | `Brand/Primary/Tint` | Teal/50 | Teal/775 · 40% | `--brand-primary-tint` |  |
| `Neutral/Surface/Subtle/Cool` | `Surface/Cool/Subtle` | Gray/50 ⚠️ era #f3f4f6 | Gray/850 | `--neutral-surface-subtle-cool` | padrão Cool |
| `Brand/Feedback/Warning/Surface/Alt` | `Feedback/Warning/Surface/Alt` | Amber/25 | Amber/800 | `--brand-feedback-warning-surface-alt` |  |
| `Brand/Primary/Tint/Subtle` | `Brand/Primary/Tint/Subtle` | Teal/25 | Teal/775 · 20% | `--brand-primary-tint-subtle` |  |
| `Brand/Primary/Light/Surface` | `Brand/Primary/Light/Surface` | Teal/150 | Teal/775 · 40% | `--brand-teal-light-surface` |  |
| `Logo/Wordmark/Base` | `Logo/Wordmark/Base` | Stone/800 | Stone/50 | — |  |
| `Logo/Wordmark/Accent` | `Logo/Wordmark/Accent` | Teal/525 | Teal/575 | — |  |
| `Logo/Glyph` | `Logo/Glyph` | White | Stone/50 | — |  |
| `Logo/Symbol/Stop1` | `Logo/Symbol/Stop1` | Teal/525 | Teal/575 | — |  |
| `Logo/Symbol/Stop2` | `Logo/Symbol/Stop2` | Teal/550 | Teal/600 | — |  |
| `Logo/Symbol/Stop3` | `Logo/Symbol/Stop3` | Teal/625 | Teal/700 | — |  |
| `Logo/Symbol/Stop4` | `Logo/Symbol/Stop4` | Teal/750 | Teal/775 | — |  |

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

## Ordem de execução

1. Criar `Primitives` e `Dimension`.
2. Mover os papéis para `Color`, apontando para as cores de base, com os nomes novos, o nome CSS real e o escopo.
3. Religar as camadas das variáveis apagadas (`Ghost/Map`, `Glass/Fill/Light`, `Radius/Pill`) e dos estilos que saem.
4. Conferir por captura as telas principais em Light e Dark.
5. Atualizar a página `Tokens/Colors` do Storybook com os cartões e a nova correspondência.
