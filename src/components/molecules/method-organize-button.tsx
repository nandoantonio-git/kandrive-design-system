import * as React from "react"

import { cn } from "@/lib/utils"
import ProjectGlyph from "@/assets/icons/MethodOrganizeProject.svg?react"
import DateGlyph from "@/assets/icons/MethodOrganizeDate.svg?react"
import TypeGlyph from "@/assets/icons/MethodOrganizeType.svg?react"

export type MobileOrganizeMethod = "projeto" | "data" | "tipo"

type Glyph = React.ComponentType<React.SVGProps<SVGSVGElement>>
const METHODS: Record<MobileOrganizeMethod, { label: string; tag: string; Glyph: Glyph }> = {
  projeto: { label: "Por projeto", tag: "Projeto", Glyph: ProjectGlyph },
  data: { label: "Por data", tag: "Data", Glyph: DateGlyph },
  tipo: { label: "Por tipo de arquivo", tag: "Tipo", Glyph: TypeGlyph },
}

export const MOBILE_ORGANIZE_METHODS = Object.keys(METHODS) as MobileOrganizeMethod[]

export interface MethodOrganizeButtonProps extends React.ComponentProps<"button"> {
  /** Figma `Method`: Project · Date · Type. */
  method?: MobileOrganizeMethod
  /** Mostra o chevron de lista (o botão abre a escolha de método). Nas opções da lista, fica sem. */
  withChevron?: boolean
  expanded?: boolean
}

/**
 * `molecule/MethodOrganizeButton`: Figma-confirmado no KanDrive V0.2.1
 * (`1663:8802`), com o eixo `Method` (Project · Date · Type). É o seletor de
 * método do Organize no mobile (`Organize/ChooseMethod/Mobile`), no lugar dos 4
 * cards do modal `SaveOrganizationModal` do desktop. O Modo livre não existe no
 * mobile: é uma tela exclusiva do desktop (canvas).
 *
 * - Caixa: 56px de altura, raio 12, fundo `Effect/Overlay/Subtle` a 10% com
 *   blur, borda de 0.5px em `Brand/Primary/Default`.
 * - Rótulo: 16px Medium, `Neutral/Text/Secondary`. Tag: 9px Bold em
 *   maiúsculas, `Brand/Primary/Default`, com a mesma caixa em pílula.
 * - 🧩 Ícone: no Figma é um gradiente cinza a 60%. Aqui usa `currentColor`
 *   (`Neutral/Text/Secondary` a 60%) para acompanhar o Dark.
 * - 🧩 Abrir a lista de métodos (`expanded`) é extensão de engenharia: o Figma
 *   não desenha o estado aberto.
 */
function MethodOrganizeButton({ method = "projeto", withChevron = true, expanded, className, ...props }: MethodOrganizeButtonProps) {
  const { label, tag, Glyph } = METHODS[method]
  return (
    <button
      type="button"
      data-slot="method-organize-button"
      data-method={method}
      aria-expanded={withChevron ? !!expanded : undefined}
      className={cn(
        "flex h-14 w-full cursor-pointer items-center gap-3 rounded-xl border-[0.5px] border-brand-teal bg-effect-overlay-subtle/10 px-4 text-left backdrop-blur-[15px] transition-colors",
        "hover:bg-effect-overlay-subtle/20 focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <Glyph aria-hidden="true" className="h-[34px] w-9 shrink-0 text-neutral-text-secondary/60" />
      <span className="min-w-0 flex-1 truncate text-base font-medium text-neutral-text-secondary">{label}</span>
      <span className="shrink-0 rounded-full border-[0.5px] border-brand-teal bg-effect-overlay-subtle/10 px-2.5 py-[3px] text-[0.5625rem] leading-[10px] font-bold text-brand-teal uppercase">
        {tag}
      </span>
      {withChevron ? (
        <svg aria-hidden="true" viewBox="0 0 10 10" className={cn("size-2.5 shrink-0 text-neutral-text-tertiary transition-transform", expanded && "rotate-180")}>
          <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  )
}

export { MethodOrganizeButton }
