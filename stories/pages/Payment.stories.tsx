import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

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
  // Cada seção recolhe e expande sozinha; recolhida, mostra o resumo ("92% usado").
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const storage = canvas.getByRole("button", { name: "Seu armazenamento" })
    await expect(storage).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(storage)
    await expect(storage).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.getByText("92% usado")).toBeInTheDocument()
    await expect(canvas.getByRole("button", { name: "Seu plano" })).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(storage)
    await expect(storage).toHaveAttribute("aria-expanded", "true")
  },
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
