import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"

export interface FilterButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  /** Quantas opções do `FilterMenu` estão marcadas. Com 1 ou mais, aparece a bolinha com o número. */
  count?: number
  /** Funil menor, para o campo de busca do Mobile. */
  compact?: boolean
}

/**
 * molecule/FilterButton (`3500:39738`): o funil que abre o `FilterMenu`. `State=Default` sem filtro;
 * `State=Active` com a bolinha da quantidade de opções marcadas (`Brand/Primary/Action`, texto 12px Bold).
 *
 * O nome acessível é "Filtrar" e, com filtros, "Filtrar, N ativos". A bolinha é decorativa (`aria-hidden`),
 * porque o número já está no nome. Área de toque de 44px no toque (`touch-target`).
 *
 * 🧩 Regra 8: hover e pressionado não estão desenhados no Figma; seguem o `SearchHeader` anterior.
 */
function FilterButton({ count = 0, compact = false, className, ...props }: FilterButtonProps) {
  const active = count > 0
  const label = active ? `Filtrar, ${count} ${count === 1 ? "ativo" : "ativos"}` : "Filtrar"
  return (
    <button
      type="button"
      data-slot="filter-button"
      data-state={active ? "active" : "default"}
      aria-label={label}
      className={cn(
        "touch-target relative flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-text-primary transition-colors hover:bg-neutral-surface-subtle active:bg-neutral-surface-subtle/70 focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <Icon name="Filter" className={compact ? "size-4" : "size-6"} />
      {active ? (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-teal-action px-1 text-xs leading-none font-bold text-brand-teal-foreground"
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}

export { FilterButton }
