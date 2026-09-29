---
tags: [estado, plano]
---

# Prioridades das lacunas de interação (2026-09-29)

As seis lacunas que restavam no [[Mapa de interações (2026-09-29)]], ordenadas por severidade (perda de dados ou ação irreversível > ação primária levando ao lugar errado > interação básica ausente > atalho ou detalhe). Todas foram implementadas no tema claro, com o que já existia, a última como mock, até haver um canal.

| # | Severidade | Lacuna | Por quê nessa posição | Implementação |
|---|---|---|---|---|
| 1 | **Crítica** | Excluir conta sem confirmação | Ação irreversível que apaga também os arquivos guardados; qualquer clique perdia tudo | Modal de confirmação (`Overlay/Excluir conta/Desktop` e `/Mobile`), montado com o card da marca e os `atom/Button` Outline e Destructive já existentes, no modo sóbrio da voz da marca (sem humor, diz o que acontece). O botão "Excluir conta" abre o modal como sobreposição; "Cancelar" fecha; "Excluir conta" leva ao Login |
| 2 | **Alta** | `Adicionar` levava a `Home/FirstUpload` | Ação primária de criação, presente em ~28 telas, indo para a tela errada | `Overlay/Adicionar menu`, com a variante `Menu=Sidebar` do `organism/DropdownMenu`. `Nova pasta` fecha; `Enviar arquivo` e `Enviar pasta` levam ao primeiro envio (o destino antigo). Desktop e Tablet |
| 3 | Média | Abrir/selecionar arquivo e pasta na Grade | Interação básica da tela principal, sem nenhuma resposta ao clique | Cada arquivo/pasta troca para o `Selected=true` do próprio componente (10 itens). 4 itens sem essa variante ficaram como estavam |
| 4 | Média | Busca no Mobile | O campo é o mesmo elemento que já funciona no Desktop/Tablet | O campo "Pesquisar" das telas Mobile leva a `Home/SearchNoResults/Mobile` (29 telas) |
| 5 | Baixa | Chips do FAQ Mobile | Só filtro visual de tópicos | Cada chip troca para `Selected=true` (8 chips) |
| 6 | Baixa | `Falar com o suporte` | Não existe canal de contato no Figma, no código nem no vault | **Mock**, por decisão do usuário (2026-09-29: "não há e-mail por ora"): sobreposição `Overlay/Falar com o suporte (mock)`, com o texto "Este canal ainda não está disponível. Enquanto isso, as respostas mais comuns estão nesta página." e o botão "Entendi". Ligada nos 6 botões das telas de FAQ (claro). Quando houver canal, troque a sobreposição por ele. Não promete nada que o produto não cumpra |

## Limites do Figma que valem para os itens 1 e 2

- O Figma não deixa o plugin definir a posição da sobreposição: o modal e o menu abrem **centralizados**. O menu de "Adicionar" deveria abrir ao lado do botão; para isso, ajuste o "Overlay position" da sobreposição manualmente, uma vez.
- Nada foi testado em modo de apresentação.

Ver [[Fechamento da entrega (2026-09-28)]] (T).
