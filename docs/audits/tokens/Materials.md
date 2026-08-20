# Materials — histórico de auditoria

Espelha o conteúdo de processo removido de `stories/tokens/Materials.mdx`
em 2026-08-18 (mesma separação já feita pros componentes em 2026-08-15).

## Reconciliação com o Figma (2026-08-09)

Os valores da spec vêm de `get_variable_defs` na seção "Material - Liquid
Glass" (nó `1431:17276`, component sets `Liquid Glass - Large/Medium/Small`,
Mode=Dark/Light), mais os tokens de cor de efeito (`effect-glass-*`,
`effect-overlay-*`) lidos na seção Pallete e confirmados em uso em
`molecule/SearchBar`. Substitui a versão anterior desta página, que era
100% inferida por falta de acesso ao Figma.

## Achado não incluído na spec (2026-08-09) — revisto em 2026-08-19

O nó da seção Material também retornou `Component Fill` (`#f5f5f5`),
`Subcomponent Fill` (`#aaaaaa`) e `Subcomponent Stroke` (`#00000066`) —
nomes genéricos sem prefixo `Liquid Glass`/`effect-glass`, tratados então
como prováveis fills de placeholder do symbol de demonstração `BG - Large
UI` (`1439:16862`), não tokens do material em si.

**Revisão de 2026-08-19 (achado do usuário)**: componentes com Liquid
Glass sem nenhuma borda liam como "vidro borrado sem definição" — a
ausência de `Subcomponent Stroke` explicava exatamente isso. Reclassificada
de "provável placeholder" pra "borda real do material" — ver seção
"Borda" no `.mdx` ativo. `Subcomponent Fill` (`#aaaaaa`) segue fora da
spec (é fill do symbol de demonstração, não do vidro em si — o fill real
já vem de `effect-glass-*`).

## Anatomia — raciocínio por trás da conclusão de 5 camadas

A conclusão de que o material é composto por 5 camadas empilhadas
(backdrop, glass, tint, borda/highlight, conteúdo) combina achados de
níveis de confiança diferentes:

1. **Backdrop** — 🧩 inferido como conceito (o Figma não nomeia a camada
   de backdrop separadamente, mas `Liquid Glass/Frost-*` e `Refraction`
   só fazem sentido operando sobre um backdrop).
2. **Glass** — ✅ Figma-confirmado (`type: GLASS, radius: 10`,
   `Refraction: 100`, `Dispersion: 0`, modulado por `Depth`/`Splay`/`Frost`).
3. **Tint** — ✅ Figma-confirmado a existência das variáveis
   `effect-glass-*`; 🧩 inferido o mapeamento exato de qual tint vai em
   qual tamanho/modo (não extraído variante-a-variante nesta
   reconciliação).
4. **Borda/highlight** — 🧩 inferido a partir de `Liquid Glass/Light
   Angle: -45`; a implementação exata (largura/opacidade) não tem
   variável própria identificada — pode estar embutida no efeito nativo
   `GLASS`, não exposta separadamente.
5. **Conteúdo** — sem token de material próprio, segue `Tokens/Colors`/
   `Tokens/Typography`.

## Demo expandida (2026-08-20) — /grilling sobre representar Materials com base numa referência externa

Sessão de grilling (usuário pediu pra "ver a possibilidade de representar o
Materials com base em" um arquivo Figma community de terceiros — macOS 26,
não o arquivo Kandrive). Decisões fechadas na entrevista, nenhuma delas
Figma-confirmada pro Kandrive:

1. **Escopo travado em documentação/demo apenas** — nenhum dos ~43
   componentes que já usam Liquid Glass foi reaberto ou alterado. Só
   `stories/tokens/Materials.mdx` e `src/components/tokens/material-demo.tsx`.
2. **Fidelidade**: o arquivo de referência usa o efeito nativo `GLASS` do
   Figma (Refraction/Dispersion/Depth/Splay), sem equivalente direto em
   CSS. Decisão: adaptar pra `backdrop-filter` real em vez de perseguir os
   números do motor Figma — os 3 tiers de frost (7/12/14) viraram
   `backdrop-blur-[7px]/[12px]/[14px]` como aproximação deliberada.
3. **Atribuição**: o arquivo de referência (macOS 26 Community) não é
   citado nem linkado em nenhum lugar da documentação publicada — serviu
   só de inspiração de técnica/conceito nesta conversa (Regra 9: o selo
   "Figma-confirmado" continua exclusivo do arquivo Kandrive).
4. **Fundo dos swatches**: trocado de gradiente diagonal único (+ 2 formas
   decorativas) pra faixas verticais sólidas da paleta de marca real
   (`--brand-teal-light/-teal/-secondary/-pink-dark/-pink-light`) — mesma
   técnica do arquivo de referência (transições nítidas de cor revelam o
   blur), paleta 100% Kandrive.
