import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { UserProfileCard } from "../../src/components/organisms/user-profile-card"

const meta = {
  title: "Organisms/Conta e diálogos/UserProfileCard",
  component: UserProfileCard,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1702-22547" } },
  args: { name: "Cassandra Ribeiro", email: "cassandra@kandrive.com.br" },
} satisfies Meta<typeof UserProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onEditProfile: fn(), onSwitchAccount: fn() },
  // "Editar perfil" e "Trocar conta" chamam cada um o próprio callback.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Editar perfil" }))
    await expect(args.onEditProfile).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole("button", { name: "Trocar conta" }))
    await expect(args.onSwitchAccount).toHaveBeenCalledOnce()
  },
}

const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })
/** Mobile · 390: ações abaixo da identidade, dividindo a largura. */
export const Mobile: Story = { globals: vp("kdMobile") }
