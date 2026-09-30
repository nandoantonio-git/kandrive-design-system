import type { Meta, StoryObj } from "@storybook/react-vite"

import { expect, userEvent, within } from "storybook/test"

import { FaqPage } from "../../src/components/pages/faq-page"

const meta = {
  title: "Pages/Faq",
  component: FaqPage,
  parameters: { layout: "fullscreen" },
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
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-13017" },
  },
  args: { variant: "collapsed" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nav = canvas.getByRole("navigation", { name: "Nesta página" })
    const item = within(nav).getByRole("button", { name: "Etiquetas" })
    await userEvent.click(item)
    await expect(item).toHaveAttribute("aria-current", "location")
  },
}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

/** Tablet · 720: cards fluidos, sem a coluna de links rápidos; a barra "Nesta página" fica com 140px. Figma `FAQ/Expanded/Tablet`. */
export const ExpandedTablet: Story = { ...Expanded, parameters: FIG("1745-14136"), globals: vp("kdTablet") }
/** Mobile · 390: os tópicos ficam no `MobileFooterSettings` Page=FAQ, na base. Figma `FAQ/Expanded/Mobile`. */
export const ExpandedMobile: Story = { ...Expanded, parameters: FIG("1670-23895"), globals: vp("kdMobile") }
/** Mobile · 390, tópicos recolhidos. Figma `FAQ/Collapsed/Mobile`. */
export const CollapsedMobile: Story = { ...Collapsed, play: undefined, parameters: FIG("1670-23381"), globals: vp("kdMobile") }
