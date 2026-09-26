import * as React from "react"

import { cn } from "@/lib/utils"
import { useMinWidth } from "@/lib/use-min-width"
import { AppShell } from "@/components/templates/app-shell"
import { Sidebar } from "@/components/organisms/sidebar"
import { HomePage, type HomePageProps } from "@/components/pages/home-page"
import { SaveLongTermFileStorage, type SaveLongTermFileStorageProps } from "@/components/templates/save-long-term-file-storage"
import { ArchiveBrowserModal, type ArchiveBrowserModalProps } from "@/components/templates/archive-browser-modal"
import { ContextHeader } from "@/components/molecules/context-header"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { ViewModeToggle, type ViewMode } from "@/components/molecules/view-mode-toggle"
import { PagePickerButton } from "@/components/molecules/page-picker-button"
import { FileSelectList, type FileSelectListFile } from "@/components/organisms/file-select-list"
import { RecoveryPending } from "@/components/organisms/recovery-pending"
import { MobileSuccess } from "@/components/atoms/mobile-success"

export type LongTermStorageStep = "intro" | "archive-browser" | "stored" | "recovery-pending"

export interface LongTermStoragePageProps extends Omit<React.ComponentProps<"div">, "children"> {
  step?: LongTermStorageStep
  /** A Home por baixo dos modais (desktop e tablet) e a Sidebar da recuperação. */
  homeProps: Omit<HomePageProps, "overlay">
  introProps: Omit<SaveLongTermFileStorageProps, "className">
  archiveBrowserProps: Omit<ArchiveBrowserModalProps, "className">
  /** Mobile: a lista "Selecionar arquivos". */
  mobileFiles?: FileSelectListFile[]
  /** Mobile: arquivos já marcados ao abrir (ex. o estado `SelectFilesSelected`). */
  defaultSelected?: string[]
  /** `recovery-pending`: o arquivo que está voltando do longo prazo. */
  recoveryFileName?: string
}

/**
 * Fluxo "Guardar no longo prazo" (Figma KanDrive V0.2.1, 2026-09-24). Reúne em
 * uma página as telas que antes só existiam como templates soltos.
 *
 * | `step` | Desktop e tablet | Mobile (< 720) |
 * | --- | --- | --- |
 * | `intro` | Home + `SaveLongTermFileStorage` (`LongTermStorage/Intro`) | `SelectFiles` |
 * | `archive-browser` | Home + `ArchiveBrowserModal` (`LongTermStorage/ArchiveBrowser`) | `SelectFiles` |
 * | `stored` | `MobileSuccess` Stored em tela cheia | igual (`LongTermStorage/Stored/Mobile`) |
 * | `recovery-pending` | `RecoveryPending` com a Sidebar | `LongTermStorage/RecoveryPending/Mobile` |
 *
 * - Mobile: os dois modais do desktop viram uma tela só, `SelectFiles` (fluxo
 *   equivalente): título, "Ordenar por" + visualização, "Página" e a lista com
 *   checkbox. Com algo marcado, entra o `ContextHeader` Minimal
 *   (`SelectFilesSelected`). TabBar em "Guardar", BottomNav Confirmar + ✕.
 * - ⚠️ No Figma, `SelectFilesSelected/Mobile` marca "Organizar" na TabBar. É
 *   inconsistente com `SelectFiles` (Guardar); o código usa Guardar.
 * - `stored` é feedback visual: sem gaveta nem barras, igual no Light e no Dark.
 * - `recovery-pending` é um estado (vale em todas as larguras). No mobile, sem
 *   TabBar e com o BottomNav Adicionar, como no Figma.
 * - 🧩 "Ordenar por" usa o `DropdownSelectGroupBy` mobile, como na Home
 *   (decisão Q25: substitui o `atom/SortButton`).
 */
function LongTermStoragePage({
  step = "intro",
  homeProps,
  introProps,
  archiveBrowserProps,
  mobileFiles = [],
  defaultSelected = [],
  recoveryFileName = "",
  className,
  ...props
}: LongTermStoragePageProps) {
  const tablet = useMinWidth("tablet")
  const [selected, setSelected] = React.useState<Set<string>>(() => new Set(defaultSelected))
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const toggle = (name: string, checked: boolean) =>
    setSelected((previous) => {
      const next = new Set(previous)
      if (checked) next.add(name)
      else next.delete(name)
      return next
    })

  if (step === "stored") {
    return (
      <div
        data-slot="long-term-storage-page"
        className={cn("fixed inset-0 z-50 flex items-center justify-center bg-[#007e96] px-4", className)}
        {...props}
      >
        <MobileSuccess message="stored" />
      </div>
    )
  }

  if (step === "recovery-pending") {
    return (
      <AppShell
        data-slot="long-term-storage-page"
        className={className}
        headerProps={{ page: "navbar" }}
        sidebar={<Sidebar {...homeProps.sidebarProps} />}
        mobileBottomNav={{ action: "add", active: "pessoal" }}
        {...props}
      >
        <div className="flex flex-1 justify-center pt-8 pb-6 tablet:items-center tablet:pt-0">
          <RecoveryPending fileName={recoveryFileName} />
        </div>
      </AppShell>
    )
  }

  if (tablet) {
    const modal =
      step === "archive-browser" ? (
        <ArchiveBrowserModal {...archiveBrowserProps} />
      ) : (
        <SaveLongTermFileStorage {...introProps} />
      )
    return (
      <HomePage
        data-slot="long-term-storage-page"
        className={className}
        {...homeProps}
        {...props}
        overlay={<div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 p-6">{modal}</div>}
      />
    )
  }

  const count = selected.size
  return (
    <AppShell
      data-slot="long-term-storage-page"
      data-device="mobile"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "navbar" }}
      mobileTabBar={{ active: "keep" }}
      mobileBottomNav={{ action: "confirm", active: "pessoal" }}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-[1.5625rem] leading-[30px] font-medium text-neutral-text-primary">Guardar no longo prazo</h1>
        <p className="text-base leading-5 text-neutral-text-tertiary">Arquivos em longo prazo ficam seguros por anos e liberam espaço ativo.</p>
      </div>
      <div className="flex w-full items-center justify-between gap-2.5">
        <DropdownSelectGroupBy device="mobile" value="Data de compartilhamento" />
        <ViewModeToggle size="compact" mode={viewMode === "columns" ? "list" : viewMode} onModeChange={setViewMode} />
      </div>
      <PagePickerButton />
      {count > 0 ? (
        <ContextHeader
          layout="minimal"
          itemsSelected={`${count} ${count === 1 ? "item selecionado" : "itens selecionados"}`}
          onClear={() => setSelected(new Set())}
        />
      ) : null}
      <FileSelectList files={mobileFiles} selected={selected} onSelectedChange={toggle} />
    </AppShell>
  )
}

export { LongTermStoragePage }
