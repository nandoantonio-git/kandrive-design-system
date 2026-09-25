import * as React from "react"

import { cn } from "@/lib/utils"
import PersonalGlyph from "@/assets/icons/MobileNavPersonal.svg?react"
import SharedGlyph from "@/assets/icons/MobileNavShared.svg?react"
import RecentGlyph from "@/assets/icons/MobileNavRecent.svg?react"
import FavoriteGlyph from "@/assets/icons/MobileNavFavorite.svg?react"
import PlusGlyph from "@/assets/icons/PlusButtonGlyph.svg?react"
import ConfirmGlyph from "@/assets/icons/ConfirmButtonGlyph.svg?react"
import ClearGlyph from "@/assets/icons/ClearButtonGlyph.svg?react"

export type MobileDestination = "pessoal" | "compartilhados" | "recentes" | "favoritos"

const DESTINATIONS: { value: MobileDestination; label: string; Glyph: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
  { value: "pessoal", label: "Pessoal", Glyph: PersonalGlyph },
  { value: "compartilhados", label: "Compartilhados", Glyph: SharedGlyph },
  { value: "recentes", label: "Recentes", Glyph: RecentGlyph },
  { value: "favoritos", label: "Favoritos", Glyph: FavoriteGlyph },
]

/** Recorte da barra sob o FAB (do vetor `Subtract` do Figma, lado esquerdo). 94.67 × 92px. */
const NOTCH_PATH =
  "path('M0 0 L0.634 0.035 C8.607 0.481 15.992 4.184 23.115 7.792 C31.927 12.256 41.706 14 47 14 C52.147 14 61.299 12.351 69.928 7.923 C77.714 3.926 85.917 0 94.669 0 L94.669 92 L0 92 Z')"

export interface MobileBottomNavProps extends React.ComponentProps<"div"> {
  /** Figma `Action`: add (FAB +) · confirm (FAB ✓ + ✕) · none (sem FAB, barra reta). */
  action?: "add" | "confirm" | "none"
  /** Figma `Hand`: lado do FAB. Vem da preferência "Mão dominante" (Settings → Aparência). */
  hand?: "right" | "left"
  active?: MobileDestination
  onNavigate?: (destination: MobileDestination) => void
  /** Clique no FAB (Adicionar ou Confirmar). */
  onAction?: () => void
  /** Clique no ✕ ao lado do FAB Confirmar. Pela decisão de 2026-09-24, cancelar volta para a Home. */
  onCancel?: () => void
}

/**
 * `organism/MobileBottomNav`: Figma-confirmado no KanDrive V0.2.1 (`1715:9867`),
 * com eixos `Action` (Add · Confirm · None) × `Hand` (Left · Right).
 *
 * Menu contextual na base das telas mobile. Traz os 4 destinos de arquivos
 * (Pessoal · Compartilhados · Recentes · Favoritos), que são o equivalente da
 * Sidebar do desktop, e um botão flutuante (FAB) que adiciona ou confirma
 * conforme a tela.
 *
 * - Barra: vidro `Effect/Glass/White/70` a 70%, com blur de fundo. O recorte
 *   fica no lado do FAB, e a variante None tem a barra reta.
 * - Ícone ativo: `Brand/Primary/Default`. Ícones inativos:
 *   `Effect/Overlay/Default` a 50%.
 * - Rótulos: 11px. Inativos em `Neutral/Text/Tertiary`; o do destino atual
 *   em `Brand/Primary/Default`, como o ícone. Corrigido no Figma e no código em
 *   2026-09-24 (F9): antes, todos usavam `Neutral/Text/Placeholder`, abaixo do
 *   WCAG AA no Light.
 * - Ícones: glifos SF exportados do Figma como SVG em contorno.
 * - FAB: 62px, `Brand/Primary/Action`, glifo branco.
 * - ✕ de cancelar: 44px, `Neutral/Surface/Constant/Light`, glifo `destructive`.
 */
function MobileBottomNav({
  action = "add",
  hand = "right",
  active = "pessoal",
  onNavigate,
  onAction,
  onCancel,
  className,
  ...props
}: MobileBottomNavProps) {
  const left = hand === "left"
  const glass = "bg-effect-glass-white-70/70 backdrop-blur-sm"
  return (
    <div data-slot="mobile-bottom-nav" data-hand={hand} data-action={action} className={cn("relative h-[160px] w-full", className)} {...props}>
      {/* Barra: peça do recorte (largura fixa) + resto fluido */}
      <div className={cn("absolute inset-x-0 bottom-0 flex h-[92px]", left ? "flex-row" : "flex-row-reverse")} aria-hidden="true">
        {action === "none" ? (
          <div className={cn("flex-1", glass)} />
        ) : (
          <>
            <div className={cn("w-[94.67px] shrink-0", glass, !left && "-scale-x-100")} style={{ clipPath: NOTCH_PATH }} />
            <div className={cn("flex-1", glass)} />
          </>
        )}
      </div>

      <nav aria-label="Destinos" className="absolute inset-x-0 bottom-0 grid h-[92px] grid-cols-4 px-2 pt-[26px]">
        {DESTINATIONS.map(({ value, label, Glyph }) => {
          const selected = value === active
          return (
            <button
              key={value}
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => onNavigate?.(value)}
              className="touch-target flex cursor-pointer flex-col items-center gap-2 rounded-lg focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none"
            >
              <span className={cn("flex h-[22px] items-end", selected ? "text-brand-teal" : "text-effect-overlay-default/50")}>
                <Glyph aria-hidden="true" className="h-[19px] w-auto" />
              </span>
              <span className={cn("text-[0.6875rem] leading-[17px]", selected ? "text-brand-teal" : "text-neutral-text-tertiary")}>{label}</span>
            </button>
          )
        })}
      </nav>

      {action !== "none" ? (
        <button
          type="button"
          onClick={onAction}
          aria-label={action === "add" ? "Adicionar" : "Confirmar"}
          className={cn(
            "absolute top-0 flex size-[62px] cursor-pointer items-center justify-center rounded-full bg-brand-teal-action text-brand-teal-foreground shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-transform",
            "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none active:scale-95",
            left ? "left-4" : "right-4"
          )}
        >
          {action === "add" ? <PlusGlyph aria-hidden="true" className="size-7" /> : <ConfirmGlyph aria-hidden="true" className="size-7" />}
        </button>
      ) : null}

      {action === "confirm" ? (
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancelar"
          className={cn(
            "absolute top-[9px] flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-surface-constant-light text-destructive shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-transform",
            "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none active:scale-95",
            left ? "left-[94px]" : "right-[94px]"
          )}
        >
          <ClearGlyph aria-hidden="true" className="size-5" />
        </button>
      ) : null}
    </div>
  )
}

export { MobileBottomNav }
