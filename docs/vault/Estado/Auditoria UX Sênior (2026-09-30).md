---
tags: [estado, auditoria, ux]
---

# Auditoria UX Sênior (2026-09-30)

Escopo: o projeto inteiro visto como produto de portfólio, com o olhar de quem contrata um UX sênior. Cinco frentes: narrativa e evidência do case, arquitetura de informação e fluxos, design de interação, acessibilidade e o design system (tokens, componentes e paridade Figma × código). A Matriz CSD enviada por engano foi ignorada.

## Como medi (e o que esta auditoria não cobre)

- **Figma:** leitura pela API de 90 telas claras da página 📐Pages, dos 8 slides do Case Study e dos 188 componentes da ✨Design System. Números são contagens de camadas, não amostras.
- **Contraste:** calculado pela fórmula WCAG 2.x a partir dos valores dos tokens (Light e Dark), sem amostrar pixels.
- **Código:** leitura de `src/`, `.storybook/` e testes.
- **Não cobre:** teste com pessoas, leitor de tela de verdade, teclado em todas as telas, desempenho. Os achados de acessibilidade são de conformidade com critérios, não de uso real.

## Veredito

O projeto tem três coisas raras: pesquisa em quatro métodos, rastreabilidade entre decisão, Figma e código, e um sistema com governança (regras, changelog, testes com axe, vault). O que enfraquece o case hoje não é falta de trabalho, é **incoerência entre o que o case afirma e o que o produto entrega**. A pesquisa diz que fonte pequena e baixo contraste atrapalharam os participantes e que a correção seria prioridade. O Figma entregue continua com 30% dos textos abaixo de 12px. Um avaliador que abrir o arquivo depois de ler o slide vai notar.

Nota por dimensão (0 a 5, onde 3 é "aceitável para entrega" e 4 é "nível de portfólio sênior"):

| Dimensão | Nota | Em uma frase |
| --- | --- | --- |
| Estratégia e narrativa do case | 3,0 | Estrutura clara e honesta ("produto conceitual"), mas sem objetivo, métrica e resultado |
| Pesquisa e evidência | 3,5 | Quatro métodos e ligação com decisões, mas amostra pequena, baseline própria e sem reteste |
| Arquitetura de informação | 2,5 | A barra lateral promete 7 destinos; nenhum está ligado e 5 não têm tela |
| Interação e fluxos | 3,5 | Fluxos principais bons e bem ligados; estados e erros concentrados no Mobile |
| Design visual e UI writing | 3,5 | Marca coerente, Liquid Glass bem aplicado; hierarquia de CTA e vocabulário inconsistentes |
| Acessibilidade | 2,0 | Tipografia, contraste e alvos de toque abaixo dos critérios; o gate automático não pega contraste |
| Design system (tokens e componentes) | 4,0 | Três camadas de token, 98% dos componentes descritos, 0 tokens mortos; higiene de camadas fraca |
| Governança e paridade Figma × código | 4,0 | Muito acima da média; poucas divergências conhecidas e já registradas |

## O que está forte e deve ser mantido

- **Honestidade de escopo:** "produto conceitual" na capa e "pesquisa orientou decisões" no slide 3. Isso protege a credibilidade.
- **Ciclo achado → decisão visível:** o slide de pesquisa mostra "Rótulos ambíguos → Global virou Total". É exatamente o tipo de prova que um avaliador procura. Falta repetir isso em mais 3 ou 4 decisões.
- **Sistema com regras:** 12 regras travadas, changelog, vault, nota de decisão por componente. O repositório conta a história do processo sem precisar de texto extra.
- **Cobertura de componentes:** 188 componentes no Figma, 184 com descrição; 140 páginas de componente no Storybook; 492 testes com axe e interação.
- **Tokens saudáveis depois da reestruturação de hoje:** 120 papéis de cor, todos usados; 89 cores de base; 84% das cores das telas ligadas a variável.
- **Detalhes de UX que um sênior nota:** preferência de mão no Mobile (barra inferior à esquerda ou à direita), "Por que guardar?" explicado na hora, aviso de sufixo em nome duplicado, revisão da organização antes de aplicar.
- **Transparência sobre o uso de IA** no README: bom, desde que as decisões de design sejam claramente suas (ver O6).

