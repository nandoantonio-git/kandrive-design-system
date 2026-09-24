import * as React from "react"
import { ChevronDown, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppShell } from "@/components/templates/app-shell"
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
import { TemplateReviewModal, type ReviewItem } from "@/components/templates/template-review-modal"
import { MethodOrganizeButton, MOBILE_ORGANIZE_METHODS, type MobileOrganizeMethod } from "@/components/molecules/method-organize-button"
import { FileSelectRow } from "@/components/molecules/file-select-row"
import type { FileRowProps } from "@/components/molecules/file-row"
import { MobileSuccess } from "@/components/atoms/mobile-success"
import { useMinWidth } from "@/lib/use-min-width"
import PagePickerGlyph from "@/assets/icons/PagePickerGlyph.svg?react"
import type { HomePageGridItem } from "@/components/pages/home-page"

export type OrganizationPageStep = "default" | "template-drop-zone" | "review" | "review-done" | "saved"

export interface OrganizationMobileFile {
  name: string
  /** Ex.: "4.2 MB". */
  meta: string
}

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
  /** Itens da revisão (`review`, `review-done` e, no mobile, `template-drop-zone`). */
  reviewItems?: ReviewItem[]
  /** Mobile, `default`: a lista "Selecionar arquivos". */
  mobileFiles?: OrganizationMobileFile[]
  /** Mobile, `default`: método inicial do seletor. */
  mobileMethod?: MobileOrganizeMethod
  /** Mobile, `saved`: o grupo criado (ex. "2000") e as linhas dele. */
  savedGroup?: { label: string; rows: FileRowProps[] }
  /** `review-done`: arquivo exibido na confirmação ("✓ Backup_Documentos.tar"). */
  organizedFileName?: string
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
  reviewItems = [],
  mobileFiles = [],
  mobileMethod = "projeto",
  savedGroup,
  organizedFileName,
  className,
  ...props
}: OrganizationPageProps) {
  const tablet = useMinWidth("tablet")
  const task = step !== "saved"
  if (!tablet) {
    return (
      <OrganizationPageMobile
        step={step}
        className={className}
        reviewItems={reviewItems}
        mobileFiles={mobileFiles}
        mobileMethod={mobileMethod}
        savedGroup={savedGroup}
        organizedFileName={organizedFileName}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        {...props}
      />
    )
  }
  const toolbar = (
    <>
      <div className="hidden shrink-0 items-center gap-4 tablet:flex">
        <DropdownSelectGroupBy />
        <Label />
        <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
      </div>
      <div className="flex w-full items-center justify-between gap-2.5 tablet:hidden">
        <DropdownSelectGroupBy device="mobile" />
        <ViewModeToggle size="compact" modes={["grid", "list"]} mode={viewMode === "columns" ? "list" : viewMode} onModeChange={onViewModeChange} />
      </div>
    </>
  )
  const grid = (
    <div className="flex flex-1 flex-wrap gap-6 tablet:gap-8">
      {gridItems.map((item) =>
        item.kind === "image" ? (
          <ImageItem key={item.name} name={item.name} />
        ) : (
          <FileArchiveCard key={item.name} label={item.name} interactive={item.interactive} />
        )
      )}
    </div>
  )
  return (
    <AppShell
      data-slot="organization-page"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "navbar" }}
      sidebar={<Sidebar {...sidebarProps} />}
      // Mobile: salvar e arrastar são tarefa (Confirmar + ✕, cancelar volta para a Home, sem TabBar);
      // "salvo" volta ao modo de arquivos (TabBar + Adicionar), como em Organize/Saved/Mobile.
      mobileTabBar={task ? undefined : { active: "organize" }}
      mobileBottomNav={task ? { action: "confirm", active: "pessoal" } : { action: "add", active: "pessoal" }}
      {...props}
    >
      {step === "template-drop-zone" || step === "review" || step === "review-done" ? (
        <>
          <Breadcrumb segments={["Home", "Templates de organização"]} className="hidden w-full tablet:flex" />
          <div className="flex flex-col items-start justify-between gap-4 desktop:flex-row">
            <PageLead title="Organização" caption="Organize seus arquivos em templates" className="flex-1" />
            {toolbar}
          </div>
          {/* Mobile e tablet: o painel de arrastar vai para baixo da grade. */}
          <div className="flex flex-col items-start gap-6 desktop:flex-row desktop:gap-8">
            {grid}
            <OrganizePanelDropZone mode="Data" {...dropZoneProps} className={cn("w-full shrink-0 desktop:w-[560px]", dropZoneProps?.className)} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start justify-between gap-4 desktop:flex-row">
            <h1 className="hidden flex-1 text-[2.5rem] leading-none font-bold text-black tablet:block dark:text-zinc-100">Bem-vindo ao Kandrive!</h1>
            {toolbar}
          </div>
          {step === "saved" ? <FolderCard {...folderCardProps} /> : grid}
        </>
      )}

      {step === "review" ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 p-6">
          <TemplateReviewModal items={reviewItems} className="h-auto max-h-[613px] w-full max-w-[768px]" />
        </div>
      ) : null}
      {step === "review-done" ? <OrganizedFeedback fileName={organizedFileName} /> : null}
      {step === "default" && modalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 p-4 tablet:absolute">
          <SaveOrganizationModal {...modalProps} />
        </div>
      ) : null}
      {step === "saved" ? (
        <PopoverNotification
          {...notificationProps}
          className={cn("fixed right-4 bottom-[176px] left-4 z-30 mx-auto tablet:absolute tablet:right-8 tablet:bottom-8 tablet:left-auto", notificationProps?.className)}
        />
      ) : null}
    </AppShell>
  )
}

