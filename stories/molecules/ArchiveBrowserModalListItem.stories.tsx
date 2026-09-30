import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { ArchiveBrowserModalListItem } from "../../src/components/molecules/archive-browser-modal-list-item"

const meta = {
  title: "Molecules/Arquivos/ArchiveBrowserModal/ListItem",
  component: ArchiveBrowserModalListItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1421-20896' },
  },
  args: {
    fileName: "Ceremonia-001.jpg",
    meta: "JPG · 7.82 MB · 19 Jun",
    selected: false,
  },
} satisfies Meta<typeof ArchiveBrowserModalListItem>

export default meta
type Story = StoryObj<typeof meta>

/** `Property 1=ArchiveFileRow` (Figma-confirmado). Vivo — clique na linha pra alternar `selected` (os Controls acompanham). */
export const Default: Story = {
  decorators: [(Story) => <div className="w-[650px]"><Story /></div>],
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <ArchiveBrowserModalListItem {...live} onClick={() => updateLive({ selected: !live.selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clique seleciona a linha (`aria-pressed`); Espaço desfaz.
  play: async ({ canvasElement }) => {
    const row = within(canvasElement).getByRole("button", { name: /Ceremonia-001\.jpg/ })
    await expect(row).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(row)
    await expect(row).toHaveAttribute("aria-pressed", "true")
    await userEvent.keyboard(" ")
    await expect(row).toHaveAttribute("aria-pressed", "false")
  },
}

/** `Property 1=ArchiveSelectableRow` (Figma-confirmado). */
export const Selected: Story = {
  args: { selected: true },
  decorators: [(Story) => <div className="w-[600px]"><Story /></div>],
}
