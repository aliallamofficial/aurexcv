// ========================================================
// 💡 مصفوفة النصائح الجاهزة للخبير
// ========================================================
const cvTips = [
    "تجنب وضع صورتك الشخصية إذا كنت تقدم على شركات عالمية تعتمد نظام ATS تماماً.",
    "احرص على ألا تتجاوز سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات.",
    "استخدم أرقاماً ونسباً مئوية حقيقية لإثبات إنجازاتك (مثال: زيادة المبيعات بنسبة 20%).",
    "البريد الإلكتروني المهني يجب أن يحتوي على اسمك الحقيقي، ابتعد تماماً عن الأسماء المستعارة.",
    "الكلمات المفتاحية المأخوذة من إعلان الوظيفة نفسه هي مفتاحك السحري لتخطي فلترة الـ ATS."
];

const jobGuidelines = {
    "graphic_designer": { 
        title: "مصمم جرافيك", 
        keywords: ["مصمم", "جرافيك", "designer"], 
        tips: [
            "ابتكار هويات بصرية كاملة تتوافق مع رؤية العلامة التجارية وشخصيتها.",
            "تصميم مواد إعلانية ومحتوى رقمي لمنصات التواصل الاجتماعي لزيادة التفاعل بنسبة %X.",
            "إتقان العمل على حزمة Adobe (Photoshop, Illustrator, InDesign) وإدارة الوقت بكفاءة."
        ] 
    },
    "content_creator": { 
        title: "صانع محتوى / كاتب محتوى", 
        keywords: ["محتوى", "كاتب", "content", "writer"], 
        tips: [
            "كتابة سيناريوهات ومحتوى إبداعي متوافق مع قواعد الـ SEO لزيادة الزيارات العضوية.",
            "تحليل أداء المحتوى الرقمي وتطوير استراتيجيات النشر لرفع مستويات التفاعل.",
            "التعاون مع فرق التصميم والمونتاج لإنتاج مواد مرئية استثنائية."
        ] 
    },
    "interior_designer": { 
        title: "مهندس ديكور / مصمم داخلي", 
        keywords: ["ديكور", "داخلي", "interior"], 
        tips: [
            "إعداد مخططات ثنائية وثلاثية الأبعاد (3D Max, AutoCAD) بدقة هندسية وجمالية فائقة.",
            "اختيار الخامات، الأثاث، وتنسيق الإضاءة بما يتوافق مع ميزانية العميل واحتياجاته.",
            "الإشراف الميداني الدقيق على التنفيذ لضمان مطابقة الواقع للمخططات."
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
// 🚀 نظام جولة التطبيق (الإصدار البرمجي المطور والمضمون)
// ========================================================
const tourSteps = [
    { icon: "🚀", title: "مرحباً بك في مستقبلك المهني الجديد!", desc: "دعنا نأخذك في جولة سريعة مدتها دقيقة واحدة للتعرف على كيفية صناعة سيرة ذاتية لا تقهر بالذكاء الاصطناعي.", btnText: "ابدأ الرحلة الآن ←" },
    { icon: "📊", title: "مستشار الـ ATS الذكي لحظة بلحظة", desc: "أثناء كتابة بياناتك، سيقوم العداد الذكي بتقييم قوة مستندك وإعطائك نصائح حية لتخطي أنظمة الفلترة العالمية بنجاح.", btnText: "التالي مذهل كالعادة ←" },
    { icon: "🎯", title: "مطابقة إعلان الوظيفة", desc: "الصق إعلان الوظيفة واعرف نسبة تطابقك والكلمات الدلالية الناقصة فوراً لتتجاوز الفحص بكفاءة.", btnText: "إنهاء الجولة والدخول للتطبيق 🎉" }
];
let currentTourStep = 0;
let isGenerating = false;

function initAppTour() {
    const tourModal = document.getElementById('appTourModal');
    if (!tourModal) return;

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
    if (skipBtn) {
        skipBtn.addEventListener('click', closeTour);
    }

    if (localStorage.getItem('cv_tour_completed') === 'true') {
        tourModal.classList.add('hidden');
        return;
    }
    
    tourModal.classList.remove('hidden');
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
    const tourModal = document.getElementById('appTourModal');
    if (tourModal) {
        tourModal.classList.add('hidden');
    }
    localStorage.setItem('cv_tour_completed', 'true');
}

// ==========================================
// 🔥 مستشار ATS v2.0 (معالجة معرّف الحقل الموحد "name")
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
    let score = 0; 
    let feedback = [];

    // تحديث مؤشرات ATS ثنائية الأبعاد بصرياً
    const indBasic = document.getElementById('ind-basic');
    const indSkills = document.getElementById('ind-skills');
    const indNum = document.getElementById('ind-num');
    const indWords = document.getElementById('ind-words');

    if (name.length > 3 && jobTitle.length > 3) {
        score += 25;
        indBasic?.classList.add('achieved');
    } else {
        feedback.push("اكتب الاسم الكامل والمسمى الوظيفي المستهدف");
        indBasic?.classList.remove('achieved');
    }
    
    const skillsCount = skills.split(',').filter(s => s.trim().length > 1).length;
    if (skillsCount >= 5) {
        score += 25;
        indSkills?.classList.add('achieved');
    } else if (skillsCount >= 2) {
        score += 12;
        indSkills?.classList.remove('achieved');
    } else {
        feedback.push("أضف 5 مهارات على الأقل مفصولة بفاصلة");
        indSkills?.classList.remove('achieved');
    }
    
    if (experience.length > 40) {
        score += 15;
        // التحقق من الأرقام والإنجازات
        if (/\d+%|\d+ جنيه|\d+ عميل|\d+ مشروع|\d+ دولار/.test(experience)) {
            score += 20;
            indNum?.classList.add('achieved');
        } else {
            feedback.push("أضف أرقاماً تدعم إنجازاتك السابقة (مثال: %30، 5 مشاريع)");
            indNum?.classList.remove('achieved');
        }
        
        // التحقق من الأفعال القوية
        const strongWords = ['نفذت', 'طورت', 'قاد', 'زودت', 'حققت', 'قللت', 'أدار', 'أنشأ', 'صممت', 'أشرفت'];
        if (strongWords.some(word => experience.includes(word))) {
            score += 15;
            indWords?.classList.add('achieved');
        } else {
            feedback.push("ابدأ مسؤولياتك بفعل قوي: (حققت، صممت، أدار)");
            indWords?.classList.remove('achieved');
        }
    } else if (experience.length > 10) { 
        score += 10; 
        feedback.push("فصّل مسؤولياتك الوظيفية للحصول على تقييم أعلى"); 
        indNum?.classList.remove('achieved');
        indWords?.classList.remove('achieved');
    } else {
        indNum?.classList.remove('achieved');
        indWords?.classList.remove('achieved');
    }

    const totalLength = name.length + jobTitle.length + experience.length + skills.length;
    if (totalLength > 300) score = Math.min(score + 10, 100);
    
    const scoreFill = document.getElementById('scoreFill');
    const scoreText = document.getElementById('scoreText');
    const scoreStatus = document.getElementById('scoreStatus');
    
    if (scoreFill && scoreText && scoreStatus) {
        scoreFill.style.width = `${score}%`; 
        scoreText.innerText = `${score}%`;
        
        if (score === 0) { 
            scoreFill.style.background = '#475569'; 
            scoreStatus.innerHTML = '⚠️ املأ اسمك ومُسمّاك الوظيفي المستهدف للبدء بالتحليل الذكي والتحليلي...'; 
        } else if (score < 40) { 
            scoreFill.style.background = 'linear-gradient(90deg, #ef4444, #f87171)'; 
            scoreStatus.innerHTML = `⚠️ <strong>ضعيف:</strong> ${feedback[0] || 'أكمل البيانات الأساسية'}`; 
        } else if (score < 75) { 
            scoreFill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)'; 
            scoreStatus.innerHTML = `👍 <strong>جيد:</strong> ${feedback[0] || 'حسّن التفاصيل للحصول على النتيجة الكاملة'}`; 
        } else { 
            scoreFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)'; 
            scoreStatus.innerHTML = '🔥 <strong>ممتاز!</strong> سيرتك الذاتية متطابقة ومهيأة لتجاوز أقوى أنظمة الـ ATS بنجاح.'; 
        }
    }
}

