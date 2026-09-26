import * as React from "react"

import { cn } from "@/lib/utils"
import type { Hand } from "@/lib/preferences"

const OPTIONS: { value: Hand; label: string }[] = [
  { value: "right", label: "Direita" },
  { value: "left", label: "Esquerda" },
]

export interface HandPickerProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value: Hand
  onValueChange?: (value: Hand) => void
}

/**
 * Seletor da mão dominante: Figma KanDrive V0.2.1, card "Mão dominante" de
 * `Settings/Appearance` e tela `Onboarding/DominantHand` (F5 e F8, aprovados
 * em 2026-09-24). Duas opções, Direita e Esquerda. Cada uma mostra um celular
 * com o botão de ação (FAB) do lado correspondente, como prévia do efeito.
 *
 * - Opção: raio 12, padding 12. Selecionada: borda de 1.5px `Brand/Primary/Default`
 *   e fundo `Brand/Primary/Disabled` (teal claro no Light, teal escuro no Dark).
 *   Não selecionada: borda `Neutral/Border/Subtle`.
 * - Celular: 36×60, raio 8, contorno `Neutral/Text/Tertiary`; barra de base
 *   `Neutral/Border/Subtle`; FAB de 10px em `Brand/Primary/Default`.
 * - É um `radiogroup`: setas trocam a opção, e o rótulo tem 16px (Regra 4).
 */
function HandPicker({ value, onValueChange, className, ...props }: HandPickerProps) {
  return (
    <div
      data-slot="hand-picker"
      role="radiogroup"
      aria-label="Mão dominante"
      className={cn("flex w-full gap-3 tablet:w-fit", className)}
      onKeyDown={(event) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
          event.preventDefault()
          onValueChange?.(value === "right" ? "left" : "right")
        }
      }}
      {...props}
    >
      {OPTIONS.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange?.(option.value)}
            className={cn(
              "flex flex-1 cursor-pointer flex-col items-center gap-2.5 rounded-xl p-3 transition-colors tablet:w-[168px] tablet:flex-none",
              "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
              selected ? "border-[1.5px] border-brand-teal bg-brand-primary-disabled" : "border border-neutral-border-subtle hover:bg-neutral-surface-subtle"
            )}
          >
            <span aria-hidden="true" className="relative h-[60px] w-9 rounded-lg border-[1.5px] border-neutral-text-tertiary">
              <span className="absolute bottom-[4px] left-[3px] h-1.5 w-[27px] rounded-sm bg-neutral-border-subtle" />
              <span className={cn("absolute bottom-[14px] size-2.5 rounded-full bg-brand-teal", option.value === "right" ? "right-[3px]" : "left-[3px]")} />
            </span>
            <span className="flex items-center gap-2 text-base text-neutral-text-primary">
              <span aria-hidden="true" className={cn("flex size-4 items-center justify-center rounded-full border", selected ? "border-brand-teal" : "border-neutral-border-medium")}>
                {selected ? <span className="size-2 rounded-full bg-brand-teal-action" /> : null}
              </span>
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { HandPicker }
