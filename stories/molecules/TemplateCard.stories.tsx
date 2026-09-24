import type { Meta, StoryObj } from "@storybook/react-vite"

import { TemplateCard } from "../../src/components/molecules/template-card"
import illustrationData from "../../src/assets/illustrations/template-card-data.svg"
import illustrationModoLivre from "../../src/assets/illustrations/template-card-modo-livre.svg"

const meta = {
  title: "Molecules/TemplateCard",
  component: TemplateCard,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=900-11221' },
  },
  args: {
    eyebrow: "DATA",
    title: "Cronológico",
    description: "Organize por ano, mês e dia. Ideal para memórias antigas e acervo histórico.",
    illustration: illustrationData,
    selected: false,
  },
} satisfies Meta<typeof TemplateCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = {
  args: { selected: true },
}

export const DashedIllustrationFrame: Story = {
  args: {
    eyebrow: "MODO LIVRE",
    title: "Modo livre",
    description: "Crie sua própria estrutura, do seu jeito. Recomendado para quem já tem um método.",
    illustration: illustrationModoLivre,
    dashedIllustrationFrame: true,
  },
}
