---
tags: [regra, travada]
---

# Regra 5 — Terminologia

Terminologia é **sensível ao contexto** — o mesmo conceito pode ter termos diferentes aprovados dependendo de onde aparece na UI.

## Lista aprovada

"Acesso rápido" · "Longo prazo" · "Guardar" · "Arquivar" · "Pronto para guardar" · "Ver duplicados" · "Buscar arquivos, pastas ou templates" · **"Gerir Espaço"** (qualquer contexto — Sidebar, Armazenamento, Configurações) · **"Comprar Espaço"** (`organism/storage-sidebar` e `molecule/StorageStatus`, botão de upgrade de plano) · **"Editar plano"** (Configurações de Plano, `organism/planSelection`) · **"Organizar"** (`organism/Header`, `page="navbar"`, fluxo ao vivo de organização)

> ✅ **Unificado em 2026-09-28** (revisão de UX writing, decisão do usuário): antes o mesmo modal (`organism/cleanSpaceStorage`) tinha 2 gatilhos com nome diferente por contexto — "Gerir Espaço" na Sidebar, "Liberar Espaço" em Armazenamento e Configurações. A definição de tom de voz e terminologia entregue pelo usuário proíbe "Liberar espaço" explicitamente ("usar Gerenciar espaço" como exemplo de mesmo texto em toda tela); a decisão do usuário foi generalizar para **"Gerir Espaço"** em todo lugar, não "Gerenciar espaço". Isso revoga a seção "O caso 'Liberar Espaço' vs. 'Gerir Espaço'" abaixo — mantida só como histórico.

> ⚠️ **Gap de cobertura, não termo proibido** — "Comprar Espaço" é texto real confirmado via `get_design_context` no nó `1421:19167` (`organism/storage-sidebar`, screenshot 2026-08-16, descrição Figma verbatim: *"botoes para página de gerir espaço ou para dar upgrade no plano de uso"*), mas não constava formalmente na lista aprovada nem na proibida — só registrado como gap de baixa urgência em `making-of/conflicts.md`. Adicionado aqui em 2026-08-16 por já estar em uso real e Figma-confirmado, não é uma decisão nova de produto. Mesmo critério aplicado a "Organizar" em 2026-08-23: texto literal Figma-confirmado no nó `1421:19918` (`organism/Header`), em uso desde a implementação original do Header, só nunca tinha sido formalmente adicionado à lista.

## Proibida como texto visível

"freezer" · "congelado" · "frio" · "camada" (rótulo de UI) · "elegível" (rótulo de UI) · "Limpar Espaço" · "Liberar Espaço" (revogado em 2026-09-28, ver acima) · "CTA" · "Global" (rótulo de UI, usar "Total") · siglas internas (ex. "AC+AL", "AC:"/"AL:") · "Gerenciar espaço" (não é o termo escolhido — usar "Gerir Espaço", ver acima)

## Histórico — "Liberar Espaço" vs. "Gerir Espaço" (revogado 2026-09-28)

> Registro histórico. Desde 2026-09-28 os dois gatilhos usam "Gerir Espaço" — ver a nota no topo desta página.

Mesmo modal (`organism/cleanSpaceStorage`, node `1439:16908`), tinha 2 gatilhos com termo diferente por contexto:
- Sidebar (painel persistente) → "Gerir Espaço"
- Página de Armazenamento (`molecule/StorageStatus`, `scope="global"`) → "Liberar Espaço"

Configurações de Plano **não** tem gatilho pro mesmo modal — ver seção de premissa corrigida abaixo.

"Limpar Espaço" (título antigo do node no Figma) está proibido — já foi corrigido no Figma pelo usuário em 2026-08-10.

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
