import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { PreviewPane } from "../../src/components/organisms/preview-pane"

const meta = {
  title: "Organisms/PreviewPane",
  component: PreviewPane,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=724-3597' } },
  args: {
    file: {
      name: "Arquivo 1",
      owner: "Cassandra Weber",
      createdAt: "Oct 12, 2023",
      size: "2.4 MB",
      location: "/Corporate/Legal",
      format: "PDF",
    },
    tags: ["Recentes", { label: "Urgente", danger: true }],
  },
} satisfies Meta<typeof PreviewPane>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onClose: fn(), onSave: fn(), onShare: fn() },
  // Fechar, "Salvar" e "Compartilhar" chamam cada um o próprio callback.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Salvar" }))
    await expect(args.onSave).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole("button", { name: "Compartilhar" }))
    await expect(args.onShare).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole("button", { name: "Fechar" }))
    await expect(args.onClose).toHaveBeenCalledOnce()
  },
}

export const WithoutTags: Story = {
  args: { tags: [] },
}
