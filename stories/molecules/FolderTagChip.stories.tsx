import type { Meta, StoryObj } from "@storybook/react-vite"

import { FolderTagChip } from "../../src/components/molecules/folder-tag-chip"

const meta = {
  title: "Molecules/FolderTagChip",
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
    isExpanded: false,
    selected: false,
  },
} satisfies Meta<typeof FolderTagChip>

export default meta
type Story = StoryObj<typeof meta>

/** Estado default, somente leitura — sem botão de remover (prop `onRemove` omitida). */
export const Default: Story = {}

export const Removable: Story = {
  args: {
    onRemove: () => {},
  },
}

export const Disabled: Story = {
  args: {
    onRemove: () => {},
    disabled: true,
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
