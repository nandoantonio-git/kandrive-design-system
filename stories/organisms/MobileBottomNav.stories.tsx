import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { MobileBottomNav, type MobileDestination } from "../../src/components/organisms/mobile-bottom-nav"
import { mobileFrame } from "../../.storybook/mobile-frame"

const meta = {
  title: "Organisms/Navegação/MobileBottomNav",
  component: MobileBottomNav,
  parameters: { layout: "fullscreen", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1715-9867" } },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  argTypes: {
    action: { control: "radio", options: ["add", "confirm", "none"] },
    hand: { control: "radio", options: ["right", "left"] },
    active: { control: "radio", options: ["pessoal", "compartilhados", "recentes", "favoritos"] },
  },
  args: { action: "add", hand: "right", active: "pessoal" },
  decorators: [(Story) => <div className="flex min-h-[300px] flex-col justify-end bg-neutral-surface-background"><Story /></div>, mobileFrame],
} satisfies Meta<typeof MobileBottomNav>

export default meta
type Story = StoryObj<typeof meta>

/** Telas de arquivos e Storage. Figma: `Action=Add, Hand=Right`. */
export const AddRight: Story = {}
/** Mão esquerda (Settings → Aparência). Figma: `Action=Add, Hand=Left`. */
export const AddLeft: Story = { args: { hand: "left" } }
/** Telas de tarefa: confirmar ou cancelar (volta para a Home). Figma: `Action=Confirm, Hand=Left`. */
export const Confirm: Story = { args: { action: "confirm", hand: "left" } }
/** Sem FAB: a barra fica reta. Figma: `Action=None, Hand=Right`. */
export const None: Story = { args: { action: "none" } }

export const Interactive: Story = {
  args: { onAction: fn() },
  render: function Render(args) {
    const [active, setActive] = React.useState<MobileDestination>(args.active ?? "pessoal")
    return <MobileBottomNav {...args} active={active} onNavigate={setActive} />
  },
  // Tocar num destino o torna o atual (`aria-current="page"`); o FAB chama `onAction`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const recent = canvas.getByRole("button", { name: "Recentes" })
    await userEvent.click(recent)
    await expect(recent).toHaveAttribute("aria-current", "page")
    await expect(canvas.getByRole("button", { name: "Pessoal" })).not.toHaveAttribute("aria-current")
    await userEvent.click(canvas.getByRole("button", { name: "Adicionar" }))
    await expect(args.onAction).toHaveBeenCalledOnce()
  },
}
