import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useState } from "react"

import { MethodOrganizeButton } from "../../src/components/molecules/method-organize-button"

const meta = {
  title: "Molecules/MethodOrganizeButton",
  component: MethodOrganizeButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1663-8802" } },
  argTypes: { method: { control: "radio", options: ["projeto", "data", "tipo"] } },
  args: { method: "projeto", withChevron: true, expanded: false },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
} satisfies Meta<typeof MethodOrganizeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** As 3 variantes do Figma: Project · Date · Type. */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <MethodOrganizeButton method="projeto" />
      <MethodOrganizeButton method="data" />
      <MethodOrganizeButton method="tipo" />
    </div>
  ),
}

/** Toque abre as outras opções logo abaixo (🧩 o Figma não desenha o estado aberto). */
export const Interactive: Story = {
  render: () => {
    function Picker() {
      const [method, setMethod] = useState<"projeto" | "data" | "tipo">("projeto")
      const [open, setOpen] = useState(false)
      return (
        <div className="flex flex-col gap-2">
          <MethodOrganizeButton method={method} expanded={open} onClick={() => setOpen(!open)} />
          {open
            ? (["projeto", "data", "tipo"] as const)
                .filter((m) => m !== method)
                .map((m) => <MethodOrganizeButton key={m} method={m} withChevron={false} onClick={() => { setMethod(m); setOpen(false) }} />)
            : null}
        </div>
      )
    }
    return <Picker />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /Por projeto/ }))
    await userEvent.click(canvas.getByRole("button", { name: /Por data/ }))
    await expect(canvas.getByRole("button", { name: /Por data/ })).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("button", { name: /Por projeto/ })).toBeNull()
  },
}
