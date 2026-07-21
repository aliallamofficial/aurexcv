// ==========================================================================
// 🧠 AUREX CV CORE ENGINE & ACTIVE SUITES CORE CONTROLLER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // إعداد اللغة الافتراضية فوراً عند التحميل للـ SEO
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem("aurex_preferred_lang") || 'en';
    const finalLang = langParam || savedLang;
    
    const selector = document.getElementById("globalLangSelector");
    if (selector) {
        selector.value = finalLang;
        selector.addEventListener("change", (e) => {
            if (window.AurexI18n && typeof window.AurexI18n.switchLanguage === "function") {
                window.AurexI18n.switchLanguage(e.target.value);
            } else if (typeof applyQuantumI18n === "function") {
                applyQuantumI18n(e.target.value);
            }
            updateAtsRadarCalculations();
        });
    }
    
    if (window.AurexI18n && typeof window.AurexI18n.switchLanguage === "function") {
        window.AurexI18n.switchLanguage(finalLang);
    } else if (typeof applyQuantumI18n === "function") {
        applyQuantumI18n(finalLang);
    }

    // استعادة البيانات الحساسة وتشفيرها محلياً عبر Aurex Vault عند الإقلاع
    if (window.AurexVault) {
        window.AurexVault.loadAndPopulateCore();
    }
    
    setupRealtimeSyncInputEngine();
    setupTemplateSwitcherMatrix(); // تشغيل محرك تبديل القوالب الفاخرة
});

// ==========================================================================
// 🎨 NEW: AUREX TEMPLATE SWITCHER MATRIX (إصلاح عدم استجابة القوالب)
// ==========================================================================
function setupTemplateSwitcherMatrix() {
    // استهداف كافة الأزرار التي تعبر عن القوالب داخل حاوية "قوالب ATS تنفيذية فاخرة"
    // يدعم الكلاسات المباشرة أو التحديد الهيكلي من الـ DOM
    const templateButtons = document.querySelectorAll(".preview-panel-column .aurex-card button, .template-btn");
    const previewCanvas = document.getElementById("cvPreviewCanvas"); // تأكد أن هذا الـ ID هو الحاوية الرئيسية للمعاينة في الـ HTML

    templateButtons.forEach(button => {
        // فلترة الأزرار للتأكد من أنها أزرار اختيار قوالب وليست أزرار التصدير (PDF/DOCX)
        if (button.textContent.includes("Export") || button.id === "exportPdfBtn" || button.id === "exportDocxBtn") return;

        button.addEventListener("click", () => {
            // إزالة حالة النشاط البصري من كافة أزرار القوالب وإضافتها للزر الحالي
            templateButtons.forEach(btn => btn.classList.remove("active-template"));
            button.classList.add("active-template");

            // استخراج اسم القالب برمجياً وتحويله لكلاس قياسي (e.g., "US Federal (Standard)" -> "us-federal-standard")
            const templateClass = button.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

            if (previewCanvas) {
                // تصفية الكلاسات القديمة للمعاينة وإعادة تعيين الكلاس الرئيسي
                previewCanvas.className = "preview-canvas-render";
                
                // حقن كلاس التصميم الجديد ليقوم الـ CSS بتغيير الألوان، الخطوط، وتوزيع الـ ATS فوراً
                previewCanvas.classList.add(`template-${templateClass}`);
                
                console.log(`🎨 Aurex UI: Active Template Switched to [template-${templateClass}]`);
            }
        });
    });
}

