import * as React from "react"

/** Breakpoints do código (Tokens/Responsividade): tablet 45rem (720px), desktop 75rem (1200px). */
export const BREAKPOINTS = { tablet: "45rem", desktop: "75rem" } as const

/**
 * `true` quando a largura da tela é ≥ o breakpoint. Use só onde o Figma tem
 * composições diferentes por dispositivo e não dá para trocar por CSS sem
 * duplicar o DOM (ex. `CardLogin device`). Para layout, prefira `tablet:`/`desktop:`.
 */
function useMinWidth(breakpoint: keyof typeof BREAKPOINTS): boolean {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]})`
  const get = () => typeof window !== "undefined" && window.matchMedia(query).matches
  const [matches, setMatches] = React.useState(get)
  React.useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])
  return matches
}

export { useMinWidth }
