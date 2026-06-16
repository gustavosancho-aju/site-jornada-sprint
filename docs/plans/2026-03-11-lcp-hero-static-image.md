# LCP Hero Image — Static Asset Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduzir o LCP de 8s para <2s no mobile ao servir a imagem hero como arquivo estático no Vercel em vez do Cloudinary com transformações on-the-fly.

**Architecture:** Download da imagem já processada (background removed) do Cloudinary → salvar em `public/hero.webp` → atualizar `index.html` (preload) e `App.tsx` (img src) para referenciar o arquivo local → deploy no Vercel serve o arquivo via CDN em <50ms.

**Tech Stack:** Vite (public/ = assets estáticos servidos na raiz), React TSX, Vercel CDN, `curl` para download

---

### Task 1: Criar pasta public/ e baixar a imagem processada

**Files:**
- Create: `public/hero.webp`

**Step 1: Criar a pasta public/**

```bash
mkdir public
```

Run via cmd: `mkdir C:\Users\Gustavo\Documents\JornadaSprint\public`

Expected: Diretório criado (ou já existe — não é erro)

**Step 2: Baixar a imagem do Cloudinary**

Run via cmd:
```bash
curl -L -o "C:\Users\Gustavo\Documents\JornadaSprint\public\hero.webp" "https://res.cloudinary.com/dbbpxrebg/image/upload/e_background_removal/e_background_removal/f_webp/cs_srgb/q_auto:best/dpr_1/Generated_Image_March_01_2026_-_4_00PM_kydwnk"
```

Expected: Download progride e arquivo salvo. Sem erros HTTP 4xx/5xx.

**Step 3: Verificar que o arquivo existe e tem tamanho razoável**

Run via cmd:
```bash
dir "C:\Users\Gustavo\Documents\JornadaSprint\public\hero.webp"
```

Expected: Arquivo visível, tamanho entre 100 KB e 800 KB. Se tamanho = 0 bytes ou < 10 KB, o download falhou — repetir Step 2.

**Step 4: Commit**

```bash
git add public/hero.webp
git commit -m "perf: add pre-processed hero image as static asset [LCP fix]"
```

---

### Task 2: Atualizar preload em index.html

**Files:**
- Modify: `index.html:8`

**Step 1: Verificar a linha atual**

Linha 8 de `index.html` deve conter:
```html
<link rel="preload" as="image" href="https://res.cloudinary.com/dbbpxrebg/image/upload/e_background_removal/e_background_removal/f_webp/cs_srgb/q_auto:best/dpr_1/Generated_Image_March_01_2026_-_4_00PM_kydwnk" fetchpriority="high" />
```

**Step 2: Substituir href do preload**

Alterar o `href` para o asset local. O resultado deve ser:
```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
```

Usar Edit tool — substituição exata do atributo href (manter `rel`, `as` e `fetchpriority` inalterados).

**Step 3: Verificar a linha atualizada**

Confirmar que `index.html` linha 8 agora aponta para `/hero.webp` e não contém mais a URL do Cloudinary.

**Step 4: Commit**

```bash
git add index.html
git commit -m "perf: update hero preload to local static asset [LCP fix]"
```

---

### Task 3: Atualizar src do img em App.tsx

**Files:**
- Modify: `App.tsx:256`

**Step 1: Localizar a tag img no App.tsx**

A tag `<img>` do hero está em App.tsx (~linha 255). Deve ter:
```tsx
src="https://res.cloudinary.com/dbbpxrebg/image/upload/e_background_removal/e_background_removal/f_webp/cs_srgb/q_auto:best/dpr_1/Generated_Image_March_01_2026_-_4_00PM_kydwnk"
```

**Step 2: Substituir o src**

Trocar o `src` para o asset local:
```tsx
src="/hero.webp"
```

Manter todos os outros atributos inalterados (`alt`, `className`, `style`, `fetchPriority="high"`, `loading="eager"`). O resultado final deve ser:
```tsx
<img
  src="/hero.webp"
  alt="Gustavo Sancho IA Specialist"
  className="h-full w-auto max-w-none object-contain block hero-float origin-bottom"
  style={{ marginBottom: '-1px' }}
  fetchPriority="high"
  loading="eager"
/>
```

**Step 3: Verificar que não há mais referência ao Cloudinary na tag img**

Confirmar que o `src` é `/hero.webp`.

**Step 4: Commit**

```bash
git add App.tsx
git commit -m "perf: serve hero image from local static asset [LCP fix]"
```

---

### Task 4: Verificar localmente com dev server

**Files:** Nenhum modificado

**Step 1: Iniciar o servidor de desenvolvimento**

```bash
npm run dev
```

Abrir `http://localhost:3000` no browser.

**Step 2: Verificar visualmente a imagem hero**

Confirmar que:
- A imagem do Gustavo aparece corretamente na seção hero
- O fundo está transparente (não tem quadrado branco ou preto)
- A imagem flutua (animação `hero-float` ainda funciona)

**Step 3: Verificar no DevTools que a imagem é servida localmente**

Abrir DevTools → Network → filtrar por `hero.webp`.
Confirmar:
- URL: `http://localhost:3000/hero.webp`
- Status: 200
- Sem requisições ao `res.cloudinary.com` para a imagem hero

**Step 4: Parar o dev server**

Ctrl+C no terminal.

---

### Task 5: Build + Deploy

**Files:** Nenhum modificado

**Step 1: Executar o build de produção**

```bash
npm run build
```

Expected: Build concluído sem erros. O arquivo `dist/hero.webp` deve aparecer na raiz do dist (Vite copia `public/` para `dist/` automaticamente).

**Step 2: Verificar que hero.webp está no dist**

Run:
```bash
dir "C:\Users\Gustavo\Documents\JornadaSprint\dist\hero.webp"
```

Expected: Arquivo presente no dist.

**Step 3: Deploy para produção**

Run via cmd:
```bash
cd C:\Users\Gustavo\Documents\JornadaSprint && vercel deploy --prod --yes
```

Expected: Deploy bem-sucedido, URL de produção exibida.

**Step 4: Verificar na URL de produção**

Abrir `https://jornada-sprint.vercel.app` e confirmar que a imagem hero carrega.

**Step 5: Commit final (se houver arquivos não commitados)**

```bash
git status
```

Se houver arquivos pendentes:
```bash
git add .
git commit -m "perf: LCP hero image optimization — static asset via Vercel CDN"
```
