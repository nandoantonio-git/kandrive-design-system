import type { Meta, StoryObj } from "@storybook/react-vite"

import { PaymentPage } from "../../src/components/pages/payment-page"

const meta = {
  title: "Pages/Payment",
  component: PaymentPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PaymentPage>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12477" },
  },
  args: { variant: "expanded" },
}

export const Collapsed: Story = {
  parameters: {
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-12477" },
  },
  args: { variant: "collapsed" },
}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720. Figma `Payment/PlanExpanded/Tablet`. */
export const ExpandedTablet: Story = { ...Expanded, parameters: FIG("1745-14193"), globals: vp("kdTablet") }
/** Mobile · 390: planos empilhados; chips Plano · Configurações · Home na base. Figma `Payment/PlanExpanded/Mobile`. */
export const ExpandedMobile: Story = { ...Expanded, parameters: FIG("1704-23046"), globals: vp("kdMobile") }
/** Mobile · 390, seções recolhidas. Figma `Payment/PlanCollapsed/Mobile`. */
export const CollapsedMobile: Story = { ...Collapsed, parameters: FIG("1756-57491"), globals: vp("kdMobile") }
