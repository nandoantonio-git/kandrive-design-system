import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { HamburgerButton } from "../../src/components/atoms/hamburger-button"

const meta = {
  title: "Atoms/HamburgerButton",
  component: HamburgerButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1637-23253" } },
  argTypes: { mode: { control: "radio", options: ["closed", "expand"] } },
} satisfies Meta<typeof HamburgerButton>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `mode` entre `closed` e `expand` (os Controls acompanham). */
export const Default: Story = {
  args: { mode: "closed" },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <HamburgerButton
            {...live}
            onClick={() => updateLive({ mode: live.mode === "expand" ? "closed" : "expand" })}
          />
        )}
      </LiveArgs>
    )
  },
  // Clique alterna o modo: "Abrir menu" (fechado) ↔ "Fechar menu" (expandido).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const open = canvas.getByRole("button", { name: "Abrir menu" })
    await expect(open).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(open)
    const close = await canvas.findByRole("button", { name: "Fechar menu" })
    await expect(close).toHaveAttribute("aria-expanded", "true")
  },
}

/** No Header mobile: abre a gaveta. */
export const Closed: Story = { args: { mode: "closed" } }
/** Dentro da gaveta: fecha. */
export const Expand: Story = { args: { mode: "expand" } }
/** Hover de `closed` (`Mode=Open`): a barra do meio encolhe. Congelado com `forceHover`. */
export const Open: Story = { args: { mode: "closed", forceHover: true } }
/** Hover de `expand` (`Mode=Collapse`): a barra do meio passa das bordas. Congelado com `forceHover`. */
export const Collapse: Story = { args: { mode: "expand", forceHover: true } }
