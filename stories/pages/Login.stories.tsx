import type { Meta, StoryObj } from "@storybook/react-vite"

import { LoginPage } from "../../src/components/pages/login-page"

const meta = {
  title: "Pages/Login",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1745-13624" },
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
