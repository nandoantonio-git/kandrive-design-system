import * as React from "react"

import { cn } from "@/lib/utils"
import { SelectState } from "@/components/atoms/select-state"
import videoIdle from "@/assets/illustrations/video-item-idle.svg"
import videoHover from "@/assets/illustrations/video-item-hover.svg"
import videoPressed from "@/assets/illustrations/video-item-pressed.svg"
import videoDisabled from "@/assets/illustrations/video-item-disabled.svg"
import videoCamera from "@/assets/illustrations/video-item-camera.svg"

export type VideoItemState =
  | "idle"
  | "hover"
  | "pressed"
  | "disabled"
  | "selected"
  | "selected-hover"
  | "selected-pressed"
  | "favicon-header-thumbnail"

export interface VideoItemProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  /** Fixa um estado específico (freeze-frame pra documentação/auditoria, ou o eixo raro `favicon-header-thumbnail`) — quando omitido, o componente reage a mouse/teclado de verdade. */
  state?: VideoItemState
  /** Seleção controlada — quando omitido, o componente gerencia sozinho (não-controlado, alterna a cada clique). */
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
  disabled?: boolean
  /** `itemName` no Figma. */
  name?: string
  /** Eixo `isNameOn` do Figma. */
  showName?: boolean
}

const IMAGE: Record<VideoItemState, string> = {
  idle: videoIdle,
  hover: videoHover,
  pressed: videoPressed,
  disabled: videoDisabled,
  selected: videoIdle,
  "selected-hover": videoHover,
  "selected-pressed": videoPressed,
  "favicon-header-thumbnail": videoIdle,
}

const SELECTED_STATES: readonly VideoItemState[] = [
  "selected",
  "selected-hover",
  "selected-pressed",
]

/**
 * atom /VideoItem (`1442:7858`, Figma-confirmado) — "Simbolo para
 * representar arquivos de formatos vídeos. Suporta seleção e badge de
 * tier. Variantes: state e tier." A exportação real mostra o corpo do
 * arquivo de vídeo por estado + uma lente/câmera sobreposta constante;
 * `tier` não aparece como elemento visível no node, então segue como gap
 * documentado em vez de prop inventada.
 *
 * Corrigido em 2026-08-19 (achado do usuário: `ArchiveItem`/`FolderItem`/
 * `ImageItem`/`VideoItem` não reagiam a mouse/teclado — 100% controlados por
 * prop `state`, impossível interagir de verdade entre os estados). Reescrito
 * com o mesmo padrão já usado em `ImageItem`: `state` explícito continua
 * funcionando (freeze-frame pra documentação/auditoria, e é o único jeito de
 * chegar em `favicon-header-thumbnail`, que não faz parte do ciclo real de
 * interação), mas quando omitido o componente rastreia hover/press reais e
 * clique alterna seleção sozinho (`selected`/`defaultSelected`/
 * `onSelectedChange`, controlado ou não).
 */
function VideoItem({
  state: explicitState,
  selected: controlledSelected,
  defaultSelected = false,
  onSelectedChange,
  disabled = false,
  name = "Arquivo 2",
  showName = true,
  className,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onClick,
  onKeyDown,
  ...props
}: VideoItemProps) {
  const [isHovering, setIsHovering] = React.useState(false)
  const [isPressing, setIsPressing] = React.useState(false)
  const [internalSelected, setInternalSelected] = React.useState(defaultSelected)
  const isSelected = explicitState ? SELECTED_STATES.includes(explicitState) : (controlledSelected ?? internalSelected)
  const isDisabled = explicitState ? explicitState === "disabled" : disabled

  const state: VideoItemState =
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
      data-slot="video-item"
      data-state={state}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "relative flex w-fit min-w-[45px] flex-col items-center gap-1 px-1 py-0.5",
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
      <div className="relative h-[43px] w-[45px] shrink-0">
        <img
          alt=""
          aria-hidden="true"
          className="absolute top-[5px] right-0 h-8 w-[42px]"
          src={IMAGE[state]}
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute top-[12px] right-0 h-[19px] w-[17px] mix-blend-hard-light"
          src={videoCamera}
        />
        {isSelected ? (
          <SelectState className="absolute right-[11px] bottom-[7px]" />
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

export { VideoItem }
