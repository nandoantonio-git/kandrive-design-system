import * as React from "react"
import { Filter, Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { FreeModeItemNode } from "@/components/molecules/free-mode-item-node"
import { FreeModeOutputNode } from "@/components/molecules/free-mode-output-node"
import { FreeModeButtons } from "@/components/molecules/free-mode-buttons"
import { FreeModeAddMenu } from "@/components/molecules/free-mode-add-menu"
import { FreeModeMiniMap } from "@/components/molecules/free-mode-mini-map"

/**
 * Conectores tracejados do canvas — elemento Figma-confirmado no nó
 * `1439:16906`. Implementados como overlay absoluto porque as curvas
 * pertencem ao canvas composto, não às moléculas individuais.
 */
function FreeModeConnectors() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1117 806"
      className="pointer-events-none absolute inset-x-0 top-0 h-[806px] w-[1117px] text-brand-teal"
    >
      <path d="M244 354 H333" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M244 354 C285 354 285 430 333 430" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M525 333 C585 333 585 430 647 430" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M525 430 C585 430 585 430 647 430" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M753 429 H776" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
      <path d="M690 463 V540" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
    </svg>
  )
}

/**
 * molecule/contextMenu/FreeMode (Figma-confirmado dentro do nó
 * `1439:16906`, sub-nó `1422:24801`) — painel flutuante de edição de regra
 * de filtro, Liquid Glass (Regra 10), que faltava por completo até esta
 * auditoria (ver `docs/conflicts.md`). Elementos Figma-confirmados
 * reproduzidos: título "Filtro" + ícone; linha de condição preenchida
 * ("Tamanho" / "Maior que" / "1.0 GB" + botão remover); toggle lógico
 * "E"/"OU" (E ativo); 2ª linha de condição em rascunho/desabilitada
 * ("Atributo" / "Operação" / "Valor..."); botão "+ Adicionar regra";
 * rodapé "Descartar Mudanças" / "Salvar Mudanças". Estático (Regra 9: não
 * implementa edição real, só a composição visual confirmada).
 *
 * 🧩 Inferido (Regra 9, dark-mode sweep): chips internos zinc-600/700/800/900
 * (linha "Tamanho"/"Maior que"/toggle E-OU) já são chrome escuro fixo — mantidos
 * sem par `dark:`, mesmo critério do zinc-800 "já dark-apropriado".
 */
function FreeModeFilterPanel({ className }: { className?: string }) {
  return (
    <div
      data-slot="free-mode-filter-panel"
      className={cn(
        "flex w-[360px] flex-col gap-3 rounded-[36px] glass-edge bg-zinc-100/80 p-6 shadow-lg backdrop-blur-md dark:bg-zinc-800/80",
        className
      )}
    >
      <div className="flex items-center gap-2 px-1 pt-1">
        <Filter aria-hidden="true" className="size-3.5 text-zinc-700 dark:text-zinc-300" />
        <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Filtro</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1 text-[0.6875rem] text-white">
          Tamanho
        </span>
        <span className="rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1 text-[0.6875rem] text-white">
          Maior que
        </span>
        <span className="rounded-md border border-zinc-600 bg-zinc-700 px-2 py-1 text-[0.6875rem] text-white">
          1.0 GB
        </span>
        <button type="button" aria-label="Remover regra" className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
          <X aria-hidden="true" className="size-3" />
        </button>
      </div>
      <div className="flex w-fit items-center gap-0.5 rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
        <span className="rounded-md bg-[#92ccff] px-3 py-0.5 text-[9px] font-bold text-[#001d31]">E</span>
        <span className="rounded-md px-3 py-0.5 text-[9px] font-bold text-zinc-400">OU</span>
      </div>
      <div className="flex items-center gap-1.5 opacity-60">
        <span className="rounded-md border border-zinc-400 bg-zinc-500/20 px-2 py-1 text-[0.6875rem] text-zinc-300">
          Atributo
        </span>
        <span className="rounded-md border border-zinc-400 bg-zinc-500/20 px-2 py-1 text-[0.6875rem] text-zinc-300">
          Operação
        </span>
        <span className="rounded-md border border-zinc-400 bg-zinc-500/20 px-2 py-1 text-[0.6875rem] text-zinc-300">
          Valor...
        </span>
      </div>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-md border border-zinc-400/60 bg-white/5 py-2 text-[10px] text-brand-teal-mid"
      >
        <Plus aria-hidden="true" className="size-3" />
        Adicionar regra
      </button>
      <div className="flex items-center justify-end gap-3 border-t border-zinc-300 pt-3 dark:border-zinc-700">
        <Button variant="outline" className="h-8 px-3 text-[10px]">
          Descartar Mudanças
        </Button>
        <Button className="h-8 px-3 text-[10px]">
          Salvar Mudanças
        </Button>
      </div>
    </div>
  )
}

