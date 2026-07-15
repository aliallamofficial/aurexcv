// ========================================================
// 💡 مصفوفة النصائح الجاهزة
// ========================================================
const cvTips = [
    "تجنب وضع صورتك الشخصية إذا كنت تقدم على شركات عالمية تعتمد نظام ATS تماماً.",
    "احرص على ألا تتجاوز سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات.",
    "استخدم أرقاماً ونسباً مئوية حقيقية لإثبات إنجازاتك (مثال: زيادة المبيعات بنسبة 20%).",
    "البريد الإلكتروني المهني يجب أن يحتوي على اسمك الحقيقي، ابتعد تماماً عن الأسماء المستعارة.",
    "الكلمات المفتاحية المأخوذة من إعلان الوظيفة نفسه هي مفتاحك السحري لتخطي فلترة الـ ATS."
];

const jobGuidelines = {
    "graphic_designer": { title: "مصمم جرافيك", keywords: ["مصمم", "جرافيك", "designer"], tips: ["ابتكار هويات بصرية كاملة تتوافق مع رؤية العلامة التجارية وشخصيتها.","تصميم مواد إعلانية ومحتوى رقمي لمنصات التواصل الاجتماعي لزيادة التفاعل بنسبة %X.","إتقان العمل على حزمة Adobe (Photoshop, Illustrator, InDesign) وإدارة الوقت بكفاءة."] },
    "content_creator": { title: "صانع محتوى / كاتب محتوى", keywords: ["محتوى", "كاتب", "content", "writer"], tips: ["كتابة سيناريوهات ومحتوى إبداعي متوافق مع قواعد الـ SEO لزيادة الزيارات العضوية.","تحليل أداء المحتوى الرقمي وتطوير استراتيجيات النشر لرفع مستويات التفاعل.","التعاون مع فرق التصميم والمونتاج لإنتاج مواد مرئية استثنائية."] },
    "interior_designer": { title: "مهندس ديكور / مصمم داخلي", keywords: ["ديكور", "داخلي", "interior"], tips: ["إعداد مخططات ثنائية وثلاثية الأبعاد (3D Max, AutoCAD) بدقة هندسية وجمالية فائقة.","اختيار الخامات، الأثاث، وتنسيق الإضاءة بما يتوافق مع ميزانية العميل واحتياجاته.","الإشراف الميداني الدقيق على التنفيذ لضمان مطابقة الواقع للمخططات."] }
};

function displayRandomLiveTip() {
    const tipTextElement = document.getElementById('cvTipText');
    if (tipTextElement) {
        const randomIndex = Math.floor(Math.random() * cvTips.length);
        tipTextElement.innerText = cvTips[randomIndex];
    }
}

// ========================================================
// 🚀 نظام جولة التطبيق
// ========================================================
const tourSteps = [
    { icon: "🚀", title: "مرحباً بك في مستقبلك المهني الجديد!", desc: "دعنا نأخذك في جولة سريعة مدتها دقيقة واحدة للتعرف على كيفية صناعة سيرة ذاتية لا تقهر بالذكاء الاصطناعي.", btnText: "ابدأ الرحلة الآن ←" },
    { icon: "📊", title: "مستشار الـ ATS الذكي لحظة بلحظة", desc: "أثناء كتابة بياناتك، سيقوم العداد الذكي بتقييم قوة مستندك وإعطائك نصائح حية لتخطي أنظمة الفلترة العالمية بنجاح.", btnText: "التالي مذهل كالعادة ←" },
    { icon: "🎯", title: "مطابقة إعلان الوظيفة", desc: "الصق إعلان الوظيفة واعرف نسبة تطابقك والناقص في بياناتك لتضمن القبول.", btnText: "إنهاء الجولة والدخول للتطبيق 🎉" }
];
let currentTourStep = 0;
let isGenerating = false;

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
            if (currentTourStep < tourSteps.length) { updateTourContent(); }
            else { closeTour(); }
        });
    }
    if (skipBtn) skipBtn.addEventListener('click', closeTour);
}
function updateTourContent() {
    const stepData = tourSteps[currentTourStep];
    document.getElementById('tourProgress') && (document.getElementById('tourProgress').innerText = `خطوة ${currentTourStep + 1} من ${tourSteps.length}`);
    document.getElementById('tourIcon') && (document.getElementById('tourIcon').innerText = stepData.icon);
    document.getElementById('tourTitle') && (document.getElementById('tourTitle').innerText = stepData.title);
    document.getElementById('tourDescription') && (document.getElementById('tourDescription').innerText = stepData.desc);
    document.getElementById('nextTourBtn') && (document.getElementById('nextTourBtn').innerText = stepData.btnText);
}
function closeTour() {
    document.getElementById('appTourModal')?.classList.add('hidden');
    localStorage.setItem('cv_tour_completed', 'true');
}

