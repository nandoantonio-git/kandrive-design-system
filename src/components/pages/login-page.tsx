import * as React from "react"

import { cn } from "@/lib/utils"
import { CardLogin, type CardLoginProps } from "@/components/organisms/card-login"
import kandriveLogo from "@/assets/logo/kandrive-logo.svg"
import kandriveLogoDark from "@/assets/logo/kandrive-logo-dark.svg"

export interface LoginPageProps extends React.ComponentProps<"div"> {
  cardProps?: CardLoginProps
  onCreateAccount?: () => void
}

/**
 * Page/login (`1439:21362`, antes "Kandrive Login - Glassmorphism
 * Edition" — capitalização/nome divergem das outras 22 telas `page/*`,
 * gap de nomenclatura já registrado em `docs/conflicts.md`) —
 * `figma-inventory.md` original (US-002) marcava esta tela como "0
 * instâncias de componente catalogado... não verificado em profundidade".
 * Auditoria fresca em 2026-08-23 (`get_design_context` no node
 * `1439:21392`, "Glass Login Card") resolve a dúvida: o card é
 * **idêntico**, texto por texto, a `organism/Card/Login` já implementado
 * (`card-login.tsx`) — mesmo heading "Bem-vindo de volta", subtítulo,
 * link "Esqueceu sua senha?", divisor "OU", botões "Entrar com Google"/
 * "Entrar com Apple", `400×591`, `bg-effect-glass-white-36`. Não é
 * conteúdo diferente, só um gap de instance-linking no arquivo Figma (o
 * card não está formalmente ligado ao componente nesta tela específica) —
 * reusado sem alteração (Regra 10).
 *
 * Elementos exclusivos desta página: logo centralizado (mesmo asset de
 * `organism/Header`) + fundo decorativo com 2 formas abstratas
 * desfocadas ("Abstract Background Shapes"/"Background+Blur", Figma-
 * confirmado como presentes, mas sem cor/gradiente exportável sem re-
 * auditoria de asset — aproximado aqui com os tokens de marca reais
 * (`brand-teal`/`brand-pink-light`) em vez de inventar uma paleta nova,
 * Regra 9) + link de rodapé "Ainda não tem conta? Crie uma agora"
 * (`1439:21444`, texto literal Figma-confirmado).
 */
function LoginPage({ cardProps, onCreateAccount, className, ...props }: LoginPageProps) {
  return (
    <div
      data-slot="login-page"
      className={cn("relative flex min-h-[1022px] w-full items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-20 size-[532px] rounded-full bg-brand-teal-action/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 size-[638px] rounded-full bg-brand-pink-light/40 blur-3xl"
      />
      <div className="relative flex flex-col items-center gap-8 py-16">
        <img src={kandriveLogo} alt="Kandrive" className="h-[52px] w-[204px] shrink-0 dark:hidden" />
      {/* Logo sobre fundo escuro (Figma Logo/* dark): "Kan" + canguru (Kan) #F5F4F2, "drive" #337084 (Brand/Primary/Mid), símbolo #337084→#1A5E6E. */}
      <img src={kandriveLogoDark} alt="Kandrive" className="h-[52px] w-[204px] shrink-0 hidden dark:block" />
        <CardLogin {...cardProps} />
        <a href="#criar-conta" onClick={onCreateAccount} className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline">
          Ainda não tem conta?{" "}
          <span className="font-medium text-brand-teal">Crie uma agora</span>
        </a>
      </div>
    </div>
  )
}

export { LoginPage }
