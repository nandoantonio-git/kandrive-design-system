import type { Meta, StoryObj } from "@storybook/react-vite"

import { LoginPage } from "../../src/components/pages/login-page"

const meta = {
  title: "Pages/Login",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-13624" },
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// ─── Responsividade (2026-09-24) ─────────────────────────────────────────
// No mobile, o Figma tem uma composição própria (Auth/Login/Mobile: fundo teal, Kan, sem card):
// lote à parte. Aqui, o Login atual em largura fluida.
const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })
/** Tablet · 720. Figma `Auth/Login/Tablet`. */
export const Tablet: Story = { parameters: FIG("1745-13705"), globals: vp("kdTablet") }
/** Mobile · 390. Figma `Auth/Login/Mobile` (composição própria, lote à parte). */
export const Mobile: Story = { parameters: FIG("1763-59898"), globals: vp("kdMobile") }
