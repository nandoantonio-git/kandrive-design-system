import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"

export interface SidebarToggleProps extends Omit<React.ComponentProps<"button">, "onToggle"> {
  label?: string
  expanded?: boolean
  state?: "idle" | "hover" | "pressed"
  onToggle?: () => void
}

/**
 * organism/sidebar-toggle (`1421:19118`) — Figma-confirmado: "aba de
 * expandir/colapsar aba de armazenamento da sidebar". Estados Figma-
 * confirmados: `Idle`\|`Hover`\|`Pressed` — mapeados para CSS
 * hover/active nativos e também expostos via prop `state` para stories
 * estáticas auditáveis.
 *
 * Corrigido em auditoria Regra 11 (US-026): screenshot Playwright real
 * comparado contra `get_design_context` mostrou o ícone à esquerda do
 * label ("Armazenamento") completamente ausente — o nó Figma usa um
 * SFSymbol sem `systemName` anotado (glifo de nuvem visível só no
 * screenshot, não exportável nó-a-nó). Implementado inicialmente com
 * `lucide-react`'s `Cloud` como aproximação visual.
 *
 * Corrigido em 2026-08-18 (achado do usuário: ícone não alinhado ao
 * Figma): o glifo real do screenshot é um contorno fino de nuvem, mais
 * próximo do Material Symbol `cloud_queue` já exportado do Figma e
 * registrado em `atom/Icon` (`CloudQueue`, usado noutros pontos do
 * catálogo) do que da forma mais "cheia" do `lucide-react` `Cloud`.
 * Trocado pro asset real — não é Figma-confirmado nó-a-nó (o SFSymbol
 * segue sem `systemName`), mas é a correspondência visual mais fiel
 * disponível no acervo de ícones já exportado, em vez de um substituto de
 * biblioteca terceira.
 */
function SidebarToggle({
  label = "Armazenamento",
  expanded = false,
  state = "idle",
  onToggle,
  className,
  ...props
}: SidebarToggleProps) {
  return (
    <button
      type="button"
      data-slot="sidebar-toggle"
      aria-expanded={expanded}
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-2 py-1 text-base font-medium text-zinc-900",
        "transition-colors hover:bg-zinc-100 active:bg-zinc-200",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50",
        state === "hover" && "bg-zinc-100",
        state === "pressed" && "bg-zinc-200",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1.5">
        <Icon name="CloudQueue" aria-hidden="true" className="size-4 text-zinc-500" />
        {label}
      </span>
      <ChevronDown
        aria-hidden="true"
        className={cn("size-4 text-zinc-500 transition-transform", expanded && "rotate-180")}
      />
    </button>
  )
}

export { SidebarToggle }
