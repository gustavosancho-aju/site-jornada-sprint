# Mobile Performance Optimization — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce Lighthouse mobile score from ~40s to <3s LCP by fixing the 5 confirmed real issues: 539KB JS bundle (no code splitting), render-blocking Google Fonts, sync Meta Pixel in `<head>`, AutoridadeSection image wrong priority/loading, and missing cache headers.

**Architecture:** Pure config + targeted file edits — no new dependencies. React.lazy + Suspense for below-fold component lazy loading. Vite `manualChunks` for vendor splitting. `vercel.json` for cache headers. All changes are additive/surgical.

**Tech Stack:** React 18 (lazy/Suspense), Vite 6 (rollupOptions manualChunks), TypeScript, Tailwind v4, Vercel — files at repo root, no `src/` directory.

---

## Task 1: Vite vendor code splitting (manualChunks)

**Files:**
- Modify: `vite.config.ts`

**Step 1: Add `build.rollupOptions.output.manualChunks` to vite.config.ts**

In `vite.config.ts`, change the returned config object so the full file becomes:

```ts
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              'icons': ['lucide-react'],
            }
          }
        }
      }
    };
});
```

**Step 2: Run build and check chunk sizes**

```bash
npm run build 2>&1 | grep -E "dist/|kB|MB"
```

Expected: separate chunks like `react-vendor-[hash].js`, `icons-[hash].js`, and a smaller `index-[hash].js` (was ~539KB, should now be split).

**Step 3: Verify dev server still works**

```bash
npm run dev
```

Open http://localhost:3000 — page should load normally.

**Step 4: Commit**

```bash
git add vite.config.ts
git commit -m "perf: vendor code splitting — react/lucide as separate chunks"
```

---

## Task 2: React.lazy for below-fold section components

**Files:**
- Modify: `App.tsx` (top imports section, lines 6–15, and JSX render)

**Context:** App.tsx currently imports 7 heavy section components statically. They are all below the fold. Converting them to React.lazy means their JS is only downloaded when needed (or shortly before), drastically reducing initial bundle parse time.

**Components to lazy load** (all are below the fold):
- `FAQSection`
- `AutoridadeSection`
- `ParaQuemESection`
- `CurriculoSection`
- `ResultadosReaisSection`
- `GarantiaSection`
- `UrgenciaSection`

**Components to keep as static imports** (above fold or always-visible):
- `MatrixGlitterBackground` — hero fixed background, needed immediately
- `MatrixVideoBackground` — hero section (line 201)
- `SectionMatrixBackground` — used in sections throughout
- `BenefitItem` — used in hero benefits list
- `SocialProofBar` — just after hero
- `StickyMobileCTA` — sticky bar, mounts immediately

**Step 1: Replace the 7 static imports with React.lazy**

In `App.tsx`, find the block at the top (lines 6–15):

```tsx
import FAQSection from './components/FAQSection';
import BenefitItem from './components/BenefitItem';
import SocialProofBar from './components/SocialProofBar';
import AutoridadeSection from './components/AutoridadeSection';
import ParaQuemESection from './components/ParaQuemESection';
import CurriculoSection from './components/CurriculoSection';
import ResultadosReaisSection from './components/ResultadosReaisSection';
import GarantiaSection from './components/GarantiaSection';
import UrgenciaSection from './components/UrgenciaSection';
import StickyMobileCTA from './components/StickyMobileCTA';
```

Replace with:

```tsx
import BenefitItem from './components/BenefitItem';
import SocialProofBar from './components/SocialProofBar';
import StickyMobileCTA from './components/StickyMobileCTA';

const FAQSection = React.lazy(() => import('./components/FAQSection'));
const AutoridadeSection = React.lazy(() => import('./components/AutoridadeSection'));
const ParaQuemESection = React.lazy(() => import('./components/ParaQuemESection'));
const CurriculoSection = React.lazy(() => import('./components/CurriculoSection'));
const ResultadosReaisSection = React.lazy(() => import('./components/ResultadosReaisSection'));
const GarantiaSection = React.lazy(() => import('./components/GarantiaSection'));
const UrgenciaSection = React.lazy(() => import('./components/UrgenciaSection'));
```

**Step 2: Wrap the lazy section components in Suspense**

In the JSX `return` of `App()`, find where the sections are rendered. Wrap ALL the lazy-loaded section usages in a single `<React.Suspense>` boundary with a minimal fallback.

Locate the line in the JSX that renders `<AutoridadeSection />` (or whichever lazy component appears first in the render tree). Wrap from there to the last lazy component (`<FAQSection />`) with:

```tsx
<React.Suspense fallback={<div className="min-h-[200px] bg-black" />}>
  {/* all the below-fold sections */}
  <AutoridadeSection />
  {/* ... remaining sections ... */}
  <FAQSection />
</React.Suspense>
```

**Important:** Do NOT wrap `<MatrixVideoBackground />`, `<MatrixGlitterBackground />`, `<SectionMatrixBackground />`, `<SocialProofBar />`, or `<StickyMobileCTA />` in Suspense — they are static imports and don't need it.

