import type { Meta, StoryObj } from "@storybook/react-vite"

import { RecoveryPending } from "../../src/components/organisms/recovery-pending"

const meta = {
  title: "Organisms/RecoveryPending",
  component: RecoveryPending,
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1765-61503" } },
  args: { fileName: "Backup_Documentos.tar", eta: "até 8h", progress: 0.75 },
  argTypes: { progress: { control: { type: "range", min: 0, max: 1, step: 0.05 } } },
  decorators: [(Story) => <div className="w-[342px]"><Story /></div>],
} satisfies Meta<typeof RecoveryPending>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
