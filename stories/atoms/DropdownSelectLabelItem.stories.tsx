import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"

import { DropdownSelectLabelItem } from "../../src/components/atoms/dropdown-select-label-item"

const meta = {
  title: "Atoms/DropdownSelectLabel/Item",
  component: DropdownSelectLabelItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1444-21704' },
  },
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    label: "+ Nova Etiqueta",
    active: false,
  },
} satisfies Meta<typeof DropdownSelectLabelItem>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `active` (os Controls acompanham). */
export const Idle: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return <DropdownSelectLabelItem {...args} onClick={() => updateArgs({ active: !args.active })} />
  },
}

export const Clicked: Story = {
  args: { active: true },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2 bg-[var(--neutral-surface-background,#f3f3f3)] p-4">
      <DropdownSelectLabelItem />
      <DropdownSelectLabelItem active />
    </div>
  ),
}
