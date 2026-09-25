import * as React from "react"

import { cn } from "@/lib/utils"
import { HamburgerButton } from "@/components/atoms/hamburger-button"
import { SearchInput, type SearchInputProps } from "@/components/molecules/search-input"
import { PushButton } from "@/components/atoms/push-button"
import { ICONS } from "@/components/atoms/icon"
import { ActionPill } from "@/components/molecules/action-pill"
import kandriveLogo from "@/assets/logo/kandrive-logo.svg"
import kandriveLogoDark from "@/assets/logo/kandrive-logo-dark.svg"

export type HeaderPage = "navbar" | "settings" | "storage"

export interface HeaderProps extends React.ComponentProps<"header"> {
  page?: HeaderPage
  searchProps?: SearchInputProps
  onOrganize?: () => void
  onSave?: () => void
  /** Mobile: toque no ☰ (abre a gaveta). */
  onMenuClick?: () => void
  /** Toque no avatar (mobile) ou no ícone de conta (tablet e desktop): abre Settings → Conta, com o bloco de usuário (F10, 2026-09-24). */
  onAvatarClick?: () => void
}

/**
 * organism/Header (`1421:19918`) — Figma-confirmado: "header". Variante
 * `page=Navbar` expõe 2 ações de fluxo ao vivo: "Organizar" e "Guardar"
 * (`PushButton variant="primary"`, Regra 1 — nenhum componente separado).
 * "Guardar" é termo aprovado (Regra 5); "Organizar" não está na lista
 * travada mas também não é termo proibido — gap de terminologia baixo,
 * ver docs/conflicts.md. Compõe `molecule/input-search` (placeholder local
 * "Pesquisar", Figma-confirmado nesta instância — distinto do placeholder
 * "Search" já registrado em `SearchInput.mdx`, mesma família de gap) +
 * `molecule/action-pill` (composição real Help/Settings/Conta — ver nota
 * abaixo).
 *
 * ⚠️ Corrigido em 2026-08-11 após achado do usuário — auditoria anterior
 * não seguia a Regra 11: o logo era texto estilizado ("Kandrive" em
 * `text-brand-teal`), mas `get_design_context` no nó real (`Kandrive_logo_principal 1`,
 * dentro de `1421:19918`) confirma um vetor de marca próprio (símbolo +
 * wordmark "Kan"+"drive" em cores distintas) — exportado via
 * `download_assets` para `src/assets/logo/kandrive-logo.svg` e usado como
 * asset, nunca como texto. A composição de `molecule/action-pill` também foi
 * corrigida na mesma auditoria (ver `ActionPill.mdx`) — os 3 ícones reais são
 * Help/Settings/Conta, não 2×Settings+SpatialAudioOff.
 *
 * ⚠️ Corrigido em 2026-08-11 (Regra 11, auditoria de fixed-point): a pílula
 * de ações (Help/Settings/Conta) é renderizada a `opacity: 50%` no Figma
 * real, uniformemente nas 3 variantes `page` (Navbar/settings/storage) —
 * confirmado via `get_design_context` no nó `1421:19918`. A implementação
 * renderizava a pílula 100% opaca (achado novo, não presente na auditoria
 * anterior). Corrigido com `className="opacity-50"` (só o efeito visual —
 * não usa a prop `disabled` do átomo, que também zera `pointer-events`; o
 * Figma é um frame estático e não confirma comportamento de clique).
 *
 * 🔧 Corrigido em 2026-08-12 (US-026, 3ª passada de ponto-fixo): os botões
 * "Organizar"/"Guardar" sobrescreviam `atom/PushButton` com
 * `className="h-9 px-3 text-sm"` — releitura fresca de `get_design_context`
 * (nó `1421:19918`) confirma a linha de botões a `h-[40px]` com
 * `padding-inline: 16px` (`px-[var(--button/padding---horizontal,16px)]`),
 * batendo exatamente com os defaults do átomo (`h-10 px-4`), não com o
 * override. O `text-sm` (14px) também derrubava silenciosamente o piso de
 * acessibilidade de 16px já travado para rótulo de botão em `atom/PushButton`
 * (US-011, `text-base` deliberado em vez do `Type/Button/MD` de 14px do
 * Figma) — como este achado é novo (não está na lista de 8 organisms com
 * gap conhecido/deferido em `PushButton.mdx`), removido o `className`
 * inteiro para herdar os defaults corretos do átomo.
 */
function Header({ page = "navbar", searchProps, onOrganize, onSave, onMenuClick, onAvatarClick, className, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        "flex h-24 w-full items-center gap-4 tablet:gap-8 border-b border-[var(--neutral-border-default,#707070)] bg-[var(--neutral-surface-background,#f3f3f3)] px-6 py-6",
        className
      )}
      {...props}
    >
      {/* Mobile (Figma Header Device=Mobile): ☰ + busca + avatar. A partir de `tablet:`, o layout de sempre. */}
      <HamburgerButton className="tablet:hidden" onClick={onMenuClick} />
      <img src={kandriveLogo} alt="Kandrive" className="hidden h-11 w-[173px] shrink-0 tablet:block dark:hidden" />
      {/* Logo sobre fundo escuro (Figma Logo/* dark): "Kan" + canguru (Kan) #F5F4F2, "drive" #337084 (Brand/Primary/Mid), símbolo #337084→#1A5E6E. */}
      <img src={kandriveLogoDark} alt="Kandrive" className="hidden h-11 w-[173px] shrink-0 tablet:dark:block" />
      <SearchInput
        {...searchProps}
        placeholder={searchProps?.placeholder ?? "Pesquisar"}
        className="min-w-0 max-w-[560px] flex-1"
      />
      {page === "navbar" ? (
        <div className="hidden shrink-0 items-center gap-5 tablet:flex">
          {/* Tablet: só o ícone (Figma Header Device=Tablet); o rótulo aparece a partir de `desktop:`. */}
          <PushButton variant="primary" icon={ICONS.Organize} onClick={onOrganize} aria-label="Organizar">
            <span className="hidden desktop:inline">Organizar</span>
          </PushButton>
          <PushButton variant="primary" icon={ICONS.Keep} onClick={onSave} aria-label="Guardar">
            <span className="hidden desktop:inline">Guardar</span>
          </PushButton>
        </div>
      ) : null}
      <ActionPill
        className="ml-auto hidden shrink-0 opacity-50 tablet:flex"
        actions={[
          { name: "Help", label: "Ajuda" },
          { name: "Settings", label: "Configurações" },
          { name: "SpatialAudioOff", label: "Conta", onClick: onAvatarClick },
        ]}
      />
      <button
        type="button"
        aria-label="Conta"
        onClick={onAvatarClick}
        className="touch-target ml-auto size-[34px] shrink-0 cursor-pointer rounded-full border border-brand-teal-dark bg-neutral-surface-gray focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none tablet:hidden"
      />
    </header>
  )
}

export { Header }
