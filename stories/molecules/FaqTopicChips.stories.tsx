import type { Meta, StoryObj } from "@storybook/react-vite"

import { FaqTopicChips } from "../../src/components/molecules/faq-topic-chips"

const meta = {
  title: "Molecules/FaqTopicChips",
  component: FaqTopicChips,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1670-23381" } },
  args: {
    topics: ["Primeiros passos", "Longo prazo", "Templates", "Etiquetas", "Duplicados", "Armazenamento", "Problemas comuns"].map((label, i) => ({ targetId: "t" + i, label })),
  },
  decorators: [(Story) => <div className="w-[358px] overflow-hidden px-4"><Story /></div>],
} satisfies Meta<typeof FaqTopicChips>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
