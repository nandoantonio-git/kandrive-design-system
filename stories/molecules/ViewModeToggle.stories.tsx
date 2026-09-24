import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { ViewModeToggle, type ViewMode } from "../../src/components/molecules/view-mode-toggle"

const meta = {
  title: "Molecules/ViewModeToggle",
  component: ViewModeToggle,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=622-3468' },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["grid", "list", "columns"],
    },
  },
  args: {
    mode: "grid",
  },
  render: (args) => {
    function Controlled() {
      const [mode, setMode] = useState<ViewMode>(args.mode)
      return <ViewModeToggle {...args} mode={mode} onModeChange={setMode} />
    }
    return <Controlled />
  },
} satisfies Meta<typeof ViewModeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Grid: Story = {
  args: { mode: "grid" },
}

export const List: Story = {
  args: { mode: "list" },
}

export const Columns: Story = {
  args: { mode: "columns" },
}
