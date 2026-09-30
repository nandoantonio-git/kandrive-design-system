---
tags: [regra, travada]
---

# Regra 5 — Terminologia

Terminologia é **sensível ao contexto** — o mesmo conceito pode ter termos diferentes aprovados dependendo de onde aparece na UI.

## Lista aprovada

"Acesso rápido" · "Longo prazo" · "Guardar" · "Arquivar" · "Pronto para guardar" · ~~"Ver duplicados"~~ (substituído: a decisão final, confirmada pelo usuário em 2026-09-29, é **"Liberar espaço"**, que abre o modal com as seções "Arquivos duplicados" e "Arquivos grandes") · "Buscar arquivos, pastas ou templates" (busca do Header) · "Buscar para guardar" (busca dos modais de Guardar, com a busca do Header desativada) · **"Gerir espaço"** (só na Sidebar; leva à página Status de armazenamento) · **"Liberar espaço"** (só na página Status de armazenamento e em Configurações; abre o modal de duplicados e arquivos grandes) · **"Comprar espaço"** (`organism/storage-sidebar` e `molecule/StorageStatus`, leva sempre ao Pagamento) · **"Editar plano"** (Configurações de Plano, `organism/planSelection`) · **"Organizar"** (`organism/Header`, `page="navbar"`, fluxo ao vivo de organização)

> 🔁 **Decisão de 2026-09-29 (usuário)** — revoga a unificação de 2026-09-28: são **dois botões com duas ações**, não um botão só. Sidebar → **"Gerir espaço"** → página Status de armazenamento (Figma: "botões para página de gerir espaço"). Status de armazenamento (e Configurações) → **"Liberar espaço"** → modal `organism/cleanSpaceStorage` (duplicados e arquivos grandes). **"Comprar espaço"** (em qualquer tela) → Pagamento. Sentence case nos três. "Liberar espaço" passa a ser permitido **só nesse botão e no título do modal** — na definição de tom de voz continua na lista de evitados em qualquer outro uso.

> ⚠️ **Gap de cobertura, não termo proibido** — "Comprar Espaço" é texto real confirmado via `get_design_context` no nó `1421:19167` (`organism/storage-sidebar`, screenshot 2026-08-16, descrição Figma verbatim: *"botoes para página de gerir espaço ou para dar upgrade no plano de uso"*), mas não constava formalmente na lista aprovada nem na proibida — só registrado como gap de baixa urgência em `making-of/conflicts.md`. Adicionado aqui em 2026-08-16 por já estar em uso real e Figma-confirmado, não é uma decisão nova de produto. Mesmo critério aplicado a "Organizar" em 2026-08-23: texto literal Figma-confirmado no nó `1421:19918` (`organism/Header`), em uso desde a implementação original do Header, só nunca tinha sido formalmente adicionado à lista.

## Proibida como texto visível

"freezer" · "congelado" · "frio" · "camada" (rótulo de UI) · "elegível" (rótulo de UI) · "Limpar Espaço" · "CTA" · "Global" (rótulo de UI, usar "Total") · siglas internas (ex. "AC+AL", "AC:"/"AL:") · "Gerenciar espaço" (não é o termo escolhido — usar "Gerir espaço" na Sidebar, ver acima)

## O caso "Gerir espaço" × "Liberar espaço" (vigente desde 2026-09-29)

> Em 2026-09-28 os dois nomes chegaram a ser unificados; no dia seguinte o usuário restabeleceu a separação, agora com ações diferentes (antes eram dois gatilhos do mesmo modal).

- Sidebar (painel persistente) → **"Gerir espaço"** → navega para a página Status de armazenamento
- Página Status de armazenamento (`molecule/StorageStatus`, `scope="global"`) → **"Liberar espaço"** → abre o modal `organism/cleanSpaceStorage` (node `1439:16908`)
- **"Comprar espaço"** → página de Pagamento

Configurações de Plano **não** tem gatilho pro mesmo modal — ver seção de premissa corrigida abaixo.

"Limpar Espaço" (título antigo do node no Figma) está proibido — já foi corrigido no Figma pelo usuário em 2026-08-10.

