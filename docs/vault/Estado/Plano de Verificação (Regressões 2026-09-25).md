---
tags: [estado]
---

# Plano de Verificação — Regressões pós-fechamento (2026-09-25)

Origem: verificação humana feita pelo usuário logo após o fechamento das fases A–E ([[Plano de Fechamento]]). Encontrou animações que sumiram, interações quebradas e uma lista de 24 apontamentos pontuais por componente. Este documento organiza esses apontamentos em grupos verificáveis, define o método de checagem para cada grupo (sem validação pixel a pixel — [[No pixel validation|conferir por tokens/spec, não por diff de imagem]]) e propõe uma ordem de execução.

**Achado de pré-checagem (Explore, 2026-09-25):** a alegação "os DOCS quebram a aplicação" não tem lastro técnico — nenhum `.mdx` importa algo que não existe, todos os `X.stories.tsx` referenciados existem, nenhum import morto de `push-button`. O que existe é **texto de prosa desatualizado**: vários `.mdx` (`Button.mdx`, `SaveOrganizationModal.mdx`, `TemplateReviewModal.mdx`, `Header.mdx`, `StorageSidebar.mdx`, `PreviewPane.mdx`, `tokens/unused.mdx`, `Introducao.mdx`) ainda mencionam `PushButton`/`push-button.tsx` como se existisse — confuso para quem lê, mas não quebra build. Vira o Grupo 0 abaixo.

**Achado de pré-checagem sobre animação/glass:** `atom/Button` ainda tem `transition-*` e `active:not-disabled:translate-y-px`; `MobileBottomNav` ainda tem `backdrop-blur-sm` + `active:scale-95`; `MobileTabBar` ainda tem `backdrop-blur-md` + `transition-colors`. Ou seja, as classes **não foram removidas do código-fonte** — a percepção de "sumiu" é mais provável de vir de (a) uma variante/estado específico que perdeu a classe, (b) uma composição real do produto que não usa mais o componente certo, ou (c) o browser Storybook/Chrome usado no teste manual não estar renderizando `backdrop-filter`/`transition` (ex. modo de economia de energia, `prefers-reduced-motion`, GPU). Precisa reprodução dirigida por componente, não assumir causa — Regra 9.

## Lista bruta recebida (24 itens), agrupada

### Grupo 0 — Docs desatualizados (rápido, sem ambiguidade)
- Substituir toda menção textual a `PushButton`/`push-button.tsx` nos `.mdx` listados acima por `atom/Button`, com uma nota de migração (igual ao que já foi feito no `FolderTagChip.mdx`).

### Grupo 1 — Truncamento/crop de texto (bug objetivo, não decisão de design)
- **ArchiveItem** (`src/components/atoms/archive-item.tsx`) — "cropando o nome"
- **FolderItem** (`src/components/atoms/folder-item.tsx`) — mesmo problema
- **ImageItem** (`src/components/atoms/image-item.tsx`) — "Item image"

Método: ler os 3 componentes, achar onde o nome é renderizado, checar se falta `min-w-0`/`truncate`/`flex-1` no container flex (causa clássica de crop em item de lista dentro de flex row). Comparar com `get_design_context` do node Figma correspondente para confirmar que o nome deveria truncar com `...` e não cortar sem indicação.

### Grupo 2 — Interação ausente ou quebrada
- **TypeLabel** (`src/components/atoms/type-label.tsx`) — "interação" (o quê exatamente clicável/hover não reage — checar props de evento e se há `onClick`/`role` faltando)
- **ContextHeader** (`src/components/molecules/context-header.tsx`) — "escalas dos ícones e o hover neles"
- **MethodOrganizeButton** (`src/components/molecules/method-organize-button.tsx`) — "expanded" (estado expandido não funciona/não existe)
- **NodeContextMenu** (`src/components/molecules/node-context-menu.tsx` + `node-context-menu-item.tsx`) — "ausência de droplists" (submenus/dropdowns dentro do menu de contexto)
- **StorageSidebar** (`src/components/organisms/storage-sidebar.tsx`) — "botões inconsistentes de liberar espaço e gerenciar espaço"
- **TemplateReviewModal** (`src/components/templates/template-review-modal.tsx`) — "hover nos botões escritos"
- **ViewModeToggle** (`src/components/molecules/view-mode-toggle.tsx`) — "no mobile perde a função coluna"

