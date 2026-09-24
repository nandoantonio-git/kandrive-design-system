import * as React from "react"

import { cn } from "@/lib/utils"
import kanSuccess from "@/assets/illustrations/mobile-success-kan.svg"

export interface MobileSuccessProps extends React.ComponentProps<"div"> {
  /** Figma `Message`: Organized ("Organização concluída" + arquivo) · Stored ("Prontinho, arquivos guardados"). */
  message?: "organized" | "stored"
  /** Linha com ✓ abaixo do título. Só na mensagem Organized. */
  fileName?: string
}

/**
 * `atom/MobileSuccess`: Figma-confirmado no KanDrive V0.2.1 (`1765:62024`), com
 * o eixo `Message` (Organized · Stored). É a confirmação de sucesso do mobile:
 * o Kan, o canguru, comemorando ao lado da caixa, com o texto abaixo.
 *
 * - Ilustração: 214×213, branca, exportada do Figma.
 * - Título: 20px Bold, `Neutral/Text/OnDark`. Linha do arquivo: 10px Bold,
 *   `Brand/Primary/Light`, dentro da exceção de microtexto da Regra 4.
 * - Fixo na paleta Light: as telas de feedback positivo são iguais no Light e
 *   no Dark (decisão de design de 2026-09-23). Por isso as cores são
 *   constantes, e não tokens que mudam com o tema.
 * - Fica sobre o fundo teal (`Brand/Primary/Action`) da tela de feedback.
 */
function MobileSuccess({ message = "organized", fileName, className, ...props }: MobileSuccessProps) {
  return (
    <div
      data-slot="mobile-success"
      data-message={message}
      role="status"
      className={cn("flex w-full max-w-[336px] flex-col items-center gap-[18px] text-center", className)}
      {...props}
    >
      <img src={kanSuccess} alt="" aria-hidden="true" className="h-[213px] w-[218px]" />
      <div className="flex flex-col items-center gap-2">
        {message === "organized" ? (
          <>
            <p className="text-xl leading-[29px] font-bold text-white">Organização concluída</p>
            {fileName ? <p className="text-[0.625rem] leading-3 font-bold text-[#c8dce3]">✓ {fileName}</p> : null}
          </>
        ) : (
          <p className="text-xl leading-[29px] font-bold text-white">
            Prontinho,
            <br />
            arquivos guardados
          </p>
        )}
      </div>
    </div>
  )
}

export { MobileSuccess }
