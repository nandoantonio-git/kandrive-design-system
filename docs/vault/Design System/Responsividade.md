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

## Pendências de desenho (Nando)

- **F5:** opção "Mão dominante" em Settings/Appearance, nos 3 dispositivos.
- **F6:** barra de links rápidos para os tópicos do FAQ mobile. O `organism/FaqFastLinks` do desktop pode servir de ponto de partida.
- **F8:** onboarding com a configuração inicial (mão dominante etc.).
- **F9:** contraste dos rótulos inativos do `MobileBottomNav` no Light (`Neutral/Text/Placeholder`, abaixo do WCAG AA).

Ver também [[Camadas Atômicas]], [[Fonte Figma]], [[Regra 4 - Tipografia e Acessibilidade]].