Método: inspecionar cada componente por interação declarada (handlers, `data-state`, classes `hover:`/`focus-visible:`/`aria-expanded`) e testar manualmente no Storybook (`play` function ou interação manual no browser pane). Onde a Figma tiver a interação especificada (`get_design_context`/`get_motion_context` no node), comparar o spec.

### Grupo 3 — Animação/efeito que sumiu (precisa reprodução, ver achado de pré-checagem acima)
- **MobileTab** — "animação que tinha"
- **Botões** (genérico) — "perderam animação, investigar"
- **MobileBottomNav** — "quebrado o efeito de glass e a escala"

Método: como o código-fonte já tem as classes, reproduzir no browser pane (Storybook rodando) com screenshot antes/depois de interagir, checar DevTools computed style (`backdrop-filter`, `transition`) e `prefers-reduced-motion`. Se a classe está presente mas não renderiza, é bug de CSS/Tailwind config (ex. `backdrop-blur` sem suporte, purge removendo classe dinâmica); se a classe realmente não é aplicada num caminho específico, é regressão de props.

### Grupo 4 — Desatualizado vs. Figma (precisa `get_design_context`/`get_screenshot`, sem decisão de design ainda)
- **Header** (`src/components/organisms/header.tsx`) — "desatualizado"
- **PreviewPane** (`src/components/organisms/preview-pane.tsx`) — "botão close desatualizado"
- **PopoverNotification** (`src/components/molecules/popover-notification.tsx`) — "o timestamp deve ficar localizado no top, alinhado ao botão de close"
- **SaveOrganizationModal** (`src/components/templates/save-organization-modal.tsx`) — "quando selecionados, rever fidelidade com o Figma"
- **Acesso remoto sem respiro** em **StorageTierBadge** (`src/components/atoms/storage-tier-badge.tsx`) — provável falta de padding/gap num estado específico

Método: `get_screenshot` do node atual em `KanDrive V0.2.1` para cada um, `get_design_context` para spacing/tokens, comparar com o componente renderizado no Storybook (mesmo estado). Reportar diffs de token/spacing — **não pixel diff**, comparar valores de spec.

### Grupo 5 — Requer decisão de design (feature nova ou copy)
- **DropNewTag** (`src/components/organisms/drop-new-tag.tsx`) — "tem uma linha que aparece quando ativo" (verificar se é bug visual ou comportamento esperado) **e** "usuário deve poder escolher a cor da tag e refletir em suas dependências" — isso é uma feature nova (color picker + propagação), não uma regressão. Precisa checar se o Figma já tem esse comportamento especificado antes de implementar (Regra 9).
- **TemplateCard** (`src/components/molecules/template-card.tsx`) — copy: "o title de cronológico ficou 'Por data'" — decisão de copy (PT, produto), confirmar qual é o texto aprovado atual no Figma.

### Grupo 6 — Sistêmico (afeta várias telas, não um componente só)
- **"Rever a aplicação dos tokens"** — geral, liga com a pendência já aberta em [[Conflitos Abertos]] (🟡 contraste de cor, 2 grupos). Escopo deste plano: auditar aplicação (não just contraste) — token errado usado onde deveria ser outro, hex solto que devia ser token.
- **"Borda padrão de arredondamento no modo coluna, inclusive a página não reflete o Figma"** — provável tema: `rounded-*` inconsistente entre linhas/cards no modo de visualização em coluna (lista). Precisa localizar a(s) página(s) afetada(s) (prováveis: Home, Organize, LongTermStorage — onde `ViewModeToggle` é usado) e comparar com o Figma da variante "coluna"/lista.

## Metodologia de verificação (para todos os grupos 2–6)

