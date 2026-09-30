import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { ContextHeader } from "../../src/components/molecules/context-header"

const meta = {
  title: "Molecules/Navegação/ContextHeader",
  component: ContextHeader,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=790-7618' },
  },
  argTypes: {
    state: { control: "select", options: ["expanded", "collapsed"] },
  },
  args: {
    itemsSelected: "X itens selecionados",
    state: "expanded",
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextHeader>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — "Limpar seleção" recolhe o header (`state: "collapsed"`); volte pelos Controls. */
export const Default: Story = {
  args: { onDelete: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <ContextHeader {...live} onClear={() => updateLive({ state: "collapsed" })} />
        )}
      </LiveArgs>
    )
  },
  // As ações disparam seus callbacks; "Limpar seleção" recolhe o header.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Excluir" }))
    await expect(args.onDelete).toHaveBeenCalledOnce()
    const clear = canvas.getByRole("button", { name: "Limpar seleção" })
    await userEvent.click(clear)
    await expect(clear.closest("[data-slot='context-header']")).toHaveAttribute("data-state", "collapsed")
  },
}

export const Collapsed: Story = {
  args: { state: "collapsed" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-16 w-[440px] rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-4">
        <Story />
      </div>
    ),
  ],
}

/** `Layout=Minimal`, `Device=Mobile` (V0.2.1): só limpar + contador, 40px, largura fluida. Seleção do Long-term mobile. */
export const MinimalMobile: Story = {
  args: { layout: "minimal", itemsSelected: "2 itens selecionados" },
  parameters: { design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1729-24977" } },
  decorators: [(Story) => <div className="w-[356px]"><Story /></div>],
}
