# Revisão final (2026-09-30)

Revisão do que o avaliador vê, na ordem combinada: slides, README e `CASE-STUDY.md`, site do Storybook e números cruzados. Política: corrigir erro de fato, digitação, acabamento e defeito claro; só listar conteúdo e narrativa.

## Corrigido
- **Slide 10:** 494 testes virou 501; 179 telas virou 197.
- **Slide 05:** as miniaturas de `SearchInput`, `Header`, `SaveLongTermFileStorage` e `Home/Grid/Desktop` foram regeradas das telas atuais (mostravam o Header teal antigo).
- **README:** "~93 componentes" virou 139; link para o Figma; comandos de verificação atualizados (`tsc -b`, `oxlint`, `npm test` com 501 testes, `check:motion`, `check:touch`); `Tokens/Marca` e `Responsividade` na lista; "importar este diretório" virou "este repositório".
- **`CASE-STUDY.md`:** nomes das páginas do Storybook atualizados (`Molecules/Armazenamento/StorageStatus`, `Organisms/Armazenamento/PlanSelection`).
- **Introdução do Storybook:** Regra 4 na escala de 3 degraus (16, 14, 12) e nota de que o `PushButton` segue obsoleto no Figma.
- **Números cruzados:** 188 componentes no Figma e 139 em React conferidos contra o arquivo e o código; 501 testes conferidos com o `npm test`.

## Para o usuário decidir (não mexi)
- **Capa (slide 01):** o notebook e o celular (`Mockup - desktop 1` e `Mockup - mobile 1`) estão escondidos. Um erro meu sobrescreveu as imagens originais. Restaurar do histórico de versões do Figma, ou mandar os arquivos do mockup sem a tela para recompor com a Home atual.
- **Slide 10, captura da página do Header:** a imagem (`Recorte / Interface + documentação`) mostra o Header antigo com Organizar e Guardar em teal. É imagem que não criei nesta rodada; trocar por uma captura atual da página do Header no Storybook.
- **README, `docs/assets/hero-storybook.png` e as grades:** capturas antigas do Storybook; vale reconferir se ainda representam o site.
- **Narrativa:** o slide 03 fecha com "Próximo passo: 3 a 5 pessoas, as mesmas 3 tarefas" (o reteste), enquanto o reteste ficou de fora desta fase. Decidir se mantém como próximo passo honesto ou troca por outra frase.

## Regra nova
Não sobrescrever preenchimento de imagem de nó do Figma sem saber o que ele é; guardar o hash antigo (memória do projeto).
