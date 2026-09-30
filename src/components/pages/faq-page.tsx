import * as React from "react"

import { cn } from "@/lib/utils"
import { Footer } from "@/components/organisms/footer"
import { AppShell } from "@/components/templates/app-shell"
import { Sidebar } from "@/components/organisms/sidebar"
import { FAQ_SECTIONS } from "@/components/molecules/mobile-footer-settings"
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
  onContactSupport?: () => void
}

/**
 * page/FAQ/Expanded (`1439:19898`) e page/FAQ/Collapsed (`1439:20755`) —
 * Figma-confirmado: mesmo shell (Header `page="settings"` + Breadcrumb
 * "Home/Perguntas Frequentes" + `PageLead` "Perguntas Frequentes" + Sidebar
 * `Page=FAQ` + busca + `FaqFastLinks`), variando só o estado das 7 seções de
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
function FaqPage({ variant = "expanded", onContactSupport, className, ...props }: FaqPageProps) {
  // Tópico marcado na barra lateral (Desktop e Tablet) e nos chips da base (Mobile).
  const [active, setActive] = React.useState(0)
  const goTo = (index: number) => {
    setActive(index)
    document.getElementById(`faq-${TOPIC_ORDER[index]}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <AppShell
      data-slot="faq-page"
      className={cn("bg-zinc-200 dark:bg-zinc-900", className)}
      headerProps={{ page: "settings" }}
      // Figma organism/Sidebar Page=FAQ ("Nesta página"): leva a cada tópico (2026-09-30).
      sidebar={<Sidebar pages="faq" activeFaqTopic={active} onNavigateFaqTopic={goTo} className="sticky top-4" />}
      // Figma organism/Footer (tablet e desktop).
      footer={<Footer />}
      // Mobile: molecule/MobileFooterSettings Page=FAQ na base, com os mesmos tópicos (2026-09-30).
      mobileFooterSettings={{ page: "faq", active: FAQ_SECTIONS[active], onSelect: (section) => goTo(FAQ_SECTIONS.indexOf(section as (typeof FAQ_SECTIONS)[number])) }}
      {...props}
    >
      <div className="flex w-full flex-col items-center gap-2 tablet:pb-5">
        <Breadcrumb segments={["Home", "Perguntas frequentes"]} className="hidden w-full tablet:flex" />
        <PageLead title="Perguntas frequentes" caption="Consulte suas principais dúvidas" className="w-full" />
      </div>
      <div className="flex w-full items-start gap-8">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 desktop:max-w-[927px]">
          <SearchInput className="w-full max-w-none" />
          {TOPIC_ORDER.map((topic) =>
            <div key={topic} id={`faq-${topic}`} className="scroll-mt-4">
              {variant === "expanded" ? <FaqInfoCard topic={topic} /> : <FaqInfoCardCollapsed topic={topic} />}
            </div>
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
