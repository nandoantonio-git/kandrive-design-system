import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { OnboardingPage } from "../../src/components/pages/onboarding-page"

const FIG = (id: string) => ({ design: { type: "figma" as const, url: `https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=${id}` } })
const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })

const meta = {
  title: "Pages/Onboarding",
  component: OnboardingPage,
  parameters: { layout: "fullscreen" },
  args: { defaultStep: "welcome" },
} satisfies Meta<typeof OnboardingPage>

export default meta
type Story = StoryObj<typeof meta>

/** Mobile · 390. Os botões avançam pelas etapas. Figma `Onboarding/Welcome/Mobile`. */
export const Welcome: Story = {
  parameters: FIG("3181-29768"),
  globals: vp("kdMobile"),
  args: { onFinish: fn() },
  // Começar → mão → tema (escolher "Escuro") → pronto; "Ir para a Home" chama `onFinish`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Começar" }))
    await expect(canvas.getByRole("heading", { name: "Com qual mão você usa o celular?" })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    const dark = canvas.getByRole("radio", { name: "Escuro" })
    await userEvent.click(dark)
    await expect(dark).toBeChecked()
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    await expect(canvas.getByText("Tudo pronto!")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Ir para a Home" }))
    await expect(args.onFinish).toHaveBeenCalledOnce()
  },
}
/** Mobile · 390. Figma `Onboarding/DominantHand/Mobile`. */
export const DominantHand: Story = { args: { defaultStep: "hand" }, parameters: FIG("3181-29820"), globals: vp("kdMobile") }
/** Mobile · 390. Figma `Onboarding/Theme/Mobile`. */
export const Theme: Story = { args: { defaultStep: "theme" }, parameters: FIG("3181-29847"), globals: vp("kdMobile") }
/** Mobile · 390. Figma `Onboarding/Done/Mobile`. */
export const Done: Story = { args: { defaultStep: "done" }, parameters: FIG("3181-29878"), globals: vp("kdMobile") }
/** Tablet · 720: coluna central de até 420px. */
export const DominantHandTablet: Story = { ...DominantHand, globals: vp("kdTablet") }
