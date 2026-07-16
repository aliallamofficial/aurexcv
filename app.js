// ========================================================
// 💡 مصفوفة النصائح الجاهزة للخبير
// ========================================================
const cvTips = [
    "تجنب وضع صورتك الشخصية إذا كنت تقدم على شركات عالمية تعتمد نظام ATS تماماً.",
    "احرص على ألا تتجاوز سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات.",
    "استخدم أرقاماً ونسباً مئوية حقيقية لإثبات إنجازاتك (مثال: زيادة المبيعات بنسبة 20%).",
    "البريد الإلكتروني المهني يجب أن يحتوي على اسمك الحقيقي، ابتعد تماماً عن الأسماء مستعارة.",
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
// 🚀 نظام جولة التطبيق والتحكم في ظهور الواجهات
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
    const mainAppContent = document.getElementById('mainAppContent'); 
    
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
        if (mainAppContent) {
            mainAppContent.classList.remove('main-content-hidden'); 
            mainAppContent.style.opacity = 1;
        }
        return;
    }
    
    tourModal.classList.remove('hidden');
    if (mainAppContent) {
        mainAppContent.classList.add('main-content-hidden'); 
    }
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
    const mainAppContent = document.getElementById('mainAppContent');
    
    if (tourModal) {
        tourModal.classList.add('hidden');
    }
    
    if (mainAppContent) {
        mainAppContent.classList.remove('main-content-hidden');
        mainAppContent.style.opacity = 0;
        setTimeout(() => {
            mainAppContent.style.transition = "opacity 0.6s ease-in-out";
            mainAppContent.style.opacity = 1;
        }, 50);
    }
    
    localStorage.setItem('cv_tour_completed', 'true');
}

// ==========================================
// 🔥 مستشار ATS v2.1 (محدث بالكلمات القوية)
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
    checkBackupAvailability(); 
}

function calculateCVScore() {
    const name = document.getElementById('name')?.value.trim() || "";
    const jobTitle = document.getElementById('jobTitle')?.value.trim() || "";
    const experience = document.getElementById('experience')?.value.trim() || "";
    const skills = document.getElementById('skills')?.value.trim() || "";
    let score = 0; 
    let feedback = [];

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
        if (/\d+%|\d+ جنيه|\d+ عميل|\d+ مشروع|\d+ دولار/.test(experience)) {
            score += 20;
            indNum?.classList.add('achieved');
        } else {
            feedback.push("أضف أرقاماً تدعم إنجازاتك السابقة (مثال: %30، 5 مشاريع)");
            indNum?.classList.remove('achieved');
        }
        
        const strongWords = [
            'نفذت', 'طورت', 'قاد', 'زودت', 'حققت', 'قللت', 'أدار', 'أنشأ', 'صممت', 'أشرفت',
            'قمت بـ', 'ساهمت في', 'طورت نظام', 'أطلقت', 'حسّنت', 'وجهت', 'نسقت'
        ];
        if (strongWords.some(word => experience.includes(word))) {
            score += 15;
            indWords?.classList.add('achieved');
        } else {
            feedback.push("ابدأ مسؤولياتك بكلمات قوية: (حققت، ساهمت في، طورت نظام)");
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
        suggestionsList.innerHTML = ''; 
        matchedJob.tips.forEach(tip => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'suggestion-item';
            btn.innerText = tip;
            btn.addEventListener('click', () => {
                addTipToExperience(tip);
            });
            suggestionsList.appendChild(btn);
        });
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
// 💾 إدارة الحفظ والاسترجاع التلقائي والنسخ الاحتياطي
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
    if (confirm("⚠️ هل أنت متأكد من رغبتك في مسح كافة الحقول للبدء من جديد؟")) {
        const backupData = {
            name: document.getElementById('name')?.value || '',
            jobTitle: document.getElementById('jobTitle')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            email: document.getElementById('email')?.value || '',
            experience: document.getElementById('experience')?.value || '',
            skills: document.getElementById('skills')?.value || '',
            jobDescription: document.getElementById('jobDescription')?.value || ''
        };
        
        localStorage.setItem('cv_backup', JSON.stringify(backupData));

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
        
        checkBackupAvailability();
        alert("🗑️ تم مسح البيانات. (يمكنك التراجع بالزر الذي ظهر الآن إذا مسحت بالخطأ!)");
    }
}

