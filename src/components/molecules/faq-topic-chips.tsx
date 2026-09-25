import * as React from "react"

import { cn } from "@/lib/utils"
import { Chip } from "@/components/atoms/chip"

export interface FaqTopicChip {
  /** `id` da seção de destino na página. */
  targetId: string
  label: string
}

export interface FaqTopicChipsProps extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  topics: FaqTopicChip[]
  /** Tópico atual (opcional). */
  active?: string
  onSelect?: (targetId: string) => void
}

/**
 * Links rápidos do FAQ no mobile (Figma KanDrive V0.2.1, `FaqQuickLinks` em
 * `FAQ/Collapsed` e `FAQ/Expanded` Mobile; F6, aprovado em 2026-09-24). Faixa
 * horizontal de `atom/Chip` com os tópicos, logo abaixo do título, que rola
 * para o lado. Tocar num chip rola a página até a seção. No desktop, o papel é
 * do `FaqFastLinks` lateral.
 */
function FaqTopicChips({ topics, active, onSelect, className, ...props }: FaqTopicChipsProps) {
  return (
    <nav
      data-slot="faq-topic-chips"
      aria-label="Tópicos"
      className={cn("-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}
      {...props}
    >
      {topics.map((topic) => (
        <Chip
          key={topic.targetId}
          selected={topic.targetId === active}
          onClick={() => {
            onSelect?.(topic.targetId)
            document.getElementById(topic.targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
          }}
        >
          {topic.label}
        </Chip>
      ))}
    </nav>
  )
}

export { FaqTopicChips }
