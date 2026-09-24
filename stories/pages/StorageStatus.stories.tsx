import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { StorageStatusPage, type StorageStatusPageProps } from "../../src/components/pages/storage-status-page"
import type { StorageScope } from "../../src/components/molecules/storage-status"

const SIDEBAR_PROPS: StorageStatusPageProps["sidebarProps"] = {
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
  title: "Pages/StorageStatus",
  component: StorageStatusPage,
  parameters: { layout: "fullscreen" },
  args: {
    sidebarProps: SIDEBAR_PROPS,
    usedAmount: "20 GB",
    totalAmount: "30 GB",
    percent: 66,
    fileTypeSegments: [
      { kind: "image", value: 40 },
      { kind: "document", value: 30 },
      { kind: "video", value: 20 },
      { kind: "other", value: 10 },
    ],
  },
} satisfies Meta<typeof StorageStatusPage>

export default meta
type Story = StoryObj<typeof meta>

function controlled(initial: StorageScope) {
  return (args: StorageStatusPageProps) => {
    function Controlled() {
      const [scope, setScope] = useState<StorageScope>(initial)
      return <StorageStatusPage {...args} scope={scope} onScopeChange={setScope} />
    }
    return <Controlled />
  }
}

export const Global: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=231-4553" },
  },
  render: controlled("global"),
}

export const QuickAccess: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=231-4553" },
  },
  args: { usedLabel: "20 GB em uso", freeLabel: "10 GB livre" },
  render: controlled("quick-access"),
}

export const LongTerm: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=231-4553" },
  },
  args: { usedLabel: "1 TB em uso", freeLabel: "1 TB livre" },
  render: controlled("long-term"),
}
