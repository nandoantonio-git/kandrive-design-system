import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import PagePickerGlyph from "@/assets/icons/PagePickerGlyph.svg?react"

export interface PagePickerButtonProps extends React.ComponentProps<"button"> {
  /** Página de origem dos arquivos. Ex.: "Pessoal". */
  page?: string
  /** Mostra o rótulo "Página:" à esquerda. */
  withLabel?: boolean
}

/**
 * Seletor "Página:" das listas de seleção no mobile (`Organize/ChooseMethod/Mobile`
 * e `LongTermStorage/SelectFiles/Mobile`). 🧩 No Figma é um frame
 * (`page-button`), não um componente: extraído aqui porque se repete.
 *
 * - Botão: 32px, raio 8, fundo `Effect/Overlay/Subtle` a 10% com blur, borda
 *   `Brand/Primary/Light`, texto 13px Medium `Neutral/Text/Secondary`.
 * - Ícone e chevron: `Neutral/Text/Tertiary`. Rótulo: 11px `Neutral/Text/Tertiary`.
 */
function PagePickerButton({ page = "Pessoal", withLabel = true, className, ...props }: PagePickerButtonProps) {
  const button = (
    <button
      type="button"
      data-slot="page-picker-button"
      aria-haspopup="listbox"
      className={cn(
        "touch-target flex h-8 w-fit cursor-pointer items-center gap-2 rounded-lg border border-brand-teal-light bg-effect-overlay-subtle/10 px-3 text-[0.8125rem] font-medium text-neutral-text-secondary backdrop-blur-[15px] focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
        !withLabel && className
      )}
      {...props}
    >
      <PagePickerGlyph aria-hidden="true" className="h-[18px] w-5 text-neutral-text-tertiary" />
      {page}
      <ChevronDown aria-hidden="true" className="size-3 text-neutral-text-tertiary" />
    </button>
  )
  if (!withLabel) return button
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-[0.6875rem] leading-4 text-neutral-text-tertiary">Página:</span>
      {button}
    </div>
  )
}

export { PagePickerButton }
