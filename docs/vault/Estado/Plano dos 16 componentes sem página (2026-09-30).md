---
tags: [estado, plano]
---

# Plano dos 16 componentes sem página no Storybook (2026-09-30)

Origem: [[Auditoria final (2026-09-30)]]. Decisões do usuário: implementar os grupos A e B (12 componentes) e refatorar o código que hoje os escreve por dentro de outros componentes; o grupo C fica só registrado. A ordem é por risco: cada lote termina com testes, comparação com o Figma e publicação antes do próximo.

## Grupo C · sem uso (só registro)

Não aparecem em nenhuma tela nem dentro de outro componente do Figma. Entram no Storybook se um dia forem usados.

| Componente | Nó |
|---|---|
| `atom/SortButton` | `1715:9521` |
| `atom/Divider` | `3028:3712` |
| `organism/DropdownMenuSimple` | `1485:21075` |
| `organism/PlanCard` (Free, Advanced, Pro) | `3029:3965` |

## Lote 1 · só ganham página, sem mudar tela (risco baixo)

| Componente | Nó | Onde está hoje | O que fazer |
|---|---|---|---|
| `atom/FileTypeIcon` (File, Folder, Image, Video) | `1444:21914` | `Atoms/Symbols/ImageItem`, `VideoItem`, `FolderItem`, e dentro do modal "Liberar espaço" | Criar o átomo com os 4 tipos. Os `Symbols` passam a ser casos dele, e a página antiga aponta para a nova |
| `molecule/MenuItemFloating` | `1363:16485` | O vidro de `organism/DropdownMenu` e `organism/DropNewTag`, escrito em cada um | Criar o contêiner de vidro flutuante e usá-lo nos dois |
| `molecule/SelectBox` | `3029:3847` | Escrito dentro de `pages/settings-page.tsx` (Idioma) | Extrair para `molecules/select-box.tsx`, com página e teste de teclado |
| `molecule/SkeletonRow` | `3028:3722` | Tela `Home/ListLoading/Mobile` (só no Figma) | Criar a linha de carregamento, com `prefers-reduced-motion` |

## Lote 2 · refatoram componentes que já existem (risco médio)

| Componente | Nó | Dentro de | O que fazer |
|---|---|---|---|
| `atom/DisclosureHeader` (Expanded true/false) | `95:3068` | `organism/Sidebar`, `organism/StorageSidebar`, `organism/SidebarToggle` | Extrair o cabeçalho que abre e fecha ("Armazenamento" e as etiquetas); manter `aria-expanded` |
| `atom/SidebarOption` (21 variantes: opção × Default/Hover/Pressed) | `1643:23462` | `organism/SidebarDrawer` (Mobile) | Extrair a opção de menu com os estados do Figma e as interações que o Figma já define |
| `molecule/StorageStatusHeaderSelector` | `890:9869` | `molecule/StorageStatus` e `organism/StorageStatusSection` | Extrair a linha de chips Total, Acesso rápido e Longo prazo |
| `atom/FreeModeButton` (Default, Hover, Pressed, Disabled) | `1384:16745` | `molecule/NodeContextMenu`, `template/OrganizeFreeModeCanvas` | Extrair a pílula escura do modo livre ("Tamanho", "Maior que") |

## Lote 3 · composições de página (risco maior, mudam telas)

| Componente | Nó | Telas | O que fazer |
|---|---|---|---|
| `organism/Footer` (Full e Minimal, Tablet e Desktop) | `1431:17284` | 33 telas (Configurações, FAQ, Pagamento) | Extrair o rodapé que hoje é montado pela página; `AppShell` já tem o espaço `footer` |
| `organism/StorageStatusSection` (Wide e Compact) | `1742:25328` | 6 telas de Armazenamento | Juntar o `StorageStatus` e o `StorageStatusSummary` como no Figma |
| `organism/PageToolbar` | `3029:3980` | 4 telas (Home, Guardar) | Extrair a barra Agrupar + Etiquetar + Visualizar, que hoje é escrita na Home, com a lista flutuando por cima do conteúdo |
| `molecule/SearchHeader` | `1755:56081` | Tela Arquivo (`LongTermStorage/ArchiveBrowser/Desktop`) | Extrair a busca com filtro e os menus do navegador de arquivos |

## Critério de pronto, por componente

- Página no grupo certo do Storybook, com link Figma, Uso, Composição e Estados, e 🧩 no que não está desenhado.
- Histórias com teste de interação e o axe sem erros.
- O componente que o escrevia por dentro passa a usá-lo, sem mudança visual (conferido com captura antes e depois).
- Nota no vault quando houver divergência com o Figma.

Ver [[Plano das pendências (2026-09-29)]].
