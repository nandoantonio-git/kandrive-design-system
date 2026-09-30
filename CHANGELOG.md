# Changelog

Histórico de mudanças do KanDrive Design System: código, Storybook, Figma e vault. As versões seguem o arquivo do Figma. Dentro de cada versão, um bloco por dia de entrega publicada no `main`. Cada dia separa **Adicionado**, **Alterado**, **Corrigido** e **Removido**.

## Não lançado

### Alterado

- Figma: taxonomia das variáveis em três coleções (`Primitives`, `Color`, `Dimension`), em aprovação. Ver o plano da taxonomia no vault.

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

#### Corrigido

- Agrupar e Organizar: as transformações do hover não eram geradas pelo Tailwind.
- Figma: hover das Colunas no Tablet trocava para a linha de 560px do Desktop.
- Figma: a coleção `Storage` pintava textos comuns; `Storage/FastAccess` apontava para uma variável apagada.
- Token `--color-neutral-surface-background` que faltava no tema.

#### Removido

- `FaqTopicChips`, substituído pelo `MobileFooterSettings` Page=FAQ.
- Página `Tokens/Unused`.
- Figma: fluxos de Tablet e do Escuro; tela `Organize/Review/Mobile`; variante `HomeAlt` do Header; coleção `Storage`.

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
