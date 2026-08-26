import * as React from "react"

import { cn } from "@/lib/utils"

export type FreeModeMiniMapProps = React.ComponentProps<"div">

/**
 * molecule/FreeMode/MiniMap — extraído do markup inline de
 * `template/MainCanvas/Organization/FreeMode` (`1439:16906`, achado
 * Figma-confirmado: "Mini-Map"), que era a única sub-peça do canvas de
 * modo livre ainda não separada em molecule própria (ao contrário de
 * `FreeModeItemNode`/`FreeModeOutputNode`/`FreeModeButtons`/`FreeModeAddMenu`).
 *
 * Miniatura estática de visão geral do canvas — Figma-confirmado como
 * elemento só visual (`aria-hidden`), sem pan/zoom real: os blocos e o
 * retângulo de "viewport" são decorativos, não refletem posição real dos
 * nós do canvas (Regra 9: nunca apresentar como funcionalidade real).
 */
function FreeModeMiniMap({ className, ...props }: FreeModeMiniMapProps) {
  return (
    <div
      aria-hidden="true"
      data-slot="free-mode-mini-map"
      className={cn(
        "flex h-32 w-48 flex-col rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 p-2 opacity-60 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="relative flex-1">
        <div className="absolute inset-x-2 top-1 grid grid-cols-3 gap-1">
          <span className="h-4 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-4 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-4 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
        </div>
        <div className="absolute inset-x-4 top-8 h-10 rounded border-2 border-brand-teal/60" />
      </div>
      <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-1">
        <span className="h-1 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="h-1 w-6 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
    </div>
  )
}

export { FreeModeMiniMap }