/** `Organize/ReviewDone`: feedback de tela cheia, fixo na paleta Light (sem `dark:`). */
function OrganizedFeedback({ fileName }: { fileName?: string }) {
  return (
    <div data-slot="organize-review-done" className="fixed inset-0 z-50 flex items-center justify-center bg-[#007e96] px-4">
      <MobileSuccess message="organized" fileName={fileName} />
    </div>
  )
}

type OrganizationPageMobileProps = Pick<
  OrganizationPageProps,
  "step" | "reviewItems" | "mobileFiles" | "mobileMethod" | "savedGroup" | "organizedFileName" | "viewMode" | "onViewModeChange"
> &
  Omit<React.ComponentProps<"div">, "children">

/** As composições mobile do Figma V0.2.1 (ver `OrganizationPage`). */
function OrganizationPageMobile({
  step = "default",
  reviewItems = [],
  mobileFiles = [],
  mobileMethod = "projeto",
  savedGroup,
  organizedFileName,
  viewMode,
  onViewModeChange,
  className,
  ...props
}: OrganizationPageMobileProps) {
  const [method, setMethod] = React.useState<MobileOrganizeMethod>(mobileMethod)
  const [methodsOpen, setMethodsOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set())
  const toggle = (name: string, checked: boolean) =>
    setSelected((previous) => {
      const next = new Set(previous)
      if (checked) next.add(name)
      else next.delete(name)
      return next
    })

  const saved = step === "saved"
  const review = step === "template-drop-zone" || step === "review" || step === "review-done"
  const heading = "text-[1.5625rem] leading-[30px] font-medium text-neutral-text-primary"
  const lead = "text-base leading-5 text-neutral-text-secondary"
  const caption = "text-[0.6875rem] leading-4 text-neutral-text-tertiary"

  return (
    <AppShell
      data-slot="organization-page"
      data-device="mobile"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "navbar" }}
      mobileTabBar={{ active: saved ? "home" : "organize" }}
      mobileBottomNav={saved ? { action: "add", active: "pessoal" } : { action: "confirm", active: "pessoal" }}
      drawer={step === "review-done" ? false : undefined}
      {...props}
    >
      {saved ? (
        <>
          <div className="flex w-full items-center justify-between gap-2.5 border-b border-neutral-border-subtle pb-1.5">
            <DropdownSelectGroupBy device="mobile" value="Data de compartilhamento" />
            <ViewModeToggle size="compact" modes={["grid", "list"]} mode={viewMode === "columns" ? "list" : viewMode} onModeChange={onViewModeChange} />
          </div>
          <FolderCard device="mobile" label={savedGroup?.label} rows={savedGroup?.rows} className="pr-0" />
        </>
      ) : review ? (
        <>
          <div className="flex flex-col gap-2">
            <h1 className={heading}>Revisar Organização</h1>
            <p className={lead}>Revise o template sugerido antes de aplicar as mudanças.</p>
          </div>
          <TemplateReviewModal device="mobile" items={reviewItems} />
          <p className={cn("flex items-center gap-2", caption)}>
            <Info aria-hidden="true" className="size-3.5 shrink-0" />
            Garanta que sua estrutura de arquivos seja clara e sem duplicidades.
          </p>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <h1 className={heading}>Organização</h1>
            <p className={lead}>Selecione como os dados serão visualizados e correlacionados no seu workspace.</p>
          </div>
          <div className="flex flex-col gap-2">
            <MethodOrganizeButton method={method} expanded={methodsOpen} onClick={() => setMethodsOpen((open) => !open)} />
            {methodsOpen
              ? MOBILE_ORGANIZE_METHODS.filter((option) => option !== method).map((option) => (
                  <MethodOrganizeButton
                    key={option}
                    method={option}
                    withChevron={false}
                    onClick={() => {
                      setMethod(option)
                      setMethodsOpen(false)
                    }}
                  />
                ))
              : null}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className={caption}>Ordenar por:</span>
              <DropdownSelectGroupBy device="mobile" value="Data de compartilhamento" />
            </div>
            <div className="flex items-center gap-2">
              <span className={caption}>Página:</span>
              <button
                type="button"
                className="touch-target flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-brand-teal-light bg-effect-overlay-subtle/10 px-3 text-[0.8125rem] font-medium text-neutral-text-secondary backdrop-blur-[15px] focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none"
              >
                <PagePickerGlyph aria-hidden="true" className="h-[18px] w-5 text-neutral-text-tertiary" />
                Pessoal
                <ChevronDown aria-hidden="true" className="size-3 text-neutral-text-tertiary" />
              </button>
            </div>
          </div>
          <section className="flex flex-col gap-2">
            <h2 className="text-[0.6875rem] leading-4 font-bold text-neutral-text-tertiary uppercase">Selecionar arquivos</h2>
            <div className="overflow-hidden rounded-xl border border-neutral-border-subtle bg-neutral-surface-card">
              {mobileFiles.map((file) => (
                <FileSelectRow
                  key={file.name}
                  name={file.name}
                  meta={file.meta}
                  checked={selected.has(file.name)}
                  onCheckedChange={(checked) => toggle(file.name, checked)}
                />
              ))}
            </div>
          </section>
        </>
      )}
      {step === "review-done" ? <OrganizedFeedback fileName={organizedFileName} /> : null}
    </AppShell>
  )
}

export { OrganizationPage }
