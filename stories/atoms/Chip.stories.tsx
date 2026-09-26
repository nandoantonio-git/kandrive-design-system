import type { Meta, StoryObj } from "@storybook/react-vite"

import { Chip } from "../../src/components/atoms/chip"

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3028-3707" } },
  argTypes: { selected: { control: "boolean" }, children: { control: "text" } },
  args: { children: "Conta", selected: false },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Selected: Story = { args: { selected: true } }
