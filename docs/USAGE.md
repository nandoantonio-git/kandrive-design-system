# Como usar o KanDrive Design System

Este guia é para quem vai **montar telas com os componentes** (pessoa ou agente de IA). Para quem vai manter ou
alterar o sistema, veja o [README](../README.md) e o [vault](vault/Kandrive%20Design%20System.md).

Se você é um agente de IA, comece pelo [AGENTS.md](../AGENTS.md): ele resume as regras em uma página.

## O que é, e o que não é

- **É** um catálogo de **139 componentes React** (atoms, molecules, organisms, templates e pages) fiéis ao Figma
  [KanDrive V0.2.1](https://www.figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1), com tokens de cor,
  tipografia e vidro (Liquid Glass), tema claro e escuro e três larguras (Mobile, Tablet e Desktop).
- **Não é** um pacote publicado no npm. O modelo é o do shadcn/ui: você **copia** os arquivos para o seu projeto
  (ou clona este repositório) e importa por caminho. Não há `npm install kandrive`.
- O catálogo vivo é o **[Storybook](https://kandrive-design-system.vercel.app)**. Cada componente tem uma página Docs com
  o link do Figma, o uso, as props, os estados e a terminologia. A lista completa está em
  [COMPONENTS.md](COMPONENTS.md).

## 1. Preparar o projeto

O projeto precisa ter **React 19, Tailwind CSS v4 e TypeScript**, com Vite.

```bash
npm install react react-dom tailwindcss @tailwindcss/vite \
  class-variance-authority clsx tailwind-merge radix-ui lucide-react tw-animate-css shadcn \
  @fontsource-variable/figtree @fontsource-variable/geist
npm install -D vite-plugin-svgr
```

1. **Copie** do repositório para o seu `src/`: `components/`, `lib/`, `assets/` e `index.css`.
   `src/index.css` é onde moram os **tokens** (cores, tipografia, breakpoints, vidro). Se o seu projeto já tem um
   CSS global, junte os dois em vez de substituir.
2. **Alias `@/`** apontando para `src/`, no Vite e no TypeScript (os componentes importam `@/lib/utils` e
   `@/components/...`):

   ```ts
   // vite.config.ts
   import path from "node:path"
   import react from "@vitejs/plugin-react"
   import tailwindcss from "@tailwindcss/vite"
   import svgr from "vite-plugin-svgr"

   export default {
     plugins: [react(), tailwindcss(), svgr()], // svgr: os ícones são importados como `*.svg?react`
     resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
   }
   ```

   ```json
   // tsconfig: "compilerOptions": { "paths": { "@/*": ["./src/*"] } }
   ```

3. **Importe o CSS** uma vez, na entrada do app: `import "./index.css"`. Ele carrega as fontes **Figtree** (a fonte
   do sistema) e **Geist** (uso pontual).

## 2. Montar uma tela

Cada componente é uma exportação nomeada, no arquivo da sua camada: `@/components/<camada>/<nome-em-kebab>`.

```tsx
import * as React from "react"

import { AppShell } from "@/components/templates/app-shell"
import { Sidebar } from "@/components/organisms/sidebar"
import { Button } from "@/components/atoms/button"
import { PreferencesProvider } from "@/lib/preferences"

export function MinhaTela() {
  const [page, setPage] = React.useState<React.ComponentProps<typeof Sidebar>["activePage"]>("Pessoal")
  return (
    <PreferencesProvider>
      <AppShell
        headerProps={{ onOrganize: () => {}, onSave: () => {} }}
        sidebar={<Sidebar activePage={page} onNavigate={setPage} />}
        mobileTabBar={{ active: "home" }}
        mobileBottomNav={{ action: "add" }}
      >
        <h1 className="text-xl font-medium text-neutral-text-primary">Seus arquivos</h1>
        <Button variant="outline">Gerir espaço</Button>
      </AppShell>
    </PreferencesProvider>
  )
}
```

O que esse exemplo mostra:

- **`AppShell`** é a casca de navegação responsiva. Ele decide o que aparece em cada largura: Header e Sidebar no
  Desktop e no Tablet; Header com ☰, barra de abas e barra inferior no Mobile. Você só passa o que a tela tem.
- **`PreferencesProvider`** guarda a mão dominante (muda o lado do botão flutuante no Mobile). Sem ele, o padrão é a direita.
- **`Button`** tem `variant` (`primary`, `outline`, `destructive`, `glass`, `secondary`), `size` (`md`, `lg`) e `shape` (`rounded`, `pill`).
- As **telas prontas** (`@/components/pages/*`, como `HomePage` e `SettingsPage`) mostram composições completas
  e servem de modelo.

## 3. Como escolher um componente

1. **Procure no [Storybook](https://kandrive-design-system.vercel.app)** (campo "Find components") ou em
   [COMPONENTS.md](COMPONENTS.md). Os componentes seguem o atomic design, e o menu agrupa por função.
2. **Use o que já existe.** Se uma tela precisa de um botão, de um chip ou de uma busca, há um componente. Não crie
   outro parecido: reuse e, se faltar algo, veja a seção "Quando faltar algo" abaixo.
3. **Leia a página Docs** do componente: o link do Figma diz de onde ele veio, a tabela de props mostra o que dá para
   mudar, e a seção **Estados** diz o que está desenhado no Figma (🧩 marca o que foi inferido).
4. **Prefira compor de baixo para cima**: atoms dentro de molecules, molecules dentro de organisms, e assim por diante.

## 4. Tokens: cor, tipografia e vidro

Use as **classes de token**, nunca hex solto.

| Para | Use | Exemplo |
|---|---|---|
| Texto | `text-neutral-text-*` | `text-neutral-text-primary`, `text-neutral-text-tertiary` |
| Fundo da página e superfícies | `bg-neutral-surface-*` | `bg-neutral-surface-background` |
| Borda | `border-neutral-border-*` | `border-neutral-border-light` |
| Marca | `bg-brand-teal-action`, `text-brand-teal` | botão primário |
| Feedback | `text-destructive`, `bg-destructive-surface` | erro, exclusão |
| Vidro (Liquid Glass) | `bg-effect-glass-white-*` com `backdrop-blur-md glass-edge glass-shadow-sm` | cartões e barras translúcidas |

- **Todas as cores**, com nome no Figma, hex e RGB: Storybook, página **Tokens / Colors**. No Figma, a seção "Cores do
  sistema" da página Design Language mostra o mesmo, em cartões. Os papéis (coleção `Color`) apontam para as cores
  base (coleção `Primitives`).
- **Tema escuro:** coloque a classe `dark` num elemento acima (por exemplo `<html class="dark">`). Os tokens trocam
  sozinhos. Não escreva cores diferentes para o escuro, só use o token.
- **Tipografia:** Figtree, com escala de **três tamanhos de corpo, 16, 14 e 12px**. Não use tamanho abaixo de 12px.
- **Breakpoints:** `tablet:` (a partir de 720px) e `desktop:` (a partir de 1200px). Os nomes batem com a propriedade
  `Device` do Figma. Abaixo de 720px é Mobile.
- **Vidro:** a receita completa está em **Tokens / Materials**. Para o vidro aparecer, precisa haver conteúdo atrás.

## 5. Regras que valem ao usar os componentes

Estas regras estão no [vault](vault/Regras/), uma página por regra.

- **Terminologia (Regra 5).** *Guardar* é a ação, *Guardados* é o lugar, *Longo prazo* e *Acesso rápido* são as camadas
  do armazenamento, *Total* (nunca "Global"). Evite: freezer, congelado, frio, corrente, elegível, camada (como texto
  de tela) e siglas internas. Botões: no máximo 4 palavras, sem artigo, descrevendo o estado seguinte.
- **Sem travessão (Regra 12)** no texto que o usuário lê.
- **Header (Regra 13).** Organizar e Guardar ficam em teal com texto branco: são os dois destaques do Header.
- **Tom de voz.** Padrão: casual e entusiasmado. Em erro, exclusão, segurança, pagamento e jurídico: modo sóbrio,
  sem humor e sem o mascote Kan. Mensagem de sucesso abre com "Prontinho!".
- **Alvos de toque** de 44px no Mobile: já vêm nos componentes (regra global para ponteiro de toque). Não reduza.
- **Movimento:** transições de transformação e animações levam `motion-reduce:` ou `motion-safe:`.
- **Contraste:** os testes rodam o axe e tratam contraste como erro. Use os tokens e passa.

## 6. Quando faltar algo

1. Confira se um componente existente cobre (procure no Storybook pelo comportamento, não só pelo nome).
2. Se não cobre, **não invente**. Monte com os atoms existentes e marque o que for inferido com 🧩, como nas Docs.
3. Se for uma peça nova de verdade, ela entra primeiro no Figma e depois no código, com a página Docs.
   O catálogo só tem o que o Figma tem (veja o [CHANGELOG](../CHANGELOG.md)).

## 7. Verificar o que você montou

```bash
npx tsc -b               # tipos
npx oxlint               # lint
npm test                 # histórias no navegador, com axe
npm run check:motion     # movimento respeita prefers-reduced-motion
npm run check:touch      # alvos de toque de 44px no Mobile
npm run check:docs       # Docs sem conteúdo vazando da coluna
npm run storybook        # catálogo local em http://localhost:6006
```

Se você usa um agente de IA, o Storybook roda com o addon MCP (`@storybook/addon-mcp`): com o Storybook no ar, o
agente consulta os componentes e as histórias pelo endpoint `/mcp` (por exemplo
`http://localhost:6006/mcp`). O site publicado também expõe o índice completo em
[`index.json`](https://kandrive-design-system.vercel.app/index.json).

## Onde está cada coisa

| O quê | Onde |
|---|---|
| Componentes | `src/components/{atoms,molecules,organisms,templates,pages}` |
| Tokens e tema | `src/index.css` |
| Utilitários e preferências | `src/lib/` |
| Histórias e Docs de cada componente | `stories/` (mesmas camadas) |
| Regras, glossário e decisões | `docs/vault/` |
| Pesquisa de UX | [docs/CASE-STUDY.md](CASE-STUDY.md) |
| Histórico de mudanças | [CHANGELOG.md](../CHANGELOG.md) |
