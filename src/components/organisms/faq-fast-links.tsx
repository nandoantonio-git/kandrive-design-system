import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/atoms/icon"

export interface FaqFastLink {
  label: string
  href: string
  icon: IconName
}

const DEFAULT_LINKS: FaqFastLink[] = [
  { label: "Documentação da API", href: "#", icon: "MenuBook" },
  { label: "Fórum da comunidade", href: "#", icon: "Forum" },
  { label: "Tutoriais em vídeo", href: "#", icon: "Slideshow" },
]

export interface FaqFastLinksProps extends React.ComponentProps<"div"> {
  links?: FaqFastLink[]
}

/**
 * organism/FAQ/FastLinks (`1454:25006`) — Figma-confirmado: "estrutura de
 * links rápidos da aba de FAQ". 3 itens Figma-confirmados: "API
 * Documentation", "Community Forum", "Video Tutorials" — traduzidos para PT
 * (Regra 9: mantidos como tradução direta, não literais, já que o resto da
 * aba de FAQ é inteiramente em português; mesmo critério já usado em
 * `organism/upload-popover`, ver `docs/conflicts.md`).
 *
 * Padding Figma-confirmado (releitura de 2026-08-18, mesma estrutura da
 * releitura US-026 pass20): 2 níveis, não 1. O frame raiz só tem
 * `py-[24px]` (sem padding horizontal) — e dentro dele um wrapper próprio
 * carrega `p-[6px]` (todos os lados, reusando o token `--radius-sm` como
 * valor de padding, não de raio — nome de variável enganoso na fonte,
 * valor confirmado no nó real). A implementação anterior (2026-08-15,
 * decisão humana) achatava os 2 níveis num `px-1 py-6` só, sem o `p-6px`
 * interno — respiro visual real menor que o Figma em ambos os eixos.
 * Corrigido pra 2 níveis, batendo exatamente com a estrutura confirmada.
 *
 * Ícones exportados de verdade do Figma via `download_assets` (não
 * aproximação `lucide-react`) — `MenuBook`/`Forum`/`Slideshow` em
 * `atom/Icon`, ver `Atoms/Icon.mdx`.
 */
function FaqFastLinks({ links = DEFAULT_LINKS, className, ...props }: FaqFastLinksProps) {
  return (
    <div
      data-slot="faq-fast-links"
      className={cn(
        "flex w-[158px] flex-col items-center justify-center rounded-3xl py-6 shadow-[0px_2px_4px_rgba(9,9,11,0.08)]",
        className
      )}
      {...props}
    >
      <div className="flex w-full flex-col items-start gap-4 p-1.5">
        <p className="text-base text-zinc-950">Links Rápidos</p>
        <ul className="flex w-full flex-col gap-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-start gap-2 text-xs font-medium text-brand-teal hover:underline"
              >
                <Icon name={link.icon} className="mt-0.5 size-3.5 shrink-0" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { FaqFastLinks }
