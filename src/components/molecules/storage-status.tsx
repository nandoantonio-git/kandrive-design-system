import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { StorageBar, StorageBarExpanded } from "@/components/molecules/storage-bar"
import { FileTypeLabel, ScopeTypeLabel } from "@/components/atoms/type-label"

export type StorageScope = "global" | "quick-access" | "long-term"

export interface StorageStatusProps extends React.ComponentProps<"div"> {
  /** `Style=Sidebar` (compacto, painel embutido) ou `Style=Expanded` (página cheia). */
  variant?: "sidebar" | "expanded"
  /** `StorageType` — só relevante em `variant="expanded"` (Figma-confirmado, 3 painéis). */
  scope?: StorageScope
  onScopeChange?: (scope: StorageScope) => void
  usedAmount: string
  totalAmount: string
  /** Percentual usado do escopo ativo, 0–100 — controla a(s) barra(s). */
  percent: number
  /** Segmentos por tipo de arquivo — só usados em `scope="global"` (`StorageBarExpanded`). */
  fileTypeSegments?: { kind: "image" | "document" | "video" | "other"; value: number }[]
  /** Legenda "X em uso" (ponto teal) — só em `scope="quick-access"`/`"long-term"` (Figma-confirmado, nós `1421:18378`/`1421:18394`, releitura 2026-08-12). */
  usedLabel?: string
  freeLabel?: string
  onManageSpace?: () => void
  onBuySpace?: () => void
  /**
   * Figma `Tier=Alert` (`1765:62468`, V0.2.1), usado em `Storage/LimitReached`:
   * o valor usado em `Brand/Feedback/Danger/Default`, o aviso de limite abaixo
   * dos botões e a barra cheia em `Brand/Feedback/Danger/Surface`. Só no
   * escopo global. ⚠️ No componente do Figma, o aviso usa `Danger/Subtle`
   * (35%, ilegível); a tela usa o vermelho cheio, que é o que o código segue.
   */
  limitReached?: boolean
}

const SCOPE_LABEL: Record<StorageScope, string> = {
  global: "Global",
  "quick-access": "Acesso Rápido",
  "long-term": "Longo Prazo",
}

/**
 * molecule/StorageStatus (`1421:18354`) — Figma-confirmado: "Widget de
 * status de armazenamento — mostra totais por tier. Usado no Sidebar.
 * Variantes: Default/NearLimit/LimitReached/Empty." (os 4 últimos nomes de
 * variante citados na descrição não têm symbol formal confirmado — só
 * `Style=Sidebar|Expanded` × `StorageType=Global|Corrente|Longo Prazo`
 * existem de fato no component set, ver `get_metadata`; tratado como
 * descrição desatualizada do próprio Figma, não implementado como enum
 * extra, Regra 9).
 *
 * `Style=Expanded, StorageType=Global` — Figma-confirmado: "componente que
 * possibilita o usuário visualizar espaço utilizado globalmente... há
 * também dois botões: liberar espaço- abre um modal para gerir arquivos
 * grandes ou em duplicidade; comprar espaço- abre página de pagamento."
 * Botão "Liberar Espaço" usa o termo aprovado pela Regra 5 neste contexto
 * (página de Armazenamento) e abre `organism/cleanSpaceStorage`
 * (`1439:16908`, mesmo modal referenciado na descrição).
 *
 * 🔧 **Achado corrigido em 2026-08-12 (3ª auditoria de ponto-fixo, US-026):**
 * `get_design_context` nos nós `1421:18378` (`StorageType=Corrente`) e
 * `1421:18394` (`StorageType=Longo Prazo`) confirma uma legenda de 2 itens
 * abaixo da barra — "XX em uso" (ponto `brand-teal`, mesmo asset do ponto
 * "Image" do painel `Global`) + "XX Livre" (ponto neutro) — que a
 * implementação anterior omitia por completo (só renderizava `freeLabel`).
 * Adicionada como prop `usedLabel`, condicionada a `scope !== "global"`.
 */
