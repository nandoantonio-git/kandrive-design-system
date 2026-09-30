import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { FileList } from "../../src/components/molecules/file-list"

const meta = {
  title: "Molecules/Arquivos/FileList",
  component: FileList,
  parameters: {
    layout: "fullscreen",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=666-9228' },
  },
  decorators: [(Story) => <div className="p-6"><Story /></div>],
  argTypes: {
    format: { control: "radio", options: ["list", "storage", "list-sm"] },
    state: { control: "radio", options: ["idle", "hover", "pressed"] },
  },
  args: {
    fileName: "Arquivo 1",
    format: "list",
    state: "idle",
    owner: "Proprietário",
    size: "100MB",
    showIcon: true,
  },
} satisfies Meta<typeof FileList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onClick: fn() },
  // Com `onClick`, a linha vira botão: clique e Enter disparam o callback.
  play: async ({ args, canvasElement }) => {
    const row = within(canvasElement).getByRole("button", { name: /Arquivo 1/ })
    await userEvent.click(row)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
    await userEvent.keyboard("{Enter}")
    await expect(args.onClick).toHaveBeenCalledTimes(2)
  },
}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Pressed: Story = {
  args: { state: "pressed" },
}

export const Storage: Story = {
  args: { format: "storage" },
}

export const SmallWithArrow: Story = {
  args: { format: "list-sm" },
}
