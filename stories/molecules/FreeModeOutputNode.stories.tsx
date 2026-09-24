import type { Meta, StoryObj } from "@storybook/react-vite"

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

export const Default: Story = { args: { variant: "default" } }
export const Compact: Story = { args: { variant: "compact" } }
