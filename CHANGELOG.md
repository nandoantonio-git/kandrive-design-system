# Changelog

Histórico de mudanças do KanDrive Design System: código, Storybook, Figma e vault. As versões seguem o arquivo do Figma. Dentro de cada versão, um bloco por dia de entrega publicada no `main`. Cada dia separa **Adicionado**, **Alterado**, **Corrigido** e **Removido**.

## Não lançado

Nada por enquanto.

## V0.2.1

Arquivo do Figma KanDrive V0.2.1, a partir de 2026-09-23.

### 2026-09-30

#### Adicionado

- 12 componentes do Figma que ainda não tinham página: `FileTypeIcon`, `MenuItemFloating`, `SelectBox`, `SkeletonRow`, `DisclosureHeader`, `SidebarOption`, `StorageStatusHeaderSelector`, `FreeModeButton`, `Footer`, `StorageStatusSection`, `PageToolbar` e `SearchHeader`.
- Revisar organização no Mobile como folha de baixo (`Organize/ReviewSheet/Mobile`), no Figma e no código.
- FAQ: barra "Nesta página" (`Sidebar` Page=FAQ) no Desktop e no Tablet, e os tópicos no `MobileFooterSettings` Page=FAQ no Mobile.
- Ícone Organizar animado no Header, com o desenho do `atom/IconButton`.
- Figma: fluxos em pares Desktop e Mobile (Entrar, Início, Organizar, Guardar, Gerir espaço, Limite, Pagamento, Configurações, Ajuda); a gaveta do Mobile leva às Configurações e à Ajuda.
- Changelog.
- Case Study: slide `07 / Escopo`, com o que entrou no case e o que ficou de fora. Protótipo: Compartilhados, Recentes, Favoritos e Lixeira abrem o aviso "Fora do escopo deste case" (`organism/Dialog` informativo) em vez de não fazer nada.
- Case Study: resultado do teste de usabilidade como leitura qualitativa (no documento e no slide 03), tempos como apoio com o critério do "esperado" explicado, e a seção "O que ainda não foi validado".
- Vocabulário (auditoria UX, A3): mapa ação, lugar e camada na Regra 5 e no Glossário. **Guardar** é a ação, **Guardados** é o lugar e **Longo prazo** é só a camada do Status. Grafia "Longo prazo" e "Acesso rápido" padronizada no Figma (22 textos) e no crumb do Status de armazenamento; "Guardados (Longo prazo e arquivos frios)" nas Configurações virou "Guardados".
- Hierarquia de ação (auditoria UX, A2): um primário por tela. Organizar e Guardar do Header passam para contorno (Figma e código); "Comprar espaço" da barra lateral só aparece com uso a partir de 80% (`buySpaceFrom`), e o aviso de limite atingido segue com o botão principal de compra; o `ContextHeader` troca o ícone Compartilhar, que está fora do escopo, por Organizar e Guardar, aproximando as ações do case da seleção. Texto de exemplo "20 TB de 2 GB usados" corrigido para "1 TB de 2 TB usados".
- Depois de guardar (auditoria UX, A4): no painel "Por que guardar?" o prazo de resgate (e-mail em até 8h) vem primeiro e em negrito, antes do botão Concluir, seguido da frase que liga guardar, Guardados e longo prazo (Figma e código). Em `Storage/LongTerm/Desktop`, aviso com o que mudou, quanto espaço voltou e como resgatar, reaproveitando o `PopoverNotification` (claro e Dark); no código, `notificationProps` na página de Armazenamento e a história `LongTermAfterSave`.
- Case Study: slide novo `08 / Personas` ("Quem é atendido por quê"), ligando Bruna, Mariana e Rafael ao que o case entrega e ao que ficou de fora; o deck passa a ter 10 slides (Navegação é o 09 e Entrega o 10). Slide 06 com miniaturas maiores, regeradas das telas atuais, e uma legenda de insight por experiência; slide 10 com números de valor (188 componentes no Figma e 139 em React, 494 testes, 179 telas, 92 cores base e 121 papéis) e o Graphify como nota de processo; texto mínimo de 20px nos slides 03, 09 e 10 (árvore do código com as contagens atuais).
- `organism/Dialog` Info Mobile (342px), no Figma e no código, e o aviso "Fora do escopo deste case" do Mobile passa a usá-lo. `atom/PushButton` marcado como obsoleto na descrição (214 instâncias dentro de componentes ainda o usam; a migração fica como to-do futuro).
- Revisar organização (M1): a página atrás do modal já aparece esmaecida no Figma; nada a mudar.
- Voz e tom: a seção `07 · Voz e tom` da Design Language ganhou os 5 atributos que representam a marca e os 5 que não representam, o arquétipo Inocente (Idealista no Bakka) e o posicionamento; a nota de Tom de Voz no vault foi atualizada com o entregável do Módulo 11.
- Movimento reduzido (auditoria UX, A8): `npm run check:motion` (`scripts/check-motion.mjs`) falha quando há transição de transform ou `animate-*` sem `motion-reduce`/`motion-safe`; 14 trechos corrigidos (setas de abrir e fechar, botões, rádio, spinner da busca e barra inferior do Mobile).
- Estados do Desktop (auditoria UX, A5): `Home/GridLoading`, `Home/ListLoading`, `Home/NetworkError` e `LongTermStorage/RecoveryPending` no Desktop, e `LongTermStorage/Stored/Desktop` (o que foi movido, o destino, o espaço liberado e como resgatar), todos no claro e no Dark (10 telas novas); Login de erro no Tablet; `Organize/ReviewFileRemoved/Desktop`, com "Desfazer" depois de excluir um arquivo na revisão. No código: `HomePage` com `status` (`loading` e `error`, com `onRetry`), `LongTermStoragePage` `stored` com resumo no desktop e tablet (`storedSummary`) e `TemplateReviewModalItem` com "Desfazer" (`onUndoDelete`). No protótipo, Concluir leva a `Stored/Desktop`, e as telas de carregamento avançam sozinhas para a Home.
- `atom/IconButton` (auditoria UX, M7): refatoração avaliada e não feita (só 2 dos 7 ícones são componentes, a cor muda por estilo e estado dentro dos vetores e a matriz é irregular); a matriz ficou documentada na descrição do componente e as 4 cores brancas do estilo OnDark foram ligadas a `Text/OnDark`.
- Higiene (auditoria UX, M4 e M5): 234 camadas de estrutura das telas renomeadas (`Corpo`, `Coluna lateral`, `Conteúdo`, `Cabeçalho da página`, `Área de arquivos`, `Título e controles`). Tokens pouco usados documentados e mantidos (`docs/vault/Estado/Tokens pouco usados`).
- Alvos de toque de 44px no Mobile (auditoria UX, A1): com ponteiro de toque, todo botão, aba, link, caixa e opção ganha uma área invisível de no mínimo 44x44, e campos de texto, `select` e `textarea` ganham altura mínima de 44px (`src/index.css`); com mouse, nada muda. `npm run check:touch` mede a área efetiva em 390px nas 57 histórias Mobile: de 193 alvos abaixo de 44px para 0. Figma: `atom/Chip` passa de 28 para 44px de altura, as abas do `MobileTabBar` têm a área de 44px sem mover o conteúdo, e a regra de toque entrou nas descrições de 9 componentes.
- Uma busca por vez (auditoria UX, M3): com o modal de Guardar aberto, a busca do Header fica desativada (`searchDisabled` no `HomePage`, e a busca a 50% no Figma, em Intro e Navegador de arquivos, Desktop e Tablet, claro e Dark), e a busca dentro dos modais passa a dizer "Buscar para guardar".
- Login com erro (auditoria UX, A5): `CardLogin` ganha a propriedade `error` (mensagem em `role="alert"` com ícone, campo de senha `aria-invalid` com borda de erro, foco na senha; no Mobile sobre o teal, borda branca de 2px), com as histórias `ErrorState` e `ErrorStateMobile`. Figma: `organism/CardLogin` ganha a propriedade `State` (Default e Error, Desktop e Mobile) e 4 telas novas, `Auth/LoginError/Desktop` e `/Mobile`, no claro e no Dark, com os fluxos "A · Desktop: Entrar com erro" e "A · Mobile: Entrar com erro". "Esqueceu sua senha?" e "Crie uma agora" abrem o aviso de fora do escopo nas telas de Login claras.
- Figma: tela de limite atingido com a barra lateral coerente com o aviso (barras cheias, 30 GB de 30 GB e 60 GB de 60 GB); 125 cores soltas ligadas a variáveis (91 textos `#09090b` em `Text/Primary` e 34 preenchimentos `#007e96` em `Brand/Primary/Action`).

