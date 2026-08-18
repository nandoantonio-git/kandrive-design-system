import * as React from "react"

import { TokenSwatch, TokenGrid } from "@/components/tokens/token-swatch"
import type { SpacingEntry } from "@/components/tokens/spacing-data"

export interface SpacingGridProps {
  entries: SpacingEntry[]
  title?: string
}

/** Barra horizontal no tamanho real do token — largura visual = valor em px (capada em 64px pra não estourar o card). */
function SpacingGrid({ entries, title }: SpacingGridProps) {
  return (
    <TokenGrid title={title}>
      {entries.map((entry) => (
        <TokenSwatch
          key={entry.token}
          token={entry.token}
          value={entry.value}
          role={entry.role}
          cssSnippet={entry.cssSnippet}
          preview={
            <div
              aria-hidden="true"
              className="h-2 rounded-full bg-brand-teal"
              style={{ width: Math.min(entry.px, 64) }}
            />
          }
        />
      ))}
    </TokenGrid>
  )
}

/** Box quadrado com o border-radius real aplicado — o browser clampa sozinho pra pill/circle nos valores grandes. */
function RadiusGrid({ entries, title }: SpacingGridProps) {
  return (
    <TokenGrid title={title}>
      {entries.map((entry) => (
        <TokenSwatch
          key={entry.token}
          token={entry.token}
          value={entry.value}
          role={entry.role}
          cssSnippet={entry.cssSnippet}
          preview={
            <div
              aria-hidden="true"
              className="size-10 bg-brand-teal"
              style={{ borderRadius: entry.px }}
            />
          }
        />
      ))}
    </TokenGrid>
  )
}

export { SpacingGrid, RadiusGrid }
