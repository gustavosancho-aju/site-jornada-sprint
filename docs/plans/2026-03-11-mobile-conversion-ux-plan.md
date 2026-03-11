# Mobile Conversion UX — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix mobile layout so the CTA is above the fold on 375px viewports, prevent all text overflow, and improve StickyMobileCTA urgency — all to increase conversion from paid traffic.

**Architecture:** Pure CSS/Tailwind class changes + one small HTML restructure (extract hero stats from left column to make them a separate grid child so they appear after the image on mobile). No new components or dependencies.

**Tech Stack:** React 18, Tailwind v4 (CSS-first), TypeScript — files at repo root, no `src/` directory.

---

## Task 1: Hero — Font sizes + CTA above fold

**Files:**
- Modify: `App.tsx` lines 204–276

**Step 1: Reduce H1 font size on mobile**

In `App.tsx` line 216, change:
```
className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-white..."
```
to:
```
className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white..."
```

In `App.tsx` line 219, change:
```
className="font-heading text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9]..."
```
to:
```
className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9]..."
```

**Step 2: Reduce H2 and paragraph font size on mobile**

Line 225, change `text-2xl md:text-4xl` → `text-xl md:text-4xl`

Line 228, change `text-lg md:text-xl` → `text-base md:text-xl`

**Step 3: Reduce top padding on left column on mobile**

Line 206, change `py-12 lg:py-0` → `py-6 sm:py-12 lg:py-0`
Also change `space-y-8` → `space-y-6 sm:space-y-8`

**Step 4: Extract Stats from left column + reorder grid**

Current structure (lines 204–276): 2-child grid (left-col-with-stats, image-col).

New structure: 3-child grid (text-col WITHOUT stats, image-col, stats-as-own-child).

In line 204, change `items-center` → `items-start`:
```
className="grid lg:grid-cols-2 gap-12 w-full items-start"
```

Cut the stats div (lines 243–256) OUT of the left-column div. It currently ends with `</div>` before the `</div>` closing the left col. Remove it from inside the left col.

Paste it as the 3rd child of the outer grid, AFTER the image div (after line 276). Add `max-w-sm mx-auto lg:mx-0` to keep it aligned with left col on desktop.

Full stats div (new position, after image closing `</div>`):
```tsx
{/* Hero Stats — 3rd grid child: mobile: below image; desktop: col1/row2 */}
<div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-sm mx-auto lg:mx-0">
  <div className="text-center">
    <div className="text-2xl font-black text-brand-green stat-glow">+200</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Profissionais</div>
  </div>
  <div className="text-center border-x border-white/10">
    <div className="text-2xl font-black text-brand-green stat-glow">12</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Meses Acesso</div>
  </div>
  <div className="text-center">
    <div className="text-lg font-black text-brand-green stat-glow">7 dias</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Garantia</div>
  </div>
</div>
```

Note the "7 dias" stat value changed to `text-lg` (was `text-2xl`) to prevent truncation.

**Step 5: Reduce image height on mobile + add lg:row-span-2**

Line 259, change:
```
min-h-[50vh] lg:min-h-auto
```
to:
```
min-h-[35vh] sm:min-h-[50vh] lg:min-h-auto lg:row-span-2
```

`lg:row-span-2` makes the image column span both rows (text row + stats row) on desktop, keeping the original desktop visual.

**Step 6: Start dev server and verify at 375px**

```bash
npm run dev
```

Open http://localhost:5173 in browser, set viewport to 375px width.

Expected: CTA button "Iniciar minha jornada" is visible WITHOUT scrolling. Hero H1 texts don't clip horizontally.

**Step 7: Commit**

```bash
git add App.tsx
git commit -m "feat(mobile): hero CTA above fold — font reduction + stats reorder"
```

---

## Task 2: Typography System — All Other Headings

**Files:**
- Modify: `App.tsx` (lines 304, 477, 599, 600, 612)
- Modify: `components/ParaQuemESection.tsx` (line 41)

**Step 1: Fix "Para QUEM é a JORNADA SPRINT" heading (problema section)**

`App.tsx` line 304, change:
```
text-6xl md:text-8xl lg:text-9xl
```
to:
```
text-4xl md:text-6xl lg:text-8xl
```

**Step 2: Fix Oferta section heading**

`App.tsx` line 477, change:
```
text-4xl md:text-6xl
```
to:
```
text-3xl md:text-6xl
```

**Step 3: Fix price display — "12x de" and price number**

`App.tsx` line 599, change:
```
text-4xl md:text-5xl
```
to:
```
text-2xl md:text-5xl
```

`App.tsx` line 600, change:
```
text-7xl md:text-9xl
```
to:
```
text-6xl md:text-9xl
```

**Step 4: Fix CTA button font in pricing section**

`App.tsx` line 612, change:
```
text-2xl md:text-3xl py-8 px-12
```
to:
```
text-lg md:text-3xl py-6 md:py-8 px-8 md:px-12
```

**Step 5: Fix ParaQuemESection heading**

`components/ParaQuemESection.tsx` line 41, change:
```
text-4xl md:text-6xl
```
to:
```
text-3xl md:text-6xl
```

**Step 6: Verify at 375px — scroll through all sections**

Open http://localhost:5173 at 375px. Scroll down and verify:
- "Para QUEM é a" section: no horizontal overflow
- Oferta section: heading fits
- Pricing: "12x de R$29,70" stacks correctly, all text visible
- ParaQuemESection: heading fits

Expected: No section has text that overflows horizontally.

**Step 7: Commit**

```bash
git add App.tsx components/ParaQuemESection.tsx
git commit -m "feat(mobile): fix typography overflow — all heading sizes corrected"
```

