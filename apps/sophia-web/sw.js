/* SophIA 1.0: cache public static assets only, never user input. */
const CACHE = 'sophia-static-v1.0.0-v2';
const ASSETS = ['./', './index.html', './privacidade.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './identidade/icone-lanterna.png', './assets/launcher.js', './assets/clipboard.js', './assets/provider-handoff.js', './assets/router.js', './assets/feedback.js', './assets/catalog-loader.js', './assets/catalog-manifest.json', './assets/catalog-baseline.json', './assets/skill-index.json'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('sophia-static-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const scopePath = new URL(self.registration.scope).pathname;
  if (!url.pathname.startsWith(scopePath)) return;
  const filename = url.pathname.slice(scopePath.length);
  const allow = ['', 'index.html', 'privacidade.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'identidade/icone-lanterna.png', 'assets/launcher.js', 'assets/clipboard.js', 'assets/provider-handoff.js', 'assets/router.js', 'assets/feedback.js', 'assets/catalog-loader.js', 'assets/catalog-manifest.json', 'assets/catalog-baseline.json', 'assets/skill-index.json'];
  if (!allow.includes(filename)) return;
  // Network-first for HTML AND application modules avoids a new HTML / stale JS mismatch
  // during a PWA update. Offline falls back to a validated pre-cached copy.
  const key = new Request(url.origin + url.pathname);
  if (filename === '' || filename.endsWith('.html') || filename.startsWith('assets/') && filename.endsWith('.js') || filename === 'assets/skill-index.json' || filename === 'assets/catalog-manifest.json') {
    event.respondWith(fetch(new Request(req, {cache:'no-store'})).then(response => {
      if (response.ok) {
        const clone = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(key, clone)));
      }
      return response;
    }).catch(() => caches.match(key).then(cached => cached || Response.error())));
  } else {
    event.respondWith(caches.match(key).then(cached => cached || fetch(req)));
  }
});
