/* AltLearn — service worker
 * - Funciona na raiz do domínio ou em subcaminho (ex.: GitHub Pages /altlearn/): tudo é relativo ao escopo.
 * - Guarda em cache o que for visitado (JS, CSS, imagens). Navegação: rede primeiro; offline entrega o index.html.
 * - A API (/api) nunca vai para o cache: o app guarda o progresso no aparelho e sincroniza depois.
 */
const VERSION = 'altlearn-v2'
const SCOPE = self.registration.scope // termina com "/"
const INDEX = new URL('index.html', SCOPE).href
const SHELL = [SCOPE, INDEX, new URL('manifest.webmanifest', SCOPE).href, new URL('favicon.svg', SCOPE).href, new URL('icons/icon-192.png', SCOPE).href]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => Promise.all(SHELL.map((url) => cache.add(url).catch(() => {})))).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.includes('/api/')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => { const copy = response.clone(); caches.open(VERSION).then((c) => c.put(INDEX, copy)); return response })
        .catch(() => caches.match(INDEX)),
    )
    return
  }

  // arquivos estáticos: cache primeiro, atualiza em segundo plano
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response.ok) { const copy = response.clone(); caches.open(VERSION).then((c) => c.put(request, copy)) }
        return response
      }).catch(() => cached)
      return cached || network
    }),
  )
})
