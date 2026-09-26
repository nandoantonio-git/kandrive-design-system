import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "../../src/components/templates/app-shell"
import { Sidebar } from "../../src/components/organisms/sidebar"
import { PreferencesProvider } from "../../src/lib/preferences"

const Placeholder = ({ label }: { label: string }) => (
  <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-neutral-border-light text-sm text-neutral-text-secondary">
    {label}
  </div>
)

const meta = {
  title: "Templates/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1715-9906" } },
  args: {
    sidebar: <Sidebar />,
    mobileTabBar: { active: "home" },
    mobileBottomNav: { action: "add", active: "pessoal" },
    children: <Placeholder label="Conteúdo da página" />,
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

/** Desktop · 1440: Header + Sidebar. As barras mobile ficam escondidas. */
export const Desktop: Story = { globals: { viewport: { value: "kdDesktop", isRotated: false } } }

/** Tablet · 720: a mesma estrutura do desktop, com o conteúdo fluido. */
export const Tablet: Story = { globals: { viewport: { value: "kdTablet", isRotated: false } } }

/** Mobile · 390, tela de arquivos: ☰ + TabBar no topo, BottomNav com FAB Adicionar na base. */
export const MobileFiles: Story = { globals: { viewport: { value: "kdMobile", isRotated: false } } }

/** Mobile com a mão esquerda: o FAB muda de lado. */
export const MobileLeftHand: Story = {
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  decorators: [(Story) => <PreferencesProvider initialHand="left"><Story /></PreferencesProvider>],
}

/** Mobile, tela de tarefa: só o BottomNav com Confirmar e ✕. */
export const MobileTask: Story = {
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  args: { mobileTabBar: undefined, mobileBottomNav: { action: "confirm" } },
}

/** Mobile, Settings: a barra de chips na base. */
export const MobileSettings: Story = {
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  args: { mobileTabBar: undefined, mobileBottomNav: undefined, mobileFooterSettings: { page: "settings", active: "Conta" } },
}
