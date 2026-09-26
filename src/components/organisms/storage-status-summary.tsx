import * as React from "react"
import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"
import { SearchInput } from "@/components/molecules/search-input"
import { DropdownSelectGroupBy } from "@/components/molecules/dropdown-select-group-by"
import { Label } from "@/components/molecules/label"
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
 *   e a lista vira uma tabela em card `Neutral/Surface/Elevated`, com raio 12:
 *   cabeçalho "Nome" | "↓ Armazenamento" e linhas com o símbolo de pasta,
 *   nome, proprietário e tamanho.
 * - Nome em 16px (Regra 4). ⚠️ No Figma mobile, 13px. Proprietário e tamanho
 *   em 11px, `Neutral/Text/Tertiary` (microtexto; no Figma, 10 e 11px).
 */
function StorageStatusSummary({ files, scopeLabel = "Total", device = "desktop", className, ...props }: StorageStatusSummaryProps) {
  const mobile = device === "mobile"
  const filter = (
    <div className={cn("flex items-center gap-3", mobile ? "w-full" : "min-w-[280px] max-w-[600px] flex-1")}>
      <SearchInput placeholder={`Filtrar no ${scopeLabel}`} aria-label={`Filtrar no ${scopeLabel}`} className="min-w-0 max-w-none flex-1" />
      <button
        type="button"
        aria-label="Filtros"
        className="touch-target flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-text-primary hover:bg-neutral-surface-subtle focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none"
      >
        <Icon name="Filter" className={mobile ? "size-4" : "size-6"} />
      </button>
    </div>
  )
  const toolbar = (
    <div className="flex items-start gap-4">
      <DropdownSelectGroupBy />
      <Label />
    </div>
  )

  if (mobile) {
    return (
      <div data-slot="storage-status-summary" data-device="mobile" className={cn("flex w-full flex-col gap-3", className)} {...props}>
        {filter}
        {toolbar}
        <div className="overflow-hidden rounded-xl border border-neutral-border-subtle bg-neutral-surface-elevated">
          <div className="flex items-center justify-between border-b border-neutral-surface-subtle px-4 py-2.5 text-[0.8125rem] leading-5 text-neutral-text-primary">
            <span>Nome</span>
            <button type="button" className="flex cursor-pointer items-center gap-1 font-bold">
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
                  <span className="truncate text-[0.6875rem] leading-4 text-neutral-text-tertiary">{file.owner ?? "Proprietário"}</span>
                </div>
                <span className="shrink-0 text-[0.6875rem] leading-4 text-neutral-text-tertiary">{file.size}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div data-slot="storage-status-summary" data-device="desktop" className={cn("flex w-full flex-col gap-3 py-4", className)} {...props}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        {filter}
        {toolbar}
      </div>
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
