import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { NodeContextMenu } from "../../src/components/molecules/node-context-menu"

const meta = {
  title: "Molecules/Organização/NodeContextMenu",
  component: NodeContextMenu,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1383-15617' },
  },
  argTypes: {
    state: { control: "select", options: ["floating-info-panel", "state-3"] },
    logicalOperator: { control: "select", options: ["and", "or"] },
  },
  args: {},
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NodeContextMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — E/OU alterna, as pílulas abrem suas listas, e as regras são adicionadas, removidas, descartadas e salvas em memória. */
export const Default: Story = {
  args: { onSave: fn(), onAddRule: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <NodeContextMenu {...live} onLogicalOperatorChange={(logicalOperator) => updateLive({ logicalOperator })} />
        )}
      </LiveArgs>
    )
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    // E/OU troca o operador.
    await userEvent.click(canvas.getByRole("button", { name: "OU" }))
    await expect(canvas.getByRole("button", { name: "OU" })).toHaveAttribute("aria-pressed", "true")
    // Adicionar com a nova linha vazia mostra o aviso (State3 do Figma).
    await userEvent.click(canvas.getByRole("button", { name: /Adicionar regra/ }))
    await expect(canvas.getByRole("alert")).toHaveTextContent("Preencha todas as informações")
    // Preencher a nova linha: Atributo e Operação pelas listas, Valor digitado.
    await userEvent.click(canvas.getAllByRole("button", { name: "Atributo" })[0])
    await userEvent.click(canvas.getByRole("button", { name: "Tipo" }))
    await userEvent.click(canvas.getAllByRole("button", { name: "Operação" })[0])
    await userEvent.click(canvas.getByRole("button", { name: "=Igual" }))
    const inputs = canvas.getAllByRole("textbox", { name: "Valor" })
    await userEvent.type(inputs[inputs.length - 1], ".mp4")
    await expect(canvas.queryByRole("alert")).toBeNull()
    await userEvent.click(canvas.getByRole("button", { name: /Adicionar regra/ }))
    await expect(args.onAddRule).toHaveBeenCalledWith({ attribute: "Tipo", operation: "=Igual", value: ".mp4" })
    await expect(canvas.getAllByRole("button", { name: /Remover condição/ })).toHaveLength(2)
    // Remover a primeira e salvar.
    await userEvent.click(canvas.getByRole("button", { name: "Remover condição 1" }))
    await userEvent.click(canvas.getByRole("button", { name: "Salvar mudanças" }))
    await expect(args.onSave).toHaveBeenCalledWith([{ attribute: "Tipo", operation: "=Igual", value: ".mp4" }], "or")
  },
}

export const WrongInput: Story = {
  args: { state: "state-3" },
}

export const LogicalOr: Story = {
  args: { logicalOperator: "or" },
}
