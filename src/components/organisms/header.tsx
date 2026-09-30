import * as React from "react"

import { cn } from "@/lib/utils"
import { HamburgerButton } from "@/components/atoms/hamburger-button"
import { SearchInput, type SearchInputProps } from "@/components/molecules/search-input"
import { Button } from "@/components/atoms/button"
import { ICONS } from "@/components/atoms/icon"
import { OrganizeIcon } from "@/components/atoms/animated-icons"
import { ActionPill } from "@/components/molecules/action-pill"
import { Avatar } from "@/components/atoms/avatar"
import kandriveLogo from "@/assets/logo/kandrive-logo.svg"
import kandriveLogoDark from "@/assets/logo/kandrive-logo-dark.svg"

export type HeaderPage = "navbar" | "settings" | "storage"

export interface HeaderProps extends React.ComponentProps<"header"> {
  page?: HeaderPage
  searchProps?: SearchInputProps
  onOrganize?: () => void
  onSave?: () => void
  /** Destino do logo (tablet e desktop): o início do produto. 🧩 Link não desenhado no Figma como componente; pedido do usuário em 2026-09-29. */
  homeHref?: string
  /** Clique no logo; use `event.preventDefault()` para navegar por rota do app em vez do `href`. */
  onLogoClick?: React.MouseEventHandler<HTMLAnchorElement>
  /** Mobile: toque no ☰ (abre a gaveta). */
  onMenuClick?: () => void
  /** Toque no avatar (mobile) ou no ícone de conta (tablet e desktop): abre Settings → Conta, com o bloco de usuário (F10, 2026-09-24). */
  onAvatarClick?: () => void
  /** Usuário logado — mesmo shape de `UserProfileCard`/`Settings`, mostrado no `atom/Avatar` mobile. */
  user?: { name?: string; avatarSrc?: string }
}

/**
 * organism/Header (`1255:22352`) — Figma-confirmado: "header". Variante
 * `page=Navbar` expõe 2 ações de fluxo ao vivo: "Organizar" e "Guardar"
 * (`atom/Button`, migrado de `PushButton` em 2026-09-25, fase E).
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
 * Help/Settings/Conta, não 2×Settings+Account.
 *
 * ⚠️ Corrigido em 2026-08-11 (Regra 11, auditoria de fixed-point): a pílula
 * de ações (Help/Settings/Conta) é renderizada a `opacity: 50%` no Figma
 * real, uniformemente nas 3 variantes `page` (Navbar/settings/storage) —
 * confirmado via `get_design_context` no nó `1421:19918`. A implementação
 * renderizava a pílula 100% opaca (achado novo, não presente na auditoria
 * anterior). Revertido em 2026-09-30: o Figma atual mostra a pílula a 100% no Default (50% só na variante Disabled), e 50% deixava Ajuda e Configurações abaixo de 3:1. Antes: corrigido com `className="opacity-50"` (só o efeito visual —
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
 *
 * **Corrigido em 2026-09-25** (achado do usuário: "Header desatualizado"):
 * o botão de conta no mobile era um círculo vazio (`border` + `bg`
 * hand-rolled), sem iniciais nem foto — desde a F10 (2026-09-24), o
 * `atom/Avatar` já documenta no próprio JSDoc "Figma: 36 no Header, 56 no
 * bloco de usuário de Settings → Conta", mas o Header nunca foi atualizado
 * pra usá-lo. Trocado pelo `Avatar` de verdade (36px, mesma prop `user`
 * usada em `Settings`).
 *
 * 🧩 Regra 8: hover/pressed do avatar (mobile) não desenhados no Figma.
 */
/** Um primário por tela (auditoria UX, A2): Adicionar é o primário; Organizar e Guardar ficam em contorno. */
const HEADER_ACTION = "group h-10 gap-2 px-3 desktop:px-4"

