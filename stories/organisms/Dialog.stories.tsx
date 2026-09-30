import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { Dialog } from "../../src/components/organisms/dialog"

const meta = {
  title: "Organisms/Conta e diálogos/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3334-37789' },
  },
  args: { onConfirm: fn(), onCancel: fn() },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Destructive: Story = {
  args: { type: "destructive", device: "desktop" },
  // Foco começa no Cancelar (a opção segura); Cancelar e Esc chamam `onCancel`; "Excluir conta" chama `onConfirm`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alertdialog", { name: "Excluir conta?" })).toBeVisible()
    const cancel = canvas.getByRole("button", { name: "Cancelar" })
    await expect(cancel).toHaveFocus()
    await userEvent.click(cancel)
    await expect(args.onCancel).toHaveBeenCalledTimes(1)
    await userEvent.keyboard("{Escape}")
    await expect(args.onCancel).toHaveBeenCalledTimes(2)
    await userEvent.click(canvas.getByRole("button", { name: "Excluir conta" }))
    await expect(args.onConfirm).toHaveBeenCalledOnce()
  },
}

export const DestructiveMobile: Story = {
  args: { type: "destructive", device: "mobile" },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
}

/** Mesmo aviso em 342px; usado no "Fora do escopo deste case" do protótipo Mobile. */
export const InfoMobile: Story = {
  args: { type: "info", device: "mobile" },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
}

export const Info: Story = {
  args: { type: "info" },
  // Ação única: "Entendi" e Esc chamam `onConfirm`; não há Cancelar.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("dialog", { name: "Falar com o suporte" })).toBeVisible()
    await expect(canvas.queryByRole("button", { name: "Cancelar" })).toBeNull()
    const ok = canvas.getByRole("button", { name: "Entendi" })
    await expect(ok).toHaveFocus()
    await userEvent.click(ok)
    await userEvent.keyboard("{Escape}")
    await expect(args.onConfirm).toHaveBeenCalledTimes(2)
  },
}

export const CustomText: Story = {
  args: {
    type: "destructive",
    title: "Excluir pasta e arquivos?",
    description: "A pasta e tudo dentro dela vão para a Lixeira, onde ficam por 30 dias.",
    confirmLabel: "Excluir pasta",
  },
}
