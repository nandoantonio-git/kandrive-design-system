import type { Meta, StoryObj } from "@storybook/react-vite"

import { FileRow } from "../../src/components/molecules/file-row"

const meta = {
  title: "Molecules/Arquivos/FileRow",
  component: FileRow,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3029-4009" } },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  argTypes: { type: { control: "radio", options: ["file", "folder"] } },
  args: { type: "file", name: "Arquivo 1", meta: "Proprietário • 100MB" },
  decorators: [(Story) => <div className="w-[328px]"><Story /></div>],
} satisfies Meta<typeof FileRow>

export default meta
type Story = StoryObj<typeof meta>

/** Linha da Home no mobile, em modo Lista (`home-page`). */
export const Default: Story = {}

/** Pasta: fundo e borda (grupo do `FolderCard` no mobile). */
export const Folder: Story = {
  args: { type: "folder", name: "Documentos Pessoais", meta: "Pasta • 12 itens", date: "12/09/2023" },
}

/** Lista como no `FolderCard` mobile (`Organize/Saved/Mobile`). */
export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <FileRow type="folder" name="Documentos Pessoais" meta="Pasta • 12 itens" date="12/09/2023" />
      <FileRow name="Projetos" meta="Pasta • 45 itens" date="10/09/2023" />
      <FileRow name="Contrato_Novo.pdf" meta="PDF • 2.4 MB" date="08/09/2023" />
    </div>
  ),
}
