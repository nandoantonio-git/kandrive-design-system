import * as React from "react"

import { Button } from "@/components/atoms/button"
import { cn } from "@/lib/utils"

type DialogType = "destructive" | "info"
type DialogDevice = "desktop" | "mobile"

export interface DialogProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Figma `Type`: `destructive` confirma uma ação irreversível (Cancelar + ação); `info` é um aviso com uma ação só. */
  type?: DialogType
  /** Figma `Device`: largura de 480px (desktop) ou 342px (mobile). O `info` só existe em desktop no Figma (440px). */
  device?: DialogDevice
  title?: React.ReactNode
  description?: React.ReactNode
  /** Rótulo da ação principal: a destrutiva em `destructive`, a única em `info`. */
  confirmLabel?: string
  /** Rótulo de Cancelar, só em `destructive`. */
  cancelLabel?: string
  onConfirm?: () => void
  /** Cancelar ou Esc. Em `info`, o Esc chama `onConfirm`, porque a única ação é fechar. */
  onCancel?: () => void
}

const DEFAULT_TEXT: Record<DialogType, { title: string; description: string; confirmLabel: string }> = {
  destructive: {
    title: "Excluir conta?",
    description:
      "Excluir sua conta é permanente e não pode ser desfeito. Isso também remove os arquivos guardados no longo prazo, e eles não poderão ser recuperados depois.",
    confirmLabel: "Excluir conta",
  },
  info: {
    title: "Falar com o suporte",
    description: "Este canal ainda não está disponível. Enquanto isso, as respostas mais comuns estão nesta página.",
    confirmLabel: "Entendi",
  },
}

/**
 * organism/Dialog (`3334:37789`) — Figma-confirmado, 3 variantes:
 * `Type=Destructive, Device=Desktop|Mobile` (Excluir conta) e
 * `Type=Info, Device=Desktop` (Falar com o suporte, mock). Nasceu das
 * sobreposições do protótipo da 📐Pages e foi integrado à ✨Design System
 * em 2026-09-29.
 *
 * Painel: `Surface/Card`, raio 20, padding 28, espaço 16, sombra
 * 0 12 32 preto 18%. Título em `Text/Primary` (28px no destrutivo,
 * 26px no info, Figma literal), descrição 16px em `Text/Secondary`,
 * ações alinhadas à direita com 12px entre elas (`atom/Button` Outline +
 * Destructive, ou Primary sozinho).
 *
 * É só o painel, como no Figma: a tela escurecida por trás e o
 * posicionamento ficam com quem abre o diálogo.
 *
 * 🧩 Regra 8 (não desenhado no Figma): `role="alertdialog"` no destrutivo e
 * `role="dialog"` no info, com título e descrição ligados por
 * `aria-labelledby`/`aria-describedby`; foco inicial no Cancelar (a opção
 * segura) ou na ação única; Esc fecha.
 */
function Dialog({
  type = "destructive",
  device = "desktop",
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  className,
  onKeyDown,
  ...props
}: DialogProps) {
  const id = React.useId()
  const safeActionRef = React.useRef<HTMLButtonElement>(null)
  const text = DEFAULT_TEXT[type]
  const isDestructive = type === "destructive"

  React.useEffect(() => {
    safeActionRef.current?.focus()
  }, [])

  return (
    <div
      data-slot="dialog"
      data-type={type}
      role={isDestructive ? "alertdialog" : "dialog"}
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.key === "Escape") {
          event.stopPropagation()
          if (isDestructive) onCancel?.()
          else onConfirm?.()
        }
      }}
      className={cn(
        "flex flex-col gap-4 rounded-[20px] bg-neutral-surface-card p-7 shadow-[0_12px_32px_rgba(0,0,0,0.18)]",
        isDestructive ? (device === "mobile" ? "w-[342px]" : "w-[480px]") : "w-[440px]",
        "max-w-full",
        className
      )}
      {...props}
    >
      <h2
        id={`${id}-title`}
        className={cn(
          "font-bold text-neutral-text-primary",
          isDestructive ? "text-[1.75rem] leading-[1.2]" : "text-[1.625rem] leading-[1.3]"
        )}
      >
        {title ?? text.title}
      </h2>
      <p id={`${id}-description`} className="text-base leading-[1.3] text-neutral-text-secondary">
        {description ?? text.description}
      </p>
      <div className="flex justify-end gap-3">
        {isDestructive ? (
          <>
            <Button ref={safeActionRef} variant="outline" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              {confirmLabel ?? text.confirmLabel}
            </Button>
          </>
        ) : (
          <Button ref={safeActionRef} onClick={onConfirm}>
            {confirmLabel ?? text.confirmLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export { Dialog }
