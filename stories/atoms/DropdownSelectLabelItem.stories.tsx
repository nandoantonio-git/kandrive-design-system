import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { DropdownSelectLabelItem } from "../../src/components/atoms/dropdown-select-label-item"

const meta = {
  title: "Atoms/Itens de lista/DropdownSelectLabel/Item",
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
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <DropdownSelectLabelItem {...live} onClick={() => updateLive({ active: !live.active })} />
        )}
      </LiveArgs>
    )
  },
  // Clique dispara `onClick`, que aqui alterna `active` (estado Clicked).
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "+ Nova Etiqueta" })
    await expect(item).not.toHaveAttribute("data-active")
    await userEvent.click(item)
    await expect(item).toHaveAttribute("data-active", "true")
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
