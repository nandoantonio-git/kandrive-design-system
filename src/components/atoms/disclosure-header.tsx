import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface DisclosureHeaderProps extends React.ComponentProps<"span"> {
  /** Figma `Expanded`: `false` aponta para a direita, `true` aponta para baixo. */
  expanded?: boolean
}

/**
 * atom/DisclosureHeader (`95:3068`): a seta que indica um bloco que abre e fecha.
 * No Figma é o símbolo chevron de 11px em negrito, preto 25%. É decorativa: o estado vai no
 * `aria-expanded` do botão que a contém (ex.: `organism/SidebarToggle`).
 */
function DisclosureHeader({ expanded = false, className, ...props }: DisclosureHeaderProps) {
  return (
    <span
      data-slot="disclosure-header"
      data-expanded={expanded || undefined}
      aria-hidden="true"
      className={cn("inline-flex h-3.5 w-6 shrink-0 items-center justify-center text-black/25 dark:text-white/40", className)}
      {...props}
    >
      <ChevronRight
        strokeWidth={3}
        className={cn("size-3 transition-transform duration-200 ease-out motion-reduce:transition-none", expanded && "rotate-90")}
      />
    </span>
  )
}

export { DisclosureHeader }
