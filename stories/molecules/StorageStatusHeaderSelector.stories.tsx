import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useState } from "react"

import { StorageStatusHeaderSelector, type StorageScope } from "../../src/components/molecules/storage-status-header-selector"

const meta = {
  title: "Molecules/Armazenamento/StorageStatusHeaderSelector",
  component: StorageStatusHeaderSelector,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=890-9869" } },
  args: { scope: "global" },
} satisfies Meta<typeof StorageStatusHeaderSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [scope, setScope] = useState<StorageScope>(args.scope)
    return <StorageStatusHeaderSelector scope={scope} onScopeChange={setScope} />
  },
  // Clicar num chip o torna o ativo.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("group", { name: "Escopo do armazenamento" })).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Longo prazo" }))
    await expect(canvas.getByRole("button", { name: "Longo prazo" })).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("button", { name: "Total" })).toHaveAttribute("aria-pressed", "false")
  },
}
