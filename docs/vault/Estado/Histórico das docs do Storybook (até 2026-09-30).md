---
tags: [estado, historico]
---

# Histórico das docs do Storybook (até 2026-09-30)

Decisão do usuário (2026-09-30): as páginas do Storybook mostram só o que serve para usar o componente (Uso, Composição, Estados, Acessibilidade e Terminologia onde houver termo em jogo). O histórico de auditoria que estava nelas (datas, correções, reconciliações com o Figma, códigos US-xxx) foi movido para cá, sem perda.

Também saíram do Storybook a página `Tokens/Unused` (levantamento de tokens órfãos) e duas seções de `Tokens/Materials`, reproduzidas no fim desta nota.

## Trechos movidos, por componente

Frases de histórico retiradas das páginas; o restante de cada parágrafo continua no Storybook.

### ArchiveBrowserModalSidebar

Extraída como symbol Figma próprio em 2026-08-20 (antes só existia inline dentro do modal); conteúdo idêntico ao já reconciliado em `ArchiveBrowserModal`, sem divergência nova encontrada.

### CleanSpaceDuplicated

Extraída como symbol Figma próprio em 2026-08-20 (antes só existia inline dentro do modal); conteúdo idêntico ao já reconciliado em `CleanSpaceStorage`, sem divergência nova encontrada.

### CleanSpaceLargeFiles

Extraída como symbol Figma próprio em 2026-08-20 (antes só existia inline dentro do modal); conteúdo idêntico ao já reconciliado em `CleanSpaceStorage`, sem divergência nova encontrada.

### ContextHeader

Este componente usa Figtree em vez de Manrope, que é
o que o arquivo Figma original especifica — ver `docs/conflicts.md` para
o histórico dessa decisão (Figtree é a família única do design system).

### FreeModeAddMenu

**🔧 Corrigido em 2026-08-23.** Releitura completa (não mais screenshot isolado) confirmou regressão real: painel `228px` em Liquid Glass claro (`bg-effect-glass-white-50` + `.glass-edge`/`.glass-shadow-sm`, Regra 10), não o fundo sólido `zinc-900`/`zinc-700` que estava implementado (herdado de antes do symbol Figma próprio, 2026-08-20).

### IconActionButton

Corrigido em auditoria US-026 (2026-08-11, Regra 11.4): a base **não** define fundo/pílula de hover — isso é opt-in via `className` de cada átomo, porque só o `ClearButton` (e só em `style="default"`) tem essa pílula confirmada no Figma.

### Label

**Consolidado com `DropdownSelectLabel` (2026-08-18).** `molecule/Label` (citado então como `1421:18687`) e `molecule/DropdownSelect/Label`
(`1439:19650`) eram estruturalmente quase idênticos no Figma (mesma
legenda, mesma pílula, mesmo item de rodapé) e viviam como 2 componentes
de código separados — achado de duplicação registrado desde 2026-08-11
(`docs/conflicts.md`).

### MobileBottomNav

Esta nota dizia que o achado seguia aberto; atualizada conforme o JSDoc do componente.
- 🔧 **2026-09-25:** os 4 botões de destino ganharam `transition-colors`, como o `MobileTabBar`.

### PlanSelection

Use na página de Configurações de Plano — este card não inclui os botões "Gerir espaço"/"Liberar espaço" (esse fluxo mora em `molecule/StorageStatus`, `scope="global"`); a ponte entre as duas telas é o botão "Comprar espaço" de lá pra cá, não o contrário (Regra 5, corrigida em 2026-08-18).

Traduzido pra PT-BR em 2026-08-18 (decisão humana, reverte a leitura literal de 2026-08-13) — "Ativa"/"Mensal"/"Anual"/"Atual"/"Ativo"/"Melhorar" substituem os literais em inglês do Figma de origem, consistente com o resto do produto.

### SaveLongTermFileStorageSelectedFiles

Extraída como symbol Figma próprio em 2026-08-20 (antes só existia inline dentro do modal); conteúdo idêntico ao já reconciliado em `SaveLongTermFileStorage`, sem divergência nova encontrada.

