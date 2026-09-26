import * as React from "react"

import { cn } from "@/lib/utils"
import { CloseButton } from "@/components/atoms/close-button"
import { Button } from "@/components/atoms/button"
import { TemplateCard } from "@/components/molecules/template-card"
import illustrationData from "@/assets/illustrations/template-card-data.svg"
import illustrationProjeto from "@/assets/illustrations/template-card-projeto.svg"
import illustrationTipo from "@/assets/illustrations/template-card-tipo.svg"
import illustrationModoLivre from "@/assets/illustrations/template-card-modo-livre.svg"

export type OrganizationMethod = "data" | "projeto" | "tipo" | "modo-livre"

const CARDS: { method: OrganizationMethod; eyebrow: string; title: string; description: string; illustration: string }[] = [
  {
    method: "data",
    eyebrow: "DATA",
    title: "Por data",
    description: "Organize por ano, mês e dia. Ideal para memórias antigas e acervo histórico.",
    illustration: illustrationData,
  },
  {
    method: "projeto",
    eyebrow: "PROJETO",
    title: "Por projeto",
    description: "Agrupe por cliente, evento ou processo. Perfeito para trabalhos e entregas.",
    illustration: illustrationProjeto,
  },
  {
    method: "tipo",
    eyebrow: "TIPO",
    title: "Por tipo de arquivo",
    description: "Separe por fotos, vídeos e documentos. Bom para entender o que ocupa espaço.",
    illustration: illustrationTipo,
  },
  {
    method: "modo-livre",
    eyebrow: "MODO LIVRE",
    title: "Modo livre",
    description: "Crie sua própria estrutura, do seu jeito. Recomendado para quem já tem um método.",
    illustration: illustrationModoLivre,
  },
]

export interface SaveOrganizationModalProps extends React.ComponentProps<"div"> {
  selected?: OrganizationMethod
  onMethodSelect?: (method: OrganizationMethod) => void
  onCancel?: () => void
  onContinue?: () => void
}

/**
 * template/DialogSave/OrganizationModal (`1421:18576`) — Figma-confirmado:
 * "Utilize para selecionar o formato do template de organização ao clicar
 * o card desejado." 4 cards (`molecule/template-card`, `1421:19695`) — os 4
 * métodos (Data/Projeto/Tipo/Modo Livre) são Figma-confirmados literalmente
 * (achado do inventário). Fundo usa Liquid Glass — ver Tokens/Materials
 * (Regra 10). Rodapé "Cancelar" (`Button variant="outline"`) /
 * "Continuar" (`Button`) — migrado de `PushButton` em 2026-09-25. Nenhum `button/primary`\|
 * `secondary`\|`destructive` separado (Regra 1).
 *
 * Corrigido em 2026-08-11 (achado do usuário: dimensões incongruentes):
 * `get_metadata` real confirma o modal com 1014px de largura (aqui
 * `max-w-5xl`, ~1024px, a aproximação mais próxima do Tailwind) e cada
 * card `molecule/template-card` com 384px de altura fixa — a versão
 * anterior não tinha altura definida porque faltava a ilustração própria
 * de cada card (asset de imagem exportado do Figma), agora incluída via
 * `src/assets/illustrations/`.
 *
 * 🔧 **Reclassificado organism → template em 2026-08-20** (usuário renomeou
 * o node no Figma de `organism/DialogSave/OrganizationModal` para
 * `template/DialogSave/OrganizationModal`, mesmo nodeId `1421:18576`) — ver
 * `docs/vault/Design System/Camadas Atômicas.md`.
 *
 * **Alterado em 2026-09-25 (decisão humana)**: título do card "Data"
 * trocado de "Cronológico" pra "Por data" — mesmo nome já usado no
 * `MethodOrganizeButton` (mobile) pro mesmo método; unificado com o FAQ
 * também (achado do `Plano de Verificação`).
 */
function SaveOrganizationModal({
  selected,
  onMethodSelect,
  onCancel,
  onContinue,
  className,
  ...props
}: SaveOrganizationModalProps) {
  return (
    <div
      data-slot="save-organization-modal"
      role="dialog"
      aria-label="Escolher método de organização"
      className={cn(
        "flex max-h-[calc(100dvh-2rem)] w-full max-w-none flex-col gap-4 overflow-y-auto rounded-[32px] desktop:h-[577px] desktop:max-h-none desktop:w-[931px] desktop:overflow-hidden glass-edge bg-effect-glass-white-70 p-6 shadow-[0px_8px_20px_rgba(0,0,0,0.12)] dark:shadow-[0px_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">Escolher método de organização</h2>
        <CloseButton size="md" onClick={onCancel} />
      </div>
      <p className="text-base text-zinc-700 dark:text-zinc-300">
        Selecione como os dados serão visualizados e correlacionados no seu workspace.
      </p>
      {/* Mobile e tablet: os 4 métodos rolam na horizontal (responsividade, 2026-09-24). */}
      <div className="-mx-6 flex flex-1 items-start gap-1 overflow-x-auto px-6 desktop:mx-0 desktop:overflow-visible desktop:px-0">
        {CARDS.map((card) => (
          <TemplateCard
            key={card.method}
            eyebrow={card.eyebrow}
            title={card.title}
            description={card.description}
            illustration={card.illustration}
            dashedIllustrationFrame={card.method === "modo-livre"}
            selected={selected === card.method}
            onClick={() => onMethodSelect?.(card.method)}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" className="h-8 px-4 text-xs" onClick={onCancel}>
          Cancelar
        </Button>
        <Button className="h-8 px-4 text-xs" onClick={onContinue}>
          Continuar
        </Button>
      </div>
    </div>
  )
}

export { SaveOrganizationModal }
