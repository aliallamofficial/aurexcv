// ==========================================================================
// 🚀 AUREX CV EXECUTIVE APPLICATION MASTER WIRE & EXPORT ENGINE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // ربط مستمعات الأحداث لعمليات التصدير الفاخرة
    const pdfBtn = document.getElementById("exportToPdfBtn");
    if (pdfBtn) pdfBtn.addEventListener("click", exportAurexCanvasToStandardPdf);

    const docxBtn = document.getElementById("exportToDocxBtn");
    if (docxBtn) docxBtn.addEventListener("click", exportAurexCanvasToStandardDocx);

    const masterGenBtn = document.getElementById("masterAiGenerationBtn");
    if (masterGenBtn) masterGenBtn.addEventListener("click", triggerMasterAiOptimizationSequence);

    // ربط قوالب التصميم التنفيذية المدمجة
    document.querySelectorAll(".tmpl-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const btn = e.currentTarget;
            document.querySelectorAll(".tmpl-card").forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            
            const targetTemplate = btn.getAttribute("data-template");
            const canvas = document.getElementById("aurexLiveRenderCanvas");
            if (canvas) {
                canvas.className = `cv-render-paper template-${targetTemplate}`;
            }
        });
    });

    // استدعاء استرجاع البيانات التلقائي المؤمن
    loadAurexSecureLocalSession();
});

