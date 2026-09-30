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
  // O botão de filtros alterna.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("searchbox", { name: "Filtrar no Total" })).toBeVisible()
    const filters = canvas.getByRole("button", { name: "Filtros" })
    await expect(filters).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(filters)
    await expect(filters).toHaveAttribute("aria-pressed", "true")
  },
}
export const Mobile: Story = { args: { device: "mobile" }, decorators: [(Story) => <div className="w-[358px]"><Story /></div>] }
