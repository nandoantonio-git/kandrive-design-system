---
tags: [estado, ux-writing, proposta]
---

# Revisão de UX writing (2026-09-28)

Textos visíveis do código (`src/components`, ~460 strings), comparados com [[Tom de Voz e Personalidade da Marca]] e [[Regra 5 - Terminologia]]. **Nada foi alterado ainda.** Aprove por número (ex.: "1–9, 12, 15 com ajuste X"). O que for aprovado muda no Storybook e no Figma V0.2.1: busco cada texto nas instâncias e troco em todas.

**Ficaram de fora (validados):**
- Lista aprovada da Regra 5: Acesso rápido, Longo prazo, Guardar, Arquivar, Pronto para guardar, Ver duplicados, "Buscar arquivos, pastas ou templates", Gerir Espaço, Liberar Espaço, Comprar Espaço, Editar plano, Organizar.
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
| 7 | Modo livre (nó) | Auto-Archive · selo ACTIVE | Guardar automático · selo ATIVO | O nó move o resultado para o longo prazo, então é "Guardar" (Regra 5: Guardar ≠ Arquivar). |
| 8 | Sidebar (nome acessível) | Colapsar sidebar · Expandir sidebar | Recolher barra lateral · Expandir barra lateral | "Colapsar" e "sidebar" são jargão. |
| 9 | Organização / modal de método | "…correlacionados no seu workspace." | "Escolha como seus arquivos vão ficar organizados." | "Workspace" e "correlacionados" soam técnicos e formais. |

## B. Mesma ação, textos diferentes

A regra de botão pede o mesmo texto em qualquer lugar onde a ação aparece.

| # | Hoje | Proposta |
|---|---|---|
| 10 | "Guardar em longo prazo" (KeepButton) × "Guardar no longo prazo" (FAQ, telas) | "Guardar no longo prazo" em todos |
| 11 | "Comprar espaço" e "Liberar espaço" (Configurações, página de Armazenamento) × "Comprar Espaço" e "Liberar Espaço" (Regra 5) | Usar a grafia da Regra 5 em todos |
| 12 | "Exportar dados" (botão) × "Exportar meus dados" (título) | Título "Exportar meus dados", botão "Exportar dados". Se preferir um texto só: "Exportar dados" |
| 13 | "Recuperação em andamento" e "Recuperação pendente" × "resgate" ("Arquivo pronto para resgate", FAQ "solicite o resgate") | "Resgate em andamento" e "Resgate pendente" |
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
| 28 | Plano (botão) | Melhorar · Rebaixar | Fazer upgrade · Mudar para Free | Botão descreve o estado seguinte. "Rebaixar" soa como punição. |
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

## Aplicação

Depois da aprovação:
1. Troco no código e atualizo testes, Docs e a seção Terminologia de cada página.
2. Troco no Figma V0.2.1: textos dos componentes, com propagação para as instâncias, e textos soltos nas telas.
3. Registro os termos novos na [[Regra 5 - Terminologia]].
