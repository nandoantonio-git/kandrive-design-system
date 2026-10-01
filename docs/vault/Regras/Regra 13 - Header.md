---
tags: [regra, travada]
---

# Regra 13 - Header

Decisão do usuário (2026-09-30), baseada no teste de usabilidade: **Organizar e Guardar são os dois destaques do Header e ficam em teal com texto branco.**

## Por que

O teste apontou falta de ênfase nas duas ações principais do produto. Na auditoria UX (A2) elas foram para contorno, para deixar Adicionar como único primário, e isso reduziu o destaque que o teste pedia. A decisão voltou: a ênfase das duas ações pesa mais que ter um só primário no Header.

## O que vale

- **Header, variante `page=Navbar`:** Organizar e Guardar usam o estilo primário (teal, texto e ícone brancos). Código: `Button` sem `variant`. Figma: `atom/PushButton` `Style=BorderedColored`, com o ícone do `atom/IconButton` pintado com `Text/OnDark`.
- **Mesma aparência em todas as telas** (Home, Configurações, Armazenamento; Desktop, Tablet e Mobile; claro e Dark).
- **Tablet:** só o ícone aparece; o rótulo volta a partir do Desktop. A cor não muda.
- **Altura e espaços:** 40px de altura, 8px entre ícone e rótulo, 24px entre os botões.

## O que não muda

- **Adicionar** segue primário na barra lateral. Organizar e Guardar estarem em destaque no Header não tira esse papel, porque ficam em regiões diferentes da tela.
- **"Comprar espaço"** só aparece a partir de 80% de uso (A2), e o aviso de limite atingido segue com o botão principal de compra.
- **`ContextHeader`** (barra de seleção) continua com os ícones Organizar e Guardar no lugar de Compartilhar.
- Qualquer outro botão da tela fica em contorno ou secundário, para não competir com o par do Header.

## Como verificar

- Código: `src/components/organisms/header.tsx`; as histórias do Header e os testes de interface com axe (contraste de branco sobre teal).
- Figma: página Design System, `organism/Header`, as 6 variantes; as telas herdam do componente.

Ver [[Header]], [[Auditoria UX Sênior (2026-09-30)]] (A2) e [[Regra 3 - Cores da Marca]].
