import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useState } from "react"

import { PageToolbar } from "../../src/components/organisms/page-toolbar"
import { type ViewMode } from "../../src/components/molecules/view-mode-toggle"

const meta = {
  title: "Organisms/Navegação/PageToolbar",
  component: PageToolbar,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3029-3980" } },
  args: { title: "Bem-vindo ao Kandrive!", caption: "Seu espaço para guardar arquivos por anos, com organização simples desde o primeiro dia." },
} satisfies Meta<typeof PageToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [mode, setMode] = useState<ViewMode>("grid")
    return <PageToolbar {...args} viewMode={mode} onViewModeChange={setMode} />
  },
  // Trocar a visualização atualiza o botão ativo.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("heading", { name: "Bem-vindo ao Kandrive!" })).toBeVisible()
    const lista = canvas.getAllByRole("button", { name: /Lista/ })[0]
    await userEvent.click(lista)
    await expect(lista).toHaveAttribute("aria-pressed", "true")
  },
}
