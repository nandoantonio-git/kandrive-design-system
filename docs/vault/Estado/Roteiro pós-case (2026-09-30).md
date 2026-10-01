# Roteiro pós-case (2026-09-30)

O que vem depois do case publicado, ordenado por **valor para o portfólio** (decisão do usuário em 2026-09-30). Regra de proteção: nada que mexa em muitas telas entra antes de o reteste ser decidido. Substitui [[To-do futuro (2026-09-30)]] como lista de trabalho; aquela nota fica como histórico do que foi adiado e por quê. Nada aqui bloqueia a publicação do case.

| Etapa | Item | Depende de você | Mexe em muitas telas |
|---|---|---|---|
| 0 | Manutenção do case (sem a capa) | Sim (a frase da marca; captura do slide 10) | Não |
| 1 | Reteste de usabilidade | Sim (recrutar 3 a 5 pessoas) | Não |
| 2 | Recuperação de senha e cadastro | Sim (autorizar telas novas) | Pouco |
| 3 | Variações da Home | Sim (autorizar telas novas) | Sim |
| 4 | Migração do `PushButton` e do `IconButton` | Sim (acompanhar) | Sim |

## Etapa 0: manutenção do case

Deixa o case apresentável hoje. Origem: [[Revisão final (2026-09-30)]].

1. **Capa (slide 01):** fora do roteiro por decisão do usuário (2026-09-30): não mexer em capa alguma. Os mockups continuam escondidos até o usuário decidir; nada será alterado na capa.
2. **Slide 10:** trocar a captura do Header, que ainda mostra o Header antigo, por uma captura atual do Storybook.
3. **README:** conferir `docs/assets/hero-storybook.png` e as grades, que são capturas antigas.
4. **Storybook publicado:** passada visual (primeira página, links, claro e Dark).
5. **Voz e tom:** confirmar a frase "como a marca quer ser lembrada", que veio truncada no PDF do Módulo 11 (hoje: "a marca que guarda o que você não pode perder").

**Andamento (2026-09-30):**
- Item 2: a captura do Header no slide 10 mostrava Organizar e Guardar em teal; com a [[Regra 13 - Header]] o Header voltou a ser assim e a imagem voltou a bater com o Figma. Não foi trocada (imagem do usuário). Basta conferir.
- Item 3: feito. `hero-storybook.png` (agora a página Introdução) e as grades de CardLogin, Sidebar e ArchiveBrowserModal foram regeneradas a partir do site publicado. `fidelity-*.png` e o GIF são registros históricos de comparação e ficaram como estão.
- Item 4: feito. O site publicado abre na Introdução, o índice tem 638 entradas e o Header no ar já mostra os botões em teal.
- Item 1: fora do roteiro (capa intocada, decisão do usuário).
- Item 5: espera você (a frase de "como a marca quer ser lembrada").

Feito quando: as capturas conferem com o site e a passada visual não acha defeito. A capa não faz parte do critério.

## Etapa 1: reteste

3 a 5 pessoas, as mesmas 3 tarefas (organizar, ver o armazenamento, guardar), no protótipo atual, registrando sucesso, erros e tempo para comparar antes e depois. Fecha o C3 de vez e sustenta a frase do slide 03 ("Próximo passo: 3 a 5 pessoas, as mesmas 3 tarefas").

- **Preparo:** roteiro de moderação e critério de "esperado" por tarefa, já descritos em `docs/CASE-STUDY.md`.
- **Depois:** atualizar o CASE-STUDY ("O que ainda não foi validado"), o slide 03 e o vault.
- **Não é implementação:** precisa de gente. Sem participantes, o item fica parado, e a frase do slide 03 continua verdadeira.

Feito quando: os resultados novos estão no CASE-STUDY e no slide 03, com a comparação antes e depois.

## Etapa 2: recuperação de senha e cadastro

Hoje "Esqueceu sua senha?" e "Crie uma agora" abrem o aviso "Fora do escopo deste case" (`Overlay/Fora do escopo`). O slide 07 os lista como fora.

- **Telas novas, só com autorização:** recuperação de senha (pedir e-mail, e-mail enviado, nova senha, concluído) e cadastro (formulário, erro, concluído), em Desktop e Mobile, claro e Dark.
- **Reaproveita:** `CardLogin` (já tem `State` Default e Error), `Input`, `Button`, `PopoverNotification`.
- **Texto:** modo sóbrio (segurança), sem Kan e sem humor.
- **Se entrar:** trocar a ligação dos dois links, mover o item no slide 07 para "Entrou neste case" e remover o aviso antigo se nada mais o usar.

Feito quando: os dois links levam a fluxos completos, com testes e axe passando.

## Etapa 3: variações da Home

Compartilhados, Recentes, Favoritos e Lixeira são a Home com outro título (decisão de 2026-09-30, já refletida no slide 07 e no aviso `Overlay/Mesma Home`). O plano só vale se o foco mudar para features.

- **Escopo mínimo:** a `HomePage` aceita `title` e dados próprios; 4 variações por largura e tema. A Lixeira pede o aviso dos 30 dias e "Restaurar".
- **Risco:** muitas telas novas (4 por largura e tema) e ligações a refazer nas barras lateral e inferior e na gaveta.
- **Se entrar:** trocar a ligação para as telas e aposentar `Overlay/Mesma Home`.

Feito quando: os quatro itens navegam para telas próprias nas três larguras.

## Etapa 4: migração do `PushButton` e do `IconButton` (sempre com o usuário acompanhando)

Dívida de sistema, pouco visível para quem avalia. Vem por último para não competir com o resto.

- **`PushButton`:** obsoleto (299 instâncias nas telas, 214 dentro de componentes). O `atom/Button` precisa antes de um slot de ícone. Ordem: slot de ícone no `Button` (código e Figma), migrar componentes, migrar telas, remover o `PushButton`.
- **`IconButton` (M7):** 66 variantes e 670 instâncias; só 2 dos 7 ícones existem como componente. Pede 5 ícones novos (Plus, Clear, Confirm, Delete, Sidebar) e um modo de variável para a cor. Antes, checar se um `atom/Icon` com outro nome já serve.
- **Proteção:** trabalhar em uma cópia do arquivo, migrar um componente por vez, comparar com captura antes e depois e rodar `npm test`, `check:touch` e `check:motion`.

Feito quando: nenhuma instância usa o `PushButton` e a matriz do `IconButton` virou propriedades.

## Fora do roteiro (decisões já tomadas)

- Remover tokens pouco usados: mantidos ([[Tokens pouco usados (2026-09-30)]]).
- Medição de contraste por camada no Figma, higiene das camadas restantes (464 preenchimentos soltos): baixa prioridade, sem etapa.

## Ver também

- [[Revisão final (2026-09-30)]]
- [[Auditoria UX Sênior (2026-09-30)]]

## Achado: AppShell em modo Docs (2026-09-30)

As 6 telas do `AppShell` na página Docs saem quase iguais: o Canvas inline usa a largura da coluna (~960px), e a casca troca de layout pela largura da janela, não do container. Desktop, Tablet e as 4 Mobile mostram Header + Sidebar. `mobileFrame` (390px) não resolve, porque o `AppShell` usa breakpoints de viewport, não container queries. Sugestão e decisão: ver o relatório no chat; o Canvas das histórias (com viewport) funciona.
