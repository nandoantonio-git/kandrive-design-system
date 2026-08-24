import type { Meta, StoryObj } from "@storybook/react-vite"

import { LoginPage } from "../../src/components/pages/login-page"

const meta = {
  title: "Pages/Login",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/oFp2TLeCG4GJeCOFVhBvjg/KanDrive?node-id=1439-21362" },
  },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
