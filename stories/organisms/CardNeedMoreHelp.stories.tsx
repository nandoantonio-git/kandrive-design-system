import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardNeedMoreHelp } from "../../src/components/organisms/card-need-more-help"

const meta = {
  title: "Organisms/CardNeedMoreHelp",
  component: CardNeedMoreHelp,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-20981' },
  },
} satisfies Meta<typeof CardNeedMoreHelp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
