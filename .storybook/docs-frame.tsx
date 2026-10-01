import { useEffect, useRef, useState } from "react"

/**
 * Moldura de Docs para histórias que dependem da largura da janela (breakpoints) ou de um
 * tamanho fixo maior que a coluna. O Canvas inline usa a largura da coluna (~960px) e mostra
 * o layout errado ou deixa o conteúdo vazar; aqui a história abre num iframe na largura real
 * (1440, 720, 390) e a moldura é reduzida para caber. Use no MDX:
 * `<DocsFrame id="templates-appshell--desktop" width={1440} height={760} />`.
 */
export function DocsFrame({ id, width, height }: { id: string; width: number; height: number }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setScale(Math.min(1, el.clientWidth / width))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div
      ref={box}
      className="my-4 overflow-hidden rounded-xl border border-zinc-300 bg-white"
      style={{ width: "100%", maxWidth: width, height: height * scale }}
    >
      <iframe
        title={id}
        src={`iframe.html?id=${id}&viewMode=story`}
        style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: "top left" }}
      />
    </div>
  )
}
