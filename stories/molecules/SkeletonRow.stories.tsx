import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { SkeletonRow } from "../../src/components/molecules/skeleton-row"

const meta = {
  title: "Molecules/Arquivos/SkeletonRow",
  component: SkeletonRow,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3028-3722" } },
  decorators: [(Story) => <div className="w-[358px]"><Story /></div>],
} satisfies Meta<typeof SkeletonRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LoadingList: Story = {
  render: () => (
    <div role="status" aria-busy="true" aria-label="Carregando arquivos" className="flex flex-col gap-2">
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </div>
  ),
  // A lista anuncia o carregamento; as linhas em si ficam fora da árvore de acessibilidade.
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[role=status]")).toHaveAttribute("aria-busy", "true")
    await expect(canvasElement.querySelectorAll("[data-slot=skeleton-row][aria-hidden=true]")).toHaveLength(3)
  },
}
