---
tags: [estado]
---

# Auditoria do Storybook (2026-09-26)

Origem: revisão do usuário depois do [[Plano de Verificação (Regressões 2026-09-25)]]. Três bugs continuavam (escala dos ícones do `ContextHeader`, `Label` sem interagir, `MethodOrganizeButton` sem lista aberta na página de Docs), e ele pediu uma auditoria completa: estrutura padrão das páginas de Docs, estados de todo elemento interativo, e a aba Interactions funcionando conforme o que cada componente promete fazer.

Fatos levantados: [[Auditoria do Storybook - Inventário]].

## Diagnóstico em números

- **Docs sem padrão:** a sequência de seções mais comum aparece em 7 de 119 páginas. Falta Terminologia em 47, Estados em 33, Uso em 7. Cinco páginas não têm nenhuma seção. Em 9 páginas os `<Controls />` mexem numa story que não aparece.
- **Canvas "morto":** 34 páginas abrem com um primeiro Canvas que não reage ao clique. Causa mais comum: o `args` do meta fixa `state` (ou `selected`, `active`...), o que desliga o comportamento que o componente já tem.
- **Testes de interação:** só 8 stories têm `play`.
- **Sem story/Docs:** `IconActionButton`, `Breadcrumb`, `FileRow`, `SettingsCard`, `SettingsField`, `FaqCallout`.

## Decisões (grill-me, 2026-09-26)

| # | Decisão |
|---|---|
| Q1 | O primeiro Canvas de todo componente interativo é **vivo** (clicou, reage). Estados congelados vão para uma story "Estados" mais abaixo; o `args` do meta deixa de fixar `state` e similares. |
| Q2 | Quando o comportamento vive na composição, a página de Docs demonstra por composição — **só com componentes que existem** (sem inventar peça nem mock). |
| Q3 | Escala de ícone = altura visual do desenho, conferida com o frame do `atom/Icon` do Figma. |
| Q4 | Piso de estados: `hover`, `focus-visible`, `pressed` e `disabled` (quando a prop existe), mais os estados do Figma. O que o Figma não desenha = Regra 8. |
| Q5 | Todo componente interativo tem `play` testando o comportamento descrito no Docs; precisa passar na aba Interactions e no `npm test`. |
| Q6 | Relatório primeiro, depois correção em lotes com commit por lote. |
| Q7 | Estrutura padrão de Docs (abaixo). Fora: Introdução, Tokens, Pages. |
| Q8 | `Label` abre sozinho quando ninguém controla `state` (conserta stories e as 3 telas); busca do painel vira input. |
| Q9 | Ordem dos lotes (abaixo). |
| Q10 | Merge em `main` ao fim de cada lote (a Vercel publica `main`). |
| Q11 | Criar story e Docs para os 6 componentes sem. |
| Q12 | Em Pages/Templates, `play` só onde a tela tem comportamento próprio. |
| Q13 | Implementar `molecule/MethodCard` (Figma `3020:29527`, nunca implementado no código) como grupo de rádio. |
| Q15 | Na Organização (mobile), o `MethodOrganizeButton` abre o `MethodCard` no lugar da pilha de botões. |
| Q16 | `MethodCard`: rádio e descrição usam tokens de papel (`Brand/Primary/Default`, `Neutral/Text/Tertiary`), não os de tier (`Storage/*`); vínculo corrigido no Figma V0.2.1. |
| Q17 | `MethodCard`: título 16px, descrição 12px (exceção de microtexto, igual ao `TemplateCard`). Figma: 15/11. |

### Estrutura padrão de uma página de Docs (Q7)

1. `# Nome (Figma: \`caminho\`, \`nodeId\`)`
2. **Uso** — para que serve e quando usar; primeiro Canvas (vivo) + `<Controls of={...}>` da mesma story
3. **Anatomia** ou **Composição** (opcional) — peças e origem; Material, Cores, Tipografia viram subseções aqui
4. **Estados** — matriz de estados numa story própria
5. **Mobile** (quando houver variante)
6. **Terminologia**

## Lotes

- [x] **1 — Bugs reportados** (2026-09-26):
  - `ContextHeader`: 3 dos 6 SVGs tinham enquadramento fora do grid de 24 dos ícones Material (`ShareFile` 36×29, `Settings2` 16×27, `DeleteButtonGlyph` 10×12 sem respiro). `ShareFile.svg`/`Settings2.svg` reenquadrados (e `#001F27` → `currentColor`); o `DeleteButtonGlyph`, compartilhado com `DeleteButton`, é reenquadrado só no `ContextHeader` via `viewBox`. Desenhos agora entre 9 e 12px de altura, como família.
  - `Label`: abre e fecha sozinho quando ninguém controla `state` (consertou as stories e as 3 telas: Home, Organização, Resumo de armazenamento). Busca vira `<input>` que filtra; opções clicáveis; Esc e clique fora fecham (Regra 8).
  - `MethodCard`: implementado (`molecule/method-card.tsx`), grupo de rádio com setas. A tela de Organização mobile troca a pilha de botões pelo card. `MethodOrganizeButton` virou só gatilho; export morto `MOBILE_ORGANIZE_METHODS` removido. No Figma V0.2.1, 12 vínculos `Storage/*` do `MethodCard` trocados por `Neutral/Text/Tertiary` e `Brand/Primary/Default`.
  - Stories com `play`: Label (2), MethodCard, MethodOrganizeButton. Gate: 120 arquivos / 439 testes.
- [x] **2 — Primeiro Canvas vivo** (2026-09-26): 25 de 28 páginas agora reagem ao clique no primeiro Canvas, via `useArgs` (Controls acompanham) ou tirando o `state` fixado no meta (ArchiveItem, FolderItem, ImageItem, VideoItem). Os estados congelados continuam nas stories de baixo. Label, MethodOrganizeButton e StorageStatusSummary já tinham sido resolvidos no Lote 1.
  - **Sem como ficar vivo sem mudar o componente** (vão para o Lote 3): `PagePickerButton` (não tem estado nem callback; o menu não existe), `OrganizePanelDropZone` (nenhum callback muda `state`), `ArchiveBrowserModal` e `SaveLongTermFileStorage` (nenhum callback muda a seleção).
  - **Pendência de teclado** (Lote 3): `ArchiveBrowserModalListItem` e `FolderTagChip` são `div`/`span` clicáveis, sem foco nem teclado.
  - `ContextHeader`: "Limpar seleção" recolhe o header; para reabrir, só pelos Controls.
  - Gate: `tsc -b` passou a cobrir `stories/` e `.storybook/` (`tsconfig.stories.json`); só apareceu 1 erro antigo, em `RadioButton.stories.tsx`, corrigido.
- [ ] **3 — Piso de estados** por componente.
- [ ] **4 — `play` functions.**
- [ ] **5 — Estrutura padrão dos Docs** (~119 páginas) + os 6 componentes sem story.
