# Materials — histórico de auditoria

Espelha o conteúdo de processo removido de `stories/tokens/Materials.mdx`
em 2026-08-18 (mesma separação já feita pros componentes em 2026-08-15).

## Reconciliação com o Figma (2026-08-09)

Os valores da spec vêm de `get_variable_defs` na seção "Material - Liquid
Glass" (nó `1431:17276`, component sets `Liquid Glass - Large/Medium/Small`,
Mode=Dark/Light), mais os tokens de cor de efeito (`effect-glass-*`,
`effect-overlay-*`) lidos na seção Pallete e confirmados em uso em
`molecule/SearchBar`. Substitui a versão anterior desta página, que era
100% inferida por falta de acesso ao Figma.

## Achado não incluído na spec (2026-08-09) — revisto em 2026-08-19

O nó da seção Material também retornou `Component Fill` (`#f5f5f5`),
`Subcomponent Fill` (`#aaaaaa`) e `Subcomponent Stroke` (`#00000066`) —
nomes genéricos sem prefixo `Liquid Glass`/`effect-glass`, tratados então
como prováveis fills de placeholder do symbol de demonstração `BG - Large
UI` (`1439:16862`), não tokens do material em si.

**Revisão de 2026-08-19 (achado do usuário)**: componentes com Liquid
Glass sem nenhuma borda liam como "vidro borrado sem definição" — a
ausência de `Subcomponent Stroke` explicava exatamente isso. Reclassificada
de "provável placeholder" pra "borda real do material" — ver seção
"Borda" no `.mdx` ativo. `Subcomponent Fill` (`#aaaaaa`) segue fora da
spec (é fill do symbol de demonstração, não do vidro em si — o fill real
já vem de `effect-glass-*`).

## Anatomia — raciocínio por trás da conclusão de 5 camadas

A conclusão de que o material é composto por 5 camadas empilhadas
(backdrop, glass, tint, borda/highlight, conteúdo) combina achados de
níveis de confiança diferentes:

1. **Backdrop** — 🧩 inferido como conceito (o Figma não nomeia a camada
   de backdrop separadamente, mas `Liquid Glass/Frost-*` e `Refraction`
   só fazem sentido operando sobre um backdrop).
2. **Glass** — ✅ Figma-confirmado (`type: GLASS, radius: 10`,
   `Refraction: 100`, `Dispersion: 0`, modulado por `Depth`/`Splay`/`Frost`).
3. **Tint** — ✅ Figma-confirmado a existência das variáveis
   `effect-glass-*`; 🧩 inferido o mapeamento exato de qual tint vai em
   qual tamanho/modo (não extraído variante-a-variante nesta
   reconciliação).
4. **Borda/highlight** — 🧩 inferido a partir de `Liquid Glass/Light
   Angle: -45`; a implementação exata (largura/opacidade) não tem
   variável própria identificada — pode estar embutida no efeito nativo
   `GLASS`, não exposta separadamente.
5. **Conteúdo** — sem token de material próprio, segue `Tokens/Colors`/
   `Tokens/Typography`.
