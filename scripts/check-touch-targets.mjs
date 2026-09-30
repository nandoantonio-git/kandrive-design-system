// Alvos de toque no Mobile (auditoria UX, A1): mede a área efetiva de cada elemento interativo nas histórias
// Mobile, em 390px com ponteiro de toque, somando o `::after` do utilitário `touch-target`.
// Uso: `npm run check:touch` (gera o Storybook estático e serve ele mesmo). Ou, com um Storybook já no ar:
// `node scripts/check-touch-targets.mjs http://localhost:6010`. Sai com erro se passar do limite de `BASELINE` (0).
// Sem Chromium do Playwright instalado, aponte `CHROME=/caminho/do/chrome-headless-shell`.
import { createServer } from "node:http"
import { existsSync, readFileSync } from "node:fs"
import { extname, join, normalize } from "node:path"
import { chromium } from "playwright"

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff" }
let server
let BASE = process.argv[2]
if (!BASE) {
  const root = "storybook-static"
  if (!existsSync(join(root, "index.json"))) { console.error("Rode `npm run build-storybook` antes (ou use `npm run check:touch`)."); process.exit(2) }
  server = createServer((req, res) => {
    const path = join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)))
    const file = existsSync(path) && !path.endsWith("/") ? path : join(path, "index.html")
    if (!existsSync(file) || !file.startsWith(root)) { res.writeHead(404).end(); return }
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file))
  })
  await new Promise((resolve) => server.listen(0, resolve))
  BASE = `http://localhost:${server.address().port}`
}
const MIN = 44
const SELECTOR = "button, a[href], input:not([type=hidden]), select, textarea, [role=button], [role=tab], [role=checkbox], [role=radio], [role=switch], [role=menuitem], summary"

const index = await (await fetch(`${BASE}/index.json`)).json()
const stories = Object.values(index.entries).filter((entry) => entry.type === "story" && /mobile/i.test(entry.id))

const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined })
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 })
const page = await context.newPage()
const rows = []
for (const story of stories) {
  await page.goto(`${BASE}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: "load" })
  await page.waitForTimeout(400)
  const found = await page.evaluate(({ SELECTOR, MIN }) => {
    const out = []
    for (const el of document.querySelectorAll(SELECTOR)) {
      const r = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      if (r.width === 0 || r.height === 0 || style.visibility === "hidden" || style.display === "none") continue
      if (el.closest("[aria-hidden=true]")) continue
      // Link em meio a texto corrido é isento (WCAG 2.5.8).
      if (el.tagName === "A" && getComputedStyle(el).display === "inline") continue
      // Caixa ou opção nativa dentro de um rótulo clicável: vale a área do rótulo.
      if (el.tagName === "INPUT" && /^(checkbox|radio)$/.test(el.type)) {
        const holder = el.closest("label, [role=checkbox], [role=radio], [role=switch]")
        if (holder && holder !== el) {
          const hr = holder.getBoundingClientRect()
          const ha = getComputedStyle(holder, "::after")
          const hw = Math.max(hr.width, ha.position === "absolute" && ha.content !== "none" ? parseFloat(ha.width) || 0 : 0)
          const hh = Math.max(hr.height, ha.position === "absolute" && ha.content !== "none" ? parseFloat(ha.height) || 0 : 0)
          if (hw >= MIN && hh >= MIN) continue
        }
      }
      const after = getComputedStyle(el, "::after")
      const aw = after.position === "absolute" && after.content !== "none" ? parseFloat(after.width) || 0 : 0
      const ah = after.position === "absolute" && after.content !== "none" ? parseFloat(after.height) || 0 : 0
      const w = Math.max(r.width, aw), h = Math.max(r.height, ah)
      if (w < MIN || h < MIN) out.push({ label: (el.getAttribute("aria-label") || el.textContent || el.tagName).trim().slice(0, 40), w: Math.round(w), h: Math.round(h) })
    }
    return out
  }, { SELECTOR, MIN })
  for (const f of found) rows.push({ story: story.id, ...f })
}
await browser.close()
server?.close()
const byStory = {}
for (const r of rows) byStory[r.story] = (byStory[r.story] ?? 0) + 1
console.log(`${stories.length} histórias Mobile, ${rows.length} alvos abaixo de ${MIN}px`)
if (process.env.VERBOSE) for (const r of rows) console.log(`${r.story}  ${r.w}x${r.h}  ${r.label}`)
else console.log(Object.entries(byStory).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => `${v}  ${k}`).join("\n"))
const BASELINE = Number(process.env.BASELINE ?? 0)
if (rows.length > BASELINE) { console.error(`Mais alvos pequenos do que o permitido (${rows.length} > ${BASELINE}).`); process.exit(1) }
