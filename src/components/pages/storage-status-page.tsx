import * as React from "react"

import { cn } from "@/lib/utils"
import { AppShell } from "@/components/templates/app-shell"
import { Sidebar, type SidebarProps } from "@/components/organisms/sidebar"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import { PageLead } from "@/components/molecules/page-lead"
import { StorageStatus, type StorageScope } from "@/components/molecules/storage-status"

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
  className,
  ...props
}: StorageStatusPageProps) {
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
        className="w-full max-w-none"
      />
    </AppShell>
  )
}

export { StorageStatusPage }
