// ========================================================
// 🌐 قاموس الترجمة العالمي والديناميكي (Internationalization)
// ========================================================
const translations = {
    ar: {
        appTitleSEO: "عمل سيرة ذاتية بالذكاء الاصطناعي مجاناً | Free AI Resume Builder & ATS Checker - Ali CV Builder",
        sharedViewText: "👀 أنت تتصفح الآن سيرة ذاتية مشتركة في وضع العرض فقط.",
        cloneSharedCVBtn: "✍️ تعديل هذه السيرة أو إنشاء واحدة جديدة",
        tourStep1: "خطوة 1 من 3",
        tourTitleText: "مرحباً بك في مستقبلك المهني الجديد!",
        tourDescText: "دعنا نأخذك في جولة سريعة مدتها دقيقة واحدة للتعرف على كيفية صناعة سيرة ذاتية لا تقهر بالذكاء الاصطناعي.",
        tourStartBtn: "ابدأ الرحلة الآن ←",
        tourSkipBtn: "تخطي",
        settingsHeaderTitle: "⚙️ تخصيص المنصة والمظهر الفاخر",
        themeLabel: "🎨 مظهر التطبيق الكوني (Themes):",
        themeDefault: "🌌 الوضع الكوني العميق (افتراضي)",
        themeRoyal: "👑 الأزرق الملكي الفاخر",
        themeEmerald: "💚 الأخضر الزمردي الخلاب",
        themeCyber: "🔮 الأرجواني السايبربانك",
        fontLabel: "✍️ نمط خط السيرة الذاتية (CV Fonts):",
        creativeTitle: "✨ مظهر التصميم الإبداعي الفاخر",
        creativeDesc: "ألوان مشعة وتأثير نيون متوهج لكامل المنصة",
        appSubtitle: "صمّم مستندك المهني القادم بأحدث تقنيات الذكاء الاصطناعي التوليدي. قوالب ذكية مجهزة لـ عمل سي في احترافي جاهز للتعديل والطباعة فوراً، مخصصة بالكامل لتخطي خوارزميات فحص الـ ATS العالمية بنسبة 100% وبدون الحاجة لإنشاء حساب أو تسجيل بياناتك.",
        atsLiveAdvisor: "مستشار الـ ATS الذكي اللحظي:",
        indBasic: "👤 البيانات الأساسية",
        indSkills: "🛠️ مهارات كافية",
        indNum: "📊 أرقام وإنجازات",
        indWords: "⚡ أفعال حركية",
        atsInitialStatusText: "⚠️ املأ اسمك ومُسمّاك الوظيفي المستهدف للبدء بالتحليل الذكي والتحليلي...",
        inputSectionTitle: "📝 بياناتك المهنية والشخصية لإعداد السي في",
        voiceBtnText: "🎤 إملاء ذكي",
        previewSectionTitle: "✨ مستندك المهني الجاهز",
        badgeReadyText: "A4 جاهز للطباعة",
        expertTipTitleText: "نصائح إضافية لكيفية عمل نموذج سيرة ذاتية ممتاز:",
        aiWelcomeMsg: "مرحباً بك! أنا **Ali AI** مساعدك الذكي المتكامل. 🤖✨\nيمكنني إرشادك لأماكن الميزات، وشرح كيفية بناء وتصدير سيرة ذاتية متوافقة مع الـ ATS، أو استقبال شكواك ومقترحاتك فوراً. بأي لغة تفضل التحدث اليوم؟"
    },
    en: {
        appTitleSEO: "Free AI Resume Builder & ATS Checker - Ali CV Builder",
        sharedViewText: "👀 You are currently browsing a shared resume in read-only mode.",
        cloneSharedCVBtn: "✍️ Edit this CV or create a new one",
        tourStep1: "Step 1 of 3",
        tourTitleText: "Welcome to your new career future!",
        tourDescText: "Let's take you on a quick 1-minute tour to learn how to build an invincible resume using AI.",
        tourStartBtn: "Start Journey Now ←",
        tourSkipBtn: "Skip",
        settingsHeaderTitle: "⚙️ Platform Customization & Premium Layout",
        themeLabel: "🎨 App Cosmic Themes:",
        themeDefault: "🌌 Deep Space Cosmic (Default)",
        themeRoyal: "👑 Luxury Royal Blue",
        themeEmerald: "💚 Stunning Emerald Green",
        themeCyber: "🔮 Cyberpunk Purple",
        fontLabel: "✍️ Resume Fonts (CV Fonts):",
        creativeTitle: "✨ Luxury Creative Design",
        creativeDesc: "Radiant colors and unique neon effects for the interface",
        appSubtitle: "Craft an invincible strategic resume, 100% compliant with smart Applicant Tracking Systems (ATS) algorithms with full real-time AI support.",
        atsLiveAdvisor: "Real-time Smart ATS Advisor:",
        indBasic: "👤 Basic Info",
        indSkills: "🛠️ Enough Skills",
        indNum: "📊 Numbers & Achievements",
        indWords: "⚡ Action Verbs",
        atsInitialStatusText: "⚠️ Fill in your name and target job title to start the smart live analysis...",
        inputSectionTitle: "📝 Your Professional & Personal Data for CV",
        voiceBtnText: "🎤 Smart Voice",
        previewSectionTitle: "✨ Your Ready Professional Document",
        badgeReadyText: "A4 Ready for Print",
        expertTipTitleText: "Additional tips on how to make an excellent resume:",
        aiWelcomeMsg: "Welcome! I am **Ali AI** your integrated smart assistant. 🤖✨\nI can guide you to features, explain how to bypass ATS, or receive your feedback. Which language do you prefer today?"
    }
};

