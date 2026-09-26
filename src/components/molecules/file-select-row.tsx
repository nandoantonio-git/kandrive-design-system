import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/atoms/checkbox"
import folderSymbol from "@/assets/illustrations/organize-file-folder.svg"

export interface FileSelectRowProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  name: string
  /** Ex.: "4.2 MB". */
  meta: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

/**
 * Linha selecionável da lista "Selecionar arquivos" do Organize no mobile
 * (`Organize/ChooseMethod/Mobile`, frames `file-row-*`). 🧩 No Figma é um frame
 * solto, não um componente: extraído aqui porque se repete 6 vezes.
 *
 * - 60px de altura, padding 10/16, divisória inferior `Neutral/Border/Subtle`.
 * - Símbolo de pasta de 36×32, opaco e igual no Light e no Dark.
 * - Nome em 16px, a Regra 4 para texto de leitura. ⚠️ No Figma, o nome tem 14px.
 * - Tamanho em 11px, `Neutral/Text/Tertiary`, dentro da exceção de microtexto.
 * - `atom/Checkbox` MD. Tocar em qualquer ponto da linha também marca.
 */
function FileSelectRow({ name, meta, checked = false, onCheckedChange, className, ...props }: FileSelectRowProps) {
  return (
    <div
      data-slot="file-select-row"
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "flex min-h-[60px] cursor-pointer items-center gap-3 border-b border-neutral-border-subtle px-4 py-2.5 last:border-b-0",
        checked && "bg-brand-teal-light/20",
        className
      )}
      {...props}
    >
      <img src={folderSymbol} alt="" aria-hidden="true" className="h-8 w-9 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-base leading-5 text-neutral-text-primary">{name}</p>
        <p className="truncate text-[0.6875rem] leading-4 text-neutral-text-tertiary">{meta}</p>
      </div>
      <Checkbox
        size="md"
        aria-label={`Selecionar ${name}`}
        checked={checked}
        onClick={(event) => event.stopPropagation()}
        onCheckedChange={onCheckedChange}
        className="touch-target"
      />
    </div>
  )
}

export { FileSelectRow }
