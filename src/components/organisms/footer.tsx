import * as React from "react"

import { cn } from "@/lib/utils"
import { SelectBox } from "@/components/molecules/select-box"

const LANGUAGES = ["Português (Brasil)", "English (US)", "Español"] as const

export interface FooterProps extends React.ComponentProps<"footer"> {
  /** Figma `Layout`: `full` traz o seletor de idioma; `minimal` só o copyright, centralizado. As telas usam `full`. */
  layout?: "full" | "minimal"
  language?: string
  onLanguageChange?: (language: string) => void
}

/**
 * organism/Footer (`1431:17284`): o rodapé das telas de tablet e desktop. "©2026 Kandrive" em 16px
 * `Text/Ink` e o `molecule/SelectBox` de idioma, 37px entre eles, 15px acima e abaixo.
 * No mobile, a base da tela é dos chips (`MobileFooterSettings`) ou da barra de navegação.
 *
 * 🧩 O Figma escreve "KanDrive"; aqui fica "Kandrive", a grafia do logo e do resto da interface.
 */
function Footer({ layout = "full", language, onLanguageChange, className, ...props }: FooterProps) {
  return (
    <footer
      data-slot="footer"
      data-layout={layout}
      className={cn(
        "flex w-full items-center gap-[37px] py-[15px] text-base text-black dark:text-zinc-100",
        layout === "minimal" && "justify-center",
        className
      )}
      {...props}
    >
      <span>©2026 Kandrive</span>
      {layout === "full" ? (
        <SelectBox options={LANGUAGES} value={language} onValueChange={onLanguageChange} aria-label="Idioma" />
      ) : null}
    </footer>
  )
}

export { Footer }
