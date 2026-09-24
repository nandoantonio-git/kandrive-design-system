import * as React from "react"
import { HardDrive, LayoutGrid, CreditCard, ChevronDown, Check, Receipt, CircleCheck, Info, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Header } from "@/components/organisms/header"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import { PageLead } from "@/components/molecules/page-lead"
import { SettingsField } from "@/components/molecules/settings-field"
import { PushButton } from "@/components/atoms/push-button"
import { StorageBarExpanded } from "@/components/molecules/storage-bar"

export type PaymentBillingCycle = "monthly" | "annual"

interface PaymentPlanTier {
  id: "free" | "advanced" | "pro"
  name: string
  storageLabel: string
  price: string
  status?: "current" | "selected"
  description?: string
  features: string[]
  actionLabel?: string
}

const PLAN_TIERS: PaymentPlanTier[] = [
  {
    id: "free",
    name: "Free",
    storageLabel: "15 GB",
    price: "Grátis",
    status: "current",
    features: ["15 GB de armazenamento", "Acesso rápido aos arquivos recentes", "Sem cartão necessário"],
    actionLabel: "Voltar para Free",
  },
  {
    id: "advanced",
    name: "Advanced",
    storageLabel: "1 TB",
    price: "$3/mês",
    features: ["1 TB de armazenamento", "Mais espaço para organizar arquivos grandes", "Acesso rápido e Longo prazo"],
    actionLabel: "Selecionar Advanced",
  },
  {
    id: "pro",
    name: "Pro",
    storageLabel: "5 TB",
    price: "$12/mês",
    status: "selected",
    description: "Recomendado para mais espaço",
    features: ["5 TB de armazenamento", "Mais automações para organizar arquivos", "Suporte prioritário"],
  },
]