1. Puxar `get_design_context` + `get_screenshot` do node Figma correspondente em **KanDrive V0.2.1** (nunca no arquivo original).
2. Ler o componente/página no código.
3. Comparar por **tokens, spacing, estados de interação e spec de motion** — nunca por diff de pixel.
4. Classificar cada achado como:
   - **Bug objetivo** (código diverge do próprio comportamento documentado/anterior, sem ambiguidade) → corrigir direto.
   - **Divergência Figma-confirmada** (código diverge do spec atual do Figma) → corrigir direto, documentar no changelog.
   - **Decisão de design necessária** (Figma ambíguo, ou é uma feature nova como o color-picker do DropNewTag) → registrar em [[Conflitos Abertos]] e levar para o usuário, não inventar.
5. Toda correção fica registrada no `audit/changelog.md` e, se fechar algo que estava em [[Conflitos Abertos]], riscar lá.

## Ordem de execução proposta

1. **Grupo 0** (docs) — trivial, sem risco, faço já.
2. **Grupo 1** (truncamento) — bug objetivo, provável causa comum (`min-w-0`), rápido.
3. **Grupo 3** (animação/glass) — reprodução dirigida no browser antes de tocar em código, para não "consertar" algo que já funciona.
4. **Grupo 2** (interação quebrada) — o maior grupo, componente a componente.
5. **Grupo 4** (fidelidade Figma) — puxa `get_design_context`/`get_screenshot` em lote.
6. **Grupo 6** (sistêmico: tokens + radius em coluna) — depois dos grupos acima, porque toca várias telas e pode reaproveitar achados dos grupos 4/2.
7. **Grupo 5** (decisão de design: DropNewTag color-picker, copy do TemplateCard) — perguntas pontuais ao usuário, feitas quando os grupos anteriores já estiverem claros.

## Nota sobre animação (grupo 3)

O usuário confirmou: a animação era feita por `transition` (equivalente em código do "Smart Animate" do Figma entre variantes). Ou seja, checar no Grupo 3 não é só "a classe `transition-*` existe", é "a `transition-*` está de fato ligada a uma mudança de estado/prop que dispara a mudança visual" — uma classe presente mas sem gatilho de mudança de estado é tão quebrada quanto a classe ausente.

## Status

- [x] **Grupo 0 — docs.** 24 `.mdx` corrigidos (mencionavam `PushButton`, removido em 25/09/2026). `Button.mdx` também tinha uma nota "conflito aberto" de tamanho de rótulo já resolvida em 24/09/2026 e nunca atualizada — corrigida. Ver `audit/changelog.md`.
- [x] **Grupo 1 — truncamento (ArchiveItem, FolderItem, ImageItem, VideoItem).** Bug real, confirmado empiricamente no DOM (Storybook, `clientWidth` vs `scrollWidth`). Causa: falta de `shrink-0` no container raiz dos 4 átomos — como flex-child, comprimia abaixo do `min-w` (só cobre o glifo) em composições sem espaço sobrando (`FolderCard`). `FolderItem` tinha ainda um bug isolado: largura fixa `w-[47px]`, nunca recebeu o fix que os outros 3 já tinham (auditoria US-026). Corrigido nos 4 arquivos, com nota no JSDoc de cada um. Ver `audit/changelog.md`.
- [x] **Grupo 2 — interação.** Testado ao vivo no Storybook, componente a componente:
  - **`TypeLabel`/`ScopeTypeLabel`** — verificado, sem bug. Testei a story `Interactive` de `StorageStatus`: clicar troca de escopo, cor muda, conteúdo atualiza. As stories `Global`/`QuickAccess`/`LongTerm` são freeze-frames por padrão (mesmo critério do resto do sistema) — se o teste foi nelas, parece "quebrado" sem ser.
  - **`ContextHeader`** — 🔴 bug real, corrigido. Os 6 ícones do toolbar variavam de 12px a 24px sem justificativa documentada (medido via DOM: 16/24/16/24/12/16). O node Figma citado no JSDoc (`1421:19589`) não resolve mais — por decisão do usuário, padronizado por julgamento (sem nova busca de node): todos em 16px, o valor já majoritário. Testado antes/depois no browser (todos 16x16 agora).
  - **`MethodOrganizeButton`** — verificado, sem bug. `expanded` funciona na composição real (`organization-page.tsx`, testei ao vivo) e tem teste automatizado cobrindo o fluxo. A prop só anima o chevron por si só — a lista é montada pela página, documentado no JSDoc ("Figma não desenha o estado aberto").
  - **`NodeContextMenu`** — 🔴 bug real, corrigido. As pílulas "Atributo"/"Operação" da 1ª linha (condição já preenchida) tinham chevron mas não recebiam a prop `options` — clique não abria nada. Testado antes/depois no browser.
  - **`StorageSidebar`** — verificado, sem bug. Botões idênticos em largura/altura em qualquer largura de painel (testei 280px e 150px via DOM). Rótulo diferente por contexto já é decisão documentada e resolvida (2026-08-10).
  - **`TemplateReviewModal`** — 🔴 bug real, corrigido (e replicado em mais 2 arquivos: `CleanSpaceLargeFiles`, `CleanSpaceDuplicated`). O botão "Excluir"/"Excluir cópias" tinha `text-destructive hover:text-destructive` — mesma cor em repouso e hover, um no-op confirmado até no `PushButton` original (nunca teve esse tratamento). Trocado por `hover:text-destructive/80`.
  - **`ViewModeToggle`** — sem bug de código, mas alterado por pedido do usuário. "Colunas cai pra Lista no mobile" (decisão de 2026-09-24) dependia de cada página lembrar de passar `modes={["grid","list"]}` — frágil, 3 páginas repetiam manualmente. Passou a ser automático: `size="compact"` já exclui "columns" por padrão, sem precisar da prop. Nova story `Compact` com teste automatizado. Ver `audit/changelog.md`.
