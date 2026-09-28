import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { CleanSpaceLargeFiles } from "../../src/components/organisms/clean-space-large-files"

const meta = {
  title: "Organisms/CleanSpaceLargeFiles",
  component: CleanSpaceLargeFiles,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1554-21264" },
  },
  args: {
    files: [
      { name: "huge-backup.zip", meta: "ZIP · 476.84 MB · Aug 5, 2026", tier: "current" },
      { name: "medium-report.pdf", meta: "PDF · 9.54 MB · Aug 5, 2026", tier: "current" },
      { name: "small-note.txt", meta: "TXT · 1 KB · Aug 5, 2026", tier: "long term" },
    ],
  },
} satisfies Meta<typeof CleanSpaceLargeFiles>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onDeleteSelected: fn() },
  // Checkbox marca uma linha, "Selecionar todos" marca as 3, "Excluir" entrega as selecionadas e limpa a seleção.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const deleteButton = canvas.getByRole("button", { name: "Excluir" })
    await expect(deleteButton).toBeDisabled()
    const first = canvas.getByRole("checkbox", { name: "Selecionar huge-backup.zip" })
    await userEvent.click(first)
    await expect(first).toHaveAttribute("aria-checked", "true")
    await userEvent.click(canvas.getByRole("button", { name: "Selecionar todos" }))
    await expect(canvas.getAllByRole("checkbox", { checked: true })).toHaveLength(3)
    await userEvent.click(deleteButton)
    await expect(args.onDeleteSelected).toHaveBeenCalledWith(args.files)
    await expect(canvas.queryAllByRole("checkbox", { checked: true })).toHaveLength(0)
  },
}
