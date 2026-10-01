import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { SearchHeader } from "../../src/components/molecules/search-header"

const meta = {
  title: "Molecules/Busca e filtros/SearchHeader",
  component: SearchHeader,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1755-56081" } },
  args: { placeholder: "Filtrar no Total" },
} satisfies Meta<typeof SearchHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // O funil abre o menu de filtro; marcar uma opção mostra a bolinha; Esc fecha.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("searchbox", { name: "Filtrar no Total" })).toBeVisible()
    const filters = canvas.getByRole("button", { name: "Filtrar" })
    await expect(filters).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(filters)
    await expect(filters).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(canvas.getByRole("checkbox", { name: "Imagens" }))
    await expect(canvas.getByRole("button", { name: "Filtrar, 1 ativo" })).toBeVisible()
    await userEvent.keyboard("{Escape}")
    await expect(canvas.queryByRole("dialog", { name: "Filtrar" })).toBeNull()
  },
}
export const Mobile: Story = { args: { device: "mobile" }, decorators: [(Story) => <div className="w-[358px]"><Story /></div>] }
