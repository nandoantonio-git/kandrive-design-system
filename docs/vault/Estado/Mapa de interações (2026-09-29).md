---
tags: [estado, plano]
---

# Mapa de interações e lacunas (2026-09-29)

Relatório pedido pelo usuário depois que ele atualizou as interações entre as telas da 📐Pages. **Só mapeia, não corrige nada.** Fonte: leitura das reações de protótipo de todas as telas da seção `Pages - White` (92) e `Pages - Dark` (91), no Figma `2g7udqxWbGA8F9Or7PGNg3`. Só entram cliques (`ON_CLICK`, `MOUSE_UP`, `MOUSE_DOWN`, `ON_DRAG`, `ON_PRESS`, tempo, teclado); hover é acabamento de estado e não conta.

## Em números

| | Telas claras | Telas escuras |
|---|---|---|
| Telas lidas | 92 | 91 (falta a `PagePickerButton` de referência, que já foi para a Design System) |
| Ligações de clique para outra **tela desta página** | 66 | 16 (as escuras apontam para as **claras**, ver G5) |
| Ligações para telas do **🏖️SandBox** (protótipo antigo) | **196** | **201** |
| Ligações para a **✨Design System** (troca de estado: menu aberto, sidebar recolhida etc.) | 75 | 68 |
| Reações de clique sem destino | 18 | 6 |
| Destinos que não existem mais | **0** | **0** |

Leitura: nenhuma ligação está quebrada, mas **quase tudo o que o cabeçalho e a barra lateral fazem ainda leva ao protótipo antigo do SandBox**, não às telas atuais. Só o miolo de cada jornada está costurado nas telas novas.

## Jornadas (Desktop, tema claro) — o que existe de fato

