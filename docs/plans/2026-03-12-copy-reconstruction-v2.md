# Copy Reconstruction v2 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reconstruct the entire landing page copy and structure using behavioral psychology (Kahneman, Brown, Oakley) to convert traffic into sales, adding WhatsApp testimonial screenshots, course card grid, and 1:1 mentoring killer promise.

**Architecture:** Replace accordion-based CurriculoSection with visual card grid (9 cards + 1 mystery card). Add new WhatsApp testimonials section after hero. Add new Mentoria 1:1 section. Reorder existing sections following Cognitive Flip sequence. Rewrite hero copy with emotional hook.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide icons, static images in `/public/`

**Branch:** `feature/copy-reconstruction-v2`

---

## Assets Required (User must provide image files)

Before starting, the user needs to copy these images to `public/`:

| File Name | Source | Description |
|-----------|--------|-------------|
| `cards/jornada-00-zero.webp` | User's card image | Jornada Do Zero com IA |
| `cards/jornada-01-assistentes.webp` | User's card image | Jornada Assistentes de IA |
| `cards/jornada-02-navegadores.webp` | User's card image | Jornada Navegadores de IA |
| `cards/jornada-03-videos.webp` | User's card image | Jornada Vídeos com IA |
| `cards/jornada-04-especialistas.webp` | User's card image | Jornada Especialistas com IA |
| `cards/jornada-05-sites.webp` | User's card image | Jornada Criando Sites com IA |
| `cards/jornada-06-imagens.webp` | User's card image | Jornada Imagens com IA |
| `cards/jornada-07-sistemas.webp` | User's card image | Jornada Sistemas com IA |
| `cards/atendimento-sprint.webp` | User's card image | Atendimento Sprint |
| `testimonials/depo-1.webp` | User's WhatsApp screenshot | Woman amazed by immersion |
| `testimonials/depo-2.webp` | User's WhatsApp screenshot | Rodrigo VP digital product |
| `testimonials/depo-3.webp` | User's WhatsApp screenshot | Kiraz CRM for sales |
| `testimonials/depo-4.webp` | User's WhatsApp screenshot | Tamiles editorial calendar |

---

## New Section Order (Cognitive Flip Sequence)

```
1.  Hero (REWRITE copy)
2.  WhatsApp Testimonials (NEW section — screenshots)
3.  Problema / Para Quem É (KEEP, minor copy tweaks)
4.  Oportunidade — Apple/Terreno/Bitcoin (KEEP as-is)
5.  Mentoria 1:1 (NEW section — killer promise)
6.  AutoridadeSection (KEEP as-is)
7.  CurriculoSection (REPLACE accordion → card grid)
8.  ParaQuemESection (KEEP as-is)
9.  "NÃO é para você" (KEEP as-is)
10. ResultadosReaisSection (KEEP as-is)
11. Depoimentos carousel (KEEP as-is)
12. Oferta (MODIFY — add mentoria 1:1 to stack)
13. GarantiaSection (KEEP as-is)
14. UrgenciaSection (KEEP as-is)
15. FAQSection (KEEP as-is)
```

---

## Task 0: Setup — Create asset directories and placeholder structure

**Files:**
- Create: `public/cards/` directory
- Create: `public/testimonials/` directory

**Step 1: Create directories**

```bash
mkdir -p public/cards public/testimonials
```

**Step 2: Commit setup**

```bash
git add public/cards/.gitkeep public/testimonials/.gitkeep
git commit -m "chore: add asset directories for cards and testimonials"
```

**Note:** User must copy their images into these directories before visual testing. Use placeholder dimensions in code (aspect-ratio) so layout works even without images.

---

## Task 1: Rewrite Hero Copy

**Files:**
- Modify: `App.tsx` lines 228-234 (hero headline and subtitle)
- Modify: `App.tsx` lines 267-280 (hero stats)

**Step 1: Update hero headline**

In `App.tsx`, replace the current h2 (line 229-231):

