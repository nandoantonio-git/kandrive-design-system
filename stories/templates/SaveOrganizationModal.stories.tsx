import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { useArgs } from "storybook/preview-api"
import { LiveArgs } from "../../.storybook/live-args"

import { SaveOrganizationModal } from "../../src/components/templates/save-organization-modal"

const meta = {
  title: "Templates/SaveOrganizationModal",
  component: SaveOrganizationModal,
  parameters: { layout: "centered", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=251-4480' } },
  args: {
    selected: "projeto",
  },
} satisfies Meta<typeof SaveOrganizationModal>

export default meta
type Story = StoryObj<typeof meta>

/** Vivo — clique num método pra selecioná-lo (`selected`; os Controls acompanham). */
export const Default: Story = {
  args: { onContinue: fn() },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <LiveArgs args={args} updateArgs={updateArgs}>
        {(live, updateLive) => (
          <SaveOrganizationModal {...live} onMethodSelect={(selected) => updateLive({ selected })} />
        )}
      </LiveArgs>
    )
  },
  // Clicar num método o seleciona e desmarca o anterior; "Continuar" chama `onContinue`.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: /Por projeto/ })).toHaveAttribute("aria-pressed", "true")
    const byDate = canvas.getByRole("button", { name: /Por data/ })
    await userEvent.click(byDate)
    await expect(byDate).toHaveAttribute("aria-pressed", "true")
    await expect(canvas.getByRole("button", { name: /Por projeto/ })).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    await expect(args.onContinue).toHaveBeenCalledOnce()
  },
}

export const NoneSelected: Story = {
  args: { selected: undefined },
}
