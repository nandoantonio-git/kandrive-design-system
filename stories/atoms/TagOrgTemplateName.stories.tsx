import type { Meta, StoryObj } from "@storybook/react-vite"

import { TagOrgTemplateName } from "../../src/components/atoms/tag-org-template-name"

const meta = {
  title: "Atoms/TagOrgTemplateName",
  component: TagOrgTemplateName,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1039-17641' },
  },
} satisfies Meta<typeof TagOrgTemplateName>

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {}

export const Filled: Story = {
  args: { defaultValue: "Fotos de Viagem" },
}
