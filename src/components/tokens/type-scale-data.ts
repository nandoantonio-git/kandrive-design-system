import type { TypeScaleEntry } from "@/components/tokens/type-specimen"

/**
 * Dados da escala tipográfica — espelham a tabela Figma-confirmada de
 * `Tokens/Typography` (ver `docs/audits/tokens/Typography.md` pro
 * histórico de reconciliação). Nenhum valor novo aqui, só estruturado
 * pra alimentar `TypeScale`/`TypeSpecimen`.
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
  { token: "Type/Label/SM", weightLabel: "Medium 500", fontWeight: 500, sizePx: 16, sizeRem: "1rem", lineHeight: "16px", tracking: "0.1", cssSnippet: "text-base font-medium leading-4 tracking-[0.00625em]" },
  { token: "Type/Button/MD", weightLabel: "Medium 500", fontWeight: 500, sizePx: 16, sizeRem: "1rem", lineHeight: "20px", tracking: "0.1", cssSnippet: "text-base font-medium leading-5 tracking-[0.00625em]" },
  { token: "Type/Body/SM", weightLabel: "Regular 400", fontWeight: 400, sizePx: 13, sizeRem: "0.8125rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-[0.8125rem] tracking-[0.0075em]" },
  { token: "Type/Caption/SM", weightLabel: "Regular 400", fontWeight: 400, sizePx: 11, sizeRem: "0.6875rem", lineHeight: "16px", tracking: "0.2", cssSnippet: "text-[0.6875rem] leading-4 tracking-[0.0125em]" },
  { token: "Type/Body/XS", weightLabel: "Regular 400", fontWeight: 400, sizePx: 10, sizeRem: "0.625rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-[0.625rem] tracking-[0.0075em]" },
  { token: "Type/Body/XS/Bold", weightLabel: "Bold 700", fontWeight: 700, sizePx: 10, sizeRem: "0.625rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-[0.625rem] font-bold tracking-[0.0075em]" },
  { token: "Type/Tag", weightLabel: "Regular 400", fontWeight: 400, sizePx: 11, sizeRem: "0.6875rem", lineHeight: "100%", tracking: "0.12", cssSnippet: "text-[0.6875rem] tracking-[0.0075em]" },
]
