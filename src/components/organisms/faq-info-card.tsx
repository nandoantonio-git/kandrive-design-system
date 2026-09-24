import * as React from "react"

import ArchiveIcon from "@/assets/icons/FaqInfoCardArchive.svg?react"
import ChevronIcon from "@/assets/icons/FaqInfoCardChevron.svg?react"
import FirstStepsIcon from "@/assets/icons/FaqInfoCardFirstSteps.svg?react"
import { cn } from "@/lib/utils"
import { AccordionItem } from "@/components/molecules/accordion-item"
import { TOPIC_DATA, type FaqTopic } from "@/components/organisms/faq-info-card-collapsed"

export type FaqInfoCardVariant = "faq" | "card-with-callout"

/**
 * Pergunta extra exclusiva da variante `faq` (Figma-confirmado,
 * `Property 1=FAQ, isCalloutOn=off`, não presente no tópico `FirstSteps` de
 * `organism/FAQ/info/cards/colapsed`).
 */
const EXTRA_FAQ_QUESTION = {
  question: "Onde vejo quanto espaço já usei?",
  answer:
    'No menu lateral, em "Armazenamento", você acompanha o uso separado por Acesso rápido e Longo prazo.',
}

export interface FaqInfoCardProps extends React.ComponentProps<"div"> {
  /**
   * O Figma só confirma 2 combinações reais do eixo `property1`×
   * `isCalloutOn` (não a matriz completa 2×2): `faq` = `Property 1=FAQ,
   * isCalloutOn=off` (conteúdo "Primeiros passos"); `card-with-callout` =
   * `Property 1=Card, isCalloutOn=isCalloutOn` (conteúdo "Guardar no longo
   * prazo", com callouts).
   */
  variant?: FaqInfoCardVariant
  /**
   * Generalizado em 2026-08-23 (`page/FAQ /Expanded`, `1439:19898`):
   * a tela real mostra as 7 seções de FAQ sempre abertas, não só as 2 do
   * eixo `variant` original — mesmo `TOPIC_DATA`/enum `FaqTopic` já usado
   * em `FaqInfoCardCollapsed` (Regra 1/10, não duplicar dado). Quando
   * definido, `topic` tem prioridade sobre `variant` (mantido por
   * compat — nenhum outro consumidor além da própria story usava
   * `variant` antes desta mudança).
   */
  topic?: FaqTopic
  /** Recolhido (todos os tópicos fechados) — controlado; quando omitido, o componente gerencia sozinho (alterna ao clicar em "Recolher"/"Expandir"). */
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

/**
 * organism/FAQ/info/Card (`1454:24788`) — Figma-confirmado: "estrutura base
 * para criar um card para tirar duvidas do usuário, tem variação com uso de
 * callouts caso necessario um destaque."
 *
 * Reaproveita `TOPIC_DATA` de `organism/FAQ/info/cards/colapsed` — o
 * conteúdo confirmado é **literalmente o mesmo** (`FirstSteps` para a
 * variante `faq`, `LongTermStorage` completo para `card-with-callout`),
 * evitando duplicar as mesmas perguntas/respostas/callouts em dois
 * arquivos. Diferença real de composição: este organism sempre nasce
 * expandido (botão "Recolher" fixo, sem alternância "Expandir"/"Recolher"
 * como no card colapsado) — representa o item já aberto dentro de uma
 * lista de FAQ, não um teaser recolhível.
 */
function FaqInfoCard({
  variant = "faq",
  topic: topicProp,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
  ...props
}: FaqInfoCardProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed)
  const collapsed = controlledCollapsed ?? internalCollapsed

  const toggleCollapsed = () => {
    const next = !collapsed
    if (controlledCollapsed === undefined) setInternalCollapsed(next)
    onCollapsedChange?.(next)
  }

  const isFaq = variant === "faq"
  const resolvedTopicKey: FaqTopic = topicProp ?? (isFaq ? "FirstSteps" : "LongTermStorage")
  const topic = TOPIC_DATA[resolvedTopicKey]
  // "Onde vejo quanto espaço já usei?" só existe na variante sempre-aberta
  // (`FaqInfoCard`) do tópico `FirstSteps` — Figma-confirmado em
  // `page/FAQ /Expanded` (`1439:19945`), ausente de `TOPIC_DATA.FirstSteps`
  // (fonte compartilhada com `FaqInfoCardCollapsed`, que não tem essa
  // pergunta). Vale pra `resolvedTopicKey`, não só o `variant` legado.
  const questions =
    resolvedTopicKey === "FirstSteps" ? [...topic.questions, EXTRA_FAQ_QUESTION] : topic.questions
  const Icon = topicProp ? topic.icon : isFaq ? FirstStepsIcon : ArchiveIcon

  return (
    <div
      data-slot="faq-info-card"
      data-topic={resolvedTopicKey}
      className={cn(
        "relative flex w-full max-w-[927px] flex-col gap-6 rounded-3xl glass-edge glass-shadow-sm bg-effect-glass-white-50 py-6",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4 px-6 tablet:gap-24">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <p className="text-base font-semibold text-brand-secondary-dark">{topic.title}</p>
          </div>
          {topic.description ? (
            <p className="text-sm text-brand-secondary">{topic.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="shrink-0 rounded-md border border-zinc-200 bg-white/80 px-2 py-1 text-[0.625rem] text-brand-secondary transition-colors hover:bg-white active:opacity-70 dark:border-zinc-700 dark:bg-zinc-900/80 dark:hover:bg-zinc-900"
        >
          {collapsed ? "Expandir" : "Recolher"}
        </button>
      </div>
      <div className={cn("flex flex-col px-6", collapsed && "hidden")}>
        {questions.map((item) => (
          <AccordionItem key={item.question} question={item.question} chevron={ChevronIcon} open>
            {item.answer}
          </AccordionItem>
        ))}
      </div>
    </div>
  )
}

export { FaqInfoCard }
