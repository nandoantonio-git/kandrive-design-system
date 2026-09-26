import type { Meta, StoryObj } from "@storybook/react-vite"

import { SaveOrganizationModal } from "../../src/components/templates/save-organization-modal"

const meta = {
  title: "Templates/SaveOrganizationModal",
  component: SaveOrganizationModal,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=251-4480' } },
  args: {
    selected: "projeto",
  },
} satisfies Meta<typeof SaveOrganizationModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoneSelected: Story = {
  args: { selected: undefined },
}
