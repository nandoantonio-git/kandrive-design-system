// Docs com conteúdo que vaza da coluna: abre cada página Docs em 1440px e procura histórias
// (`.docs-story`) cujo conteúdo passa da borda da moldura. É o sintoma de uma história que depende da
// largura da janela (breakpoints) ou de tamanho fixo maior que a coluna; a correção é usar
// `DocsFrame` (`.storybook/docs-frame.tsx`) no MDX em vez de `Canvas`.
// Uso: `npm run check:docs` (gera o Storybook estático e serve ele mesmo). Sai com erro se achar vazamento.
// Sem Chromium do Playwright instalado, aponte `CHROME=/caminho/do/chrome-headless-shell`.
import { createServer } from "node:http"
import { existsSync, readFileSync } from "node:fs"
import { extname, join, normalize } from "node:path"
import { chromium } from "playwright"

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".mp4": "video/mp4" }
// Rolam na horizontal por desenho (faixa de chips dentro de uma moldura de 390px).
const SCROLLS_BY_DESIGN = ["molecules-navegação-mobilefootersettings--docs"]
const root = "storybook-static"
if (!existsSync(join(root, "index.json"))) { console.error("Rode `npm run build-storybook` antes (ou use `npm run check:docs`)."); process.exit(2) }
const server = createServer((req, res) => {
  const path = join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)))
  const file = existsSync(path) && !path.endsWith("/") ? path : join(path, "index.html")
  if (!existsSync(file) || !file.startsWith(root)) { res.writeHead(404).end(); return }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file))
})
await new Promise((resolve) => server.listen(0, resolve))
const BASE = `http://localhost:${server.address().port}`

const index = JSON.parse(readFileSync(join(root, "index.json"), "utf8"))
const docs = Object.values(index.entries).filter((e) => e.type === "docs" && !SCROLLS_BY_DESIGN.includes(e.id))
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {})
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const bad = []
let next = 0
async function worker() {
  while (next < docs.length) {
    const { id, title } = docs[next++]
    const page = await context.newPage()
    await page.goto(`${BASE}/iframe.html?id=${encodeURIComponent(id)}&viewMode=docs`, { waitUntil: "load" })
    await page.waitForTimeout(2200)
    const over = await page.evaluate(() => {
      let worst = 0
      document.querySelectorAll(".docs-story").forEach((story) => {
        const box = story.getBoundingClientRect()
        story.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.width > 0) worst = Math.max(worst, Math.round(r.right - box.right))
        })
      })
      return worst
    })
    if (over > 4) bad.push(`${title}: conteúdo passa ${over}px da moldura`)
    await page.close()
  }
}
await Promise.all([worker(), worker(), worker(), worker()])
await browser.close()
server.close()
console.log(`${docs.length} páginas Docs conferidas em 1440px.`)
if (bad.length) { console.error(bad.sort().join("\n")); console.error("Use `DocsFrame` no MDX (ver .storybook/docs-frame.tsx)."); process.exit(1) }
console.log("Nenhum vazamento.")
