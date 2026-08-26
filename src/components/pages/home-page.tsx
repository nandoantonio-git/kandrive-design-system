import * as React from "react"

import { cn } from "@/lib/utils"
import { Header } from "@/components/organisms/header"
import { Sidebar, type SidebarProps } from "@/components/organisms/sidebar"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import { PageLead } from "@/components/molecules/page-lead"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { Label } from "@/components/molecules/label"
import { ViewModeToggle, type ViewMode } from "@/components/molecules/view-mode-toggle"
import { FileArchiveCard } from "@/components/molecules/file-archive-card"
import { ImageItem } from "@/components/atoms/image-item"
import { FileListHeader } from "@/components/molecules/file-list-header"
import { FileList, type FileListProps } from "@/components/molecules/file-list"
import { FileListContainer, type FileListContainerRow } from "@/components/organisms/file-list-container"
import { PreviewPane, type PreviewPaneFile } from "@/components/organisms/preview-pane"
import { ContextHeader } from "@/components/molecules/context-header"
import { Icon } from "@/components/atoms/icon"

export interface HomePageGridItem {
  name: string
  kind: "folder" | "image"
  /** `molecule/FileArchive2` (`cursor-pointer` no ícone) vs. `FileArchive1` (estático) — Figma-confirmado, só se aplica a `kind="folder"`. */
  interactive?: boolean
}

export type HomePageListRow = Pick<FileListProps, "fileName" | "owner" | "size">

export interface HomePageProps extends React.ComponentProps<"div"> {
  viewMode: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  sidebarProps: SidebarProps
  gridItems?: HomePageGridItem[]
  listRows?: HomePageListRow[]
  columnsRows?: FileListContainerRow[]
  previewFile?: PreviewPaneFile
  /** `viewMode="list"` com uma seleção ativa (`page/Home/ListMode/Selected`, `1439:19810`) — troca o header de toolbar por `ContextHeader` e marca as linhas como selecionadas. */
  listSelectedCount?: number
  onListSelectionClear?: () => void
}

/**
 * page/Home/GridMode (`1439:19639`), page/Home/ListMode (`1439:19791`),
 * page/Home/Columns Mode/Item1 (`1439:19829`) — Figma-confirmado: 3 nodes
 * de página distintos no Figma, mas 90%+ do mesmo shell (Header + Sidebar +
 * Breadcrumb "Home" + `PageLead` + toolbar `DropdownSelect/GroupBy` +
 * `Label` + `ViewModeToggle`), variando só a área de conteúdo principal —
 * implementado aqui como **um componente único parametrizado por
 * `viewMode`** (mesmo critério já usado em `ViewModeToggle`/`Header`/
 * `Sidebar` — Regra 1/10, nunca um componente por variante quando a Figma
 * real já modela isso como eixo). `get_metadata` confirmado nos 3 nodes em
 * 2026-08-20 (reconciliação da camada `pages`): `viewMode="grid"` compõe
 * `molecule/FileArchive1`/`FileArchive2`/`ImageItem` soltos num grid;
 * `viewMode="list"` compõe `molecule/FileList/Header` + `molecule/FileList`
 * (`format="list"`) repetido; `viewMode="columns"` compõe
 * `organism/file-list-container` + `organism/preview-pane` lado a lado.
 *
 * Conteúdo de exemplo ("Arquivo 1"/"Arquivo 2"/"Arquivo 3") reaproveita a
 * mesma convenção já usada nas stories de `FileList`/`FileListContainer`/
 * `PreviewPane`/`ArchiveBrowserModal`, não inventado nesta reconciliação.
 *
 * 🔧 Corrigido em 2026-08-22 (achado do usuário: "home está quebrando",
 * visível na página Docs do Storybook em viewport estreito). Causa raiz:
 * `max-w-full`/`min-h-screen` — únicos 2 componentes deste catálogo com
 * essas classes (nenhum outro componente fixo-largura do design system as
 * usa). Dentro do bloco `<Canvas>` da Docs, o container disponível é
 * bem mais estreito que 1440px — `max-w-full` forçava a linha
 * Sidebar+conteúdo a encolher pra caber, espremendo a Sidebar (largura
 * própria fixa, não Figma-confirmada como flexível) a ponto de cortar seu
 * conteúdo visualmente. `min-h-screen` inflava a caixa pra 100vh mesmo com
 * conteúdo real bem mais curto, gerando a área cinza vazia extra visível
 * no mesmo achado. Ambos removidos — mesma convenção já usada em todo o
 * resto do catálogo (largura fixa Figma-confirmada, overflow horizontal
 * tratado pelo container que envolve o preview, nunca encolhido).
 */
