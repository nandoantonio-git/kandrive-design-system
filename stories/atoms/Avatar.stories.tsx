import type { Meta, StoryObj } from "@storybook/react-vite"

import { Avatar } from "../../src/components/atoms/avatar"

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=3028-3715" } },
  args: { name: "Cassandra Ribeiro", size: 56 },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Sem foto: as iniciais (🧩 extensão de engenharia). */
export const Initials: Story = {}

/** Header: 36px. */
export const Header: Story = { args: { size: 36 } }
