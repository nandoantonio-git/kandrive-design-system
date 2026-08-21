---
tags: [estado]
---

# Conflitos Abertos

Fonte completa: `making-of/conflicts.md` (log de todas as entradas, incluindo já resolvidas — movido pra fora deste repositório em 2026-08-21). Aqui, só os que ainda esperam **decisão humana** — ordenados por urgência.

## 🔴 Alta urgência

**Formato de nome dos tokens ([[Regra 2 - Nomenclatura de Tokens|Regra 2]])** — Figma usa `var(--categoria-papel-valor)` (kebab-case), não `cor/categoria/papel/valor-semântico`. A tradução na documentação é uma camada de abstração, não o nome literal.

## 🟡 Média urgência

**Paleta neutra** — só 4 de ~30 papéis neutros batem exato com a rampa Zinc do Tailwind. A maioria (incluindo toda a família `ui-*`) usa tons levemente azulados fora da família Zinc. Ver [[Tokens de Cor]].

**Tratamento de "perigo" — 2 leituras válidas** — botão de ação destrutiva = chrome neutro + texto vermelho; badge de status = preenchido vermelho. Parece intencional por contexto, não inconsistência — mas nunca formalizado como 2 casos válidos na Regra 3.

**`FolderTagChip` — `isExpanded`** — comportamento visual exato do estado expandido é 🧩 inferido, não confirmado pixel-a-pixel.

## 🟢 Baixa urgência (gaps de polish, não de decisão)

- **`FreeModeAddMenu` (2026-08-20)** — `get_design_context` fresco no node `1431:20042` sugere painel mais estreito (228px) e translúcido/Liquid Glass, contra os 256px/fundo sólido já implementados e auditados. Não corrigido — leitura isolada sem canvas real por trás, não conclusiva o bastante pra decidir se é regressão real. Ver [[Sessão 2026-08-20]].
- **`celule/MainCanvas/Organization/FreeMode/Buttons` (2026-08-20)** — única das 10 peças da extinta camada `Cells` ainda não renomeada `molecule/` no Figma fonte (`1431:20043`). Código já trata como `molecule`; só a fonte Figma precisa da correção manual.
- **2 telas sem o prefixo `page/*` consistente (2026-08-20)** — `Organização/ModoData/Organização/Saved` (sem prefixo) e `Page/login` (capitalização diferente + perdeu "Glassmorphism Edition"). Cosmético, não bloqueia implementação.
- **`PreviewPane` com borda teal na raiz (2026-08-21)** — Figma real não tem borda nenhuma no container raiz, só internamente. Não é o padrão "borda cinza" já corrigido nos outros 4 componentes na mesma sessão (ver [[Regra 3 - Cores da Marca]]); registrado, não corrigido ainda.
- Placeholder do `SearchInput` diverge do Figma ("Search" vs. termo aprovado) — decisão deliberada, não bug.
- Vários textos em inglês no Figma fonte (`upload-popover`, `FaqFastLinks`, `planSelection`) — traduzidos direto na implementação, nunca literal.
- `PushButton` cobre só 2 dos 7 valores do enum `Style` do Figma.
- `atom/Icon/SpatialAudioOff` é visualmente um ícone de pessoa/avatar, não de mudo — nome de camada não bate com o conteúdo no próprio Figma.
- `organism/Header` — "Organizar" não está na lista aprovada nem proibida da Regra 5 (gap de cobertura, não violação).
- Estados `Focused`/`Typing` do `SearchBar` (SF Pro, azul Apple) — ver [[SearchInput]].
- **Sem teste automatizado** — gate real é só `tsc --noEmit` + `build-storybook`; `addon-vitest`/Playwright instalados, nunca usados. Registrado 2026-08-18 como débito explícito de handoff, não lacuna escondida.

## Ver também

- [[Regra 5 - Terminologia]]
- [[Regra 2 - Nomenclatura de Tokens]]
- [[Regra 3 - Cores da Marca]]