---

## Achados críticos (corrigir antes de publicar o portfólio)

### C1. O case diz que corrigiu legibilidade; o Figma não corrigiu
- **Evidência na pesquisa:** `docs/CASE-STUDY.md` lista "Legibilidade: fonte pequena/baixo contraste dificultava leitura, problema citado especialmente pensando em usuários mais velhos" e a decisão derivada 5 é "Melhorar contraste e tamanho de fonte".
- **Evidência no arquivo (textos das telas claras):**

| Dispositivo | Textos | Abaixo de 12px | Abaixo de 16px | Exatamente 10px ou menos |
| --- | --- | --- | --- | --- |
| Desktop | 1.603 | 30% | 66% | 17% |
| Tablet | 1.290 | 30% | 73% | 18% |
| Mobile | 930 | 29% | 78% | 13% |

- **Regra 4 (travada):** piso de 16px para corpo, rótulos de botão e links; microtexto decorativo "nunca abaixo de ~11px". Ou seja, pelo menos 13% a 18% do texto viola até a exceção.
- **Por que é crítico:** é a incoerência mais visível para quem lê o case com atenção. A pesquisa identificou o problema e o entregável o mantém.
- **Correção:** subir a escala mínima no Figma. Criar estilos de texto para 12 e 14px, que não existem hoje (os 15 estilos cobrem 10, 11, 13, 16, 20, 25, 32, 40, 50), e migrar as telas para a escala nova: corpo 16, apoio 14, microtexto 12 (piso). Isso reorganiza várias telas (as de modal já estão apertadas), então vale fazer tela por tela, começando pelas quatro do slide 6.

### C2. A acessibilidade passa nos testes, mas o teste não cobre contraste
- **Fato do gate:** `.storybook/preview.tsx` usa `a11y.test = 'error'`, mas `color-contrast` está com `reviewOnFail: true`. Falhas de contraste são só sinalizadas, nunca quebram. Os 492 testes verdes não dizem nada sobre contraste.
- **Tokens com escopo de texto que não passam 4,5:1 (Light, sobre `Surface/Background`)**:

| Token | Contraste | Observação |
| --- | --- | --- |
| `Text/Placeholder` | 1,54 (1,71 no Card) | Placeholders ("Pesquisar") quase invisíveis. A nota já existia em Conflitos Abertos como "achado, não corrigido" |
| `Text/Cool/Tertiary` | 2,31 | |
| `Text/OnGlass/Tertiary` | 1,73 | |
| `Text/OnGlass/Secondary` | 4,46 | Por 0,04 |
| `Text/Muted` | 4,36 (4,02 no Subtle) | |

- **Se usados como texto (escopo amplo):** `Feedback/Success/Default` 3,29, `Feedback/Warning/Default` 2,85, `Brand/Accent/Light` 3,42.
- **Dark:** `Brand/Accent/Dark` 4,48 no fundo e 4,01 no Card; `Text/Cool/Tertiary` 3,72.
- **Bordas de componente (critério 1.4.11, 3:1):** no Dark, `Border/Input` dá 1,56 e `Border/Default` 2,29. Campos de formulário no Dark ficam sem contorno perceptível. No Light, `Border/Input` dá 8,4 e `Border/Default` 4,46, que passam.
- **No código:** o `Header` aplica `opacity-50` no `ActionPill` (Ajuda, Configurações, Conta), enquanto o Figma mostra opacidade 1. É o único acesso a Ajuda e Configurações na tela e fica esmaecido. Há 25 usos de `opacity-40/50/60` como estado visual em `src/`.
- **Correção (em ordem):**
  1. Escurecer `Text/Placeholder` para ao menos 4,5:1 e `Text/Muted` para 4,6:1. O ajuste é de poucos pontos de luminosidade.
  2. Trocar `reviewOnFail` por falha real e tratar o que aparecer.
  3. Dark: subir `Border/Input` e `Border/Default` para 3:1 (por exemplo `Base/White` a 40% no Input).
  4. Tirar o `opacity-50` do `ActionPill` do Header.

