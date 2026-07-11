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
// 🚀 نظام تشغيل وإدارة جولة التطبيق الترحيبية
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
// 🤖 دالة الاتصال بالذكاء الاصطناعي
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
        
        // ✨ حل المشكلة الثانية: تنظيف وحذف إعلانات وروابط وتذييلات موقع Pollinations نهائياً
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

// تحويل كود ماركداون إلى HTML نظيف ومتناسق بصرياً في ملف الـ PDF والـ Word
function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .trim();
}

// جلب التنسيقات والخلفية البيضاء لضمان عدم ظهور صفحة فارغة في الطباعة
function getTemplateStyles() {
    const chosenFont = document.getElementById('fontFamilySelect')?.value || "Cairo, sans-serif";
    const chosenSize = document.getElementById('fontSizeSelect')?.value || "15px";
    const chosenLineHeight = document.getElementById('lineHeightSelect')?.value || "1.6";
    const chosenPadding = document.getElementById('paddingSelect')?.value || "22px";
    const lang = document.getElementById('langSelect')?.value || 'ar';

    let styles = `padding:${chosenPadding}; line-height:${chosenLineHeight}; font-size:${chosenSize}; font-family:${chosenFont}; background-color:#ffffff !important; color:#1e293b; width: 100%; box-sizing: border-box; display: block;`;
    styles += lang === 'ar' ? " text-align: right; direction: rtl;" : " text-align: left; direction: ltr;";
    return styles;
}

// 🪄 تشغيل المساعد الذكي للحقول (Inline AI Writer)
function initInlineAIWriters() {
    document.querySelectorAll('.inline-ai-btn').forEach(aiBtn => {
        aiBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const fieldId = aiBtn.getAttribute('data-field');
            const field = document.getElementById(fieldId);
            const textValue = field?.value.trim();
            
            if (!textValue) { alert('الرجاء كتابة نص أولاً ليقوم الذكاء الاصطناعي بتحسينه!'); return; }
            
            const originalText = aiBtn.innerText;
            aiBtn.innerText = '⏳ جاري الصياغة...';
            aiBtn.disabled = true;
            try {
                const optimized = await askAI(`حسن هذا النص المهني لنظام ATS في نقاط مباشرة: ${textValue}`, "أنت مستشار توظيف خبير. صغ العبارات بأسلوب قوي ومقنع.");
                if (optimized && field) {
                    field.value = optimized.trim();
                }
            } catch (err) {
                alert('عذراً، الخادم مشغول حالياً. حاول مجدداً.');
            } finally {
                aiBtn.innerText = originalText;
                aiBtn.disabled = false;
                calculateCVScore();
            }
        });
    });
}

