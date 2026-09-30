import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { DisclosureHeader } from "../../src/components/atoms/disclosure-header"

const meta = {
  title: "Atoms/Ícones e símbolos/DisclosureHeader",
  component: DisclosureHeader,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=95-3068" } },
  args: { expanded: false },
} satisfies Meta<typeof DisclosureHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector("[data-slot=disclosure-header]")!
    await expect(el).toHaveAttribute("aria-hidden", "true")
    await expect(el).not.toHaveAttribute("data-expanded")
  },
}
export const Expanded: Story = { args: { expanded: true } }
