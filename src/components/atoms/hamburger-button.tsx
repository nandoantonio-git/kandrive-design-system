import * as React from "react"

import { cn } from "@/lib/utils"
import HamburgerGlyph from "@/assets/icons/MobileHamburger.svg?react"
import HamburgerExpandGlyph from "@/assets/icons/MobileHamburgerExpand.svg?react"

export interface HamburgerButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  /** Figma `atom/Icon/Hamburger` `Mode`: closed (abre a gaveta) · expand (dentro da gaveta, fecha). */
  mode?: "closed" | "expand"
}

/**
 * Botão ☰ do Header mobile. Glifo do `atom/Icon/Hamburger` (`1637:23253`),
 * exportado do Figma. Abre a gaveta (`SidebarDrawer`) em todas as telas
 * mobile, exceto as de feedback visual (decisão de responsividade, 2026-09-24).
 *
 * 🧩 Regra 8: pressed e disabled não desenhados no Figma. O eixo `Mode` do
 * Figma também tem `Open` e `Collapse`, ainda sem glifo exportado aqui.
 */
function HamburgerButton({ mode = "closed", className, ...props }: HamburgerButtonProps) {
  const Glyph = mode === "closed" ? HamburgerGlyph : HamburgerExpandGlyph
  return (
    <button
      type="button"
      data-slot="hamburger-button"
      aria-label={mode === "closed" ? "Abrir menu" : "Fechar menu"}
      aria-expanded={mode === "expand"}
      className={cn(
        "touch-target inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-text-tertiary transition-[color,background-color,transform] hover:bg-neutral-surface-subtle motion-safe:active:scale-95",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <Glyph aria-hidden="true" className={mode === "closed" ? "h-[15px] w-[18px]" : "h-[17px] w-[18px]"} />
    </button>
  )
}

export { HamburgerButton }
