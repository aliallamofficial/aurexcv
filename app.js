// ========================================================
// 💡 مصفوفة النصائح الجاهزة لتغيير النصيحة تلقائياً محلياً (عند عدم الاتصال)
// ========================================================
const cvTips = [
    "تجنب وضع صورتك الشخصية إذا كنت تقدم على شركات عالمية تعتمد نظام ATS تماماً.",
    "احرص على ألا تتجاوز سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات.",
    "استخدم أرقاماً ونسباً مئوية حقيقية لإثبات إنجازاتك (مثال: زيادة المبيعات بنسبة 20%).",
    "البريد الإلكتروني المهني يجب أن يحتوي على اسمك الحقيقي، ابتعد تماماً عن الأسماء مستعارة.",
    "الكلمات المفتاحية المأخوذة من إعلان الوظيفة نفسه هي مفتاحك السحري لتخطي فلترة الـ ATS."
];

// 🛠️ قاعدة البيانات المحلية للإرشادات النصية والمهام المقترحة بدقة بالغة لكل وظيفة إبداعية
const jobGuidelines = {
    "graphic_designer": {
        title: "مصمم جرافيك",
        tips: [
            "ابتكار هويات بصرية كاملة تتوافق مع رؤية العلامة التجارية وشخصيتها.",
            "تصميم مواد إعلانية ومحتوى رقمي لمنصات التواصل الاجتماعي لزيادة التفاعل بنسبة %X.",
            "إتقان العمل على حزمة Adobe (Photoshop, Illustrator, InDesign) وإدارة الوقت بكفاءة."
        ]
    },
    "content_creator": {
        title: "صانع محتوى / كاتب محتوى",
        tips: [
            "كتابة سيناريوهات ومحتوى إبداعي متوافق مع قواعد الـ SEO لزيادة الزيارات العضوية لمدونتك وصحفتك.",
            "تحليل أداء المحتوى الرقمي وتطوير استراتيجيات النشر لرفع مستويات التفاعل والتأثير.",
            "التعاون مع فرق التصميم والمونتاج لإنتاج مواد مرئية استثنائية تخدم أهداف الحملة التسويقية."
        ]
    },
    "interior_designer": {
        title: "مهندس ديكور / مصمم داخلي",
        tips: [
            "إعداد مخططات ثنائية وثلاثية الأبعاد (3D Max, AutoCAD) بدقة هندسية وجمالية فائقة.",
            "اختيار الخامات، الأثاث، وتنسيق الإضاءة بما يتوافق مع ميزانية العميل واحتياجاته.", // تم إصلاح الخطأ الإملائي هنا
            "الإشراف الميداني الدقيق على التنفيذ لضمان مطابقة الواقع للمخططات والرسومات المعتمدة."
        ]
    }
};

function displayRandomLiveTip() {
    const tipTextElement = document.getElementById('cvTipText');
    if (tipTextElement) {
        const randomIndex = Math.floor(Math.random() * cvTips.length);
        tipTextElement.innerText = cvTips[randomIndex];
    }
}

// ========================================================
// 🛡️ دالة نجاح التحقق من Cloudflare Turnstile الأصلي
// ========================================================
function onTurnstileSuccess(token) {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 500);
    }
}
window.onTurnstileSuccess = onTurnstileSuccess;

// ========================================================
// 🚀 نظام تشغيل وإدارة جولة التطبيق الترحيبية (App Tour)
// ========================================================
const tourSteps = [
    {
        icon: "🚀",
        title: "مرحباً بك في مستقبلك المهني الجديد!",
        desc: "دعنا نأخذك في جولة سريعة مدتها دقيقة واحدة للتعرف على كيفية صناعة سيرة ذاتية لا تقهر بالذكاء الاصطناعي.",
        btnText: "ابدأ الرحلة الآن ←"
    },
    {
        icon: "📊",
        title: "مستشار الـ ATS الذكي لحظة بلحظة",
        desc: "أثناء كتابة بياناتك، سيقوم العداد الذكي بتقييم قوة مستندك وإعطائك نصائح حية لتخطي أنظمة الفلترة العالمية بنجاح.",
        btnText: "التالي مذهل كالعادة ←"
    },
    {
        icon: "✨",
        title: "الذكاء الاصطناعي في خدمتك",
        desc: "اضغط على زر الإنشاء ليقوم التطبيق بصياغة وتدقيق نصك لغوياً وإصدار نسخة احترافية بالكامل قابلة للنسخ والتعديل والتحميل كملف PDF نظيف ومتوافق.",
        btnText: "إنهاء الجولة والدخول للتطبيق 🎉"
    }
];

