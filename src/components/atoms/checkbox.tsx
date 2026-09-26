import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.ComponentProps<"button">, "onChange"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Figma `Size`: sm (16px, listas no desktop) · md (20px, linhas no mobile). */
  size?: "sm" | "md"
  /** Obrigatório: o checkbox não tem texto visível próprio. */
  "aria-label": string
}

/**
 * `atom/Checkbox`: Figma-confirmado no KanDrive V0.2.1 (`3051:9590`), com
 * eixos `Size` (SM · MD) × `Selected` (false · true). Foi extraído de
 * `molecule/CleanSpaceListSelection`, que tinha o markup inline, sem mudar o
 * comportamento: `<button role="checkbox">` com `aria-checked`, que responde a
 * clique, Espaço e Enter.
 *
 * - SM: Figma-confirmado nos dois estados (vem de CleanSpaceListSelection).
 * - MD desmarcado: Figma-confirmado nas telas mobile, com borda
 *   `Brand/Primary/Light` e sem fundo.
 * - 🧩 MD marcado: no próprio Figma é o SM marcado ampliado (raio 5).
 * - Hover, active e focus-visible: extensão de engenharia (Regra 8), sem
 *   eixo `Hover` no Figma.
 */
function Checkbox({ checked = false, onCheckedChange, size = "sm", className, onClick, ...props }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-slot="checkbox"
      data-state={checked ? "checked" : "unchecked"}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) onCheckedChange?.(!checked)
      }}
      className={cn(
        "flex shrink-0 cursor-pointer items-center justify-center border transition-colors",
        "focus-visible:ring-3 focus-visible:ring-brand-teal/50 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "size-4 rounded-[4px] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]" : "size-5",
        checked
          ? cn(
              "border-transparent bg-brand-teal-action hover:bg-brand-teal-action/90 active:bg-brand-teal-action/80",
              size === "md" && "rounded-[5px]"
            )
          : size === "sm"
            ? "border-[#ececf0] bg-zinc-500/20 hover:bg-zinc-500/30 active:bg-zinc-500/40 dark:border-[#3f3f46] dark:bg-zinc-400/20 dark:hover:bg-zinc-400/30 dark:active:bg-zinc-400/40"
            : "rounded-[4px] border-brand-teal-light bg-transparent hover:bg-brand-teal-light/20 active:bg-brand-teal-light/30",
        className
      )}
      {...props}
    >
      {checked ? (
        <Check aria-hidden="true" strokeWidth={2.5} className={cn("text-brand-teal-foreground", size === "sm" ? "size-3" : "size-3.5")} />
      ) : null}
    </button>
  )
}

export { Checkbox }
