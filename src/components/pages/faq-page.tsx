import * as React from "react"

import { cn } from "@/lib/utils"
import { Header } from "@/components/organisms/header"
import { Sidebar, type SidebarProps } from "@/components/organisms/sidebar"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import { PageLead } from "@/components/molecules/page-lead"
import { SearchInput } from "@/components/molecules/search-input"
import { FaqInfoCard } from "@/components/organisms/faq-info-card"
import { FaqInfoCardCollapsed, type FaqTopic } from "@/components/organisms/faq-info-card-collapsed"
import { CardNeedMoreHelp } from "@/components/organisms/card-need-more-help"
import { FaqFastLinks } from "@/components/organisms/faq-fast-links"

const TOPIC_ORDER: FaqTopic[] = [
  "FirstSteps",
  "LongTermStorage",
  "Organization",
  "LabelsTags",
  "Duplicates",
  "Storage",
  "FrequentIssues",
]

export interface FaqPageProps extends React.ComponentProps<"div"> {
  variant?: "expanded" | "collapsed"
  sidebarProps: SidebarProps
  onContactSupport?: () => void
}

/**
 * page/FAQ/Expanded (`1439:19898`) e page/FAQ/Collapsed (`1439:20755`) —
 * Figma-confirmado: mesmo shell (Header `page="settings"` + Breadcrumb
 * "Home/Perguntas Frequentes" + `PageLead` "Perguntas Frequentes" + Sidebar
 * padrão + busca + `FaqFastLinks`), variando só o estado das 7 seções de
 * FAQ — implementado como **um componente único parametrizado por
 * `variant`** (mesmo critério de `HomePage`/`viewMode`, Regra 1/10).
 * `page/FAQ/Collapsed` é a mesma composição recolhida (figma-inventory.md
 * Seção 7 — "idêntica ao FAQ Expanded"), não uma tela nova.
 *
 * As 7 seções (`FirstSteps`/`LongTermStorage`/`Organization`/`LabelsTags`/
 * `Duplicates`/`Storage`/`FrequentIssues`) já existiam prontas e
 * Figma-confirmadas em `TOPIC_DATA` (`faq-info-card-collapsed.tsx`) — esta
 * página é composição pura, nenhum conteúdo novo. `FaqInfoCard` generalizado
 * nesta reconciliação (`topic` prop, antes só 2 variantes fixas) pra cobrir
 * as 7 no estado expandido.
 *
 * `organism/CardNeedMoreHelp` ("Ainda precisa de ajuda?") e
 * `organism/FAQ/FastLinks` ("Links Rápidos") já existiam prontos —
 * reusados sem alteração.
 */
function FaqPage({ variant = "expanded", sidebarProps, onContactSupport, className, ...props }: FaqPageProps) {
  return (
    <div data-slot="faq-page" className={cn("flex w-full flex-col bg-zinc-200", className)} {...props}>
      <Header page="settings" />
      <div className="mx-auto flex w-[1376px] items-start gap-12 px-1 py-2.5">
        <Sidebar {...sidebarProps} />
        <div className="flex flex-1 flex-col items-end gap-5">
          <div className="flex w-full flex-col items-center gap-2 pb-5">
            <Breadcrumb segments={["Home", "Perguntas Frequentes"]} className="w-full" />
            <PageLead title="Perguntas Frequentes" caption="Consulte suas principais dúvidas" className="w-full" />
          </div>
          <div className="flex w-full items-start gap-8">
            <div className="flex w-[927px] shrink-0 flex-col gap-6">
              <SearchInput className="w-full" />
              {TOPIC_ORDER.map((topic) =>
                variant === "expanded" ? (
                  <FaqInfoCard key={topic} topic={topic} />
                ) : (
                  <FaqInfoCardCollapsed key={topic} topic={topic} />
                )
              )}
              <CardNeedMoreHelp onContactSupport={onContactSupport} />
            </div>
            <FaqFastLinks className="sticky top-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { FaqPage }
