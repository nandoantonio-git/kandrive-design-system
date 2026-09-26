import type { Meta, StoryObj } from "@storybook/react-vite"

import { ThumbnailLarge } from "../../src/components/molecules/thumbnail-large"

const meta = {
  title: "Molecules/ThumbnailLarge",
  component: ThumbnailLarge,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=790-3663' },
  },
  argTypes: {
    fileType: { control: "select", options: ["image", "document"] },
  },
  args: {
    fileType: "image",
    pageLabel: "Page 1 of 12",
  },
} satisfies Meta<typeof ThumbnailLarge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Document: Story = {
  args: { fileType: "document" },
}
