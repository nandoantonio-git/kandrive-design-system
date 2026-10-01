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

/**
 * Recorte da barra sob o FAB (do vetor `Subtract` do Figma, lado esquerdo), 94.67 × 92px. O vidro é uma
 * peça só: o recorte entra como máscara no canto do FAB e o resto da barra como um retângulo. Antes eram duas
 * peças de vidro lado a lado, cada uma com o seu blur, e a peça do recorte saía mais escura que o resto
 * (a "quebra" da barra, achado do usuário em 2026-09-30).
 */
const NOTCH_D =
  "M0 0 L0.634 0.035 C8.607 0.481 15.992 4.184 23.115 7.792 C31.927 12.256 41.706 14 47 14 C52.147 14 61.299 12.351 69.928 7.923 C77.714 3.926 85.917 0 94.669 0 L94.669 92 L0 92 Z"
const NOTCH_W = 94.67
function notchMask(side: "left" | "right"): React.CSSProperties {
  const flip = side === "right" ? ` transform='matrix(-1 0 0 1 ${NOTCH_W} 0)'` : ""
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${NOTCH_W}' height='92' viewBox='0 0 ${NOTCH_W} 92'><path d='${NOTCH_D}'${flip}/></svg>`
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  const other = side === "left" ? "right" : "left"
  const mask = `${url} ${side} top / ${NOTCH_W}px 92px no-repeat, linear-gradient(#000, #000) ${other} top / calc(100% - ${NOTCH_W}px) 100% no-repeat`
  return { mask, WebkitMask: mask }
}

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
 * - Rótulos: 11px. Inativos em `Text/Tertiary`; o do destino atual
 *   em `Brand/Primary/Default`, como o ícone. Corrigido no Figma e no código em
 *   2026-09-24 (F9): antes, todos usavam `Text/Placeholder`, abaixo do
 *   WCAG AA no Light.
 * - Ícones: glifos SF exportados do Figma como SVG em contorno.
 * - FAB: 62px, `Brand/Primary/Action`, glifo branco.
 * - ✕ de cancelar: 44px, `Surface/Fixed/Light`, glifo `destructive`.
 *
 * **Corrigido em 2026-09-25**: os 4 botões de destino não tinham
 * `transition-colors` (confirmado via `git log`: nunca tiveram, não é
 * regressão) — a cor do ícone/rótulo ativo trocava sem transição, diferente
 * do `MobileTabBar`, que já tinha. Adicionado pra consistência.
 *
 * **Corrigido em 2026-09-26** (achado do usuário: "glass não bate com o
 * Figma"): `get_design_context` fresco no nó real confirma
 * `Effect/Shadow/LG` (`0px 8px 40px rgba(0,0,0,0.12)`) na barra — ausente
 * no código. O blur também estava em `backdrop-blur-sm` (4px, o mais fraco
 * da escala Tailwind), destoando dos componentes-irmãos de glass
 * (`MobileTabBar`/`ContextHeader`/`PopoverNotification`, todos
 * `backdrop-blur-md`). Adicionados os dois.
 *
 * **Corrigido em 2026-09-26, 2ª rodada** (usuário revisou de novo: "não
 * reflete o Figma"): o achado anterior (blur/sombra) não era a causa
 * principal. Medido pixel a pixel a screenshot real do Figma
 * (`get_screenshot`) contra o fundo do canvas — barra em `rgb(199,199,199)`
 * sobre fundo `rgb(68,68,68)` resolve pra alpha ≈ 70%, batendo exatamente
 * com o token `--effect-glass-white-70`. O código tinha
 * `bg-effect-glass-white-70/70` — o `/70` extra multiplicava a opacidade
 * já embutida no token (70%) por mais 70%, resultando em ~49% real, bem
 * mais transparente que o Figma. Removido o modificador solto.
 *
 * 🧩 Regra 8: hover/pressed/foco dos destinos, do FAB e do ✕ não desenhados
 * no Figma.
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
  // A sombra mora numa camada só, atrás das duas peças de vidro. Antes cada peça tinha a sua
  // `drop-shadow`, e a sombra da peça reta caía por cima da peça do recorte e escurecia o lado do FAB
  // (a "quebra" da barra, achado do usuário em 2026-09-30).
  const glass = "bg-effect-glass-white-70 backdrop-blur-md"
  return (
    <div data-slot="mobile-bottom-nav" data-hand={hand} data-action={action} className={cn("relative h-[160px] w-full", className)} {...props}>
      {/* Barra: sombra numa camada atrás e o vidro numa peça só (máscara com o recorte do FAB) */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[92px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0px_8px_40px_rgba(0,0,0,0.5)]" />
      <div
        aria-hidden="true"
        className={cn("absolute inset-x-0 bottom-0 h-[92px]", glass)}
        style={action === "none" ? undefined : notchMask(left ? "left" : "right")}
      />

      <nav aria-label="Destinos" className="absolute inset-x-0 bottom-0 grid h-[92px] grid-cols-4 px-2 pt-[26px]">
        {DESTINATIONS.map(({ value, label, Glyph }) => {
          const selected = value === active
          return (
            <button
              key={value}
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => onNavigate?.(value)}
              className="touch-target flex cursor-pointer flex-col items-center gap-2 rounded-lg transition-[color,opacity] hover:opacity-80 active:opacity-60 focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none"
            >
              <span className={cn("flex h-[22px] items-end", selected ? "text-brand-teal" : "text-effect-overlay-default/50")}>
                <Glyph aria-hidden="true" className="h-[19px] w-auto" />
              </span>
              <span className={cn("text-xs leading-[17px]", selected ? "text-brand-teal" : "text-neutral-text-tertiary")}>{label}</span>
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
            "absolute top-0 flex size-[62px] cursor-pointer items-center justify-center rounded-full bg-brand-teal-action text-brand-teal-foreground shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-[background-color,transform] motion-reduce:transition-none hover:bg-brand-teal-action/90",
            "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none motion-safe:active:scale-95",
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
            "absolute top-[9px] flex size-11 cursor-pointer items-center justify-center rounded-full bg-neutral-surface-constant-light text-destructive shadow-[0_0_4px_rgba(0,0,0,0.25)] transition-[opacity,transform] motion-reduce:transition-none hover:opacity-80",
            "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none motion-safe:active:scale-95",
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
