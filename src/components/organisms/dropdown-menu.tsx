import * as React from "react"
import { FolderPlus, Upload, FolderUp, FilePen, XCircle, Trash2, ArchiveRestore, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { MenuItemFloating } from "@/components/molecules/menu-item-floating"

export type DropdownMenuVariant = "sidebar" | "template-options" | "guardados"

interface MenuEntry {
  label: string
  icon: LucideIcon
  danger?: boolean
}

const SIDEBAR_ITEMS: MenuEntry[] = [
  { label: "Nova pasta", icon: FolderPlus },
  { label: "Enviar arquivo", icon: Upload },
  { label: "Enviar pasta", icon: FolderUp },
]

const TEMPLATE_OPTIONS_ITEMS: MenuEntry[] = [
  { label: "Editar organização", icon: FilePen },
  { label: "Desfazer organização", icon: XCircle },
  { label: "Excluir organização", icon: Trash2 },
]

const GUARDADOS_ITEMS: MenuEntry[] = [{ label: "Resgatar", icon: ArchiveRestore }]

export interface DropdownMenuProps extends React.ComponentProps<"div"> {
  variant?: DropdownMenuVariant
  onItemSelect?: (label: string) => void
}

/**
 * organism/dropdownMenu (`1440:23662`/`1440:23768`) — Figma-confirmado:
 * "DropList com opções de açãoes contextuais". Duas variantes
 * Figma-confirmadas: `property1=Sidebar` (Nova pasta/Upload de
 * arquivo/Upload de pasta — menu de criação) e
 * `property1=templateOptopnsList` (Editar/Desfazer/Excluir organização —
 * menu de gestão de template, usado dentro de `organism/drop/NewTag`).
 *
 * **🔧 Corrigido em 2026-08-11 (Regra 11, auditoria US-026, passe 2)**:
 * releitura de `get_design_context` confirma só 1 `Separator` por
 * variante (entre o 1º e o 2º item — nenhum separador entre o 2º e o
 * 3º), não 2 como a implementação anterior renderizava (`index > 0`).
 *
 * **🔧 Corrigido em 2026-08-12 (Regra 11, auditoria US-026, passe 3)**: a
 * cor "destrutiva" do item "Excluir organização" foi removida. O passe 2
 * havia trocado o hex descontinuado `#ac3a2e` pelo token `--destructive`
 * (`#bc3426`) por analogia com `PushButton isDestructive` — mas essa era
 * uma extrapolação, não uma leitura literal do nó. A releitura fresca de
 * `get_design_context` para os nós `1440:23662`/`1440:23768` confirma que
 * o texto do item usa `var(--neutral-text-secondary, #3f3f46)`, a mesma
 * cor neutra dos outros 2 itens — sem cor de destrutivo neste menu
 * específico (diferente de `atom/PushButton isDestructive`, que usa
 * `--brand-feedback-danger-default` de fato). Corrigido para neutro.
 *
 * `variant="guardados"` — menu de contexto (botão direito) de um arquivo na área
 * "Guardados", com o item "Resgatar". 🧩 Pedido pelo usuário em 2026-09-29: o
 * resgate é solicitado por aqui e o arquivo chega por e-mail (não volta para o
 * acesso rápido). Mesmo padrão visual do menu de "Adicionar"; no Figma é a
 * variante `property1=Guardados`, com o item único.
 *
 * 🧩 Regra 8: hover/pressed/foco dos itens não desenhados no Figma.
 */
function DropdownMenu({ variant = "sidebar", onItemSelect, className, ...props }: DropdownMenuProps) {
  const items = variant === "sidebar" ? SIDEBAR_ITEMS : variant === "guardados" ? GUARDADOS_ITEMS : TEMPLATE_OPTIONS_ITEMS
  return (
    <MenuItemFloating
      data-slot="dropdown-menu"
      role="menu"
      className={cn("py-1", variant === "template-options" ? "w-[217px]" : "w-[191px]", className)}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {index === 1 ? <div className="h-px w-full bg-zinc-200 dark:bg-zinc-700" /> : null}
          <button
            type="button"
            role="menuitem"
            onClick={() => onItemSelect?.(item.label)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-left text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
              item.danger && "text-destructive"
            )}
          >
            <item.icon aria-hidden="true" className="size-4" />
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </MenuItemFloating>
  )
}

export { DropdownMenu }
