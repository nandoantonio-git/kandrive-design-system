import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Label } from "../../src/components/molecules/label"

const meta = {
  title: "Molecules/Busca e filtros/Label",
  component: Label,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=302-12809' },
  },
  argTypes: {
    state: { control: "radio", options: ["default", "expanded", "disabled"] },
  },
  decorators: [(Story) => <div className="flex h-[200px] items-start"><Story /></div>],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo: clique abre, a busca filtra, escolher uma etiqueta atualiza a pílula e fecha. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /Etiquetar/ }))
    await userEvent.type(canvas.getByRole("searchbox", { name: "Buscar etiqueta" }), "doc")
    await expect(canvas.queryByRole("option", { name: /Image/ })).toBeNull()
    await userEvent.click(canvas.getByRole("option", { name: /Documentos/ }))
    await expect(canvas.getByRole("button", { name: /Documentos/ })).toHaveAttribute("aria-expanded", "false")
  },
}

/** Vivo, com a lista de etiquetas existentes (modo consolidado de `DropdownSelectLabel`). */
export const DynamicList: Story = {
  args: { defaultValue: "Contratos", labels: ["Contratos", "Pessoal", "Fotos"] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /Contratos/ }))
    await userEvent.click(canvas.getByRole("button", { name: /Pessoal/ }))
    await expect(canvas.getByRole("button", { name: /Pessoal/ })).toHaveAttribute("aria-expanded", "false")
  },
}

/** Estados fixos do eixo `State` do Figma (congelados via `state`). */
export const Expanded: Story = {
  args: { state: "expanded" },
}

export const Disabled: Story = {
  args: { state: "disabled" },
}

export const ExpandedDynamicList: Story = {
  args: {
    state: "expanded",
    value: "Contratos",
    labels: ["Contratos", "Pessoal", "Fotos"],
  },
}
