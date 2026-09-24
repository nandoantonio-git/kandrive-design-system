import type { Meta, StoryObj } from "@storybook/react-vite"

import { DropListItem } from "../../src/components/molecules/drop-list-item"

const meta = {
  title: "Molecules/DropListItem",
  component: DropListItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1440-23803' },
  },
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    label: "Nova pasta",
    active: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[191px] rounded-md border border-zinc-100 bg-white shadow-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Active: Story = {
  args: { state: "pressed" },
}
