import type { Meta, StoryObj } from "@storybook/react-vite"

import { Header } from "../../src/components/organisms/header"

const meta = {
  title: "Organisms/Header",
  component: Header,
  parameters: { layout: "fullscreen", design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1255-22352' } },
  args: {
    page: "navbar",
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Navbar: Story = {}

export const Settings: Story = {
  args: { page: "settings" },
}

export const Storage: Story = {
  args: { page: "storage" },
}
