import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { SidebarDrawer, type DrawerItem } from "../../src/components/organisms/sidebar-drawer"
import { HamburgerButton } from "../../src/components/atoms/hamburger-button"

const meta = {
  title: "Organisms/SidebarDrawer",
  component: SidebarDrawer,
  parameters: { layout: "fullscreen", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3139-49490" } },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  args: { open: true },
  decorators: [(Story) => <div className="relative h-[844px] overflow-hidden bg-neutral-surface-background p-6"><p className="pt-16 text-neutral-text-secondary">Conteúdo da tela</p><Story /></div>],
} satisfies Meta<typeof SidebarDrawer>

export default meta
type Story = StoryObj<typeof meta>

/** Figma: `Home/Drawer/Mobile`. */
export const Open: Story = {}

export const Interactive: Story = {
  args: { open: false },
  render: function Render(args) {
    const [open, setOpen] = React.useState(false)
    const [active, setActive] = React.useState<DrawerItem | undefined>()
    return (
      <>
        <HamburgerButton className="absolute top-6 left-6" onClick={() => setOpen(true)} />
        <SidebarDrawer {...args} open={open} onOpenChange={setOpen} active={active} onNavigate={(item) => { setActive(item); setOpen(false) }} />
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const drawer = canvasElement.querySelector('[data-slot="sidebar-drawer"]') as HTMLElement
    await expect(drawer).toHaveAttribute("data-state", "closed")
    await userEvent.click(canvas.getAllByRole("button", { name: /menu/i })[0])
    await expect(drawer).toHaveAttribute("data-state", "open")
    await userEvent.keyboard("{Escape}")
    await expect(drawer).toHaveAttribute("data-state", "closed")
  },
}
