import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

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
    title: "Por data",
    description: "Organize por ano, mês e dia. Ideal para memórias antigas e acervo histórico.",
    illustration: illustrationData,
    selected: false,
  },
} satisfies Meta<typeof TemplateCard>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique no card pra alternar `selected` (os Controls acompanham). */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <TemplateCard {...live} onClick={() => updateLive({ selected: !live.selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clique no card alterna `selected` (`aria-pressed`).
  play: async ({ canvasElement }) => {
    const card = within(canvasElement).getByRole("button", { name: /Por data/ })
    await expect(card).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(card)
    await expect(card).toHaveAttribute("aria-pressed", "true")
  },
}

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