function HomePage({
  viewMode,
  onViewModeChange,
  sidebarProps,
  gridItems = [],
  listRows = [],
  columnsRows = [],
  previewFile,
  listSelectedCount,
  onListSelectionClear,
  className,
  ...props
}: HomePageProps) {
  return (
    <div data-slot="home-page" className={cn("flex w-full flex-col bg-zinc-200 dark:bg-zinc-900", className)} {...props}>
      <Header page="navbar" />
      <div className="mx-auto flex w-[1376px] items-start gap-12 px-1 py-2.5">
        <Sidebar {...sidebarProps} />
        <div className="flex flex-1 flex-col gap-2">
          <Breadcrumb segments={["Home"]} />
          <div className="flex items-start justify-between gap-4">
            <PageLead
              title="Bem-vindo ao Kandrive!"
              caption="Seu espaço para guardar arquivos por anos, com organização simples desde o primeiro dia."
              className="flex-1"
            />
            <div className="flex shrink-0 items-center gap-4 self-stretch">
              <DropdownSelectGroupBy />
              <Label />
              <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
            </div>
          </div>
          <div className="pt-5">
            {viewMode === "grid" && gridItems.length === 0 ? (
              // page/FristUpload (`1439:19658`) — estado vazio Figma-confirmado
              // do próprio modo grid (mesmo shell/toolbar), não uma tela à
              // parte: círculo + `atom/Icon/CloudDownload` + texto de
              // instrução, centralizado. Derivado de `gridItems.length === 0`
              // em vez de uma prop de variante nova — mesmo dado já controla
              // os 2 estados.
              <div className="flex flex-col items-center gap-6 py-24 text-center">
                <div className="flex size-[267px] items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <Icon name="CloudDownload" className="size-[85px] text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1 text-zinc-500 dark:text-zinc-400">
                  <p>Arraste os arquivos que deseja armazenar</p>
                  <p>ou use o botão &quot;Adicionar&quot;</p>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="flex flex-wrap gap-8">
                {gridItems.map((item) =>
                  item.kind === "image" ? (
                    <ImageItem key={item.name} name={item.name} />
                  ) : (
                    <FileArchiveCard key={item.name} label={item.name} interactive={item.interactive} />
                  )
                )}
              </div>
            ) : viewMode === "list" ? (
              <div className="flex flex-col">
                {listSelectedCount != null ? (
                  // page/Home/ListMode/Selected (`1439:19810`) — `molecule/
                  // context-header` some acima do `FileListHeader` normal
                  // (não o substitui, Figma-confirmado: os 2 nós coexistem,
                  // hidden por padrão nos outros modos), linhas em
                  // `state="pressed"` (mesmo tratamento de seleção já usado
                  // em `FreeModeListItem`).
                  <ContextHeader
                    itemsSelected={`${listSelectedCount} itens selecionado`}
                    onClear={onListSelectionClear}
                    className="mb-2"
                  />
                ) : null}
                <FileListHeader format="home" />
                {listRows.map((row) => (
                  <FileList
                    key={row.fileName}
                    format="list"
                    state={listSelectedCount != null ? "pressed" : "idle"}
                    {...row}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-6">
                <FileListContainer rows={columnsRows} className="flex-1" />
                {previewFile ? <PreviewPane file={previewFile} className="w-96 shrink-0" /> : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { HomePage }