// ==========================================
// 🔥 مستشار ATS v2.0
// ==========================================
function initCVScoreGauge() {
    const inputs = ['name', 'jobTitle', 'experience', 'skills'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateCVScore);
            el.addEventListener('input', autoSave);
            if (id === 'jobTitle') el.addEventListener('input', showJobSuggestions);
        }
    });
    loadSavedData();
}

function calculateCVScore() {
    const name = document.getElementById('name')?.value.trim() || "";
    const jobTitle = document.getElementById('jobTitle')?.value.trim() || "";
    const experience = document.getElementById('experience')?.value.trim() || "";
    const skills = document.getElementById('skills')?.value.trim() || "";
    let score = 0; let feedback = [];
    if (name.length > 3 && jobTitle.length > 3) score += 20; else feedback.push("اكتب الاسم والمسمى الوظيفي");
    const skillsCount = skills.split(',').filter(s => s.trim().length > 1).length;
    if (skillsCount >= 5) score += 20; else if (skillsCount >= 2) score += 10; else feedback.push("ضيف 5 مهارات على الأقل");
    if (experience.length > 50) {
        score += 15;
        if (/\d+%|\d+ جنيه|\d+ عميل|\d+ مشروع/.test(experience)) score += 15; else feedback.push("ضيف أرقام لإنجازاتك: %, جنيه, عدد");
        const strongWords = ['نفذت', 'طورت', 'قاد', 'زودت', 'حققت', 'قللت', 'أدار', 'أنشأ'];
        if (strongWords.some(word => experience.includes(word))) score += 10; else feedback.push("ابدأ الخبرة بفعل قوي: نفذت، حققت، طورت");
    } else if (experience.length > 10) { score += 10; feedback.push("فصل الخبرات وأضف تفاصيل أكثر"); }
    const totalLength = name.length + jobTitle.length + experience.length + skills.length;
    if (totalLength > 300) score += 20; else score += 10;
    const scoreFill = document.getElementById('scoreFill');
    const scoreText = document.getElementById('scoreText');
    const scoreStatus = document.getElementById('scoreStatus');
    if (scoreFill && scoreText && scoreStatus) {
        scoreFill.style.width = `${score}%`; scoreText.innerText = `${score}%`;
        if (score === 0) { scoreFill.style.background = '#475569'; scoreStatus.innerHTML = '⚠️ الصندوق فارغ، يرجى تعبئة بياناتك للتحليل الفوري...'; }
        else if (score < 40) { scoreFill.style.background = '#ef4444'; scoreStatus.innerHTML = `⚠️ ضعيف: ${feedback.join(' - ')}`; }
        else if (score < 75) { scoreFill.style.background = '#f59e0b'; scoreStatus.innerHTML = `👍 جيد: ${feedback[0] || 'كمل شوية'}`; }
        else { scoreFill.style.background = '#10b981'; scoreStatus.innerHTML = '🔥 ممتاز! السيرة الذاتية جاهزة لتخطي فلترة الـ ATS'; }
    }
}

// ==========================================
// 💡 اقتراحات المهام من jobGuidelines
// ==========================================
function showJobSuggestions() {
    const jobTitle = document.getElementById('jobTitle')?.value.toLowerCase().trim() || "";
    const suggestionsBox = document.getElementById('jobSuggestionsBox');
    const suggestionsList = document.getElementById('suggestionsList');
    if (!suggestionsBox || !suggestionsList) return;

    let matchedJob = null;
    for (const key in jobGuidelines) {
        const job = jobGuidelines[key];
        if (job.keywords.some(kw => jobTitle.includes(kw))) {
            matchedJob = job;
            break;
        }
    }

    if (matchedJob) {
        suggestionsList.innerHTML = matchedJob.tips.map(tip =>
            `<button class="suggestion-item" onclick="addTipToExperience('${tip.replace(/'/g, "\\'")}')">${tip}</button>`
        ).join('');
        suggestionsBox.classList.remove('hidden');
    } else {
        suggestionsBox.classList.add('hidden');
    }
}

function addTipToExperience(tip) {
    const expField = document.getElementById('experience');
    if (expField) {
        expField.value += (expField.value? '\n• ' : '• ') + tip;
        expField.dispatchEvent(new Event('input'));
    }
}

