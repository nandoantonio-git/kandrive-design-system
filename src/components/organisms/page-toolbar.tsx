import * as React from "react"

import { cn } from "@/lib/utils"
import { PageLead } from "@/components/molecules/page-lead"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { Label } from "@/components/molecules/label"
import { ViewModeToggle, type ViewMode } from "@/components/molecules/view-mode-toggle"

export interface PageToolbarProps extends React.ComponentProps<"div"> {
  title: string
  caption?: string
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
}

/**
 * organism/PageToolbar (`3029:3980`): o título da página (`molecule/PageLead`) com as ferramentas
 * da lista: Agrupar, Etiquetar e Visualizar (Grade, Lista, Colunas). No Figma, os itens se alinham
 * pelo topo e as listas abertas flutuam por cima do conteúdo, sem empurrar o título.
 *
 * Tablet: o título fica acima das ferramentas. Mobile: sem título (a barra de abas faz esse papel),
 * só Agrupar compacto e Visualizar compacto (Grade e Lista; Colunas não existe no mobile).
 */
function PageToolbar({ title, caption, viewMode = "grid", onViewModeChange, className, ...props }: PageToolbarProps) {
  const mobileMode: ViewMode = viewMode === "columns" ? "list" : viewMode
  return (
    <div
      data-slot="page-toolbar"
      className={cn("flex items-center justify-between gap-4 tablet:flex-col tablet:items-start desktop:flex-row", className)}
      {...props}
    >
      <PageLead title={title} caption={caption} className="hidden flex-1 tablet:flex" />
      <div className="hidden shrink-0 items-start gap-4 tablet:flex desktop:self-stretch">
        <DropdownSelectGroupBy />
        <Label />
        <ViewModeToggle mode={viewMode} onModeChange={onViewModeChange} />
      </div>
      <div className="flex w-full items-center justify-between gap-2.5 tablet:hidden">
        <DropdownSelectGroupBy device="mobile" />
        <ViewModeToggle size="compact" mode={mobileMode} onModeChange={onViewModeChange} />
      </div>
    </div>
  )
}

export { PageToolbar }
