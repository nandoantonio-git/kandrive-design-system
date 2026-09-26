import type { Meta, StoryObj } from "@storybook/react-vite"

import { UploadFolder } from "../../src/components/atoms/upload-folder"

const meta = {
  title: "Atoms/Symbols/UploadFolder",
  component: UploadFolder,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=212-3691' },
  },
} satisfies Meta<typeof UploadFolder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <UploadFolder className="text-zinc-700" />,
}
