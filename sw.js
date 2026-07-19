const CACHE_NAME = 'ali-cv-builder-v10'; // تم الترقية لإجبار المتصفحات وفيسبوك على التحديث فوراً
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

// 1️⃣ مرحلة التثبيت: تخزين الملفات الأساسية بطريقة مرنة وآمنة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn('⚠️ تنبيه: تعذر تخزين الملف التالي في الكاش المؤقت:', url, err);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// 2️⃣ مرحلة التفعيل: مسح إصدارات الكاش القديمة فوراً لضمان تحديث المنصة
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

// 3️⃣ مرحلة الجلب الاستراتيجية: "الشبكة أولاً" مع التخطي الذكي للروبوتات وطلبات الـ AI
self.addEventListener('fetch', event => {
  // تجاهل أي طلبات ليست من نوع HTTP أو HTTPS (مثل chrome-extension)
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = event.request.url;

  // 🚫 استثناء طلبات الذكاء الاصطناعي، الدوال الخلفية، ونظام التقييم عبر تليجرام من الكاش نهائياً
  if (
    requestUrl.includes('huggingface.co') || 
    requestUrl.includes('ali-cv-backend') || 
    requestUrl.includes('api.telegram.org') || 
    event.request.method !== 'GET'
  ) {
    return; 
  }

  // 🤖 فحص ذكي ومزدوج لروبوتات وسائل التواصل لتخطي الكاش وضمان ظهور الـ Preview بشكل سليم
  const headerUA = event.request.headers.get('user-agent') || '';
  const navigatorUA = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
  const combinedUA = `${headerUA} ${navigatorUA}`.toLowerCase();

  if (
    combinedUA.includes('facebookexternalhit') || 
    combinedUA.includes('facebot') || 
    combinedUA.includes('twitterbot') || 
    combinedUA.includes('whatsapp') ||
    combinedUA.includes('linkedinbot')
  ) {
    return; // اترك الروبوت يمر مباشرة للسيرفر الأصلي ليعود برمز 200 وصورة الـ Preview السليمة
  }

  // تنفيذ استراتيجية Network-First مع العودة للكاش عند انقطاع الإنترنت
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // تأكيد أن الاستجابة صالحة قبل تخزينها
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // في حال انقطاع الشبكة بالكامل، قم بالقراءة من الكاش
        return caches.match(event.request, { ignoreSearch: true });
      })
  );
});
