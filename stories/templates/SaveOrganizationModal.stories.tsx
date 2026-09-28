import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"

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

/** Vivo — clique num método pra selecioná-lo (`selected`; os Controls acompanham). */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return <SaveOrganizationModal {...args} onMethodSelect={(selected) => updateArgs({ selected })} />
  },
}

export const NoneSelected: Story = {
  args: { selected: undefined },
}
