import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { CleanSpaceDuplicated } from "../../src/components/organisms/clean-space-duplicated"

const meta = {
  title: "Organisms/Armazenamento/CleanSpaceDuplicated",
  component: CleanSpaceDuplicated,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1554-21265" },
  },
  args: {
    groups: [
      { name: "Contrato-Fornecedor (3 versões)", copiesLabel: "3 cópias · 4.58 MB" },
      { name: "Backup-Financeiro (2 versões)", copiesLabel: "2 cópias · 2.98 GB" },
    ],
  },
} satisfies Meta<typeof CleanSpaceDuplicated>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onDeleteDuplicates: fn() },
  // "Excluir cópias" chama `onDeleteDuplicates` com o grupo da própria linha.
  play: async ({ args, canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole("button", { name: "Excluir cópias" })
    await userEvent.click(buttons[1])
    await expect(args.onDeleteDuplicates).toHaveBeenCalledOnce()
    await expect(args.onDeleteDuplicates).toHaveBeenCalledWith(args.groups[1])
  },
}
