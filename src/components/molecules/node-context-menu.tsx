import * as React from "react"
import { X, Info } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { FreeModeButton } from "@/components/atoms/free-mode-button"
import { NodeContextMenuItem } from "@/components/molecules/node-context-menu-item"
import NodeContextMenuFilter from "@/assets/icons/NodeContextMenuFilter.svg?react"

export type NodeContextMenuLogicalOperator = "and" | "or"

export interface NodeContextMenuRule {
  attribute: string
  operation: string
  value: string
}

const ATTRIBUTE_OPTIONS = ["Tamanho", "Data", "Tipo"] as const
const OPERATION_OPTIONS = ["> Maior", "< Menor", ">= Maior igual", "<= Menor igual", "=Igual", "!=Diferente"] as const
const DEFAULT_RULES: readonly NodeContextMenuRule[] = [{ attribute: "Tamanho", operation: "Maior que", value: "1.0 GB" }]

export interface NodeContextMenuProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  /**
   * Eixo `state` do Figma: `FloatingInfoPanel` (linha de condição preenchida, sem erro) \| `State3` (linha nova em `wrongInput` + aviso).
   * Quando informado, fixa o estado (stories de estado); quando omitido, o erro aparece ao tentar adicionar uma regra incompleta.
   */
  state?: "floating-info-panel" | "state-3"
  /** Operador E/OU — controlado; quando omitido, o componente alterna sozinho. */
  logicalOperator?: NodeContextMenuLogicalOperator
  defaultLogicalOperator?: NodeContextMenuLogicalOperator
  onLogicalOperatorChange?: (operator: NodeContextMenuLogicalOperator) => void
  /** Condições preenchidas iniciais (padrão: "Tamanho · Maior que · 1.0 GB", como no Figma). */
  defaultRules?: readonly NodeContextMenuRule[]
  onRemoveCondition?: (index: number) => void
  onAddRule?: (rule: NodeContextMenuRule) => void
  onDiscard?: () => void
  onSave?: (rules: NodeContextMenuRule[], operator: NodeContextMenuLogicalOperator) => void
}

/**
 * molecule/nodoContextMenu (`1383:15617`, Figma-confirmado) — "menu
 * contextual do nodo selecionado presente no canva/tela de modo livre de
 * templates. possibilita criar filtro e operações condicionais." Composto
 * por `celule/nodoContextMenuItem` (pílulas de condição), `atom/buttonAdd`
 * ("+ Adicionar Regra") e `atom/PushButton` (rodapé "Descartar
 * Mudanças"/"Salvar Mudanças", mesmo par de texto já Figma-confirmado em
 * `organism/OrganizeFreeModeCanvas`). Material Liquid Glass de 2 camadas
 * (Regra 10, ver `Tokens/Materials`): "Fill + Shadow" (sombra) + "Glass
 * Effect" (`effect-glass-white-50`, `mix-blend-screen`).
 *
 * `state="state-3"` (Figma-confirmado) mostra uma 2ª linha de condição em
 * `wrongInput` (pílulas com anel vermelho) + aviso "Preencha todas as
 * informações antes de adicionar a nova regra" (texto Figma-confirmado,
 * `Type/Caption/SM` 11px — exceção documentada de piso, Regra 4, microtexto
 * complementar) e um 2º `atom/buttonAdd` extra.
 *
 * 🧩 Inferido (Regra 9 — sem token Figma correspondente): o toggle "E/OU" no
 * Figma usa um hex bruto (`#92ccff`) sem variável semântica — aproximado
 * aqui por `brand-teal` (mesmo tratamento de "selecionado" já usado em
 * `DropdownSelectGroupBy`/`ViewModeToggle`); registrado em
 * `docs/conflicts.md`.
 *
 * 🧩 Inferido (Regra 9): a trilha do toggle E/OU (`border-zinc-800
 * bg-zinc-900`, texto `zinc-400` não selecionado) é chrome escuro fixo
 * (mesmo critério de `NodeContextMenuItem`) — não recebeu pares `dark:`.
 *
 * **Corrigido em 2026-09-25** (achado do usuário: "ausência de droplists"):
 * as pílulas "Atributo"/"Operação" da 1ª linha (condição já preenchida)
 * mostravam o chevron mas não recebiam a prop `options` —
 * `NodeContextMenuItem` só renderiza a lista quando `options` existe, então
 * clicar não abria nada. A 2ª linha (nova condição) já estava correta.
 * Adicionadas as mesmas listas de opções.
 *
 * **Regras em memória (2026-09-28, usuário: "revisar a interação dos
 * filtros e droplists em modo livre")**: sem `state`/`logicalOperator`/
 * `rules`, o painel funciona sozinho. "Adicionar Regra" com a nova linha
 * incompleta mostra o estado `State3` desenhado no Figma (anel vermelho +
 * aviso); completa, a linha vira uma condição preenchida. O ✕ remove a
 * condição, E/OU alterna, "Descartar Mudanças" volta ao início e "Salvar
 * Mudanças" devolve as regras em `onSave`. Não é o editor de nós: nada disso
 * altera o canvas.
 *
 * 🧩 Regra 8: hover, pressed e foco do toggle E/OU e do botão de remover
 * não desenhados no Figma. O campo de texto do valor também é extensão.
 */
