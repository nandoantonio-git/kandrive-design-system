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
import { SaveOrganizationModal, type SaveOrganizationModalProps } from "@/components/templates/save-organization-modal"
import { OrganizePanelDropZone, type OrganizePanelDropZoneProps } from "@/components/organisms/organize-panel-drop-zone"
import { FolderCard, type FolderCardProps } from "@/components/molecules/folder-card"
import { PopoverNotification, type PopoverNotificationProps } from "@/components/molecules/popover-notification"
import type { HomePageGridItem } from "@/components/pages/home-page"

export type OrganizationPageStep = "default" | "template-drop-zone" | "saved"

export interface OrganizationPageProps extends React.ComponentProps<"div"> {
  viewMode: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  sidebarProps: SidebarProps
  gridItems?: HomePageGridItem[]
  /** Modal `template/DialogSave/OrganizationModal` aberto por padrão (Figma-confirmado: composição sempre com o modal em overlay). Só `step="default"`. */
  modalOpen?: boolean
  modalProps?: Omit<SaveOrganizationModalProps, "className">
  /**
   * `page/Organização/ModoData/*` — 3 telas Figma-confirmadas do mesmo
   * fluxo de "Organizar" (Regra 1/10, eixo único em vez de páginas
   * separadas): `default` (`1439:19678`, modal de salvar aberto),
   * `template-drop-zone` (`1439:19696`, arrastar itens pro painel de
   * template), `saved` (`Organização/ModoData/Organização/Saved`,
   * `1439:19717`, pasta criada + toast de notificação).
   */
  step?: OrganizationPageStep
  dropZoneProps?: OrganizePanelDropZoneProps
  folderCardProps?: FolderCardProps
  notificationProps?: PopoverNotificationProps
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
 *
 * `step` adicionado em 2026-08-23 (achado: 2 telas do fluxo "Organizar"
 * ainda não implementadas). `template-drop-zone` (`1439:19696`) tem
 * breadcrumb+`PageLead` reais (Figma-confirmado: "Home/Templates de
 * organização", "Organização"/"Organize seus arquivos em templates") —
 * diferente do `default` (sem breadcrumb, achado original desta página);
 * conteúdo é um grid pequeno (4 itens) + `organism/OrganizePanel/DropZone`
 * já existente, sem modal. `saved` mantém o padrão `default` (h1 solto,
 * sem breadcrumb — mesmo `Frame 36` com texto "Bem-vindo ao Kandrive!"
 * confirmado no node), troca o modal por `molecule/FolderCard` (pasta
 * criada) + `molecule/popover/Notification` (toast, canto inferior direito,
 * `1439:19748` — mesmo node que já origina o componente existente).
 */
function OrganizationPage({
  viewMode,
  onViewModeChange,
  sidebarProps,
  gridItems = [],
  modalOpen = true,
  modalProps,
  step = "default",
  dropZoneProps,
  folderCardProps,
  notificationProps,
  className,
  ...props
}: OrganizationPageProps) {
  return (
    <div data-slot="organization-page" className={cn("relative flex w-full flex-col bg-zinc-200", className)} {...props}>
      <Header page="navbar" />
      <div className="mx-auto flex w-[1376px] items-start gap-12 px-1 py-2.5">
        <Sidebar {...sidebarProps} />
        <div className="flex flex-1 flex-col gap-5">
          {step === "template-drop-zone" ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <Breadcrumb segments={["Home", "Templates de organização"]} className="w-full" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <PageLead title="Organização" caption="Organize seus arquivos em templates" className="flex-1" />
                <div className="flex shrink-0 items-center gap-4">
                  <DropdownSelectGroupBy />
                  <Label />
                  <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="flex flex-1 flex-wrap gap-8">
                  {gridItems.map((item) =>
                    item.kind === "image" ? (
                      <ImageItem key={item.name} name={item.name} />
                    ) : (
                      <FileArchiveCard key={item.name} label={item.name} interactive={item.interactive} />
                    )
                  )}
                </div>
                <OrganizePanelDropZone mode="Data" {...dropZoneProps} className={cn("w-[560px] shrink-0", dropZoneProps?.className)} />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <h1 className="flex-1 text-[2.5rem] leading-none font-bold text-black">Bem-vindo ao Kandrive!</h1>
                <div className="flex shrink-0 items-center gap-4">
                  <DropdownSelectGroupBy />
                  <Label />
                  <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
                </div>
              </div>
              {step === "saved" ? (
                <FolderCard {...folderCardProps} />
              ) : (
                <div className="flex flex-wrap gap-8">
                  {gridItems.map((item) =>
                    item.kind === "image" ? (
                      <ImageItem key={item.name} name={item.name} />
                    ) : (
                      <FileArchiveCard key={item.name} label={item.name} interactive={item.interactive} />
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {step === "default" && modalOpen ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <SaveOrganizationModal {...modalProps} />
        </div>
      ) : null}
      {step === "saved" ? (
        <PopoverNotification {...notificationProps} className={cn("absolute right-8 bottom-8", notificationProps?.className)} />
      ) : null}
    </div>
  )
}

export { OrganizationPage }
