import * as React from "react"

import { cn } from "@/lib/utils"

export interface SwitchProps
  extends Omit<React.ComponentProps<"button">, "onChange" | "children"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

/**
 * atom/switch (`1454:20959`) — Figma-confirmado: "botao de switch(liga e
 * desliga funções)". 2 variantes (`State=off`/`State=on`), track 36×20,
 * thumb 16×16 deslizando 18px. Implementado como `<button role="switch">`
 * (controle real, não `<input type="checkbox">` estilizado) para expor
 * `aria-checked` diretamente, igual convenção já usada em `PushButton`
 * (`data-slot`, `aria-*` nativos em vez de wrapper).
 *
 * 🧩 Inferido (Regra 9): `bg-white` do thumb mantido sem `dark:` — é o knob
 * de controle (não uma superfície neutra de página), precisa de contraste
 * contra a track em ambos os temas; espelhar pra `zinc-900` o esconderia
 * contra a track escura (`dark:bg-[#27272a]`).
 *
 * 🧩 Regra 8: hover da track não desenhado no Figma; o pressed (thumb
 * encolhe) responde ao `:active` do botão inteiro, não só do thumb.
 */
function Switch({
  className,
  checked = false,
  disabled,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      data-state={checked ? "on" : "off"}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "group inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5",
        "transition-colors motion-safe:duration-150",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
        "disabled:pointer-events-none disabled:opacity-50",
        checked
          ? "bg-brand-teal-action hover:bg-brand-teal-action/90"
          : "bg-[#d9d9d9] hover:bg-[#d9d9d9]/80 dark:bg-[#27272a] dark:hover:bg-[#27272a]/80",
        className
      )}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        aria-hidden="true"
        className={cn(
          "block size-4 rounded-full bg-white shadow-sm",
          "transition-transform motion-safe:duration-150 motion-safe:group-active:scale-90",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  )
}

export { Switch }
