import type { Meta, StoryObj } from "@storybook/react-vite"

import { TemplateReviewModalItem } from "../../src/components/organisms/template-review-modal-item"

const meta = {
  title: "Organisms/TemplateReviewModalItem",
  component: TemplateReviewModalItem,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1554-21151" },
  },
  args: {
    isExpanded: false,
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

export const Collapsed: Story = {}

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
