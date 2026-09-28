import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { useState } from "react"

import { TagColor, type TagColorName } from "../../src/components/molecules/tag-color"

const meta = {
  title: "Molecules/TagColor",
  component: TagColor,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1444-21979' },
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagColor>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique numa cor pra selecioná-la (`value`; os Controls acompanham). */
export const Default: Story = {
  args: { value: "success" },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return <TagColor {...args} onValueChange={(value) => updateArgs({ value })} />
  },
}

export const Interactive: Story = {
  render: () => {
    function Controlled() {
      const [value, setValue] = useState<TagColorName>("success")
      return <TagColor value={value} onValueChange={setValue} />
    }
    return <Controlled />
  },
}
