import * as React from "react"

import { cn } from "@/lib/utils"

export type FreeModeMiniMapProps = React.ComponentProps<"div">

/**
 * molecule/FreeMode/MiniMap (`1422:24802`, "Mini-Map", Figma-confirmado) —
 * extraído do markup inline de `template/MainCanvas/Organization/FreeMode`
 * (`1439:16906`), que era a única sub-peça do canvas de modo livre ainda
 * não separada em molecule própria.
 *
 * Corrigido em 2026-08-27 (achado do usuário: "mini map ainda não está
 * congruente com o Figma") — releitura fresca via `get_design_context` no
 * nó real mostra uma composição bem mais específica do que a aproximação
 * anterior (3 quadrados cinza genéricos + 1 retângulo com borda teal):
 * fundo `rgba(107,107,104,0.18)` (`--neutral-surface-ghost-map`, mesma
 * família "ghost" já usada no "Node Grouping Frame" do canvas) + borda
 * `#ececf0` (`--neutral-border-subtle`); um retângulo "Viewport indicator"
 * (`rgba(107,107,104,0.45)`, borda `#3a3a3a`) contendo um retângulo menor
 * "Mini visual representations" com borda teal (`--brand-primary-default`,
 * `#007e96` — mesmo valor de `--brand-teal` deste catálogo) + um overlay
 * claro (`rgba(234,234,234,0.6)`); 4 quadrados escuros soltos
 * (`--neutral-text-secondary`, `#3f3f46`) representando nós fora do
 * viewport; e uma linha inferior com 2 blocos placeholder (sem
 * preenchimento confirmado no node — Regra 9, mantidos neutros).
 * Nenhum dos tokens de cor acima (`--neutral-surface-ghost-map`,
 * `--neutral-border-subtle`, `--effect-overlay-secondary/-strong/-light`,
 * `--neutral-border-strong`) existe em `src/index.css` — usados como
 * literais hex/rgba (Regra 3, mesmo critério já aplicado a outros gaps de
 * paleta neutra do catálogo). Posições/tamanhos convertidos das
 * porcentagens `inset()` do node real para px absolutos (container fixo
 * 192×128, sem necessidade de responsividade).
 *
 * 🧩 Inferido (Regra 9): cores em modo escuro não têm variante Figma
 * própria — derivadas invertendo a direção do tint (escuro→claro) igual
 * ao resto do catálogo, nunca apresentadas como Figma-confirmadas.
 *
 * Miniatura estática de visão geral do canvas — Figma-confirmado como
 * elemento só visual (`aria-hidden`), sem pan/zoom real: os blocos e o
 * retângulo de "viewport" são decorativos, não refletem posição real dos
 * nós do canvas (Regra 9: nunca apresentar como funcionalidade real).
 */
function FreeModeMiniMap({ className, ...props }: FreeModeMiniMapProps) {
  // Figma `Mini-Map` (`1422:24802`), 192×128: cartão `Neutral/Surface/Card` com borda `Neutral/Border/Subtle`,
  // raio 12 e 60% de opacidade. Posições absolutas iguais às do nó (2026-09-29). A linha de rótulos que o
  // Figma tem em y=127 fica fora da área e é cortada, então não aparece.
  return (
    <div
      aria-hidden="true"
      data-slot="free-mode-mini-map"
      className={cn(
        "relative h-32 w-48 overflow-hidden rounded-xl border border-[#ececf0] bg-neutral-surface-card opacity-60",
        "dark:border-[rgba(255,255,255,0.14)]",
        className
      )}
      {...props}
    >
      {/* Viewport indicator */}
      <div className="absolute top-[21px] left-[31px] h-[92px] w-[140px] rounded-[6px] border border-[#3a3a3a] bg-[rgba(107,107,104,0.45)] dark:border-[rgba(255,255,255,0.4)] dark:bg-[rgba(255,255,255,0.16)]" />
      {/* Nó selecionado (borda teal) com o overlay claro dentro */}
      <div className="absolute top-[34px] left-[50px] h-[35px] w-[38px] rounded-[4px] border border-brand-teal bg-[rgba(58,58,58,0.9)] dark:bg-[rgba(0,0,0,0.6)]" />
      <span className="absolute top-[43px] left-[55px] h-[18px] w-[17px] rounded-[4px] bg-[rgba(234,234,234,0.6)] dark:bg-[rgba(255,255,255,0.35)]" />
      {/* Os outros 4 nós */}
      <span className="absolute top-[36px] left-[97px] h-[18px] w-[17px] rounded-[4px] bg-[#3f3f46] dark:bg-[rgba(255,255,255,0.55)]" />
      <span className="absolute top-[62px] left-[97px] h-[18px] w-[17px] rounded-[4px] bg-[#3f3f46] dark:bg-[rgba(255,255,255,0.55)]" />
      <span className="absolute top-[46px] left-[123px] h-[18px] w-[17px] rounded-[4px] bg-[#3f3f46] dark:bg-[rgba(255,255,255,0.55)]" />
      <span className="absolute top-[46px] left-[146px] h-[18px] w-[17px] rounded-[4px] bg-[#3f3f46] dark:bg-[rgba(255,255,255,0.55)]" />
    </div>
  )
}

export { FreeModeMiniMap }
