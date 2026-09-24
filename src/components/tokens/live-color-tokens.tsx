import * as React from "react"

import { cn } from "@/lib/utils"
import { useCopy } from "@/components/tokens/token-swatch"
import { CSS_TO_FIGMA, FIGMA_COLORS } from "@/components/tokens/figma-color-bridge"

/**
 * Tokens de cor lidos AO VIVO de `src/index.css`: as regras `:root` (Light) e
 * `.dark` (Dark) das folhas de estilo carregadas. Os valores nunca ficam
 * desatualizados em relação ao código. `figma-color-bridge.ts` só liga cada
 * nome CSS à variável do Figma e guarda os valores do Figma para comparação.
 *
 * Os valores são lidos das declarações, não do elemento renderizado, então
 * a tabela é a mesma com o Storybook em Light ou Dark.
 */

type Status = "match" | "diverge" | "code-only"

interface ColorToken {
  name: string
  light: string
  dark: string
  figma?: string
  status: Status
}

const COLOR_RE = /^(#|oklch\(|rgba?\(|hsla?\(|color-mix\(|transparent$)/i

function collectDeclarations(): { root: Map<string, string>; dark: Map<string, string> } {
  const root = new Map<string, string>()
  const dark = new Map<string, string>()
  const visit = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && (rule.selectorText === ":root" || rule.selectorText === ".dark")) {
        const target = rule.selectorText === ":root" ? root : dark
        for (const prop of Array.from(rule.style)) {
          if (prop.startsWith("--")) target.set(prop, rule.style.getPropertyValue(prop).trim())
        }
      }
      if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules) visit((rule as CSSGroupingRule).cssRules)
    }
  }
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      visit(sheet.cssRules)
    } catch {
      /* folha de outra origem: ignorada */
    }
  }
  return { root, dark }
}

/** Resolve `var(--x)` usando as declarações do modo (Dark cai para :root). */
function resolve(value: string, maps: Map<string, string>[], depth = 0): string {
  const m = value.match(/^var\((--[a-z0-9-]+)(?:\s*,\s*(.+))?\)$/i)
  if (!m || depth > 8) return value
  for (const map of maps) {
    const next = map.get(m[1])
    if (next !== undefined) return resolve(next, maps, depth + 1)
  }
  return m[2] ? resolve(m[2], maps, depth + 1) : value
}

let ctx: CanvasRenderingContext2D | null = null
/** Normaliza qualquer cor CSS para `#rrggbbaa` (ou null se o navegador não converter). */
function toHex8(color: string): string | null {
  // Pinta 1 pixel e lê de volta: funciona para hex, rgb, oklch e color-mix.
  ctx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", {
    willReadFrequently: true,
  })
  if (!ctx || !CSS.supports("color", color)) return null
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  const h = (n: number) => n.toString(16).padStart(2, "0")
  return "#" + h(r) + h(g) + h(b) + h(a)
}

function sameColor(a: string, b: string): boolean {
  const x = toHex8(a)
  const y = toHex8(b)
  if (!x || !y) return false
  for (let i = 1; i < 9; i += 2) {
    if (Math.abs(parseInt(x.slice(i, i + 2), 16) - parseInt(y.slice(i, i + 2), 16)) > 1) return false
  }
  return true
}

function useColorTokens(): ColorToken[] {
  const [tokens, setTokens] = React.useState<ColorToken[]>([])
  React.useEffect(() => {
    const { root, dark } = collectDeclarations()
    const out: ColorToken[] = []
    for (const name of root.keys()) {
      const light = resolve(root.get(name)!, [root])
      const darkValue = resolve(dark.get(name) ?? root.get(name)!, [dark, root])
      if (!COLOR_RE.test(light)) continue
      const figma = CSS_TO_FIGMA[name]
      const ref = figma ? FIGMA_COLORS[figma] : undefined
      const status: Status = !ref
        ? "code-only"
        : sameColor(light, ref.light) && sameColor(darkValue, ref.dark)
          ? "match"
          : "diverge"
      out.push({ name, light, dark: darkValue, figma, status })
    }
    setTokens(out)
  }, [])
  return tokens
}

const STATUS: Record<Status, { label: string; className: string }> = {
  match: { label: "✅ Figma-confirmado", className: "bg-emerald-50 text-emerald-800" },
  diverge: { label: "⚠️ Diverge do Figma", className: "bg-red-50 text-red-800" },
  "code-only": { label: "🧩 Só no código", className: "bg-zinc-100 text-zinc-600" },
}

