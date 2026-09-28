import * as React from "react"

import { cn } from "@/lib/utils"
import UploadFolderGlyph from "@/assets/icons/UploadFolderGlyph.svg?react"

export interface UploadFolderProps extends React.SVGProps<SVGSVGElement> {}

/**
 * atom/UploadFolder — descrição do usuário em 2026-08-14: *"icone de
 * upload de uma pasta"*. 🧩 Sem componente no KanDrive V0.2.1 (busca de
 * 2026-09-28): o id antigo `212:3691` é o set `molecule/FileItem`, que não
 * tem variante de upload. — glifo composto (pasta + seta de upload). Sem eixo de
 * variante/estado confirmado (`get_design_context` retorna um único
 * vetor estático 16×16) — implementado só como átomo de exibição,
 * `currentColor` pra herdar cor de contexto (mesmo padrão de `atom/Icon`).
 */
function UploadFolder({ className, ...props }: UploadFolderProps) {
  return (
    <UploadFolderGlyph
      data-slot="upload-folder"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    />
  )
}

export { UploadFolder }