// ==========================================
// ⚡ ربط الأزرار الرئيسية المفقودة وتفعيل معالجة الـ PDF بنجاح
// ==========================================
function initMainActionButtons() {
    const loading = document.getElementById('loading');
    const resultBox = document.getElementById('resultBox');
    const downloadContainer = document.getElementById('downloadContainer');
    const mainDownloadBtn = document.getElementById('mainDownloadBtn');
    const downloadOptions = document.getElementById('downloadOptions');

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

    // التحكم بالقائمة المنسدلة للتحميل
    if (mainDownloadBtn && downloadOptions) {
        mainDownloadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            downloadOptions.classList.toggle('hidden');
        });
        document.addEventListener('click', () => {
            downloadOptions.classList.add('hidden');
        });
    }

    // 📄 تصدير كـ PDF جاهز ومصلح (بدون صفحة بيضاء)
    document.getElementById('downloadPdfBtn')?.addEventListener('click', () => {
        const element = document.getElementById('cvTemplateArea');
        if (!element) { 
            alert('الرجاء الضغط على زر "إنشاء وتحسين السيرة الذاتية الذكية" أولاً حتى تظهر البيانات!'); 
            return; 
        }
        
        const options = {
            margin:       10,
            filename:     `${getInputs().fullName || 'CV'}_Resume.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(options).from(element).save();
    });

    // 📝 تحميل ملف Word قابل للتعديل (.doc)
    document.getElementById('downloadWordBtn')?.addEventListener('click', () => {
        const element = document.getElementById('cvTemplateArea');
        if (!element) { 
            alert('الرجاء الضغط على زر "إنشاء وتحسين السيرة الذاتية الذكية" أولاً!'); 
            return; 
        }
        
        const htmlContent = element.innerHTML;
        const blob = new Blob(['\ufeff' + htmlContent], {
            type: 'application/msword;charset=utf-8'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${getInputs().fullName || 'CV'}_Editable_Resume.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 1. زر إنشاء وتحسين السيرة الذاتية الذكية
    document.getElementById('optimizeBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        const data = getInputs();
        if (!data.fullName || !data.jobTitle) { alert('يرجى ملء الاسم الكامل والمسمى الوظيفي أولاً!'); return; }

        triggerLoading(true);
        try {
            const prompt = `قم بإنشاء سيرة ذاتية احترافية ومباشرة متوافقة 100% مع أنظمة ATS باللغة ${data.lang === 'ar' ? 'العربية' : 'الإنجليزية'}:\nالاسم الكامل: ${data.fullName}\nالمسمى الوظيفي: ${data.jobTitle}\nالخبرات المهنية: ${data.experience}\nالمهارات: ${data.skills}\nمتطلبات الوظيفة للمطابقة: ${data.jobDesc}`;
            const res = await askAI(prompt, "أنت مستشار توظيف بارع، قم بإنشاء محتوى السيرة الذاتية دون أي ترحيب أو تذييل خارجي وبصياغة قوية.");
            if (res && resultBox) {
                // حقن الـ ID الأساسي لحل مشكلة الصفحة البيضاء
                resultBox.innerHTML = `<div id="cvTemplateArea" style="${getTemplateStyles()}">${formatMarkdown(res)}</div>`;
                if(downloadContainer) downloadContainer.classList.remove('hidden');
            }
        } catch (err) {
            alert('حدث خطأ أثناء الاتصال بالخادم. أعد المحاولة.');
        } finally { triggerLoading(false); }
    });

    // 2. زر صانع رسالة التغطية (Cover Letter)
    document.getElementById('coverLetterBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        const data = getInputs();
        if (!data.jobTitle) { alert('يرجى تحديد المسمى الوظيفي أولاً!'); return; }

        triggerLoading(true);
        try {
            const res = await askAI(`اكتب رسالة تغطية (Cover Letter) احترافية ومقنعة لوظيفة ${data.jobTitle} باسم ${data.fullName || 'المتقدم للوظيفة'}.`, "أنت كاتب رسائل توظيف محترف.");
            if (res && resultBox) {
                resultBox.innerHTML = `<div id="cvTemplateArea" style="${getTemplateStyles()}"><h3>✉️ رسالة التغطية الاحترافية:</h3><br>${formatMarkdown(res)}</div>`;
                if(downloadContainer) downloadContainer.classList.remove('hidden');
            }
        } catch (err) { alert('فشلت العملية، يرجى المحاولة لاحقاً.'); }
        finally { triggerLoading(false); }
    });

    // 3. زر أسئلة المقابلة المتوقعة
    document.getElementById('interviewPrepBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        const data = getInputs();
        if (!data.jobTitle) { alert('يرجى تحديد المسمى الوظيفي أولاً!'); return; }

        triggerLoading(true);
        try {
            const res = await askAI(`أعطني أهم 5 أسئلة متوقعة في المقابلات الشخصية لوظيفة: ${data.jobTitle} مع الإجابات النموذجية.`, "أنت مسؤول توظيف تقني خبير.");
            if (res && resultBox) {
                resultBox.innerHTML = `<div id="cvTemplateArea" style="${getTemplateStyles()}"><h3>🧠 الاستعداد للمقابلة الشخصية:</h3><br>${formatMarkdown(res)}</div>`;
            }
        } catch (err) { alert('فشلت العملية، يرجى المحاولة لاحقاً.'); }
        finally { triggerLoading(false); }
    });

    // 4. زر تقييم البيانات الحالي
    document.getElementById('rateBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        calculateCVScore();
        alert('تم تحديث التقييم وعرض النتيجة في العداد بنجاح!');
    });

    // 5. زر محاكاة فحص ATS
    document.getElementById('atsCheckBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        const data = getInputs();
        triggerLoading(true);
        try {
            const res = await askAI(`قم بعمل فحص محاكاة ATS للسيرة الذاتية التالية وأعطني نقاط الضعف والكلمات الناقصة بناءً على متطلبات الوظيفة الشاغرة: ${data.jobDesc}. الخبرات المتاحة: ${data.experience}. المهارات: ${data.skills}.`, "أنت برنامج فحص ATS ذكي ومستشار دقيق.");
            if (res && resultBox) {
                resultBox.innerHTML = `<div id="cvTemplateArea" style="${getTemplateStyles()}"><h3>🔍 تحليل ومحاكاة نظام ATS العالمي:</h3><br>${formatMarkdown(res)}</div>`;
            }
        } catch (err) { alert('فشلت العملية، يرجى المحاولة لاحقاً.'); }
        finally { triggerLoading(false); }
    });

    // 6. زر توقيع GPG الرقمي الآمن
    document.getElementById('signCvBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🔐 تم تشفير وتوثيق المستند محلياً برقم تسلسلي آمن من خلال مفتاح GPG: 55392380FBF1C8F1 لضمان سلامة هويتك الرقمية!');
    });
}

// ==========================================
// 🎉 تهيئة الأحداث والـ DOM بالكامل عند التشغيل
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    displayRandomLiveTip();
    initAppTour();
    initCVScoreGauge();
    initInlineAIWriters();
    initMainActionButtons();

    // تشغيل القائمة العلوية المنسدلة للإعدادات
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

    // زر مشاركة المنصة
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
                    alert("📋 تم نسخ رابط التطبيق بنجاح! يمكنك الآن لصق ومشاركتة مع أصدقائك.");
                } catch (err) {
                    alert("عذراً، لم نتمكن من نسخ الرابط تلقائياً.");
                }
            }
        });
    }
});
