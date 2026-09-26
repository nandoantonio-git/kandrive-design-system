---
tags: [referência]
---

# Tom de Voz e Personalidade da Marca

> Fonte: projeto Claude "Kandrive" (`brand-persona-tom-de-voz-kandrive.md`, `teoria-comunicacao-ux-writing.md`, `revisao-copy-4-telas-kandrive.md`, `desafio1-atributos-arquetipo-posicionamento-kandrive.md`) — **não** vem de AGENTS.md nem do Figma, por isso não tem tag `regra, travada` como as Regras 1–11. É decisão de marca validada pelo Nando, trazida pra cá em 2026-09-16 porque o vault documentava terminologia ([[Regra 5 - Terminologia]] — *qual* palavra usar) mas nada sobre tom de voz — *como* dizer, com que personalidade. Ver [[Glossário]] pra terminologia; esta nota é o complemento de registro/tom.

## Personagem — Kan

Canguru guardião, mascote da marca. O bolso do canguru é a metáfora do produto: lugar seguro onde se guarda algo por um bom tempo, sempre à mão pra recuperar depois — e é a origem do próprio nome "Kan".

**Aparece em:** onboarding, estados vazios, confirmações de sucesso, mensagens de incentivo — momentos "leves".
**Não aparece em:** erro, segurança, exclusão permanente, contexto jurídico — esses falam na voz da marca sem personagem, em modo sóbrio (ver abaixo).

## Arquétipo — Inocente (Idealista no BaKKa)

Roda de Mark & Pearson: **Inocente**, quadrante "Busca Espiritual", motivação "Segurança". Sistema BaKKa (The Ugly Lab): **Idealista** (entre Regularidade e Coletividade, puxando pra Coletividade). Justificativa completa em 3 camadas (geometria do octógono, comparação carta-a-carta, correspondência textual com a carta Idealista) no doc fonte — não repetida aqui.

> Nota: versões anteriores da documentação de marca usavam o rótulo informal "Guardião/Cuidador" (e uma tentativa formal descartada, "Prestativo"). Inocente é a leitura oficial atual — se achar "Guardião/Cuidador" ou "Prestativo" em material antigo, está desatualizado.

**Traços primários:** acolhedor, confiável, entusiasmado, direto.
**Traços secundários:** encorajador, leve, competente.
**Nunca é:** debochado, irônico, sarcástico, frio, burocrático.

## 4 dimensões do tom de voz

| Dimensão | Posição |
|---|---|
| Formal ↔ **Casual** | Predominantemente casual — nunca a ponto de parecer descuidado |
| Sério ↔ **Engraçado** | Leve inclinação divertida, com moderação — nunca vazio quando o assunto é o arquivo do usuário |
| **Respeitoso** ↔ Irreverente | Fortemente respeitoso — sem ironia, sem deboche, sem piada sobre perda de arquivo (linha vermelha) |
| Comum do dia a dia ↔ **Entusiasmado** | Fortemente entusiasmado — registro Duolingo, sempre ancorado numa conquista real do usuário |

## Tom padrão × modo sóbrio

**Tom padrão** (casual + entusiasmado, Kan pode aparecer): onboarding, navegação, organização do acervo, confirmações de sucesso, estados vazios, notificações de progresso.

**Modo sóbrio** (direto, sério, zero humor, zero personagem) — gatilho é o *contexto da tela*, não a persona:
- erros e falhas
- exclusão permanente / ações irreversíveis
- segurança, sigilo, LGPD, controle de acesso
- pagamento e cobrança
- conteúdo jurídico/contratual

## Regras de copy de botão

Máx. 4 palavras · sem artigo · descreve o **estado subsequente** (não o atual) · verbo para ação / adjetivo para mudança de estado · reticências quando há mais etapas · mesmo texto em qualquer contexto onde a mesma ação aparece (ex.: "Guardar arquivos" idêntico em todo lugar).

## Padrão fixo — toast de sucesso

Sempre abre com **"Prontinho — "** seguido do resultado concreto da ação, nunca do nome da ação.

| Contexto | Tom padrão | Modo sóbrio |
|---|---|---|
| Botão de ação principal | *Guardar arquivos* | *Guardar arquivos* |
| Sucesso (Guardar) | *Prontinho — seus arquivos estão guardados no longo prazo.* | — |
| Sucesso (Organizar) | *Prontinho — seus arquivos estão organizados por data.* | — |
| Estado vazio | *Nada organizado por aqui ainda. Bora começar?* | — |
| Erro de upload | — | *O envio falhou. Tente novamente.* |
| Exclusão permanente | — | *Essa ação não pode ser desfeita. Confirmar exclusão?* |
| Retenção/LGPD | — | *Estes arquivos seguem a política de retenção configurada para esta conta.* |

## 🧩 Verificação pendente — não Figma/código-confirmado

Esta nota descreve a **decisão de marca**, não o estado real do código — diferente do resto do vault, que cita `get_design_context`/arquivo-fonte pra cada afirmação (ver [[Regra 9 - Figma-confirmado vs Inferido]]). Sem acesso ao repo do produto nesta sessão (só a pasta do vault estava conectada), não dá pra confirmar se os textos acima batem com o que está implementado hoje. Itens específicos já identificados como possível divergência em `revisao-copy-4-telas-kandrive.md` e que vale conferir no código quando houver acesso:
- Placeholder de busca — termo aprovado é "Buscar arquivos, pastas ou templates"; [[Conflitos Abertos]] já registra que o Figma fonte ainda tem "Search" (decisão deliberada de tradução, não bug) — confirmar se a UI implementada usa o termo aprovado.
- "Gerenciar Espaço" vs. "Gerir Espaço" — [[Regra 5 - Terminologia]] já resolveu isso por contexto (Sidebar = "Gerir Espaço", Armazenamento = "Liberar Espaço"); só vale re-conferir se alguma tela ainda usa a variação antiga "Gerenciar".
- Toggle de visualização "List"/"Columns" em inglês — termo aprovado seria "Lista"/"Colunas".

## Ver também

- [[Glossário]] — terminologia (qual palavra)
- [[Regra 5 - Terminologia]]
- [[Conflitos Abertos]]
- [[Kandrive Design System]]
