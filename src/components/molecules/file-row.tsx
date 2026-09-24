import * as React from "react"

import { cn } from "@/lib/utils"

export interface FileRowProps extends React.ComponentProps<"div"> {
  /** Figma `Type`: folder (com fundo e borda) · file. */
  type?: "folder" | "file"
  name: string
  /** Ex.: "Pasta • 12 itens" ou "PDF • 2.4 MB". */
  meta: string
  /** Ex.: "12/09/2023". */
  date?: string
}

/**
 * `molecule/FileRow` `Device=Mobile`: Figma-confirmado no KanDrive V0.2.1.
 * É a linha da lista de arquivos no mobile (Home em modo Lista), com 328×50,
 * raio 16 e padding 8/12. No desktop e no tablet, a lista usa `FileList`.
 *
 * - Pasta: fundo `Effect/Overlay/Subtle` a 10% e borda `Brand/Primary/Light`.
 *   Arquivo: sem fundo.
 * - Nome em 16px, a Regra 4 para texto de leitura. ⚠️ No Figma, o nome tem 13px.
 * - Metadados e data em 11px (`Neutral/Text/Tertiary`), dentro da exceção de
 *   microtexto da Regra 4.
 */
function FileRow({ type = "file", name, meta, date, className, ...props }: FileRowProps) {
  return (
    <div
      data-slot="file-row"
      data-type={type}
      className={cn(
        "flex min-h-[50px] w-full items-center gap-3 rounded-2xl px-3 py-2",
        type === "folder" && "border border-brand-teal-light bg-effect-overlay-subtle/10",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-base leading-5 text-neutral-text-primary">{name}</p>
        <p className="truncate text-[0.6875rem] leading-4 text-neutral-text-tertiary">{meta}</p>
      </div>
      {date ? <span className="shrink-0 text-[0.6875rem] leading-4 text-neutral-text-tertiary">{date}</span> : null}
    </div>
  )
}

export { FileRow }
