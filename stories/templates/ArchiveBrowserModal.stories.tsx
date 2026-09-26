import type { Meta, StoryObj } from "@storybook/react-vite"

import { ArchiveBrowserModal } from "../../src/components/templates/archive-browser-modal"

const meta = {
  title: "Templates/ArchiveBrowserModal",
  component: ArchiveBrowserModal,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1439-16909' } },
  args: {
    breadcrumb: ["Pessoal", "Fotos", "Casamento Ana & Bruno"],
    files: [
      { name: "Ceremonia-001.jpg", meta: "JPG · 7.82 MB · 19 Jun" },
      { name: "Ceremonia-002.jpg", meta: "JPG · 7.53 MB · 19 Jun" },
      { name: "Festa-014.jpg", meta: "JPG · 8.68 MB · 19 Jun" },
    ],
    selectedCount: 2,
    savingsLabel: "15.35 MB",
  },
} satisfies Meta<typeof ArchiveBrowserModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })
/** Tablet · 720: largura fluida (760px só a partir de desktop:). Figma `template/ArchiveBrowserModal` `Device=Tablet`. */
export const Tablet: Story = { globals: vp("kdTablet"), parameters: { layout: "padded" } }
/**
 * Mobile · 390: sem a coluna de pastas, busca em largura total. No Figma, o fluxo
 * mobile equivalente é a tela `LongTermStorage/SelectFiles` (composição própria, lote à parte).
 */
export const Mobile: Story = { globals: vp("kdMobile"), parameters: { layout: "padded" } }
