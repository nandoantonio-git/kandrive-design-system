---
tags: [estado]
---

# Auditoria do Storybook — Estrutura dos Docs (Lote 5, 2026-09-26)

Resultado do [[Auditoria do Storybook (2026-09-26)|Lote 5]]: cada página de Docs no padrão (título com Figma + node, Uso com Canvas vivo e Controls da mesma story, Anatomia/Composição, Estados, Mobile, Terminologia).

| Doc | H1 corrigido | Controls apontado | Seções criadas | Node id corrigido no JSDoc | Observação |
|---|---|---|---|---|---|
| atoms/AddButton | ✅ `atom/AddButton` (era `atom/buttonAdd`) | Default | Anatomia (Variantes), tabela Estados | — | AllStates movido p/ Estados |
| atoms/ArchiveItem | ✅ `molecule/FileItem`, `212:3691` | Idle | Tabela Estados, Terminologia; "Sobre o eixo tier"→### | `1421:18214`→`212:3691` | Story aponta p/ set FileItem (Type=File) |
| atoms/Avatar | ✅ | Initials | Anatomia (Tokens), Estados, Terminologia | — | |
| atoms/BoxIconButton | ✅ `atom/BoxIconButton` | Default | Anatomia (Variantes), tabela Estados | — | |
| atoms/Button | ✅ | Primary | Anatomia (Variantes/Dark mode/Tipografia), tabela Estados | — | Matrix em Estados |
| atoms/Checkbox | ✅ | Interactive | Anatomia (Variantes/Acessibilidade), tabela Estados, Terminologia | — | |
| atoms/Chip | ✅ | Default | Uso, Anatomia, Estados, Terminologia | — | Não tinha seções |
| atoms/ClearButton | ✅ `atom/IconButton`, `174:384` | Default | Anatomia (link base), tabela Estados | `1421:17768`→`174:384` | |
| atoms/CloseButton | ✅ sem node confirmado | Default | Tabela Estados | — | `1421:19008` inválido; "sem disabled" corrigido (disabled existe) |
| atoms/ConfirmButton | ✅ `atom/IconButton`, `174:384` | Default | Anatomia, tabela Estados | `1421:17747`→`174:384` | |
| atoms/DeleteButton | ✅ `atom/IconButton`, `174:384` | Default | Anatomia, tabela Estados | `1421:17705`→`174:384` | |
| atoms/DropdownSelectGroupByItem | ✅ | Idle | Tabela Estados, Terminologia | — | "Sem disabled" corrigido |
| atoms/DropdownSelectLabelItem | ✅ | Idle | Tabela Estados, Terminologia | — | "Sem disabled" corrigido |
| atoms/FirstUploadSymbol | ✅ | Default | Terminologia | — | |
| atoms/FolderItem | ✅ `molecule/FileItem` | Idle | Tabela Estados, Terminologia | `1440:24306`→`212:3691` | |
| atoms/HamburgerButton | ✅ | Default | Uso, Anatomia (Modos), Estados, Terminologia | — | Não tinha seções |
| atoms/Icon | ✅ `Icons`, `3024:3792` | Default | Anatomia | — | Nó é a seção Icons |
| atoms/IconActionButton | novo | Default | Todas | — | Novo doc + stories (Default c/ play, Glyphs, Disabled c/ play) |
| atoms/IconBase | ✅ `Icons`, `3024:3792` | Default | Anatomia, tabela Estados, Terminologia | `1421:17820`→`3024:3792` | Story aponta p/ seção Icons |
| atoms/ImageItem | ✅ sem node confirmado | Idle | Anatomia, tabela Estados, Terminologia | — | `1421:18311` inválido (story e JSDoc); provável FileItem Type=Image |
| atoms/KeepButton | ✅ `atom/IconButton` | Default | Anatomia, tabela Estados | `1421:17793`→`174:384` | |
| atoms/LabelDuplicated | ✅ `atom/LabelDuplicated` | Default | Terminologia | — | |
| atoms/LabelStorageAlert | ✅ `atom/LabelStorageAlert` | AllVariants | Anatomia, Terminologia | — | |
| atoms/MobileSuccess | ✅ | Organized | Anatomia (Variantes/Tema), Estados, Terminologia | — | |
| atoms/PlusButton | ✅ `atom/IconButton` | Default | Anatomia, tabela Estados | `1421:17726`→`174:384` | |
| atoms/SelectState | ✅ `212:3726` | Default | Tabela Estados, Terminologia | `1421:18292`→`212:3726` | |
| atoms/SidebarTagsItem | ✅ `atom/SidebarTagsItem` | Idle | Tabela Estados, Terminologia | — | |
| atoms/StorageTierBadge | ✅ `1023:13787` | Current | Anatomia, Terminologia | `1457:21014`→`1023:13787` | |
| atoms/Switch | ✅ `atom/Switch`, `1454:20959` | Interactive | Anatomia (API), tabela Estados, Terminologia | — | |
| atoms/Tag | ✅ `191:4894` | Primary | Anatomia, tabela Estados, Terminologia | `1421:17929`→`191:4894` | |
| atoms/TagOrgMode | ✅ `309:14704` | Free | Anatomia (Modos), Terminologia | `1421:18769`→`309:14704` | |
| atoms/TagOrgTemplateName | ✅ `1039:17641` | Placeholder | Tabela Estados, Terminologia | `1421:18778`→`1039:17641` | |
| atoms/TypeLabel | ✅ `atom/TypeLabel`, `237:4728` | FileTypeLegend | Anatomia, tabela Estados; Terminologia movida p/ o fim | `1421:18415`→`237:4728` | |
| atoms/UploadFolder | ✅ `molecule/FileItem` | Default | Anatomia, Terminologia | `1439:17053`→`212:3691` | Story aponta p/ FileItem; semântica duvidosa |
| atoms/VideoItem | ✅ `molecule/FileItem` | Idle | Tabela Estados, Terminologia | `1442:7858`→`212:3691` | |
| organisms/ArchiveBrowserModalSidebar | ✅ `1555:21309` | Default | Estados | — | nome Figma é `organism/ArchiveBrowserModalSidebar` |
| organisms/CardLogin | ✅ `1454:22055` (`Device=Desktop`) | Default | Mobile; "Nota de tipografia" e Anatomia → ### em Composição | — | tabela de estados 🧩 |
| organisms/CardNeedMoreHelp | ✅ `1454:20981` | Default | — | — | Terminologia movida p/ depois de Estados; Material → ### |
| organisms/CleanSpaceDuplicated | ✅ `1554:21265` | Default | Estados | — | |
| organisms/CleanSpaceLargeFiles | ✅ `1554:21264` | Default | — | — | |
| organisms/DropNewTag | ✅ `1444:21624` | Default | Composição | — | |
| organisms/DropdownMenu | ✅ `1440:23662` | Sidebar | ### Variantes (Canvas TemplateOptions) | — | |
| organisms/FaqCallout | ✅ sem node confirmado | Info | (novo) stories + doc | — | display-only; copy real de faq-info-card-collapsed |
| organisms/FaqFastLinks | ✅ `1454:25006` | Default | — | — | |
| organisms/FaqInfoCard | ✅ `1454:24788` | Faq | Variantes/Material → ### em Anatomia | — | Terminologia movida p/ o fim |
| organisms/FaqInfoCardCollapsed | ✅ `1454:22003` | FirstSteps | "7 tópicos"/Material → ### | — | Terminologia movida p/ o fim |
| organisms/FileListContainer | ✅ `826:16143` | Default | — | ✅ `1421:19687`→`826:16143` | |
| organisms/FileSelectList | ✅ `1714:625` (`file-list-section`) | Default | Composição, Estados, Mobile, Terminologia | — | JSDoc sem id |
| organisms/Header | ✅ `1255:22352` | Navbar | — | ✅ `1421:19918`→`1255:22352` | Terminologia: "Organizar" já está na lista aprovada (texto antigo dizia que não) |
| organisms/InfoPopover | ✅ `1421:18504` | Metadata | Estados, Terminologia; Variantes/Comportamento → ### | — | |
| organisms/MobileBottomNav | ✅ `1715:9867` | Interactive | Uso, Composição, Estados, Mobile, Terminologia | — | nota F9 "achado aberto" estava obsoleta (JSDoc: corrigido 2026-09-24) → ### Histórico |
| organisms/OrganizePanelDropZone | ✅ `309:14839` | Idle | Canvases Dragover/Filled em Estados | ✅ `1421:18781`→`309:14839` (1ª linha) | "Escopo reduzido" (sem D&D) estava obsoleto → ### Histórico |
| organisms/PlanSelection | ✅ `1454:25057` | Default | Canvas Monthly | — | Terminologia movida p/ o fim |
| organisms/PreviewPane | ✅ `724:3597` | Default | Canvas WithoutTags | ✅ `1421:19405`→`724:3597` (1ª linha) | |
| organisms/RecoveryPending | ✅ `1765:61503` (Content Container) | Default | Composição, Histórico, Estados, Terminologia | ✅ acrescentado `1765:61503` (mantido `1765:61487` da tela) | |
| organisms/SaveLongTermFileStorageSelectedFiles | ✅ `1555:21357` | Default | Estados | — | |
| organisms/Sidebar | ✅ `197:6187` | Default | — | ✅ `1421:17946`→`197:6187` | Terminologia movida p/ o fim |
| organisms/SidebarDrawer | ✅ `3139:49490` (tela) | Interactive | Uso, Composição (Ordem/Comportamento), Estados, Mobile, Terminologia | — (JSDoc cita `1771:35845` = variante Mobile real da Sidebar, mais precisa; mantido) | story design URL aponta p/ a tela, não p/ o componente |
| organisms/SidebarToggle | ✅ `624:4573` | Expanded | Canvases de hover/pressed em Estados | ✅ `1421:19118`→`624:4573` | |
| organisms/StorageSidebar | ✅ `635:5608` | Default | Canvas Collapsed | ✅ `1421:19167`→`635:5608` | Terminologia: "Comprar Espaço" já aprovado (texto antigo dizia que não) |
| organisms/StorageStatusSummary | ✅ `1742:25489` | Desktop | Composição, Estados, Terminologia | — | |
| organisms/TemplateReviewModalItem | ✅ `1554:21151` | Collapsed | Canvases Expanded/Incongruente/Ok | — | |
| organisms/UploadPopover | ✅ `1421:19292` | InProgress | ### Variantes (Canvas WithFileList) | — | |
| organisms/UserProfileCard | ✅ `1702:22547` (tela Settings/Account/Mobile) | Default | Composição, Estados, Mobile, Terminologia | — | JSDoc sem id |
| templates/AppShell | ✅ `1715:9906` (tela Home/Grid/Mobile) | Desktop | reconstruído: Uso, Composição, Estados, Mobile (4 Canvases), Terminologia | — | não havia Canvas nenhum |
| templates/ArchiveBrowserModal | ✅ `1439:16909` (`Device=Desktop`) | Default | Mobile (Tablet/Mobile), Canvas ControlledCount | — | |
| templates/CleanSpaceStorage | ✅ `1439:16908` (`Device=Desktop`) | Default | — | — | |
| templates/OrganizeFreeModeCanvas | ✅ `1439:16906` | Default | Terminologia; aviso estático → ### | — | |
| templates/SaveLongTermFileStorage | ✅ `1439:16907` (`Device=Desktop`) | Default | Mobile (Tablet/Mobile) | — | |
| templates/SaveOrganizationModal | ✅ `251:4480` | Default | Canvas NoneSelected | ✅ `1421:18576`→`251:4480` (1ª linha) | |
| templates/TemplateReviewModal | ✅ `1431:20397` (`Device=Desktop`) | Default | Mobile movido p/ antes de Terminologia | — | |
| molecules/AccordionItem | ✅ (+ nó) | Expanded | Anatomia, Estados (tabela) | — | Variantes/Acessibilidade → ###; "Conteúdo" → Terminologia |
| molecules/ActionPill | ✅ `1421:19027`→`517:3818` | Default | Estados tabela | ✅ `517:3818` | |
| molecules/ArchiveBrowserModalListItem | ✅ nome | Default | Estados tabela | — | Canvas Selected → Estados |
| molecules/ArchiveBrowserModalSearch | ✅ nome | Default | Terminologia | — | |
| molecules/Callout | ✅ `1421:20028`→`1288:16935` | Warning | Anatomia (### Variantes) | ✅ `1288:16935` | sem estados interativos |
| molecules/CleanSpaceListSelection | ✅ nome | Unselected | Estados tabela | — | |
| molecules/ContextHeader | ✅ `1421:19589`→`790:7618` | Default | Mobile (antes "Minimal (mobile)"), ### Tipografia | ✅ `790:7618` | nota de tipografia saiu de Terminologia |
| molecules/DropListItem | ✅ nome | Idle | Estados tabela | — | |
| molecules/DropdownSelectGroupBy | ✅ `1421:18719`→`307:14252` | Default | Estados tabela | ✅ `307:14252` | removido "sem hover" (obsoleto: hover existe desde o Lote 3) |
| molecules/FaqTopicChips | ✅ (frame de tela `FAQ/Collapsed/Mobile`) | Default | Estados, Mobile, Terminologia | — | node da story é a tela, não componente |
| molecules/FileArchiveCard | ✅ `molecule/FileItem` `212:3691` | FileArchive2 | Anatomia (### Um único componente), Estados tabela | ❌ não mudado | JSDoc cita 2 ids (`1439:19655/19656`); story aponta outro set (`molecule/FileItem`) — decisão humana |
| molecules/FileList | ✅ `1421:19200`→`666:9228` | Default | Anatomia (### Formatos), Estados tabela | ✅ `666:9228` | |
| molecules/FileListHeader | ✅ `1421:19184`→`665:9172` | Home | Anatomia (### Formatos), Estados tabela | ✅ `665:9172` | corrigido "ordenação não implementada" (obsoleto) |
| molecules/FileSelectRow | ✅ (frame `file-row-1`) | List | Anatomia (### Tokens e tipografia), Estados tabela, Mobile, Terminologia | — | |
| molecules/FolderCard | ✅ nome | Default | Estados tabela; Mobile movido antes de Terminologia | — | |
| molecules/FolderTagChip | ✅ `1421:19040`→`558:8055` | Default | Colapsado/Tipografia → ###, Estados tabela | ✅ `558:8055` | |
| molecules/FreeModeAddMenu | ✅ `1394:16574` | Default | ### Histórico, Estados | ✅ `1431:20042`→`1394:16574` | |
| molecules/FreeModeButtons | ✅ nome | Default | — | — | |
| molecules/FreeModeItemNode | ✅ nome | Juncao | Anatomia (### Variantes/resultado/Ícones) | — | |
| molecules/FreeModeListItem | ✅ `1421:20757`→`1394:16408` | Idle | Anatomia (### Operações), Estados tabela | ✅ `1394:16408` | |
| molecules/FreeModeMiniMap | ✅ `template/OrganizeFreeModeCanvas` | Default | Estados (era "Interação"), Terminologia | — | JSDoc cita o elemento `1422:24802` (filho do nó da story), mantido |
| molecules/FreeModeOutputNode | ✅ nome | Default | Anatomia (### Variantes/Ícones), Estados tabela | — | corrigido "sem hover/focus" (obsoleto) |
| molecules/HandPicker | ✅ (tela `Settings/Appearance/Desktop`) | Default | ### Acessibilidade, Estados, Terminologia | — | |
| molecules/Label | ✅ `1421:18687`→`302:12809` | Default | ### Histórico (Consolidado…), Estados tabela | ✅ `302:12809` | |
| molecules/MethodCard | já no padrão | Default | — | — | só conferido |
| molecules/MethodOrganizeButton | já no padrão | Default | — | — | só conferido |
| molecules/MobileFooterSettings | ✅ | Interactive | Uso, Anatomia (### Variantes), Estados, Mobile, Terminologia | — | construído do JSDoc |
| molecules/MobileTabBar | ✅ (`Active=Home`) | Interactive | Uso, Anatomia (### Tipografia), Estados, Mobile, Terminologia | — | construído do JSDoc |
| molecules/NodeContextMenu | ✅ `1440:23821`→`1383:15617` | Default | "Estado de erro" → Estados, tabela | ✅ `1383:15617` | |
| molecules/NodeContextMenuItem | ✅ `1421:20528`→`1384:17074` | Placeholder | Anatomia (### Tipos), Estados tabela | ✅ `1384:17074` | |
| molecules/PageLead | ✅ `1439:17048`→`1245:12212` | Default | Anatomia (### Props), Terminologia | ✅ `1245:12212` | |
| molecules/PagePickerButton | ✅ (frame `page`) | Default | Anatomia (### Tokens), Estados, Mobile, Terminologia | — | |
| molecules/PopoverNotification | ✅ `1421:19626`→`826:15269` | Default | Anatomia (### Variantes), Estados tabela | ✅ `826:15269` | |
| molecules/RadioButton | ✅ `1454:24721` | Group | Anatomia (### API), Estados tabela | — | |
| molecules/SearchInput | ✅ `1421:17857`→`3010:6061` | Default | Estados tabela | ✅ `3010:6061` | |
| molecules/StorageBar | ✅ `1421:17904`→`191:4816` | QuickAccess | Anatomia (### Props, ### segmentada) | ✅ `191:4816` | |
| molecules/StorageStatus | ✅ `231:4553` | Interactive | Anatomia (### Expanded/Sidebar), "Limite atingido" → Estados | ✅ `1421:18354`→`231:4553` | corrigido "LimitReached não implementado" (obsoleto) |
| molecules/StorageStatusCurrent | ✅ `molecule/StorageTierCard` `3020:29528` | Default | ### Tipografia, Estados tabela | ✅ `1439:17044`→`3020:29528` | |
| molecules/TagColor | ✅ nome | Default | Anatomia (### Cores), Estados tabela, Terminologia | — | |
| molecules/TemplateCard | ✅ `1421:19695`→`900:11221` | Default | Anatomia (### Variantes), Estados tabela, Terminologia | ✅ `900:11221` | ⚠️ JSDoc marca pressed/disabled como Regra 8, mas o nó desenha ambos |
| molecules/ThumbnailLarge | ✅ `1421:19570`→`790:3663` | Default | ### Tipos suportados | ✅ `790:3663` | |
| molecules/ViewModeToggle | ✅ `1421:19069`→`622:3468` | Grid | "Compacto (mobile)" → Mobile, Estados tabela | ✅ `622:3468` | |
| molecules/Breadcrumb (novo) | sem node confirmado | Default | todas | — | `1421:19875` não resolve; stories Default/HomeOnly/Pages |
| molecules/FileRow (novo) | sem node confirmado | Default | todas | — | JSDoc sem id; stories Default/Folder/List |
| molecules/SettingsCard (novo) | sem node confirmado | Default | todas | — | ids de página não resolvem; stories Default/HeaderOnly |
| molecules/SettingsField (novo) | sem node confirmado | Default (vivo + play) | todas | — | stories Default/Password/WithPlaceholder/Disabled |
