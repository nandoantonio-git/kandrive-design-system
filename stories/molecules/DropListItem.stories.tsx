import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { DropListItem } from "../../src/components/molecules/drop-list-item"

const meta = {
  title: "Molecules/DropListItem",
  component: DropListItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1440-23803' },
  },
  argTypes: {
    active: { control: "boolean" },
  },
  args: {
    label: "Nova pasta",
    active: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[191px] rounded-md border border-zinc-100 bg-white shadow-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropListItem>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `active` (os Controls acompanham). */
export const Idle: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <DropListItem {...live} onClick={() => updateLive({ active: !live.active })} />
        )}
      </LiveArgs>
    )
  },
  // Clique dispara `onClick`, que aqui alterna `active` (estado Pressed).
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "Nova pasta" })
    await expect(item).not.toHaveAttribute("data-active")
    await userEvent.click(item)
    await expect(item).toHaveAttribute("data-active", "true")
  },
}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Active: Story = {
  args: { state: "pressed" },
}