| Jornada | Passo | Origem → destino | Situação |
|---|---|---|---|
| **A** Entrar | Login | `Entrar` → Home/Grid/Desktop | ✅ (Tablet e Mobile sem nenhuma ligação, G3) |
| **B** Início | Grade ↔ Lista ↔ Colunas | `Lista` → Home/List; `Colunas` → Home/ColumnsDetails; `Ícones` → Home/Grid (nas 3 telas de Home) | ✅ só nas telas de Home; nas demais, o toggle leva ao SandBox (G1) |
| | Agrupar / Etiquetar | Home/Grid: Agrupar e Etiquetar abrem o estado `Expanded` | ⚠️ Etiquetar abre em todas as telas com o cabeçalho; **Agrupar só abre em Home/Grid** (nas outras está sem reação) |
| | Selecionar arquivo | Lista: linha → Home/ListSelected; Colunas: `Arquivo 2/3` → item do SandBox | ⚠️ Grade não seleciona (só Colunas e Lista) |
| | Ver detalhes | ColumnsDetails: `Button` abre o `PreviewPane` (estado) | ✅ |
| **C** Organizar | Escolher método | Home → `Organizar` → Organize/ChooseMethod; cartões DATA/PROJETO/TIPO/MODO LIVRE → 4 estados **do SandBox** (`Organização - Selection …`); `Continuar…` → DropZone; `Cancelar`/✕ → Home | ⚠️ o miolo funciona, mas os cartões de método selecionam telas do SandBox |
| | Arrastar | DropZone: `Fev -2000` (`ON_DRAG`) → DropZone/**Filled** → `Continuar…` → Review → `Concluir` → Saved | ✅ é o fluxo mais completo. `Cancelar` na Review só fecha (`CLOSE`) |
| | Concluído | Saved: ✕ do aviso troca o estado do popover | ⚠️ `Continuar` e o resto de Saved sem reação; `Frame 53` e um `IconButton` são reações **sem destino** |
| **D** Guardar no longo prazo | Iniciar | Home/Grid: `Guardar` → LongTermStorage/Intro | ⚠️ `Guardar` só está ligado em Home/Grid (nas outras 13 telas com o cabeçalho, sem reação) |
| | Intro → navegador | Intro: `Adicionar arquivos` → ArchiveBrowser | ✅ (o `Continuar` que eu tinha ligado foi substituído pela sua ligação) |
| | Confirmar | ArchiveBrowser: `Adicionar 2 arquivos` → **volta para a Intro** | ⚠️ não termina em nenhuma tela de resultado; e não existe "Guardado" no Desktop nem no Tablet (só `LongTermStorage/Stored/Mobile`, sem entrada) |
| **E** Gerir espaço | Sidebar | `Gerir espaço` → **Function Storage Status - Global (SandBox)** | ❌ deveria ir para Storage/Total/Desktop |
| | Status | Total ↔ Acesso rápido ↔ Longo prazo (Desktop): `MOUSE_DOWN` liga as 3 telas; `Liberar espaço` → Storage/ManageSpace; `Comprar espaço` → Payment/PlanExpanded (só em Total) | ✅ em Total/Current/LongTerm; ⚠️ em LimitReached, as abas apontam para o SandBox e `Liberar`/`Comprar` estão sem reação |
| | Modal | ManageSpace: `Cancelar`, `Excluir cópias`, `Excluir`, `Selecionar todos`, `Desfazer seleção` | ❌ nenhum botão do modal tem reação |

## Lacunas, em ordem de impacto

**G1 — O cabeçalho e a barra lateral ainda levam ao SandBox (196 ligações).** Em quase todas as telas Desktop e Tablet: logo → `Home-Grid Mode`; `Organizar` → `Organização` (só Home/Grid, GridNoResults e FirstUpload já levam a Organize/ChooseMethod); botão `􀈕` → `Home-Grid Mode`; `Ícones`/`Lista`/`Colunas` → `Home-Grid/List/Columns Mode`; `Group 8` → `Home-Grid Mode-Selected_Item_3`. O botão de configurações e o de ajuda (→ Settings/Account e → FAQ) só existem em Home/Grid.

**G2 — A sidebar está com os destinos errados.** `Gerir espaço` e `Comprar espaço` (61 telas) levam a `Function Storage Status - Global` do SandBox. Pelo mapa de 2026-09-29: `Gerir espaço` → Storage/Total/Desktop, `Comprar espaço` → Payment/PlanExpanded/Desktop. Na página de status, `Comprar espaço` só está ligado em Total; em LimitReached, Current e LongTerm, o botão não faz nada.

**G3 — Telas sem saída ou sem entrada.**
- **Payment** (Desktop, Tablet, Mobile ×2 estados): nenhuma ligação. Não há como sair nem confirmar.
- **Login Tablet e Mobile**: sem ligação (só o Desktop entra na Home).
- **Onboarding (4 telas) e Mobile de Configurações** (Conta, Assinatura, Notificações, Aparência, Privacidade, Idioma, Excluir conta): botões `Começar`, `Continuar`, `Ir para a Home` e os chips de aba, todos sem reação.
- **Storage/Total/Mobile, Storage/LimitReached/Mobile**, LongTermStorage Mobile (`SelectFiles`, `SelectFilesSelected`, `Stored`, `RecoveryPending`), Home Mobile (`NetworkError`, `SearchNoResults`, `FirstUpload`, `Loading`): sem reação em `Comprar espaço`, `Tentar novamente`, `Limpar busca`, `Adicionar arquivos`. A `MobileTabBar` (`Início`, `Organizar`, `Guardar`) não está ligada em nenhuma tela.
- **FAQ** (Desktop, Tablet, Mobile): só recolhe a sidebar. `Expandir`/`Recolher` não ligam `Expanded` ↔ `Collapsed`, e `Falar com o suporte` não faz nada.
- **Settings/*/Desktop** exceto Conta: sem menu de navegação lateral ligado (as ligações entre seções existem só em Settings/Account). `Salvar preferências`, `Excluir conta`, `Editar plano`, `Atualizar senha` e os `Liberar/Comprar espaço` de Assinatura: sem reação.

