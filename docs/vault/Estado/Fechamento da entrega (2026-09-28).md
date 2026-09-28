---
tags: [estado, plano]
---

# Fechamento da entrega (2026-09-28)

Continuação da [[Auditoria do Storybook (2026-09-26)]]. Pedido do usuário: droplists e botões funcionando e respeitando a anatomia, as pendências da auditoria resolvidas, revisão de UX writing, marca no Storybook, e cores numa página só.

## Decisões (grill, todas confirmadas)

| # | Decisão |
|---|---|
| Q1 | PagePickerButton abre uma lista, montada com o card de vidro e os itens do Agrupar. Mock = as páginas da navegação (Sidebar), menos Lixeira. No Figma, só o estado Expanded no padrão do Agrupar. |
| Q2 | Agrupar ganha "Mais recentes"/"Mais antigos" abaixo do divisor, como escolha independente, e passa a abrir sozinho. |
| Q3 | Etiquetar expandido alinhado ao `307:14531`, mantendo "+ Nova Etiqueta". |
| Q4 | Varredura geral: tudo que só funcionava se a tela controlasse passa a funcionar sozinho, com teste de interação. |
| Q5 | "Filtros" do resumo de armazenamento só com feedback visual. Painel do Modo livre: E/OU e regras em memória. |
| Q6 | Nodes pendentes: cada item do FileItem aponta para sua variante `Type=`; os 7 sem node são buscados no V0.2.1, e o que não existir fica "🧩 só código"; glifos do HamburgerButton exportados se existirem; node do SidebarDrawer corrigido. Nada é criado no Figma. |
| Q7 | UX writing: ficam de fora a lista aprovada da Regra 5, os exemplos do [[Tom de Voz e Personalidade da Marca]] e os textos decididos nas sessões. Primeiro um relatório; altera no Figma e no Storybook só depois da aprovação. |
| Q8 | Marca: favicon = `foundation/Favicon`, logo da barra lateral = `LogoHorizontal`, página própria `Tokens/Marca` com link na Introdução. SVGs exportados do Figma. |
| + | Cores: as duas áreas da página (tokens do código e variáveis só do Figma) viram uma tabela só, agrupada pela hierarquia do Figma. |
| + | Revisar a interação dos filtros e droplists do Modo livre. |

## Lotes

- [x] **A — Interação.**
  - **Agrupar:** abre sozinho, ganhou a ordem, flutua sobre o conteúdo e o gatilho usa 10px como no Figma.
  - **Etiquetar:** o expandido segue o Figma (padding no topo, altura pelo conteúdo) e flutua.
  - **PagePickerButton:** abre a lista de páginas.
  - **Modo livre:** usa o `NodeContextMenu` real no lugar da cópia estática. As pílulas abrem, o valor aceita texto, E/OU alterna, e adicionar (com o erro do State3), remover, descartar e salvar funcionam.
  - **Varredura:** ViewModeToggle, MobileTabBar, StorageStatus, TagColor e HandPicker passam a funcionar sozinhos. Os rádios de Configurações > Aparência estavam travados e foram ligados.
  - **Cores:** a página virou uma tabela só.
- [x] **B — Pendências da auditoria.**
  - **"Filtros"** alterna ligado/desligado (`aria-pressed`).
  - **Nodes:** FolderItem, ArchiveItem, FileArchiveCard e VideoItem apontam para suas variantes `Type=` de `molecule/FileItem`. Confirmados os componentes de Breadcrumb (`1239:13934`), FileRow (`3029:4009`), SettingsCard (`3029:3867`), SettingsField (= `molecule/TextField`, `3029:3843`) e FaqCallout (= `molecule/Callout`, `1288:16935`). SidebarDrawer aponta para `organism/Sidebar` `Device=Mobile` (`1771:35845`). UploadFolder fica "🧩 só código".
  - **HamburgerButton:** os 4 modos com o morph do protótipo (Closed→Open 200ms, Expand→Collapse 400ms). Os SVGs antigos foram removidos.
- [x] **C — Marca.** Favicon = `foundation/Favicon`, no app e na aba do Storybook (`manager-head.html`). Logo vertical Light/Dark exportado do grupo `1623:23819`. Página `Tokens/Marca` com os logos horizontal e vertical, o símbolo, o favicon e as cores `Logo/*`, com link na Introdução. A barra lateral continua com o horizontal Light do código, que é o mesmo desenho do Figma com as cores `Logo/*` do Light. O componente do Figma é a versão para fundo escuro. Achado registrado em [[Conflitos Abertos]]: os nomes dos componentes de logo estão trocados.
- [~] **D — UX writing.** O relatório está em [[Revisão de UX writing (2026-09-28)]], com 34 itens numerados. **Aguarda aprovação**, e nada foi alterado ainda.
- [~] **E — Figma.** O estado Expanded do PagePickerButton foi criado (`PagePickerButton/Expanded`, `3237:29768`, ao lado de `Organize/ChooseMethod/Mobile`) e ligado à story. Os textos entram depois que o relatório de UX writing for aprovado.

Cada lote vai para `main` ao terminar (Q10 da auditoria).
