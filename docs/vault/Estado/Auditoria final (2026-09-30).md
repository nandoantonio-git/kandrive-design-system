---
tags: [estado, auditoria]
---

# Auditoria final (2026-09-30)

Escopo combinado com o usuário: gate automático, paridade Figma × código, vault e protótipo. A comparação visual foi feita nos componentes apontados pelo usuário e nos que divergiram na leitura; o restante foi conferido pelos vínculos com o Figma, não pixel a pixel.

## 1. Gate automático

| Checagem | Resultado |
|---|---|
| `tsc -b` | ✅ sem erros |
| `oxlint` | ✅ sem erros; 6 avisos antigos de `only-export-components` (arquivos que exportam constantes junto do componente), sem efeito no produto |
| `build-storybook` | ✅ |
| Testes (`vitest --project=storybook`, com axe) | ✅ 468 de 468. Numa das rodadas, 1 teste falhou e passou ao rodar de novo: intermitente, sem reprodução |

## 2. Paridade Figma × código

- **Vínculos:** as 127 páginas de componente apontam para 124 nós do Figma. 122 existiam; 2 tinham sido apagados e foram religados: `atom/CloseButton` (agora `313:22753`) e `atom/ImageItem`, consolidado no `atom/FileTypeIcon` (`1444:21914`, Type=Image). Duas páginas (`Pages/Onboarding` e `Pages/LongTermStorage`) não têm link Figma na página, só nas histórias.
- **Corrigido nesta rodada** (comparado com o Figma): Header (botões de 40px, 8px entre ícone e rótulo, 24px entre eles), ícones Guardar, Etiquetar e Home com o estado de hover do Figma, StorageStatus (legenda do total, "Liberar espaço" em todas as abas e "Comprar espaço" só no Total, cor do tier), Colunas da Home (recipiente com borda, duas colunas, barra lateral compacta, etiquetas no painel), PageLead (título Regular, não negrito), MiniMap, DropNewTag (sem borda), InfoPopover (conteúdo centralizado), TemplateReviewModalItem (espaçamento e largura), TypeLabel (Style=Dark sem fundo e transição de 150ms), PopoverNotification (horário à esquerda), FreeModeOutputNode (recolhe), canvas do modo livre ("Descartar" fecha o painel) e o Dialog ligado ao "Excluir conta".
- **No Figma, sem página no Storybook:** `atom/DisclosureHeader`, `atom/FreeModeButton`, `atom/SidebarOption`, `atom/SortButton`, `atom/Divider`, `atom/FileTypeIcon`, `molecule/MenuItemFloating`, `molecule/SearchHeader`, `molecule/StorageStatusHeaderSelector`, `molecule/SkeletonRow`, `molecule/SelectBox`, `organism/DropdownMenuSimple`, `organism/Footer`, `organism/StorageStatusSection`, `organism/PlanCard` e `organism/PageToolbar`. Vários existem no código como parte de outro componente (a barra da Home, o cabeçalho do StorageStatus, o seletor de Configurações); os `SearchBar*` são decisão já registrada (fora da marca). Fica para o usuário decidir quais merecem página própria.
- **No Figma:** as 20 instâncias que ainda apontavam para o `atom/Icon/TagSet` apagado foram trocadas por `atom/Icon/Label`.
- **Divergência mantida por decisão:** a legenda "(Acesso rápido+Longo prazo)" do StorageStatus aparece só no Total. O Figma a repete nas abas de tier, onde ela não é verdadeira.
- ~~**A conferir no Figma:** variantes Tablet do `organism/Header` com nomes trocados~~ ✅ Confirmado pelo uso nas telas e corrigido (2026-09-30): a variante com botões (usada em 26 telas de Home, Organizar, Storage e Guardar) passou a se chamar `Page=Home, Device=Tablet`, e a sem botões (22 telas de Configurações, FAQ e Pagamento), `Page=Settings, Device=Tablet`. As instâncias não mudaram. A variante `Page=HomeAlt, Device=Desktop`, sem nenhuma instância, foi apagada.

## 3. Storybook

- Reorganizado por função dentro de cada nível do atomic design (ex.: `Atoms/Ações`, `Molecules/Armazenamento`, `Organisms/Ajuda`), com os links internos atualizados. Pages na ordem da jornada (Login → Onboarding → Home → Organization → LongTermStorage → StorageStatus → Payment → Settings → Faq), e dentro de cada página Desktop → Tablet → Mobile.
- Histórico de auditoria retirado das 118 páginas de componente e movido para [[Histórico das docs do Storybook (até 2026-09-30)]]. Cada página agora abre com o nome e uma linha "Figma" com link. A página `Tokens/Unused` saiu (era um relatório de auditoria).
- Componentes só de mobile (MobileBottomNav, MobileTabBar, MobileFooterSettings) aparecem numa moldura de 390px também na Docs.

