import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { ActionPill } from "../../src/components/molecules/action-pill"

const meta = {
  title: "Molecules/Navegação/ActionPill",
  component: ActionPill,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=517-3818' },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
    actions: [
      { name: "Help", label: "Ajuda", onClick: () => {} },
      { name: "Settings", label: "Configurações", onClick: () => {} },
      { name: "Account", label: "Conta", onClick: () => {} },
    ],
  },
} satisfies Meta<typeof ActionPill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    actions: [
      { name: "Help", label: "Ajuda", onClick: fn() },
      { name: "Settings", label: "Configurações", onClick: fn() },
      { name: "Account", label: "Conta", onClick: fn() },
    ],
  },
  // Cada botão dispara o `onClick` da própria ação.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Configurações" }))
    await expect(args.actions[1].onClick).toHaveBeenCalledOnce()
    await expect(args.actions[0].onClick).not.toHaveBeenCalled()
  },
}

export const Disabled: Story = {
  args: { disabled: true, actions: [{ name: "Help", label: "Ajuda", onClick: fn() }] },
  // Desabilitado: o clique não dispara a ação.
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Ajuda" })
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.actions[0].onClick).not.toHaveBeenCalled()
  },
}
