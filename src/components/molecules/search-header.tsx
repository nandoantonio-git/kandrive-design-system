import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"
import { SearchInput, type SearchInputProps } from "@/components/molecules/search-input"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { Label } from "@/components/molecules/label"

export interface SearchHeaderProps extends React.ComponentProps<"div"> {
  /** Texto do campo, também usado como rótulo acessível. */
  placeholder?: string
  searchProps?: Omit<SearchInputProps, "placeholder">
  /** Filtros ligados. Controlado; quando omitido, o componente guarda o estado. */
  filtersActive?: boolean
  defaultFiltersActive?: boolean
  onFiltersActiveChange?: (active: boolean) => void
  /** Mobile empilha a busca sobre Agrupar e Etiquetar. */
  device?: "desktop" | "mobile"
}

/**
 * molecule/SearchHeader (`1755:56081`): a linha de busca de uma lista de arquivos: `SearchInput`,
 * o botão de filtros (`atom/Icon/Filter`), Agrupar e Etiquetar. Usada no modal Arquivo
 * (`template/ArchiveBrowserModal`) e no `StorageStatusSummary`.
 *
 * 🧩 Regra 8: o botão de filtros alterna (`aria-pressed`) e fica teal quando ligado; o Figma não desenha o estado ligado.
 */
function SearchHeader({
  placeholder = "Pesquisar",
  searchProps,
  filtersActive: controlledFiltersActive,
  defaultFiltersActive = false,
  onFiltersActiveChange,
  device = "desktop",
  className,
  ...props
}: SearchHeaderProps) {
  const mobile = device === "mobile"
  const [internalFiltersActive, setInternalFiltersActive] = React.useState(defaultFiltersActive)
  const filtersActive = controlledFiltersActive ?? internalFiltersActive
  const toggleFilters = () => {
    if (controlledFiltersActive === undefined) setInternalFiltersActive(!filtersActive)
    onFiltersActiveChange?.(!filtersActive)
  }
  return (
    <div
      data-slot="search-header"
      data-device={device}
      className={cn(mobile ? "flex w-full flex-col gap-3" : "flex flex-wrap items-end justify-between gap-4", className)}
      {...props}
    >
      <div className={cn("flex items-center gap-3", mobile ? "w-full" : "min-w-[280px] max-w-[600px] flex-1")}>
        <SearchInput placeholder={placeholder} aria-label={placeholder} {...searchProps} className={cn("min-w-0 max-w-none flex-1", searchProps?.className)} />
        <button
          type="button"
          aria-label="Filtros"
          aria-pressed={filtersActive}
          onClick={toggleFilters}
          className={cn(
            "touch-target flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-neutral-surface-subtle active:bg-neutral-surface-medium focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
            filtersActive ? "bg-neutral-surface-subtle text-brand-teal" : "text-neutral-text-primary"
          )}
        >
          <Icon name="Filter" className={mobile ? "size-4" : "size-6"} />
        </button>
      </div>
      <div className="flex items-start gap-4">
        <DropdownSelectGroupBy />
        <Label />
      </div>
    </div>
  )
}

export { SearchHeader }