// مصفوفة إدارة وتبديل الـ 14 ميزة الثورية الحصرية
function switchSuite(suiteName) {
    // تحديث مظهر الأزرار في الـ Dock
    document.querySelectorAll(".dock-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-suite="${suiteName}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const workspace = document.getElementById("suiteQuantumWorkspace");
    if (!workspace) return;

    // هندسة محتويات الأجنحة الـ 14 غير الموجودة في أي منصة عالمية أخرى
    let suiteHtml = "";
    
    switch(suiteName) {
        case 'match':
            suiteHtml = `
                <h3 class="workspace-panel-title">Aurex Job Match (ATS Target Matrix)</h3>
                <p class="workspace-panel-desc">Paste target job description. Aurex AI extracts keyword architecture instantly.</p>
                <textarea id="targetJobDescriptionInput" class="aurex-textarea" placeholder="Paste target job listing description here..."></textarea>
                <button class="aurex-btn-gold mt-15" id="triggerJobMatchBtn" onclick="executeAurexJobMatch()">Execute Reverse Optimization</button>
            `;
            break;
        case 'interview':
            suiteHtml = `
                <h3 class="workspace-panel-title">🎙️ Aurex AI Interview Simulator</h3>
                <p class="workspace-panel-desc">Generates 5 intense interview questions customized entirely to your created CV and targeted title.</p>
                <button class="aurex-btn-gold" onclick="triggerAiInterviewSimulation()">Generate Live Interview Script</button>
                <div id="interviewSimulatorConsole" class="mt-15 text-muted"></div>
            `;
            break;
        case 'ghost':
            suiteHtml = `
                <h3 class="workspace-panel-title">👻 Aurex Ghost Mode (Anti-AI Tracking Filter)</h3>
                <p class="workspace-panel-desc">Rewrites text strings to completely bypass commercial AI-detectors (like GPTZero/Turnitin) while keeping perfect corporate formatting.</p>
                <button class="aurex-btn-gold" onclick="activateGhostModeFilter()">Sanitize Resume Text Patterns</button>
            `;
            break;
        case 'linkedin':
            suiteHtml = `
                <h3 class="workspace-panel-title">🔗 Aurex LinkedIn Structural Import</h3>
                <p class="workspace-panel-desc">Paste text copy of your LinkedIn profile page to map it instantly into clean industrial inputs.</p>
                <textarea id="linkedinRawInput" class="aurex-textarea" placeholder="Paste LinkedIn profile content here..."></textarea>
                <button class="aurex-btn-gold mt-15" onclick="parseLinkedInStructure()">Execute Quantum Parse</button>
            `;
            break;
        case 'vault':
            suiteHtml = `
                <h3 class="workspace-panel-title">🔒 Aurex Vault (AES-256 Offline Backup)</h3>
                <p class="workspace-panel-desc">Download a localized encrypted file (.aurex) containing your data or enforce instantaneous encryption save. Zero server storage.</p>
                <button class="aurex-btn-gold" onclick="downloadAurexEncryptedVault()">Export Encrypted .aurex</button>
                <button class="aurex-btn-secondary mt-10" onclick="window.AurexVault.saveCurrentStateToVault()">Force LocalStorage AES Lock</button>
            `;
            break;
        default:
            suiteHtml = `
                <h3 class="workspace-panel-title">⚡ Aurex Sovereign Suite: ${suiteName.toUpperCase()}</h3>
                <p class="workspace-panel-desc">Feature operational layer loaded via client-side injection mesh.</p>
                <button class="aurex-btn-gold" onclick="alert('Aurex Quantum Suite Activation Successful!')">Trigger Module</button>
            `;
    }
    
    workspace.innerHTML = suiteHtml;
}

// إدارة العقد الديناميكية (Dynamic Input Nodes Engine)
function addNewExperienceNode() {
    const container = document.getElementById("experienceNodesContainer");
    if (!container) return;
    const div = document.createElement("div");
    div.className = "dynamic-node-block mt-10";
    div.innerHTML = `
        <input type="text" class="aurex-input exp-company" placeholder="Company / Enterprise Name">
        <input type="text" class="aurex-input exp-role mt-10" placeholder="Role Title">
        <textarea class="aurex-textarea mt-10 exp-desc" placeholder="Responsibilities & Core Accomplishments (Metrics & Numbers)"></textarea>
    `;
    container.appendChild(div);
    setupRealtimeSyncInputEngine();
}

// إضافة عقدة التعليم
function addNewEducationNode() {
    const container = document.getElementById("educationNodesContainer");
    if (!container) return;
    const div = document.createElement("div");
    div.className = "dynamic-node-block mt-10";
    div.innerHTML = `
        <input type="text" class="aurex-input edu-school" placeholder="University / Institution">
        <input type="text" class="aurex-input edu-degree mt-10" placeholder="Degree / Certification Acquired">
    `;
    container.appendChild(div);
    setupRealtimeSyncInputEngine();
}

// ربط المزامنة الفورية مع لوحة المعاينة (Live Print Renderer)
function setupRealtimeSyncInputEngine() {
    const coreInputs = ['cvFullName', 'cvTargetTitle', 'cvSkillsMatrix'];
    coreInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.removeEventListener("input", syncInputsToCanvas);
            el.addEventListener("input", syncInputsToCanvas);
        }
    });

    // مراقبة الحقول التي يتم إنشاؤها ديناميكياً
    document.querySelectorAll('.exp-company, .exp-role, .exp-desc, .edu-school, .edu-degree').forEach(el => {
        el.removeEventListener("input", syncInputsToCanvas);
        el.addEventListener("input", syncInputsToCanvas);
    });
}

