import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { UploadPopover } from "../../src/components/organisms/upload-popover"

const meta = {
  title: "Organisms/Arquivos/UploadPopover",
  component: UploadPopover,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1421-19292' } },
  args: {
    fileCount: 3,
    percent: 62,
    secondsLeft: 6,
    files: [],
  },
} satisfies Meta<typeof UploadPopover>

export default meta
type Story = StoryObj<typeof meta>

export const InProgress: Story = {
  args: { onPause: fn(), onClose: fn() },
  // "Pausar envio" e "Fechar" chamam cada um o próprio callback.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Pausar envio" }))
    await expect(args.onPause).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole("button", { name: "Fechar" }))
    await expect(args.onClose).toHaveBeenCalledOnce()
  },
}

export const WithFileList: Story = {
  args: {
    files: [
      { name: "hero_header_final.png", done: true },
      { name: "walkthrough_clip.mp4", done: false },
    ],
  },
}
