import * as React from "react"

import { cn } from "@/lib/utils"
import KeepGlyph from "@/assets/icons/Arquivar.svg?react"
import ShareGlyph from "@/assets/icons/FolderShared.svg?react"
import StorageGlyph from "@/assets/icons/MobileDrawerStorage.svg?react"
import TagsGlyph from "@/assets/icons/MobileDrawerTags.svg?react"
import TrashGlyph from "@/assets/icons/MobileDrawerTrash.svg?react"
import SettingsGlyph from "@/assets/icons/Settings.svg?react"
import HelpGlyph from "@/assets/icons/Help.svg?react"

export type SidebarOptionName = "keep" | "share" | "storage" | "trash" | "tags" | "settings" | "help"

const OPTIONS: Record<SidebarOptionName, { label: string; Glyph: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
  keep: { label: "Guardados", Glyph: KeepGlyph },
  share: { label: "Compartilhados", Glyph: ShareGlyph },
  storage: { label: "Armazenamento", Glyph: StorageGlyph },
  trash: { label: "Lixeira", Glyph: TrashGlyph },
  tags: { label: "Etiquetas", Glyph: TagsGlyph },
  settings: { label: "Configurações", Glyph: SettingsGlyph },
  help: { label: "Ajuda", Glyph: HelpGlyph },
}

export interface SidebarOptionProps extends React.ComponentProps<"button"> {
  /** Figma `Option`: Keep, Share, Storage, Trash, Tags, Settings, Help. */
  option: SidebarOptionName
  /** Rótulo; o padrão é o nome em português da opção. */
  label?: string
  /** Texto de detalhe à direita (Figma "Number"), como uma contagem. */
  detail?: string
  /** Página atual: marcada com `aria-current` e o fundo de hover. */
  current?: boolean
}

/**
 * atom/SidebarOption (`1643:23462`): uma opção do menu da gaveta do Mobile.
 * 7 opções × Default/Hover/Pressed. 24px de altura, raio 8, padding 4/10/4/8, 6px entre ícone e rótulo;
 * rótulo 16px Medium `Brand/Secondary/Dark`, detalhe 11px `Text/Tertiary`.
 * Hover `Surface/Muted` (zinc 500 a 20%), Pressed `Surface/Medium`, com a mesma
 * smart animation do Figma (troca de variante ao passar e ao pressionar).
 *
 * 🧩 Regra 8: o ícone fica teal no hover e o anel de foco é o padrão; área de toque ampliada (`touch-target`).
 */
function SidebarOption({ option, label, detail, current = false, className, ...props }: SidebarOptionProps) {
  const { label: defaultLabel, Glyph } = OPTIONS[option]
  return (
    <button
      type="button"
      data-slot="sidebar-option"
      data-option={option}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group touch-target flex h-6 w-full cursor-pointer items-center gap-1.5 rounded-lg py-1 pr-2.5 pl-2 text-left text-base font-medium text-brand-secondary-dark transition-colors",
        "hover:bg-[#71717a33] active:bg-neutral-surface-medium focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none dark:hover:bg-[#a1a1aa33]",
        current && "bg-[#71717a33] dark:bg-[#a1a1aa33]",
        className
      )}
      {...props}
    >
      <span className="flex h-4 w-[18px] shrink-0 items-center justify-center text-effect-overlay-default transition-colors group-hover:text-brand-teal group-active:text-brand-teal-dark">
        <Glyph aria-hidden="true" className="max-h-4 max-w-4" />
      </span>
      <span className="min-w-0 flex-1 truncate">{label ?? defaultLabel}</span>
      {detail ? <span className="shrink-0 text-xs font-medium text-neutral-text-tertiary dark:text-zinc-400">{detail}</span> : null}
    </button>
  )
}

export { SidebarOption }