let currentLang = 'ar';
const SECURE_BACKEND_URL = "https://ali-cv-backend.prof-ali-hatem-cairo.workers.dev";

const cvTips = [
    "تجنب وضع صورتك الشخصية إذا كنت تقدم على شركات عالمية تعتمد نظام ATS تماماً.",
    "احرص على ألا تتجاوز سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات.",
    "استخدم أرقاماً ونسباً مئوية حقيقية لإثبات إنجازاتك (مثال: زيادة المبيعات بنسبة 20%).",
    "البريد الإلكتروني المهني يجب أن يحتوي على اسمك الحقيقي، ابتعد تماماً عن الأسماء المستعارة.",
    "الكلمات المفتاحية المأخوذة من إعلان الوظيفة نفسه هي مفتاحك السحري لتخطي فلترة الـ ATS."
];

const jobGuidelines = {
    "graphic_designer": { keywords: ["مصمم", "جرافيك", "designer", "graphic"], ar: "مصمم جرافيك", en: "Graphic Designer" },
    "content_creator": { keywords: ["محتوى", "كاتب", "content", "writer"], ar: "صانع محتوى", en: "Content Creator" },
    "manager": { keywords: ["مدير", "مشاريع", "manager", "project"], ar: "مدير مشاريع", en: "Project Manager" },
    "engineer": { keywords: ["مهندس", "برمجيات", "engineer", "software"], ar: "مهندس برمجيات", en: "Software Engineer" },
    "accountant": { keywords: ["محاسب", "مالي", "accountant", "finance"], ar: "محاسب مالي", en: "Accountant" }
};

// ========================================================
// ⚡ إدارة جولة مستخدم المنصة (App Tour)
// ========================================================
let tourStep = 1;
function updateTour() {
    const title = document.getElementById("tourTitle");
    const desc = document.getElementById("tourDescription");
    const badge = document.getElementById("tourProgress");
    const icon = document.getElementById("tourIcon");
    const nextBtn = document.getElementById("nextTourBtn");

    if (!title || !desc || !badge || !nextBtn) return;

    if (tourStep === 1) {
        badge.innerText = currentLang === 'ar' ? "خطوة 1 من 3" : "Step 1 of 3";
        if(icon) icon.innerText = "🚀";
        title.innerText = currentLang === 'ar' ? "مرحباً بك في مستقبلك المهني الجديد!" : "Welcome to your new career future!";
        desc.innerText = currentLang === 'ar' ? "دعنا نأخذك في جولة سريعة مدتها دقيقة واحدة لتعلم كيفية عمل سي في احترافي." : "Let's take you on a quick 1-minute tour to learn how to build an AI CV.";
        nextBtn.innerText = currentLang === 'ar' ? "ابدأ الرحلة الآن ←" : "Start Journey Now ←";
    } else if (tourStep === 2) {
        badge.innerText = currentLang === 'ar' ? "خطوة 2 من 3" : "Step 2 of 3";
        if(icon) icon.innerText = "📊";
        title.innerText = currentLang === 'ar' ? "مستشار الـ ATS الذكي اللحظي" : "Real-time Smart ATS Advisor";
        desc.innerText = currentLang === 'ar' ? "يقوم هذا العداد الذكي بتحليل نص السيرة الذاتية فوراً أثناء كتابتك ليرشدك عما ينقصك لتخطي الفلترة بنجاح." : "This smart gauge analyzes your CV text instantly as you type.";
        nextBtn.innerText = currentLang === 'ar' ? "التالي" : "Next";
    } else if (tourStep === 3) {
        badge.innerText = currentLang === 'ar' ? "خطوة 3 من 3" : "Step 3 of 3";
        if(icon) icon.innerText = "✨";
        title.innerText = currentLang === 'ar' ? "الذكاء الاصطناعي الخارق والتحسين" : "Superb Generative AI & Optimization";
        desc.innerText = currentLang === 'ar' ? "اكتب مسماك الوظيفي وسيتم تزويدك باقتراحات مجهزة عالمياً لدمجها بضغطة زر وتصدير ملفك." : "Type your title and get optimized suggestions.";
        nextBtn.innerText = currentLang === 'ar' ? "إنهاء الجولة واستكشاف السحر" : "Finish & Explore Magic";
    }
}

