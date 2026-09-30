import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { DropdownSelectGroupByItem } from "../../src/components/atoms/dropdown-select-group-by-item"

const meta = {
  title: "Atoms/Itens de lista/DropdownSelectGroupBy/Item",
  component: DropdownSelectGroupByItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1444-21587' },
  },
  argTypes: {
    selected: { control: "boolean" },
  },
  args: {
    label: "Tipo",
    selected: false,
  },
} satisfies Meta<typeof DropdownSelectGroupByItem>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `selected` (os Controls acompanham). */
export const Idle: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <DropdownSelectGroupByItem {...live} onClick={() => updateLive({ selected: !live.selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clique dispara `onClick`, que aqui alterna `selected`.
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "Tipo" })
    await expect(item).not.toHaveAttribute("data-selected")
    await userEvent.click(item)
    await expect(item).toHaveAttribute("data-selected", "true")
  },
}

export const Selected: Story = {
  args: { selected: true },
}

export const LongLabel: Story = {
  args: { label: "Data de modificação" },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2 bg-[var(--neutral-surface-background,#f3f3f3)] p-4">
      <DropdownSelectGroupByItem label="Tipo" />
      <DropdownSelectGroupByItem label="Tamanho" selected />
    </div>
  ),
}
