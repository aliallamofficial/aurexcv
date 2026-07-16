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
  '/logo.png' // مضافة مؤقتاً لحين استقرار الأيقونات
];

// 1. مرحلة التثبيت: تخزين الملفات مع تفادي الفشل الكلي لو تعذر ملف واحد
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // تعديل احترافي: استخدام Promise.all لضمان عدم انهيار الكاش لو سقط ملف من القائمة
      return Promise.all(
        STATIC_ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn('تنبيه: تعذر تخزين الملف في الكاش:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 2. مرحلة التفعيل: مسح الكاش القديم فوراً
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

// 3. مرحلة الجلب: شبكة أولاً مع حماية الـ APIs والرجوع التلقائي للكاش
self.addEventListener('fetch', event => {
  // تجاهل طلبات الـ chrome-extension والبروتوكولات غير المدعومة
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = event.request.url;

  // ⚠️ تحسين هام: استثناء طلبات الـ API الخاصة بالذكاء الاصطناعي (مثل HuggingFace) من التخزين المؤقت
  if (requestUrl.includes('huggingface.co') || event.request.method !== 'GET') {
    return; // دع الطلب يمر مباشرة إلى الشبكة دون تخزينه
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // لو نجح الطلب نقوم بتحديث الكاش بالنسخة الأحدث
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // لو انقطع الاتصال، ابحث عن الملف في الكاش
        return caches.match(event.request).then(cachedResponse => {
          // تحسين برو: لو الملف غير متوفر بالكاش، رجعه للصفحة الرئيسية بدلاً من إظهار شاشة خطأ رمادية
          return cachedResponse || caches.match('/index.html');
        });
      })
  );
});
