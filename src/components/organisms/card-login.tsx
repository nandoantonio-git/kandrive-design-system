import * as React from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"

export interface CardLoginProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit?: (values: { email: string; password: string }) => void
  onForgotPassword?: () => void
  onGoogleLogin?: () => void
  onAppleLogin?: () => void
  /**
   * Figma `Device`. `mobile` (`organism/CardLogin Device=Mobile`, tela `Auth/Login/Mobile`):
   * formulário direto sobre o fundo teal, sem card; texto branco, campos em vidro fosco
   * (`Effect/Glass/Frost/80`), "Entrar" em `Brand/Secondary`, sociais em `Frost/90`.
   * O `LoginPage` usa `mobile` abaixo de `tablet:`.
   */
  device?: "desktop" | "mobile"
}

/**
 * organism/Card/Login (`1454:22055`) — Figma-confirmado: "card de login do
 * usuário, no qual ele preenche suas informações para acessar ou usa dados
 * de terceiros para entrar(conta google)."
 *
 * **Conflito reduzido em 2026-08-10** (era alta, ver histórico em
 * `docs/conflicts.md`): releitura do Figma mostra que o usuário corrigiu a
 * maior parte do nó pra `Figtree` (headings, labels, link "Esqueceu sua
 * senha?", divisor "OU", botões sociais) e o botão "Entrar"/link já usam
 * `#007e96` (`brand-teal`, token de marca correto, Regra 3). Residual baixo:
 * 2 nós ainda especificam `Manrope` no Figma (placeholder dos inputs, label
 * do botão "Entrar") — implementado com `font-sans` (Figtree) mesmo assim,
 * por decisão travada (Regra 4), não resolvido silenciosamente como
 * Figma-confirmado. Paleta neutra (`#1a1c1c`/`#3e484c`/`#bec8cc`/`#f9f9f9`)
 * segue aproximada pela rampa Zinc — mesmo gap já registrado para a paleta
 * neutra geral do arquivo (`docs/conflicts.md`, "Paleta neutra"), não uma
 * divergência nova deste componente.
 */
function CardLogin({
  onSubmit,
  onForgotPassword,
  onGoogleLogin,
  onAppleLogin,
  device = "desktop",
  className,
  ...props
}: CardLoginProps) {
  const m = device === "mobile"
  const input = m
    ? "border-neutral-border-cool bg-effect-glass-frost-80/80 text-neutral-text-primary placeholder:text-neutral-text-tertiary"
    : "border-zinc-300 bg-zinc-50/80 text-zinc-900 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:placeholder:text-zinc-500"
  const label = m ? "text-white" : "text-zinc-600 dark:text-zinc-300"
  const social = m
    ? "border-neutral-border-cool bg-effect-glass-frost-90/90 text-neutral-text-graphite hover:bg-effect-glass-frost-90"
    : "border-zinc-300 bg-zinc-50/90 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 dark:hover:bg-zinc-800"
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div
      data-slot="card-login"
      data-device={device}
      className={cn(
        "relative flex w-full max-w-[400px] flex-col items-center gap-8",
        m ? "gap-6 px-2" : "min-h-[591px] rounded-3xl glass-edge glass-shadow-sm bg-effect-glass-white-36 px-6 py-9 tablet:px-9",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className={cn("text-2xl font-semibold", m ? "text-white" : "text-zinc-900 dark:text-zinc-100")}>Bem-vindo de volta</h1>
        <p className={cn("text-base", m ? "text-white" : "text-zinc-600 dark:text-zinc-300")}>
          Acesse sua conta segura no{" "}
          {/* No mobile (Figma Device=Mobile), a frase fica numa linha só. */}
          <br className={m ? "hidden" : undefined} />
          Kandrive
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit?.({ email, password })
        }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="card-login-email" className={cn("text-base font-medium", label)}>
            E-mail
          </label>
          <div className="relative">
            <Mail aria-hidden="true" className="pointer-events-none absolute left-[13px] top-1/2 size-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <input
              id="card-login-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={cn("w-full rounded-lg border py-3.5 pr-3 pl-10 text-base focus-visible:border-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50", input)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="card-login-password" className={cn("text-base font-medium", label)}>
              Senha
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className={cn("text-xs font-medium hover:underline", m ? "text-brand-primary-focus" : "text-brand-teal")}
            >
              Esqueceu sua senha?
            </button>
          </div>
          <div className="relative">
            <Lock aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <input
              id="card-login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={cn("w-full rounded-lg border py-3.5 pr-10 pl-10 text-base focus-visible:border-brand-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50", input)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              {showPassword ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className={cn("mt-1 w-full shadow-sm", m && "bg-brand-secondary text-brand-secondary-foreground hover:bg-brand-secondary/80 focus-visible:ring-brand-secondary/50 dark:bg-brand-secondary-dark dark:hover:bg-brand-secondary-dark/80")}
        >
          Entrar
        </Button>
      </form>

      <div className={cn("flex w-full items-center gap-3", !m && "opacity-60")}>
        <div className={cn("h-px flex-1", m ? "bg-neutral-border-cool" : "bg-zinc-300 dark:bg-zinc-700")} />
        <span className={cn("text-base font-normal", m ? "text-white" : "text-zinc-600 dark:text-zinc-300")}>OU</span>
        <div className={cn("h-px flex-1", m ? "bg-neutral-border-cool" : "bg-zinc-300 dark:bg-zinc-700")} />
      </div>

      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={onGoogleLogin}
          className={cn("w-full rounded-xl border py-3.5 text-sm font-medium shadow-sm transition-colors", social)}
        >
          Entrar com Google
        </button>
        <button
          type="button"
          onClick={onAppleLogin}
          className={cn("w-full rounded-xl border py-3.5 text-sm font-medium shadow-sm transition-colors", social)}
        >
          Entrar com Apple
        </button>
      </div>
    </div>
  )
}

export { CardLogin }