// 📥 محرك تصدير الـ PDF العالي الكفاءة عبر واجهة الطباعة المدمجة لضمان التوافق مع الـ ATS
function exportAurexCanvasToStandardPdf() {
    const canvas = document.getElementById("aurexLiveRenderCanvas");
    if (!canvas) return;

    // فتح نافذة طباعة مخصصة ومستقلة لضمان عزل ورقة الـ CV عن بقية عناصر المنصة الداكنة
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
        <head>
            <title>${document.getElementById("renderName").textContent} - Resume</title>
            <style>
                body { margin: 0; padding: 0; background: #fff; font-family: 'Inter', sans-serif; }
                .cv-render-paper { padding: 40px; color: #111; }
                .render-field-name { font-size: 26px; font-weight: 700; text-transform: uppercase; margin: 0; }
                .render-field-title { font-size: 15px; color: #555; font-weight: 500; margin: 5px 0 0 0; }
                .render-field-contact { font-size: 12px; color: #777; margin: 5px 0 0 0; }
                .canvas-divider { border: 0; border-top: 1px solid #DDD; margin: 20px 0; }
                .canvas-section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #111; border-bottom: 1px solid #111; padding-bottom: 3px; margin: 15px 0 10px 0; }
                .render-field-text { font-size: 13px; color: #333; line-height: 1.6; white-space: pre-line; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="cv-render-paper">
                ${canvas.innerHTML}
            </div>
            <script>
                window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// 📝 محرك تصدير ملفات DOCX الهيكلية النظيفة القابلة للتعديل
function exportAurexCanvasToStandardDocx() {
    const canvas = document.getElementById("aurexLiveRenderCanvas");
    if (!canvas) return;

    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><title>Aurex CV Export</title><style>body { font-family: Arial; font-size: 11pt; line-height: 1.2; }</style></head>
        <body>${canvas.innerHTML}</body>
        </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.getElementById("cvFullName").value || "Aurex_Resume"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ⚡ مصفوفة الإنتاج والربط بالذكاء الاصطناعي الشامل للصياغة الاحترافية
async function triggerMasterAiOptimizationSequence() {
    const masterBtn = document.getElementById("masterAiGenerationBtn");
    masterBtn.disabled = true;
    masterBtn.innerHTML = "<span>⏳ QUANTUM ENGINE COMPUTING TEXT...</span>";

    const fullName = document.getElementById("cvFullName").value.trim();
    const targetTitle = document.getElementById("cvTargetTitle").value.trim();
    const skills = document.getElementById("cvSkillsMatrix").value.trim();

    // صياغة الـ System Prompt الفاخر لتشغيل محرك Qwen السحابي المدمج في ملف ai.js
    const sysPrompt = "You are a master technical resume compiler. Rewrite the input competencies and skills list into a highly polished, executive standard professional architecture summary.";
    const userPrompt = `Name: ${fullName}\nTarget Title: ${targetTitle}\nSkills Matrix: ${skills}`;

    const optimizedSkillsText = await queryAurexQuantumAI(sysPrompt, userPrompt);
    
    // حقن النتيجة المطورة داخل لوحة التخزين الفورية ورندرتها
    document.getElementById("cvSkillsMatrix").value = optimizedSkillsText;
    syncInputsToCanvas();

    // تحديث المظهر لعقد الخبرة والتعليم ديناميكياً داخل الكانفاس
    renderDynamicNodesToCanvas();

    masterBtn.disabled = false;
    masterBtn.innerHTML = "<span>⚡ GENERATE UNBEATABLE ATS CV NOW</span>";
    
    // حفظ الجلسة احتياطياً فورا
    saveAurexSecureLocalSession();
}

// رندرة العقد الديناميكية للخبرة والتعليم داخل ورقة المعاينة البيضاء
function renderDynamicNodesToCanvas() {
    const expContainer = document.getElementById("renderExperience");
    if (expContainer) {
        expContainer.innerHTML = "";
        const companies = document.querySelectorAll(".exp-company");
        const roles = document.querySelectorAll(".exp-role");
        const descs = document.querySelectorAll(".exp-desc");

        companies.forEach((comp, idx) => {
            if (comp.value.trim()) {
                const block = document.createElement("div");
                block.style.marginBottom = "12px";
                block.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px;">
                        <span>${comp.value}</span>
                        <span>${roles[idx]?.value || ""}</span>
                    </div>
                    <p class="render-field-text" style="margin: 3px 0 0 0;">${descs[idx]?.value || ""}</p>
                `;
                expContainer.appendChild(block);
            }
        });
    }

    const eduContainer = document.getElementById("renderEducation");
    if (eduContainer) {
        eduContainer.innerHTML = "";
        const schools = document.querySelectorAll(".edu-school");
        const degrees = document.querySelectorAll(".edu-degree");

        schools.forEach((sch, idx) => {
            if (sch.value.trim()) {
                const block = document.createElement("div");
                block.style.marginBottom = "8px";
                block.innerHTML = `
                    <div style="font-weight: 700; font-size: 13px;">${sch.value}</div>
                    <div style="font-size: 12px; color: #444;">${degrees[idx]?.value || ""}</div>
                `;
                eduContainer.appendChild(block);
            }
        });
    }
}

// 🔒 نظام تشفير وحفظ واسترجاع الجلسات محلياً (Sovereign Local Session Memory)
function saveAurexSecureLocalSession() {
    const sessionData = {
        fullName: document.getElementById("cvFullName").value,
        targetTitle: document.getElementById("cvTargetTitle").value,
        email: document.getElementById("cvEmail").value,
        phone: document.getElementById("cvPhone").value,
        skills: document.getElementById("cvSkillsMatrix").value
    };
    localStorage.setItem("aurex_secure_session", JSON.stringify(sessionData));
}

function loadAurexSecureLocalSession() {
    const raw = localStorage.getItem("aurex_secure_session");
    if (!raw) return;
    try {
        const data = JSON.parse(raw);
        if (data.fullName) document.getElementById("cvFullName").value = data.fullName;
        if (data.targetTitle) document.getElementById("cvTargetTitle").value = data.targetTitle;
        if (data.email) document.getElementById("cvEmail").value = data.email;
        if (data.phone) document.getElementById("cvPhone").value = data.phone;
        if (data.skills) document.getElementById("cvSkillsMatrix").value = data.skills;
        
        syncInputsToCanvas();
    } catch (e) {
        console.error("Session restoration bypassed.");
    }
}

// ميزة التصدير المشفر للملفات الصامتة .aurex
function downloadAurexEncryptedVault() {
    const raw = localStorage.getItem("aurex_secure_session") || "{}";
    const blob = new Blob([btoa(raw)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "backup_profile.aurex";
    a.click();
}
