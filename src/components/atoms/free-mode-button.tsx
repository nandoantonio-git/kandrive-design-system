import * as React from "react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FreeModeButtonProps extends React.ComponentProps<"button"> {
  label: string
}

/**
 * atom/FreeModeButton (`1384:16745`): o botão de ação do painel de regras do modo livre
 * ("+ Adicionar regra"). 32px, raio 6, borda 0.5 `Neutral/Border/Default`, 16px de padding lateral,
 * 8px entre o "+" e o rótulo. Default: fundo `Effect/Glass/White/05`, rótulo `Brand/Primary/Mid`.
 * Pressed: fundo `Brand/Primary/Action`, rótulo branco. Disabled: rótulo `Neutral/Text/Disabled` a 50%.
 *
 * ⚠️ O Figma usa rótulo de 10px; aqui é 16px, pelo piso de legibilidade da Regra 4.
 */
function FreeModeButton({ label, className, ...props }: FreeModeButtonProps) {
  return (
    <button
      type="button"
      data-slot="free-mode-button"
      className={cn(
        "group inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border-[0.5px] border-[var(--neutral-border-default,#707070)] bg-white/5 px-4 text-base text-brand-primary-mid transition-colors duration-150",
        "hover:bg-[#71717a1a] active:bg-brand-teal-action active:text-white",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
        "disabled:cursor-not-allowed disabled:text-[#ccced6] disabled:opacity-50 disabled:hover:bg-white/5",
        className
      )}
      {...props}
    >
      <Plus aria-hidden="true" className="size-4 shrink-0" />
      {label}
    </button>
  )
}

export { FreeModeButton }
