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
  onDeleteFile?: (file: CleanSpaceLargeFile) => void
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
 * já usa pro chrome preenchido). "Desfazer seleção" continua sem hover —
 * correto, fica `disabled` sempre por decisão de produto já documentada.
 */
function CleanSpaceLargeFiles({
  files,
  onDeleteFile,
  onSelectAll,
  onDeselectAll,
  className,
  ...props
}: CleanSpaceLargeFilesProps) {
  return (
    <section
      data-slot="clean-space-large-files"
      className={cn("flex flex-col gap-3 rounded-lg border border-zinc-200 bg-effect-glass-white-70 p-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-zinc-900">Arquivos grandes</h3>
        <div className="flex gap-2">
          <PushButton
            variant="neutral"
            disabled
            onClick={onDeselectAll}
            className="h-auto border-none bg-transparent p-0 text-xs font-normal text-zinc-300 hover:bg-transparent disabled:opacity-100"
          >
            Desfazer seleção
          </PushButton>
          <PushButton
            variant="primary"
            onClick={onSelectAll}
            className="h-auto border-none bg-transparent p-0 text-xs font-normal text-brand-teal hover:bg-transparent hover:text-brand-teal/70 active:bg-transparent active:text-brand-teal/50"
          >
            Selecionar todos
          </PushButton>
        </div>
      </div>
      <ul className="flex max-h-64 flex-col gap-1 overflow-auto rounded-lg border border-zinc-100 p-1">
        {files.map((file) => (
          <li key={file.name}>
            <CleanSpaceListSelection name={file.name} meta={file.meta} tier={file.tier} />
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <PushButton
          variant="neutral"
          isDestructive
          icon={Trash2}
          onClick={() => files[0] && onDeleteFile?.(files[0])}
          className="h-8 gap-2 rounded-md bg-effect-glass-white-70 px-3 text-xs"
        >
          Excluir
        </PushButton>
      </div>
    </section>
  )
}

export { CleanSpaceLargeFiles }
