---
tags: [design-system]
---

# Fonte Figma

Toda a implementação é reconciliada contra um arquivo Figma real, via MCP do Figma.

| Campo | Valor |
| --- | --- |
| Arquivo | `KanDrive V0.2.1` (auditoria/consolidação 2026-09-23; o original `KanDrive` `oFp2TLeCG4GJeCOFVhBvjg` fica congelado como referência) |
| File key | `2g7udqxWbGA8F9Or7PGNg3` |
| Página principal | "✨Design System" — nodeId `1421:17272` |
| URL | `figma.com/design/2g7udqxWbGA8F9Or7PGNg3/KanDrive-V0.2.1?node-id=1421-17272` |
| Conta MCP | Nand00 (fernandoluiz1312@gmail.com) |

## Estrutura de topo da página (V0.2.1)

Foundation/Brand · Foundation/Palette · Foundation/Typography · Foundation/Material - Liquid Glass · Foundation/Color Modes · Icons · Atoms · Molecules · Organisms · Templates (telas em 📐Pages: seções "Pages - White" e "Pages - Dark")

## Protocolo obrigatório (Regra 11)

Antes de marcar qualquer componente como verificado:

1. `get_design_context` no node real — nunca só `get_metadata` ou leitura antiga.
2. Screenshot real via Playwright (`iframe.html?id=<story-id>&viewMode=story`) — nunca assumir pelo código.
3. Checklist elemento-a-elemento (ícones, texto, cor, espaçamento, fundo, bordas) contra o screenshot renderizado.
4. Nunca inventar elemento não confirmado — marcar 🧩 *Inferido* ou omitir.

Ver [[Regra 11 - Protocolo de Verificação]] pro histórico completo (isso existe porque uma auditoria rasa em 2026-08-11 deixou passar botões/barras inventados).

## Legenda usada em toda a documentação

| Símbolo | Significado |
| --- | --- |
| ✅ Figma-confirmado | Lido direto de `get_design_context`/`get_variable_defs` |
| 🔒 Decisão travada | Vem literalmente de `AGENTS.md` |
| 🧩 Inferido | Extrapolado, não é literal do Figma |
| ⚠️ CONFLICT | Diverge de uma regra travada — ver [[Conflitos Abertos]] |

## Padrão de "componentes com descrição capturada"

85 dos 87 arquivos de componente citam "Figma-confirmado" no JSDoc — sempre que o Figma tinha um campo de descrição preenchido, foi capturado **verbatim**, nunca parafraseado (Regra 9). As 2 exceções são `ui/button.tsx` e `atom/IconActionButton`, primitivos internos sem node Figma próprio (o denominador de 87 exclui `tokens/color-swatch.tsx`, um utilitário de doc interno, não um componente do catálogo). Contagem real refeita em 2026-08-16 via `grep -rl "Figma-confirmado" src/components --include="*.tsx"`. Auditado explicitamente na [[Sessão 2026-08-15]].

## Ver também

- [[Regra 9 - Figma-confirmado vs Inferido]]
- [[Regra 11 - Protocolo de Verificação]]
- [[Camadas Atômicas]]
