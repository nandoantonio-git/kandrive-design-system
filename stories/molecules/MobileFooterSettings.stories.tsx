import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { MobileFooterSettings } from "../../src/components/molecules/mobile-footer-settings"
import { mobileFrame } from "../../.storybook/mobile-frame"

const meta = {
  title: "Molecules/Navegação/MobileFooterSettings",
  component: MobileFooterSettings,
  parameters: { layout: "fullscreen", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1756-57824" } },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  argTypes: { page: { control: "radio", options: ["settings", "payment", "faq"] }, active: { control: "text" } },
  args: { page: "settings", active: "Conta" },
  decorators: [mobileFrame],
} satisfies Meta<typeof MobileFooterSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Settings: Story = {}
/** O chip ativo fica fora da tela: a faixa rola até ele. */
export const SettingsPrivacy: Story = { args: { active: "Privacidade" } }
export const Payment: Story = { args: { page: "payment", active: "Plano" } }
/** Page=FAQ: os tópicos da página de Perguntas frequentes. */
export const Faq: Story = { args: { page: "faq", active: "Primeiros passos" } }

export const Interactive: Story = {
  render: function Render(args) {
    const [active, setActive] = React.useState(args.active ?? "Conta")
    return <MobileFooterSettings {...args} active={active} onSelect={setActive} />
  },
  // Tocar numa seção a marca e desmarca a anterior.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Privacidade" }))
    await expect(canvas.getByRole("button", { name: "Privacidade" })).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("button", { name: "Conta" })).toHaveAttribute("aria-pressed", "false")
  },
}
