---
tags: [estado, plano]
---

# Plano das pendências (2026-09-29)

Decidido com o usuário (rodada de perguntas de 2026-09-29). Ordem por gravidade: primeiro o que quebra, depois o texto, depois a navegação, por último o que depende do usuário.

## 1. Quebras (alta)

| # | Item | Onde | Decisão |
|---|---|---|---|
| 1.1 | Abrir Agrupar ou Etiquetar desloca o título e os outros menus | Figma, `organism/PageToolbar` (30 telas) | Alinhar a linha pelo topo no componente. A lista aberta flutuar por cima do conteúdo fica como melhoria futura |
| 1.2 | Nomes das etiquetas ilegíveis no Etiquetar aberto (texto claro sobre fundo claro) | Figma, `molecule/Label` aberto | Corrigir a cor do texto |
| 1.3 | Aba Docs das páginas do Storybook quebra as telas de largura fixa | Storybook, `stories/pages/*.mdx` | Tirar as Docs das páginas: cada página fica com as histórias em tela cheia; o texto de uso vai para a descrição das histórias |

## 2. Texto (média)

| # | Item | Decisão |
|---|---|---|
| 2.1 | Regra "nada de travessão" | Vale para o texto que o usuário lê: telas do Figma, textos do app no código e slides. Não vale para o vault, a prosa do Storybook e os comentários do código |
| 2.2 | Padrão fixo de sucesso | "Prontinho — …" passa a ser **"Prontinho! …"** (ex.: "Prontinho! Seus arquivos estão organizados por data.") |

## 3. Navegação (média)

| # | Item | Decisão |
|---|---|---|
| 3.1 | Logo leva ao início | No Figma (cada tela clara → Home do mesmo aparelho) e no código (`Header`, logo como link com foco visível e rótulo "Kandrive, ir para o início") |

## 4. Depende do usuário (baixa)

- ~~Placeholders do slide 02 do Case Study~~ ✅ feito; nenhum placeholder sobrou no case (ver [[Plano dos slides do Case Study (2026-09-29)]]).
- Telas de estado sem entrada por ligação (ver [[Teste do protótipo claro (2026-09-29)]]): decidir quais viram consequência de uma ação.
- Posição das sobreposições (o plugin não define; abrem centralizadas): ajuste manual no Figma.
- Teste no modo de apresentação: só o usuário consegue.
- Contraste por opacidade e cores de badge (ver [[Conflitos Abertos]]).
- ~~Corrigir no artigo o trecho "Liberar Espaço → Ver duplicados"~~ ✅ o termo final é "Liberar espaço" (confirmado pelo usuário).
- ~~Lista aberta do Agrupar e do Etiquetar flutuando por cima do conteúdo no Figma (melhoria de 1.1).~~ ✅ feito

## Andamento

