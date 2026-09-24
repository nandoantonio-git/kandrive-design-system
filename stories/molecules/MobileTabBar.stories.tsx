import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { MobileTabBar, type MobileTab } from "../../src/components/molecules/mobile-tab-bar"

const meta = {
  title: "Molecules/MobileTabBar",
  component: MobileTabBar,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3029-3996" } },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  argTypes: { active: { control: "radio", options: ["home", "organize", "keep"] } },
  args: { active: "home" },
} satisfies Meta<typeof MobileTabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: function Render(args) {
    const [tab, setTab] = React.useState<MobileTab>(args.active ?? "home")
    return <MobileTabBar {...args} active={tab} onTabChange={setTab} />
  },
}
