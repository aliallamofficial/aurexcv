// ==========================================================================
// 🛡️ AUREX CV QUANTUM SERVICE WORKER (OFFLINE INFRASTRUCTURE ENGINE)
// ==========================================================================

const CACHE_NAME = 'aurex-cv-v5-cache';
const STATIC_ASSETS = [
  '/aurexcv/',
  '/aurexcv/index.html',
  '/aurexcv/assets/style.css',
  '/aurexcv/js/i18n.js',
  '/aurexcv/js/ai.js',
  '/aurexcv/js/core.js',
  '/aurexcv/js/app.js',
  '/aurexcv/manifest.json'
];

// 1️⃣ مرحلة التثبيت: كاش أصول النظام الأساسية فوراً
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn('⚠️ Cache bypass item:', url);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 2️⃣ مرحلة التفعيل: تنظيف مخلفات الكاش القديمة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3️⃣ محرك جلب البيانات الذكي: Network-First مع حماية الـ Local Fallback
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;

  // تخطي طلبات الذكاء الاصطناعي السحابية أو التيليجرام لمنع تعطلها
  if (requestUrl.includes('huggingface.co') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
