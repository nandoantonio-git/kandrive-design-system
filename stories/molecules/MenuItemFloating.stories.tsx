import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { MenuItemFloating } from "../../src/components/molecules/menu-item-floating"

const meta = {
  title: "Molecules/Feedback e menus/MenuItemFloating",
  component: MenuItemFloating,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1363-16485" } },
  decorators: [(Story) => <div className="rounded-lg bg-[#dfe7ea] p-10"><Story /></div>],
} satisfies Meta<typeof MenuItemFloating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    role: "menu",
    "aria-label": "Adicionar",
    className: "w-[191px] py-1",
    children: ["Nova pasta", "Enviar arquivo", "Enviar pasta"].map((label) => (
      <button key={label} type="button" role="menuitem" className="px-4 py-2 text-left text-base font-medium text-neutral-text-secondary hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal-action/50">
        {label}
      </button>
    )),
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("menuitem")).toHaveLength(3)
  },
}
