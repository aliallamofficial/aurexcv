const CACHE_NAME = 'ali-cv-builder-v7'; // ترقية الإصدار لتحديث الكاش على الهواتف فوراً
const STATIC_ASSETS = [
  '/ali-cv-builder/',
  '/ali-cv-builder/index.html',
  '/ali-cv-builder/style.css',
  '/ali-cv-builder/app.js',
  '/ali-cv-builder/manifest.json',
  '/ali-cv-builder/icons/apple-touch-icon-76x76.png',
  '/ali-cv-builder/icons/apple-touch-icon-120x120.png',
  '/ali-cv-builder/icons/apple-touch-icon-152x152.png',
  '/ali-cv-builder/icons/apple-touch-icon-180x180.png',
  '/ali-cv-builder/icons/icon-512x512.png' // إعادة إضافتها لضمان كاش سليم
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

// 3. مرحلة الجلب: استراتيجية "الشبكة أولاً" مع حماية الـ APIs ودعم الـ PWA وتخطي الروبوتات
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = event.request.url;

  // 1. استثناء طلبات الـ AI والدوال الخلفية من الكاش نهائياً
  if (requestUrl.includes('huggingface.co') || requestUrl.includes('optimize') || event.request.method !== 'GET') {
    return; 
  }

  // 2. الإصلاح السحري لفيسبوك: منع الـ Service Worker من اعتراض روبوتات فحص وسائل التواصل
  const userAgent = navigator.userAgent || '';
  if (
    userAgent.includes('facebookexternalhit') || 
    userAgent.includes('Facebot') || 
    userAgent.includes('Twitterbot') || 
    userAgent.includes('WhatsApp')
  ) {
    return; // اترك الطلب يمر مباشرة للشبكة دون تدخل الكاش ليعود برمز الاستجابة الطبيعي 200
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
        // ✅ يضمن فتح التطبيق حتى مع وجود ?source=pwa في غياب الإنترنت
        return caches.match(event.request, { ignoreSearch: true });
      })
  );
});
