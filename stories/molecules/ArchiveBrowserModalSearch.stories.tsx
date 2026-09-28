import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { ArchiveBrowserModalSearch } from "../../src/components/molecules/archive-browser-modal-search"

const meta = {
  title: "Molecules/ArchiveBrowserModal/Search",
  component: ArchiveBrowserModalSearch,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1485-21074' },
  },
  args: {
    breadcrumb: ["Pessoal", "Fotos", "Casamento Ana & Bruno"],
    files: [
      { fileName: "Ceremonia-001.jpg", meta: "JPG · 7.82 MB · 19 Jun" },
      { fileName: "Ceremonia-002.jpg", meta: "JPG · 7.53 MB · 19 Jun" },
      { fileName: "Festa-014.jpg", meta: "JPG · 8.68 MB · 19 Jun" },
    ],
  },
} satisfies Meta<typeof ArchiveBrowserModalSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    files: [
      { fileName: "Ceremonia-001.jpg", meta: "JPG · 7.82 MB · 19 Jun", onClick: fn() },
      { fileName: "Ceremonia-002.jpg", meta: "JPG · 7.53 MB · 19 Jun" },
      { fileName: "Festa-014.jpg", meta: "JPG · 8.68 MB · 19 Jun" },
    ],
  },
  decorators: [(Story) => <div className="w-[452px]"><Story /></div>],
  // O campo de busca aceita digitação e a linha com `onClick` é clicável.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const search = canvas.getByRole("searchbox", { name: "Buscar arquivos, pastas ou templates" })
    await userEvent.type(search, "Festa")
    await expect(search).toHaveValue("Festa")
    await userEvent.click(canvas.getByRole("button", { name: /Ceremonia-001\.jpg/ }))
    await expect(args.files[0].onClick).toHaveBeenCalledOnce()
  },
}