### C3. O ciclo de pesquisa não fecha
- **O que existe:** 4 participantes, 3 tarefas, tempo medido "contra uma expectativa prévia": +38%, +37% e +42% acima do esperado.
- **Problema:** o "esperado" é estimativa da própria equipe, não referência externa. Com n = 4, percentuais sugerem precisão que a amostra não tem. E o slide de resultado ("+37% a +42% de tempo") não diz de que se trata.
- **Lacuna principal:** depois de 7 decisões de design (Global → Total, aproximar ações, feedback pós-arquivamento, onboarding contextual etc.), **não há reteste**, nem mesmo informal. Sem isso, o case afirma causa sem prova de efeito.
- **Correção de baixo custo:**
  - Reescrever o resultado como qualitativo ("4 de 4 participantes tiveram dificuldade em Organizar") e deixar os tempos como apoio, com o critério do "esperado" explicado.
  - Incluir sucesso de tarefa e erros por participante, que são mais defensáveis com n = 4.
  - Fazer um reteste curto (3 a 5 pessoas, as mesmas 3 tarefas, no protótipo atual) e mostrar antes e depois.
  - Se não houver tempo: uma avaliação heurística (Nielsen) documentada, marcada como tal, e uma seção honesta de "o que ainda não foi validado".

### C4. O escopo prometido pela navegação não existe
- **Fato:** a barra lateral tem Pessoal, Compartilhados, Recentes, Favoritos, Guardados, Lixeira e Etiquetas. No protótipo, **nenhum** desses itens tem ligação. Compartilhados, Recentes, Favoritos e Lixeira não têm nenhuma tela. A busca do Header leva sempre à tela "sem resultados".
- **Risco:** o avaliador clica, nada acontece, e lê isso como produto inacabado, não como recorte consciente.
- **Correção:** ou (a) declarar no case um slide "Escopo: o que entrou e o que ficou de fora, e por quê", ligando os itens sem tela a um aviso claro no protótipo (por exemplo "Fora do escopo deste case"), ou (b) desenhar ao menos Lixeira e Compartilhados, que dão sustentação às personas (ver A6). A opção (a) custa um slide e é suficiente.

---

## Achados altos

### A1. Alvos de toque no Mobile
- 269 elementos interativos nas telas Mobile; **234 (87%) têm menos de 44px** no menor lado. Exemplos por frequência: ícone do menu 14 x 12, caixa de seleção 20 x 20, chips 28px de altura, abas da barra superior 36px, botão Expandir/Recolher do FAQ 26 x 18 e 55 x 23, ícones de 16px.
- O código mitiga com o utilitário `touch-target` (área de toque ampliada sob ponteiro grosso), mas só aparece em 16 lugares e não há teste que garanta a cobertura.
- **Correção:** padrão de 44px no Figma para o que é tocável (a área pode exceder o desenho do ícone), e um teste de história que meça a área efetiva em viewport de 390px.

### A2. Hierarquia de ação: quatro botões primários na mesma tela
- Na Home Desktop aparecem ao mesmo tempo **Adicionar**, **Organizar**, **Guardar** e **Comprar espaço**, todos em teal cheio. Quando tudo é primário, nada é.
- O teste de usabilidade apontou que "Organizar não é o primeiro caminho mental" e que as ações importantes ficam longe do conteúdo. Hoje Organizar e Guardar estão no Header, longe da lista de arquivos, e "Comprar espaço" é uma oferta de venda permanente em todas as telas.
- **Correção:** manter um primário por tela. Sugestão: Adicionar como primário, Organizar e Guardar como secundários (contorno), e "Comprar espaço" só aparecer quando o uso passa de um limiar. Aproximar Organizar e Guardar da seleção (barra de ação contextual quando há itens selecionados), que atende a decisão 3 do próprio case.

