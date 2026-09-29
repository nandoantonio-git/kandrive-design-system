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
- [x] **D — UX writing.** Relatório em [[Revisão de UX writing (2026-09-28)]], revisado com a definição de tom de voz que o usuário enviou. Aplicado: ~35 dos 43 itens (código + Storybook + docs). "Gerir Espaço" unificado em toda parte, "Guardar automaticamente", "Global"→"Total", siglas removidas, inglês traduzido, maiúsculas normalizadas, "Prontinho — " nas mensagens de sucesso. Mantido: 6 itens que são texto Figma-confirmado literal e não violam nenhuma regra da definição (detalhados no relatório). [[Regra 5 - Terminologia]] e [[Tom de Voz e Personalidade da Marca]] atualizadas — a segunda mesclada com a definição do usuário, com mais peso para ela. 463/463 testes, tsc e build do Storybook passando.
- [x] **E — Figma.** Estado Expanded do PagePickerButton criado (`PagePickerButton/Expanded`, `3237:29768`), depois movido da página 📐Pages pra seção Molecules da ✨Design System (referência, ao lado do `DropdownSelectGroupBy`).
  - **Logos:** `1427:16927` renomeado de `LogoVertical` para `foundation/LogoHorizontal` (proporção certa). O grupo solto `1623:23819` virou o componente `foundation/LogoVertical` (`3244:50281`), na seção Foundation/Brand, com as variáveis `Logo/*`/`Brand/Primary/Mid` ligadas — conferido pixel a pixel igual ao original.
  - **UX writing:** sincronizados no Figma quase todos os itens aplicados no código (ver [[Revisão de UX writing (2026-09-28)]] › "Sincronização com o Figma"), num total de ~180 nós de texto trocados em uma única varredura da ✨Design System: "Gerir Espaço", "Guardar automaticamente"/"ATIVO", "Interseção" (já feitos antes), mais Imagens/Vídeos, Enviar arquivo/pasta, capitalizações (Descartar/Salvar mudanças, + Nova etiqueta, Salvar template, Revisar organização, Perguntas frequentes, Tamanho do arquivo), Atalhos, o texto fixo "Prontinho —", Fora do padrão, Acesso rápido/Longo prazo (grafia), Total (era "Global"), Início (aba do MobileTabBar), as frases da Organização/Pagamento/Stripe e as legendas Tamanho/Tipo/Data do Modo livre. Verificação final: 0 ocorrências restantes dos termos antigos. Ficaram de fora 4 itens (25, 26, 12, 39), detalhados na "Sincronização" do relatório — o principal é o rótulo "Estrutura sugerida:"/"Taxonomia Sugerida:", que varia por item e precisa de checagem visual nó a nó antes de trocar.
  - **Renomes cosméticos:** ao conferir, `celule/…/Buttons` e as 2 telas sem prefixo `page/*` (achados de 2026-08-20) já não existem mais no Figma atual — vault atualizado, sem ação necessária. O mesmo pro morph do `HamburgerButton`, que já estava implementado.
- [x] **F — Protótipo de navegação.** As 92 telas da 📐Pages já tinham um protótipo rico por baixo (218 navegações, 1.355 interações no total, feito por quem desenhou o arquivo) — a decisão foi completar só o que faltava, direto nas telas reais, sem duplicar nada (ver [[Plano de Fechamento]] para o registro da pergunta e a resposta). Adicionado, sempre apenas somando reações às que já existiam:
  - **A — Entrar → Início:** botão "Entrar" do login ligado à Home.
  - **B — Início:** Grade/Lista/Colunas já funcionava (Smart Animate, pré-existente). Agrupar e Etiquetar estavam com a variante `Disabled` em toda tela testada — troquei para a variante `Default` (já existente no componente, não inventei nada) e liguei o clique à variante `Expanded=true`, também já existente. PagePickerButton não tem instância nenhuma nas telas — só existe como referência isolada na ✨Design System — por isso não entrou no protótipo ao vivo.
  - **C — Organizar:** o arrastar do arquivo (`ON_DRAG`) na tela de DropZone leva à Revisão, com Smart Animate — o limite do Figma é não detectar onde o arquivo foi solto, qualquer arraste tem o mesmo resultado.
  - **D — Guardar no longo prazo:** "Continuar" do modal de introdução liga ao navegador de arquivos; "Adicionar N arquivos" liga a Storage/Longo Prazo (não existe uma tela "Guardado" no Desktop, só no Mobile).
  - **E — Gerir espaço:** botão da barra lateral ligado a Storage/Gerir Espaço (só tinha o hover, faltava o clique).
  - Cada jornada ganhou um ponto de início nomeado (A–E) nos "Flow starting points" da página, mantendo os 2 que já existiam.
  - **Achados no caminho:** 2 reações quebradas (hover apontando pra um nó apagado, `1421:17647`, no rodapé do modal de guardar) — removidas ao ligar o botão novo, já que não funcionavam mesmo. E 98 textos com override local nas telas da 📐Pages que não pegaram a sincronização de UX writing feita na ✨Design System (72 "Gerenciar/Liberar Espaço"→"Gerir Espaço", mais Perguntas frequentes/Atalhos/Acesso rápido/Longo prazo/Vídeos/Revisar organização) — corrigidos com a mesma varredura, 0 sobra confirmada.

Cada lote vai para `main` ao terminar (Q10 da auditoria).

## Rodada de 2026-09-29

- [x] **G — Gerir espaço × Liberar espaço (revoga a unificação da lote D).** Decisão do usuário: são dois botões com duas ações. Sidebar "Gerir espaço" → página Status de armazenamento; Status de armazenamento e Configurações "Liberar espaço" → modal de duplicados e arquivos grandes (título do modal também "Liberar espaço"); "Comprar espaço" → Pagamento, sempre. Sentence case nos três. Código, testes, Docs, [[Regra 5 - Terminologia]], [[Glossário]] e notas de componente atualizados; no Figma, 145 textos na 📐Pages e 37 na ✨Design System (a sidebar diz "Gerir espaço", o resto "Liberar espaço", as duas perguntas do FAQ voltam a "Liberar espaço"), verificação final sem nenhum "Gerenciar/Espaço" fora do padrão. O "Liberar espaço" continua na lista de evitados da definição de tom de voz, com a exceção do botão da página de status e do modal. 463/463 testes e `tsc` passando.

