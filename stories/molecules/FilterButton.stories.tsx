import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { FilterButton } from "../../src/components/molecules/filter-button"

const meta = {
  title: "Molecules/Busca e filtros/FilterButton",
  component: FilterButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3500-39738" } },
  args: { onClick: fn() },
} satisfies Meta<typeof FilterButton>

export default meta
type Story = StoryObj<typeof meta>

/** `State=Default`: sem filtro, nome acessível "Filtrar". */
export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Filtrar" })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/** `State=Active`: a bolinha mostra a quantidade de opções marcadas, e o nome acessível a repete. */
export const Active: Story = {
  args: { count: 4 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Filtrar, 4 ativos" })).toBeVisible()
  },
}

/** Com um filtro, o nome fica no singular. */
export const UmAtivo: Story = {
  args: { count: 1 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Filtrar, 1 ativo" })).toBeVisible()
  },
}

/** Funil menor, para o campo de busca do Mobile. */
export const Compact: Story = { args: { compact: true, count: 2 } }
