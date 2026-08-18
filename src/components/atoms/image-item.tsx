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

export interface ImageItemProps extends React.ComponentProps<"div"> {
  state?: ImageItemState
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

const INTERACTIVE_STATES: readonly ImageItemState[] = [
  "hover",
  "pressed",
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
 * deslocado). Tentativa inicial considerada — exportar o símbolo composto
 * inteiro (retângulo já embutido) por estado — descartada depois de testar:
 * o export do node inteiro trazia um retângulo de fundo `#393939` (artefato
 * do canvas do Figma, não do design) e o nome ("Arquivo 2") bake-ado como
 * vetor estático, quebrando a prop `name` dinâmica. Causa raiz real,
 * confirmada via `get_design_context` em cada um dos 7 nós de estado: o
 * retângulo de vidro **não tem a mesma posição em todo estado** — nos
 * estados simples (idle/hover/pressed/disabled) fica em `top-4px left-10px`
 * relativo à caixa do ícone (o que este componente já tinha, correto); nos
 * 3 estados `selected*` ele vive dentro de um grid junto do badge de
 * seleção, com origem bem mais perto do canto (`top-2px left-2px`,
 * Figma-confirmado nos 3 nós). A implementação anterior usava a mesma
 * posição pros dois grupos — por isso "deslocado" nos `selected*`.
 * Corrigido para posição condicional por grupo, sem trocar assets.
 */
function ImageItem({
  state = "idle",
  name = "Arquivo 2",
  showName = true,
  className,
  ...props
}: ImageItemProps) {
  const isSelected = SELECTED_STATES.includes(state)
  const isInteractive = INTERACTIVE_STATES.includes(state)
  const isDisabled = state === "disabled"

  return (
    <div
      data-slot="image-item"
      data-state={state}
      className={cn(
        "relative flex w-fit min-w-[35.14px] flex-col items-center gap-1 px-1 py-0.5",
        isInteractive && "cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="relative h-[41px] w-[35.14px] shrink-0">
        <img alt="" aria-hidden="true" className="absolute inset-0 size-full" src={IMAGE[state]} />
        <div
          aria-hidden="true"
          className={cn(
            "absolute h-7 w-[31px] rounded bg-[var(--effect-glass-fill-light,rgba(250,250,250,0.6))]",
            isSelected ? "top-[2px] left-[2px]" : "top-1 left-[10px]"
          )}
        />
        {isSelected ? (
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
