import * as React from "react"

import { cn } from "@/lib/utils"
import { usePreferences } from "@/lib/preferences"
import { Header, type HeaderProps } from "@/components/organisms/header"
import { MobileTabBar, type MobileTabBarProps } from "@/components/molecules/mobile-tab-bar"
import { MobileBottomNav, type MobileBottomNavProps } from "@/components/organisms/mobile-bottom-nav"
import { MobileFooterSettings, type MobileFooterSettingsProps } from "@/components/molecules/mobile-footer-settings"
import { SidebarDrawer, type SidebarDrawerProps } from "@/components/organisms/sidebar-drawer"

export interface AppShellProps extends React.ComponentProps<"div"> {
  headerProps?: HeaderProps
  /** Navegação lateral do desktop e do tablet (ex. `<Sidebar />`). Some no mobile. */
  sidebar?: React.ReactNode
  /** Rodapé do desktop e do tablet (ex. `<Footer />`). Some no mobile. */
  footer?: React.ReactNode
  /** Mobile: `MobileTabBar` no topo. Só nas telas de arquivos (Home). */
  mobileTabBar?: MobileTabBarProps
  /** Mobile: `MobileBottomNav` na base (arquivos, Storage e tarefas). `hand` vem das preferências se não for passado. */
  mobileBottomNav?: MobileBottomNavProps
  /** Mobile: barra de chips na base (Settings e Payment). */
  mobileFooterSettings?: MobileFooterSettingsProps
  /** Mobile: gaveta pelo ☰. Desligue (`false`) nas telas de feedback visual. */
  drawer?: false | Omit<SidebarDrawerProps, "open" | "onOpenChange">
}

/**
 * Casca de navegação responsiva (decisão de responsividade, 2026-09-24).
 * Troca a estrutura de navegação por faixa, num lugar só:
 *
 * | Faixa | Topo | Lateral | Base |
 * | --- | --- | --- | --- |
 * | Desktop ≥ 1200 e Tablet 720–1199 | Header | `sidebar` | `footer` |
 * | Mobile < 720 | Header com ☰ (+ `mobileTabBar`) | gaveta pelo ☰ | `mobileBottomNav` ou `mobileFooterSettings` |
 *
 * - O conteúdo é fluido.
 * - A Sidebar mantém a largura do Figma.
 * - Acima de 1440px, o layout fica centralizado (`--container-page`).
 */
function AppShell({
  headerProps,
  sidebar,
  footer,
  mobileTabBar,
  mobileBottomNav,
  mobileFooterSettings,
  drawer = {},
  className,
  children,
  ...props
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const { hand } = usePreferences()
  return (
    <div data-slot="app-shell" className={cn("relative flex min-h-dvh flex-col bg-neutral-surface-background", className)} {...props}>
      <Header {...headerProps} onMenuClick={drawer === false ? undefined : () => setDrawerOpen(true)} />

      <div className="mx-auto flex w-full max-w-(--container-page) flex-1 gap-6 desktop:gap-12 px-4 pt-4 tablet:px-6 tablet:pt-6 desktop:px-12">
        {sidebar ? <aside aria-label="Barra lateral" className="hidden shrink-0 tablet:block">{sidebar}</aside> : null}
        <main className="flex min-w-0 flex-1 flex-col gap-4">
          {mobileTabBar ? (
            <div className="flex justify-center tablet:hidden">
              <MobileTabBar {...mobileTabBar} />
            </div>
          ) : null}
          {children}
        </main>
      </div>

      {footer ? <div className="mx-auto hidden w-full max-w-(--container-page) px-6 tablet:block desktop:px-12">{footer}</div> : null}

      {mobileBottomNav ? (
        <div className="pointer-events-none sticky bottom-0 tablet:hidden [&>*]:pointer-events-auto">
          <MobileBottomNav hand={hand} {...mobileBottomNav} />
        </div>
      ) : null}
      {mobileFooterSettings ? (
        <div className="sticky bottom-0 tablet:hidden">
          <MobileFooterSettings {...mobileFooterSettings} />
        </div>
      ) : null}

      {drawer === false ? null : (
        <SidebarDrawer {...drawer} className="fixed tablet:hidden" open={drawerOpen} onOpenChange={setDrawerOpen} />
      )}
    </div>
  )
}

export { AppShell }
