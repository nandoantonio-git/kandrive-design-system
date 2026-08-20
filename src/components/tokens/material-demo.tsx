import * as React from "react"

import { cn } from "@/lib/utils"
import { TokenSwatch, TokenGrid } from "@/components/tokens/token-swatch"

/** Faixas verticais sólidas da paleta de marca (Tokens/Colors) — a transição nítida entre cores é o que deixa blur/frost visíveis; um gradiente único ou fundo liso não mostra a diferença. */
const BRAND_BANDS = ["#c8dce3", "#007e96", "#31302d", "#b5254a", "#e8476a"]

function bandGradient(colors: string[]) {
  const step = 100 / colors.length
  const stops = colors.flatMap((color, index) => [
    `${color} ${index * step}%`,
    `${color} ${(index + 1) * step}%`,
  ])
  return `linear-gradient(90deg, ${stops.join(", ")})`
}

/**
 * Fundo fixo com faixas de cor — só existe pra dar contraste visível por
 * trás do vidro (sem isso, blur/tint não aparecem).
 *
 * Trocado em 2026-08-20 (decisão humana, inspirada num arquivo Figma
 * community de terceiros consultado como referência nesta conversa — não
 * citado/linkado aqui, só orientou a técnica): antes um gradiente diagonal
 * único com 2 formas; faixas verticais sólidas da própria paleta de marca
 * (`--brand-teal-light/-teal/-secondary/-pink-dark/-pink-light`) tornam a
 * diferença de frost entre tamanhos, e o tint por cima, muito mais legíveis
 * — cada transição de cor "atravessa" o vidro e mostra o blur real.
 */
function GlassBackdrop({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className="relative h-32 w-full overflow-hidden rounded-xl"
      style={{ background: dark ? "#0a0a0a" : bandGradient(BRAND_BANDS) }}
    >
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

/** Borda real do material (`Subcomponent Stroke`, Figma-confirmado via `get_variable_defs`) — sem ela o vidro lê como borrado sem definição, não como uma peça recortada. */
const GLASS_BORDER_CLASS = "border border-[#00000066]"

export interface GlassFrostTierEntry {
  tier: string
  frost: number
  className: string
}

/**
 * Adaptação pra CSS real dos 3 tamanhos Figma-confirmados
 * (`Liquid Glass - Small|Medium|Large`, Frost 7/12/14 — ver tabela acima).
 * `Frost` é um parâmetro do motor de render nativo do Figma sem equivalente
 * direto em CSS; decisão humana 2026-08-20: usar o número do Figma
 * diretamente como raio de `backdrop-blur` em px (`blur-[7px]` etc.) —
 * aproximação deliberada, não uma conversão Figma-confirmada.
 */
const GLASS_FROST_TIERS: GlassFrostTierEntry[] = [
  { tier: "Small", frost: 7, className: "backdrop-blur-[7px]" },
  { tier: "Medium", frost: 12, className: "backdrop-blur-[12px]" },
  { tier: "Large", frost: 14, className: "backdrop-blur-[14px]" },
]

/**
 * Demo ao vivo do material Liquid Glass — cada tint renderizado como
 * painel de vidro real (`backdrop-blur-md` + tint + borda) sobre um fundo
 * fixo com textura, não como amostra de cor sólida (que não mostraria
 * blur/transparência nenhuma). Classe copiável no clique.
 *
 * Corrigido em 2026-08-19 (achado do usuário): faltava a borda
 * (`Subcomponent Stroke`) — sem ela o painel lia como um blur genérico,
 * não como vidro com edge definido.
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
          cssSnippet={cn(tint.className, "backdrop-blur-md", GLASS_BORDER_CLASS)}
          preview={
            <GlassBackdrop>
              <div
                aria-hidden="true"
                className={cn("absolute inset-4 rounded-lg backdrop-blur-md", tint.className, GLASS_BORDER_CLASS)}
              />
            </GlassBackdrop>
          }
          className="col-span-2"
        />
      ))}
    </TokenGrid>
  )
}

/**
 * Comparação visual dos 3 tiers de frost (Small/Medium/Large) — mesmo tint
 * neutro (`effect-glass-white-50`) fixo em todos, só o `backdrop-blur`
 * muda, isolando a variável de tamanho. Antes disso, os 3 tiers só
 * existiam como texto na tabela acima; nenhum swatch mostrava a diferença.
 */
function MaterialFrostDemo() {
  return (
    <TokenGrid>
      {GLASS_FROST_TIERS.map((item) => (
        <TokenSwatch
          key={item.tier}
          token={`Liquid Glass - ${item.tier}`}
          value={`Frost ${item.frost}`}
          role={`Tamanho ${item.tier} — frost mais ${item.tier === "Small" ? "sutil" : item.tier === "Large" ? "forte" : "moderado"}`}
          cssSnippet={cn(item.className, "bg-effect-glass-white-50", GLASS_BORDER_CLASS)}
          preview={
            <GlassBackdrop>
              <div
                aria-hidden="true"
                className={cn("absolute inset-4 rounded-lg bg-effect-glass-white-50", item.className, GLASS_BORDER_CLASS)}
              />
            </GlassBackdrop>
          }
          className="col-span-2"
        />
      ))}
    </TokenGrid>
  )
}

/**
 * Exemplo ilustrativo de tint dinâmico (accent) — o material aceita
 * qualquer cor de tint, não só os 6 neutros Figma-confirmados acima.
 * Usa `--brand-teal` (cor real da marca) só pra ilustrar o conceito;
 * não é um token novo nem está confirmado no arquivo Kandrive.
 */
function MaterialTintedDemo() {
  return (
    <TokenGrid>
      <TokenSwatch
        token="exemplo — tint de marca"
        value="bg-brand-teal/30"
        role="Ilustrativo: o vidro aceita tint de accent color, não só neutros. Não é um token Figma-confirmado."
        cssSnippet={cn("bg-brand-teal/30", "backdrop-blur-md", GLASS_BORDER_CLASS)}
        preview={
          <GlassBackdrop>
            <div
              aria-hidden="true"
              className={cn("absolute inset-4 rounded-lg bg-brand-teal/30 backdrop-blur-md", GLASS_BORDER_CLASS)}
            />
          </GlassBackdrop>
        }
        className="col-span-2"
      />
    </TokenGrid>
  )
}

/**
 * Preview ilustrativo de modo escuro — usa `--effect-glass-surface-dark`
 * (Figma-confirmado, mas sem nenhum componente implementado usando-o: o
 * design system não tem dark theme real hoje). Decisão de escopo
 * 2026-08-20: só documentação conceitual, não implementa toggle de tema.
 */
function MaterialDarkModeDemo() {
  return (
    <TokenGrid>
      <TokenSwatch
        token="effect-glass-surface-dark"
        value="#262626"
        role="Preview ilustrativo — como o material ficaria no modo escuro (Figma tem variante Mode=Dark|Light nos 3 tamanhos). Não é um dark theme implementado no app."
        cssSnippet={cn("bg-effect-glass-surface-dark", "backdrop-blur-md", GLASS_BORDER_CLASS)}
        preview={
          <GlassBackdrop dark>
            <div
              aria-hidden="true"
              className={cn("absolute inset-4 rounded-lg bg-effect-glass-surface-dark backdrop-blur-md", GLASS_BORDER_CLASS)}
            />
          </GlassBackdrop>
        }
        className="col-span-2"
      />
    </TokenGrid>
  )
}

export { MaterialDemo, MaterialFrostDemo, MaterialTintedDemo, MaterialDarkModeDemo, GlassBackdrop }
