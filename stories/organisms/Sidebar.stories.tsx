import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Sidebar } from "../../src/components/organisms/sidebar"

const meta = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=197-6187' } },
  args: {
    activePage: "Pessoal",
    tags: ["Image", "Contratos"],
    storageProps: {
      quickAccessValue: 66,
      quickAccessLabel: "20 GB de 30 GB usados",
      longTermValue: 50,
      longTermLabel: "1 TB de 2 TB usados",
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    function Controlled() {
      const [collapsed, setCollapsed] = useState(false)
      return <Sidebar {...args} collapsed={collapsed} onCollapsedChange={setCollapsed} />
    }
    return <Controlled />
  },
}

export const WithoutTags: Story = {
  args: { tags: [] },
}

export const Collapsed: Story = {
  render: (args) => {
    function Controlled() {
      const [collapsed, setCollapsed] = useState(true)
      return <Sidebar {...args} collapsed={collapsed} onCollapsedChange={setCollapsed} />
    }
    return <Controlled />
  },
}
