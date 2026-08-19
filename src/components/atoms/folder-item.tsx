import * as React from "react"

import { cn } from "@/lib/utils"
import { SelectState } from "@/components/atoms/select-state"
import folderIdle from "@/assets/illustrations/folder-item-idle.svg"
import folderHover from "@/assets/illustrations/folder-item-hover.svg"
import folderPressed from "@/assets/illustrations/folder-item-pressed.svg"
import folderDisabled from "@/assets/illustrations/folder-item-disabled.svg"
import folderSelected from "@/assets/illustrations/folder-item-selected.svg"
import folderSelectedHover from "@/assets/illustrations/folder-item-selected-hover.svg"
import folderSelectedPressed from "@/assets/illustrations/folder-item-selected-pressed.svg"

export type FolderItemState =
  | "idle"
  | "hover"
  | "pressed"
  | "disabled"
  | "selected"
  | "selected-hover"
  | "selected-pressed"

export interface FolderItemProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  /** Fixa um estado específico (freeze-frame pra documentação/auditoria) — quando omitido, o componente reage a mouse/teclado de verdade. */
  state?: FolderItemState
  /** Seleção controlada — quando omitido, o componente gerencia sozinho (não-controlado, alterna a cada clique). */
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
  disabled?: boolean
  name?: string
  showName?: boolean
}

const IMAGE: Record<FolderItemState, string> = {
  idle: folderIdle,
  hover: folderHover,
  pressed: folderPressed,
  disabled: folderDisabled,
  selected: folderSelected,
  "selected-hover": folderSelectedHover,
  "selected-pressed": folderSelectedPressed,
}

const SELECTED_STATES: readonly FolderItemState[] = [
  "selected",
  "selected-hover",
  "selected-pressed",
]

/**
 * atom/FolderItem (`1440:24306`, Figma-confirmado) — "Simbolo para
 * representar pastas. Suporta seleção e badge de tier. Variantes: state e
 * tier." Mesma família visual/composicional de `ArchiveItem` (ver notas lá
 * sobre a menção a "tier" ser gap, não prop real), mas aqui cada estado é
 * uma imagem própria já com o glass bake-ado (sem par base+overlay
 * separado como em Archive) — `Group8..12/15` (idle/hover/pressed/
 * disabled/default/static, os 2 últimos dobrados em `idle`) e
 * `Group13/14` (selected/selected-hover).
 *
 * Corrigido em 2026-08-19 (achado do usuário: `ArchiveItem`/`FolderItem`/
 * `ImageItem`/`VideoItem` não reagiam a mouse/teclado — 100% controlados por
 * prop `state`, impossível interagir de verdade entre os estados). Reescrito
 * com o mesmo padrão já usado em `ImageItem`: `state` explícito continua
 * funcionando (freeze-frame pra documentação/auditoria), mas quando omitido
 * o componente rastreia hover/press reais e clique alterna seleção sozinho
 * (`selected`/`defaultSelected`/`onSelectedChange`, controlado ou não).
 */
function FolderItem({
  state: explicitState,
  selected: controlledSelected,
  defaultSelected = false,
  onSelectedChange,
  disabled = false,
  name = "Arquivo 1",
  showName = true,
  className,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onClick,
  onKeyDown,
  ...props
}: FolderItemProps) {
  const [isHovering, setIsHovering] = React.useState(false)
  const [isPressing, setIsPressing] = React.useState(false)
  const [internalSelected, setInternalSelected] = React.useState(defaultSelected)
  const isSelected = explicitState ? SELECTED_STATES.includes(explicitState) : (controlledSelected ?? internalSelected)
  const isDisabled = explicitState ? explicitState === "disabled" : disabled

  const state: FolderItemState =
    explicitState ??
    (isDisabled
      ? "disabled"
      : isSelected
        ? isPressing
          ? "selected-pressed"
          : isHovering
            ? "selected-hover"
            : "selected"
        : isPressing
          ? "pressed"
          : isHovering
            ? "hover"
            : "idle")

  const toggleSelected = () => {
    if (isDisabled) return
    const next = !isSelected
    if (controlledSelected === undefined) setInternalSelected(next)
    onSelectedChange?.(next)
  }

  return (
    <div
      data-slot="folder-item"
      data-state={state}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "relative flex w-[47px] flex-col items-center gap-1 py-0.5",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      )}
      onMouseEnter={(event) => {
        if (!isDisabled) setIsHovering(true)
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event) => {
        setIsHovering(false)
        setIsPressing(false)
        onMouseLeave?.(event)
      }}
      onMouseDown={(event) => {
        if (!isDisabled) setIsPressing(true)
        onMouseDown?.(event)
      }}
      onMouseUp={(event) => {
        setIsPressing(false)
        onMouseUp?.(event)
      }}
      onClick={(event) => {
        toggleSelected()
        onClick?.(event)
      }}
      onKeyDown={(event) => {
        if (!isDisabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault()
          toggleSelected()
        }
        onKeyDown?.(event)
      }}
      {...props}
    >
      <div className="relative h-[41px] w-[46.35px] shrink-0">
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full"
          src={IMAGE[state]}
        />
        {isSelected ? (
          <SelectState className="absolute right-[3px] bottom-[3px]" />
        ) : null}
      </div>
      {showName ? (
        <span
          className={cn(
            "block h-3 w-full truncate text-center text-[0.625rem] leading-normal tracking-[0.012px]",
            isDisabled ? "text-zinc-500" : "text-zinc-700"
          )}
        >
          {name}
        </span>
      ) : null}
    </div>
  )
}

export { FolderItem }
