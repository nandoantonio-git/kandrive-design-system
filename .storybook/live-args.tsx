import * as React from "react"

function shallowEqual(a: object, b: object) {
  const keysA = Object.keys(a) as (keyof typeof a)[]
  return keysA.length === Object.keys(b).length && keysA.every((key) => Object.is(a[key], b[key]))
}

export interface LiveArgsProps<T extends object> {
  args: T
  /** O `updateArgs` de `useArgs()`, chamado na própria story. */
  updateArgs: (patch: Partial<T>) => void
  children: (live: T, update: (patch: Partial<T>) => void) => React.ReactNode
}

/**
 * Story "viva" que funciona também nos testes.
 *
 * No Storybook, `updateArgs` re-renderiza a story e os Controls acompanham.
 * Nos testes (`@storybook/addon-vitest`), `updateArgs` não re-renderiza nada,
 * então uma story feita só com `useArgs` não reage ao clique e o `play` falha.
 * Este componente guarda o valor também em estado local: a story reage nos dois
 * ambientes e os Controls continuam acompanhando. O estado fica aqui, num
 * componente filho, porque os hooks do Storybook (`useArgs`) quebram se a
 * própria função da story re-renderizar por estado do React.
 *
 * Quando os args mudam por fora (Controls), o estado local é descartado.
 */
export function LiveArgs<T extends object>({ args, updateArgs, children }: LiveArgsProps<T>) {
  const [local, setLocal] = React.useState<Partial<T>>({})
  const [previousArgs, setPreviousArgs] = React.useState(args)
  if (!shallowEqual(previousArgs, args)) {
    setPreviousArgs(args)
    setLocal({})
  }
  const update = (patch: Partial<T>) => {
    setLocal((current) => ({ ...current, ...patch }))
    updateArgs(patch)
  }
  return <>{children({ ...args, ...local }, update)}</>
}
