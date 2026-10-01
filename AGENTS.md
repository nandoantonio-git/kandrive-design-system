# AGENTS.md: como um agente de IA usa o KanDrive Design System

Este arquivo é para agentes (Claude Code, Codex, Cursor e outros) que vão **montar telas** ou **alterar componentes**
neste repositório. O guia completo para pessoas é o [docs/USAGE.md](docs/USAGE.md). Leia este primeiro: são 2 minutos.

## O que é

Catálogo de **141 componentes React 19 + Tailwind v4 + TypeScript**, fiéis ao Figma **KanDrive V0.2.1**
(`2g7udqxWbGA8F9Or7PGNg3`), documentados no Storybook 10. Não é pacote npm: os componentes são copiados ou importados
por caminho, no estilo shadcn/ui. Alias `@/` aponta para `src/`.

## Onde procurar, nesta ordem

1. **[docs/COMPONENTS.md](docs/COMPONENTS.md)**: índice gerado de todos os componentes (camada, arquivo, Docs).
   Para regenerar: `npm run docs:components`.
2. **Storybook** (https://kandrive-design-system.vercel.app): cada componente tem uma página Docs com Figma, Uso, Props,
   Estados e Terminologia. O índice máquina-legível é `/index.json`. Com `npm run storybook`, o addon MCP
   (`@storybook/addon-mcp`) responde em `http://localhost:6006/mcp`.
3. **O código**: `src/components/{atoms,molecules,organisms,templates,pages}/<nome-em-kebab>.tsx`. O comentário no topo de
   cada componente cita o nó do Figma e as decisões datadas.
4. **O vault**: `docs/vault/Regras/` (uma página por regra), `docs/vault/Glossário.md` (vocabulário) e
   `docs/vault/Tom de Voz e Personalidade da Marca.md`.

## Como montar uma tela

- **Reuse antes de criar.** Se existe um componente que cobre o caso, use. Não escreva outro parecido.
- **Componha de baixo para cima**: atoms em molecules, em organisms, em templates, em pages. A casca de tela é
  `AppShell` (`src/components/templates/app-shell.tsx`); `src/components/pages/*` são composições completas de exemplo.
- **Importe por caminho**: `import { Button } from "@/components/atoms/button"`. Exportações nomeadas.
- **Estilo só com tokens** (classes Tailwind de `src/index.css`), nunca hex solto: `text-neutral-text-primary`,
  `bg-brand-teal-action`, `border-neutral-border-light`. Vidro: `bg-effect-glass-white-*` com `backdrop-blur-md glass-edge glass-shadow-sm`.
- **Tema escuro** é a classe `dark` num ancestral. Não escreva cor separada para o escuro: o token troca sozinho.
- **Responsivo** por `tablet:` (≥720px) e `desktop:` (≥1200px). Mobile é o padrão sem prefixo.
- **Exemplo mínimo que compila**: veja a seção 2 do [docs/USAGE.md](docs/USAGE.md).

## Regras que não se negociam

| Regra | O que exige |
|---|---|
| **5, Terminologia** | *Guardar* é a ação, *Guardados* é o lugar, *Longo prazo* e *Acesso rápido* são as camadas, *Total* (nunca "Global"). Proibidos como texto de tela: freezer, congelado, frio, corrente, elegível, camada, siglas internas, palavras em inglês. Botão: até 4 palavras, sem artigo, descreve o estado seguinte |
| **12, Sem travessão** | Nenhum travessão (—) em texto que o usuário lê |
| **13, Header** | Organizar e Guardar em teal com texto branco |
| **4, Tipografia** | Figtree; corpo em 16, 14 e 12px, nunca menos de 12px |
| **3 e 2, Cores** | Só tokens. Nome oficial é o do Figma (`Neutral/Text/Primary`); token novo entra primeiro em `src/components/tokens/figma-color-bridge.ts` |
| **9, Figma-confirmado vs Inferido** | Nunca apresente inferência como fato. Marque o que não está no Figma com 🧩 |
| **11, Verificação** | Nada é "verificado" sem olhar o Figma real e uma captura real. Nunca invente botão, barra, texto ou ícone |
| **8, Fluid interface** | Componente interativo tem feedback no clique (não só no release), transições interrompíveis e todos os estados (default, hover, active, disabled, loading, error). Estado ausente no Figma é documentado como gap |
| **10, Liquid Glass** | O vidro tem uma especificação só (`Tokens / Materials`). Referencie, não reimplemente |

Tom de voz: casual e entusiasmado no padrão; **modo sóbrio** (sem humor e sem o mascote Kan) em erro, exclusão, segurança,
pagamento e jurídico. A mensagem de sucesso abre com "Prontinho!". O mascote é um **canguru** (Kan), nunca outro bicho.

## Acessibilidade e plataforma (já cobertas pelos componentes, não desfaça)

- Alvos de toque de 44px no Mobile (regra global em `src/index.css`, sob `@media (pointer: coarse)`).
- Movimento atrás de `motion-safe:` ou `motion-reduce:`.
- Contraste é erro nos testes (axe). Use os tokens e passa.

## O que não fazer

- **Não crie componente, tela ou texto que o Figma não tem**, nem reaproveite um ícone ou um botão com outro nome. Se faltar peça, diga ao usuário.
- **Não altere o Figma original** `oFp2TLeCG4GJeCOFVhBvjg`; o arquivo de trabalho é `2g7udqxWbGA8F9Or7PGNg3`.
- **Não use `Canvas` do Storybook para história que depende da largura da janela** (casca, Header, canvas grande): use
  `DocsFrame` (`.storybook/docs-frame.tsx`), senão a Docs mostra o layout errado. `npm run check:docs` pega o erro.
- **Não sobrescreva imagem de nó do Figma** sem saber o que ela é.
- Não escreva atribuição de IA em mensagens de commit nem em PR.

## Antes de dizer que terminou

```bash
npx tsc -b                # tipos
npx oxlint                # lint, 0 erros
npm test                  # histórias no navegador, com axe (510 testes)
npm run check:motion      # prefers-reduced-motion
npm run check:touch       # alvos de 44px (gera o Storybook estático)
npm run check:docs        # Docs sem conteúdo vazando da coluna
npm run docs:components   # regenera docs/COMPONENTS.md se mexeu em componentes ou histórias
```

Registre a mudança no [CHANGELOG.md](CHANGELOG.md) (um bloco por dia, com Adicionado, Alterado, Corrigido e Removido) e,
se for uma decisão de design, na nota certa do vault.

## Estrutura

```
src/components/   atoms · molecules · organisms · templates · pages
src/index.css     tokens, tema, breakpoints, vidro
src/lib/          utils (cn), preferences (PreferencesProvider)
stories/          histórias e Docs, nas mesmas camadas, mais tokens/
.storybook/       config, DocsFrame, mobile-frame, glass-backdrop
docs/             USAGE.md, COMPONENTS.md, CASE-STUDY.md, vault/
scripts/          check-motion, check-touch-targets, check-docs-overflow, gen-component-index
```
