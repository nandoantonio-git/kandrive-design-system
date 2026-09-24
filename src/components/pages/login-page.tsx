import * as React from "react"

import { cn } from "@/lib/utils"
import { useMinWidth } from "@/lib/use-min-width"
import loginKan from "@/assets/illustrations/login-mobile-kan.svg"
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
  // Mobile (< 720): composição própria do Figma `Auth/Login/Mobile` — fundo teal, Kan
  // com o logo e o formulário sem card (`CardLogin device="mobile"`). Tablet e desktop:
  // o card de vidro sobre o fundo claro.
  const tablet = useMinWidth("tablet")
  return (
    <div
      data-slot="login-page"
      className={cn(
        "relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 desktop:min-h-[1022px]",
        // Mobile: `Brand/Primary/Action` (superfície, teal nos dois modos). O Figma usa
        // `Brand/Primary/Default`, que no Dark vira quase branco (papel de texto).
        "bg-brand-teal-action tablet:bg-zinc-50 tablet:dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      {/* Mobile: manchas desfocadas do Figma (Brand/Primary/Focus e Brand/Primary/Dark/Surface) */}
      <div aria-hidden="true" className="absolute -top-80 -left-84 size-[622px] rounded-full bg-brand-primary-focus opacity-40 blur-[159px] tablet:hidden" />
      <div aria-hidden="true" className="absolute top-[586px] left-16 h-[584px] w-[524px] rounded-full bg-brand-teal-dark-surface blur-[107px] tablet:hidden" />
      {/* Tablet e desktop */}
      <div aria-hidden="true" className="absolute -left-40 top-20 hidden size-[532px] rounded-full bg-brand-teal-action/20 blur-3xl tablet:block" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 hidden size-[638px] rounded-full bg-brand-pink-light/40 blur-3xl tablet:block" />

      <div className="relative flex w-full flex-col items-center gap-8 py-10 tablet:py-16">
        {/* Mobile: o Kan (canguru) com o logo, exportado do Figma */}
        <img src={loginKan} alt="Kandrive" className="h-[209px] w-[251px] shrink-0 tablet:hidden" />
        <img src={kandriveLogo} alt="Kandrive" className="hidden h-[52px] w-[204px] shrink-0 tablet:block dark:hidden" />
        {/* Logo sobre fundo escuro (Figma Logo/* dark): "Kan" + canguru (Kan) #F5F4F2, "drive" #337084 (Brand/Primary/Mid), símbolo #337084→#1A5E6E. */}
        <img src={kandriveLogoDark} alt="Kandrive" className="hidden h-[52px] w-[204px] shrink-0 tablet:dark:block" />
        <CardLogin {...cardProps} device={tablet ? "desktop" : "mobile"} />
        <a href="#criar-conta" onClick={onCreateAccount} className="text-sm text-white hover:underline tablet:text-zinc-600 tablet:dark:text-zinc-300">
          Ainda não tem conta?{" "}
          <span className="font-medium text-brand-primary-focus tablet:text-brand-teal">Crie uma agora</span>
        </a>
      </div>
    </div>
  )
}


export { LoginPage }