// جعل الدالة متاحة للنطاق العالمي لحل مشكلة onclick في الـ HTML المصنع ديناميكياً
window.addTipToExperience = addTipToExperience;

// ==========================================
// 🎯 ميزة مطابقة إعلان الوظيفة
// ==========================================
function initJobMatchChecker() {
    const btn = document.getElementById('checkMatchBtn');
    if (btn) btn.addEventListener('click', checkJobMatch);
}

function checkJobMatch() {
    const jobDesc = document.getElementById('jobDescription')?.value.trim() || "";
    const skills = document.getElementById('skills')?.value.trim() || "";
    const experience = document.getElementById('experience')?.value.trim() || "";
    const resultDiv = document.getElementById('matchResult');
    if (!jobDesc) { alert("الرجاء لصق نص إعلان الوظيفة أولاً"); return; }
    if (!skills && !experience) { alert("الرجاء ملء المهارات والخبرات أولاً"); return; }
    
    // تصحيح الخطأ الإملائي البرمجي هنا:
    const cvText = (skills + " " + experience).toLowerCase();
    
    const jobText = jobDesc.toLowerCase();
    const keywords = jobText.match(/[a-zA-Z0-9\u0600-\u06FF]{3,}/g) || [];
    const stopWords = ['في', 'من', 'على', 'إلى', 'مع', 'the', 'and', 'for', 'with'];
    const uniqueKeywords = [...new Set(keywords)].filter(w => w.length > 3 && !stopWords.includes(w));
    let matched = 0; let missing = [];
    uniqueKeywords.forEach(word => {
        if (cvText.includes(word)) matched++; else missing.push(word);
    });
    const matchPercent = uniqueKeywords.length > 0? Math.round((matched / uniqueKeywords.length) * 100) : 0;
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-top:15px; padding:15px; background:#1e293b; border-radius:10px; border:1px solid #334155;">
                <h4 style="margin:0 0 10px 0;">نسبة التطابق مع الإعلان: ${matchPercent}%</h4>
                <div style="height:10px; background:#334155; border-radius:5px; margin:10px 0; overflow:hidden;">
                    <div style="height:100%; width:${matchPercent}%; background:${matchPercent > 70? '#10b981' : matchPercent > 40? '#f59e0b' : '#ef4444'}; border-radius:5px; transition:width 0.5s;"></div>
                </div>
                ${missing.slice(0,5).length > 0?
                `<p style="color:#fbbf24; font-size:14px;">⚠️ كلمات مفتاحية ناقصة: <b>${missing.slice(0,5).join(', ')}</b><br>ضيفها في المهارات أو الخبرات لرفع النسبة</p>` :
                `<p style="color:#10b981; font-size:14px;">✅ ممتاز! CV بتاعك مطابق جداً للإعلان</p>`}
            </div>
        `;
    }
}

// ==========================================
// 💾 الحفظ التلقائي - امان كامل
// ==========================================
function autoSave() {
    ['name', 'jobTitle', 'phone', 'email', 'experience', 'skills', 'jobDescription'].forEach(id => {
        const el = document.getElementById(id);
        if (el) localStorage.setItem(`cv_${id}`, el.value);
    });
}
function loadSavedData() {
    ['name', 'jobTitle', 'phone', 'email', 'experience', 'skills', 'jobDescription'].forEach(id => {
        const el = document.getElementById(id);
        const saved = localStorage.getItem(`cv_${id}`);
        if (el && saved) el.value = saved;
    });

    const hasData = ['name', 'jobTitle', 'experience', 'skills'].some(id => {
        return document.getElementById(id)?.value.trim().length > 0;
    });

    if (hasData) {
        calculateCVScore();
        showJobSuggestions();
    } else {
        document.getElementById('scoreFill')?.style.width = '0%';
        document.getElementById('scoreText')?.innerText = '0%';
        document.getElementById('scoreStatus')?.innerHTML = '⚠️ الصندوق فارغ، يرجى تعبئة بياناتك للتحليل الفوري...';
    }
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => console.log('PWA Service Worker registered!')).catch(err => console.log('Service Worker failed:', err));
    });
}

// ==========================================
// 🤖 دالة الاتصال بالذكاء الاصطناعي
// ==========================================
async function askAI(promptMessage, systemMessage) {
    if (!navigator.onLine) { throw new Error('لا يوجد اتصال بالانترنت. يرجى التحقق من الشبكة.'); }
    const url = `https://text.pollinations.ai/`;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: "user", content: promptMessage }], system: systemMessage }),
            signal: controller.signal
        });
        clearTimeout(timeout);
        if (!response.ok) throw new Error(`خطأ في الخادم: ${response.status}`);
        let rawText = await response.text();
        let cleanText = rawText.replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, '').replace(/🌸 Ad 🌸[\s\S]*?\[Support our mission\][\s\S]*?\)/gi, '').replace(/Powered by Pollinations\.AI free text APIs\./gi, '').replace(/Support our mission to keep AI accessible for everyone\./gi, '').trim();
        if (!cleanText) throw new Error('الرد فارغ من الخادم');
        return cleanText;
    } catch (error) {
        if (error.name === 'AbortError') throw new Error('انتهت مهلة الاتصال. حاول مرة أخرى');
        throw error;
    }
}

