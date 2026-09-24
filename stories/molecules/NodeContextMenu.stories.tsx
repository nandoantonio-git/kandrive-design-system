import type { Meta, StoryObj } from "@storybook/react-vite"

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

export const Default: Story = {}

export const WrongInput: Story = {
  args: { state: "state-3" },
}

export const LogicalOr: Story = {
  args: { logicalOperator: "or" },
}
