import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Checkbox } from "../../src/components/atoms/checkbox"

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3051-9590" },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { "aria-label": "Selecionar arquivo", size: "sm", checked: false },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Clique, Espaço ou Enter alternam o estado. */
export const Interactive: Story = {
  render: function Render(args) {
    const [checked, setChecked] = React.useState(args.checked ?? false)
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
  },
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole("checkbox")
    await expect(box).toHaveAttribute("aria-checked", "false")
    await userEvent.click(box)
    await expect(box).toHaveAttribute("aria-checked", "true")
    await userEvent.keyboard(" ")
    await expect(box).toHaveAttribute("aria-checked", "false")
  },
}

export const SmChecked: Story = { args: { checked: true } }

/** MD desmarcado: Figma-confirmado nas telas mobile. */
export const Md: Story = { args: { size: "md" } }

/** 🧩 MD marcado: no Figma é o SM marcado ampliado. */
export const MdChecked: Story = { args: { size: "md", checked: true } }

/** As 4 variantes do Figma (Size × Selected). */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-3 text-xs text-zinc-600 dark:text-zinc-300">
      <span />
      <span>false</span>
      <span>true</span>
      {(["sm", "md"] as const).map((size) => (
        <React.Fragment key={size}>
          <span>{size}</span>
          <Checkbox size={size} aria-label={`${size} desmarcado`} />
          <Checkbox size={size} checked aria-label={`${size} marcado`} />
        </React.Fragment>
      ))}
    </div>
  ),
}