- [~] **Grupo 3 — animação/glass.** Três achados, testados ao vivo no Storybook (browser pane, DOM/computed style, não só leitura de código):
  1. **`MobileTabBar`** — verificado, sem problema. Cliquei entre abas na story `Interactive`: `transition-colors` dispara normalmente, a pílula de fundo e a cor mudam de aba pra aba. Glass (`backdrop-blur-md`) presente e renderiza.
  2. **`MobileBottomNav`** — glass e escala confirmados funcionando (testei com um fundo listrado atrás pra ver o blur de verdade: `backdrop-filter: blur(8px)` aplicado e visível; `active:scale-95` do FAB declarado corretamente). **Um gap real, não regressão** (`git log` confirma que nunca existiu): os 4 botões de destino (Pessoal/Compartilhados/Recentes/Favoritos) não têm `transition-colors` — a cor troca no click sem transição, diferente do `MobileTabBar`, que tem. Fix simples, aplicado.
  3. **Ícones Hambúrguer/Guardar/Organizar (clarificado pelo usuário, não era o "pressed" do botão).**
     - **Hambúrguer**: já é um toggle binário no código (`mode="closed"|"expand"`, troca o SVG inteiro), sem morph/transição entre os dois — troca instantânea. Ainda em aberto (ver pendência abaixo).
     - **Guardar/Organizar**: o usuário apontou (com prints do Figma) o que parecia uma animação de progresso/loop nos ícones `Keep`/`Organize`. Rastreado nos 3 nodes que ele mandou (`1669:23141`, `1614:22982`, `307:14498`) via `get_motion_context` — **vazio nos 3**: não há nenhuma transição de Prototype/Smart Animate configurada no Figma entre eles. São variantes de **estado** (`Icon=Keep, Style=OnDark, State=Hover, Selected=false`), o padrão de sempre (Idle/Hover/Selected/Disabled), não quadros de animação — a impressão de "progresso" veio de ver os tons lado a lado no painel de assets do Figma. **Decisão do usuário: aplicar só `transition-colors` (padrão do resto do sistema), sem inventar um loop sem spec** (Regra 9). Conclusão: nada a mudar — os dois (`Organizar`/`Guardar`) já ficam dentro do `atom/Button` `variant="primary"`, que já transiciona o fundo suavemente (`transition-[background-color,...]`); o ícone usa `currentColor` e não muda de cor nesse variant, então não há transição de cor "faltando" ali.
  4. **🔴 Achado incidental (não pedido, mas relevante) — botões genéricos ficaram com "pressed" mais discreto.** Confirmado por `git show` do `push-button.tsx` antes de ser removido: `PushButton` tinha `transition-all motion-safe:active:scale-[0.98]` **+** `active:bg-brand-teal-action/80` (escala pra baixo E escurece ao pressionar). O `atom/Button` que o substituiu (fase E, 25/09/2026) usa só `active:not-disabled:translate-y-px` — desloca 1px, sem escurecer. Não é regressão de bug (os dois são extensão de código, Regra 8, nenhum Figma-confirmado) — fica registrado aqui caso o usuário queira revisitar depois; não foi essa a causa da percepção original (ver item 3).

