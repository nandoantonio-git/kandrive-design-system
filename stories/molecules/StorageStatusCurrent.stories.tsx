import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { StorageStatusCurrent } from "../../src/components/molecules/storage-status-current"

const meta = {
  title: "Molecules/Armazenamento/StorageStatus/Current",
  component: StorageStatusCurrent,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3020-29528' },
  },
  argTypes: {
    percent: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  args: {
    usedAmount: "40GB",
    totalAmount: "100GB",
    percent: 40,
    scopeAbbr: "AC",
  },
} satisfies Meta<typeof StorageStatusCurrent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onBuySpace: fn() },
  // "Comprar espaço" dispara `onBuySpace`.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Comprar espaço" }))
    await expect(args.onBuySpace).toHaveBeenCalledOnce()
  },
}

export const NearLimit: Story = {
  args: { usedAmount: "92GB", percent: 92 },
}
