import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { OrganizeFreeModeCanvas } from "../../src/components/templates/organize-free-mode-canvas"

const meta = {
  title: "Templates/OrganizeFreeModeCanvas",
  component: OrganizeFreeModeCanvas,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1439-16906' } },
  args: {
    rulesCount: 4,
    affectedFilesCount: 128,
    sizeLabel: "4.2 GB",
  },
} satisfies Meta<typeof OrganizeFreeModeCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onSaveTemplate: fn(), onDiscard: fn() },
  // "Adicionar nodo" abre o menu de operações, escolher uma o fecha; o painel de filtro abre as listas e alterna E/OU; "Salvar Template" chama `onSaveTemplate`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole("button", { name: "Interssecção" })).toBeNull()
    await userEvent.click(canvas.getByRole("button", { name: "Adicionar nodo" }))
    await userEvent.click(canvas.getByRole("button", { name: "Interssecção" }))
    await expect(canvas.queryByRole("button", { name: "Interssecção" })).toBeNull()
    // O painel de filtro é o NodeContextMenu real: a pílula "Atributo" abre a lista.
    await userEvent.click(canvas.getByRole("button", { name: "Tamanho" }))
    await expect(canvas.getByRole("button", { name: "Data" })).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Data" }))
    await expect(canvas.getByRole("button", { name: "Data" })).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(canvas.getByRole("button", { name: "OU" }))
    await expect(canvas.getByRole("button", { name: "OU" })).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Salvar Template" }))
    await expect(args.onSaveTemplate).toHaveBeenCalledOnce()
    await expect(args.onDiscard).not.toHaveBeenCalled()
  },
}
