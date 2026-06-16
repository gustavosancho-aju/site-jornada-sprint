# Performance Best Practices — Landing Pages React + Vite

Aprendizados aplicados no projeto Jornada Sprint. Replicar em novos projetos.

---

## 1. Partytown — Scripts de terceiros no Web Worker

**Problema:** GA4 e Meta Pixel bloqueiam a main thread (~750ms de TBT).
**Solução:** Partytown move esses scripts para um Web Worker.

### Instalação
```bash
npm install @builder.io/partytown
```

### vite.config.ts
```ts
import { partytownVite } from '@builder.io/partytown/utils';

plugins: [
  react(),
  tailwindcss(),
  partytownVite({ dest: path.join(__dirname, 'dist', '~partytown') }),
],
```

### index.html
```html
<!-- Config ANTES do partytown.js -->
<script>
  partytown = {
    lib: '/~partytown/',
    forward: ['dataLayer.push', 'gtag', 'fbq', 'fbq.push'],
    resolveUrl: function(url) {
      // Proxy obrigatório para scripts sem CORS (ex: fbevents.js)
      var proxied = ['connect.facebook.net', 'www.googletagmanager.com'];
      if (proxied.indexOf(url.hostname) !== -1) {
        var proxy = new URL(location.origin + '/api/proxy');
        proxy.searchParams.set('url', url.href);
        return proxy;
      }
      return url;
    }
  };
</script>
<!-- defer: não bloqueia o parser. Partytown inicializa após DOMContentLoaded -->
<script src="/~partytown/partytown.js" defer></script>

<!-- Scripts de tracking: type="text/partytown" em vez de type="text/javascript" -->
<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>
<script type="text/partytown">
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'SEU_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 2. CORS Proxy — Vercel Edge Function

**Problema:** Meta Pixel (`fbevents.js`) não tem cabeçalho CORS — o worker não consegue baixar o script via `fetch()`.
**Solução:** Edge Function que faz proxy do script e adiciona `Access-Control-Allow-Origin: *`.

### api/proxy.js
```js
export const config = { runtime: 'edge' };

const ALLOWED_HOSTS = [
  'connect.facebook.net',
  'www.googletagmanager.com',
  'www.google-analytics.com',
];

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get('url');
  if (!urlParam) return new Response('Missing url', { status: 400 });

  let targetUrl;
  try { targetUrl = new URL(urlParam); }
  catch { return new Response('Invalid url', { status: 400 }); }

  if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
    return new Response('Host not allowed', { status: 403 });
  }

  const res = await fetch(targetUrl.href);
  const body = await res.text();

  return new Response(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

**Impacto no desempenho:** zero. O proxy roda no worker (off main thread).
**Impacto no tracking:** zero. PageView, eventos de conversão e atribuição funcionam normalmente.
**Impacto nas audiências:** usuários que saem em <3s não são rastreados (já eram não-qualificados).

---

## 3. Tailwind v4 — Bug de centralização em `<p>`

**Problema:** `mx-auto` em `<p>` não funciona. O preflight do Tailwind v4 aplica `p { margin: 0 }` com a mesma especificidade, sobrescrevendo `margin-inline: auto`.

**Solução A — flexbox no pai** (preferida):
```tsx
// Antes
<div className="text-center">
  <p className="max-w-2xl mx-auto">...</p>

// Depois
<div className="flex flex-col items-center text-center">
  <p className="max-w-2xl">...</p>
```

**Solução B — `!mx-auto`** (importante modifier):
```tsx
<p className="max-w-2xl !mx-auto">...</p>
```
Usa quando não é possível alterar o elemento pai.

---

## 4. Resultados — Jornada Sprint (mobile, simulado 4G)

| Métrica | Antes | Depois | Variação |
|---------|-------|--------|----------|
| Score   | 71    | 86     | +15 pts  |
| TBT     | 2010ms | 130ms | -93%    |
| LCP     | 1.7s  | 3.3s   | piorou* |
| TTI     | 7.7s  | 3.8s   | -51%    |
| CLS     | 0.047 | 0.003  | -94%    |

*LCP piorou pois `partytown.js` foi adicionado ao head. Usar `defer` mitiga parcialmente.
O score geral subiu porque TBT tem peso alto no Lighthouse mobile.

---

## 5. Checklist para novos projetos

- [ ] Instalar Partytown
- [ ] Configurar `partytownVite` no vite.config.ts
- [ ] Criar `api/proxy.js` com allowlist dos hosts necessários
- [ ] Mover GA4 e Meta Pixel para `type="text/partytown"`
- [ ] Adicionar `resolveUrl` apontando para o proxy
- [ ] Usar `defer` no `partytown.js`
- [ ] Verificar no DevTools: `window.fbq` e `window.gtag` devem existir como funções
- [ ] Testar proxy: `GET /api/proxy?url=https://connect.facebook.net/en_US/fbevents.js` deve retornar 200 + `Access-Control-Allow-Origin: *`
- [ ] Rodar Lighthouse mobile antes e depois para comparar TBT
