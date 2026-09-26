import * as React from "react"

import { cn } from "@/lib/utils"
import { AppShell } from "@/components/templates/app-shell"
import { Sidebar, type SidebarProps } from "@/components/organisms/sidebar"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import { PageLead } from "@/components/molecules/page-lead"
import { StorageStatus, type StorageScope } from "@/components/molecules/storage-status"
import { StorageStatusSummary, type StorageSummaryFile } from "@/components/organisms/storage-status-summary"
import { CleanSpaceStorage, type CleanSpaceStorageProps } from "@/components/templates/clean-space-storage"
import { Button } from "@/components/atoms/button"
import { useMinWidth } from "@/lib/use-min-width"

export interface StorageStatusPageProps extends React.ComponentProps<"div"> {
  sidebarProps: SidebarProps
  scope?: StorageScope
  onScopeChange?: (scope: StorageScope) => void
  usedAmount: string
  totalAmount: string
  percent: number
  fileTypeSegments?: React.ComponentProps<typeof StorageStatus>["fileTypeSegments"]
  usedLabel?: string
  freeLabel?: string
  onManageSpace?: () => void
  onBuySpace?: () => void
  /** Lista de arquivos abaixo do card (`molecule/StorageStatusSummary`). */
  files?: StorageSummaryFile[]
  /** `Storage/LimitReached`: card em alerta (desktop e tablet) e tela própria no mobile. */
  limitReached?: boolean
  /** `Storage/ManageSpace`: o modal "Liberar Espaço" (`CleanSpaceStorage`) por cima da página. */
  manageSpaceOpen?: boolean
  cleanSpaceProps?: Omit<CleanSpaceStorageProps, "className">
}

/**
 * page/FunctionStorageStatus/Total (`1439:19749`), /Current (`1439:19763`),
 * /LongoPrazo (`1439:19777`) — Figma-confirmado: mesmo shell (Header +
 * Sidebar padrão + Breadcrumb + `PageLead` "Armazenamento") em torno de
 * `molecule/StorageStatus/StatusSection` (`variant="expanded"`, já
 * implementado por completo — `scope` controla Global/Acesso rápido/Longo
 * prazo). Implementado como **um componente único parametrizado por
 * `scope`** (Regra 1/10, mesmo critério de `HomePage`/`viewMode`) — os 3
 * nodes são a mesma tela variando só o eixo `StorageType` do mesmo widget,
 * não 3 composições diferentes.
 *
 * Breadcrumb: `get_design_context` fresco no node `Total` (`1439:19755`)
 * retorna o crumb final como "Guardar em Longo Prazo" — texto que não bate
 * com o nome do node ("Total"/Global) nem foi reconfirmado nos outros 2
 * nodes (metadata não expõe texto de instância aninhada sem uma 2ª chamada
 * de design-context por node). Tratado como possível artefato de conteúdo
 * do próprio node amostrado (Regra 9 — não propagar sem confirmação por
 * scope); usado em vez disso o mesmo critério já estabelecido nas outras
 * páginas novas desta reconciliação (Settings/FAQ): crumb final = título H1
 * ("Armazenamento", Figma-confirmado como default de `Lead`/`PageLead`).
 */
