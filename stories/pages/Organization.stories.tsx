import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { OrganizationPage, type OrganizationPageProps } from "../../src/components/pages/organization-page"

const SIDEBAR_PROPS: OrganizationPageProps["sidebarProps"] = {
  activePage: "Pessoal",
  tags: ["Image", "Contratos"],
  storageProps: {
    quickAccessValue: 66,
    quickAccessLabel: "20 GB de 30 GB usados",
    longTermValue: 50,
    longTermLabel: "1 TB de 2 TB usados",
  },
}

const meta = {
  title: "Pages/Organization",
  component: OrganizationPage,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-19678" },
  },
  args: {
    sidebarProps: SIDEBAR_PROPS,
    viewMode: "grid",
    gridItems: [
      { name: "Arquivo 1", kind: "folder" },
      { name: "Arquivo 2", kind: "image" },
      { name: "Arquivo 3", kind: "folder", interactive: true },
    ],
  },
} satisfies Meta<typeof OrganizationPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <OrganizationPage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}

export const ModalClosed: Story = {
  args: { modalOpen: false },
}
