import type { Meta, StoryObj } from "@storybook/react-vite"

import { AccordionItem } from "../../src/components/molecules/accordion-item"

const meta = {
  title: "Molecules/AccordionItem",
  component: AccordionItem,
  parameters: {
    layout: "padded",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3051-9641" },
  },
  argTypes: {
    question: { control: "text" },
    open: { control: "boolean" },
    chevron: { control: false },
  },
  args: {
    question: "Como adiciono meus primeiros arquivos?",
    children: "Toque em \"+ Adicionar\" no menu lateral e escolha os arquivos ou pastas que você quer guardar.",
  },
  decorators: [(Story) => <div className="max-w-[831px]"><Story /></div>],
} satisfies Meta<typeof AccordionItem>

export default meta
type Story = StoryObj<typeof meta>

/** Figma `Expanded=true`. */
export const Expanded: Story = { args: { open: true } }

/** 🧩 Figma `Expanded=false`: sem o painel e com o chevron girado. */
export const Collapsed: Story = { args: { open: false } }

/** Vários itens em sequência, como no FAQ. O último não tem divisor. */
export const List: Story = {
  render: () => (
    <div className="flex flex-col">
      <AccordionItem question="Como adiciono meus primeiros arquivos?" open>
        Toque em "+ Adicionar" no menu lateral e escolha os arquivos ou pastas.
      </AccordionItem>
      <AccordionItem question="O que é guardar no longo prazo?">
        Guardar é a ação de mover um arquivo do acesso rápido para o longo prazo.
      </AccordionItem>
      <AccordionItem question="O que é acesso rápido?">
        É a categoria de armazenamento de curto prazo.
      </AccordionItem>
    </div>
  ),
}
