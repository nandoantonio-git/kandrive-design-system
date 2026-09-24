import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLogin } from "../../src/components/organisms/card-login"

const meta = {
  title: "Organisms/CardLogin",
  component: CardLogin,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-22055' },
  },
} satisfies Meta<typeof CardLogin>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
