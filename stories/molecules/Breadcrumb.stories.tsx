import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumb } from "../../src/components/molecules/breadcrumb"

const meta = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  args: { segments: ["Home", "Configurações"] },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** Trilha de Settings (`settings-page`): o último nível fica em cor de marca. */
export const Default: Story = {}

/** Home: um único nível (`home-page`). */
export const HomeOnly: Story = { args: { segments: ["Home"] } }

/** Outras trilhas usadas nas páginas. */
export const Pages: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Breadcrumb segments={["Home", "Armazenamento"]} aria-label="Trilha: Armazenamento" />
      <Breadcrumb segments={["Home", "Templates de organização"]} aria-label="Trilha: Templates de organização" />
      <Breadcrumb segments={["Home", "Planos Kandrive"]} aria-label="Trilha: Planos Kandrive" />
      <Breadcrumb segments={["Home", "Perguntas Frequentes"]} aria-label="Trilha: Perguntas Frequentes" />
    </div>
  ),
}
