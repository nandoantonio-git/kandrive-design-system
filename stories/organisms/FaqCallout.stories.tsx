import type { Meta, StoryObj } from "@storybook/react-vite"

import { FaqCallout } from "../../src/components/organisms/faq-callout"

/**
 * Textos reais do FAQ (`FaqInfoCardCollapsed`, composto em `pages/faq-page`):
 * `info` vem de "Excluí um arquivo sem querer — dá para recuperar?"
 * (`FrequentIssues`); `warning` vem da pergunta sobre nomes repetidos em
 * "Guardados" (`LongTermStorage`).
 */
const meta = {
  title: "Organisms/FaqCallout",
  component: FaqCallout,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1288-16935" } },
  args: {
    tone: "info",
    children:
      "Arquivos excluídos ficam na Lixeira por até 30 dias antes de serem removidos definitivamente. Dentro desse prazo, você pode restaurá-los.",
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["info", "warning"] },
  },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
} satisfies Meta<typeof FaqCallout>

export default meta
type Story = StoryObj<typeof meta>

/** Tom `info` (ℹ️). */
export const Info: Story = {}

/** Tom `warning` (⚠). */
export const Warning: Story = {
  args: {
    tone: "warning",
    children:
      'Se algum nome já existir no destino, o Kandrive adiciona automaticamente um sufixo (ex.: "arquivo (1)") para evitar substituir o arquivo existente — nada é sobrescrito sem você perceber.',
  },
}
