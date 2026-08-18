import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-docs",
      // remark-gfm nunca tinha sido conectado — toda tabela markdown
      // (`| Coluna | ... |`) em qualquer .mdx do catálogo renderizava
      // como texto cru com pipes literais, não como tabela HTML. Achado
      // em 2026-08-18 revisando as páginas de tokens; afeta as ~84
      // páginas de componente também, não só tokens.
      options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } }
    },
    "@storybook/addon-mcp",
    "@storybook/addon-designs"
  ],
  "framework": "@storybook/react-vite",
  // Serve public/ (favicon.svg, kandrive-logo.svg, kandrive-mark.svg) para
  // manager.ts poder referenciar os assets da marca por URL absoluta.
  "staticDirs": ["../public"],
  // Sobrescreve o <title> padrão "storybook - Storybook" da aba do
  // navegador — decisão humana 2026-08-14, ver manager.ts.
  "managerHead": (head) => `${head}\n<title>Kandrive Design System</title>`
};
export default config;