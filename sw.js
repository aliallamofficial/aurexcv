const CACHE_NAME = 'ali-cv-builder-v5';
const STATIC_ASSETS = [
  '/ali-cv-builder/',
  '/ali-cv-builder/index.html',
  '/ali-cv-builder/style.css',
  '/ali-cv-builder/app.js',
  '/ali-cv-builder/manifest.json',
  '/ali-cv-builder/icons/icon-192x192.png',
  '/ali-cv-builder/icons/icon-512x512.png',
  '/ali-cv-builder/icons/icon-maskable-192x192.png'
];

// 1. مرحلة التثبيت: تخزين الملفات الأساسية بطريقة مرنة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn('تنبيه: تعذر تخزين الملف التالي في الكاش المؤقت:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. مرحلة التفعيل: مسح الملفات وإصدارات الكاش القديمة فوراً لتحديث التطبيق
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

// 3. مرحلة الجلب: استراتيجية "الشبكة أولاً" مع حماية الـ APIs
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = event.request.url;

  // استثناء طلبات HuggingFace والدوال الخلفية من الكاش نهائياً
  if (requestUrl.includes('huggingface.co') || requestUrl.includes('optimize') || event.request.method !== 'GET') {
    return; 
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
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