function StorageStatusPage({
  sidebarProps,
  scope = "global",
  onScopeChange,
  usedAmount,
  totalAmount,
  percent,
  fileTypeSegments,
  usedLabel,
  freeLabel,
  onManageSpace,
  onBuySpace,
  files = [],
  limitReached = false,
  manageSpaceOpen = false,
  cleanSpaceProps,
  className,
  ...props
}: StorageStatusPageProps) {
  const tablet = useMinWidth("tablet")
  const scopeLabel = scope === "global" ? "Total" : scope === "quick-access" ? "Acesso Rápido" : "Longo Prazo"
  if (limitReached && !tablet) {
    return (
      <AppShell
        data-slot="storage-status-page"
        data-device="mobile"
        className={className}
        headerProps={{ page: "storage" }}
        mobileBottomNav={{ action: "add", active: "pessoal" }}
        {...props}
      >
        <StorageLimitReachedMobile usedAmount={usedAmount} totalAmount={totalAmount} onBuySpace={onBuySpace} onManageSpace={onManageSpace} />
      </AppShell>
    )
  }
  return (
    <AppShell
      data-slot="storage-status-page"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "storage" }}
      sidebar={<Sidebar {...sidebarProps} />}
      mobileBottomNav={{ action: "add", active: "pessoal" }}
      {...props}
    >
      <Breadcrumb segments={["Home", "Armazenamento"]} className="hidden tablet:flex" />
      <PageLead title="Armazenamento" className="tablet:pb-5" />
      <StorageStatus
        scope={scope}
        onScopeChange={onScopeChange}
        usedAmount={usedAmount}
        totalAmount={totalAmount}
        percent={percent}
        fileTypeSegments={fileTypeSegments}
        usedLabel={usedLabel}
        freeLabel={freeLabel}
        onManageSpace={onManageSpace}
        onBuySpace={onBuySpace}
        limitReached={limitReached}
        className="w-full max-w-none"
      />
      {files.length ? (
        <StorageStatusSummary files={files} scopeLabel={scopeLabel} device={tablet ? "desktop" : "mobile"} className={tablet ? undefined : "pt-1"} />
      ) : null}
      {manageSpaceOpen && cleanSpaceProps ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 p-4 tablet:absolute tablet:p-6">
          <CleanSpaceStorage {...cleanSpaceProps} />
        </div>
      ) : null}
    </AppShell>
  )
}

/**
 * `Storage/LimitReached/Mobile` (`1727:23116`, V0.2.1): tela própria do mobile,
 * sem título nem card. 🔧 Criada em 2026-09-24.
 * - Valor usado: 36px Bold `Brand/Feedback/Danger/Default` + "usados de X" 16px
 *   `Neutral/Text/Tertiary`. Barra de 8px: trilho `Neutral/Surface/Muted`,
 *   cheia em `Brand/Feedback/Danger/Surface`.
 * - Título 25px Medium; texto em 16px (Regra 4; ⚠️ no Figma, 13px).
 * - Ações: `atom/Button` Primary LG Pill "Comprar espaço" e "Liberar espaço".
 *   🧩 No Figma, "Liberar espaço" é um frame (fundo `Neutral/Surface/Card`,
 *   borda `Neutral/Border/Light`); aqui é o `Button` Outline com essas cores.
 */
function StorageLimitReachedMobile({
  usedAmount,
  totalAmount,
  onBuySpace,
  onManageSpace,
}: Pick<StorageStatusPageProps, "usedAmount" | "totalAmount" | "onBuySpace" | "onManageSpace">) {
  return (
    <div data-slot="storage-limit-reached" className="flex flex-1 flex-col justify-center gap-6 px-2 pb-24">
      <div className="flex flex-col gap-3">
        <p className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-destructive">{usedAmount}</span>
          <span className="text-base text-neutral-text-tertiary">usados de {totalAmount}</span>
        </p>
        <div role="progressbar" aria-label="Armazenamento usado" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full overflow-hidden rounded-full bg-zinc-500/20">
          <div className="h-full w-full bg-destructive-surface" />
        </div>
      </div>
      <div role="alert" className="flex flex-col gap-2 text-center">
        <h1 className="text-[1.5625rem] leading-[30px] font-medium text-neutral-text-primary">Limite atingido (100%)</h1>
        <p className="text-base leading-5 text-neutral-text-tertiary">
          Seu limite de {totalAmount} foi totalmente atingido. O upload de novos arquivos e sincronização automática foram suspensos.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <Button size="lg" shape="pill" onClick={onBuySpace} className="w-full">
          Comprar espaço
        </Button>
        <Button
          variant="outline"
          size="lg"
          shape="pill"
          onClick={onManageSpace}
          className="w-full border-neutral-border-light bg-neutral-surface-card text-neutral-text-secondary"
        >
          Liberar espaço
        </Button>
      </div>
    </div>
  )
}

export { StorageStatusPage }
