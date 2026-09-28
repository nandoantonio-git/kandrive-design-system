import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useState } from "react"

import { DropdownSelectGroupBy } from "../../src/components/molecules/dropdown-select-group-by"

const meta = {
  title: "Molecules/DropdownSelectGroupBy",
  component: DropdownSelectGroupBy,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=307-14252' },
  },
  argTypes: {
    disabled: { control: "boolean" },
    expanded: { control: "boolean" },
  },
  args: {
    disabled: false,
    expanded: false,
  },
  render: (args) => {
    function Controlled() {
      const [expanded, setExpanded] = useState(args.expanded)
      const [value, setValue] = useState<string | undefined>(args.value)
      return (
        <DropdownSelectGroupBy
          {...args}
          expanded={expanded}
          onExpandedChange={setExpanded}
          value={value}
          onValueChange={(v) => {
            setValue(v)
            setExpanded(false)
          }}
        />
      )
    }
    return <Controlled />
  },
} satisfies Meta<typeof DropdownSelectGroupBy>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // O gatilho abre a lista; escolher uma opção fecha e mostra o critério no gatilho.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Agrupar" })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Tipo" }))
    await expect(canvas.getByRole("button", { name: "Tipo" })).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("list")).toBeNull()
  },
}

export const Expanded: Story = {
  args: { expanded: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}
