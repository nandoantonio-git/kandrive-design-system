import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { FileTypeIcon } from "../../src/components/atoms/file-type-icon"

const meta = {
  title: "Atoms/Ícones e símbolos/FileTypeIcon",
  component: FileTypeIcon,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1444-21914" } },
  argTypes: { type: { control: "radio", options: ["file", "folder", "image", "video"] } },
  args: { type: "file" },
} satisfies Meta<typeof FileTypeIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllTypes: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      {(["file", "folder", "image", "video"] as const).map((type) => (
        <div key={type} className="flex flex-col items-center gap-2 text-xs text-neutral-text-tertiary">
          <span className="flex size-8 items-center justify-center">
            <FileTypeIcon type={type} />
          </span>
          {type}
        </div>
      ))}
    </div>
  ),
  // Decorativo por padrão: fica fora da árvore de acessibilidade.
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryAllByRole("img")).toHaveLength(0)
    await expect(canvasElement.querySelectorAll("[data-slot=file-type-icon]")).toHaveLength(4)
  },
}
