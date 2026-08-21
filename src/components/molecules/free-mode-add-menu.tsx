import * as React from "react"

import { cn } from "@/lib/utils"
import { FreeModeListItem, type FreeModeListItemOperation } from "@/components/molecules/free-mode-list-item"

const ADD_NODE_OPERATIONS: readonly FreeModeListItemOperation[] = [
  "juncao",
  "subtracao",
  "intersseccao",
  "exclusao",
  "filtro-tamanho",
  "filtro-formato",
  "filtro-data",
]

export interface FreeModeAddMenuProps extends React.ComponentProps<"div"> {
  onSelect?: (operation: FreeModeListItemOperation) => void
}

/**
 * molecule/Menuitem/freemodeOrganization (`1431:20042`) — Figma-confirmado:
 * "dropup list com opções de nodos disponíveis de adição na aba de modo
 * livre de template". 7 operações (`Junção`/`Subtração`/`Interssecção`/
 * `Exclusão`/`Filtrar por tamanho`/`Filtrar por formato`/`Filtrar por
 * data`), cada uma um `FreeModeListItem` já existente e Figma-confirmado
 * (`celule/MainCanvas/Organization/FreeMode/ListItem`, `1421:20757`) —
 * reusado aqui em vez de reimplementado (Regra 10).
 *
 * Antes existia só como markup inline dentro de `template/MainCanvas/
 * Organization/FreeMode` (`organize-free-mode-canvas.tsx`); o usuário deu a
 * esse dropup um symbol Figma próprio em 2026-08-20, extraído aqui como
 * molecule de fato.
 *
 * ⚠️ `get_design_context` fresco no node `1431:20042` sugere um painel mais
 * estreito (`w-[228px]`, contra os `w-64`/256px já implementados) com
 * tratamento translúcido/Liquid Glass (`rgba(255,255,255,0.05-0.5)` +
 * sombra dupla), diferente do fundo sólido `bg-zinc-900`/`border-zinc-700`
 * já implementado e auditado em passes anteriores (US-026). Não alterado
 * nesta reconciliação — a implementação atual já foi verificada
 * visualmente contra o Figma em auditorias anteriores e a nova leitura não
 * é conclusiva o bastante (screenshot isolado, sem o canvas real por trás)
 * pra decidir se é regressão ou leitura de contexto diferente. Registrado
 * em `docs/conflicts.md` pra decisão humana.
 */
function FreeModeAddMenu({ onSelect, className, ...props }: FreeModeAddMenuProps) {
  return (
    <div
      data-slot="free-mode-add-menu"
      className={cn(
        "flex w-64 flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 shadow-lg",
        className
      )}
      {...props}
    >
      {ADD_NODE_OPERATIONS.map((operation) => (
        <FreeModeListItem key={operation} operation={operation} onSelect={() => onSelect?.(operation)} />
      ))}
    </div>
  )
}

export { FreeModeAddMenu }
