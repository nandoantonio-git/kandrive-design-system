import * as React from "react"

import { cn } from "@/lib/utils"
import { Chip } from "@/components/atoms/chip"

export const SETTINGS_SECTIONS = ["Conta", "Armazenamento", "Notificações", "Aparência", "Privacidade", "Idioma", "Excluir conta"] as const
export const PAYMENT_SECTIONS = ["Plano", "Configurações", "Home"] as const

export interface MobileFooterSettingsProps extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  /** Figma `Page`. */
  page?: "settings" | "payment"
  /** Figma `Active`: a seção marcada. */
  active?: string
  onSelect?: (section: string) => void
}

/**
 * `molecule/MobileFooterSettings`: Figma-confirmado no KanDrive V0.2.1
 * (`1756:57824`), com eixos `Page` (Settings · Payment) × `Active`. É a barra
 * de chips na base das telas de Settings e Payment no mobile, no lugar da
 * Sidebar de seções do desktop.
 *
 * - Chip canônico: `atom/Chip` Solid (decisão de 2026-09-24).
 * - A faixa rola na horizontal, e o chip ativo é rolado até ficar visível. No
 *   Figma, as variantes de Privacidade, Idioma e Excluir conta vêm alinhadas
 *   à direita pelo mesmo motivo.
 */
function MobileFooterSettings({ page = "settings", active, onSelect, className, ...props }: MobileFooterSettingsProps) {
  const sections: readonly string[] = page === "settings" ? SETTINGS_SECTIONS : PAYMENT_SECTIONS
  const current = active ?? sections[0]
  const activeRef = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [current])
  return (
    <nav
      data-slot="mobile-footer-settings"
      aria-label={page === "settings" ? "Seções de configurações" : "Navegação de pagamento"}
      className={cn("flex h-[92px] items-start bg-neutral-surface-elevated pt-5", className)}
      {...props}
    >
      <div className="flex w-full gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => (
          <Chip
            key={section}
            ref={section === current ? activeRef : undefined}
            selected={section === current}
            onClick={() => onSelect?.(section)}
          >
            {section}
          </Chip>
        ))}
      </div>
    </nav>
  )
}

export { MobileFooterSettings }
