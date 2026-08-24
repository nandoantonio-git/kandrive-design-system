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
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-20215" },
  },
  args: { variant: "expanded" },
}

export const Collapsed: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-20485" },
  },
  args: { variant: "collapsed" },
}
