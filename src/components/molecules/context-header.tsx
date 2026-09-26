import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/atoms/icon"
import ClearGlyph from "@/assets/icons/ClearButtonGlyph.svg?react"
import DeleteGlyph from "@/assets/icons/DeleteButtonGlyph.svg?react"

export interface ContextHeaderProps extends React.ComponentProps<"div"> {
  /** `"X itens selecionado"` no Figma — literal, com placeholder textual (não interpolado). */
  itemsSelected?: string
  /** Eixo `state` Figma-confirmado. */
  state?: "expanded" | "collapsed"
  onClear?: () => void
  onShare?: () => void
  onDownload?: () => void
  onMove?: () => void
  onDelete?: () => void
  onMoreOptions?: () => void
  /**
   * Figma `Layout` (V0.2.1): default (contador + ações) · minimal (só o botão
   * de limpar e o contador, 40px de altura, largura fluida). O Minimal existe
   * no Figma só com `Device=Mobile` (`1729:24977`), na seleção do Long-term.
   * 🧩 O Layout Compact do Figma ainda não tem uso no código.
   */
  layout?: "default" | "minimal"
}

/**
 * molecule/context-header (`1421:19589`, Figma-confirmado) — "header de
 * contexto para dar feedback de quantos itens estão sendo selecionados".
 * Botão limpar seleção (glifo `clear`) + contador + divisor + ações
 * (`atom/Icon/ShareFile`, baixar, `atom/Icon/FileMoveRight`,
 * `atom/DeleteButton`, `atom/Icon/Settings2`).
 *
 * `state="collapsed"` (Figma-confirmado) zera altura/opacidade do
 * container inteiro — 🧩 inferido como estado de saída/recolhimento
 * (Regra 8), não uma variante visível em repouso; conteúdo interno omitido
 * enquanto colapsado (mesmo padrão de `molecule/popover/Notification`).
 *
 * Usa o material **Liquid Glass** — ver spec completa em `Tokens/Materials`
 * (Regra 10), aproximado por `bg-effect-glass-white-36` + sombra
 * `Effect/Shadow/SM` (`0px 2px 16px rgba(9,9,11,0.08)`, Figma-confirmado).
 *
 * ⚠️ CONFLICT (Regra 4, ver `docs/conflicts.md`): o rótulo do contador usa
 * `Manrope:Medium` no Figma — Figtree é a tipografia travada do design
 * system inteiro. Implementado com Figtree (`font-sans`), não Manrope.
 *
 * Cor de texto/ícones (`#001f27`, sem token semântico Figma) aproximada por
 * `zinc-800` (Regra 3, fallback de rampa Zinc para neutros sem
 * correspondência exata).
 *
 * 🧩 **Padronizado em 2026-09-25 por julgamento, sem Figma (achado do
 * usuário: "escalas dos ícones")**: os 6 ícones do toolbar variavam de
 * 12px a 24px sem justificativa documentada (`ShareFile`/`FileMoveRight`
 * em 24px, `DeleteGlyph` em 12px, os outros 3 já em 16px). O node do
 * Figma citado acima não resolveu mais na releitura — decisão humana foi
 * padronizar todos em 16px (`size-4`, o valor já majoritário) em vez de
 * bloquear a correção numa nova busca de node. Se o Figma real usar
 * tamanhos diferentes por ícone, reabrir com o link atualizado.
 */
function ContextHeader({
  itemsSelected = "X itens selecionado",
  state = "expanded",
  onClear,
  onShare,
  onDownload,
  onMove,
  onDelete,
  onMoreOptions,
  layout = "default",
  className,
  ...props
}: ContextHeaderProps) {
  const isCollapsed = state === "collapsed"

  if (layout === "minimal") {
    return (
      <div
        data-slot="context-header"
        data-state={state}
        data-layout="minimal"
        role="status"
        className={cn(
          "relative flex w-full items-center overflow-clip rounded-3xl drop-shadow-[0px_2px_16px_rgba(9,9,11,0.08)] transition-[height,opacity] duration-200",
          isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100",
          className
        )}
        {...props}
      >
        <div aria-hidden="true" className="absolute inset-0 rounded-3xl glass-edge glass-shadow-sm bg-effect-glass-white-36" />
        <div className="relative flex w-full items-center gap-2 px-4">
          <button
            type="button"
            aria-label="Limpar seleção"
            onClick={onClear}
            className="touch-target inline-flex size-4 shrink-0 items-center justify-center text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
          >
            <ClearGlyph aria-hidden="true" className="size-4" />
          </button>
          <span className="truncate text-sm font-medium tracking-[0.14px] text-zinc-800 dark:text-zinc-100">{itemsSelected}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="context-header"
      data-state={state}
      className={cn(
        "relative flex w-[403px] flex-col items-start overflow-clip rounded-3xl drop-shadow-[0px_2px_16px_rgba(9,9,11,0.08)] transition-[height,opacity] duration-200",
        isCollapsed ? "h-0 opacity-0" : "h-[52px] opacity-100",
        className
      )}
      {...props}
    >
      <div aria-hidden="true" className="absolute inset-0 rounded-3xl glass-edge glass-shadow-sm bg-effect-glass-white-36" />
      <div className="relative flex h-[52px] w-full shrink-0 items-center gap-5 py-3 pr-6 pl-[21px]">
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label="Limpar seleção"
                onClick={onClear}
                className="inline-flex size-4 shrink-0 items-center justify-center text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
              >
                <ClearGlyph aria-hidden="true" className="size-4" />
              </button>
              <span className="w-[9.0625rem] text-sm font-medium tracking-[0.14px] text-zinc-800 dark:text-zinc-100">
                {itemsSelected}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-6">
              <div aria-hidden="true" className="h-6 w-px bg-zinc-800/20 dark:bg-zinc-100/20" />
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Compartilhar"
                  onClick={onShare}
                  className="inline-flex items-center justify-center py-1.5 text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
                >
                  <Icon name="ShareFile" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Baixar"
                  onClick={onDownload}
                  className="inline-flex items-center justify-center py-1.5 text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
                >
                  <Icon name="Download" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Mover"
                  onClick={onMove}
                  className="inline-flex items-center justify-center text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
                >
                  <Icon name="FileMoveRight" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Excluir"
                  onClick={onDelete}
                  className="inline-flex size-4 shrink-0 items-center justify-center text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
                >
                  <DeleteGlyph aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Mais opções"
                  onClick={onMoreOptions}
                  className="inline-flex items-center justify-center py-1.5 text-zinc-800 transition-colors dark:text-zinc-100 hover:text-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50 active:opacity-60"
                >
                  <Icon name="Settings2" className="size-4" />
                </button>
              </div>
            </div>
      </div>
    </div>
  )
}

export { ContextHeader }
