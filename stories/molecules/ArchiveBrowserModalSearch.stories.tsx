import type { Meta, StoryObj } from "@storybook/react-vite"

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
  decorators: [(Story) => <div className="w-[452px]"><Story /></div>],
}
