import type { Meta, StoryObj } from "@storybook/react-vite"

import { UserProfileCard } from "../../src/components/organisms/user-profile-card"

const meta = {
  title: "Organisms/UserProfileCard",
  component: UserProfileCard,
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1702-22547" } },
  args: { name: "Cassandra Ribeiro", email: "cassandra@kandrive.com.br" },
} satisfies Meta<typeof UserProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const vp = (value: "kdMobile" | "kdTablet") => ({ viewport: { value, isRotated: false } })
/** Mobile · 390: ações abaixo da identidade, dividindo a largura. */
export const Mobile: Story = { globals: vp("kdMobile") }
