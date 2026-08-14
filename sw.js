/* Lumen Focus service worker — offline cache for the production build. */
const CACHE = 'lumen-focus-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo.svg',
  './src/css/style.css',
  './src/js/app.js',
  './src/js/audio.js',
  './src/js/stats.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});