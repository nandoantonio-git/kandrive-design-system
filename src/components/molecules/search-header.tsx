import * as React from "react"

import { cn } from "@/lib/utils"
import { FilterButton } from "@/components/molecules/filter-button"
import { FilterMenu, EMPTY_FILTER, countActiveFilters, type FilterValue } from "@/components/organisms/filter-menu"
import { useMinWidth } from "@/lib/use-min-width"
import { SearchInput, type SearchInputProps } from "@/components/molecules/search-input"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { Label } from "@/components/molecules/label"

export interface SearchHeaderProps extends React.ComponentProps<"div"> {
  /** Texto do campo, também usado como rótulo acessível. */
  placeholder?: string
  searchProps?: Omit<SearchInputProps, "placeholder">
  /** Seleção do `FilterMenu`. Controlado; quando omitido, o componente guarda a seleção. */
  filterValue?: FilterValue
  defaultFilterValue?: FilterValue
  onFilterValueChange?: (value: FilterValue) => void
  /** Avisa quando passa a haver (ou deixa de haver) algum filtro marcado. */
  onFiltersActiveChange?: (active: boolean) => void
  /** Mobile empilha a busca sobre Agrupar e Etiquetar. */
  device?: "desktop" | "mobile"
}

/**
 * molecule/SearchHeader (`1755:56081`): a linha de busca de uma lista de arquivos: `SearchInput`,
 * o botão de filtros (`atom/Icon/Filter`), Agrupar e Etiquetar. Usada no modal Arquivo
 * (`template/ArchiveBrowserModal`) e no `StorageStatusSummary`.
 *
 * O funil (`molecule/FilterButton`) abre o `organism/FilterMenu` (decisão de 2026-10-01): balão preso ao funil no
 * desktop; folha de baixo no tablet e no mobile. Com filtros marcados, o funil mostra a bolinha com a contagem.
 * Fecha com Esc, clique fora ou o botão Fechar. Antes (2026-09-28) o funil só alternava ligado e desligado.
 */
function SearchHeader({
  placeholder = "Pesquisar",
  searchProps,
  filterValue: controlledValue,
  defaultFilterValue = EMPTY_FILTER,
  onFilterValueChange,
  onFiltersActiveChange,
  device = "desktop",
  className,
  ...props
}: SearchHeaderProps) {
  const mobile = device === "mobile"
  const desktopWide = useMinWidth("desktop")
  const tabletUp = useMinWidth("tablet")
  const menuDevice = mobile || !tabletUp ? "mobile" : desktopWide ? "desktop" : "tablet"
  const [internalValue, setInternalValue] = React.useState<FilterValue>(defaultFilterValue)
  const value = controlledValue ?? internalValue
  const count = countActiveFilters(value)
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const sheet = menuDevice !== "desktop"

  const changeValue = (next: FilterValue) => {
    if (controlledValue === undefined) setInternalValue(next)
    onFilterValueChange?.(next)
    if ((count > 0) !== (countActiveFilters(next) > 0)) onFiltersActiveChange?.(countActiveFilters(next) > 0)
  }

  React.useEffect(() => {
    if (!open || sheet) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open, sheet])

  return (
    <div
      data-slot="search-header"
      data-device={device}
      className={cn(mobile ? "flex w-full flex-col gap-3" : "flex flex-wrap items-end justify-between gap-4", className)}
      {...props}
    >
      <div className={cn("flex items-center gap-3", mobile ? "w-full" : "min-w-[280px] max-w-[600px] flex-1")}>
        <SearchInput placeholder={placeholder} aria-label={placeholder} {...searchProps} className={cn("min-w-0 max-w-none flex-1", searchProps?.className)} />
        <div ref={rootRef} className="relative shrink-0">
          <FilterButton
            count={count}
            compact={mobile}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          />
          {open && !sheet ? (
            <div className="absolute top-full right-0 z-30 mt-1">
              <FilterMenu device="desktop" value={value} onValueChange={changeValue} onClose={() => setOpen(false)} />
            </div>
          ) : null}
        </div>
        {open && sheet ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <button type="button" aria-label="Fechar filtros" tabIndex={-1} onClick={() => setOpen(false)} className="absolute inset-0 cursor-default bg-black/40" />
            <div className="relative">
              <FilterMenu device={menuDevice} value={value} onValueChange={changeValue} onClose={() => setOpen(false)} />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-start gap-4">
        <DropdownSelectGroupBy />
        <Label />
      </div>
    </div>
  )
}

export { SearchHeader }
