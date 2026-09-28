import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { FreeModeOutputNode } from "../../src/components/molecules/free-mode-output-node"

const meta = {
  title: "Molecules/OrganizeFreeModeCanvas/OutputNode",
  component: FreeModeOutputNode,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1421-20262' },
  },
  argTypes: {
    variant: { control: "select", options: ["default", "compact"] },
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FreeModeOutputNode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: "default" },
  // "Prévia de arquivos" expande e recolhe a lista.
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("button", { name: "Prévia de arquivos" })
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
  },
}
export const Compact: Story = { args: { variant: "compact" } }
