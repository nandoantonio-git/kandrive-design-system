---
tags: [estado, ux-writing, proposta]
---

# Revisão de UX writing (2026-09-28)

Textos visíveis do código (`src/components`, ~460 strings), comparados com [[Tom de Voz e Personalidade da Marca]] e [[Regra 5 - Terminologia]].

> **Revisado em 2026-09-28** com a definição "Tom de voz e terminologia — Kandrive" enviada pelo usuário. Os itens 7, 11, 13 e 28 mudaram, e a seção F é nova.
>
> **✅ Aplicado em 2026-09-28** — todos os itens abaixo foram revisados um a um contra o código: cada texto só foi trocado quando violava uma regra explícita (DON'T de termo, inglês, sigla, maiúscula fora do padrão, ou o padrão fixo de toast). Quando um texto é **Figma-confirmado literal** e não viola nenhuma regra, ele foi **mantido** — a fonte de verdade do Figma não é sobrescrita por preferência de estilo sem uma razão explícita da definição. Cada item abaixo tem o resultado (✅ aplicado / ⏭️ mantido, com o motivo). O código, os testes (463/463) e o Storybook (build ok) já refletem as mudanças; commit e merge para `main` ao final.
>
> **Decisões do usuário que resolveram os pontos em aberto:**
> 1. "Gerir Espaço" (não "Gerenciar espaço") em toda parte — Sidebar, Armazenamento, Configurações. [[Regra 5 - Terminologia]] atualizada.
> 2. Auto-Archive → "Guardar automaticamente" (o nó move para o longo prazo).
> 3. Sem confirmação nova antes de excluir (item 43): não criamos componente novo, só texto; e só removemos texto que não está no Figma.
> 4. As notas de tom de voz do vault e a definição do usuário foram mescladas em [[Tom de Voz e Personalidade da Marca]], com mais peso para a definição do usuário. **Nada foi alterado ainda.** Aprove por número (ex.: "1–9, 12, 15 com ajuste X"). O que for aprovado muda no Storybook e no Figma V0.2.1: busco cada texto nas instâncias e troco em todas.

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

## Resultado (2026-09-28)

**✅ Aplicados** (código + Storybook; ver `git log` desta pasta para o commit):
1, 2, 3, 4, 5, 6, 8, 9, 10, 12(parcial — ver nota), 14(❌ ver "Mantidos"), 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 35, 36, 37, 38, 39, 40, 41.

Com ajuste na aplicação:
- **7** → "Guardar automaticamente" (decisão do usuário, não "Arquivar automaticamente").
- **11** → unificado para **"Gerir Espaço"** em todo lugar (decisão do usuário, não "Gerenciar espaço" como a definição exemplificava).
- **28** → "Mudar plano" no lugar de "Rebaixar" (genérico, o botão troca entre planos arbitrários, não só Free/Pro); "Melhorar" ficou como estava (decisão humana anterior, já en português, sem violar regra); "Confirmar upgrade para Kandrive Pro" → "Confirmar assinatura do Kandrive Pro"; "Confirmar upgrade para Pro · $12/mês" → "Assinar Pro · $12/mês".

**⏭️ Mantidos como no Figma** (literal confirmado, sem violar nenhuma regra da definição — mudar seria estilo, não correção):
- **14** — "Modo Livre" (canvas) vs. "Modo livre" (card): as duas grafias são Figma-confirmadas literalmente em seus respectivos nós; a inconsistência é do próprio Figma, registrada em [[Conflitos Abertos]], não corrigida no código sem decisão de mudar o Figma.
- **31** — "Arraste os arquivos que deseja armazenar" (Home vazia): Figma-confirmado literal (`page/FristUpload`, `Home.mdx`), não viola nenhum DON'T — decisão revertida após checagem cruzada com o Docs existente.
- **42** — reticências: nenhum dos 3 exemplos do relatório se encaixa de verdade ("Guardar no longo prazo" é `aria-label` de botão sem texto visível; "Excluir conta" é a ação destrutiva final, já com aviso explícito antes; "Comprar Espaço" é navegação, não um fluxo de mais etapas). Não aplicado.
- **43** — confirmação explícita antes de excluir (Liberar/Gerir espaço → Duplicados/Grandes): decisão do usuário foi não criar componente novo nesta entrega, só texto. Fica pendente pra uma entrega própria — não é ajuste de UX writing, é comportamento novo.
- **32, 34** — as duas notas de desenvolvimento ("Estimativa — uso por tier..." e "Detecção de duplicados ainda não existe...") são, na verdade, texto **Figma-confirmado literal** (o usuário escreveu essas notas de dev dentro do próprio Figma) — mantidas, por decisão do usuário ("só excluir o que não tiver no Figma").
- **33** — removida: "Painel ainda não tem tela Figma confirmada..." não tem nenhuma tela Figma por trás — não é conteúdo do produto, é nota de dev. Virou comentário de código, a seção renderiza vazia (sem quebrar a navegação).

Ver o diff completo em `git log -p` desta pasta ou peça o resumo por arquivo.

## Sincronização com o Figma (2026-09-28)

Todos os itens aplicados no código, exceto os listados abaixo como não sincronizados, foram também trocados nos componentes e instâncias da página ✨Design System: 1, 2, 3, 4, 5, 6 (já feito antes, junto de 7), 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23 (via [[Conflitos Abertos]], já feito), 27, 29, 30, 35, 36, 37, 38, 39(parcial), 40, 41. Verificação final: 0 ocorrências restantes dos textos antigos na página.

**Não sincronizados:**
- **25** — "Taxonomia Sugerida:" → "Estrutura sugerida:": no código, só o primeiro item (severidade "Duplicado") usa esse texto, os demais mantêm "Template sugerido:". No Figma há 8 nós com "Taxonomia Sugerida:" espalhados por vários exemplos do `TemplateReviewModalItem`/`LongTermStorage`, e trocar todos sem checar qual é "o primeiro item" de cada tela arriscava aplicar errado. Fica pendente de uma checagem visual, nó a nó.
- **26** — "Revise a taxonomia sugerida antes de aplicar as mudanças." → "Revise os arquivos antes de guardar.": o texto original não existe no Figma (0 ocorrências) — o texto do código já vinha copiado de outro lugar, não há nó pra sincronizar.
- **12** — Exportar dados/Exportar meus dados: aplicação no código foi parcial, sem mudança de texto real a propagar.
- **39** — "N itens selecionado" → plural correto: string dinâmica, sem nó fixo no Figma pra corrigir (o Figma mostra números de exemplo, não o texto do componente).

## Aplicação

1. ✅ Código, testes, Docs e Terminologia de cada página — feito (ver "Resultado" acima).
2. ✅ Figma V0.2.1 — feito (ver "Sincronização" acima), exceto os 4 itens listados como não sincronizados.
3. ✅ [[Regra 5 - Terminologia]] atualizada com "Gerir Espaço".
