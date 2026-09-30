import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { FreeModeListItem } from "../../src/components/molecules/free-mode-list-item"

const meta = {
  title: "Molecules/Organização/OrganizeFreeModeCanvas/ListItem",
  component: FreeModeListItem,
  parameters: {
    layout: "centered",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1394-16408' },
  },
  argTypes: {
    operation: {
      control: "select",
      options: ["juncao", "subtracao", "intersseccao", "exclusao", "filtro-tamanho", "filtro-formato", "filtro-data"],
    },
    selected: { control: "boolean" },
    state: { control: "select", options: ["idle", "hover", "pressed"] },
  },
  args: { operation: "juncao" },
  decorators: [
    (Story) => (
      <div className="w-[342px] rounded-lg bg-[var(--neutral-surface-background,#f3f3f3)] p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FreeModeListItem>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique pra alternar `selected` (os Controls acompanham). */
export const Idle: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <FreeModeListItem {...live} onSelect={() => updateLive({ selected: !live.selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clique alterna `selected` (`aria-pressed`).
  play: async ({ canvasElement }) => {
    const item = within(canvasElement).getByRole("button", { name: "Junção" })
    await expect(item).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(item)
    await expect(item).toHaveAttribute("aria-pressed", "true")
  },
}

export const Selected: Story = { args: { selected: true } }

export const Hover: Story = { args: { state: "hover" } }

export const AllOperations: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      {(["idle", "hover", "pressed"] as const).flatMap((state) =>
        ([
          "juncao",
          "subtracao",
          "intersseccao",
          "exclusao",
          "filtro-tamanho",
          "filtro-formato",
          "filtro-data",
        ] as const).map((operation) => <FreeModeListItem key={`${state}-${operation}`} operation={operation} state={state} />)
      )}
    </div>
  ),
}