### StorageSidebar

O rótulo do segundo botão, "Comprar espaço" (leva ao Pagamento), consta da lista aprovada da Regra 5 desde 2026-08-16 (antes era só um gap de cobertura).

### TemplateReviewModalItem

Extraída como symbol Figma próprio em 2026-08-20 (antes só existia inline dentro do modal, via `.map()`); conteúdo idêntico ao já reconciliado em `TemplateReviewModal`, sem divergência nova encontrada.

## Tokens/Materials: histórico da borda

Achado em 2026-08-09 (US-005), tratado então como "provável placeholder do
symbol de demonstração" (ver histórico) — revisto em 2026-08-19 pra "borda
real do material", aplicada como `border border-[#00000066]` (cor única,
uniforme). **Achado do usuário em 2026-08-20**: uma cor uniforme não é o
que `Liquid Glass/Light Angle: -45` descreve — é um **highlight
direcional** (canto iluminado × canto sem luz), não uma borda plana.

## Propagação da borda (2026-08-19, revisada em 2026-08-20)

`border border-[#00000066]` foi aplicada em 2026-08-19 em todo componente
que já usava algum token `effect-glass-*`/`backdrop-blur` e ainda não
tinha borda própria — `Label`, `ContextHeader`, `PopoverNotification`,
`ViewModeToggle`, `DropdownSelectGroupBy`, `Notification`, `ActionPill`,
`SearchInput`, `NodeContextMenu`, `ArchiveBrowserModalSearch`,
`SaveOrganizationModal`, `ArchiveBrowserModal`, `CardNeedMoreHelp`,
`CardLogin`, `DropNewTag`, `DropdownMenu`, `FaqInfoCard`,
`FaqInfoCardCollapsed`, `OrganizePanelDropZone`, `TemplateReviewModal`,
`OrganizeFreeModeCanvas`, `SaveLongTermFileStorage`, `ImageItem`.
Componentes que já tinham borda própria (`border-zinc-200`,
`border-brand-teal/20` etc. — `PreviewPane`, `CleanSpaceStorage`,
`UploadPopover`, `Sidebar`, `PlanSelection`, `ThumbnailLarge`) não foram
alterados — já resolviam o problema visual, só com cor diferente; não
reclassificados retroativamente como Figma-confirmado sem verificação
nó-a-nó.

**Revisão de 2026-08-20**: todos os componentes acima trocaram
`border border-[#00000066]` por `.glass-edge` (borda reflexiva). Os que
ainda não tinham sombra própria de contexto também ganharam
`.glass-shadow-sm` — ver `docs/audits/tokens/Materials.md` pra lista
exata de quem recebeu sombra nova vs. quem já tinha a própria.

## Verificação nó-a-nó dos 6 componentes deixados de fora (2026-08-21)

