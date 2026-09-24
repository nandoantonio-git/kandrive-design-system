import type { Meta, StoryObj } from "@storybook/react-vite"

import { FaqPage, type FaqPageProps } from "../../src/components/pages/faq-page"

const SIDEBAR_PROPS: FaqPageProps["sidebarProps"] = {
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
  title: "Pages/Faq",
  component: FaqPage,
  parameters: { layout: "fullscreen" },
  args: { sidebarProps: SIDEBAR_PROPS },
} satisfies Meta<typeof FaqPage>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12160" },
  },
  args: { variant: "expanded" },
}

export const Collapsed: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12160" },
  },
  args: { variant: "collapsed" },
}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720: cards fluidos, sem a coluna de links rápidos. Figma `FAQ/Expanded/Tablet`. */
export const ExpandedTablet: Story = { ...Expanded, parameters: FIG("1745-14136"), globals: vp("kdTablet") }
/** Mobile · 390: sem barra inferior (a barra de links rápidos está a desenhar, F6). Figma `FAQ/Expanded/Mobile`. */
export const ExpandedMobile: Story = { ...Expanded, parameters: FIG("1670-23895"), globals: vp("kdMobile") }
/** Mobile · 390, tópicos recolhidos. Figma `FAQ/Collapsed/Mobile`. */
export const CollapsedMobile: Story = { ...Collapsed, parameters: FIG("1670-23381"), globals: vp("kdMobile") }
