import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface NodeContextMenuItemProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Placeholder mostrado quando não há `value` selecionado (ex.: "Atributo", "Valor..."). */
  label: string
  kind?: "attribute" | "condition" | "value" | "date" | "interval"
  /** Eixo `type` do Figma: pílulas `Atribute`\|`Conditional` abrem lista (chevron); `Value`\|`Date` são estáticas. */
  hasChevron?: boolean
  /** Valor selecionado — controlado; quando omitido, o componente gerencia sozinho (não-controlado). */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Eixo `property3=wrongInput` do Figma — anel/borda de erro. */
  error?: boolean
  /** Aberto/fechado — controlado; quando omitido, o componente gerencia sozinho (não-controlado, abre/fecha ao clicar no trigger e fecha ao selecionar uma opção). */
  expanded?: boolean
  defaultExpanded?: boolean
  selectedOption?: string
  onExpandedChange?: (expanded: boolean) => void
  options?: readonly string[]
  disabled?: boolean
  /**
   * 🧩 Regra 8: pílula sem chevron (`Value`) vira campo de texto — o Figma só
   * desenha o placeholder "Valor...". `label` vira o placeholder e o texto
   * digitado passa por `value`/`onValueChange`.
   */
  editable?: boolean
}

const WIDTH_BY_KIND = {
  attribute: "w-[98.5px]",
  condition: "w-[116px]",
  value: "w-[72px]",
  date: "w-[72px]",
  interval: "w-[116px]",
} as const

function inferKind(label: string, hasChevron: boolean): NonNullable<NodeContextMenuItemProps["kind"]> {
  if (label === "Operação") return "condition"
  if (label === "Intervalo") return "interval"
  if (label === "Data") return "date"
  if (!hasChevron || label.startsWith("Valor")) return "value"
  return "attribute"
}

/**
 * celule/nodoContextMenuItem (`1384:17074`, Figma-confirmado) — "dropdown de
 * seleção de atributos e condições do menu contextual do canva Modo livre
 * template. ha aba data será de acordo com o navegador ou de uma
 * biblioteca(seus rqueistos é escolher uma data ou um intervalo de datas."
 * Camada `celule` (AGENTS.md — Estrutura de arquivos): peça própria, não
 * forçada em atom nem molecule. Mesmo padrão de trigger+lista já usado em
 * `molecule/DropdownSelectGroupBy` (chevron + `<ul>` condicional), aplicado
 * aqui às pílulas do construtor de filtro/condição:
 * "Atributo"/"Operação"/"Intervalo" (com chevron, abrem lista de opções) e
 * "Valor..."/"Data"/valor literal (pílula estática, sem chevron).
 * `filled` (cor sólida escura + texto branco) vs placeholder (fundo mudo +
 * texto zinc) reflete o Figma-confirmado `Default` (vazio) vs valor
 * selecionado. Aba "Data" (agenda real de calendário) não é implementada —
 * fora de escopo de uma pílula de catálogo (a description do Figma já
 * remete a um componente de calendário externo, não a este nó).
 *
 * 🧩 Regra 8: foco do gatilho e hover/pressed/foco das opções não
 * desenhados no Figma. Também são extensão: Esc e clique fora fecham a lista
 * (2026-09-28), e a pílula de valor vira campo de texto com `editable`.
 *
 * 🧩 Inferido (Regra 9): toda a paleta zinc deste componente é
 * intencionalmente escura (zinc-500/600/800/900, nunca zinc-50/100/200/300)
 * — chip de contraste fixo sobre o painel translúcido do organism pai, já
 * dark-apropriado (mesmo critério de "border zinc-800, dark UI chrome" do
 * ruleset); não recebeu pares `dark:`.
 */
