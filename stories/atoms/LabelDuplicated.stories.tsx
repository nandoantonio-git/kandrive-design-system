import type { Meta, StoryObj } from "@storybook/react-vite"

import { LabelDuplicated } from "../../src/components/atoms/label-duplicated"

const meta = {
  title: "Atoms/Label/Duplicated",
  component: LabelDuplicated,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1439-16874' },
  },
  args: {
    label: "Duplicado",
  },
} satisfies Meta<typeof LabelDuplicated>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
