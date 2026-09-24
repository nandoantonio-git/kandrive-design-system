import type { Meta, StoryObj } from "@storybook/react-vite"

import { DeleteButton } from "../../src/components/atoms/delete-button"

const meta = {
  title: "Atoms/IconButton/Delete",
  component: DeleteButton,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=174-384' },
  },
  argTypes: {
    style: { control: "select", options: ["default", "red", "white"] },
    disabled: { control: "boolean" },
  },
  args: {
    style: "default",
    disabled: false,
  },
} satisfies Meta<typeof DeleteButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Red: Story = {
  args: { style: "red" },
}

export const White: Story = {
  args: { style: "white" },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: { disabled: true },
}
