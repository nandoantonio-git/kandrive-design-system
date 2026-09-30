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
      // Gate: qualquer violação do axe quebra o teste.
      test: 'error',
      // Exceção estreita (lote de paleta, 2026-09-25): os 3 tokens do Q17
      // (Neutral/Text/Tertiary, Brand/Primary/Default-texto, Brand/Secondary/
      // Light) foram escurecidos, e os `text-zinc-500` soltos do código
      // trocados pelo token — isso já fechou 66% das ocorrências. O que sobra
      // é de outra natureza (fora do escopo aprovado no Q17), listado em
      // [[Conflitos Abertos]]: estados esmaecidos por opacidade (Sidebar,
      // NodeContextMenu, ArchiveBrowserModalSidebar, o catálogo do Icon) e
      // cores semânticas de badge (âmbar "Duplicado", rosa "Urgente", azul de
      // foco do CardLogin). Fica `reviewOnFail` até uma decisão sobre elas.
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
        // Atomic design (decisão de 2026-09-30): em cada nível, grupos por função; Pages na ordem da jornada,
        // e dentro de cada página Desktop → Tablet → Mobile. O que não estiver listado fica em ordem alfabética.
        order: [
          'Introdução',
          'Atoms', ['Ações', 'Formulário', 'Rótulos e badges', 'Ícones e símbolos', 'Itens de lista', 'Identidade e feedback'],
          'Molecules', ['Navegação', 'Busca e filtros', 'Arquivos', 'Armazenamento', 'Organização', 'Formulários e configurações', 'Feedback e menus'],
          'Organisms', ['Navegação', 'Arquivos', 'Armazenamento', 'Organização', 'Ajuda', 'Conta e diálogos'],
          'Templates',
          'Pages', [
            'Login', ['Default', 'Tablet', 'Mobile'],
            'Onboarding', ['Welcome', 'Dominant Hand', 'Theme', 'Done', 'Dominant Hand Tablet'],
            'Home', ['Grid Mode', 'List Mode', 'Columns Mode', 'List Mode Selected', 'First Upload', 'Grid Tablet', 'List Tablet', 'Grid Mobile', 'List Mobile', 'First Upload Mobile'],
            'Organization', ['Default', 'Template Drop Zone', 'Review', 'Review Done', 'Saved', 'Modal Closed', 'Default Tablet', 'Template Drop Zone Tablet', 'Review Tablet', 'Saved Tablet', 'Default Mobile', 'Template Drop Zone Mobile', 'Review Mobile', 'Review Done Mobile', 'Saved Mobile'],
            'LongTermStorage', ['Intro', 'Archive Browser', 'Stored', 'Recovery Pending', 'Intro Tablet', 'Archive Browser Tablet', 'Select Files Mobile', 'Select Files Selected Mobile', 'Stored Mobile', 'Recovery Pending Mobile'],
            'StorageStatus', ['Global', 'Quick Access', 'Long Term', 'Limit Reached', 'Manage Space', 'Global Tablet', 'Manage Space Tablet', 'Global Mobile', 'Long Term Mobile', 'Limit Reached Mobile', 'Manage Space Mobile'],
            'Payment', ['Expanded', 'Collapsed', 'Expanded Tablet', 'Expanded Mobile', 'Collapsed Mobile'],
            'Settings', ['Account', 'Subscription', 'Notifications', 'Appearance', 'Privacy', 'Languages', 'Delete Account', 'Account Tablet', 'Subscription Tablet', 'Account Mobile', 'Subscription Mobile', 'Appearance Mobile', 'Privacy Mobile', 'Delete Account Mobile'],
            'Faq', ['Expanded', 'Collapsed', 'Expanded Tablet', 'Expanded Mobile', 'Collapsed Mobile'],
          ],
          'Tokens', ['Colors', 'Responsividade'],
        ],
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