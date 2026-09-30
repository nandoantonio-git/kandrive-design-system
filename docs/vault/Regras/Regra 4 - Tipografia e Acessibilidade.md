---
tags: [regra, travada]
---

# Regra 4 — Tipografia e Acessibilidade

Figtree, escala Major Third (1.25). Política de exceção de 16px (atualizada 2026-08-10):

- **Piso de 16px obrigatório** — body, labels de botão/input, links (texto de leitura/ação primária).
- **Exceção só pra microtexto genuinamente decorativo/complementar** — badge, tag, caption, timestamp. **Revisada em 2026-09-30 (auditoria UX): piso de 12px** (antes ~11px), sempre em `rem` (não `px` fixo — é isso que o WCAG 1.4.4 realmente exige: escalar com o zoom do navegador).
- **Escala de 3 degraus (2026-09-30):** 16px corpo, botão e link; 14px apoio (descrições, metadados, itens de lista); 12px microtexto. No Figma: `Type/Body/MD*` (16), `Type/Body/SM*` (14) e `Type/Body/XS*` (12), com variantes Regular, Medium e Bold; `Type/Tag` e `Type/Caption/SM` também em 12. Texto de ícone (glifos SF Symbols) não entra na escala.
- Nunca abaixo do piso como único portador de informação essencial.

## Correções já aplicadas (US-011)

`Type/Button/MD` (14px Figma) → 16px, código. `Type/Tag` (8px Figma) → 11px, código — ambos porque não se qualificam como exceção (ação/rótulo funcional, não decoração pura).

## Ver também

- [[Tipografia]]
- [[Conflitos Abertos]]