Achado do usuário: alguns elementos "perderam padding e ficaram com uma
borda cinza". Investigação confirmou que a lista de 6 componentes acima
("já tinham borda própria... não foram alterados... não reclassificados
retroativamente como Figma-confirmado sem verificação nó-a-nó") nunca
tinha, de fato, recebido essa verificação — feita agora via
`get_design_context` fresco:

| Componente | Resultado |
| --- | --- |
| `CleanSpaceStorage` | ✅ **Confirmado correto** — Figma usa `border` sólida `#e4e4e7` (zinc-200 exato), não `.glass-edge`. Não alterado. |
| `PlanSelection` | ✅ **Confirmado correto** — Figma usa `border` sólida `#e5e5e5` (≈zinc-200). Não alterado. |
| `ThumbnailLarge` | ✅ **Confirmado correto** — Figma usa `border-brand-primary-light` (teal claro), já implementado assim. Não alterado. |
| `PreviewPane` | ⚠️ **Divergência encontrada, não corrigida** — Figma não tem borda nenhuma na raiz; implementação tem `border-brand-teal/20`. Registrado em `docs/conflicts.md`. |
| `UploadPopover` | 🔧 **Corrigido** — Figma diferencia por estado: idle tem borda plana + sombra leve, "Toast" (upload ativo) não tem borda nenhuma, só sombra pronunciada. Implementação tinha borda fixa nos 2 estados; corrigida pra condicional. |
| `Sidebar` | Não revisado nesta passada (fora do escopo desta sessão). |

Mais 3 componentes novos de 2026-08-20 (extraídos de symbols Figma sem
verificação de estilo, só `get_metadata`) também corrigidos na mesma
passada: `ArchiveBrowserModalSidebar` (sem borda, fill `-36` não `-70`,
`rounded-xl` não `2xl`), `SaveLongTermFileStorageSelectedFiles` (sem
borda, padding `px-1.5 py-3` não `p-3` uniforme — causa real do "perdeu
padding"), `TemplateReviewModalItem` (borda quase invisível
`rgba(107,107,104,0.05)`, não `border-zinc-100`; fill `-50` não `-70/50`).
Detalhe completo em `docs/checkpoints.md`.


## Tokens/Unused (página removida do Storybook)

# Tokens não usados

Levantamento de cor/variável definida na biblioteca e não referenciada por
nenhum componente — visibilidade de tokens órfãos. **Nada listado aqui é
removido do Figma ou do código nesta US**; isso exige confirmação separada
do usuário.

> ✅ **Acesso ao Figma restabelecido em 2026-08-09** (ver
> `design-system/docs/figma-inventory.md`, US-002, e reconciliação desta US
> em `Tokens/Colors`/`Typography`/`Spacing`/`Materials`). A comparação contra
> a página Figma abaixo é uma **amostragem**, não uma varredura node-a-node
> das ~280 formal components da página (custo proibitivo, ver metodologia em
> `figma-inventory.md`) — os resultados são Figma-confirmados quanto ao que
> *foi* encontrado em uso, e explicitamente marcados como não-conclusivos
> quanto ao que não foi observado (Regra 9: ausência de evidência não é
> evidência de ausência).

## Parte Figma: variáveis de cor não observadas na amostragem

A seção "Pallete" (`1427:16958`) define ~70 variáveis de cor únicas
(`get_variable_defs`). Esta reconciliação leu 6 componentes formais como
amostra: `atom/PushButton`, `celule/chip/folder-tag`, `molecule/SearchBar`,
`organism/Sidebar`, `molecule/StorageBar`, e o nó da seção
"Material - Liquid Glass". As variáveis abaixo **não apareceram** nessa
amostra — candidatas a órfã, não confirmação de órfã (a página tem outros
~275 componentes formais e 23 telas não lidos individualmente nesta US):

| Família | Variáveis não observadas na amostra |
| --- | --- |
| `ui-*` | `ui-input-border`, `ui-connector-border`, `ui-button-border-ghost` |
| `effect-glass-*` | `effect-glass-dark-20`, `effect-glass-surface-light`, `effect-glass-fill-light`, `effect-glass-white-50`, `effect-glass-white-05` |
| `effect-overlay-*` | `effect-overlay-dark`, `effect-overlay-secondary`, `effect-overlay-strong`, `effect-overlay-light`, `effect-overlay-subtle` |
| Feedback | `color-feedback-warning`, `color-feedback-warning-subtle` (nenhum componente amostrado tem estado de aviso) |
| Neutro (modo escuro) | `neutral-surface-dark`, `neutral-surface-dark-base`, `neutral-surface-dark-elevated`, `neutral-surface-dark-deeper`, `neutral-surface-dark-deep`, `neutral-surface-dark-input`, `neutral-text-ondark-disabled`, `neutral-text-ondark-deep` |
| Neutro (outros) | `neutral-border-strong`, `neutral-border-strong-subtle`, `neutral-border-subtle`, `neutral-border-ghost`, `neutral-surface-ghost-secondary`, `neutral-surface-ghost-map`, `neutral-surface-subtle-alt`, `neutral-text-placeholder`, `color-surface-elevated` |
| Marca primária | `brand-primary-mid`, `brand-primary-focus`, `color-brand-primary-hover` |

🧩 **Intenção inferida, não confirmada:** a família `neutral-surface-dark-*`
provavelmente alimenta um tema escuro (dark mode) que nenhum dos 6
componentes amostrados exercita nesta leitura — não é evidência de que o
dark mode está de fato não usado no restante da página (as telas "Function
Storage Status" e o Liquid Glass, ambos com `Mode=Dark`, não foram
re-lidos nó-a-nó aqui). `brand-primary-focus`/`color-brand-primary-hover`
são candidatos fortes a **não-órfãos reais** (nomes sugerem estado de
foco/hover de algo interativo que simplesmente não apareceu nos 6 nós
amostrados) — marcados aqui só por transparência de metodologia, não como
recomendação de remoção.

## Parte código: tokens não usados no `src/index.css` atual

O que segue é verificável sem Figma: uma varredura de todas as variáveis CSS
definidas em `design-system/src/index.css` (tema shadcn/ui gerado pela
US-001) contra todo uso em `src/` e `stories/` (excluindo a própria
definição em `index.css`).

### Não referenciados em nenhum lugar

| Variável | Definida em | Motivo provável |
| --- | --- | --- |
| `--card` / `--card-foreground` | `index.css` | Nenhum componente `Card` existe ainda no projeto |
| `--popover` / `--popover-foreground` | `index.css` | Nenhum componente de popover/menu existe ainda |
| `--accent` / `--accent-foreground` | `index.css` | Variante de destaque do shadcn não usada por nenhum primitivo atual |
| `--chart-1` … `--chart-5` | `index.css` | Paleta de gráficos do template shadcn — Kandrive não tem componente de chart no inventário Figma |
| `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` | `index.css` | Bloco de tema de sidebar do template shadcn padrão — `organism/Sidebar` do Figma (`1421:17946`) já foi lido nesta reconciliação, mas nenhum organismo de navegação lateral foi **implementado** em código ainda |

Todas essas variáveis vieram do tema **padrão** gerado pelo `shadcn init` na
US-001 (grayscale genérico, `oklch(...)`) — nenhuma delas reflete os tokens
de marca Kandrive Figma-confirmados (`#007e96` teal, `#31302d` wordmark —
valores `#2A7A8C`/`#3A3C38` da Regra 3 original **descontinuados em
2026-08-10**, propagados em `src/index.css`/`stories/tokens/Colors.mdx` na
US-009). Elas não são "erradas", apenas ainda não substituídas nem
consumidas.

### Referenciados (não órfãos)

Para registro — estes **eram** usados por `src/components/ui/button.tsx`
(o primitivo shadcn base, removido em 2026-09-24) e por `atom/push-button.tsx`
(também removido, migrado para `atom/button.tsx` em 25/09/2026, via `--brand-teal`,
adicionado na US-004), e por isso não entram na lista de órfãos:
`--background`, `--foreground`, `--primary` / `--primary-foreground`,
`--secondary` / `--secondary-foreground`, `--muted` / `--muted-foreground`,
`--destructive`, `--border`, `--input`, `--ring`, `--radius*`, `--brand-teal`
/ `--brand-teal-foreground`.

Atualização de 2026-09-24: o primitivo `src/components/ui/button.tsx` do shadcn foi removido, porque nunca foi usado. O botão de ação do produto agora é o `atom/Button` (Regra 1 revogada em 2026-09-23), e ele só usa tokens de marca (`--brand-teal-action`, `--destructive-surface`, `--neutral-*`). Os tokens shadcn listados acima continuam referenciados por outros primitivos e pela base de tema.

## Próximos passos (fora do escopo desta US)

1. Se uma US futura precisar de confiança total sobre órfãos Figma (não só
   amostragem), rodar `get_variable_defs` nos ~275 componentes formais
   restantes listados em `figma-inventory.md` — custo alto, avaliar caso a
   caso.
2. ✅ Feito na US-009: `--brand-teal` migrado do valor da Regra 3 original
   (`#2A7A8C`) para o valor Figma-confirmado (`#007e96`), após a decisão
   humana de 2026-08-10 que resolveu o CONFLICT em `docs/conflicts.md`.
