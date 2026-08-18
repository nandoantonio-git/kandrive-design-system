import * as React from "react"

import { cn } from "@/lib/utils"

export interface TokenSwatchProps {
  /** Nome do token (Figma real ou semântico), sempre copiável ao clicar. */
  token: string
  /** Valor renderizável — hex/rem/px, sempre copiável ao clicar. */
  value: string
  /** Papel/uso em 1 linha. */
  role?: string
  /** Classe Tailwind pra aplicar o token, ex. `text-[1.25rem]`. Copiável se informado. */
  cssSnippet?: string
  /** Especime visual real do token (texto renderizado, barra de espaçamento, painel de vidro etc.). */
  preview: React.ReactNode
  className?: string
}

/**
 * Copia pro clipboard e mostra "Copiado!" por 1.2s — sem dependência
 * externa, só `navigator.clipboard` (suportado em todo browser moderno,
 * inclusive dentro do iframe do Storybook).
 */
function useCopy() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = React.useCallback((text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(text)
    window.setTimeout(() => setCopied((current) => (current === text ? null : current)), 1200)
  }, [])
  return { copied, copy }
}

/**
 * Bloco de referência de token — usado em `Tokens/Typography`,
 * `Tokens/Spacing`, `Tokens/Materials` (decisão humana 2026-08-18: as 3
 * páginas só-texto ganham especime visual real + valores copiáveis, mesmo
 * padrão de "experiência de dev" que `Tokens/Colors` já tinha via
 * `ColorSwatch`). Clicar no nome do token ou no valor copia o texto exato
 * pro clipboard — não precisa selecionar manualmente.
 */
function TokenSwatch({ token, value, role, cssSnippet, preview, className }: TokenSwatchProps) {
  const { copied, copy } = useCopy()

  return (
    <div
      data-slot="token-swatch"
      className={cn("flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3", className)}
    >
      <div
        aria-hidden="true"
        className="flex min-h-14 w-full items-center justify-center overflow-hidden rounded-lg border border-black/5 bg-zinc-50 p-2"
      >
        {preview}
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => copy(token)}
          className="cursor-pointer text-left text-[0.6875rem] leading-tight break-all text-zinc-500 hover:text-brand-teal"
          title="Copiar nome do token"
        >
          {copied === token ? "Copiado!" : token}
        </button>
        <button
          type="button"
          onClick={() => copy(value)}
          className="cursor-pointer text-left text-xs font-semibold text-zinc-900 hover:text-brand-teal"
          title="Copiar valor"
        >
          {copied === value ? "Copiado!" : value}
        </button>
        {role ? <p className="text-xs text-zinc-600">{role}</p> : null}
        {cssSnippet ? (
          <button
            type="button"
            onClick={() => copy(cssSnippet)}
            className="cursor-pointer text-left"
            title="Copiar classe Tailwind"
          >
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.625rem] text-zinc-500 hover:text-brand-teal">
              {copied === cssSnippet ? "Copiado!" : cssSnippet}
            </code>
          </button>
        ) : null}
      </div>
    </div>
  )
}

export interface TokenGridProps {
  title?: string
  children: React.ReactNode
  className?: string
}

/** Grade de `TokenSwatch` agrupada por seção — mesmo layout de `ColorPalette`. */
function TokenGrid({ title, children, className }: TokenGridProps) {
  return (
    <div data-slot="token-grid" className={cn("flex flex-col gap-3", className)}>
      {title ? <h3 className="text-sm font-semibold text-zinc-900">{title}</h3> : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">{children}</div>
    </div>
  )
}

export { TokenSwatch, TokenGrid, useCopy }
