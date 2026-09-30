---
tags: [componente, organism]
---

# Sidebar

`organism/Sidebar` (`1421:17946`) — navegação lateral persistente.

- **Código:** `src/components/organisms/sidebar.tsx`

## Composição

Linha de colapsar (própria, acima) + botão "Adicionar" (linha separada abaixo, nunca compartilhando linha — requisito explícito do usuário) + páginas (Pessoal/Compartilhados/Recentes/Favoritos/Guardados/Lixeira) + Etiquetas + `StorageSidebar` embutido.

## Largura — 212px no Desktop (2026-09-30)

Desde 2026-09-30, a barra ocupa as colunas 1 e 2 do `Grid/Desktop` do Figma (1440px, 12 colunas, margem 24, gutter 24): `desktop:w-[212px]`, em todas as vistas (a vista Colunas deixou de usar 150px). Com 212px, "Gerir espaço" e "Comprar espaço" ficam um sobre o outro. Histórico abaixo.

### Antes: `w-72` (288px)

Ajustada de `w-60` (240px) em 2026-08-15: os botões de CTA de armazenamento ("Gerir espaço"/"Comprar espaço") não têm `whitespace-nowrap`, então em espaço apertado quebravam pra 2 linhas (o texto encolhia até a palavra mais longa, não a frase inteira, por padrão de flexbox). Corrigido com largura maior + `whitespace-nowrap` nos 2 botões, como cinto e suspensório.

## Terminologia — "Gerir espaço", nunca "Liberar espaço" aqui

Desde 2026-09-29 o botão leva à página Status de armazenamento; o modal [[CleanSpaceStorage]] abre pelo "Liberar espaço" dessa página. Ver [[Regra 5 - Terminologia]].

## Ver também

- [[Header]]
- [[Regra 5 - Terminologia]]
