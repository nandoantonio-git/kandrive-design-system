---
tags: [estado, plano]
---

# Plano da página Design Language (2026-09-29)

Pedido do usuário: analisar a página `👾Design Language` (`1594:8007`), propor um plano para alinhá-la ao estado atual do produto e deixar um slide introdutório (metade imagem, metade texto). A skill `img-to-html` não está instalada; usei a captura da página inteira e descrevi cada bloco em wireframe de texto, sem código. **Só o slide introdutório foi criado. **Atualização:** a mesa foi reorganizada em 5 seções (Marca, Mascote Kan, Cor, Tipografia, Iconografia), só movendo as peças, e os layers ganharam nome; As seções `06 · Materiais (Liquid Glass)` e `07 · Voz e tom` também foram criadas, com conteúdo que já existia (Design System e vault). A seção de ícones em vetor continua dependendo dos arquivos originais; por decisão do usuário, só nomeamos.** O resto é plano, esperando aprovação.

## Como a página está hoje (wireframe)

A página é uma mesa de trabalho de ~47.000 × 24.000 px, sem seções nem títulos. O que existe, de cima para baixo e da esquerda para a direita:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [logo vertical, pequeno]        [LogoHorizontal — instância enorme 17761×4403] │
│                                                                            │
│ [5 rostos do Kan: feedback]     ┌─ mosaico de 9 retângulos, sem legenda ─┐  Aa │
│ [K em selo branco]              │ teal grande │ teal │ rosa escuro     │  Figtree
│ [3 wireframes de logo/favicon]  │             │ azul │ rosa claro      │  abcdef…
│ [favicon claro/escuro + K]      │ branco │ grafite │ preto │ cinza     │  1 2 3 …
│ [5 ícones: guardar, organizar,  └─────────────────────────────────────┘
│  agrupar, etiquetar, home]
│ [3 símbolos: cofre · V · ∞  (versões cor e branca)]
│ [3 mascotes "escondidos": escuro / primária / claro]
└────────────────────────────────────────────────────────────────────────────┘
```

Detalhes verificados:

- **Logos:** o horizontal e o vertical são componentes (`foundation/LogoHorizontal`, `foundation/LogoVertical`, com variáveis `Logo/*`), mas estão soltos, sem legenda, sem versão sobre fundo claro/escuro lado a lado e sem área de proteção ou tamanho mínimo.
- **Cores:** são 9 retângulos, todos ligados a variáveis, mas sem nome, hex nem legenda visíveis. As variáveis existem (`Brand/*`, `Neutral/*`, `Logo/*`, `Storage/*`, claro e escuro), e a página só mostra a cor, não o que ela é.
- **Tipografia:** só o espécime "Aa Figtree". Faltam a escala (Major Third, 1,25), o piso de 16px, e os pesos usados.
- **Ícones e mascotes:** todos são retângulos com **imagem raster** (17 confirmados: as "Pranchetas" do Illustrator/Photoshop), sem nome de componente. Os ícones proprietários são 5 (Guardar, Organizar, Agrupar, Etiquetar, Home) e faltam os que o produto já usa (por exemplo o de Resgatar). O "Migrar ícones de PNG para SVG" continua em aberto.
- **Materiais, voz e tom:** ausentes. O Liquid Glass está só na Design System e no Storybook; a voz do Kan (o "Prontinho — ", o modo sóbrio) está só no vault.
- **Movimento:** o vídeo `Kandrive motion 1` mora na página Case Study, não aqui (a página 🎊Motion existe).

## Distância para o estado atual

| Área | Estado atual do produto | Na página | Distância |
|---|---|---|---|
| Logos | Horizontal e vertical com variáveis `Logo/*`, Light/Dark | Presentes, soltos | Falta legenda, uso, versões Light/Dark |
| Símbolo/favicon | `foundation/Favicon` no app e no Storybook | Presentes, sem legenda | Falta legenda e escala |
| Cores | ~80 variáveis com hierarquia (família › grupo › token) | 9 retângulos ligados às variáveis, sem legenda | **Grande** (só falta mostrar nome, hex e papel) |
| Tipografia | Figtree, escala, piso de 16px | Só o espécime | Média |
| Materiais | Liquid Glass (Storybook: Tokens/Materials) | Ausente | **Grande** |
| Ícones | Proprietários + lucide + Resgatar | 5 rasters | Média (e são imagens, não vetor) |
| Mascote Kan | 3 versões, tom de voz, feedback | Imagens sem contexto | Média |
| Voz e terminologia | Regra 5, Tom de voz (vault) | Ausente | **Grande** |

## Plano proposto (por seção, na ordem de leitura)

Cada passo só move, nomeia ou monta com o que já existe; nada é inventado. Cada um termina com uma captura para conferir.

0. **Introdução** — ✅ feito (`00 / Introdução — Design Language`, `3287:76`, no topo da página): metade imagem (`foundation/LogoVertical` sobre `Neutral/Surface/Dark/Base`), metade texto ("O que dá voz e forma ao Kandrive" + a mensagem e o benefício da marca).
1. **Marca** — logo horizontal, vertical, símbolo e favicon lado a lado, cada um com nome do componente, versão Light e Dark, e área de proteção/tamanho mínimo (as construções `wireframe-logo`, `wireframe-logo grid` e `whireframe-favicon` já existem e servem de base).
2. **Mascote Kan** — as 3 cores ("escondido"), os 5 rostos de feedback, e a frase da personalidade (canguru guardião, o bolso como metáfora).
3. **Cor** — manter as amostras (já ligadas às variáveis) e acrescentar nome, hex e papel, claro e escuro, na hierarquia do Figma (a mesma da página `Tokens/Cores` do Storybook).
4. **Tipografia** — Figtree com a escala real (`Type/*`), pesos e o piso de 16px.
5. **Materiais** — Liquid Glass (claro e escuro) usando a instância existente, com o link para `Tokens/Materials`.
6. **Iconografia** — ícones proprietários e símbolos de marca (cofre = segurança, V = organização, ∞ = longevidade), agrupados e nomeados. **Depende de decisão:** os ícones são rasters, e vetorizar exige os arquivos originais (AI/SVG) ou o redesenho, que é design novo.
7. **Voz e tom** — um resumo visual da definição (tom padrão × modo sóbrio, o "Prontinho — ", os termos do produto), sem texto novo: só o que já está no vault.

Sequência sugerida: 1 → 3 → 4 (o essencial e sem risco), depois 2, 5, 7. O 6 espera a resposta sobre os originais dos ícones.

## Decisões que preciso de você

1. Aprova a ordem e as 7 seções?
2. Ícones: você tem os originais vetoriais (AI/SVG), ou mantemos os rasters e só nomeamos?
3. Posso reorganizar a mesa (mover as peças para dentro de seções nomeadas, sem alterá-las)? É o que dá a ordem de leitura.

Ver também: [[Fechamento da entrega (2026-09-28)]], [[Tom de Voz e Personalidade da Marca]].

## Atualização (2026-09-29, fim do dia)

- Nova seção **`08 · Patterns`** com os 12 fundos da marca, cada um com nome e orientação de uso. O 05 aparece com o aviso de que o Kan dele não é o símbolo oficial (ver [[Patterns]]).
- O slide de introdução (`3287:76`) não existe mais na página; parece ter sido removido pelo usuário. Por isso a troca de fundo dele pelo 09 · Escuro premium não foi feita.
