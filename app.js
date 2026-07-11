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
            "كتابة سيناريوهات ومحتوى إبداعي متوافق مع قواعد الـ SEO لزيادة الزيارات العضوية.",
            "تحليل أداء المحتوى وتطوير استراتيجيات النشر بناءً على الأرقام والتفاعل.",
            "التعاون مع فرق التصميم والمونتاج لإنتاج مواد مرئية تخدم أهداف الحملة التسويقية."
        ]
    },
    "interior_designer": {
        title: "مهندس ديكور / تصميم داخلي",
        tips: [
            "إعداد مخططات ثنائية وثلاثية الأبعاد (3D Max, AutoCAD) بدقة هندسية وجمالية.",
            "اختيار الخامات، الأثاث، وتنسيق الإضاءة بما يتوافق مع ميزانية العميل وااحتياجاته.",
            "الإشراف الميداني على التنفيذ لضمان مطابقة الواقع للمخططات المعتمدة."
        ]
    }
};

// دالة مخصصة لعرض نصيحة عشوائية عند فتح التطبيق
function displayRandomLiveTip() {
    const tipTextElement = document.getElementById('liveTipText');
    if (tipTextElement) {
        const randomIndex = Math.floor(Math.random() * cvTips.length);
        tipTextElement.innerText = cvTips[randomIndex];
    }
}

// ========================================================
// 🛡️ دالة نجاح التحقق من Cloudflare Turnstile
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
        title: "مرحباً بك في مستقبلك المهني!",
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
        desc: "اضغط على زر الإنشاء ليقوم التطبيق بصياغة وتدقيق نصك لغوياً وإصدار نسخة احترافية بالكامل مع رمز QR وتوقيع رقمي آمن.",
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
    const inputs = ['fullName', 'jobTitle', 'experience', 'skills'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateCVScore);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA Service Worker registered successfully!'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

function calculateCVScore() {
    const fullName = document.getElementById('fullName')?.value.trim() || "";
    const jobTitle = document.getElementById('jobTitle')?.value.trim() || "";
    const experience = document.getElementById('experience')?.value.trim() || "";
    const skills = document.getElementById('skills')?.value.trim() || "";

    let score = 0;
    if (fullName.length > 4) score += 15;
    if (jobTitle.length > 3) score += 15;
    if (experience.length > 10) score += 20;
    if (experience.length > 50) score += 15;

    const skillsCount = skills.split(',').filter(s => s.trim().length > 1).length;
    if (skillsCount >= 2) score += 20;
    if (skillsCount >= 5) score += 15;

    const scoreBar = document.getElementById('cvScoreBar');
    const scorePercent = document.getElementById('cvScorePercent');
    const scoreFeedback = document.getElementById('cvScoreFeedback');

    if (scoreBar && scorePercent && scoreFeedback) {
        scoreBar.style.width = `${score}%`;
        scorePercent.innerText = `${score}%`;

        if (score < 40) {
            scoreBar.style.background = '#ef4444';
            scoreFeedback.innerHTML = '⚠️ البيانات غير كافية، سيقوم نظام الـ ATS برفض الملف تلقائياً.';
        } else if (score < 75) {
            scoreBar.style.background = '#f59e0b';
            scoreFeedback.innerHTML = '⚡ أداء جيد! أضف المزيد من المهارات أو تفاصيل الخبرة لتخطي حاجز المنافسة.';
        } else {
            scoreBar.style.background = '#10b981';
            scoreFeedback.innerHTML = '🔥 مذهل! السيرة الذاتية مدعمة بكلمات مفتاحية قوية وجاهزة للقنص الرقمي.';
        }
    }
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

function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .trim();
}

