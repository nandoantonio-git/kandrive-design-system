---
tags: [estado, plano]
---

# Plano de fechamento das pendências (2026-09-24)

Decidido com o Nando em sessão de perguntas (grill), Q1–Q16. Ordem: A → B → C → D → E.

**Ritmo:** uma parada no fim de cada fase (commit por item, o Nando faz o push). Mudanças no Figma V0.2.1 sempre com aprovação: a fase A em lote com antes e depois; a fase C com propostas numa seção separada. O Figma original (`oFp2TLeCG4GJeCOFVhBvjg`) não é tocado.

## Fase A: correções no Figma V0.2.1 (um lote, antes e depois)

- [x] **F11:** SortButton → `DropdownSelectGroupBy Device=Mobile` em Home/Grid e Home/List mobile.
- [x] **F13:** aba "Guardar" ativa em `LongTermStorage/SelectFilesSelected/Mobile`.
- [x] **F15:** `StorageStatus Tier=Alert` com o aviso em vermelho cheio e os botões Liberar e Comprar habilitados.
- [x] Símbolos de arquivo, imagem e vídeo opacos no Dark, iguais ao Light.
- [x] Rótulo do `atom/Button` com 16px em todas as variantes (Regra 4 sem exceção, Q6).
- [x] **F14:** ~~`Brand/Primary/Mid` no Dark = #2391aa~~. O levantamento mostrou que `Mid` é a cor do logo (76 usos); decisão revista: o token fica, e o nome do arquivo em RecoveryPending passou a usar `Brand/Primary/Dark`.
- [x] **F9:** rótulos do `MobileBottomNav` no Light: inativos em `Neutral/Text/Tertiary`, ativo em `Brand/Primary/Default` (Q4).
- [x] Polimentos: camadas `celule/…`, `Organização/…/Saved` e `Page/login`; textos em inglês; o ícone `SpatialAudioOff`.
- [x] `PushButton`: 454 instâncias no Figma. Decisão revista: não trocar agora; o componente fica marcado como obsoleto, e a troca acontece quando cada tela for revisada. No código, a migração segue na fase E.

**Fase A aplicada em 2026-09-24.** Extras: a `MobileTabBar` virou component set com `Active` (Home · Organize · Keep), e as cópias soltas em 8 telas (×2 modos) viraram instâncias; `atom/Icon/SpatialAudioOff` → `atom/Icon/Account`; placeholder "Search" → "Pesquisar" no Header mobile. As camadas `celule/…` e `Page/login` já estavam corrigidas. Achado novo: F16.

## Fase B: cor e contraste no código

- [x] F9 e F14 no código: `MobileBottomNav` (rótulos Tertiary e ativo em Primary) e `RecoveryPending` (nome em `Brand/Primary/Dark`).
- [x] Conflito do rótulo do Button fechado no vault: fica em 16px. Alturas e raios arredondados para cima, em pares: MD 36px, Glass raio 10, LG Rounded 46px (commit `3882a86`).

## Fase C: telas novas (proposta no Figma → aprovação → oficial → código)

**Propostas montadas em 2026-09-24**, na seção `🧪 Propostas · Fase C` (`3180:29646`) da página 📐Pages do V0.2.1, fora das telas oficiais: F5 (`3180:29647`), F10 (`3180:29725`), F6 (`3180:29791`) e F8 (`3181:29768`, `3181:29820`, `3181:29847`, `3181:29878`). Aprovadas e promovidas a oficiais (Light e Dark; F5 e F10 também em tablet e desktop), e implementadas no código: `HandPicker`, `UserProfileCard`, `Avatar`, `FaqTopicChips`, `OnboardingPage`; o Header abre Settings → Conta pelo avatar e pelo ícone de conta.


- [x] **F5:** par "Direita | Esquerda" em Settings → Aparência, nos 3 dispositivos, com o ícone de um celular mostrando o lado do FAB (Q7).
- [x] **F6:** faixa de chips com os tópicos abaixo do título do FAQ mobile, que rola até a seção (Q8).
- [x] **F8:** onboarding mínimo: boas-vindas com o Kan, mão dominante, tema e conclusão com o `MobileSuccess`, com "Pular" em todas (Q9).
- [x] **F10:** o avatar abre Settings → Conta, com o bloco de usuário no topo (foto, nome, e-mail, "Editar perfil" e "Trocar conta") (Q10).

## Fase D: teste automatizado (Q11)

- [x] Gate: cada story renderiza sem erro e passa no axe (`npm test`, Vitest + addon-vitest no Chrome do sistema). Corrigidos: nome das barras de progresso, `aria-valuenow=NaN`, landmarks sem rótulo, Switch sem nome, ordem de títulos do PreviewPane. Exceção explícita (Q17): o contraste de cor fica como "precisa de revisão" (`reviewOnFail`) até o lote de paleta.
- [x] Testes de interação (play functions): Checkbox, HandPicker, MethodOrganizeButton, FileSelectList, SidebarDrawer e o fluxo de seleção do Long-term (SelectFilesMobile).
- Sem regressão visual por captura ([[feedback: sem validação pixel a pixel]]).

## Fase E: fechamento dos conflitos (Q12–Q15)

- [x] **Regra 2:** o nome oficial é o do Figma; o CSS é uma tradução mecânica, com os sufixos `-action` e `-surface` como exceções aceitas; o `figma-color-bridge.ts` é a tabela oficial.
- [x] **Regra 3:** "perigo" com duas leituras válidas: texto vermelho sobre neutro para a ação que pede confirmação; vermelho sólido para status e para a confirmação final.
- [x] Migrar o `PushButton` para o `Button` e removê-lo do código e do Storybook.
- [ ] `FolderTagChip` expandido: mantido como está (Regra 9 — mudar por inferência arriscaria um chip vazio por padrão). Fica para uma decisão do Nando com uma captura do Figma; não é um proposta a construir, é uma pergunta a responder.
- [x] Placeholder do `SearchInput`, estados do `SearchBar` e limpeza do [[Conflitos Abertos]].

## Lote de paleta (depois da fase E, Q17)

- [ ] Contraste de cor: 761 ocorrências abaixo de 4.5:1, em 4 pares — `Neutral/Text/Tertiary` (#71717a) sobre cinzas (4.0–4.4:1); cinzas zinc-400/500 do código fora dos tokens (2.6–3.5:1); teal de texto #007e96 sobre cinza/teal claro (3.6–4.3:1); `Brand/Secondary/Light` #6b6b68 sobre cinza (~4.1:1). Proposta: escurecer `Neutral/Text/Tertiary` (~#5f5f66), trocar os zinc pelos tokens e usar `Brand/Primary/Dark` em textos pequenos sobre fundos claros. Lote com antes e depois no Figma. Ao terminar, tirar o `reviewOnFail` do `preview.tsx`.

Ver também [[Responsividade]].

**Fase E aplicada em 2026-09-25**, exceto `FolderTagChip` (pergunta em aberto ao Nando).
