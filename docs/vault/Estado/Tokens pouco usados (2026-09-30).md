# Tokens pouco usados (2026-09-30)

Auditoria UX, M5: dos 121 papéis de `Color`, 13 têm até 3 usos nas telas e nos componentes do Figma. Decisão do usuário: **não podar**. Este quadro explica por que cada um existe.

| Papel | Usos | Por que fica |
| --- | --- | --- |
| `Logo/Symbol/Stop1` a `Stop4` | 2 cada | Paradas do degradê do símbolo do logo. Usadas só no logo, mas o logo precisa delas nos dois temas. |
| `Brand/Primary/Action/Hover` | 2 | Estado de hover do botão principal. Um estado sem uso hoje não deixa de ser parte do sistema. |
| `Feedback/Danger/Disabled` | 2 | Estado desativado do botão destrutivo. |
| `Text/OnDark/Disabled` | 3 | Texto desativado sobre fundo escuro. |
| `Border/Button/Ghost` | 3 | Borda do botão sem preenchimento. |
| `Feedback/Success/Subtle` | 3 | Fundo suave do aviso de sucesso, par de `Feedback/Danger/Subtle` e `Warning/Subtle`. |
| `Surface/Fixed/Dark/Elevated` | 3 | Superfície elevada fixa do tema escuro (não muda com o modo). |
| `Effect/Glass/Surface/Dark` | 3 | Vidro escuro, parte do material Liquid Glass (Regra 10). |
| `Storage/FastAccess` e `Storage/Ready` | 2 cada | Cores do Armazenamento (acesso rápido e "pronto para guardar"). |

**Regra prática:** papel de estado (Hover, Disabled, Subtle) e papel de marca ficam mesmo sem uso frequente. Só se poda papel que não tem estado nem marca nem material por trás, e hoje nenhum dos 13 cai nessa regra.
