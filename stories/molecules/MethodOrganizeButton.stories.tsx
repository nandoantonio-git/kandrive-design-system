import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { MethodOrganizeButton, type MobileOrganizeMethod } from "../../src/components/molecules/method-organize-button"
import { MethodCard } from "../../src/components/molecules/method-card"

const meta = {
  title: "Molecules/MethodOrganizeButton",
  component: MethodOrganizeButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1663-8802" } },
  argTypes: { method: { control: "radio", options: ["projeto", "data", "tipo"] } },
  decorators: [(Story) => <div className="w-[323px]"><Story /></div>],
} satisfies Meta<typeof MethodOrganizeButton>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Vivo: a mesma composição da tela `Organize/ChooseMethod/Mobile`. O botão
 * abre o `molecule/MethodCard` (`3020:29527`) logo abaixo; escolher um
 * método fecha o card e atualiza o botão. Só componentes do design system,
 * sem peça criada para a demo.
 */
export const Default: Story = {
  render: function Render(args) {
    const [method, setMethod] = React.useState<MobileOrganizeMethod>(args.method ?? "projeto")
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex flex-col gap-2">
        <MethodOrganizeButton {...args} method={method} expanded={open} onClick={() => setOpen((value) => !value)} />
        {open ? (
          <MethodCard
            value={method}
            onValueChange={(next) => {
              setMethod(next)
              setOpen(false)
            }}
          />
        ) : null}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /Por projeto/ })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(canvas.getByRole("radio", { name: /Por data/ }))
    await expect(canvas.queryByRole("radiogroup")).toBeNull()
    await expect(canvas.getByRole("button", { name: /Por data/ })).toHaveAttribute("aria-expanded", "false")
  },
}

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

/** Estado fixo: aberto (chevron para cima), sem o card. */
export const Expanded: Story = {
  args: { method: "projeto", expanded: true },
}
