import * as React from "react"

import { cn } from "@/lib/utils"
import { AppShell } from "@/components/templates/app-shell"
import { ThumbnailLarge } from "@/components/molecules/thumbnail-large"
import { FileRow } from "@/components/molecules/file-row"
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
  /** Camada por cima da Home (ex. o modal de Guardar no longo prazo). Usada por `LongTermStoragePage`. */
  overlay?: React.ReactNode
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
 *
 * 🔁 Responsividade (2026-09-24): a página agora usa o `AppShell`, com layout
 * fluido e máximo de 1440px. No mobile (< 720):
 * - some a Breadcrumb e o `PageLead`;
 * - a barra de ferramentas vira GroupBy compacto + visualização compacta (Grade e Lista);
 * - a grade vira cards `ThumbnailLarge` numa coluna;
 * - a lista vira linhas `FileRow`, e Colunas cai para Lista;
 * - entram o `MobileTabBar` no topo e o `MobileBottomNav` com FAB Adicionar na base.
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
  overlay,
  className,
  ...props
}: HomePageProps) {
  // Colunas é exclusivo de tablet e desktop: no mobile, cai para Lista.
  const mobileMode: ViewMode = viewMode === "columns" ? "list" : viewMode
  const empty = viewMode === "grid" && gridItems.length === 0
  return (
    <AppShell
      data-slot="home-page"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "navbar" }}
      sidebar={<Sidebar {...sidebarProps} />}
      mobileTabBar={{ active: "home" }}
      mobileBottomNav={{ action: "add", active: "pessoal" }}
      {...props}
    >
      <Breadcrumb segments={["Home"]} className="hidden tablet:flex" />
      <div className="flex items-center justify-between gap-4 tablet:flex-col tablet:items-start desktop:flex-row">
        <PageLead
          title="Bem-vindo ao Kandrive!"
          caption="Seu espaço para guardar arquivos por anos, com organização simples desde o primeiro dia."
          className="hidden flex-1 tablet:flex"
        />
        {/* Desktop e tablet: GroupBy + Etiquetas + as 3 visualizações */}
        <div className="hidden shrink-0 items-center gap-4 tablet:flex desktop:self-stretch">
          <DropdownSelectGroupBy />
          <Label />
          <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
        </div>
        {/* Mobile (Figma Home/Grid/Mobile): GroupBy compacto + visualização compacta (Grade e Lista) */}
        <div className="flex w-full items-center justify-between gap-2.5 tablet:hidden">
          <DropdownSelectGroupBy device="mobile" />
          <ViewModeToggle size="compact" mode={mobileMode} onModeChange={onViewModeChange} />
        </div>
      </div>

      <div className="tablet:pt-5">
        {empty ? (
          // page/FristUpload (`1439:19658`) — estado vazio Figma-confirmado do
          // próprio modo grid, derivado de `gridItems.length === 0`.
          <div className="flex flex-col items-center gap-6 py-12 text-center tablet:py-24">
            <div className="flex size-48 items-center justify-center rounded-full bg-zinc-100 tablet:size-[267px] dark:bg-zinc-800">
              <Icon name="CloudDownload" className="size-16 text-zinc-400 tablet:size-[85px] dark:text-zinc-500" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1 text-neutral-text-tertiary dark:text-zinc-400">
              <p>Arraste os arquivos que deseja armazenar</p>
              <p>ou use o botão &quot;Adicionar&quot;</p>
            </div>
          </div>
        ) : null}

        {!empty && viewMode === "grid" ? (
          <>
            <div className="hidden flex-wrap gap-8 tablet:flex">
              {gridItems.map((item) =>
                item.kind === "image" ? (
                  <ImageItem key={item.name} name={item.name} />
                ) : (
                  <FileArchiveCard key={item.name} label={item.name} interactive={item.interactive} />
                )
              )}
            </div>
            {/* Mobile: cards grandes numa coluna (Figma molecule/ThumbnailLarge Type=Metadata) */}
            <div className="flex flex-col gap-2.5 tablet:hidden">
              {gridItems.map((item) => (
                <ThumbnailLarge key={item.name} fileName={item.name} fileType={item.kind === "image" ? "image" : "document"} className="w-full max-w-none" />
              ))}
            </div>
          </>
        ) : null}

        {viewMode === "list" || viewMode === "columns" ? (
          <>
            {viewMode === "list" ? (
              <div className="hidden flex-col tablet:flex">
                {listSelectedCount != null ? (
                  // page/Home/ListMode/Selected (`1439:19810`): `ContextHeader`
                  // acima do `FileListHeader`, linhas em `state="pressed"`.
                  <ContextHeader
                    itemsSelected={`${listSelectedCount} itens selecionado`}
                    onClear={onListSelectionClear}
                    className="mb-2"
                  />
                ) : null}
                <FileListHeader format="home" />
                {listRows.map((row) => (
                  <FileList key={row.fileName} format="list" state={listSelectedCount != null ? "pressed" : "idle"} {...row} />
                ))}
              </div>
            ) : (
              <div className="hidden items-start gap-6 tablet:flex">
                <FileListContainer rows={columnsRows} className="flex-1" />
                {previewFile ? <PreviewPane file={previewFile} className="w-96 shrink-0" /> : null}
              </div>
            )}
            {/* Mobile: linhas FileRow (Figma molecule/FileRow Device=Mobile). Colunas cai para Lista. */}
            <div className="flex flex-col gap-2 tablet:hidden">
              {(viewMode === "list" ? listRows : columnsRows.map((r) => ({ fileName: r.name, owner: undefined, size: undefined }))).map((row) => (
                <FileRow key={row.fileName} name={row.fileName} meta={[row.owner, row.size].filter(Boolean).join(" • ") || "Arquivo"} />
              ))}
            </div>
          </>
        ) : null}
      </div>
      {overlay}
    </AppShell>
  )
}

export { HomePage }
