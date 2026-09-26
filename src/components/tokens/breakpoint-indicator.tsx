import { cn } from "@/lib/utils"

/**
 * Mostra a faixa de breakpoint ativa AO VIVO, usando as próprias classes
 * `tablet:` e `desktop:` do design system. Se a faixa trocar ao redimensionar
 * o viewport, os breakpoints estão funcionando. Usado em Tokens/Responsividade.
 */
function BreakpointIndicator({ className }: { className?: string }) {
  const pill = "rounded-full px-3 py-1 text-sm font-semibold"
  return (
    <div
      data-slot="breakpoint-indicator"
      className={cn("flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900", className)}
    >
      <span className="text-sm text-zinc-600 dark:text-zinc-300">Faixa ativa agora:</span>
      <span className={cn(pill, "bg-brand-teal-action text-brand-teal-foreground tablet:hidden")}>Mobile · &lt; 720</span>
      <span className={cn(pill, "hidden bg-brand-teal-action text-brand-teal-foreground tablet:inline desktop:hidden")}>
        Tablet · 720–1199
      </span>
      <span className={cn(pill, "hidden bg-brand-teal-action text-brand-teal-foreground desktop:inline")}>Desktop · ≥ 1200</span>
      <span className="text-sm text-zinc-600 dark:text-zinc-300">
        Ponteiro: <span className="font-semibold touch:hidden">mouse</span>
        <span className="hidden font-semibold touch:inline">toque (alvos de 44px)</span>
      </span>
    </div>
  )
}

export { BreakpointIndicator }