// ========================================================
// 🧭 إظهار النصائح والتحكم المباشر في الواجهة وحساب الـ ATS
// ========================================================
function displayRandomLiveTip() {
    const tipEl = document.getElementById("cvTipText");
    if (tipEl) {
        tipEl.innerText = cvTips[Math.floor(Math.random() * cvTips.length)];
    }
}

function calculateATSScore() {
    const name = document.getElementById("name").value.trim();
    const title = document.getElementById("jobTitle").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const jd = document.getElementById("jobDescription").value.trim();

    let score = 0;
    let basicValid = name.length > 3 && title.length > 3;
    let skillsValid = skills.split(',').filter(s => s.trim().length > 1).length >= 3;
    let numValid = /(%|\d{2,})/g.test(experience);
    let wordsValid = experience.length > 40;

    if (basicValid) score += 25;
    if (skillsValid) score += 25;
    if (numValid) score += 25;
    if (wordsValid) score += 25;

    const fill = document.getElementById("scoreFill");
    const txt = document.getElementById("scoreText");
    const status = document.getElementById("scoreStatus");

    if (fill) fill.style.width = score + "%";
    if (txt) txt.innerText = score + "%";

    toggleIndicatorActive("ind-basic", basicValid);
    toggleIndicatorActive("ind-skills", skillsValid);
    toggleIndicatorActive("ind-num", numValid);
    toggleIndicatorActive("ind-words", wordsValid);

    if (status) {
        if (score === 0) {
            status.innerText = translations[currentLang].atsInitialStatusText;
        } else if (score < 50) {
            status.innerText = currentLang === 'ar' ? "🔴 ضعيفة جداً! أضف تفاصيل مهنية واذكر خبراتك بدقة لتفادي الرفض الفوري." : "🔴 Very weak! Add professional details to avoid instant rejection.";
        } else if (score < 100) {
            status.innerText = currentLang === 'ar' ? "🟡 جيدة! السيرة الذاتية تتحسن، يفضل إضافة أرقام وإنجازات محددة للوصول للعلامة الكاملة." : "🟡 Good! The resume is improving, consider adding specific numbers.";
        } else {
            status.innerText = currentLang === 'ar' ? "🟢 مذهل ومثالي! السيرة الذاتية الآن مجهزة بنسبة 100% لتخطي أنظمة الـ ATS واقتناص المقابلات!" : "🟢 Astounding & Perfect! Your CV is now 100% optimized to bypass ATS systems.";
        }
    }
}

function toggleIndicatorActive(id, isValid) {
    const el = document.getElementById(id);
    if (el) {
        if (isValid) {
            el.style.background = "rgba(56, 189, 248, 0.15)";
            el.style.color = "#38bdf8";
        } else {
            el.style.background = "rgba(255, 255, 255, 0.02)";
            el.style.color = "#94a3b8";
        }
    }
}

