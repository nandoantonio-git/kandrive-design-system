import * as React from "react"

import { cn } from "@/lib/utils"
import { usePreferences } from "@/lib/preferences"
import { Button } from "@/components/atoms/button"
import { MobileSuccess } from "@/components/atoms/mobile-success"
import { HandPicker } from "@/components/molecules/hand-picker"
import { RadioButton } from "@/components/molecules/radio-button"
import { SettingsCard } from "@/components/molecules/settings-card"

export type OnboardingStep = "welcome" | "hand" | "theme" | "done"
export type OnboardingTheme = "claro" | "escuro" | "dispositivo"

const ORDER: OnboardingStep[] = ["welcome", "hand", "theme", "done"]

export interface OnboardingPageProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Etapa inicial. A página avança sozinha pelos botões; `onStepChange` avisa a cada troca. */
  defaultStep?: OnboardingStep
  onStepChange?: (step: OnboardingStep) => void
  theme?: OnboardingTheme
  onThemeChange?: (theme: OnboardingTheme) => void
  /** "Pular" em qualquer etapa, ou "Ir para a Home" no fim. */
  onFinish?: () => void
}

/**
 * Onboarding do primeiro acesso (Figma KanDrive V0.2.1, `Onboarding/Welcome`,
 * `DominantHand`, `Theme` e `Done` Mobile; F8, aprovado em 2026-09-24). É a
 * configuração inicial: mão dominante e tema, com "Pular" em todas as etapas.
 *
 * - Boas-vindas e conclusão: tela cheia `Brand/Primary/Action` com o
 *   `MobileSuccess` (o Kan). São telas de feedback: sem gaveta nem barras e
 *   com a mesma paleta no Light e no Dark. Botão `Button` Secondary LG Pill.
 * - Mão dominante: `HandPicker`, ligado às preferências (`usePreferences`),
 *   o mesmo seletor de Settings → Aparência.
 * - Tema: o card "Tema" de Aparência.
 * - Etapas 2 e 3: indicador de progresso (3 pontos, o atual alongado em
 *   `Brand/Primary/Default`), título 25px Medium, texto 16px e, na base,
 *   `Button` Primary LG Pill "Continuar" e "Pular".
 * - No tablet e no desktop, o conteúdo fica numa coluna central de até 420px.
 */
function OnboardingPage({
  defaultStep = "welcome",
  onStepChange,
  theme: controlledTheme,
  onThemeChange,
  onFinish,
  className,
  ...props
}: OnboardingPageProps) {
  const [step, setStep] = React.useState<OnboardingStep>(defaultStep)
  const [innerTheme, setInnerTheme] = React.useState<OnboardingTheme>("claro")
  const theme = controlledTheme ?? innerTheme
  const { hand, setHand } = usePreferences()
  const go = (next: OnboardingStep) => {
    setStep(next)
    onStepChange?.(next)
  }
  const next = () => go(ORDER[Math.min(ORDER.indexOf(step) + 1, ORDER.length - 1)])
  const feedback = step === "welcome" || step === "done"

  return (
    <div
      data-slot="onboarding-page"
      data-step={step}
      className={cn("flex min-h-dvh justify-center", feedback ? "bg-[#007e96]" : "bg-neutral-surface-background", className)}
      {...props}
    >
      <div className="flex w-full max-w-[420px] flex-col items-center gap-6 px-6 pt-[72px] pb-10">
        {feedback ? (
          <>
            <div className="flex flex-1 items-center">
              <MobileSuccess
                message="stored"
                title={step === "welcome" ? "Bem-vindo ao KanDrive" : "Tudo pronto!"}
                description={
                  step === "welcome"
                    ? "O Kan guarda seus arquivos na bolsa, com segurança, por anos. Vamos deixar tudo do seu jeito."
                    : "Seu KanDrive está configurado. Comece guardando o primeiro arquivo."
                }
              />
            </div>
            {/* Cores do Secondary fixas no Light: a tela de feedback é igual nos dois temas. */}
            <Button
              variant="secondary"
              size="lg"
              shape="pill"
              className="w-full border-[#bbbbbb] bg-[#eaeaea] text-[#3f3f46] hover:bg-[#eaeaea]/80"
              onClick={step === "welcome" ? next : onFinish}
            >
              {step === "welcome" ? "Começar" : "Ir para a Home"}
            </Button>
            {step === "welcome" ? (
              <button type="button" onClick={onFinish} className="cursor-pointer text-base font-medium text-white">
                Pular
              </button>
            ) : null}
          </>
        ) : (
          <>
            <div role="progressbar" aria-label="Progresso" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step === "hand" ? 1 : 2} className="flex gap-1.5">
              {["hand", "theme", "done"].map((dot) => (
                <span key={dot} className={cn("h-2 rounded-full", dot === step ? "w-6 bg-brand-teal-action" : "w-2 bg-neutral-border-subtle")} />
              ))}
            </div>
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-[1.5625rem] leading-[30px] font-medium text-neutral-text-primary">
                {step === "hand" ? "Com qual mão você usa o celular?" : "Claro ou escuro?"}
              </h1>
              <p className="text-base leading-5 text-neutral-text-secondary">
                {step === "hand"
                  ? "O botão de ação fica do lado do seu polegar. Dá para mudar depois em Configurações → Aparência."
                  : "Escolha a aparência do app. Você pode mudar quando quiser."}
              </p>
            </div>
            {step === "hand" ? (
              <HandPicker value={hand} onValueChange={setHand} className="tablet:w-full [&>button]:tablet:flex-1" />
            ) : (
              <SettingsCard title="Tema" caption="Escolha a aparência da interface" className="w-full">
                <div className="flex flex-col gap-4">
                  {(["claro", "escuro", "dispositivo"] as const).map((option) => (
                    <RadioButton
                      key={option}
                      option={option}
                      label={option === "claro" ? "Claro" : option === "escuro" ? "Escuro" : "Padrão do dispositivo"}
                      checked={theme === option}
                      onCheckedChange={() => {
                        setInnerTheme(option)
                        onThemeChange?.(option)
                      }}
                    />
                  ))}
                </div>
              </SettingsCard>
            )}
            <div className="flex-1" />
            <Button size="lg" shape="pill" className="w-full" onClick={next}>
              Continuar
            </Button>
            <button type="button" onClick={onFinish} className="cursor-pointer text-base font-medium text-neutral-text-secondary">
              Pular
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export { OnboardingPage }
