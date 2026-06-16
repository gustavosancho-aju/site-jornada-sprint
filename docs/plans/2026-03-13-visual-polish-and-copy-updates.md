# Visual Polish & Copy Updates — Changelog

**Data:** 2026-03-13
**Branch:** `feature/copy-reconstruction-v2`
**Deploy:** https://jornada-sprint.vercel.app
**Status:** ✅ Concluído e em produção

---

## Contexto

Após a reconstrução completa da landing page (copy-reconstruction-v2) e a otimização de LCP mobile (Score 59 → 94, LCP 6.7s → 2.4s, CLS 0.272 → 0.04), foram feitos ajustes visuais finos e atualizações de copy para polir a experiência final.

---

## 1. Otimização de Performance (LCP Mobile)

**Score PageSpeed:** 59 → **94** ✅
**LCP:** 6.7s → **2.4s**
**CLS:** 0.272 → **0.04**

### Técnicas aplicadas:

| Técnica | Arquivo | Impacto |
|---------|---------|---------|
| Tailwind v4 preflight shield — CSS crítico inline no `<head>` | `index.html` (linhas 22-57) | Elimina repaint quando bundle CSS chega |
| Hero permanente em HTML puro — fora do `#root` React | `index.html` (linhas 65-131) | Hero pinta antes do JS carregar |
| Imagens responsivas com `<picture>` | `index.html` (linhas 106-110) | 11KB mobile vs 740KB original |
| Preload responsivo com `media` queries | `index.html` (linhas 10-12) | Só baixa o tamanho necessário |
| `aspect-ratio` + `contain:layout paint` | `index.html` (linha 104) | Elimina CLS do container hero |
| Font `display=optional` + fallback metrics | `index.html` (linhas 45-52) | Zero CLS de fontes |

### Imagens hero geradas:

| Arquivo | Tamanho | Breakpoint |
|---------|---------|------------|
| `public/hero-480.webp` | 11KB | ≤767px (mobile) |
| `public/hero-768.webp` | 21KB | 768-1199px (tablet) |
| `public/hero-1200.webp` | 41KB | ≥1200px (desktop) |

---

## 2. Ajustes Visuais — Imagem Hero

### 2.1 Imagem hero ampliada
- **Arquivo:** `index.html` (linha 104)
- **Antes:** `max-height:60vh`
- **Depois:** `max-height:55vh` com `aspect-ratio:16/10`
- **Motivo:** Dar mais harmonia visual entre texto e imagem

### 2.2 Gap entre CTA e imagem corrigido
- **Arquivo:** `index.html` (linha 104)
- **Antes:** `aspect-ratio:4/5; max-height:75vh` (retrato — criava gap preto enorme)
- **Depois:** `aspect-ratio:16/10; max-height:55vh` (paisagem — proporcional à imagem real 1200×670)
- **Motivo:** Usuário reportou distância excessiva entre botão verde e foto

### 2.3 Imagem não corta mais a cabeça
- **Arquivo:** `index.html` (linha 109)
- **Antes:** `object-fit:contain; align-items:flex-end` (imagem inteira mas posicionada embaixo)
- **Depois:** `object-fit:cover; object-position:top center; align-items:stretch` (prioriza topo da imagem)
- **Motivo:** Usuário reportou que o topo (cabeça) estava sendo cortado

**Estado final do container hero (linha 104):**
```html
<div style="position:relative;display:flex;justify-content:center;align-items:stretch;aspect-ratio:16/10;max-height:55vh;overflow:hidden;contain:layout paint;">
```

**Estado final da tag img (linha 109):**
```html
<img src="/hero-1200.webp" alt="Gustavo Sancho IA Specialist"
     style="display:block;width:100%;height:100%;object-fit:cover;object-position:top center;position:relative;z-index:10;"
     fetchpriority="high" width="1200" height="670" />
```

---

## 3. Proporção dos Títulos de Seção

Padronização dos títulos `<h2>` em todas as seções para criar hierarquia visual consistente.