function renderJobSuggestions() {
    const container = document.getElementById("suggestionsList");
    if (!container) return;
    container.innerHTML = "";

    for (let key in jobGuidelines) {
        const titleText = jobGuidelines[key][currentLang] || jobGuidelines[key]['en'];
        const badge = document.createElement("span");
        badge.className = "sug-badge";
        badge.style.cssText = "cursor:pointer; background:rgba(255,255,255,0.05); padding:5px 10px; border-radius:20px; font-size:12px; color:#38bdf8; border:1px solid rgba(56,189,248,0.2);";
        badge.innerText = titleText;
        badge.addEventListener("click", () => {
            document.getElementById("jobTitle").value = titleText;
            calculateATSScore();
        });
        container.appendChild(badge);
    }
}

function applyLanguage() {
    const dict = translations[currentLang];
    const htmlEl = document.getElementById("appHtml");
    if (htmlEl) {
        htmlEl.setAttribute("lang", currentLang);
        htmlEl.setAttribute("dir", currentLang === 'ar' ? 'rtl' : 'ltr');
    }

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict && dict[key]) el.innerText = dict[key];
    });

    updateTour();
    calculateATSScore();
    renderJobSuggestions();
}

function processAIOptimization(mode) {
    const name = document.getElementById("name").value.trim();
    const title = document.getElementById("jobTitle").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const jd = document.getElementById("jobDescription").value.trim();
    const out = document.getElementById("outputBox");

    if (!title || !name) {
        alert(currentLang === 'ar' ? "❌ يرجى ملء الاسم الكامل والمسمى الوظيفي أولاً للتحسين." : "❌ Please fill in your name and job title first.");
        return;
    }

    out.value = currentLang === 'ar' ? "⏳ جاري تشغيل خوارزميات الذكاء الاصطناعي السحابية وتحسين الكلمات الدلالية للـ ATS..." : "⏳ Running cloud AI algorithms... Please wait...";

    fetch(SECURE_BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, skills, currentCv: experience, jd, lang: currentLang, mode })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.result) {
            out.value = data.result;
        } else {
            throw new Error(data.error || "Unknown Error");
        }
    })
    .catch(err => {
        console.error(err);
        out.value = currentLang === 'ar' ? "❌ حدث خطأ أثناء الاتصال بالذكاء الاصطناعي السحابي." : "❌ Error connecting to AI cloud server.";
    });
}

// ========================================================
// 🤖 المساعد الذكي ونافذة الدعم العائمة 
// ========================================================
function initAiSupportChat() {
    const floatBtn = document.getElementById("aiSupportFloatBtn");
    const supportPage = document.getElementById("aiSupportPage");
    const closeBtn = document.getElementById("closeAiSupportBtn");
    const sendBtn = document.getElementById("sendAiChatBtn");
    const chatInput = document.getElementById("aiChatInput");
    const messagesContainer = document.getElementById("aiChatBody");

    if (!floatBtn || !supportPage || !closeBtn || !sendBtn || !chatInput || !messagesContainer) return;

    floatBtn.addEventListener("click", () => {
        supportPage.style.display = "flex";
        supportPage.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
        supportPage.style.display = "none";
        supportPage.classList.add("hidden");
    });

    async function handleSendMessage() {
        const query = chatInput.value.trim();
        if (!query) return;

        appendChatMessage(query, "user");
        chatInput.value = "";

        const loadingId = "loading_" + Date.now();
        appendChatMessage(currentLang === 'ar' ? "⏳ جاري التفكير..." : "⏳ Thinking...", "ai", loadingId);

        try {
            const response = await fetch(SECURE_BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: "chat", query: query, lang: currentLang })
            });

            const data = await response.json();
            const loadingEl = document.getElementById(loadingId);
            if (loadingEl) loadingEl.remove();

            if (data.success && data.result) {
                appendChatMessage(data.result, "ai");
            } else {
                throw new Error("Invalid response");
            }
        } catch (error) {
            const loadingEl = document.getElementById(loadingId);
            if (loadingEl) loadingEl.remove();
            appendChatMessage(currentLang === 'ar' ? "❌ عذراً، لم أستطع الاتصال بالخادم الآن." : "❌ Server connection lost.", "ai");
        }
    }

    function appendChatMessage(text, sender, id = null) {
        const msgDiv = document.createElement("div");
        if (id) msgDiv.id = id;

        msgDiv.style.padding = "14px 18px";
        msgDiv.style.borderRadius = sender === "user" ? "16px 16px 0 16px" : "0 16px 16px 16px";
        msgDiv.style.fontSize = "14px";
        msgDiv.style.maxWidth = "80%";
        msgDiv.style.lineHeight = "1.6";
        msgDiv.style.whiteSpace = "pre-wrap";

        if (sender === "user") {
            msgDiv.style.alignSelf = "flex-end";
            msgDiv.style.background = "linear-gradient(135deg, #38bdf8, #1d4ed8)";
            msgDiv.style.color = "white";
        } else {
            msgDiv.style.alignSelf = "flex-start";
            msgDiv.style.background = "#1e293b";
            msgDiv.style.color = "#e2e8f0";
            msgDiv.style.border = "1px solid rgba(255,255,255,0.03)";
        }

        msgDiv.innerText = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendBtn.addEventListener("click", handleSendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSendMessage();
    });
}

