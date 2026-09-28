import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { StorageSidebar } from "../../src/components/organisms/storage-sidebar"

const meta = {
  title: "Organisms/StorageSidebar",
  component: StorageSidebar,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=635-5608' } },
  argTypes: {
    expanded: { control: "boolean" },
    quickAccessValue: { control: { type: "range", min: 0, max: 100 } },
    longTermValue: { control: { type: "range", min: 0, max: 100 } },
  },
  args: {
    expanded: true,
    quickAccessValue: 66,
    quickAccessLabel: "20 GB de 30 GB usados",
    longTermValue: 50,
    longTermLabel: "1 TB de 2 TB usados",
  },
  decorators: [(Story) => <div className="w-60"><Story /></div>],
} satisfies Meta<typeof StorageSidebar>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique no cabeçalho pra expandir/recolher (`expanded`; os Controls acompanham). */
export const Default: Story = {
  args: { onBuySpace: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => <StorageSidebar {...live} onToggle={() => updateLive({ expanded: !live.expanded })} />}
      </LiveArgs>
    )
  },
  // "Comprar Espaço" chama `onBuySpace`; clicar no cabeçalho recolhe o painel e esconde os botões.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Comprar Espaço" }))
    await expect(args.onBuySpace).toHaveBeenCalledOnce()
    const toggle = canvas.getByRole("button", { name: "Armazenamento" })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await expect(canvas.queryByRole("button", { name: "Comprar Espaço" })).toBeNull()
  },
}

export const Collapsed: Story = {
  args: { expanded: false },
}
