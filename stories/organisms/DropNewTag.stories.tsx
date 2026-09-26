import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { DropNewTag } from "../../src/components/organisms/drop-new-tag"

const meta = {
  title: "Organisms/DropNewTag",
  component: DropNewTag,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1444-21624' } },
} satisfies Meta<typeof DropNewTag>

export default meta
type Story = StoryObj<typeof meta>

/**
 * `label`/`color` não-controlados (sem `onLabelChange`/`onColorChange`
 * explícitos) — digitar e clicar numa cor funciona de verdade, o
 * componente gerencia o próprio estado (2026-09-26).
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const primarySwatch = canvas.getByRole("radio", { name: "primary" })
    await expect(primarySwatch).toHaveAttribute("aria-checked", "false")
    await userEvent.click(primarySwatch)
    await expect(primarySwatch).toHaveAttribute("aria-checked", "true")
  },
}

export const WithLabel: Story = {
  args: { defaultLabel: "Contratos", defaultColor: "primary" },
}
