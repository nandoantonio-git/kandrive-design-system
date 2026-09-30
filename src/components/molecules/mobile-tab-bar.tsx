import * as React from "react"

import { cn } from "@/lib/utils"
import HomeGlyph from "@/assets/icons/MobileTabHome.svg?react"
import OrganizeGlyph from "@/assets/icons/MobileTabOrganize.svg?react"
import KeepGlyph from "@/assets/icons/MobileTabKeep.svg?react"

export type MobileTab = "home" | "organize" | "keep"

const TABS: { value: MobileTab; label: string; Glyph: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
  { value: "home", label: "Início", Glyph: HomeGlyph },
  { value: "organize", label: "Organizar", Glyph: OrganizeGlyph },
  { value: "keep", label: "Guardar", Glyph: KeepGlyph },
]

export interface MobileTabBarProps extends Omit<React.ComponentProps<"nav">, "onChange"> {
  /** Aba ativa — controlada; quando omitida, o componente guarda a última tocada. */
  active?: MobileTab
  defaultActive?: MobileTab
  onTabChange?: (tab: MobileTab) => void
}

/**
 * `molecule/MobileTabBar`: Figma-confirmado no KanDrive V0.2.1 (`3029:3996`).
 * Barra de vidro flutuante no topo das telas de arquivos no mobile, logo
 * abaixo do Header, com as ações principais do app: Home · Organizar ·
 * Guardar. No desktop, essas ações ficam no Header (decisão de 2026-09-24).
 *
 * - Aba ativa: fundo `Effect/Overlay/Light` a 60% e cor `Brand/Primary/Default`.
 * - Abas inativas: `Text/Tertiary`.
 * - O vidro segue a receita de Liquid Glass da Regra 10.
 * - ⚠️ No Figma, os rótulos têm 10px. Aqui têm 11px, o piso de microtexto da Regra 4.
 * - 🧩 Regra 8: hover, pressed e foco não desenhados no Figma.
 */
function MobileTabBar({ active: controlledActive, defaultActive = "home", onTabChange: onTabChangeProp, className, ...props }: MobileTabBarProps) {
  const [internalActive, setInternalActive] = React.useState(defaultActive)
  const active = controlledActive ?? internalActive
  const onTabChange = (next: MobileTab) => {
    if (controlledActive === undefined) setInternalActive(next)
    onTabChangeProp?.(next)
  }
  return (
    <nav
      data-slot="mobile-tab-bar"
      aria-label="Ações principais"
      className={cn(
        "glass-edge glass-shadow-sm relative inline-flex h-[50px] items-center gap-[27px] rounded-full bg-effect-glass-white-50 px-2 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {TABS.map(({ value, label, Glyph }) => {
        const selected = value === active
        return (
          <button
            key={value}
            type="button"
            aria-current={selected ? "page" : undefined}
            onClick={() => onTabChange?.(value)}
            className={cn(
              "touch-target flex min-w-[47px] cursor-pointer flex-col items-center gap-1 rounded-2xl px-1.5 py-1 transition-[color,background-color,opacity] active:opacity-70",
              "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
              selected ? "bg-effect-overlay-light/60 text-brand-teal" : "text-neutral-text-tertiary hover:text-brand-teal"
            )}
          >
            <Glyph aria-hidden="true" className="size-5" />
            <span className="text-[0.6875rem] leading-none">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export { MobileTabBar }