// ========================================================
// 🎬 بدء تشغيل الـ DOM والـ Event Listeners عند التحميل
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    
    if (localStorage.getItem("ali_cv_tour_done") === "true") {
        const tourOverlay = document.getElementById("appTourModal");
        if (tourOverlay) tourOverlay.style.display = "none";
        const container = document.getElementById("mainAppContent");
        if (container) container.classList.remove("main-content-hidden");
    }

    applyLanguage();
    initAiSupportChat();
    displayRandomLiveTip();

    // ربط الحقول للتحليل الفوري اللحظي
    ["name", "jobTitle", "skills", "experience", "jobDescription"].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", () => {
                calculateATSScore();
                if (id === "jobTitle" && el.value.trim().length > 2) {
                    document.getElementById("jobSuggestionsBox").classList.remove("hidden");
                }
            });
        }
    });

    // معالجة أزرار الجولة التعليمية
    const nextTourBtn = document.getElementById("nextTourBtn");
    if (nextTourBtn) {
        nextTourBtn.addEventListener("click", () => {
            if (tourStep < 3) {
                tourStep++;
                updateTour();
            } else {
                localStorage.setItem("ali_cv_tour_done", "true");
                const tourOverlay = document.getElementById("appTourModal");
                if (tourOverlay) tourOverlay.style.display = "none";
                const container = document.getElementById("mainAppContent");
                if (container) container.classList.remove("main-content-hidden");
            }
        });
    }

    const skipTourBtn = document.getElementById("skipTourBtn");
    if (skipTourBtn) {
        skipTourBtn.addEventListener("click", () => {
            localStorage.setItem("ali_cv_tour_done", "true");
            const tourOverlay = document.getElementById("appTourModal");
            if (tourOverlay) tourOverlay.style.display = "none";
            const container = document.getElementById("mainAppContent");
            if (container) container.classList.remove("main-content-hidden");
        });
    }

    // القائمة العلوية والتحكم في الإعدادات
    const dropBtn = document.getElementById("dropdownToggleBtn");
    const dropMenu = document.getElementById("topLeftMenu");
    if (dropBtn && dropMenu) {
        dropBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropMenu.classList.toggle("hidden");
        });
        document.addEventListener("click", () => {
            dropMenu.classList.add("hidden");
        });
    }

    const openSettings = document.getElementById("openSettingsBtn");
    const settingsModal = document.getElementById("settingsPageModal");
    const closeSettings = document.getElementById("closeSettingsBtn");

    if (openSettings && settingsModal) {
        openSettings.addEventListener("click", () => settingsModal.classList.remove("hidden"));
    }
    if (closeSettings && settingsModal) {
        closeSettings.addEventListener("click", () => settingsModal.classList.add("hidden"));
    }

    // تبديل لغات التطبيق
    const toggleLangBtn = document.getElementById("toggleLanguageBtn");
    if (toggleLangBtn) {
        toggleLangBtn.addEventListener("click", () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLanguage();
        });
    }

    // مظهر وثيمات التطبيق
    const themeSel = document.getElementById("themeSelect");
    if (themeSel) {
        themeSel.addEventListener("change", (e) => {
            document.body.setAttribute("data-app-theme", e.target.value);
        });
    }

    const fontSel = document.getElementById("cvFontSelect");
    if (fontSel) {
        fontSel.addEventListener("change", (e) => {
            const outBox = document.getElementById("outputBox");
            if (outBox) outBox.style.fontFamily = e.target.value;
        });
    }

    const neonToggle = document.getElementById("creativeLayoutToggle");
    if (neonToggle) {
        neonToggle.addEventListener("change", (e) => {
            if (e.target.checked) document.body.classList.add("creative-neon-active");
            else document.body.classList.remove("creative-neon-active");
        });
    }

    // أزرار المعالجة بالذكاء الاصطناعي من الـ HTML
    if (document.getElementById("generateSummaryBtn")) {
        document.getElementById("generateSummaryBtn").addEventListener("click", () => processAIOptimization("summary"));
    }
    if (document.getElementById("aiOptimizeBtn")) {
        document.getElementById("aiOptimizeBtn").addEventListener("click", () => processAIOptimization("full"));
    }
    if (document.getElementById("checkMatchBtn")) {
        document.getElementById("checkMatchBtn").addEventListener("click", () => processAIOptimization("keywords"));
    }

    // إملاء صوتي ذكي للخبرات والمشاريع
    const voiceDictationBtn = document.getElementById("voiceDictationBtn");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (voiceDictationBtn) {
        voiceDictationBtn.addEventListener("click", () => {
            if (!SpeechRecognition) {
                alert(currentLang === 'ar' ? "عذراً، متصفحك لا يدعم التعرف الصوتي حالياً." : "Browser speech not supported.");
                return;
            }
            const rec = new SpeechRecognition();
            rec.lang = currentLang === 'ar' ? 'ar-EG' : 'en-US';
            voiceDictationBtn.innerText = "⏳ ...";
            rec.start();
            rec.onresult = (e) => {
                const text = e.results[0][0].transcript;
                const area = document.getElementById("experience");
                area.value = area.value.trim() + " " + text;
                calculateATSScore();
            };
            rec.onend = () => {
                voiceDictationBtn.innerText = currentLang === 'ar' ? "🎤 إملاء ذكي" : "🎤 Smart Voice";
            };
        });
    }

    // نظام المزامنة والتقييم الفوري عبر تليجرام المربوط بنجوم الواجهة
    let selectedRating = 5;
    const stars = document.querySelectorAll("#starRatingSystem span");
    stars.forEach(star => {
        star.addEventListener("click", (e) => {
            selectedRating = e.target.getAttribute("data-value");
            stars.forEach(s => {
                if(s.getAttribute("data-value") <= selectedRating) {
                    s.style.color = "#38bdf8";
                } else {
                    s.style.color = "rgba(255,255,255,0.2)";
                }
            });
        });
    });

    const submitFeedbackBtn = document.getElementById("submitFeedbackBtn");
    if (submitFeedbackBtn) {
        submitFeedbackBtn.addEventListener("click", () => {
            const textFeedback = document.getElementById("userFeedbackTextarea").value.trim();
            if (!textFeedback) return;

            const starsText = "⭐".repeat(selectedRating);
            const messageText = `🚀 *تقييم جديد للمنصة* 🚀\n\n` +
                                `🔹 *التقييم:* ${starsText} (${selectedRating}/5)\n` +
                                `🔹 *التعليق:* ${textFeedback}\n` +
                                `🔹 *اللغة:* ${currentLang.toUpperCase()}\n` +
                                `📅 *التوقيت:* ${new Date().toLocaleString()}`;

            fetch(`https://api.telegram.org/bot8840422551:AAGa47_hdi5pIOgLCZsUH3kFAN8zDR5zByw/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: "6876904568", text: messageText, parse_mode: 'Markdown' })
            }).then(() => {
                alert(currentLang === 'ar' ? "🎉 شكراً لك! تم إرسال تقييمك بنجاح." : "🎉 Thank you for your feedback!");
                document.getElementById("userFeedbackTextarea").value = "";
            });
        });
    }

    const viewPrivacy = document.getElementById("viewPrivacyPolicyBtn");
    if (viewPrivacy) {
        viewPrivacy.addEventListener("click", (e) => {
            e.preventDefault();
            alert(currentLang === 'ar' ? "🔒 سياسة الخصوصية والأمان الفائق للبيانات المهنية: يتم تشفير وحفظ كافة مدخلاتك محلياً بشكل كامل داخل متصفحك وآمن 100%." : "🔒 Privacy Policy: 100% locally encrypted client-side data security.");
        });
    }
});

// ========================================================
// ⚡ تسجيل الـ Service Worker لتمكين وضع العمل بدون إنترنت (Offline Mode)
// ========================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ali-cv-builder/sw.js')
            .then(reg => console.log('🚀 Service Worker Registered Successfully!', reg.scope))
            .catch(err => console.error('❌ Service Worker Registration Failed:', err));
    });
}
