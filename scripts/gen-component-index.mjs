// Índice dos componentes: lê o `title` e o `component` de cada `*.stories.tsx` e escreve `docs/COMPONENTS.md`
// (camada, grupo, componente, arquivo e Docs no Storybook ao vivo). Uso: `npm run docs:components`.
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const SITE = "https://kandrive-design-system.vercel.app"
const LAYERS = ["Atoms", "Molecules", "Organisms", "Templates", "Pages"]
const rows = []
for (const layer of readdirSync("stories", { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const file of readdirSync(join("stories", layer.name)).filter((f) => f.endsWith(".stories.tsx"))) {
    const src = readFileSync(join("stories", layer.name, file), "utf8")
    const title = src.match(/title:\s*["'`]([^"'`]+)["'`]/)?.[1]
    if (!title || !LAYERS.includes(title.split("/")[0])) continue
    const component = src.match(/component:\s*(\w+)/)?.[1]
    let imp = ""
    if (component) {
      for (const m of src.matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g)) {
        if (m[1].split(",").some((n) => n.trim().split(/\s+as\s+/).pop() === component)) { imp = m[2]; break }
      }
    }
    const path = imp ? imp.replace(/^\.\.\/\.\.\//, "").replace(/$/, ".tsx") : ""
    const [lay, ...rest] = title.split("/")
    const name = rest.pop()
    const group = rest.join(" / ")
    const id = title.toLowerCase().replace(/[\s/]+/g, "-")
    rows.push({ lay, group, name, path, doc: `${SITE}/?path=/docs/${encodeURI(id)}--docs` })
  }
}
rows.sort((a, b) => LAYERS.indexOf(a.lay) - LAYERS.indexOf(b.lay) || a.group.localeCompare(b.group) || a.name.localeCompare(b.name))

let out = `# Índice dos componentes

Gerado por \`npm run docs:components\` a partir das histórias do Storybook. **${rows.length} componentes**.
\`src/components/atoms/animated-icons.tsx\` é o módulo dos ícones animados (Organizar, Guardar, Etiquetar e Home) e não tem página própria; é por isso que o README conta 141 arquivos e este índice, 140.\nPara saber como usar um componente, abra a página Docs dele: ela traz o link do Figma, o uso, as props, os estados e a terminologia.
Como importar: \`import { Nome } from "@/components/<camada>/<arquivo>"\`. Veja [USAGE.md](USAGE.md).

`
for (const lay of LAYERS) {
  const list = rows.filter((r) => r.lay === lay)
  if (!list.length) continue
  out += `## ${lay} (${list.length})\n\n| Grupo | Componente | Arquivo | Docs |\n|---|---|---|---|\n`
  for (const r of list) out += `| ${r.group || "-"} | \`${r.name}\` | ${r.path ? `\`${r.path}\`` : "-"} | [Docs](${r.doc}) |\n`
  out += "\n"
}
writeFileSync("docs/COMPONENTS.md", out)
console.log(`docs/COMPONENTS.md: ${rows.length} componentes`)
