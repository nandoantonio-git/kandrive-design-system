import type { Meta, StoryObj } from "@storybook/react-vite"

import { StorageStatusSummary } from "../../src/components/organisms/storage-status-summary"

const meta = {
  title: "Organisms/StorageStatusSummary",
  component: StorageStatusSummary,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1742-25489" } },
  args: {
    scopeLabel: "Total",
    files: [
      { name: "Arquivo 1", size: "100MB" },
      { name: "Arquivo 2", size: "100MB" },
      { name: "Arquivo 3", size: "100MB" },
    ],
  },
} satisfies Meta<typeof StorageStatusSummary>

export default meta
type Story = StoryObj<typeof meta>

/** Desktop e tablet (Figma `Device=Desktop` · `Tablet`). */
export const Desktop: Story = {}

/** Mobile (`Storage/Total/Mobile`): filtro, Agrupar e Etiquetar, e a tabela em card. */
export const Mobile: Story = {
  args: { device: "mobile" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1663-8852" } },
  decorators: [(Story) => <div className="w-[356px]"><Story /></div>],
}
