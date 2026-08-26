import * as React from "react"

import { cn } from "@/lib/utils"

export interface SettingsCardProps extends React.ComponentProps<"div"> {
  title: string
  caption?: string
}

/**
 * "Card Header" + card raiz — padrão repetido em Figma-confirmado nas 7
 * telas `page/Settings/*` (`1439:19849`/`1439:21072`/`1439:21165`/
 * `1439:21211`/`1439:21268`/`1439:21297`/`1439:21327`): card
 * `w-[1089px]`, `bg-effect-glass-white-50`, `border-[#e5e5e5]`,
 * `rounded-xl`, `p-6`, cabeçalho título (16px semibold) + legenda
 * (13px, `text-zinc-500`). Extraído como molecule único (Regra 1/10) em
 * vez de repetido em cada painel — mesmo shell em todas as 7 telas, só o
 * conteúdo interno muda.
 */
function SettingsCard({ title, caption, className, children, ...props }: SettingsCardProps) {
  return (
    <div
      data-slot="settings-card"
      className={cn(
        "flex w-[1089px] flex-col gap-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-effect-glass-white-50 p-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-base font-semibold text-zinc-950 dark:text-zinc-100">{title}</p>
        {caption ? <p className="text-[0.8125rem] text-zinc-500 dark:text-zinc-400">{caption}</p> : null}
      </div>
      {children}
    </div>
  )
}

export { SettingsCard }
