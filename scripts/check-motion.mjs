// Movimento reduzido (auditoria UX, A8): todo trecho com movimento (transform, translate, rotate, scale,
// animate-*, transition-all) precisa de `motion-reduce:` ou `motion-safe:` no mesmo trecho, ou de uma regra
// `prefers-reduced-motion` no mesmo arquivo. Rode: npm run check:motion
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOT = "src/components"
// Só conta movimento de verdade: transição ou animação. `-translate-*` sozinho é posicionamento estático.
const MOVEMENT = /(transition-\[[^\]]*(transform|translate|rotate|scale)[^\]]*\]|transition-transform|transition-all|\banimate-(?!none)[a-z-]+)/
const SAFE = /motion-reduce:|motion-safe:/

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".tsx") ? [path] : []
  })
}

const problems = []
for (const file of walk(ROOT)) {
  const source = readFileSync(file, "utf8")
  if (/prefers-reduced-motion/.test(source)) continue
  source.split("\n").forEach((line, index) => {
    if (!/className|cn\(|["'`]/.test(line) || /^\s*(\/\/|\*|\/\*)/.test(line)) return
    if (MOVEMENT.test(line) && !SAFE.test(line)) problems.push(`${file}:${index + 1}  ${line.trim().slice(0, 110)}`)
  })
}

if (problems.length) {
  console.error(`Movimento sem motion-reduce/motion-safe (${problems.length}):\n` + problems.join("\n"))
  process.exit(1)
}
console.log("check:motion ok")
