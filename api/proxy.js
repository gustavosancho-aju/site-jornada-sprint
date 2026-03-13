/**
 * Vercel Edge Function — CORS proxy for Partytown
 *
 * Partytown runs third-party scripts in a Web Worker via fetch().
 * Scripts like fbevents.js (Meta Pixel) don't have CORS headers,
 * so the worker fetch is blocked. This proxy fetches the script
 * server-side and returns it with the required CORS header.
 *
 * Only allows scripts from a strict allowlist to prevent misuse.
 */

export const config = { runtime: 'edge' };

const ALLOWED_HOSTS = [
  'connect.facebook.net',
  'www.googletagmanager.com',
  'www.google-analytics.com',
  'snap.licdn.com',
];

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get('url');

  if (!urlParam) {
    return new Response('Missing url param', { status: 400 });
  }

  let targetUrl;
  try {
    targetUrl = new URL(urlParam);
  } catch {
    return new Response('Invalid url', { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
    return new Response('Host not allowed', { status: 403 });
  }

  const res = await fetch(targetUrl.href);

  if (!res.ok) {
    return new Response(`Upstream error: ${res.status}`, { status: 502 });
  }

  const body = await res.text();

  return new Response(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
