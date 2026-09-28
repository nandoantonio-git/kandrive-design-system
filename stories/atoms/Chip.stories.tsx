import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { Chip } from "../../src/components/atoms/chip"

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3028-3707" } },
  argTypes: { selected: { control: "boolean" }, children: { control: "text" } },
  args: { children: "Conta", selected: false },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `selected` (os Controls acompanham). */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <Chip {...live} onClick={() => updateLive({ selected: !live.selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clique marca o chip (`aria-pressed`); segundo clique desmarca.
  play: async ({ canvasElement }) => {
    const chip = within(canvasElement).getByRole("button", { name: "Conta" })
    await expect(chip).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(chip)
    await expect(chip).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(chip)
    await expect(chip).toHaveAttribute("aria-pressed", "false")
  },
}
export const Selected: Story = { args: { selected: true } }
