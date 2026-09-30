import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { FileListContainer } from "../../src/components/organisms/file-list-container"

const meta = {
  title: "Organisms/Arquivos/FileListContainer",
  component: FileListContainer,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=826-16143' } },
  args: {
    rows: [
      { name: "Arquivo 1" },
      { name: "Arquivo 2" },
      { name: "Arquivo 3" },
    ],
  },
} satisfies Meta<typeof FileListContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onOpen: fn() },
  // Clicar numa linha chama `onOpen` com a própria linha.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: /Arquivo 2/ }))
    await expect(args.onOpen).toHaveBeenCalledWith({ name: "Arquivo 2" })
  },
}
