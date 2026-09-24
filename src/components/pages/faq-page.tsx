import * as React from "react"

import { cn } from "@/lib/utils"
import { AppShell } from "@/components/templates/app-shell"
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
    <AppShell
      data-slot="faq-page"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "settings" }}
      sidebar={<Sidebar {...sidebarProps} />}
      // Mobile: sem barra inferior (decisão de 2026-09-24). Uma barra de links rápidos
      // para os tópicos está a desenhar (F6).
      {...props}
    >
      <div className="flex w-full flex-col items-center gap-2 tablet:pb-5">
        <Breadcrumb segments={["Home", "Perguntas Frequentes"]} className="hidden w-full tablet:flex" />
        <PageLead title="Perguntas Frequentes" caption="Consulte suas principais dúvidas" className="w-full" />
      </div>
      <div className="flex w-full items-start gap-8">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 desktop:max-w-[927px]">
          <SearchInput className="w-full max-w-none" />
          {TOPIC_ORDER.map((topic) =>
            variant === "expanded" ? (
              <FaqInfoCard key={topic} topic={topic} />
            ) : (
              <FaqInfoCardCollapsed key={topic} topic={topic} />
            )
          )}
          <CardNeedMoreHelp onContactSupport={onContactSupport} />
        </div>
        {/* Links rápidos laterais só a partir de desktop: (no tablet não há espaço). */}
        <FaqFastLinks className="sticky top-4 hidden desktop:flex" />
      </div>
    </AppShell>
  )
}

export { FaqPage }
