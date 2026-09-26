import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageLead } from "../../src/components/molecules/page-lead"

const meta = {
  title: "Molecules/PageLead",
  component: PageLead,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1245-12212' },
  },
  args: {
    title: "Armazenamento",
    caption: "Gerencie seu armazenamento",
  },
} satisfies Meta<typeof PageLead>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OtherPage: Story = {
  args: { title: "Configurações de Plano", caption: "Gerencie sua assinatura e forma de pagamento" },
}
