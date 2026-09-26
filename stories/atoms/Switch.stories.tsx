import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Switch } from "../../src/components/atoms/switch"

const meta = {
  title: "Atoms/Switch",
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
  args: { checked: false, disabled: true },
}

/** Controlado — clique alterna `checked` de verdade (feedback real no press/release, Regra 8). */
export const Interactive: Story = {
  render: function InteractiveSwitch(args) {
    const [checked, setChecked] = React.useState(args.checked ?? false)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
  },
}
