import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useState } from "react"

import { PlanSelection, type PlanInterval } from "../../src/components/organisms/plan-selection"

const meta = {
  title: "Organisms/Armazenamento/PlanSelection",
  component: PlanSelection,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-25057' },
  },
  argTypes: {
    interval: {
      control: "select",
      options: ["monthly", "annual"],
    },
  },
  args: {
    interval: "annual",
  },
} satisfies Meta<typeof PlanSelection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    function Controlled() {
      const [interval, setInterval] = useState<PlanInterval>(args.interval ?? "annual")
      return <PlanSelection {...args} interval={interval} onIntervalChange={setInterval} />
    }
    return <Controlled />
  },
  args: { onSelectPlan: fn() },
  // "Mensal" troca o intervalo e os preços; "Melhorar" torna o Max o plano atual.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const monthly = canvas.getByRole("tab", { name: "Mensal" })
    await userEvent.click(monthly)
    await expect(monthly).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByText("$12")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Melhorar" }))
    await expect(args.onSelectPlan).toHaveBeenCalledWith(expect.objectContaining({ id: "max" }))
    await expect(canvas.queryByRole("button", { name: "Melhorar" })).toBeNull()
    await expect(canvas.getAllByRole("button", { name: "Mudar plano" })).toHaveLength(2)
  },
}

export const Monthly: Story = {
  args: { interval: "monthly" },
}