## Pendências abertas do Grupo 3

- [ ] Hambúrguer: morph/transição entre os estados aberto/fechado — hoje é troca instantânea de SVG, sem animação.
- [x] **Grupo 4 — fidelidade Figma.** O bridge do plugin Figma falhou pra todo node `1421:*` nesta sessão (nodes `3028:*`, mais recentes, funcionaram — provavelmente a página errada aberta no Figma desktop do usuário, não nodes deletados). Corrigido por julgamento onde fazia sentido, sem inventar spec nova:
  - **`Header`** — 🔴 corrigido. Botão de conta no mobile era um círculo vazio; trocado pelo `atom/Avatar` de verdade (36px), que já documentava esse uso desde a F10 mas nunca tinha sido aplicado ali.
  - **`PreviewPane`** — 🔴 corrigido. Botão de fechar usava `atom/ClearButton` (genérico) em vez do `atom/CloseButton` que todos os outros modais/painéis já usam.
  - **`PopoverNotification`** — 🔴 corrigido, literal ao pedido do usuário. Timestamp movido pra 1ª linha, ao lado do `CloseButton`.
  - **`SaveOrganizationModal`/`TemplateCard`** — 🔴 corrigido. `selected` só trocava a borda entre 2 cinzas quase idênticos; trocado pelo padrão de "selecionado" já usado em `FolderCard`/`PlanSelection`. Achei e corrigi um bug na própria correção: o `dark:bg-zinc-900` base (não condicional) ganhava do `bg-brand-teal-light-surface` no cascade — precisou de `dark:` explícito na classe do `selected` também. Confirmado visualmente nos dois modos.
  - **`StorageTierBadge`** — sem bug reproduzível. Texto cabe exatamente na caixa fixa de 84px (Figma-confirmado em auditoria anterior), sem overflow no DOM.
- [x] **Grupo 5 — decisão de design.**
  - **`DropNewTag`** — 🔴 bug real, corrigido: a "linha que aparece quando ativo" era um cursor de texto falso (span absoluto, posição fixa), redundante e desalinhado com o cursor nativo do input. Removido, cor virou `caret-color` de verdade.
  - **`DropNewTag` (dependências)** — confirmado com o usuário: exige estado global de etiquetas, fora de escopo do design system. Registrado em Conflitos Abertos.
  - **Copy "Cronológico"/"Por data"** — usuário decidiu por "Por data" (já usado no mobile). Unificado nos 3 lugares que diziam "Cronológico" (`SaveOrganizationModal` + 2x FAQ), inclusive contra o texto literal Figma do FAQ (decisão humana documentada).
- [x] **Grupo 6 — sistêmico.**
  - **Radius modo coluna** — investigado, sem bug óbvio na leitura de código (`FileListContainer`/`PreviewPane` batem com a escala de radius documentada). Fica pendente até o usuário trazer print/link do Figma da tela real. Registrado em Conflitos Abertos.
  - **"Rever aplicação dos tokens"** — confirmado com o usuário: é a mesma pendência 🟡 já registrada em Conflitos Abertos (2 grupos de contraste de cor fora do lote de paleta). Sem trabalho novo.
