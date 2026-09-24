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
| LongTermStorage/Intro ↔ Stored / RecoveryPending | D+T ↔ Mobile | 🧩 a confirmar | — |
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

## Lotes futuros de código

- **Organize mobile (composições próprias do Figma):** `Organize/ChooseMethod/Mobile` (seletor de método + lista com checkbox), `Organize/Review/Mobile` (cards com os selos Duplicado, Incongruente e OK, e as ações Renomear e Editar), `Organize/ReviewDone/Mobile` e `Organize/Saved/Mobile` (lista agrupada por ano). Hoje, no mobile, o código mostra as 3 etapas do desktop adaptadas (Q26, 2026-09-24).
- **Long-term mobile:** as telas próprias do Figma (`LongTermStorage/SelectFiles`, `SelectFilesSelected`, `Stored` e `RecoveryPending`). Hoje, no mobile, o código mostra os dois modais adaptados (`SaveLongTermFileStorage` e `ArchiveBrowserModal`).
- **Bug (já existia antes):** em `ArchiveBrowserModalSidebar`, o bloco "Etiquetas" aparece espremido ao lado da lista de navegação, em vez de ficar abaixo dela. Acontece em todas as larguras.
- **Login mobile (composição própria do Figma, `Auth/Login/Mobile`):** fundo teal inteiro, a ilustração do Kan com o logo, o formulário sem card e o botão "Entrar" escuro. Hoje, no mobile, o código mostra o card do desktop em largura fluida.
- **Storage:** a lista de arquivos abaixo do card (filtro, Agrupar e Etiquetar), que está no Figma mobile, e as telas LimitReached e ManageSpace, que não existem no código.

## Pendências de desenho (Nando)

- **F5:** opção "Mão dominante" em Settings/Appearance, nos 3 dispositivos.
- **F6:** barra de links rápidos para os tópicos do FAQ mobile. O `organism/FaqFastLinks` do desktop pode servir de ponto de partida.
- **F8:** onboarding com a configuração inicial (mão dominante etc.).
- **F11 (Figma):** nas telas Home/Grid/Mobile e Home/List/Mobile, trocar o `atom/SortButton` (e a cópia solta "Ordenar por") pelo `molecule/DropdownSelect/GroupBy` `Device=Mobile` (decisão da Fase 4 e Q25). O `SortButton` fica como candidato a descarte.
- **F12 (decidir):** na etapa de arrastar do Organize no mobile, o painel tem Cancelar/Continuar e o BottomNav tem o FAB ✓/✕: são duas ações iguais. Manter só o FAB no mobile?
- **F10 (to-do, pensar):** o que aparece ao tocar na foto de perfil no Header mobile, em Light e Dark. Hoje o avatar não abre nada. Decidir o conteúdo (conta, plano, sair…) e o formato (menu, folha inferior, tela).
- **F9:** contraste dos rótulos inativos do `MobileBottomNav` no Light (`Neutral/Text/Placeholder`, abaixo do WCAG AA).

Ver também [[Camadas Atômicas]], [[Fonte Figma]], [[Regra 4 - Tipografia e Acessibilidade]].