function restoreBackup() {
    const backupStr = localStorage.getItem('cv_backup');
    if (!backupStr) return;
    try {
        const data = JSON.parse(backupStr);
        Object.keys(data).forEach(key => {
            const el = document.getElementById(key);
            if (el) {
                el.value = data[key];
                localStorage.setItem(`cv_${key}`, data[key]);
            }
        });
        calculateCVScore();
        showJobSuggestions();
        localStorage.removeItem('cv_backup'); 
        checkBackupAvailability();
        alert("✅ تم التراجع عن المسح واسترجاع بياناتك بنجاح!");
    } catch(e) {
        console.error("Backup restoration failed", e);
    }
}

function checkBackupAvailability() {
    let undoBtn = document.getElementById('undoClearBtn');
    const hasBackup = localStorage.getItem('cv_backup') !== null;
    
    if (hasBackup) {
        if (!undoBtn) {
            undoBtn = document.createElement('button');
            undoBtn.id = 'undoClearBtn';
            undoBtn.type = 'button';
            undoBtn.className = 'btn-action btn-undo'; 
            undoBtn.innerHTML = '↩️ تراجع عن مسح الحقول';
            undoBtn.style.cssText = 'background: #4f46e5; color: white; padding: 8px 16px; border-radius: 8px; margin-top: 10px; cursor: pointer; transition: 0.3s;';
            undoBtn.addEventListener('click', restoreBackup);
            
            const btnGroup = document.getElementById('clearDataBtn')?.parentNode;
            if (btnGroup) {
                btnGroup.appendChild(undoBtn);
            }
        }
    } else {
        if (undoBtn) undoBtn.remove();
    }
}

// ========================================================
// 🤖 نظام الذكاء الاصطناعي الآمن والخفيف (100% متوافق ومحمي)
// ========================================================
async function askAI(promptMessage, systemMessage, userInputs = null) {
    // 1. فحص وجود ميزة الذكاء الاصطناعي المحلية أولاً للسرعة والأمان المطلق
    try {
        console.log("🖥️ جاري تجربة المحاولة المحلية عبر المتصفح (window.ai)...");
        const localResponse = await callLocalAI(promptMessage, systemMessage);
        return localResponse;
    } catch (localError) {
        console.warn("⚠️ ميزة window.ai غير نشطة في متصفحك الحالي.");
    }

    // 2. خط الدفاع المدمج الفوري الفولاذي (دون نقل أي بيانات سحابياً لحفظ الأمان التام وتجاوز التحذيرات)
    if (userInputs) {
        console.log("🛠️ تشغيل المحرك المدمج المحلي الفوري لتخطي مخاطر التوكنات...");
        return generateBackupStaticCV(userInputs);
    }
    
    throw new Error('GENERATION_FAILED');
}

async function callLocalAI(promptMessage, systemMessage) {
    if (window.ai && (await window.ai.canCreateTextSession()) === "readily") {
        const session = await window.ai.createTextSession();
        const formattedPrompt = `${systemMessage}\n\nالطلب الحالي:\n${promptMessage}`;
        const result = await session.prompt(formattedPrompt);
        return result.trim();
    }
    throw new Error("window.ai غير متوفر.");
}

