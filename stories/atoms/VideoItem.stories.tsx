import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { VideoItem } from "../../src/components/atoms/video-item"

const meta = {
  title: "Atoms/Symbols/VideoItem",
  component: VideoItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=212-3691' },
  },
  argTypes: {
    state: {
      control: "select",
      options: [
        "idle",
        "hover",
        "pressed",
        "disabled",
        "selected",
        "selected-hover",
        "selected-pressed",
        "favicon-header-thumbnail",
      ],
    },
  },
  args: {
    name: "Arquivo 2",
    showName: true,
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoItem>

export default meta
type Story = StoryObj<typeof meta>

/** Sem `state` fixo — passe o mouse e clique pra selecionar (vivo). */
export const Idle: Story = {
  args: { onSelectedChange: fn() },
  // Clique seleciona (`aria-pressed`); Enter desfaz a seleção.
  play: async ({ args, canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "Arquivo 2" })
    await expect(item).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(item)
    await expect(item).toHaveAttribute("aria-pressed", "true")
    await expect(args.onSelectedChange).toHaveBeenLastCalledWith(true)
    await userEvent.keyboard("{Enter}")
    await expect(item).toHaveAttribute("aria-pressed", "false")
  },
}

export const Hover: Story = {
  args: { state: "hover" },
}

export const Pressed: Story = {
  args: { state: "pressed" },
}

export const Disabled: Story = {
  args: { state: "disabled", onSelectedChange: fn() },
  // Desabilitado: o clique não seleciona.
  play: async ({ args, canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "Arquivo 2" })
    await expect(item).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(item)
    await expect(args.onSelectedChange).not.toHaveBeenCalled()
    await expect(item).toHaveAttribute("aria-pressed", "false")
  },
}

export const Selected: Story = {
  args: { state: "selected" },
}

export const FaviconHeaderThumbnail: Story = {
  args: { state: "favicon-header-thumbnail" },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <VideoItem state="idle" />
      <VideoItem state="hover" />
      <VideoItem state="pressed" />
      <VideoItem state="disabled" />
      <VideoItem state="selected" />
      <VideoItem state="selected-hover" />
      <VideoItem state="selected-pressed" />
      <VideoItem state="favicon-header-thumbnail" />
    </div>
  ),
}

/** Sem `state` fixo — passe o mouse, clique/pressione Enter pra selecionar de verdade (não é freeze-frame). */
export const Interactive: Story = {
  args: { state: undefined },
  render: (args) => (
    <div className="flex items-end gap-3">
      <VideoItem {...args} name="Arquivo 1" />
      <VideoItem {...args} name="Arquivo 2" defaultSelected />
      <VideoItem {...args} name="Arquivo 3" disabled />
    </div>
  ),
}
