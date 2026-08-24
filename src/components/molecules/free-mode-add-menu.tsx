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
 * 🔧 Corrigido em 2026-08-23: releitura completa de `get_design_context`
 * (não mais um screenshot isolado — inclui descrição do componente e as
 * variáveis de estilo do node) confirma o painel real: `w-[228px]`
 * (não `w-64`/256px), Liquid Glass claro (`linear-gradient` duplo de
 * branco translúcido — efeito Figma `GLASS, radius: 10`, mesma família
 * de `--effect-glass-*` já usada no resto do catálogo, Regra 10),
 * `rounded-[var(--radius-lg,12px)]` e sombra dupla
 * `0px_0px_0px_1px_rgba(0,0,0,0.05),0px_16px_32px_0px_rgba(0,0,0,0.1)` —
 * não o fundo sólido `bg-zinc-900`/`border-zinc-700` implementado antes
 * (herdado de quando este dropup era markup inline, anterior ao symbol
 * Figma próprio criado em 2026-08-20). Confirmado como regressão real,
 * não leitura de contexto diferente (achado anterior, `docs/conflicts.md`,
 * ficava em aberto por falta dessa confirmação). Reusa os tokens
 * `--effect-glass-white-50` + `.glass-edge`/`.glass-shadow-sm` já
 * estabelecidos (Regra 10) em vez de reimplementar o gradiente/sombra —
 * `FreeModeListItem` (`text-zinc-700`) já estava correto pro fundo claro,
 * só o container estava desatualizado.
 */
function FreeModeAddMenu({ onSelect, className, ...props }: FreeModeAddMenuProps) {
  return (
    <div
      data-slot="free-mode-add-menu"
      className={cn(
        "glass-edge glass-shadow-sm relative flex w-[228px] flex-col gap-1 rounded-xl bg-effect-glass-white-50 p-1.5 backdrop-blur-md",
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
