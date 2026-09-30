import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { TemplateReviewModalItem } from "../../src/components/organisms/template-review-modal-item"

const meta = {
  title: "Organisms/Organização/TemplateReviewModalItem",
  component: TemplateReviewModalItem,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1554-21151" },
  },
  // Largura do Figma (720px): no modal o item ocupa a linha inteira; sem isso a história encolhe e o título encosta no selo.
  decorators: [(Story) => <div className="w-[720px] max-w-full"><Story /></div>],
  args: {
    isExpanded: false,
    onToggleExpand: () => {},
    item: {
      name: "Relatórios 2023_Final",
      itemsLabel: "12 itens",
      severity: "duplicado",
      suggestedPath: "Pessoal / Documentos / Relatórios",
      children: [{ name: "Q1_Report_v2.pdf", meta: "PDF · 3.2 MB" }],
    },
  },
} satisfies Meta<typeof TemplateReviewModalItem>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique na seta pra expandir/colapsar (`isExpanded`; os Controls acompanham). */
export const Collapsed: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <TemplateReviewModalItem {...live} onToggleExpand={() => updateLive({ isExpanded: !live.isExpanded })} />
        )}
      </LiveArgs>
    )
  },
  // A seta expande (mostra o arquivo filho) e colapsa de novo.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("Q1_Report_v2.pdf")).toBeNull()
    await userEvent.click(canvas.getByRole("button", { name: "Expandir" }))
    await expect(canvas.getByText("Q1_Report_v2.pdf")).toBeVisible()
    const collapse = canvas.getByRole("button", { name: "Colapsar" })
    await expect(collapse).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(collapse)
    await expect(canvas.queryByText("Q1_Report_v2.pdf")).toBeNull()
  },
}

export const Expanded: Story = {
  args: { isExpanded: true },
}

export const Incongruente: Story = {
  args: {
    item: {
      name: "Projetos_Antigos_Misc",
      itemsLabel: "45 itens",
      severity: "incongruente",
      suggestedPath: "Fotos / RAW",
    },
  },
}

export const Ok: Story = {
  args: {
    item: {
      name: "Arquivos_2023",
      itemsLabel: "8 itens",
      severity: "ok",
      suggestedPath: "2023 / Jan / Fev / Mar",
    },
  },
}

/** Excluir não some de vez (auditoria UX, A5): a linha vira "removido da organização" com "Desfazer". */
export const DeleteWithUndo: Story = {
  args: { isExpanded: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Excluir" }))
    await expect(canvas.getByRole("status")).toHaveTextContent("Q1_Report_v2.pdf removido da organização.")
    await userEvent.click(canvas.getByRole("button", { name: "Desfazer" }))
    await expect(canvas.getByText("Q1_Report_v2.pdf")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Excluir" })).toBeVisible()
  },
}
