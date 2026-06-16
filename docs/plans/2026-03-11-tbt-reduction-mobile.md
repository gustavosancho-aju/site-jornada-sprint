# TBT Reduction — Mobile Performance Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce mobile Total Blocking Time (TBT) from 560ms to <200ms to push Lighthouse Performance score above 70.

**Architecture:** The main TBT sources are canvas RAF animation loops running on mobile with no guards, plus a continuous carousel RAF in App.tsx. Adding `window.innerWidth < 768` skip guards (same pattern as MatrixGlitterBackground) eliminates main-thread blocking paint work during page load. The carousel RAF gets the same guard so it does not run on mobile.

**Tech Stack:** React 18, TypeScript, canvas requestAnimationFrame, IntersectionObserver

---

## Context

Current Lighthouse mobile score: ~50 (TBT 560ms is the biggest blocker, 30% weight).
Target: TBT <200ms → score above 70.

### Root cause

| Component | Issue | TBT Impact |
|-----------|-------|------------|
| `SectionMatrixBackground.tsx` | Canvas RAF — NO mobile skip guard | HIGH (×5 sections) |
| `MatrixVideoBackground.tsx` | Canvas RAF — NO mobile skip guard | HIGH |
| `App.tsx` (lines 106–128) | Continuous carousel RAF — runs on ALL devices | HIGH |
| `SocialProofBar.tsx` | `setInterval(16ms)` → ~90 React state updates | MEDIUM |

### Reference pattern (already working)

`MatrixGlitterBackground.tsx` line 9:
```tsx
// Skip on mobile — saves full-screen canvas RAF loop on small screens
if (window.innerWidth < 768) return;
```

This single guard eliminates the entire RAF loop for mobile. Replicate it everywhere.

---

## Task 1: Add mobile skip to SectionMatrixBackground

**Files:**
- Modify: `components/SectionMatrixBackground.tsx` (line 7, inside `useEffect`)

**What to do:**

Add the mobile guard as the FIRST line inside `useEffect`, before any other code:

```tsx
useEffect(() => {
  // Skip on mobile — saves canvas RAF loop on small screens
  if (window.innerWidth < 768) return;

  const canvas = canvasRef.current;
  // ... rest of existing code unchanged ...
```

**Step 1: Edit the file**

In `components/SectionMatrixBackground.tsx`, inside the `useEffect` callback (line 7), add immediately after `const canvas = canvasRef.current;`... wait, add it BEFORE that line.

The `useEffect` currently starts:
```tsx
useEffect(() => {
    const canvas = canvasRef.current;
```

Change to:
```tsx
useEffect(() => {
    // Skip on mobile — saves canvas RAF loop on small screens
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
```

**Step 2: Verify the edit**

Read the file and confirm the guard is at line 8–9, before `const canvas = canvasRef.current`.

**Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```
Expected: no TypeScript errors.

**Step 4: Commit**

```bash
git add components/SectionMatrixBackground.tsx
git commit -m "perf(mobile): skip canvas RAF on mobile in SectionMatrixBackground"
```

---

## Task 2: Add mobile skip to MatrixVideoBackground

**Files:**
- Modify: `components/MatrixVideoBackground.tsx` (line 7, inside `useEffect`)

**What to do:**

Same pattern as Task 1. Add the guard as the FIRST line inside `useEffect`:

```tsx
useEffect(() => {
    // Skip on mobile — saves canvas RAF loop on small screens
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
```

**Step 1: Edit the file**

In `components/MatrixVideoBackground.tsx`, find:
```tsx
  useEffect(() => {
    const canvas = canvasRef.current;
```

Change to:
```tsx
  useEffect(() => {
    // Skip on mobile — saves canvas RAF loop on small screens
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
```

**Step 2: Verify the edit**

Read the file and confirm the guard is present before `const canvas`.

**Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```
Expected: no TypeScript errors.

**Step 4: Commit**

```bash
git add components/MatrixVideoBackground.tsx
git commit -m "perf(mobile): skip canvas RAF on mobile in MatrixVideoBackground"
```

---

## Task 3: Guard carousel RAF in App.tsx on mobile

**Files:**
- Modify: `App.tsx` (lines 106–128)

**What to do:**

The carousel RAF useEffect (lines 106–128) runs a continuous `requestAnimationFrame` loop on ALL devices. On mobile there is no testimonials carousel visible, so it's pure waste.

Find this block in `App.tsx`:
```tsx
  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const INTERVAL_MS = 30;

    const tick = (now: number) => {
```

Add the guard as the FIRST line inside this `useEffect`:
```tsx
  useEffect(() => {
    // Skip carousel RAF on mobile — no horizontal scroll on small screens
    if (window.innerWidth < 768) return;

    let rafId: number;
    let lastTime = 0;
    const INTERVAL_MS = 30;

    const tick = (now: number) => {
```

**Step 1: Edit the file**

**Step 2: Verify**

Read `App.tsx` lines 102–130 and confirm guard is present.

**Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```

**Step 4: Commit**

```bash
git add App.tsx
git commit -m "perf(mobile): skip carousel RAF on mobile in App.tsx"
```

---

## Task 4: Optimize SocialProofBar counter animation

**Files:**
- Modify: `components/SocialProofBar.tsx` (lines 18–29)

**Context:**

Current code fires `setInterval` every 16ms (≈60fps) for ~1.5 seconds = ~90 React state updates.
This happens when the section becomes visible (IntersectionObserver), which for Lighthouse happens during page load.

**What to do:**

Change the interval from `16` to `50` ms. This reduces state updates from ~90 to ~30 while the counter still animates visually in ~1.5 seconds (barely perceptible change to user).

Find:
```tsx
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
```

Change to:
```tsx
    const step = target / (1500 / 50);   // ← also update step calculation
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 50);
```

Note: the `step` calculation on line 22 must also be updated: `target / (1500 / 50)` = `200 / 30` = ~6.67 per tick.

**Step 1: Edit the file**

Find the full `useEffect` block (lines 18–29) and replace with:
```tsx
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const target = 200;
    const step = target / (1500 / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [isVisible]);
```

**Step 2: Verify**

Read the file and confirm `16` is replaced with `50` and `step` formula uses `50`.

**Step 3: Build check**

```bash
npm run build 2>&1 | tail -5
```

**Step 4: Commit**

```bash
git add components/SocialProofBar.tsx
git commit -m "perf(mobile): reduce SocialProofBar counter interval 16ms→50ms"
```

---

## Task 5: Push all commits to origin/main

**What to do:**

```bash
git log --oneline origin/main..HEAD
```

Verify the 4 new commits are listed (Tasks 1–4).

```bash
git push origin main
```

Expected: `main -> main` with 4 new commits.

---

## Expected Outcome

| Metric | Before | After (estimated) |
|--------|--------|------------------|
| TBT | 560ms | <200ms |
| Canvas RAF on mobile | 3 loops running | 0 loops running |
| Carousel RAF on mobile | Continuous | Stopped |
| SocialProofBar updates | ~90 | ~30 |
| Lighthouse Performance | ~50 | >70 |

The critical path is Tasks 1–3 (canvas + carousel RAF guards). Task 4 is a bonus improvement.
