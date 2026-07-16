const CACHE_NAME = 'ali-cv-builder-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-192-maskable.png',
  '/logo.png' // سيبها مؤقتا لحد ما تفصل الايقونات
];

// 1. مرحلة التثبيت: نخزن الملفات الثابتة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. مرحلة التفعيل: نمسح الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. مرحلة الجلب: شبكة أولاً، ثم الكاش، مع تخزين اي استجابة جديدة
self.addEventListener('fetch', event => {
  // نتجاهل طلبات الـ chrome-extension
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // لو الطلب نجح نخزنه عشان نستخدمه اوفلاين بعدين
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // لو النت فصل نجيب من الكاش
        return caches.match(event.request);
      })
  );
});
