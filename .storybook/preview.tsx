import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming/create'
import { withThemeByClassName } from '@storybook/addon-themes'

import '../src/index.css'
import { PreferencesProvider } from '../src/lib/preferences'

// Mesmo tema de `.storybook/manager.ts`, aplicado aos blocos de docs
// (tabelas de Args, etc.) — decisão humana 2026-08-14, ver manager.ts.
const docsTheme = create({
  base: 'light',
  brandTitle: 'Kandrive',
  brandImage: '/kandrive-logo.svg',
  fontBase: '"Figtree Variable", "Figtree", sans-serif',
  colorPrimary: '#007e96',
  colorSecondary: '#007e96',
  appBg: '#f7f7f5',
  appContentBg: '#ffffff',
  textColor: '#201f1a',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    docs: {
      theme: docsTheme,
    },

    // Viewports do KanDrive (decisão de responsividade, 2026-09-24): as
    // mesmas larguras dos frames do Figma V0.2.1. Os breakpoints do código
    // são outros: mobile < 720, tablet 720–1199, desktop ≥ 1200 (ver
    // Tokens/Responsividade). Os presets genéricos saem.
    viewport: {
      options: {
        kdMobile: { name: 'Mobile · 390', styles: { width: '390px', height: '844px' }, type: 'mobile' },
        kdTablet: { name: 'Tablet · 720', styles: { width: '720px', height: '1024px' }, type: 'tablet' },
        kdDesktop: { name: 'Desktop · 1440', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
      },
    },

    a11y: {
      // Gate (fase D, 2026-09-25): qualquer violação do axe quebra o teste.
      test: 'error',
      // Exceção explícita (Q17): o contraste de cor aparece no painel como
      // "precisa de revisão", sem quebrar o teste, até o lote de paleta que
      // vem depois da fase E (761 ocorrências em 4 pares de cor).
      config: { rules: [{ id: 'color-contrast', reviewOnFail: true }] },
    },

    // Sem isso, o Storybook ordena as categorias de topo alfabeticamente
    // (`Pages` antes de `Templates`, por causa do P < T) — contradiz a
    // hierarquia real do atomic design (Atoms → Molecules → Organisms →
    // Templates → Pages, Página é instância de Template com conteúdo
    // real, então vem depois, nunca antes). Dentro de cada categoria e em
    // qualquer coisa fora dessa lista, mantém alfabético (`[]` ao final
    // de cada nível em vez de listar os componentes 1 a 1).
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introdução', 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages', 'Tokens', ['Colors', 'Responsividade']],
      },
    },
  },

  // Toggle claro/escuro real na toolbar do Storybook — aplica a classe
  // `.dark` (`@custom-variant dark` em src/index.css) num wrapper em volta
  // de cada story, não só nos blocos de Docs (esses seguem o tema fixo
  // `light` de `docsTheme` acima, decisão humana anterior, não mexido).
  decorators: [
    // Preferências do usuário (mão dominante): permite trocar a opção em
    // Settings → Aparência e ver o FAB mudar de lado nas outras stories.
    (Story) => (
      <PreferencesProvider>
        <Story />
      </PreferencesProvider>
    ),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;