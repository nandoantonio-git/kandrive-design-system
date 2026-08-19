import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"
import { FileTypeLabel } from "@/components/atoms/type-label"
import { DropdownSelectLabelItem } from "@/components/atoms/dropdown-select-label-item"
import LabelChevronGlyph from "@/assets/icons/LabelChevronGlyph.svg?react"
import LabelSearchGlyph from "@/assets/icons/LabelSearchGlyph.svg?react"

export interface LabelProps extends Omit<React.ComponentProps<"div">, "children" | "onChange"> {
  /** Eixo `State` Figma-confirmado: `Default` (pílula fechada), `Expanded` (busca + lista), `Disabled`. */
  state?: "default" | "expanded" | "disabled"
  value?: string
  onExpandedChange?: (expanded: boolean) => void
  onCreateLabel?: () => void
  /**
   * Quando informado (mesmo array vazio), o `Expanded` vira lista dinâmica de
   * etiquetas existentes (comportamento consolidado de
   * `molecule/DropdownSelect/Label`, `1439:19650`) em vez das 3 linhas fixas
   * de tipo de arquivo (Documentos/Imagem/Vídeo). Ver nota de consolidação.
   */
  labels?: string[]
  onValueChange?: (label: string) => void
}

/**
 * molecule/Label (`1421:18687`, Figma-confirmado, descrição verbatim:
 * "pilula de dropdown de etiquetas") — pílula "Etiquetar" com legenda
 * "ETIQUETAR" acima, Liquid Glass (`effect-glass-light-45`).
 *
 * **Achado de possível duplicidade no Figma fonte (Regra 9, ver
 * `docs/conflicts.md`)**: este node é estruturalmente quase idêntico a
 * `molecule/DropdownSelect/Label` (`1439:19650`, já implementado em
 * `dropdown-select-label.tsx`) — mesma legenda "ETIQUETAR", mesma pílula
 * `atom/Icon/Label` + "Etiquetar" + chevron, mesmo `atom/DropdownSelect/Label/Item`
 * ("+ Nova Etiqueta") no rodapé da lista. Não consolidados num só
 * componente nesta US: são 2 node IDs Figma distintos, e
 * `DropdownSelect/Label` já está em uso real noutro lugar do design
 * system — decisão de unificação fica para revisão humana, registrada
 * como conflito, não resolvida silenciosamente aqui.
 *
 * O que este node acrescenta de novo e Figma-confirmado (que o outro não
 * tinha): a composição real do estado `Expanded` — mini busca
 * (`Search/Placeholder/SM`) + 3 linhas `atom/badge/TypeLabel`
 * (Documentos/Image/Videos, cores de ponto agora confirmadas e propagadas
 * para `type-label.tsx`) + `atom/DropdownSelect/Label/Item` ("+ Nova
 * Etiqueta", reutilizado de `dropdown-select-label-item.tsx`) — e o estado
 * `Disabled` (pílula horizontal com opacidade reduzida).
 *
 * Chevron da pílula usa um glifo caret (`LabelChevronGlyph`, asset real
 * exportado) distinto de `atom/Icon/ArrowDropDown` (triângulo, usado no
 * node de `DropdownSelectLabel`) — formas Figma-confirmadas diferentes
 * entre os dois nodes, não a mesma peça reaproveitada.
 *
 * 🔧 **Consolidado em 2026-08-18 (decisão humana)**: `dropdown-select-label.tsx`
 * foi removido e absorvido aqui via a prop `labels` — sem consumidor real
 * na base de código (só a própria story), consolidar era estritamente
 * seguro. Quando `labels` é informado, o `Expanded` renderiza a lista
 * dinâmica de etiquetas (`DropdownSelectLabelItem` por item + "+ Nova
 * Etiqueta", igual ao node `1439:19650`) em vez das 3 linhas fixas de tipo
 * de arquivo do node `1421:18687`. A caixa de busca mini (`LabelSearchGlyph`)
 * só aparece no modo de tipo de arquivo — não confirmada no node de
 * `DropdownSelectLabel`, então não replicada lá (Regra 9, 🧩 não inventado).
 * O chevron caret (`LabelChevronGlyph`) é usado nos dois modos agora —
 * pequena divergência visual assumida conscientemente pro node de
 * `DropdownSelectLabel` (que usava a seta triângulo `ArrowDropDown`), já
 * que a API virou uma só.
 */
function Label({
  state = "default",
  value = "Etiquetar",
  onExpandedChange,
  onCreateLabel,
  labels,
  onValueChange,
  className,
  ...props
}: LabelProps) {
  const isExpanded = state === "expanded"
  const isDisabled = state === "disabled"
  const isDynamicList = labels !== undefined

  return (
    <div
      data-slot="label"
      data-state={state}
      className={cn(
        "flex w-[109px] flex-col items-start gap-1",
        isDisabled && "pointer-events-none opacity-[0.32]",
        className
      )}
      {...props}
    >
      <span className="w-full px-1 text-[0.625rem] font-bold tracking-[0.012px] text-zinc-500">
        ETIQUETAR
      </span>

      {isExpanded ? (
        <div className="flex h-[145px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-[#00000066] bg-effect-glass-light-45 px-px py-2">
          <button
            type="button"
            aria-expanded="true"
            onClick={() => onExpandedChange?.(false)}
            className="flex h-5 w-full items-center gap-2 px-1 text-[0.625rem] text-zinc-700"
          >
            <Icon name="Label" className="size-3 shrink-0" />
            <span className="min-w-0 flex-1 whitespace-nowrap text-left">{value}</span>
            <LabelChevronGlyph aria-hidden="true" className="size-2 shrink-0" />
          </button>
          {isDynamicList ? (
            <ul className="flex w-full flex-1 flex-col items-center">
              {labels.map((label) => (
                <li key={label} className="w-full">
                  <DropdownSelectLabelItem
                    label={label}
                    aria-current={label === value}
                    active={label === value}
                    onClick={() => onValueChange?.(label)}
                    className="mx-auto"
                  />
                </li>
              ))}
              <li className="w-full">
                <DropdownSelectLabelItem onClick={onCreateLabel} className="mx-auto" />
              </li>
            </ul>
          ) : (
            <div className="flex w-full flex-1 flex-col items-center gap-1">
              <div className="flex h-5 w-[86px] items-center gap-1.5 rounded-md bg-[#ccced6] px-1">
                <LabelSearchGlyph aria-hidden="true" className="size-3 shrink-0 text-zinc-500" />
              </div>
              <div className="flex w-[109px] flex-col items-center gap-1 px-3 pb-1">
                <FileTypeLabel kind="document" className="w-full" />
                <FileTypeLabel kind="image" className="w-full" />
                <FileTypeLabel kind="video" className="w-full" />
                <DropdownSelectLabelItem onClick={onCreateLabel} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          data-slot="label-trigger"
          disabled={isDisabled}
          onClick={() => onExpandedChange?.(true)}
          className="flex h-[35px] w-full cursor-pointer items-center gap-2 rounded-xl border border-[#00000066] bg-effect-glass-light-45 px-3 py-2 text-[0.625rem] text-zinc-700 disabled:cursor-not-allowed"
        >
          <Icon name="Label" className="size-3 shrink-0" />
          <span className="min-w-0 flex-1 whitespace-nowrap text-left">{value}</span>
          <LabelChevronGlyph aria-hidden="true" className="size-2 shrink-0" />
        </button>
      )}
    </div>
  )
}

export { Label }
