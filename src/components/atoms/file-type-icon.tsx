import * as React from "react"

import { cn } from "@/lib/utils"
import fileIcon from "@/assets/file-type-icons/file.svg"
import folderIcon from "@/assets/file-type-icons/folder.svg"
import imageIcon from "@/assets/file-type-icons/image.svg"
import videoIcon from "@/assets/file-type-icons/video.svg"

export type FileTypeIconType = "file" | "folder" | "image" | "video"

export interface FileTypeIconProps extends Omit<React.ComponentProps<"img">, "src"> {
  /** Figma `Type`: File, Folder, Image, Video. */
  type: FileTypeIconType
}

// Tamanho natural de cada variante no Figma (`Layout=Thumbnail` para File e Folder, `Layout=Default` para Image e Video).
const ICON: Record<FileTypeIconType, { src: string; className: string }> = {
  file: { src: fileIcon, className: "h-[27px] w-[21px]" },
  folder: { src: folderIcon, className: "h-[18px] w-4" },
  image: { src: imageIcon, className: "h-[23px] w-6" },
  video: { src: videoIcon, className: "h-[26px] w-[31px]" },
}

/**
 * atom/FileTypeIcon (`1444:21914`): o glifo do tipo de arquivo, com o gradiente teal da marca.
 * Usado nas listas do "Liberar espaço" (arquivos grandes e duplicados).
 *
 * É imagem (`<img>`), não SVG embutido, para os gradientes de vários ícones na mesma tela não
 * colidirem pelo `id`. Decorativo por padrão (`alt=""`); passe `alt` quando o tipo não estiver escrito ao lado.
 */
function FileTypeIcon({ type, alt = "", className, ...props }: FileTypeIconProps) {
  const icon = ICON[type]
  return (
    <img
      data-slot="file-type-icon"
      data-type={type}
      src={icon.src}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      className={cn("shrink-0 object-contain", icon.className, className)}
      {...props}
    />
  )
}

export { FileTypeIcon }