// ==========================================
// 🎉 تهيئة الأحداث والـ DOM بالكامل عند التشغيل
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    displayRandomLiveTip();
    initAppTour();
    initCVScoreGauge();

    const loading = document.getElementById('loading');
    const resultBox = document.getElementById('resultBox');
    const downloadContainer = document.getElementById('downloadContainer');

    const getInputs = () => ({
        fullName: document.getElementById('fullName')?.value.trim(),
        jobTitle: document.getElementById('jobTitle')?.value.trim(),
        experience: document.getElementById('experience')?.value.trim() || 'لا توجد خبرات مضافة',
        skills: document.getElementById('skills')?.value.trim() || 'لا توجد مهارات مضافة',
        jobDesc: document.getElementById('jobDescriptionInput')?.value.trim() || 'لم تحدد',
        lang: document.getElementById('langSelect')?.value || 'ar'
    });

    const triggerLoading = (show) => {
        if (show) { 
            if(loading) loading.classList.remove('hidden'); 
            if(resultBox) resultBox.innerHTML = ''; 
            if(downloadContainer) downloadContainer.classList.add('hidden'); 
        } else { 
            if(loading) loading.classList.add('hidden'); 
        }
    };

    // 1️⃣ زر إنشاء وتحسين السيرة الذاتية الذكية 
    const optimizeBtn = document.getElementById('optimizeBtn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const data = getInputs();
            if (!data.fullName || !data.jobTitle) { 
                alert('يرجى ملء الاسم الكامل والمسمى الوظيفي أولاً لكي يستطيع الذكاء الاصطناعي العمل!'); 
                return; 
            }

            triggerLoading(true);
            try {
                const prompt = `قم بإنشاء سيرة ذاتية احترافية ومباشرة متوافقة 100% مع أنظمة ATS باللغة ${data.lang === 'ar' ? 'العربية' : 'الإنجليزية'}:\nالاسم الكامل: ${data.fullName}\nالمسمى الوظيفي: ${data.jobTitle}\nالخبرات المهنية: ${data.experience}\nالمهارات: ${data.skills}\nمتطلبات الوظيفة للمطابقة: ${data.jobDesc}`;
                const res = await askAI(prompt, "أنت مستشار توظيف خبير، اكتب محتوى السيرة الذاتية السردية فقط بشكل منسق وجاهز دون أي هوامش أو ترحيب خارجي وبدون أي ملاحظات جانبية.");
                if (res && resultBox) {
                    resultBox.innerHTML = formatMarkdown(res);
                    if(downloadContainer) downloadContainer.classList.remove('hidden');
                }
            } catch (err) {
                alert('حدث خطأ أثناء الاتصال بالخادم، يرجى إعادة المحاولة.');
            } finally { 
                triggerLoading(false); 
            }
        });
    }

    // 2️⃣ برمجة فتح القائمة المنسدلة للتحميل وضمان عمل الأزرار الداخلية
    const mainDownloadBtn = document.getElementById('mainDownloadBtn');
    const downloadOptions = document.getElementById('downloadOptions');

    if (mainDownloadBtn && downloadOptions) {
        mainDownloadBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            downloadOptions.classList.toggle('hidden');
        });

        document.addEventListener('click', function () {
            downloadOptions.classList.add('hidden');
        });
    }

    // 3️⃣ زر تحميل الـ PDF المطور (تم التخلص من الـ iframe لإنهاء مشكلة الصفحة البيضاء تماماً)
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function (e) {
            e.preventDefault();
            
            const element = document.getElementById('resultBox');
            if (!element || element.innerText.trim() === "") { 
                alert('الرجاء إنشاء السيرة الذاتية أولاً حتى تظهر البيانات أمامك قبل التحميل!'); 
                return; 
            }

            const originalBtnText = this.innerHTML;
            this.innerText = "⏳ جاري التحضير...";
            this.disabled = true;

            // 🚀 إنشاء حاوية مؤقتة داخل الـ DOM الرئيسي (خارج نطاق الشؤية لمنع قفز الصفحة)
            const printArea = document.createElement('div');
            printArea.style.position = 'absolute';
            printArea.style.left = '-9999px';
            printArea.style.top = '0';
            printArea.style.width = '794px'; // عرض صفحة A4 القياسي بـ البكسل
            printArea.style.background = '#ffffff';
            printArea.style.color = '#1e293b';
            printArea.style.padding = '40px';
            printArea.style.direction = 'rtl';
            printArea.style.fontFamily = 'Cairo, sans-serif';

            // حقن التنسيقات والمحتوى مباشرة لضمان قراءتها بواسطة المعالج الرسومي
            printArea.innerHTML = `
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
                    .pdf-render-box { font-family: 'Cairo', sans-serif; background-color: #ffffff !important; color: #1e293b !important; line-height: 1.7; font-size: 14px; }
                    .pdf-render-box h1, .pdf-render-box h2, .pdf-render-box h3, .pdf-render-box strong { color: #0f172a !important; font-weight: bold; margin-top: 15px; margin-bottom: 10px; }
                    .pdf-render-box h1 { font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
                    .pdf-render-box h2 { font-size: 18px; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; }
                    .pdf-render-box p, .pdf-render-box span, .pdf-render-box div, .pdf-render-box li { color: #334155 !important; }
                    .pdf-render-box ul, .pdf-render-box ol { padding-right: 25px; margin: 10px 0; }
                    .pdf-render-box li { margin-bottom: 6px; }
                </style>
                <div class="pdf-render-box">${element.innerHTML}</div>
            `;
            
            document.body.appendChild(printArea);

            const fullNameInput = document.getElementById('fullName')?.value.trim();
            const pdfFileName = fullNameInput ? `${fullNameInput}_CV.pdf` : 'My_Resume.pdf';

            const options = {
                margin:       10,
                filename:     pdfFileName,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // التشغيل المباشر من الـ DOM الرئيسي يضمن عدم التصدير الفارغ
            html2pdf().set(options).from(printArea).save().then(() => {
                document.body.removeChild(printArea); 
                this.innerHTML = originalBtnText;
                this.disabled = false;
            }).catch((err) => {
                document.body.removeChild(printArea);
                this.innerHTML = originalBtnText;
                this.disabled = false;
            });
        });
    }

    // 4️⃣ زر تحميل ملف الـ Word 
    const downloadWordBtn = document.getElementById('downloadWordBtn');
    if (downloadWordBtn) {
        downloadWordBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const element = document.getElementById('resultBox');
            if (!element || element.innerText.trim() === "") { 
                alert('الرجاء إنشاء السيرة الذاتية أولاً حتى تظهر البيانات أمامك قبل التحميل!'); 
                return; 
            }

            const fullNameInput = document.getElementById('fullName')?.value.trim();
            const wordFileName = fullNameInput ? `${fullNameInput}_CV.doc` : 'My_Resume.doc';
            
            const htmlContent = `
              <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
              <head><title>CV</title><meta charset="utf-8"><style>body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }</style></head>
              <body>${element.innerHTML}</body>
              </html>
            `;

            const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = wordFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // القائمة العلوية المنسدلة للإعدادات
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

    // إعدادات النوافذ المنبثقة
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

    // ميزة المشاركة
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
});
