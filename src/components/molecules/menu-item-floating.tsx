import * as React from "react"

import { cn } from "@/lib/utils"

export type MenuItemFloatingProps = React.ComponentProps<"div">

/**
 * molecule/MenuItemFloating (`1363:16485`): o painel de vidro que flutua abaixo de um botão.
 * É a base do `organism/DropdownMenu` e do `organism/DropNewTag`.
 *
 * Figma: `Effect/Glass/White/70` sobre `Effect/Glass/Surface/Light` 60%, raio 6, efeito de vidro,
 * sombra larga e nenhum traço de borda. O conteúdo (itens, campos) é de quem usa.
 */
function MenuItemFloating({ className, ...props }: MenuItemFloatingProps) {
  return (
    <div
      data-slot="menu-item-floating"
      className={cn(
        "flex flex-col overflow-hidden rounded-md bg-effect-glass-white-70 shadow-[0px_16px_32px_rgba(0,0,0,0.1)] backdrop-blur-md dark:shadow-[0px_16px_32px_rgba(0,0,0,0.4)]",
        className
      )}
      {...props}
    />
  )
}

export { MenuItemFloating }
