import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"

export interface BreadcrumbProps extends Omit<React.ComponentProps<"nav">, "children"> {
  segments: string[]
}

/**
 * Navigation - Breadcrumb (`1421:19875`, Figma-confirmado: nome de layer
 * fora da convenção `atom/molecule/organism` — ver `docs/figma-inventory.md`
 * achado #7-adjacente) — trilha de navegação usada no topo do conteúdo
 * principal das páginas (`page/Home/*`, confirmada nos nós `1439:19646`,
 * `1439:19804`, `1439:19843`). Único segmento confirmado até agora: "Home"
 * (`Figtree Regular`, `14px`, `text-brand-primary-default`). Prop
 * `segments` generalizada pra múltiplos níveis seguindo o mesmo padrão já
 * usado no breadcrumb de `molecule/ArchiveBrowserModal/Search`
 * (`archive-browser-modal-search.tsx`) — não confirmado com mais de 1
 * segmento nas páginas lidas até agora, mas o conceito de navegação
 * aninhada já existe no produto (ver breadcrumb da modal).
 */
function Breadcrumb({ segments, className, ...props }: BreadcrumbProps) {
  return (
    <nav data-slot="breadcrumb" className={cn("flex items-center gap-2", className)} {...props}>
      {segments.map((segment, index) => (
        <React.Fragment key={segment}>
          {index > 0 ? (
            <Icon name="ChevronRight" aria-hidden="true" className="size-3.5 shrink-0 text-zinc-400" />
          ) : null}
          <span
            className={cn(
              "text-sm whitespace-nowrap text-zinc-500",
              index === segments.length - 1 && "text-brand-teal"
            )}
          >
            {segment}
          </span>
        </React.Fragment>
      ))}
    </nav>
  )
}

export { Breadcrumb }
