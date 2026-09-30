import * as React from "react"

import { cn } from "@/lib/utils"
import { StorageBar } from "@/components/molecules/storage-bar"
import { Button } from "@/components/atoms/button"
import { SidebarToggle } from "@/components/organisms/sidebar-toggle"

export interface StorageSidebarProps extends React.ComponentProps<"div"> {
  expanded?: boolean
  onToggle?: () => void
  quickAccessValue: number
  quickAccessLabel: string
  longTermValue: number
  longTermLabel: string
  /**
   * Rótulo do botão de gatilho para o fluxo de liberação de espaço
   * (`organism/cleanSpaceStorage`, nó `1439:16908`). Default "Liberar
   * Espaço" — termo aprovado (Regra 5) para o contexto de Armazenamento/
   * Configurações de Plano, onde este componente é usado de forma
   * standalone. `organism/Sidebar` sobrescreve para "Gerir Espaço" ao
   * embutir este componente no painel persistente (contexto diferente,
   * mesmo conceito — ver docs/conflicts.md, entrada resolvida em
   * 2026-08-10).
   */
  manageSpaceLabel?: string
  onManageSpace?: () => void
  onBuySpace?: () => void
}

/**
 * organism/storage-sidebar (`635:5608`) — Figma-confirmado: "componente
 * da sidebar onde possibilita visualizar o status de curto prazo(corrente)
 * ou longo prazo. botoes para página de gerir espaço ou para dar upgrade no
 * plano de uso." Compõe `molecule/StorageBar` (US-005) + `PushButton`
 * (`variant="neutral"` para o botão de espaço, `variant="primary"` para
 * "Comprar Espaço") + `organism/sidebar-toggle`.
 */
/** Botões empilhados na largura toda; o rótulo quebra linha quando o painel é estreito (Tablet). */
const STACKED = "h-auto min-h-9 w-full whitespace-normal text-center"

function StorageSidebar({
  expanded = true,
  onToggle,
  quickAccessValue,
  quickAccessLabel,
  longTermValue,
  longTermLabel,
  manageSpaceLabel = "Gerir espaço",
  onManageSpace,
  onBuySpace,
  className,
  ...props
}: StorageSidebarProps) {
  return (
    <div data-slot="storage-sidebar" className={cn("flex w-full flex-col gap-3", className)} {...props}>
      <SidebarToggle expanded={expanded} onToggle={onToggle} />
      {expanded ? (
        <>
          <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-col gap-1">
              <span className="w-fit rounded-md bg-storage-fast-access-surface px-2 py-0.5 text-xs text-white">
                Acesso rápido
              </span>
              <StorageBar tier="quick-access" value={quickAccessValue} />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{quickAccessLabel}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="w-fit rounded-md bg-storage-long-term-surface px-2 py-0.5 text-xs text-white">
                Longo prazo
              </span>
              <StorageBar tier="long-term" value={longTermValue} />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{longTermLabel}</span>
            </div>
          </div>
          {/* Regra 4 (2026-09-30): rótulo de botão com 16px, então os dois empilham na largura toda,
              no Tablet (150px) e no Desktop (212px). O Figma usa `atom/Button` Outline e Primary, MD.
              No Tablet, "Comprar espaço" não cabe numa linha: o rótulo quebra em vez de vazar. */}
          <div className="flex flex-col gap-2 px-2">
            <Button variant="outline" className={STACKED} onClick={onManageSpace}>
              {manageSpaceLabel}
            </Button>
            <Button className={STACKED} onClick={onBuySpace}>
              Comprar espaço
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export { StorageSidebar }
