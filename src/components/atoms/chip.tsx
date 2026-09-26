import * as React from "react"

import { cn } from "@/lib/utils"

export interface ChipProps extends React.ComponentProps<"button"> {
  /** Figma `Selected`. */
  selected?: boolean
}

/**
 * `atom/Chip`: Figma-confirmado no KanDrive V0.2.1 (`3028:3707`), eixo
 * `Selected` (false · true), no material Solid. É o chip canônico da barra
 * de Settings mobile (`MobileFooterSettings`, decisão de 2026-09-24).
 *
 * - Desmarcado: `Neutral/Surface/Background/Alt` e texto `Neutral/Text/Secondary`.
 * - Marcado: `Brand/Primary/Action` e texto `Brand/Primary/Foreground`.
 *
 * Texto de 12px: é microtexto de rótulo de navegação, dentro da exceção da
 * Regra 4 (≥ ~11px). Com toque, a área clicável cresce até 44px (`touch-target`).
 */
function Chip({ selected = false, className, type, ...props }: ChipProps) {
  return (
    <button
      type={type ?? "button"}
      data-slot="chip"
      data-selected={selected || undefined}
      aria-pressed={selected}
      className={cn(
        "touch-target inline-flex h-7 shrink-0 cursor-pointer items-center justify-center rounded-full px-4 text-xs whitespace-nowrap transition-colors",
        "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
        selected
          ? "bg-brand-teal-action text-brand-teal-foreground"
          : "bg-neutral-surface-background-alt text-neutral-text-secondary hover:bg-neutral-surface-subtle",
        className
      )}
      {...props}
    />
  )
}

export { Chip }
