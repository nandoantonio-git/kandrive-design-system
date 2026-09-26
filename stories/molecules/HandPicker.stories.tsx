import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useState } from "react"

import { HandPicker } from "../../src/components/molecules/hand-picker"
import type { Hand } from "../../src/lib/preferences"

const meta = {
  title: "Molecules/HandPicker",
  component: HandPicker,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-13473" } },
  args: { value: "right" },
} satisfies Meta<typeof HandPicker>

export default meta
type Story = StoryObj<typeof meta>

/** Clique ou use as setas para trocar. */
export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Hand>(args.value)
    return <HandPicker {...args} value={value} onValueChange={setValue} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const left = canvas.getByRole("radio", { name: /Esquerda/ })
    await userEvent.click(left)
    await expect(left).toHaveAttribute("aria-checked", "true")
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByRole("radio", { name: /Direita/ })).toHaveAttribute("aria-checked", "true")
  },
}

export const Left: Story = { args: { value: "left" } }
