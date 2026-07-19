// ==========================================================================
// 🧠 AUREX CV CORE ENGINE & ACTIVE SUITES CORE CONTROLLER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // إعداد اللغة الافتراضية فورا عند التحميل للـ SEO
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem("aurex_preferred_lang") || 'en';
    const finalLang = langParam || savedLang;
    
    const selector = document.getElementById("globalLangSelector");
    if (selector) {
        selector.value = finalLang;
        selector.addEventListener("change", (e) => {
            applyQuantumI18n(e.target.value);
            updateAtsRadarCalculations();
        });
    }
    
    applyQuantumI18n(finalLang);
    setupRealtimeSyncInputEngine();
});

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
                <p class="workspace-panel-desc">Download a localized encrypted file (.aurex) containing your data. Zero server storage.</p>
                <button class="aurex-btn-gold" onclick="downloadAurexEncryptedVault()">Export Encrypted .aurex</button>
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
    const inputs = ['cvFullName', 'cvTargetTitle', 'cvSkillsMatrix'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.removeEventListener("input", syncInputsToCanvas);
            el.addEventListener("input", syncInputsToCanvas);
        }
    });
}

function syncInputsToCanvas() {
    document.getElementById("renderName").textContent = document.getElementById("cvFullName").value || "YOUR FULL NAME";
    document.getElementById("renderTitle").textContent = document.getElementById("cvTargetTitle").value || "Target Job Title";
    document.getElementById("renderSkills").textContent = document.getElementById("cvSkillsMatrix").value || "No competencies added yet.";
    updateAtsRadarCalculations();
}

// حاسبة الـ ATS المحلية اللحظية لمنع التوقف (Client-Side ATS Engine)
function updateAtsRadarCalculations() {
    let score = 0;
    if (document.getElementById("cvFullName").value.trim().length > 3) score += 15;
    if (document.getElementById("cvTargetTitle").value.trim().length > 3) score += 15;
    if (document.getElementById("cvSkillsMatrix").value.trim().length > 10) score += 30;
    
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
}
