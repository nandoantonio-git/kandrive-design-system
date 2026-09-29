---
tags: [referência]
---

# Tom de Voz e Personalidade da Marca

> **Atualizado em 2026-09-28**: mesclado com a definição "Tom de voz e terminologia — Kandrive" que o usuário entregou diretamente nesta sessão, que **tem mais peso** que as fontes anteriores quando as duas divergem (decisão do usuário). Origem anterior: projeto Claude "Kandrive" (`brand-persona-tom-de-voz-kandrive.md`, `teoria-comunicacao-ux-writing.md`, `revisao-copy-4-telas-kandrive.md`, `desafio1-atributos-arquetipo-posicionamento-kandrive.md`) — **não** vem de AGENTS.md nem do Figma, por isso não tem tag `regra, travada` como as Regras 1–11. Ver [[Glossário]] pra terminologia; esta nota é o complemento de registro/tom.

## Personagem — Kan

Canguru guardião, mascote da marca. O bolso do canguru é a metáfora do produto: lugar seguro onde se guarda algo por um bom tempo, sempre à mão pra recuperar depois — e é a origem do próprio nome "Kan".

**Aparece em:** onboarding, estados vazios, confirmações de sucesso, mensagens de incentivo — momentos "leves".
**Não aparece em:** erro, segurança, exclusão permanente, contexto jurídico, pagamento — esses falam na voz da marca sem personagem, em modo sóbrio (ver abaixo).

## Arquétipo — Inocente (Idealista no BaKKa)

Roda de Mark & Pearson: **Inocente**, quadrante "Busca Espiritual", motivação "Segurança". Sistema BaKKa (The Ugly Lab): **Idealista** (entre Regularidade e Coletividade, puxando pra Coletividade). Justificativa completa em 3 camadas (geometria do octógono, comparação carta-a-carta, correspondência textual com a carta Idealista) no doc fonte — não repetida aqui.

> Nota: versões anteriores da documentação de marca usavam o rótulo informal "Guardião/Cuidador" (e uma tentativa formal descartada, "Prestativo"). Inocente é a leitura oficial atual — se achar "Guardião/Cuidador" ou "Prestativo" em material antigo, está desatualizado.

**Mensagem da marca:** "Democratizar o direito de guardar para sempre."
**Benefício:** "Te ajudar a guardar o que importa, com tranquilidade."

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
- Conversa como alguém de confiança, não como contrato.
- Celebra conquistas reais do usuário, nunca por nada.
- Humor leve só em micro-momentos.

**Modo sóbrio** (direto, sério, zero humor, zero personagem) — gatilho é o *contexto da tela*, não a persona:
- erros e falhas
- exclusão permanente / ações irreversíveis
- segurança, sigilo, LGPD, controle de acesso
- pagamento e cobrança
- conteúdo jurídico/contratual
- frases curtas, foco em tranquilizar e dizer o que fazer a seguir.

## Regras de copy de botão

Máx. 4 palavras · sem artigo · descreve o **estado subsequente** (não o atual) · verbo para ação / adjetivo para mudança de estado · reticências quando há mais etapas · mesmo texto em qualquer contexto onde a mesma ação aparece (ex.: "Comprar espaço" idêntico em qualquer tela; "Gerir espaço" e "Liberar espaço" são ações diferentes, cada uma com seu texto — ver [[Regra 5 - Terminologia]]).

Outras regras de UI copy da definição do usuário:
- Pirâmide invertida: o mais importante primeiro; frases curtas.
- Prevenir erro antes de reagir: dizer o que a ação faz, se é reversível e por quanto tempo.
- Ação destrutiva: confirmação explícita, separada visualmente das demais.
- Nunca deixar placeholder no texto visível ("X itens", "XX Livre").

## Padrão fixo — toast/mensagem de sucesso

Sempre abre com **"Prontinho — "** seguido do resultado concreto da ação, nunca do nome da ação.

| Contexto | Tom padrão | Modo sóbrio |
|---|---|---|
| Botão de ação principal | *Guardar arquivos* | *Guardar arquivos* |
| Sucesso (Guardar) | *Prontinho — seus arquivos estão guardados no longo prazo.* | — |
| Sucesso (Organizar) | *Prontinho — seus arquivos estão organizados.* | — |
| Estado vazio | *Nada organizado por aqui ainda. Bora começar?* | — |
| Erro de upload | — | *O envio falhou. Tente novamente.* |
| Exclusão permanente | — | *Essa ação não pode ser desfeita. Confirmar exclusão?* |
| Retenção/LGPD | — | *Estes arquivos seguem a política de retenção configurada para esta conta.* |

## Terminologia aceita (da definição do usuário)

Arquivar (= organizar, pattern geral) · Guardar / Guardar no longo prazo / Guardar arquivos (= mover para o longo prazo) · Longo prazo · Acesso rápido · Pronto para guardar · Ver duplicados · Lixeira (30 dias) · "Buscar arquivos, pastas ou templates" · Desfazer organização · Excluir pasta e arquivos · conflito de nome resolvido com sufixo automático "(1)" · "resgate"/"redundância" só como conceito interno — traduzir para o usuário ("solicitar resgate" é aceito na ação, com explicação do prazo).

## DON'Ts — termos (proibidos como texto visível)

Freezer · congelado · frio · quente · corrente · elegível · camada (em UI) · "CTA" como texto visível · "Liberar espaço" (fora do botão da página Status de armazenamento e do modal de duplicados/grandes, onde é aprovado, 2026-09-29) · "Guardar longo prazo" (sem "no") · "Finalizar" · "Pesquisar" (como placeholder) · "Global" (usar "Total") · siglas internas (ex.: AC+AL) · palavras em inglês na UI (Trash, Image, List, workspace).

## DON'Ts — tom

- Debochado, irônico, sarcástico, frio ou burocrático.
- Piada sobre perda de arquivo ou sobre o que o usuário guarda.
- Kan ou humor em erro, exclusão, segurança ou pagamento.
- Prometer o que o produto não cumpre.

## 🧩 Revisão de UX writing (2026-09-28)

A varredura completa do código contra esta definição, com os textos alterados e os que ficaram como estavam (porque são Figma-confirmados e não violam nenhuma regra acima), está em [[Revisão de UX writing (2026-09-28)]].

## Ver também

- [[Glossário]] — terminologia (qual palavra)
- [[Regra 5 - Terminologia]]
- [[Conflitos Abertos]]
- [[Kandrive Design System]]
