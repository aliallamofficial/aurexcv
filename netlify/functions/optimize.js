// ==========================================================================
// 🧠 AUREX CV SATELLITE CORE AUTOMATION & CLOUD AI OPTIMIZER
// ==========================================================================

exports.handler = async (event, context) => {
    // ترويسات CORS الاحترافية والموحدة للسماح بالربط الآمن ومنع حظر المتصفحات
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json"
    };

    // معالجة طلب الفحص القبلي (Preflight Request) الفوري للمتصفحات
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders, body: "" };
    }
    
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            headers: corsHeaders, 
            body: JSON.stringify({ success: false, error: "Method Not Allowed Matrix Enforced" }) 
        };
    }

    try {
        if (!event.body) {
            throw new Error("Missing request body payload");
        }

        const bodyData = JSON.parse(event.body);
        const { title, currentCv, jd, lang, mode, query } = bodyData;

        // إعداد البنية العصبية للملقن الذكي بناءً على النمط المختار
        let systemPrompt = "You are an expert ATS optimizer and resume architect. Return ONLY the final clear resume content text, no conversational text.";
        let userPrompt = "";

        if (mode === "chat") {
            systemPrompt = "You are Ali AI, a premium built-in Career Coach. Answer clearly and concisely.";
            userPrompt = query || "";
        } else if (mode === "keywords") {
            userPrompt = `Extract and enrich strategic ATS keywords for ${title || 'Target Role'}.\nJob Details: ${jd || ''}\nResume Context: ${currentCv || ''}. Language: ${lang || 'en'}`;
        } else {
            userPrompt = `Construct a masterfully tailored strategic ATS-optimized resume text.\nJob Title: ${title || ''}\nHistory: ${currentCv || ''}\nTarget JD: ${jd || ''}.\nLanguage: ${lang || 'en'}. Focus on action verbs and professional output layout.`;
        }

        // إعداد الاتصال بالنموذج الرئيسي الافتراضي Meta-Llama-3
        const url = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";
        const hfHeaders = { 'Content-Type': 'application/json' };
        
        // جلب المفاتيح البيئية بشكل ديناميكي وآمن
        const activeToken = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN_PRIMARY;
        if (activeToken) {
            hfHeaders["Authorization"] = `Bearer ${activeToken}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: hfHeaders,
            body: JSON.stringify({
                inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${systemPrompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${userPrompt}<|eot_id|><|start_header_id|>assistant<|end_header_id trim>`,
                parameters: { max_new_tokens: 1500, temperature: 0.4 }
            })
        });

        if (!response.ok) {
            const errorRaw = await response.text();
            throw new Error(`HuggingFace Engine Anomalous Status: ${response.status} - ${errorRaw}`);
        }

        const data = await response.json();
        
        // استخراج مخرجات الذكاء الاصطناعي مع معالجة المصفوفات الديناميكية
        let aiText = "";
        if (Array.isArray(data) && data[0]) {
            aiText = data[0].generated_text || data[0].summary_text || "";
        } else {
            aiText = data.generated_text || data.result || "";
        }

        // 🛡️ تنظيف وتجريد التوكنات البرمجية من النص المسترجع لحماية المظهر البصري للسيرة الذاتية
        aiText = aiText.replace(/<\|begin_of_text\|>|<\|start_header_id\|>.*?<\|end_header_id\|>|<\|eot_id\|>/g, "").trim();
        aiText = aiText.replace(/^```html|^html|^```markdown|^```text|^```|```$/gi, '').trim();

        // 🛠️ تم التصحيح: توحيد إخراج الحقل ليكون data و result معاً لضمان التوافق مع كل إصدارات ai.js و core.js
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ 
                success: true, 
                data: aiText || "Compilation Successful Matrix Response.",
                result: aiText || "Compilation Successful Matrix Response." 
            })
        };

    } catch (error) {
        console.error("🚀 Cloud AI Execution Exception:", error);
        return { 
            statusCode: 500, 
            headers: corsHeaders, 
            body: JSON.stringify({ success: false, error: error.message || "Internal Sovereign Error Matrix Triggered" }) 
        };
    }
};
