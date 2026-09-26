import type { Meta, StoryObj } from "@storybook/react-vite"

import { FreeModeButtons } from "../../src/components/molecules/free-mode-buttons"

const meta = {
  title: "Molecules/OrganizeFreeModeCanvas/Buttons",
  component: FreeModeButtons,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1431-20043' },
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FreeModeButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