export interface OrganizeFreeModeCanvasProps extends React.ComponentProps<"div"> {
  rulesCount: number
  affectedFilesCount: number
  sizeLabel: string
  onDiscard?: () => void
  onSaveTemplate?: () => void
}

/**
 * template/MainCanvas/Organization/FreeMode (`1439:16906`) —
 * Figma-confirmado via `get_design_context` completo (auditoria
 * fixed-point de 2026-08-11 corrige a nota anterior desta US, que dizia o
 * nó ser "grande demais" para a ferramenta — na verdade retorna normalmente).
 * Textos confirmados: badge "Modo Livre", nós "Pasta 1", "Filtro: Grande"
 * (`Size > 1.0 GB`), **"Filtro: Formato"** (`Type = .mp4, .mov`, 2º nó de
 * filtro confirmado nesta releitura — estava faltando, adicionado agora
 * reaproveitando a variante `filtro-type` já existente de
 * `FreeModeItemNode`), "Junção", "Auto-Archive" (badge "ACTIVE"),
 * "Resultado" com métricas e "Prévia de arquivos", rodapé com resumo +
 * "Descartar"/"Salvar Template".
 *
 * 🔧 **Implementado em 2026-08-13 (US-026, pass16)**: o organism voltou a
 * usar uma composição absoluta 1117×933, alinhada ao node composto atual:
 * agrupamento "Arquivos", filtros empilhados, `Junção`, `Auto-Archive`
 * abaixo, `Resultado` expandido, painel flutuante, minimap e footer.
 *
 * 🔧 **Implementado em 2026-08-12 (US-026, releitura de ponto-fixo)**: os 2
 * elementos que ficaram de fora da auditoria anterior por orçamento (ver
 * `docs/conflicts.md`, achado de 2026-08-11) agora têm implementação real:
 * (1) linhas conectoras tracejadas entre os nós (`FreeModeConnectors`);
 * (2) o painel flutuante `molecule/contextMenu/FreeMode`
 * (`FreeModeFilterPanel`, Liquid Glass, Regra 10) com a regra de filtro
 * "Tamanho maior que 1.0 GB", toggle "E/OU", 2ª linha de condição em
 * rascunho, "+ Adicionar regra" e rodapé "Descartar/Salvar Mudanças" — só
 * a composição visual confirmada, sem drag-and-drop ou edição real (Regra
 * 9: nunca apresentar uma aproximação como funcionalidade real).
 *
 * Reconciliado em 2026-08-11 (US-020): os nós do canvas ("Filtro: Grande",
 * "Junção", "Auto-Archive", "Resultado") e o toolbar inferior agora
 * compõem as 4 sub-peças reais `celule/MainCanvas/Organization/FreeMode/*`
 * (`ItemNode`/`OutputNode`/`ListItem`/`Buttons`, todas Figma-confirmadas
 * via `get_design_context` + ícones reais via `download_assets`) em vez
 * do markup aproximado com glifos `lucide-react` genéricos (Filter/
 * GitMerge/Archive/Package) usado até a US-016. O `atom/boxIconButton` de
 * "Adicionar nodo" agora abre um menu real com `celule/FreeModeListItem`
 * (as 7 operações confirmadas no node), demonstrando a composição real —
 * antes o menu não existia. `FreeModeOutputNode` é usado para o card
 * expandido `Resultado` do node composto.
 * "Pasta 1" permanece markup inline (fora do escopo desta US — nenhuma
 * sub-peça Figma confirmada pra esse nó de pasta-fonte).
 *
 * Fundo de pontos e Mini-Map (adicionados em 2026-08-10) preservados sem
 * alteração — confirmado via screenshot Playwright que sobrevivem à
 * reconciliação.
 *
 * 🔧 Corrigido em 2026-08-12 (US-026, 3ª passada de ponto-fixo): o badge
 * "Arquivos" (dentro do markup inline de "Pasta 1", ver nota acima) usava
 * `bg-zinc-200 text-zinc-600` — `get_design_context` fresco no nó completo
 * (`1439:16906`) confirma o "Node Grouping Frame" real com badge
 * `bg-[var(--neutral-surface-medium,#52525b)]` (≈ `zinc-600`) e texto
 * `var(--brand-primary-light,#c8dce3)` (`brand-teal-light`), não um badge
 * claro. Corrigido só a cor (`bg-zinc-600`/`text-brand-teal-light`); a
 * posição real (pill flutuando acima da moldura do grupo, não embutida no
 * topo do card) permanece como aproximação já documentada — reconciliar
 * exigiria extrair o "Node Grouping Frame" como peça própria, fora do
 * escopo desta correção pontual.
 *
 * 🔧 Corrigido em 2026-08-13 (US-026, 4ª passada): as instâncias de filtro
 * agora repassam os overrides Figma-confirmados ("Filtro: Grande"/
 * "Size > 1.0 GB" e "Filtro: Formato"/"Type = .mp4, .mov") para
 * `FreeModeItemNode`. O celule mantém os defaults curtos do node base
 * (`1421:20108`) e o organism reproduz os textos específicos do node
 * composto (`1439:16906`).
 *
 * 🔧 Corrigido em 2026-08-18: o card "Pasta 1 / 4.2 GB · 128 Files" dentro
 * do container "Arquivos" era markup duplicado à mão (Regra 10) — o
 * usuário adicionou a variante real `Type=Folder` (`1534:21103`) em
 * `celule/MainCanvas/Organization/FreeMode/ItemNode`; trocado pra
 * `<FreeModeItemNode variant="folder" />` em vez de reimplementar.
 *
 * 🔧 **Reclassificado organism → template em 2026-08-20** (usuário renomeou
 * o node no Figma de `organism/MainCanvas/Organization/FreeMode` para
 * `template/MainCanvas/Organization/FreeMode`, mesmo nodeId `1439:16906`) —
 * ver `docs/vault/Design System/Camadas Atômicas.md`. O menu "Adicionar
 * nodo" ganhou symbol Figma próprio (`molecule/Menuitem/freemodeOrganization`,
 * `1431:20042`, descrição Figma-confirmada: "dropup list com opções de
 * nodos disponíveis de adição na aba de modo livre de template") —
 * extraído para `FreeModeAddMenu`, que compõe os `FreeModeListItem`
 * já existentes (Regra 10).
 *
 * ⚠️ **Achado 2026-08-20**: a sub-peça `celule/MainCanvas/Organization/
 * FreeMode/Buttons` (`1431:20043`, o toolbar de "Adicionar nodo") segue
 * com o nome antigo no Figma — das 10 peças da extinta camada `celule`,
 * essa é a única ainda não renomeada pra `molecule/` na fonte (as outras 9,
 * incluindo as 3 irmãs deste mesmo canvas, já confirmam `molecule/`).
 * Registrado em `docs/conflicts.md`, não corrigido aqui (Figma é quem
 * precisa ser atualizado, não o código — `FreeModeButtons` já é `molecule`
 * no catálogo desde a extinção da camada `celule`).
 */
