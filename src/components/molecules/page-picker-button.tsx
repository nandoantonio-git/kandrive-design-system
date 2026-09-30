import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import PagePickerGlyph from "@/assets/icons/PagePickerGlyph.svg?react"
import { DropdownSelectGroupByItem } from "@/components/atoms/dropdown-select-group-by-item"

/**
 * Páginas da lista. 🧩 Mock: o Figma não desenha essa lista; os nomes são as
 * páginas que já existem na navegação (`organism/Sidebar`), menos Lixeira.
 */
const DEFAULT_PAGES = ["Pessoal", "Compartilhados", "Recentes", "Favoritos", "Guardados"] as const

export interface PagePickerButtonProps extends Omit<React.ComponentProps<"button">, "value" | "defaultValue"> {
  /** Página de origem dos arquivos — controlada; quando omitida, o componente guarda a última escolhida. */
  page?: string
  defaultPage?: string
  onPageChange?: (page: string) => void
  /** Páginas da lista (mock por padrão, ver `DEFAULT_PAGES`). */
  pages?: readonly string[]
  /** Lista aberta/fechada — controlada; quando omitida, o componente abre e fecha sozinho. */
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  /** Mostra o rótulo "Página:" à esquerda. */
  withLabel?: boolean
}

/**
 * Seletor "Página:" das listas de seleção no mobile (`Organize/ChooseMethod/Mobile`
 * e `LongTermStorage/SelectFiles/Mobile`). 🧩 No Figma é um frame
 * (`page-button`), não um componente: extraído aqui porque se repete.
 *
 * - Botão: 32px, raio 8, fundo `Effect/Overlay/Subtle` a 10% com blur, borda
 *   `Brand/Primary/Light`, texto 13px Medium `Text/Secondary`.
 * - Ícone e chevron: `Text/Tertiary`. Rótulo: 11px `Text/Tertiary`.
 * - 🧩 Regra 8: hover, pressed e disabled não desenhados no Figma.
 *
 * **Lista de páginas (2026-09-28, decisão do usuário)**: o chevron prometia
 * um menu que não existia. Agora abre uma lista, montada só com peças que já
 * existem: o card de vidro do `DropdownSelectGroupBy` e seus itens
 * (`DropdownSelectGroupByItem`). Escolher uma página fecha a lista e troca o
 * texto do botão; Esc e clique fora fecham. 🧩 Os nomes são mock.
 */
function PagePickerButton({
  page: controlledPage,
  defaultPage = "Pessoal",
  onPageChange,
  pages = DEFAULT_PAGES,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  withLabel = true,
  disabled,
  onClick,
  className,
  ...props
}: PagePickerButtonProps) {
  const [internalPage, setInternalPage] = React.useState(defaultPage)
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const listId = React.useId()
  const page = controlledPage ?? internalPage
  const expanded = !disabled && (controlledExpanded ?? internalExpanded)

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (controlledExpanded === undefined) setInternalExpanded(next)
      onExpandedChange?.(next)
    },
    [controlledExpanded, onExpandedChange]
  )

  const select = (next: string) => {
    if (controlledPage === undefined) setInternalPage(next)
    onPageChange?.(next)
    setExpanded(false)
  }

  React.useEffect(() => {
    if (!expanded) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setExpanded(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [expanded, setExpanded])

  return (
    <div
      ref={rootRef}
      data-slot="page-picker"
      data-expanded={expanded || undefined}
      className={cn("relative flex w-fit items-center gap-2", className)}
    >
      {withLabel ? <span className="text-xs leading-4 text-neutral-text-tertiary">Página:</span> : null}
      <div className="relative">
        <button
          type="button"
          data-slot="page-picker-button"
          aria-haspopup="true"
          aria-expanded={expanded}
          aria-controls={expanded ? listId : undefined}
          disabled={disabled}
          onClick={(event) => {
            onClick?.(event)
            if (!event.defaultPrevented) setExpanded(!expanded)
          }}
          className={cn(
            "touch-target flex h-8 w-fit cursor-pointer items-center gap-2 rounded-lg border border-brand-teal-light bg-effect-overlay-subtle/10 px-3 text-sm font-medium text-neutral-text-secondary backdrop-blur-[15px] focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
            "transition-[background-color,opacity] hover:bg-effect-overlay-subtle/20 active:opacity-70 disabled:pointer-events-none disabled:opacity-50"
          )}
          {...props}
        >
          <PagePickerGlyph aria-hidden="true" className="h-[18px] w-5 text-neutral-text-tertiary" />
          {page}
          <ChevronDown
            aria-hidden="true"
            className={cn("size-3 text-neutral-text-tertiary transition-transform motion-reduce:transition-none", expanded && "rotate-180")}
          />
        </button>
        {expanded ? (
          <ul
            id={listId}
            data-slot="page-picker-list"
            aria-label="Páginas"
            className="absolute top-full left-0 z-30 mt-1 flex w-max flex-col items-center rounded-xl glass-edge glass-shadow-sm bg-effect-glass-light-45 py-2 backdrop-blur-[10px]"
          >
            {pages.map((option) => (
              <li key={option} className="w-full">
                <DropdownSelectGroupByItem
                  label={option}
                  aria-pressed={option === page}
                  selected={option === page}
                  onClick={() => select(option)}
                  className="mx-auto"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export { PagePickerButton, DEFAULT_PAGES }
