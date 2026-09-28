import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { TagOrgTemplateName } from "../../src/components/atoms/tag-org-template-name"

const meta = {
  title: "Atoms/TagOrgTemplateName",
  component: TagOrgTemplateName,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1039-17641' },
  },
} satisfies Meta<typeof TagOrgTemplateName>

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  // O campo aceita digitação: o nome digitado vira o valor.
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Nome do template de organização" })
    await userEvent.type(input, "Fotos de Viagem")
    await expect(input).toHaveValue("Fotos de Viagem")
  },
}

export const Filled: Story = {
  args: { defaultValue: "Fotos de Viagem" },
}
