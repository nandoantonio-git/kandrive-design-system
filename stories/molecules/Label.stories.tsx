import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "../../src/components/molecules/label"

const meta = {
  title: "Molecules/Label",
  component: Label,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=302-12809' },
  },
  argTypes: {
    state: { control: "radio", options: ["default", "expanded", "disabled"] },
  },
  args: {
    state: "default",
    value: "Etiquetar",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Expanded: Story = {
  args: { state: "expanded" },
}

export const Disabled: Story = {
  args: { state: "disabled" },
}

export const ExpandedDynamicList: Story = {
  args: {
    state: "expanded",
    value: "Contratos",
    labels: ["Contratos", "Pessoal", "Fotos"],
  },
}
