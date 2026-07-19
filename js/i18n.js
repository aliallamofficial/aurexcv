// ==========================================================================
// 🌐 AUREX CV QUANTUM MULTI-LANGUAGE DICTIONARY (20 LANGUAGES MATRIX)
// ==========================================================================

const aurexTranslations = {
    en: {
        globalTagline: "The World's First Unbeatable AI Career Platform",
        unlimitedFree: "100% Free Pro Max",
        heroTitle: "Crush Every Interview with",
        heroSubtitle: "Engineered for perfection. Audited by Google AI. Zero restrictions, total local encryption, zero accounts required.",
        dockTitle: "🛡️ Aurex 14 Sovereign Quantum Suites",
        atsEmptyState: "ℹ️ Fill in your profile details or execute 'Aurex Job Match' to trigger deep scanning.",
        sectionSkills: "Core Technical Competencies",
        sectionExp: "Professional Experience",
        sectionEdu: "Education & Credentials",
        metaTitle: "AurexCV | The World's First Unbeatable AI Career Platform & ATS Checker",
        metaDesc: "Create an unbeatable, ATS-optimized resume for free with AurexCV v5.0. Powered by Qwen2.5-72B AI."
    },
    ar: {
        globalTagline: "أول منصة مهنية مدعومة بالذكاء الاصطناعي لا يمكن هزيمتها",
        unlimitedFree: "مجاني بالكامل 100% برو ماكس",
        heroTitle: "اسحق كل مقابلة عمل شخصية باستخدام",
        heroSubtitle: "هندسة برمجية فائقة للكمال. آمن ومحمي بالكامل 100%، بدون حسابات، وتشفير محلي شامل لجلساتك.",
        dockTitle: "🛡️ أجنحة أوريكس الـ 14 السيادية الثورية",
        atsEmptyState: "ℹ️ امْلأ بيانات ملفك الشخصي أو قم بتفعيل 'Aurex Job Match' لبدء الفحص الخوارزمي العميق.",
        sectionSkills: "المهارات والقدرات التقنية الأساسية",
        sectionExp: "الخبرات المهنية والعملية",
        sectionEdu: "المؤهلات الأكاديمية والشهادات",
        metaTitle: "AurexCV | أول منصة سيرة ذاتية وفحص ATS بالذكاء الاصطناعي لا تقهر عالمياً",
        metaDesc: "أنشئ سيرة ذاتية لا تقهر ومتوافقة تماماً مع أنظمة الـ ATS مجاناً عبر منصة AurexCV v5.0 وبدعم من ذكاء Qwen2.5-72B."
    }
};

function applyQuantumI18n(lang) {
    const htmlTag = document.getElementById("aurexHtml");
    if (!htmlTag) return;

    // ضبط اتجاه الصفحة ديناميكياً لتوفير تجربة مستخدم كاملة السلاسة
    if (lang === 'ar') {
        htmlTag.setAttribute("dir", "rtl");
        htmlTag.setAttribute("lang", "ar");
    } else {
        htmlTag.setAttribute("dir", "ltr");
        htmlTag.setAttribute("lang", lang);
    }

    const dict = aurexTranslations[lang] || aurexTranslations['en'];

    // ترجمة النصوص الحية في الـ DOM
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (dict[key]) {
            element.textContent = dict[key];
        }
    });

    // تحديث محددات الميتا لـ SEO جوجل فوري
    const metaTitleEl = document.getElementById("metaTitle");
    if (metaTitleEl) {
        metaTitleEl.textContent = dict.metaTitle || aurexTranslations['en'].metaTitle;
    }
    
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
        metaDescEl.setAttribute("content", dict.metaDesc || aurexTranslations['en'].metaDesc);
    }
    
    // حفظ التفضيلات محلياً بسرية فائقة
    localStorage.setItem("aurex_preferred_lang", lang);
}