## 4. Vault

67 notas. 3 links quebrados corrigidos: um para uma nota `FolderTagChip` que não existe e dois para a regra "sem validação pixel a pixel", que mora na memória do assistente, não no vault.

## 5. Protótipo (claro)

- 1.250 ligações: 548 trocas de variante de componente, válidas; nenhum destino inexistente; nenhuma ligação do claro para o escuro.
- As 4 sobreposições (Excluir conta Desktop e Mobile, Adicionar menu, Falar com o suporte) são alcançadas.
- 19 fluxos nomeados. As telas sem entrada por ligação são as mesmas variações de estado já listadas em [[Teste do protótipo claro (2026-09-29)]] (loading, primeiro upload, plano recolhido, mão esquerda etc.), acessíveis pelos pontos de início.

## O que continua com o usuário

- ~~Decidir quais componentes do Figma sem página no Storybook ganham uma~~ ✅ decidido e feito: 12 extraídos em 3 lotes, 4 sem uso só registrados (ver [[Plano dos 16 componentes sem página (2026-09-30)]]).
- Conferir os nomes das variantes Tablet do `organism/Header`.
- Telas de estado sem entrada por ligação, posição das sobreposições e teste no modo de apresentação.
- Contraste por opacidade (ver [[Conflitos Abertos]]).

Ver [[Plano das pendências (2026-09-29)]].

## Depois da auditoria (2026-09-30)

- **Agrupar:** o hover era um fundo cinza por dentro da pílula (extensão do código). O Figma não tem hover no contêiner; tem a smart animation do `atom/Icon/Group` (300ms, ease-in-out): as três bolinhas convergem para o centro. O código agora faz isso, e o fundo interno saiu.
- **Revisar organização no Mobile:** virou folha de baixo por cima da seleção (decisão do usuário), no Figma (`Organize/ReviewSheet/Mobile`, aberta como sobreposição, com faixa escurecida que fecha e o ✕ que fecha; o ✓ segue para "Revisão concluída") e no código (`pages/organization-page.tsx`, com teste). O fluxo R agora começa na tela de Organização. A tela antiga `Organize/Review/Mobile` ficou no arquivo como referência, fora dos fluxos.
- **Token que faltava:** `--color-neutral-surface-background` não estava no tema do Tailwind, então a classe `bg-neutral-surface-background` não gerava nada (AppShell, Onboarding, molduras de mobile). Registrado.
- **16 componentes:** plano em [[Plano dos 16 componentes sem página (2026-09-30)]].

## Jornadas revisadas (2026-09-30, segunda rodada)

- `Organize/Review/Mobile` foi apagada a pedido do usuário; a folha `Organize/ReviewSheet/Mobile` ocupa o lugar dela.
- Ligações que faltavam: o "+" da barra de baixo do Mobile abre o menu Adicionar em 13 telas, acima do FAB e do lado da mão escolhida (o menu passou a ter posição manual, então cada ligação leva a posição relativa); o ✕ volta à Home em 5 telas de seleção; a aba Pessoal leva à Home Mobile em 17 telas; Etiquetar abre em 32 telas e fecha pelo próprio componente; os checkboxes marcam e desmarcam (interação no componente, herdada por todas as instâncias); a busca da área de soltar preenchida leva aos resultados.
- Resultado: 735 navegações, nenhum destino inexistente, 83 de 96 telas claras alcançáveis pelos fluxos (eram 78). As 13 restantes são variações de estado.
- Sem ação: os 8 botões de salvar das Configurações (não há tela de destino) e o breadcrumb "Home" na própria Home.

## Jornadas Desktop × Mobile (2026-09-30, terceira rodada)

