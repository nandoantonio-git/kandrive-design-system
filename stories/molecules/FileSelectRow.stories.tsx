import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useState } from "react"

import { FileSelectRow } from "../../src/components/molecules/file-select-row"

const meta = {
  title: "Molecules/Arquivos/FileSelectRow",
  component: FileSelectRow,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1714-628" } },
  args: { name: "Projeto Alpha.pdf", meta: "4.2 MB", checked: false },
  decorators: [(Story) => <div className="w-[320px] overflow-hidden rounded-xl border border-neutral-border-subtle bg-neutral-surface-card"><Story /></div>],
} satisfies Meta<typeof FileSelectRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = { args: { checked: true } }

/** A lista "Selecionar arquivos" do Organize mobile. Toque na linha ou no checkbox. */
export const List: Story = {
  render: () => {
    function ListDemo() {
      const files = [["Projeto Alpha.pdf", "4.2 MB"], ["Fotos_Viagem_2024.zip", "812 MB"], ["Relatório Mensal.docx", "1.1 MB"]]
      const [picked, setPicked] = useState<string[]>([])
      return (
        <>
          {files.map(([name, meta]) => (
            <FileSelectRow
              key={name}
              name={name}
              meta={meta}
              checked={picked.includes(name)}
              onCheckedChange={(on) => setPicked((p) => (on ? [...p, name] : p.filter((n) => n !== name)))}
            />
          ))}
        </>
      )
    }
    return <ListDemo />
  },
  // Tocar na linha marca o arquivo; o checkbox também desmarca.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole("checkbox", { name: "Selecionar Fotos_Viagem_2024.zip" })
    await userEvent.click(canvas.getByText("Fotos_Viagem_2024.zip"))
    await expect(box).toHaveAttribute("aria-checked", "true")
    await userEvent.click(box)
    await expect(box).toHaveAttribute("aria-checked", "false")
  },
}
