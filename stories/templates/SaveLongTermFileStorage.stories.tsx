import type { Meta, StoryObj } from "@storybook/react-vite"

import { SaveLongTermFileStorage } from "../../src/components/templates/save-long-term-file-storage"

const meta = {
  title: "Templates/SaveLongTermFileStorage",
  component: SaveLongTermFileStorage,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1439-16907' } },
  args: {
    files: [
      { name: "Relatorio-Q1.pdf", meta: "PDF · 12 MB · 19 Jul" },
      { name: "Backup-Financeiro.zip", meta: "ZIP · 2.1 GB · 19 Jul" },
      { name: "Fotos-Evento.zip", meta: "ZIP · 450 MB · 19 Jul" },
    ],
    selectedCount: 1,
    savingsLabel: "12 MB",
  },
} satisfies Meta<typeof SaveLongTermFileStorage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })
/** Tablet · 720. Figma `template/SaveLongTermFileStorage` `Device=Tablet`. */
export const Tablet: Story = { globals: vp("kdTablet"), parameters: { layout: "padded" } }
/** Mobile · 390: largura total, selecionados acima das etiquetas, com rolagem. */
export const Mobile: Story = { globals: vp("kdMobile"), parameters: { layout: "padded" } }
