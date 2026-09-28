import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"

import { SidebarTagsItem } from "../../src/components/atoms/sidebar-tags-item"

const meta = {
  title: "Atoms/SidebarTagsItem",
  component: SidebarTagsItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1421-20907' },
  },
  argTypes: {
    state: { control: "select", options: ["idle", "hover", "selected"] },
    selected: { control: "boolean" },
  },
  args: {
    label: "Image",
    state: "idle",
    selected: false,
  },
  render: (args) => (
    <div className="w-60">
      <SidebarTagsItem {...args} />
    </div>
  ),
} satisfies Meta<typeof SidebarTagsItem>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `selected` (os Controls acompanham). */
export const Idle: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <div className="w-60">
        <SidebarTagsItem {...args} onClick={() => updateArgs({ selected: !args.selected })} />
      </div>
    )
  },
}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Selected: Story = {
  args: { state: "selected" },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex w-60 flex-col gap-1 bg-[var(--neutral-surface-background,#f3f3f3)] p-2">
      <SidebarTagsItem label="Image" state="idle" />
      <SidebarTagsItem label="Image" state="hover" />
      <SidebarTagsItem label="Image" state="selected" />
    </div>
  ),
}
