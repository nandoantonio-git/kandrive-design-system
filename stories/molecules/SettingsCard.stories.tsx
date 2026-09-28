import type { Meta, StoryObj } from "@storybook/react-vite"

import { SettingsCard } from "../../src/components/molecules/settings-card"
import { SettingsField } from "../../src/components/molecules/settings-field"
import { Button } from "../../src/components/atoms/button"

const meta = {
  title: "Molecules/SettingsCard",
  component: SettingsCard,
  parameters: { layout: "padded" },
  args: { title: "Senha", caption: "Altere sua senha" },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
} satisfies Meta<typeof SettingsCard>

export default meta
type Story = StoryObj<typeof meta>

/** Card "Senha" de Settings → Conta (`settings-page`). */
export const Default: Story = {
  render: (args) => (
    <SettingsCard {...args}>
      <SettingsField label="Senha atual" type="password" className="w-full" />
      <SettingsField label="Nova senha" type="password" className="w-full" />
      <SettingsField label="Confirmar nova senha" type="password" className="w-full" />
      <Button>Atualizar senha</Button>
    </SettingsCard>
  ),
}

/** Só o cabeçalho (título + legenda), sem conteúdo. */
export const HeaderOnly: Story = {
  args: { title: "Notificações", caption: "Escolha o que você quer ser avisado" },
}
