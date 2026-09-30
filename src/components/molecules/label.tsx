import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"
import { FILE_TYPE_LABEL, FileTypeLabel } from "@/components/atoms/type-label"
import { DropdownSelectLabelItem } from "@/components/atoms/dropdown-select-label-item"
import LabelChevronGlyph from "@/assets/icons/LabelChevronGlyph.svg?react"
import LabelSearchGlyph from "@/assets/icons/LabelSearchGlyph.svg?react"

export interface LabelProps extends Omit<React.ComponentProps<"div">, "children" | "onChange" | "defaultValue"> {
  /**
   * Eixo `State` Figma-confirmado: `Default` (pílula fechada), `Expanded`
   * (busca + lista), `Disabled`. Quando informado, fixa o estado (controlado,
   * usado nas stories de estado); quando omitido, o componente abre e fecha
   * sozinho.
   */
  state?: "default" | "expanded" | "disabled"
  defaultExpanded?: boolean
  disabled?: boolean
  /** Etiqueta mostrada na pílula — controlada; quando omitida, o componente guarda a última escolhida. */
  value?: string
  defaultValue?: string
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
 * molecule/Label (`302:12809`, Figma-confirmado, descrição verbatim:
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
 *
 * **Corrigido em 2026-09-26** (usuário: "Label sem interagir"): o componente
 * só abria se o pai controlasse `state`, e ninguém controlava — nem as
 * stories (o meta fixava `state: "default"`) nem as 3 telas que o usam
 * (Home, Organização, Resumo de armazenamento, todas com `<Label />` sem
 * props). Ou seja, não abria em lugar nenhum do produto. Agora segue o
 * padrão não-controlado de `ArchiveItem`/`DropNewTag`: sem `state`, o clique
 * abre e fecha; escolher uma opção atualiza a pílula e fecha.
 * 🧩 Extensões de engenharia (Regra 8, o Figma só desenha os 3 estados
 * parados): fechar com Esc e com clique fora; a mini busca vira um `<input>`
 * de verdade que filtra as opções (antes era uma `div` sem campo); e as
 * linhas de tipo de arquivo viram opções clicáveis, como as da lista dinâmica.
 * 🧩 O anel de foco dos gatilhos também é Regra 8.
 *
 * **Corrigido em 2026-09-28** (usuário: "etiquetar perde um padding top
 * expandido"): o card expandido tinha altura fixa de 145px e centralizava o
 * conteúdo, então a lista empurrava o gatilho para fora do respiro de cima.
 * Agora segue o `Expanded=true` (`307:14531`): altura pelo conteúdo, padding
 * de 8px, gatilho no topo, busca e lista abaixo com gap de 8px. A lista
 * flutua sobre o conteúdo (a raiz mantém 54px), como no `DropdownSelectGroupBy`.
 */
function Label({
  state: controlledState,
  defaultExpanded = false,
  disabled = false,
  value: controlledValue,
  defaultValue = "Etiquetar",
  onExpandedChange,
  onCreateLabel,
  labels,
  onValueChange,
  className,
  ...props
}: LabelProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [query, setQuery] = React.useState("")
  const rootRef = React.useRef<HTMLDivElement>(null)

  const state = controlledState ?? (disabled ? "disabled" : internalExpanded ? "expanded" : "default")
  const value = controlledValue ?? internalValue
  const isExpanded = state === "expanded"
  const isDisabled = state === "disabled"
  const isDynamicList = labels !== undefined

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (controlledState === undefined) setInternalExpanded(next)
      if (!next) setQuery("")
      onExpandedChange?.(next)
    },
    [controlledState, onExpandedChange]
  )

  const select = (label: string) => {
    if (controlledValue === undefined) setInternalValue(label)
    onValueChange?.(label)
    setExpanded(false)
  }

  React.useEffect(() => {
    if (!isExpanded) return
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
  }, [isExpanded, setExpanded])

  const normalizedQuery = query.trim().toLowerCase()
  const fileTypes = (["document", "image", "video"] as const).filter((kind) =>
    FILE_TYPE_LABEL[kind].toLowerCase().includes(normalizedQuery)
  )

  return (
    <div
      ref={rootRef}
      data-slot="label"
      data-state={state}
      className={cn(
        "relative flex h-[54px] w-[109px] flex-col items-start gap-1",
        isDisabled && "pointer-events-none opacity-[0.32]",
        className
      )}
      {...props}
    >
      <span className="w-full px-1 text-[0.625rem] font-bold tracking-[0.012px] text-neutral-text-tertiary dark:text-zinc-400">
        ETIQUETAR
      </span>

      {isExpanded ? (
        <div className="relative z-30 flex w-full flex-col items-start gap-2 rounded-xl glass-edge glass-shadow-sm bg-effect-glass-light-45 px-2 py-2 backdrop-blur-[10px]">
          <button
            type="button"
            aria-expanded="true"
            onClick={() => setExpanded(false)}
            className="group flex h-5 w-full items-center gap-2 rounded-md px-1 text-[0.625rem] text-zinc-700 dark:text-zinc-300 transition-[background-color,opacity] hover:bg-[#71717a33] dark:hover:bg-[#a1a1aa33] active:opacity-70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50"
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
                    onClick={() => select(label)}
                    className="mx-auto"
                  />
                </li>
              ))}
              <li className="w-full">
                <DropdownSelectLabelItem onClick={onCreateLabel} className="mx-auto" />
              </li>
            </ul>
          ) : (
            <div className="flex w-full flex-col items-start gap-1 px-1">
              <label className="flex h-5 w-full items-center gap-1.5 rounded-md bg-[#ccced6] dark:bg-[#3a3a3f] px-1 focus-within:ring-3 focus-within:ring-brand-teal-action/50">
                <LabelSearchGlyph aria-hidden="true" className="size-3 shrink-0 text-neutral-text-tertiary dark:text-zinc-400" />
                <input
                  type="search"
                  aria-label="Buscar etiqueta"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-full min-w-0 flex-1 bg-transparent text-[0.625rem] text-zinc-700 outline-none dark:text-zinc-300 [&::-webkit-search-cancel-button]:hidden"
                />
              </label>
              <div className="flex w-full flex-col items-center gap-1 py-1">
                <div role="listbox" aria-label="Etiquetas" className="flex w-full flex-col items-center gap-1">
                {fileTypes.map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    role="option"
                    aria-selected={FILE_TYPE_LABEL[kind] === value}
                    onClick={() => select(FILE_TYPE_LABEL[kind])}
                    className="w-full cursor-pointer rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 active:opacity-60"
                  >
                    <FileTypeLabel kind={kind} selected={FILE_TYPE_LABEL[kind] === value} className="w-full" />
                  </button>
                ))}
                </div>
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
          aria-expanded="false"
          onClick={() => setExpanded(true)}
          className="group relative flex h-[35px] w-full cursor-pointer items-center gap-2 rounded-xl glass-edge glass-shadow-sm bg-effect-glass-light-45 px-3 py-2 text-[0.625rem] text-zinc-700 dark:text-zinc-300 transition-[background-color,opacity] hover:bg-[#71717a33] dark:hover:bg-[#a1a1aa33] active:opacity-70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
