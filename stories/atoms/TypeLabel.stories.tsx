import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  FileTypeLabel,
  ScopeTypeLabel,
  DangerTypeLabel,
} from "../../src/components/atoms/type-label"

const meta = {
  title: "Atoms/Rótulos e badges/TypeLabel",
  component: FileTypeLabel,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=237-4728' },
  },
  argTypes: {
    kind: {
      control: "select",
      options: ["image", "document", "video", "other"],
    },
    overlay: { control: "boolean" },
    selected: { control: "boolean" },
  },
  args: {
    kind: "image",
  },
} satisfies Meta<typeof FileTypeLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  args: { kind: "image" },
}

export const Document: Story = {
  args: { kind: "document" },
}

export const Video: Story = {
  args: { kind: "video" },
}

export const Other: Story = {
  args: { kind: "other" },
}

/**
 * `Style=Light` — pensado para sobrepor uma miniatura/imagem escura (texto
 * branco). Decorator com fundo escuro só para o Storybook tornar o texto
 * visível no Canvas — o componente em si não inclui a miniatura.
 */
export const Overlay: Story = {
  args: { kind: "image", overlay: true },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
}

export const FileTypeMatrix: StoryObj = {
  // Colunas: DarkFilled (padrão) e Dark (sem fundo) sobre superfície clara; Light e Light selecionado sobre imagem escura, onde o texto branco é legível.
  render: () => {
    const kinds = ["image", "document", "video", "other"] as const
    const column = (title: string, children: React.ReactNode, dark = false) => (
      <div className={dark ? "flex flex-col gap-2 rounded-md bg-zinc-800 p-3" : "flex flex-col gap-2 p-3"}>
        <span className={dark ? "text-[0.625rem] font-bold text-zinc-300" : "text-[0.625rem] font-bold text-neutral-text-tertiary"}>{title}</span>
        {children}
      </div>
    )
    return (
      <div className="grid grid-cols-4 gap-3 rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-4">
        {column("DarkFilled", kinds.map((kind) => <FileTypeLabel key={`filled-${kind}`} kind={kind} />))}
        {column("Dark", kinds.map((kind) => <FileTypeLabel key={`dark-${kind}`} kind={kind} filled={false} />))}
        {column("Light", kinds.map((kind) => <FileTypeLabel key={`light-${kind}`} kind={kind} overlay />), true)}
        {column("Light · selecionado", kinds.map((kind) => <FileTypeLabel key={`selected-${kind}`} kind={kind} overlay state="selected" />), true)}
      </div>
    )
  },
}

export const FileTypeLegend: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <FileTypeLabel kind="image" />
      <FileTypeLabel kind="document" />
      <FileTypeLabel kind="video" />
      <FileTypeLabel kind="other" />
    </div>
  ),
}

export const ScopeMatrix: StoryObj = {
  render: () => (
    <div className="grid grid-cols-4 gap-3 rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-5">
      <div className="flex flex-col gap-2">
        <ScopeTypeLabel kind="default" label="Recentes" />
        <ScopeTypeLabel kind="default" label="Recentes" state="selected" />
        <DangerTypeLabel label="Recentes" />
      </div>
      <div className="flex flex-col gap-2">
        <ScopeTypeLabel kind="quick-access" label="Recentes" />
        <ScopeTypeLabel kind="quick-access" label="Recentes" state="hover" />
        <ScopeTypeLabel kind="quick-access" label="Recentes" state="selected" />
        <ScopeTypeLabel kind="quick-access" label="Recentes" state="selected-hover" />
        <ScopeTypeLabel kind="quick-access" label="Recentes" state="selected-pressed" />
      </div>
      <div className="flex flex-col gap-2">
        <ScopeTypeLabel kind="global" label="Recentes" />
        <ScopeTypeLabel kind="global" label="Recentes" state="hover" />
        <ScopeTypeLabel kind="global" label="Recentes" state="selected" />
        <ScopeTypeLabel kind="global" label="Recentes" state="selected-hover" />
        <ScopeTypeLabel kind="global" label="Recentes" state="selected-pressed" />
      </div>
      <div className="flex flex-col gap-2">
        <ScopeTypeLabel kind="long-term" label="Recentes" />
        <ScopeTypeLabel kind="long-term" label="Recentes" state="hover" />
        <ScopeTypeLabel kind="long-term" label="Recentes" state="selected" />
        <ScopeTypeLabel kind="long-term" label="Recentes" state="selected-hover" />
        <ScopeTypeLabel kind="long-term" label="Recentes" state="selected-pressed" />
      </div>
    </div>
  ),
}

/** Chips do seletor de escopo em `molecule/StorageStatus` (`Style=Expanded`). Vivo — clique num chip pra ativá-lo. */
export const ScopeSelector: StoryObj = {
  render: function Render() {
    const [scope, setScope] = React.useState<"global" | "quick-access" | "long-term">("global")
    return (
      <div className="flex gap-2">
        <ScopeTypeLabel kind="global" label="Global" active={scope === "global"} onClick={() => setScope("global")} />
        <ScopeTypeLabel kind="quick-access" label="Acesso rápido" active={scope === "quick-access"} onClick={() => setScope("quick-access")} />
        <ScopeTypeLabel kind="long-term" label="Longo prazo" active={scope === "long-term"} onClick={() => setScope("long-term")} />
      </div>
    )
  },
  // Clicar num chip inativo o ativa (`aria-pressed`) e desativa o anterior.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const global = canvas.getByRole("button", { name: "Global" })
    const quick = canvas.getByRole("button", { name: "Acesso rápido" })
    await expect(global).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(quick)
    await expect(quick).toHaveAttribute("aria-pressed", "true")
    await expect(global).toHaveAttribute("aria-pressed", "false")
  },
}

/** `Type=Tag, Style=Alert` — pílula de alerta/perigo. */
export const Danger: StoryObj = {
  render: () => <DangerTypeLabel label="Erro" />,
}
