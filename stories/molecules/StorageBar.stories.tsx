import type { Meta, StoryObj } from "@storybook/react-vite"

import { StorageBar, StorageBarExpanded } from "../../src/components/molecules/storage-bar"

const meta = {
  title: "Molecules/StorageBar",
  component: StorageBar,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=191-4816' },
  },
  argTypes: {
    tier: {
      control: "select",
      options: ["quick-access", "long-term"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
  args: {
    tier: "quick-access",
    value: 45,
  },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
} satisfies Meta<typeof StorageBar>

export default meta
type Story = StoryObj<typeof meta>

export const QuickAccess: Story = {
  args: { tier: "quick-access", value: 45 },
}

export const LongTerm: Story = {
  args: { tier: "long-term", value: 70 },
}

export const Empty: Story = {
  args: { value: 0 },
}

export const Full: Story = {
  args: { value: 100 },
}

export const Expanded: StoryObj<typeof StorageBarExpanded> = {
  render: () => (
    <StorageBarExpanded
      segments={[
        { tier: "long-term", value: 30 },
        { tier: "long-term", value: 15 },
        { tier: "quick-access", value: 20 },
        { tier: "quick-access", value: 10 },
      ]}
    />
  ),
}
