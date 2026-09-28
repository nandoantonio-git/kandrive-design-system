import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { CleanSpaceStorage } from "../../src/components/templates/clean-space-storage"

const meta = {
  title: "Templates/CleanSpaceStorage",
  component: CleanSpaceStorage,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1439-16908' } },
  args: {
    largeFiles: [
      { name: "huge-backup.zip", meta: "ZIP · 476.84 MB · Aug 5, 2026", tier: "current" },
      { name: "medium-report.pdf", meta: "PDF · 9.54 MB · Aug 5, 2026", tier: "current" },
      { name: "small-note.txt", meta: "TXT · 1 KB · Aug 5, 2026", tier: "long term" },
    ],
    duplicateGroups: [
      { name: "Contrato-Fornecedor (3 versões)", copiesLabel: "3 cópias · 4.58 MB" },
      { name: "Backup-Financeiro (2 versões)", copiesLabel: "2 cópias · 2.98 GB" },
    ],
  },
} satisfies Meta<typeof CleanSpaceStorage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onClose: fn(), onDeleteFile: fn(), onDeleteDuplicates: fn() },
  // O modal repassa as ações: excluir os selecionados, excluir cópias e fechar.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("checkbox", { name: "Selecionar medium-report.pdf" }))
    await userEvent.click(canvas.getByRole("button", { name: "Excluir" }))
    await expect(args.onDeleteFile).toHaveBeenCalledWith(args.largeFiles[1])
    await userEvent.click(canvas.getAllByRole("button", { name: "Excluir cópias" })[0])
    await expect(args.onDeleteDuplicates).toHaveBeenCalledWith(args.duplicateGroups[0])
    await userEvent.click(canvas.getByRole("button", { name: "Fechar" }))
    await expect(args.onClose).toHaveBeenCalledOnce()
  },
}
