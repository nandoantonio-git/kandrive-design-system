import * as React from "react"

import { cn } from "@/lib/utils"

export type RadioOption = "personal" | "saved"

const OPTION_LABEL: Record<RadioOption, string> = {
  personal: "Pessoal",
  saved: "Guardados",
}

export interface RadioButtonProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  option: RadioOption | (string & {})
  /**
   * Rótulo exibido quando `option` não é um dos 2 valores Figma-confirmados
   * originais (`RadioOption`) — generalizado em 2026-08-23 pra outros grupos
   * de radio Figma-confirmados fora desse par (`page/Settings/
   * Themes&Customization`, `1439:21211`: "Tema"/"Densidade da listagem de
   * arquivos", nenhum reusa "Pessoal"/"Guardados"). `OPTION_LABEL` permanece
   * como default só pros 2 valores originais (Regra 9 — não reescrever o
   * que já era Figma-confirmado).
   */
  label?: string
  checked?: boolean
  onCheckedChange?: (option: string) => void
}

/**
 * molecule/radioButton (`1454:24721`) — Figma-confirmado: "radio button
 * usado para selecionar opções". 2 variantes: `Property 1=Radio: Pessoal`
 * / `Property 1=Radio: Guardados`.
 *
 * O código de referência do Figma (`get_design_context`) tinha um bug de
 * extração — o texto do `<p>` ficava hardcoded como "Pessoal" nas 2
 * variantes, mesmo com o node id/nome corretos apontando "Guardados" para a
 * segunda. Corrigido aqui usando o nome do symbol confirmado via
 * `get_metadata` (`Property 1=Radio: Pessoal` / `Property 1=Radio:
 * Guardados`) como fonte do rótulo, não o texto renderizado bugado (Regra
 * 9 — a fonte de verdade é o nome do node, não uma extração com defeito
 * conhecido).
 *
 * 🔧 **Achado corrigido em 2026-08-12 (3ª auditoria de ponto-fixo, US-026):**
 * releitura fresca via `get_design_context` confirma o rótulo em `14px`
 * (`text-sm`) no nó Figma — mas é texto de leitura primária (o próprio
 * nome da opção selecionável, não microtexto complementar), então cai sob
 * o piso obrigatório de 16px da Regra 4, mesma política já aplicada a
 * `atom/PushButton` (`Type/Button/MD`, 14px→16px) e ao nome de arquivo em
 * `celule/CleanSpaceListSelection` (`text-base`). Corrigido de `text-sm`
 * para `text-base`.
 */
function RadioButton({
  option,
  label,
  checked = false,
  disabled,
  onCheckedChange,
  className,
  id,
  ...props
}: RadioButtonProps) {
  const resolvedLabel = label ?? OPTION_LABEL[option as RadioOption] ?? option
  const inputId = id ?? `radio-button-${option}`
  return (
    <label
      htmlFor={inputId}
      data-slot="radio-button"
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
    >
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
        <input
          id={inputId}
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={() => onCheckedChange?.(option)}
          className={cn(
            "peer absolute inset-0 size-4 shrink-0 appearance-none rounded-full border border-zinc-400 bg-white",
            "transition-colors motion-safe:active:scale-90",
            "checked:border-brand-teal",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-teal/50"
          )}
          {...props}
        />
        {/* Bola interna real (não gradiente CSS) — o hack anterior
            (radial-gradient com stop duro em 100%) degradava pra um blob
            quadrado em 8px, achado do usuário em 2026-08-11. */}
        <span
          aria-hidden="true"
          className="pointer-events-none size-2 scale-0 rounded-full bg-brand-teal transition-transform peer-checked:scale-100"
        />
      </span>
      <span className="text-base text-zinc-950">{resolvedLabel}</span>
    </label>
  )
}

export { RadioButton, OPTION_LABEL }