### A3. Vocabulário: três nomes para o mesmo destino
- **Guardar** (ação no Header), **Guardados** (lugar na barra lateral) e **Longo prazo** (camada de armazenamento e título da tela) designam o mesmo fluxo. A Regra 5 fixa os termos, mas a pesquisa já apontou "Guardar" e "Arquivar" como ambíguos, e o teste mostrou insegurança sobre "o que foi movido, para onde, como recuperar".
- **Inconsistências pontuais encontradas nas telas:**
  - modal de Longo prazo com o campo de busca escrito "Search" (o termo aprovado é "Buscar arquivos, pastas ou templates");
  - "Continuar.." com dois pontos no modal de métodos;
  - "Taxonomia Sugerida" e "Template Sugerido" como rótulos diferentes na mesma tela de revisão;
  - o componente `StorageSidebar` tem o padrão "Corrente" no chip, enquanto as telas dizem "Acesso rápido";
  - o modal de Longo prazo mostra três arquivos nos chips e diz "1 selecionado".
- **Correção:** um mapa de vocabulário de uma página (ação, lugar, camada) com os três nomes, onde cada um aparece, e escolher um só para o destino (sugestão: "Longo prazo" como nome único do lugar e da camada; "Guardar" só como verbo). Varredura de texto no Figma para os pontos acima.

### A4. A informação que o teste pediu está escondida
- O teste mostrou insegurança sobre o resultado de guardar, e a decisão 4 foi "feedback explícito: quais arquivos, para onde, quanto espaço liberado, como recuperar". No Desktop, a única promessa de resgate ("Para resgatar, é só solicitar, você recebe por e-mail e o espaço volta para o seu armazenamento em até 8h") está em texto pequeno, no painel da direita do modal, antes de confirmar.
- Depois de confirmar, não há tela Desktop de resultado: só o Mobile tem `LongTermStorage/Stored`. O fluxo Desktop termina no modal, o que é justo o ponto que o teste mostrou frágil.
- **Correção:** tela ou notificação Desktop pós-guardar, com lista do que foi movido, destino, espaço liberado e ação "Como recuperar". Mover o prazo de resgate (8h) para o título do painel, em destaque, antes do botão Concluir.

### A5. Estados e erros: o Mobile tem mais do que o Desktop
- **Estados só no Mobile:** carregamento (Grid e Lista), erro de rede, recuperação pendente. O Desktop tem só primeiro upload, sem resultados e limite atingido.
- **Autenticação:** só a tela de login, nos três tamanhos. Não há erro de senha, "esqueci minha senha", criação de conta nem verificação. Onboarding existe só no Mobile.
- **Ações destrutivas:** "Excluir" por arquivo na revisão da organização e "Excluir conta" têm confirmação, mas o primeiro não tem desfazer.
- **Correção:** matriz de estados (tela × estado × dispositivo) com os vazios marcados. Fechar primeiro Login com erro e esqueci a senha, e carregamento e erro de rede no Desktop.

### A6. As personas não aparecem no produto
- O documento define Bruna (segurança das memórias), Mariana (status de backup por projeto e clareza de custo) e Rafael (sigilo, controle de acesso, versionamento e retenção). Os slides não mostram personas, e nenhuma tela atende Rafael (sem compartilhamento, permissões nem versões) nem Mariana (sem status por projeto).
- **Correção:** um slide de "Quem é atendido por quê" ligando cada persona a uma tela e a uma decisão, e assumir em voz alta o que ficou de fora.

### A7. Estilos de texto quase não são usados
- Só 8% dos textos das telas (fora de instâncias) usam um estilo de texto; o resto tem fonte e tamanho soltos. Os 15 estilos existentes não incluem 12 e 14px, que aparecem centenas de vezes.
- Consequência: trocar a escala (C1) exige editar camada por camada.
- **Correção:** completar a escala de estilos e aplicar por script (mapeando tamanho e peso para o estilo mais próximo) antes de mexer nos tamanhos.

### A8. Divergências de código que um revisor técnico acha
- `index.html` declara `lang="en"` para um produto em português; leitores de tela vão pronunciar errado. Não encontrei declaração `pt-BR` no Storybook.
- `ActionPill` com `opacity-50` no Header (ver C2).
- `prefers-reduced-motion` tratado em 22 arquivos; as animações novas de ícone (Agrupar, Organizar, Guardar, Home) o respeitam, mas não há teste que garanta isso.