---

## Task 3: StickyMobileCTA — Earlier + Urgency

**Files:**
- Modify: `components/StickyMobileCTA.tsx`

**Step 1: Change scroll threshold from 15% to 10%**

Line 16, change:
```typescript
setVisible(pct > 0.15);
```
to:
```typescript
setVisible(pct > 0.10);
```

**Step 2: Add urgency copy**

Line 34, change:
```tsx
<p className="text-white font-black text-sm leading-tight truncate">
  Jornada Sprint IA
</p>
```
to:
```tsx
<p className="text-white font-black text-sm leading-tight truncate">
  <span className="text-brand-green">⚡</span> Vagas Limitadas
</p>
```

**Step 3: Make guarantee more compact and visible**

Line 38, change:
```tsx
<p className="text-brand-green text-xs font-bold">
  12x de R$29,70 <span className="text-slate-500">• 7 dias de garantia</span>
</p>
```
to:
```tsx
<p className="text-brand-green text-xs font-bold">
  12x de R$29,70 <span className="text-slate-400 font-black">✓ 7 dias</span>
</p>
```

**Step 4: Increase button padding**

Line 45, change `px-5 py-3` → `px-6 py-3.5`:
```tsx
className="flex items-center gap-2 bg-brand-green text-black font-black text-sm px-6 py-3.5 rounded-xl shrink-0 active:scale-95 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.4)]"
```

**Step 5: Verify StickyMobileCTA behavior**

At http://localhost:5173 on 375px, scroll down ~10% of page height. Verify the sticky bar appears. Confirm "⚡ Vagas Limitadas" copy is visible and urgency copy shows.

**Step 6: Commit**

```bash
git add components/StickyMobileCTA.tsx
git commit -m "feat(mobile): StickyMobileCTA — earlier appearance + urgency copy"
```

---

## Task 4: Pricing Section Mobile

**Files:**
- Modify: `App.tsx` (line 586)

**Step 1: Reduce pricing box padding on mobile**

`App.tsx` line 586, change:
```
p-10 md:p-20
```
to:
```
p-6 md:p-20
```

**Step 2: Verify pricing section**

At 375px, scroll to the pricing/investimento section. Verify:
- Content has comfortable breathing room
- "12x de" + price stacks cleanly
- CTA button fits comfortably
- Guarantee text "Garantia de 7 dias" is visible below button

**Step 3: Commit**

```bash
git add App.tsx
git commit -m "feat(mobile): pricing section padding — better mobile breathing room"
```

---

## Task 5: General Fixes

**Files:**
- Modify: `App.tsx` (testimonials scroll container, section overflow checks)

**Step 1: Add touch-action to testimonials scroll container**

`App.tsx` line 448, find:
```tsx
className="flex w-full py-10 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing relative z-20"
```
Add `style={{ touchAction: 'pan-x' }}` to enable native swipe:
```tsx
className="flex w-full py-10 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing relative z-20"
style={{ touchAction: 'pan-x' }}
```

**Step 2: Add overflow-x-hidden to sections that don't have it**

Check the following sections and add `overflow-x-hidden` (or confirm `overflow-hidden` is already present):

- `section id="depoimentos"` (line 408): has `overflow-hidden` ✓ — add `overflow-x-hidden` as well for safety:
  Change `overflow-hidden` → `overflow-hidden overflow-x-hidden`

- `section id="para-quem"` (line 383): check if `overflow-hidden` present; add if missing.

- `section id="oferta"` (line 470): has `overflow-hidden` ✓

- `section id="hero"` (line 200): has `overflow-hidden` ✓

For any section missing it, add `overflow-x-hidden` to the className.

**Step 3: Full mobile audit — scroll through entire page**

At 375px:
- Scroll from top to bottom
- Check each section: no horizontal scroll, no clipped text
- Swipe testimonials section: should work with pan-x touch action
- Check browser console: zero errors

Run: open DevTools → Console tab → verify 0 errors.

**Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat(mobile): touch-action pan-x on testimonials + overflow-x fixes"
```

---

## Task 6: Deploy + Verify Success Criteria

**Step 1: Final local verification checklist**

At viewport 375px, verify all success criteria from the design doc:
- [ ] Hero CTA "Iniciar minha jornada" visible above fold without scrolling
- [ ] No text overflows viewport horizontally in any section
- [ ] Stats "7 dias" fully visible (not truncated)
- [ ] StickyMobileCTA appears before 10% scroll
- [ ] Pricing section legible with clear hierarchy
- [ ] Console shows 0 errors

**Step 2: Deploy to Vercel**

```bash
vercel --prod
```

Or push to main to trigger auto-deploy:
```bash
git push origin main
```

**Step 3: Monitor Vercel build**

Watch for build completion. If build fails, run:
```bash
vercel ls --prod
```
Then check logs:
```bash
vercel logs <deployment-url>
```

**Step 4: Verify on real device or BrowserStack**

Open the production URL on a real mobile device (or DevTools 375px). Confirm all success criteria pass in production.

**Step 5: Final commit (if any last fixes needed)**

```bash
git add .
git commit -m "fix(mobile): post-deploy corrections"
git push origin main
```

---

## Success Criteria Reference

From design doc `docs/plans/2026-03-11-mobile-conversion-ux.md`:

- [ ] Hero CTA visible acima da dobra em 375px sem scroll
- [ ] Nenhum texto ultrapassa o viewport horizontalmente
- [ ] Stats "7 dias" visível sem truncamento
- [ ] StickyMobileCTA aparece antes dos 10% de scroll
- [ ] Pricing section legível e hierarquia clara no mobile
- [ ] Zero console errors no mobile
