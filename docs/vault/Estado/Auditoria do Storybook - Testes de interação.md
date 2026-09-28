---
tags: [estado]
---

# Auditoria do Storybook — Testes de interação (Lote 4, 2026-09-26)

Resultado do [[Auditoria do Storybook (2026-09-26)|Lote 4]]: o que a `play` de cada componente verifica. Roda na aba Interactions e no `npm test`.

| Componente | Story | O que o teste verifica |
|---|---|---|
| AddButton | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| BoxIconButton | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| Button | Primary · Disabled | Clique chama `onClick`; desabilitado não chama |
| IconButton/Clear | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| IconButton/Close | Default | Clique chama `onClick` |
| IconButton/Confirm | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| IconButton/Delete | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| IconButton/Keep | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| IconButton/Plus | Default · Disabled | Clique chama `onClick`; desabilitado não chama |
| HamburgerButton | Default | Clique troca "Abrir menu" (`aria-expanded=false`) por "Fechar menu" (`true`) |
| Chip | Default | Clique marca e desmarca (`aria-pressed`) |
| DropdownSelectGroupBy/Item | Idle | Clique alterna `selected` |
| DropdownSelectLabel/Item | Idle | Clique alterna `active` (Clicked) |
| SidebarTagsItem | Idle | Clique seleciona e desfaz (`aria-pressed`) |
| Switch | Interactive · Disabled | Clique liga, Espaço desliga; desabilitado não chama `onCheckedChange` |
| Symbols/ArchiveItem | Idle · Disabled | Clique seleciona (`aria-pressed`, `onSelectedChange(true)`), Enter desfaz; desabilitado não seleciona |
| Symbols/FolderItem | Idle · Disabled | Idem ArchiveItem |
| Symbols/ImageItem | Idle · Disabled | Idem ArchiveItem |
| Symbols/VideoItem | Idle · Disabled | Idem ArchiveItem |
| TagOrgTemplateName | Placeholder | Digitar preenche o nome |
| TypeLabel (ScopeTypeLabel) | ScopeSelector | Clicar num chip inativo o ativa e desativa o anterior |
| AccordionItem | Expanded | Clique no resumo fecha; outro clique abre |
| ActionPill | Default · Disabled | Cada botão chama só o próprio `onClick`; desabilitado não chama |
| ArchiveBrowserModal/ListItem | Default | Clique seleciona a linha, Espaço desfaz (`aria-pressed`) |
| ArchiveBrowserModal/Search | Default | Busca aceita digitação; linha com `onClick` é clicável |
| CleanSpaceListSelection | Unselected | Checkbox marca e desmarca a linha |
| ContextHeader | Default | "Excluir" chama `onDelete`; "Limpar seleção" recolhe o header |
| DropListItem | Idle | Clique alterna `active` |
| DropdownSelectGroupBy | Default | Gatilho abre a lista; escolher "Tipo" fecha e mostra "Tipo" no gatilho |
| FaqTopicChips | Default | Tocar num chip o marca como ativo |
| FileArchiveCard | FileArchive2 | Clique e Enter chamam `onClick` |
| FileList | Default | Com `onClick`, clique e Enter na linha chamam o callback |
| FileListHeader | Home | Clique em "Armazenamento" inverte a ordenação (`asc`) |
| FileSelectRow | List | Tocar na linha marca o arquivo; o checkbox desmarca |
| FolderCard | Default | Clique no cabeçalho recolhe o grupo (`aria-expanded`) e esconde as miniaturas |
| FolderTagChip | Default · Removable · Disabled | Clique alterna `selected`; remover chama `onRemove`; desabilitado não chama |
| FreeModeAddMenu | Default | Escolher "Interssecção" chama `onSelect("intersseccao")` |
| OrganizeFreeModeCanvas/Buttons | Default | Cada botão chama o próprio callback |
| OrganizeFreeModeCanvas/ListItem | Idle | Clique alterna `selected` (`aria-pressed`) |
| OrganizeFreeModeCanvas/OutputNode | Default | "Prévia de arquivos" expande a lista (`aria-expanded`) |
| MobileFooterSettings | Interactive | Tocar numa seção a marca e desmarca a anterior |
| MobileTabBar | Interactive | Tocar numa aba a torna a atual (`aria-current="page"`) |
| NodeContextMenu/Item | Placeholder | Gatilho abre a lista; escolher opção preenche a pílula e fecha |
| NodeContextMenu | Default | E/OU trocam o operador; "Salvar Mudanças" chama `onSave` |
| PagePickerButton | Default | Clique chama `onClick` |
| PopoverNotification | Default | Fechar chama `onClose` |
| RadioButton | Group · Disabled | Clique marca só uma opção, seta ↑ troca; desabilitado não marca |
| SearchInput | Default · Disabled | Digitação atualiza o valor e chama `onChange`; desabilitado não aceita digitação |
| StorageStatus/Current | Default | "Comprar espaço" chama `onBuySpace` |
| StorageStatus | Interactive | Clicar em "Acesso Rápido" ativa o chip e troca a barra |
| TagColor | Default | Clique marca a cor; seta → marca e foca a próxima |
| TemplateCard | Default | Clique alterna `selected` (`aria-pressed`) |
| ArchiveBrowserModalSidebar | Default | Clicar em "Compartilhados" o torna ativo (`aria-current`) e chama `onActivePageChange` |
| CardLogin | Default | Digitar e-mail e senha, "Mostrar senha" troca o tipo do campo, "Entrar" chama `onSubmit` com os valores |
| CardNeedMoreHelp | Default | "Falar com o suporte" chama `onContactSupport` |
| CleanSpaceDuplicated | Default | "Excluir cópias" chama `onDeleteDuplicates` com o grupo da linha |
| CleanSpaceLargeFiles | Default | Checkbox marca a linha, "Selecionar todos" marca as 3, "Excluir" entrega as selecionadas e limpa a seleção |
| DropdownMenu | Sidebar | Escolher "Upload de arquivo" chama `onItemSelect` com o rótulo |
| Faq/InfoCard | Faq | "Recolher" esconde as perguntas e vira "Expandir" (`aria-expanded`, `onCollapsedChange(true)`); outro clique reabre |
| Faq/InfoCard/Collapsed | FirstSteps | O botão abre a lista de perguntas (`aria-expanded`) e fecha de novo |
| FileListContainer | Default | Clicar numa linha chama `onOpen` com a linha |
| Header | Navbar | "Organizar", "Guardar" e "Conta" chamam cada um o próprio callback |
| MobileBottomNav | Interactive | Tocar num destino o torna o atual (`aria-current="page"`); o FAB chama `onAction` |
| OrganizePanelDropZone | Idle | Digitar nomeia o template; arrastar vira `dragover`, soltar 2 arquivos vira `filled` e chama `onFilesDrop`; "Continuar" chama `onContinue` |
| PlanSelection | Default | "Mensal" troca intervalo e preços; "Melhorar" chama `onSelectPlan(max)` e torna o Max o plano atual |
| PreviewPane | Default | Fechar, "Salvar" e "Compartilhar" chamam cada um o próprio callback |
| RecoveryPending | Default | "Voltar para arquivos" chama `onBack` |
| SaveLongTermFileStorageSelectedFiles | Default | "Adicionar arquivos" chama `onAddFiles` |
| Sidebar | Default | Clicar numa página chama `onNavigate`; colapsar esconde a navegação, expandir traz de volta |
| Sidebar/Toggle | Expanded | Clique recolhe (`aria-expanded=false`), Enter expande |
| StorageSidebar | Default | "Comprar Espaço" chama `onBuySpace`; o cabeçalho recolhe o painel e esconde os botões |
| TemplateReviewModalItem | Collapsed | A seta expande (mostra o arquivo filho) e colapsa |
| UploadPopover | InProgress | "Pausar envio" e "Fechar" chamam cada um o próprio callback |
| UserProfileCard | Default | "Editar perfil" e "Trocar conta" chamam cada um o próprio callback |
| AppShell | MobileFiles | O ☰ do Header abre o drawer, Escape fecha |
| CleanSpaceStorage | Default | Excluir selecionado chama `onDeleteFile`, "Excluir cópias" chama `onDeleteDuplicates`, Fechar chama `onClose` |
| OrganizeFreeModeCanvas | Default | "Adicionar nodo" abre o menu de operações, escolher uma o fecha; "Salvar Template" chama `onSaveTemplate` |
| SaveLongTermFileStorage | Default | "Adicionar arquivos", "Continuar" e "Cancelar" chamam cada um o próprio callback |
| SaveOrganizationModal | Default | Clicar num método o seleciona (`aria-pressed`) e desmarca o anterior; "Continuar" chama `onContinue` |
| TemplateReviewModal | Default | 1ª pasta abre expandida; cada seta abre/fecha só a própria pasta; "Continuar" chama `onContinue` |
| Pages/Settings | Account | Clicar em "Armazenamento e plano" na Sidebar a torna a seção atual e troca o conteúdo |
| Pages/Onboarding | Welcome | Começar → mão → tema ("Escuro" marcado) → pronto; "Ir para a Home" chama `onFinish` |
| Pages/Home | GridMode (+ GridTablet, GridMobile) | Lista esconde a grade, Grade volta (`aria-pressed`) |
| Pages/Organization | DefaultMobile | Botão de método abre os cartões, escolher "Por data" fecha e atualiza o botão |
| Pages/Payment | Expanded (+ Tablet, Mobile) | "Seu armazenamento" recolhe (mostra "92% usado") e expande, sem mexer nas outras seções |
