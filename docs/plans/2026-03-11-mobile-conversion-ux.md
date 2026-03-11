# Mobile Conversion UX — Design Doc
**Data:** 2026-03-11
**Objetivo:** Otimizar experiência mobile para aumentar conversão de tráfego pago
**Escopo:** Opção B — Mobile Conversion UX (sem code splitting)

---

## Contexto

O site recebe tráfego pago (Meta/Google Ads) majoritariamente mobile. Audit no viewport 375px revelou:
- Hero h1 `text-6xl` (48px) overflow à direita
- CTA principal abaixo da dobra em mobile (imagem empurra para baixo)
- Stats "7 dias" truncado no grid de 3 colunas
- Múltiplos headings com overflow em seções abaixo do fold
- StickyMobileCTA aparece tarde (15% scroll) e sem urgência

---

## Seção 1: Hero Mobile

### Mudanças
- **Tipografia:** `text-6xl` → `text-4xl sm:text-6xl` nos dois H1 (JORNADA e SPRINT)
- **Ordem de elementos:** CTA sobe para antes da imagem via `order-` do Tailwind
  - Mobile: Badge → H1 → H2 → Parágrafo → CTA → Imagem → Stats
  - Desktop: mantém grid 2 colunas (sem mudança)
- **Imagem:** `min-h-[50vh]` → `min-h-[35vh] sm:min-h-[50vh]` para reduzir espaço consumido
- **Stats:** adicionar `text-xs` no mobile para evitar truncamento de "7 dias"
- **H2 subtitle:** `text-2xl md:text-4xl` → `text-xl md:text-4xl`
- **Parágrafo:** `text-lg md:text-xl` → `text-base md:text-xl` (mais compacto)

---

## Seção 2: Sistema de Tipografia

Regra geral: nenhum heading mobile ultrapassa `text-4xl`. Desktop não muda.

| Elemento | De | Para |
|---|---|---|
| Hero H1 | `text-6xl` | `text-4xl sm:text-6xl lg:text-9xl` |
| "PARA QUEM É A" heading | `text-4xl` | `text-3xl md:text-6xl` |
| "JORNADA SPRINT" nessa seção | `text-6xl` | `text-4xl md:text-6xl` |
| Seção oferta heading | `text-4xl` | `text-3xl md:text-6xl` |
| "12x de" | `text-4xl md:text-5xl` | `text-2xl md:text-5xl` |
| Preço "29,70" | `text-7xl md:text-9xl` | `text-6xl md:text-9xl` |
| CTA botão checkout | `text-2xl md:text-3xl` | `text-lg md:text-3xl` |

---

## Seção 3: Sticky CTA

### Mudanças
- **Threshold:** 15% → 10% do scroll
- **Copy urgência:** adicionar "⚡ Vagas Limitadas" antes do nome
- **Garantia inline:** `"• 7 dias de garantia"` → `"✓ 7 dias"` (mais compacto, mais visível)
- **Botão:** aumentar padding `px-5 py-3` → `px-6 py-3.5`

---

## Seção 4: Pricing Section Mobile

- Preço riscado + "12x de" em coluna no mobile (flex-col) vs side-by-side no desktop
- Garantia de 7 dias logo abaixo do botão CTA (hoje está mais abaixo)
- Padding interno `p-10 md:p-20` → `p-6 md:p-20` para respirar no mobile

---

## Seção 5: Fixes Gerais

- `overflow-x: hidden` em todas as `<section>` individualmente (evita scroll horizontal fantasma)
- Depoimentos: `touch-action: pan-x` no scroll container para swipe nativo mobile
- Seção "problema" verde: padding revisado
- Seção "oportunidade": cards `grid-cols-1 md:grid-cols-3` verificado
- `ParaQuemESection`: heading overflow corrigido

---

## Arquivos Afetados

- `App.tsx` — hero, tipografia, pricing, seções gerais
- `components/StickyMobileCTA.tsx` — threshold, copy, padding
- `components/ParaQuemESection.tsx` — heading overflow
- `index.html` — nenhuma mudança necessária

---

## Critérios de Sucesso

- [ ] Hero CTA visível acima da dobra em 375px sem scroll
- [ ] Nenhum texto ultrapassa o viewport horizontalmente
- [ ] Stats "7 dias" visível sem truncamento
- [ ] StickyMobileCTA aparece antes dos 10% de scroll
- [ ] Pricing section legível e hierarquia clara no mobile
- [ ] Zero console errors no mobile
