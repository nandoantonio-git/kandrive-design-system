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

type Status = "match" | "diverge" | "code-only" | "figma-only"

interface ColorToken {
  /** Nome do token CSS; vazio quando a variável só existe no Figma. */
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
  "figma-only": { label: "🎨 Só no Figma", className: "bg-sky-50 text-sky-800" },
}

/** Ordem das famílias (1º nível do nome no Figma). */
const FAMILY_ORDER = ["Brand", "Storage", "Neutral", "UI", "Effect"]
const FAMILY_TITLE: Record<string, string> = {
  Brand: "Marca",
  Storage: "Armazenamento",
  Neutral: "Neutros",
  UI: "Interface",
  Effect: "Efeitos (Liquid Glass e overlays)",
  Base: "Base shadcn/ui (fora do Figma)",
}

/** Caminho hierárquico do token: família › grupo › nome restante. */
function pathOf(token: ColorToken): [family: string, group: string, leaf: string] {
  if (token.figma) {
    const [family, group, ...rest] = token.figma.split("/")
    return [family, group ?? "Geral", rest.join("/")]
  }
  // Tokens só do código: agrupados pelo prefixo do nome CSS (`--sidebar-*`, `--chart-*`…).
  const bare = token.name.replace(/^--/, "")
  const prefix = bare.split("-")[0]
  const grouped = ["sidebar", "chart", "color"].includes(prefix)
  return ["Base", grouped ? prefix : "Geral", bare]
}

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
        {token.name ? (
        <button
          type="button"
          onClick={() => copy(`var(${token.name})`)}
          className="w-fit cursor-pointer text-left text-xs font-semibold break-all text-zinc-900 hover:text-brand-teal"
          title="Copiar var()"
        >
          {copied === `var(${token.name})` ? "Copiado!" : token.name}
        </button>
        ) : (
          <span className="text-xs font-semibold text-zinc-900">sem token CSS</span>
        )}
        <span className="text-[0.6875rem] text-neutral-text-tertiary">{token.figma ?? "sem variável no Figma"}</span>
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

function useAllColors(): ColorToken[] {
  const tokens = useColorTokens()
  return React.useMemo(() => {
    if (!tokens.length) return tokens
    const mapped = new Set(tokens.map((t) => t.figma).filter(Boolean))
    const figmaOnly: ColorToken[] = Object.entries(FIGMA_COLORS)
      .filter(([name]) => !mapped.has(name))
      .map(([figma, v]) => ({ name: "", light: v.light, dark: v.dark, figma, status: "figma-only" }))
    return [...tokens, ...figmaOnly]
  }, [tokens])
}

/**
 * Tabela única de cor: tokens do código e variáveis que só existem no Figma,
 * agrupados pela hierarquia do nome no Figma (família › grupo), com Light e
 * Dark lado a lado. Cada família é um bloco recolhível.
 *
 * Consolidado em 2026-09-28 (pedido do usuário): antes eram duas áreas
 * separadas, "Tokens do código" e "Variáveis do Figma sem token CSS".
 */
function ColorTokens() {
  const all = useAllColors()
  if (!all.length) return <p>Carregando tokens…</p>
  const count = (status: Status) => all.filter((t) => t.status === status).length

  const families = new Map<string, Map<string, ColorToken[]>>()
  for (const token of all) {
    const [family, group] = pathOf(token)
    const groups = families.get(family) ?? new Map<string, ColorToken[]>()
    groups.set(group, [...(groups.get(group) ?? []), token])
    families.set(family, groups)
  }
  const order = [...FAMILY_ORDER, ...[...families.keys()].filter((f) => !FAMILY_ORDER.includes(f) && f !== "Base"), "Base"]

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-700">
        <strong>{all.length}</strong> cores · <strong>{count("match")}</strong> iguais ao Figma nos dois modos ·{" "}
        <strong>{count("diverge")}</strong> divergentes · <strong>{count("code-only")}</strong> só no código ·{" "}
        <strong>{count("figma-only")}</strong> só no Figma (nas telas, em geral aparecem como `zinc-*` ou valor literal).
      </p>
      {order.map((family) => {
        const groups = families.get(family)
        if (!groups) return null
        const total = [...groups.values()].reduce((n, rows) => n + rows.length, 0)
        return (
          <details key={family} open className="group rounded-xl border border-zinc-200 px-4 py-2">
            <summary className="cursor-pointer py-1 text-base font-semibold text-zinc-900">
              {FAMILY_TITLE[family] ?? family}{" "}
              <span className="font-normal text-neutral-text-tertiary">
                {family === "Base" ? "" : `${family}/ `}({total})
              </span>
            </summary>
            {[...groups.entries()].map(([group, rows]) => (
              <section key={group} className="mt-3 flex flex-col">
                <h4 className="mb-1 text-sm font-semibold text-zinc-700">
                  {family === "Base" ? group : `${family}/${group}`}{" "}
                  <span className="font-normal text-neutral-text-tertiary">({rows.length})</span>
                </h4>
                <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 pb-1 text-[0.6875rem] font-medium tracking-wide text-neutral-text-tertiary uppercase sm:grid">
                  <span>Figma · Token CSS</span>
                  <span>Light</span>
                  <span>Dark</span>
                </div>
                {rows.map((t) => (
                  <TokenRow key={t.name || t.figma} token={t} />
                ))}
              </section>
            ))}
          </details>
        )
      })}
    </div>
  )
}

export { ColorTokens }
