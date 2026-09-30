---
tags: [moc, home]
---

# Kandrive Design System

Vault de documentação viva do **kandrive-design-system** — o design system Storybook do Kandrive, um SaaS de armazenamento frio/longo-prazo sobre AWS S3 Glacier. Gerado a partir do estado real do código, do Figma e do histórico de decisões em `2026-08-15`.

> [!info] Como usar este vault
> Cada nota tem link pra Figma (quando aplicável), pro código-fonte real e pras notas relacionadas. Comece por aqui, siga os links. Quando o código mudar, essas notas precisam ser atualizadas manualmente — não há sincronização automática (ver [[Sessão 2026-08-15]] pra saber o que motivou cada decisão registrada).

## Mapa geral

- [[Athena Framework]] — o scaffold que constrói este projeto (Ralph Loop, skills, memória)
- [[Ralph Loop]] — como as user stories viram código sozinhas
- [[Stack Técnica]] — React 19, Tailwind v4, Storybook 10, Vite
- [[Estrutura de Pastas]]
- [[Deploy (Vercel)]]

## Design System

- [[Camadas Atômicas]] — atoms → molecules → organisms
- [[Fonte Figma]] — onde tudo isso vem
- [[Tokens de Cor]]
- [[Tipografia]]
- [[Liquid Glass]] — o material visual do produto
- [[Logo]] — o Kan (canguru) e as cores do logo por modo
- [[Responsividade]] — breakpoints, navegação por faixa, mão dominante, toque

## Regras travadas (AGENTS.md)

As regras abaixo são a "constituição" do projeto — qualquer achado do Figma que contradiga uma delas é **conflito a registrar**, nunca a resolver sozinho.

- [[Regra 1 - Botão Único]]
- [[Regra 2 - Nomenclatura de Tokens]]
- [[Regra 3 - Cores da Marca]]
- [[Regra 4 - Tipografia e Acessibilidade]]
- [[Regra 5 - Terminologia]]
- [[Regra 6 - Segmentação de Armazenamento]]
- [[Regra 7 - Gaps Conhecidos]]
- [[Regra 8 - Fluid Interface]]
- [[Regra 9 - Figma-confirmado vs Inferido]]
- [[Regra 10 - Liquid Glass]]
- [[Regra 11 - Protocolo de Verificação]]
- [[Regra 12 - Sem Travessão]]

## Marca e tom de voz

- [[Tom de Voz e Personalidade da Marca]] — personagem, arquétipo, dimensões de tom, regras de copy (fonte: projeto Claude Kandrive, não AGENTS.md/Figma — ver nota de proveniência na própria página)

## Componentes-chave

Ver [[Camadas Atômicas]] pro catálogo completo (84 componentes). Notas próprias só pros mais centrais/complexos:

- [[PushButton]] · [[SearchInput]] · [[Sidebar]] · [[Header]]
- [[CleanSpaceStorage]] · [[FileList]] · [[StorageStatus]]
- [[OrganizeFreeModeCanvas]] · [[PlanSelection]] · [[UploadPopover]]

## Estado do projeto

**Atual (2026-09-30):**

- [[Auditoria final (2026-09-30)]]: gate, paridade Figma × código, Storybook, vault e protótipo, com o que ficou para o usuário
- [[Plano dos 16 componentes sem página (2026-09-30)]]: os 12 componentes extraídos em 3 lotes e os 4 sem uso
- [[Auditoria UX Sênior (2026-09-30)]]: olhar de portfólio sobre narrativa, evidência, IA, interação, acessibilidade e sistema; 4 críticos, 8 altos e plano em 3 ondas
- [[Plano da taxonomia de variáveis (2026-09-30)]]: três coleções no Figma (Primitives, Color, Dimension), junções e a tabela de renomeação, em aprovação
- Changelog: `CHANGELOG.md` na raiz do projeto é a fonte; aparece na página Changelog do Storybook e na página 📝 Changelog do Figma (por versão do Figma e por dia)
- [[Plano das pendências (2026-09-29)]]: o que foi decidido e feito na revisão final
- [[Histórico das docs do Storybook (até 2026-09-30)]]: o histórico de auditoria que saiu das páginas do Storybook
- [[Teste do protótipo claro (2026-09-29)]] e [[Mapa de interações (2026-09-29)]]: o protótipo navegável da 📐Pages
- [[Patterns]]: os 12 fundos da marca
- Páginas do Storybook: uma nota por página em `Páginas/` (a aba Docs das páginas saiu do Storybook)

**Histórico:**

- [[Backlog (User Stories)]] — 26/26 user stories concluídas
- [[Conflitos Abertos]] — achados Figma pendentes de decisão humana
- [[Sessão 2026-08-15]] — log da sessão que fechou US-026, branding, cores e 18 ajustes finos
- [[Glossário]] — terminologia aprovada/proibida

## Números atuais (2026-09-30)

| Métrica | Valor |
| --- | --- |
| Componentes no catálogo | 140 (40 atoms, 51 molecules, 33 organisms, 7 templates, 9 pages) |
| Histórias no Storybook | 491, todas com o axe; as interativas têm teste de interação |
| Organização do Storybook | atomic design com grupos por função em cada nível (ex.: `Atoms/Ações`, `Molecules/Armazenamento`); Pages na ordem da jornada |
| Regras | 12 (a 12 é "sem travessão" no texto que o usuário lê) |
| Gate de validação | `tsc -b` + `oxlint` + `build-storybook` + `vitest --project=storybook` |
| Publicação | branch `main`, pelo Vercel |
