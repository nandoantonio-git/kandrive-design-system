import type { Meta, StoryObj } from "@storybook/react-vite"

import { FreeModeAddMenu } from "../../src/components/molecules/free-mode-add-menu"

const meta = {
  title: "Molecules/FreeModeAddMenu",
  component: FreeModeAddMenu,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1431-20042" },
  },
} satisfies Meta<typeof FreeModeAddMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
