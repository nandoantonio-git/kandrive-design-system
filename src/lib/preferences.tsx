import * as React from "react"

export type Hand = "right" | "left"

export interface Preferences {
  /** Mão dominante: muda o lado do FAB no `MobileBottomNav`. Settings → Aparência (padrão: direita). */
  hand: Hand
}

const PreferencesContext = React.createContext<Preferences & { setHand: (hand: Hand) => void }>({
  hand: "right",
  setHand: () => {},
})

/**
 * Preferências do usuário que mudam a interface (decisão de responsividade,
 * 2026-09-24). Por enquanto só a mão dominante, que no futuro também vai ser
 * perguntada num momento de configuração inicial do app (F8, com o design).
 */
function PreferencesProvider({ initialHand = "right", children }: { initialHand?: Hand; children: React.ReactNode }) {
  const [hand, setHand] = React.useState<Hand>(initialHand)
  const value = React.useMemo(() => ({ hand, setHand }), [hand])
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

function usePreferences() {
  return React.useContext(PreferencesContext)
}

export { PreferencesProvider, usePreferences }
