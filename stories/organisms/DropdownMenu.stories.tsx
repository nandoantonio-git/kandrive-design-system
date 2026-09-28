import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { DropdownMenu } from "../../src/components/organisms/dropdown-menu"

const meta = {
  title: "Organisms/DropdownMenu",
  component: DropdownMenu,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1440-23662' } },
  argTypes: {
    variant: { control: "radio", options: ["sidebar", "template-options"] },
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Sidebar: Story = {
  args: { variant: "sidebar", onItemSelect: fn() },
  // Escolher um item chama `onItemSelect` com o rótulo dele.
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("menuitem", { name: "Upload de arquivo" }))
    await expect(args.onItemSelect).toHaveBeenCalledWith("Upload de arquivo")
  },
}

export const TemplateOptions: Story = {
  args: { variant: "template-options" },
}