// ==========================================
// 🎉 تهيئة الأحداث
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    displayRandomLiveTip();
    initAppTour();
    initCVScoreGauge();
    initJobMatchChecker();

    const outputBox = document.getElementById('outputBox');
    const getInputs = () => ({
        name: document.getElementById('name')?.value.trim(),
        jobTitle: document.getElementById('jobTitle')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim() || 'غير مدرج للخصوصية',
        email: document.getElementById('email')?.value.trim() || 'info@example.com',
        experience: document.getElementById('experience')?.value.trim() || 'لا توجد خبرات مضافة',
        skills: document.getElementById('skills')?.value.trim() || 'لا توجد مهارات مضافة',
    });

    const aiOptimizeBtn = document.getElementById('aiOptimizeBtn');
    if (aiOptimizeBtn) {
        aiOptimizeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (isGenerating) return;
            const data = getInputs();
            if (!data.name || !data.jobTitle) { alert('يرجى ملء الاسم الكامل والمسمى الوظيفي أولاً!'); return; }
            isGenerating = true;
            const originalBtnText = aiOptimizeBtn.innerHTML;
            aiOptimizeBtn.innerHTML = "⏳ جاري التحسين الذكي وصياغة الـ ATS...";
            aiOptimizeBtn.disabled = true;
            if (outputBox) outputBox.value = 'جاري الاتصال بالعقل الاصطناعي وصياغة سيرتك الذاتية الاحترافية...';
            try {
                const prompt = `قم بصياغة سيرة ذاتية كاملة، احترافية، ومباشرة ومحسنة كلياً للـ ATS باللغة العربية:\nالاسم الكامل: ${data.name}\nالمسمى الوظيفي المستهدف: ${data.jobTitle}\nالهاتف: ${data.phone}\nالبريد الإلكتروني: ${data.email}\nالمهارات المكتوبة: ${data.skills}\nالخبرات المهنية والمهام العملية: ${data.experience}`;
                const res = await askAI(prompt, "أنت مستشار توظيف عالمي خبير بنظام الـ ATS. اكتب محتوى السيرة الذاتية السردية والنصية بنقاء وتنسيق كامل مباشر دون أي هوامش، تحيات، أو ملاحظات إضافية جانبية.");
                if (res && outputBox) { outputBox.value = res; }
            } catch (err) { alert(`حدث خطأ: ${err.message}`); if (outputBox) outputBox.value = 'فشل الاتصال. يرجى المحاولة مرة أخرى.'; }
            finally { isGenerating = false; aiOptimizeBtn.innerHTML = originalBtnText; aiOptimizeBtn.disabled = false; }
        });
    }

    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!outputBox || outputBox.value.trim() === "") { alert('الرجاء إنشاء السيرة الذاتية أولاً!'); return; }
            const originalBtnText = this.innerHTML; this.innerText = "⏳ جاري إصدار وتجهيز المستند الرقمي..."; this.disabled = true;
            const printElement = document.createElement('div');
            printElement.style.padding = '40px'; printElement.style.color = '#1e293b'; printElement.style.background = '#ffffff'; printElement.style.fontFamily = "'Cairo', sans-serif"; printElement.style.lineHeight = '1.8'; printElement.style.direction = 'rtl'; printElement.style.textAlign = 'right';
            printElement.innerHTML = outputBox.value.replace(/\n/g, '<br>');
            const data = getInputs(); const pdfFileName = data.name? `${data.name}_Professional_CV.pdf` : 'My_Resume.pdf';
            const options = { margin: [15, 15, 15, 15], filename: pdfFileName, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
            document.fonts.ready.then(() => {
                setTimeout(() => {
                    html2pdf().set(options).from(printElement).save().then(() => { this.innerHTML = originalBtnText; this.disabled = false; }).catch((err) => { alert('حدث خطأ أثناء تصدير ملف الـ PDF.'); this.innerHTML = originalBtnText; this.disabled = false; });
                }, 250);
            });
        });
    }

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) { themeSelect.addEventListener('change', function() { const theme = this.value; if (theme === 'royal-blue') { document.body.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)'; } else if (theme === 'emerald-green') { document.body.style.background = 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)'; } else { document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'; } }); }

    let currentLang = 'ar';
    const toggleLanguageBtn = document.getElementById('toggleLanguageBtn');
    if (toggleLanguageBtn) { toggleLanguageBtn.addEventListener('click', function(e) { e.preventDefault(); currentLang = currentLang === 'ar'? 'en' : 'ar'; document.documentElement.dir = currentLang === 'ar'? 'rtl' : 'ltr'; document.documentElement.lang = currentLang; toggleLanguageBtn.innerText = currentLang === 'ar'? '🔄 English' : '🔄 العربية'; }); }

    const generateSummaryBtn = document.getElementById('generateSummaryBtn');
    if (generateSummaryBtn) { generateSummaryBtn.addEventListener('click', async function(e) { e.preventDefault(); if (isGenerating) return; const data = getInputs(); if (!data.jobTitle) { alert('الرجاء إدخال المسمى الوظيفي المستهدف أولاً!'); return; } isGenerating = true; const originalBtnText = generateSummaryBtn.innerHTML; generateSummaryBtn.innerHTML = "⏳ جاري الصياغة..."; generateSummaryBtn.disabled = true; try { const summaryPrompt = `اكتب ملخصاً مهنياً (Professional Summary) قصيراً وموجزاً ومقنعاً جداً متوافق مع خوارزميات ATS لوظيفة: "${data.jobTitle}". المهارات المفتاحية المتاحة: ${data.skills}.`; const summary = await askAI(summaryPrompt, "أنت مستشار توظيف عالمي محترف. اكتب نص الملخص المهني فقط في فقرة واحدة متماسكة ومثيرة للإعجاب دون أي مقدمات أو هوامش وبدون ذكر أي ترحيب."); if (summary && outputBox) { if (outputBox.value.trim() === "") { outputBox.value = `الملخص المهني:\n${summary}\n\n`; } else { outputBox.value = `الملخص المهني:\n${summary}\n\n====================\n\n` + outputBox.value; } alert("🧠 تم توليد وحقن الملخص المهني بنجاح!"); } catch (err) { alert(`لم نتمكن من الاتصال: ${err.message}`); } finally { isGenerating = false; generateSummaryBtn.innerHTML = originalBtnText; generateSummaryBtn.disabled = false; } }); }

    const toggleBtn = document.getElementById("dropdownToggleBtn"); const leftMenu = document.getElementById("topLeftMenu");
    if (toggleBtn && leftMenu) { toggleBtn.addEventListener("click", function (e) { e.stopPropagation(); leftMenu.classList.toggle("hidden"); }); document.addEventListener("click", function (e) { if (!leftMenu.contains(e.target) && e.target!== toggleBtn) { leftMenu.classList.add("hidden"); } }); }

    const openSettingsBtn = document.getElementById("openSettingsBtn"); const closeSettingsBtn = document.getElementById("closeSettingsBtn"); const settingsModal = document.getElementById("settingsPageModal");
    if (openSettingsBtn && settingsModal) { openSettingsBtn.addEventListener("click", function () { settingsModal.classList.remove("hidden"); if (leftMenu) leftMenu.classList.add("hidden"); }); }
    if (closeSettingsBtn && settingsModal) { closeSettingsBtn.addEventListener("click", function () { settingsModal.classList.add("hidden"); }); }

    // تفعيل وتطبيق زر وضع التصميم الإبداعي على كامل الصفحة (Body)
    const creativeLayoutToggle = document.getElementById("creativeLayoutToggle");
    if (creativeLayoutToggle) {
        creativeLayoutToggle.addEventListener("change", function () {
            if (this.checked) {
                document.body.classList.add("creative-layout-active");
            } else {
                document.body.classList.remove("creative-layout-active");
            }
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
                alert("عذراً، البيئة الحالية لا تدعم ميزة الإشعارات.");
                return;
            }
            if (Notification.permission === "granted") {
                alert("🔔 الإشعارات مفعلة بالفعل!");
            } else if (Notification.permission!== "denied") {
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
