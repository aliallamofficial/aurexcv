const CACHE_NAME = 'ali-cv-builder-v11';
const STATIC_ASSETS = [
  '/ali-cv-builder/',
  '/ali-cv-builder/index.html',
  '/ali-cv-builder/style.css',
  '/ali-cv-builder/app.js',
  '/ali-cv-builder/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(STATIC_ASSETS.map(url => cache.add(url).catch(err => console.warn('⚠️ Cache warn:', url))));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;
  const requestUrl = event.request.url;

  if (requestUrl.includes('huggingface.co') || requestUrl.includes('ali-cv-backend') || requestUrl.includes('api.telegram.org') || event.request.method !== 'GET') {
    return; 
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
