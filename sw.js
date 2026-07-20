// ==========================================================================
// 🛡️ AUREX CV QUANTUM SERVICE WORKER (OFFLINE INFRASTRUCTURE ENGINE)
// ==========================================================================

// تم تحديث رقم الإصدار لإجبار المتصفح على تحميل الهيكلية البرمجية الجديدة فوراً
const CACHE_NAME = 'aurex-cv-v6.0-cache';

// استخدام المسارات النسبية المتوافقة تماماً مع بنية المشروع على GitHub Pages
const STATIC_ASSETS = [
  './',
  './index.html',
  './about.html',           // 🚀 إضافة صفحة نبذة عنا للكاش
  './privacy.html',         // 🚀 إضافة صفحة سياسة الخصوصية للكاش
  './feedback.html',        // صفحة الدعم والتواصل
  './blog-ats.html',        // المقال الأول: تخطي الـ ATS
  './blog-executive.html',  // 🚀 المقال الثاني: السير التنفيذية
  './blog-ai.html',         // 🚀 المقال الثالث: تحسين الذكاء الاصطناعي
  './assets/style.css',
  './assets/logo.svg',      // هوية التطبيق البصرية والأيقونة التكيفية
  './js/i18n.js',
  './js/ai.js',
  './js/core.js',
  './js/app.js',
  './manifest.json'
];

// 1️⃣ مرحلة التثبيت: كاش أصول النظام الأساسية فوراً لضمان جهوزية الـ Offline
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn('⚠️ Cache bypass item:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 2️⃣ مرحلة التفعيل: تنظيف مخلفات الكاش القديمة وتحديث النسخ بدون تعارض
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Aurex SW] Purging obsolete cache layer:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3️⃣ محرك جلب البيانات الذكي: Network-First مع حماية الـ Local Fallback للـ SEO والأداء
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;

  // تخطي طلبات الذكاء الاصطناعي الخارجية أو عمليات الإرسال (POST/PUT) لمنع تعطلها
  if (requestUrl.includes('huggingface.co') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // التحقق من سلامة الاستجابة قبل تخزينها ديناميكياً
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // في حال انقطاع الشبكة، يتم استدعاء الملف فوراً من الكاش المحلي المسبق
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // إذا كان الطلب لصفحة التنقل الأساسية وغير موجودة بالكاش، نرجع الصفحة الرئيسية كـ Fallback
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
