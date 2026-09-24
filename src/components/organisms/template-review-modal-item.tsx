import * as React from "react"
import { AlertTriangle, AlertCircle, CheckCircle2, ChevronDown, ChevronRight, Folder, File, Lightbulb, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { PushButton } from "@/components/atoms/push-button"

export type ReviewSeverity = "duplicado" | "incongruente" | "ok"

export interface ReviewChildFile {
  name: string
  meta: string
  onDelete?: () => void
}

export interface ReviewItem {
  name: string
  itemsLabel: string
  severity: ReviewSeverity
  suggestedPath: string
  /** Arquivos filhos revelados ao expandir a pasta (Figma-confirmado: `Children → Child 1`). */
  children?: ReviewChildFile[]
  /**
   * Rótulo da linha de caminho sugerido. Figma-confirmado: varia por item —
   * o 1º item do nó (`Duplicado`) usa "Taxonomia Sugerida:", os demais
   * ("Incongruente"/"OK") usam "Template Sugerido:". Não confirmado como
   * regra sistêmica ligada à severidade (apenas 3 exemplos no nó) — exposto
   * como prop por item em vez de inferido, default "Template Sugerido:".
   */
  suggestedPathLabel?: string
  onRename?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export interface TemplateReviewModalItemProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  item: ReviewItem
  isExpanded: boolean
  onToggleExpand: () => void
  /**
   * Figma `Device` do `TemplateReviewModal`. Mobile: card `Neutral/Surface/Elevated`,
   * nome e selo na 1ª linha, Renomear/Editar abaixo do selo, caminho quebrando linha.
   */
  device?: "desktop" | "mobile"
}

const SEVERITY_META: Record<ReviewSeverity, { label: string; icon: typeof AlertTriangle; className: string }> = {
  duplicado: { label: "Duplicado", icon: AlertTriangle, className: "bg-[var(--color-feedback-warning-subtle,#f59e0b33)] text-[var(--color-feedback-warning,#c38418)] dark:bg-[#f59e0b4d] dark:text-[#fbbf24]" },
  incongruente: { label: "Incongruente", icon: AlertCircle, className: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" },
  ok: { label: "OK", icon: CheckCircle2, className: "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" },
}

/**
 * organism/Dialog/TemplateReviewModal/Item (`1554:21151`) — Figma-confirmado:
 * linha da árvore de revisão de `template/Dialog/TemplateReviewModal`
 * (`1431:20397`), extraída pelo usuário como symbol próprio em 2026-08-20
 * (antes só existia inline dentro do modal, via `.map()`). Badge de
 * severidade (Duplicado/Incongruente/OK) + ações "Renomear"/"Editar" (texto
 * simples) / "Excluir" (`PushButton variant="neutral"`, texto em
 * `--brand-feedback-danger-default`), ícone de pasta, chevron de
 * expandir/colapsar, linha de arquivo filho quando expandido. Conteúdo
 * idêntico ao já verificado em `template/Dialog/TemplateReviewModal` —
 * reconciliado via `get_metadata` (estrutura bate 100%), sem
 * `get_design_context` extra por não ter sido encontrada nenhuma diferença
 * visual/textual (Regra 9).
 *
 * Extraída de `template/Dialog/TemplateReviewModal` (Regra 10 — o template
 * agora compõe este organism em vez de markup duplicado inline); o estado
 * de expansão continua controlado pelo template pai (`items.map`), repassado
 * via `isExpanded`/`onToggleExpand`.
 *
 * 🔧 **Corrigido em 2026-08-21** (achado do usuário: aplicação de glass
 * revisada). A reconciliação inicial de 2026-08-20 confiou só em
 * `get_metadata` (estrutura) pra este symbol novo, sem confirmar estilo —
 * `get_design_context` fresco no nó confirma `bg-effect-glass-white-50`
 * (não `-70/50`, composição de opacidades diferente) e uma borda quase
 * invisível `rgba(107,107,104,0.05)` (não `border-zinc-100`, bem mais
 * opaca/visível). Ambos corrigidos.
 *
 * 🧩 Inferido (Regra 9): `--color-feedback-warning`/`-subtle` não têm
 * definição em `.dark` (mesmo gap documentado em `molecule/callout`) — par
 * `dark:` aplicado direto no hex de fallback, mesmos valores usados lá
 * (`#f59e0b4d`/`#fbbf24`) por consistência. Borda quase invisível
 * `rgba(107,107,104,0.05)` espelhada pra `rgba(255,255,255,0.08)` (mesma
 * lógica do `--effect-glass-dark-20`: tint escuro sobre superfície clara
 * vira tint claro sobre superfície escura).
 */
function TemplateReviewModalItem({ item, isExpanded, onToggleExpand, device = "desktop", className, ...props }: TemplateReviewModalItemProps) {
  const mobile = device === "mobile"
  const meta = SEVERITY_META[item.severity]
  const SeverityIcon = meta.icon
  const hasChildren = !!item.children?.length
  const pathSegments = item.suggestedPath.split(" / ")
  return (
    <div
      data-slot="template-review-modal-item"
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-[rgba(107,107,104,0.05)] dark:border-[rgba(255,255,255,0.08)] p-3",
        mobile ? "bg-neutral-surface-elevated" : "bg-effect-glass-white-50",
        className
      )}
      {...props}
    >
      <div className={cn("flex items-start justify-between", mobile && "grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1")}>
        <div className={cn("flex items-center gap-2", mobile && "row-span-2 min-w-0 self-start")}>
          <button
            type="button"
            aria-label={isExpanded ? "Colapsar" : "Expandir"}
            aria-expanded={isExpanded}
            disabled={!hasChildren}
            onClick={onToggleExpand}
            className="flex size-6 shrink-0 items-center justify-center text-zinc-500 disabled:opacity-30 dark:text-zinc-400"
          >
            {isExpanded ? (
              <ChevronDown aria-hidden="true" className="size-4" />
            ) : (
              <ChevronRight aria-hidden="true" className="size-4" />
            )}
          </button>
          <Folder aria-hidden="true" className="size-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
          <div className={cn("flex flex-col gap-1", mobile && "min-w-0")}>
            <span className={cn(mobile ? "truncate text-base text-neutral-text-primary" : "text-sm text-zinc-900 dark:text-zinc-100")}>{item.name}</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-300">{item.itemsLabel}</span>
          </div>
        </div>
        <div className={cn("flex items-center gap-3", mobile && "contents")}>
          <span className={cn("flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium", mobile && "justify-self-end text-sm", meta.className)}>
            <SeverityIcon aria-hidden="true" className="size-3" />
            {meta.label}
          </span>
          <span className={cn("contents", mobile && "flex items-center justify-end gap-1")}>
          <button
            type="button"
            onClick={item.onRename}
            className="rounded-sm text-sm font-medium text-zinc-500 transition-all hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 motion-safe:active:scale-[0.98] dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            Renomear
          </button>
          <button
            type="button"
            onClick={item.onEdit}
            className="rounded-sm text-sm font-medium text-brand-teal transition-all hover:text-brand-teal/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 motion-safe:active:scale-[0.98]"
          >
            Editar
          </button>
          </span>
        </div>
      </div>
      <div className={cn("flex items-center gap-2 rounded border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300", mobile && "flex-wrap gap-y-1")}>
        <Lightbulb aria-hidden="true" className="size-3.5 shrink-0" />
        <span>{item.suggestedPathLabel ?? "Template Sugerido:"}</span>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={segment}>
            {index > 0 ? <ChevronRight aria-hidden="true" className="size-3 text-zinc-400 dark:text-zinc-500" /> : null}
            <span className="text-zinc-900 dark:text-zinc-100">{segment}</span>
          </React.Fragment>
        ))}
      </div>
      {hasChildren && isExpanded ? (
        <ul className={cn("flex flex-col gap-1", mobile ? "border-t border-neutral-border-subtle pt-2 pl-6" : "pl-8")}>
          {item.children!.map((child) => (
            <li key={child.name} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <File aria-hidden="true" className="size-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
                <div className="flex min-w-0 flex-col">
                  <span className={cn("truncate", mobile ? "text-base text-neutral-text-primary" : "text-sm text-zinc-900 dark:text-zinc-100")}>{child.name}</span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-300">{child.meta}</span>
                </div>
              </div>
              <PushButton
                variant="neutral"
                isDestructive
                icon={Trash2}
                onClick={child.onDelete}
                className="h-8 gap-2 rounded-md bg-effect-glass-white-70 px-3 text-xs"
              >
                Excluir
              </PushButton>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { TemplateReviewModalItem }
