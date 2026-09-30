import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import ClearButtonGlyph from "../../src/assets/icons/ClearButtonGlyph.svg?react"
import ConfirmButtonGlyph from "../../src/assets/icons/ConfirmButtonGlyph.svg?react"
import DeleteButtonGlyph from "../../src/assets/icons/DeleteButtonGlyph.svg?react"
import { IconActionButton } from "../../src/components/atoms/icon-action-button"

const meta = {
  title: "Atoms/Ações/IconButton/IconActionButton",
  component: IconActionButton,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=174-384' },
  },
  argTypes: {
    // O glifo é um componente SVG — não editável pelo painel de Controls.
    icon: { control: false },
    label: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    iconClassName: { control: "text" },
  },
  args: {
    icon: ConfirmButtonGlyph,
    label: "Confirmar",
    disabled: false,
    className: "text-neutral-text-tertiary dark:text-zinc-400",
  },
} satisfies Meta<typeof IconActionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onClick: fn() },
  // Clique dispara o callback `onClick`.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Confirmar" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Glyphs: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <IconActionButton {...args} icon={ConfirmButtonGlyph} label="Confirmar" />
      <IconActionButton {...args} icon={ClearButtonGlyph} label="Cancelar" />
      <IconActionButton {...args} icon={DeleteButtonGlyph} label="Excluir" iconClassName="h-3 w-[10px]" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, onClick: fn() },
  // Desabilitado: o clique não dispara `onClick`.
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Confirmar" })
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
