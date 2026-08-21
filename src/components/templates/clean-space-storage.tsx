import * as React from "react"

import { cn } from "@/lib/utils"
import { CloseButton } from "@/components/atoms/close-button"
import { CleanSpaceLargeFiles, type CleanSpaceLargeFile } from "@/components/organisms/clean-space-large-files"
import { CleanSpaceDuplicated, type CleanSpaceDuplicateGroup } from "@/components/organisms/clean-space-duplicated"

export type { CleanSpaceLargeFile, CleanSpaceDuplicateGroup }

export interface CleanSpaceStorageProps extends React.ComponentProps<"div"> {
  largeFiles: CleanSpaceLargeFile[]
  duplicateGroups: CleanSpaceDuplicateGroup[]
  onClose?: () => void
  onDeleteFile?: (file: CleanSpaceLargeFile) => void
  onDeleteDuplicates?: (group: CleanSpaceDuplicateGroup) => void
  onSelectAll?: () => void
  onDeselectAll?: () => void
}

/**
 * template/cleanSpaceStorage (`1439:16908`) — Figma-confirmado: "modal que
 * abre em overlay ao selecionar a opção de liberar espaço. nele você pode
 * otimizar seu espaço com arquivos grande e duplicados, economizando
 * espaço." Título visível Figma-confirmado em 2026-08-10: **"Liberar
 * Espaço"** (o título anterior, com o verbo "Limpar" em vez de "Liberar",
 * foi atualizado pelo usuário diretamente no Figma e fica proibido como
 * texto visível — Regra 5, docs/conflicts.md, entrada resolvida).
 *
 * Tags de tier reutilizam `atom/StorageTierBadge` (`1457:21014`,
 * Figma-confirmado, rótulos aprovados "Acesso rápido"/"Longo prazo" —
 * Regra 5) em vez de markup duplicado. Botões "Excluir"/"Excluir cópias"
 * usam `PushButton` com `isDestructive` (chrome neutro, texto
 * `--destructive`); "Selecionar todos" usa `variant="primary"`;
 * "Desfazer seleção" fica `disabled` (estado lido/neutro).
 *
 * 🔧 **Reclassificado organism → template em 2026-08-20** (usuário renomeou
 * o node no Figma de `organism/cleanSpaceStorage` para
 * `template/cleanSpaceStorage`, mesmo nodeId `1439:16908`) — este e outros 5
 * componentes de fluxo/modal completo passaram a ter camada própria no
 * Figma fonte, refletida aqui como `src/components/templates/`. Ver
 * `docs/vault/Design System/Camadas Atômicas.md`. As seções "Arquivos
 * grandes"/"Arquivos duplicados" ganharam symbols Figma próprios
 * (`organism/cleanSpaceStorage/LargeFiles` `1554:21264`,
 * `organism/cleanSpaceStorage/Duplicated` `1554:21265`) — extraídas para
 * `CleanSpaceLargeFiles`/`CleanSpaceDuplicated` (Regra 10).
 */
function CleanSpaceStorage({
  largeFiles,
  duplicateGroups,
  onClose,
  onDeleteFile,
  onDeleteDuplicates,
  onSelectAll,
  onDeselectAll,
  className,
  ...props
}: CleanSpaceStorageProps) {
  return (
    <div
      data-slot="clean-space-storage"
      role="dialog"
      aria-label="Liberar Espaço"
      className={cn(
        "flex w-full max-w-2xl flex-col gap-4 rounded-3xl border border-zinc-200 bg-effect-glass-white-70 p-6 shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-medium text-zinc-900">Liberar Espaço</h2>
          <p className="text-base text-zinc-700">Gerencie arquivos que ocupam seu espaço</p>
        </div>
        <CloseButton size="md" onClick={onClose} />
      </div>

      <CleanSpaceLargeFiles
        files={largeFiles}
        onDeleteFile={onDeleteFile}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />

      <CleanSpaceDuplicated groups={duplicateGroups} onDeleteDuplicates={onDeleteDuplicates} />
    </div>
  )
}

export { CleanSpaceStorage }
