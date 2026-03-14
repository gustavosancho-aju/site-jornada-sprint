# Design: LCP Hero Image — Servir como Asset Estático

**Data:** 2026-03-11
**Objetivo:** Reduzir LCP de 8s para <2s no mobile
**Abordagem aprovada:** Opção A — imagem estática no Vercel

---

## Diagnóstico

| Causa | Impacto Estimado |
|-------|-----------------|
| Hero image via Cloudinary com `e_background_removal` duplo | ~5-7s em CDN fria |
| Bundle JS de 432 KB | ~1-2s parse mobile |
| CSS render-blocking de 76 KB | ~0.5s |

**LCP element:** `<img>` hero do Gustavo Sancho (linha 255-262 de App.tsx)
**URL atual:** `https://res.cloudinary.com/dbbpxrebg/image/upload/e_background_removal/e_background_removal/f_webp/cs_srgb/q_auto:best/dpr_1/Generated_Image_March_01_2026_-_4_00PM_kydwnk`

O problema: `e_background_removal` duplo força o Cloudinary a processar a imagem com IA em cada CDN edge fria. O Lighthouse simula load fresh a partir de servidores Google → sempre CDN fria → 5-7s de latência.

---

## Solução: Opção A

**Hospedar a imagem como arquivo estático no Vercel CDN.**

### Fluxo

```
Cloudinary (processada) → download → /public/hero.webp → Vercel CDN → browser
```

### Arquivos afetados

| Arquivo | Mudança |
|---------|---------|
| `public/hero.webp` | CRIAR — imagem baixada do Cloudinary |
| `index.html` | Atualizar `<link rel="preload">` para `/hero.webp` |
| `App.tsx` | Atualizar `src` do `<img>` para `/hero.webp` |

### Por que funciona

- Vercel CDN serve arquivos estáticos em <50ms (vs 5-7s do Cloudinary com transformações)
- Zero latência de processamento — imagem já está pré-processada
- `fetchPriority="high"` e `loading="eager"` já estão no `<img>` — mantidos
- `<link rel="preload">` já está no `<head>` — apenas atualizar o href

---

## Resultado Esperado

| Métrica | Antes | Depois (estimado) |
|---------|-------|-------------------|
| LCP (mobile) | ~8s | ~1.5-2s |
| TTFB image | ~5-7s | <100ms |
| Lighthouse Score | <70 | >70 |
