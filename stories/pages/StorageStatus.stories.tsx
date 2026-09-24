import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { StorageStatusPage, type StorageStatusPageProps } from "../../src/components/pages/storage-status-page"
import type { StorageScope } from "../../src/components/molecules/storage-status"

const SIDEBAR_PROPS: StorageStatusPageProps["sidebarProps"] = {
  activePage: "Pessoal",
  tags: ["Image", "Contratos"],
  storageProps: {
    quickAccessValue: 66,
    quickAccessLabel: "20 GB de 30 GB usados",
    longTermValue: 50,
    longTermLabel: "1 TB de 2 TB usados",
  },
}

const meta = {
  title: "Pages/StorageStatus",
  component: StorageStatusPage,
  parameters: { layout: "fullscreen" },
  args: {
    sidebarProps: SIDEBAR_PROPS,
    usedAmount: "20 GB",
    totalAmount: "30 GB",
    percent: 66,
    fileTypeSegments: [
      { kind: "image", value: 40 },
      { kind: "document", value: 30 },
      { kind: "video", value: 20 },
      { kind: "other", value: 10 },
    ],
    files: [
      { name: "Arquivo 1", size: "100MB" },
      { name: "Arquivo 2", size: "100MB" },
      { name: "Arquivo 3", size: "100MB" },
    ],
    cleanSpaceProps: {
      largeFiles: [
        { name: "huge-backup.zip", meta: "ZIP · 476.84 MB · Aug 5, 2026", tier: "current" },
        { name: "medium-report.pdf", meta: "PDF · 9.54 MB · Aug 5, 2026", tier: "current" },
        { name: "small-note.txt", meta: "TXT · 1 KB · Aug 5, 2026", tier: "long term" },
      ],
      duplicateGroups: [
        { name: "Contrato-Fornecedor (3 versões)", copiesLabel: "3 cópias · 4.58 MB" },
        { name: "Backup-Financeiro (2 versões)", copiesLabel: "2 cópias · 2.98 GB" },
      ],
    },
  },
} satisfies Meta<typeof StorageStatusPage>

export default meta
type Story = StoryObj<typeof meta>

function controlled(initial: StorageScope) {
  return (args: StorageStatusPageProps) => {
    function Controlled() {
      const [scope, setScope] = useState<StorageScope>(initial)
      return <StorageStatusPage {...args} scope={scope} onScopeChange={setScope} />
    }
    return <Controlled />
  }
}

export const Global: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=231-4553" },
  },
  render: controlled("global"),
}

export const QuickAccess: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=231-4553" },
  },
  args: { usedLabel: "20 GB em uso", freeLabel: "10 GB livre" },
  render: controlled("quick-access"),
}

export const LongTerm: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=231-4553" },
  },
  args: { usedLabel: "1 TB em uso", freeLabel: "1 TB livre" },
  render: controlled("long-term"),
}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720. Figma `Storage/Total/Tablet`. */
export const GlobalTablet: Story = { parameters: FIG("1745-14124"), globals: vp("kdTablet"), render: controlled("global") }

/** Mobile · 390: sem Sidebar, lista em tabela abaixo do card, BottomNav com FAB Adicionar. Figma `Storage/Total/Mobile`. */
export const GlobalMobile: Story = { parameters: FIG("1663-8852"), globals: vp("kdMobile"), render: controlled("global") }

/** Limite atingido: card em alerta (valor e aviso em vermelho, barra cheia). Figma `Storage/LimitReached/Desktop`. */
export const LimitReached: Story = {
  parameters: FIG("1765-62063"),
  args: { usedAmount: "90GB", totalAmount: "90GB", percent: 100, limitReached: true },
  render: controlled("global"),
}
/** Modal "Liberar Espaço" por cima da página. Figma `Storage/ManageSpace/Desktop`. */
export const ManageSpace: Story = { parameters: FIG("1755-55255"), args: { manageSpaceOpen: true }, render: controlled("global") }
/** Tablet · 720. Figma `Storage/ManageSpace/Tablet`. */
export const ManageSpaceTablet: Story = { ...ManageSpace, parameters: FIG("1765-59974"), globals: vp("kdTablet") }
/** Mobile · 390: tela própria, sem título nem card. Figma `Storage/LimitReached/Mobile`. */
export const LimitReachedMobile: Story = { ...LimitReached, parameters: FIG("1727-23116"), globals: vp("kdMobile") }
/** Mobile · 390: o modal "Liberar Espaço" em largura total (estado; o Figma só tem desktop e tablet). */
export const ManageSpaceMobile: Story = { ...ManageSpace, globals: vp("kdMobile") }

/** Mobile · 390, Longo prazo (estado, pela regra dos 3 tipos: o Figma só tem no desktop). */
export const LongTermMobile: Story = { globals: vp("kdMobile"), render: controlled("long-term") }
