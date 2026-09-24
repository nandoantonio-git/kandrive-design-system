import type { Meta, StoryObj } from "@storybook/react-vite"

import { ActionPill } from "../../src/components/molecules/action-pill"

const meta = {
  title: "Molecules/ActionPill",
  component: ActionPill,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=517-3818' },
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
    actions: [
      { name: "Help", label: "Ajuda", onClick: () => {} },
      { name: "Settings", label: "Configurações", onClick: () => {} },
      { name: "SpatialAudioOff", label: "Conta", onClick: () => {} },
    ],
  },
} satisfies Meta<typeof ActionPill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}
