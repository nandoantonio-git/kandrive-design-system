import * as React from "react"

import { cn } from "@/lib/utils"
import { HamburgerButton } from "@/components/atoms/hamburger-button"
import { SidebarOption, type SidebarOptionName } from "@/components/atoms/sidebar-option"

export type DrawerItem = "guardados" | "armazenamento" | "etiquetas" | "lixeira" | "configuracoes" | "ajuda"

/** Ordem decidida em 2026-09-24: Guardados · Armazenamento · Etiquetas | Lixeira | Configurações · Ajuda. */
const GROUPS: { value: DrawerItem; label: string; option: SidebarOptionName }[][] = [
  [
    { value: "guardados", label: "Guardados", option: "keep" },
    { value: "armazenamento", label: "Armazenamento", option: "storage" },
    { value: "etiquetas", label: "Etiquetas", option: "tags" },
  ],
  [{ value: "lixeira", label: "Lixeira", option: "trash" }],
  [
    { value: "configuracoes", label: "Configurações", option: "settings" },
    { value: "ajuda", label: "Ajuda", option: "help" },
  ],
]

export interface SidebarDrawerProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  open: boolean
  onOpenChange?: (open: boolean) => void
  active?: DrawerItem
  onNavigate?: (item: DrawerItem) => void
}

/**
 * Gaveta do mobile: `organism/Sidebar`, variante `Device=Mobile`,
 * Figma-confirmado no KanDrive V0.2.1 (`1771:35845`). A tela de referência é
 * `Home/Drawer/Mobile` (`3139:49490`). Abre pelo ☰ do Header mobile em todas as
 * telas, exceto as de feedback visual (decisão de 2026-09-24).
 *
 * - Itens: `atom/SidebarOption`, com ícone de 16px e rótulo de 16px
 *   `Brand/Secondary/Dark`.
 * - Cor do ícone por estado: Default `Effect/Overlay/Default`, Hover
 *   `Brand/Primary/Default`, Pressed `Brand/Primary/Dark` com fundo
 *   `Neutral/Surface/Medium`.
 * - 🧩 O fundo do hover e o destaque do item atual (`aria-current`) usam
 *   `Neutral/Surface/Subtle`. O Figma não tem um estado "atual" para a gaveta.
 * - Fundo escurecido: `Effect/Overlay/Default` no valor Light (preto a 50%)
 *   nos dois modos, como na tela do Figma.
 * - Painel: vidro (Regra 10) de 240px e altura total. Fecha pelo ☰, pelo Esc
 *   ou tocando fora.
 */
function SidebarDrawer({ open, onOpenChange, active, onNavigate, className, ...props }: SidebarDrawerProps) {
  const panelRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange?.(false)
    window.addEventListener("keydown", onKey)
    panelRef.current?.querySelector<HTMLElement>("button")?.focus()
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  return (
    <div
      data-slot="sidebar-drawer"
      data-state={open ? "open" : "closed"}
      className={cn("absolute inset-0 z-50", !open && "pointer-events-none", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        onClick={() => onOpenChange?.(false)}
        className={cn("absolute inset-0 bg-black/50 transition-opacity motion-safe:duration-200", open ? "opacity-100" : "opacity-0")}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "glass-edge relative flex h-full w-60 flex-col rounded-r-3xl bg-effect-glass-white-70 px-3 pt-4 backdrop-blur-xl transition-transform motion-safe:duration-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-end pb-12">
          <HamburgerButton mode="expand" onClick={() => onOpenChange?.(false)} />
        </div>
        <nav aria-label="Menu principal" className="flex flex-col">
          {GROUPS.map((group, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <div role="separator" className="mx-2 my-3 border-t border-neutral-border-light" /> : null}
              {group.map(({ value, label, option }) => (
                <SidebarOption
                  key={value}
                  option={option}
                  label={label}
                  current={value === active}
                  onClick={() => onNavigate?.(value)}
                />
              ))}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}

export { SidebarDrawer }
