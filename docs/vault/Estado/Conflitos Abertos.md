---
tags: [estado]
---

# Conflitos Abertos

Fonte completa: `making-of/conflicts.md` (log de todas as entradas, incluindo já resolvidas — movido pra fora deste repositório em 2026-08-21). Aqui, só os que ainda esperam **decisão humana** — ordenados por urgência.

## Resolvidos em 2026-09-25 (fase E do plano de fechamento)

- ~~**Formato de nome dos tokens**~~ ✅ [[Regra 2 - Nomenclatura de Tokens|Regra 2]]: o nome oficial é o do Figma; o CSS é uma tradução mecânica, com os sufixos `-action`/`-surface` como exceção aceita (papel de texto × papel de superfície).
- ~~**Tratamento de "perigo" — 2 leituras válidas**~~ ✅ [[Regra 3 - Cores da Marca|Regra 3]]: formalizado com um 3º caso (confirmação final = preenchido, igual ao status).
- ~~**Tamanho do rótulo do `atom/Button`**~~ ✅ 2026-09-24: a Regra 4 fica sem exceção. O Figma passou os rótulos para 16px, e as alturas e raios foram arredondados para cima, em números pares: MD 36px (raio 6), Glass 36px (raio 10), LG Rounded 46px (raio 12), LG Pill 44px.
- ~~**`PushButton` cobre só 2 dos 7 valores do enum `Style`**~~ ✅ migrado para `atom/Button` em todo o código (32 usos em 16 arquivos) e removido do código e do Storybook. No Figma, o componente ficou marcado como obsoleto (fase A).
- ~~**`atom/Icon/SpatialAudioOff`**~~ ✅ renomeado para `atom/Icon/Account` no Figma (fase A) e no código (`ICONS.Account`).
- ~~**F16, rótulo "Pasta" do `FolderCard` no Dark**~~ ✅ não confirmado: capturas novas do `FolderCard` e do `Organize/Saved/Mobile` no Dark mostram o texto (`Brand/Primary/Dark`, `#2391aa` no Dark) com contraste bom sobre o fundo escuro. Sem reprodução, ficou marcado como resolvido — se voltar a acontecer numa tela específica, reabrir com a captura.

- ~~**`FolderTagChip` — `isExpanded`**~~ ✅ 2026-09-25 (decisão humana): implementado literal ao Figma — com `isExpanded=false` (o padrão), o ícone de pasta e o rótulo ficam com `opacity: 0`, sobra só o botão de remover. Nenhuma tela do produto usa este chip hoje.

## 🟡 Média urgência

**Contraste de cor — 2 grupos fora do lote de paleta de 2026-09-25** (ver [[Plano de Fechamento]]): estados esmaecidos por `opacity-50`/`60` em vez de um token de cor (Sidebar, FAQ/Home/Organization/StorageStatus, UploadPopover, NodeContextMenu, ArchiveBrowserModalSidebar, catálogo do Icon); e as cores semânticas de badge (âmbar "Duplicado", rosa "Urgente", azul de foco do CardLogin/Login). `color-contrast` continua `reviewOnFail` no gate até uma decisão sobre os dois.

## 🟢 Baixa urgência (gaps de polish, não de decisão)

- **`DropNewTag` — cor da tag não propaga pra "dependências" (2026-09-25).** O usuário pediu que a cor escolhida no `DropNewTag` reflita em outros lugares do produto onde a mesma etiqueta aparece (linha de arquivo, chip, etc). Confirmado com o usuário: isso exige um estado global de etiquetas (registro de que tag existe, qual cor, quem usa) — responsabilidade do app consumidor, não deste design system/Storybook, que não tem estado entre páginas. `DropNewTag` não é consumido em nenhum outro componente do repositório hoje (nem `FolderTagChip`), então não há "dependência" real pra propagar aqui. Sem ação — decisão de arquitetura do app, fora de escopo.

- **`atom/Button` — feedback de "pressed" mais discreto que o `PushButton` antigo (2026-09-25).** `PushButton` tinha `scale-[0.98]` + escurecia 20% no `:active`; o `Button` que o substituiu (fase E) só desloca 1px (`translate-y-px`), sem escurecer. Nenhum dos dois é Figma-confirmado (extensão de código, Regra 8) — acharado incidental durante o [[Plano de Verificação (Regressões 2026-09-25)]], não é a causa da queixa original do usuário sobre animação (essa era sobre os ícones Guardar/Organizar, já resolvida como "sem spec no Figma"). Sem ação até o usuário decidir se quer revisitar.
- **`HamburgerButton` — troca de ícone sem morph/transição (2026-09-25).** Hoje troca o SVG inteiro instantaneamente entre `mode="closed"`/`"expand"`. Acharado do [[Plano de Verificação (Regressões 2026-09-25)]], ainda sem investigação de spec Figma (Smart Animate) nem decisão de implementação.

- **`celule/MainCanvas/Organization/FreeMode/Buttons` (2026-08-20)** — única das 10 peças da extinta camada `Cells` ainda não renomeada `molecule/` no Figma fonte (`1431:20043`). Código já trata como `molecule`; só a fonte Figma precisa da correção manual.
- **2 telas sem o prefixo `page/*` consistente (2026-08-20)** — `Organização/ModoData/Organização/Saved` (sem prefixo) e `Page/login` (capitalização diferente + perdeu "Glassmorphism Edition"). Cosmético, não bloqueia implementação.
- Placeholder do `SearchInput` diverge do Figma ("Search" vs. termo aprovado) — decisão deliberada, não bug.
- Vários textos em inglês no Figma fonte (`upload-popover`) — traduzidos direto na implementação, nunca literal. (`FaqFastLinks` e `planSelection` foram traduzidos no Figma na fase A, 2026-09-24.)
- Estados `Focused`/`Typing` do `molecule/SearchBar` do Figma (SF Pro, azul Apple) — nunca implementados: fora da marca (Figtree, teal), e o código usa `SearchInput`, não esse componente. Sem ação sem uma decisão de design sobre se o `SearchBar` ainda tem uso previsto.
- ~~**Sem teste automatizado**~~ ✅ 2026-09-25: `npm test` roda todas as stories no navegador, com a checagem de acessibilidade (axe) e testes de interação. O gate passa a ser `tsc -b`, `oxlint`, `build-storybook` e `npm test`.

## Ver também

- [[Regra 5 - Terminologia]]
- [[Regra 2 - Nomenclatura de Tokens]]
- [[Regra 3 - Cores da Marca]]
