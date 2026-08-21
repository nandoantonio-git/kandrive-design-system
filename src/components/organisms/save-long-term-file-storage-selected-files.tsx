import * as React from "react"

import { cn } from "@/lib/utils"
import { AddButton } from "@/components/atoms/add-button"
import { ArchiveBrowserModalListItem } from "@/components/molecules/archive-browser-modal-list-item"

export interface SaveLongTermFileStorageSelectedFile {
  name: string
  meta: string
}

export interface SaveLongTermFileStorageSelectedFilesProps extends React.ComponentProps<"div"> {
  files: SaveLongTermFileStorageSelectedFile[]
  onAddFiles?: () => void
}

/**
 * organism/Save/LongTermFileStorage/SelectedFiles (`1555:21357`) —
 * Figma-confirmado: coluna esquerda de seleção de `template/Save/
 * LongTermFileStorage` (`1439:16907`), extraída pelo usuário como symbol
 * próprio em 2026-08-20 (antes só existia inline dentro do modal). Compõe
 * `organism/ArchiveBrowserModal/ListItem` (mesmo node-name já usado em
 * `template/ArchiveBrowserModal`) + `atom/buttonAdd`. Conteúdo/estrutura
 * idêntico ao já verificado em `template/Save/LongTermFileStorage` —
 * reconciliado via `get_metadata` (estrutura bate 100%), sem
 * `get_design_context` extra por não ter sido encontrada nenhuma diferença
 * visual/textual (Regra 9).
 *
 * Extraída de `template/Save/LongTermFileStorage` (Regra 10 — o template
 * agora compõe este organism em vez de markup duplicado).
 *
 * 🔧 **Corrigido em 2026-08-21** (achado do usuário: aplicação de glass
 * revisada). A reconciliação inicial de 2026-08-20 confiou só em
 * `get_metadata` (estrutura) pra este symbol novo, sem confirmar estilo —
 * `get_design_context` fresco no nó confirma que o painel **não tem
 * nenhuma borda** e usa padding assimétrico `px-[6px] py-[12px]` (não
 * `p-3`/12px uniforme). `border-zinc-200` removido, padding corrigido pra
 * `px-1.5 py-3`.
 */
function SaveLongTermFileStorageSelectedFiles({
  files,
  onAddFiles,
  className,
  ...props
}: SaveLongTermFileStorageSelectedFilesProps) {
  return (
    <div
      data-slot="save-long-term-file-storage-selected-files"
      className={cn("flex w-[270px] flex-col gap-3 rounded-md bg-effect-glass-white-36 px-1.5 py-3", className)}
      {...props}
    >
      {files.map((file) => (
        <ArchiveBrowserModalListItem key={file.name} fileName={file.name} meta={file.meta} />
      ))}
      <AddButton label="Adicionar arquivos" onClick={onAddFiles} className="w-full border-zinc-200" />
    </div>
  )
}

export { SaveLongTermFileStorageSelectedFiles }
