import * as React from "react"

import { cn } from "@/lib/utils"

export type SkeletonRowProps = React.ComponentProps<"div">

/**
 * molecule/SkeletonRow (`3028:3722`): a linha de arquivo enquanto a lista carrega
 * (Figma `Home/ListLoading/Mobile`). 358×56, raio 16, `Surface/Background/Alt` com borda
 * `Border/Subtle`; miniatura 36×32, duas linhas de texto (165×14 e 60×10) e o tamanho à direita (40×12).
 *
 * Decorativa: quem mostra a lista marca o contêiner com `aria-busy` e anuncia o carregamento.
 * 🧩 Regra 8: o pulso de carregamento não está no Figma; some com `prefers-reduced-motion`.
 */
function SkeletonRow({ className, ...props }: SkeletonRowProps) {
  return (
    <div
      data-slot="skeleton-row"
      aria-hidden="true"
      className={cn(
        "flex h-14 w-full max-w-[358px] items-center gap-4 rounded-2xl border border-[#ececf0] bg-neutral-surface-background-alt p-3 motion-safe:animate-pulse dark:border-zinc-700 dark:bg-zinc-800",
        className
      )}
      {...props}
    >
      <span className="h-8 w-9 shrink-0 rounded-md bg-[#eaeaea] dark:bg-zinc-700" />
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="h-3.5 w-[165px] max-w-full rounded bg-[#eaeaea] dark:bg-zinc-700" />
        <span className="h-2.5 w-[60px] rounded bg-[#ececf0] dark:bg-zinc-600" />
      </span>
      <span className="h-3 w-10 shrink-0 rounded bg-[#eaeaea] dark:bg-zinc-700" />
    </div>
  )
}

export { SkeletonRow }
