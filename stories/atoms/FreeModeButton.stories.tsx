import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { FreeModeButton } from "../../src/components/atoms/free-mode-button"

const meta = {
  title: "Atoms/Ações/FreeModeButton",
  component: FreeModeButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1384-16745" } },
  args: { label: "Adicionar regra", onClick: fn() },
  decorators: [(Story) => <div className="w-[338px] rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800"><Story /></div>],
} satisfies Meta<typeof FreeModeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: "w-full" },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Adicionar regra" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
export const Disabled: Story = { args: { className: "w-full", disabled: true } }
