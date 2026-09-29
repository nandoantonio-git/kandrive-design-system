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

- ~~**Logos no Figma**~~ ✅ 2026-09-28: `1427:16927` renomeado de `foundation/LogoVertical` para `foundation/LogoHorizontal` (formato certo, símbolo ao lado do texto). O grupo `1623:23819` (símbolo em cima, texto embaixo) virou o componente `foundation/LogoVertical` (`3244:50281`), na seção Foundation/Brand, com `Logo/*` e `Brand/Primary/Mid` ligados nas mesmas peças que o horizontal já usava — conferido visualmente, pixel a pixel igual ao original. Achado ao ligar: variável num *stop* de gradiente zera o alfa dele (força pra opaco), o que quebrou o brilho translúcido do ícone; os dois gradientes de brilho decorativo ficaram com cor fixa, sem variável, por não serem cor de marca — são efeito de luz.

## 🟢 Baixa urgência (gaps de polish, não de decisão)

- ~~**Radius do modo coluna**~~ ✅ 2026-09-26: usuário trouxe o link do node real (`826:16143`, `organism/FileListContainer`). `get_design_context` confirma exatamente o que o código já tinha: `border-r` (só a direita) + `rounded-tl`/`rounded-bl` em `radius-md` (8px) — sem divergência. Fechado, sem mudança de código.

- **`DropNewTag`/`TagColor` — "propagação" clarificada pelo usuário como ajustar o próprio elemento `TagColor` (2026-09-26)** ✅ resolvido: o bug real era que `DropNewTag` (`label`/`color`) era 100% controlado sem fallback, e as stories `Default`/`WithLabel` passavam valores fixos sem `onColorChange` — clicar numa cor não fazia nada. Corrigido com o padrão uncontrolled-by-default já usado em `ArchiveItem`/`FolderTagChip`. A leitura anterior ("estado global de etiquetas entre componentes") estava errada — não era isso que o usuário pediu.

- **`atom/Button` — feedback de "pressed" mais discreto que o `PushButton` antigo (2026-09-25).** `PushButton` tinha `scale-[0.98]` + escurecia 20% no `:active`; o `Button` que o substituiu (fase E) só desloca 1px (`translate-y-px`), sem escurecer. Nenhum dos dois é Figma-confirmado (extensão de código, Regra 8) — acharado incidental durante o [[Plano de Verificação (Regressões 2026-09-25)]], não é a causa da queixa original do usuário sobre animação (essa era sobre os ícones Guardar/Organizar, já resolvida como "sem spec no Figma"). Sem ação até o usuário decidir se quer revisitar.
- ~~**`HamburgerButton` — troca de ícone sem morph/transição**~~ ✅ já implementado (Batch B da [[Fechamento da entrega (2026-09-28)]]): os 4 modos com o morph do protótipo (Closed→Open 200ms, Expand→Collapse 400ms). Este achado estava desatualizado no vault.
- ~~**`celule/MainCanvas/Organization/FreeMode/Buttons`**~~ ✅ conferido em 2026-09-28: `1431:20043` já está `molecule/FreeModeButtons` no Figma fonte. Achado desatualizado, sem ação necessária.
- ~~**2 telas sem o prefixo `page/*` consistente**~~ ✅ conferido em 2026-09-28: as telas de login e de "saved" já seguem o padrão atual (`Auth/Login/*`, `Organize/Saved/*`) em todos os dispositivos e nos dois temas. Achado desatualizado (2026-08-20), sem ação necessária.
- Placeholder do `SearchInput` diverge do Figma ("Search" vs. termo aprovado) — decisão deliberada, não bug.
- Vários textos em inglês no Figma fonte (`upload-popover`) — traduzidos direto na implementação, nunca literal. (`FaqFastLinks` e `planSelection` foram traduzidos no Figma na fase A, 2026-09-24.)
- Estados `Focused`/`Typing` do `molecule/SearchBar` do Figma (SF Pro, azul Apple) — nunca implementados: fora da marca (Figtree, teal), e o código usa `SearchInput`, não esse componente. Sem ação sem uma decisão de design sobre se o `SearchBar` ainda tem uso previsto.
- ~~**Sem teste automatizado**~~ ✅ 2026-09-25: `npm test` roda todas as stories no navegador, com a checagem de acessibilidade (axe) e testes de interação. O gate passa a ser `tsc -b`, `oxlint`, `build-storybook` e `npm test`.

## Ver também

- [[Regra 5 - Terminologia]]
- [[Regra 2 - Nomenclatura de Tokens]]
- [[Regra 3 - Cores da Marca]]
