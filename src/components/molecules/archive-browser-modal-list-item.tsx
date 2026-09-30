import * as React from "react"

import { cn } from "@/lib/utils"
import ArchiveItemGlyph from "@/assets/icons/ArchiveItemGlyph.svg?react"

export interface ArchiveBrowserModalListItemProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Nome do arquivo — `Meta` linha 1, 16px. */
  fileName: string
  /** `Meta` linha 2, 11px — formato Figma-confirmado "TIPO · TAMANHO · DATA". */
  meta: string
  /** `Property 1=ArchiveSelectableRow` (Figma-confirmado) — realce sutil de linha selecionável. */
  selected?: boolean
}

/**
 * molecule/ArchiveBrowserModal/ListItem (`1421:20896`, eixo `Property 1`:
 * `ArchiveFileRow`\|`ArchiveSelectableRow`) — linha de arquivo dentro do
 * modal "Adicionar arquivos" (`organism/ArchiveBrowserModal`). Ícone
 * (instância de `atom/ArchiveItem`, `1421:18214`, ainda não implementado
 * como átomo próprio nesta US) + coluna `Meta` (nome 16px `#09090b` +
 * legenda 11px `#71717a`, tracking 0.2px).
 *
 * Ícone reproduzido a partir do asset real exportado do Figma
 * (`ArchiveItemGlyph.svg`, cartão com gradiente teal + 3 linhas), não um
 * placeholder `lucide-react` — mais fiel que a convenção usada em
 * `molecule/FileList` (que ainda usa `FileIcon` até `atom/ArchiveItem`
 * existir como átomo formal), pois este node específico já embute o
 * export pixel-a-pixel do glifo.
 *
 * `selected` mapeia o eixo `ArchiveSelectableRow` — fundo
 * `effect-overlay-subtle` (`rgba(191,199,210,0.1)`) + `rounded-md`. A
 * badge de tier vazia (`I...;1421:18290`) presente nos dois nodes Figma
 * não tem conteúdo confirmado em nenhum dos dois — omitida (Regra 11,
 * nunca inventar elemento não confirmável).
 *
 * 🧩 Inferido (Regra 9): overlay `rgba(191,199,210,x)` é o valor literal de
 * `--effect-overlay-subtle`, não a classe-token — dark: usa o par
 * `rgba(168,176,189,x)` já definido para esse token em `.dark`.
 *
 * Com `onClick`, a linha vira um botão de alternância (`role="button"`,
 * `tabIndex=0`, Enter/Espaço, `aria-pressed` = `selected`). Continua `div`
 * porque as linhas também aparecem como lista só de leitura (sem clique), e
 * lá não devem virar parada de Tab. 🧩 Regra 8: pressed e foco não
 * desenhados no Figma.
 */
function ArchiveBrowserModalListItem({
  fileName,
  meta,
  selected = false,
  className,
  onClick,
  onKeyDown,
  ...props
}: ArchiveBrowserModalListItemProps) {
  const interactive = onClick !== undefined
  return (
    <div
      data-slot="archive-browser-modal-list-item"
      data-selected={selected || undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? selected : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (interactive && event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault()
          event.currentTarget.click()
        }
      }}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-1.5 transition-[background-color,opacity] hover:bg-[rgba(191,199,210,0.16)] dark:hover:bg-[rgba(168,176,189,0.22)]",
        interactive && "cursor-pointer active:opacity-70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50",
        selected && "bg-[rgba(191,199,210,0.1)] dark:bg-[rgba(168,176,189,0.15)]",
        className
      )}
      {...props}
    >
      <ArchiveItemGlyph aria-hidden="true" className="h-[41px] w-[36.68px] shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5 overflow-hidden">
        <p className="w-full truncate text-base tracking-[0.0192px] text-zinc-950 dark:text-zinc-100">{fileName}</p>
        <p className="w-full truncate text-xs leading-4 tracking-[0.2px] text-neutral-text-tertiary dark:text-zinc-400">{meta}</p>
      </div>
    </div>
  )
}

export { ArchiveBrowserModalListItem }
