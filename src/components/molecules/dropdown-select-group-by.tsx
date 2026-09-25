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

export interface DropdownSelectGroupByProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  options?: readonly string[]
  value?: string
  onValueChange?: (value: string) => void
  expanded?: boolean
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
 * molecule/DropdownSelect/GroupBy (`1421:18719`) — Figma-confirmado:
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
 */
function DropdownSelectGroupBy({
  options = DEFAULT_OPTIONS,
  value,
  onValueChange,
  expanded = false,
  onExpandedChange,
  disabled,
  device = "desktop",
  className,
  ...props
}: DropdownSelectGroupByProps) {
  const mobile = device === "mobile"
  return (
    <div
      data-slot="dropdown-select-group-by"
      data-disabled={disabled || undefined}
      data-expanded={expanded || undefined}
      className={cn(
        "flex flex-col items-start gap-1 data-[expanded]:h-auto",
        mobile ? "w-fit min-w-[105px]" : "w-[105px]",
        !expanded && (mobile ? "h-[35px]" : "h-[54px]"),
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-[0.32]",
        className
      )}
      {...props}
    >
      {mobile ? null : <span className="px-1 text-[0.625rem] font-bold tracking-wide text-neutral-text-tertiary dark:text-zinc-400">AGRUPAR</span>}
      <div className="relative flex w-full flex-col items-start gap-1 rounded-xl glass-edge glass-shadow-sm bg-effect-glass-light-45 py-2 backdrop-blur-sm">
        <button
          type="button"
          data-slot="dropdown-select-group-by-trigger"
          aria-expanded={expanded}
          disabled={disabled}
          onClick={() => onExpandedChange?.(!expanded)}
          className={cn("flex w-full items-center gap-2 px-3 text-xs text-zinc-700 dark:text-zinc-300", mobile && "touch-target")}
        >
          <Icon name="Group" className="size-3.5 shrink-0" />
          <span className="min-w-0 flex-1 truncate">{value ?? "Agrupar"}</span>
          <ChevronDownIcon
            className={cn("size-3 shrink-0 transition-transform", expanded && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        {expanded ? (
          <ul data-slot="dropdown-select-group-by-list" className="flex w-full flex-col items-center">
            {options.map((option) => (
              <li key={option} className="w-full">
                <DropdownSelectGroupByItem
                  label={option}
                  aria-current={option === value}
                  selected={option === value}
                  onClick={() => onValueChange?.(option)}
                  className="mx-auto"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export { DropdownSelectGroupBy, DEFAULT_OPTIONS }
