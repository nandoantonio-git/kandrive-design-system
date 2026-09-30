import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { MethodCard } from "../../src/components/molecules/method-card"

const meta = {
  title: "Molecules/Organização/MethodCard",
  component: MethodCard,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3020-29527" } },
  argTypes: { value: { control: "radio", options: ["data", "projeto", "tipo"] } },
  decorators: [(Story) => <div className="w-[323px]"><Story /></div>],
} satisfies Meta<typeof MethodCard>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo: clique ou setas do teclado trocam o método marcado. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const date = canvas.getByRole("radio", { name: /Por data/ })
    await expect(date).toHaveAttribute("aria-checked", "true")
    await userEvent.click(canvas.getByRole("radio", { name: /Por projeto/ }))
    await expect(canvas.getByRole("radio", { name: /Por projeto/ })).toHaveAttribute("aria-checked", "true")
    await userEvent.keyboard("{ArrowDown}")
    await expect(canvas.getByRole("radio", { name: /Por tipo de arquivo/ })).toHaveAttribute("aria-checked", "true")
  },
}

/** As 3 variantes do eixo `Method` do Figma (Date · Project · FileType). */
export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <MethodCard value="data" />
      <MethodCard value="projeto" />
      <MethodCard value="tipo" />
    </div>
  ),
}
