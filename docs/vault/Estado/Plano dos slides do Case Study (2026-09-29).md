---
tags: [estado, plano]
---

# Slides do Case Study — preenchimento e plano (2026-09-29)

Página `🎞️ Case Study · KanDrive` (`3214:2`), 8 slides 1920×1080. Pedido: preencher os placeholders com o que já existe e planejar o resto. Regra seguida: **nada é inventado** — cada recorte é uma imagem exportada do próprio Figma (telas da 📐Pages, componentes da ✨Design System, elementos da Design Language). Onde não existe material, o placeholder ficou e está listado abaixo, com uma proposta.

## Preenchido nesta rodada

| Slide | Placeholder | Agora |
|---|---|---|
| 03 Pesquisa | Status / Total | Recorte do `molecule/StorageStatus` com a aba "Total" (o achado "Global → Total") |
| | Ação / Guardar arquivos | Os botões `Organizar` e `Guardar` do Header |
| | Confirmação / Guardado | Coluna "Por que guardar?" + Destino do modal Guardar no longo prazo, com o texto do resgate por e-mail |
| 04 Linguagem visual | Liquid Glass | Os 3 conjuntos `foundation/LiquidGlass` (grande, médio, pequeno), claro e escuro |
| | Kan · canguru guardião | `foundation/BrandIcon` + os 4 rostos de feedback do Kan |
| 05 Arquitetura | Tokens | Amostras de cor ligadas às variáveis (Design Language) |
| | Atoms / Molecules / Organisms | `atom/Button` (Primary, Outline, Glass), `molecule/SearchInput`, `organism/Header` |
| | Templates / Pages | `template/SaveLongTermFileStorage` e a tela Home/Grid/Desktop (no lugar do "AppShell", que não existe como componente) |
| 06 Experiências | 4 recortes | Desktop + Mobile lado a lado: Home, Organizar (revisão), Longo prazo (selecionar e confirmar), Armazenamento — com legenda |

## Textos revisados (conforme combinado: 03, 04 e 06)

- **03** — "Destino e recuperação explícitos" → "Destino e resgate por e-mail"; nova linha de números: "26 respostas · ~30 pessoas na netnografia · 4 testes, 3 tarefas · +37% a +42% acima do tempo esperado" (do artigo do usuário; 26 respostas, como ele escolheu, não 25).
- **04** — nova linha: "Arquivar organiza · Guardar move para o longo prazo".
- **06** — só os recortes; o texto não mudou.
- Efeito colateral: a mensagem de sucesso mobile da tela `LongTermStorage/Stored/Mobile` estava com o texto antigo no Figma ("Prontinho, arquivos guardados"); agora é "Prontinho — seus arquivos estão guardados", igual ao código.

## O que ainda não temos (placeholders que ficaram) e como preencher

| Slide | Placeholder | Falta | Como produzir (proposta) |
|---|---|---|---|
| 02 Problema | Ícones de nuvens e HD | Ilustração de vários serviços/dispositivos | Ilustração nova, ou 3–4 logos genéricos de nuvem + HD desenhados com os traços do Kan. **Design novo** — decisão sua |
| 02 | Recorte de pastas e arquivos | Cena "organização manual" | Captura de uma pasta real bagunçada (foto ou print) do seu fluxo de trabalho; ou a tela Home/List com nomes reais |
| 02 | Ilustração do acervo | Imagem do medo de perder arquivos | Foto do celular "armazenamento cheio" citada no artigo (capítulo 1) |
| 07 Navegação | Mapa do arquivo | Mapa das páginas do Figma | Captura do painel de páginas do Figma, ou diagrama simples das páginas do arquivo (posso gerar no FigJam) |
| 07 | Árvore do Storybook | Barra lateral do Storybook | Captura do Storybook publicado (Vercel), com o menu expandido |
| 07 | Estrutura do projeto | Árvore de pastas do repositório | `tree` de `src/` e `stories/`, montado como texto formatado no slide |
| 07 | Nota de documentação | Uma nota do vault | Captura de uma nota (ex.: Regra 5 ou Tom de Voz) |
| 08 Entrega | Interface + documentação | Montagem "tela + docs" | Captura de uma página do Storybook (Docs + Canvas) |
| 08 | Mapa arquitetural · Graphify | Mapa do grafo | Rodar o `/graphify` no projeto e capturar o `graph.html` |

Ordem sugerida: 07 e 08 (todas são capturas do que já existe, mecânicas), depois 02 (precisa de você).

## Decisões abertas do artigo

- O artigo diz que "Liberar Espaço" virou "Ver duplicados". Com a decisão de 2026-09-29, isso ficou **desatualizado** ("Liberar espaço" é o botão da página de status e o título do modal). Nos slides não aparece, mas vale corrigir o artigo.
- Os *needs statements* das 3 personas (capítulo 5) foram escritos por quem gerou o artigo, não vêm do Módulo 6. Só entram em slide se você aprovar.
- Slide 03 mostra 4 participantes e 3 tarefas; se algum slide ganhar a tabela de tempos (T1 +38%, T2 +37%, T3 +42%), o dado vem do teste do artigo.
- O frame solto `Muito Espaço. Por muito tempo. (2) 1` (`3278:75`) e o `Kandrive motion 1` (`3273:43530`, vídeo) não estão numerados como slides. Falta decidir se o vídeo abre o case (antes da capa) ou fecha (depois do slide 08).

Ver [[Fechamento da entrega (2026-09-28)]].
