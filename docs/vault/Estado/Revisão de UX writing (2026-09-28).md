---
tags: [estado, ux-writing, proposta]
---

# Revisão de UX writing (2026-09-28)

Textos visíveis do código (`src/components`, ~460 strings), comparados com [[Tom de Voz e Personalidade da Marca]] e [[Regra 5 - Terminologia]].

> **Revisado em 2026-09-28** com a definição "Tom de voz e terminologia — Kandrive" enviada pelo usuário, que é mais completa que a nota do vault. Os itens 7, 11, 13 e 28 mudaram, e a seção F é nova. ⚠️ A definição proíbe "Liberar espaço" e pede "Gerenciar espaço" em todas as telas, o que contradiz a [[Regra 5 - Terminologia]] (Gerir Espaço na Sidebar, Liberar Espaço em Armazenamento). Ver item 11. **Nada foi alterado ainda.** Aprove por número (ex.: "1–9, 12, 15 com ajuste X"). O que for aprovado muda no Storybook e no Figma V0.2.1: busco cada texto nas instâncias e troco em todas.

**Ficaram de fora (validados):**
- Terminologia aceita: Arquivar (= organizar), Guardar / Guardar no longo prazo / Guardar arquivos, Longo prazo, Acesso rápido, Pronto para guardar, Ver duplicados, Lixeira, "Buscar arquivos, pastas ou templates", Desfazer organização, Excluir pasta e arquivos, "solicitar resgate" (na ação, com o prazo).
- Da Regra 5, e não conflitantes: Comprar Espaço, Editar plano, Organizar. Gerir Espaço e Liberar Espaço ficam no item 11.
- Exemplos da nota de Tom de Voz.
- Decisões das sessões: "Por data", "Por projeto", "Por tipo de arquivo", "Modo livre", "Etiquetar", "Agrupar".
- Nomes de plano (Free, Starter, Pro, Advanced, Max) e conteúdo de exemplo (nomes de arquivo, valores).

## A. Inglês que sobrou na interface

| # | Onde | Hoje | Proposta | Por quê |
|---|---|---|---|---|
| 1 | ViewModeToggle | Grid · List · Columns | Grade · Lista · Colunas | A nota de Tom de Voz já aprova Lista e Colunas. |
| 2 | Configurações › Aparência (legenda) | "Aplica-se às visualizações Grid, List e Columns…" | "…Grade, Lista e Colunas…" | Acompanha o item 1. |
| 3 | TypeLabel / Etiquetar | Image · Videos | Imagens · Vídeos | "Documentos" já está em português e no plural. "Videos" também está sem acento. |
| 4 | MobileTabBar | Home | Início | É a única aba em inglês (as outras são Organizar e Guardar). |
| 5 | Modo livre (nós) | Size > 1.0 GB · Type = .mp4, .mov · Size / Type / Date | Tamanho > 1.0 GB · Tipo = .mp4, .mov · Tamanho / Tipo / Data | O painel de filtro ao lado já usa Tamanho, Tipo e Data. |
| 6 | Modo livre (nó Pasta) | "4.2 GB • 128 Files" | "4.2 GB • 128 arquivos" | O rodapé do mesmo canvas já diz "128 arquivos afetados". |
| 7 | Modo livre (nó) | Auto-Archive · selo ACTIVE | **Arquivar automaticamente** · selo ATIVO | Na definição, Arquivar = organizar. O nó entrega uma pasta ("Vídeos grandes"), então organiza e não guarda. ❓ Se o nó na verdade move para o longo prazo, fica "Guardar automaticamente". |
| 8 | Sidebar (nome acessível) | Colapsar sidebar · Expandir sidebar | Recolher barra lateral · Expandir barra lateral | "Colapsar" e "sidebar" são jargão. |
| 9 | Organização / modal de método | "…correlacionados no seu workspace." | "Escolha como seus arquivos vão ficar organizados." | "Workspace" e "correlacionados" soam técnicos e formais. |

## B. Mesma ação, textos diferentes