#### Alterado

- Storybook agrupado por função dentro de cada nível do atomic design; Pages na ordem da jornada.
- Histórico de auditoria das docs movido para o vault. Cada página abre com o nome e o link do Figma.
- StorageStatus, Colunas, PageLead, MiniMap, DropNewTag, InfoPopover e TypeLabel alinhados ao Figma.
- Componentes só de mobile aparecem numa moldura de 390px nas docs.
- Figma: variantes Tablet do Header renomeadas pelo uso; `FaqQuickLinks` virou variante do `MobileFooterSettings`.
- Figma: variáveis em três coleções. `Primitives` (89 cores de base), `Color` (120 papéis por nome de papel: `Text/*`, `Surface/*`, `Border/*`, `Feedback/*`…, apontando para as cores de base) e `Dimension` (raio e espaçamento pelo valor em px). Valores praticamente iguais foram juntados (19 junções), e o código acompanhou.
- Página de Cores em cartões (cor, nome, hex, RGB, cor de base e token CSS), com chave Light/Dark.
- Header Desktop no grid (Figma e código): logo nas colunas 1 e 2, busca nas colunas 3 a 7 (566px), Organizar e Guardar a partir da coluna 8, ícones terminando na margem direita; acima de 1440px o Header acompanha o conteúdo centralizado.
- Gerir espaço e Comprar espaço com rótulo de 16px (Regra 4), um sobre o outro na largura da barra; no Figma, `atom/PushButton` trocado por `atom/Button` (Outline e Primary), mantendo as 118 ligações do protótipo.
- Código no grid Desktop do Figma (1440px): `AppShell` com margem e gap de 24 (antes 48), Sidebar de 212px em todas as vistas (antes 288px, e 150px na vista Colunas), FAQ com conteúdo de 920px e Atalhos de 212px, Pagamento a partir da coluna 3 com os planos em 920px.