const GROUPS: { key: string; title: string; test: (t: ColorToken) => boolean }[] = [
  { key: "brand", title: "Marca", test: (t) => !!t.figma?.startsWith("Brand/") },
  { key: "storage", title: "Armazenamento", test: (t) => !!t.figma?.startsWith("Storage/") },
  { key: "neutral", title: "Neutros", test: (t) => !!t.figma?.startsWith("Neutral/") },
  { key: "effect", title: "Efeitos (Liquid Glass e overlays)", test: (t) => !!t.figma?.startsWith("Effect/") },
  { key: "base", title: "Base shadcn/ui (fora do Figma)", test: (t) => !t.figma },
]

function Swatch({ value, mode }: { value: string; mode: "light" | "dark" }) {
  return (
    <div
      className={cn("flex items-center gap-2 rounded-lg p-2", mode === "light" ? "bg-white ring-1 ring-zinc-200" : "bg-[#18181b]")}
    >
      <span aria-hidden="true" className="size-8 shrink-0 rounded-md ring-1 ring-black/10" style={{ background: value }} />
      <code className={cn("text-[0.6875rem] break-all", mode === "light" ? "text-zinc-700" : "text-zinc-200")}>{value}</code>
    </div>
  )
}

function TokenRow({ token }: { token: ColorToken }) {
  const { copied, copy } = useCopy()
  const figmaRef = token.figma ? FIGMA_COLORS[token.figma] : undefined
  return (
    <div className="grid grid-cols-1 items-center gap-2 border-b border-zinc-100 py-2 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => copy(`var(${token.name})`)}
          className="w-fit cursor-pointer text-left text-xs font-semibold break-all text-zinc-900 hover:text-brand-teal"
          title="Copiar var()"
        >
          {copied === `var(${token.name})` ? "Copiado!" : token.name}
        </button>
        <span className="text-[0.6875rem] text-zinc-500">{token.figma ?? "sem variável no Figma"}</span>
        <span className={cn("w-fit rounded-full px-1.5 py-0.5 text-[0.625rem] font-medium", STATUS[token.status].className)}>
          {STATUS[token.status].label}
        </span>
        {token.status === "diverge" && figmaRef ? (
          <span className="text-[0.625rem] text-red-800">
            Figma: {figmaRef.light} / {figmaRef.dark}
          </span>
        ) : null}
      </div>
      <Swatch value={token.light} mode="light" />
      <Swatch value={token.dark} mode="dark" />
    </div>
  )
}

/** Tabela de todos os tokens de cor do código, agrupados, com Light e Dark lado a lado. */
function LiveColorTokens() {
  const tokens = useColorTokens()
  if (!tokens.length) return <p>Carregando tokens…</p>
  const counts = {
    total: tokens.length,
    match: tokens.filter((t) => t.status === "match").length,
    diverge: tokens.filter((t) => t.status === "diverge").length,
    codeOnly: tokens.filter((t) => t.status === "code-only").length,
  }
  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm text-zinc-700">
        <strong>{counts.total}</strong> tokens de cor no código · <strong>{counts.match}</strong> iguais ao Figma nos dois
        modos · <strong>{counts.diverge}</strong> divergentes · <strong>{counts.codeOnly}</strong> só no código.
      </p>
      {GROUPS.map((group) => {
        const rows = tokens.filter(group.test)
        if (!rows.length) return null
        return (
          <section key={group.key} className="flex flex-col">
            <h3 className="mb-2 text-base font-semibold text-zinc-900">
              {group.title} <span className="font-normal text-zinc-500">({rows.length})</span>
            </h3>
            <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 pb-1 text-[0.6875rem] font-medium tracking-wide text-zinc-500 uppercase sm:grid">
              <span>Token CSS · Figma</span>
              <span>Light</span>
              <span>Dark</span>
            </div>
            {rows.map((t) => (
              <TokenRow key={t.name} token={t} />
            ))}
          </section>
        )
      })}
    </div>
  )
}

/** Variáveis de cor do Figma que ainda não têm token CSS. */
function FigmaOnlyColors() {
  const mapped = new Set(Object.values(CSS_TO_FIGMA))
  const rows = Object.entries(FIGMA_COLORS).filter(([name]) => !mapped.has(name))
  return (
    <div className="flex flex-col">
      <p className="mb-2 text-sm text-zinc-700">
        <strong>{rows.length}</strong> variáveis do Figma sem token CSS. Nas telas, muitas aparecem como classes do
        Tailwind (`zinc-*`) ou valores literais nos componentes.
      </p>
      {rows.map(([name, v]) => (
        <div
          key={name}
          className="grid grid-cols-1 items-center gap-2 border-b border-zinc-100 py-2 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]"
        >
          <span className="text-xs font-semibold text-zinc-900">{name}</span>
          <Swatch value={v.light} mode="light" />
          <Swatch value={v.dark} mode="dark" />
        </div>
      ))}
    </div>
  )
}

export { LiveColorTokens, FigmaOnlyColors }
