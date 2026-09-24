import type { Meta, StoryObj } from "@storybook/react-vite"

import { ContextHeader } from "../../src/components/molecules/context-header"

const meta = {
  title: "Molecules/ContextHeader",
  component: ContextHeader,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=790-7618' },
  },
  argTypes: {
    state: { control: "select", options: ["expanded", "collapsed"] },
  },
  args: {
    itemsSelected: "X itens selecionado",
    state: "expanded",
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Collapsed: Story = {
  args: { state: "collapsed" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-16 w-[440px] rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-4">
        <Story />
      </div>
    ),
  ],
}
