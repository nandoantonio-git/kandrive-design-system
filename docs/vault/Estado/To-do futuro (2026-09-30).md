# To-do futuro (2026-09-30)

O que ficou de fora da rodada final da auditoria UX ([[Auditoria UX Sênior (2026-09-30)]]), por decisão do usuário. Nada aqui bloqueia a publicação do case.

## Pesquisa
- **Reteste** com 3 a 5 pessoas, as mesmas 3 tarefas, no protótipo atual, registrando sucesso, erros e tempo para comparar antes e depois. É o que fecha o C3 de vez.

## Produto e telas
- **A5, o que sobra:** o fluxo de recuperação de senha e o cadastro (hoje abrem o aviso de fora do escopo).

## Sistema
- **M7, `atom/IconButton` com 66 variantes:** o ícone deveria ser uma propriedade de troca de instância.
- **Migrar o `atom/PushButton`:** 214 instâncias dentro de Header, `OrganizePanelDropZone`, `PreviewPane`, modais e Sidebar ainda o usam. Ele já está marcado como obsoleto na descrição.
- **M4, higiene das camadas:** 34% dos nós com nome genérico (`Frame 58`, `Group 12`), quase todos dentro de instâncias. Em 2026-09-30 os hex soltos mais comuns foram ligados (125 cores); sobram 464 preenchimentos soltos de 16.952 (cores de vidro e sombra, em sua maioria).
- **Medição de contraste por camada no Figma:** refazer com o fundo real de cada botão.

## Feito depois da rodada final (2026-09-30)
- Teste de movimento reduzido: `npm run check:motion`.
- Site publicado verificado: as histórias novas (`LongTermAfterSave`, `NearLimit`, `InfoMobile`) estão no ar.
- A5 (Login com erro de senha), M3 (uma busca por vez) e A1 (44px no Mobile, com `npm run check:touch`).
- Estados do Desktop (carregamento, erro de rede, recuperação pendente), `Stored/Desktop`, Login de erro no Tablet e desfazer em Excluir.
- M5: tokens pouco usados documentados e mantidos, por decisão do usuário ([[Tokens pouco usados (2026-09-30)]]).
- M4 parcial: 234 camadas de estrutura das telas renomeadas.
