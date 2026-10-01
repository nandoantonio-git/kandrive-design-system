import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import {
  FilterMenu,
  EMPTY_FILTER,
  applyFilters,
  countActiveFilters,
  type FilterableFile,
  type FilterValue,
} from "../../src/components/organisms/filter-menu"
import { glassBackdrop } from "../../.storybook/glass-backdrop"

const meta = {
  title: "Organisms/Arquivos/FilterMenu",
  component: FilterMenu,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3500-9883" } },
  decorators: [glassBackdrop],
  args: { onValueChange: fn(), onClose: fn() },
  argTypes: { device: { control: "radio", options: ["desktop", "tablet", "mobile"] } },
} satisfies Meta<typeof FilterMenu>

export default meta
type Story = StoryObj<typeof meta>

const ACTIVE: FilterValue = { kinds: ["image", "video"], size: "large", date: "month" }

/** `Device=Desktop, State=Default`: balão de 280px, sem filtro. Marcar aplica na hora; "Limpar filtros" volta tudo. */
export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("dialog", { name: "Filtrar" })).toBeVisible()
    const clear = canvas.getByRole("button", { name: "Limpar filtros" })
    await expect(clear).toBeDisabled()
    await userEvent.click(canvas.getByRole("checkbox", { name: "Imagens" }))
    await expect(canvas.getByRole("checkbox", { name: "Imagens" })).toBeChecked()
    await userEvent.click(canvas.getByRole("radio", { name: "Mais de 1 GB" }))
    await expect(canvas.getByRole("radio", { name: "Mais de 1 GB" })).toBeChecked()
    await expect(args.onValueChange).toHaveBeenLastCalledWith({ kinds: ["image"], size: "large", date: "any" })
    await expect(clear).toBeEnabled()
    await userEvent.click(clear)
    await expect(canvas.getByRole("checkbox", { name: "Imagens" })).not.toBeChecked()
    await expect(canvas.getByRole("radio", { name: "Qualquer tamanho" })).toBeChecked()
    await expect(clear).toBeDisabled()
  },
}

/** `Device=Desktop, State=Active`: quatro opções marcadas (Imagens, Vídeos, Mais de 1 GB, Últimos 30 dias). */
export const Active: Story = {
  args: { defaultValue: ACTIVE },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("checkbox", { name: "Imagens" })).toBeChecked()
    await expect(canvas.getByRole("checkbox", { name: "Vídeos" })).toBeChecked()
    await expect(canvas.getByRole("radio", { name: "Últimos 30 dias" })).toBeChecked()
    await expect(canvas.getByRole("button", { name: "Limpar filtros" })).toBeEnabled()
  },
}

/** `Device=Tablet`: folha de baixo de 420px, com linhas de 44px. Fechar e Esc chamam `onClose`. */
export const Tablet: Story = {
  args: { device: "tablet" },
  parameters: { layout: "fullscreen" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Fechar" }))
    await expect(args.onClose).toHaveBeenCalledTimes(1)
    await userEvent.keyboard("{Escape}")
    await expect(args.onClose).toHaveBeenCalledTimes(2)
  },
}

/** `Device=Mobile`: folha de baixo de 390px. */
export const Mobile: Story = {
  args: { device: "mobile", defaultValue: ACTIVE },
  parameters: { layout: "fullscreen" },
}

const NOW = new Date("2026-10-01T12:00:00")
const day = (n: number) => new Date(NOW.getTime() - n * 24 * 60 * 60 * 1000)
interface SampleFile extends FilterableFile {
  name: string
}
const SAMPLE: SampleFile[] = [
  { name: "Ceremonia-001.jpg", kind: "image", sizeMB: 8, modified: day(3) },
  { name: "Backup-Financeiro.zip", kind: "other", sizeMB: 2100, modified: day(20) },
  { name: "Relatorio-Q1.pdf", kind: "document", sizeMB: 12, modified: day(120) },
  { name: "Fotos-Evento.zip", kind: "other", sizeMB: 450, modified: day(12) },
  { name: "Entrevista-Final.mp4", kind: "video", sizeMB: 1800, modified: day(25) },
  { name: "Festa-014.jpg", kind: "image", sizeMB: 9, modified: day(200) },
]

/** O filtro funcionando de verdade: a lista abaixo usa `applyFilters`. Marque Tipo, Tamanho e Data e veja o resultado. */
export const ComLista: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState<FilterValue>(EMPTY_FILTER)
    const shown = applyFilters(SAMPLE, value, NOW)
    return (
      <div className="flex items-start gap-6">
        <FilterMenu {...args} value={value} onValueChange={setValue} />
        <div className="w-[320px] rounded-md bg-neutral-surface-card p-4">
          <p className="mb-2 text-sm font-medium text-neutral-text-secondary" aria-live="polite">
            {shown.length} de {SAMPLE.length} arquivos · {countActiveFilters(value)} {countActiveFilters(value) === 1 ? "filtro" : "filtros"}
          </p>
          <ul aria-label="Arquivos" className="flex flex-col gap-1 text-base text-neutral-text-primary">
            {shown.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6)
    await userEvent.click(canvas.getByRole("checkbox", { name: "Imagens" }))
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2)
    await userEvent.click(canvas.getByRole("checkbox", { name: "Vídeos" }))
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3)
    await userEvent.click(canvas.getByRole("radio", { name: "Mais de 1 GB" }))
    await expect(canvas.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Entrevista-Final.mp4"])
    await userEvent.click(canvas.getByRole("button", { name: "Limpar filtros" }))
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6)
    await userEvent.click(canvas.getByRole("radio", { name: "Últimos 7 dias" }))
    await expect(canvas.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Ceremonia-001.jpg"])
  },
}
