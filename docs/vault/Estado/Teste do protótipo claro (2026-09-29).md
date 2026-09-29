---
tags: [estado, plano]
---

# Teste do protótipo claro (2026-09-29)

Como não é possível rodar o modo de apresentação a partir daqui, o teste foi uma leitura completa das reações das 92 telas claras da 📐Pages, montando o grafo de navegação e conferindo-o. **Nada substitui um clique de teste seu no Figma.**

## O que foi verificado e passou

| Verificação | Resultado |
|---|---|
| Destinos inexistentes ou inalcançáveis | 0 |
| Ligações de uma tela para ela mesma | 0 |
| Botão com dois destinos diferentes no mesmo gatilho (conflito) | 0 |
| Ligações para telas escuras a partir das claras | 0 |
| Ligações para o SandBox | 0 |
| Telas sem nenhuma saída | 1, `Organize/SavedNotification/Tablet`. **Corrigido depois**, a pedido do usuário: o aviso é a conclusão da ação de organizar, abre sobre `Saved/Tablet` e fecha sozinho em 4s (ver ‹V› no fechamento) |

## Alcance a partir dos pontos de início

O primeiro teste achou só 47 das 92 telas: os pontos de início cobriam só o Desktop. Não era erro de ligação, era falta de entrada para Tablet e Mobile. Ajustes:

- Novos pontos de início nomeados: **F** Tablet: Entrar, **H** Mobile: Entrar, e (para grupos sem entrada natural) **I** Tablet: Configurações, **J** Tablet: Ajuda, **K/L** Limite atingido (Desktop/Mobile), **M** Mobile: Pagamento, **N** Mobile: Ajuda, **O** Mobile: Erro de rede, **P** Mobile: Recuperação pendente. A página tem 19 pontos de início ao todo.
- Novas ligações para conectar grupos que ficavam soltos: menu lateral das Configurações do Tablet, `Expandir`/`Recolher` do FAQ Tablet, hambúrguer do Mobile → gaveta (e de volta), alternância Grade/Lista do Mobile, `Armazenamento` da gaveta → Storage Mobile (53 reações).
- Resultado: 63 das 92 telas alcançáveis pelas ligações a partir dos pontos de início principais; as demais 29 são alcançadas pelos pontos I–P acima.

## Ainda sem entrada por ligação (por natureza, são estados ou variantes)

`Storage/LimitReached` (Desktop e Mobile), `Payment/PlanCollapsed` (Desktop, Tablet, Mobile), `Payment/PlanExpanded/Mobile`, `Home/GridLoading|ListLoading|NetworkError|FirstUpload/Mobile`, `Home/GridLeftHand/Mobile`, `LongTermStorage/SelectFilesSelected/Mobile`, `FAQ/*/Mobile`, `Organize/Saved/Mobile`, `Storage/ManageSpace/Tablet`, `Home/FirstUpload/Tablet`, `Home/ListSelected/Tablet`, `Organize/ChooseMethod/Tablet` (a base atrás do modal). Cada um é uma variação de tela e não tem gatilho no fluxo; abre-se pelo ponto de início ou clicando na tela. Se algum deles deveria ser alcançado por uma ação (por exemplo, `LimitReached` quando o armazenamento enche), é uma decisão de design.

## Limites do teste

- A leitura confere que as ligações existem e são coerentes, não que a animação está boa nem que o estado de um componente se mantém depois do clique (cartões de método, `Selected` de arquivos).
- O Figma não deixa o plugin definir a posição das sobreposições: modal de exclusão, menu de "Adicionar", modal de método (Tablet) e suporte abrem centralizados.
- Dark segue fora, por decisão.

Ver [[Fechamento da entrega (2026-09-28)]] (U), [[Mapa de interações (2026-09-29)]].
