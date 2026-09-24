import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { FileSelectList } from "../../src/components/organisms/file-select-list"

const FILES = [
  { name: "Projeto Alpha.pdf", meta: "4.2 MB" },
  { name: "Fotos_Viagem_2024.zip", meta: "812 MB" },
  { name: "Relatório Mensal.docx", meta: "1.1 MB" },
  { name: "Backup_Documentos.tar", meta: "156 MB" },
]

const meta = {
  title: "Organisms/FileSelectList",
  component: FileSelectList,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1714-625" } },
  args: { files: FILES, selected: new Set<string>() },
  decorators: [(Story) => <div className="w-[356px]"><Story /></div>],
} satisfies Meta<typeof FileSelectList>

export default meta
type Story = StoryObj<typeof meta>

/** Toque na linha ou no checkbox para marcar. */
export const Default: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    return (
      <FileSelectList
        {...args}
        selected={selected}
        onSelectedChange={(name, on) => setSelected((p) => { const n = new Set(p); if (on) n.add(name); else n.delete(name); return n })}
      />
    )
  },
}
