import * as React from "react"

import { cn } from "@/lib/utils"
import { FileSelectRow } from "@/components/molecules/file-select-row"

export interface FileSelectListFile {
  name: string
  /** Ex.: "4.2 MB". */
  meta: string
}

export interface FileSelectListProps extends Omit<React.ComponentProps<"section">, "onChange"> {
  files: FileSelectListFile[]
  /** Nomes marcados (controlado). */
  selected: ReadonlySet<string>
  onSelectedChange?: (name: string, checked: boolean) => void
  title?: string
}

/**
 * A seção "Selecionar arquivos" das telas de tarefa mobile
 * (`Organize/ChooseMethod/Mobile` e `LongTermStorage/SelectFiles/Mobile`).
 * 🧩 No Figma é um frame (`file-list-section`), não um componente.
 *
 * - Título: 11px Bold em maiúsculas, `Neutral/Text/Tertiary`.
 * - Lista: card `Neutral/Surface/Card`, borda `Neutral/Border/Subtle`, raio 12,
 *   com linhas `FileSelectRow`.
 */
function FileSelectList({ files, selected, onSelectedChange, title = "Selecionar arquivos", className, ...props }: FileSelectListProps) {
  const titleId = React.useId()
  return (
    <section data-slot="file-select-list" aria-labelledby={titleId} className={cn("flex flex-col gap-2", className)} {...props}>
      <h2 id={titleId} className="text-[0.6875rem] leading-4 font-bold text-neutral-text-tertiary uppercase">
        {title}
      </h2>
      <div className="overflow-hidden rounded-xl border border-neutral-border-subtle bg-neutral-surface-card">
        {files.map((file) => (
          <FileSelectRow
            key={file.name}
            name={file.name}
            meta={file.meta}
            checked={selected.has(file.name)}
            onCheckedChange={(checked) => onSelectedChange?.(file.name, checked)}
          />
        ))}
      </div>
    </section>
  )
}

export { FileSelectList }
