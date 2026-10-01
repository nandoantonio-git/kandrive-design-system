import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/atoms/checkbox"
import { CloseButton } from "@/components/atoms/close-button"
import { RadioButton } from "@/components/molecules/radio-button"

export type FilterFileKind = "image" | "document" | "video" | "other"
export type FilterSize = "any" | "small" | "medium" | "large"
export type FilterDate = "any" | "week" | "month" | "year"

export interface FilterValue {
  /** Tipo: várias opções. Vazio = todos os tipos. */
  kinds: FilterFileKind[]
  /** Tamanho: uma opção. */
  size: FilterSize
  /** Data: uma opção. */
  date: FilterDate
}

export const EMPTY_FILTER: FilterValue = { kinds: [], size: "any", date: "any" }

const KIND_OPTIONS: { value: FilterFileKind; label: string }[] = [
  { value: "image", label: "Imagens" },
  { value: "document", label: "Documentos" },
  { value: "video", label: "Vídeos" },
  { value: "other", label: "Outros" },
]
const SIZE_OPTIONS: { value: FilterSize; label: string }[] = [
  { value: "any", label: "Qualquer tamanho" },
  { value: "small", label: "Menos de 100 MB" },
  { value: "medium", label: "De 100 MB a 1 GB" },
  { value: "large", label: "Mais de 1 GB" },
]
const DATE_OPTIONS: { value: FilterDate; label: string }[] = [
  { value: "any", label: "Qualquer data" },
  { value: "week", label: "Últimos 7 dias" },
  { value: "month", label: "Últimos 30 dias" },
  { value: "year", label: "Este ano" },
]

/** Quantas opções estão marcadas, sem contar "Qualquer tamanho" e "Qualquer data". É o número da bolinha do funil. */
export function countActiveFilters(value: FilterValue): number {
  return value.kinds.length + (value.size !== "any" ? 1 : 0) + (value.date !== "any" ? 1 : 0)
}

/** Arquivo mínimo que o filtro sabe avaliar. Os componentes de lista passam os próprios campos para cá. */
export interface FilterableFile {
  kind: FilterFileKind
  sizeMB: number
  modified: Date
}

const DAY = 24 * 60 * 60 * 1000

/** Aplica o filtro a uma lista. 1 GB = 1024 MB. "Este ano" é o ano civil de `now`. */
export function applyFilters<T extends FilterableFile>(files: T[], value: FilterValue, now: Date = new Date()): T[] {
  return files.filter((file) => {
    if (value.kinds.length > 0 && !value.kinds.includes(file.kind)) return false
    if (value.size === "small" && !(file.sizeMB < 100)) return false
    if (value.size === "medium" && !(file.sizeMB >= 100 && file.sizeMB <= 1024)) return false
    if (value.size === "large" && !(file.sizeMB > 1024)) return false
    const age = now.getTime() - file.modified.getTime()
    if (value.date === "week" && age > 7 * DAY) return false
    if (value.date === "month" && age > 30 * DAY) return false
    if (value.date === "year" && file.modified.getFullYear() !== now.getFullYear()) return false
    return true
  })
}

export interface FilterMenuProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  /** Figma `Device`: desktop em balão; tablet e mobile em folha de baixo, com linhas de 44px. */
  device?: "desktop" | "tablet" | "mobile"
  /** Controlado; quando omitido, o componente guarda a própria seleção. */
  value?: FilterValue
  defaultValue?: FilterValue
  onValueChange?: (value: FilterValue) => void
  /** Botão Fechar (tablet e mobile) e tecla Esc. */
  onClose?: () => void
}

/**
 * organism/FilterMenu (`3500:9883`): o menu do botão de filtro, desenhado em 2026-10-01 a pedido do usuário.
 * Três grupos: **Tipo** (várias opções), **Tamanho** e **Data** (uma opção cada). Aplica na hora, sem botão
 * Aplicar; "Limpar filtros" no rodapé volta tudo ao padrão e fica desabilitado quando não há filtro.
 *
 * - `device="desktop"`: balão de 280px com linhas de 28px, preso ao funil e aberto para baixo.
 * - `device="tablet"` e `"mobile"`: folha de baixo (420px e 390px), com alça, botão Fechar e linhas de 44px (toque).
 * - Vidro `Effect/Glass/White/70`, como os outros menus. Reaproveita `atom/Checkbox`, `molecule/RadioButton`
 *   e `atom/CloseButton`.
 * - 🧩 Regra 8: hover, pressionado e foco vêm dos componentes reaproveitados; a variante Tablet e o rodapé
 *   desabilitado não existiam no Figma antes desta decisão.
 * - Figma a 14px nos rótulos; aqui 16px, porque o `RadioButton` do sistema é 16 (Regra 4, texto de leitura).
 */
