import type { Meta, StoryObj } from "@storybook/react-vite"

import { FolderItem } from "../../src/components/atoms/folder-item"

const meta = {
  title: "Atoms/FolderItem",
  component: FolderItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1440-24306' },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "hover", "pressed", "disabled", "selected", "selected-hover", "selected-pressed"],
    },
  },
  args: {
    state: "idle",
    name: "Arquivo 1",
    showName: true,
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FolderItem>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Pressed: Story = {
  args: { state: "pressed" },
}

export const Disabled: Story = {
  args: { state: "disabled" },
}

export const Selected: Story = {
  args: { state: "selected" },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <FolderItem state="idle" />
      <FolderItem state="hover" />
      <FolderItem state="pressed" />
      <FolderItem state="disabled" />
      <FolderItem state="selected" />
      <FolderItem state="selected-hover" />
      <FolderItem state="selected-pressed" />
    </div>
  ),
}

/** Sem `state` fixo — passe o mouse, clique/pressione Enter pra selecionar de verdade (não é freeze-frame). */
export const Interactive: Story = {
  args: { state: undefined },
  render: (args) => (
    <div className="flex items-end gap-3">
      <FolderItem {...args} name="Arquivo 1" />
      <FolderItem {...args} name="Arquivo 2" defaultSelected />
      <FolderItem {...args} name="Arquivo 3" disabled />
    </div>
  ),
}
