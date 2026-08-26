import * as React from "react"

import { cn } from "@/lib/utils"

export interface SettingsFieldProps extends Omit<React.ComponentProps<"input">, "id"> {
  label: string
}

/**
 * "Field" — par label (13px medium) + input (36px, `border-[#d4d4d4]`,
 * `bg-effect-glass-white-70`) repetido em Figma-confirmado nos cards
 * "Conta" (Nome/E-mail) e "Senha" (Senha atual/Nova senha/Confirmar nova
 * senha) de `page/Settings/Acount` (`1439:19849`), e no card "Excluir
 * conta" de `page/Settings/DeleteAccount` (`1439:21297`). Nenhum atom de
 * input genérico existia no catálogo — `molecule/SearchBar` é específico
 * de busca (ícone de lupa, pill). Extraído como molecule único (Regra
 * 1/10) em vez de repetido em cada card.
 */
function SettingsField({ label, className, ...props }: SettingsFieldProps) {
  const inputId = React.useId()
  return (
    <div className="flex min-w-px flex-1 flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[0.8125rem] font-medium text-zinc-950 dark:text-zinc-100">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "h-9 w-full rounded-md border border-[#d4d4d4] dark:border-[#52525b] bg-effect-glass-white-70 px-3 text-sm text-zinc-950 dark:text-zinc-100",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { SettingsField }
