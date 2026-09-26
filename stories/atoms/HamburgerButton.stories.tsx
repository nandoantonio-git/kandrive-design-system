import type { Meta, StoryObj } from "@storybook/react-vite"

import { HamburgerButton } from "../../src/components/atoms/hamburger-button"

const meta = {
  title: "Atoms/HamburgerButton",
  component: HamburgerButton,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1637-23253" } },
  argTypes: { mode: { control: "radio", options: ["closed", "expand"] } },
} satisfies Meta<typeof HamburgerButton>

export default meta
type Story = StoryObj<typeof meta>

/** No Header mobile: abre a gaveta. */
export const Closed: Story = { args: { mode: "closed" } }
/** Dentro da gaveta: fecha. */
export const Expand: Story = { args: { mode: "expand" } }
