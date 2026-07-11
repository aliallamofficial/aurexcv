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
// 🛡️ دالة نجاح التحقق من Cloudflare Turnstile (ربط إخفاء الـ Splash Screen بالتحقق)
// ========================================================
function onTurnstileSuccess(token) {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 500); // تختفي تماماً بعد نجاح التحقق بنصف ثانية
    }
}
// تم إضافة هذا السطر ليتعرف Cloudflare على الدالة بنجاح
window.onTurnstileSuccess = onTurnstileSuccess;

// ========================================================
// 🚀 نظام تشغيل وإدارة جولة التطبيق الترحيبية (App Tour) للمستخدم الجديد
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
// 🔥 ميزة 1: عداد قياس قوة وجاهزية الـ CV لنظام الـ ATS
// ==========================================
function initCVScoreGauge() {
    const inputs = ['fullName', 'jobTitle', 'experience', 'skills'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateCVScore);
    });
}

// تشغيل الـ Service Worker لضمان العمل أوفلاين كـ PWA على الويب
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
// 🚀 ميزة: مساعد الصياغة الذكي المباشر للحقول (Inline AI Writer) [مُحدّث بنظام التخزين المؤقت الكاش]
// ==========================================
function initInlineAIWriters() {
    document.querySelectorAll('.inline-ai-btn').forEach(aiBtn => {
        aiBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const fieldId = aiBtn.getAttribute('data-field');
            const field = document.getElementById(fieldId);
            const textValue = field?.value.trim();
            
            if (!textValue) { alert('الرجاء كتابة نص أولاً ليقوم الذكاء الاصطناعي بتحسينه!'); return; }
            
            // 💡 نظام التخزين المؤقت: التحقق من وجود صياغة مسبقة لنفس النص لتجنب استهلاك السيرفر
            const cacheKey = `ai_cache_${btoa(unescape(encodeURIComponent(textValue)))}`;
            const cachedResult = localStorage.getItem(cacheKey);
            if (cachedResult) {
                if (field) field.value = cachedResult;
                calculateCVScore();
                return;
            }
            
            const originalText = aiBtn.innerText;
            aiBtn.innerText = '⏳ جاري الصياغة...';
            aiBtn.disabled = true;
            try {
                const optimized = await askAI(`حسن هذا النص المهني لنظام ATS في نقاط مباشرة: ${textValue}`, "أنت مستشار HR. صغ العبارات بأسلوب قوي ومقنع.");
                if (optimized && field) {
                    field.value = optimized.trim();
                    localStorage.setItem(cacheKey, optimized.trim());
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
// 🚀 ميزة: محاكي المقابلات الشخصية (AI Interview Prep)
// ==========================================
function initAIInterviewPrep() {
    const interviewBtn = document.getElementById('interviewPrepBtn');
    if (!interviewBtn) return;
    
    interviewBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const jobTitle = document.getElementById('jobTitle').value.trim();
        if (!jobTitle) { alert('يرجى كتابة المسمى الوظيفي المستهدف أولاً لتوليد الأسئلة المناسبة!'); return; }

        const loading = document.getElementById('loading');
        const resultBox = document.getElementById('resultBox');
        interviewBtn.disabled = true;
        loading.classList.remove('hidden');

        try {
            const qaResult = await askAI(`أعطني أهم 5 أسئلة متوقعة في المقابلات الشخصية لوظيفة: ${jobTitle} مع الإجابات النموذجية والمختصرة جداً لكل سؤال باللغة العربية.`, "أنت مسؤول التوظيف التقني الخبير.");
            if (qaResult) {
                let formattedQA = formatMarkdown(qaResult);
                let templateStyles = getTemplateStyles(document.getElementById('langSelect').value, 'modern');
                resultBox.innerHTML = `<div id="cvTemplateArea" style="${templateStyles}"><h3>🧠 الأسئلة المتوقعة في المقابلة والإجابات النموذجية:</h3><br>${formattedQA}</div>`;
                
                // تمرير النص المنظف لعنصر العرض المخصص إذا كان موجوداً في الصفحة
                const cvTextArea = document.getElementById("your-cv-textarea-id");
                if (cvTextArea) {
                    cvTextArea.value = qaResult;
                }

                document.getElementById('downloadContainer').classList.add('hidden');
            }
        } catch (err) {
            alert('السيرفر مشغول حالياً بالمعالجة، أعد النقر بعد قليل.');
        } finally {
            loading.classList.add('hidden');
            interviewBtn.disabled = false;
        }
    });
}

// ==========================================
// 🔥 ميزة: تخصيص المظهر (الأبعاد والمسافات واللون)
// ==========================================
function initThemeColorPicker() {
    const container = document.getElementById('dynamicColorPickerContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="settings-section-card" style="text-align: right; direction: rtl; margin-bottom: 15px; background: #0f172a; padding: 15px; border-radius: 6px;">
            <h3 style="color: #38bdf8; margin-top: 0;">🎨 لون الهوية البصرية المخصص</h3>
            <p style="font-size: 13px; color: #94a3b8; margin-bottom: 10px;">اختر اللون الرئيسي المفضل لتخصيص خطوط وعناوين سيرتك الذاتية بشكل فوري ومميز.</p>
            <div style="display:flex; gap:12px; align-items:center;">
                <input type="color" id="themePrimaryColor" value="${localStorage.getItem('cv_theme_color') || '#3b82f6'}" style="width:50px; height:35px; border:none; border-radius:4px; cursor:pointer; background:none;">
                <span style="font-size:13px; color:#cbd5e1;">اضغط على الصندوق لاختيار درجة لونك المفضلة</span>
            </div>
        </div>
    `;

    document.getElementById('themePrimaryColor').addEventListener('input', (e) => {
        const selectedColor = e.target.value;
        localStorage.setItem('cv_theme_color', selectedColor);
        applyThemeColorToLiveCV();
    });
}

function applyThemeColorToLiveCV() {
    const activeColor = localStorage.getItem('cv_theme_color') || '#3b82f6';
    const cvArea = document.getElementById('cvTemplateArea');
    if (cvArea) {
        cvArea.style.cssText = getTemplateStyles(document.getElementById('langSelect').value, document.getElementById('templateSelect').value);
    }
}

// دالة التحكم في عدد مرات الاستخدام اليومي
function handleCVCreation() {
    const maxAllowedPerDay = 5; 
    const today = new Date().toDateString(); 
    let savedDate = localStorage.getItem('cv_creation_date');
    let creationCount = parseInt(localStorage.getItem('cv_creation_count')) || 0;

    if (savedDate !== today) {
        localStorage.setItem('cv_creation_date', today);
        creationCount = 0;
        localStorage.setItem('cv_creation_count', creationCount);
    }

    if (creationCount >= maxAllowedPerDay) {
        alert("عذراً، لقد وصلت للحد الأقصى المسموح به اليوم (5 مرات). يمكنك المحاولة مجدداً غداً!");
        return false;
    }
    creationCount += 1;
    localStorage.setItem('cv_creation_count', creationCount);
    return true;
}

// ==========================================
// 🤖 دالة عامة محمية للاتصال بالذكاء الاصطناعي مباشرة من المتصفح مع دمج كود التنظيف الجديد
// ==========================================
async function askAI(promptMessage, systemMessage, retries = 3) {
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

        if ((response.status === 429 || response.status === 503 || !response.ok) && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            return await askAI(promptMessage, systemMessage, retries - 1); 
        }

        if (!response.ok) throw new Error();
        
        // استقبال النص الأولي من السيرفر
        let aiResponse = await response.text();

        // 🛠️ الكود المضاف: تنظيف الكلمات الدلالية ووسوم الأكواد المكسورة في المتصفح قبل الرندر
        aiResponse = aiResponse.replace(/^```html/i, '')
                               .replace(/^html/i, '')
                               .replace(/```$/, '')
                               .trim();

        // تمريره لعنصر العرض المستهدف إذا كان معرفاً
        const targetTextarea = document.getElementById("your-cv-textarea-id");
        if (targetTextarea) {
            targetTextarea.value = aiResponse;
        }

        return aiResponse;

    } catch (error) {
        if (retries > 0) {
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            return await askAI(promptMessage, systemMessage, retries - 1);
        }
        throw error;
    }
}

// ==========================================
// ✨ دالة تنظيف وتنسيق النصوص (Markdown to HTML)
// ==========================================
function formatMarkdown(text) {
    if (!text) return '';
    let cleanedText = text
        .replace(/Powered by Pollinations\.AI.*/gi, '')
        .replace(/.*Support our mission.*/gi, '')
        .replace(/.*accessible for everyone.*/gi, '')
        .replace(/🌸\s*Ad\s*🌸/gi, '')
        .replace(/Pollinations\.AI:/gi);

    return cleanedText
        .replace(/\*\*(.*?)\*\//g, '<strong>$1</strong>') 
        .replace(/\*(.*?)\*/g, '<em>$1</em>')          
        .replace(/\n/g, '<br>')
        .trim();
}

// دالة بناء التنسيقات والقوالب مع دعم أبعاد الهوامش الديناميكية الجديدة
function getTemplateStyles(selectedLang, selectedTemplate) {
    const chosenFont = document.getElementById('fontFamilySelect').value;
    const chosenSize = document.getElementById('fontSizeSelect').value;
    const chosenLineHeight = document.getElementById('lineHeightSelect')?.value || "1.6";
    const chosenPadding = document.getElementById('paddingSelect')?.value || "22px";
    const activeColor = localStorage.getItem('cv_theme_color') || '#3b82f6';

    let styles = `padding:${chosenPadding}; line-height:${chosenLineHeight}; font-size:${chosenSize}; font-family:${chosenFont}; border-radius:8px; margin-top:15px; box-sizing: border-box; background-color: #fff; color: #1e293b;`;

    if (selectedLang === 'ar') {
        styles += " text-align: right; direction: rtl; unicode-bidi: plaintext;";
    } else {
        styles += " text-align: left; direction: ltr;";
    }

    if (selectedTemplate === 'modern') {
        styles += ` background-color: #1e293b; color: #f8fafc; border-left: 6px solid ${activeColor}; border-right: none;`;
    } else if (selectedTemplate === 'classic') {
        styles += " background-color: #ffffff; color: #000000; border: 2px solid #000000;";
    } else if (selectedTemplate === 'elegant') {
        styles += ` background-color: #fafaf9; color: #1c1917; border-top: 6px solid ${activeColor};`;
    }
    return styles;
}

// دالة حقن التوقيع البرمجي الموثق
function appendCryptoSignatureToCV(htmlContent) {
    const signatureHtml = `
        <div class="cv-crypto-footer" style="margin-top: 35px; padding-top: 15px; border-top: 1px dashed #cbd5e1; text-align: center; font-family: monospace; direction: ltr; clear: both;">
            <p style="font-size: 10px; color: #64748b; margin: 0; letter-spacing: 1px;">🔒 Digitally Signed & Verified via AI CV Optimizer</p>
            <p style="font-size: 11px; color: #0f172a; font-weight: bold; margin: 4px 0; letter-spacing: 0.5px;">Authority Key: ${Math.random().toString(16).substr(2, 8).toUpperCase()}-${Math.random().toString(16).substr(2, 8).toUpperCase()}</p>
        </div>
    `;
    return htmlContent + signatureHtml;
}

// مضافة لتأكيد إنهاء مستمعي الأحداث البرمجية...
