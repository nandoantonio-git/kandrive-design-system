---
tags: [regra]
---

# Regra 12 - Sem Travessão

Decisão do usuário (2026-09-29): **nada de travessão (—) no texto que o usuário lê.**

## Onde vale

- Telas e componentes do Figma (texto de interface).
- Textos do app no código (`src/`: rótulos, mensagens, FAQ, avisos).
- Slides do Case Study.

## Onde não vale

- Vault, prosa das páginas do Storybook e comentários do código. As anotações técnicas da Design System (Color Modes, Typography) também ficam como estão.

## Como substituir

Reescrever a frase, não trocar o sinal por outro parecido:

| Uso do travessão | Troca | Exemplo |
|---|---|---|
| Explicação depois de um rótulo | dois-pontos | "1. Organizar: aplique um template…" |
| Duas ideias completas | ponto final | "Não necessariamente. A opção reúne…" |
| Continuação da mesma ideia | vírgula | "…combinar métodos, ou seja, …" |
| Nome e dado (planos) | ponto médio `·` | "Starter · 1 TB" |
| Mensagem de sucesso | exclamação | "Prontinho! Seus arquivos estão guardados no longo prazo." |

O padrão fixo de sucesso passou de "Prontinho — " para **"Prontinho! "** (ver [[Tom de Voz e Personalidade da Marca]]).

## Aplicado em 2026-09-29

- Código: `mobile-success.tsx`, `settings-page.tsx`, `faq-info-card-collapsed.tsx` (e o "Ver duplicados" do FAQ, que estava desatualizado, virou o caminho real: Status de armazenamento → "Liberar espaço" → "Arquivos duplicados").
- Figma: 14 textos em componentes da Design System, 99 nas telas da 📐Pages (claro e escuro) e a frase do padrão na 👾Design Language. Os slides do Case Study não tinham travessão.

Ver [[Regra 5 - Terminologia]].
