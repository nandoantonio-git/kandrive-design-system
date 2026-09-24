import type { Meta, StoryObj } from "@storybook/react-vite"

import { PaymentPage } from "../../src/components/pages/payment-page"

const meta = {
  title: "Pages/Payment",
  component: PaymentPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PaymentPage>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12477" },
  },
  args: { variant: "expanded" },
}

export const Collapsed: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12477" },
  },
  args: { variant: "collapsed" },
}