function generateBackupStaticCV(data) {
    const skillsList = data.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const skillsBullets = skillsList.map(s => `  • ${s}`).join('\n');
    
    let formattedExp = data.experience;
    if (!formattedExp.includes('•') && !formattedExp.includes('-')) {
        formattedExp = data.experience.split('\n').map(line => line.trim().length > 0 ? `• ${line}` : '').join('\n');
    }

    return `========================================
الاسم الكامل: ${data.name}
المسمى الوظيفي: ${data.jobTitle}
========================================

📍 معلومات الاتصال:
--------------------
📱 الهاتف: ${data.phone}
📧 البريد الإلكتروني: ${data.email}

🎯 الهدف المهني:
--------------------
ساعٍ لتوظيف مهاراتي وخبراتي كـ ${data.jobTitle} في بيئة عمل متميزة تدعم الابتكار والاحترافية، مع التركيز على تحسين كفاءة الأداء والمساهمة الفعّالة في تحقيق الأهداف الاستراتيجية للمؤسسة مستعيناً بخبراتي ومؤهلاتي القوية.

💼 الخبرات المهنية والعملية:
--------------------
${formattedExp}

🛠️ المهارات الأساسية والتقنية (ATS Optimized):
--------------------
${skillsBullets}

========================================
⚡ تم تهيئة وتنسيق هذا المستند محلياً للتوافق التام مع فحص الـ ATS.`;
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
            if (outputBox) outputBox.value = 'جاري هندسة وصياغة سيرتك الذاتية بأمان وبتوزيع الكلمات المفتاحية الذكية...';
            try {
                const prompt = `أعد صياغة وهيكلة البيانات التالية لتصبح سيرة ذاتية جاهزة عالمياً للـ ATS ومبهرة لمسؤولي التوظيف:\nالاسم الكامل: ${data.name}\nالمسمى الوظيفي المستهدف: ${data.jobTitle}\nالهاتف: ${data.phone}\nالبريد الإلكتروني: ${data.email}\nالمهارات الرئيسية: ${data.skills}\nالخبرات العملية والمهام: ${data.experience}`;
                const res = await askAI(prompt, "أنت مستشار توظيف خبير وذكي في أنظمة الـ ATS. قم بصياغة سيرة ذاتية متناسقة ونقية باللغة العربية دون مقدمات، أو ترحيبات، أو علامات توضيحية. اكتب البيانات فوراً بهيكلية واضحة ومقروءة.", data);
                if (res && outputBox) { outputBox.value = res; }
            } catch (err) { 
                if (outputBox) {
                    outputBox.value = `⚠️ حدث خطأ أو تعذر الاتصال السحابي الآمن.`;
                }
            }
            finally { isGenerating = false; aiOptimizeBtn.innerHTML = originalBtnText; aiOptimizeBtn.disabled = false; }
        });
    }

    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (!outputBox || outputBox.value.trim() === "") { 
                alert('الرجاء صياغة السيرة الذاتية أو توليدها بالذكاء الاصطناعي أولاً!'); 
                return; 
            }
            
            const data = getInputs();
            
            if (data.email && data.email !== 'info@example.com' && !data.email.includes('@')) {
                alert("⚠️ البريد الإلكتروني الذي قمت بإدخاله غير صحيح (يجب أن يحتوي على علامة @). يرجى مراجعته!");
                return;
            }
            
            if (typeof html2pdf === 'undefined') {
                alert('⚠️ نعتذر، تعذر العثور على مكتبة التصدير الرقمي. يرجى التأكد من اتصالك بالإنترنت.');
                return;
            }

            const originalBtnText = this.innerHTML; 
            this.innerText = "⏳ جاري تحضير الملف..."; 
            this.disabled = true;
            
            const selectedFont = document.getElementById('cvFontSelect')?.value || "'Cairo', sans-serif";
            
            const printElement = document.createElement('div');
            printElement.id = 'temp-pdf-render';
            
            printElement.style.cssText = `
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                z-index: -1 !important;
                opacity: 0.01 !important;
                width: 800px !important;
                padding: 50px !important;
                color: #000000 !important;
                background-color: #ffffff !important;
                font-family: ${selectedFont} !important;
                line-height: 1.8 !important;
                direction: rtl !important;
                text-align: right !important;
                font-size: 15px !important;
                display: block !important;
                box-sizing: border-box !important;
                height: auto !important;
            `;
            
            const lines = outputBox.value.split('\n');
            let htmlContent = '';
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed === "") {
                    htmlContent += '<br>';
                } else if (trimmed.startsWith('==') || trimmed.startsWith('__')) {
                    htmlContent += `<h3 style="border-bottom: 2px solid #1e293b; padding-bottom: 5px; margin-top: 22px; color: #0f172a !important; font-family: ${selectedFont} !important; font-size: 18px;">${trimmed.replace(/^[=_]+/g, '')}</h3>`;
                } else {
                    htmlContent += `<p style="margin: 6px 0; color: #1e293b !important; font-family: ${selectedFont} !important; font-size: 14.5px;">${trimmed}</p>`;
                }
            });
            
            printElement.innerHTML = htmlContent;
            
            document.body.appendChild(printElement);
            
            const pdfFileName = data.name ? `${data.name}_CV.pdf` : 'My_CV.pdf';
            
            const options = { 
                margin: [15, 15, 15, 15], 
                filename: pdfFileName, 
                image: { type: 'jpeg', quality: 0.98 }, 
                html2canvas: { 
                    scale: 2.2,             
                    useCORS: true,          
                    logging: false, 
                    backgroundColor: '#ffffff',
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 800        
                }, 
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
            };
            
            setTimeout(() => {
                html2pdf().set(options).from(printElement).save().then(() => { 
                    document.body.removeChild(printElement);
                    this.innerHTML = originalBtnText; 
                    this.disabled = false; 
                }).catch((err) => { 
                    console.error("PDF Export Error:", err);
                    if (document.getElementById('temp-pdf-render')) {
                        document.body.removeChild(printElement);
                    }
                    alert('حدث خطأ أثناء تصدير ملف الـ PDF. يرجى مراجعة بياناتك.'); 
                    this.innerHTML = originalBtnText; 
                    this.disabled = false; 
                });
            }, 600); 
        });
    }

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

    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearAllFields();
        });
    }

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
            if (outputBox) outputBox.value = 'جاري هندسة وصياغة ملخص مهني جذاب ومتناسق مع أنظمة الـ ATS...';
            try { 
                const summaryPrompt = `اكتب ملخصاً مهنياً (Professional Summary) ذكياً، قصيراً ومؤثراً متوافقاً مع خوارزميات الـ ATS لوظيفة: "${data.jobTitle}". المهارات المفتاحية: ${data.skills}.`; 
                const summary = await askAI(summaryPrompt, "أنت مستشار توظيف عالمي خبير. اكتب نص الملخص المهني فقط في فقرة واحدة جذابة من 3 أسطر على الأكثر دون أي مقدمات أو ترحيب.", data); 
                if (summary && outputBox) { 
                    outputBox.value = `الملخص المهني:\n${summary}\n\n====================\n\n`; 
                    alert("🧠 تم توليد وحقن الملخص المهني بنجاح في مقدمة ملفك!"); 
                } 
            } catch (err) { 
                if (outputBox) {
                     outputBox.value = `الملخص المهني المقترح لـ ${data.jobTitle}:
"مهني طموح ومبادر في مجال ${data.jobTitle}، أمتلك مهارات استثنائية في العمل الجماعي وحل المشكلات مع التركيز على الكفاءة والإنتاجية العالية لمطابقة متطلبات سوق العمل ونظام الـ ATS."`;
                }
            } 
            finally { isGenerating = false; generateSummaryBtn.innerHTML = originalBtnText; generateSummaryBtn.disabled = false; } 
        }); 
    }

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
                    alert("📋 تم نسخ رابط التطبيق بنجاح لمشاركته مع زملائك!");
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
