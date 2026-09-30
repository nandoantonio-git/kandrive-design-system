import * as React from "react"

import { cn } from "@/lib/utils"
import { Chip } from "@/components/atoms/chip"

export const SETTINGS_SECTIONS = ["Conta", "Armazenamento", "Notificações", "Aparência", "Privacidade", "Idioma", "Excluir conta"] as const
export const PAYMENT_SECTIONS = ["Plano", "Configurações", "Home"] as const
export const FAQ_SECTIONS = ["Primeiros passos", "Longo prazo", "Templates", "Etiquetas", "Duplicados", "Armazenamento", "Problemas comuns"] as const

const SECTIONS = { settings: SETTINGS_SECTIONS, payment: PAYMENT_SECTIONS, faq: FAQ_SECTIONS } as const
const LABELS = { settings: "Seções de configurações", payment: "Navegação de pagamento", faq: "Tópicos" } as const

export interface MobileFooterSettingsProps extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  /** Figma `Page`. */
  page?: "settings" | "payment" | "faq"
  /** Figma `Active`: a seção marcada. */
  active?: string
  onSelect?: (section: string) => void
}

/**
 * `molecule/MobileFooterSettings`: Figma-confirmado no KanDrive V0.2.1
 * (`1756:57824`), com eixos `Page` (Settings · Payment · FAQ) × `Active`. É a
 * barra de chips na base das telas de Settings, Payment e FAQ no mobile, no
 * lugar da Sidebar de seções do desktop.
 *
 * - `Page=FAQ` (2026-09-30): os 7 tópicos da página de Perguntas frequentes.
 *   Substitui o antigo `FaqQuickLinks` (e o `FaqTopicChips` do código), que
 *   ficava abaixo do título; no FAQ, tocar num chip rola até o tópico.
 *
 * - Chip canônico: `atom/Chip` Solid (decisão de 2026-09-24).
 * - A faixa rola na horizontal, e o chip ativo é rolado até ficar visível. No
 *   Figma, as variantes de Privacidade, Idioma e Excluir conta vêm alinhadas
 *   à direita pelo mesmo motivo.
 */
function MobileFooterSettings({ page = "settings", active, onSelect, className, ...props }: MobileFooterSettingsProps) {
  const sections: readonly string[] = SECTIONS[page]
  const current = active ?? sections[0]
  const activeRef = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [current])
  return (
    <nav
      data-slot="mobile-footer-settings"
      aria-label={LABELS[page]}
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