**G4 — Tablet: as jornadas de Organizar e Guardar só têm o cabeçalho.** `Organize/ChooseMethod|DropZone|Review|Saved/Tablet` e `LongTermStorage/Intro|ArchiveBrowser/Tablet`: nenhuma ligação de miolo (cartões de método, `Continuar`, `Cancelar`, `Concluir`). `Organize/ChooseMethodModal/Tablet` também está sem reação nenhuma.

**G5 — Telas escuras.** 24 telas escuras têm menos ligações do que a clara equivalente (por exemplo Auth/Login/Desktop · Dark: 0 contra 1; Settings/Account · Dark: 1 contra 7; Home/Grid · Dark: 10 contra 19). Além disso, 16 ligações das telas escuras **apontam para a tela clara** (a pessoa cairia no tema claro no meio do fluxo). As telas `· Dark (Light palette)` (Onboarding, ReviewDone, Stored) não têm nenhuma.

**G6 — Semântica.**
- `Adicionar` (sidebar) leva a Home/FirstUpload/Desktop; só em FirstUpload ele rola até o menu. O comportamento esperado é abrir o menu `Nova pasta / Enviar arquivo / Enviar pasta` (a variante `Sidebar` do `DropdownMenu`).
- `Lista` e `Colunas` têm **duas reações**: uma `MOUSE_DOWN` sem destino e uma `MOUSE_UP` que leva à tela. A sem destino é lixo e não faz nada.
- Reações sem destino também em Organize/Saved/Desktop (`Frame 53`, `IconButton`).
- Não existe tela para o menu **Resgatar** de Guardados (a variante `Menu=Guardados` só existe no `organism/DropdownMenu`), nem tela "Guardados" navegável no Desktop.
- Não existe tela de resultado do resgate (o usuário pede e "o arquivo chega por e-mail em até 8h"): só `LongTermStorage/RecoveryPending/Mobile`, sem entrada.
- Confirmação antes de excluir (item 43 da revisão de UX writing) continua sem tela; ManageSpace tem o modal, mas os botões `Excluir` e `Excluir cópias` não têm reação.

**G7 — Elementos sem clique em quase todas as telas de Home/Organizar/Storage:** busca (`SearchInput`), tags de filtro `Acesso rápido` / `Longo prazo`, `Breadcrumb` (`Home`), arquivos e pastas (abrir/selecionar), `Guardar` (fora de Home/Grid), `Agrupar` (fora de Home/Grid), cabeçalhos de coluna `Proprietário`/`Tamanho do arquivo` (ordenação na Lista).

## O que já funciona (para não perder)

Entrar → Home; Grade/Lista/Colunas nas 3 telas de Home; Home → Organizar (Desktop) → ChooseMethod → DropZone → arrastar → Filled → Review → Saved; Home → Guardar → Intro → ArchiveBrowser; Storage Total ↔ Acesso rápido ↔ Longo prazo; `Liberar espaço` → ManageSpace; Etiquetar abre em todas as telas com cabeçalho; Agrupar abre em Home/Grid; Mobile: Organize/Review → ReviewDone; seleção de arquivo em Lista/Colunas; `PreviewPane` em ColumnsDetails.

## Sugestão de fechamento (nada disto foi feito)

1. **Trocar os destinos do chrome** (G1, G2): uma varredura só, apontando logo, `Organizar`, `Guardar`, `Ícones/Lista/Colunas`, `Gerir espaço`, `Comprar espaço` e `Adicionar` para as telas/estados atuais, nas 92 + 91 telas. É o maior ganho e o mais mecânico.
2. **Liberar as telas sem saída** (G3): Payment (sair e confirmar), Login Tablet/Mobile, Onboarding, Settings, FAQ.
3. **Completar Tablet e Mobile** (G4) usando as mesmas ligações do Desktop.
4. **Escuras** (G5): trocar todo destino claro por seu par escuro.
5. **Telas novas que faltam** (G6): menu Resgatar navegável, Guardados, resultado do resgate, confirmação de exclusão. Depende de decisão de design (não inventar).

Ver [[Fechamento da entrega (2026-09-28)]] e [[Regra 5 - Terminologia]].
