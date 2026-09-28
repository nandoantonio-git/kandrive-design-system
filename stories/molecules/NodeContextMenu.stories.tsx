import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { NodeContextMenu } from "../../src/components/molecules/node-context-menu"

const meta = {
  title: "Molecules/NodeContextMenu",
  component: NodeContextMenu,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1383-15617' },
  },
  argTypes: {
    state: { control: "select", options: ["floating-info-panel", "state-3"] },
    logicalOperator: { control: "select", options: ["and", "or"] },
  },
  args: {
    state: "floating-info-panel",
    logicalOperator: "and",
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NodeContextMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — os botões E/OU trocam `logicalOperator` (os Controls acompanham); as pílulas abrem seus menus sozinhas. */
export const Default: Story = {
  args: { onSave: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <NodeContextMenu {...live} onLogicalOperatorChange={(logicalOperator) => updateLive({ logicalOperator })} />
        )}
      </LiveArgs>
    )
  },
  // E/OU trocam o operador (`aria-pressed`); "Salvar Mudanças" dispara `onSave`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "OU" }))
    await expect(canvas.getByRole("button", { name: "OU" })).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("button", { name: "E" })).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(canvas.getByRole("button", { name: "Salvar Mudanças" }))
    await expect(args.onSave).toHaveBeenCalledOnce()
  },
}

export const WrongInput: Story = {
  args: { state: "state-3" },
}

export const LogicalOr: Story = {
  args: { logicalOperator: "or" },
}
