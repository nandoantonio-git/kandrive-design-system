import * as React from "react"

import { cn } from "@/lib/utils"

export interface SelectBoxProps extends Omit<React.ComponentProps<"select">, "value" | "defaultValue" | "onChange"> {
  options: readonly string[]
  /** Controlado; quando omitido, o componente guarda a última escolha. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

/**
 * molecule/SelectBox (`3029:3847`): caixa de escolha de 280×36, raio 6, `Effect/Glass/White/70`,
 * borda `Neutral/Border/Medium`, texto 14px `Neutral/Text/Primary` e seta `Neutral/Text/Tertiary`.
 *
 * 🧩 Regra 8: o Figma desenha só a caixa fechada. Aqui ela é um `<select>` nativo com a mesma
 * aparência, para abrir, escolher e funcionar por teclado e leitor de tela sem inventar uma lista.
 * Antes, nas Configurações, era um `div` que só mostrava o texto.
 */
function SelectBox({ options, value, defaultValue, onValueChange, className, ...props }: SelectBoxProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? options[0])
  const current = value ?? internal
  return (
    <div data-slot="select-box" className={cn("relative h-9 w-[280px]", className)}>
      <select
        value={current}
        onChange={(event) => {
          if (value === undefined) setInternal(event.target.value)
          onValueChange?.(event.target.value)
        }}
        className="h-full w-full cursor-pointer appearance-none rounded-md border border-[#d4d4d4] bg-effect-glass-white-70 pr-8 pl-3 text-sm text-neutral-text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 dark:border-[#52525b] dark:text-zinc-100"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-neutral-text-tertiary dark:text-zinc-400">
        ⌄
      </span>
    </div>
  )
}

export { SelectBox }
