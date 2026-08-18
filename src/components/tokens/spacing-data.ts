export interface SpacingEntry {
  token: string
  value: string
  px: number
  role: string
  cssSnippet: string
}

/**
 * Dados da escala de espaçamento/radius — espelham as tabelas
 * Figma-confirmadas de `Tokens/Spacing` (histórico de reconciliação em
 * `docs/audits/tokens/Spacing.md`).
 */
export const SPACING_SCALE: SpacingEntry[] = [
  { token: "espacamento/escala/1", value: "1px", px: 1, role: "Traço/divisor de 1px", cssSnippet: "gap-px" },
  { token: "espacamento/escala/2", value: "2px", px: 2, role: "Micro-ajuste extremo", cssSnippet: "gap-0.5" },
  { token: "espacamento/escala/xs", value: "4px", px: 4, role: "Micro-ajuste (ícone + label)", cssSnippet: "gap-1" },
  { token: "espacamento/escala/sm", value: "6px", px: 6, role: "Padding interno mínimo (chip/badge)", cssSnippet: "gap-1.5" },
  { token: "espacamento/escala/md", value: "8px", px: 8, role: "Padding interno compacto", cssSnippet: "gap-2" },
  { token: "espacamento/escala/10", value: "10px", px: 10, role: "Padding intermediário (search bar)", cssSnippet: "gap-2.5" },
  { token: "espacamento/escala/lg", value: "12px", px: 12, role: "Gap entre elementos de sidebar", cssSnippet: "gap-3" },
  { token: "espacamento/escala/xl", value: "16px", px: 16, role: "Padding horizontal padrão de botão", cssSnippet: "gap-4" },
  { token: "espacamento/escala/20", value: "20px", px: 20, role: "Gap entre blocos da sidebar", cssSnippet: "gap-5" },
  { token: "espacamento/escala/2xl", value: "24px", px: 24, role: "Espaçamento entre seções", cssSnippet: "gap-6" },
  { token: "espacamento/escala/3xl", value: "32px", px: 32, role: "Espaçamento entre grandes blocos", cssSnippet: "gap-8" },
]

export const RADIUS_SCALE: SpacingEntry[] = [
  { token: "radius/xs", value: "4px", px: 4, role: "Borda de elemento pequeno", cssSnippet: "rounded" },
  { token: "radius/sm", value: "6px", px: 6, role: "Borda de botão/input", cssSnippet: "rounded-md" },
  { token: "radius/md", value: "8px", px: 8, role: "Borda de card compacto", cssSnippet: "rounded-lg" },
  { token: "radius/lg", value: "12px", px: 12, role: "Borda de card/painel", cssSnippet: "rounded-xl" },
  { token: "radius/20", value: "20px", px: 20, role: "Borda de painel largo", cssSnippet: "rounded-[20px]" },
  { token: "radius/xl", value: "16px", px: 16, role: "Borda de painel médio", cssSnippet: "rounded-2xl" },
  { token: "radius/2xl", value: "24px", px: 24, role: "Borda de card grande", cssSnippet: "rounded-3xl" },
  { token: "radius/3xl", value: "32px", px: 32, role: "Borda de painel grande", cssSnippet: "rounded-[32px]" },
  { token: "radius/pill", value: "9999px", px: 9999, role: "Pílula/fully-rounded", cssSnippet: "rounded-full" },
  { token: "radius/full", value: "100px", px: 100, role: "Círculo (ex.: avatar)", cssSnippet: "rounded-[100px]" },
]