function NodeContextMenuItem({
  label,
  kind,
  hasChevron = true,
  value: controlledValue,
  defaultValue,
  onValueChange,
  error = false,
  expanded: controlledExpanded,
  defaultExpanded = false,
  selectedOption,
  onExpandedChange,
  options,
  disabled,
  editable = false,
  className,
  ...props
}: NodeContextMenuItemProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)
  const value = controlledValue ?? internalValue
  const expanded = controlledExpanded ?? internalExpanded

  const setExpanded = (next: boolean) => {
    if (controlledExpanded === undefined) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const selectValue = (option: string) => {
    if (controlledValue === undefined) setInternalValue(option)
    onValueChange?.(option)
    setExpanded(false)
  }

  const rootRef = React.useRef<HTMLDivElement>(null)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded])

  const visualKind = kind ?? inferKind(label, hasChevron)
  const filled = value !== undefined && value !== ""
  const widthClassName = WIDTH_BY_KIND[visualKind]
  const surfaceClassName = filled || visualKind === "date" ? "bg-zinc-800 text-zinc-200" : "bg-zinc-500/20 text-zinc-700 dark:text-zinc-300"
  return (
    <div
      ref={rootRef}
      data-slot="node-context-menu-item"
      data-kind={visualKind}
      data-expanded={expanded || undefined}
      className={cn("relative flex flex-col items-start rounded-[var(--radius-md)]", widthClassName, className)}
      {...props}
    >
      {editable && !hasChevron ? (
        <input
          type="text"
          data-slot="node-context-menu-item-input"
          aria-label={label.replace(/\.+$/, "")}
          placeholder={label}
          value={value ?? ""}
          disabled={disabled}
          onChange={(event) => {
            if (controlledValue === undefined) setInternalValue(event.target.value)
            onValueChange?.(event.target.value)
          }}
          className={cn(
            "h-6 w-full rounded-[var(--radius-md)] border px-2 text-center text-[0.6875rem] leading-4 outline-none transition-[color,background-color,border-color] placeholder:text-zinc-600 dark:placeholder:text-zinc-400",
            "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
            surfaceClassName,
            error ? "border-destructive shadow-[0_0_0_2px_rgba(188,52,38,0.35)]" : filled ? "border-zinc-700" : "border-zinc-500",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      ) : (
      <button
        type="button"
        data-slot="node-context-menu-item-trigger"
        aria-expanded={hasChevron ? expanded : undefined}
        disabled={disabled}
        onClick={() => hasChevron && setExpanded(!expanded)}
        className={cn(
          "flex h-6 w-full items-center justify-center gap-1 whitespace-nowrap rounded-[var(--radius-md)] border px-2 text-[0.6875rem] leading-4 transition-[color,background-color,border-color,filter]",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
          surfaceClassName,
          expanded && hasChevron && "border-zinc-500 bg-zinc-600 text-zinc-300",
          error && "border-destructive shadow-[0_0_0_2px_rgba(188,52,38,0.35)]",
          !error && !expanded && (filled ? "border-zinc-700" : "border-zinc-500"),
          hasChevron && "hover:brightness-110 active:brightness-95",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        <span className="truncate">{filled ? value : label}</span>
        {hasChevron ? (
          <ChevronDownIcon
            className={cn("size-3 shrink-0 transition-transform", expanded && "rotate-180")}
            aria-hidden="true"
          />
        ) : null}
      </button>
      )}
      {hasChevron && expanded && options && options.length > 0 ? (
        <ul
          data-slot="node-context-menu-item-list"
          className="absolute top-full left-0 z-20 mt-1 flex w-max min-w-full flex-col rounded-[var(--radius-md)] border border-zinc-500 bg-zinc-600 py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                data-slot="node-context-menu-item-option"
                aria-current={option === selectedOption || option === value}
                onClick={() => selectValue(option)}
                className={cn(
                  "block h-[22px] w-full px-3 text-left text-[0.8125rem] leading-none whitespace-nowrap text-zinc-300 transition-[background-color,opacity] hover:bg-black/14 active:opacity-70",
                  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:ring-inset",
                  (option === selectedOption || option === value) && "bg-black/14"
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { NodeContextMenuItem }
