import * as React from "react"

import { cn } from "@/lib/utils"
import ProjectGlyph from "@/assets/icons/MethodOrganizeProject.svg?react"
import DateGlyph from "@/assets/icons/MethodOrganizeDate.svg?react"
import TypeGlyph from "@/assets/icons/MethodOrganizeType.svg?react"
import type { MobileOrganizeMethod } from "@/components/molecules/method-organize-button"

type Glyph = React.ComponentType<React.SVGProps<SVGSVGElement>>

const OPTIONS: { value: MobileOrganizeMethod; title: string; description: string; Glyph: Glyph }[] = [
  {
    value: "data",
    title: "Por data",
    description: "Organize por ano, mês e dia. Ideal para memórias antigas e acervo histórico.",
    Glyph: DateGlyph,
  },
  {
    value: "projeto",
    title: "Por projeto",
    description: "Agrupe por cliente, evento ou processo. Perfeito para trabalhos e entregas.",
    Glyph: ProjectGlyph,
  },
  {
    value: "tipo",
    title: "Por tipo de arquivo",
    description: "Separe por fotos, vídeos e documentos. Bom para entender o que ocupa espaço.",
    Glyph: TypeGlyph,
  },
]

export interface MethodCardProps extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  /** Figma `Method` (Date · Project · FileType): a opção marcada. Controlada; quando omitida, o card guarda a escolha. */
  value?: MobileOrganizeMethod
  defaultValue?: MobileOrganizeMethod
  onValueChange?: (method: MobileOrganizeMethod) => void
}

/**
 * `molecule/MethodCard`: Figma-confirmado no KanDrive V0.2.1 (`3020:29527`),
 * "Card describing an organisation method (Date, Project, File type)", com o
 * eixo `Method` (Date · Project · FileType), em que cada variante marca uma
 * linha. Implementado em 2026-09-26: existia no Figma mas nunca tinha ido
 * para o código. Na tela de Organização (mobile), é a lista que o
 * `MethodOrganizeButton` abre.
 *
 * - Card: 323px, `Neutral/Surface/Card`, borda 1px `Neutral/Border/Subtle`,
 *   raio 12, sombra `0 4px 20px` a 12%.
 * - Linha: 78px, padding 12/16, gap 12. A 1ª e a 2ª têm divisória
 *   `Neutral/Border/Subtle`. Linha marcada: `Effect/Overlay/Light` a 60%.
 * - Ícone: caixa de 40px. Reusa os glifos do `MethodOrganizeButton` (mesmos
 *   desenhos), em `currentColor` para acompanhar o Dark.
 * - Texto: título 16px Bold `Neutral/Text/Secondary`; descrição 12px
 *   `Neutral/Text/Tertiary`. ⚠️ No Figma: 15px e 11px. Título sobe pro piso
 *   da Regra 4; a descrição fica como microtexto complementar, igual ao
 *   `TemplateCard`, que exibe o mesmo texto (decisão de 2026-09-26).
 * - Rádio: 16px. Desmarcado: anel 1.5px `Brand/Primary/Light`. Marcado:
 *   `Brand/Primary/Default` com ponto branco de 6px. ⚠️ No Figma, o rádio e a
 *   descrição estavam ligados aos tokens de tier `Storage/FastAccess` e
 *   `Storage/LongTerm` (mesmo hex por coincidência); aqui usam os tokens de
 *   papel (Regra 2, decisão de 2026-09-26).
 * - 🧩 Grupo de rádio de verdade (Regra 8): setas movem e marcam, Tab entra
 *   na opção marcada. O Figma só desenha os estados parados.
 */
function MethodCard({ value: controlledValue, defaultValue = "data", onValueChange, className, ...props }: MethodCardProps) {
  const [internalValue, setInternalValue] = React.useState<MobileOrganizeMethod>(defaultValue)
  const value = controlledValue ?? internalValue
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])

  const choose = (next: MobileOrganizeMethod) => {
    if (controlledValue === undefined) setInternalValue(next)
    onValueChange?.(next)
  }

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 : 0
    if (!step) return
    event.preventDefault()
    const nextIndex = (index + step + OPTIONS.length) % OPTIONS.length
    choose(OPTIONS[nextIndex].value)
    refs.current[nextIndex]?.focus()
  }

  return (
    <div
      data-slot="method-card"
      role="radiogroup"
      aria-label="Método de organização"
      className={cn(
        "flex w-full max-w-[323px] flex-col overflow-clip rounded-xl border border-neutral-border-subtle bg-neutral-surface-card shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
        className
      )}
      {...props}
    >
      {OPTIONS.map(({ value: option, title, description, Glyph }, index) => {
        const selected = option === value
        return (
          <button
            key={option}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-method={option}
            onClick={() => choose(option)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "flex min-h-[78px] w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors",
              "focus-visible:ring-3 focus-visible:ring-brand-teal-action/50 focus-visible:outline-none focus-visible:ring-inset",
              index < OPTIONS.length - 1 && "border-b border-neutral-border-subtle",
              selected ? "bg-effect-overlay-light/60" : "hover:bg-effect-overlay-light/30 active:bg-effect-overlay-light/60"
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center text-neutral-text-secondary/60">
              <Glyph aria-hidden="true" className="h-[34px] w-9" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-base leading-5 font-bold text-neutral-text-secondary">{title}</span>
              <span className="text-xs leading-4 text-neutral-text-tertiary">{description}</span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors",
                selected ? "border-brand-teal-action bg-brand-teal-action" : "border-brand-teal-light"
              )}
            >
              {selected ? <span className="size-1.5 rounded-full bg-neutral-surface-elevated" /> : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { MethodCard }
