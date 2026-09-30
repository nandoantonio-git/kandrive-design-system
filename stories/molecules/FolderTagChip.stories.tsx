import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { FolderTagChip } from "../../src/components/molecules/folder-tag-chip"

const meta = {
  title: "Molecules/Arquivos/FolderTagChip",
  component: FolderTagChip,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=558-8055' },
  },
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    isExpanded: { control: "boolean" },
    selected: { control: "boolean" },
  },
  args: {
    label: "Contratos 2026",
    disabled: false,
    // A maioria das stories mostra o conteúdo (isExpanded:true) — o estado
    // colapsado literal do Figma (ícone e rótulo invisíveis) tem sua própria
    // story, `Collapsed`, para não deixar toda a página em branco.
    isExpanded: true,
    selected: false,
  },
} satisfies Meta<typeof FolderTagChip>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Estado default, sem botão de remover (prop `onRemove` omitida). Vivo — clique
 * no chip pra alternar `selected` (os Controls acompanham).
 */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <FolderTagChip {...live} onClick={() => updateLive({ selected: !live.selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clique no chip alterna `selected` (`aria-pressed`).
  play: async ({ canvasElement }) => {
    const chip = within(canvasElement).getByRole("button", { name: "Contratos 2026" })
    await expect(chip).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(chip)
    await expect(chip).toHaveAttribute("aria-pressed", "true")
  },
}

/**
 * `isExpanded=false` (o padrão real do componente e a variante `State=Default,
 * Expanded=false` do Figma, `568:8695`): o ícone e o rótulo ficam com
 * `opacity: 0`, literal ao Figma — decisão humana em 2026-09-25 (antes disso,
 * o código sempre mostrava os dois, por ambiguidade). Sobra só o botão de
 * remover. O nome da pasta continua no DOM para o leitor de tela.
 */
export const Collapsed: Story = {
  args: {
    onRemove: () => {},
    isExpanded: false,
  },
}

export const Removable: Story = {
  args: {
    onRemove: fn(),
  },
  // O botão de remover dispara `onRemove`.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Remover Contratos 2026" }))
    await expect(args.onRemove).toHaveBeenCalledOnce()
  },
}

export const Disabled: Story = {
  args: {
    onRemove: fn(),
    disabled: true,
  },
  // Desabilitado: remover não dispara `onRemove`.
  play: async ({ args, canvasElement }) => {
    const remove = within(canvasElement).getByRole("button", { name: "Remover Contratos 2026" })
    await expect(remove).toBeDisabled()
    await userEvent.click(remove, { pointerEventsCheck: 0 })
    await expect(args.onRemove).not.toHaveBeenCalled()
  },
}

/** Eixo `isExpanded` — Figma-confirmado como prop existente (achado #5). */
export const Expanded: Story = {
  args: {
    onRemove: () => {},
    isExpanded: true,
    label: "Contratos e Documentos Fiscais 2026",
  },
}

/** Eixo `State=Selected` — Figma-confirmado (achado #5), estilo 🧩 inferido. */
export const Selected: Story = {
  args: {
    onRemove: () => {},
    selected: true,
  },
}