function Header({
  page = "navbar",
  searchProps,
  onOrganize,
  onSave,
  onMenuClick,
  onAvatarClick,
  homeHref = "/",
  onLogoClick,
  user = { name: "Cassandra Ribeiro" },
  className,
  ...props
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        "flex h-24 w-full items-center gap-4 tablet:gap-8 desktop:gap-6 border-b border-[var(--neutral-border-default,#707070)] bg-[var(--neutral-surface-background,#f3f3f3)] px-6 py-6",
        // Desktop (Figma 1440, `Grid/Desktop`, 2026-09-30): o miolo acompanha o conteúdo da página, centrado acima de 1440px.
        "desktop:px-[max(1.5rem,calc((100%-var(--container-page))/2+1.5rem))]",
        className
      )}
      {...props}
    >
      {/* Mobile (Figma Header Device=Mobile): ☰ + busca + avatar. A partir de `tablet:`, o layout de sempre. */}
      <HamburgerButton className="tablet:hidden" onClick={onMenuClick} />
      {/* O logo leva ao início (pedido do usuário, 2026-09-29): um link só, com as duas versões do logo dentro.
          Desktop (`Grid/Desktop`): logo nas colunas 1 e 2 (212px), busca nas colunas 3 a 7 (566px),
          Organizar e Guardar a partir da coluna 8, ícones terminando na margem direita. */}
      <a
        href={homeHref}
        onClick={onLogoClick}
        aria-label="Kandrive, ir para o início"
        className="hidden shrink-0 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 tablet:block desktop:w-[212px]"
      >
        <img src={kandriveLogo} alt="" className="h-11 w-[173px] dark:hidden" />
        {/* Logo sobre fundo escuro (Figma Logo/* dark): "Kan" + canguru (Kan) #F5F4F2, "drive" #337084 (Brand/Primary/Mid), símbolo #337084→#1A5E6E. */}
        <img src={kandriveLogoDark} alt="" className="hidden h-11 w-[173px] dark:block" />
      </a>
      <SearchInput
        {...searchProps}
        placeholder={searchProps?.placeholder ?? "Pesquisar"}
        className="min-w-0 max-w-[560px] flex-1 desktop:max-w-none desktop:w-[566px] desktop:flex-none"
      />
      {page === "navbar" ? (
        <div className="hidden shrink-0 items-center gap-6 tablet:flex">
          {/* Tablet: só o ícone (Figma Header Device=Tablet); o rótulo aparece a partir de `desktop:`.
              Figma (2026-09-29): 40px de altura, 16px de padding lateral, 8px entre ícone e rótulo, 24px entre os botões.
              `group` faz o ícone animar junto com o hover e o foco do botão (smart animation do Figma, ver animated-icons.tsx). */}
          <Button variant="outline" onClick={onOrganize} aria-label="Organizar" className={HEADER_ACTION}>
            {/* Figma: instância de atom/IconButton Icon=Organize (sem a seta do atom/Icon/Organize), 18px. */}
            <OrganizeIcon className="size-[18px]" aria-hidden="true" />
            <span className="hidden desktop:inline">Organizar</span>
          </Button>
          <Button variant="outline" onClick={onSave} aria-label="Guardar" className={HEADER_ACTION}>
            <ICONS.Keep className="size-4" aria-hidden="true" />
            <span className="hidden desktop:inline">Guardar</span>
          </Button>
        </div>
      ) : null}
      <ActionPill
        className="ml-auto hidden shrink-0 tablet:flex"
        actions={[
          { name: "Help", label: "Ajuda" },
          { name: "Settings", label: "Configurações" },
          { name: "Account", label: "Conta", onClick: onAvatarClick },
        ]}
      />
      <button
        type="button"
        aria-label="Conta"
        onClick={onAvatarClick}
        className="touch-target ml-auto shrink-0 cursor-pointer rounded-full transition-[opacity,transform] hover:opacity-80 motion-safe:active:scale-95 focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none tablet:hidden"
      >
        <Avatar name={user?.name} src={user?.avatarSrc} size={36} />
      </button>
    </header>
  )
}

export { Header }