- ✅ **1.1** `organism/PageToolbar` alinhado pelo topo. Mais 39 linhas de barra desenhadas soltas nas telas (Desktop, Tablet e Mobile) também passaram para o topo. As 7 linhas com campo de busca (`SearchHeader`, Storage) e o "Ordenar por:" do Mobile continuaram centralizados: alinhar pelo topo desalinharia o estado fechado, porque os itens têm alturas diferentes. Nelas, abrir a lista ainda desloca os vizinhos, e a correção de verdade é a lista flutuante (item da seção 4).
- ✅ **1.2** No `molecule/Label` aberto, as 3 etiquetas usavam `atom/TypeLabel` `Style=Light` (texto branco, feito para ficar sobre imagem). Trocadas para `Style=Dark`, igual ao código (`FileTypeLabel`, padrão `Style=Dark`).
- ✅ **1.3** As 9 MDX de `stories/pages/` saíram. O texto de cada uma virou nota em `docs/vault/Páginas/` com a lista das histórias. No Storybook, cada página agora tem só as histórias em tela cheia.
- ✅ **2.1 / 2.2** Ver [[Regra 12 - Sem Travessão]].
- ✅ **3.1** Código: `Header` com o logo como link (`homeHref`, `onLogoClick`), com teste na história `Navbar`. Figma: 51 logos nas telas claras de Desktop e Tablet ligados à `Home/Grid` do mesmo aparelho, com transição Dissolve de 200ms. O header do Mobile não tem logo (tem o ☰), no Figma e no código.
- ✅ **Lista flutuante** Nas variantes abertas de `molecule/DropdownSelectGroupBy` (Desktop e Mobile) e `molecule/Label`, a lista saiu do fluxo (posição absoluta) e o componente ficou com a altura do estado fechado. Abrir um menu não desloca mais nada, inclusive nas barras com campo de busca.
- ✅ **Storybook** Vídeo da introdução trocado pelo novo `Kandrive-Motion` (8s, H.264 1920px, poster do último quadro). Favicon passou para a versão teal do `foundation/Favicon` (antes era a grafite), com `?v=2` para furar o cache do navegador.
- ✅ **Slides 07 e 08** preenchidos (ver [[Plano dos slides do Case Study (2026-09-29)]]).
- ✅ **Patterns** 12 fundos da marca em `docs/assets/patterns/`, com a seção `08 · Patterns` na Design Language e os fundos dos slides do case. O slide 02 foi preenchido com ícones do sistema e o Kan (ver [[Patterns]]).
- ✅ **Slide 04** Ganhou a amostra rosa "Destaque" (`Brand/Theme/Pink/Dark`), ficando com 4 amostras de 180px. O recorte de Liquid Glass, que era uma imagem antiga, virou instâncias vivas de `foundation/LiquidGlassLarge`, `Medium` e `Small` (claro e escuro) sobre o pattern 01.
- ✅ **Slide 08** Os dois quadros foram redimensionados pelo usuário (832×363 e 832×395) e as capturas foram recortadas de novo nessas proporções. A legenda do Graphify foi para o canto inferior esquerdo.
- ✅ **Fluxos do protótipo** Os 4 sem nome ganharam nome: G · Mobile: Primeiro acesso, Q · Mobile: Configurações, R · Mobile: Revisar organização e Z · Escuro: Mobile, revisar organização. O escuro foi mantido, no fim da lista. Todos os nomes trocaram "—" por "·" e a lista ficou em ordem alfabética (19 fluxos).
- **Blocos de cor (resposta):** o bloco final, com hierarquia e agrupamento, é `Foundation/Palette` (`1427:16958`): família › grupo › token, amostras ligadas às variáveis, a mesma ordem da página Tokens/Cores do Storybook. `Foundation/Color Modes` (`3099:9583`) é a tabela de revisão de 2026-09-24, com cada variável no claro e no escuro e notas de auditoria em inglês. Ela serve de registro e complementa a paleta com os valores escuros; não é a vitrine. Na paleta, o rótulo "Effect/Glass/Surgace" foi corrigido para "Surface".
- ✅ **`organism/Dialog`** (Figma `3334:37789`, seção Organisms da ✨Design System). As sobreposições que existiam só na 📐Pages viraram um componente com 3 variantes: `Type=Destructive, Device=Desktop|Mobile` (Excluir conta) e `Type=Info, Device=Desktop` (Falar com o suporte, mock). Os frames `Overlay/*` da Pages agora contêm uma instância do componente e mantêm as ligações dos botões (Cancelar, Excluir conta, Entendi). O `Overlay/Adicionar menu` já era instância de `organism/DropdownMenu` (Menu=Sidebar). Agora também está no código: `src/components/organisms/dialog.tsx`, com a história `Organisms/Dialog` (Destructive, DestructiveMobile, Info e CustomText) e testes de interação: foco inicial no Cancelar ou na ação única, Esc, e os callbacks `onConfirm`/`onCancel`. Papel `alertdialog` ou `dialog` 🧩.
- ✅ **Storybook** Favicon trocado para a versão branca do `foundation/Favicon`: selo branco com o "K" em grafite (#31302D). No Figma o K é vazado; numa aba clara ele sumiria. Os cartões do logo na Introdução passaram a ter a mesma largura máxima do vídeo (960px).
