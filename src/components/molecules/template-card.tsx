import * as React from "react"

import { cn } from "@/lib/utils"

export interface TemplateCardProps
  extends Omit<React.ComponentProps<"button">, "onSelect"> {
  eyebrow: string
  title: string
  description: string
  /** Ilustração exportada do Figma (`src/assets/illustrations/template-card-*.svg`). */
  illustration: string
  /** Recebe uma moldura tracejada em vez da ilustração cheia — `1421:19695` variante "Modo Livre". */
  dashedIllustrationFrame?: boolean
  selected?: boolean
}

/**
 * molecule/template-card (`1421:19695`, Figma-confirmado) — card de método
 * de organização usado em `template/DialogSave/OrganizationModal`
 * (`1421:18576`). Extraído do markup inline do template (Regra 10 — o
 * template agora compõe este molecule em vez de reimplementar os 4 cards
 * com dado hardcoded misturado à marcação).
 */
function TemplateCard({
  eyebrow,
  title,
  description,
  illustration,
  dashedIllustrationFrame = false,
  selected = false,
  className,
  ...props
}: TemplateCardProps) {
  return (
    <button
      type="button"
      data-slot="template-card"
      aria-pressed={selected}
      className={cn(
        "flex h-96 w-[217.75px] shrink-0 flex-col items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900",
        "transition-colors hover:border-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50",
        selected && "border-zinc-400 dark:border-zinc-600",
        className
      )}
      {...props}
    >
      <span className="rounded-full border border-brand-teal/40 bg-brand-teal-action/5 px-3 py-1 text-[0.625rem] font-bold tracking-wide text-brand-teal uppercase">
        {eyebrow}
      </span>
      {dashedIllustrationFrame ? (
        <div className="flex size-24 items-center justify-center rounded-lg border-2 border-dashed border-brand-secondary-light p-2">
          <img src={illustration} alt="" aria-hidden="true" className="h-12 w-auto" />
        </div>
      ) : (
        <img src={illustration} alt="" aria-hidden="true" className="h-24 w-auto" />
      )}
      <span className="flex w-full flex-col items-start gap-1.5 px-1.5 text-left">
        <span className="whitespace-nowrap text-xl font-bold text-neutral-text-tertiary dark:text-zinc-400">{title}</span>
        <span className="text-xs text-neutral-text-tertiary dark:text-zinc-400">{description}</span>
      </span>
    </button>
  )
}

export { TemplateCard }