**Step 3: Verify TypeScript passes**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

**Step 4: Run dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:3000 at 375px viewport. Scroll through all sections — everything should render. No blank sections visible. Suspense fallback (black div) should be invisible since sections load fast on local dev.

**Step 5: Build and verify chunk count increased**

```bash
npm run build 2>&1 | grep -E "\.js|kB"
```

Expected: many more `.js` files (each lazy component is its own chunk). The main `index.js` should be significantly smaller.

**Step 6: Commit**

```bash
git add App.tsx
git commit -m "perf: React.lazy for 7 below-fold sections — eliminates 539KB initial bundle"
```

---

## Task 3: Google Fonts — non-blocking load

**Files:**
- Modify: `index.html` (lines 9–11)

**Context:** `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` blocks the render thread. The fix is to load it asynchronously using the `media="print"` trick, then swap to `all` after load. A `<noscript>` fallback ensures fonts load even with JS disabled.

**Step 1: Replace the Google Fonts link**

In `index.html`, find lines 9–11:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet">
```

Replace with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet"></noscript>
```

**Step 2: Verify fonts load on page**

```bash
npm run dev
```

Open http://localhost:3000. Page should render with Poppins font (may have a brief flash of system font — this is correct and expected behavior; it's the trade-off for non-blocking fonts).

**Step 3: Commit**

```bash
git add index.html
git commit -m "perf: non-blocking Google Fonts load — eliminates render-blocking CSS"
```

---

## Task 4: Meta Pixel — move to end of body

**Files:**
- Modify: `index.html` (lines 372–385 in `<head>`, move to just before `</body>`)

**Context:** The Meta Pixel inline `<script>` tag runs synchronously in `<head>`, blocking HTML parsing. Moving it to end of `<body>` (just before `</body>`) defers it until after the main content has loaded, without affecting tracking accuracy (PageView still fires on load).

**Step 1: Cut the Meta Pixel block from `<head>`**

In `index.html`, find the Meta Pixel block in `<head>`:

```html
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '940237528439062');
    fbq('track', 'PageView');
    </script>
    <!-- End Meta Pixel Code -->
```

Remove it from `<head>`.

**Step 2: Paste the Meta Pixel block at end of `<body>`**

In `index.html`, find the `<body>` section. Currently it ends with:

```html
  <script type="module" src="/index.tsx"></script>
</body>
```

Change to:

```html
  <script type="module" src="/index.tsx"></script>
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '940237528439062');
  fbq('track', 'PageView');
  </script>
  <!-- End Meta Pixel Code -->
</body>
```

**Step 3: Also move the `<noscript>` pixel img out of `<body>` opening to after pixel script**

The `<noscript>` pixel tracking pixel is already at the top of `<body>`. Leave it there — it's harmless.

**Step 4: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000. Page should load. Open DevTools → Network tab → filter by "facebook" — the fbevents.js should still load. (May take a few seconds longer now, which is intentional.)

**Step 5: Commit**

```bash
git add index.html
git commit -m "perf: move Meta Pixel to end of body — removes render-blocking script from head"
```

---

## Task 5: AutoridadeSection image — fix priority and add dimensions

**Files:**
- Modify: `components/AutoridadeSection.tsx` (line 36–42)

**Context:** The profile image has `fetchPriority="high"` and `loading="eager"` despite being well below the fold. This competes with the actual hero image (which correctly has `fetchPriority="high"`). Also, no explicit `width`/`height` means the browser can't reserve layout space → Cumulative Layout Shift (CLS).

The image renders at `w-56 h-56` on mobile (224px) and `w-72 h-72` on desktop (288px).

**Step 1: Fix the `<img>` attributes**

In `components/AutoridadeSection.tsx`, find lines 36–42:

```tsx
                <img
                  src="https://i.postimg.cc/Sx3rF9TR/Gemini-Generated-Image-rb4rhvrb4rhvrb4r-removebg-preview.png"
                  alt="Gustavo Sancho — Especialista em IA para Resultados"
                  className="w-full h-full object-cover object-top scale-110"
                  fetchPriority="high"
                  loading="eager"
                />
```

Replace with:

```tsx
                <img
                  src="https://i.postimg.cc/Sx3rF9TR/Gemini-Generated-Image-rb4rhvrb4rhvrb4r-removebg-preview.png"
                  alt="Gustavo Sancho — Especialista em IA para Resultados"
                  className="w-full h-full object-cover object-top scale-110"
                  width="288"
                  height="288"
                  loading="lazy"
                  decoding="async"
                />
```

Changes:
- Removed `fetchPriority="high"` — stops competing with hero image
- Changed `loading="eager"` → `loading="lazy"` — browser defers until near viewport
- Added `decoding="async"` — image decoding off main thread
- Added `width="288" height="288"` — reserves layout space, eliminates CLS

**Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

**Step 3: Verify section renders correctly**

```bash
npm run dev
```

Open http://localhost:3000, scroll to the "Por trás da Jornada Sprint" section. Photo should appear normally.

