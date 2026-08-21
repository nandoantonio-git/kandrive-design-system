import type { Meta, StoryObj } from "@storybook/react-vite"

import { SaveLongTermFileStorageSelectedFiles } from "../../src/components/organisms/save-long-term-file-storage-selected-files"

const meta = {
  title: "Organisms/SaveLongTermFileStorageSelectedFiles",
  component: SaveLongTermFileStorageSelectedFiles,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1555-21357" },
  },
  args: {
    files: [
      { name: "Relatório-2026.pdf", meta: "PDF · 2.1 MB" },
      { name: "Contratos.zip", meta: "ZIP · 45 MB" },
      { name: "huge-backup.zip", meta: "ZIP · 476.84 MB" },
    ],
  },
} satisfies Meta<typeof SaveLongTermFileStorageSelectedFiles>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
