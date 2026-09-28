import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { RadioButton } from "../../src/components/molecules/radio-button"

const meta = {
  title: "Molecules/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-24721' },
  },
  argTypes: {
    option: {
      control: "radio",
      options: ["personal", "saved"],
    },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    option: "personal",
    checked: false,
  },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const Personal: Story = {
  args: { option: "personal", checked: true },
}

export const Saved: Story = {
  args: { option: "saved", checked: false },
}

export const Disabled: Story = {
  args: { option: "personal", disabled: true, onCheckedChange: fn() },
  // Desabilitado: o clique não marca nem chama `onCheckedChange`.
  play: async ({ args, canvasElement }) => {
    const radio = within(canvasElement).getByRole("radio", { name: "Pessoal" })
    await expect(radio).toBeDisabled()
    await userEvent.click(radio, { pointerEventsCheck: 0 })
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
    await expect(radio).not.toBeChecked()
  },
}

/** Grupo controlado — só uma opção fica marcada por vez (feedback real no clique, Regra 8). */
export const Group: StoryObj = {
  render: function RadioGroup() {
    const [selected, setSelected] = React.useState<string>("personal")
    return (
      <div className="flex flex-col gap-2">
        <RadioButton option="personal" name="origem" checked={selected === "personal"} onCheckedChange={setSelected} />
        <RadioButton option="saved" name="origem" checked={selected === "saved"} onCheckedChange={setSelected} />
      </div>
    )
  },
  // Clique marca só uma opção; as setas trocam a opção marcada.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const personal = canvas.getByRole("radio", { name: "Pessoal" })
    const saved = canvas.getByRole("radio", { name: "Guardados" })
    await userEvent.click(saved)
    await expect(saved).toBeChecked()
    await expect(personal).not.toBeChecked()
    await userEvent.keyboard("{ArrowUp}")
    await expect(personal).toBeChecked()
    await expect(saved).not.toBeChecked()
  },
}
