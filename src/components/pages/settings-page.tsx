import * as React from "react"

import { cn } from "@/lib/utils"
import { usePreferences } from "@/lib/preferences"
import { UserProfileCard } from "@/components/organisms/user-profile-card"
import { HandPicker } from "@/components/molecules/hand-picker"
import { AppShell } from "@/components/templates/app-shell"
import { Sidebar, type SettingsSection } from "@/components/organisms/sidebar"
import { Breadcrumb } from "@/components/molecules/breadcrumb"
import { PageLead } from "@/components/molecules/page-lead"
import { SettingsCard } from "@/components/molecules/settings-card"
import { SettingsField } from "@/components/molecules/settings-field"
import { RadioButton } from "@/components/molecules/radio-button"
import { Callout } from "@/components/molecules/callout"
import { Switch } from "@/components/atoms/switch"
import { Button } from "@/components/atoms/button"
import { PlanSelection, type PlanInterval } from "@/components/organisms/plan-selection"
import { StorageBar } from "@/components/molecules/storage-bar"

export type { SettingsSection }

function SelectBox({ value, className }: { value: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-9 w-[280px] items-center justify-between rounded-md border border-[#d4d4d4] bg-effect-glass-white-70 px-3 text-sm dark:border-[#52525b]",
        className
      )}
    >
      <span className="text-zinc-950 dark:text-zinc-100">{value}</span>
      <span className="text-neutral-text-tertiary dark:text-zinc-400">⌄</span>
    </div>
  )
}

interface NotificationRow {
  id: string
  title: string
  description: string
}

const NOTIFICATION_ROWS: NotificationRow[] = [
  { id: "resgate", title: "Arquivo pronto para resgate", description: "Avisar quando um arquivo guardado no longo prazo terminar o resgate." },
  { id: "limite", title: "Armazenamento quase cheio", description: "Avisar quando o uso se aproximar do limite do plano." },
  { id: "duplicados", title: "Duplicados encontrados", description: "Avisar quando novos arquivos duplicados forem detectados." },
  { id: "novidades", title: "Novidades do Kandrive", description: "Receber avisos sobre novos recursos e melhorias." },
]

export interface SettingsPageProps extends React.ComponentProps<"div"> {
  /** Bloco de usuário no topo de Conta (F10). */
  user?: { name: string; email: string; avatarSrc?: string }
  onEditProfile?: () => void
  onSwitchAccount?: () => void
  activeSection?: SettingsSection
  onNavigateSection?: (section: SettingsSection) => void
  planInterval?: PlanInterval
  onPlanIntervalChange?: (interval: PlanInterval) => void
}

/**
 * page/Settings/* (`1439:19849` Conta, `1439:21072` Assinatura,
 * `1439:21165` Notificações, `1439:21211` Aparência, `1439:21268`
 * Privacidade, `1439:21297` Excluir conta, `1439:21327` Idioma) —
 * Figma-confirmado: 7 telas distintas, mesmo shell (Header `page="settings"`
 * + Breadcrumb "Home/Configurações" + `PageLead` "Configurações" +
 * `Sidebar pages="setting"` + footer com seletor de idioma), variando só o
 * painel de conteúdo — implementado como **um componente único
 * parametrizado por `activeSection`** (mesmo critério já usado em
 * `HomePage`/`viewMode`, Regra 1/10, nunca um componente por tela quando o
 * Figma já modela isso como eixo de navegação da mesma Sidebar).
 *
 * O nav da Sidebar tem 8 itens (`organism/Sidebar`, `pages="setting"`,
 * `1439:19849`), mas só 7 têm tela `page/Settings/*` catalogada — "Organização
 * padrão" não tem nenhum node de página correspondente confirmado (checado
 * via metadata completo da seção "Pages", `1439:25740`). Painel não
 * implementado pra essa seção (Regra 9 — nunca inventar conteúdo sem node
 * Figma real); a aba fica navegável (nav real e Figma-confirmada) mas some
 * conteúdo específico, só com uma nota curta.
 *
 * Card "Armazenamento e plano" (uso + tiers) é peça própria desta tela — não
 * é `molecule/StorageStatus` (esse é o node de `page/FunctionStorageStatus/*`,
 * separado, mais elaborado com tabs Global/Corrente/Longo Prazo). O card
 * "Plano" reusa `organism/PlanSelection` (`1454:25057`) inteiro, já
 * implementado — mesmo texto "Assinatura"/Starter-Pro-Max/"Editar plano".
 * Legenda "Estimativa — uso por tier ainda não disponível no backend" é
 * texto literal Figma-confirmado (mesmo achado já registrado pra
 * `Settings-Subscription` em `docs/conflicts.md`, "tier" em nota de debug).
 */
