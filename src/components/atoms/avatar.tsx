import * as React from "react"

import { cn } from "@/lib/utils"

export interface AvatarProps extends React.ComponentProps<"span"> {
  /** Foto do usuário. Sem foto, mostra as iniciais de `name`. */
  src?: string
  /** Nome completo, usado no texto alternativo e nas iniciais. */
  name?: string
  /** Diâmetro em px. Figma: 36 no Header, 56 no bloco de usuário de Settings → Conta. */
  size?: number
}

/**
 * `atom/Avatar`: Figma-confirmado no KanDrive V0.2.1 (`3028:3715`). Círculo com
 * borda `Brand/Primary/Dark` e fundo `Neutral/Surface/Gray`. 🧩 As iniciais
 * sem foto são extensão de engenharia: o Figma só desenha o círculo vazio.
 */
function Avatar({ src, name, size = 36, className, style, ...props }: AvatarProps) {
  const initials = name
    ? name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : ""
  return (
    <span
      data-slot="avatar"
      role="img"
      aria-label={name ? `Foto de ${name}` : "Foto do perfil"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-teal-dark bg-neutral-surface-gray font-medium text-neutral-text-secondary",
        className
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36), ...style }}
      {...props}
    >
      {src ? <img src={src} alt="" className="size-full object-cover" /> : initials}
    </span>
  )
}

export { Avatar }
