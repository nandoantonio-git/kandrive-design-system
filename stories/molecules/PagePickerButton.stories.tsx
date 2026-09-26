import type { Meta, StoryObj } from "@storybook/react-vite"

import { PagePickerButton } from "../../src/components/molecules/page-picker-button"

const meta = {
  title: "Molecules/PagePickerButton",
  component: PagePickerButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1714-614" } },
  args: { page: "Pessoal", withLabel: true },
} satisfies Meta<typeof PagePickerButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutLabel: Story = { args: { withLabel: false } }
