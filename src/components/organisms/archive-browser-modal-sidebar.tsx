import * as React from "react"
import { User, Users, Clock, Star, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { FileTypeLabel } from "@/components/atoms/type-label"
import type { SidebarPage } from "@/components/organisms/sidebar"

const MINI_NAV: { page: SidebarPage; icon: LucideIcon }[] = [
  { page: "Pessoal", icon: User },
  { page: "Compartilhados", icon: Users },
  { page: "Recentes", icon: Clock },
  { page: "Favoritos", icon: Star },
]

export type ArchiveBrowserModalSidebarProps = React.ComponentProps<"nav">

/**
 * organism/ArchiveBrowserModal/sidebar (`1555:21309`) — Figma-confirmado:
 * mini-navegação dentro de `template/ArchiveBrowserModal` (`1439:16909`),
 * extraída pelo usuário como symbol próprio em 2026-08-20 (antes só existia
 * inline dentro do modal). Reusa uma versão compacta dos itens de navegação
 * de `organism/Sidebar` (mesmos 4 primeiros rótulos Figma-confirmados) —
 * não a `Sidebar` completa, pois esta instância não inclui o painel de
 * armazenamento (composição menor, confirmada no nó `1421:20073`).
 *
 * 🔧 **Corrigido em 2026-08-21** (achado do usuário: aplicação de glass
 * revisada). A reconciliação inicial de 2026-08-20 confiou só em
 * `get_metadata` (estrutura) pra este symbol novo, sem confirmar estilo —
 * `get_design_context` fresco no nó confirma que o painel **não tem
 * nenhuma borda** (nem `glass-edge`, nem borda plana), usa o fill
 * `bg-effect-glass-white-36` (não `-70` — mesmo par "-70 card externo /
 * -36 painel aninhado" já estabelecido em `SaveLongTermFileStorage`) e
 * `rounded-xl` (16px, não `rounded-2xl`/24px). `glass-edge` removido,
 * fill/radius corrigidos; `shadow-[0px_8px_20px_rgba(0,0,0,0.12)]` já
 * batia exato com o CSS real do nó, mantido sem alteração.
 */
function ArchiveBrowserModalSidebar({ className, ...props }: ArchiveBrowserModalSidebarProps) {
  return (
    <nav
      data-slot="archive-browser-modal-sidebar"
      className={cn(
        "h-full w-60 shrink-0 rounded-xl bg-effect-glass-white-36 px-4 pt-8 pb-6 shadow-[0px_8px_20px_rgba(0,0,0,0.12)]",
        className
      )}
      {...props}
    >
      <ul className="flex flex-col gap-1">
        {MINI_NAV.map(({ page, icon: ItemIcon }) => (
          <li
            key={page}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1 text-base font-medium text-zinc-800",
              page === "Pessoal" ? "bg-zinc-100" : "opacity-50"
            )}
          >
            <ItemIcon aria-hidden="true" className={cn("size-4", page === "Pessoal" && "text-brand-teal")} />
            {page}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-1 border-t border-zinc-200 pt-3">
        <span className="text-xs font-medium text-zinc-500">Etiquetas</span>
        <FileTypeLabel kind="image" className="px-2" />
      </div>
    </nav>
  )
}

export { ArchiveBrowserModalSidebar }