function CollapsibleSection({
  icon: Icon,
  title,
  summary,
  defaultOpen,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  summary?: React.ReactNode
  defaultOpen: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex h-[54px] w-full items-center justify-between px-5 text-left"
      >
        <span className="flex items-center gap-2 text-base font-medium text-zinc-950 dark:text-zinc-100">
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          {title}
        </span>
        <span className="flex items-center gap-4">
          {!open && summary ? <span className="text-sm text-zinc-500 dark:text-zinc-400">{summary}</span> : null}
          <ChevronDown
            className={cn("size-4 text-zinc-500 dark:text-zinc-400 transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        </span>
      </button>
      {open ? <div className="flex flex-col gap-4 px-5 pb-5">{children}</div> : null}
    </div>
  )
}

export interface PaymentPageProps extends React.ComponentProps<"div"> {
  variant?: "expanded" | "collapsed"
  billingCycle?: PaymentBillingCycle
  onBillingCycleChange?: (cycle: PaymentBillingCycle) => void
  selectedPlan?: PaymentPlanTier["id"]
  onSelectPlan?: (plan: PaymentPlanTier["id"]) => void
}

/**
 * page/Payment /Expanded (`1439:20215`) e page/Payment/Colapsed
 * (`1439:20485`) — Figma-confirmado: fluxo de "Confirmar upgrade para
 * Kandrive Pro", 3 seções colapsáveis (Seu armazenamento/Seu plano/
 * Pagamento) + botão de confirmação fixo no rodapé do card. As 2 telas são
 * a MESMA composição, só com as seções recolhidas por padrão na variante
 * `Colapsed` — implementado como **um componente único parametrizado por
 * `variant`** (Regra 1/10).
 *
 * Fluxo distinto de `organism/PlanSelection` (Configurações de Plano,
 * `1454:25057`): planos diferentes (Free/Advanced/Pro aqui, vs.
 * Starter/Pro/Max lá), preços diferentes, layout de checkout com formulário
 * de cartão em vez de card de assinatura já ativa — não é o mesmo
 * componente reaproveitado, é uma tela de upgrade separada Figma-confirmada
 * (`get_metadata` em ambos os nós, 2026-08-23).
 *
 * Ícones (`HardDrive`/`LayoutGrid`/`CreditCard`/`ChevronDown`/`Check`/
 * `Receipt`/`CircleCheck`/`Info`/`Lock`) batem exatamente com nomes
 * `lucide-react` — mesma convenção já usada em `organism/PlanSelection`
 * (`Check`) e `organism/Sidebar` (`PanelLeft`/`Plus`) pra ícones genéricos
 * sem asset próprio exportado do Figma.
 */
function PaymentPage({
  variant = "expanded",
  billingCycle = "monthly",
  onBillingCycleChange,
  selectedPlan = "pro",
  onSelectPlan,
  className,
  ...props
}: PaymentPageProps) {
  const defaultOpen = variant === "expanded"
  const selected = PLAN_TIERS.find((plan) => plan.id === selectedPlan) ?? PLAN_TIERS[2]

  return (
    <div data-slot="payment-page" className={cn("flex w-full flex-col bg-[#eaeaea] dark:bg-zinc-900", className)} {...props}>
      <Header page="settings" />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-end gap-5 px-12 py-8">
        <div className="flex w-full flex-col items-center gap-2 pb-5">
          <Breadcrumb segments={["Home", "Planos Kandrive"]} className="w-full" />
          <PageLead
            title="Gerenciar plano Kandrive"
            caption="Revise seu uso, compare planos e conclua a assinatura"
            className="w-full"
          />
        </div>

        <div className="flex w-full flex-col gap-6 rounded-xl border border-zinc-200 bg-effect-glass-white-50 dark:border-zinc-700">
          <p className="px-5 pt-6 text-2xl font-bold text-zinc-950 dark:text-zinc-100">Confirmar upgrade para Kandrive Pro</p>

          <div className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
            <CollapsibleSection icon={HardDrive} title="Seu armazenamento" summary="92% usado" defaultOpen={defaultOpen}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-950 dark:text-zinc-100">13.8 GB de 15 GB usados</span>
                <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">Plano Free</span>
              </div>
              <StorageBarExpanded
                segments={[
                  { tier: "quick-access", value: 61 },
                  { tier: "long-term", value: 31 },
                ]}
                className="h-2.5 max-w-none"
              />
              <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 shrink-0 rounded-full bg-brand-pink-dark" aria-hidden="true" />
                  Acesso rápido: 9.2 GB
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 shrink-0 rounded-full bg-brand-teal-action" aria-hidden="true" />
                  Longo prazo: 4.6 GB
                </span>
              </div>
            </CollapsibleSection>

            <CollapsibleSection icon={LayoutGrid} title="Seu plano" summary={selected.name} defaultOpen={defaultOpen}>
              <div className="flex w-full items-start gap-4">
                {PLAN_TIERS.map((plan) => {
                  const isSelected = plan.id === selectedPlan
                  return (
                    <div
                      key={plan.id}
                      className={cn(
                        "flex min-w-px flex-1 flex-col gap-3 rounded-lg border p-4",
                        isSelected ? "border-brand-teal bg-brand-teal-light" : "border-zinc-300 dark:border-zinc-700"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-base font-semibold text-zinc-950 dark:text-zinc-100">{plan.name}</p>
                          <p className="text-[0.8125rem] text-zinc-500 dark:text-zinc-400">{plan.storageLabel}</p>
                        </div>
                        {plan.status ? (
                          <span className="rounded-full bg-white/80 px-2 py-0.5 text-[0.6875rem] font-medium text-brand-secondary dark:bg-zinc-900/80">
                            {plan.status === "current" ? "Atual" : "Selecionado"}
                          </span>
                        ) : null}
                      </div>
                      {plan.description ? <p className="text-sm text-zinc-500 dark:text-zinc-400">{plan.description}</p> : null}
                      <p className="text-[1.375rem] font-bold text-zinc-950 dark:text-zinc-100">{plan.price}</p>
                      <ul className="flex flex-col gap-1.5">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-[0.8125rem] text-zinc-700 dark:text-zinc-300">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-brand-teal" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {isSelected ? (
                        <span className="flex items-center justify-center gap-1.5 rounded-md border border-brand-teal py-1.5 text-[0.8125rem] font-medium text-brand-teal">
                          <Check className="size-4" aria-hidden="true" />
                          Selecionado
                        </span>
                      ) : (
                        <PushButton
                          variant="neutral"
                          onClick={() => onSelectPlan?.(plan.id)}
                          className="h-auto justify-center rounded-md px-3 py-1.5 text-[0.8125rem]"
                        >
                          {plan.actionLabel}
                        </PushButton>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-zinc-100">
                  <Receipt className="size-3.5 shrink-0" aria-hidden="true" />
                  Cobrança do plano selecionado
                </div>
                <div className="inline-flex w-fit items-center rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => onBillingCycleChange?.("monthly")}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium",
                      billingCycle === "monthly" ? "bg-brand-teal-action text-brand-teal-foreground" : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    Mensal
                  </button>
                  <button
                    type="button"
                    onClick={() => onBillingCycleChange?.("annual")}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium",
                      billingCycle === "annual" ? "bg-brand-teal-action text-brand-teal-foreground" : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    Anual <span className="text-xs opacity-80">· economize 17%</span>
                  </button>
                </div>
                <div className="rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
                  <p className="text-[0.8125rem] text-zinc-500 dark:text-zinc-400">A partir de hoje</p>
                  <p className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">$12/mês</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="flex items-center gap-2">
                    <CircleCheck className="size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                    Cobrado mensalmente. Cancele quando quiser.
                  </span>
                  <span className="flex items-center gap-2">
                    <CircleCheck className="size-4 shrink-0 text-brand-teal" aria-hidden="true" />
                    Renovação automática, gerenciável nas configurações.
                  </span>
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection icon={CreditCard} title="Pagamento" defaultOpen={defaultOpen}>
              <SettingsField label="Nome no cartão" type="text" placeholder="Como impresso no cartão" className="w-full" />
              <SettingsField label="Número do cartão" type="text" placeholder="0000 0000 0000 0000" className="w-full" />
              <div className="flex w-full gap-4">
                <SettingsField label="Validade" type="text" placeholder="MM/AA" />
                <SettingsField label="CVC" type="text" placeholder="123" />
              </div>
              <SettingsField label="E-mail para recibo" type="email" placeholder="voce@email.com" className="w-full" />
              <div className="flex items-start gap-2.5 rounded-lg bg-zinc-100 p-3.5 dark:bg-zinc-800">
                <Info className="mt-0.5 size-4 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                <p className="flex items-start gap-1.5 text-[0.8125rem] text-zinc-500 dark:text-zinc-400">
                  <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Stripe Elements protege os dados do cartão. O Kandrive não armazena o número completo.
                </p>
              </div>
            </CollapsibleSection>
          </div>

          <div className="px-5 pb-6">
            <PushButton variant="primary" className="h-12 w-full justify-center rounded-md text-base">
              Confirmar upgrade para Pro · $12/mês
            </PushButton>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-12 py-4 text-base text-black dark:text-zinc-100">
        <span>©2026 KanDrive</span>
      </div>
    </div>
  )
}

export { PaymentPage }
