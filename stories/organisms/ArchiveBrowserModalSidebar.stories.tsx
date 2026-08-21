import type { Meta, StoryObj } from "@storybook/react-vite"

import { ArchiveBrowserModalSidebar } from "../../src/components/organisms/archive-browser-modal-sidebar"

const meta = {
  title: "Organisms/ArchiveBrowserModalSidebar",
  component: ArchiveBrowserModalSidebar,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1555-21309" },
  },
} satisfies Meta<typeof ArchiveBrowserModalSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
