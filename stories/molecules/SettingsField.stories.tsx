import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { SettingsField } from "../../src/components/molecules/settings-field"

const meta = {
  title: "Molecules/SettingsField",
  component: SettingsField,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3029-3843" } },
  argTypes: {
    type: { control: "radio", options: ["text", "email", "password"] },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
  args: { label: "Nome", type: "text", value: "", disabled: false },
  decorators: [(Story) => <div className="flex w-80"><Story /></div>],
} satisfies Meta<typeof SettingsField>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — digite no campo (os Controls acompanham o `value`). Campo "Nome" do card "Conta" (`settings-page`). */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <SettingsField {...live} onChange={(event) => updateLive({ value: event.target.value })} />
        )}
      </LiveArgs>
    )
  },
  // O campo aceita digitação e mostra o valor digitado.
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Nome")
    await userEvent.type(input, "Ana Souza")
    await expect(input).toHaveValue("Ana Souza")
  },
}

/** Campo de senha (card "Senha"). */
export const Password: Story = { args: { label: "Nova senha", type: "password", value: undefined } }

/** Campo do checkout (`payment-page`), com placeholder. */
export const WithPlaceholder: Story = {
  args: { label: "E-mail para recibo", type: "email", placeholder: "voce@email.com", value: undefined },
}

/** 🧩 Regra 8: disabled não desenhado no Figma. */
export const Disabled: Story = { args: { label: "E-mail", type: "email", value: undefined, disabled: true } }
