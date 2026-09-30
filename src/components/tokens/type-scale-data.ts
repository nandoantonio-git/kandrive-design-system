import type { TypeScaleEntry } from "@/components/tokens/type-specimen"

/**
 * Dados da escala tipográfica — espelham a tabela Figma-confirmada de
 * `Tokens/Typography` (ver `docs/audits/tokens/Typography.md` pro
 * histórico de reconciliação). Atualizado em 2026-09-30 para a escala de
 * 3 degraus (16/14/12, Regra 4 revisada) e os estilos novos do Figma.
 */
export const TYPE_SCALE: TypeScaleEntry[] = [
  { token: "Type/Display", weightLabel: "Regular 400", fontWeight: 400, sizePx: 50, sizeRem: "3.125rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-[3.125rem]" },
  { token: "Type/H1", weightLabel: "Bold 700", fontWeight: 700, sizePx: 40, sizeRem: "2.5rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-[2.5rem] font-bold" },
  { token: "Type/H2", weightLabel: "SemiBold 600", fontWeight: 600, sizePx: 32, sizeRem: "2rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-[2rem] font-semibold" },
  { token: "Type/H3", weightLabel: "Medium 500", fontWeight: 500, sizePx: 25, sizeRem: "1.5625rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-[1.5625rem] font-medium" },
  { token: "Type/Heading/MD", weightLabel: "Medium 500", fontWeight: 500, sizePx: 20, sizeRem: "1.25rem", lineHeight: "28px", tracking: "-0.2", cssSnippet: "text-xl font-medium leading-7 tracking-[-0.0125em]" },
  { token: "Type/Heading/SM", weightLabel: "SemiBold 600", fontWeight: 600, sizePx: 16, sizeRem: "1rem", lineHeight: "22px", tracking: "-0.1", cssSnippet: "text-base font-semibold leading-[22px] tracking-[-0.00625em]" },
  { token: "Type/Body/LG", weightLabel: "Bold 700", fontWeight: 700, sizePx: 20, sizeRem: "1.25rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-xl font-bold tracking-[0.0075em]" },
  { token: "Type/Body/MD", weightLabel: "Regular 400", fontWeight: 400, sizePx: 16, sizeRem: "1rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-base tracking-[0.0075em]" },
  { token: "Type/Body/MD/Medium", weightLabel: "Medium 500", fontWeight: 500, sizePx: 16, sizeRem: "1rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-base font-medium" },
  { token: "Type/Body/MD/Bold", weightLabel: "Bold 700", fontWeight: 700, sizePx: 16, sizeRem: "1rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-base font-bold" },
  { token: "Type/Label/SM", weightLabel: "Medium 500", fontWeight: 500, sizePx: 16, sizeRem: "1rem", lineHeight: "16px", tracking: "0.1", cssSnippet: "text-base font-medium leading-4 tracking-[0.00625em]" },
  { token: "Type/Button/MD", weightLabel: "Medium 500", fontWeight: 500, sizePx: 16, sizeRem: "1rem", lineHeight: "20px", tracking: "0.1", cssSnippet: "text-base font-medium leading-5 tracking-[0.00625em]" },
  { token: "Type/Body/SM", weightLabel: "Regular 400", fontWeight: 400, sizePx: 14, sizeRem: "0.875rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-sm tracking-[0.0075em]" },
  { token: "Type/Body/SM/Medium", weightLabel: "Medium 500", fontWeight: 500, sizePx: 14, sizeRem: "0.875rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-sm font-medium" },
  { token: "Type/Body/SM/Bold", weightLabel: "Bold 700", fontWeight: 700, sizePx: 14, sizeRem: "0.875rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-sm font-bold" },
  { token: "Type/Caption/SM", weightLabel: "Regular 400", fontWeight: 400, sizePx: 12, sizeRem: "0.75rem", lineHeight: "16px", tracking: "0.2", cssSnippet: "text-xs leading-4 tracking-[0.0125em]" },
  { token: "Type/Body/XS", weightLabel: "Regular 400", fontWeight: 400, sizePx: 12, sizeRem: "0.75rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-xs tracking-[0.0075em]" },
  { token: "Type/Body/XS/Medium", weightLabel: "Medium 500", fontWeight: 500, sizePx: 12, sizeRem: "0.75rem", lineHeight: "100%", tracking: "0", cssSnippet: "text-xs font-medium" },
  { token: "Type/Body/XS/Bold", weightLabel: "Bold 700", fontWeight: 700, sizePx: 12, sizeRem: "0.75rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-xs font-bold tracking-[0.0075em]" },
  { token: "Type/Tag", weightLabel: "Regular 400", fontWeight: 400, sizePx: 12, sizeRem: "0.75rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-xs tracking-[0.0075em]" },
]
