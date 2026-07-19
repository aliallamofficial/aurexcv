const CACHE_NAME = 'ali-cv-builder-v10'; // تم الترقية لإجبار المتصفحات والمنصات على التحديث فوراً
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

// 2️⃣ مرحلة التنشيط: تنظيف كاش الإصدارات القديمة لضمان الكفاءة والأمان
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🧹 جاري حذف الكاش القديم والمستهلك لتوفير المساحة:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3️⃣ مرحلة جلب البيانات الذكية: استراتيجية خادم الإنترنت أولاً ثم العودة للكاش
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;

  // استثناء خدمات الذكاء الاصطناعي وبوت تيليجرام من الكاش لضمان معالجة البيانات الفورية
  if (
    requestUrl.includes('netlify/functions') || 
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
        // في حال انقطاع الشبكة، قم بفتح ملفات الكاش فوراً وتوفيرها للمستخدم
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // إذا كان الطلب لصفحة رئيسية ولم يتم العثور عليها، وجّهه للمسار الرئيسي للتطبيق
          if (event.request.mode === 'navigate') {
            return caches.match('/ali-cv-builder/');
          }
        });
      })
  );
});
