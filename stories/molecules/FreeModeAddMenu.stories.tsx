import type { Meta, StoryObj } from "@storybook/react-vite"

import { FreeModeAddMenu } from "../../src/components/molecules/free-mode-add-menu"

const meta = {
  title: "Molecules/FreeModeAddMenu",
  component: FreeModeAddMenu,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1394-16574" },
  },
} satisfies Meta<typeof FreeModeAddMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