#### Corrigido

- Agrupar e Organizar: as transformações do hover não eram geradas pelo Tailwind.
- Figma: hover das Colunas no Tablet trocava para a linha de 560px do Desktop.
- Figma: a coleção `Storage` pintava textos comuns; `Storage/FastAccess` apontava para uma variável apagada.
- Token `--color-neutral-surface-background` que faltava no tema.
- Contraste (auditoria UX): o axe volta a quebrar o teste por contraste (antes era só aviso), e as falhas que apareceram foram corrigidas. Tokens de texto `Placeholder`, `Muted`, `Cool/Tertiary` e `OnGlass/*` no Light e `Cool/Tertiary` no Dark passam de 4,5:1 (duas cores de base novas, `Zinc/575` e `Slate/600`); contorno dos campos de formulário a 3:1 (`Border/Input`, novo valor nos dois modos, também no código); avisos em texto usam `Feedback/Warning/Text`, e o verde de sucesso em texto ganhou o papel `Feedback/Success/Text`.
- Tipografia, lote 1 (auditoria UX, Regra 4 revisada): escala de 3 degraus (16 corpo, 14 apoio, 12 microtexto, piso antes de 11). Figma: estilos `Type/Body/XS`, `XS/Bold`, `Tag` e `Caption/SM` passam a 12px e `Body/SM` a 14px; novos `XS/Medium`, `SM/Medium`, `SM/Bold`, `MD/Medium` e `MD/Bold`; aplicados em Sidebar, SidebarOption, StorageSidebar, SidebarToggle, StorageStatus, TypeLabel, Tag e FolderTagChip. Como os estilos se espalham, os textos de instâncias foram atualizados e 4 pontos de layout ajustados (painel "Por que guardar?", descrições dos cartões de método, abas e barra inferior do Mobile). Código: Sidebar, StorageStatus, TypeLabel, Tag e afins com 12px de piso.
- Tipografia, lote 2: modais e painéis de Organizar e Guardar (TemplateReviewModal, TemplateCard, CleanSpaceStorage, SaveLongTermFileStorage, ArchiveBrowserModal, SaveOrganizationModal, PopoverNotification, MethodOrganizeButton e SearchInput) e 667 textos soltos das telas (Configurações, FAQ, Pagamento, Armazenamento e Mobile) na escala 12/14/16. No código, 45 arquivos passaram de 10 e 11px para 12 e de 13 para 14. Legendas do Armazenamento quebram linha no Mobile; "Estrutura sugerida" unificado em "Template sugerido". Textos abaixo de 12px nas telas: 30% antes do lote 1, 0% agora.
- Tipografia, lote 3 (fecha a escala): Modo livre (nós do canvas, menu de contexto e rodapé), FAQ, Pagamento, Login, campos e demais componentes na escala 12/14/16. 128 textos em fontes fora da marca (Manrope, Inter e Geist, no Login, no Modo livre, no FAQ e em modais) passaram para Figtree. "Liberar espaço" e "Comprar espaço" do Armazenamento viraram `atom/Button` MD com rótulo de 16px. Nó "Guardar automaticamente" com 200px e título em duas linhas; seletor "Agrupar" com a largura do texto. Página `Tokens/Typography` do Storybook com a escala nova. Corrigido "Acesso rápidp" (15 ocorrências).
- Itens inativos da barra lateral deixam de usar `opacity-50` e passam a usar cor de texto com contraste (Sidebar e Navegador de arquivos); pílula de Ajuda, Configurações e Conta do Header a 100%, como no Figma atual.
- Texto das telas: "Search" no modal de Longo prazo virou "Buscar arquivos, pastas ou templates"; "Continuar..." virou "Continuar"; "Taxonomia Sugerida" e "Template Sugerido" viraram "Template sugerido"; "Corrente" virou "Acesso rápido"; "X itens selecionado" virou "X itens selecionados"; "15.35 MB" virou "15,35 MB"; o modal de Longo prazo agora diz "3 selecionados" como os três chips.
- Figma: 88 ligações a variáveis apagadas (rosa da marca) religadas ao `Brand/Accent`; `lang` do Storybook e do `index.html` passou de `en` para `pt-BR`.
- Figma: telas Desktop fora do grid. A barra lateral estava na variante Tablet (150px); agora todas as 58 telas Desktop (claro e Dark) usam o estilo `Grid/Desktop` (12 colunas, margem 24, gutter 24), com a barra nas colunas 1 e 2 e o conteúdo nas colunas 3 a 12.