---

## Achados médios

- **M1. Dois modais empilhados.** `Organize/Review/Desktop` mostra o modal "Revisar organização" sobre o painel de organização, que já estava em tela; os dois têm botões Cancelar/Continuar. A página atrás dos modais aparenta não ter película escurecida, então o foco visual fica ambíguo (conferir se é só da captura).
- **M2. Modal de métodos com descrições de 10px** ("Organize por ano, mês e dia…"), que é justamente o texto que decide a escolha.
- **M3. Duas buscas na mesma tela** (Header e modal de Longo prazo).
- **M4. Higiene das telas do Figma.** 40% das camadas têm nome genérico (`Frame 58`, `Group 12`, `Container`), 78% dos traços e 84% dos preenchimentos estão ligados a variável. Os hex soltos mais comuns (`09090b` 91 vezes, `71717a` 70, `007e96` 46) são exatamente `Text/Primary`, `Text/Muted` e `Brand/Primary/Action`.
- **M5. Tokens demais para o tamanho do produto.** 120 papéis de cor para um produto com poucas telas-tipo. 14 são usados 3 vezes ou menos (`Text/Fixed/Navy`, `Surface/Cool/Strong`, `Brand/Primary/Ink/20`…). Não é erro, mas o "sistema" pode parecer inflado.
- **M6. Nomes duplos.** O Figma diz `Brand/Primary/Default`; o CSS diz `--brand-teal`. Decidido manter, mas a tradução precisa estar visível (já está no cartão de cor do Storybook).
- **M7. Componentes com excesso de variantes.** `atom/IconButton` tem 66 variantes (ícone × estilo × estado × selecionado × hover). O ícone deveria ser uma propriedade de troca de instância. `atom/PushButton`, obsoleto, continua no arquivo com 91 variantes; risco de alguém usá-lo.
- **M8. Slide 06 (Experiências).** Miniaturas pequenas demais para ler, sem legenda de insight. É o slide que mais deveria vender o produto.
- **M9. Slide 08 (Entrega).** "3.034 nós · 3.308 ligações" do Graphify é métrica de ferramenta, não de valor. Para um avaliador de UX, vale mais: nº de componentes, cobertura de estados, testes de acessibilidade, tempo para montar uma tela.
- **M10. Texto mínimo nos slides.** Slides 07 e 08 têm texto de 14 a 15px em 1920px; projetado ou em tela pequena, ficam difíceis.

## Observações menores

- Um único exemplo de achado → decisão aparece nos slides; o documento tem sete.
- O README descreve o processo com IA com orgulho e rigor, o que é bom; convém separar "decisões de design minhas" de "execução com agente" na apresentação.
- O Changelog nasceu hoje e tem só dois meses de retroativo resumido por dia; manter atualizado a cada entrega.

---

## Plano recomendado

**Onda 1: antes de publicar (maior retorno de credibilidade)**
1. C1 + A7: estilos de texto completos e subida do piso tipográfico, começando pelas 4 telas do slide 6.
2. C2: tokens de contraste, gate real no axe e `opacity-50` do Header.
3. C4: slide de escopo e avisos "fora do escopo" no protótipo.
4. C3: reescrever o resultado do teste como qualitativo e adicionar seção "o que ainda não foi validado".
5. A3: mapa de vocabulário e varredura dos 5 erros de texto.

**Onda 2: profundidade de UX sênior**
6. A2: hierarquia de ação e barra de ação contextual.
7. A4 + A5: tela Desktop de "guardado", Login com erro e esqueci a senha, estados Desktop.
8. A1: 44px no Mobile e teste de área de toque.
9. A6: slide de personas ligadas a decisões.
10. Reteste curto com 3 a 5 pessoas.

**Onda 3: higiene e escala**
11. M4/M7: nomear camadas, ligar hex soltos, modelar ícone como troca de instância, remover `PushButton` obsoleto.
12. A8: `lang="pt-BR"` e teste de movimento reduzido.

