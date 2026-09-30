import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { SidebarOption } from "../../src/components/atoms/sidebar-option"
import { mobileFrame } from "../../.storybook/mobile-frame"

const OPTIONS = ["keep", "share", "storage", "trash", "tags", "settings", "help"] as const

const meta = {
  title: "Atoms/Ações/SidebarOption",
  component: SidebarOption,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1643-23462" } },
  argTypes: { option: { control: "select", options: OPTIONS } },
  args: { option: "keep", onClick: fn() },
  decorators: [(Story) => <div className="w-[192px]"><Story /></div>],
} satisfies Meta<typeof SidebarOption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Guardados" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Current: Story = {
  args: { current: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("button", { name: "Guardados" })).toHaveAttribute("aria-current", "page")
  },
}

export const WithDetail: Story = { args: { option: "trash", detail: "12" } }

export const AllOptions: Story = {
  decorators: [mobileFrame],
  render: () => (
    <div className="flex flex-col gap-1 p-4">
      {OPTIONS.map((option) => (
        <SidebarOption key={option} option={option} />
      ))}
    </div>
  ),
}
