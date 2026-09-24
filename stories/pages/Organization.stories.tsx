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

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
// No mobile, o Figma tem composições próprias para o Organize (ChooseMethod em lista,
// Review em cards, Saved agrupado): lote à parte. Aqui, as 3 etapas do código adaptadas.
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720, modal de método. Figma `Organize/ChooseMethod/Tablet`. */
export const DefaultTablet: Story = { ...Default, parameters: FIG("1749-35196"), globals: vp("kdTablet") }
/** Mobile · 390: modal em largura total, métodos rolando na horizontal; BottomNav Confirmar + ✕. */
export const DefaultMobile: Story = { ...Default, parameters: FIG("1700-21974"), globals: vp("kdMobile") }
/** Tablet · 720: painel de arrastar abaixo da grade. Figma `Organize/DropZone/Tablet`. */
export const TemplateDropZoneTablet: Story = { ...TemplateDropZone, parameters: FIG("1750-49555"), globals: vp("kdTablet") }
/** Mobile · 390. Fluxo equivalente no Figma: `Organize/Review/Mobile` (composição própria, lote à parte). */
export const TemplateDropZoneMobile: Story = { ...TemplateDropZone, parameters: FIG("1731-25190"), globals: vp("kdMobile") }
/** Tablet · 720. Figma `Organize/Saved/Tablet`. */
export const SavedTablet: Story = { ...Saved, parameters: FIG("1750-50174"), globals: vp("kdTablet") }
/** Mobile · 390: TabBar + BottomNav Adicionar; notificação acima da barra. Figma `Organize/Saved/Mobile`. */
export const SavedMobile: Story = { ...Saved, parameters: FIG("1770-35665"), globals: vp("kdMobile") }
