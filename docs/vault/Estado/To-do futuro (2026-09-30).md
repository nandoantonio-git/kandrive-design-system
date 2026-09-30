# To-do futuro (2026-09-30)

O que ficou de fora da rodada final da auditoria UX ([[Auditoria UX Sênior (2026-09-30)]]), por decisão do usuário. Nada aqui bloqueia a publicação do case.

## Pesquisa
- **Reteste** com 3 a 5 pessoas, as mesmas 3 tarefas, no protótipo atual, registrando sucesso, erros e tempo para comparar antes e depois. É o que fecha o C3 de vez.

## Produto e telas
- **A1, alvos de toque de 44px no Mobile:** 87% dos elementos tocáveis têm menos de 44px. Padrão de 44px no Figma e um teste de história que meça a área efetiva em 390px.
- **A5, estados e erros:** Login com erro de senha e "esqueci a senha"; carregamento, erro de rede e recuperação pendente no Desktop; desfazer em "Excluir" na revisão.
- **Tela `LongTermStorage/Stored/Desktop`:** a irmã do Mobile, com a lista do que foi movido, o destino, o espaço liberado e o resgate. Hoje o Desktop usa um aviso (`PopoverNotification`) em `Storage/LongTerm/Desktop`.
- **M3, duas buscas na mesma tela** (Header e modal de Guardar).

## Sistema
- **M7, `atom/IconButton` com 66 variantes:** o ícone deveria ser uma propriedade de troca de instância.
- **Migrar o `atom/PushButton`:** 214 instâncias dentro de Header, `OrganizePanelDropZone`, `PreviewPane`, modais e Sidebar ainda o usam. Ele já está marcado como obsoleto na descrição.
- **M4, higiene das camadas:** cerca de 40% com nome genérico (`Frame 58`, `Group 12`) e hex soltos no Figma.
- **M5, tokens pouco usados:** 14 dos 121 papéis de cor têm 3 usos ou menos.
- **Movimento reduzido:** teste de história que garanta `prefers-reduced-motion` nas animações de ícone.
- **Medição de contraste por camada no Figma:** refazer com o fundo real de cada botão.
