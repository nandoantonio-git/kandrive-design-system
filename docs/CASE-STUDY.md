# Case study — pesquisa de UX por trás do KanDrive

> Este documento resume a pesquisa de UX que fundamenta as decisões de
> design implementadas neste design system. O produto conceitual (KanDrive)
> e a pesquisa completa nasceram de um projeto em equipe — código-fonte
> original em [nexus](https://github.com/thomasreichmann/nexus). Este
> repositório é a implementação do design system em Storybook a partir
> dessa pesquisa, incluindo a auditoria de fidelidade Figma↔código
> documentada no [README](../README.md).

## O problema

Pessoas comuns, criadores de conteúdo, fotógrafos/videomakers e
escritórios burocráticos lidam com volumes crescentes de arquivos
digitais, mas usam soluções fragmentadas para guardar, organizar e
recuperar esse material. A pesquisa mostrou que o problema não era só "ter
espaço na nuvem" — era **como guardar muitos arquivos por muito tempo, de
forma compreensível, segura e economicamente viável**, sem exigir que o
usuário entenda conceitos técnicos de armazenamento (acesso rápido vs.
longo prazo, arquivo frio, etc.).

## Metodologia (resumo)

A pesquisa combinou quatro métodos:

- **Desk research** — mapeamento de competidores (Google Drive, Dropbox,
  OneDrive, iCloud, pCloud): fortes em conveniência/integração, fracos em
  armazenamento massivo de longo prazo com organização assistida.
- **Netnografia** — observação de comunidades de fotografia, audiovisual,
  privacidade e uso jurídico, revelando uso híbrido (múltiplas nuvens + HD
  externo), medo de perda de dados e organização manual por pasta/data.
- **Survey** — camada quantitativa: Google Drive/Fotos domina, a maioria
  usa mais de uma nuvem, preço e espaço são os fatores decisivos, e falta
  de espaço é a dificuldade mais citada.
- **Teste de conceito e usabilidade** — protótipo de média fidelidade
  testado com 4 participantes em 3 tarefas (detalhado abaixo).

## Personas

**Bruna — usuária comum.** Guarda fotos, vídeos, screenshots e documentos
pessoais no Google Drive/Fotos e iCloud. Modelo mental: "jogo tudo na
nuvem e confio". Precisa de organização automática e clareza sobre se suas
memórias estão seguras.

**Mariana — fotógrafa/videomaker autônoma.** Gera centenas de GB por
evento. Usa HD externo + nuvem numa "escada de backups" (bruto local,
selecionados na nuvem, cópias extras pra trabalhos importantes). Precisa
de clareza de custo e status de backup por projeto.

**Rafael — advogado / escritório burocrático.** Organiza por
cliente/processo; lida com documentos e provas digitais sensíveis.
Precisa de sigilo, controle de acesso, versionamento e retenção — pra ele
o armazenamento envolve risco jurídico, não só conveniência.

O slide 08 do Case Study liga cada persona ao que o protótipo entrega e ao que
ficou de fora: Bruna é atendida, Mariana em parte (custo e uso, sem status de
backup por projeto) e Rafael não é atendido neste recorte (sem compartilhar,
permissões e versões).

## Teste de usabilidade — resultados

Teste moderado com 4 participantes e 3 tarefas, num protótipo de média
fidelidade. Com uma amostra desse tamanho, o resultado é qualitativo: ele
mostra onde as pessoas travaram e por quê, não quanto a interface é mais
lenta que um padrão.

| Tarefa | O que aconteceu | Quantos |
| --- | --- | --- |
| Organizar acervo | Dificuldade ou fricção; tentaram criar pasta e mover arquivos antes de achar a função de organizar | 4 de 4 |
| Consultar o status do armazenamento | Poucos erros formais, mas o rótulo "Global" não dizia que era a soma de acesso rápido e longo prazo | Não registrado por participante |
| Guardar no longo prazo e conferir no status | Entenderam o benefício, mas ficaram inseguros sobre o resultado: o que foi movido, para onde e como recuperar | 2 casos descritos: um não achou a ação com facilidade, outro só achou explorando a interface |

**Tempos, como apoio.** Todas as tarefas levaram mais do que o esperado:
Organizar 6min53s (esperado 5min), Status 2min03s (esperado 1min30s) e
Guardar 2min50s (esperado 2min). O "esperado" é uma expectativa definida
pela equipe antes do teste, não uma referência externa nem uma medida de
especialista. Por isso os tempos servem para apontar onde houve atrito, e
não como percentual de desempenho.

**Organizar acervo.** O modelo mental de pastas ainda é mais forte que a
organização assistida, que precisa ficar mais evidente.

**Status do armazenamento.** O problema era de rótulo, não de fluxo:
"Global" não comunicava a soma dos dois tipos de armazenamento.

**Guardar no longo prazo.** A proposta foi compreendida; a insegurança
veio da falta de retorno depois da ação.

### O que ainda não foi validado

- **As decisões de design não foram retestadas.** As 7 decisões abaixo
  respondem ao que o teste mostrou, mas nenhuma passou por um segundo
  teste. O case mostra a causa e a resposta, não o efeito.
- **Sucesso por tarefa e erros por participante** não foram registrados
  de forma sistemática; o que existe é a observação da moderação.
- **Personas Mariana e Rafael.** Os participantes não foram recrutados
  por perfil, e as necessidades específicas delas (status de backup por
  projeto, sigilo, permissões e versões) ficaram fora do protótipo. Ver o
  escopo no slide 07 do Case Study.
- **Tablet e tema escuro** existem no design system, mas não foram
  testados com pessoas.
- **Próximo passo:** um reteste curto, com 3 a 5 pessoas, as mesmas 3
  tarefas e o protótipo atual, registrando sucesso, erros e tempo para
  comparar antes e depois.

## Principais problemas encontrados

- Organizar não é o primeiro caminho mental do usuário — muitos tentam
  criar pasta/mover arquivo antes de descobrir a função dedicada.
- Rótulos ambíguos ("Global", "Guardar", "Arquivar") geram dúvida.
- Ações importantes distantes do conteúdo que afetam (ex.: pílulas de
  Agrupar/Etiquetar longe dos itens).
- Falta de feedback pós-ação — depois de guardar arquivos, o usuário
  precisa saber o que mudou, pra onde foi e como recuperar.
- Legibilidade — fonte pequena/baixo contraste dificultava leitura,
  problema citado especialmente pensando em usuários mais velhos.

## Decisões de design derivadas

1. Rótulo **"Global" → "Total"** (mais literal, menos abstrato).
2. Reforçar hierarquia/visibilidade de **Organizar**, **Guardar**,
   **Restaurar**.
3. Aproximar ações do conteúdo que afetam.
4. Feedback explícito pós-arquivamento: quais arquivos, pra onde, quanto
   espaço liberado, como recuperar.
5. Melhorar contraste e tamanho de fonte.
6. Onboarding contextual só quando necessário — sem virar tutorial pesado.
7. Diferenciar claramente armazenamento ativo, longo prazo, guardado,
   backup e arquivo recuperável — cada um com terminologia própria, sem
   sobreposição.

No protótipo atual, as decisões 1, 3 e 4 aparecem assim: o rótulo **Total** no
Status; Organizar e Guardar na barra de seleção, junto dos arquivos (e em
contorno no Header, para que Adicionar seja o único botão principal); e o
prazo de resgate (e-mail em até 8h) em destaque antes de confirmar, com um
aviso depois de guardar. Nenhuma delas foi retestada com pessoas.

Essas decisões viraram requisitos de conteúdo/terminologia diretamente
verificáveis nos componentes deste design system — ver `Regra 5 —
Terminologia` no histórico de auditoria e as páginas `Tokens/Colors` e
`Molecules/Armazenamento/StorageStatus` e `Organisms/Armazenamento/PlanSelection` no Storybook.

## Síntese

A oportunidade do KanDrive não está em oferecer mais espaço — está em
tornar o armazenamento de longo prazo **compreensível, confiável e
acionável**. A pesquisa revelou um mercado acostumado a improvisar com
várias nuvens e HDs, dores reais de perda/bagunça/custo, e confirmou que a
proposta de arquivamento de longo prazo é compreendida quando bem
explicada — mas exige uma interface muito clara sobre o que será guardado,
onde vai ficar e como pode ser recuperado.