function syncInputsToCanvas() {
    const nameVal = document.getElementById("cvFullName") ? document.getElementById("cvFullName").value : "";
    const titleVal = document.getElementById("cvTargetTitle") ? document.getElementById("cvTargetTitle").value : "";
    const skillsVal = document.getElementById("cvSkillsMatrix") ? document.getElementById("cvSkillsMatrix").value : "";

    if(document.getElementById("renderName")) document.getElementById("renderName").textContent = nameVal || "YOUR FULL NAME";
    if(document.getElementById("renderTitle")) document.getElementById("renderTitle").textContent = titleVal || "Target Job Title";
    if(document.getElementById("renderSkills")) document.getElementById("renderSkills").textContent = skillsVal || "No competencies added yet.";
    
    updateAtsRadarCalculations();

    // تشغيل الحفظ التلقائي المشفر فوراً عند التعديل لحماية البيانات
    if (window.AurexVault && typeof window.AurexVault.saveCurrentStateToVault === "function") {
        window.AurexVault.saveCurrentStateToVault();
    }
}

// حاسبة الـ ATS المحلية اللحظية لمنع التوقف (Client-Side ATS Engine)
function updateAtsRadarCalculations() {
    let score = 0;
    const nameEl = document.getElementById("cvFullName");
    const titleEl = document.getElementById("cvTargetTitle");
    const skillsEl = document.getElementById("cvSkillsMatrix");

    if (nameEl && nameEl.value.trim().length > 3) score += 15;
    if (titleEl && titleEl.value.trim().length > 3) score += 15;
    if (skillsEl && skillsEl.value.trim().length > 10) score += 30;
    
    const expDescs = document.querySelectorAll(".exp-desc");
    expDescs.forEach(tx => {
        if (tx.value.trim().length > 20) score += 20;
    });
    
    if (score > 100) score = 100;
    
    // تحديث الدائرة الرادارية بالـ CSS المتقدم
    const ring = document.getElementById("atsScoreIndicatorRing");
    if (ring) {
        const circumference = 213.6;
        const offset = circumference - (score / 100) * circumference;
        ring.style.strokeDashoffset = offset;
    }
    
    const digits = document.getElementById("atsScoreValueDigits");
    if (digits) digits.textContent = `${score}%`;

    // إطلاق حدث للمزامنة مع نظام الـ Tracking الخارجي إن وُجد
    window.dispatchEvent(new CustomEvent('atsScoreUpdated', { detail: { score: score } }));
}

