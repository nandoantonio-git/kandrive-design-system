import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { TemplateReviewModal } from "../../src/components/templates/template-review-modal"

const meta = {
  title: "Templates/TemplateReviewModal",
  component: TemplateReviewModal,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1431-20397' } },
  args: {
    items: [
      {
        name: "Relatórios 2023_Final",
        itemsLabel: "Pasta · 12 itens",
        severity: "duplicado",
        suggestedPath: "Financeiro / 2023 / Relatórios",
        suggestedPathLabel: "Taxonomia Sugerida:",
        children: [{ name: "Q1_Report_v2.pdf", meta: "PDF · 2.4 MB" }],
      },
      {
        name: "Projetos_Antigos_Misc",
        itemsLabel: "Pasta · 45 itens",
        severity: "incongruente",
        suggestedPath: "Fotos / RAW",
        children: [{ name: "Contrato_v1_OLD.docx", meta: "DOCX · 1.1 MB" }],
      },
      {
        name: "Arquivos_2023",
        itemsLabel: "Pasta · 8 itens",
        severity: "ok",
        suggestedPath: "2023 / Jan / Fev / Mar",
        children: [{ name: "Backup_Marco.zip", meta: "ZIP · 340 MB" }],
      },
    ],
  },
} satisfies Meta<typeof TemplateReviewModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onContinue: fn() },
  // A 1ª pasta abre expandida; cada seta abre ou fecha só a própria pasta. "Continuar" chama `onContinue`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Q1_Report_v2.pdf")).toBeVisible()
    await expect(canvas.queryByText("Contrato_v1_OLD.docx")).toBeNull()
    await userEvent.click(canvas.getAllByRole("button", { name: "Expandir" })[0])
    await expect(canvas.getByText("Contrato_v1_OLD.docx")).toBeVisible()
    await expect(canvas.getByText("Q1_Report_v2.pdf")).toBeVisible()
    await userEvent.click(canvas.getAllByRole("button", { name: "Colapsar" })[0])
    await expect(canvas.queryByText("Q1_Report_v2.pdf")).toBeNull()
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    await expect(args.onContinue).toHaveBeenCalledOnce()
  },
}

/** `Device=Mobile` (V0.2.1): só a lista em cards, em largura total. Título, aviso e ações ficam na tela. */
export const Mobile: Story = {
  args: { device: "mobile" },
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1754-53992" } },
  decorators: [(Story) => <div className="w-[364px]"><Story /></div>],
}
