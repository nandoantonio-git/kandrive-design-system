import * as React from "react"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { CloseButton } from "@/components/atoms/close-button"
import { Button } from "@/components/atoms/button"
import {
  TemplateReviewModalItem,
  type ReviewItem,
  type ReviewSeverity,
  type ReviewChildFile,
} from "@/components/organisms/template-review-modal-item"

export type { ReviewItem, ReviewSeverity, ReviewChildFile }

export interface TemplateReviewModalProps extends React.ComponentProps<"div"> {
  items: ReviewItem[]
  onCancel?: () => void
  onContinue?: () => void
  /**
   * Figma `Device` (V0.2.1): desktop (diálogo com título, rodapé e botões) ·
   * mobile (só a lista em cards, dentro de uma moldura de vidro de 4px, em
   * largura total). No mobile, o título, o aviso e as ações ficam na tela
   * (`Organize/Review/Mobile`): Confirmar e ✕ vêm do `MobileBottomNav`.
   */
  device?: "desktop" | "mobile"
}

/**
 * template/Dialog/TemplateReviewModal (`1431:20397`) — Figma-confirmado:
 * "Utilize para revisar o nome, e a estrutura/hierarquia de organização
 * cria pelo Kandrive para o usuário." Cada item da árvore expõe badge de
 * severidade (Duplicado/Incongruente/OK, Figma-confirmado) + ações
 * "Renomear"/"Editar" (texto simples) / "Excluir" (`Button
 * variant="outline"`, texto em `--brand-feedback-danger-default`). Fundo
 * usa Liquid Glass — ver Tokens/Materials (Regra 10).
 *
 * **🔧 Corrigido em 2026-08-11 (Regra 11, auditoria US-026)**: releitura
 * de `get_design_context` no nó real encontrou 4 elementos Figma-
 * confirmados que a implementação anterior omitia por completo — (1) o
 * ícone de pasta (`Folder`) antes do nome de cada item; (2) o botão
 * chevron de expandir/colapsar (`ChevronDown`/`ChevronRight`) à esquerda
 * do ícone de pasta; (3) a linha de arquivo filho ("Children → Child 1"
 * no Figma, ex.: `Q1_Report_v2.pdf`) revelada quando o primeiro item está
 * expandido, com seu próprio botão "Excluir" (`PushButton variant="neutral"
 * isDestructive`); (4) o ícone `Info` antes do aviso no rodapé. Nenhum
 * desses existia no código antes — corrigidos sem inventar comportamento
 * além do confirmado (o 1º item começa expandido, os demais colapsados,
 * espelhando a composição "Default" do Figma).
 *
 * 🔧 **Reclassificado organism → template em 2026-08-20** (usuário renomeou
 * o node no Figma de `organism/Dialog/TemplateReviewModal` para
 * `template/Dialog/TemplateReviewModal`, mesmo nodeId `1431:20397`) — ver
 * `docs/vault/Design System/Camadas Atômicas.md`. Cada linha da árvore
 * ganhou symbol Figma próprio (`organism/Dialog/TemplateReviewModal/Item`,
 * `1554:21151`) — extraída para `TemplateReviewModalItem` (Regra 10).
 */
function TemplateReviewModal({ items, onCancel, onContinue, device = "desktop", className, ...props }: TemplateReviewModalProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(items.filter((item) => item.children?.length).slice(0, 1).map((item) => item.name))
  )
  const toggleExpanded = (name: string) => {
    setExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }
  if (device === "mobile") {
    return (
      <div
        data-slot="template-review-modal"
        data-device="mobile"
        className={cn("flex w-full flex-col gap-3 rounded-xl p-1 backdrop-blur-sm", className)}
        {...props}
      >
        {items.map((item) => (
          <TemplateReviewModalItem
            key={item.name}
            device="mobile"
            item={item}
            isExpanded={expanded.has(item.name)}
            onToggleExpand={() => toggleExpanded(item.name)}
          />
        ))}
      </div>
    )
  }
  return (
    <div
      data-slot="template-review-modal"
      role="dialog"
      aria-label="Revisar Organização"
      className={cn(
        "flex h-[613px] w-[768px] max-w-none flex-col overflow-hidden rounded-xl glass-edge bg-effect-glass-white-70 shadow-[0px_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0px_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">Revisar Organização</h2>
          <p className="text-base text-zinc-700 dark:text-zinc-300">Revise o template sugerido antes de aplicar as mudanças.</p>
        </div>
        <CloseButton size="md" onClick={onCancel} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto px-6 pb-6">
        {items.map((item) => (
          <TemplateReviewModalItem
            key={item.name}
            item={item}
            isExpanded={expanded.has(item.name)}
            onToggleExpand={() => toggleExpanded(item.name)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
        <p className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
          <Info aria-hidden="true" className="size-3.5 shrink-0" />
          Garanta que sua estrutura de arquivos seja clara e sem duplicidades.
        </p>
        <div className="flex shrink-0 gap-4">
          <Button variant="outline" className="h-8 w-22 px-4 text-xs" onClick={onCancel}>
            Cancelar
          </Button>
          <Button className="h-8 w-22 px-4 text-xs" onClick={onContinue}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}

export { TemplateReviewModal }
