import * as React from "react"

import { cn } from "@/lib/utils"
import { ScopeTypeLabel } from "@/components/atoms/type-label"

export type StorageScope = "global" | "quick-access" | "long-term"

const SCOPES: { scope: StorageScope; kind: "global" | "quick-access" | "long-term"; label: string }[] = [
  { scope: "global", kind: "global", label: "Total" },
  { scope: "quick-access", kind: "quick-access", label: "Acesso rápido" },
  { scope: "long-term", kind: "long-term", label: "Longo prazo" },
]

export interface StorageStatusHeaderSelectorProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  scope: StorageScope
  onScopeChange?: (scope: StorageScope) => void
}

/**
 * molecule/StorageStatusHeaderSelector (`890:9869`): a linha de chips que troca o painel do
 * `StorageStatus` (Total, Acesso rápido, Longo prazo). Três `atom/TypeLabel` de tier, 10px entre eles,
 * 12px acima e abaixo. O chip ativo usa `State=Selected`.
 */
function StorageStatusHeaderSelector({ scope, onScopeChange, className, ...props }: StorageStatusHeaderSelectorProps) {
  return (
    <div
      data-slot="storage-status-header-selector"
      role="group"
      aria-label="Escopo do armazenamento"
      className={cn("flex items-center gap-2.5 py-3", className)}
      {...props}
    >
      {SCOPES.map((item) => (
        <ScopeTypeLabel
          key={item.scope}
          kind={item.kind}
          label={item.label}
          active={scope === item.scope}
          onClick={() => onScopeChange?.(item.scope)}
        />
      ))}
    </div>
  )
}

export { StorageStatusHeaderSelector }
