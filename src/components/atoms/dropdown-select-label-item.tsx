import * as React from "react"

import { cn } from "@/lib/utils"

export interface DropdownSelectLabelItemProps
  extends Omit<React.ComponentProps<"button">, "onClick"> {
  label?: string
  /** `State=clicked` (Figma-confirmado). `hover` mapeado para `:hover` do browser. */
  active?: boolean
  onClick?: () => void
}

/**
 * atom/DropdownSelect/Label/Item (`1444:21704`, Figma-confirmado) —
 * "item da pilula de etiquetar, no qual você insere input o nome desejado
 * de rótulo. Contem variavel de estados". Texto verbatim confirmado:
 * "+ Nova Etiqueta". Sem molecule consumidora implementada ainda
 * (`molecule/DropdownSelect/Label` fica deferido — Regra 9, não inventar
 * composição não confirmada).
 *
 * 3 estados Figma-confirmados (`state`): `idle` (sem fundo), `hover`
 * (fundo `neutral-surface-muted`, `rgba(113,113,122,0.2)`), `clicked`
 * (fundo `effect-overlay-secondary`, `rgba(107,107,104,0.45)`) — mesmos 2
 * tons já usados em `atom/DropdownSelect/GroupBy/Item` (US-019), cores
 * literais sem token semântico (Regra 3, paleta neutra suspensa).
 *
 * 🧩 Inferido (Regra 9): `dark:bg-[#a8a6a173]` reaproveita o valor dark já
 * definido p/ `--brand-secondary-light` em index.css (mesma cor base do rgba acima).
 *
 * `State=Pressed` do Figma (V0.2.1) também responde ao `:active` real.
 * 🧩 Regra 8: foco e disabled não desenhados no Figma.
 */
function DropdownSelectLabelItem({
  label = "+ Nova etiqueta",
  active,
  className,
  onClick,
  ...props
}: DropdownSelectLabelItemProps) {
  return (
    <button
      type="button"
      data-slot="dropdown-select-label-item"
      data-active={active || undefined}
      onClick={onClick}
      className={cn(
        "group flex h-[18px] w-fit min-w-20 items-center justify-center rounded-[4px]",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex h-full w-full items-center rounded-[4px] pl-1.5 pr-[6.5px] transition-colors",
          active
            ? "bg-[#6b6b6873] dark:bg-[#a8a6a173]"
            : "group-hover:bg-[#71717a33] group-active:bg-[#6b6b6873] dark:group-active:bg-[#a8a6a173]"
        )}
      >
        <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-xl py-0.5 text-xs whitespace-nowrap text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      </span>
    </button>
  )
}

export { DropdownSelectLabelItem }
