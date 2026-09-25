import * as React from "react"
import { Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"

export interface CleanSpaceDuplicateGroup {
  name: string
  copiesLabel: string
}

export interface CleanSpaceDuplicatedProps extends React.ComponentProps<"section"> {
  groups: CleanSpaceDuplicateGroup[]
  onDeleteDuplicates?: (group: CleanSpaceDuplicateGroup) => void
}

/**
 * organism/cleanSpaceStorage/Duplicated (`1554:21265`) — Figma-confirmado:
 * seção "Arquivos duplicados" de `template/cleanSpaceStorage` (`1439:16908`),
 * extraída pelo usuário como symbol próprio em 2026-08-20 (antes só existia
 * inline dentro do modal). Conteúdo/texto idêntico ao já verificado em
 * `template/cleanSpaceStorage` (mesmos 2 grupos de exemplo, mesma nota
 * "detecção de duplicados ainda não existe de verdade") — reconciliado via
 * `get_metadata` (estrutura + texto literal batem 100%), sem
 * `get_design_context` extra por não ter sido encontrada nenhuma diferença
 * visual/textual (Regra 9).
 *
 * Extraída de `template/cleanSpaceStorage` (Regra 10 — o template agora
 * compõe este organism em vez de markup duplicado).
 *
 * Corrigido em 2026-08-21 (achado do usuário: "alterou as cores").
 * Releitura fresca de `1439:16908` confirma que este "Section" usa
 * `bg-effect-glass-white-36` (não `-70` — mesmo par "-70 card externo/-36
 * painel aninhado" já estabelecido em `SaveLongTermFileStorage`), e cada
 * botão "Excluir cópias" usa `bg-effect-glass-white-36` +
 * `border-[#bbb]` (`neutral-border-light`, sem token CSS equivalente
 * ainda) — antes `bg-effect-glass-white-70` sem borda própria. Ambos
 * corrigidos.
 */
function CleanSpaceDuplicated({ groups, onDeleteDuplicates, className, ...props }: CleanSpaceDuplicatedProps) {
  return (
    <section
      data-slot="clean-space-duplicated"
      className={cn("flex flex-col gap-3 rounded-lg border border-zinc-200 bg-effect-glass-white-36 p-4 dark:border-zinc-700", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">Arquivos duplicados</h3>
        <span className="rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">Prévia</span>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Detecção de duplicados ainda não existe de verdade, os grupos abaixo são exemplos ilustrativos.
      </p>
      <ul className="flex flex-col gap-2">
        {groups.map((group) => (
          <li key={group.name} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
            <div>
              <p className="text-base text-zinc-900 dark:text-zinc-100">{group.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{group.copiesLabel}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => onDeleteDuplicates?.(group)}
              className="h-8.5 gap-2 rounded-md border-[#bbb] text-destructive hover:text-destructive dark:border-[#52525b] bg-effect-glass-white-36 px-4 text-xs"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Excluir cópias
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export { CleanSpaceDuplicated }
