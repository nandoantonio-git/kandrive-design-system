import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

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
    device: { control: "inline-radio", options: ["desktop", "mobile"] },
  },
  args: {
    disabled: false,
    device: "desktop",
    onValueChange: fn(),
    onDirectionChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="min-h-[240px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownSelectGroupBy>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — abre e fecha sozinho; o critério fecha a lista, a ordem não. */
export const Default: Story = {
  // Abre, escolhe a ordem (continua aberto), escolhe o critério (fecha e mostra no gatilho).
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Agrupar" })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Mais antigos" }))
    await expect(args.onDirectionChange).toHaveBeenCalledWith("Mais antigos")
    await expect(canvas.getByRole("button", { name: "Mais antigos" })).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Tipo" }))
    await expect(args.onValueChange).toHaveBeenCalledWith("Tipo")
    await expect(canvas.getByRole("button", { name: "Tipo" })).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("list")).toBeNull()
    // Esc fecha.
    await userEvent.click(canvas.getByRole("button", { name: "Tipo" }))
    await userEvent.keyboard("{Escape}")
    await expect(canvas.getByRole("button", { name: "Tipo" })).toHaveAttribute("aria-expanded", "false")
  },
}

export const Expanded: Story = {
  args: { defaultExpanded: true, defaultValue: "Data de modificação", defaultDirection: "Mais recentes" },
}

export const Mobile: Story = {
  args: { device: "mobile", defaultExpanded: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}
