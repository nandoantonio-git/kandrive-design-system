import * as React from "react"

import { cn } from "@/lib/utils"
import { SelectState } from "@/components/atoms/select-state"
import imageIdle from "@/assets/illustrations/image-item-idle.svg"
import imageHover from "@/assets/illustrations/image-item-hover.svg"
import imagePressed from "@/assets/illustrations/image-item-pressed.svg"
import imageDisabled from "@/assets/illustrations/image-item-disabled.svg"
import imageSelected from "@/assets/illustrations/image-item-selected.svg"
import imageSelectedHover from "@/assets/illustrations/image-item-selected-hover.svg"
import imageSelectedPressed from "@/assets/illustrations/image-item-selected-pressed.svg"

export type ImageItemState =
  | "idle"
  | "hover"
  | "pressed"
  | "disabled"
  | "selected"
  | "selected-hover"
  | "selected-pressed"

export interface ImageItemProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  /** Fixa um estado específico (freeze-frame pra documentação/auditoria) — quando omitido, o componente reage a mouse/teclado de verdade. */
  state?: ImageItemState
  /** Seleção controlada — quando omitido, o componente gerencia sozinho (não-controlado, alterna a cada clique). */
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
  disabled?: boolean
  /** `itemName` no Figma. */
  name?: string
  showName?: boolean
}

const IMAGE: Record<ImageItemState, string> = {
  idle: imageIdle,
  hover: imageHover,
  pressed: imagePressed,
  disabled: imageDisabled,
  selected: imageSelected,
  "selected-hover": imageSelectedHover,
  "selected-pressed": imageSelectedPressed,
}

const SELECTED_STATES: readonly ImageItemState[] = [
  "selected",
  "selected-hover",
  "selected-pressed",
]

/**
 * atom/ImageItem (`1421:18311`, Figma-confirmado) — "Simbolo para
 * representar fotos. Suporta seleção e badge de tier. Variantes: state e
 * tier." (mesma nota de `tier` como gap de `ArchiveItem`/`FolderItem`, não
 * reimplementada aqui). Cada estado é uma imagem própria já bake-ada
 * (`Vector`/`Vector2..4` idle/hover/pressed/disabled, `Vector5/7/8`
 * selected/selected-hover/selected-pressed) + retângulo de destaque
 * translúcido constante (`--effect-glass-fill-light`, já Figma-confirmado
 * em uso noutros componentes) + `atom/SelectState` no canto nos 3 estados
 * `selected*`.
 *
 * Eixo `favicon_header_Thumbnail` do component set Figma (nome fora do
 * padrão dos demais, sem descrição própria) não foi implementado — sem
 * contexto de uso confirmado, documentado como gap (Regra 9) em vez de
 * mapeado por suposição.
 *
 * Corrigido em auditoria US-026 (2026-08-11): largura externa fixa em
 * `w-9` (36px) cortava o nome padrão ("Arquivo 2" → "Arq…") — o Figma real
 * não fixa largura no container externo (`content-stretch flex flex-col
 * items-center px-[4px]`, sem `w-*`). Trocado para `w-fit
 * min-w-[35.14px]` (acompanha o glifo como piso, cresce para o nome).
 *
 * Corrigido em 2026-08-18 (achado do usuário: retângulo de vidro
 * deslocado — 2 rodadas). Tentativa inicial — exportar o símbolo composto
 * inteiro por estado — descartada: trazia um retângulo de fundo `#393939`
 * (artefato do canvas do Figma) e bake-ava o nome como vetor estático.
 * Segunda tentativa (posição condicional lida do CSS de referência do
 * `get_design_context`, "top-4px/left-10px" pros estados simples vs.
 * "top-2px/left-2px" pros `selected*`) também estava errada — esses
 * valores de referência eram relativos ao **container flex externo**
 * (com padding), não ao box do ícone, e só bateram por acidente nos
 * `selected*`. Causa raiz real, confirmada via `get_metadata` (coordenadas
 * absolutas dentro de cada símbolo, não CSS de referência): o retângulo
 * fica em **(x≈10, y=4)** dentro do símbolo 51×61 em todo estado — como o
 * ícone (`Vector`) sempre começa em (x≈7.93, y=2), a posição relativa ao
 * ícone é **a mesma nos 7 estados**: `top-[2px] left-[2.07px]`. Corrigido
 * pra posição única, sem condicional.
 *
 * Achado extra numa investigação anterior (2026-08-18): o estado `idle`
 * tinha um **segundo elemento** (`Vector` `1442:8039`, badge menor no canto
 * inferior-esquerdo do ícone) implementado como `image-item-idle-badge.svg`.
 * Removido em 2026-08-19: o usuário editou o símbolo no Figma e ocultou esse
 * vetor (`hidden="true"` confirmado via `get_metadata`) — não faz mais parte
 * do estado `idle`. Asset e overlay retirados pra bater com o Figma atual.
 *
 * Corrigido em 2026-08-19 (achado do usuário, 2 pontos):
 * 1. O retângulo de vidro não tinha borda — lia como "bufado"/borrado em vez
 *    de peça de vidro recortada. Adicionada a borda real do material
 *    (`Subcomponent Stroke`, `#00000066`, Figma-confirmado — ver
 *    `Tokens/Materials`).
 * 2. O componente era 100% controlado por prop `state`, sem reagir a
 *    mouse/teclado — impossível interagir de verdade entre os estados.
 *    Reescrito com o mesmo padrão já usado em `Sidebar`/`CloseButton`:
 *    `state` explícito continua funcionando (freeze-frame pra
 *    documentação), mas quando omitido o componente rastreia hover/press
 *    reais e clique alterna seleção sozinho (`selected`/`defaultSelected`/
 *    `onSelectedChange`, controlado ou não).
 */
function ImageItem({
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
}: ImageItemProps) {
  const [isHovering, setIsHovering] = React.useState(false)
  const [isPressing, setIsPressing] = React.useState(false)
  const [internalSelected, setInternalSelected] = React.useState(defaultSelected)
  const isSelected = explicitState ? SELECTED_STATES.includes(explicitState) : (controlledSelected ?? internalSelected)
  const isDisabled = explicitState ? explicitState === "disabled" : disabled

  const state: ImageItemState =
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
      data-slot="image-item"
      data-state={state}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "relative flex w-fit min-w-[35.14px] flex-col items-center gap-1 px-1 py-0.5",
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
      <div className="relative h-[41px] w-[35.14px] shrink-0">
        <img alt="" aria-hidden="true" className="absolute inset-0 size-full" src={IMAGE[state]} />
        <div
          aria-hidden="true"
          className="absolute top-[2px] left-[2.07px] h-7 w-[31px] rounded border border-[#00000066] bg-[var(--effect-glass-fill-light,rgba(250,250,250,0.6))]"
        />
        {SELECTED_STATES.includes(state) ? (
          <SelectState className="absolute right-[2px] bottom-0" />
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

export { ImageItem }
