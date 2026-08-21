import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { HomePage, type HomePageProps } from "../../src/components/pages/home-page"

const SIDEBAR_PROPS: HomePageProps["sidebarProps"] = {
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
  title: "Pages/Home",
  component: HomePage,
  parameters: { layout: "fullscreen" },
  args: {
    sidebarProps: SIDEBAR_PROPS,
  },
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const GridMode: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-19639" },
  },
  args: {
    viewMode: "grid",
    gridItems: [
      { name: "Arquivo 1", kind: "folder" },
      { name: "Arquivo 2", kind: "image" },
      { name: "Arquivo 3", kind: "folder", interactive: true },
    ],
  },
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <HomePage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}

export const ListMode: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-19791" },
  },
  args: {
    viewMode: "list",
    listRows: [
      { fileName: "Arquivo 1", owner: "Proprietário", size: "100MB" },
      { fileName: "Arquivo 2", owner: "Proprietário", size: "45MB" },
      { fileName: "Arquivo 3", owner: "Proprietário", size: "2.1GB" },
    ],
  },
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <HomePage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}

export const ColumnsMode: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-19829" },
  },
  args: {
    viewMode: "columns",
    columnsRows: [{ name: "Arquivo 1" }, { name: "Arquivo 2" }, { name: "Arquivo 3" }],
    previewFile: {
      name: "Arquivo 1",
      owner: "Cassandra Weber",
      createdAt: "Oct 12, 2023",
      size: "2.4 MB",
      location: "/Corporate/Legal",
      format: "PDF",
    },
  },
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <HomePage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}
