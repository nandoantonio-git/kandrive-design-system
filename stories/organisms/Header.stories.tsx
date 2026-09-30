import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { Header } from "../../src/components/organisms/header"

const meta = {
  title: "Organisms/Navegação/Header",
  component: Header,
  parameters: { layout: "fullscreen", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1255-22352' } },
  args: {
    page: "navbar",
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Navbar: Story = {
  args: { onOrganize: fn(), onSave: fn(), onAvatarClick: fn(), onLogoClick: fn((event) => event.preventDefault()) },
  // Tablet e desktop: "Organizar", "Guardar" e "Conta" chamam cada um o próprio callback; o logo é o link para o início.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Organizar" }))
    await expect(args.onOrganize).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole("button", { name: "Guardar" }))
    await expect(args.onSave).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole("button", { name: "Conta" }))
    await expect(args.onAvatarClick).toHaveBeenCalledOnce()
    const home = canvas.getByRole("link", { name: "Kandrive, ir para o início" })
    await expect(home).toHaveAttribute("href", "/")
    await userEvent.click(home)
    await expect(args.onLogoClick).toHaveBeenCalledOnce()
  },
}

export const Settings: Story = {
  args: { page: "settings" },
}

export const Storage: Story = {
  args: { page: "storage" },
}