```tsx
<h2 className="text-xl md:text-4xl text-slate-100 font-bold leading-tight max-w-2xl mx-auto lg:mx-0 drop-shadow-lg">
  Você sabe que a IA pode mudar seu jogo.<br/>Mas ainda não saiu do lugar.
</h2>
```

**Step 2: Update hero subtitle**

Replace the current p (line 232-234):

```tsx
<p className="text-base md:text-xl text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
  Em 12 meses, domine IA do zero ao avançado — com 8 imersões práticas, lives mensais ao vivo e <strong className="text-brand-green">1 hora de mentoria individual</strong> com Gustavo para tirar seu projeto do papel.
</p>
```

**Step 3: Update hero stats to include mentoria**

Replace the 3-stat grid with updated values:

```tsx
<div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-sm mx-auto lg:mx-0 lg:col-start-1">
  <div className="text-center">
    <div className="text-2xl font-black text-brand-green stat-glow">8</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Imersões</div>
  </div>
  <div className="text-center border-x border-white/10">
    <div className="text-2xl font-black text-brand-green stat-glow">1h</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Mentoria 1:1</div>
  </div>
  <div className="text-center">
    <div className="text-2xl font-black text-brand-green stat-glow">12</div>
    <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Meses Acesso</div>
  </div>
</div>
```

**Step 4: Verify dev server renders correctly**

Run: `npm run dev` and check hero section at localhost

**Step 5: Commit**

```bash
git add App.tsx
git commit -m "copy: rewrite hero with emotional hook and mentoria 1:1 highlight"
```

---

## Task 2: Create WhatsApp Testimonials Section (NEW)

**Files:**
- Create: `components/WhatsAppTestimonialsSection.tsx`
- Modify: `App.tsx` (import and add after hero)

**Step 1: Create the component**

Create `components/WhatsAppTestimonialsSection.tsx`:

```tsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

const testimonials = [
  {
    image: '/testimonials/depo-2.webp',
    name: 'Rodrigo Costa',
    role: 'VP — Sprint 001',
    label: 'Criou produto digital com IA',
  },
  {
    image: '/testimonials/depo-3.webp',
    name: 'Kiraz',
    role: 'Consultora Imobiliária',
    label: 'Montou CRM para vendas',
  },
  {
    image: '/testimonials/depo-4.webp',
    name: 'Tamiles Bortoletto',
    role: 'Sprint 002',
    label: 'Calendário editorial em 1 noite',
  },
  {
    image: '/testimonials/depo-1.webp',
    name: 'Mentorada',
    role: 'Sprint 001',
    label: 'Maravilhada com a imersão',
  },
];

const WhatsAppTestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-black border-t border-brand-green/10 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs mb-6">
            <MessageCircle className="w-4 h-4" />
            Direto do WhatsApp
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
            Não acredite em mim.<br />
            <span className="text-brand-green">Acredite neles.</span>
          </h2>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-black/60 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-green/40 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              {/* WhatsApp Screenshot */}
              <div className="aspect-[3/4] overflow-hidden bg-black/30">
                <img
                  src={t.image}
                  alt={`Depoimento de ${t.name}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Label overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pt-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-black font-black text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 bg-brand-green/10 border border-brand-green/20 rounded-lg px-3 py-2">
                  <p className="text-brand-green text-xs font-black uppercase tracking-wider">{t.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatsAppTestimonialsSection;
```

**Step 2: Import and add to App.tsx after hero section**

In `App.tsx`, add import at top (after line 7):

```tsx
import WhatsAppTestimonialsSection from './components/WhatsAppTestimonialsSection';
```

Then add the component right after the hero section's closing `</section>` (after line 285) and BEFORE the `<section id="problema">`:

```tsx
{/* WhatsApp Testimonials — Prova social imediata */}
<WhatsAppTestimonialsSection />
```

**Step 3: Verify renders correctly**

Run: `npm run dev` and check new section appears between hero and problema

**Step 4: Commit**

```bash
git add components/WhatsAppTestimonialsSection.tsx App.tsx
git commit -m "feat: add WhatsApp testimonials section with real screenshot grid"
```

---

## Task 3: Create Mentoria 1:1 Section (NEW)

**Files:**
- Create: `components/MentoriaSection.tsx`
- Modify: `App.tsx` (import and position after oportunidade)

**Step 1: Create the component**

Create `components/MentoriaSection.tsx`:

```tsx
import React from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { UserCheck, Clock, Target, Sparkles } from 'lucide-react';

interface MentoriaSectionProps {
  onCheckout: () => void;
}

const MentoriaSection: React.FC<MentoriaSectionProps> = ({ onCheckout }) => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-5xl px-4 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs badge-pulse">
              <Sparkles className="w-4 h-4" />
              Bônus exclusivo
            </div>

            <h2 className="font-heading text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              1 hora <span className="text-brand-green">individual</span><br />
              com Gustavo
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed">
              Você não vai ficar sozinho. Ao entrar na Jornada Sprint, ganha
              <strong className="text-white"> 1 hora de mentoria individual</strong> para
              tirar seu projeto de IA do papel — com direcionamento personalizado,
              no seu contexto, no seu ritmo.
            </p>

            <div className="space-y-4">
              {[
                { icon: UserCheck, text: 'Sessão 1:1 — só você e Gustavo' },
                { icon: Target, text: 'Foco no SEU projeto — não é aula genérica' },
                { icon: Clock, text: '1 hora completa de direcionamento prático' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <p className="text-white font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual highlight card */}
          <div className="flex justify-center">
            <div className="relative bg-black/60 border-2 border-brand-green/40 rounded-[40px] p-10 text-center max-w-sm shadow-[0_0_60px_rgba(34,197,94,0.15)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-black text-sm font-black px-6 py-2 rounded-full shadow-lg uppercase">
                Incluído na Jornada
              </div>

              <div className="w-24 h-24 rounded-full bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-12 h-12 text-brand-green" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">Mentoria 1:1</h3>
              <p className="text-brand-green font-black text-4xl mb-2">1 HORA</p>
              <p className="text-slate-400 text-sm">Individual com Gustavo Sancho</p>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-slate-600 text-xs uppercase tracking-widest font-bold mb-1">Se fosse cobrada separadamente</p>
                <p className="text-slate-500 text-xl font-black line-through">R$ 497,00</p>
                <p className="text-brand-green font-black text-lg mt-1">Incluída GRÁTIS</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MentoriaSection;
```

**Step 2: Import and add to App.tsx**

Add import after WhatsAppTestimonialsSection import:

```tsx
import MentoriaSection from './components/MentoriaSection';
```

Add the component after `</section>` of oportunidade section (after line 374) and BEFORE `<React.Suspense>`:

```tsx
{/* Mentoria 1:1 — Killer Promise */}
<MentoriaSection onCheckout={handleCheckout} />
```

**Step 3: Verify renders correctly**

Run: `npm run dev`

**Step 4: Commit**

```bash
git add components/MentoriaSection.tsx App.tsx
git commit -m "feat: add mentoria 1:1 killer promise section"
```

---

## Task 4: Replace CurriculoSection — Accordion → Card Grid

**Files:**
- Modify: `components/CurriculoSection.tsx` (full rewrite)

**Step 1: Rewrite CurriculoSection with card grid**

Replace entire content of `components/CurriculoSection.tsx`:

```tsx
import React from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { Plus } from 'lucide-react';

const jornadas = [
  { number: '00', title: 'Do Zero com IA', image: '/cards/jornada-00-zero.webp' },
  { number: '01', title: 'Assistentes de IA', image: '/cards/jornada-01-assistentes.webp' },
  { number: '02', title: 'Navegadores de IA', image: '/cards/jornada-02-navegadores.webp' },
  { number: '03', title: 'Vídeos com IA', image: '/cards/jornada-03-videos.webp' },
  { number: '04', title: 'Especialistas com IA', image: '/cards/jornada-04-especialistas.webp' },
  { number: '05', title: 'Criando Sites com IA', image: '/cards/jornada-05-sites.webp' },
  { number: '06', title: 'Imagens com IA', image: '/cards/jornada-06-imagens.webp' },
  { number: '07', title: 'Sistemas com IA', image: '/cards/jornada-07-sistemas.webp' },
  { number: '★', title: 'Atendimento Sprint', image: '/cards/atendimento-sprint.webp' },
];

const CurriculoSection: React.FC = () => {
  return (
    <section id="curriculo" className="relative py-24 md:py-32 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        <div className="reveal text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs mb-6 badge-pulse">
            O que você vai dominar
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
            8 Imersões.<br />
            <span className="text-brand-green">8 Transformações.</span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
            Cada jornada entrega um resultado concreto. Você não sai com teoria — sai com algo funcionando.
          </p>
        </div>

        {/* Card Grid — 5 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {jornadas.map((jornada, i) => (
            <div
              key={i}
              className="reveal group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-green/40 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            >
              <img
                src={jornada.image}
                alt={`Jornada ${jornada.number}: ${jornada.title}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Number badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-brand-green text-xs font-black px-2 py-1 rounded-lg border border-brand-green/20">
                {jornada.number}
              </div>
            </div>
          ))}

          {/* Mystery Card — "Uma nova aula, todo mês" */}
          <div className="reveal group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-dashed border-brand-green/30 hover:border-brand-green/60 transition-all duration-300 hover:-translate-y-2 bg-brand-green/5 flex flex-col items-center justify-center cursor-default shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-brand-green" />
            </div>
            <p className="text-brand-green font-black text-center text-sm uppercase tracking-wider px-4 leading-tight">
              Uma nova aula,<br />todo mês
            </p>
            <p className="text-slate-600 text-xs font-bold mt-2 uppercase tracking-widest">
              Lives ao vivo
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 font-bold text-sm uppercase tracking-widest mt-10">
          Tudo em 12 meses de acesso total — no seu ritmo, quando quiser
        </p>

      </div>
    </section>
  );
};

export default CurriculoSection;
```

**Step 2: Verify the grid renders correctly**

Run: `npm run dev` — Cards should show in a 5-col grid on desktop, 2-col on mobile

**Step 3: Commit**

```bash
git add components/CurriculoSection.tsx
git commit -m "feat: replace curriculum accordion with visual card grid + mystery card"
```

---

## Task 5: Add Mentoria 1:1 to Oferta Stack

**Files:**
- Modify: `App.tsx` oferta section (around lines 487-554)

**Step 1: Add mentoria card as 4th item in the oferta grid**

After the "Grupo Exclusivo" card (line 553) and before the closing `</div>` of the grid, add:

```tsx
<div className="reveal reveal-delay-4 card-3d-hover card-highlight bg-black/90 backdrop-blur-md border-2 border-brand-green/50 p-10 rounded-[40px] flex flex-col hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] transition-all group relative shadow-2xl lg:col-span-3">
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-black text-sm font-black px-6 py-2 rounded-full z-10 shadow-lg uppercase">
    🎁 Bônus Exclusivo
  </div>
  <div className="flex flex-col md:flex-row items-center gap-8">
    <div className="flex-shrink-0">
      <div className="w-20 h-20 rounded-3xl bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center">
        <UserCheck className="w-10 h-10 text-brand-green" />
      </div>
    </div>
    <div className="flex-1 text-center md:text-left">
      <h3 className="text-2xl font-black text-brand-green uppercase tracking-tight mb-2">
        Mentoria Individual 1:1
      </h3>
      <p className="text-slate-400 text-base leading-relaxed">
        1 hora individual com Gustavo Sancho para tirar seu projeto de IA do papel.
        Direcionamento personalizado, no seu contexto, no seu ritmo.
      </p>
    </div>
    <div className="flex-shrink-0 text-center">
      <p className="text-slate-600 text-xs font-black uppercase tracking-widest mb-1">Valor separado</p>
      <p className="text-slate-500 text-xl font-black line-through">R$ 497</p>
      <p className="text-brand-green font-black text-lg">GRÁTIS</p>
    </div>
  </div>
</div>
```

**Step 2: Import UserCheck at top of App.tsx**

Add `UserCheck` to the lucide-react import line.

**Step 3: Verify oferta section renders**

Run: `npm run dev`

**Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: add mentoria 1:1 bonus card to oferta section"
```

---

## Task 6: Reorder Sections in App.tsx

**Files:**
- Modify: `App.tsx` (move sections into new Cognitive Flip order)

**Step 1: Reorganize the section order in App.tsx**

The new order in the `<main>` tag should be:

```tsx
<main className="relative z-10">
  {/* 1. Hero */}
  <section id="hero">...</section>

  {/* 2. WhatsApp Testimonials — Prova Social Imediata */}
  <WhatsAppTestimonialsSection />

  {/* 3. Problema / Para Quem É — Espelhamento */}
  <section id="problema">...</section>

  {/* 4. Oportunidade — Apple/Terreno/Bitcoin */}
  <section id="oportunidade">...</section>

  {/* 5. Mentoria 1:1 — Killer Promise */}
  <MentoriaSection onCheckout={handleCheckout} />

  <React.Suspense fallback={<div className="min-h-[200px] bg-black" />}>
    {/* 6. Autoridade */}
    <AutoridadeSection />

    {/* 7. Currículo — Card Grid */}
    <CurriculoSection />

    {/* 8. Para Quem É (detailed) */}
    <ParaQuemESection />

    {/* 9. NÃO é para você */}
    <section id="para-quem">...</section>

    {/* 10. Resultados Reais */}
    <ResultadosReaisSection />

    {/* 11. Depoimentos carousel */}
    <section id="depoimentos">...</section>

    {/* 12. Oferta (with mentoria 1:1 in stack) */}
    <section id="oferta">...</section>

    {/* 13. Garantia */}
    <GarantiaSection onCheckout={handleCheckout} />

    {/* 14. Urgência */}
    <UrgenciaSection onCheckout={handleCheckout} />

    {/* 15. FAQ */}
    <FAQSection />
  </React.Suspense>
</main>
```

**Step 2: Verify full page flow**

Run: `npm run dev` and scroll through entire page

**Step 3: Commit**

```bash
git add App.tsx
git commit -m "refactor: reorder sections following Cognitive Flip sequence"
```

---

## Task 7: Build, Deploy Preview, and Review

**Files:** None (build/deploy only)

**Step 1: Build**

```bash
npm run build
```

Expected: Clean build, no TypeScript errors

**Step 2: Push branch (delegate to @devops)**

```bash
git push -u origin feature/copy-reconstruction-v2
```

**Step 3: Get Vercel preview URL**

Vercel auto-deploys preview for branches. Check the PR or Vercel dashboard for the preview URL.

**Step 4: Share preview URL with user**

The user reviews the preview URL before merging to main.

---

## Summary of Changes

| What | Type | Impact |
|------|------|--------|
| Hero copy | Rewrite | Emotional hook + mentoria 1:1 |
| WhatsApp Testimonials | New section | 4 real screenshots after hero |
| Mentoria 1:1 section | New section | Killer promise highlight |
| CurriculoSection | Full rewrite | Accordion → 10-card visual grid |
| Oferta section | Modification | +1 mentoria bonus card |
| Section order | Reorganization | Cognitive Flip sequence |
| Asset directories | New | `public/cards/` + `public/testimonials/` |

**New components:** 2 (WhatsAppTestimonialsSection, MentoriaSection)
**Modified components:** 2 (CurriculoSection rewrite, App.tsx)
**New assets needed:** 13 images (9 cards + 4 testimonials)
