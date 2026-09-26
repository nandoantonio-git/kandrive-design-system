import * as React from "react"

import { cn } from "@/lib/utils"
import { CloseButton } from "@/components/atoms/close-button"
import notificationThumbnail from "@/assets/illustrations/notification-thumbnail.png"

export type PopoverNotificationVariant =
  | "notification"
  | "adition"
  | "entering"
  | "collapsed"
  | "deep-archive"
  | "variant-6"

export interface PopoverNotificationProps extends React.ComponentProps<"div"> {
  /**
   * Eixo `variant` Figma-confirmado (`Notification`\|`Adition`\|`Variant3`\|
   * `collapsed`\|`deeparchive`\|`Variant6`) — sem descrição própria
   * distinguindo o significado de cada um além do texto/altura observados
   * (Regra 9). `entering`/`collapsed` (`Variant3`/`collapsed` no Figma) têm
   * altura/opacidade zeradas — 🧩 inferido como estados de
   * entrada/saída de uma animação de popover (Regra 8), não uma variante
   * visível em repouso.
   */
  variant?: PopoverNotificationVariant
  title?: string
  timestamp?: string
  showImage?: boolean
  onClose?: () => void
}

const TALL_VARIANTS: readonly PopoverNotificationVariant[] = ["adition", "deep-archive"]
const TRANSIENT_VARIANTS: readonly PopoverNotificationVariant[] = ["entering", "collapsed"]

const DEFAULT_TITLE: Record<PopoverNotificationVariant, string> = {
  notification: "Arquivo adicionado",
  adition: "Arquivo adicionado",
  entering: "Arquivo adicionado",
  collapsed: "Arquivo adicionado",
  "deep-archive": "Arquivos guardados com sucesso.",
  "variant-6": "Arquivo adicionado",
}

/**
 * molecule/popover/Notification (`1421:19626`, Figma-confirmado) —
 * "popover para notificar mudanças de estado, exemplo: uma organização
 * criada." `atom/CloseButton` + título + timestamp, com 6 variantes
 * confirmadas no Figma via eixo `variant`.
 *
 * Usa o material **Liquid Glass** — ver spec completa em `Tokens/Materials`
 * (Regra 10), aproximado por `bg-effect-glass-white-36` + sombra
 * `Effect/Shadow/LG` (`0px 8px 40px rgba(0,0,0,0.12)`, Figma-confirmado),
 * mesma simplificação de camada única usada em `molecule/nodoContextMenu`.
 *
 * Consolidado com o antigo `molecule/Notification` (`1439:19748`, `variant`
 * default `"notification"` aqui) — os dois nodes Figma eram estruturalmente
 * idênticos (mesmo `atom/CloseButton` + título + timestamp + material),
 * diferindo só em altura/transiência por variante; mantidos como um único
 * componente de código em vez de 2 cópias quase iguais da mesma marcação.
 * Padding revisado (era `pt-0.5 pr-2 pb-3 pl-3`, assimétrico e apertado no
 * topo/direita) para `p-3` uniforme; a altura por variante virou piso
 * (`min-h-*`) em vez de altura travada, pra não cortar o conteúdo com o
 * padding maior.
 *
 * **Corrigido em 2026-09-25** (pedido do usuário): o timestamp ficava
 * posicionado de forma absoluta dentro da 2ª linha (a do título), abaixo
 * do botão de fechar. Movido pra 1ª linha, ao lado do `CloseButton` —
 * timestamp e fechar agora ficam alinhados no topo, na mesma linha. A
 * imagem (`showImage`) migrou pra 2ª linha, ao lado do título.
 */
function PopoverNotification({
  variant = "notification",
  title,
  timestamp = "now",
  showImage = false,
  onClose,
  className,
  ...props
}: PopoverNotificationProps) {
  const isTransient = TRANSIENT_VARIANTS.includes(variant)
  const isTall = TALL_VARIANTS.includes(variant)
  const resolvedTitle = title ?? DEFAULT_TITLE[variant]

  return (
    <div
      data-slot="popover-notification"
      data-variant={variant}
      className={cn(
        "relative flex w-[344px] max-w-full flex-col gap-0.5 rounded-xl p-3",
        isTransient ? "h-0 overflow-clip p-0 opacity-0" : isTall ? "min-h-[66px]" : "min-h-[59px]",
        !isTransient && "shadow-[0px_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0px_8px_40px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    >
      {isTransient ? null : (
        <>
          <div aria-hidden="true" className="absolute inset-0 rounded-xl glass-edge glass-shadow-sm bg-effect-glass-white-36" />
          <div className="relative flex h-5 w-full items-center justify-end gap-2 overflow-clip px-px">
            <span className="text-[0.6875rem] leading-[14px] whitespace-nowrap text-zinc-300 dark:text-zinc-400">{timestamp}</span>
            <CloseButton onClick={onClose} />
          </div>
          <div className="relative flex w-full items-start justify-between gap-2">
            <p className="text-base text-zinc-700 dark:text-zinc-300">{resolvedTitle}</p>
            {showImage ? (
              <img
                alt=""
                aria-hidden="true"
                className="size-8 shrink-0 rounded-sm object-cover"
                src={notificationThumbnail}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}

export { PopoverNotification }
