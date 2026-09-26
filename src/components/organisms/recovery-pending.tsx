import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import kanPeeking from "@/assets/illustrations/recovery-pending-kan.svg"

export interface RecoveryPendingProps extends React.ComponentProps<"div"> {
  fileName: string
  /** Tempo estimado de espera, em destaque no texto. Ex.: "até 8h". */
  eta?: string
  /** Parte do anel preenchida, de 0 a 1. O Figma mostra 3/4. */
  progress?: number
  onBack?: () => void
}

/**
 * Estado "Recuperação pendente" de um arquivo guardado no longo prazo
 * (`LongTermStorage/RecoveryPending/Mobile`, `1765:61487`, KanDrive V0.2.1).
 * 🧩 No Figma é o conteúdo de uma tela, não um componente: extraído para ter
 * story própria. É um estado, então vale em todas as larguras.
 *
 * - Ilustração: círculo de 160px `Neutral/Surface/Background/Alt` com borda
 *   `Brand/Primary/Light` e sombra de 10px a 10%, anel `Brand/Primary/Default`
 *   (raio interno de 82%) e o Kan espiando da bolsa.
 * - 🧩 O Kan foi redesenhado em SVG a partir dos traços do `atom/MobileSuccess`:
 *   no Figma é uma imagem raster ("Prancheta 14").
 * - Nome do arquivo: 10px Bold `Brand/Primary/Dark` (microtexto), que fica
 *   teal claro no Dark. Corrigido em 2026-09-24 (F14): antes usava
 *   `Brand/Primary/Mid`, que é a cor do logo e não muda no Dark. Título: 25px
 *   Medium `Neutral/Text/Primary`.
 * - Texto e aviso em 16px (Regra 4). ⚠️ No Figma têm 13px e 11px.
 * - Aviso: fundo `Brand/Primary/Disabled`, texto `Brand/Primary/Dark`, raio 8.
 * - Ação: `atom/Button` Secondary LG Pill em largura total.
 */
function RecoveryPending({ fileName, eta = "até 8h", progress = 0.75, onBack, className, ...props }: RecoveryPendingProps) {
  const sweep = Math.min(Math.max(progress, 0), 1) * 360
  return (
    <div data-slot="recovery-pending" className={cn("flex w-full max-w-[400px] flex-col items-center gap-6 text-center", className)} {...props}>
      <div
        role="progressbar"
        aria-label="Recuperação em andamento"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="relative size-40 shrink-0 rounded-full border border-brand-teal-light bg-neutral-surface-background-alt shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(var(--brand-teal-action) 0deg ${sweep}deg, transparent ${sweep}deg)`,
            mask: "radial-gradient(farthest-side, transparent 82%, #000 calc(82% + 0.5px))",
          }}
        />
        <img src={kanPeeking} alt="" aria-hidden="true" className="absolute top-[42px] left-1/2 w-[112px] -translate-x-1/2" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[0.625rem] leading-3 font-bold text-brand-teal-dark">{fileName}</p>
        <h1 className="text-[1.5625rem] leading-[30px] font-medium text-neutral-text-primary">Recuperação pendente</h1>
        <p className="text-base leading-5 text-neutral-text-tertiary">
          Seu arquivo está sendo recuperado do armazenamento de longo prazo. Tempo estimado de espera:{" "}
          <strong className="font-bold text-neutral-text-primary">{eta}</strong>.
        </p>
      </div>
      <p className="w-full rounded-lg bg-brand-primary-disabled px-4 py-2 text-base leading-5 text-brand-teal-dark">
        Enviaremos um e-mail para você assim que o arquivo estiver disponível para download.
      </p>
      <Button variant="secondary" size="lg" shape="pill" onClick={onBack} className="mt-2 w-full">
        Voltar para arquivos
      </Button>
    </div>
  )
}

export { RecoveryPending }
