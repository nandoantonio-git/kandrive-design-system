import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { Switch } from "../../src/components/atoms/switch"

const meta = {
  title: "Atoms/Formulário/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-20959' },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    "aria-label": "Notificações por e-mail",
    checked: false,
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  args: { checked: false },
}

export const On: Story = {
  args: { checked: true },
}

export const Disabled: Story = {
  args: { checked: false, disabled: true, onCheckedChange: fn() },
  // Desabilitado: o clique não chama `onCheckedChange`.
  play: async ({ args, canvasElement }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Notificações por e-mail" })
    await userEvent.click(toggle, { pointerEventsCheck: 0 })
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
    await expect(toggle).toHaveAttribute("aria-checked", "false")
  },
}

/** Controlado — clique alterna `checked` de verdade (feedback real no press/release, Regra 8). */
export const Interactive: Story = {
  render: function InteractiveSwitch(args) {
    const [checked, setChecked] = React.useState(args.checked ?? false)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
  },
  // Clique liga; Espaço (teclado) desliga.
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Notificações por e-mail" })
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
    await userEvent.keyboard(" ")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
  },
}