function StorageStatus({
  variant = "expanded",
  scope = "global",
  onScopeChange,
  usedAmount,
  totalAmount,
  percent,
  fileTypeSegments = [],
  usedLabel,
  freeLabel,
  onManageSpace,
  onBuySpace,
  limitReached = false,
  className,
  ...props
}: StorageStatusProps) {
  const alert = limitReached && scope === "global"
  const clamped = Math.min(100, Math.max(0, percent))

  if (variant === "sidebar") {
    return (
      <div
        data-slot="storage-status"
        data-variant="sidebar"
        className={cn("flex w-full max-w-xs flex-col items-start gap-1", className)}
        {...props}
      >
        <span className="w-fit rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[0.5rem] text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
          {SCOPE_LABEL["long-term"]}
        </span>
        <StorageBar tier="long-term" value={clamped} className="max-w-none" />
        <span className="text-[0.625rem] text-black dark:text-zinc-100">{usedAmount}</span>
      </div>
    )
  }

  return (
    <div
      data-slot="storage-status"
      data-variant="expanded"
      data-scope={scope}
      data-limit-reached={alert || undefined}
      className={cn(
        "flex w-[1036px] max-w-full flex-col items-start gap-1 rounded-xl border border-zinc-300 dark:border-zinc-700 px-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 py-3">
        <ScopeTypeLabel
          kind="global"
          label={SCOPE_LABEL.global}
          active={scope === "global"}
          onClick={() => onScopeChange?.("global")}
        />
        <ScopeTypeLabel
          kind="quick-access"
          label={SCOPE_LABEL["quick-access"]}
          active={scope === "quick-access"}
          onClick={() => onScopeChange?.("quick-access")}
        />
        <ScopeTypeLabel
          kind="long-term"
          label={SCOPE_LABEL["long-term"]}
          active={scope === "long-term"}
          onClick={() => onScopeChange?.("long-term")}
        />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-2 pr-2 desktop:items-center">
        <span className={cn("shrink-0 whitespace-nowrap text-[1.5625rem] font-medium", alert ? "text-destructive" : "text-zinc-950 dark:text-zinc-100")}>Armazenamento usado:</span>
        <span className={cn("shrink-0 whitespace-nowrap text-[1.5625rem] font-medium", alert ? "text-destructive" : "text-zinc-950 dark:text-zinc-100")}>{usedAmount}</span>
        <span className={cn("shrink-0 whitespace-nowrap text-xl", alert ? "text-destructive" : "text-zinc-950 dark:text-zinc-100")}>de {totalAmount}</span>
        <span className="shrink-0 whitespace-nowrap text-[0.625rem] font-bold text-neutral-text-tertiary dark:text-zinc-400">(AC+AL)</span>
      </div>

      <div className="flex items-center gap-2 py-2">
        {scope === "global" ? (
          <Button variant="outline" onClick={onManageSpace} className="h-auto px-4 py-1 text-[0.625rem]">
            Liberar Espaço
          </Button>
        ) : null}
        <Button onClick={onBuySpace} className="h-auto px-4 py-1 text-[0.625rem]">
          Comprar Espaço
        </Button>
      </div>

      {alert ? (
        <p role="alert" className="text-base leading-5 text-destructive">
          Seu limite de {totalAmount} foi totalmente atingido. O upload de novos arquivos e sincronização automática foram suspensos.
        </p>
      ) : null}

      {alert ? (
        <div
          role="progressbar"
          aria-label="Armazenamento usado"
          aria-valuenow={100}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1 w-full rounded-full bg-destructive-surface"
        />
      ) : scope === "global" ? (
        // Família de cor por tipo de arquivo — não é a segmentação real de tier
        // (Regra 6, diretório do arquivo), é só reuso da paleta teal/rosa do
        // `StorageBarExpanded` pra bater com o ponto de cor de cada
        // `FileTypeLabel` na legenda logo abaixo (Figma-confirmado via
        // `atom/badge/TypeLabel` em `1421:18687`: image/document = teal,
        // video/other = rosa). Corrigido em 2026-08-12 (Regra 11, US-026) —
        // a versão anterior invertia essa direção (image/document caíam em
        // "quick-access"/rosa), fazendo a barra divergir da própria legenda.
        <StorageBarExpanded className="max-w-none" segments={fileTypeSegments.map((segment) => ({
          tier: segment.kind === "image" || segment.kind === "document" ? "long-term" : "quick-access",
          value: segment.value,
        }))} />
      ) : scope === "quick-access" ? (
        <div
          role="progressbar"
          aria-label="Acesso rápido usado"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1 w-full overflow-hidden rounded-full bg-zinc-500/20 dark:bg-zinc-400/20"
        >
          <div className="h-full rounded-full bg-brand-pink-light transition-[width]" style={{ width: `${clamped}%` }} />
        </div>
      ) : (
        <StorageBar tier="long-term" value={clamped} className="max-w-none" />
      )}

      <div className="flex items-center gap-2 py-1">
        {scope === "global"
          ? fileTypeSegments.map((segment) => <FileTypeLabel key={segment.kind} kind={segment.kind} className="p-0" />)
          : null}
        {scope !== "global" && usedLabel ? (
          <span className="flex items-center gap-1.5 text-[0.625rem] text-brand-secondary-light">
            <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-brand-teal-action" />
            {usedLabel}
          </span>
        ) : null}
        {freeLabel ? (
          <span className="flex items-center gap-1.5 text-[0.625rem] text-brand-secondary-light">
            <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            {freeLabel}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export { StorageStatus }
