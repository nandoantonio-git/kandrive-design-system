import type { Decorator } from "@storybook/react-vite"

/**
 * Fundo em faixas verticais da paleta da marca, para o vidro (Regra 10) aparecer nas histórias.
 * Sem conteúdo atrás, `backdrop-blur` e transparência não mostram nada; é o mesmo fundo da demo de
 * `Tokens/Materials`.
 */
export const glassBackdrop: Decorator = (Story) => (
  <div
    className="rounded-3xl p-10"
    style={{
      background:
        "linear-gradient(90deg, #c8dbe2 0 12.5%, #007d96 12.5% 37.5%, #2d2d2d 37.5% 62.5%, #b8264a 62.5% 87.5%, #e5496a 87.5% 100%)",
    }}
  >
    <Story />
  </div>
)
