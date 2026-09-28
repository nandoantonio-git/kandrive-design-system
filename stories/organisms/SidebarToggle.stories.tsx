import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { SidebarToggle } from "../../src/components/organisms/sidebar-toggle"

const meta = {
  title: "Organisms/Sidebar/Toggle",
  component: SidebarToggle,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=624-4573' } },
  argTypes: {
    expanded: { control: "boolean" },
    state: { control: "select", options: ["idle", "hover", "pressed"] },
    label: { control: "text" },
  },
  args: {
    label: "Armazenamento",
    expanded: true,
    state: "idle",
  },
  decorators: [(Story) => <div className="w-60"><Story /></div>],
} satisfies Meta<typeof SidebarToggle>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra expandir/recolher (`expanded`; os Controls acompanham). */
export const Expanded: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => <SidebarToggle {...live} onToggle={() => updateLive({ expanded: !live.expanded })} />}
      </LiveArgs>
    )
  },
  // Clique recolhe (`aria-expanded=false`); Enter expande de novo.
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("button", { name: "Armazenamento" })
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await userEvent.keyboard("{Enter}")
    await expect(toggle).toHaveAttribute("aria-expanded", "true")
  },
}

export const Collapsed: Story = {
  args: { expanded: false },
}

export const ExpandedHover: Story = {
  args: { expanded: true, state: "hover" },
}

export const ExpandedPressed: Story = {
  args: { expanded: true, state: "pressed" },
}

export const CollapsedHover: Story = {
  args: { expanded: false, state: "hover" },
}

export const CollapsedPressed: Story = {
  args: { expanded: false, state: "pressed" },
}
