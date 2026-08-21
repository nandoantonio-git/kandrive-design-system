import type { Meta, StoryObj } from "@storybook/react-vite"

import { CleanSpaceLargeFiles } from "../../src/components/organisms/clean-space-large-files"

const meta = {
  title: "Organisms/CleanSpaceLargeFiles",
  component: CleanSpaceLargeFiles,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1554-21264" },
  },
  args: {
    files: [
      { name: "huge-backup.zip", meta: "ZIP · 476.84 MB · Aug 5, 2026", tier: "current" },
      { name: "medium-report.pdf", meta: "PDF · 9.54 MB · Aug 5, 2026", tier: "current" },
      { name: "small-note.txt", meta: "TXT · 1 KB · Aug 5, 2026", tier: "long term" },
    ],
  },
} satisfies Meta<typeof CleanSpaceLargeFiles>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
