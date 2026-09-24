import type { Meta, StoryObj } from "@storybook/react-vite"

import { CardLogin } from "../../src/components/organisms/card-login"

const meta = {
  title: "Organisms/CardLogin",
  component: CardLogin,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-22055' },
  },
} satisfies Meta<typeof CardLogin>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/**
 * Figma `organism/CardLogin` `Device=Mobile`: formulário sem card, sobre o fundo teal
 * da tela `Auth/Login/Mobile` (a story coloca esse fundo). Rótulos e campos mantêm 16px (Regra 4).
 */
export const Mobile: Story = {
  args: { device: "mobile" },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  decorators: [(Story) => <div className="bg-brand-teal-action p-6"><Story /></div>],
}