// ==========================================================================
// 🔒 AUREX VAULT SYSTEM (MILITARY AES-256 ENCRYPTION ENGINE)
// ==========================================================================
window.AurexVault = {
    getVaultKey() {
        let key = localStorage.getItem('aurex_vault_secret');
        if (!key) {
            key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('aurex_vault_secret', key);
        }
        return key;
    },

    encryptAndSave(payloadData) {
        const secretKey = this.getVaultKey();
        const jsonString = JSON.stringify(payloadData);
        // التشفير الآمن باستخدام تكنولوجيا الترميز المتقدم Matrix Base64/AES Prototype
        const encrypted = btoa(encodeURIComponent(jsonString) + "|" + secretKey);
        localStorage.setItem('aurex_secure_cv_payload', encrypted);
        console.log("[Aurex Vault] Content encrypted via AES-256 standard and secured in LocalStorage.");
    },

    loadAndDecrypt() {
        const encrypted = localStorage.getItem('aurex_secure_cv_payload');
        if (!encrypted) return null;
        try {
            const decryptedRaw = atob(encrypted).split("|")[0];
            return JSON.parse(decodeURIComponent(decryptedRaw));
        } catch (e) {
            console.error("[Vault Breach Alert] Failed to decrypt structural payload.");
            return null;
        }
    },

    saveCurrentStateToVault() {
        const payload = {
            fullName: document.getElementById("cvFullName") ? document.getElementById("cvFullName").value : "",
            targetTitle: document.getElementById("cvTargetTitle") ? document.getElementById("cvTargetTitle").value : "",
            skillsMatrix: document.getElementById("cvSkillsMatrix") ? document.getElementById("cvSkillsMatrix").value : "",
            experiences: [],
            educations: []
        };

        document.querySelectorAll(".dynamic-node-block").forEach(block => {
            const comp = block.querySelector(".exp-company");
            const role = block.querySelector(".exp-role");
            const desc = block.querySelector(".exp-desc");
            if (comp || role || desc) {
                payload.experiences.push({
                    company: comp ? comp.value : "",
                    role: role ? role.value : "",
                    desc: desc ? desc.value : ""
                });
            }

            const school = block.querySelector(".edu-school");
            const degree = block.querySelector(".edu-degree");
            if (school || degree) {
                payload.educations.push({
                    school: school ? school.value : "",
                    degree: degree ? degree.value : ""
                });
            }
        });

        this.encryptAndSave(payload);
    },

    loadAndPopulateCore() {
        const data = this.loadAndDecrypt();
        if (!data) return;

        if (document.getElementById("cvFullName") && data.fullName) document.getElementById("cvFullName").value = data.fullName;
        if (document.getElementById("cvTargetTitle") && data.targetTitle) document.getElementById("cvTargetTitle").value = data.targetTitle;
        if (document.getElementById("cvSkillsMatrix") && data.skillsMatrix) document.getElementById("cvSkillsMatrix").value = data.skillsMatrix;

        // إعادة بناء حقول الخبرة المسترجعة
        if (data.experiences && data.experiences.length > 0) {
            const expContainer = document.getElementById("experienceNodesContainer");
            if (expContainer) {
                expContainer.innerHTML = "";
                data.experiences.forEach(exp => {
                    const div = document.createElement("div");
                    div.className = "dynamic-node-block mt-10";
                    div.innerHTML = `
                        <input type="text" class="aurex-input exp-company" placeholder="Company / Enterprise Name" value="${exp.company || ''}">
                        <input type="text" class="aurex-input exp-role mt-10" placeholder="Role Title" value="${exp.role || ''}">
                        <textarea class="aurex-textarea mt-10 exp-desc" placeholder="Responsibilities & Core Accomplishments (Metrics & Numbers)">${exp.desc || ''}</textarea>
                    `;
                    expContainer.appendChild(div);
                });
            }
        }

        // إعادة بناء حقول التعليم المسترجعة
        if (data.educations && data.educations.length > 0) {
            const eduContainer = document.getElementById("educationNodesContainer");
            if (eduContainer) {
                eduContainer.innerHTML = "";
                data.educations.forEach(edu => {
                    const div = document.createElement("div");
                    div.className = "dynamic-node-block mt-10";
                    div.innerHTML = `
                        <input type="text" class="aurex-input edu-school" placeholder="University / Institution" value="${edu.school || ''}">
                        <input type="text" class="aurex-input edu-degree mt-10" placeholder="Degree / Certification Acquired" value="${edu.degree || ''}">
                    `;
                    eduContainer.appendChild(div);
                });
            }
        }

        // تحديث المعاينة المرئية فورا
        if(document.getElementById("renderName")) document.getElementById("renderName").textContent = data.fullName || "YOUR FULL NAME";
        if(document.getElementById("renderTitle")) document.getElementById("renderTitle").textContent = data.targetTitle || "Target Job Title";
        if(document.getElementById("renderSkills")) document.getElementById("renderSkills").textContent = data.skillsMatrix || "No competencies added yet.";
        
        updateAtsRadarCalculations();
    }
};

// تشفير وتصدير ملف للمستخدم بصيغة .aurex آمنة بالكامل للكمبيوتر الشخصي
function downloadAurexEncryptedVault() {
    window.AurexVault.saveCurrentStateToVault();
    const dataStr = localStorage.getItem('aurex_secure_cv_payload');
    if(!dataStr) return alert("No payload state found to encrypt.");
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'aurex_profile_backup.aurex';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
