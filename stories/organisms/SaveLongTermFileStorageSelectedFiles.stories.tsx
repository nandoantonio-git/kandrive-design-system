import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { SaveLongTermFileStorageSelectedFiles } from "../../src/components/organisms/save-long-term-file-storage-selected-files"

const meta = {
  title: "Organisms/Arquivos/SaveLongTermFileStorageSelectedFiles",
  component: SaveLongTermFileStorageSelectedFiles,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1555-21357" },
  },
  args: {
    files: [
      { name: "Relatório-2026.pdf", meta: "PDF · 2.1 MB" },
      { name: "Contratos.zip", meta: "ZIP · 45 MB" },
      { name: "huge-backup.zip", meta: "ZIP · 476.84 MB" },
    ],
  },
} satisfies Meta<typeof SaveLongTermFileStorageSelectedFiles>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onAddFiles: fn() },
  // "Adicionar arquivos" chama `onAddFiles`.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Adicionar arquivos" }))
    await expect(args.onAddFiles).toHaveBeenCalledOnce()
  },
}
