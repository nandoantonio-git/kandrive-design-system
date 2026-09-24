import type { Meta, StoryObj } from "@storybook/react-vite"

import { DropNewTag } from "../../src/components/organisms/drop-new-tag"

const meta = {
  title: "Organisms/DropNewTag",
  component: DropNewTag,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1444-21624' } },
  args: {
    label: "",
    color: "success",
  },
} satisfies Meta<typeof DropNewTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: "Contratos", color: "primary" },
}
