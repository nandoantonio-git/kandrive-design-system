import type { Meta, StoryObj } from "@storybook/react-vite"

import { StorageTierBadge } from "../../src/components/atoms/storage-tier-badge"

const meta = {
  title: "Atoms/StorageTierBadge",
  component: StorageTierBadge,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1023-13787' },
  },
  argTypes: {
    tier: {
      control: "select",
      options: ["current", "long term"],
    },
  },
  args: {
    tier: "current",
  },
} satisfies Meta<typeof StorageTierBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Current: Story = {
  args: { tier: "current" },
}

export const LongTerm: Story = {
  args: { tier: "long term" },
}
