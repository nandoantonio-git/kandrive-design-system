import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { SelectBox } from "../../src/components/molecules/select-box"

const meta = {
  title: "Molecules/Formulários e configurações/SelectBox",
  component: SelectBox,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3029-3847" } },
  args: { options: ["Português (Brasil)", "English (US)", "Español"], "aria-label": "Idioma", onValueChange: fn() },
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // Escolher uma opção troca o valor e chama onValueChange.
  play: async ({ args, canvasElement }) => {
    const select = within(canvasElement).getByRole("combobox", { name: "Idioma" })
    await expect(select).toHaveValue("Português (Brasil)")
    await userEvent.selectOptions(select, "Español")
    await expect(select).toHaveValue("Español")
    await expect(args.onValueChange).toHaveBeenCalledWith("Español")
  },
}

export const DateFormat: Story = {
  args: { options: ["DD/MM/AAAA", "MM/DD/AAAA", "AAAA-MM-DD"], "aria-label": "Formato de data" },
}
