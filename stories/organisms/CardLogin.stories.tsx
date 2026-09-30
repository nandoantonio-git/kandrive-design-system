import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import { CardLogin } from "../../src/components/organisms/card-login"

const meta = {
  title: "Organisms/Conta e diálogos/CardLogin",
  component: CardLogin,
  parameters: {
    layout: "padded",
    design: { type: 'figma', url: 'https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1454-22055' },
  },
} satisfies Meta<typeof CardLogin>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onSubmit: fn() },
  // Preencher e-mail e senha, mostrar a senha e enviar chama `onSubmit` com os valores.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole("textbox", { name: "E-mail" }), "ana@kandrive.com")
    const password = canvas.getByLabelText("Senha")
    await userEvent.type(password, "segredo123")
    await expect(password).toHaveAttribute("type", "password")
    await userEvent.click(canvas.getByRole("button", { name: "Mostrar senha" }))
    await expect(password).toHaveAttribute("type", "text")
    await userEvent.click(canvas.getByRole("button", { name: "Entrar" }))
    await expect(args.onSubmit).toHaveBeenCalledWith({ email: "ana@kandrive.com", password: "segredo123" })
  },
}

/**
 * Figma `organism/CardLogin` `Device=Mobile`: formulário sem card, sobre o fundo teal
 * da tela `Auth/Login/Mobile` (a story coloca esse fundo). Rótulos e campos mantêm 16px (Regra 4).
 */
export const Mobile: Story = {
  args: { device: "mobile" },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  decorators: [(Story) => <div className="bg-brand-teal-action p-6"><Story /></div>],
}

/**
 * Erro de envio (auditoria UX, A5): a mensagem genérica não diz qual campo errou, mas traz a saída
 * ("Esqueci a senha"). Campo com borda de erro, ícone de alerta e `role="alert"`; o foco vai para a senha.
 */
export const ErrorState: Story = {
  args: {
    error: "E-mail ou senha incorretos. Confira os dados e tente de novo, ou use \"Esqueceu sua senha?\".",
    onForgotPassword: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent("E-mail ou senha incorretos")
    const password = canvas.getByLabelText("Senha")
    await expect(password).toHaveAttribute("aria-invalid", "true")
    await expect(password).toHaveFocus()
    await userEvent.click(canvas.getByRole("button", { name: "Esqueceu sua senha?" }))
    await expect(args.onForgotPassword).toHaveBeenCalledOnce()
  },
}

export const ErrorStateMobile: Story = {
  args: { device: "mobile", error: "E-mail ou senha incorretos. Confira os dados e tente de novo, ou use \"Esqueceu sua senha?\"." },
  globals: { viewport: { value: "kdMobile", isRotated: false } },
  decorators: [(Story) => <div className="bg-brand-teal-action p-6"><Story /></div>],
}
