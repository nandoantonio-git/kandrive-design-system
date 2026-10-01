import * as React from "react"
import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FilterValue } from "@/components/organisms/filter-menu"
import { SearchHeader } from "@/components/molecules/search-header"
import { FileListHeader } from "@/components/molecules/file-list-header"
import { FileList } from "@/components/molecules/file-list"
import folderSymbol from "@/assets/illustrations/organize-file-folder.svg"

export interface StorageSummaryFile {
  name: string
  /** Ex.: "Proprietário". */
  owner?: string
  /** Ex.: "100MB". */
  size: string
}

export interface StorageStatusSummaryProps extends React.ComponentProps<"div"> {
  files: StorageSummaryFile[]
  /** Nome do escopo no placeholder do filtro ("Filtrar no Total"). */
  scopeLabel?: string
  /**
   * Figma `Device` (Desktop · Tablet) e as telas mobile. Desktop e tablet:
   * `FileListHeader` + `FileList`. Mobile: tabela em card, com linhas de 61px.
   */
  device?: "desktop" | "mobile"
  /** Seleção do menu de filtro (`FilterMenu`). Controlada; quando omitida, o componente guarda a seleção. */
  filterValue?: FilterValue
  defaultFilterValue?: FilterValue
  onFilterValueChange?: (value: FilterValue) => void
  /** Avisa quando passa a haver (ou deixa de haver) algum filtro marcado. */
  onFiltersActiveChange?: (active: boolean) => void
}

/**
 * `molecule/StorageStatusSummary` (`1742:25489`, KanDrive V0.2.1): a parte de
 * baixo da seção de Storage, logo abaixo do card `StorageStatus`. Tem o filtro
 * do escopo, o botão de filtros, Agrupar e Etiquetar, e a lista de arquivos
 * ordenada por armazenamento. 🔧 Criado em 2026-09-24: o código não tinha essa
 * parte em nenhuma largura. Fica em `organisms/` porque compõe outras moléculas.
 *
 * - Desktop e tablet: `SearchInput`, `atom/Icon/Filter`,
 *   `DropdownSelectGroupBy` e `Label` na mesma linha, e depois
 *   `FileListHeader format="home"` e `FileList format="list"`, como no Figma.
 * - Mobile (`Storage/Total/Mobile`, `1663:8852`): 🧩 no Figma são frames, não
 *   uma variante. O filtro fica sozinho na 1ª linha, Agrupar e Etiquetar na 2ª,
 *   e a lista vira uma tabela em card `Surface/Elevated`, com raio 12:
 *   cabeçalho "Nome" | "↓ Armazenamento" e linhas com o símbolo de pasta,
 *   nome, proprietário e tamanho.
 * - Nome em 16px (Regra 4). ⚠️ No Figma mobile, 13px. Proprietário e tamanho
 *   em 11px, `Text/Tertiary` (microtexto; no Figma, 10 e 11px).
 * - 🧩 Regra 8: pressed do botão de filtros e hover/pressed/foco do
 *   "Armazenamento" (mobile) não desenhados no Figma.
 * - Filtro (2026-10-01): o funil abre o `FilterMenu` (Tipo, Tamanho e Data). O componente guarda a seleção,
 *   mostra a bolinha com a contagem e avisa em `onFilterValueChange`; aplicar o filtro à lista é do app
 *   (`applyFilters` em `filter-menu.tsx` faz isso para quem tiver tipo, tamanho e data).
 */
function StorageStatusSummary({
  files,
  scopeLabel = "Total",
  device = "desktop",
  filterValue,
  defaultFilterValue,
  onFilterValueChange,
  onFiltersActiveChange,
  className,
  ...props
}: StorageStatusSummaryProps) {
  const mobile = device === "mobile"
  const header = (
    <SearchHeader
      device={device}
      placeholder={`Filtrar no ${scopeLabel}`}
      filterValue={filterValue}
      defaultFilterValue={defaultFilterValue}
      onFilterValueChange={onFilterValueChange}
      onFiltersActiveChange={onFiltersActiveChange}
    />
  )

  if (mobile) {
    return (
      <div data-slot="storage-status-summary" data-device="mobile" className={cn("flex w-full flex-col gap-3", className)} {...props}>
        {header}
        <div className="overflow-hidden rounded-xl border border-neutral-border-subtle bg-neutral-surface-elevated">
          <div className="flex items-center justify-between border-b border-neutral-surface-subtle px-4 py-2.5 text-sm leading-5 text-neutral-text-primary">
            <span>Nome</span>
            <button type="button" className="flex cursor-pointer items-center gap-1 rounded-sm font-bold transition-opacity hover:opacity-80 active:opacity-60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50">
              <ArrowDown aria-hidden="true" className="size-3" />
              Armazenamento
            </button>
          </div>
          <ul>
            {files.map((file) => (
              <li key={file.name} className="flex min-h-[61px] items-center gap-3 border-b border-neutral-surface-subtle px-4 py-3 last:border-b-0">
                <img src={folderSymbol} alt="" aria-hidden="true" className="h-8 w-9 shrink-0" />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-base leading-5 text-neutral-text-secondary">{file.name}</span>
                  <span className="truncate text-xs leading-4 text-neutral-text-tertiary">{file.owner ?? "Proprietário"}</span>
                </div>
                <span className="shrink-0 text-xs leading-4 text-neutral-text-tertiary">{file.size}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div data-slot="storage-status-summary" data-device="desktop" className={cn("flex w-full flex-col gap-3 py-4", className)} {...props}>
      {header}
      <FileListHeader format="home" className="max-w-none" />
      <div className="flex flex-col gap-2.5">
        {files.map((file) => (
          <FileList key={file.name} format="list" fileName={file.name} owner={file.owner} size={file.size} className="max-w-none" />
        ))}
      </div>
    </div>
  )
}

export { StorageStatusSummary }
