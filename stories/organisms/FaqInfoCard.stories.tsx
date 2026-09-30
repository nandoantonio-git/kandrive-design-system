import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { FaqInfoCard } from "../../src/components/organisms/faq-info-card"

const meta = {
  title: "Organisms/Ajuda/Faq/InfoCard",
  component: FaqInfoCard,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-24788' },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["faq", "card-with-callout"],
    },
  },
  args: {
    variant: "faq",
  },
} satisfies Meta<typeof FaqInfoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Faq: Story = {
  args: { variant: "faq", onCollapsedChange: fn() },
  // "Recolher" esconde as perguntas e vira "Expandir"; outro clique abre de novo.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Recolher" })
    const question = canvas.getByText("Como adiciono meus primeiros arquivos?")
    await expect(question).toBeVisible()
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-expanded", "false")
    await expect(toggle).toHaveAccessibleName("Expandir")
    await expect(question).not.toBeVisible()
    await expect(args.onCollapsedChange).toHaveBeenCalledWith(true)
    await userEvent.click(toggle)
    await expect(question).toBeVisible()
  },
}

export const CardWithCallout: Story = {
  args: { variant: "card-with-callout" },
}
