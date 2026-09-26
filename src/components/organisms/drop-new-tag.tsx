import * as React from "react"

import { cn } from "@/lib/utils"
import { TagColor, type TagColorName } from "@/components/molecules/tag-color"

export type { TagColorName }

export interface DropNewTagProps extends React.ComponentProps<"div"> {
  /** Nome da etiqueta — controlado; quando omitido, o componente gerencia sozinho. */
  label?: string
  defaultLabel?: string
  onLabelChange?: (label: string) => void
  /** Cor da etiqueta — controlada; quando omitida, o componente gerencia sozinho (clique troca a cor de verdade). */
  color?: TagColorName
  defaultColor?: TagColorName
  onColorChange?: (color: TagColorName) => void
}

/**
 * organism/drop/NewTag (`1444:21624`) — Figma-confirmado: "ao clicar em
 * nova etiqueta abre essa área de output onde você pode inserir o rotulo
 * desejado e a respectiva cor." Compõe `celule/TagColor` (`1444:21979`,
 * implementado na US-021) em vez de reimplementar os 6 swatches de cor
 * localmente — ver `tag-color.tsx` para o histórico da reconciliação
 * (corrige de passagem a cor `danger` desatualizada e o anel de seleção
 * inferido que a versão local antiga tinha).
 *
 * 🧩 Inferido (Regra 9): tema escuro não confirmado no Figma — sombra de
 * elevação composta (anel 1px + blur) não coberta pela tabela-espelho,
 * opacidade aumentada por analogia à regra de elevação padrão.
 *
 * **Corrigido em 2026-09-25** (achado do usuário: "tem uma linha que
 * aparece quando ativo"): existia um `<span>` absoluto simulando o cursor
 * de texto, numa posição fixa (`top-[3px] left-[9px]`) que só aparecia com
 * o campo vazio e focado — redundante com o cursor nativo do `<input>` e,
 * diferente dele, não acompanhava onde o usuário de fato clicou/digitou.
 * Removido; a cor azul (`--accents-blue`) que ele tentava mostrar virou
 * `caret-color` do próprio input, que já é Figma-fiel e funciona de
 * verdade (segue a posição real do cursor).
 *
 * **Corrigido em 2026-09-26** (achado do usuário, clarificado: "propagação"
 * = a cor clicada em `TagColor` não refletia em lugar nenhum): `label`/
 * `color` eram 100% controlados, sem fallback — as stories `Default`/
 * `WithLabel` passavam valores fixos sem `onColorChange`/`onLabelChange`,
 * então clicar numa cor não fazia nada de visível. Reescrito com o mesmo
 * padrão já usado em `ArchiveItem`/`FolderTagChip`: `label`/`color`
 * continuam controláveis, mas quando as props são omitidas o componente
 * gerencia o próprio estado (clique muda a cor de verdade).
 */
function DropNewTag({
  label: controlledLabel,
  defaultLabel = "",
  onLabelChange,
  color: controlledColor,
  defaultColor = "success",
  onColorChange,
  className,
  ...props
}: DropNewTagProps) {
  const [internalLabel, setInternalLabel] = React.useState(defaultLabel)
  const [internalColor, setInternalColor] = React.useState<TagColorName>(defaultColor)
  const label = controlledLabel ?? internalLabel
  const color = controlledColor ?? internalColor

  const handleLabelChange = (next: string) => {
    if (controlledLabel === undefined) setInternalLabel(next)
    onLabelChange?.(next)
  }
  const handleColorChange = (next: TagColorName) => {
    if (controlledColor === undefined) setInternalColor(next)
    onColorChange?.(next)
  }

  return (
    <div
      data-slot="drop-new-tag"
      className={cn(
        "relative h-[52px] w-[153px] overflow-clip rounded-br-md rounded-bl-md rounded-tr-md",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-11 w-[100px] rounded-br-md rounded-bl-md rounded-tr-md glass-edge bg-effect-glass-white-70 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.05),0px_16px_32px_rgba(0,0,0,0.1)] dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1),0px_16px_32px_rgba(0,0,0,0.4)] backdrop-blur-md"
      />
      <div className="absolute top-2.5 left-2.5 h-[25px] w-20 overflow-hidden">
      <input
        type="text"
          aria-label="Nome da etiqueta"
        value={label}
        onChange={(event) => handleLabelChange(event.target.value)}
        placeholder="Nome da etiqueta"
          className="absolute top-px left-0 h-3 w-20 rounded-md border-0 bg-zinc-50 px-1 text-[0.625rem] leading-3 text-zinc-700 caret-[var(--accents-blue,#08f)] placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/50 dark:bg-zinc-900 dark:text-zinc-300"
      />
      </div>
      <TagColor
        value={color}
        onValueChange={handleColorChange}
        className="absolute top-[26px] left-3.5"
      />
    </div>
  )
}

export { DropNewTag }
