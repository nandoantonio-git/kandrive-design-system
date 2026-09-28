import * as React from "react"

import { cn } from "@/lib/utils"

export interface CardNeedMoreHelpProps extends React.ComponentProps<"div"> {
  onContactSupport?: () => void
}

/**
 * organism/CardNeedMoreHelp (`1454:20981`) — Figma-confirmado: "Card para
 * entrar em contato com o suporte". Usa material Liquid Glass
 * (`bg-effect-glass-white-50`) — ver `Tokens/Materials` (Regra 10).
 *
 * 🧩 Regra 8: hover/pressed/foco do link e do botão não desenhados no Figma.
 */
function CardNeedMoreHelp({ onContactSupport, className, ...props }: CardNeedMoreHelpProps) {
  return (
    <div
      data-slot="card-need-more-help"
      className={cn(
        "relative flex w-full max-w-[927px] flex-col items-center gap-6 rounded-3xl glass-edge glass-shadow-sm bg-effect-glass-white-50 py-6",
        className
      )}
      {...props}
    >
      <p className="text-center text-lg font-semibold text-brand-secondary-dark">
        Ainda precisa de ajuda?
      </p>
      <p className="text-center text-sm text-brand-secondary">
        Se sua dúvida não está aqui, fale com o{" "}
        <a href="#suporte" className="rounded-sm font-medium text-brand-teal underline underline-offset-2 transition-opacity hover:opacity-80 active:opacity-70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50">
          suporte
        </a>
        .
      </p>
      <button
        type="button"
        onClick={onContactSupport}
        className={cn(
          "rounded-lg border border-effect-overlay-subtle bg-effect-overlay-subtle px-[17px] py-[9px]",
          "text-base font-medium text-brand-secondary-dark shadow-sm",
          "transition-[color,background-color,transform] hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40 motion-safe:active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50"
        )}
      >
        Falar com o suporte
      </button>
    </div>
  )
}

export { CardNeedMoreHelp }
