---
tags: [estado, decisão]
---

# Menu de filtro (2026-10-01)

Pedido do usuário: um dropdown para o botão de filtro (o funil). Decidido em rodada de perguntas (/grill-me) e entregue no Figma e no código. Componentes novos: [[FilterMenu]] (`organism/FilterMenu`, `3500:9883`) e `molecule/FilterButton` (`3500:39738`). Docs no Storybook: *Organisms/Arquivos/FilterMenu* e *Molecules/Busca e filtros/FilterButton*.

## Decisões

| Pergunta | Decisão |
|---|---|
| Critérios | Três grupos, iguais aos atributos do Modo Livre: **Tipo** (várias), **Tamanho** e **Data** (uma cada) |
| Aplicação | Na hora, sem "Aplicar". "Limpar filtros" no rodapé; bolinha com a contagem no funil |
| Pacote | Figma primeiro, aprovado pelo usuário, e depois o código (Regra 11, paridade) |
| Mobile | Folha de baixo (padrão que o sistema já tinha), não balão |
| Textos | "Filtrar"; Qualquer tamanho / Menos de 100 MB / De 100 MB a 1 GB / Mais de 1 GB; Qualquer data / Últimos 7 dias / Últimos 30 dias / Este ano |
| Protótipo | Marca e desmarca (primeiro clique leva ao estado com 4 filtros), e a bolinha aparece no funil; o filtro de verdade fica no Storybook (`applyFilters`, história `ComLista`) |
| Tema escuro | Sobreposições `Overlay/Filtrar/* · Dark`, com o modo Dark forçado |
| Funil do Mobile | Área de toque invisível de 44×44 sobre o desenho de 11px, sem mudar o visual |
| Tablet | Variante própria: folha de baixo de 420px com linhas de 44px (toque). Desktop com linhas de 28px |
| Bolinha nas telas | O funil virou instância do `FilterButton`; uma variável de protótipo (`filtrosAtivos`) mostra e esconde a bolinha |

## Pontos de atenção

- **Coleção de variáveis nova, `Protótipo`** (só a variável `filtrosAtivos`): é de interação, sem papel de design. Os números do projeto (Primitives, Color e Dimension) continuam valendo para o sistema de design.
- No Figma os rótulos do menu estão a 14px; o código usa 16px, porque o `RadioButton` do sistema é 16 (Regra 4).
- A contagem da bolinha é a de opções marcadas (Tipo conta uma por opção); "Qualquer tamanho" e "Qualquer data" não contam.
- O funil do Mobile é um desenho solto; não ganhou a bolinha.
- Props antigas do `SearchHeader` (`filtersActive`, `defaultFiltersActive`) saíram; ver [[Mapa de interações (2026-09-29)]] se alguma tela depender delas.

## Fora desta rodada

Unificar a estratégia de todas as sobreposições do projeto (claras e escuras, incluindo "Fora do escopo" e as de senha): registrado no [[Roteiro pós-case (2026-09-30)]] como tarefa à parte.
