---
tags: [design-system, decisão]
---

# Responsividade

Decisões de 2026-09-24, tomadas numa entrevista (grill) com o Nando. A versão completa, com um indicador de breakpoint ao vivo, está no Storybook em `Tokens/Responsividade` (`stories/tokens/Responsividade.mdx`).

## Decisões

| Tema | Decisão |
| --- | --- |
| Breakpoints | Mobile < 720 · Tablet 720–1199 (`tablet:`, 45rem) · Desktop ≥ 1200 (`desktop:`, 75rem). Os frames do Figma (390/720/1440) caem cada um na própria faixa |
| Entre faixas | Fluido: a Sidebar mantém a largura do Figma e o conteúdo preenche o resto. Acima de 1440 o layout fica centralizado (`--container-page`) |
| Navegação | Desktop e Tablet: Header + Sidebar (+ Footer). Mobile: ☰ abre a gaveta em todas as telas, menos as de feedback visual. **MobileTabBar** traz as ações principais (só na Home). **MobileBottomNav** é o menu contextual com FAB: Adicionar em arquivos e Storage, Confirmar nas tarefas, e cancelar volta para a Home. **MobileFooterSettings** (chips) em Settings e Payment. FAQ sem barra |
| Itens no mobile | BottomNav: Pessoal · Compartilhados · Recentes · Favoritos. Gaveta: Guardados · Armazenamento · Etiquetas, depois Lixeira, depois Configurações · Ajuda |
| Componentes | Híbrido: CSS para layout e densidade, `AppShell` troca a navegação, prop `device` só onde o Figma diverge |
| Telas ausentes | 3 tipos: estado (vale em todos), fluxo equivalente (par documentado) e exclusivo (por espaço) |
| Mão dominante | Settings → Aparência, e no futuro o onboarding. Afeta só o FAB (`hand`) |
| Toque e tipo | A escala de tipo é a mesma em todas as faixas (Regra 4). Área de toque de 44×44px em `pointer: coarse` (`touch-target`, `touch:`) |
| Storybook | Viewports 390/720/1440. Stories Desktop/Tablet/Mobile nas páginas |

## Classificação das telas (Figma V0.2.1)

| Tela | Existe em | Tipo | Nos dispositivos que faltam |
| --- | --- | --- | --- |
| Home/GridLoading, ListLoading, NetworkError, SearchNoResults | Mobile | Estado | valem em Desktop e Tablet |
| Home/GridLeftHand | Mobile | Estado (mão esquerda) | só mobile, porque o FAB só existe no mobile |
| Home/GridNoResults, ListSelected | Desktop + Tablet | Estado | valem no Mobile |
| Home/ColumnsDetails | Desktop + Tablet | Exclusivo | no Mobile não há Colunas |
| Organize/DropZone ↔ Organize/Review | D+T ↔ todos | Fluxo equivalente | no Mobile, o arrastar vira a revisão |
| Organize/ReviewDone | Mobile | Estado (feedback) | vale em todos |
| LongTermStorage/ArchiveBrowser ↔ SelectFiles (+Selected) | D+T ↔ Mobile | Fluxo equivalente | modal no desktop, tela cheia no mobile |
| LongTermStorage/Stored, RecoveryPending | Mobile | Estado | valem em todas as larguras (Stored é feedback visual) |
| Storage/Current, Storage/LongTerm | Desktop | Estado | no Mobile e no Tablet usam o layout de Storage/Total |
| Storage/LimitReached, Settings/DeleteAccount | Desktop + Mobile | Estado | valem no Tablet |
| Storage/ManageSpace | Desktop + Tablet | Estado | vale no Mobile |

## Mudanças no Figma já feitas (R0)

- F1: `MobileFooterSettings` ganhou o eixo `Active`, e as 14 telas de Settings mobile usam instâncias. O chip canônico é o `atom/Chip` Solid.
- F2: Home/Grid mobile usa a instância do `MobileTabBar`.
- F3: a gaveta virou `organism/Sidebar Device=Mobile`.
- F4: `atom/SidebarOption` ganhou as opções Tags, Settings e Help.
- F7: telas `Home/Drawer/Mobile` (Light e Dark).

## Decisões de código na Home (R3, 2026-09-24)

- O `TypeLabel` fica no código, porque é usado em 6 componentes. O descarte decidido na auditoria valia só para o Figma.
- A Home mobile usa o `DropdownSelectGroupBy device="mobile"`, e não o SortButton.
- A visualização Colunas não existe no mobile: cai para Lista.
- Os nomes nas linhas `FileRow` têm 16px (Regra 4; no Figma, 13px).
- Os rótulos do TabBar têm 11px (piso de microtexto; no Figma, 10px).

## Composições mobile próprias já feitas

