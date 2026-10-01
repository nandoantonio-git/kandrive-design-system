import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"

export interface CardNeedMoreHelpProps extends React.ComponentProps<"div"> {
  onContactSupport?: () => void
}

/**
 * organism/CardNeedMoreHelp (`1454:20981`) — Figma-confirmado: "Card para
 * entrar em contato com o suporte". Usa material Liquid Glass
 * (`bg-effect-glass-white-50`) — ver `Tokens/Materials` (Regra 10).
 *
 * O botão "Falar com o suporte" usa o `atom/Button` `outline`, como os outros botões secundários do sistema
 * (antes era um `<button>` com estilo próprio, achado do usuário em 2026-09-30).
 *
 * 🧩 Regra 8: hover/pressed/foco do link não desenhados no Figma.
 */
function CardNeedMoreHelp({ onContactSupport, className, ...props }: CardNeedMoreHelpProps) {
  return (
    <div
      data-slot="card-need-more-help"
      className={cn(
        "relative flex w-full max-w-[920px] flex-col items-center gap-6 rounded-3xl glass-edge glass-shadow-sm bg-effect-glass-white-50 py-6",
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
      <Button variant="outline" onClick={onContactSupport}>
        Falar com o suporte
      </Button>
    </div>
  )
}

export { CardNeedMoreHelp }