**Step 4: Commit**

```bash
git add components/AutoridadeSection.tsx
git commit -m "perf: fix AutoridadeSection image — lazy load, async decode, proper dimensions"
```

---

## Task 6: Modernize inline scroll reveal script (legacy JS)

**Files:**
- Modify: `index.html` (lines 332–371)

**Context:** The scroll reveal IIFE uses `var` and `function(){}` syntax. Lighthouse flags this as "legacy JavaScript." The fix is ES6+ syntax: `const`/`let`, arrow functions. No behavior change — purely syntactic modernization.

**Step 1: Replace the inline script**

In `index.html`, find the scroll reveal script block (from `<script>` to `</script>`, lines 332–371):

```html
  <script>
    // Global Scroll Reveal Observer — activates .reveal* classes
    (function() {
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function initReveal() {
        var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        // Se o usuário prefere movimento reduzido, mostra tudo imediatamente
        if (prefersReducedMotion) {
          els.forEach(function(el) { el.classList.add('visible'); });
          return;
        }

        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
            }
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        function observe() {
          document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
            .forEach(function(el) { observer.observe(el); });
        }

        observe();
        // Re-observe after React renders content
        setTimeout(observe, 800);
        setTimeout(observe, 2000);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
      } else {
        initReveal();
      }
    })();
  </script>
```

Replace with:

```html
  <script>
    // Global Scroll Reveal Observer — activates .reveal* classes
    (() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const initReveal = () => {
        const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        // Se o usuário prefere movimento reduzido, mostra tudo imediatamente
        if (prefersReducedMotion) {
          els.forEach(el => el.classList.add('visible'));
          return;
        }

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
            }
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        const observe = () => {
          document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
            .forEach(el => observer.observe(el));
        };

        observe();
        // Re-observe after React renders content
        setTimeout(observe, 800);
        setTimeout(observe, 2000);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
      } else {
        initReveal();
      }
    })();
  </script>
```

**Step 2: Verify dev server — scroll reveal still works**

```bash
npm run dev
```

Open http://localhost:3000. Scroll down — each section should animate in with the reveal effect as before.

**Step 3: Commit**

```bash
git add index.html
git commit -m "perf: modernize scroll reveal script — var/function to const/arrow (ES6+)"
```

---

## Task 7: Cache headers via vercel.json

**Files:**
- Create: `vercel.json` (repo root)

**Context:** Without cache headers, every revisit to the site forces the browser to re-download all assets. Adding long-lived `Cache-Control` headers for hashed assets (JS/CSS/images) and a short header for `index.html` enables efficient browser caching. Vercel will serve these headers automatically.

**Step 1: Check if vercel.json already exists**

```bash
ls vercel.json 2>&1
```

If it exists, read it first to avoid overwriting existing config.

**Step 2: Create `vercel.json` at repo root**

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.css",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

The `immutable` flag on hashed assets (`/assets/*`, `*.js`, `*.css`) tells the browser: "this URL will never change, cache it forever." The `must-revalidate` on `index.html` ensures users always get the latest entry point.

**Step 3: Build and confirm Vite outputs to `/dist/assets/`**

```bash
npm run build 2>&1 | grep "dist/assets"
```

Expected: files like `dist/assets/index-[hash].js`, `dist/assets/index-[hash].css`

**Step 4: Commit**

```bash
git add vercel.json
git commit -m "perf: add vercel.json cache headers — long-lived cache for hashed assets"
```

---

## Task 8: Final build verification + deploy

**Step 1: Full clean build**

```bash
npm run build
```

Expected: 0 errors, 0 TypeScript errors. The chunk warning `(!) Some chunks are larger than 500 kB` should either be gone or reduced.

**Step 2: Preview the production build locally**

```bash
npm run preview
```

Open http://localhost:4173 at 375px viewport. Verify:
- [ ] Page loads — hero visible
- [ ] Scroll reveals work
- [ ] All sections render (AutoridadeSection, FAQ, etc.)
- [ ] No blank/broken sections
- [ ] Fonts load (may have brief swap — expected)
- [ ] No console errors

**Step 3: Check console for errors**

In DevTools Console → verify 0 errors.

**Step 4: Hand off to @devops for deploy**

```
@devops → *push → git push origin main
```

Vercel will auto-deploy from main. Monitor build at Vercel dashboard.

**Step 5: Post-deploy verification on mobile**

Open the production URL in Chrome DevTools at 375px. Check:
- [ ] Network tab: see separate chunk files loading
- [ ] No render-blocking warnings in console
- [ ] Sections lazy-load as user scrolls

---

## Success Criteria

| Metric | Before | Target |
|--------|--------|--------|
| JS bundle (main chunk) | ~539KB | <200KB |
| Render-blocking resources | 2 (Fonts + Pixel) | 0 |
| AutoridadeSection image priority | HIGH (wrong) | lazy + async |
| Cache headers | None | immutable for assets |
| Lighthouse Mobile Score | ~40s LCP | <3s LCP |
| Legacy JS warnings | Yes (`var`/`function`) | None |