A regra de botão pede o mesmo texto em qualquer lugar onde a ação aparece.

| # | Hoje | Proposta |
|---|---|---|
| 10 | "Guardar em longo prazo" (KeepButton) × "Guardar no longo prazo" (FAQ, telas) | "Guardar no longo prazo" em todos |
| 11 | "Gerir Espaço" (Sidebar) × "Liberar Espaço" e "Liberar espaço" (Armazenamento, Configurações) — a mesma ação, que abre o mesmo modal | **"Gerenciar espaço" em todos** (a definição proíbe "Liberar espaço" e dá esse exemplo). ❓ Isso revoga o caso "Liberar × Gerir" da Regra 5. "Comprar Espaço" e "Comprar espaço" viram "Comprar espaço" (caixa). |
| 12 | "Exportar dados" (botão) × "Exportar meus dados" (título) | Título "Exportar meus dados", botão "Exportar dados". Se preferir um texto só: "Exportar dados" |
| 13 | "resgate" como estado ou notificação: "Arquivo pronto para resgate", "…terminar o resgate" | "resgate" só na ação ("solicite o resgate", que o FAQ já explica com o prazo de até 8h). Notificação: **"Arquivo de volta ao acesso rápido"** e "Avisar quando um arquivo guardado voltar para o acesso rápido." "Recuperação em andamento" e "Recuperação pendente" ficam como estão. |
| 14 | "Modo Livre" (selo do canvas) × "Modo livre" (card de método) | "Modo livre" |
| 15 | "Bem-vindo ao Kandrive!" (Home) × "Bem-vindo ao KanDrive" (onboarding) × "©2026 KanDrive" | "Kandrive" (grafia do logo) e "Boas-vindas ao Kandrive!", que não marca gênero |
| 16 | "Upload de arquivo" e "Upload de pasta" (menu Adicionar) × "Pausar envio" (UploadPopover) | "Enviar arquivo" e "Enviar pasta" (verbo, em português, casando com "envio") |

## C. Maiúsculas no meio da frase

Em português, só a primeira palavra leva maiúscula. Os termos aprovados da Regra 5 ficam como estão.

| # | Hoje | Proposta |
|---|---|---|
| 17 | Descartar Mudanças · Salvar Mudanças · Adicionar Regra | Descartar mudanças · Salvar mudanças · Adicionar regra |
| 18 | + Nova Etiqueta · Adicionar Nome | + Nova etiqueta · Adicionar nome |
| 19 | Salvar Template · Revisar Organização | Salvar template · Revisar organização |
| 20 | Perguntas Frequentes · Links Rápidos · Tamanho do Arquivo | Perguntas frequentes · Links rápidos · Tamanho do arquivo |

## D. Tom e clareza

| # | Onde | Hoje | Proposta | Por quê |
|---|---|---|---|---|
| 21 | MobileSuccess (Guardar) | "Prontinho, arquivos guardados" | "Prontinho — seus arquivos estão guardados no longo prazo." | Padrão fixo: "Prontinho — " + resultado concreto. |
| 22 | MobileSuccess (Organizar) | "Organização concluída" | "Prontinho — seus arquivos estão organizados." | Mesmo padrão. O nome do arquivo continua na linha com ✓. |
| 23 | Modo livre | Adicionar nodo | Adicionar nó | "Nodo" é espanhol/português europeu. |
| 24 | Modo livre (operação) | Interssecção | Interseção | Erro de grafia. |
| 25 | Revisão da organização | "Taxonomia Sugerida:" | "Estrutura sugerida:" | "Taxonomia" é jargão. Muda também "Revise a taxonomia sugerida…". |
| 26 | Guardar no longo prazo (desktop) | "Revise a taxonomia sugerida antes de aplicar as mudanças." | "Revise os arquivos antes de guardar." | A tela é de guardar, não de organizar. O texto parece copiado da revisão de organização. |
| 27 | Selo da revisão | Incongruente | Fora do padrão | "Incongruente" é formal demais para o tom casual. |
| 28 | Plano | Melhorar · Rebaixar · "Confirmar upgrade para Kandrive Pro" · "Confirmar upgrade para Pro · $12/mês" | Assinar Pro · Mudar para Free · "Confirmar assinatura do Kandrive Pro" · "Assinar Pro · $12/mês" | Botão descreve o estado seguinte. "Rebaixar" soa como punição. Sem inglês ("upgrade"). |
| 29 | Plano (Stripe) | "Atualize o método de pagamento, visualize ordens de pagamento, ou cancele no portal da Stripe" | "Troque o cartão, veja suas faturas ou cancele no portal da Stripe." | "Ordens de pagamento" não é o termo usual. Sem vírgula antes de "ou". Modo sóbrio mantido. |
| 30 | Pagamento | "Stripe Elements protege os dados do cartão. O Kandrive não armazena o número completo." | "Os dados do cartão ficam protegidos pela Stripe. O Kandrive não guarda o número completo." | "Stripe Elements" é nome de biblioteca. |
| 31 | Home vazia | "Arraste os arquivos que deseja armazenar" | "Arraste seus arquivos para cá" | Mais direto e casual. |

