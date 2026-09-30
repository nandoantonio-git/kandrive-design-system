import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Footer } from "../../src/components/organisms/footer"

const meta = {
  title: "Organisms/Navegação/Footer",
  component: Footer,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1431-17284" } },
  argTypes: { layout: { control: "radio", options: ["full", "minimal"] } },
  args: { layout: "full" },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("contentinfo")).toHaveTextContent("©2026 Kandrive")
    await expect(canvas.getByRole("combobox", { name: "Idioma" })).toBeVisible()
  },
}
export const Minimal: Story = {
  args: { layout: "minimal" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("combobox")).toBeNull()
  },
}
