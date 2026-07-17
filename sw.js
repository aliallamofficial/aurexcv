const CACHE_NAME = 'ali-cv-builder-v9'; // تم الترقية لإجبار المتصفحات وفيسبوك على التحديث فوراً
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
  '/ali-cv-builder/icons/icon-512x512.png'
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

// 3. مرحلة الجلب: استراتيجية "الشبكة أولاً" وتخطي الروبوتات تماماً لمنع الأخطاء
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = event.request.url;

  // استثناء طلبات الـ AI والدوال الخلفية من الكاش نهائياً
  if (requestUrl.includes('huggingface.co') || requestUrl.includes('optimize') || event.request.method !== 'GET') {
    return; 
  }

  // الإصلاح السحري: تحويل بيانات الزائر لحروف صغيرة واكتشاف روبوتات وسائل التواصل لتخطي الكاش تماماً
  const ua = (navigator.userAgent || '').toLowerCase();
  if (
    ua.includes('facebookexternalhit') || 
    ua.includes('facebot') || 
    ua.includes('twitterbot') || 
    ua.includes('whatsapp')
  ) {
    return; // اترك الروبوت يمر مباشرة للسيرفر الأصلي ليعود برمز 200 وصورة سليمة
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
        return caches.match(event.request, { ignoreSearch: true });
      })
  );
});
