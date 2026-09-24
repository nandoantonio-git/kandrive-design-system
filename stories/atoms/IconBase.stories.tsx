import type { Meta, StoryObj } from "@storybook/react-vite"
import { FolderIcon } from "lucide-react"

import { IconBase } from "../../src/components/atoms/icon-base"

const meta = {
  title: "Atoms/IconBase",
  component: IconBase,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3024-3792' },
  },
  argTypes: {
    icon: { control: false },
    isHoverOn: { control: "boolean" },
  },
  args: {
    isHoverOn: false,
  },
} satisfies Meta<typeof IconBase>

export default meta
type Story = StoryObj<typeof meta>

/** Glifo real do Figma (ícone de expandir/colapsar a sidebar) — default confirmado. */
export const Default: Story = {}

export const HoverOn: Story = {
  args: { isHoverOn: true },
}

/** Exemplo de reuso do slot com outro glifo (ex.: `chip/folder-tag`) — não é o glifo Figma-confirmado do próprio nó. */
export const CustomIconReuse: Story = {
  args: { icon: FolderIcon },
}
