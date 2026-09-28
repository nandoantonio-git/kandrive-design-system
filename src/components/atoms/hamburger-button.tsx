import * as React from "react"

import { cn } from "@/lib/utils"

export interface HamburgerButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  /** Figma `atom/Icon/Hamburger` `Mode`: closed (abre a gaveta) · expand (dentro da gaveta, fecha). */
  mode?: "closed" | "expand"
  /**
   * Congela o hover para a documentação: mostra `Mode=Open` (em `closed`) ou
   * `Mode=Collapse` (em `expand`) sem precisar passar o mouse.
   */
  forceHover?: boolean
}

/**
 * Posição das 3 barras (topo, largura, x) numa caixa de 18×17, tiradas dos
 * retângulos de cada variante do `atom/Icon/Hamburger` (`1637:23253`). As
 * variantes mais baixas (15 e 13px) ficam centradas na caixa.
 */
const BARS = {
  closed: [
    "top-px w-[18px] left-0",
    "top-[7px] w-[18px] left-0",
    "top-[13px] w-[18px] left-0",
  ],
  open: [
    "top-0 w-[18px] left-0",
    "top-[7px] w-3 left-[3px]",
    "top-[14px] w-[18px] left-0",
  ],
  collapse: [
    "top-[2px] w-[18px] left-0",
    "top-[7px] w-[22px] -left-[2px]",
    "top-[12px] w-[18px] left-0",
  ],
} as const

const HOVER = {
  closed: [
    "group-hover:top-0 group-data-[hover]:top-0",
    "group-hover:w-3 group-hover:left-[3px] group-data-[hover]:w-3 group-data-[hover]:left-[3px]",
    "group-hover:top-[14px] group-data-[hover]:top-[14px]",
  ],
  expand: [
    "group-hover:top-[2px] group-data-[hover]:top-[2px]",
    "group-hover:w-[22px] group-hover:-left-[2px] group-data-[hover]:w-[22px] group-data-[hover]:-left-[2px]",
    "group-hover:top-[12px] group-data-[hover]:top-[12px]",
  ],
} as const

/**
 * Botão ☰ do Header mobile, desenhado a partir do `atom/Icon/Hamburger`
 * (`1637:23253`). Abre a gaveta (`SidebarDrawer`) em todas as telas mobile,
 * exceto as de feedback visual (decisão de responsividade, 2026-09-24).
 *
 * **Morph (2026-09-28)**: o protótipo do Figma liga as 4 variantes por hover
 * com Smart Animate — `Closed` → `Open` em 200ms (a barra do meio encolhe
 * para 12px) e `Expand` → `Collapse` em 400ms (a do meio passa das bordas,
 * 22px). Antes o código trocava dois SVGs parados e não tinha `Open` nem
 * `Collapse`. Agora as 3 barras são elementos próprios e a transição CSS
 * anima topo, largura e posição, com as durações do Figma. `Expand` tem o
 * mesmo desenho de `Open`: clicar com o mouse em cima não dá salto.
 * Sem animação quando o sistema pede movimento reduzido.
 *
 * 🧩 Regra 8: pressed e disabled não desenhados no Figma.
 */
function HamburgerButton({ mode = "closed", forceHover = false, className, ...props }: HamburgerButtonProps) {
  const base = mode === "closed" ? BARS.closed : BARS.open
  const hover = HOVER[mode]
  return (
    <button
      type="button"
      data-slot="hamburger-button"
      data-mode={mode}
      data-hover={forceHover || undefined}
      aria-label={mode === "closed" ? "Abrir menu" : "Fechar menu"}
      aria-expanded={mode === "expand"}
      className={cn(
        "group touch-target inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-text-tertiary transition-[color,background-color,transform] hover:bg-neutral-surface-subtle motion-safe:active:scale-95",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="relative block h-[17px] w-[18px]">
        {base.map((position, index) => (
          <span
            key={index}
            className={cn(
              "absolute h-[3px] rounded-full bg-current transition-[top,left,width] ease-in-out motion-reduce:transition-none",
              mode === "closed" ? "duration-200" : "duration-400",
              position,
              hover[index]
            )}
          />
        ))}
      </span>
    </button>
  )
}

export { HamburgerButton }
