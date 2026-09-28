---
tags: [estado]
---

# Auditoria do Storybook — Inventário (2026-09-26)

Levantamento factual que embasou a [[Auditoria do Storybook (2026-09-26)]]. Gerado por script e conferido à mão; linhas citadas são do estado do commit `6e39db1`.

## Part A — Docs structure (`stories/**/*.mdx`)

**Scope:** 119 component docs (atoms 34, molecules 43, organisms 24, templates 7, pages 9 — `stories/templates/AppShell.mdx` included).

**Exceptions (not analysed against the standard):** `stories/Introducao.mdx` (H1 "Kandrive Design System", numbered H2s 1–6), `stories/tokens/Colors.mdx`, `Materials.mdx`, `Responsividade.mdx`, `Spacing.mdx`, `Typography.mdx`, `unused.mdx` (free-form H2s, token demos).

### H2 frequency (119 docs)

| H2 | docs |
|---|---|
| Uso | 112 |
| Estados | 86 |
| Terminologia | 72 |
| Composição | 30 |
| Anatomia | 27 |
| Material | 15 |
| Variantes | 14 |
| Tokens | 5 |
| Interação | 4 |
| Tipografia | 4 |
| Mobile | 4 |
| Acessibilidade | 3 |
| Variantes de cor | 3 |
| API | 2 |

+ ~30 one-off H2s (e.g. "Dark mode", "Por que 1 componente e não ~100", "Estados adicionados em 2026-08-23", "Consolidado com `DropdownSelectLabel` (2026-08-18)").

### Most common exact sequences

| docs | H2 sequence |
|---|---|
| 7 | Uso → Composição → Estados → Material → Terminologia |
| 6 | Uso → Estados → Terminologia |
| 6 | Uso → Anatomia → Estados → Terminologia |
| 5 | (no H2 at all) |
| 4 | Uso → Estados |
| 4 | Uso → Anatomia → Estados |
| 4 | Uso → Composição → Estados → Terminologia |
| 3 | Uso → Tokens |
| 3 | Uso → Variantes de cor → Estados → Terminologia |
| 3 | Uso → Composição → Terminologia |

**De-facto standard.** No exact sequence dominates (top one = 7/119). The de-facto skeleton is the frequency core **Uso → Estados → Terminologia** (Uso 112, Estados 86, Terminologia 72), with an optional **Anatomia/Composição** between Uso and Estados and optional **Material/Variantes/Tokens** after.

- Docs containing all three core sections in order: **54/119**.
- Docs whose H2s are exactly the core (nothing extra): **6/119**.
- Docs missing a core section: Terminologia 47, Estados 33, Uso 7. Core order differs in 7 docs (TypeLabel, CardNeedMoreHelp, FaqInfoCard, FaqInfoCardCollapsed, PlanSelection, Sidebar, StorageSidebar — all put Terminologia before Estados).
- Docs with **no H2 at all** (5): `stories/atoms/Chip.mdx`, `stories/atoms/HamburgerButton.mdx`, `stories/molecules/MobileFooterSettings.mdx`, `stories/molecules/MobileTabBar.mdx`, `stories/templates/AppShell.mdx`.
- **H1 format** is inconsistent: `# Name (Figma: \`node/path\`, \`id\`)` (most atoms/molecules), `# Name (\`node/path\`)` without id (most organisms/templates/pages), and bare `# Name` (23 docs: Avatar, Button, Checkbox, Chip, HamburgerButton, MobileSuccess, AccordionItem, FaqTopicChips, FileSelectRow, HandPicker, MethodOrganizeButton, MobileFooterSettings, MobileTabBar, PagePickerButton, FileSelectList, MobileBottomNav, RecoveryPending, SidebarDrawer, StorageStatusSummary, UserProfileCard, LongTermStorage, Onboarding, AppShell). A few put the Figma ref in a "✅ Figma-confirmado" line under the H1 instead (e.g. Button, MethodOrganizeButton).
- **Controls:** every doc has `<Controls />` except `organisms/SidebarDrawer.mdx` and `templates/AppShell.mdx` (AppShell also has **no `<Canvas>`** at all). `<Controls />` is never given `of=`, so it always drives the CSF *primary* (first-exported) story.
- **Controls drive an invisible story** (primary story not rendered in any Canvas on the page, so changing a control has no visible effect): `LabelStorageAlert.mdx` (primary `Default`, first Canvas `AllVariants`), `Switch.mdx` (primary `Off`, first Canvas `Interactive`), `TypeLabel.mdx` (primary `Image`, first Canvas `FileTypeLegend`), `MobileFooterSettings.mdx` (primary `Settings`, first Canvas `Interactive`), `MobileTabBar.mdx` (primary `Default`, first Canvas `Interactive`), `RadioButton.mdx` (primary `Personal`, first Canvas `Group`), `StorageStatus.mdx` (primary `Global`, first Canvas `Interactive`), `MobileBottomNav.mdx` (primary `AddRight`, first Canvas `Interactive`).

### Per-doc table

Legend: *missing* = core sections absent; *extra* = H2s outside the core; *order* = core sections out of order; *1st Canvas* = story of the first `<Canvas>` and whether it is **live** (React state in render / uncontrolled via `state: undefined` / meta-level stateful render) or **static** (plain args). "static*" = static story but the component has its own internal/uncontrolled state, so it still reacts to clicks.

