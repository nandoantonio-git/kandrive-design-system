import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../../src/components/atoms/button"

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3028-3700" },
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "outline", "destructive", "glass", "secondary"] },
    size: { control: "radio", options: ["md", "lg"] },
    shape: { control: "radio", options: ["rounded", "pill"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
    asChild: { control: false },
  },
  args: {
    children: "Salvar alterações",
    variant: "primary",
    size: "md",
    shape: "rounded",
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Figma: `Style=Primary, Size=MD, Shape=Rounded, State=Default`. */
export const Primary: Story = {}

export const Outline: Story = { args: { variant: "outline", children: "Cancelar" } }

export const Destructive: Story = { args: { variant: "destructive", children: "Excluir" } }

/** Figma: Glass só existe em MD (36px de altura, raio 10). */
export const Glass: Story = { args: { variant: "glass" } }

/** Figma: Secondary só existe como Pill LG. */
export const Secondary: Story = { args: { variant: "secondary", size: "lg", shape: "pill", children: "Agora não" } }

export const LargePill: Story = { args: { size: "lg", shape: "pill", children: "Guardar arquivos" } }

export const Disabled: Story = { args: { disabled: true } }

/** `asChild`: o botão renderizado como link, com a mesma aparência. */
export const AsLink: Story = {
  args: { variant: "outline", asChild: true },
  render: (args) => (
    <Button {...args}>
      <a href="#esqueci-a-senha">Esqueci a senha</a>
    </Button>
  ),
}

/**
 * As 28 combinações do component set do Figma (`3028:3700`). Hover e Focus
 * são CSS: passe o mouse ou use Tab nesta story.
 */
export const Matrix: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const rows = [
      { variant: "primary", size: "md", shape: "rounded" },
      { variant: "outline", size: "md", shape: "rounded" },
      { variant: "destructive", size: "md", shape: "rounded" },
      { variant: "glass", size: "md", shape: "rounded" },
      { variant: "primary", size: "lg", shape: "rounded" },
      { variant: "primary", size: "lg", shape: "pill" },
      { variant: "secondary", size: "lg", shape: "pill" },
    ] as const
    return (
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-6 gap-y-4">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Style · Size · Shape</span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Default</span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Disabled</span>
        {rows.map((r) => (
          <div key={`${r.variant}-${r.size}-${r.shape}`} className="contents">
            <span className="text-xs text-zinc-600 dark:text-zinc-300">
              {r.variant} · {r.size} · {r.shape}
            </span>
            <Button variant={r.variant} size={r.size} shape={r.shape}>
              Salvar alterações
            </Button>
            <Button variant={r.variant} size={r.size} shape={r.shape} disabled>
              Salvar alterações
            </Button>
          </div>
        ))}
      </div>
    )
  },
}