#### Removido

- `FaqTopicChips`, substituído pelo `MobileFooterSettings` Page=FAQ.
- Página `Tokens/Unused`.
- Figma: fluxos de Tablet e do Escuro; tela `Organize/Review/Mobile`; variante `HomeAlt` do Header; coleção `Storage`.
- Figma: 66 estilos de cor que repetiam variáveis (ficam os 3 gradientes) e as medidas antigas (`Spacing/XS`, `Radius/Pill`…).

### 2026-09-29

#### Adicionado

- `organism/Dialog` (destrutivo e informativo), ligado ao "Excluir conta" das Configurações.
- Resgate por e-mail e menu Resgatar em Guardados.
- Vídeo de abertura na Introdução; patterns da marca na Design Language e nos slides do Case Study.
- Ícones com o hover do Figma: Guardar, Etiquetar e Home.

#### Alterado

- Regra 12: nenhum travessão nos textos da interface.
- "Liberar espaço" no Status de armazenamento; "Gerir espaço" na Sidebar.
- O logo leva ao início. Favicon branco no Storybook.
- A aba Docs saiu das páginas de tela.

#### Corrigido

- Barra de ferramentas que quebrava o título ao abrir Agrupar e Etiquetar.
- Figma: ligações do protótipo claro (abas do Mobile, busca sem resultado, Navegador para Storage, notificação no fim de Organizar).

### 2026-09-28

#### Adicionado

- Favicon do Figma, logo vertical Light e Dark e a página `Tokens/Marca`.
- Painel real no Modo livre; droplists e botões funcionam sozinhos.

#### Alterado

- Revisão de UX writing aplicada no código, nas docs e no Figma (tom de voz e terminologia).
- Cores numa tabela só; estrutura padrão das páginas de Docs.

#### Corrigido

- Nós do Figma confirmados nas docs; morph do `HamburgerButton`; botão Filtros com estado.

### 2026-09-27

#### Adicionado

- Função de interação (play) em todo componente interativo.