Ver [[Auditoria final (2026-09-30)]] para o estado técnico (gate, paridade, protótipo) e [[Conflitos Abertos]] para o que já estava registrado.

## Andamento

### Lote rápido (2026-09-30)
- ✅ **C2, contraste:**
  - Gate: `color-contrast` do axe quebra o teste. Apareceram 36 falhas reais, todas corrigidas (rótulos do catálogo de ícones, itens do menu de contexto, texto de aviso, chips rosa, links sobre fundo teal, campos do login, `aria-disabled` nos estados desativados, histórias sobre fundo errado). 492 de 492 passam.
  - Tokens de texto: `Text/Placeholder`, `Text/Muted`, `Text/OnGlass/Secondary`, `Text/OnGlass/Tertiary` e `Text/Cool/Tertiary` (Light) e `Text/Cool/Tertiary` (Dark) a 4,5:1 ou mais nas três superfícies (`Zinc/575`, `Stone/650`, `Slate/600` e `Slate/350`).
  - Bordas: `Border/Input` a 3:1 (Light `Zinc/450`, Dark branco a 35%), aplicado nos campos das Configurações, no seletor de idioma e no login.
  - Sucesso e aviso: papel novo `Feedback/Success/Text`, e os textos de aviso usam `Feedback/Warning/Text`.
  - Barra lateral: os itens inativos deixam de usar `opacity-50` (Figma usava 1,73:1 em 330 textos) e passam a usar `Text/OnGlass/Tertiary`.
  - Header: `ActionPill` sem `opacity-50`.
- ✅ **A8, idioma:** `lang="pt-BR"` no `index.html` e no Storybook.
- ✅ **A3, erros de texto (5 de 5):** "Search", "Continuar...", "Taxonomia/Template Sugerido", "Corrente" e "1 selecionado" com três chips. De quebra: "15.35 MB" para "15,35 MB" e "X itens selecionado" para "selecionados".
- ✅ **Higiene (M4, parcial):** 88 ligações a variáveis apagadas (o rosa da marca) religadas; 86 textos com cor solta ligados a token (`Text/Muted`, `Text/Placeholder`, `Brand/Primary/Default`).
- Ainda aberto do C2: contraste medido no Figma por camada mostra cerca de 12% de falhas em telas claras, mas o levantamento superestima (botões com fundo em camada irmã aparecem como falha). Vale refazer depois da tipografia, já com o fundo real de cada botão.

### Análise prévia da tipografia (C1 e A7), sem alterar nada
- 62 dos 188 componentes têm texto abaixo de 12px: 924 de 2.106 textos de componentes (44%), e 1.362 (65%) abaixo de 14px.
- Maiores concentrações: `Sidebar` (78), `OrganizePanelDropZone` (59), `StorageStatus` (49), `PreviewPane` (46), `FileItem` (36), `TypeLabel` (34), `TemplateCard` (34), `NodeContextMenu` (31, com texto de 9px), `SaveOrganizationModal` (31) e as cinco telas-modal da onda de Organização e Guardar.
- Como o texto está dentro de componentes, o ajuste é nos componentes, não nas telas, e se espalha para todas as telas que os usam.

### Tipografia, lote 1 (2026-09-30)
- **Escala:** 16 (corpo, botão, link), 14 (apoio), 12 (microtexto, piso). Regra 4 revisada. Estilos do Figma: `Body/XS` e `XS/Bold`, `Tag` e `Caption/SM` passam a 12px; `Body/SM` a 14px; novos `XS/Medium`, `SM/Medium`, `SM/Bold`, `MD/Medium` e `MD/Bold`.
- **Aplicado em:** Sidebar, SidebarOption, StorageSidebar, SidebarToggle, StorageStatus, StorageStatusHeaderSelector, TypeLabel, Tag e FolderTagChip (Figma e código). Glifos de ícone ficaram fora da escala.
- **Efeito colateral do Figma:** mexer num estilo de texto deixou os textos sobrescritos das instâncias desatualizados na renderização (botões e chips voltaram a mostrar "Label"). O texto nunca se perdeu (a API continuava mostrando o valor certo); reescrever o texto de cada instância (7.600 textos) resolveu. Fica como regra para os próximos lotes: depois de editar estilos, reescrever os textos das instâncias.
- **Reflow ajustado:** altura do painel "Por que guardar?" (quebra de linha forçada removida), chips de arquivo que quebram linha, descrição do cartão "Modo livre", rótulos das abas e da barra inferior do Mobile ("Organizar" e "Compartilhados" quebravam no meio da palavra).
- **Falta (lotes 2 e 3):** 62 componentes seguem com textos abaixo de 12px, principalmente os modais e painéis de Organizar e Guardar, o PageToolbar, o Header e o restante.

