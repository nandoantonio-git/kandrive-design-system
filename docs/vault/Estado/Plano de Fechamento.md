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

- [ ] F9 e F14 no código: tokens, `MobileBottomNav` e `RecoveryPending`.
- [ ] Conflito do rótulo do Button fechado no vault: fica em 16px.

## Fase C: telas novas (proposta no Figma → aprovação → oficial → código)

- [ ] **F5:** par "Direita | Esquerda" em Settings → Aparência, nos 3 dispositivos, com o ícone de um celular mostrando o lado do FAB (Q7).
- [ ] **F6:** faixa de chips com os tópicos abaixo do título do FAQ mobile, que rola até a seção (Q8).
- [ ] **F8:** onboarding mínimo: boas-vindas com o Kan, mão dominante, tema e conclusão com o `MobileSuccess`, com "Pular" em todas (Q9).
- [ ] **F10:** o avatar abre Settings → Conta, com o bloco de usuário no topo (foto, nome, e-mail, "Editar perfil" e "Trocar conta") (Q10).

## Fase D: teste automatizado (Q11)

- [ ] Gate: cada story renderiza sem erro e passa no axe. Exceções registradas de forma explícita.
- [ ] Testes de interação: checkbox, seletores, gaveta e o fluxo de seleção.
- Sem regressão visual por captura ([[feedback: sem validação pixel a pixel]]).

## Fase E: fechamento dos conflitos (Q12–Q15)

- [ ] **Regra 2:** o nome oficial é o do Figma; o CSS é uma tradução mecânica, com os sufixos `-action` e `-surface` como exceções aceitas; o `figma-color-bridge.ts` é a tabela oficial.
- [ ] **Regra 3:** "perigo" com duas leituras válidas: texto vermelho sobre neutro para a ação que pede confirmação; vermelho sólido para status e para a confirmação final.
- [ ] Migrar o `PushButton` para o `Button` e removê-lo do código e do Storybook.
- [ ] `FolderTagChip` expandido: proposta para confirmar.
- [ ] Placeholder do `SearchInput`, estados do `SearchBar` e limpeza do [[Conflitos Abertos]].

Ver também [[Responsividade]].