## E. Notas internas aparecendo para o usuário

Isto não é ajuste de tom: são avisos de desenvolvimento dentro da interface. Proposta: tirar da tela e deixar só no Docs.

| # | Onde | Texto |
|---|---|---|
| 32 | Configurações › Armazenamento | "Estimativa — uso por tier ainda não disponível no backend." |
| 33 | Configurações | "Painel ainda não tem tela Figma confirmada para "Organização padrão"." |
| 34 | Liberar Espaço › Duplicados | "Detecção de duplicados ainda não existe de verdade, os grupos abaixo são exemplos ilustrativos." |

## F. Achados novos com a definição

| # | Onde | Hoje | Proposta | Regra da definição |
|---|---|---|---|---|
| 35 | StorageStatus (aba de escopo) | Global | Total | "Global" é proibido: usar "Total". O filtro já diz "Filtrar no Total". |
| 36 | StorageStatus (título) | "Armazenamento usado: X de Y (AC+AL)" | sem "(AC+AL)" | Siglas internas são proibidas. |
| 37 | InfoPopover | "AC: Armazenamento corrente" · "AL: Armazenamento de longo prazo" | "Acesso rápido" · "Longo prazo" | Siglas e "corrente" são proibidos. |
| 38 | StorageStatus (abas) | Acesso Rápido · Longo Prazo | Acesso rápido · Longo prazo | Grafia da terminologia aceita. |
| 39 | ContextHeader | padrão "X itens selecionado"; Home "N itens selecionado" | sem placeholder; "1 item selecionado" / "N itens selecionados" (já é assim em Guardados) | Nunca deixar placeholder. O plural também estava errado. |
| 40 | RecoveryPending | "…disponível para download." | "…disponível para baixar." | Sem inglês. |
| 41 | FAQ | Links Rápidos | Atalhos | Sem inglês (e resolve a maiúscula do item 20). |
| 42 | Botões que abrem mais etapas | "Guardar no longo prazo" (KeepButton), "Excluir conta", "Comprar espaço" | com reticências: "Guardar no longo prazo…", "Excluir conta…", "Comprar espaço…" | Reticências quando há mais etapas. ❓ Aplico só onde o clique abre um fluxo, e não em "Organizar" do Header, que é navegação. |
| 43 | Liberar espaço › Duplicados e Grandes | "Excluir cópias" e "Excluir" agem direto | Confirmação antes de excluir, separada das outras ações | Ação destrutiva pede confirmação explícita. Isso é mudança de comportamento, não só de texto: sem node no Figma, o diálogo teria de ser montado com peças que já existem. |

## Aplicação

Depois da aprovação:
1. Troco no código e atualizo testes, Docs e a seção Terminologia de cada página.
2. Troco no Figma V0.2.1: textos dos componentes, com propagação para as instâncias, e textos soltos nas telas.
3. Registro os termos novos na [[Regra 5 - Terminologia]].
