import type { Decorator } from "@storybook/react-vite"

/**
 * Moldura de 390px (largura dos frames Mobile do Figma) para componentes só de mobile.
 * No Canvas o viewport `kdMobile` já limita a largura; na Docs não, e sem a moldura
 * esses componentes se esticavam na coluna inteira (MobileBottomNav quebrava).
 */
export const mobileFrame: Decorator = (Story) => (
  <div className="relative mx-auto w-[390px] max-w-full overflow-hidden rounded-[28px] border border-zinc-300 bg-neutral-surface-background dark:border-zinc-700">
    <Story />
  </div>
)