function FilterMenu({ device = "desktop", value: controlledValue, defaultValue = EMPTY_FILTER, onValueChange, onClose, className, ...props }: FilterMenuProps) {
  const [internal, setInternal] = React.useState<FilterValue>(defaultValue)
  const value = controlledValue ?? internal
  const uid = React.useId()
  const touch = device !== "desktop"
  const count = countActiveFilters(value)

  const update = (next: FilterValue) => {
    if (controlledValue === undefined) setInternal(next)
    onValueChange?.(next)
  }
  const toggleKind = (kind: FilterFileKind) =>
    update({ ...value, kinds: value.kinds.includes(kind) ? value.kinds.filter((k) => k !== kind) : [...value.kinds, kind] })

  const row = cn("flex w-full items-center gap-2 px-4", touch ? "min-h-11" : "min-h-7")
  const legend = "px-4 pt-3 pb-1 text-xs font-bold uppercase text-neutral-text-tertiary"
  const separator = <div aria-hidden="true" className="h-px w-full bg-neutral-border-light" />

  return (
    <div
      role="dialog"
      aria-label="Filtrar"
      data-slot="filter-menu"
      data-device={device}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose?.()
      }}
      className={cn(
        "flex flex-col glass-edge glass-shadow-sm bg-effect-glass-white-70 backdrop-blur-md",
        device === "desktop" && "w-[280px] rounded-md py-1",
        device === "tablet" && "w-[420px] max-w-full rounded-t-[20px] pt-2 pb-6",
        device === "mobile" && "w-[390px] max-w-full rounded-t-[20px] pt-2 pb-6",
        className
      )}
      {...props}
    >
      {touch ? <div aria-hidden="true" className="mx-auto my-1 h-1 w-10 rounded-full bg-neutral-border-medium" /> : null}
      <div className={cn("flex items-center justify-between px-4", touch ? "pt-1 pb-2" : "pt-3 pb-2")}>
        <h2 className="text-base leading-[22px] font-semibold text-neutral-text-primary">Filtrar</h2>
        {touch ? <CloseButton aria-label="Fechar" onClick={onClose} /> : null}
      </div>
      {separator}

      <fieldset>
        <legend className={legend}>Tipo</legend>
        {KIND_OPTIONS.map(({ value: kind, label }) => (
          <label key={kind} className={cn(row, "cursor-pointer")}>
            <Checkbox aria-label={label} checked={value.kinds.includes(kind)} onCheckedChange={() => toggleKind(kind)} />
            <span className="text-base font-medium text-neutral-text-secondary">{label}</span>
          </label>
        ))}
      </fieldset>
      {separator}

      <fieldset>
        <legend className={legend}>Tamanho</legend>
        {SIZE_OPTIONS.map(({ value: size, label }) => (
          <div key={size} className={row}>
            <RadioButton
              option={size}
              label={label}
              id={`${uid}-size-${size}`}
              name={`${uid}-size`}
              checked={value.size === size}
              onCheckedChange={() => update({ ...value, size })}
              className="w-full self-stretch"
            />
          </div>
        ))}
      </fieldset>
      {separator}

      <fieldset>
        <legend className={legend}>Data</legend>
        {DATE_OPTIONS.map(({ value: date, label }) => (
          <div key={date} className={row}>
            <RadioButton
              option={date}
              label={label}
              id={`${uid}-date-${date}`}
              name={`${uid}-date`}
              checked={value.date === date}
              onCheckedChange={() => update({ ...value, date })}
              className="w-full self-stretch"
            />
          </div>
        ))}
      </fieldset>
      {separator}

      <div className="px-4 pt-2.5 pb-1.5">
        <button
          type="button"
          disabled={count === 0}
          onClick={() => update(EMPTY_FILTER)}
          className="touch-target cursor-pointer rounded-sm text-base font-medium text-brand-teal transition-opacity hover:opacity-80 active:opacity-60 focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none disabled:cursor-default disabled:text-neutral-text-placeholder disabled:opacity-60 disabled:hover:opacity-60"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  )
}

export { FilterMenu }
