import * as React from "react"
import { FolderIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FolderTagChipProps extends React.ComponentProps<"span"> {
  /** Nome da pasta exibido no chip. */
  label: string
  /** Chamado ao clicar no botão de remover. Quando omitido, o botão não é renderizado. */
  onRemove?: () => void
  disabled?: boolean
  /**
   * Eixo `isExpanded` (Figma-confirmado em `celule/chip/folder-tag`,
   * `1421:19040`). **Implementação literal do Figma, decisão humana em
   * 2026-09-25**: com `isExpanded=false` (o padrão), o ícone de pasta e o
   * rótulo ficam com `opacity: 0` — exatamente como as camadas
   * `Symbol`/`Label` do node `568:8695` (`State=Default, Expanded=false`),
   * sobra só o botão de remover. Com `isExpanded=true`, os dois ficam
   * visíveis e o rótulo perde o truncamento. O texto continua no DOM (não
   * `aria-hidden`) para o leitor de tela anunciar o nome da pasta mesmo
   * colapsado (Regra 8 — extensão de acessibilidade, não muda o visual).
   */
  isExpanded?: boolean
  /**
   * Eixo `State=Selected` (Figma-confirmado: "State (Default/Hover/Selected)").
   * Estilo visual 🧩 inferido (realce com a cor de marca travada, Regra 3) —
   * não extraído variante-a-variante do Figma.
   */
  selected?: boolean
}

/**
 * molecule/chip-folder-tag (Figma: `celule/chip/folder-tag`, `1421:19040`) —
 * reconciliado em 2026-08-09 contra `docs/figma-inventory.md` (achados
 * críticos #5/#6). `isExpanded` e `State=Selected` são Figma-confirmados
 * como props existentes (contrariam a suposição antiga de "isExpanded
 * ausente" em `AGENTS.md` Regra 7 — ver `docs/conflicts.md`). O `opacity:0`
 * residual (texto "Pessoal" no estado Default/não-expandido, Figma-
 * confirmado) segue **não reproduzido** — leftover de edição do arquivo
 * fonte, não um dado a exibir.
 *
 * Corrigido em auditoria Regra 11 (US-026): `get_design_context` não retorna
 * nenhuma borda (`border`) em nenhum dos 4 estados (`Default`/`Idle`/
 * `Hover`/`Pressed`) — só variação de `background`. A borda
 * (`border-zinc-200`/`hover:border-zinc-300`/`data-[selected]:border-brand-teal`)
 * era um elemento inventado, removida. Cores de fundo/texto trocadas pelos
 * tokens Figma-confirmados exatos: `Idle` → `bg-zinc-100` (aprox. de
 * `neutral-surface-background` `#f3f3f3`), `Hover` → `bg-zinc-200` (aprox.
 * de `neutral-surface-subtle` `#eaeaea`), `Selected`/`Pressed` →
 * `bg-brand-teal-light-surface` (`var(--brand-primary-light,#c8dce3)`, hex exato) +
 * `text-brand-teal-dark` (`var(--brand-primary-dark,#1a5e6e)`, hex exato) —
 * antes usava `bg-brand-teal-action/10`/`text-brand-teal` (`#007e96`), que não
 * corresponde ao token de "selecionado" real do Figma.
 *
 * **Resolvido em 2026-09-25** (decisão humana, ver [[Conflitos Abertos]]):
 * no estado `Default` (`isExpanded=false`), o ícone de pasta e o rótulo
 * ficam com `opacity: 0`, como no Figma (`568:8695`) — sobra só o botão de
 * remover. Nenhuma tela do produto usa este chip hoje (só existe no
 * catálogo), então a fidelidade literal não quebra nenhuma composição real.
 */
function FolderTagChip({
  label,
  onRemove,
  disabled,
  isExpanded,
  selected,
  className,
  ...props
}: FolderTagChipProps) {
  return (
    <span
      data-slot="folder-tag-chip"
      data-disabled={disabled || undefined}
      data-expanded={isExpanded || undefined}
      data-selected={selected || undefined}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 pr-2 pl-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300",
        "transition-colors",
        "hover:bg-zinc-200 dark:hover:bg-zinc-800",
        "data-[selected]:bg-brand-teal-light-surface data-[selected]:text-brand-teal-dark",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <FolderIcon
        className={cn("size-3.5 shrink-0 text-zinc-500 dark:text-zinc-400", !isExpanded && "opacity-0")}
        aria-hidden="true"
      />
      <span className={cn("truncate", isExpanded ? "max-w-none" : "opacity-0")}>{label}</span>
      {onRemove ? (
        <button
          type="button"
          data-slot="folder-tag-chip-remove"
          aria-label={`Remover ${label}`}
          disabled={disabled}
          onClick={onRemove}
          className={cn(
            "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400",
            "transition-colors motion-safe:active:scale-95",
            "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50"
          )}
        >
          <XIcon className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  )
}

export { FolderTagChip }
