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
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-19849" },
  },
  render: controlled("conta"),
}

export const Subscription: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21072" },
  },
  render: controlled("assinatura"),
}

export const Notifications: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21165" },
  },
  render: controlled("notificacoes"),
}

export const Appearance: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21211" },
  },
  render: controlled("aparencia"),
}

export const Privacy: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21268" },
  },
  render: controlled("privacidade"),
}

export const Languages: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21327" },
  },
  render: controlled("idioma"),
}

export const DeleteAccount: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21297" },
  },
  render: controlled("excluir-conta"),
}
