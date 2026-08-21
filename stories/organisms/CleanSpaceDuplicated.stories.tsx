import type { Meta, StoryObj } from "@storybook/react-vite"

import { CleanSpaceDuplicated } from "../../src/components/organisms/clean-space-duplicated"

const meta = {
  title: "Organisms/CleanSpaceDuplicated",
  component: CleanSpaceDuplicated,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1554-21265" },
  },
  args: {
    groups: [
      { name: "Contrato-Fornecedor (3 versões)", copiesLabel: "3 cópias · 4.58 MB" },
      { name: "Backup-Financeiro (2 versões)", copiesLabel: "2 cópias · 2.98 GB" },
    ],
  },
} satisfies Meta<typeof CleanSpaceDuplicated>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
