import type { Meta, StoryObj } from "@storybook/react-vite"

import { ArchiveBrowserModal } from "../../src/components/templates/archive-browser-modal"

const meta = {
  title: "Templates/ArchiveBrowserModal",
  component: ArchiveBrowserModal,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1439-16909' } },
  args: {
    breadcrumb: ["Pessoal", "Fotos", "Casamento Ana & Bruno"],
    files: [
      { name: "Ceremonia-001.jpg", meta: "JPG · 7.82 MB · 19 Jun" },
      { name: "Ceremonia-002.jpg", meta: "JPG · 7.53 MB · 19 Jun" },
      { name: "Festa-014.jpg", meta: "JPG · 8.68 MB · 19 Jun" },
    ],
    selectedCount: 2,
    savingsLabel: "15.35 MB",
  },
} satisfies Meta<typeof ArchiveBrowserModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
