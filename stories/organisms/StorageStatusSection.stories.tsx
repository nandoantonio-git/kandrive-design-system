import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { StorageStatusSection } from "../../src/components/organisms/storage-status-section"

const meta = {
  title: "Organisms/Armazenamento/StorageStatusSection",
  component: StorageStatusSection,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1742-25328" } },
  args: {
    statusProps: {
      usedAmount: "60GB",
      totalAmount: "100GB",
      percent: 60,
      fileTypeSegments: [
        { kind: "image", value: 20 },
        { kind: "document", value: 15 },
        { kind: "video", value: 15 },
        { kind: "other", value: 10 },
      ],
      freeLabel: "40GB Livre",
    },
    summaryProps: {
      scopeLabel: "Total",
      files: [
        { name: "Arquivo 1", owner: "Proprietário", size: "100MB" },
        { name: "Arquivo 2", owner: "Proprietário", size: "100MB" },
      ],
    },
  },
} satisfies Meta<typeof StorageStatusSection>

export default meta
type Story = StoryObj<typeof meta>

export const Wide: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("region", { name: "Armazenamento" })).toBeVisible()
    await expect(canvas.getByRole("searchbox", { name: "Filtrar no Total" })).toBeVisible()
  },
}
export const WithoutFiles: Story = { args: { summaryProps: undefined } }