/** Seções do código ↔ chips da barra mobile (`MobileFooterSettings`). "Organização padrão" não tem chip no Figma. */
const SECTION_TO_CHIP: Partial<Record<SettingsSection, string>> = {
  conta: "Conta",
  assinatura: "Armazenamento",
  notificacoes: "Notificações",
  aparencia: "Aparência",
  privacidade: "Privacidade",
  idioma: "Idioma",
  "excluir-conta": "Excluir conta",
}
const CHIP_TO_SECTION: Record<string, SettingsSection> = Object.fromEntries(
  Object.entries(SECTION_TO_CHIP).map(([section, chip]) => [chip, section as SettingsSection])
)

function SettingsPage({
  activeSection = "conta",
  onNavigateSection,
  planInterval = "annual",
  onPlanIntervalChange,
  user = { name: "Cassandra Ribeiro", email: "cassandra@kandrive.com.br" },
  onEditProfile,
  onSwitchAccount,
  className,
  ...props
}: SettingsPageProps) {
  const { hand, setHand } = usePreferences()
  return (
    <AppShell
      data-slot="settings-page"
      className={cn("bg-[#eaeaea] dark:bg-zinc-900", className)}
      headerProps={{ page: "settings" }}
      footer={
        // Figma organism/Footer (tablet e desktop). No mobile, os chips ocupam a base.
        <div className="flex w-full items-center gap-9 py-4 text-base text-black dark:text-zinc-100">
          <span>©2026 KanDrive</span>
          <SelectBox value="Português (Brasil)" />
        </div>
      }
      mobileFooterSettings={{
        page: "settings",
        active: SECTION_TO_CHIP[activeSection],
        onSelect: (chip) => {
          const section = CHIP_TO_SECTION[chip]
          if (section) onNavigateSection?.(section)
        },
      }}
      {...props}
    >
      <div className="flex w-full flex-col items-end gap-5 tablet:py-2">
        <div className="flex w-full flex-col items-center gap-2 tablet:pb-5">
          <Breadcrumb segments={["Home", "Configurações"]} className="hidden w-full tablet:flex" />
          <PageLead
            title="Configurações"
            caption="Gerencie sua conta, armazenamento e preferências"
            className="w-full"
          />
        </div>

        <div className="flex w-full items-start gap-8">
          {/* Tablet: 152px (Figma Sidebar SM Page=Setting tem 140px; 152 é o mínimo para "Armazenamento" em 16px caber). Mobile: some, e as seções vão para os chips na base. */}
          <Sidebar
            pages="setting"
            activeSection={activeSection}
            onNavigateSection={onNavigateSection}
            className="hidden shrink-0 tablet:flex tablet:w-[152px] desktop:w-[223px]"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {activeSection === "conta" ? (
              <>
                <UserProfileCard {...user} onEditProfile={onEditProfile} onSwitchAccount={onSwitchAccount} />
                <SettingsCard title="Conta" caption="Atualize suas informações pessoais">
                  <div className="flex w-full flex-col items-stretch gap-4 tablet:flex-row tablet:items-start">
                    <SettingsField label="Nome" type="text" />
                    <SettingsField label="E-mail" type="email" />
                  </div>
                  <Button>
                    Salvar alterações
                  </Button>
                </SettingsCard>
                <SettingsCard title="Senha" caption="Altere sua senha">
                  <SettingsField label="Senha atual" type="password" className="w-full" />
                  <SettingsField label="Nova senha" type="password" className="w-full" />
                  <SettingsField label="Confirmar nova senha" type="password" className="w-full" />
                  <Button>
                    Atualizar senha
                  </Button>
                </SettingsCard>
              </>
            ) : null}

            {activeSection === "assinatura" ? (
              <>
                <SettingsCard title="Armazenamento e plano" caption="Acompanhe seu uso e gerencie seu plano">
                  <div className="flex w-full flex-col gap-1.5">
                    <div className="flex w-full items-center justify-between text-sm text-zinc-950 dark:text-zinc-100">
                      <span>0 Bytes de 5 TB usados</span>
                      <span className="text-neutral-text-tertiary dark:text-zinc-400">0 arquivos</span>
                    </div>
                    <StorageBar tier="long-term" value={8} className="h-2 max-w-none" />
                  </div>
                  <div className="flex w-full flex-col gap-6 tablet:flex-row">
                    {(
                      [
                        { label: "Acesso rápido", tier: "quick-access" as const },
                        { label: "Longo prazo", tier: "long-term" as const },
                      ]
                    ).map(({ label, tier }) => (
                      <div key={tier} className="flex min-w-px flex-1 flex-col gap-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                        <span className="text-sm font-medium text-zinc-950 dark:text-zinc-100">{label}</span>
                        <StorageBar tier={tier} value={18} className="h-2 max-w-none" />
                        <span className="text-[0.6875rem] text-neutral-text-tertiary dark:text-zinc-400">
                          Estimativa — uso por tier ainda não disponível no backend.
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline">
                      Liberar espaço
                    </Button>
                    <Button>
                      Comprar espaço
                    </Button>
                  </div>
                </SettingsCard>
                <PlanSelection interval={planInterval} onIntervalChange={onPlanIntervalChange} />
              </>
            ) : null}

            {activeSection === "notificacoes" ? (
              <SettingsCard title="Notificações" caption="Escolha o que você quer ser avisado">
                {NOTIFICATION_ROWS.map((row) => (
                  <div key={row.id} className="flex w-full items-start justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">{row.title}</p>
                      <p className="text-[0.8125rem] text-neutral-text-tertiary dark:text-zinc-400">{row.description}</p>
                    </div>
                    <Switch defaultChecked aria-label={row.title} className="mt-0.5 shrink-0" />
                  </div>
                ))}
              </SettingsCard>
            ) : null}

            {activeSection === "aparencia" ? (
              <>
                <SettingsCard title="Tema" caption="Escolha a aparência da interface">
                  <div className="flex flex-col gap-4">
                    <RadioButton option="claro" label="Claro" checked />
                    <RadioButton option="escuro" label="Escuro" />
                    <RadioButton option="dispositivo" label="Padrão do dispositivo" />
                  </div>
                </SettingsCard>
                <SettingsCard title="Densidade da listagem de arquivos" caption="Aplica-se às visualizações Grid, List e Columns nas telas de arquivos">
                  <div className="flex flex-col gap-4">
                    <RadioButton option="confortavel" label="Confortável" checked />
                    <RadioButton option="compacta" label="Compacta" />
                  </div>
                </SettingsCard>
                <SettingsCard title="Página inicial" caption="Escolha o que você vê ao abrir o Kandrive.">
                  <div className="flex flex-col gap-4">
                    <RadioButton option="personal" checked />
                    <RadioButton option="saved" />
                  </div>
                </SettingsCard>
                {/* F5 (Figma V0.2.1, 2026-09-24): muda o lado do FAB no MobileBottomNav. */}
                <SettingsCard title="Mão dominante" caption="Posição do botão de ação no celular.">
                  <HandPicker value={hand} onValueChange={setHand} />
                </SettingsCard>
              </>
            ) : null}

            {activeSection === "privacidade" ? (
              <SettingsCard title="Privacidade e dados" caption="Controle seus dados pessoais">
                <div className="flex w-full flex-col items-start justify-between gap-4 tablet:flex-row tablet:items-center">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">Exportar meus dados</p>
                    <p className="text-[0.8125rem] text-neutral-text-tertiary dark:text-zinc-400">Baixe uma cópia de todos os seus dados no Kandrive.</p>
                  </div>
                  <Button variant="outline" className="shrink-0">
                    Exportar dados
                  </Button>
                </div>
                <p className="text-[0.8125rem] text-neutral-text-tertiary dark:text-zinc-400">
                  Consulte nossa Política de Privacidade para saber como tratamos seus dados, conforme a LGPD.
                </p>
              </SettingsCard>
            ) : null}

            {activeSection === "organizacao-padrao" ? (
              // Item de nav Figma-confirmado (`1255:23300`), sem nenhuma tela
              // `page/*` correspondente no inventário — nada renderizado além
              // do nav (Regra 9, ver docs/conflicts.md).
              <p className="text-sm text-neutral-text-tertiary dark:text-zinc-400">
                Painel ainda não tem tela Figma confirmada para "Organização padrão".
              </p>
            ) : null}

            {activeSection === "idioma" ? (
              <SettingsCard title="Idioma e região" caption="Personalize o idioma da interface e o formato de data">
                <div className="flex w-full gap-8">
                  <div className="flex min-w-px flex-1 flex-col gap-1.5">
                    <span className="text-[0.8125rem] text-zinc-950 dark:text-zinc-100">Idioma da interface</span>
                    <SelectBox value="Português (Brasil)" className="w-full" />
                  </div>
                  <div className="flex min-w-px flex-1 flex-col gap-1.5">
                    <span className="text-[0.8125rem] text-zinc-950 dark:text-zinc-100">Formato de data</span>
                    <SelectBox value="DD/MM/AAAA" className="w-full" />
                  </div>
                </div>
                <Button>
                  Salvar preferências
                </Button>
              </SettingsCard>
            ) : null}

            {activeSection === "excluir-conta" ? (
              <SettingsCard title="Excluir conta" caption="Ações irreversíveis e destrutivas">
                <Callout variant="warning" className="w-full">
                  Excluir sua conta é permanente e não pode ser desfeito. Isso também remove os arquivos guardados no
                  longo prazo — eles não poderão ser recuperados depois.
                </Callout>
                <SettingsField label="Confirme sua senha para continuar" type="password" className="w-full tablet:w-80" />
                <Button variant="destructive">
                  Excluir conta
                </Button>
              </SettingsCard>
            ) : null}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export { SettingsPage }
