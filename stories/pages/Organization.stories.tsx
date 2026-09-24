import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { OrganizationPage, type OrganizationPageProps } from "../../src/components/pages/organization-page"

const SIDEBAR_PROPS: OrganizationPageProps["sidebarProps"] = {
  activePage: "Pessoal",
  tags: ["Image", "Contratos"],
  storageProps: {
    quickAccessValue: 66,
    quickAccessLabel: "20 GB de 30 GB usados",
    longTermValue: 50,
    longTermLabel: "1 TB de 2 TB usados",
  },
}

const REVIEW_ITEMS: OrganizationPageProps["reviewItems"] = [
  {
    name: "Relatórios 2023_Final",
    itemsLabel: "Pasta · 12 itens",
    severity: "duplicado",
    suggestedPath: "Financeiro / 2023 / Relatórios",
    suggestedPathLabel: "Taxonomia Sugerida:",
    children: [{ name: "Q1_Report_v2.pdf", meta: "PDF · 2.4 MB" }],
  },
  { name: "Projetos_Antigos_Misc", itemsLabel: "Pasta · 45 itens", severity: "incongruente", suggestedPath: "Fotos / RAW" },
  { name: "Arquivos_2023", itemsLabel: "Pasta · 8 itens", severity: "ok", suggestedPath: "2023 / Jan / Fev / Mar" },
]

const meta = {
  title: "Pages/Organization",
  component: OrganizationPage,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-11940" },
  },
  args: {
    sidebarProps: SIDEBAR_PROPS,
    viewMode: "grid",
    gridItems: [
      { name: "Arquivo 1", kind: "folder" },
      { name: "Arquivo 2", kind: "image" },
      { name: "Arquivo 3", kind: "folder", interactive: true },
    ],
    reviewItems: REVIEW_ITEMS,
    mobileFiles: [
      { name: "Projeto Alpha.pdf", meta: "4.2 MB" },
      { name: "Fotos_Viagem_2024.zip", meta: "812 MB" },
      { name: "Relatório Mensal.docx", meta: "1.1 MB" },
      { name: "Video_Apresentação.mp4", meta: "2.3 GB" },
      { name: "Design_System_v2.fig", meta: "38 MB" },
      { name: "Backup_Documentos.tar", meta: "156 MB" },
    ],
    savedGroup: {
      label: "2000",
      rows: [
        { type: "folder", name: "Documentos Pessoais", meta: "Pasta • 12 itens", date: "12/09/2023" },
        { name: "Projetos", meta: "Pasta • 45 itens", date: "10/09/2023" },
        { name: "Contrato_Novo.pdf", meta: "PDF • 2.4 MB", date: "08/09/2023" },
        { name: "Relatorio_Financeiro.xlsx", meta: "XLSX • 1.1 MB", date: "05/09/2023" },
        { name: "Fotos de Viagem", meta: "Pasta • 128 itens", date: "01/09/2023" },
        { name: "Apresentacao_Final.pptx", meta: "PPTX • 8.5 MB", date: "28/08/2023" },
      ],
    },
    organizedFileName: "Backup_Documentos.tar",
  },
} satisfies Meta<typeof OrganizationPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <OrganizationPage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}

export const ModalClosed: Story = {
  args: { modalOpen: false },
}

export const TemplateDropZone: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-11940" },
  },
  args: {
    step: "template-drop-zone",
    gridItems: [
      { name: "Arquivo 1", kind: "folder" },
      { name: "Arquivo 2", kind: "image" },
      { name: "Arquivo 3", kind: "folder" },
      { name: "Arquivo 4", kind: "folder" },
    ],
  },
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <OrganizationPage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}

export const Saved: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-11940" },
  },
  args: { step: "saved" },
  render: (args) => {
    function Controlled() {
      const [viewMode, setViewMode] = useState(args.viewMode)
      return <OrganizationPage {...args} viewMode={viewMode} onViewModeChange={setViewMode} />
    }
    return <Controlled />
  },
}

/** Revisão do template sugerido, por cima da composição de arrastar. Figma `Organize/Review/Desktop`. */
export const Review: Story = {
  ...TemplateDropZone,
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1753-51532" } },
  args: { ...TemplateDropZone.args, step: "review" },
}

/** Feedback de tela cheia após a revisão, igual no Light e no Dark. Figma `Organize/ReviewDone/Mobile`. */
export const ReviewDone: Story = {
  ...TemplateDropZone,
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1757-57986" } },
  args: { ...TemplateDropZone.args, step: "review-done" },
}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
// No mobile, as composições próprias do Figma V0.2.1: ChooseMethod em lista, Review em cards,
// ReviewDone em tela cheia e Saved agrupado por ano.
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720, modal de método. Figma `Organize/ChooseMethod/Tablet`. */
export const DefaultTablet: Story = { ...Default, parameters: FIG("1749-35196"), globals: vp("kdTablet") }
/** Mobile · 390: seletor de método, "Ordenar por", "Página" e a lista com checkbox; TabBar em Organizar, BottomNav Confirmar + ✕. Figma `Organize/ChooseMethod/Mobile`. */
export const DefaultMobile: Story = { ...Default, parameters: FIG("1700-21974"), globals: vp("kdMobile") }
/** Tablet · 720: painel de arrastar abaixo da grade. Figma `Organize/DropZone/Tablet`. */
export const TemplateDropZoneTablet: Story = { ...TemplateDropZone, parameters: FIG("1750-49555"), globals: vp("kdTablet") }
/** Mobile · 390: no mobile não se arrasta, a etapa mostra a revisão (fluxo equivalente). Figma `Organize/Review/Mobile`. */
export const TemplateDropZoneMobile: Story = { ...TemplateDropZone, parameters: FIG("1731-25190"), globals: vp("kdMobile") }
/** Tablet · 720. Figma `Organize/Saved/Tablet`. */
export const SavedTablet: Story = { ...Saved, parameters: FIG("1750-50174"), globals: vp("kdTablet") }
/** Mobile · 390: TabBar em Home, grupo "2000" com FileRow, BottomNav Adicionar, sem toast. Figma `Organize/Saved/Mobile`. */
export const SavedMobile: Story = { ...Saved, parameters: FIG("1770-35665"), globals: vp("kdMobile") }
/** Tablet · 720: revisão por cima do painel de arrastar. Figma `Organize/Review/Tablet`. */
export const ReviewTablet: Story = { ...Review, parameters: FIG("1754-52474"), globals: vp("kdTablet") }
/** Mobile · 390: título, cards de revisão e o aviso; BottomNav Confirmar + ✕. Figma `Organize/Review/Mobile`. */
export const ReviewMobile: Story = { ...Review, parameters: FIG("1731-25190"), globals: vp("kdMobile") }
/** Mobile · 390: `MobileSuccess` em tela cheia. Figma `Organize/ReviewDone/Mobile`. */
export const ReviewDoneMobile: Story = { ...ReviewDone, parameters: FIG("1757-57986"), globals: vp("kdMobile") }
