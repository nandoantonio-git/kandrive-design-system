import * as React from "react"

import { cn } from "@/lib/utils"
import { StorageStatus, type StorageStatusProps } from "@/components/molecules/storage-status"
import { StorageStatusSummary, type StorageStatusSummaryProps } from "@/components/organisms/storage-status-summary"

export interface StorageStatusSectionProps extends React.ComponentProps<"section"> {
  statusProps: StorageStatusProps
  /** Lista abaixo do card. Sem arquivos, a lista não aparece. */
  summaryProps?: StorageStatusSummaryProps
  /** Figma `Layout`: `wide` (desktop, 1061px) ou `compact` (tablet, 472px). No código a largura segue o contêiner. */
  layout?: "wide" | "compact"
}

/**
 * organism/StorageStatusSection (`1742:25328`): o bloco da página de Armazenamento, com o
 * `molecule/StorageStatus` (o card com os chips, o total e a barra) e o `organism/StorageStatusSummary`
 * (busca e lista de arquivos) logo abaixo, 4px entre eles.
 */
function StorageStatusSection({ statusProps, summaryProps, layout = "wide", className, ...props }: StorageStatusSectionProps) {
  return (
    <section
      data-slot="storage-status-section"
      data-layout={layout}
      aria-label="Armazenamento"
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    >
      <StorageStatus {...statusProps} className={cn("w-full max-w-none", statusProps.className)} />
      {summaryProps && summaryProps.files?.length ? <StorageStatusSummary {...summaryProps} /> : null}
    </section>
  )
}

export { StorageStatusSection }
