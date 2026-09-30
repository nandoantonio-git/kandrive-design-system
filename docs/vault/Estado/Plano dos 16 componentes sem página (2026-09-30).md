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
| `atom/FileTypeIcon` (File, Folder, Image, Video) | `1444:21914` | Glifo das listas do modal "Liberar espaço" | Criar o átomo com os 4 tipos e usá-lo na lista. Correção do plano: os `Symbols` (`ImageItem`, `VideoItem`, `FolderItem`) são itens com estados, não este glifo; ficam como estão |
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

## Andamento

- ✅ **Lote 1 (2026-09-30).**
  - `atom/FileTypeIcon`: átomo com os 4 SVGs do Figma, usado como imagem para os gradientes não colidirem. Entrou na lista do "Liberar espaço" no lugar do glifo antigo (`CleanSpaceFileGlyph.svg`, removido). No vídeo, duas camadas de brilho duplicadas (1% a 5% de opacidade) ficaram de fora.
  - `molecule/MenuItemFloating`: o vidro flutuante, agora base do `DropdownMenu` e do `DropNewTag`. Saiu a borda reflexiva do `DropdownMenu`, que o Figma não tem.
  - `molecule/SelectBox`: extraído das Configurações. Virou um `<select>` nativo com a mesma aparência (antes era um `div` que só mostrava o texto), com rótulo nos campos de Idioma e Formato de data.
  - `molecule/SkeletonRow`: linha de carregamento, com pulso desligado em `prefers-reduced-motion`. Ainda não há tela de carregamento no código para usá-la.
- ✅ **Lote 2 (2026-09-30).**
  - `atom/DisclosureHeader`: a seta de abrir e fechar (direita/baixo), preto 25% como no Figma. O `SidebarToggle` passou a usá-la no lugar do `ChevronDown` do lucide, girando 180° quando aberto, como a instância do Figma.
  - `atom/SidebarOption`: as 7 opções com Default, Hover e Pressed. A gaveta do Mobile (`SidebarDrawer`) passou a usá-la; a altura foi de 28px para os 24px do Figma, com a área de toque ampliada. O hover passou para `Neutral/Surface/Muted`, como no Figma.
  - `molecule/StorageStatusHeaderSelector`: a linha de chips do `StorageStatus`, agora um grupo com rótulo; espaço entre chips de 8px para os 10px do Figma.
  - `atom/FreeModeButton`: o "+ Adicionar regra" do painel de regras, que usava o `AddButton` (outro componente). ⚠️ rótulo em 16px (Figma: 10px), pela Regra 4.
- ✅ **Lote 3 (2026-09-30).**
  - `organism/Footer`: rodapé com "©2026 Kandrive" e o `SelectBox` de idioma. Entrou onde o Figma mostra: Configurações e FAQ (tablet e desktop) e as telas Tablet de Home, Organizar, Armazenamento e Pagamento. O Pagamento tinha no desktop um rodapé só com o texto, que não existe no Figma e saiu. A variante `minimal` existe, mas nenhuma tela a usa.
  - `organism/StorageStatusSection`: o card e a lista da página de Armazenamento, que antes eram empilhados pela própria página.
  - `organism/PageToolbar`: título + Agrupar + Etiquetar + Visualizar, que estava copiado na Home e na Organization. Na Organization, o título "Bem-vindo ao Kandrive!" era um `h1` em negrito, fora do `PageLead` Regular das outras telas; agora é o mesmo componente.
  - `molecule/SearchHeader`: busca + filtros + Agrupar + Etiquetar. Saiu de dentro do `StorageStatusSummary` e entrou no modal Arquivo, que no Figma tem essa linha completa e no código tinha só a busca. O texto do campo no modal continua o termo aprovado "Buscar arquivos, pastas ou templates".

**Os 12 componentes planejados estão entregues.** Os 4 do grupo C seguem só registrados.
