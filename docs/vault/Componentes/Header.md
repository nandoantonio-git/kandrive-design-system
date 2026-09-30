---
tags: [componente, organism]
---

# Header

`organism/Header` (`1421:19918`) — cabeçalho fixo do topo, 3 variantes por página (`Navbar`/`settings`/`storage`).

- **Código:** `src/components/organisms/header.tsx`

## Fluxo ao vivo (só `page="navbar"`)

2 ações reais: **"Organizar"** (ícone `ICONS.Organize`) e **"Guardar"** (ícone `ICONS.Keep`, corrigido em 2026-08-15 — usava `Bookmark` por engano; o real, confirmado via `get_design_context` no node do botão, é um glifo "keep" — bandeja com seta pra baixo, `src/assets/icons/Keep.svg`).

## Logo

`src/assets/logo/kandrive-logo.svg` — vetor real exportado do Figma (`Kandrive_logo_principal 1`), não texto estilizado. Achado de auditoria antigo (2026-08-11): a versão anterior usava "Kandrive" em texto `text-brand-teal` em vez do vetor real.

## Terminologia

"Guardar" é termo aprovado (Regra 5). "Organizar" não está na lista travada nem é proibido — gap de cobertura baixo, registrado em [[Conflitos Abertos]].

## Ver também

- [[PushButton]]
- [[Regra 5 - Terminologia]]

## Atualização (2026-09-30)

- O logo é um link para o início (`homeHref`, `onLogoClick`), com rótulo "Kandrive, ir para o início".
- Organizar e Guardar: 40px de altura, 8px entre ícone e rótulo, 24px entre os botões (Figma). Os ícones Guardar e Etiquetar animam no hover do botão, com o estado Hover que o Figma define.
- No Figma, as variantes Tablet tinham os nomes trocados; foi corrigido: `Page=Home, Device=Tablet` tem os botões, `Page=Settings, Device=Tablet` não. A variante `HomeAlt`, sem uso, foi apagada.
- A animação dos ícones Organizar e Guardar mora no `atom/IconButton` (`174:384`, Style=OnDark, Default → Hover, smart animate 300ms ease-out), que é o ícone dos dois botões do Header no Figma. O Organizar do Header passou a usar `OrganizeIcon` (desenho do `IconButton`, sem a seta do `atom/Icon/Organize`), animado; o Guardar passou para ease-out.
- A engrenagem e o ? levam às Configurações e ao FAQ em todas as telas Desktop do protótipo.
- Grid Desktop (2026-09-30): logo nas colunas 1 e 2 (212px), busca nas colunas 3 a 7 (566px, 260→826), Organizar e Guardar a partir da coluna 8 (850), `ActionPill` terminando em 1416. No Figma, as variantes Desktop usam `itemSpacing` 24 com dois espaçadores invisíveis (`Espaço/Logo` e `Espaço/Direita`), sem mexer nas ligações do logo. No código, acima de 1440px o padding acompanha o `--container-page`.
