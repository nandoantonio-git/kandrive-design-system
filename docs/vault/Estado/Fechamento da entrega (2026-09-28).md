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
- [ ] **B — Pendências da auditoria** (Q5 "Filtros", Q6 nodes).
- [ ] **C — Marca** (favicon, logo da barra lateral, página `Tokens/Marca`).
- [ ] **D — UX writing:** o relatório. Alterações só depois da aprovação.
- [ ] **E — Figma:** o estado Expanded do PagePickerButton, depois o que o relatório de UX writing aprovar.

Cada lote vai para `main` ao terminar (Q10 da auditoria).
