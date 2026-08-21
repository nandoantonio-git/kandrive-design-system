import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { StorageTierBadge, type StorageTier } from "@/components/atoms/storage-tier-badge"
import FileGlyph from "@/assets/icons/CleanSpaceFileGlyph.svg?react"

export interface CleanSpaceListSelectionProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  name: string
  meta: string
  tier: StorageTier
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
}

/**
 * celule/cleanSpaceStorage/listSelection (`1436:20496`, Figma-confirmado) —
 * "lista de seleção de arquivos grandes dentro do fluxo de libherar
 * espaço". 2 variantes (checkbox `Default`/`Variant2`) — checkbox marcado
 * usa `brand-teal`/branco (Regra 3, confirmado via `download_assets` no nó
 * real `1436:20498`, `fill="#007E96"`). Ícone do arquivo: fundo
 * `rgba(43,127,255,0.1)` + traço `#2b7fff` — RE-CONFIRMADO em 2026-08-12
 * (US-026, re-auditoria) via `get_design_context` + `download_assets` no
 * próprio nó do celule (`1436:20478`/`1436:20480`/`1436:20481`), que
 * exporta `stroke="#2B7FFF"` (bytes idênticos nos 2 nós, `Default` e
 * `Variant2`) — cor sem token equivalente no Figma (fill literal, não
 * `var(--...)`), reproduzida aqui como hex literal por não haver
 * mapeamento semântico.
 * `atom/StorageTierBadge` reutilizado pro rótulo à direita ("Acesso
 * rápido"/"Longo prazo" — Regra 5), já era o mesmo componente usado na
 * amostra do Figma.
 *
 * 🔧 Corrigido em 2026-08-21 (achado do usuário: "incongruência dos
 * símbolos" — huge-backup.zip mostrava um ícone azul de pasta/zip
 * [`lucide-react` `FileArchive`], distinto do ícone genérico cinza/teal
 * usado por medium-report.pdf/small-note.txt). Investigação com
 * `get_design_context`/`get_screenshot` frescos no nó real
 * (`1436:20496`) mostra que **as 3 linhas de exemplo do template pai
 * (`template/cleanSpaceStorage`, `1439:16908`) usam o mesmo asset
 * `favincon/ArchiveFormats` (variante `ArchiveItem` — documento genérico,
 * não uma forma específica de zip) pros 3 arquivos, huge-backup.zip
 * incluso** — não existe, em nenhum node Figma consultado, uma forma de
 * ícone distinta pra `.zip`. A diferenciação por extensão
 * (`isArchiveFile`/`ARCHIVE_EXTENSIONS`, com `FileArchive` do
 * `lucide-react`) foi uma inferência de uma US anterior nunca confirmada
 * contra o node real, e a nota "Figma usa FileArchive pra zip" no
 * histórico deste comentário estava incorreta — removida. A cor
 * `#2b7fff`/traço confirmado (parágrafo acima) sempre foi a certa, mas
 * só era aplicada na exceção do zip; o glifo padrão
 * (`CleanSpaceFileGlyph.svg`) usava um gradiente teal (`#007E96`→
 * `#1A5E6E`) nunca confirmado — corrigido pra `#2b7fff` sólido (mesma
 * fonte). `isArchiveFile`/`ARCHIVE_EXTENSIONS`/import de `FileArchive`
 * removidos; `FileGlyph` (já corrigido) agora renderiza pra todo arquivo,
 * dentro do wrapper `bg-[rgba(43,127,255,0.1)]` Figma-confirmado que
 * faltava antes.
 *
 * Reconciliação: `organism/cleanSpaceStorage` (US-010) já renderizava essa
 * linha inline (`<li>` com `<input type="checkbox">` nativo e um quadrado
 * placeholder sem ícone, sem este celule ainda existir) — atualizado nesta
 * US para compor este componente em vez de markup duplicado, corrigindo de
 * passagem a ausência do ícone `FileText` e do checkbox com check real.
 *
 * 🔧 Corrigido em 2026-08-21 (achado do usuário: verificar hover dos
 * botões). Testado com mouse real via Playwright — o checkbox não tinha
 * hover nenhum (`background-color` idêntico antes/depois do mouse) nem
 * `focus-visible`. `get_metadata` no nó (`1436:20496`) confirma só 2
 * states Figma (`idle`/`selcted` — sic), sem eixo `Hover` — feedback
 * adicionado como extensão de engenharia (Regra 9: não Figma-confirmado,
 * mesmo critério já usado em outros componentes desta base pra garantir
 * interação real), não como fato do Figma. Ganhou também `focus-visible`
 * (ausente antes), mesmo padrão já usado em `PushButton`/`CloseButton`.
 */
function CleanSpaceListSelection({
  name,
  meta,
  tier,
  selected = false,
  onSelectedChange,
  className,
  ...props
}: CleanSpaceListSelectionProps) {
  return (
    <div
      data-slot="clean-space-list-selection"
      className={cn("flex items-center gap-3 rounded-[10.4px] p-[9px]", className)}
      {...props}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={selected}
        aria-label={`Selecionar ${name}`}
        onClick={() => onSelectedChange?.(!selected)}
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-colors",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50",
          selected
            ? "border-transparent bg-brand-teal hover:bg-brand-teal/90 active:bg-brand-teal/80"
            : "border-[#ececf0] bg-zinc-500/20 hover:bg-zinc-500/30 active:bg-zinc-500/40"
        )}
      >
        {selected ? <Check aria-hidden="true" strokeWidth={2.5} className="size-3 text-white" /> : null}
      </button>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10.4px] bg-[rgba(43,127,255,0.1)]">
        <FileGlyph aria-hidden="true" className="h-[23px] w-[21px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base tracking-[0.0192px] text-zinc-950">{name}</p>
        <p className="truncate text-[0.625rem] tracking-[0.012px] text-zinc-500">{meta}</p>
      </div>
      <StorageTierBadge tier={tier} />
    </div>
  )
}

export { CleanSpaceListSelection }