5. **Tiers de frost**: ganharam demo visual própria (`MaterialFrostDemo`,
   3 swatches, tint fixo neutro) — antes só existiam como texto na tabela,
   nenhum swatch mostrava a diferença entre tamanhos.
6. **Tint dinâmico**: novo swatch ilustrativo (`MaterialTintedDemo`) usando
   `--brand-teal` como exemplo de tint colorido/accent — explicitamente
   rotulado como exemplo, não um token novo.
7. **Preview de dark mode**: novo swatch ilustrativo (`MaterialDarkModeDemo`)
   usando `--effect-glass-surface-dark` (token já documentado na tabela
   desde 2026-08-09, nunca antes ligado a uma variável CSS — adicionada em
   `src/index.css` nesta rodada). Não implementa dark theme real no app;
   rotulado como conceitual.

## Bug real encontrado durante a verificação (2026-08-20)

Ao tirar screenshot da demo reescrita, o painel de vidro renderizava com
altura ~2px (efetivamente invisível) apesar do backdrop-filter/tint/borda
estarem corretos no CSS computado (confirmado via `getComputedStyle` no
Playwright). Causa raiz: `GlassBackdrop` usava `min-h-32` (só `min-height`)
como container flex, com o painel filho em `size-full` (`height: 100%`) —
percentual de altura não resolve contra um container cuja altura é só
`min-height`/auto (não é uma altura "definida" pela spec CSS), então o
navegador trata a altura do filho como 0 pra evitar dependência circular.
Esse mesmo padrão (`min-h-32` + `size-full`) já existia na versão anterior
do componente, antes desta sessão — não é uma regressão introduzida agora,
é um bug pré-existente que só ficou visível ao reverificar com screenshot
real em vez de confiar no build/typecheck. Corrigido trocando pra
`h-32` (altura definida) no container + `absolute inset-4` no painel, em
vez de depender de `flex` + altura percentual.

## Borda reflexiva + sombra do material (2026-08-20, round 2)

Segunda rodada de `/grilling` no mesmo dia: o usuário apontou que a borda
plana `#00000066` (aplicada em 2026-08-19) não representa o que
`Liquid Glass/Light Angle: -45` descreve — pediu revisão pra um edge de
vidro sensível a reflexo de luz, mais `Effect/Shadow/SM` como convenção de
elevação do material. Decisões:

1. Novo utilitário compartilhado `.glass-edge` (`src/index.css`) —
   gradiente 135° branco (`rgba(255,255,255,.55)`, decisão humana, não
   Figma-confirmada) → `#00000066` (Figma-confirmado), via pseudo-elemento
   `::before` + `mask-composite: exclude` (não `border-image`, que ignora
   `border-radius`). Substitui `border border-[#00000066]` em todos os 23
   componentes reais + `material-demo.tsx`.
2. Novo utilitário `.glass-shadow-sm` — `filter: drop-shadow(0px 2px 16px
   #09090b14)` (`Effect/Shadow/SM`, Figma-confirmado).
3. `.glass-edge` exige que o elemento já seja posicionado
   (`relative`/`absolute`/etc.) pro `::before absolute inset-0` funcionar.
   16 dos 23 componentes eram `static` e ganharam `relative` junto com a
   troca; os outros 7 (mais `ImageItem`) já eram `absolute` (overlays) ou
   já tinham `relative` (`OrganizePanelDropZone`).
4. `.glass-shadow-sm` só foi adicionada em componentes que **não** já
   tinham sua própria sombra de contexto (evita empilhar duas sombras).
   Ganharam a sombra nova: `Label` (2 instâncias), `ActionPill`,
   `PopoverNotification`, `ContextHeader`, `Notification`,
   `NodeContextMenu`, `ViewModeToggle`, `DropdownSelectGroupBy`,
   `FaqInfoCard`, `FaqInfoCardCollapsed`, `CardNeedMoreHelp`, `CardLogin`.
   Mantiveram só a própria sombra (sem duplicar): `SearchInput`,
   `TemplateReviewModal`, `SaveOrganizationModal`, `ArchiveBrowserModal`
   (2 instâncias), `DropNewTag`, `SaveLongTermFileStorage`,
   `DropdownMenu`, `OrganizeFreeModeCanvas`, `OrganizePanelDropZone`.
   Exceções sem sombra nova por tamanho/contexto: `ImageItem` (retângulo
   de vidro de 31×28px, sombra de elevação ficaria desproporcional numa
   peça tão pequena) e `ArchiveBrowserModalSearch` (div interna sem
   sombra própria, mas o wrapper direto já projeta
   `shadow-[0px_8px_20px_rgba(0,0,0,0.12)]` — duplicar ali seria
   redundante).
