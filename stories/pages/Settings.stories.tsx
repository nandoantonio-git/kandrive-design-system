import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { SettingsPage, type SettingsSection } from "../../src/components/pages/settings-page"

const meta = {
  title: "Pages/Settings",
  component: SettingsPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SettingsPage>

export default meta
type Story = StoryObj<typeof meta>

function controlled(initial: SettingsSection) {
  return () => {
    function Controlled() {
      const [section, setSection] = useState<SettingsSection>(initial)
      return <SettingsPage activeSection={section} onNavigateSection={setSection} />
    }
    return <Controlled />
  }
}

export const Account: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("conta"),
}

export const Subscription: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("assinatura"),
}

export const Notifications: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("notificacoes"),
}

export const Appearance: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("aparencia"),
}

export const Privacy: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("privacidade"),
}

export const Languages: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("idioma"),
}

export const DeleteAccount: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12111" },
  },
  render: controlled("excluir-conta"),
}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
// Cada story abre no viewport do frame do Figma correspondente.
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720: Sidebar de seções com 140px. Figma `Settings/Account/Tablet`. */
export const AccountTablet: Story = { parameters: FIG("1745-13871"), globals: vp("kdTablet"), render: controlled("conta") }

/** Tablet · 720, plano. Figma `Settings/Subscription/Tablet`. */
export const SubscriptionTablet: Story = { parameters: FIG("1745-13913"), globals: vp("kdTablet"), render: controlled("assinatura") }

/** Mobile · 390: sem Sidebar; as seções viram chips na base (`MobileFooterSettings`). Figma `Settings/Account/Mobile`. */
export const AccountMobile: Story = { parameters: FIG("1702-22547"), globals: vp("kdMobile"), render: controlled("conta") }

/** Mobile · 390, plano: cards empilhados. Figma `Settings/Subscription/Mobile`. */
export const SubscriptionMobile: Story = { parameters: FIG("1702-22325"), globals: vp("kdMobile"), render: controlled("assinatura") }

/** Mobile · 390: o chip ativo fica fora da tela inicial, e a barra rola até ele. Figma `Settings/Privacy/Mobile`. */
export const PrivacyMobile: Story = { parameters: FIG("1702-22694"), globals: vp("kdMobile"), render: controlled("privacidade") }

/** Mobile · 390, Excluir conta. Figma `Settings/DeleteAccount/Mobile`. */
export const DeleteAccountMobile: Story = { parameters: FIG("1702-22932"), globals: vp("kdMobile"), render: controlled("excluir-conta") }