#### Corrigido

- ContextHeader, Label e MethodCard; primeiro exemplo vivo em cada página de Docs; piso de estados nos componentes interativos.

### 2026-09-26

#### Corrigido

- `DropNewTag` interativo de verdade; vidro do `MobileBottomNav` com a opacidade dobrada por engano.

### 2026-09-25

#### Adicionado

- Histórias do Storybook rodando como testes no navegador, com axe e checagem de interação.
- `FolderTagChip` com o estado recolhido do Figma.

#### Alterado

- Conflitos abertos fechados; a Regra 1 (Botão Único) foi revogada.
- 3 tokens de texto escurecidos para passar no WCAG AA.

#### Corrigido

- Regressões do plano de verificação: fidelidade ao Figma, decisões de design e ajustes sistêmicos.

### 2026-09-24

#### Adicionado

- Responsividade: pontos de quebra Tablet e Desktop, `AppShell`, componentes de mobile e as telas Mobile e Tablet de Home, Configurações, Armazenamento, Organizar, Longo prazo, Pagamento, FAQ e Login.
- `atom/Button` (variante, tamanho e forma), `atom/Checkbox` e `molecule/AccordionItem`.
- Mão dominante, cartão de perfil, chips de tópicos do FAQ e Onboarding.
- Página de Introdução e página de Cores lida ao vivo do `index.css`, comparada com o Figma.
- Vault: nota do Logo (Kan, o canguru), Tom de Voz e Glossário.

#### Alterado

- Tokens do Dark por papel (texto × superfície), com os teais da paleta da marca.

#### Corrigido

- Símbolos de arquivo iguais em Light e Dark; tamanhos pares nos botões; rótulos do `BottomNav` e do `RecoveryPending` para leitor de tela.
- Verificação de tipos sem erros.

### 2026-09-23

#### Adicionado

- Tokens inferidos do Figma V0.2.1 e `brand-teal-foreground`.

#### Alterado

- Primária do Dark em tom de branco.
- Links de design do Storybook apontam para o Figma V0.2.1.

## V0.2

Arquivo do Figma KanDrive V0.2, de 2026-08-13 a 2026-08-27.

### 2026-08-27

#### Corrigido

- Menu do Storybook na ordem do atomic design; rolagem visível nos exemplos das docs; MiniMap igual ao Figma; hover do botão de recolher a sidebar.

### 2026-08-26

#### Adicionado

- Tema escuro em todo o catálogo.

#### Corrigido

- Interatividade e ajustes visuais da passada de QA.

### 2026-08-24

#### Adicionado

- As 23 telas de Pages do Figma.

### 2026-08-22

#### Corrigido

- Ícone do `CleanSpaceListSelection`, fundo dos botões Excluir e páginas que quebravam em tela estreita.

### 2026-08-21

#### Adicionado

- Camadas de templates e páginas.

### 2026-08-20

#### Adicionado

- Demonstração de materiais (vidro, tint, preview escuro) e README como case study.

#### Alterado

- Borda do Liquid Glass reflexiva, com a sombra do material.

#### Removido

- Camada "cells": os 10 componentes foram para molecules.

### 2026-08-19

#### Corrigido

- Borda do Liquid Glass em todo o catálogo; estado "clicked" normalizado para "pressed"; interação real em ArchiveItem, FolderItem, VideoItem e ImageItem.

### 2026-08-18

#### Adicionado

- Variante Folder no `FreeModeItemNode`.

#### Alterado

- Componentes renomeados pelo atomic design; `PlanSelection` em português; Label e DropdownSelectLabel consolidados.

#### Corrigido

- Ícone de nuvem do `SidebarToggle`, Sidebar que minimiza e o `ImageItem`.

### 2026-08-16

#### Corrigido

- 18 ajustes finos; docs dos componentes separadas dos registros de auditoria.

### 2026-08-15

#### Adicionado

- Descrições de uso em todos os componentes, paleta de cores e marca no Storybook.
- Vault Obsidian com a arquitetura.

### 2026-08-14

#### Corrigido

- Auditoria de ponto fixo fechada (US-026).

### 2026-08-13

#### Adicionado

- Primeira versão do design system (US-001 a US-025).

## V0.1

Arquivo original do Figma, que serviu de base para a V0.2. Não tem código correspondente.
