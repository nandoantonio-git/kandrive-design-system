import type { Meta, StoryObj } from "@storybook/react-vite"

import { MobileSuccess } from "../../src/components/atoms/mobile-success"

const meta = {
  title: "Atoms/MobileSuccess",
  component: MobileSuccess,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1765-62024" } },
  argTypes: { message: { control: "radio", options: ["organized", "stored"] } },
  args: { message: "organized", fileName: "Backup_Documentos.tar" },
  decorators: [(Story) => <div className="flex w-[390px] justify-center rounded-3xl bg-[#007e96] px-6 py-16"><Story /></div>],
} satisfies Meta<typeof MobileSuccess>

export default meta
type Story = StoryObj<typeof meta>

export const Organized: Story = {}

export const Stored: Story = { args: { message: "stored", fileName: undefined } }
