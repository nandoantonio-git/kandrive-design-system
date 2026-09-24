import type { Meta, StoryObj } from "@storybook/react-vite"

import { FolderCard } from "../../src/components/molecules/folder-card"

const meta = {
  title: "Molecules/FolderCard",
  component: FolderCard,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1421-18595' },
  },
  argTypes: {
    state: { control: "radio", options: ["idle", "hover", "selected"] },
    expanded: { control: "boolean" },
  },
  args: {
    label: "Pasta",
    state: "idle",
    expanded: true,
  },
} satisfies Meta<typeof FolderCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Selected: Story = {
  args: { state: "selected" },
}

export const Collapsed: Story = {
  args: { expanded: false },
}

/** Mobile (`Organize/Saved/Mobile`, V0.2.1): o grupo lista linhas `FileRow` em vez das miniaturas. */
export const Mobile: Story = {
  args: {
    device: "mobile",
    label: "2000",
    rows: [
      { type: "folder", name: "Documentos Pessoais", meta: "Pasta • 12 itens", date: "12/09/2023" },
      { name: "Projetos", meta: "Pasta • 45 itens", date: "10/09/2023" },
      { name: "Contrato_Novo.pdf", meta: "PDF • 2.4 MB", date: "08/09/2023" },
    ],
  },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1770-35774" } },
  decorators: [(Story) => <div className="w-[328px]"><Story /></div>],
}
