/// <reference types="vitest/config" />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  // Dependências CommonJS do testing-library: sem o pré-empacotamento, o setup do addon-vitest
  // falha no navegador ("does not provide an export named 'elementRoles'").
  optimizeDeps: { include: ['aria-query', 'lz-string', 'dom-accessibility-api', 'pretty-format', 'react-is'] },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src')
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          // Chrome do sistema: os navegadores do Playwright não são baixados neste projeto.
          provider: playwright({ launchOptions: { channel: 'chrome' } }),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});