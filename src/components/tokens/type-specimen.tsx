import * as React from "react"

import { cn } from "@/lib/utils"
import { useCopy } from "@/components/tokens/token-swatch"

export interface TypeScaleEntry {
  token: string
  weightLabel: string
  fontWeight: number
  sizePx: number
  sizeRem: string
  lineHeight: string
  tracking: string
  /** Classe Tailwind arbitrária que reproduz este token — só o essencial (tamanho), peso/tracking ficam no preview. */
  cssSnippet: string
}

/**
 * Especime tipográfico ao vivo — 1 linha por token da escala, renderizando
 * o texto no tamanho/peso/line-height/tracking reais (não só descrevendo
 * em tabela). Nome do token e classe Tailwind copiáveis ao clicar (mesmo
 * padrão de `TokenSwatch`/`ColorSwatch`).
 */
function TypeSpecimen({ token, weightLabel, fontWeight, sizePx, sizeRem, lineHeight, tracking, cssSnippet }: TypeScaleEntry) {
  const { copied, copy } = useCopy()
  return (
    <div
      data-slot="type-specimen"
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-zinc-100 py-3 last:border-b-0"
    >
      <span
        className="min-w-0 truncate text-zinc-900"
        style={{ fontFamily: "Figtree, sans-serif", fontWeight, fontSize: sizeRem, lineHeight }}
      >
        Aa Kandrive
      </span>
      <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
        <button
          type="button"
          onClick={() => copy(token)}
          className="cursor-pointer text-xs font-semibold text-zinc-900 hover:text-brand-teal"
          title="Copiar nome do token"
        >
          {copied === token ? "Copiado!" : token}
        </button>
        <span className="text-[0.6875rem] text-zinc-500">
          {weightLabel} · {sizePx}px · {lineHeight} lh
        </span>
        <button
          type="button"
          onClick={() => copy(cssSnippet)}
          className="cursor-pointer"
          title="Copiar classe Tailwind"
        >
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.625rem] text-zinc-500 hover:text-brand-teal">
            {copied === cssSnippet ? "Copiado!" : cssSnippet}
          </code>
        </button>
      </div>
    </div>
  )
}

export interface TypeScaleProps {
  entries: TypeScaleEntry[]
  className?: string
}

function TypeScale({ entries, className }: TypeScaleProps) {
  return (
    <div data-slot="type-scale" className={cn("flex flex-col rounded-xl border border-zinc-200 bg-white p-4", className)}>
      {entries.map((entry) => (
        <TypeSpecimen key={entry.token} {...entry} />
      ))}
    </div>
  )
}

export { TypeSpecimen, TypeScale }