let currentTourStep = 0;

function initAppTour() {
    if (localStorage.getItem('cv_tour_completed') === 'true') return;
    const tourModal = document.getElementById('appTourModal');
    if (!tourModal) return;

    tourModal.classList.remove('hidden');
    const nextBtn = document.getElementById('nextTourBtn');
    const skipBtn = document.getElementById('skipTourBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTourStep++;
            if (currentTourStep < tourSteps.length) {
                updateTourContent();
            } else {
                closeTour();
            }
        });
    }
    if (skipBtn) skipBtn.addEventListener('click', closeTour);
}

function updateTourContent() {
    const stepData = tourSteps[currentTourStep];
    const progress = document.getElementById('tourProgress');
    const icon = document.getElementById('tourIcon');
    const title = document.getElementById('tourTitle');
    const desc = document.getElementById('tourDescription');
    const nextBtn = document.getElementById('nextTourBtn');

    if (progress) progress.innerText = `خطوة ${currentTourStep + 1} من ${tourSteps.length}`;
    if (icon) icon.innerText = stepData.icon;
    if (title) title.innerText = stepData.title;
    if (desc) desc.innerText = stepData.desc;
    if (nextBtn) nextBtn.innerText = stepData.btnText;
}

function closeTour() {
    const tourModal = document.getElementById('appTourModal');
    if (tourModal) tourModal.classList.add('hidden');
    localStorage.setItem('cv_tour_completed', 'true');
}

// ==========================================
// 🔥 ميزة قياس قوة وجاهزية الـ CV لنظام الـ ATS
// ==========================================
function initCVScoreGauge() {
    const inputs = ['name', 'jobTitle', 'experience', 'skills'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateCVScore);
    });
}

function calculateCVScore() {
    const name = document.getElementById('name')?.value.trim() || "";
    const jobTitle = document.getElementById('jobTitle')?.value.trim() || "";
    const experience = document.getElementById('experience')?.value.trim() || "";
    const skills = document.getElementById('skills')?.value.trim() || "";

    let score = 0;
    if (name.length > 4) score += 15;
    if (jobTitle.length > 3) score += 15;
    if (experience.length > 10) score += 20;
    if (experience.length > 50) score += 15;

    const skillsCount = skills.split(',').filter(s => s.trim().length > 1).length;
    if (skillsCount >= 2) score += 20;
    if (skillsCount >= 5) score += 15;

    const scoreFill = document.getElementById('scoreFill');
    const scoreText = document.getElementById('scoreText');
    const scoreStatus = document.getElementById('scoreStatus');

    if (scoreFill && scoreText && scoreStatus) {
        scoreFill.style.width = `${score}%`;
        scoreText.innerText = `${score}%`;

        if (score === 0) {
            scoreFill.style.background = '#475569';
            scoreStatus.innerHTML = '⚠️ الصندوق فارغ، يرجى تعبئة بياناتك للتحليل الفوري...';
        } else if (score < 40) {
            scoreFill.style.background = '#ef4444';
            scoreStatus.innerHTML = '⚠️ البيانات غير كافية، سيقوم نظام الـ ATS برفض الملف تلقائياً.';
        } else if (score < 75) {
            scoreFill.style.background = '#f59e0b';
            scoreStatus.innerHTML = '⚡ أداء جيد! أضف المزيد من المهارات أو تفاصيل الخبرة لتخطي حاجز المنافسة.';
        } else {
            scoreFill.style.background = '#10b981';
            scoreStatus.innerHTML = '🔥 مذهل! السيرة الذاتية مدعمة بكلمات مفتاحية قوية وجاهزة للقنص الرقمي.';
        }
    }
}