// ==========================================
// 💡 معالج اقتراحات المهام والوظائف الذكية
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
        suggestionsList.innerHTML = matchedJob.tips.map(tip => {
            const escapedTip = tip.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            return `<button type="button" class="suggestion-item" onclick="addTipToExperience('${escapedTip}')">${tip}</button>`;
        }).join('');
        suggestionsBox.classList.remove('hidden');
    } else {
        suggestionsBox.classList.add('hidden');
    }
}

function addTipToExperience(tip) {
    const expField = document.getElementById('experience');
    if (expField) {
        expField.value += (expField.value ? '\n• ' : '• ') + tip;
        expField.dispatchEvent(new Event('input'));
    }
}
window.addTipToExperience = addTipToExperience;

// ==========================================
// 🎯 مطابقة إعلان الوظيفة الذاتي (ATS Match)
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
    
    if (!jobDesc) { alert("الرجاء لصق نص إعلان الوظيفة أولاً للتحليل!"); return; }
    if (!skills && !experience) { alert("الرجاء تعبئة المهارات أو الخبرات للتحقق من التطابق!"); return; }
    
    const cvText = (skills + " " + experience).toLowerCase();
    const jobText = jobDesc.toLowerCase();
    
    const keywords = jobText.match(/[a-zA-Z0-9\u0600-\u06FF]{3,}/g) || [];
    const stopWords = ['في', 'من', 'على', 'إلى', 'مع', 'the', 'and', 'for', 'with', 'هذا', 'هذه', 'بين'];
    const uniqueKeywords = [...new Set(keywords)].filter(w => w.length > 3 && !stopWords.includes(w));
    
    let matched = 0; 
    let missing = [];
    uniqueKeywords.forEach(word => {
        if (cvText.includes(word)) matched++; else missing.push(word);
    });
    
    const matchPercent = uniqueKeywords.length > 0 ? Math.round((matched / uniqueKeywords.length) * 100) : 0;
    
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-top:16px; padding:16px; background: rgba(31, 41, 55, 0.7); border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:13.5px; font-weight:700;">نسبة ملاءمة الكلمات المفتاحية:</span>
                    <span style="font-size:16px; font-weight:700; color:${matchPercent > 70 ? '#10b981' : matchPercent > 40 ? '#f59e0b' : '#ef4444'};">${matchPercent}%</span>
                </div>
                <div style="height:8px; background:#1f2937; border-radius:10px; overflow:hidden; margin-bottom:12px;">
                    <div style="height:100%; width:${matchPercent}%; background:linear-gradient(90deg, #ec4899, #8b5cf6); border-radius:10px; transition:width 0.6s;"></div>
                </div>
                ${missing.length > 0 ?
                `<p style="color:#fbbf24; font-size:12.5px; line-height:1.6;">⚠️ الكلمات الموصى بإضافتها لرفع النسبة: <strong style="color:white;">${missing.slice(0, 5).join(', ')}</strong></p>` :
                `<p style="color:#10b981; font-size:12.5px; line-height:1.6;">✅ مذهل! السيرة الذاتية متوافقة بشكل كامل وخارقة للمعايير.</p>`}
            </div>
        `;
    }
}

// ==========================================
// 🎙️ ميزة الإملاء الصوتي الذكي (Speech Recognition)
// ==========================================
function initVoiceDictation() {
    const voiceBtn = document.getElementById('voiceDictationBtn');
    const expField = document.getElementById('experience');
    
    if (!voiceBtn || !expField) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        voiceBtn.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-EG';
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceBtn.addEventListener('click', () => {
        if (voiceBtn.classList.contains('recording')) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    recognition.onstart = () => {
        voiceBtn.classList.add('recording');
        voiceBtn.innerText = '🔴 جاري الاستماع...';
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        expField.value += (expField.value ? ' ' : '') + text;
        expField.dispatchEvent(new Event('input'));
    };

    recognition.onend = () => {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerText = '🎤 إملاء ذكي';
    };

    recognition.onerror = () => {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerText = '🎤 إملاء ذكي';
    };
}

// ==========================================
// 💾 إدارة الحفظ والاسترجاع التلقائي والمسح
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
    }
}

function clearAllFields() {
    if (confirm("هل أنت متأكد من رغبتك في مسح كافة الحقول الحالية للبدء من جديد؟")) {
        ['name', 'jobTitle', 'phone', 'email', 'experience', 'skills', 'jobDescription', 'outputBox'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        ['name', 'jobTitle', 'phone', 'email', 'experience', 'skills', 'jobDescription'].forEach(id => {
            localStorage.removeItem(`cv_${id}`);
        });
        calculateCVScore();
        showJobSuggestions();
        const resultDiv = document.getElementById('matchResult');
        if (resultDiv) resultDiv.innerHTML = '';
        alert("🗑️ تم تفريغ الحقول وإعادة التعيين بنجاح!");
    }
}

// تسجيل الـ Service Worker للموقع كـ PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA Service Worker ready!'))
            .catch(err => console.error('Service Worker registration failed:', err));
    });
}

// ==========================================
// 🤖 دالة الاتصال بالذكاء الاصطناعي
// ==========================================
async function askAI(promptMessage, systemMessage) {
    if (!navigator.onLine) { throw new Error('لا يوجد اتصال بالشبكة حالياً. يرجى المزامنة وإعادة المحاولة.'); }
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
        if (!response.ok) throw new Error(`فشل الاتصال بخادم المعالجة: ${response.status}`);
        let rawText = await response.text();
        let cleanText = rawText.replace(/---[\s\S]*?Support Pollinations\.AI[\s\S]*?---/gi, '').replace(/🌸 Ad 🌸[\s\S]*?\[Support our mission\][\s\S]*?\)/gi, '').replace(/Powered by Pollinations\.AI free text APIs\./gi, '').replace(/Support our mission to keep AI accessible for everyone\./gi, '').trim();
        if (!cleanText) throw new Error('لم يقم خادم الذكاء الاصطناعي بإعادة أي نصوص.');
        return cleanText;
    } catch (error) {
        if (error.name === 'AbortError') throw new Error('انتهت المهلة المتاحة للاتصال. يرجى إعادة المحاولة.');
        throw error;
    }
}

// ==========================================
// 🎉 تهيئة الأحداث والـ DOM والمزايا الجديدة
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    displayRandomLiveTip();
    initAppTour();
    initCVScoreGauge();
    initJobMatchChecker();
    initVoiceDictation();

    const outputBox = document.getElementById('outputBox');
    const getInputs = () => ({
        name: document.getElementById('name')?.value.trim(),
        jobTitle: document.getElementById('jobTitle')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim() || 'غير مدرج للخصوصية',
        email: document.getElementById('email')?.value.trim() || 'info@example.com',
        experience: document.getElementById('experience')?.value.trim() || 'لا توجد خبرات عملية مضافة',
        skills: document.getElementById('skills')?.value.trim() || 'لا توجد مهارات مضافة',
    });

    // زر التحسين الذكي الشامل بالذكاء الاصطناعي
    const aiOptimizeBtn = document.getElementById('aiOptimizeBtn');
    if (aiOptimizeBtn) {
        aiOptimizeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (isGenerating) return;
            const data = getInputs();
            if (!data.name || !data.jobTitle) { alert('يرجى كتابة اسمك الكامل والمسمى الوظيفي المستهدف أولاً!'); return; }
            isGenerating = true;
            const originalBtnText = aiOptimizeBtn.innerHTML;
            aiOptimizeBtn.innerHTML = "⏳ جاري الهندسة الذكية للمستند بالـ ATS...";
            aiOptimizeBtn.disabled = true;
            if (outputBox) outputBox.value = 'جاري الاتصال بالعقل الاصطناعي وصياغة سيرتك الذاتية بتوزيع الكلمات المفتاحية الذكية...';
            try {
                const prompt = `أعد صياغة وهيكلة البيانات التالية لتصبح سيرة ذاتية جاهزة عالمياً للـ ATS ومبهرة لمسؤولي التوظيف:\nالاسم الكامل: ${data.name}\nالمسمى الوظيفي المستهدف: ${data.jobTitle}\nالهاتف: ${data.phone}\nالبريد الإلكتروني: ${data.email}\nالمهارات الرئيسية: ${data.skills}\nالخبرات العملية والمهام: ${data.experience}`;
                const res = await askAI(prompt, "أنت مستشار توظيف خبير وذكي في أنظمة الـ ATS. قم بصياغة سيرة ذاتية متناسقة ونقية باللغة العربية دون مقدمات، أو ترحيبات، أو علامات توضيحية. اكتب البيانات فوراً بهيكلية واضحة ومقروءة.");
                if (res && outputBox) { outputBox.value = res; }
            } catch (err) { alert(`حدث خطأ: ${err.message}`); if (outputBox) outputBox.value = 'فشل الاتصال بالذكاء الاصطناعي. يرجى التحقق وإعادة المحاولة.'; }
            finally { isGenerating = false; aiOptimizeBtn.innerHTML = originalBtnText; aiOptimizeBtn.disabled = false; }
        });
    }

    // زر تحميل الـ PDF مع ميزة تعديل وتخصيص الخطوط
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!outputBox || outputBox.value.trim() === "") { alert('الرجاء صياغة السيرة الذاتية أو توليدها بالذكاء الاصطناعي أولاً!'); return; }
            
            if (typeof html2pdf === 'undefined') {
                alert('⚠️ نعتذر، تعذر العثور على مكتبة التصدير الرقمي. يرجى التأكد من اتصالك بالإنترنت.');
                return;
            }

            const originalBtnText = this.innerHTML; 
            this.innerText = "⏳ جاري معالجة الهيكل وإصدار الـ PDF..."; 
            this.disabled = true;
            
            // قراءة نمط الخط المختار من الإعدادات لفرضه في الطباعة
            const selectedFont = document.getElementById('cvFontSelect')?.value || "'Cairo', sans-serif";
            
            const printElement = document.createElement('div');
            printElement.style.padding = '35px'; 
            printElement.style.color = '#111827'; 
            printElement.style.background = '#ffffff'; 
            printElement.style.fontFamily = selectedFont; 
            printElement.style.lineHeight = '1.8'; 
            printElement.style.direction = 'rtl'; 
            printElement.style.textAlign = 'right';
            printElement.style.fontSize = '14px';
            printElement.innerHTML = outputBox.value.replace(/\n/g, '<br>');
            
            const data = getInputs(); 
            const pdfFileName = data.name ? `${data.name}_Professional_CV.pdf` : 'My_Professional_CV.pdf';
            const options = { 
                margin: [12, 12, 12, 12], 
                filename: pdfFileName, 
                image: { type: 'jpeg', quality: 0.99 }, 
                html2canvas: { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff' }, 
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
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
                }, 200);
            });
        });
    }

    // إدارة السمات والوضع الكوني والرموز
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) { 
        themeSelect.addEventListener('change', function() { 
            const theme = this.value; 
            if (theme === 'royal-blue') { 
                document.body.style.background = 'linear-gradient(135deg, #0f1e3d 0%, #080c14 100%)'; 
            } else if (theme === 'emerald-green') { 
                document.body.style.background = 'linear-gradient(135deg, #092e20 0%, #050f0b 100%)'; 
            } else if (theme === 'cyber-punk') {
                document.body.style.background = 'linear-gradient(135deg, #25093a 0%, #0d041c 100%)';
            } else { 
                document.body.style.background = 'linear-gradient(135deg, #090d16 0%, #111827 100%)'; 
            } 
        }); 
    }

    // زر التحول الإبداعي الفاخر
    const creativeToggle = document.getElementById('creativeLayoutToggle');
    if (creativeToggle) {
        creativeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('creative-layout-active');
            } else {
                document.body.classList.remove('creative-layout-active');
            }
        });
    }

    // تدويل اللغة في الصفحة للتوافق العالمي
    let currentLang = 'ar';
    const toggleLanguageBtn = document.getElementById('toggleLanguageBtn');
    if (toggleLanguageBtn) { 
        toggleLanguageBtn.addEventListener('click', function(e) { 
            e.preventDefault(); 
            currentLang = currentLang === 'ar' ? 'en' : 'ar'; 
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'; 
            document.documentElement.lang = currentLang; 
            toggleLanguageBtn.innerText = currentLang === 'ar' ? '🔄 English (الانتقال للإنجليزية)' : '🔄 العربية (Arabic)'; 
        }); 
    }

    // مسح الحقول وإعادة تعيين البيانات من الترس السريع
    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearAllFields();
        });
    }

    // توليد ملخص مهني احترافي مستقل وحقنه بالملف
    const generateSummaryBtn = document.getElementById('generateSummaryBtn');
    if (generateSummaryBtn) { 
        generateSummaryBtn.addEventListener('click', async function(e) { 
            e.preventDefault(); 
            if (isGenerating) return; 
            const data = getInputs(); 
            if (!data.jobTitle) { alert('الرجاء إدخال المسمى الوظيفي المستهدف أولاً لتتم الصياغة بموجبه!'); return; } 
            isGenerating = true; 
            const originalBtnText = generateSummaryBtn.innerHTML; 
            generateSummaryBtn.innerHTML = "⏳ جاري الصياغة الكونية..."; 
            generateSummaryBtn.disabled = true; 
            try { 
                const summaryPrompt = `اكتب ملخصاً مهنياً (Professional Summary) ذكياً، قصيراً ومؤثراً متوافقاً مع خوارزميات الـ ATS لوظيفة: "${data.jobTitle}". المهارات المفتاحية: ${data.skills}.`; 
                const summary = await askAI(summaryPrompt, "أنت مستشار توظيف عالمي خبير. اكتب نص الملخص المهني فقط في فقرة واحدة جذابة من 3 أسطر على الأكثر دون أي مقدمات أو ترحيب."); 
                if (summary && outputBox) { 
                    if (outputBox.value.trim() === "") { 
                        outputBox.value = `الملخص المهني:\n${summary}\n\n`; 
                    } else { 
                        outputBox.value = `الملخص المهني:\n${summary}\n\n====================\n\n` + outputBox.value; 
                    } 
                    alert("🧠 تم توليد وحقن الملخص المهني بنجاح في مقدمة ملفك!"); 
                } 
            } catch (err) { alert(`حدث خطأ أثناء الصياغة: ${err.message}`); } 
            finally { isGenerating = false; generateSummaryBtn.innerHTML = originalBtnText; generateSummaryBtn.disabled = false; } 
        }); 
    }

    // تفعيل الترس العائم وقائمتها المنبثقة
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

    // فتح وغلق نافذة إعدادات المظهر المتقدمة
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

    // زر مشاركة التطبيق الذكي
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
                    alert("📋 تم نسخ رابط التطبيق بنجاح لمشاركته مع زملائك!");
                } catch (err) {
                    alert("عذراً، لم نتمكن من نسخ الرابط تلقائياً.");
                }
            }
        });
    }

    // زر إشعارات الفرص والخدمات الذكية
    const notificationBtn = document.getElementById("enableNotificationsBtn");
    if (notificationBtn) {
        notificationBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (!("Notification" in window)) {
                alert("عذراً، المتصفح الحالي لا يدعم نظام الإشعارات.");
                return;
            }
            if (Notification.permission === "granted") {
                alert("🔔 الإشعارات والفرص مفعلة مسبقاً لديك!");
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        alert("🎉 تم تفعيل إشعارات الفرص المحدثة بنجاح!");
                    } else {
                        alert("⚠️ تم رفض إذن تفعيل الإشعارات.");
                    }
                });
            }
        });
    }
});
