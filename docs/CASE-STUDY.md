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

## Teste de usabilidade — resultados

4 participantes, 3 tarefas, tempo medido contra uma expectativa prévia:

| Tarefa | Tempo médio | Esperado | Desvio |
| --- | --- | --- | --- |
| Organizar acervo | 6min53s | 5min | **+38%** |
| Consultar Status do Armazenamento | 2min03s | 1min30s | **+37%** |
| Arquivar para longo prazo + validar no status | 2min50s | 2min | **+42%** |

**Organizar acervo** — dificuldade/fricção em 4 de 4 participantes; o
modelo mental de pastas ainda é mais forte que a função de organização
assistida, que precisa ficar mais evidente.

**Status do armazenamento** — poucos erros formais, mas o rótulo "Global"
não comunicava bem a soma entre acesso rápido e longo prazo.

**Arquivar para longo prazo** — os participantes entenderam o benefício
(economizar espaço, recuperar depois), mas ficaram inseguros sobre o
resultado da ação: quais arquivos foram movidos, pra onde, e como
recuperar. Um dos participantes associou "guardar" a proteção mas teve
dificuldade de leitura/encontrabilidade da ação; outro só encontrou o
caminho depois de explorar a interface.

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

Essas decisões viraram requisitos de conteúdo/terminologia diretamente
verificáveis nos componentes deste design system — ver `Regra 5 —
Terminologia` no histórico de auditoria e as páginas `Tokens/Colors` e
`Organisms/StorageStatus`/`PlanSelection` no Storybook.

## Síntese

A oportunidade do KanDrive não está em oferecer mais espaço — está em
tornar o armazenamento de longo prazo **compreensível, confiável e
acionável**. A pesquisa revelou um mercado acostumado a improvisar com
várias nuvens e HDs, dores reais de perda/bagunça/custo, e confirmou que a
proposta de arquivamento de longo prazo é compreendida quando bem
explicada — mas exige uma interface muito clara sobre o que será guardado,
onde vai ficar e como pode ser recuperado.
