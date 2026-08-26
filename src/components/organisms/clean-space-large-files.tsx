import * as React from "react"
import { Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { PushButton } from "@/components/atoms/push-button"
import { type StorageTier } from "@/components/atoms/storage-tier-badge"
import { CleanSpaceListSelection } from "@/components/molecules/clean-space-list-selection"

export interface CleanSpaceLargeFile {
  name: string
  meta: string
  tier: StorageTier
}

export interface CleanSpaceLargeFilesProps extends React.ComponentProps<"section"> {
  files: CleanSpaceLargeFile[]
  /** Nomes selecionados — controlado; quando omitido, o componente gerencia sozinho (checkbox por linha + "Selecionar todos"/"Desfazer seleção"). */
  selectedNames?: readonly string[]
  onSelectedNamesChange?: (names: readonly string[]) => void
  onDeleteFile?: (file: CleanSpaceLargeFile) => void
  onDeleteSelected?: (files: CleanSpaceLargeFile[]) => void
  onSelectAll?: () => void
  onDeselectAll?: () => void
}

/**
 * organism/cleanSpaceStorage/LargeFiles (`1554:21264`) — Figma-confirmado:
 * seção "Arquivos grandes" de `template/cleanSpaceStorage` (`1439:16908`),
 * extraída pelo usuário como symbol próprio em 2026-08-20 (antes só existia
 * inline dentro do modal). Conteúdo/texto idêntico ao já verificado em
 * `template/cleanSpaceStorage` (mesmos 3 arquivos de exemplo, mesmos
 * rótulos "Acesso rápido"/"Longo prazo") — reconciliado via `get_metadata`
 * (estrutura + texto literal batem 100%), sem `get_design_context` extra
 * por não ter sido encontrada nenhuma diferença visual/textual (Regra 9).
 *
 * Extraída de `template/cleanSpaceStorage` (Regra 10 — o template agora
 * compõe este organism em vez de markup duplicado).
 *
 * 🔧 Corrigido em 2026-08-21 (achado do usuário: verificar hover dos
 * botões). Testado com mouse real via Playwright (não só leitura de CSS):
 * "Selecionar todos" reusa `atom/PushButton`, mas sobrescrevia o hover
 * embutido do átomo com `hover:bg-transparent` — texto estático, sem
 * feedback nenhum ao passar o mouse. Corrigido com `hover:text-brand-teal/70`/
 * `active:text-brand-teal/50` (equivalente em texto ao
 * `hover:bg-brand-teal/90`/`active:bg-brand-teal/80` que o `variant="primary"`
 * já usa pro chrome preenchido).
 *
 * Corrigido (achado do usuário: seleção de itens não funcionava —
 * `CleanSpaceListSelection` já suporta `selected`/`onSelectedChange` mas
 * nunca era wireado por este organism). Seleção agora é real (lifted state,
 * controlado ou não): "Selecionar todos"/"Desfazer seleção" agem sobre o
 * conjunto inteiro, "Excluir" remove só os arquivos selecionados. Antes
 * "Desfazer seleção" ficava sempre `disabled` (não havia nada real pra
 * desfazer); agora só fica `disabled` quando a seleção está vazia.
 *
 * Corrigido em 2026-08-21, mesmo dia (achado do usuário: "alterou as
 * cores"). Releitura fresca de `1439:16908` confirma que este "Section"
 * usa `bg-effect-glass-white-36` (não `-70` — mesmo par "-70 card
 * externo/-36 painel aninhado" já estabelecido em
 * `SaveLongTermFileStorage`), e o botão "Excluir" usa
 * `bg-effect-glass-white-36` + `border-[#bbb]` (`neutral-border-light`,
 * sem token CSS equivalente ainda) — antes `bg-effect-glass-white-70` sem
 * borda própria (herdava `border-zinc-200` do `PushButton`, não o `#bbb`
 * confirmado). Ambos corrigidos.
 */
function CleanSpaceLargeFiles({
  files,
  selectedNames: controlledSelectedNames,
  onSelectedNamesChange,
  onDeleteFile,
  onDeleteSelected,
  onSelectAll,
  onDeselectAll,
  className,
  ...props
}: CleanSpaceLargeFilesProps) {
  const [internalSelectedNames, setInternalSelectedNames] = React.useState<readonly string[]>([])
  const selectedNames = controlledSelectedNames ?? internalSelectedNames

  const setSelectedNames = (names: readonly string[]) => {
    if (controlledSelectedNames === undefined) setInternalSelectedNames(names)
    onSelectedNamesChange?.(names)
  }

  const toggleFileSelected = (name: string, next: boolean) => {
    setSelectedNames(next ? [...selectedNames, name] : selectedNames.filter((selected) => selected !== name))
  }

  const selectAll = () => {
    setSelectedNames(files.map((file) => file.name))
    onSelectAll?.()
  }

  const deselectAll = () => {
    setSelectedNames([])
    onDeselectAll?.()
  }

  const deleteSelected = () => {
    const selectedFiles = files.filter((file) => selectedNames.includes(file.name))
    if (selectedFiles.length > 0) {
      onDeleteSelected?.(selectedFiles)
      selectedFiles.forEach((file) => onDeleteFile?.(file))
      setSelectedNames([])
    }
  }

  return (
    <section
      data-slot="clean-space-large-files"
      className={cn("flex flex-col gap-3 rounded-lg border border-zinc-200 bg-effect-glass-white-36 p-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-zinc-900">Arquivos grandes</h3>
        <div className="flex gap-2">
          <PushButton
            variant="neutral"
            disabled={selectedNames.length === 0}
            onClick={deselectAll}
            className="h-auto border-none bg-transparent p-0 text-xs font-normal text-zinc-300 hover:bg-transparent disabled:opacity-100"
          >
            Desfazer seleção
          </PushButton>
          <PushButton
            variant="primary"
            onClick={selectAll}
            className="h-auto border-none bg-transparent p-0 text-xs font-normal text-brand-teal hover:bg-transparent hover:text-brand-teal/70 active:bg-transparent active:text-brand-teal/50"
          >
            Selecionar todos
          </PushButton>
        </div>
      </div>
      <ul className="flex max-h-64 flex-col gap-1 overflow-auto rounded-lg border border-zinc-100 p-1">
        {files.map((file) => (
          <li key={file.name}>
            <CleanSpaceListSelection
              name={file.name}
              meta={file.meta}
              tier={file.tier}
              selected={selectedNames.includes(file.name)}
              onSelectedChange={(next) => toggleFileSelected(file.name, next)}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <PushButton
          variant="neutral"
          isDestructive
          disabled={selectedNames.length === 0}
          icon={Trash2}
          onClick={deleteSelected}
          className="h-8 gap-2 rounded-md border-[#bbb] bg-effect-glass-white-36 px-3 text-xs"
        >
          Excluir
        </PushButton>
      </div>
    </section>
  )
}

export { CleanSpaceLargeFiles }
