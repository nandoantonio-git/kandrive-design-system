import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { FileArchiveCard } from "../../src/components/molecules/file-archive-card"

const meta = {
  title: "Molecules/FileArchiveCard",
  component: FileArchiveCard,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=212-3691' },
  },
  args: {
    label: "Arquivo 1",
    interactive: false,
  },
} satisfies Meta<typeof FileArchiveCard>

export default meta
type Story = StoryObj<typeof meta>

/** `molecule/FileArchive1` (`1439:19655`). */
export const FileArchive1: Story = {}

/** `molecule/FileArchive2` (`1439:19656`) — mesma anatomia, `cursor-pointer` no ícone. */
export const FileArchive2: Story = {
  args: { label: "Arquivo 3", interactive: true, onClick: fn() },
  // Interativo: clique e Enter disparam `onClick`.
  play: async ({ args, canvasElement }) => {
    const card = within(canvasElement).getByRole("button", { name: "Arquivo 3" })
    await userEvent.click(card)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=212-3691' },
  },
}
