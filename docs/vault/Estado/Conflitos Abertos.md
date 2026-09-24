---
tags: [estado]
---

# Conflitos Abertos

Fonte completa: `making-of/conflicts.md` (log de todas as entradas, incluindo já resolvidas — movido pra fora deste repositório em 2026-08-21). Aqui, só os que ainda esperam **decisão humana** — ordenados por urgência.

## 🔴 Alta urgência

**Formato de nome dos tokens ([[Regra 2 - Nomenclatura de Tokens|Regra 2]])** — Figma usa `var(--categoria-papel-valor)` (kebab-case), não `cor/categoria/papel/valor-semântico`. A tradução na documentação é uma camada de abstração, não o nome literal.

## 🟡 Média urgência

**Tratamento de "perigo" — 2 leituras válidas** — botão de ação destrutiva = chrome neutro + texto vermelho; badge de status = preenchido vermelho. Parece intencional por contexto, não inconsistência — mas nunca formalizado como 2 casos válidos na Regra 3.

**`FolderTagChip` — `isExpanded`** — comportamento visual exato do estado expandido é 🧩 inferido, não confirmado pixel-a-pixel.

**Tamanho do rótulo do `atom/Button` ([[Regra 4 - Tipografia e Acessibilidade|Regra 4]] × Figma, 2026-09-24)**: o Figma V0.2.1 (`3028:3700`) usa 14px nos rótulos de MD e LG Rounded, e 16px só no Pill LG. A Regra 4 exige no mínimo 16px em rótulo de botão. Por ora o código usa 16px em todos, como o `PushButton`. Decidir: manter a regra (e corrigir o Figma) ou abrir uma exceção para o botão de 33px.

## 🟢 Baixa urgência (gaps de polish, não de decisão)

- **`celule/MainCanvas/Organization/FreeMode/Buttons` (2026-08-20)** — única das 10 peças da extinta camada `Cells` ainda não renomeada `molecule/` no Figma fonte (`1431:20043`). Código já trata como `molecule`; só a fonte Figma precisa da correção manual.
- **2 telas sem o prefixo `page/*` consistente (2026-08-20)** — `Organização/ModoData/Organização/Saved` (sem prefixo) e `Page/login` (capitalização diferente + perdeu "Glassmorphism Edition"). Cosmético, não bloqueia implementação.
- Placeholder do `SearchInput` diverge do Figma ("Search" vs. termo aprovado) — decisão deliberada, não bug.
- Vários textos em inglês no Figma fonte (`upload-popover`, `FaqFastLinks`, `planSelection`) — traduzidos direto na implementação, nunca literal.
- `PushButton` cobre só 2 dos 7 valores do enum `Style` do Figma. Os estilos de ação do produto agora ficam no `atom/Button` (Regra 1 revogada em 2026-09-23).
- `atom/Icon/SpatialAudioOff` é visualmente um ícone de pessoa/avatar, não de mudo — nome de camada não bate com o conteúdo no próprio Figma.
- Estados `Focused`/`Typing` do `SearchBar` (SF Pro, azul Apple) — ver [[SearchInput]].
- **Sem teste automatizado** — gate real é só `tsc --noEmit` + `build-storybook`; `addon-vitest`/Playwright instalados, nunca usados. Registrado 2026-08-18 como débito explícito de handoff, não lacuna escondida.

## Ver também

- [[Regra 5 - Terminologia]]
- [[Regra 2 - Nomenclatura de Tokens]]
- [[Regra 3 - Cores da Marca]]
