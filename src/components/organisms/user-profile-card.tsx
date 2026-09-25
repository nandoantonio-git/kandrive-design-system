import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar } from "@/components/atoms/avatar"
import { Button } from "@/components/atoms/button"

export interface UserProfileCardProps extends React.ComponentProps<"section"> {
  name: string
  email: string
  avatarSrc?: string
  onEditProfile?: () => void
  onSwitchAccount?: () => void
}

/**
 * Bloco de usuário no topo de Settings → Conta (Figma KanDrive V0.2.1,
 * `UserBlock` em `Settings/Account` Mobile, Tablet e Desktop; F10, aprovado em
 * 2026-09-24). Tocar no avatar do Header abre esta tela.
 *
 * - Card `Neutral/Surface/Card` com borda `Neutral/Border/Subtle`, raio 12.
 * - `Avatar` de 56px, nome 18px SemiBold `Neutral/Text/Primary`, e-mail 14px
 *   `Neutral/Text/Secondary`.
 * - Ações: `Button` Outline MD "Editar perfil" e "Trocar conta". No mobile e no
 *   tablet ficam abaixo da identidade; no desktop, à direita.
 */
function UserProfileCard({ name, email, avatarSrc, onEditProfile, onSwitchAccount, className, ...props }: UserProfileCardProps) {
  return (
    <section
      data-slot="user-profile-card"
      aria-label="Perfil"
      className={cn(
        "flex w-full flex-col gap-4 rounded-xl border border-neutral-border-subtle bg-neutral-surface-card p-4 tablet:p-5 desktop:flex-row desktop:items-center desktop:justify-between desktop:p-6",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={avatarSrc} name={name} size={56} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-lg font-semibold text-neutral-text-primary">{name}</p>
          <p className="truncate text-sm text-neutral-text-secondary">{email}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onEditProfile} className="flex-1 tablet:flex-none">
          Editar perfil
        </Button>
        <Button variant="outline" onClick={onSwitchAccount} className="flex-1 tablet:flex-none">
          Trocar conta
        </Button>
      </div>
    </section>
  )
}

export { UserProfileCard }