## Mapa de vocabulário: ação, lugar e camada

Três palavras da mesma família, cada uma com um papel só (decisão de 2026-09-30, auditoria UX A3):

| Papel | Termo | Onde aparece | Como escrever |
| --- | --- | --- | --- |
| Ação | **Guardar** | botão do Header, modal de Guardar, `ContextHeader` | verbo; "Guardar no longo prazo" quando precisa dizer o destino |
| Lugar | **Guardados** | Sidebar, gaveta do Mobile, menu Resgatar, FAQ | substantivo; nome próprio do lugar onde a pessoa abre os arquivos |
| Camada | **Longo prazo** | só no Status de armazenamento (Total, Acesso rápido, Longo prazo) e nas frases que explicam o uso | sempre "longo prazo", em minúscula no meio da frase |

- Frase de ligação, para a ajuda e o modal: "Você guarda, e o arquivo vai para Guardados, no armazenamento de longo prazo."
- "Longo prazo" nunca nomeia um lugar nem um botão. Quem precisa abrir os arquivos vai a **Guardados**.
- Grafia: "Acesso rápido" e "Longo prazo" (só a primeira letra maiúscula). "Longo Prazo" e "Acesso Rápido" não existem mais no Figma nem na interface.

## "Guardar" × "Arquivar" — nunca intercambiáveis

Os dois estão na mesma lista aprovada mas **não são sinônimos**:

- **Guardar** = ação específica de mover arquivos pro longo prazo. Ex. (`src/components/organisms/faq-info-card-collapsed.tsx`, FAQ real do produto): *"Guardar é a ação de mover um arquivo do acesso rápido para o longo prazo."*
- **Arquivar** = pattern geral de organização/agrupamento de arquivos — processo mais amplo, do qual "Guardar" é uma ação específica dentro dele. Mesma fonte, resposta à pergunta *'"Arquivar" e "guardar" são a mesma coisa?'*: *"Não. Arquivar é o processo geral de organizar seus arquivos. Guardar é a ação específica, dentro desse processo, que move arquivos para o longo prazo."*

Essa distinção já está correta no produto (FAQ ao vivo) — o erro era só no [[Glossário]] do vault, que os listava como "idem". Corrigido em 2026-08-16.

## ✅ Premissa corrigida (achado alta urgência, US-025 — resolvido 2026-08-18)

A Regra 5 presumia que a página de Configurações de Plano teria um botão "Liberar Espaço" ligando pro `cleanSpaceStorage`. `get_design_context` no node real (`organism/planSelection`) confirmou que essa página é **só gestão de assinatura/cobrança** — sem nenhum botão/link de armazenamento. Decisão humana (2026-08-18): a ponte real vai na direção contrária — o botão "Comprar Espaço" de `molecule/StorageStatus` (`scope="global"`, em Armazenamento) leva pra Configurações de Plano, não o contrário. Lá, o botão correspondente foi renomeado no Figma pelo usuário, ao vivo, de "Editar pagamento" pra "Editar plano" (Figma-confirmado, node `1454:25054`). Ver [[Conflitos Abertos]] e [[PlanSelection]].

## Ver também

- [[Glossário]]
- [[Tom de Voz e Personalidade da Marca]]
- [[CleanSpaceStorage]]
- [[Conflitos Abertos]]

## O resgate é por e-mail (2026-09-29)

O conteúdo guardado no longo prazo **não** é resgatado dentro da plataforma: o usuário pede, e o arquivo chega por e-mail. Ele não volta para o acesso rápido.

- Fluxo: Guardados → botão direito no arquivo → **Resgatar** (menu `DropdownMenu` `variant="guardados"`, 🧩 pendente de tela no Figma) → o arquivo é enviado por e-mail em até 8h.
- Texto do modal Guardar no longo prazo (Figma, template `SaveLongTermFileStorage`): "Para resgatar, é só solicitar, você o recebe por e-mail e o espaço volta para o seu armazenamento em até 8h."
- "resgate" existe só como ação/prazo. Nunca "volta para o acesso rápido" nem "terminar o resgate". Notificação: "Arquivo enviado por e-mail".