function OrganizeFreeModeCanvas({
  rulesCount,
  affectedFilesCount,
  sizeLabel,
  onDiscard,
  onSaveTemplate,
  className,
  ...props
}: OrganizeFreeModeCanvasProps) {
  const [addMenuOpen, setAddMenuOpen] = React.useState(false)

  return (
    <div
      data-slot="organize-free-mode-canvas"
      className={cn(
        "relative h-[933px] w-[1117px] overflow-hidden rounded-[32px] border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800",
        className
      )}
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }}
      {...props}
    >
      <FreeModeConnectors />
      <span className="absolute top-[22px] left-8 w-fit rounded-md bg-zinc-600 px-3 py-2 text-sm text-white">
        Modo Livre
      </span>
      {/* Mini-Map (Figma-confirmado, elemento visual estático — não funcional, ver nota acima) */}
      <FreeModeMiniMap className="absolute right-[42px] bottom-[158px]" />

      {/* Painel flutuante de edição de filtro (Figma-confirmado, ver nota acima) */}
      <FreeModeFilterPanel className="absolute top-[42px] right-[64px] z-20" />

      <div className="absolute top-[278px] left-8 h-[152px] w-[283px] rounded-3xl border border-zinc-500 bg-zinc-500/10">
        <span className="absolute -top-3 left-[98px] rounded-full bg-zinc-600 px-3 py-1 text-[0.625rem] font-bold text-brand-teal-light">
          Arquivos
        </span>
        <FreeModeItemNode variant="folder" className="absolute top-[32px] left-[38px] shadow-sm" />
      </div>

      <FreeModeItemNode
        variant="filtro-size"
        label="Filtro: Grande"
        subtitle="Size > 1.0 GB"
        // 🧩 Inferido (Regra 9): dark:bg reaproveita a família teal-dark do token, hex sem par no Figma
        className="absolute top-[299px] left-[333px] w-[192px] border-brand-teal bg-[#d7f2fb] dark:bg-[#123840]"
      />
      <FreeModeItemNode
        variant="filtro-type"
        label="Filtro: Formato"
        subtitle="Type = .mp4, .mov"
        className="absolute top-[377px] left-[333px] w-[192px] border-zinc-600"
      />
      <FreeModeItemNode variant="juncao" className="absolute top-[395px] left-[647px]" />
      <FreeModeItemNode variant="auto-archive" className="absolute top-[540px] left-[647px] border-brand-teal" />
      <FreeModeOutputNode
        folderLabel={`Pasta "Vídeos grandes"`}
        affectedFilesCount={affectedFilesCount}
        sizeLabel={sizeLabel}
        rulesCount={rulesCount}
        className="absolute top-[395px] left-[846px]"
      />

      <div className="absolute top-[748px] left-[34px] flex items-center gap-1.5">
        {addMenuOpen ? (
          <FreeModeAddMenu
            className="absolute bottom-full left-0 z-10 mb-2"
            onSelect={() => setAddMenuOpen(false)}
          />
        ) : null}
        <FreeModeButtons onAddNode={() => setAddMenuOpen((open) => !open)} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-[127px] items-center justify-between border-t border-white/60 bg-zinc-100/90 px-8 pt-[17px] pb-4 dark:bg-zinc-800/90">
        <div>
          <p className="text-[0.8125rem] text-zinc-600 dark:text-zinc-300">
            {rulesCount} regras · {affectedFilesCount} arquivos afetados · {sizeLabel}
          </p>
          <p className="pt-1 text-[0.6875rem] leading-4 text-zinc-500 dark:text-zinc-400">
            Você poderá excluir este template depois e reverter a organização.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" className="h-8 px-4 text-xs" onClick={onDiscard}>
            Descartar
          </Button>
          <Button className="h-8 px-4 text-xs" onClick={onSaveTemplate}>
            Salvar Template
          </Button>
        </div>
      </div>
    </div>
  )
}

export { OrganizeFreeModeCanvas }