- **Login (2026-09-24):** `CardLogin device="mobile"` e `LoginPage` com fundo teal (`brand-teal-action`, superfície), as manchas desfocadas, o Kan com o logo (`login-mobile-kan.svg`) e o formulário sem card. "Entrar" usa `Brand/Secondary/Default` no Light e `Brand/Secondary/Dark` no Dark, como no Figma. O `device` é escolhido pelo `useMinWidth("tablet")`, para não duplicar o formulário no DOM.
- **Organize (2026-09-24):** a página escolhe a composição pelo `useMinWidth("tablet")`. `default` → ChooseMethod (`MethodOrganizeButton`, "Ordenar por" com o `DropdownSelectGroupBy` mobile, "Página" e a lista `FileSelectRow`). `template-drop-zone` e `review` → Review (`TemplateReviewModal device="mobile"`). `review-done` → `atom/MobileSuccess` em tela cheia, sem gaveta (vale em todas as larguras). `saved` → `FolderCard device="mobile"` com `FileRow`, sem o toast. Pelo Figma, a TabBar fica em "Organizar" nas etapas de tarefa, e em Home no `saved`. Etapa nova `review` também no desktop e no tablet (modal por cima da composição de arrastar). Tokens novos: `Neutral/Border/Subtle` e `Neutral/Surface/Card`.
- **Long-term (2026-09-24):** página nova `LongTermStoragePage` (`step`: intro · archive-browser · stored · recovery-pending). Desktop e tablet: a Home com o modal por cima (`HomePage` ganhou `overlay`). Mobile: os dois modais viram `SelectFiles` (`FileSelectList` + `PagePickerButton`, e o `ContextHeader layout="minimal"` quando há seleção). `stored` usa o `MobileSuccess` Stored em tela cheia; `recovery-pending` usa o organism `RecoveryPending` (o Kan espiando da bolsa, redesenhado em SVG porque no Figma é raster). `FileSelectList` e `PagePickerButton` foram extraídos e agora servem também ao Organize. Tokens novos: `Brand/Primary/Mid` e `Brand/Primary/Disabled`. Corrigido o bug do bloco "Etiquetas" ao lado da lista no `ArchiveBrowserModalSidebar` (faltava `flex-col`).
- **Storage (2026-09-24):** organism novo `StorageStatusSummary` (Figma `molecule/StorageStatusSummary`): filtro do escopo, filtros, Agrupar, Etiquetar e a lista por armazenamento, abaixo do card em todas as larguras (antes o código não tinha essa parte). No mobile, a lista vira uma tabela em card. `StorageStatus` ganhou `limitReached` (Figma `Tier=Alert`). A página ganhou `files`, `limitReached` (no mobile, tela própria `Storage/LimitReached/Mobile`) e `manageSpaceOpen` (modal `CleanSpaceStorage`). Os modais `CleanSpaceStorage` ganharam blur de fundo e rolagem.

## Lotes futuros de código

- Nenhum lote de composição mobile pendente. Restam as pendências de desenho abaixo.

## Pendências de desenho (Nando)

- **F5:** opção "Mão dominante" em Settings/Appearance, nos 3 dispositivos.
- **F6:** barra de links rápidos para os tópicos do FAQ mobile. O `organism/FaqFastLinks` do desktop pode servir de ponto de partida.
- **F8:** onboarding com a configuração inicial (mão dominante etc.).
- ~~**F11 (Figma)**~~ ✅ corrigido no Figma em 2026-09-24: nas telas Home/Grid/Mobile e Home/List/Mobile, trocar o `atom/SortButton` (e a cópia solta "Ordenar por") pelo `molecule/DropdownSelect/GroupBy` `Device=Mobile` (decisão da Fase 4 e Q25). O `SortButton` fica como candidato a descarte.
- ~~**F12**~~ resolvido pelo próprio Figma: no mobile não há etapa de arrastar; a etapa mostra a revisão, só com o FAB ✓/✕.
- **F16 (novo):** no `FolderCard` Dark, o rótulo "Pasta" fica quase invisível.
- **F10 (decidido, fase C):** o que aparece ao tocar na foto de perfil no Header mobile, em Light e Dark. Hoje o avatar não abre nada. Decidir o conteúdo (conta, plano, sair…) e o formato (menu, folha inferior, tela).
- ~~**F13 (Figma)**~~ ✅ corrigido no Figma em 2026-09-24: `LongTermStorage/SelectFilesSelected/Mobile` marca "Organizar" na TabBar, e `SelectFiles` marca "Guardar". O código usa Guardar nas duas.
- ~~**F14**~~ ✅ corrigido no Figma e no código em 2026-09-24 com `Brand/Primary/Dark`. Em `RecoveryPending` Dark, o nome do arquivo usa `Brand/Primary/Mid` (#337084 nos dois modos), com pouco contraste sobre o fundo escuro.
- ~~**F15 (Figma)**~~ ✅ corrigido no Figma em 2026-09-24: no `molecule/StorageStatus Tier=Alert`, o aviso de limite usa `Brand/Feedback/Danger/Subtle` (35%, ilegível); a tela `Storage/LimitReached` sobrescreve com o vermelho cheio. Os botões Liberar/Comprar aparecem Disabled em todas as variantes do componente.
- ~~**F9**~~ ✅ corrigido no Figma e no código em 2026-09-24. Contraste dos rótulos inativos do `MobileBottomNav` no Light (`Neutral/Text/Placeholder`, abaixo do WCAG AA).

Ver também [[Camadas Atômicas]], [[Fonte Figma]], [[Regra 4 - Tipografia e Acessibilidade]].
