import * as React from "react"

import { cn } from "@/lib/utils"
import { TokenSwatch, TokenGrid } from "@/components/tokens/token-swatch"

/** Fundo fixo com formas coloridas — só existe pra dar textura visível por trás do vidro (sem isso, blur/tint não aparecem). */
function GlassBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-32 w-full items-center justify-center overflow-hidden rounded-xl p-4"
      style={{
        background:
          "linear-gradient(135deg, #007e96 0%, #31302d 45%, #b5254a 75%, #e8476a 100%)",
      }}
    >
      <div aria-hidden="true" className="absolute top-2 left-6 size-10 rounded-full bg-white/40" />
      <div aria-hidden="true" className="absolute right-8 bottom-3 size-16 rounded-lg bg-black/20" />
      {children}
    </div>
  )
}

export interface GlassTintEntry {
  token: string
  className: string
  value: string
  role: string
}

export const GLASS_TINTS: GlassTintEntry[] = [
  { token: "effect-glass-white-70", className: "bg-effect-glass-white-70", value: "#ffffffb2", role: "Tint branco, forte" },
  { token: "effect-glass-white-50", className: "bg-effect-glass-white-50", value: "#ffffff80", role: "Tint branco, médio" },
  { token: "effect-glass-white-36", className: "bg-effect-glass-white-36", value: "#ffffff5c", role: "Tint branco, baixo-médio" },
  { token: "effect-glass-light-45", className: "bg-effect-glass-light-45", value: "#f7f7f773", role: "Tint claro (quase-branco), médio" },
  { token: "effect-glass-dark-20", className: "bg-effect-glass-dark-20", value: "#00000033", role: "Tint escuro, sutil" },
  { token: "effect-glass-white-05", className: "bg-effect-glass-white-05", value: "#ffffff0d", role: "Tint branco, opacidade mínima" },
]

/**
 * Demo ao vivo do material Liquid Glass — cada tint renderizado como
 * painel de vidro real (`backdrop-blur-md` + o tint) sobre um fundo fixo
 * com textura, não como amostra de cor sólida (que não mostraria
 * blur/transparência nenhuma). Classe copiável no clique.
 */
function MaterialDemo() {
  return (
    <TokenGrid>
      {GLASS_TINTS.map((tint) => (
        <TokenSwatch
          key={tint.token}
          token={tint.token}
          value={tint.value}
          role={tint.role}
          cssSnippet={cn(tint.className, "backdrop-blur-md")}
          preview={
            <GlassBackdrop>
              <div
                aria-hidden="true"
                className={cn("size-full rounded-lg backdrop-blur-md", tint.className)}
              />
            </GlassBackdrop>
          }
          className="col-span-2"
        />
      ))}
    </TokenGrid>
  )
}

export { MaterialDemo, GlassBackdrop }
