import * as React from "react"

import { cn } from "@/lib/utils"
import { SelectState } from "@/components/atoms/select-state"
import imageIdle from "@/assets/illustrations/image-item-idle.svg"
import imageIdleBadge from "@/assets/illustrations/image-item-idle-badge.svg"
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
 * Achado extra na mesma investigação: o estado `idle` tem um **segundo
 * elemento** (`Vector` `1442:8039`, badge menor no canto inferior-esquerdo
 * do ícone, mesma ilustração em miniatura) que nunca foi implementado —
 * visível só comparando o screenshot real do Figma em detalhe, não no
 * código de referência isolado. Posição Figma-confirmada via `get_metadata`:
 * `top-[22.5px] left-[9.64px]`, 15.86×18.5px. Adicionado como
 * `image-item-idle-badge.svg`, só no estado `idle`.
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
          className="absolute top-[2px] left-[2.07px] h-7 w-[31px] rounded bg-[var(--effect-glass-fill-light,rgba(250,250,250,0.6))]"
        />
        {state === "idle" ? (
          <img
            alt=""
            aria-hidden="true"
            className="absolute top-[22.5px] left-[9.64px] h-[18.5px] w-[15.86px]"
            src={imageIdleBadge}
          />
        ) : null}
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
