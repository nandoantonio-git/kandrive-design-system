import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { PagePickerButton } from "../../src/components/molecules/page-picker-button"

const meta = {
  title: "Molecules/PagePickerButton",
  component: PagePickerButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1714-614" } },
  args: { withLabel: true, disabled: false, onPageChange: fn() },
  decorators: [
    (Story) => (
      <div className="min-h-[200px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PagePickerButton>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — o botão abre a lista de páginas; escolher uma fecha e troca o texto. */
export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Pessoal" })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Compartilhados" }))
    await expect(args.onPageChange).toHaveBeenCalledWith("Compartilhados")
    const updated = canvas.getByRole("button", { name: "Compartilhados" })
    await expect(updated).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(updated)
    await userEvent.keyboard("{Escape}")
    await expect(updated).toHaveAttribute("aria-expanded", "false")
  },
}

export const Expanded: Story = { args: { defaultExpanded: true } }

export const WithoutLabel: Story = { args: { withLabel: false } }

export const Disabled: Story = { args: { disabled: true } }
