import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fireEvent, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { OrganizePanelDropZone } from "../../src/components/organisms/organize-panel-drop-zone"

const meta = {
  title: "Organisms/Organização/OrganizePanelDropZone",
  component: OrganizePanelDropZone,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=309-14839' } },
  argTypes: {
    mode: { control: "radio", options: ["Data", "Projeto", "Tipo"] },
    state: { control: "radio", options: ["idle", "dragover", "filled"] },
    quantity: { control: "radio", options: [1, 2, 3, 4] },
  },
  args: {
    mode: "Data",
  },
} satisfies Meta<typeof OrganizePanelDropZone>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Vivo, sem `state` fixo: arraste arquivos do computador para o painel (vira
 * `dragover`) e solte (vira `filled`, com um item por arquivo, até o máximo do
 * Figma). O nome do template é editável (`templateName`; os Controls acompanham).
 */
export const Idle: Story = {
  args: { onFilesDrop: fn(), onContinue: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <OrganizePanelDropZone {...live} onTemplateNameChange={(templateName) => updateLive({ templateName })} />
        )}
      </LiveArgs>
    )
  },
  // Digitar nomeia o template; arrastar vira `dragover`, soltar 2 arquivos vira `filled`; "Continuar" chama `onContinue`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const name = canvas.getByRole("textbox", { name: "Nome do template de organização" })
    await userEvent.type(name, "Viagem")
    await expect(name).toHaveValue("Viagem")
    const zone = canvasElement.querySelector<HTMLElement>('[data-slot="organize-panel-drop-zone"]')!
    await fireEvent.dragEnter(zone)
    await expect(zone).toHaveAttribute("data-state", "dragover")
    // O `DragEvent` do Chrome não aceita `dataTransfer` sintético: o evento leva os arquivos numa propriedade própria.
    const files = [new File(["a"], "a.txt"), new File(["b"], "b.txt")]
    const drop = new Event("drop", { bubbles: true, cancelable: true })
    Object.defineProperty(drop, "dataTransfer", { value: { files } })
    await fireEvent(zone, drop)
    await expect(zone).toHaveAttribute("data-state", "filled")
    await expect(args.onFilesDrop).toHaveBeenCalledWith(files)
    await expect(canvas.getByText("Arquivo 2")).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    await expect(args.onContinue).toHaveBeenCalledOnce()
  },
}

export const Dragover: Story = {
  args: { state: "dragover" },
}

export const NamedTemplate: Story = {
  args: { templateName: "Fotos do casamento", mode: "Projeto" },
}

export const Filled: Story = {
  args: { state: "filled", templateName: "Fotos do casamento", quantity: 4 },
}