function NodeContextMenu({
  state: controlledState,
  logicalOperator: controlledOperator,
  defaultLogicalOperator = "and",
  onLogicalOperatorChange,
  defaultRules = DEFAULT_RULES,
  onRemoveCondition,
  onAddRule,
  onDiscard,
  onSave,
  className,
  ...props
}: NodeContextMenuProps) {
  const [internalOperator, setInternalOperator] = React.useState(defaultLogicalOperator)
  const nextId = React.useRef(0)
  const withIds = (list: readonly NodeContextMenuRule[]) => list.map((rule) => ({ ...rule, id: nextId.current++ }))
  const [rules, setRules] = React.useState(() => withIds(defaultRules))
  const [draft, setDraft] = React.useState<Partial<NodeContextMenuRule>>({})
  const [draftKey, setDraftKey] = React.useState(0)
  const [showError, setShowError] = React.useState(false)

  const logicalOperator = controlledOperator ?? internalOperator
  const isError = controlledState ? controlledState === "state-3" : showError
  const state = controlledState ?? (showError ? "state-3" : "floating-info-panel")

  const setOperator = (next: NodeContextMenuLogicalOperator) => {
    if (controlledOperator === undefined) setInternalOperator(next)
    onLogicalOperatorChange?.(next)
  }

  const updateDraft = (patch: Partial<NodeContextMenuRule>) => {
    setDraft((current) => ({ ...current, ...patch }))
    setShowError(false)
  }

  const resetDraft = () => {
    setDraft({})
    setDraftKey((key) => key + 1)
    setShowError(false)
  }

  const addRule = () => {
    if (!draft.attribute || !draft.operation || !draft.value?.trim()) {
      setShowError(true)
      return
    }
    const rule = { attribute: draft.attribute, operation: draft.operation, value: draft.value.trim() }
    setRules((current) => [...current, { ...rule, id: nextId.current++ }])
    resetDraft()
    onAddRule?.(rule)
  }

  const updateRule = (index: number, patch: Partial<NodeContextMenuRule>) =>
    setRules((current) => current.map((rule, i) => (i === index ? { ...rule, ...patch } : rule)))

  const removeRule = (index: number) => {
    setRules((current) => current.filter((_, i) => i !== index))
    onRemoveCondition?.(index)
  }

  const discard = () => {
    setRules(withIds(defaultRules))
    if (controlledOperator === undefined) setInternalOperator(defaultLogicalOperator)
    resetDraft()
    onDiscard?.()
  }

  const operatorButton = (operator: NodeContextMenuLogicalOperator, label: string) => (
    <button
      type="button"
      aria-pressed={logicalOperator === operator}
      onClick={() => setOperator(operator)}
      className={cn(
        "rounded-sm px-3 py-1 text-xs font-bold transition-[color,background-color,opacity] active:opacity-70",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/60",
        logicalOperator === operator ? "bg-brand-teal-action text-brand-teal-foreground" : "text-zinc-400 hover:text-zinc-200"
      )}
    >
      {label}
    </button>
  )

  return (
    <div
      data-slot="node-context-menu"
      data-state={state}
      className={cn("relative w-[393px] rounded-[2.375rem] shadow-[0_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)]", className)}
      {...props}
    >
      <div aria-hidden="true" className="absolute inset-0 rounded-[2.375rem] glass-edge glass-shadow-sm bg-effect-glass-white-50 mix-blend-screen" />
      <div className="relative flex flex-col gap-3 px-6 py-2.5">
        <div className="flex items-center gap-2">
          <NodeContextMenuFilter aria-hidden="true" className="h-[15.193px] w-[15.111px]" />
          <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Filtro</span>
        </div>

        {rules.map((rule, index) => (
          <div key={rule.id} data-slot="node-context-menu-rule" className="flex items-center gap-2">
            <NodeContextMenuItem label="Atributo" defaultValue={rule.attribute} options={ATTRIBUTE_OPTIONS} onValueChange={(attribute) => updateRule(index, { attribute })} />
            <NodeContextMenuItem label="Operação" defaultValue={rule.operation} options={OPERATION_OPTIONS} onValueChange={(operation) => updateRule(index, { operation })} />
            <NodeContextMenuItem label="Valor..." defaultValue={rule.value} hasChevron={false} editable onValueChange={(value) => updateRule(index, { value })} />
            <button
              type="button"
              aria-label={`Remover condição ${index + 1}`}
              onClick={() => removeRule(index)}
              className="ml-auto rounded-sm text-zinc-400 transition-[color,opacity] hover:text-zinc-600 active:opacity-70 dark:text-zinc-500 dark:hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        ))}

        <div role="group" aria-label="Operador lógico" className="flex items-center gap-1 self-start rounded-md border border-zinc-800 bg-zinc-900 p-0.5">
          {operatorButton("and", "E")}
          {operatorButton("or", "OU")}
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div key={draftKey} data-slot="node-context-menu-draft" className="flex items-center gap-2">
            <NodeContextMenuItem
              label="Atributo"
              error={isError && !draft.attribute}
              options={ATTRIBUTE_OPTIONS}
              onValueChange={(attribute) => updateDraft({ attribute })}
            />
            <NodeContextMenuItem
              label="Operação"
              error={isError && !draft.operation}
              options={OPERATION_OPTIONS}
              onValueChange={(operation) => updateDraft({ operation })}
            />
            <NodeContextMenuItem
              label="Valor..."
              error={isError && !draft.value?.trim()}
              hasChevron={false}
              editable
              onValueChange={(value) => updateDraft({ value })}
            />
          </div>
          {isError ? (
            <p role="alert" className="flex items-center gap-1 text-xs text-destructive">
              <Info aria-hidden="true" className="size-3 shrink-0" />
              Preencha todas as informações antes de adicionar a nova regra
            </p>
          ) : null}
        </div>

        <FreeModeButton label="Adicionar regra" onClick={addRule} className="w-full" />

        <div className="flex items-center justify-end gap-4 border-t border-zinc-300 dark:border-zinc-700 py-3">
          <Button variant="outline" className="h-8 px-4 text-xs" onClick={discard}>
            Descartar mudanças
          </Button>
          <Button className="h-8 px-4 text-xs" onClick={() => onSave?.(rules.map(({ id: _id, ...rule }) => rule), logicalOperator)}>
            Salvar mudanças
          </Button>
        </div>
      </div>
    </div>
  )
}

export { NodeContextMenu }