// Service Worker لخصائص الـ PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA Service Worker registered successfully!'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// ==========================================
// 🤖 دالة الاتصال بالذكاء الاصطناعي وتصفية النصوص من الإعلانات
// ==========================================
async function askAI(promptMessage, systemMessage) {
    const url = `https://text.pollinations.ai/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                messages: [{ role: "user", content: promptMessage }],
                system: systemMessage
            })
        });
        if (!response.ok) throw new Error();
        let rawText = await response.text();
        
        let cleanText = rawText
            .replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, '')
            .replace(/🌸 Ad 🌸[\s\S]*?\[Support our mission\][\s\S]*?\)/gi, '')
            .replace(/Powered by Pollinations\.AI free text APIs\./gi, '')
            .replace(/Support our mission to keep AI accessible for everyone\./gi, '')
            .trim();
            
        return cleanText;
    } catch (error) {
        throw error;
    }
}

// ==========================================
// 🎉 تهيئة الأحداث والـ DOM بالكامل عند التشغيل
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    displayRandomLiveTip();
    initAppTour();
    initCVScoreGauge();

    const outputBox = document.getElementById('outputBox');

    const getInputs = () => ({
        name: document.getElementById('name')?.value.trim(),
        jobTitle: document.getElementById('jobTitle')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim() || 'غير مدرج للخصوصية',
        email: document.getElementById('email')?.value.trim() || 'info@example.com',
        experience: document.getElementById('experience')?.value.trim() || 'لا توجد خبرات مضافة',
        skills: document.getElementById('skills')?.value.trim() || 'لا توجد مهارات مضافة',
    });

    // 1️⃣ زر إنشاء وتحسين السيرة الذاتية الذكية 
    const aiOptimizeBtn = document.getElementById('aiOptimizeBtn');
    if (aiOptimizeBtn) {
        aiOptimizeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const data = getInputs();
            if (!data.name || !data.jobTitle) { 
                alert('يرجى ملء الاسم الكامل والمسمى الوظيفي أولاً لكي يستطيع الذكاء الاصطناعي العمل!'); 
                return; 
            }

            const originalBtnText = aiOptimizeBtn.innerHTML;
            aiOptimizeBtn.innerHTML = "⏳ جاري التحسين الذكي وصياغة الـ ATS...";
            aiOptimizeBtn.disabled = true;
            if (outputBox) outputBox.value = 'جاري الاتصال بالعقل الاصطناعي وصياغة سيرتك الذاتية الاحترافية...';

            try {
                const prompt = `قم بصياغة سيرة ذاتية كاملة، احترافية، ومباشرة ومحسنة كلياً للـ ATS باللغة العربية:\nالاسم الكامل: ${data.name}\nالمسمى الوظيفي المستهدف: ${data.jobTitle}\nالهاتف: ${data.phone}\nالبريد الإلكتروني: ${data.email}\nالمهارات المكتوبة: ${data.skills}\nالخبرات المهنية والمهام العملية: ${data.experience}`;
                const res = await askAI(prompt, "أنت مستشار توظيف عالمي خبير بنظام الـ ATS. اكتب محتوى السيرة الذاتية السردية والنصية بنقاء وتنسيق كامل مباشر دون أي هوامش، تحيات، أو ملاحظات إضافية جانبية.");
                if (res && outputBox) {
                    outputBox.value = res;
                }
            } catch (err) {
                alert('حدث خطأ أثناء الاتصال بالخادم، يرجى إعادة المحاولة.');
                if (outputBox) outputBox.value = 'فشل الاتصال السحابي. يرجى المحاولة مرة أخرى.';
            } finally { 
                aiOptimizeBtn.innerHTML = originalBtnText;
                aiOptimizeBtn.disabled = false;
            }
        });
    }

    // 2️⃣ زر تحميل الـ PDF الحاسم والنهائي (منع الصفحة البيضاء)
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (!outputBox || outputBox.value.trim() === "") { 
                alert('الرجاء إنشاء السيرة الذاتية أولاً حتى تظهر البيانات أمامك قبل التحميل!'); 
                return; 
            }

            const originalBtnText = this.innerHTML;
            this.innerText = "⏳ جاري إصدار وتجهيز المستند الرقمي...";
            this.disabled = true;

            const printElement = document.createElement('div');
            printElement.style.padding = '40px';
            printElement.style.color = '#1e293b';
            printElement.style.background = '#ffffff';
            printElement.style.fontFamily = "'Cairo', sans-serif";
            printElement.style.lineHeight = '1.8';
            printElement.style.direction = 'rtl';
            printElement.style.textAlign = 'right';

            printElement.innerHTML = outputBox.value.replace(/\n/g, '<br>');

            const data = getInputs();
            const pdfFileName = data.name ? `${data.name}_Professional_CV.pdf` : 'My_Resume.pdf';

            const options = {
                margin:       [15, 15, 15, 15],
                filename:     pdfFileName,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { 
                    scale: 2, 
                    useCORS: true, 
                    logging: false, 
                    backgroundColor: '#ffffff'
                },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            document.fonts.ready.then(() => {
                setTimeout(() => {
                    html2pdf().set(options).from(printElement).save().then(() => {
                        this.innerHTML = originalBtnText;
                        this.disabled = false;
                    }).catch((err) => {
                        alert('حدث خطأ أثناء تصدير ملف الـ PDF.');
                        this.innerHTML = originalBtnText;
                        this.disabled = false;
                    });
                }, 250);
            });
        });
    }

    // ==========================================
    // 🎨 ميزة تغيير القوالب وثيم الألوان ديناميكياً
    // ==========================================
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            const theme = this.value;
            if (theme === 'royal-blue') {
                document.body.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)';
            } else if (theme === 'emerald-green') {
                document.body.style.background = 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)';
            } else {
                document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
            }
        });
    }

    // ==========================================
    // 🌐 ميزة تبديل اللغة التلقائية (العربية / الإنجليزية)
    // ==========================================
    let currentLang = 'ar';
    const toggleLanguageBtn = document.getElementById('toggleLanguageBtn');
    if (toggleLanguageBtn) {
        toggleLanguageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLang;
            toggleLanguageBtn.innerText = currentLang === 'ar' ? '🔄 English' : '🔄 العربية';

            const labels = document.querySelectorAll('.form-section label');
            const placeholders = {
                name: currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name',
                jobTitle: currentLang === 'ar' ? 'المسمى الوظيفي المستهدف' : 'Targeted Job Title',
                phone: currentLang === 'ar' ? '0000000000' : '+123 456 7890',
                email: currentLang === 'ar' ? 'info@example.com' : 'email@example.com',
                skills: currentLang === 'ar' ? 'مثال: التواصل، حل المشكلات، إدارة الوقت، Excel...' : 'e.g., communication, Excel, problem solving...',
                experience: currentLang === 'ar' ? 'اكتب خبراتك أو المهام التي قمت بها في وظائفك السابقة...' : 'Write your past work experiences and achievements...'
            };

            if (labels.length >= 6) {
                labels[0].innerText = currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name';
                labels[1].innerText = currentLang === 'ar' ? 'المسمى الوظيفي المستهدف' : 'Targeted Job Title';
                labels[2].innerText = currentLang === 'ar' ? 'رقم الهاتف (اختياري للخصوصية)' : 'Phone Number (Optional)';
                labels[3].innerText = currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address';
                labels[4].innerText = currentLang === 'ar' ? 'المهارات (افصل بينها بفاصلة ,)' : 'Skills (separate with a comma ,)';
                labels[5].innerText = currentLang === 'ar' ? 'الخبرات والمهام العملية المهنية' : 'Work Experiences & Professional History';
            }

            for (let id in placeholders) {
                const el = document.getElementById(id);
                if (el) el.placeholder = placeholders[id];
            }
        });
    }

    // ==========================================
    // 🧠 ميزة توليد الملخص المهني التلقائي وحقنه
    // ==========================================
    const generateSummaryBtn = document.getElementById('generateSummaryBtn');
    if (generateSummaryBtn) {
        generateSummaryBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            const data = getInputs();
            if (!data.jobTitle) {
                alert('الرجاء إدخال المسمى الوظيفي المستهدف أولاً لنتمكن من صياغة ملخص مخصص ومحكم للـ ATS!');
                return;
            }

            const originalBtnText = generateSummaryBtn.innerHTML;
            generateSummaryBtn.innerHTML = "⏳ جاري الصياغة...";
            generateSummaryBtn.disabled = true;

            try {
                const summaryPrompt = `اكتب ملخصاً مهنياً (Professional Summary) قصيراً وموجزاً ومقنعاً جداً متوافق مع خوارزميات ATS لوظيفة: "${data.jobTitle}". المهارات المفتاحية المتاحة: ${data.skills}.`;
                const summary = await askAI(summaryPrompt, "أنت مستشار توظيف عالمي محترف. اكتب نص الملخص المهني فقط في فقرة واحدة متماسكة ومثيرة للإعجاب دون أي مقدمات أو هوامش وبدون ذكر أي ترحيب.");
                
                if (summary && outputBox) {
                    if (outputBox.value.trim() === "") {
                        outputBox.value = `الملخص المهني:\n${summary}\n\n`;
                    } else {
                        outputBox.value = `الملخص المهني:\n${summary}\n\n====================\n\n` + outputBox.value;
                    }
                    alert("🧠 تم توليد وحقن الملخص المهني بنجاح في بداية صندوق المراجعة والتصدير!");
                }
            } catch (err) {
                alert("لم نتمكن من الاتصال بخدمة توليد الملخص حالياً، يرجى المحاولة لاحقاً.");
            } finally {
                generateSummaryBtn.innerHTML = originalBtnText;
                generateSummaryBtn.disabled = false;
            }
        });
    }

    // ==========================================
    // ⚙️ نظام التحكم بالنوافذ المنبثقة والقوائم
    // ==========================================
    const toggleBtn = document.getElementById("dropdownToggleBtn");
    const leftMenu = document.getElementById("topLeftMenu");

    if (toggleBtn && leftMenu) {
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            leftMenu.classList.toggle("hidden");
        });
        document.addEventListener("click", function (e) {
            if (!leftMenu.contains(e.target) && e.target !== toggleBtn) {
                leftMenu.classList.add("hidden");
            }
        });
    }

    const openSettingsBtn = document.getElementById("openSettingsBtn");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    const settingsModal = document.getElementById("settingsPageModal");

    if (openSettingsBtn && settingsModal) {
        openSettingsBtn.addEventListener("click", function () {
            settingsModal.classList.remove("hidden");
            if (leftMenu) leftMenu.classList.add("hidden");
        });
    }
    if (closeSettingsBtn && settingsModal) {
        closeSettingsBtn.addEventListener("click", function () {
            settingsModal.classList.add("hidden");
        });
    }

    const shareBtn = document.getElementById("shareAppBtn");
    if (shareBtn) {
        shareBtn.addEventListener("click", async function () {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'صانع السير الذاتية بالذكاء الاصطناعي',
                        text: 'تطبيق ذكي لإنشاء وتحسين السير الذاتية مجاناً وبدون حساب متوافق مع نظام ATS.',
                        url: window.location.href
                    });
                } catch (err) {}
            } else {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert("📋 تم نسخ رابط التطبيق بنجاح!");
                } catch (err) {
                    alert("عذراً، لم نتمكن من نسخ الرابط تلقائياً.");
                }
            }
        });
    }

    const notificationBtn = document.getElementById("enableNotificationsBtn");
    if (notificationBtn) {
        notificationBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!("Notification" in window)) {
                alert("عذراً، البيئة الحالية لا تدعم ميزة الإشعارات بشكل مباشر.");
                return;
            }

            if (Notification.permission === "granted") {
                alert("🔔 الإشعارات مفعلة بالفعل ومصرح بها بنجاح!");
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        alert("🎉 تم تفعيل الإشعارات بنجاح!");
                    } else {
                        alert("⚠️ تم رفض إذن الإشعارات.");
                    }
                });
            }
        });
    }
});