| Seção | Antes | Depois | Arquivo |
|-------|-------|--------|---------|
| ProblemaSection | `text-4xl md:text-6xl lg:text-8xl` | Mantido (já era o maior) | `ProblemaSection.tsx` |
| ParaQuemESection | `text-3xl md:text-6xl` | `text-4xl md:text-6xl lg:text-7xl` | `ParaQuemESection.tsx` |
| OfertaSection | `text-3xl md:text-6xl` | `text-4xl md:text-6xl lg:text-7xl` | `OfertaSection.tsx` |
| NaoEParaSection | `text-4xl md:text-6xl` | `text-4xl md:text-6xl lg:text-7xl` | `NaoEParaSection.tsx` |
| ResultadosReaisSection | `text-4xl md:text-6xl` | `text-4xl md:text-6xl lg:text-7xl` | `ResultadosReaisSection.tsx` |
| FAQSection | `text-4xl md:text-5xl` | `text-4xl md:text-6xl` | `FAQSection.tsx` |
| GarantiaSection | `text-4xl md:text-5xl` | `text-4xl md:text-6xl` | `GarantiaSection.tsx` |

---

## 4. Atualizações de Copy

### 4.1 Subtítulo Hero (4 iterações)
- **Arquivo:** `index.html` (linha 90)
- **Versão final:**
```
Aprender na prática o passo a passo para tirar seu projeto do papel, e ter resultados
reais com a IA. Tenha acesso a mais de 8 imersões práticas, lives mensais e um bônus
de 1 hora de mentoria individual. É só fechar e agendar seu horário!
```
- "1 hora de mentoria individual" destacado em verde (`<strong>` com `color:#22c55e`)

### 4.2 Remoção de referências pessoais na Mentoria
- **Arquivo:** `components/MentoriaSection.tsx`
- **Alterações:**
  - Título: ~~"1 hora individual com Gustavo"~~ → **"Sessão individual gravada"**
  - Item lista: ~~"Sessão 1:1 — só você e Gustavo"~~ → **"Sessão 1:1 — sessão individual gravada"**
  - Card visual: ~~"Individual com Gustavo Sancho"~~ → **"Sessão individual gravada"**

- **Arquivo:** `components/OfertaSection.tsx`
- **Alteração:**
  - Descrição: ~~"1 hora individual com Gustavo Sancho para tirar..."~~ → **"Sessão individual gravada para tirar..."**

### 4.3 Título ProblemaSection — reorganizado em 2 linhas
- **Arquivo:** `components/ProblemaSection.tsx` (linhas 28-32)
- **Antes:** 5 linhas separadas ("Para" / "QUEM" / "é a" / "JORNADA" / "SPRINT")
- **Depois:** 2 linhas ("Para quem é a" / "JORNADA SPRINT" em bloco único preto+verde)

**Código final:**
```tsx
Para quem é a<br/>
<span className="inline-block bg-black text-brand-green px-6 py-2 transform -rotate-2 mt-4 shadow-[0_0_30px_rgba(0,0,0,0.3)] font-black">JORNADA SPRINT</span>
```

---

## 5. Arquivos Modificados (Resumo)

| Arquivo | Tipo de Mudança |
|---------|----------------|
| `index.html` | Hero container, imagem, subtítulo, CSS crítico, preloads |
| `components/ProblemaSection.tsx` | Título reorganizado (2 linhas) |
| `components/ParaQuemESection.tsx` | Título `lg:text-7xl` |
| `components/OfertaSection.tsx` | Título `lg:text-7xl` + copy mentoria |
| `components/NaoEParaSection.tsx` | Título `lg:text-7xl` |
| `components/ResultadosReaisSection.tsx` | Título `lg:text-7xl` |
| `components/FAQSection.tsx` | Título `md:text-6xl` |
| `components/GarantiaSection.tsx` | Título `md:text-6xl` |
| `components/MentoriaSection.tsx` | Remoção referências pessoais, "sessão individual gravada" |

---

## 6. Infraestrutura

- **Branch:** `feature/copy-reconstruction-v2`
- **Vercel Project:** `prj_RnjpRvY2U9HK5SGHOrmQEbT84jeG`
- **Org:** `team_4ZtOzxyEqNsIzjKs6dPMWdQB`
- **Deploy:** `npx vercel --prod --yes`
- **URL Produção:** https://jornada-sprint.vercel.app
