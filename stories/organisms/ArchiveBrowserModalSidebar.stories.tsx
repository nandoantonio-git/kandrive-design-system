import type { Meta, StoryObj } from "@storybook/react-vite"

import { ArchiveBrowserModalSidebar } from "../../src/components/organisms/archive-browser-modal-sidebar"

const meta = {
  title: "Organisms/ArchiveBrowserModalSidebar",
  component: ArchiveBrowserModalSidebar,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1555-21309" },
  },
} satisfies Meta<typeof ArchiveBrowserModalSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
