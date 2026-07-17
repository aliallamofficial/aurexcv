const CACHE_NAME = 'ali-cv-builder-v6'; // تم ترقية الإصدار لتحديث الهاتف فوراً
const STATIC_ASSETS = [
  '/ali-cv-builder/',
  '/ali-cv-builder/index.html',
  '/ali-cv-builder/style.css',
  '/ali-cv-builder/app.js',
  '/ali-cv-builder/manifest.json',
  '/ali-cv-builder/icons/apple-touch-icon-76x76.png',
  '/ali-cv-builder/icons/apple-touch-icon-120x120.png',
  '/ali-cv-builder/icons/apple-touch-icon-152x152.png',
  '/ali-cv-builder/icons/apple-touch-icon-180x180.png'
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

// 3. مرحلة الجلب: استراتيجية "الشبكة أولاً" مع حماية الـ APIs ودعم الـ PWA
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = event.request.url;

  // استثناء طلبات الـ AI والدوال الخلفية من الكاش نهائياً
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
        // ✅ الإصلاح السحري: ignoreSearch يضمن فتح التطبيق حتى مع وجود ?source=pwa
        return caches.match(event.request, { ignoreSearch: true });
      })
  );
});
