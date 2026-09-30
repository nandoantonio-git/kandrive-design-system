import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"
import { DropdownSelectGroupByItem } from "@/components/atoms/dropdown-select-group-by-item"

/**
 * Opções confirmadas no Figma (`1421:18719`, estado Expanded) — ordem
 * exata da árvore (`get_design_context`, 2026-08-11, Regra 11): "Data de
 * modificação", "Tipo", "Tamanho", "Data de adição". Corrigido nesta
 * auditoria — a versão anterior listava "Tipo" primeiro, invertendo a
 * ordem real do Figma.
 */
const DEFAULT_OPTIONS = ["Data de modificação", "Tipo", "Tamanho", "Data de adição"] as const

/** Direção da ordem (Figma `Direction`, abaixo do divisor no `Expanded=true`, `3030:4213`). */
const DEFAULT_DIRECTIONS = ["Mais recentes", "Mais antigos"] as const

export interface DropdownSelectGroupByProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  options?: readonly string[]
  /** Critério escolhido — controlado; quando omitido, o componente guarda o último escolhido. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Direções da ordem mostradas abaixo do divisor. Passe `[]` para esconder a seção. */
  directions?: readonly string[]
  /** Direção escolhida — controlada; quando omitida, o componente guarda a última escolhida. */
  direction?: string
  defaultDirection?: string
  onDirectionChange?: (direction: string) => void
  /** Aberto/fechado — controlado; quando omitido, o componente abre e fecha sozinho. */
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  disabled?: boolean
  /**
   * Figma `Device`: desktop (com o título "AGRUPAR") · mobile (só o botão
   * compacto de 35px, sem título). Na Home mobile, substitui o `atom/SortButton`
   * (decisão da Fase 4 e Q25, 2026-09-24).
   */
  device?: "desktop" | "mobile"
}

/**
 * molecule/DropdownSelect/GroupBy (`307:14252`) — Figma-confirmado:
 * "item da pilula de agrupar, no qual você seleciona a condição de
 * agrupamento". Estados Figma-confirmados: Default\|Expanded\|Disabled.
 * Rótulo de seção "AGRUPAR" e botão "Agrupar" são texto Figma-confirmado.
 * Fundo usa o material Liquid Glass (`effect-glass-light-45`) — ver
 * Tokens/Materials (Regra 10).
 *
 * Corrigido em 2026-08-11 (achado do usuário): `w-[105px]` é fiel ao Figma
 * (`get_metadata` confirma 105px no estado `Expanded` também), mas opções
 * longas ("Data de modificação") quebravam linha sem truncamento — texto
 * agora corta com reticências (`truncate`) em vez de quebrar.
 *
 * Reconciliado em 2026-08-11 (US-019): cada opção da lista agora renderiza
 * `atom/DropdownSelect/GroupBy/Item` (`1444:21587`, node Figma próprio
 * achado nesta US) em vez do `<button>` inline anterior — item ganha o
 * tratamento visual real (fundo por estado, texto centralizado 10px) em
 * vez da aproximação anterior (texto colorido sem fundo).
 *
 * **Corrigido em 2026-09-28** (usuário: "agrupamento não está interativo"):
 * o componente só abria se o pai controlasse `expanded`, e nenhuma tela
 * controlava (Home, Organização, Guardados e o resumo de armazenamento
 * usam `<DropdownSelectGroupBy />` sem props). Agora segue o padrão
 * não-controlado de `Label`: sem `expanded`, o clique abre e fecha; Esc e
 * clique fora fecham. Também ganhou a seção de direção do `Expanded=true`
 * (`307:14584`): divisor + "Mais recentes"/"Mais antigos", escolha
 * independente do critério — escolher a direção não fecha a lista.
 *
 * 🧩 Regra 8: hover, pressed e foco do gatilho não desenhados no Figma.
 */
function DropdownSelectGroupBy({
  options = DEFAULT_OPTIONS,
  value: controlledValue,
  defaultValue,
  onValueChange,
  directions = DEFAULT_DIRECTIONS,
  direction: controlledDirection,
  defaultDirection,
  onDirectionChange,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  disabled,
  device = "desktop",
  className,
  ...props
}: DropdownSelectGroupByProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalDirection, setInternalDirection] = React.useState(defaultDirection)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const expanded = !disabled && (controlledExpanded ?? internalExpanded)
  const value = controlledValue ?? internalValue
  const direction = controlledDirection ?? internalDirection
  const mobile = device === "mobile"

  const setExpanded = React.useCallback(
    (next: boolean) => {
      if (controlledExpanded === undefined) setInternalExpanded(next)
      onExpandedChange?.(next)
    },
    [controlledExpanded, onExpandedChange]
  )

  const selectValue = (option: string) => {
    if (controlledValue === undefined) setInternalValue(option)
    onValueChange?.(option)
    setExpanded(false)
  }

  const selectDirection = (option: string) => {
    if (controlledDirection === undefined) setInternalDirection(option)
    onDirectionChange?.(option)
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
      data-slot="dropdown-select-group-by"
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      data-expanded={expanded || undefined}
      className={cn(
        "relative flex flex-col items-start gap-1",
        // w-fit desde 2026-09-30: com 12px (escala nova) "Agrupar" não cabia em 105px e virava "Agru...".
        "w-fit min-w-[105px]",
        mobile ? "h-[35px]" : "h-[54px]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-[0.32]",
        className
      )}
      {...props}
    >
      {mobile ? null : <span className="px-1 text-xs font-bold tracking-wide text-neutral-text-tertiary dark:text-zinc-400">AGRUPAR</span>}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-1 rounded-xl glass-edge glass-shadow-sm bg-effect-glass-light-45 py-2 backdrop-blur-[10px]",
          expanded && "relative z-30"
        )}
      >
        <button
          type="button"
          data-slot="dropdown-select-group-by-trigger"
          aria-expanded={expanded}
          disabled={disabled}
          onClick={() => setExpanded(!expanded)}
          className={cn(
            // Figma: o GroupBy não tem estado de hover no contêiner; o hover é a smart animation do ícone (atom/Icon/Group).
            "group flex w-full items-center gap-2 rounded-md px-3 text-xs text-zinc-700 transition-opacity dark:text-zinc-300",
            "active:opacity-70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
            mobile && "touch-target"
          )}
        >
          <Icon name="Group" className="size-3.5 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left">{value ?? "Agrupar"}</span>
          <ChevronDownIcon
            className={cn("size-3 shrink-0 transition-transform motion-reduce:transition-none", expanded && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        {expanded ? (
          <>
            <ul data-slot="dropdown-select-group-by-list" aria-label="Agrupar por" className="flex w-full flex-col items-center">
              {options.map((option) => (
                <li key={option} className="w-full">
                  <DropdownSelectGroupByItem
                    label={option}
                    aria-pressed={option === value}
                    selected={option === value}
                    onClick={() => selectValue(option)}
                    className="mx-auto"
                  />
                </li>
              ))}
            </ul>
            {directions.length > 0 ? (
              <>
                <div aria-hidden="true" className="mx-auto h-px w-[89px] bg-[#71717a33]" />
                <ul data-slot="dropdown-select-group-by-directions" aria-label="Ordem" className="flex w-full flex-col items-center">
                  {directions.map((option) => (
                    <li key={option} className="w-full">
                      <DropdownSelectGroupByItem
                        label={option}
                        aria-pressed={option === direction}
                        selected={option === direction}
                        onClick={() => selectDirection(option)}
                        className="mx-auto"
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}

export { DropdownSelectGroupBy, DEFAULT_OPTIONS, DEFAULT_DIRECTIONS }
