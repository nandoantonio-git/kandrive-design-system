# Spacing — histórico de auditoria

Espelha o conteúdo de processo removido de `stories/tokens/Spacing.mdx`
em 2026-08-18 (mesma separação já feita pros componentes em 2026-08-15).

## Sem seção própria no Figma (US-014)

Spacing não tem uma seção própria no Figma — `molecule/StorageBar`
(`1421:17904`), referenciado nos metadados desta página, é usado só como
amostra de referência visual, não como fonte da escala. A escala real vem
de `get_variable_defs`, ver nota seguinte.

## Reconciliação com o Figma (2026-08-09)

Diferente da versão anterior desta página (que documentava a escala
padrão de 4px do Tailwind, por não ter acesso ao Figma ainda), os valores
atuais vêm de `get_variable_defs` rodado nos componentes reais do
inventário US-002: `atom/PushButton` (`1421:17302`), `celule/chip/folder-tag`
(`1421:19040`), `molecule/SearchBar` (`1421:17857`), `organism/Sidebar`
(`1421:17946`). A escala Figma **não é** a escala padrão de 4px do
Tailwind — é uma escala própria, nomeada, com passo de 2px na base.

`celule/chip/folder-tag` (achado #5 do inventário US-002) usa
`Spacing/SM` (`6px`) e `Radius/Pill` — confirma que o chip referencia a
escala compartilhada, não um valor hardcoded.

## Nomenclatura mista (não é CONFLICT — nenhuma Regra trava a escala)

A escala real mistura nomes semânticos (`xs`/`sm`/`md`/`lg`/`xl`/`2xl`/`3xl`)
com passos numéricos (`spacing-1`, `spacing-2`, `spacing-10`, `spacing-20`)
— os dois sistemas coexistem no Figma sem um padrão único de nomenclatura.
