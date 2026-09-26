import * as React from "react"

import { cn } from "@/lib/utils"
import DefaultChevron from "@/assets/icons/FaqCollapsedChevron.svg?react"

export interface AccordionItemProps extends Omit<React.ComponentProps<"details">, "children"> {
  /** Figma: propriedade de texto `Question`. */
  question: React.ReactNode
  /** Resposta, visível quando o item está aberto. */
  children: React.ReactNode
  /** Glifo do chevron. Os dois cards de FAQ usam desenhos diferentes no Figma. */
  chevron?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/**
 * `molecule/AccordionItem`: uma pergunta e sua resposta no FAQ.
 * Figma-confirmado no KanDrive V0.2.1 (`3051:9641`), eixo `Expanded`
 * (true · false). Foi extraído do markup que `FaqInfoCard` e
 * `FaqInfoCardCollapsed` repetiam (Regra 10).
 *
 * Usa `<details>`/`<summary>` nativos, então teclado, leitor de tela e estado
 * aberto/fechado vêm do navegador. Use `open` ou `defaultOpen` via atributo
 * `open` do `<details>`.
 *
 * - Expanded=true: Figma-confirmado, vem da tela de FAQ.
 * - 🧩 Expanded=false: no Figma é o mesmo item sem o painel e com o chevron
 *   girado; aqui, o giro de 180° é o do `FaqInfoCardCollapsed`.
 */
function AccordionItem({ question, children, chevron: Chevron = DefaultChevron, className, ...props }: AccordionItemProps) {
  return (
    <details
      data-slot="accordion-item"
      className={cn("group border-b border-zinc-500/20 py-4 last:border-b-0 dark:border-zinc-400/20", className)}
      {...props}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-2 text-sm font-medium text-brand-secondary-dark [&::-webkit-details-marker]:hidden">
        {question}
        <Chevron
          className="mt-0.5 size-4 shrink-0 transition-transform motion-safe:duration-150 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pt-2 text-[0.8125rem] leading-normal text-brand-secondary-light">{children}</div>
    </details>
  )
}

export { AccordionItem }
