import * as React from "react"

import { cn } from "@/lib/utils"
import { Header } from "@/components/organisms/header"
import { Sidebar, type SidebarProps } from "@/components/organisms/sidebar"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { Label } from "@/components/molecules/label"
import { ViewModeToggle, type ViewMode } from "@/components/molecules/view-mode-toggle"
import { FileArchiveCard } from "@/components/molecules/file-archive-card"
import { ImageItem } from "@/components/atoms/image-item"
import { SaveOrganizationModal, type SaveOrganizationModalProps } from "@/components/templates/save-organization-modal"
import type { HomePageGridItem } from "@/components/pages/home-page"

export interface OrganizationPageProps extends React.ComponentProps<"div"> {
  viewMode: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  sidebarProps: SidebarProps
  gridItems?: HomePageGridItem[]
  /** Modal `template/DialogSave/OrganizationModal` aberto por padrão (Figma-confirmado: composição sempre com o modal em overlay). */
  modalOpen?: boolean
  modalProps?: Omit<SaveOrganizationModalProps, "className">
}

/**
 * page/Organização (`1439:19678`) — Figma-confirmado via `get_metadata`
 * (reconciliação da camada `pages`, 2026-08-20): mesmo shell de
 * [[HomePage]] (Header + Sidebar + toolbar `DropdownSelect/GroupBy` +
 * `Label` + `ViewModeToggle` + grid `FileArchive1`/`FileArchive2`/
 * `ImageItem`), com 2 diferenças reais confirmadas — (1) **sem** breadcrumb
 * (nenhuma instância `Navigation - Breadcrumb` no node, diferente dos 3
 * nodes `page/Home/*`); (2) título é um `text` node solto ("Bem-vindo ao
 * Kandrive!"), sem a legenda que `PageLead` normalmente injeta abaixo —
 * implementado como H1 direto, não `PageLead` (Regra 9, não inventar
 * caption não confirmado). O node também inclui uma instância
 * `organism/DialogSave` (`1439:19695`, 1014×617) em overlay — o modal
 * `template/DialogSave/OrganizationModal` (antes `organism/DialogSave/
 * OrganizationModal`, ver reclassificação de 2026-08-20) — aberto por
 * padrão nesta composição.
 *
 * 🔧 Corrigido em 2026-08-22 (achado do usuário: "home está quebrando" —
 * mesma causa raiz de [[HomePage]], ver nota lá). `max-w-full`/
 * `min-h-screen` removidos — nenhum outro componente fixo-largura deste
 * catálogo usa essas classes; dentro do `<Canvas>` da Docs elas espremiam
 * Sidebar+conteúdo pra caber num container bem mais estreito que 1440px.
 */
function OrganizationPage({
  viewMode,
  onViewModeChange,
  sidebarProps,
  gridItems = [],
  modalOpen = true,
  modalProps,
  className,
  ...props
}: OrganizationPageProps) {
  return (
    <div data-slot="organization-page" className={cn("relative flex w-full flex-col bg-zinc-200", className)} {...props}>
      <Header page="navbar" />
      <div className="mx-auto flex w-[1376px] items-start gap-12 px-1 py-2.5">
        <Sidebar {...sidebarProps} />
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="flex-1 text-[2.5rem] leading-none font-bold text-black">Bem-vindo ao Kandrive!</h1>
            <div className="flex shrink-0 items-center gap-4">
              <DropdownSelectGroupBy />
              <Label />
              <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            {gridItems.map((item) =>
              item.kind === "image" ? (
                <ImageItem key={item.name} name={item.name} />
              ) : (
                <FileArchiveCard key={item.name} label={item.name} interactive={item.interactive} />
              )
            )}
          </div>
        </div>
      </div>
      {modalOpen ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <SaveOrganizationModal {...modalProps} />
        </div>
      ) : null}
    </div>
  )
}

export { OrganizationPage }
