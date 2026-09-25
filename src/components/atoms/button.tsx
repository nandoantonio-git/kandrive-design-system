import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * `atom/Button`: o botão de texto de ação do produto. Figma-confirmado no
 * KanDrive V0.2.1, component set `3028:3700`, com 28 variantes. Os eixos do
 * Figma viram props:
 * - `Style` → `variant`: primary · outline · destructive · glass · secondary.
 *   A prop se chama `variant` para não colidir com o `style` do CSS.
 * - `Size` → `size`: md (36px, raio 6) · lg (46px Rounded, raio 12; 44px Pill).
 *   Alturas e raios arredondados para cima, em números pares (2026-09-24),
 *   depois que os rótulos passaram a 16px (Regra 4).
 * - `Shape` → `shape`: rounded · pill.
 * - `State` → CSS: `:hover`, `:focus-visible`, `:disabled`.
 *
 * Os estados seguem a descrição do componente no Figma: hover = fundo a 80%,
 * Outline no hover = fundo `#f5f5f5`, foco = anel de 3px a 50%,
 * disabled = opacidade 50%. Pressed não tem spec visual; o `translate-y-px`
 * no `:active` vem do código (Regra 8, feedback no press).
 *
 * ⚠️ CONFLICT (Regra 4 × Figma), registrado em docs/vault/Estado/Conflitos Abertos.md: o Figma usa
 * 14px no rótulo de MD e LG Rounded (16px só no Pill LG). A Regra 4 (travada)
 * exige no mínimo 16px em rótulo de botão, então o código usa 16px em todos,
 * como o `PushButton`, até uma decisão humana.
 *
 * Papéis (revisão dark/WCAG, 2026-09-24): o fundo usa tokens de SUPERFÍCIE,
 * que não mudam de tom no Dark (`brand-teal-action`, `destructive-surface`),
 * então o texto branco passa no WCAG nos dois modos.
 *
 * Regra 1 (revogada em 2026-09-23): este é o botão de ação do produto.
 * `atom/PushButton` fica para diálogos e toolbars no estilo macOS, e
 * `atom/IconButton` para botões só com ícone.
 */
const buttonVariants = cva(
  "inline-flex w-fit shrink-0 cursor-pointer items-center justify-center font-medium whitespace-nowrap transition-[background-color,box-shadow,transform] outline-none select-none focus-visible:ring-3 active:not-disabled:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-teal-action text-brand-teal-foreground hover:bg-brand-teal-action/80 focus-visible:ring-brand-teal-action/50",
        outline:
          "border border-neutral-border-medium text-neutral-text-primary hover:bg-[#f5f5f5] focus-visible:ring-neutral-border-medium/50 dark:hover:bg-zinc-800",
        destructive:
          "bg-destructive-surface text-white hover:bg-destructive-surface/80 focus-visible:ring-destructive-surface/50",
        glass:
          "gap-2 rounded-[10px] border border-effect-overlay-subtle bg-effect-overlay-subtle text-brand-secondary-dark hover:bg-effect-overlay-subtle/80 focus-visible:ring-effect-overlay-subtle",
        secondary:
          "border border-neutral-border-light bg-neutral-surface-subtle text-neutral-text-secondary hover:bg-neutral-surface-subtle/80 focus-visible:ring-neutral-border-light/50",
      },
      size: {
        md: "h-9 rounded-md px-4 py-2 text-base leading-5",
        lg: "h-11 rounded-xl px-6 py-3 text-base leading-5",
      },
      shape: {
        rounded: "",
        pill: "rounded-full",
      },
    },
    compoundVariants: [
      // Figma: Glass só existe em MD (36px, raio 10, gap 8).
      { variant: "glass", size: "md", className: "rounded-[10px]" },
      // Figma: LG Rounded tem 46px; o LG Pill fica com 44px.
      { shape: "rounded", size: "lg", className: "h-[46px]" },
      { shape: "pill", size: "lg", className: "rounded-full" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "rounded",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o filho (ex. `<a>`) com a aparência do botão. */
  asChild?: boolean
}

function Button({ className, variant, size, shape, asChild = false, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