- **Fluxos:** os de Tablet (Entrar, Configurações, Ajuda) e o do Escuro saíram; as telas continuam no arquivo. Os fluxos agora andam em pares com o mesmo nome, de A a J (Entrar, Primeiro acesso só no Mobile, Início, Organizar, Guardar no longo prazo, Gerir espaço, Limite atingido, Pagamento, Configurações, Ajuda), mais K e L só no Mobile (Erro de rede, Recuperação pendente). Novos: Desktop e Mobile de Início, Guardar e Gerir espaço no Mobile, Configurações, Ajuda e Pagamento no Desktop.
- **Desktop:** a engrenagem e o ? do Header levam às Configurações e ao FAQ em todas as telas (antes, só na Home). A camada do item "Excluir conta" da barra das Configurações tinha o nome "Idioma e região" e foi renomeada. No FAQ, cada tópico de "Nesta página" (`organism/Sidebar` Page=FAQ) rola a tela até ele.
- **Mobile:** o ≡ abre a gaveta em todas as telas (antes, só na Home), e a gaveta leva a Guardados, Armazenamento, Configurações e Ajuda. No FAQ, o Expandir e o Recolher trocam as telas, como no Desktop.
- **`FaqQuickLinks` virou variante:** `molecule/MobileFooterSettings` ganhou `Page=FAQ` com os 7 tópicos (um `Active` por tópico, no estilo das outras variantes). O componente solto foi apagado; tocar num chip rola até o tópico. No código, o `FaqTopicChips` (abaixo do título) saiu e o FAQ Mobile usa `MobileFooterSettings page="faq"` na base.
- **Barra "Nesta página" no código:** o FAQ Desktop e Tablet usava a Sidebar de arquivos. Agora usa `Sidebar pages="faq"` (Figma `Page=FAQ`, `1267:16661`, 212px e 140px), que marca e rola até o tópico.
- **Hover das Colunas no Tablet:** a linha (`molecule/FileList` CompactColumn e Compact, Device=Tablet) não tinha Hover e trocava para a variante Desktop de 560px, que quebrava a coluna. Foram criadas as duas variantes de Hover no tamanho do Tablet. A linha pressionada do Desktop voltava para a variante `Storage` e agora volta para a normal.
- **Animação do Organizar e do Guardar:** mora no `atom/IconButton` (`174:384`), Style=OnDark, Default → Hover, smart animate, 300ms, ease-out, e o Header já usa essas variantes. No código, o Guardar passou para ease-out e o Organizar ganhou o `OrganizeIcon` animado, com o desenho do `IconButton` (sem a seta do `atom/Icon/Organize`): o quadro cresce, o quadrado sobe para dentro dele e os dois ficam a 70%. No protótipo, a animação só dispara com o ponteiro sobre o ícone, porque o hover do botão troca a variante do `PushButton` por cima.

## Grid Desktop (2026-09-30)

- Causa: nas telas de arquivos (Home, Organizar, Longo prazo, Armazenamento), a `organism/Sidebar` estava instanciada na variante Tablet (150px), e cada tela compensava de um jeito (conteúdo em 198, 258 ou 324; margens de 22 a 48).
- Grid acordado: estilo `Grid/Desktop`, 12 colunas, margem 24, gutter 24 (colunas de 94px). Barra lateral nas colunas 1 e 2 (24→236, 212px), conteúdo nas colunas 3 a 12 (260→1416). No FAQ, a coluna "Atalhos" ocupa as colunas 11 e 12; no Pagamento, os planos ocupam 8 colunas (260→1180).
- Aplicado nas 58 telas Desktop (claro e Dark): barra na variante Desktop, contêiner e conteúdo nas colunas, Configurações e FAQ de margem 48 para 24, Header de volta a x=0 no Armazenamento/Longo prazo, conteúdo que passava da tela recortado ou a tela passou a acompanhar a altura, `ViewModeToggle` na largura do conteúdo, `PageLead` encostado na coluna 3, ilustração da `Home/FirstUpload` centrada na área de conteúdo e 5 modais vazios (altura 0) apagados no Armazenamento. Conferido por medição (todas as bordas nas colunas) e por captura.
- Pendente no código: o `AppShell` usa margem de 48 e 48 entre a barra e o conteúdo no Desktop, e a barra de arquivos tem 288px (150px na vista Colunas). O Figma agora é 24/24 com barra de 212px.

## Fechamento (2026-09-30)

- 140 componentes, 491 histórias, gate completo passando (`tsc -b`, `oxlint`, `build-storybook`, testes com axe).
- Todos os componentes do Figma que aparecem em alguma tela têm página no Storybook, exceto os `SearchBar*` (decisão registrada: fora da marca) e o `atom/PushButton` (obsoleto, migrado para `atom/Button`).
- Continuam com o usuário: telas de estado sem entrada por ligação, posição manual das sobreposições que abrem no centro, teste no modo de apresentação e o contraste por opacidade.
