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
    "@storybook/addon-designs",
    // Toggle de tema claro/escuro real (reabertura de escopo, ver
    // src/index.css) — decorator em preview.tsx aplica a classe `.dark`
    // no wrapper do preview via um item na toolbar do Storybook.
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/react-vite",
  // Serve public/ (favicon.svg, kandrive-logo.svg, kandrive-mark.svg) para
  // manager.ts poder referenciar os assets da marca por URL absoluta.
  "staticDirs": ["../public"],
  // Sobrescreve o <title> padrão "storybook - Storybook" da aba do
  // navegador — decisão humana 2026-08-14, ver manager.ts.
  //
  // A partir de 2026-08-23: injeta CSS pra tornar o scroll horizontal do
  // Canvas da Docs perceptível. Achado do usuário ("Home cortado em mobile
  // e desktop"): páginas fixas-largura (Regra do catálogo — nunca encolhe
  // pra caber, Figma-fidelidade, ver [[HomePage]]) já eram roláveis dentro
  // do `<Canvas>` da Docs (`#storybook-preview-wrapper`, id estável do
  // addon-docs, já nasce com `overflow-x: auto`) — confirmado com Playwright
  // contra o deploy real (scroll pra direita revela Guardar/ActionPill/
  // toolbar, nada estava de fato perdido). O problema é só falta de affordance:
  // sem scrollbar visível nem indicação de "tem mais conteúdo", parece
  // quebrado. Vive aqui (não em `src/index.css`) porque `#storybook-preview-wrapper`
  // é markup da casca do manager, fora do iframe de preview que carrega
  // nosso CSS — só `managerHead`/CSS externo alcança esse elemento.
  //
  // `!important` nas props de `background`: o próprio Storybook seta
  // `background`/`overflowX` inline nesse elemento via React `style` (achado
  // testando localmente — sem `!important`, `background-image` virava "none",
  // só `scrollbar-color`/`overflow-x` "pegavam" por coincidirem com o inline
  // do Storybook). Inline style normal só perde pra `!important` de stylesheet.
  "managerHead": (head) => `${head}
<title>Kandrive Design System</title>
<style>
  #storybook-preview-wrapper {
    scrollbar-width: auto;
    scrollbar-color: #007e96 #f7f7f5;
    background-color: #ffffff !important;
    background-repeat: no-repeat !important;
    background-attachment: local, local, scroll, scroll !important;
    background-image:
      linear-gradient(to right, #ffffff 30px, rgba(255, 255, 255, 0) 60px),
      linear-gradient(to left, #ffffff 30px, rgba(255, 255, 255, 0) 60px),
      linear-gradient(to right, rgba(32, 31, 26, 0.18), rgba(32, 31, 26, 0) 20px),
      linear-gradient(to left, rgba(32, 31, 26, 0.18), rgba(32, 31, 26, 0) 20px) !important;
    background-position: left, right, left, right !important;
    background-size: 60px 100%, 60px 100%, 20px 100%, 20px 100% !important;
  }
  #storybook-preview-wrapper::-webkit-scrollbar {
    height: 10px;
  }
  #storybook-preview-wrapper::-webkit-scrollbar-track {
    background: #f7f7f5;
  }
  #storybook-preview-wrapper::-webkit-scrollbar-thumb {
    background: #007e96;
    border-radius: 999px;
  }
</style>`
};
export default config;