### Tipografia, lote 2 (2026-09-30)
- **Figma:** 74 textos em componentes (TemplateReviewModal, TemplateCard, CleanSpaceStorage, SaveLongTermFileStorage, ArchiveBrowserModal, SaveOrganizationModal, PopoverNotification, MethodOrganizeButton, SearchInput) e 667 textos soltos nas telas, claras e Dark, passaram para os estilos de 12 e 14px. Textos das instâncias reescritos (7.600) para evitar o problema do "Label".
- **Reflow ajustado:** rótulo "Template sugerido:" com largura pelo texto; legenda do Armazenamento no Mobile quebra linha em vez de sair da tela.
- **Código:** 45 arquivos passaram de 10 e 11px para 12 (`text-xs`) e de 13 para 14 (`text-sm`). "Estrutura sugerida" unificado em "Template sugerido", como no Figma.
- **Resultado nas telas claras:** abaixo de 12px, Desktop 0%, Tablet 0%, Mobile 0,2% (2 textos). Abaixo de 14px: 34%, 37% e 49%, quase tudo microtexto de 12px, permitido pela escala.
- **Fica para o lote 3:** o Modo livre (nós do canvas e menu de contexto, com textos de 8 a 11px no Figma e no código) e as páginas de documentação de tipografia do Storybook, que ainda mostram a escala antiga.
- **Achado de passagem, não corrigido:** "Liberar espaço" e "Comprar espaço" em botões com 13 a 14px nas telas de Armazenamento; a Regra 4 pede 16 para rótulo de botão.

### Tipografia, lote 3, fechamento do C1 e do A7 (2026-09-30)
- **Figma:** os 20 componentes que ainda tinham texto fora da escala foram migrados: Modo livre (`FreeModeItemNode`, `FreeModeOutputNode`, `NodeContextMenu`, `NodeContextMenuItem`, `OrganizeFreeModeCanvas`), `MethodCard`, `FaqInfoCard`, `FaqInfoCardCollapsed`, `PlanSelection`, `SettingsCard`, `TextField` e outros.
- **Fontes fora da marca:** 128 textos usavam Manrope (Login, modal de revisão, `UploadPopover`, `ContextHeader`, `TextField`, `atom/Button`), Inter (Modo livre, `ViewModeToggle`, FAQ) e Geist (listas do "Liberar espaço"). Todos passaram para Figtree na escala. Os `SearchBar*`, legado já registrado fora da marca, ficaram como estão.
- **Botões do Armazenamento:** "Liberar espaço" e "Comprar espaço" no `StorageStatus` e no `StorageTierCard` viraram `atom/Button` MD (16px), no Figma e no código; as 2 ligações de protótipo foram religadas.
- **Reflow:** nó "Guardar automaticamente" com 200px e título em duas linhas (Figma e código); rótulos do rascunho do filtro em uma linha; seletor "Agrupar" do código com a largura do texto (virava "Agru...").
- **Storybook:** `Tokens/Typography` documenta a escala de 3 degraus, e a tabela de estilos mostra os novos.
- **De passagem:** "Acesso rápidp" corrigido em 15 textos.
- **Resultado:** texto abaixo de 12px nas telas claras, de 30% para praticamente 0%; nenhuma fonte fora da marca nas telas. **C1 e A7 fechados.**
