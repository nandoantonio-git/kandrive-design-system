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
