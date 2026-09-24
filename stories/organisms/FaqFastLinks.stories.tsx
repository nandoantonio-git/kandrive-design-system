import type { Meta, StoryObj } from "@storybook/react-vite"

import { FaqFastLinks } from "../../src/components/organisms/faq-fast-links"

const meta = {
  title: "Organisms/Faq/FastLinks",
  component: FaqFastLinks,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-25006' },
  },
} satisfies Meta<typeof FaqFastLinks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
