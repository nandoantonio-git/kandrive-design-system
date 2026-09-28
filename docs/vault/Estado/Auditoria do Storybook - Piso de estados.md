---
tags: [estado]
---

# Auditoria do Storybook — Piso de estados (Lote 3, 2026-09-26)

Resultado do [[Auditoria do Storybook (2026-09-26)|Lote 3]]. Legenda: ✅ já tinha · ➕ adicionado · — não se aplica · ⚠️ não deu (motivo na última coluna). Estados que o Figma não desenha estão marcados como Regra 8 no JSDoc de cada componente.

| Componente | Figma State | hover | foco | pressed | disabled | transição | teclado | Mudou |
|---|---|---|---|---|---|---|---|---|
| IconActionButton (base) | — (não é nó Figma) | — (opt-in por átomo) | ➕ | ✅ | ✅ | ✅ | ✅ | anel `brand-teal/50` → `brand-teal-action/50` (o `brand-teal` vira #f5f5f5 no dark); herdado por Clear/Confirm/Delete/Keep/Plus |
| ClearButton | ⚠️ | ➕ | ➕ | ✅ | ✅ | ✅ | ✅ | hover/pressed em `red`/`white` (opacidade, Regra 8). Nó `1421:17768` não resolve no V0.2.1 |
| ConfirmButton | ⚠️ | ✅ | ➕ | ✅ | ✅ | ✅ | ✅ | só o anel (via base). Nó `1421:17747` não resolve |
| DeleteButton | ⚠️ | ✅ | ➕ | ✅ | ✅ | ✅ | ✅ | só o anel (via base). Nó `1421:17705` não resolve |
| KeepButton | ⚠️ | ✅ | ➕ | ✅ | ✅ | ✅ | ✅ | só o anel (via base). Nó `1421:17793` não resolve |
| PlusButton | ⚠️ | ✅ | ➕ | ✅ | ✅ | ✅ | ✅ | só o anel (via base). Nó `1421:17726` não resolve |
| AddButton | ✅ Default/Hover/Pressed/Disabled | ✅ | ➕ | ✅ | ✅ | ✅ | ✅ | anel normalizado |
| BoxIconButton | ✅ Icon × Default/Hover/Pressed | ✅ | ➕ | ✅ | ✅ | ➕ | ✅ | anel normalizado; `transition-colors` → `transition-[color,background-color,transform]` (o `active:scale-95` não animava) |
| Button | ✅ Default/Hover/Focus/Disabled | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | nada |
| Checkbox | ✅ Size × Selected | ✅ | ➕ | ✅ | ✅ | ✅ | ✅ | anel normalizado |
| Chip | ✅ Selected | ➕ | ✅ | ➕ | ➕ | ➕ | ✅ | hover no marcado, `active:opacity-70`, disabled, transição inclui opacity; nota Regra 8 |
| CloseButton | ⚠️ | ✅ | ➕ | ✅ | ➕ | ✅ | ✅ | anel normalizado, disabled. Nó `1421:19008` inválido no V0.2.1 |
| HamburgerButton | ⚠️ Mode Closed/Open/Expand/Collapse | ✅ | ✅ | ➕ | ➕ | ➕ | ➕ | `active:scale-95`, disabled, transição c/ transform, `aria-expanded`. `Open`/`Collapse` sem glifo exportado (exigiria asset + valor de prop novos) |
| DropdownSelectGroupByItem | ✅ Default/Hover/Selected | ✅ | ➕ | ➕ | ➕ | ➕ | ✅ | anel, `active:opacity-70`, disabled, transição; nota Regra 8 (consumidor já usa `aria-current`) |
| DropdownSelectLabelItem | ✅ Default/Hover/Pressed | ✅ | ➕ | ➕ | ➕ | ➕ | ✅ | `Pressed` agora também no `:active` real; hover via `group-hover`; anel, disabled, transição |
| SidebarTagsItem | ✅ Default/Hover/Pressed | ✅ | ➕ | ➕ | ➕ | ➕ | ➕ | fundo de `Pressed` no `:active`, anel, disabled, transição, `aria-pressed` |
| Switch | ✅ Selected | ➕ | ➕ | ➕ | ✅ | ✅ | ✅ | hover da track; pressed do thumb passou a `group-active` (antes só disparava clicando no thumb); anel normalizado |
| TagOrgTemplateName (input) | ⚠️ | ➕ | ➕ | — | ➕ | ✅ | ✅ | hover `/55`, anel ring-2 → ring-3 padrão, disabled. Nó `1421:18778` não resolve |
| ScopeTypeLabel (type-label) | ⚠️ | ➕ | ➕ | ➕ | ➕ | ➕ | ➕ | Selected-Hover/Selected-Pressed (Figma) no `:hover`/`:active` reais do chip ativo; hover do `default` inativo; dark hover do inativo era igual ao repouso (zinc-800→700); `active:opacity-70`; anel; disabled; `aria-pressed`. Nó `1421:18415` não resolve |
| ArchiveItem | ⚠️ | ✅ | ➕ | ✅ | ✅ | ⚠️ | ✅ | anel normalizado. Transição: estados trocam o SVG (`src`), não animável por CSS. Nó `1421:18214` não resolve |
| FolderItem | ⚠️ | ✅ | ➕ | ✅ | ✅ | ⚠️ | ✅ | idem ArchiveItem. Nó `1440:24306` não resolve |
| ImageItem | ⚠️ | ✅ | ➕ | ✅ | ✅ | ⚠️ | ✅ | idem ArchiveItem. Nó `1421:18311` inválido |
| VideoItem | ⚠️ | ✅ | ➕ | ✅ | ✅ | ⚠️ | ✅ | idem ArchiveItem. Nó `1442:7858` não resolve |
| AccordionItem | ✅ Expanded true/false (`<details open>`) | ➕ | ➕ | ➕ | — | ➕ | ✅ | `<summary>`: hover/pressed por opacidade, anel, `transition-opacity`; nota Regra 8 |
| ActionPill | ⚠️ | ✅ | ➕ | ➕ | ✅ | ➕ | ✅ | anel `brand-teal/50` → `-action/50`, `motion-safe:active:scale-95`, transição c/ transform. Nó `1421:19027` não resolve |
| ArchiveBrowserModalListItem | ✅ Selectable false/true (`selected`) | ✅ | ➕ | ➕ | — | ➕ | ➕ | com `onClick`: `role="button"`, `tabIndex=0`, Enter/Espaço, `aria-pressed`; `active:opacity-70`, anel. Ficou `div` (há usos só-leitura sem clique, e `<p>` dentro) |
| ArchiveBrowserModalSearch | — (symbol sem eixo) | — | — | — | — | — | — | nada: só compõe SearchInput + ListItem |
| CleanSpaceListSelection | ✅ Selected false/true | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (o controle é o `atom/Checkbox`) |
| ContextHeader | ✅ Device/Expanded/Layout (sem `State`) | ✅ | ➕ | ✅ | — | ➕ | ✅ | 7 botões: anel normalizado; `transition-colors` → `transition-[color,opacity]` (o `active:opacity-60` não animava) |
| DropListItem | ✅ Default/Hover/Pressed | ✅ | ➕ | ➕ | ➕ | ✅ | ✅ | `Pressed` também no `:active` real; anel (inset); disabled; nota Regra 8 |
| DropdownSelectGroupBy | ⚠️ | ➕ | ➕ | ➕ | ✅ | ➕ | ✅ | gatilho: hover `#71717a33` (mesmo do Label), `active:opacity-70`, anel. Nó `1421:18719` não resolve |
| FaqTopicChips | — (frame, não componente) | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda `atom/Chip`) |
| FileArchiveCard | ⚠️ | ✅ | ➕ | ✅ | — | ✅ | ✅ | só o anel normalizado. Nó `1439:19655` não resolve |
| FileListHeader | ⚠️ | ✅ | ➕ | ✅ | — | ➕ | ✅ | botão de ordenar: anel, transição. Nó `1421:19184` não resolve |
| FileList | ⚠️ | ✅ | ➕ | ✅ | — | ✅ | ➕ | com `onClick`: `role="button"`, `tabIndex=0`, Enter/Espaço, anel. Nó `1421:19200` não resolve |
| FileSelectRow | — (frame) | ➕ | ✅ | ➕ | — | ➕ | ✅ | linha: hover (não-marcada), `active:opacity-70`, transição. Teclado via checkbox (linha não vira botão p/ não aninhar controles) |
| FolderCard | ✅ State Default/Hover × Selected × Expanded | ✅ | ➕ | ➕ | — | ➕ | ➕ | botão do título: `aria-expanded`, `active:opacity-70`, anel, transição |
| FolderTagChip | ✅ State Default/Hover/Pressed × Expanded (`558:8055`) | ➕ | ➕ | ➕ | ✅ | ➕ | ➕ | chip c/ `onClick`: `role="button"`, `tabIndex`, Enter/Espaço, `aria-pressed`, `aria-disabled`; `Pressed` no `:active` (fundo do selected); hover dark era igual ao repouso (zinc-800→700, chip e X); anel do X normalizado. Nó do JSDoc `1421:19040` não resolve |
| FreeModeAddMenu | ⚠️ | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda FreeModeListItem). Nó `1431:20042` não resolve |
| FreeModeButtons | — (symbol sem eixo) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | nada (herda BoxIconButton) |
| FreeModeListItem | ⚠️ | ✅ | ➕ | ➕ | ➕ | ✅ | ✅ | `pressed` também no `:active` real, anel, disabled. Nó `1421:20757` não resolve |
| FreeModeOutputNode | ✅ Expanded true/false (`variant`) | ➕ | ➕ | ➕ | — | ➕ | ✅ | botão "Prévia de arquivos": hover/pressed por opacidade, anel |
| HandPicker | — (frame) | ✅ | ✅ | ➕ | — | ➕ | ✅ | `active:opacity-70`, transição c/ opacity |
| Label | ⚠️ | ✅ | ➕ | ✅ | ✅ | ➕ | ✅ | anel nos 2 gatilhos; opções e busca ring-2 `brand-teal/50` → ring-3 `-action/50`; transição c/ opacity. Nós `1421:18687`/`1439:19650` não resolvem |
| MethodCard | ✅ Method Date/Project/FileType | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada |
| MethodOrganizeButton | ✅ Method Project/Date/Type | ✅ | ✅ | ➕ | ➕ | ➕ | ✅ | `active:opacity-70`, disabled, transição c/ opacity; nota Regra 8 |
| MobileFooterSettings | ✅ Page × Active | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda `atom/Chip`) |
| MobileTabBar | ✅ Active (Home…) | ✅ | ✅ | ➕ | — | ➕ | ✅ | `active:opacity-70`, transição c/ opacity; nota Regra 8 |
| NodeContextMenuItem | ⚠️ | ✅ | ➕ | ➕ | ✅ | ➕ | ✅ | gatilho: anel, transição inclui `filter` (brightness não animava); opções: `active:opacity-70`, anel inset. Nó `1421:20528` não resolve |
| NodeContextMenu | ⚠️ | ➕ | ➕ | ➕ | — | ➕ | ✅ | toggle E/OU: hover do inativo, `active:opacity-70`, anel `white/60` (trilha escura); botão remover: anel, pressed, transição. Nó `1440:23821` não resolve |
| PagePickerButton | — (frame) | ➕ | ✅ | ➕ | ➕ | ➕ | ✅ | hover `overlay-subtle/20`, `active:opacity-70`, disabled, transição. Menu: nenhum componente de lista de páginas no repo (ver relatório) |
| PopoverNotification | ⚠️ | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda CloseButton). Nó `1421:19626` não resolve |
| RadioButton | ✅ Selected true/false | ➕ | ➕ | ✅ | ✅ | ➕ | ✅ | hover da borda (não marcado, via `group-hover` do label), anel normalizado, transição inclui transform (o `active:scale-90` não animava) |
| SearchInput | ⚠️ | ➕ | ➕ | — | ✅ | ✅ | ✅ | hover do campo, anel `brand-teal/50` → `-action/50`. Nó `1518:7924` não resolve |
| SettingsField | ⚠️ | ➕ | ➕ | — | ➕ | ➕ | ✅ | hover da borda, anel normalizado, disabled, transição. Nó `1439:19849` não resolve |
| StorageStatus | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | nada (herda ScopeTypeLabel/Button). Nó `1421:18354` não resolve |
| StorageStatusCurrent | ⚠️ | ✅ | ➕ | ✅ | — | ➕ | ✅ | anel, transição c/ transform. Nó `1439:17044` não resolve |
| TagColor | ✅ Selected false/true | ➕ | ➕ | ➕ | — | ➕ | ✅ | hover/pressed por opacidade, ring-2 `brand-teal/50` → ring-3 `-action/50` |
| TemplateCard | ⚠️ | ✅ | ➕ | ➕ | ➕ | ➕ | ✅ | `active:opacity-80`, disabled, anel normalizado, transição. Nó `1421:19695` não resolve |
| ViewModeToggle | ⚠️ | ✅ | ➕ | ➕ | — | ➕ | ✅ | anel, `active:opacity-70`, transição c/ opacity. Nó `1421:19069` não resolve |
| ArchiveBrowserModalSidebar | — (sem eixo) | ✅ | ➕ | ✅ | — | ➕ | ✅ | anel; transição passou a incluir opacity (inativo 50%→100% no hover) |
| CardLogin | — (Device) | ➕ | ➕ | ➕ | — | ➕ | ✅ | anel `-action` nos inputs; hover da borda dos campos; foco/pressed no "Esqueceu", olho e sociais (anel branco no mobile teal) |
| CardNeedMoreHelp | — (sem eixo) | ➕ | ➕ | ✅ | — | ➕ | ✅ | link "suporte" ganhou hover/pressed/foco; botão ganhou anel e transição c/ transform |
| CleanSpaceDuplicated | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda Button) |
| CleanSpaceLargeFiles | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | nada (herda Button/CleanSpaceListSelection) |
| DropdownMenu | — (Menu) | ✅ | ➕ | ➕ | — | ✅ | ✅ | itens: `active:bg-zinc-200`, anel |
| DropNewTag | — (sem eixo) | ➕ | ➕ | — | — | ➕ | ✅ | input: ring-2 `brand-teal/50` → ring-3 `-action/50`, hover de fundo |
| FaqFastLinks | — (sem eixo) | ✅ | ➕ | ➕ | — | ➕ | ✅ | links: anel, `active:opacity-70` |
| FaqInfoCard | — (Type×ShowCallout) | ✅ | ➕ | ✅ | — | ➕ | ➕ | anel, transição c/ opacity, `aria-expanded` no Recolher/Expandir |
| FaqInfoCardCollapsed | — (Topic) | ✅ | ➕ | ✅ | — | ➕ | ✅ | anel, transição c/ transform |
| FileListContainer | — (Quantity) | ✅ | ➕ | ➕ | — | ✅ | ✅ | `brand-teal/50` → `-action/50`, `active:bg-zinc-100` |
| FileSelectList | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda FileSelectRow) |
| Header | — (Page×Device) | ➕ | ✅ | ➕ | — | ➕ | ✅ | avatar mobile: hover opacity, `motion-safe:active:scale-95` |
| MobileBottomNav | — (Action×Hand) | ➕ | ✅ | ➕ | — | ➕ | ✅ | destinos: hover/pressed por opacidade; FAB hover `/90`; ✕ hover; `active:scale-95` → `motion-safe:` |
| OrganizePanelDropZone | ✅ DropState Idle/DragOver/Filled | — | — | — | — | — | — | **caso especial**: fallback não-controlado de D&D nativo (enter/over→dragover, leave→anterior, drop→filled), `onFilesDrop`, `quantity` segue nº de arquivos soltos quando omitido; story 1ª sem `state` |
| PlanSelection | — (sem eixo) | ➕ | ➕ | ➕ | — | ➕ | ✅ | seletor Mensal/Anual: hover/pressed/anel/transição. ⚠️ o seletor é só controlado (`interval` sem fallback): na story, clicar não troca — não mudei (fora dos casos especiais) |
| PreviewPane | ✅ Expanded (painel aberto) | ✅ | ➕ | ➕ | — | ✅ | ✅ | Salvar/Compartilhar: `active:` e anel |
| RecoveryPending | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda Button) |
| SaveLongTermFileStorageSelectedFiles | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (linhas só-leitura + AddButton) |
| Sidebar | — (Size×Device×Page) | ✅ | ➕ | ➕ | — | ➕ | ✅ | 5× `brand-teal/50` → `-action/50`; `active:bg-zinc-200` nos itens; colapsar: `motion-safe:active:scale-95` |
| SidebarDrawer | — | ✅ | ✅ | ✅ | — | ➕ | ✅ | transição na cor do ícone (group-hover) |
| SidebarToggle | ✅ State Default/Hover/Pressed × Expanded | ✅ | ➕ | ✅ | — | ✅ | ✅ | `brand-teal/50` → `-action/50` |
| StorageSidebar | — (Expanded×Device) | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda SidebarToggle/Button) |
| StorageStatusSummary | — (Device) | ➕ | ✅ | ➕ | — | ➕ | ✅ | botão Filtros: pressed + transição; "Armazenamento" (mobile): hover/pressed/anel |
| TemplateReviewModalItem | — (sem eixo) | ➕ | ➕ | ➕ | ➕ | ➕ | ✅ | chevron: hover/pressed/anel, `disabled:pointer-events-none`; Renomear/Editar `brand-teal/50` → `-action/50` |
| UploadPopover | ✅ Expanded (files) | ✅ | ➕ | ➕ | — | ➕ | ✅ | 4 botões de ação: `active:`, anel, transição |
| UserProfileCard | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda Button) |
| AppShell | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (só compõe) |
| ArchiveBrowserModal | — (Device) | ✅ | ✅ | ✅ | — | ✅ | ✅ | **caso especial**: seleção não-controlada (linhas `ListItem` clicáveis, contagem derivada), `onSelectionChange`, `selectedCount` opcional; ⚠️ exigiu repassar `selected`/`onClick` em `molecule/ArchiveBrowserModalSearch` (aditivo) |
| CleanSpaceStorage | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | nada (só compõe) |
| OrganizeFreeModeCanvas | — | ➕ | ➕ | ➕ | — | ➕ | ✅ | painel de filtro: "Remover regra" e "Adicionar regra" ganharam pressed/anel/transição (+hover no Adicionar) |
| SaveLongTermFileStorage | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | **caso especial, sem mudança**: linhas são a lista só-leitura dos arquivos já escolhidos (instâncias `Selectable=false`); seleção acontece no ArchiveBrowserModal |
| SaveOrganizationModal | — (Content) | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda TemplateCard/Button) |
| TemplateReviewModal | — | ✅ | ✅ | ✅ | — | ✅ | ✅ | nada (herda Item/Button) |
| LoginPage (inline) | — | ✅ | ➕ | ➕ | — | ➕ | ✅ | link "Crie uma agora": anel branco (mobile) / `-action` (tablet), pressed |
| OnboardingPage (inline) | — | ➕ | ➕ | ➕ | — | ➕ | ✅ | 2× "Pular": hover/pressed por opacidade, anel (branco sobre teal) |
| PaymentPage (inline) | — | ➕ | ➕ | ➕ | — | ➕ | ➕ | seções recolhíveis: hover/pressed/anel; Mensal/Anual: hover/pressed/anel + `aria-pressed` |
