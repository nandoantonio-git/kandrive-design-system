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
