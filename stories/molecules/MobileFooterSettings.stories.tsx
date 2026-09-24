import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { MobileFooterSettings } from "../../src/components/molecules/mobile-footer-settings"

const meta = {
  title: "Molecules/MobileFooterSettings",
  component: MobileFooterSettings,
  parameters: { layout: "fullscreen", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1756-57824" } },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  argTypes: { page: { control: "radio", options: ["settings", "payment"] }, active: { control: "text" } },
  args: { page: "settings", active: "Conta" },
} satisfies Meta<typeof MobileFooterSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Settings: Story = {}
/** O chip ativo fica fora da tela: a faixa rola até ele. */
export const SettingsPrivacy: Story = { args: { active: "Privacidade" } }
export const Payment: Story = { args: { page: "payment", active: "Plano" } }

export const Interactive: Story = {
  render: (args) => {
    const [active, setActive] = React.useState(args.active ?? "Conta")
    return <MobileFooterSettings {...args} active={active} onSelect={setActive} />
  },
}
