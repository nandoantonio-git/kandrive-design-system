import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming/create'
import { withThemeByClassName } from '@storybook/addon-themes'

import '../src/index.css'

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
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
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