| Doc | H1 | H2 (ordered) | missing | extra | order | 1st Canvas | Controls |
|---|---|---|---|---|---|---|---|
| `atoms/AddButton` | AddButton (Figma: `atom/buttonAdd`, `1421:20509`) | Uso → Estados → Terminologia | — | — | ok | Default (static, L24) | yes |
| `atoms/ArchiveItem` | ArchiveItem (Figma: `atom/ArchiveItem`, `1421:18214`) | Uso → Anatomia → Sobre o eixo `tier` → Estados → Interação | Terminologia | Anatomia, Sobre o eixo `tier`, Interação | ok | Idle (static, L35) | yes |
| `atoms/Avatar` | Avatar | Uso → Tokens | Estados, Terminologia | Tokens | ok | Initials (static, L16) | yes |
| `atoms/BoxIconButton` | BoxIconButton (Figma: `atom/boxIconButton`, `1431:20102`) | Uso → Variantes → Estados → Terminologia | — | Variantes | ok | Default (static, L35) | yes |
| `atoms/Button` | Button | Uso → Variantes → Estados → Dark mode → Tipografia → Terminologia | — | Variantes, Dark mode, Tipografia | ok | Primary (static, L33) | yes |
| `atoms/Checkbox` | Checkbox | Uso → Variantes → Estados → Acessibilidade | Terminologia | Variantes, Acessibilidade | ok | Interactive (live, L26) | yes |
| `atoms/Chip` | Chip | — | Uso, Estados, Terminologia | — | ok | Default (static, L16) | yes |
| `atoms/ClearButton` | ClearButton (`atom/ClearButton`) | Uso → Variantes de cor → Estados → Terminologia | — | Variantes de cor | ok | Default (static, L25) | yes |
| `atoms/CloseButton` | CloseButton (Figma: `atom/CloseButton`, `1421:19008`) | Uso → Anatomia → Estados → Terminologia | — | Anatomia | ok | Default (static, L33) | yes |
| `atoms/ConfirmButton` | ConfirmButton (`atom/ActionButton/Confirm`) | Uso → Variantes de cor → Estados → Terminologia | — | Variantes de cor | ok | Default (static, L25) | yes |
| `atoms/DeleteButton` | DeleteButton (`atom/DeleteButton`) | Uso → Variantes de cor → Estados → Terminologia | — | Variantes de cor | ok | Default (static, L25) | yes |
| `atoms/DropdownSelectGroupByItem` | DropdownSelectGroupByItem (Figma: `atom/DropdownSelect/GroupBy/Item`, `1444:21587`) | Uso → Estados | Terminologia | — | ok | Idle (static, L24) | yes |
| `atoms/DropdownSelectLabelItem` | DropdownSelectLabelItem (Figma: `atom/DropdownSelect/Label/Item`, `1444:21704`) | Uso → Estados | Terminologia | — | ok | Idle (static, L24) | yes |
| `atoms/FirstUploadSymbol` | FirstUploadSymbol (`atom/firstUploadSymbol`) | Uso → Anatomia → Estados | Terminologia | Anatomia | ok | Default (static, L17) | yes |
| `atoms/FolderItem` | FolderItem (Figma: `atom/FolderItem`, `1440:24306`) | Uso → Estados → Interação | Terminologia | Interação | ok | Idle (static, L35) | yes |
| `atoms/HamburgerButton` | HamburgerButton | — | Uso, Estados, Terminologia | — | ok | Closed (static, L16) | yes |
| `atoms/Icon` | Icon (`atom/Icon/*`) | Uso → Por que 1 componente e não ~100 → Fonte dos glifos → Estados → Terminologia | — | Por que 1 componente e não ~100, Fonte dos glifos | ok | Default (static, L25) | yes |
| `atoms/IconBase` | IconBase (`atom/icon/base`) | Uso → Estado `isHoverOn` → Reuso com ícone customizado → Estados | Terminologia | Estado `isHoverOn`, Reuso com ícone customizado | ok | Default (static, L26) | yes |
| `atoms/ImageItem` | ImageItem (Figma: `atom/ImageItem`, `1421:18311`) | Uso → Retângulo de destaque translúcido → Estados | Terminologia | Retângulo de destaque translúcido | ok | Idle (static, L35) | yes |
| `atoms/KeepButton` | KeepButton (`atom/KeepButton`) | Uso → Estados → Terminologia | — | — | ok | Default (static, L25) | yes |
| `atoms/LabelDuplicated` | LabelDuplicated (Figma: `atom/Label/Duplicated`, `1439:16874`) | Uso → Anatomia → Estados | Terminologia | Anatomia | ok | Default (static, L20) | yes |
| `atoms/LabelStorageAlert` | LabelStorageAlert (Figma: `atom/Label/Storage/Alert`, `1439:16885`) | Uso → Variantes (`property1`) → Estados | Terminologia | Variantes (`property1`) | ok | AllVariants (static, L42) | yes |
| `atoms/MobileSuccess` | MobileSuccess | Uso → Variantes → Tema | Estados, Terminologia | Variantes, Tema | ok | Organized (static, L17) | yes |
| `atoms/PlusButton` | PlusButton (`atom/PlusButton`) | Uso → Estados → Terminologia | — | — | ok | Default (static, L25) | yes |
| `atoms/SelectState` | SelectState (Figma: `atom/SelectState`, `1421:18292`) | Uso → Anatomia → Estados | Terminologia | Anatomia | ok | Default (static, L25) | yes |
| `atoms/SidebarTagsItem` | SidebarTagsItem (Figma: `atom/Sidebar/Tags/Items`, `1421:20907`) | Uso → Estados | Terminologia | — | ok | Idle (static, L31) | yes |
| `atoms/StorageTierBadge` | StorageTierBadge (`atom/StorageTierBadge`) | Uso → Rótulos → Estados | Terminologia | Rótulos | ok | Current (static, L26) | yes |
| `atoms/Switch` | Switch (`atom/switch`) | Uso → API → Estados | Terminologia | API | ok | Interactive (live, L39) | yes |
| `atoms/Tag` | Tag (Figma: `atom/Tag`, `1421:17929`) | Uso → Sem rótulo — chip só de cor → Variantes → Estados | Terminologia | Sem rótulo — chip só de cor, Variantes | ok | Primary (static, L29) | yes |
| `atoms/TagOrgMode` | TagOrgMode (Figma: `atom/TagOrgMode`, `1421:18769`) | Uso → Modos → Estados | Terminologia | Modos | ok | Free (static, L26) | yes |
| `atoms/TagOrgTemplateName` | TagOrgTemplateName (Figma: `atom/TagOrgTemplateName`, `1421:18778`) | Uso → Anatomia → Estados | Terminologia | Anatomia | ok | Placeholder (static, L17) | yes |
| `atoms/TypeLabel` | TypeLabel (`atom/badge/TypeLabel`) | Uso → Três componentes, um só desenho de família → `ScopeTypeLabel` vs. `StorageTierBadge` → Cor por tipo de arquivo → Cor por escopo (`ScopeTypeLabel`) → Terminologia → Estados | — | Três componentes, um só desenho de família, `ScopeTypeLabel` vs. `StorageTierBadge`, Cor por tipo de arquivo, Cor por escopo (`ScopeTypeLabel`) | differs | FileTypeLegend (static, L90) | yes |
| `atoms/UploadFolder` | UploadFolder (Figma: `atom/UploadFolder`, `1439:17053`) | Uso → Estados | Terminologia | — | ok | Default (static, L17) | yes |
| `atoms/VideoItem` | VideoItem (Figma: `atom /VideoItem`, `1442:7858`) | Uso → Estados → Interação | Terminologia | Interação | ok | Idle (static, L44) | yes |
| `molecules/AccordionItem` | AccordionItem | Uso → Variantes → Acessibilidade → Conteúdo | Estados, Terminologia | Variantes, Acessibilidade, Conteúdo | ok | Expanded (static*, L28) | yes |
| `molecules/ActionPill` | ActionPill (Figma: `molecule/action-pill`, `1421:19027`) | Uso → Anatomia → Estados → Terminologia | — | Anatomia | ok | Default (static, L28) | yes |
| `molecules/ArchiveBrowserModalListItem` | ArchiveBrowserModal/ListItem (Figma: `molecule/ArchiveBrowserModal/ListItem`, `1421:20896`) | Uso → Anatomia → Estados → Terminologia | — | Anatomia | ok | Default (static, L23) | yes |
| `molecules/ArchiveBrowserModalSearch` | ArchiveBrowserModal/Search (Figma: `molecule/ArchiveBrowserModal/Search`, `1485:21074`) | Uso → Composição → Estados | Terminologia | Composição | ok | Default (static, L25) | yes |
| `molecules/Callout` | Callout (Figma: `celule/Callout`, `1421:20028`) | Uso → Estados → Terminologia | — | — | ok | Warning (static, L32) | yes |
| `molecules/CleanSpaceListSelection` | CleanSpaceListSelection (Figma: `celule/cleanSpaceStorage/listSelection`, `1436:20496`) | Uso → Anatomia → Estados → Terminologia | — | Anatomia | ok | Unselected (static, L35) | yes |
| `molecules/ContextHeader` | ContextHeader (Figma: `molecule/context-header`, `1421:19589`) | Uso → Anatomia → Estados → Terminologia → Minimal (mobile) | — | Anatomia, Minimal (mobile) | ok | Default (static, L31) | yes |
| `molecules/DropListItem` | DropListItem (Figma: `celule/dropListItem`, `1440:23803`) | Uso → Estados → Terminologia | — | — | ok | Idle (static, L31) | yes |
| `molecules/DropdownSelectGroupBy` | DropdownSelectGroupBy (Figma: `molecule/DropdownSelect/GroupBy`, `1421:18719`) | Uso → Anatomia → Estados → Terminologia | — | Anatomia | ok | Default (live, L45) | yes |
| `molecules/FaqTopicChips` | FaqTopicChips | Uso | Estados, Terminologia | — | ok | Default (static, L18) | yes |
| `molecules/FileArchiveCard` | FileArchive1 / FileArchive2 (Figma: `molecule/FileArchive1` `1439:19655`, `molecule/FileArchive2` `1439:19656`) | Uso → Um único componente para os dois nodes → Estados → Terminologia | — | Um único componente para os dois nodes | ok | FileArchive1 (static, L22) | yes |
| `molecules/FileList` | FileList (Figma: `molecule/FileList`, `1421:19200`) | Uso → Formatos → Estados → Terminologia | — | Formatos | ok | Default (static, L30) | yes |
| `molecules/FileListHeader` | FileListHeader (Figma: `molecule/FileList/Header`, `1421:19184`) | Uso → Formatos → Estados → Terminologia | — | Formatos | ok | Home (static*, L25) | yes |
| `molecules/FileSelectRow` | FileSelectRow | Uso → Estados → Tokens e tipografia | Terminologia | Tokens e tipografia | ok | List (live, L22) | yes |
| `molecules/FolderCard` | FolderCard (Figma: `molecule/FolderCard`, `1421:18595`) | Uso → Anatomia → Estados → Terminologia → Mobile | — | Anatomia, Mobile | ok | Default (static, L26) | yes |
| `molecules/FolderTagChip` | FolderTagChip (Figma: `celule/chip/folder-tag`, `1421:19040`) | Uso → Anatomia → Colapsado (`isExpanded=false`, o padrão) → Estados → Terminologia → Tipografia | — | Anatomia, Colapsado (`isExpanded=false`, o padrão), Tipografia | ok | Default (static, L33) | yes |
| `molecules/FreeModeAddMenu` | FreeModeAddMenu (`molecule/Menuitem/freemodeOrganization`) | Uso → Composição → 🔧 Corrigido em 2026-08-23 → Terminologia | Estados | Composição, 🔧 Corrigido em 2026-08-23 | ok | Default (static, L17) | yes |
| `molecules/FreeModeButtons` | FreeModeButtons (Figma: `celule/MainCanvas/Organization/FreeMode/Buttons`, `1431:20043`) | Uso → Anatomia → Estados → Terminologia | — | Anatomia | ok | Default (static, L24) | yes |
| `molecules/FreeModeItemNode` | FreeModeItemNode (Figma: `celule/MainCanvas/Organization/FreeMode/ItemNode`, `1421:20108`) | Uso → Variantes → Variante `resultado`: colapsada vs. expandida → Ícones → Estados → Terminologia | — | Variantes, Variante `resultado`: colapsada vs. expandida, Ícones | ok | Juncao (static, L41) | yes |
| `molecules/FreeModeListItem` | FreeModeListItem (Figma: `celule/MainCanvas/Organization/FreeMode/ListItem`, `1421:20757`) | Uso → Operações → Estados → Terminologia | — | Operações | ok | Idle (static, L33) | yes |
| `molecules/FreeModeMiniMap` | FreeModeMiniMap (Figma: `template/MainCanvas/Organization/FreeMode`, `1439:16906`, elemento "Mini-Map") | Uso → Interação | Estados, Terminologia | Interação | ok | Default (static, L24) | yes |
| `molecules/FreeModeOutputNode` | FreeModeOutputNode (Figma: `celule/MainCanvas/Organization/FreeMode/OutputNode`, `1421:20262`) | Uso → Variantes → Ícones → Estados → Terminologia | — | Variantes, Ícones | ok | Default (static*, L27) | yes |
| `molecules/HandPicker` | HandPicker | Uso → Anatomia → Acessibilidade | Estados, Terminologia | Anatomia, Acessibilidade | ok | Default (live, L19) | yes |
| `molecules/Label` | Label (Figma: `molecule/Label`, `1421:18687`) | Uso → Anatomia → Consolidado com `DropdownSelectLabel` (2026-08-18) → Estados → Terminologia | — | Anatomia, Consolidado com `DropdownSelectLabel` (2026-08-18) | ok | Default (static, L24) | yes |
| `molecules/MethodOrganizeButton` | MethodOrganizeButton | Uso → Variantes → Abrir a lista → Tokens | Estados, Terminologia | Variantes, Abrir a lista, Tokens | ok | Default (static, L19) | yes |
| `molecules/MobileFooterSettings` | MobileFooterSettings | — | Uso, Estados, Terminologia | — | ok | Interactive (live, L23) | yes |
| `molecules/MobileTabBar` | MobileTabBar | — | Uso, Estados, Terminologia | — | ok | Interactive (live, L20) | yes |
| `molecules/NodeContextMenu` | NodeContextMenu (Figma: `molecule/nodoContextMenu`, `1440:23821`) | Uso → Anatomia → Estado de erro → Estados → Terminologia | — | Anatomia, Estado de erro | ok | Default (static, L32) | yes |
| `molecules/NodeContextMenuItem` | NodeContextMenuItem (Figma: `celule/nodoContextMenuItem`, `1421:20528`) | Uso → Tipos (`kind`) → Estados → Terminologia | — | Tipos (`kind`) | ok | Placeholder (live, L37) | yes |
| `molecules/PageLead` | PageLead (Figma: `celule/Pages/Lead`, `1439:17048`) | Uso → Props → Estados | Terminologia | Props | ok | Default (static, L21) | yes |
| `molecules/PagePickerButton` | PagePickerButton | Uso → Tokens | Estados, Terminologia | Tokens | ok | Default (static, L15) | yes |
| `molecules/PopoverNotification` | PopoverNotification (Figma: `molecule/popover/Notification`, `1421:19626`) | Uso → Variantes → Estados → Terminologia | — | Variantes | ok | Default (static, L36) | yes |
| `molecules/RadioButton` | RadioButton (`molecule/radioButton`) | Uso → API → Estados → Terminologia | — | API | ok | Group (live, L43) | yes |
| `molecules/SearchInput` | SearchInput (Figma: `molecule/SearchBar`, `1421:17857`) | Uso → Estados → Terminologia | — | — | ok | Default (static, L30) | yes |
| `molecules/StorageBar` | StorageBar (Figma: `molecule/StorageBar`, `1421:17904`) | Uso → Props → Variante segmentada (`StorageBarExpanded`) → Estados → Terminologia | — | Props, Variante segmentada (`StorageBarExpanded`) | ok | QuickAccess (static, L31) | yes |
| `molecules/StorageStatus` | StorageStatus (`molecule/StorageStatus`) | Uso → Variante `Expanded` — seletor de escopo → Variante `Sidebar` — versão compacta → Estados → Terminologia → Limite atingido | — | Variante `Expanded` — seletor de escopo, Variante `Sidebar` — versão compacta, Limite atingido | ok | Interactive (live, L54) | yes |
| `molecules/StorageStatusCurrent` | StorageStatusCurrent (`molecule/StorageStatus/Current`) | Uso → Anatomia → Estados → Terminologia → Tipografia | — | Anatomia, Tipografia | ok | Default (static, L26) | yes |
| `molecules/TagColor` | TagColor (Figma: `celule/TagColor`, `1444:21979`) | Uso → Cores → Estados | Terminologia | Cores | ok | Default (static, L25) | yes |
| `molecules/TemplateCard` | TemplateCard (Figma: `molecule/template-card`, `1421:19695`) | Uso → Estados → Variantes | Terminologia | Variantes | ok | Default (static, L26) | yes |
| `molecules/ThumbnailLarge` | ThumbnailLarge (Figma: `molecule/thumbnail-large`, `1421:19570`) | Uso → Anatomia → Tipos suportados → Estados → Terminologia | — | Anatomia, Tipos suportados | ok | Default (static, L24) | yes |
| `molecules/ViewModeToggle` | ViewModeToggle (Figma: `molecule/view-mode-toggle`, `1421:19069`) | Uso → Anatomia → Compacto (mobile) → Estados → Terminologia | — | Anatomia, Compacto (mobile) | ok | Grid (live, L35) | yes |
| `organisms/ArchiveBrowserModalSidebar` | ArchiveBrowserModalSidebar (`organism/ArchiveBrowserModal/sidebar`) | Uso → Composição → Terminologia | Estados | Composição | ok | Default (static*, L17) | yes |
| `organisms/CardLogin` | CardLogin (`organism/Card/Login`) | Uso → Nota de tipografia e cor → Composição → Anatomia → Estados → Terminologia | — | Nota de tipografia e cor, Composição, Anatomia | ok | Default (static*, L17) | yes |
| `organisms/CardNeedMoreHelp` | CardNeedMoreHelp (`organism/CardNeedMoreHelp`) | Uso → Composição → Material → Terminologia → Estados | — | Composição, Material | differs | Default (static, L17) | yes |
| `organisms/CleanSpaceDuplicated` | CleanSpaceDuplicated (`organism/cleanSpaceStorage/Duplicated`) | Uso → Composição → Terminologia | Estados | Composição | ok | Default (static, L23) | yes |
| `organisms/CleanSpaceLargeFiles` | CleanSpaceLargeFiles (`organism/cleanSpaceStorage/LargeFiles`) | Uso → Composição → Estados → Terminologia | — | Composição | ok | Default (static*, L24) | yes |
| `organisms/DropNewTag` | DropNewTag (`organism/drop/NewTag`) | Uso → Estados → Material → Terminologia | — | Material | ok | Default (static*, L20) | yes |
| `organisms/DropdownMenu` | DropdownMenu (`organism/dropdownMenu`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Sidebar (static, L17) | yes |
| `organisms/FaqFastLinks` | FaqFastLinks (`organism/FAQ/FastLinks`) | Uso → Composição → Estados → Terminologia | — | Composição | ok | Default (static, L17) | yes |
| `organisms/FaqInfoCard` | FaqInfoCard (`organism/FAQ/info/Card`) | Uso → Variantes → Anatomia → Terminologia → Material → Estados | — | Variantes, Anatomia, Material | differs | Faq (static*, L26) | yes |
| `organisms/FaqInfoCardCollapsed` | FaqInfoCardCollapsed (`organism/FAQ/info/cards/colapsed`) | Uso → 7 tópicos → Anatomia → Terminologia → Estados → Material | — | 7 tópicos, Anatomia, Material | differs | FirstSteps (static*, L34) | yes |
| `organisms/FileListContainer` | FileListContainer (`organism/file-list-container`) | Uso → Composição → Estados → Terminologia | — | Composição | ok | Default (static, L21) | yes |
| `organisms/FileSelectList` | FileSelectList | Uso → Tokens | Estados, Terminologia | Tokens | ok | Default (live, L26) | yes |
| `organisms/Header` | Header (`organism/Header`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Navbar (static, L17) | yes |
| `organisms/InfoPopover` | InfoPopover (`organism/info/Popover`) | Uso → Variantes → Anatomia → Comportamento | Estados, Terminologia | Variantes, Anatomia, Comportamento | ok | Metadata (static, L14) | yes |
| `organisms/MobileBottomNav` | MobileBottomNav | Variantes → Mão dominante → Notas | Uso, Estados, Terminologia | Variantes, Mão dominante, Notas | ok | Interactive (live, L32) | yes |
| `organisms/OrganizePanelDropZone` | OrganizePanelDropZone (`organism/OrganizePanel/DropZone`) | Uso → Anatomia → Escopo reduzido → Estados → Material → Terminologia | — | Anatomia, Escopo reduzido, Material | ok | Idle (static, L23) | yes |
| `organisms/PlanSelection` | PlanSelection (`organism/planSelection`) | Uso → Composição → Cores → Terminologia → Material → Estados | — | Composição, Cores, Material | differs | Default (live, L27) | yes |
| `organisms/PreviewPane` | PreviewPane (`organism/preview-pane`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Default (static, L25) | yes |
| `organisms/RecoveryPending` | RecoveryPending | Uso → Tokens e tipografia | Estados, Terminologia | Tokens e tipografia | ok | Default (static, L17) | yes |
| `organisms/SaveLongTermFileStorageSelectedFiles` | SaveLongTermFileStorageSelectedFiles (`organism/Save/LongTermFileStorage/SelectedFiles`) | Uso → Composição → Terminologia | Estados | Composição | ok | Default (static, L24) | yes |
| `organisms/Sidebar` | Sidebar (`organism/Sidebar`) | Uso → Anatomia → Composição → Terminologia → Estados | — | Anatomia, Composição | differs | Default (live, L25) | yes |
| `organisms/SidebarDrawer` | SidebarDrawer | Ordem → Comportamento | Uso, Estados, Terminologia | Ordem, Comportamento | ok | Interactive (live, L23) | **no** |
| `organisms/SidebarToggle` | SidebarToggle (`organism/sidebar-toggle`) | Uso → Composição → Estados → Terminologia | — | Composição | ok | Expanded (static, L25) | yes |
| `organisms/StorageSidebar` | StorageSidebar (`organism/storage-sidebar`) | Uso → Composição → Terminologia → Estados | — | Composição | differs | Default (static, L27) | yes |
| `organisms/StorageStatusSummary` | StorageStatusSummary | Uso → Mobile → Tipografia | Estados, Terminologia | Mobile, Tipografia | ok | Desktop (static, L23) | yes |
| `organisms/TemplateReviewModalItem` | TemplateReviewModalItem (`organism/Dialog/TemplateReviewModal/Item`) | Uso → Estados → Composição → Terminologia | — | Composição | ok | Collapsed (static, L27) | yes |
| `organisms/UploadPopover` | UploadPopover (`organism/upload-popover`) | Uso → Anatomia → Estados → Material → Terminologia | — | Anatomia, Material | ok | InProgress (static, L20) | yes |
| `organisms/UserProfileCard` | UserProfileCard | Uso → Layout → Tokens | Estados, Terminologia | Layout, Tokens | ok | Default (static, L15) | yes |
| `pages/Faq` | Faq (`page/FAQ/Expanded`, `page/FAQ/Collapsed`) | Uso → Composição → Mobile: links rápidos (Figma V0.2.1, 2026-09-24) → Terminologia | Estados | Composição, Mobile: links rápidos (Figma V0.2.1, 2026-09-24) | ok | Expanded (static, L26) | yes |
| `pages/Home` | Home (`page/Home/GridMode`, `page/Home/ListMode`, `page/Home/Columns Mode/Item1`) | Uso → Estados adicionados em 2026-08-23 → Composição → Terminologia | Estados | Estados adicionados em 2026-08-23, Composição | ok | GridMode (live, L29) | yes |
| `pages/Login` | Login (`Page/login`) | Uso → Achado: mesmo card já implementado → Composição → Terminologia | Estados | Achado: mesmo card já implementado, Composição | ok | Default (static, L17) | yes |
| `pages/LongTermStorage` | LongTermStorage | Uso → Etapas → Mobile | Estados, Terminologia | Etapas, Mobile | ok | Intro (static*, L64) | yes |
| `pages/Onboarding` | Onboarding | Uso → Etapas | Estados, Terminologia | Etapas | ok | Welcome (static*, L19) | yes |
| `pages/Organization` | Organization (`page/Organização`) | Uso → Estados adicionados em 2026-08-23 → Revisão e conclusão (Figma V0.2.1, 2026-09-24) → Mobile (< 720) → Diferenças confirmadas contra Home → Composição → Terminologia | Estados | Estados adicionados em 2026-08-23, Revisão e conclusão (Figma V0.2.1, 2026-09-24), Mobile (< 720), Diferenças confirmadas contra Home, Composição | ok | Default (live, L72) | yes |
| `pages/Payment` | Payment (`page/Payment /Expanded`, `page/Payment/Colapsed`) | Uso → Distinto de PlanSelection → Composição → Terminologia | Estados | Distinto de PlanSelection, Composição | ok | Expanded (static*, L14) | yes |
| `pages/Settings` | Settings (`page/Settings/*`) | Uso → Nav com item sem tela confirmada → Composição por seção → Novidades do Figma V0.2.1 (2026-09-24) → Terminologia | Estados | Nav com item sem tela confirmada, Composição por seção, Novidades do Figma V0.2.1 (2026-09-24) | ok | Account (live, L25) | yes |
| `pages/StorageStatus` | StorageStatus (`page/FunctionStorageStatus/*`) | Uso → Breadcrumb → Composição → Estados (Figma V0.2.1, 2026-09-24) → Terminologia | Estados | Breadcrumb, Composição, Estados (Figma V0.2.1, 2026-09-24) | ok | Global (live, L65) | yes |
| `templates/AppShell` | AppShell | — | Uso, Estados, Terminologia | — | ok | — (no Canvas) | **no** |
| `templates/ArchiveBrowserModal` | ArchiveBrowserModal (`template/ArchiveBrowserModal`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Default (static, L24) | yes |
| `templates/CleanSpaceStorage` | CleanSpaceStorage (`template/cleanSpaceStorage`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Default (static, L25) | yes |
| `templates/OrganizeFreeModeCanvas` | OrganizeFreeModeCanvas (`template/MainCanvas/Organization/FreeMode`) | Uso → ⚠️ Esta story é uma reprodução estática, não o editor funcional → Composição → Estados → Material Liquid Glass | Terminologia | ⚠️ Esta story é uma reprodução estática, não o editor funcional, Composição, Material Liquid Glass | ok | Default (static*, L19) | yes |
| `templates/SaveLongTermFileStorage` | SaveLongTermFileStorage (`template/Save/LongTermFileStorage`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Default (static, L23) | yes |
| `templates/SaveOrganizationModal` | SaveOrganizationModal (`template/DialogSave/OrganizationModal`) | Uso → Composição → Estados → Material → Terminologia | — | Composição, Material | ok | Default (static, L17) | yes |
| `templates/TemplateReviewModal` | TemplateReviewModal (`template/Dialog/TemplateReviewModal`) | Uso → Composição → Estados → Material → Terminologia → Mobile | — | Composição, Material, Mobile | ok | Default (static*, L40) | yes |

**First-Canvas summary:** live 20, static* (component self-stateful) 14, static 84, none 1.

## Part B — Interactivity

Heuristic: a component is *interactive* if its source renders `<button>`/`<input>`/`role=button|radio|checkbox|switch|tab`, takes `on*` props / `onClick`, or uses hover/active/focus classes (or composes such children). Detection scripted over `src/components/**`, then hand-checked for the components below.

**Mode legend:** `c` controlled-only (no internal state; value comes only from the prop) · `u` uncontrolled fallback (`default*` prop → `useState`, prop wins when given) · `i` internal-only `useState` (not exposed as a prop) · `v` visual-forcing axis (Figma state forced for static coverage; default "idle" keeps CSS hover) · `n` native element state.

**Live stories** = story has React state in its render (incl. meta-level stateful `render` in DropdownSelectGroupBy/ViewModeToggle and the shared `controlled()` helper in pages/Settings & pages/StorageStatus), or unpins the forcing prop (`state: undefined`). **CSS** counts class-string occurrences (`aria-` includes attributes).

**Not interactive** (no stories needed for interaction): `atoms/avatar`, `atoms/first-upload-symbol`, `atoms/icon`, `atoms/label-duplicated`, `atoms/label-storage-alert`, `atoms/mobile-success`, `atoms/storage-tier-badge`, `atoms/tag-org-mode`, `atoms/upload-folder`, `molecules/breadcrumb`, `molecules/callout`, `molecules/file-row`, `molecules/free-mode-item-node`, `molecules/free-mode-mini-map`, `molecules/page-lead`, `molecules/settings-card`, `molecules/storage-bar`, `molecules/thumbnail-large`, `organisms/faq-callout`, `organisms/info-popover`.

No stories file at all: `atoms/icon-action-button`, `molecules/breadcrumb`, `molecules/file-row`, `molecules/settings-card`, `molecules/settings-field`, `organisms/faq-callout`.

Stories with a `play` function (8): Checkbox.Interactive, HandPicker.Default, MethodOrganizeButton.Interactive, ViewModeToggle.Compact, DropNewTag.Default, FileSelectList.Default, SidebarDrawer.Interactive, pages/LongTermStorage.SelectFilesMobile. (Note: in Docs mode play functions do not autoplay unless `parameters.docs.story.autoplay` is set; not set in `.storybook/preview.tsx`.)

| Component | State props (mode) | Meta `args` pinning state | Live stories | play | CSS states | Docs 1st Canvas | Looks non-interactive to a clicker? |
|---|---|---|---|---|---|---|---|
| `atoms/add-button` | state (v; CSS hover/active only when state="idle") | disabled=false (L17) | — | — | hover:1, active:2, focus-visible:3, disabled:4, aria-1 | static | no |
| `atoms/archive-item` | selected (u: defaultSelected→useState L133); state (v, **overrides** hover/press/selection when set, L134) | state="idle" (L19) | Interactive | — | hover:2, focus-visible:3, disabled:2, aria-7 | static | **YES** — meta state="idle" overrides internal hover/press/select |
| `atoms/box-icon-button` | disabled (c, native) | disabled=false (L21) | — | — | hover:2, active:3, focus-visible:3, disabled:2, aria-2 | static | no |
| `atoms/button` | disabled (c, native); variant (static) | disabled=false (L25) | — | — | hover:6, active:1, focus-visible:6, disabled:3 | static | no |
| `atoms/checkbox` | checked (c; onCheckedChange) | checked=false (L19) | Interactive | Interactive | hover:4, active:4, focus-visible:4, disabled:2, aria-4, checked:1 | live | no |
| `atoms/chip` | selected (c; no handler prop, plain onClick) | selected=false (L10) | — | — | hover:1, focus-visible:3, aria-1 | static | yes — selected pinned false, click only CSS hover |
| `atoms/clear-button` | disabled (c) | disabled=false (L18) | — | — | hover:4, active:2 | static | no |
| `atoms/close-button` | state (v; group-hover works in idle) | state="idle" (L19) | — | — | hover:7, active:5, focus-visible:3, group-hover:2, aria-4 | static | no |
| `atoms/confirm-button` | disabled (c) | disabled=false (L18) | — | — | hover:4, active:3, disabled:1 | static | no |
| `atoms/delete-button` | disabled (c) | disabled=false (L18) | — | — | hover:4, active:3, disabled:1 | static | no |
| `atoms/dropdown-select-group-by-item` | selected (c) | selected=false (L17) | — | — | hover:1 | static | yes — selected pinned |
| `atoms/dropdown-select-label-item` | active (c) | active=false (L17) | — | — | hover:1 | static | yes — active pinned |
| `atoms/folder-item` | selected (u: defaultSelected); state (v, overrides internal when set) | state="idle" (L19) | Interactive | — | hover:1, focus-visible:3, disabled:1, aria-3 | static | **YES** — same as ArchiveItem |
| `atoms/hamburger-button` | mode closed/expand (c, no handler) | — | — | — | hover:1, focus-visible:3, aria-2 | static | yes — mode never toggles |
| `atoms/icon-action-button` | disabled (c) — no stories | — | — | — | active:1, focus-visible:3, disabled:2, aria-2 | no stories | no |
| `atoms/icon-base` | isHoverOn (v; CSS hover also present) | isHoverOn=false (L18) | — | — | hover:4, aria-2 | static | no |
| `atoms/image-item` | selected (u: defaultSelected); state (v, overrides internal when set) | state="idle" (L19) | Interactive | — | hover:1, focus-visible:3, disabled:1, aria-4 | static | **YES** — same as ArchiveItem |
| `atoms/keep-button` | disabled (c) | disabled=false (L18) | — | — | hover:4, active:3, disabled:1 | static | no |
| `atoms/plus-button` | disabled (c) | disabled=false (L18) | — | — | hover:5, active:4, disabled:1 | static | no |
| `atoms/select-state` | state (v) | state="default" (L18) | — | — | hover:2, aria-2 | static | no |
| `atoms/sidebar-tags-item` | selected (c); state (v) | state="idle" (L18); selected=false (L19) | — | — | hover:1, aria-1 | static | yes — selected pinned (hover CSS works) |
| `atoms/switch` | checked (c; onCheckedChange) | checked=false (L19) | Interactive | — | active:1, focus-visible:3, disabled:2, aria-4, checked:1 | live | no |
| `atoms/tag-org-template-name` | input value (native uncontrolled) | — | — | — | focus-visible:4 | static | no |
| `atoms/tag` | state (v; CSS hover only when state="default") | state="default" (L21) | — | — | hover:3 | static | no |
| `atoms/type-label` | selected/active/state (c) | — | — | — | hover:2, active:1, aria-1 | static | no |
| `atoms/video-item` | selected (u: defaultSelected); state (v, overrides internal when set) | state="idle" (L28) | Interactive | — | hover:1, focus-visible:3, disabled:1, aria-4 | static | **YES** — same as ArchiveItem |
| `molecules/accordion-item` | open (n: native <details>, toggles itself) | — | — | — | aria-1 | static* | no |
| `molecules/action-pill` | disabled (c) | disabled=false (L16) | — | — | hover:1, focus-visible:3, data-[2, aria-2 | static | no |
| `molecules/archive-browser-modal-list-item` | selected (c; no handler) | selected=false (L15) | — | — | hover:2, aria-1 | static | yes — selected pinned |
| `molecules/archive-browser-modal-search` | via SearchInput / list items (c) | — | — | — | aria-1 | static | no |
| `molecules/clean-space-list-selection` | selected (c; onSelectedChange) | selected=false (L21) | Interactive | — | aria-2 | static | yes — 1st Canvas Unselected static (Interactive exists lower) |
| `molecules/context-header` | state expanded/collapsed (c; no internal collapse on Clear) | state="expanded" (L17) | — | — | hover:7, active:7, focus-visible:21, aria-13 | static | **YES** — buttons do nothing visible (no handlers, state pinned) |
| `molecules/drop-list-item` | active (c); state (v) | active=false (L17) | — | — | hover:2, aria-1 | static | yes — active pinned (hover CSS works) |
| `molecules/dropdown-select-group-by` | expanded, value (c; onExpandedChange/onValueChange) | disabled=false (L18); expanded=false (L19) | Default, Expanded, Disabled | — | data-[3, aria-3 | live | no |
| `molecules/faq-topic-chips` | active (c; onSelect) | — | — | — | aria-1 | static | yes — active never changes on click |
| `molecules/file-archive-card` | none (onClick only) | interactive=false (L14) | — | — | hover:1, active:1, focus-visible:3, aria-1 | static | no |
| `molecules/file-list-header` | sortDirection (u: defaultSortDirection) | — | — | — | hover:1, active:1, aria-1 | static* | no |
| `molecules/file-list` | state (v) | state="idle" (L20) | — | — | hover:4, active:3, aria-1 | static | no |
| `molecules/file-select-row` | checked (c) | checked=false (L10) | List | — | aria-2, checked:1 | live | no |
| `molecules/folder-card` | expanded (c; onToggleExpanded); state (v) | state="idle" (L18); expanded=true (L19) | — | — | hover:5, aria-1 | static | yes — expanded pinned true, toggle does nothing |
| `molecules/folder-tag-chip` | isExpanded, selected, disabled (c) | disabled=false (L20); isExpanded=true (L24); selected=false (L25) | — | — | hover:7, active:1, focus-visible:3, data-[5, aria-4 | static | yes — isExpanded/selected pinned |
| `molecules/free-mode-add-menu` | none (onSelect) | — | — | — | — | static | no |
| `molecules/free-mode-buttons` | none (callbacks only) | — | — | — | — | static | no |
| `molecules/free-mode-list-item` | selected (c; onSelect); state (v) | — | — | — | hover:2, aria-2 | static | yes — selected never changes |
| `molecules/free-mode-output-node` | previewExpanded (i) | — | — | — | aria-4 | static* | no |
| `molecules/hand-picker` | value (c; onValueChange) | value="right" (L12) | Default | Default | hover:1, focus-visible:3, aria-4 | live | no |
| `molecules/label` | state default/expanded/disabled (c; onExpandedChange); value (c) | state="default" (L16); value="Etiquetar" (L17) | — | — | hover:5, active:2, disabled:2, aria-5 | static | **YES** — controlled-only, meta pins state="default", no story wires onExpandedChange |
| `molecules/method-organize-button` | expanded (c; no handler prop, only chevron rotates); method (c) | expanded=false (L12) | Interactive | Interactive | hover:1, focus-visible:3, aria-3 | static | **YES** — Default is static; only chevron rotates via Controls |
| `molecules/mobile-footer-settings` | active (c; onSelect) | page="settings" (L12); active="Conta" (L12) | Interactive | — | aria-1 | live | no |
| `molecules/mobile-tab-bar` | active (c; onTabChange) | active="home" (L12) | Interactive | — | hover:1, focus-visible:3, aria-3 | live | no |
| `molecules/node-context-menu-item` | value, expanded (u: defaultValue/defaultExpanded) | disabled=false (L23) | Placeholder, Expanded | — | hover:2, active:1, disabled:2, aria-3 | live | no |
| `molecules/node-context-menu` | state (v) | state="floating-info-panel" (L17) | — | — | hover:2, aria-7 | static | yes — static |
| `molecules/page-picker-button` | page (c, no handler) | page="Pessoal" (L9) | — | — | focus-visible:3, aria-3 | static | yes — no state |
| `molecules/popover-notification` | none (onClose) | — | — | — | aria-2 | static | no |
| `molecules/radio-button` | checked (c; onCheckedChange) | checked=false (L23) | Group | — | active:1, focus-visible:3, aria-1, peer-1, checked:2 | live | no |
| `molecules/search-input` | input value (native uncontrolled); state (v) | disabled=false (L21) | — | — | focus-visible:5, disabled:2, aria-6 | static | no |
| `molecules/settings-field` | input (native) — no stories | — | — | — | focus-visible:3 | no stories | no |
| `molecules/storage-status-current` | none (onBuySpace) | — | — | — | hover:1, active:1, aria-5 | static | no |
| `molecules/storage-status` | scope (c; onScopeChange) | scope="global" (L20) | Interactive | — | aria-10 | live | no |
| `molecules/tag-color` | value (c; onValueChange) | — | Interactive | — | focus-visible:3, aria-3 | static | yes — 1st Canvas Default static (Interactive is 2nd) |
| `molecules/template-card` | selected (c; no handler) | selected=false (L19) | — | — | hover:1, focus-visible:3, aria-3 | static | yes — selected pinned false |
| `molecules/view-mode-toggle` | mode (c; onModeChange) | mode="grid" (L21) | Grid, List, Columns, Compact | Compact | hover:1, aria-3 | live | no |
| `organisms/archive-browser-modal-sidebar` | activePage (u) | — | — | — | hover:3, active:2, aria-2 | static* | no |
| `organisms/card-login` | email/password/showPassword (i) | — | — | — | hover:8, focus-visible:9, aria-5 | static* | no |
| `organisms/card-need-more-help` | none | — | — | — | hover:2, active:1 | static | no |
| `organisms/clean-space-duplicated` | none | — | — | — | hover:3, aria-1 | static | no |
| `organisms/clean-space-large-files` | selectedNames (u) | — | — | — | hover:9, active:4, disabled:1, aria-1 | static* | no |
| `organisms/drop-new-tag` | label, color (u: defaultLabel/defaultColor only) | — | — | Default | focus-visible:3, aria-2 | static* | no |
| `organisms/dropdown-menu` | none (onItemSelect) | — | — | — | hover:2, aria-1 | static | no state to show (menu items hover only) |
| `organisms/faq-fast-links` | none (links) | — | — | — | hover:1 | static | no |
| `organisms/faq-info-card-collapsed` | expanded (i) | — | — | — | hover:2, active:1, aria-2 | static* | no |
| `organisms/faq-info-card` | collapsed (u: defaultCollapsed) | — | — | — | hover:2, active:1, aria-1 | static* | no |
| `organisms/file-list-container` | none (onOpen) | — | — | — | hover:2, focus-visible:3 | static | no |
| `organisms/file-select-list` | selected (c) | selected=new Set<string>() (L18) | Default | Default | aria-1, checked:1 | live | no |
| `organisms/header` | page (c) | page="navbar" (L10) | — | — | focus-visible:3, aria-5 | static | partial — page pinned; buttons have no handlers |
| `organisms/mobile-bottom-nav` | active (c; onNavigate); hand (static) | active="pessoal" (L16) | Interactive | — | active:2, focus-visible:9, aria-9 | live | no |
| `organisms/organize-panel-drop-zone` | state, mode (c/v) | mode="Data" (L15); state="idle" (L16) | — | — | data-[2, aria-4 | static | yes — state pinned idle |
| `organisms/plan-selection` | currentPlanId (u) | — | Default | — | aria-4 | live | no |
| `organisms/preview-pane` | none | — | — | — | hover:4, aria-2 | static | no |
| `organisms/recovery-pending` | none | — | — | — | aria-6 | static | no |
| `organisms/save-long-term-file-storage-selected-files` | none | — | — | — | — | static | no |
| `organisms/sidebar-drawer` | open, active (c; onOpenChange/onNavigate) | open=true (L13) | Interactive | Interactive | hover:2, active:2, focus-visible:3, group-hover:1, aria-7 | live | no |
| `organisms/sidebar-toggle` | expanded (c; onToggle); state (v) | expanded=true (L16); state="idle" (L17) | — | — | hover:2, active:2, focus-visible:3, aria-3 | static | yes — expanded pinned true |
| `organisms/sidebar` | collapsed (u: defaultCollapsed); activePage/activeTag (c) | activePage="Pessoal" (L11) | Default, Collapsed | — | hover:15, focus-visible:15, aria-14 | live | no |
| `organisms/storage-sidebar` | expanded (c; onToggle) | expanded=true (L15) | — | — | — | static | yes — expanded pinned true |
| `organisms/storage-status-summary` | none (contains Label, never opens) | — | — | — | hover:1, focus-visible:3, aria-4 | static | yes — embedded Label never opens |
| `organisms/template-review-modal-item` | isExpanded (c; onToggleExpand) | isExpanded=false (L13) | — | — | hover:6, active:2, focus-visible:6, disabled:1, aria-10 | static | yes — isExpanded pinned false |
| `organisms/upload-popover` | none (callbacks) | — | — | — | hover:8, aria-14 | static | no |
| `organisms/user-profile-card` | none | — | — | — | aria-1 | static | no |
| `pages/faq-page` | via children (FaqInfoCard u) | — | — | — | — | static | partial — accordion cards internal |
| `pages/home-page` | viewMode (c) | — | GridMode, ListMode, FirstUpload, ListModeSelected, ColumnsMode | — | active:2, aria-1 | live | no (viewMode live) — but embedded Label never opens |
| `pages/login-page` | via CardLogin (i) | — | — | — | hover:1, aria-4 | static | no |
| `pages/long-term-storage-page` | step (c); selected, viewMode (i) | step="intro" (L15) | — | SelectFilesMobile | active:3, checked:1 | static* | partial — step pinned; selection internal |
| `pages/onboarding-page` | step (i from defaultStep), theme (i) | defaultStep="welcome" (L12) | — | — | hover:1, aria-4 | static* | no |
| `pages/organization-page` | viewMode, step (c); mobile method/methodsOpen/selected (i, L246-248) | viewMode="grid" (L39) | Default, TemplateDropZone, Saved | — | active:6, aria-1, checked:1 | live | no |
| `pages/payment-page` | open (i, from defaultOpen) | — | — | — | active:1, aria-12 | static* | no |
| `pages/settings-page` | activeSection (c) | — | Account, Subscription, Notifications, Appearance, Privacy, Languages, DeleteAccount, AccountTablet, SubscriptionTablet, AccountMobile, SubscriptionMobile, PrivacyMobile, DeleteAccountMobile, AppearanceMobile | — | active:1, aria-1 | live | no |
| `pages/storage-status-page` | scope (c) | — | Global, QuickAccess, LongTerm, GlobalTablet, GlobalMobile, LimitReached, ManageSpace, LongTermMobile | — | active:2, aria-4 | live | no |
| `templates/app-shell` | drawerOpen (i) | — | — | — | aria-1 | none | no |
| `templates/archive-browser-modal` | selectedCount (c) | selectedCount=2 (L16) | — | — | aria-1 | static | yes — selection count fixed |
| `templates/clean-space-storage` | via CleanSpaceLargeFiles (u) | — | — | — | aria-1 | static | no |
| `templates/organize-free-mode-canvas` | addMenuOpen (i) | — | — | — | hover:2, aria-5 | static* | no |
| `templates/save-long-term-file-storage` | selectedCount (c) | selectedCount=1 (L15) | — | — | aria-1 | static | yes — selection count fixed |
| `templates/save-organization-modal` | selected (c; onMethodSelect) | selected="projeto" (L10) | — | — | aria-1 | static | yes — selected pinned; NoneSelected only unpins |
| `templates/template-review-modal` | expanded (i) | — | — | — | aria-2 | static* | no |
### Flagged: first docs Canvas looks non-interactive to someone clicking (34)

**Strong (the click does nothing, or the component's own behaviour is overridden):** molecules/Label, molecules/MethodOrganizeButton, molecules/ContextHeader, atoms/ArchiveItem, FolderItem, ImageItem, VideoItem (meta `state:"idle"` overrides the internal selection; only the lower `Interactive` story works).
**Selection/open prop pinned or never updated:** atoms/Chip, HamburgerButton, DropdownSelectGroupByItem, DropdownSelectLabelItem, SidebarTagsItem; molecules/ArchiveBrowserModalListItem, CleanSpaceListSelection, DropListItem, FaqTopicChips, FolderCard, FolderTagChip, FreeModeListItem, NodeContextMenu, PagePickerButton, TagColor, TemplateCard; organisms/Header (partial), OrganizePanelDropZone, SidebarToggle, StorageSidebar, StorageStatusSummary, TemplateReviewModalItem; templates/ArchiveBrowserModal, SaveLongTermFileStorage, SaveOrganizationModal; pages/Faq, LongTermStorage (partial).
**First Canvas is live (docs OK):** Checkbox, Switch, DropdownSelectGroupBy, FileSelectRow, HandPicker, MobileFooterSettings, MobileTabBar, NodeContextMenuItem, RadioButton, StorageStatus, ViewModeToggle, FileSelectList, MobileBottomNav, PlanSelection, Sidebar, SidebarDrawer, pages Home/Organization/Settings/StorageStatus. **Static story but component is self-stateful (still reacts):** AccordionItem, FileListHeader, FreeModeOutputNode, ArchiveBrowserModalSidebar, CardLogin, CleanSpaceLargeFiles, DropNewTag, FaqInfoCard, FaqInfoCardCollapsed, TemplateReviewModal, OrganizeFreeModeCanvas, Onboarding, Payment.

## Part C — Reported bugs

### C1. `molecules/context-header.tsx` — icons "all size-4" but not the same scale

All six glyphs are rendered in a 16×16 box (`size-4`; lines 98/126 Clear, 142 ShareFile, 150 Download, 158 FileMoveRight, 166 Delete, 174 Settings2; `Icon` also defaults to `size-4`, `src/components/atoms/icon.tsx:170`). But the SVG assets have **different viewBoxes and very different amounts of padding**, so the drawn glyph size varies a lot. SVGs use default `preserveAspectRatio="xMidYMid meet"`, so scale = min(16/vbW, 16/vbH). `vite.config.ts` uses bare `svgr()` (no `replaceAttrValues`), so hard-coded fills stay as they are.

| Glyph (file) | viewBox | Path bbox (approx., viewBox units) | Scale in 16px | Drawn size (px, w×h) | Paint |
|---|---|---|---|---|---|
| ClearButtonGlyph.svg | 0 0 16 16 | x 3.33–12.67, y 3.33–12.67 (9.3×9.3) | 1.00 | **9.3 × 9.3** | fill `currentColor` |
| ShareFile.svg | 0 0 **36 29** | x 7.5–28.5, y 6–22 (21×16) | 0.444 | **9.3 × 7.1** | fill **`#001F27` hard-coded** |
| Download.svg | 0 0 16 16 | x 3.33–12.67, y 2.33–13.67 (9.3×11.3) | 1.00 | **9.3 × 11.3** | fill `currentColor` |
| FileMoveRight.svg | 0 0 22 22 | x 1.83–20.17, y 3.67–18.33 (18.3×14.7) | 0.727 | **13.3 × 10.7** | fill `currentColor` |
| DeleteButtonGlyph.svg | 0 0 **10 12** | x 0.33–9.67, y 0–12 (9.3×12, zero padding) | 1.333 | **12.4 × 16.0** | fill `currentColor` |
| Settings2.svg | 0 0 **16 27** | x 6–9.67, y 6–20.67 (3.7×14.7; three dots Ø3.7) | 0.593 | **2.2 × 8.7** (dots ≈2.2px) | fill **`#001F27` hard-coded** |

All are fill-only (no strokes). Root causes:
1. **Mixed export framing.** Download/Clear are Material 16-grid icons with ~3.3u padding; FileMoveRight is a 22-grid Material icon with ~1.8u padding; DeleteButtonGlyph was exported **tight to the path** (no padding) so it fills the full 16px height; ShareFile and Settings2 were exported from Figma *container* frames (36×29 and 16×27, the "Container" group) so their paths are shrunk by the letterboxing. Equal `size-4` boxes ⇒ drawn heights range 7.1px (ShareFile) → 16px (Delete); Settings2's dots are ~2.2px.
2. **Hard-coded color.** `ShareFile.svg` and `Settings2.svg` use `fill="#001F27"`, so the parent's `text-zinc-800 dark:text-zinc-100 hover:text-brand-teal` has no effect on them — they don't turn teal on hover and stay near-black in dark mode, unlike the other four. (33 other icons in `src/assets/icons/` also hard-code hex fills, e.g. Share, Label, Filter, Group, TagSet, ViewMode*.)
3. Minor: the Delete button wrapper itself is `size-4` (L164) while Share/Download/More use `py-1.5` and Move has no padding (L154) — hit areas differ too.

Fix direction (not applied): normalise the five assets to a common 16 (or 24) grid with consistent padding (or crop all to tight bounds and size by optical height), and switch `#001F27` → `currentColor`.

### C2. `molecules/label.tsx` (Figma `molecule/Label`) — "doesn't interact"

Root cause: it is a **purely controlled component with no internal open state**, and nobody drives it.
- `src/components/molecules/label.tsx:69-81` — open/closed derives only from the `state` prop (`isExpanded = state === "expanded"`); no `useState`, no `defaultState`/uncontrolled fallback.
- Trigger click only *reports* intent: closed pill `onClick={() => onExpandedChange?.(true)}` (L146); expanded header `onExpandedChange?.(false)` (L103); list items call `onValueChange` (L118). If no parent updates `state`, clicking does nothing.
- `stories/molecules/Label.stories.tsx:15-18` — meta `args: { state: "default", value: "Etiquetar" }` pins it closed; no story has a `render` with `useState`, no `useArgs`, no `play` (Default L24, Expanded L26, Disabled L30, ExpandedDynamicList L34 all plain args).
- `stories/molecules/Label.mdx:14-18` — four static Canvases + `<Controls />` (drives `Default`); the only way to open it in docs is the `state` radio in Controls.
- Also static inside the expanded panel: the "search" (L129-131) is a `div` with a glyph, not an `<input>`; the three `FileTypeLabel` rows (L133-135) get no handlers.
- Same bug in real consumers: `<Label />` with no props at `pages/home-page.tsx:125`, `pages/organization-page.tsx:142`, `organisms/storage-status-summary.tsx:67` — it can never open anywhere in the app.
- Reference pattern already in the repo: `stories/molecules/DropdownSelectGroupBy.stories.tsx:21-43` (meta-level `render` with `useState` for `expanded`/`value`).

### C3. `molecules/method-organize-button.tsx` — `expanded` only rotates the chevron

Confirmed.
- The component is a single `<button>` (L46-68). `expanded` is used for exactly two things: `aria-expanded` (L50) and `rotate-180` on the chevron SVG (L64). It renders no options list, has no `onExpandedChange`, no internal state.
- The options list lives in the parent: `src/components/pages/organization-page.tsx:246-247` (`useState` for `method` and `methodsOpen`), L301 (trigger toggles `methodsOpen`), L302-313 (maps `MOBILE_ORGANIZE_METHODS` minus the current one into extra `MethodOrganizeButton withChevron={false}` rows that set the method and close).
- Docs: `stories/molecules/MethodOrganizeButton.mdx:14-15` — first Canvas is `Stories.Default` + `<Controls />`. `Default` (`stories/molecules/MethodOrganizeButton.stories.tsx:19`) is plain args with meta `args: { method: "projeto", withChevron: true, expanded: false }` (L12), so toggling `expanded` in Controls only flips the chevron/aria, and clicking the button does nothing.
- The working demo is `Interactive` (stories L33-58), which **re-implements the page's list logic in the story** (`Picker` with its own `useState`, L35-47) and has a `play` test (L51-57); it's shown lower on the docs page under "Abrir a lista" (mdx L29). So the list behaviour is duplicated in `organization-page.tsx` and the story, and isn't part of the component API. The component JSDoc (L40-41) notes the open state is an engineering extension not drawn in Figma.
